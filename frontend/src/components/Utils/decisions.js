import axios from 'axios';

export const updatePlayerMoney = async (amount, updateMoneyCallback) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/stats/decision/subtract_money',
      { amount },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    updateMoneyCallback(response.data.new_balance);
  } catch (error) {
    console.error('Error subtracting money:', error);
  }
};