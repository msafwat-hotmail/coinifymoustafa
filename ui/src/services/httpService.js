import axios from "axios";

const getAccounts = async () => {
  let res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accounts`);
  return res.data;
};

const verifyPIN = async (accountNo, cardNo, pin) => {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/accounts/verifyPIN`,
    {
      accountNo,
      cardNo,
      pin
    }
  );
};

export { getAccounts, verifyPIN };
