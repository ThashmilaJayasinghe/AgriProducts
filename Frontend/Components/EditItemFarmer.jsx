import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function EditItemFarmer(){
    //const id = useParams();
    const [_id , setID] = useState('')
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        setID(localStorage.getItem('_id'))
        setTitle(localStorage.getItem('title'));
        setPrice(localStorage.getItem('price'));
        setDescription(localStorage.getItem('description'));
    },[])


    function sendData(e) {
        const newInventItem = {
            title,
            price,
            description
        }

        axios.put('http://localhost:8080/item/'+_id, newInventItem).then(() => {
            alert("Item details updated")
        }).catch((err) => {
            alert(err)
        })
    }

    return (
        <div className='container'>
            <h1>Edit Item Page</h1>

            <form >


                <div className="form-group col-md-6">
                    <label ><b>Item Name</b> </label>
                <input type="text" id="title"  class="form-control" placeholder="Enter Item Name" value={title}
                       onChange={(e) =>(
                           setTitle(e.target.value)
                       )}
                />
                    </div>


                <br/>

                <div className="form-group col-md-6">
                    <label><b>Price</b> </label>
                <input type="number"  step="any" id="price" class="form-control" placeholder="Enter Price" value={price}
                       onChange={ (e) =>(
                           setPrice(e.target.value)
                       )}
                />
                </div>

                <br/>
                <div className="form-group col-md-6">
                    <label><b>Description </b></label>
                <input type="text" id="description" class="form-control" placeholder="Enter Quantity" value={description}
                       onChange={(e)=>(
                           setDescription(e.target.value)
                       )}
                />
                </div>
                <br/>
                <br/>

                <center>
                    <Link to={'/FarmerHome'}>
                    <input type="submit" onClick={sendData}/>
                    </Link>
                </center>

                <br/>
                <Link to={'/FarmerHome'}>
                    <button>Back</button>
                </Link>

            </form>

        </div>
    )
}