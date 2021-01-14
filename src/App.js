import './App.css';
import Header from './Components/Header'
import Dashboard from './Pages/Dashboard';
function App() {
  return (
    <div>
     <Header />
     <div className='container'>
       <Dashboard />
     </div>
    </div>
  );
}

export default App;
