import React from "react";

import Typography from "@material-ui/core/Typography";

export default function WithdrawScreen({
  classes,
  amount,
  customer,
  balanceInsufficient,
  atmInsufficient
}) {
  return (
    <>
      {!balanceInsufficient && !atmInsufficient && (
        <>
          <Typography
            variant="h5"
            gutterBottom
            style={{ padding: "16px", width: "100%", color: "white" }}
          >
            Please enter Amount: {amount} DKK
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            style={{ padding: "16px", width: "100%", color: "#ffc107" }}
          >
            Withdrawal Limit Per Transaction{" "}
            {customer.availableBalance >= 3000
              ? 3000
              : customer.availableBalance}{" "}
            DKK
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            style={{ padding: "16px", width: "100%", color: "#ffc107" }}
          >
            Avaliable Balance: {customer.availableBalance} DKK
          </Typography>
        </>
      )}

      {balanceInsufficient && (
        <Typography
          variant="h6"
          gutterBottom
          style={{ padding: "16px", width: "100%", color: "red" }}
        >
          Insufficient Balance!
        </Typography>
      )}

      {atmInsufficient && (
        <Typography
          variant="h6"
          gutterBottom
          style={{ padding: "16px", width: "100%", color: "red" }}
        >
          ATM Insufficient Balance!
        </Typography>
      )}
    </>
  );
}
