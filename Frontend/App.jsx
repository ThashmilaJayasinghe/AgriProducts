import React from 'react';
import NavBar from "./Components/NavBar";
import Cart from './Components/Cart'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import AddItemFarmer from "./Components/AddItemFarmer";
import Farmer from "./Components/Farmer";
import ViewItemFarmer from "./Components/ViewItemFarmer";
import AddQuantity from "./Components/AddQuantity";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Payment from "./pages/paymentPage/Payment";
import EditItemFarmer from "./Components/EditItemFarmer";

function App(){
    return(
        <div>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/Cart" element={<Cart/>}/>
                    {/*<Route path='/Dashboard' element={<Dashboard/>}*/}
                    <Route path="/FarmerHome" element ={<Farmer/>}/>
                    <Route path="/AddItem" element ={<AddItemFarmer/>}/>
                    <Route path="/AddQuantity/:id" element={<AddQuantity/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dash" element={<Dashboard/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/viewitem/:id" element={<ViewItemFarmer/>}/>
                    <Route path="/edititem/:id" element={<EditItemFarmer/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App;