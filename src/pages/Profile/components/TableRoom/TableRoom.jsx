import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Divider, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { createRoom } from "../../../../store/actions/room.action";

function createData(stt, tenPhong, actions) {
  return { stt, tenPhong, actions };
}
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  createData("01", "Office 365"),
  createData("02", "KM19"),
  createData("01", "Office 365"),
  createData("02", "KM19"),
  createData("01", "Office 365"),
  createData("02", "KM19"),
  createData("01", "Office 365"),
  createData("02", "KM19"),
  createData("01", "Office 365"),
  createData("02", "KM19"),
  createData("01", "Office 365"),
  createData("02", "KM19"),
  createData("01", "Office 365"),
  createData("02", "KM19"),
];
const rowss = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: (
      <Stack
        spacing={2}
        direction="row"
        justifyContent="flex-end"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Button variant="contained" startIcon={<ArrowForwardIcon />}>
          Tham gia
        </Button>
        <Button variant="outlined" startIcon={<EditIcon />}>
          Chỉnh sửa
        </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
          Xóa
        </Button>
      </Stack>
    ),
  },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export default function TableRoom({ roomList, socket }) {
  const dispatch = useDispatch();
  const createNewRoom = async (data) => {
    await dispatch(createRoom(data));
    socket.emit("new-room-created", data);
  };
  return (
    <>
      <Button
        onClick={() =>
          createNewRoom({
            name: "Phòng mới",
            hostId: 1,
          })
        }
      >
        Tạo phòng mới
      </Button>
      <TableContainer component={Paper} sx={{ border: "5px" }}>
        <Table sx={{ minWidth: 650, width: "80%", margin: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Tên phòng</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList?.map((row, index) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">
                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <Button variant="contained" startIcon={<ArrowForwardIcon />}>
                      Tham gia
                    </Button>
                    <Button variant="outlined" startIcon={<EditIcon />}>
                      Chỉnh sửa
                    </Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
                      Xóa
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {roomList.length === 0 && (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" colSpan={3} align="center">
                  Chưa có phòng nào được tạo
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
