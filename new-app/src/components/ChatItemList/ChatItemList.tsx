import React from "react";
import "./ChatItemList.css";
import {useDispatch, useSelector} from "react-redux";
import {setChosenChat} from "../../store/actions/userActions";
import socket from "../../services/socket.service";
import {getCurrUser} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";

interface IChatItemListProps {
    chat: any
}

const ChatItemList: React.FC<IChatItemListProps> = ({chat}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector(getCurrUser);

    const setBackGroundColorToDefaultChats = () => {
        return {
            background: `${chat.backgroundColor}`
        } as React.CSSProperties
    };

    const handleClick = () => {
        dispatch(setChosenChat(chat));
        socket.emit('user join room', chat._id, currUser);
        history.push(`/chat/${chat.title}`);
    };

    const handleTxt = () => {
        let newStr ='';
        if (chat.title.length > 9)  {
            newStr += chat.title.substr(0, 9);
            newStr += '...';
            return newStr;
        }
        else return chat.title
    };

    return (
        <>
            <div style={setBackGroundColorToDefaultChats()} title={chat.title}
                 className='chatsItem' onClick={handleClick}
            >{handleTxt()}</div>
        </>
    );
};

export default ChatItemList;
