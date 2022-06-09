import React from 'react';
import { Route, Routes } from 'react-router-dom';
import dynatrace from './assets/dynatrace.png';
import AddSales from './components/add-sales-lead';
import SalesLeads from "./components/sales-leads";
import SideMenu from './components/sidemenu';
import "./style.scss";

export const RouterFile = () => {
    return (


        <div class="container">
            <div class="row top-nav">

            <img className="image" src={dynatrace} alt="BigCo Inc. logo"/>
                <p>this is top navigation</p>
            </div>
            <div class="row">
                <div class="col-2 first-ele">
                    <SideMenu />
                </div>
                <div class="col-10">
                    <Routes>
                        <Route exact path="/" element={<SalesLeads />}></Route>
                        <Route exact path="/add" element={<AddSales />}></Route>
                    </Routes>
                </div>
            </div>
        </div>

    );
};



{/* <div className="app-section">
          <div className='top-nav'>
              <p>this is top navigation</p>
          </div>
          <div className='side-bar'>
        <SideMenu />
        </div>
        <div className='real-content'>
        <Routes>
        <Route exact path="/" element={<SalesLeads />}></Route>
        <Route exact path="/add" element={<AddSales />}></Route>
        </Routes>
        </div>
       
      </div>
       */}