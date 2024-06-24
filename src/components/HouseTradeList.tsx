import React, { useEffect, useState } from 'react';
import { getHouseTrades, Trade } from '../api/houseTrades';

const HouseTradeList: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const data = await getHouseTrades();
        const sortedData = data.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
        setTrades(sortedData);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchTrades();
    
  }, []);

  function formatRangeToK(range: string): string {
  const parts = range.split(' - ');

  const formattedParts = parts.map(part => {
      const cleanedPart = part.replace(/[^0-9.]/g, '');
      const num = parseFloat(cleanedPart);
      if (isNaN(num)) {
          return part;
      }
      if (num >= 1000) {
          return (num / 1000).toFixed(0) + 'k';
      }
      return num.toString();
  });
  return formattedParts.join(' - ');
}

  return (
    <div className="container mx-auto w-200">
      <ul role="list" className="divide-y max-w-64 max-h-96 overflow-auto divide-gray-300">
        <h1 className="text-2xl font-bold mb-4">Senate Trades</h1>
        {trades.map((trade, index) => (
          <a href={trade.link} className="block text-lg font-semibold text-blue-600" key={index}>
            <li className="flex justify-between py-1">
              <div className="flex min-w-0">
                <div className="min-w-0">
                  <div className="flex">
                    <p className="text-sm text-gray-900">{trade.ticker}</p>
                  </div>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{trade.transactionDate}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-xs text-gray-900">{trade.ticker}</p>
                {trade.type[0] === "P" ?
                <p className="mt-1 text-xs text-green-500">{trade.type}</p>
                :
                <p className="mt-1 text-xs text-red-500">{trade.type}</p>
                }
                <p className="mt-1 text-xs text-gray-500">{formatRangeToK(trade.amount)}</p>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default HouseTradeList;
