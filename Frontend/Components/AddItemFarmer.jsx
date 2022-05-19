import React, {useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default function AddItemFarmer(){

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescrip] = useState("");

    const handleSubmit = (event) => {
        const newItem = {
            title,
            price,
            description
        }

        axios.post('http://localhost:8080/item', newItem).then(()=>{
            alert(`The item added Successfully`)
            window.location.href = "/FarmerHome";

        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div className='container'>
            <h2>Add Item</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group col-md-6">
                    <label><b>Item Title</b> </label>
                <input type="text" id="title" class="form-control" placeholder="Enter Item Title here.." value={title}
                       onChange={(e) =>(
                           setTitle(e.target.value)
                       )}
                />
                </div>
                <br/>

                <div className="form-group col-md-6">
                    <label><b>Price </b></label>
                <input type="number"  step="any" id="price" class="form-control" placeholder="Enter Price" value={price}
                       onChange={ (e) =>(
                           setPrice(e.target.value)
                       )}
                />
                </div>
                <br/>

                <div className="form-group col-md-6">
                    <label><b>Description</b> </label>
                <input type="text" id="description" class="form-control" placeholder="Enter Description" value={description}
                       onChange={(e)=>(
                           setDescrip(e.target.value)
                       )}
                />
                </div>
                <br/>
                <br/>
                <center>
                    <input type="submit"/>
                </center>

            </form>

            <br/>
            <Link to={'/FarmerHome'}>
                <button >Back</button>
            </Link>
        </div>
    )
}