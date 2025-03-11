import GetCashflow from './componets/GetCashflows';
import GetCashflowsAmount from './componets/GetCashflowsAmount';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className='imgs'>
      <h1 className='title'>FINANCE TRACKER</h1>

      <div className='main-body'>
        <div className='totalContainer'>
          <GetCashflowsAmount/>
        </div>
        <div>
          <h2 style={{ height: "50px", width: "50%", textAlign: "center", marginBottom: "10px"}} className="cf-title">CASHFLOW</h2>
          <div>
            <GetCashflow />
          </div>      
        </div>
    
      </div>

      </section>      
    </div>
  );
}

export default App;
