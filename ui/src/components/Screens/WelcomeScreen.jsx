import React from "react";

import Typography from "@material-ui/core/Typography";

export default function WelcomeScreen({ classes }) {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: "center",
          paddingTop: "128px",
          width: "100%",
          color: "white"
        }}
      >
        Welcome to Coinify ATM!
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        style={{ textAlign: "center", width: "100%", color: "#ffc107" }}
      >
        Please insert your card.
      </Typography>
    </>
  );
}
