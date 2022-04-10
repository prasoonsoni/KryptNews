import {Navbar, Welcome, Footer, Services, News} from './components';
// import './App.css';
import './index.css'

function App() {
  return (
    <div className="mih-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <News/>
    </div>
  );
}

export default App;
