import React from 'react';
import TradeList from './components/TradeList';
import HouseTradeList from './components/HouseTradeList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <TradeList />
      <HouseTradeList />
    </div>
  );
};

export default App;
