import { Box, Typography } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
function UserList({ userList }) {
  const renderUserList = () => {
    return userList.map((user, index) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }} key={index}>
          <Avatar
            alt="..."
            src="https://congcaphe.com/_next/static/images/vn-66e76189e15384f6034e56f129991d96.png"
          />
          <Typography variant="body1" sx={{ mx: 1 }}>
            {user.displayName}
          </Typography>
        </Box>
      );
    });
  };
  return <Box>{renderUserList()}</Box>;
}

export default UserList;
