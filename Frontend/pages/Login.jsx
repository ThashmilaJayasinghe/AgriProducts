import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'



function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password, role} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {

        if(isError) {
            alert('Incorrect Credentials')
        }

        if(isSuccess || user){
            console.log('role', user.role)
            user.role === 'buyer' ? navigate('/dash') : navigate('/FarmerHome')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className='container' style={{marginTop:"30px", width:"70%",margin:"auto"}}>
        <div>
            <h1>
                Login
            </h1>
        </div>

        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group col-md-6">
                    <input type="email"
                           className='form-control'
                           name="email"
                           id="email"
                           value={email}
                           placeholder='Enter your email'
                           onChange={onChange} />
                </div>
                <br/>
                <div className="form-group col-md-6">
                    <input type="password"
                           className='form-control'
                           name="password"
                           id="password"
                           value={password}
                           placeholder='Enter password'
                           onChange={onChange} />
                </div>
                <br/>

                    <button type='submit' class="btn btn-success" >
                        Submit
                    </button>
            </form>
        </div>
    </div>
    )

}

export default Login