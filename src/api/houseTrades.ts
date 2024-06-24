import axios from 'axios';

export interface Trade {
    disclosureDate: string;
    transactionDate: string;
    owner: string;
    ticker: string;
    assetDescription: string;
    type: string;
    amount: string;
    representative: string;
    district: string;
    link: string;
    comment: string;
    capitalGainsOver200USD: string;
}

export const getHouseTrades = async () => {
  const response = await axios.get<Trade[]>('/api/house-trades');
  return response.data;
};
