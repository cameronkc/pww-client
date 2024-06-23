import axios from 'axios';

export interface Trade {
  firstName: string;
  lastName: string;
  office: string;
  link: string;
  dateRecieved: string;
  transactionDate: string;
  owner: string;
  assetDescription: string;
  assetType: string;
  type: string;
  amount: string;
  comment: string;
  symbol: string;
}

export const getSenateTrades = async () => {
  const response = await axios.get<Trade[]>('/api/senate-trades');
  return response.data;
};
