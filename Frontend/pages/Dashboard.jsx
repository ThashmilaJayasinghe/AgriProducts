import {useState, useEffect} from 'react'
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth) //used to get the user

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        Axios.get("http://localhost:8000/item/")
            .then((res) => {
                setItems(res.data.existingPost)
                console.log(res.data.existingPost);
            })
    }, [user, navigate]);

    console.log('items state', items);

    return (
        <div>
            <div style={{marginTop:"40px", marginLeft:"50px"}}>
                {/* code below: if user (i.e. logged in), show name */}
                <h1 >Welcome {user && user.name}</h1>
                <p>Buyer Dashboard</p>
                <br/>
                <h3 className="page-header">
                    Agri Items
                </h3>
                <br/>
            </div>
            <div className="topnav__search" style={{marginLeft:"40px"}}>
                <input type="text" placeholder='Search By Title...' onChange={(e) => {
                    setSearch(e.target.value);
                }}/>
                <i className='bx bx-search'></i>
            </div>
            <br/>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <table className="table">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">View</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items
                                    .filter((item) => {
                                        if (search == "") {
                                            return item
                                        } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
                                            return item
                                        }
                                    })
                                    .map((item) => {

                                        const setItem = (item) => {
                                            let {_id, title, description, price, date_added} = item;
                                            console.log(_id);
                                            localStorage.setItem('id', _id);
                                            console.log(localStorage.getItem('id'));
                                            localStorage.setItem('title', title);
                                            localStorage.setItem('description', description);
                                            localStorage.setItem('price', price);
                                            localStorage.setItem('date_added', date_added);

                                        }

                                        return (
                                            <tr>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <Link to={'/AddQuantity/'+item._id}>
                                                        <button className='btnIcon' class="btn btn-success" onClick={() => setItem(item)}>
                                                            {/*<i className='bx bx-edit'></i>*/}
                                                            Add Quantity
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard