import React, { useContext, useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { BookingContext } from "./BookingContext";
import Alert from "@material-ui/lab/Alert";

const ConfirmationBar = () => {
  const {
    status,
    actions: { removeConfirmation }
  } = useContext(BookingContext);

  return (
    <Snackbar
      open={status === "purchased" ? true : false}
      autoHideDuration={3000}
      onClose={removeConfirmation}
    >
      <Alert severity="success">Purchased successfuly. Enjoy!</Alert>
    </Snackbar>
  );
};

export default ConfirmationBar;
