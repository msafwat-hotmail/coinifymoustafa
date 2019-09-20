import React from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

export default function ThankYouScreen({ classes }) {
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
        Thank You For Using Our Service!
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        style={{ textAlign: "center", width: "100%", color: "#ffc107" }}
      >
        We want to see you again :).
      </Typography>
    </>
  );
}
