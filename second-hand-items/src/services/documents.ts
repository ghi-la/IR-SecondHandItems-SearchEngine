import axios from 'axios';
import dotenv from 'dotenv';

const PYTERRIER_API = 'http://localhost:8000';

dotenv.config();

export const getHealth = async () => {
  try {
    const response = await axios.get(`${PYTERRIER_API}/health`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching health:', error);
  }
};
export const fetchAllItems = async () => {
  try {
    const response = await axios.get(`${PYTERRIER_API}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
