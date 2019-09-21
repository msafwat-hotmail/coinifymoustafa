export default function payoutBoxesWithdraw(boxes, amount) {
  let remaning = amount;
  let result = {};

  // Get notes and coins less than or equal the withdraw amount in desc order.
  const keys = Object.keys(boxes)
    .map(k => parseInt(k))
    .filter(k => k <= amount)
    .sort(function(a, b) {
      return b - a;
    });

  // Get snapshot to boxes with deep copy.
  let backup = JSON.stringify(boxes);

  // Until we have a remining we keep withdraw from boxes.
  let lastSeenCurrancy = 0;
  while (remaning > 0) {
    // if the note or coin not in the boxes, end upthis process and should return ATM insuffecient.
    if (!boxes[keys[lastSeenCurrancy]]) {
      break;
    }

    // Skip the note if not avaliable.
    if (
      keys[lastSeenCurrancy] > remaning ||
      boxes[keys[lastSeenCurrancy]].avaliable === 0
    ) {
      lastSeenCurrancy++;
    }

    // Do withdraw, and calculate the remining.
    else {
      remaning = remaning - keys[lastSeenCurrancy];
      boxes[keys[lastSeenCurrancy]].avaliable--;

      if (!result[keys[lastSeenCurrancy]]) result[keys[lastSeenCurrancy]] = 1;
      else result[keys[lastSeenCurrancy]] = result[keys[lastSeenCurrancy]] + 1;
    }
  }

  return {
    result: remaning > 0 ? null : result,
    boxes: remaning > 0 ? JSON.parse(backup) : boxes
  };
}
