import { Box, Typography } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
function UserList({ userList }) {
  const renderUserList = () => {
    return userList.map((user) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Avatar
            alt="Remy Sharp"
            src="http://www.thongtincongnghe.com/sites/default/files/images/2012/8/2/img-1343882449-1.jpg"
          />
          <Typography variant="body1" sx={{ mx: 1 }}>
            {user.username}
          </Typography>
        </Box>
      );
    });
  };
  return <Box>{renderUserList()}</Box>;
}

export default UserList;
