import React, {useEffect} from "react";
import "./ChatsList.css";
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setUserChatsListFromLocal, setDefaultChatsList} from '../../store/actions/userActions';
import {getChatsList, getCurrUser, getUserChatList} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";
import ChatItemList from "../ChatItemList/ChatItemList";

const ChatsList: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector(getCurrUser);
    const chatsList = useSelector(getChatsList);
    const userChatsList = useSelector(getUserChatList);


    useEffect(() => {
        if (currUser === null) {
            history.push(`/home`);
        }
        else {
            dispatch(setDefaultChatsList());
            dispatch(setUserChatsListFromLocal());
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
                        return <ChatItemList  key={chat._id} chat={chat}/>
                    })
                    }
                </div>
                }
                {userChatsList.length > 0 &&
                <div className='userChatsListContainer'>
                    {userChatsList.map((chat: any) => {
                        return <ChatItemList key={chat._id} chat={chat}/>
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
