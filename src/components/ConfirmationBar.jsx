import React, { useContext, useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { BookingContext } from "./BookingContext";
import Alert from "@material-ui/lab/Alert";

const ConfirmationBar = () => {
  const {
    status,
    actions: { removeConfirmation }
  } = useContext(BookingContext);
  //console.log("looking for purchased from status update", status)
  console.log(status);
  const [open, setOpen] = useState(false);

  //ask if this is good
  useEffect(() => {
    if (status === "purchased") {
      setOpen(true);
    } else if (status === "idle") {
      setOpen(false);
    }
  });

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={removeConfirmation}>
      <Alert severity="success">Purchased successfuly. Enjoy!</Alert>
    </Snackbar>
  );
};

export default ConfirmationBar;
