import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { RouterFile } from './router';
import "./style.scss";


function App() {
  return (
    <Router>
    <RouterFile />
  </Router>
  );
}

export default App;
