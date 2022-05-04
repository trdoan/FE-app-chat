import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Button, Divider, Pagination, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createRoom, deleteRoom } from "../../../../store/actions/room.action";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PublicIcon from "@mui/icons-material/Public";
import RoomForm from "../RoomForm/RoomForm";
import LockIcon from "@mui/icons-material/Lock";
export default function TableRoom({ roomList, socket }) {
  console.log(roomList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNewRoom = async (data) => {
    console.log(data);
    await dispatch(createRoom(data));
    socket.emit("new-room-created", data);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const handleJoinRoom = (id) => {
    navigate(`/room/${id}`);
  };
  const handleDeleteRoom = (id) => {
    dispatch(deleteRoom(id));
    socket.emit("new-room-deleted");
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ border: "5px" }}>
        <Table
          sx={{ minWidth: 650, width: "100%", margin: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Tên phòng</TableCell>
              <TableCell align="left">Chủ phòng</TableCell>
              <TableCell align="left">Loại phòng</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList?.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.User.displayName}</TableCell>
                <TableCell align="left">
                  {row.type === "PUBLIC" && (
                    <IconButton color="success">
                      <PublicIcon />
                    </IconButton>
                  )}
                  {row.type !== "PUBLIC" && (
                    <IconButton color="error">
                      <LockIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  {user?.id === row.hostId && (
                    <Stack
                      spacing={2}
                      direction="row"
                      justifyContent="center"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <Button
                        variant="contained"
                        startIcon={<ArrowForwardIcon />}
                        onClick={() => handleJoinRoom(row.id)}
                      >
                        Tham gia
                      </Button>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        Chỉnh sửa
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDeleteRoom(row.id)}
                      >
                        Xóa
                      </Button>
                    </Stack>
                  )}
                  {user?.id !== row.hostId && (
                    <Stack
                      spacing={2}
                      direction="row"
                      justifyContent="center"
                      flexWrap={true}
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <Button
                        variant="contained"
                        startIcon={<ArrowForwardIcon />}
                        onClick={() => handleJoinRoom(row.id)}
                      >
                        Tham gia
                      </Button>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {roomList.length === 0 && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={4}
                  align="center"
                >
                  Chưa có phòng nào được tạo
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <RoomForm createNewRoom={createNewRoom} />
    </>
  );
}
