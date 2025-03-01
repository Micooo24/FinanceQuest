import axios from 'axios';

export const quest1Decision = async (decision, updateStatsCallback) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/stats/decision/q1',
      { decision },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    updateStatsCallback(response.data.updatedStats);
  } catch (error) {
    console.error('Error processing Q1 decision:', error);
  }
};

export const updatePlayerMoneyAfterGrocery = async (totalSpent, updateMoneyCallback) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/stats/decision/grocery_selection',
      { total_spent: totalSpent },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log('Response data:', response.data);
    updateMoneyCallback(response.data.new_balance);
  } catch (error) {
    console.error('Error updating money after grocery selection:', error);
  }
};

export const quest2Decision = async (decision, deposit, updateStatsCallback) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/stats/decision/q2',
      { decision, deposit },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    updateStatsCallback(response.data.updatedStats);
    return response.data;
  } catch (error) {
    console.error('Error processing Q2 decision:', error);
  }
};

export const sq2Decision = async (decision, updateStatsCallback) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/stats/decision/sq2',
      { decision },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    updateStatsCallback(response.data.updatedStats);
    return response.data;
  } catch (error) {
    console.error('Error processing SQ2 decision:', error);
  }
};