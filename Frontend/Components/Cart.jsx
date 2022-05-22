import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

export default function cart(){

    const {user} = useSelector((state) => state.auth)
    const [cartItems,setCartItems] = useState([])
    const [cartAll,setCartAll] = useState([])
    useEffect(()=>{
        const getCartItems = ()=>{
        axios.get('http://localhost:8000/cart/'+user._id)
            .then((res) =>{
                const all = res.data.bill;
                const data = res.data.items;
                const d = res.data;
                setCartItems(data);
                setCartAll(all);

                console.log(res);
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
        <div className="container" style={{marginTop:"40px"}}>
            <table className="table">
            <thead>
        <tr>
            <th>Name of product</th>
            <th>Price</th>
            <th>Quantity</th>
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
                    <br/>
                    <h2>The total bill amount</h2>
                    <h5>Rs:{cartAll}</h5>
                </tbody>
                </table>
            <Link to='/payment'>
            <button class="btn btn-success">Set the Payment</button>
            </Link>

        </div>
    )
}