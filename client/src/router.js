import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AddUser from './pages/AddUser';
import Home from "./pages/Home";
import "./style.scss";

export const RouterFile = () => {
    return (


        <div class="sales-lead container-fluid">
            <div class="row top-nav">
                <Header />

            </div>
            <div class="row main-content-wrapper">
                <div class="col-2 no-float side-nav">
                    <SideMenu />
                </div>
                <div class="col-10 no-float actual-content">
                    <Routes>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route exact path="/add" element={<AddUser />}></Route>
                    </Routes>
                </div>
            </div>
        </div>

    );
};



