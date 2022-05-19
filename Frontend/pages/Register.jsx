import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
// import {toast} from 'react-toastify'
// import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        role: ''
    })

    const {name, email, password, password2, role} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {

        if(isError) {
            // toast.error(message)
            alert(message)
        }

        if(isSuccess || user){
            console.log('success')
            navigate('/dash')
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

        if(password !== password2) {
            // toast.error('Passwords do not match')
            console.log('success')
            alert('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
                role
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className='container'>
        <div>
            <h1>
                {/*<FaUser />Register*/}
                Register
            </h1>
            <p>Please create an account</p>
        </div>

        <div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <input type="text"
                           className='form-control'
                           name="name"
                           id="name"
                           value={name}
                           placeholder='Enter your name'
                           onChange={onChange} />
                </div>
                <div className="mb-3">
                    <input type="email"
                           className='form-control'
                           name="email"
                           id="email"
                           value={email}
                           placeholder='Enter your email'
                           onChange={onChange} />
                </div>
                {/*<div className="mb-3">*/}
                {/*    <input type="text"*/}
                {/*           className='form-control'*/}
                {/*           name="role"*/}
                {/*           id="role"*/}
                {/*           value={role}*/}
                {/*           placeholder='Enter your role'*/}
                {/*           onChange={onChange} />*/}
                {/*</div>*/}
                <div className="mb-3">
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="role"
                        name="role"
                        required="required"
                        onChange={onChange}
                    >
                        <option disabled selected value>Do you wish to register as a buyer or farmer?</option>
                        <option value="buyer">buyer</option>
                        <option value="farmer">farmer</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input type="password"
                           className='form-control'
                           name="password"
                           id="password"
                           value={password}
                           placeholder='Enter password'
                           onChange={onChange} />
                </div>
                <div className="mb-3">
                    <input type="password"
                           className='form-control'
                           name="password2"
                           id="password2"
                           value={password2}
                           placeholder='Confirm password'
                           onChange={onChange} />
                </div>
                <div className="mb-3">
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
        </div>
    )

}

export default Register