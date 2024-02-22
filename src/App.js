import React from 'react';
import GameComponent from './GameComponent';
import GameMain from './GameMain';
import GameMain2 from './GameMain2';
import MatterJs from './MatterJs';

function App() {
  return (
    <div id='canvas'>
      <h1>React Phaser Game</h1>
      {/* <GameComponent /> */}
      <GameMain2 />
      {/* <MatterJs/> */}
    </div>
  );
}

export default App;
