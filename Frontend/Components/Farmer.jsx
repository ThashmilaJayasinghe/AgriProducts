import React from "react";
import {useEffect,useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Item(){

    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth) //used to get the user

    const [items, setItems] = useState([]);

    useEffect(() =>{

        if(!user) {
            navigate('/')
        }

        function getItems(){
            axios.get("http://localhost:8080/item").then((res) => {
                console.log(res.data);
                setItems(res.data.existingPost);
            }).catch( (err) => {
                alert(err.message);
            })
        }
        getItems();
    }, [user, navigate])

    return(
        <div className="container">
            <center>
                <h1>Welcome to Farmer Home Page</h1>
            </center>
            <br/>
            <Link to={'/AddItem'}>
                <button class="btn btn-success">Add Item</button>
            </Link>
            <br/>
            <center>
                <u>
                    <h2>Listed Items</h2>
                </u>

            </center>

            <br/>

            <table className="table">
                <thead>
                <tr>
                    <th> index</th>
                    <th>Item name</th>
                    <th>price</th>
                    <th>Description</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>
                </thead>
                <tbody>
                {items.map((item, index)=> {

                    const passItem = (item) =>{
                        let {_id, title, price, description} = item;
                        console.log(_id);
                        localStorage.setItem('_id',_id)
                        localStorage.setItem('title',title)
                        localStorage.setItem('price',price)
                        localStorage.setItem('description',description)
                    }
                    //getItems
                    const getItems = () => {
                        axios.get("http://localhost:8080/item")
                            .then((getItems) => {
                                setItems(getItems.data.existingPost);
                            })
                    }

                    const onDelete = (id) => {
                        if (window.confirm("Are you want to delete  - "+item.title)){
                            axios.delete("http://localhost:8080/item/" +id)
                                .then(() => {
                                    getItems();
                                })
                        }
                    }

                    return (
                        <tr>
                            <td key={index}>{index+1}</td>
                            <td>{item.title}</td>
                            <td>Rs. {item.price}</td>
                            <td>{item.description}</td>

                            <td>
                                <Link to={'/viewitem/'+item._id}>
                                    <button onClick={()=>passItem(item)} class="btn btn-success">View</button>
                                </Link>
                            </td>

                            <td>
                                <Link to={'/edititem/'+item._id}>
                                    <button onClick={()=>passItem(item)} class="btn btn-secondary">Edit</button>
                                </Link>
                            </td>

                            <td>
                                <button onClick={()=>onDelete(item._id)} class="btn btn-danger">Delete</button>
                            </td>

                        </tr>

                    )
                })}
                </tbody>
            </table>

            <br/>
            <br/>

        </div>


    )
}