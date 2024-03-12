import './App.css';
import Weather from './Weather'
import Hourly from './Hourly'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Weather/>
        <Hourly/>
      </header>
    </div>
  );
}

export default App;

