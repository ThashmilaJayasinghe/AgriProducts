import React from 'react';
import NavBar from "./Components/NavBar";
import Cart from './Components/Cart'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import AddItemFarmer from "./Components/AddItemFarmer";
import Farmer from "./Components/Farmer";
import ViewItemFarmer from "./Components/ViewItemFarmer";
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App(){
    return(
        <div>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/Cart" element={<Cart/>}/>
                    <Route path="/FarmerHome" element ={<Farmer/>}/>
                    <Route path="/AddItem" element ={<AddItemFarmer/>}/>
                    <Route path="/viewitem/:id" element={<ViewItemFarmer/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dash" element={<Dashboard/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App;