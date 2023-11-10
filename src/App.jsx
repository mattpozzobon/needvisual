import React from 'react';
import { InventoryProvider } from './Database/Inventory';
import Game from './Components/Game';

function App() {
  return (
    <InventoryProvider>
      <Game></Game>
    </InventoryProvider>
  );
};

export default App;
