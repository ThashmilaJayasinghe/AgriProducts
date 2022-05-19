import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function cart(){

    const [cartItems,setCartItems] = useState([])
    const [cartAll,setCartAll] = useState([])
    useEffect(()=>{
        const getCartItems = ()=>{
        axios.get('http://localhost:8000/cart/6')
            .then((res) =>{
                const all = res.data.bill;
                const data = res.data.items;
                const d = res.data;
                setCartItems(data);
                setCartAll(all);

                console.log(d)
                console.log(data)
                console.log(all)
            })
            .catch(()=>{
                alert('Error retriving data!!')
            })
    }
        getCartItems();
    },[])
    return(
        <div className="container">
            <table className="table">
            <thead>
        <tr>
            <th>Name of product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete Item</th>
            </tr>
        </thead>
                <tbody>

                    {
                        cartItems.map((data)=>{
                            return(
                                <tr>
                            <td>{data.title}</td>
                            <td>{data.price}</td>
                            <td>{data.quantity}</td>
                                </tr>
                            )
                        })
                    }
                    <h2>The total bill amount</h2>
                    <h5>Rs:{cartAll}</h5>
                </tbody>
                </table>
            <Link to='/payment'>
            <button>Set the Payment</button>
            </Link>

        </div>
    )
}