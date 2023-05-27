import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import "./index.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar = ({
  openSnackBar,
  setOpenSnackBar,
  snackBarStatus,
  snackBarText,
}) => {
  const handleClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        className="snack"
        onClose={handleClose}
        severity={snackBarStatus}
        sx={{ width: "100%" }}
      >
        {snackBarText}
      </Alert>
    </Snackbar>
  );
};
