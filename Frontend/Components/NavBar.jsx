import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout, reset} from "../features/auth/authSlice";

export default function NavBar(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/dash')
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <a className="navbar-brand" href="#">Agri Products</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {user && user.role === 'buyer' ? (<>
                            <li className="nav-item active">
                                <a className="nav-link" href="/dash">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Cart">Cart</a>
                            </li>
                            <li>
                                <button className='btn' onClick={onLogout}>
                                    Logout
                                </button>
                            </li>
                        </>) : user && user.role === 'farmer' ? (<>
                                <li className="nav-item">
                                    <a className="nav-link" href="/FarmerHome">Farmer</a>
                                </li>
                                <li>
                                    <button className='btn' onClick={onLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>) : (<>
                            <li className="nav-item active">
                                <a className="nav-link" href='/'>
                                    Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='/register'>
                                    Register
                                </a>
                            </li>
                        </>)}
                    </ul>
                </div>
            </nav>
        </div>
    )

}