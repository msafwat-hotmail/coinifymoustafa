import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import SelectCard from "./SelectCard";

export default function CardSlot({
  classes,
  onInsertCard,
  currentScreen,
  handleSetCustomer,
  customers
}) {
  const [showCustomersAccounts, setShowCustomersAccounts] = useState(false);

  const handleClose = () => {
    setShowCustomersAccounts(false);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        style={{ marginTop: "16px", backgroundColor: "#DDD" }}
      >
        <Grid item xs={12}>
          <Button
            variant="contained"
            className={classes.buttonWhite}
            onClick={() => {
              onInsertCard();
              setShowCustomersAccounts(true);
            }}
            disabled={currentScreen !== 0}
          >
            Card Slot (Simulate insert a card)
          </Button>
        </Grid>
      </Grid>
      <SelectCard
        classes={classes}
        showCustomersAccounts={showCustomersAccounts}
        handleClose={handleClose}
        customers={customers}
        handleSetCustomer={handleSetCustomer}
      />
    </>
  );
}
