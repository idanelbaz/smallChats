import React, { useEffect} from "react";
import "./UserChats.css";
import {Redirect} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {getCurrUser} from "../../store/selectors/selectors.";
import { useHistory } from "react-router-dom";

const UserChats: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector(getCurrUser);



    useEffect(() => {
        if(currUser === null){
            history.push(`/home`);
        }
    }, [currUser]);

    return (
        <>
            {currUser === null &&
            <Redirect to="/home"/>
            }
            {currUser != null &&
            <div className='userChatsContainer'>

            </div>
            }
        </>
    );
};

export default UserChats;
