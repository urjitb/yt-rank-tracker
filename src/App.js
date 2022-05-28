import './App.css';
import Navbar from './components/Navbar'
import Content from './components/Content';
import Powermode from './components/Powermode';
import { useState } from 'react';

function App() {

  const [powermode, setPowermode] = useState(false)

  function handlePowerMode(){
    console.log("handlepowermode")
    setPowermode(!powermode)
  }
  return (
    <div className="App">
      <Navbar power={handlePowerMode}/>
      {powermode ? <Powermode/> : <Content />}
      
    </div>
  );
}

export default App;
