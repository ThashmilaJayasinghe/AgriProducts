import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

export default function ViewItemFarmer(){
    const _id =useParams();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        setTitle(localStorage.getItem('title'));
        setPrice(localStorage.getItem('price'));
        setDescription(localStorage.getItem('description'));
    },[])

    return (
        <div className='container'>
            <h1>view item </h1>
            <br/>
            <form>


                <div className="form-group col-md-6">
                    <label><b>Item Name</b> </label>
                    <input type="text" id="title" className="form-control" placeholder="Enter Item Name"
                           value={title}
                    readOnly/>
                </div>


                <br/>

                <div className="form-group col-md-6">
                    <label><b>Price</b> </label>
                    <input type="text" id="price" className="form-control" placeholder="Enter Price" value={price}
                           readOnly/>
                </div>

                <br/>
                <div className="form-group col-md-6">
                    <label><b>Description </b></label>
                    <input type="text" id="description" className="form-control" placeholder="Enter Quantity"
                           value={description} readOnly/>
                </div>
                <br/>

                <br/>
                <Link to={'/FarmerHome'}>
                    <button class="btn btn-secondary">Back</button>
                </Link>

            </form>
            <br/><br/>


        </div>
    )
}