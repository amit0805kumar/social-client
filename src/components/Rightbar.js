import React from "react";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Users } from "../dummyData";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="birthdayWrapper">
        <img src="https://media.tenor.com/btmyl_V4L4gAAAAj/birthday-bday.gif" />
        <p>
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </p>
      </div>
      <div className="adWrapper">
        <img
          alt="ad"
          src="https://i.pinimg.com/originals/31/28/5d/31285de4c567d02b72f4c962645e7abb.gif"
        />
      </div>
      <div className="friendsWrapper">
        <h3>Friends online</h3>
        {Users.map((user) => {
          return (
            <div className="list" key={user.id}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar alt={user.username} src={user.profilePicture} />
              </StyledBadge>
              <p>{user.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
