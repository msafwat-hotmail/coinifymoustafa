import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import "./App.css";

import Keyboard from "./components/Keyboard";
import Withdraw from "./components/Withdraw";
import CardSlot from "./components/CardSlot";
import Screen from "./components/Screen";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Copyright from "@material-ui/icons/Copyright";

import { getAccounts, verifyPIN } from "./services/httpService";
import Typography from "@material-ui/core/Typography";

import payoutBoxesWithdraw from "./helper/payoutBoxesWithdraw";

export default function App() {
  const classes = useStyles();

  const [currentScreen, setCurrentScreen] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [pin, setPin] = useState("");
  const [pinRetries, setPinRetries] = useState(0);
  const [amount, setAmount] = useState("");
  const [customers, setCustomers] = useState(null);

  const [notes, setNotes] = useState("");
  const [g20mm, setG20mm] = useState("");
  const [le20mm, setLe20mm] = useState("");

  const [balanceInsufficient, setBalanceInsufficient] = useState(false);
  const [atmInsufficient, setAtmInsufficient] = useState(false);

  const genRandomNo = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [boxes, setBoxes] = useState({
    1000: { type: "NOTES", avaliable: genRandomNo(0, 2) },
    500: { type: "NOTES", avaliable: genRandomNo(0, 4) },
    200: { type: "NOTES", avaliable: genRandomNo(0, 8) },
    100: { type: "NOTES", avaliable: genRandomNo(0, 16) },
    50: { type: "NOTES", avaliable: genRandomNo(0, 32) },
    20: { type: "G20MM", avaliable: genRandomNo(0, 64) },
    5: { type: "G20MM", avaliable: genRandomNo(0, 64) },
    2: { type: "G20MM", avaliable: genRandomNo(0, 64) },
    10: { type: "LE20MM", avaliable: genRandomNo(0, 64) },
    1: { type: "LE20MM", avaliable: genRandomNo(0, 64) }
  });

  const handleInsertCard = () => {
    setPin("");
    setPinRetries(0);
    setAmount("");
    setCurrentScreen(0);
  };

  const handleCancel = () => {
    setCustomer({});
    setPin("");
    setPinRetries(0);
    setAmount("");
    setCurrentScreen(0);
  };

  const handleClear = () => {
    if (currentScreen === 1) {
      setPin("");
    } else if (currentScreen === 2) {
      setAmount("");
    }
  };

  const handleWithdraw = () => {
    if (
      currentScreen === 2 &&
      amount &&
      !atmInsufficient &&
      !balanceInsufficient
    ) {
      let amountInt = parseInt(amount);
      // let remaning = amountInt;
      // let result = {};

      let total = 0;
      for (let [key, value] of Object.entries(boxes)) {
        total += value.avaliable * parseInt(key);
      }

      const atmInSuf = total < amountInt;
      setAtmInsufficient(atmInSuf);
      if (atmInSuf) {
        setTimeout(function() {
          setPin("");
          setPinRetries(0);
          setAmount("");
          setCurrentScreen(0);
          setAtmInsufficient(false);
          setBalanceInsufficient(false);
        }, 10000);
        return;
      }

      let result = payoutBoxesWithdraw(boxes, amountInt);

      if (!result.result || Object.keys(result.result).length === 0) {
        setBoxes(result.boxes);
        setAtmInsufficient(true);
        setTimeout(function() {
          setPin("");
          setPinRetries(0);
          setAmount("");
          setCurrentScreen(0);
          setAtmInsufficient(false);
          setBalanceInsufficient(false);
        }, 10000);
      } else {
        let notesText = "";
        let g20mmText = "";
        let le20mmText = "";

        let entries = Object.entries(result.result);
        entries.sort(function(first, second) {
          return second[0] - first[0];
        });
        entries.forEach(([key, value]) => {
          if (boxes[key].type === "NOTES") notesText += `${value}x${key} `;
          else if (boxes[key].type === "G20MM") g20mmText += `${value}x${key} `;
          else if (boxes[key].type === "LE20MM")
            le20mmText += `${value}x${key} `;
        });

        setNotes(notesText);
        setG20mm(g20mmText);
        setLe20mm(le20mmText);
        setCurrentScreen(3);

        customer.availableBalance -= amountInt;

        customers.filter(
          x => x.cardNo === customer.cardNo
        )[0].availableBalance -= amountInt;

        setTimeout(function() {
          setCurrentScreen(0);
        }, 30 * 1000);
      }
    }
  };

  const handleNumberKeys = n => {
    if (currentScreen === 1) {
      setPin(pin + n);

      if (pin.length === 3) {
        validatePin(pin + n);
      }
    } else if (currentScreen === 2) {
      if (parseInt(amount + n) <= 3000) {
        setAmount(amount + n);
      }
    }
  };

  const validateWithdraw = () => {
    const balInsuf =
      !customer.availableBalance || customer.availableBalance === 0;

    setBalanceInsufficient(balInsuf);

    if (balInsuf) {
      setTimeout(function() {
        setPin("");
        setPinRetries(0);
        setAmount("");
        setCurrentScreen(0);
        setAtmInsufficient(false);
        setBalanceInsufficient(false);
      }, 10000);
    }
  };

  const validatePin = pinToValidate => {
    verifyPIN(customer.accountNo, customer.cardNo, pinToValidate)
      .then(r => {
        if (r.status === 200) {
          validateWithdraw();
          setCurrentScreen(2);
        } else if (pinRetries < 2) {
          setPin("");
          setPinRetries(pinRetries + 1);
        } else handleCancel();
      })
      .catch(e => {
        if (e.toString().includes("400") && pinRetries < 2) {
          setPin("");
          setPinRetries(pinRetries + 1);
        } else handleCancel();
      });
  };

  const handleSetCustomer = customer => {
    setCustomer({ ...customer });
    setCurrentScreen(1);
  };

  useEffect(() => {
    getAccounts()
      .then(r => setCustomers(r))
      .catch(e => alert(e));
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md" style={{ height: "100vh" }}>
        <Grid container spacing={3} style={{ height: "100vh" }}>
          <Grid item xs={8}>
            <Screen
              classes={classes}
              currentScreen={currentScreen}
              customer={customer}
              pin={pin}
              pinRetries={pinRetries}
              amount={amount}
              balanceInsufficient={balanceInsufficient}
              atmInsufficient={atmInsufficient}
            />

            <CardSlot
              classes={classes}
              currentScreen={currentScreen}
              onInsertCard={handleInsertCard}
              handleSetCustomer={handleSetCustomer}
              customers={customers}
            />

            {currentScreen === 3 && (
              <Withdraw
                classes={classes}
                notes={notes}
                g20mm={g20mm}
                le20mm={le20mm}
              />
            )}

            <Keyboard
              classes={classes}
              onCancel={handleCancel}
              onNumber={handleNumberKeys}
              onClear={handleClear}
              onWithdraw={handleWithdraw}
            />
          </Grid>
          <Grid item xs={4}>
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#EEE" }}>
                    <AttachMoney color="primary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Notes Avaliable"
                  secondary={
                    <React.Fragment>
                      <Typography variant="subtitle2" gutterBottom>
                        1000DKK / {boxes[1000].avaliable}PC
                      </Typography>
                      <br />
                      <Typography variant="subtitle2" gutterBottom>
                        500DKK / {boxes[500].avaliable}PC
                      </Typography>
                      <br />
                      <Typography variant="subtitle2" gutterBottom>
                        200DKK / {boxes[200].avaliable}PC
                      </Typography>
                      <br />
                      <Typography variant="subtitle2" gutterBottom>
                        100DKK / {boxes[100].avaliable}PC
                      </Typography>
                      <br />
                      <Typography variant="subtitle2" gutterBottom>
                        50DKK / {boxes[50].avaliable}PC
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#EEE" }}>
                    <Copyright color="primary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Coins Avaliable"
                  secondary={
                    <React.Fragment>
                      <Typography variant="subtitle2" gutterBottom>
                        20DKK (40mm) / {boxes[20].avaliable}PC
                      </Typography>
                      <br />

                      <Typography variant="subtitle2" gutterBottom>
                        10DKK (20mm) / {boxes[10].avaliable}PC
                      </Typography>
                      <br />

                      <Typography variant="subtitle2" gutterBottom>
                        5DKK (5mm) / {boxes[5].avaliable}PC
                      </Typography>
                      <br />

                      <Typography variant="subtitle2" gutterBottom>
                        2KK (30mm) / {boxes[2].avaliable}PC
                      </Typography>
                      <br />

                      <Typography variant="subtitle2" gutterBottom>
                        1KK (10mm) / {boxes[1].avaliable}PC
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "100%"
  },
  buttonError: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "100%",
    color: "white",
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: "#E64A19"
    }
  },
  buttonWhite: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "100%",
    color: "#000000",
    backgroundColor: "#FFF",
    "&:hover": {
      backgroundColor: "#FAFAFA"
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));
