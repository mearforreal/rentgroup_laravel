import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import { useHistory } from "react-router-dom";

function Logout() {
  let history = useHistory();
  function backToLogin() {
    history.push("/signup");
  }

  const dispatch = useDispatch();
  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          dispatch(logoutUser());
          backToLogin();
        }}
      >
        Выйти
      </Button>
    </div>
  );
}

export default Logout;
