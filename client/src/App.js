import GetCashflow from "./componets/GetCashflows";
import GetCashflowsAmount from './componets/GetCashflowsAmount';
import './App.css';

function App() {  
  


  return (
    <div className="App">
      <section className='imgs'>
      <h1 className='title'>FINANCE TRACKER</h1>

      <div className='main'>
          <div className='totalContainer'>
            <GetCashflowsAmount/>
          </div>
          <div>
            <h2 className="cf-title">CASHFLOW</h2>
          </div>
          <div>
            <GetCashflow/>
          </div>
        
      </div>

      </section>      
    </div>
  );
}

export default App;