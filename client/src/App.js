import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation";
import SalesLeads from "./components/sales-leads";
import SideMenu from "./components/sidemenu";
import './App.scss'

import "./style.scss";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-section">
        <SideMenu />
        <SalesLeads />
      </div>
    </BrowserRouter>
  );
}

export default App;
