import React, {useEffect, useState} from "react";
import "./SignUp.css";
import {useSelector, useDispatch} from "react-redux";
import {signUpUser, setCurrUserFromStorage} from '../../store/actions/userActions';
import {getCurrUser} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";


const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newUser, setNewUser] = useState({username: '', password: '', userChats:[]});
    const currUser = useSelector(getCurrUser);

    useEffect(() => {
        dispatch(setCurrUserFromStorage());
        if (currUser) {
            history.push("/chatslist");
        }
    }, [currUser]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(signUpUser(newUser));
        history.push("/chatslist");
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
                    <label className='inputLabel'>User name</label>
                    <input required className='userInput' value={newUser.username} name="username"
                           onChange={handleChange}
                           type="text" placeholder="Your user name"/>
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
