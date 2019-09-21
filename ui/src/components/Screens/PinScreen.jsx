import React from "react";

import Typography from "@material-ui/core/Typography";

export default function WelcomeScreen({
  classes,
  customer,
  pinLength,
  pinRetries
}) {
  let mask = "";
  for (let i = 0; i < pinLength; i++) {
    mask += "*";
  }

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: "center",
          padding: "16px",
          width: "100%",
          color: "white"
        }}
      >
        Welcome {customer.name}!
      </Typography>

      <Typography
        variant="h5"
        gutterBottom
        style={{ padding: "16px", width: "100%", color: "white" }}
      >
        Please Enter PIN Your Number: {mask}
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        style={{ padding: "16px", width: "100%", color: "#ffc107" }}
      >
        ({3 - pinRetries} PIN retries are left)
      </Typography>
    </>
  );
}
