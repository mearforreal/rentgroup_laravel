import React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "../../axios";
import requests from "../../apiRequest";

import PartsForm from "./PartsForm";
import { Button, DialogActions, DialogContent } from "@mui/material";

function PartDialog(props) {
  const { onClose, open, setAdded, added } = props;

  const handleClose = () => {
    onClose();
  };

  const hadleSubmit = (e) => {
    e.preventDefault();
    axios.post("/parts", newpart).then(() => {
      setAdded(!added);
      onClose();
    });
  };

  const [newpart, setNewpart] = React.useState({
    name: "",
    price: 0,
    manufacturer_id: 1,
  });

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <form onSubmit={hadleSubmit}>
          <DialogContent>
            <PartsForm newpart={newpart} setNewpart={setNewpart} />
          </DialogContent>

          <DialogActions>
            <Button type="submit" autoFocus>
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default PartDialog;
