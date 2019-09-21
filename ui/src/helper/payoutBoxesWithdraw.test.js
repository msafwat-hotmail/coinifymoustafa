import payoutBoxesWithdraw from "./payoutBoxesWithdraw";

test("Tests withdraw with sufficient atm balance.", () => {
  let boxes = {
    1000: { type: "NOTES", avaliable: 1 },
    500: { type: "NOTES", avaliable: 2 },
    200: { type: "NOTES", avaliable: 3 },
    100: { type: "NOTES", avaliable: 4 },
    50: { type: "NOTES", avaliable: 5 },
    20: { type: "G20MM", avaliable: 6 },
    5: { type: "G20MM", avaliable: 7 },
    2: { type: "G20MM", avaliable: 8 },
    10: { type: "LE20MM", avaliable: 9 },
    1: { type: "LE20MM", avaliable: 10 }
  };

  let amount = 3000;

  const result = payoutBoxesWithdraw(boxes, amount);

  expect(result).not.toBeNull();
  expect(result).toBeDefined();

  // 1000 + 600 + 400 + 250 + 120 + 90 + 35 + 16 + 10 = 2521
  expect(result.result).not.toBeNull();
  expect(result.result).toBeDefined();
  expect(result.result).toEqual({
    "1000": 1,
    "500": 2,
    "200": 3,
    "100": 4
  });

  expect(result.boxes).not.toBeNull();
  expect(result.boxes).toBeDefined();
  expect(result.boxes).toEqual(boxes);
});

test("Tests withdraw with sufficient atm balance.", () => {
  let boxes = {
    1000: { type: "NOTES", avaliable: 1 },
    500: { type: "NOTES", avaliable: 2 },
    200: { type: "NOTES", avaliable: 3 },
    100: { type: "NOTES", avaliable: 4 },
    50: { type: "NOTES", avaliable: 5 },
    20: { type: "G20MM", avaliable: 6 },
    5: { type: "G20MM", avaliable: 7 },
    2: { type: "G20MM", avaliable: 8 },
    10: { type: "LE20MM", avaliable: 9 },
    1: { type: "LE20MM", avaliable: 10 }
  };

  let amount = 578;

  const result = payoutBoxesWithdraw(boxes, amount);

  expect(result).not.toBeNull();
  expect(result).toBeDefined();

  // 1000 + 600 + 400 + 250 + 120 + 90 + 35 + 16 + 10 = 2521
  expect(result.result).not.toBeNull();
  expect(result.result).toBeDefined();
  expect(result.result).toEqual({
    "1": 1,
    "2": 1,
    "20": 1,
    "5": 1,
    "50": 1,
    "500": 1
  });

  expect(result.boxes).not.toBeNull();
  expect(result.boxes).toBeDefined();
  expect(result.boxes).toEqual(boxes);
});

test("Tests withdraw with insufficient atm balance.", () => {
  let boxes = {
    1000: { type: "NOTES", avaliable: 1 },
    500: { type: "NOTES", avaliable: 0 },
    200: { type: "NOTES", avaliable: 3 },
    100: { type: "NOTES", avaliable: 4 },
    50: { type: "NOTES", avaliable: 5 },
    20: { type: "G20MM", avaliable: 6 },
    5: { type: "G20MM", avaliable: 7 },
    2: { type: "G20MM", avaliable: 8 },
    10: { type: "LE20MM", avaliable: 9 },
    1: { type: "LE20MM", avaliable: 10 }
  };

  let orignalBoxes = JSON.stringify(boxes);

  let amount = 3000;

  const result = payoutBoxesWithdraw(boxes, amount);

  expect(result).not.toBeNull();
  expect(result).toBeDefined();

  // 1000 + 600 + 400 + 250 + 120 + 90 + 35 + 16 + 10 = 2521
  expect(result.result).toBeNull();
  expect(result.result).toBeDefined();

  expect(result.boxes).not.toBeNull();
  expect(result.boxes).toBeDefined();
  expect(result.boxes).toEqual(JSON.parse(orignalBoxes));
});

test("Tests withdraw with sufficient atm balance and invalid amount.", () => {
  let boxes = {
    1000: { type: "NOTES", avaliable: 0 },
    500: { type: "NOTES", avaliable: 0 },
    200: { type: "NOTES", avaliable: 0 },
    100: { type: "NOTES", avaliable: 0 },
    50: { type: "NOTES", avaliable: 0 },
    20: { type: "G20MM", avaliable: 0 },
    5: { type: "G20MM", avaliable: 0 },
    2: { type: "G20MM", avaliable: 3 },
    10: { type: "LE20MM", avaliable: 0 },
    1: { type: "LE20MM", avaliable: 0 }
  };

  let orignalBoxes = JSON.stringify(boxes);

  let amount = 5;

  const result = payoutBoxesWithdraw(boxes, amount);

  expect(result).not.toBeNull();
  expect(result).toBeDefined();

  expect(result.result).toBeNull();
  expect(result.result).toBeDefined();

  expect(result.boxes).not.toBeNull();
  expect(result.boxes).toBeDefined();
  expect(result.boxes).toEqual(JSON.parse(orignalBoxes));
});

test("Tests withdraw with sufficient atm balance and 0 values.", () => {
  let boxes = {
    1000: { type: "NOTES", avaliable: 0 },
    500: { type: "NOTES", avaliable: 0 },
    200: { type: "NOTES", avaliable: 0 },
    100: { type: "NOTES", avaliable: 0 },
    50: { type: "NOTES", avaliable: 0 },
    20: { type: "G20MM", avaliable: 0 },
    5: { type: "G20MM", avaliable: 0 },
    2: { type: "G20MM", avaliable: 0 },
    10: { type: "LE20MM", avaliable: 0 },
    1: { type: "LE20MM", avaliable: 1 }
  };

  let orignalBoxes = JSON.stringify(boxes);

  let amount = 0;

  const result = payoutBoxesWithdraw(boxes, amount);

  expect(result).not.toBeNull();
  expect(result).toBeDefined();

  expect(result.result).not.toBeNull();
  expect(result.result).toBeDefined();

  expect(result.boxes).not.toBeNull();
  expect(result.boxes).toBeDefined();
  expect(result.boxes).toEqual(JSON.parse(orignalBoxes));
});
