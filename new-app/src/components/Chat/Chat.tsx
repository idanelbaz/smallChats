import React, {useState, useEffect} from "react";
import "./Chat.css";
import socket from "../../services/socket.service";
import {Redirect} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {setChosenChat, setChatsList} from '../../store/actions/userActions';
import {getCurrUser, getChosenChat, getChatsList} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";
import util from "../../services/util";
import UserInChatLi from "./UserInChatLi";


const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector(getCurrUser);
    const chosenChat = useSelector(getChosenChat);
    const defaultChatsList = useSelector(getChatsList);
    const [newMsg, setNewMsg] = useState('');
console.log(chosenChat)
    useEffect(() => {
        socket.on("got msg", (chat: any) => {
            dispatch(setChosenChat(chat));
        });
        socket.on("user left", (chat: any) => {
            dispatch(setChosenChat(chat));
        });
        socket.on("user joined", (chat: any) => {
            dispatch(setChosenChat(chat));
        });
    }, [chosenChat, defaultChatsList]);

    useEffect(() => {
        if (chosenChat != null && chosenChat.msgs) {
            scrollToMsg();
        }
        return () => {
            if (currUser) {
                socket.emit("logout from room", chosenChat._id, currUser);
                dispatch(setChatsList());
            }
        }
    }, []);

    useEffect(() => {
        if (currUser === null) {
            history.push(`/home`);
        }
    }, [currUser]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let message = {user: currUser, txt: newMsg, _id: util.generateUUID()};
        socket.emit("chat msg", message, currUser, chosenChat._id);
        setNewMsg('');
        scrollToMsg();
    };

    const scrollToMsg = () => {
        const msgContainer = document.querySelector('.msgContainer');
        // const msgItem = document.getElementById(`chatMsgItemUser${messages.length - 1}`);
        if (msgContainer) {
            setTimeout(() => {
                // msgContainer.scrollTo(0, msgItem.offsetTop)
                msgContainer.scrollTo({top: msgContainer.scrollHeight, behavior: 'smooth'})
            }, 50);
        }
    };

    const handleSendMsg = (event: any) => {
        setNewMsg(event.target.value);
    };

    const setBackGroundColor = () => {
        return {
            background: `${chosenChat.backgroundColor}`
        } as React.CSSProperties
    };

    return (
        <>
            {currUser === null &&
            <Redirect to="/home"/>
            }
            {currUser != null && chosenChat != null &&
            <div className='chatContainer'>
                <form className='innerChatContainer' onSubmit={handleSubmit}>
                    <div className='msgContainer'>
                        {chosenChat.msgs.map((msg: any, idx: number) => {
                            if (msg.user._id === currUser._id) {
                                return <p id={'chatMsgItemUser' + idx} className='chatMsgItemUser'
                                          key={msg._id}>{msg.txt}</p>
                            } else {
                                return <p id={'chatMsgItemUser' + idx} className='chatMsgItemNotUser'
                                          key={msg._id}>{msg.user.username}: {msg.txt}</p>
                            }
                        })}
                    </div>
                    <input value={newMsg} onChange={handleSendMsg} type='text'/>
                    <button>Send</button>
                </form>
                <div className='chatSideContainer'>
                    <ul className='usersListContainer'>
                        {chosenChat.usersInRoom.map((user: any) => {
                            return <UserInChatLi user={user} key={user._id}/>
                        })
                        }
                    </ul>
                    <div className='chatNameLogo' style={setBackGroundColor()}>
                        {chosenChat.title}
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default Chat;
