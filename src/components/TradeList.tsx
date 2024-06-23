import React, { useEffect, useState } from 'react';
import { getSenateTrades, Trade } from '../api/senateTrades';

const TradeList: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const data = await getSenateTrades();
        // Sort trades by transactionDate in descending order
        const sortedData = data.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
        setTrades(sortedData);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Senate Trades</h1>
      <ul className="space-y-4">
        {trades.map((trade, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <a href={trade.link} className="block text-lg font-semibold text-blue-600">
              {trade.firstName} {trade.lastName} ({trade.office})
            </a>
            <p className="text-gray-700">Transaction Date: {trade.transactionDate}</p>
            <p className="text-gray-700">Owner: {trade.owner}</p>
            <p className="text-gray-700">Asset: {trade.assetDescription}</p>
            <p className="text-gray-700">Type: {trade.type}</p>
            <p className="text-gray-700">Amount: {trade.amount}</p>
            <p className="text-gray-700">Symbol: {trade.symbol}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeList;
