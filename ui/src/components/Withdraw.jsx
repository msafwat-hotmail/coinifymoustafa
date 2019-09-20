import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function Withdarw({ classes, notes, g20mm, le20mm }) {
  return (
    <Grid
      container
      spacing={3}
      style={{ marginTop: "16px", backgroundColor: "#DDD" }}
    >
      <Grid item xs={4}>
        <Paper className={classes.paper}>{notes ? notes : "-"}</Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper className={classes.paper}>{g20mm ? g20mm : "-"}</Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper className={classes.paper}>{le20mm ? le20mm : "-"}</Paper>
      </Grid>
    </Grid>
  );
}
