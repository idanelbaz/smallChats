import React, {useState} from "react";
import "./Chat.css";
import socket from "../../services/socket.service";
import {Redirect} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {} from '../../store/actions/userActions';
import {getCurrUser, getChosenChat} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";

interface IUserInChatLiProps {
    user: any
}


const UserInChatLi: React.FC<IUserInChatLiProps> = ({user}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector(getCurrUser);
    const chosenChat = useSelector(getChosenChat);
    const [isUserModal, setisUserModal] = useState(false);

    const toggleUserModal = (event: any) => {
        if (event.target.className != "userItem") return;
        setisUserModal(!isUserModal);
    };

    const addFriend = () => {
        console.log(user)
    };

    const userNameToShow = (email: string) => {
        return email.substring(0, email.lastIndexOf("@"));
    };

    return (
        <>
            {user._id != currUser._id &&
            <li className='userItem' onClick={toggleUserModal}>{userNameToShow(user.email)}
                {isUserModal &&
                <div className="userItemModal">
                    <div className="addFriendContainer">
                        <div onClick={addFriend} title='Add Friend' className="addFriend"/>
                    </div>
                </div>
                }
            </li>
            }
            {user._id === currUser._id &&
            <li className='userItemIsUser'>{userNameToShow(user.email)}</li>
            }
        </>
    );
};

export default UserInChatLi;
