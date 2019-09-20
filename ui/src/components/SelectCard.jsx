import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import CreditCard from "@material-ui/icons/CreditCard";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

export default function SelectCard({
  classes,
  showCustomersAccounts,
  handleClose,
  handleSetCustomer,
  customers
}) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={showCustomersAccounts}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="simple-dialog-title">
        Select An Account Card. (For Simulation Purpose Only)
      </DialogTitle>
      <List>
        {customers &&
          customers.map(c => (
            <ListItem
              button
              onClick={() => {
                handleSetCustomer(c);
                handleClose();
              }}
              key={c.accountNo}
            >
              <ListItemAvatar>
                <Avatar
                  className={classes.avatar}
                  style={{ backgroundColor: "#EEE" }}
                >
                  <CreditCard color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${c.name} - ${c.cardNo} - ${c.availableBalance}DKK`}
              />
            </ListItem>
          ))}

        {!customers && (
          <Typography variant="srOnly">
            No Customers Retrieved From Database.
          </Typography>
        )}
      </List>
    </Dialog>
  );
}
