import React, {useEffect} from "react";
import "./ChatsList.css";
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setChatsList} from '../../store/actions/userActions';
import {getChatsList, getCurrUser} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";
import ChatItemList from "../ChatItemList/ChatItemList";

const ChatsList: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector(getCurrUser);
    const chatsList = useSelector(getChatsList);


    useEffect(() => {
        if (currUser === null) {
            history.push(`/home`);
        }
        else {
            dispatch(setChatsList());
        }
    }, [currUser]);

    return (
        <>
            {currUser === null &&
            <Redirect to={'/home'}/>
            }
            {currUser != null &&
            <div className='listsContainer'>
                {chatsList.length > 0 &&
                <div className='chatsListContainer'>
                    {chatsList.map((chat: any) => {
                        if(chat.owner === 'admin') {
                            return <ChatItemList  key={chat._id} chat={chat}/>
                        }
                    })
                    }
                </div>
                }
                {chatsList.length > 0 &&
                <div className='userChatsListContainer'>
                    {chatsList.map((chat: any) => {
                        if(chat.owner === currUser._id) {
                            return <ChatItemList  key={chat._id} chat={chat}/>
                        }
                    })
                    }
                </div>
                }
            </div>
            }

        </>
    );
};

export default ChatsList;
