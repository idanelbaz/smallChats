import React, {useEffect, useState} from "react";
import "./LogIn.css";
import {useSelector, useDispatch} from "react-redux";
import {logInUser, setCurrUserFromStorage, setErrorLogin} from '../../store/actions/userActions';
import {getCurrUser, getErrorLogin} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";
import swal from 'sweetalert';




const LogIn: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newUser, setNewUser] = useState({email: '', password: ''});
    const currUser = useSelector(getCurrUser);
    const errorLogin = useSelector(getErrorLogin);


    useEffect(() => {
        dispatch(setCurrUserFromStorage());
        if (currUser) {
            history.push("/chatslist");
        }
    }, [currUser]);

    useEffect(() => {
        if(errorLogin){
            swal("Try Again", "Email or Password are incorrect", "error");
            dispatch(setErrorLogin())
        }
    }, [errorLogin]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        dispatch(logInUser(newUser));
    };

    const handleChange = (event: any) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        });
    };

    const goToSignUp = () => {
        history.push("/home");
    };

    return (
        <>
            <div className='logInContainer'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <h2>Log In</h2>
                    <label className='inputLabel'>Email</label>
                    <input required className='userInput' value={newUser.email} name="email"
                           onChange={handleChange}
                           type="email" placeholder="Your Email"/>
                    <label className='inputLabel'>Password</label>
                    <input required className='userInput' value={newUser.password} name="password"
                           onChange={handleChange}
                           type="password" placeholder="Your password"/>
                    <button className='submitBtn'>Submit</button>
                </form>
                <a onClick={goToSignUp} className='signUpLink'>Don't have an account?</a>
            </div>
        </>
    );
};

export default LogIn;
