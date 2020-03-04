import React, {useEffect, useState} from "react";
import "./SignUp.css";
import {useSelector, useDispatch} from "react-redux";
import {signUpUser, setCurrUserFromStorage, setErrorLogin} from '../../store/actions/userActions';
import {getCurrUser, getErrorLogin} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";
import swal from 'sweetalert';


const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newUser, setNewUser] = useState({email: '', password: '', userChats: [], isAdmin:false});
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
        await dispatch(signUpUser(newUser));
    };

    const handleChange = (event: any) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        });
    };

    const goToLogin = () => {
        history.push("/login");
    };

    return (
        <>
            <div className='SignUpContainer'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <h2>Sign up</h2>
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
                <a onClick={goToLogin} className='loginLink'>Already have an account?</a>
            </div>
        </>
    );
};

export default SignUp;
