import React from "react";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

export default function Keyboard({
  classes,
  onCancel,
  onNumber,
  onClear,
  onWithdraw
}) {
  return (
    <Grid
      container
      spacing={3}
      style={{ marginTop: "16px", backgroundColor: "#AAA" }}
    >
      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(1)}
        >
          1
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(2)}
        >
          2
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(3)}
        >
          3
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onWithdraw}
        >
          Enter
        </Button>
      </Grid>

      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(4)}
        >
          4
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(5)}
        >
          5
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(6)}
        >
          6
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Grid>

      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(7)}
        >
          7
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(8)}
        >
          8
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(9)}
        >
          9
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.buttonError}
          onClick={onClear}
        >
          Clear
        </Button>
      </Grid>

      <Grid item xs={3}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onNumber(0)}
        >
          0
        </Button>
      </Grid>
      <Grid item xs={3}>
        {" "}
        <Button variant="contained" disabled className={classes.button}>
          *
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" disabled className={classes.button}>
          #
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" disabled className={classes.button}>
          Help
        </Button>
      </Grid>
    </Grid>
  );
}
