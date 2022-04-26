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
            src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/214457948_4175654659183351_1040944042328755814_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=1j27FI0CKogAX_GhUX6&_nc_ht=scontent.fsgn5-8.fna&oh=00_AT-ZmydfsZGT0R4UnuKf-qU6VdFFeKbzxP4AWCkh5vKOgg&oe=626C3E69"
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
