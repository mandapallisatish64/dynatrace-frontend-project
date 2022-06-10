import React from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from "./assets/dynatrace.png";
import AddSales from './components/add-sales-lead';
import SalesLeads from "./components/sales-leads";
import SideMenu from './components/sidemenu';
import "./style.scss";

export const RouterFile = () => {
    return (


        <div class="sales-lead container-fluid">
            <div class="row top-nav">
                <img className='dynatrace-logo' src={logo} />

            </div>
            <div class="row main-content-wrapper">
                <div class="col-2 no-float side-nav">
                    <SideMenu />
                </div>
                <div class="col-10 no-float actual-content">
                    <Routes>
                        <Route exact path="/" element={<SalesLeads />}></Route>
                        <Route exact path="/add" element={<AddSales />}></Route>
                    </Routes>
                </div>
            </div>
        </div>

    );
};



