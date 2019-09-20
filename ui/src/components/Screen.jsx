import React from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import WelcomeScreen from "./Screens/WelcomeScreen";
import PinScreen from "./Screens/PinScreen";
import WithdrawScreen from "./Screens/WithdrawScreen";
import ThankYouScreen from "./Screens/ThankYouScreen";

export default function Screen({
  classes,
  currentScreen,
  customer,
  pin,
  pinValid,
  pinRetries,
  amount,
  balanceInsufficient,
  atmInsufficient
}) {
  return (
    <Grid
      container
      spacing={3}
      style={{
        marginTop: "16px",
        backgroundColor: "#263238",
        height: "40%",
        textAlign: "center"
      }}
    >
      {currentScreen === 0 && <WelcomeScreen />}
      {currentScreen === 1 && (
        <PinScreen
          classes={classes}
          customer={customer}
          pinLength={pin.length}
          pinRetries={pinRetries}
        />
      )}
      {currentScreen === 2 && (
        <WithdrawScreen
          classes={classes}
          amount={amount}
          customer={customer}
          balanceInsufficient={balanceInsufficient}
          atmInsufficient={atmInsufficient}
        />
      )}
      {currentScreen === 3 && <ThankYouScreen classes={classes} />}
    </Grid>
  );
}
