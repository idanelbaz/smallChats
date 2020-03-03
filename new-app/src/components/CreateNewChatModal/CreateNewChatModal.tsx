import React, {useState} from "react";
import "./CreateNewChatModal.css";
import {useSelector, useDispatch} from "react-redux";
import {
    setCreateNewChatModalToggle,
    updateCurrUserFromStorage
} from '../../store/actions/userActions';
import {getCurrUser} from "../../store/selectors/selectors.";
import userService from '../../services/userService';

const CreateNewChatModal: React.FC = () => {
    const dispatch = useDispatch();
    const currUser = useSelector(getCurrUser);
    const [newChat, setNewChat] = useState({title: '', owner: currUser._id, invited: [], backgroundColor: 'black', msgs:[], usersInRoom:[]});

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await userService.addUserChat(newChat);
        dispatch(updateCurrUserFromStorage());
        dispatch(setCreateNewChatModalToggle());
    };

    const handleChange = (event: any) => {
        setNewChat({
            ...newChat,
            [event.target.name]: event.target.value
        });
    };

    const closeModal = () => {
        dispatch(setCreateNewChatModalToggle());
    };


    return (
        <>
            <div className='createNewChatModalContainer'>
                <div className='createNewChatModal'>
                    <div className='headerModalContainer'>
                        <div onClick={closeModal} className='exitModal'/>
                    </div>
                    <form onSubmit={handleSubmit} className='createChatFormContainer'>
                        <label className='inputLabel'>Chat Title</label>
                        <input required className='userInput' value={newChat.title} name="title"
                               onChange={handleChange}
                               type="text" placeholder="Chat Title"/>
                        <label className='inputLabelColor'>
                            Choose background color <input type='color'
                                                           className='colorInputNewChat'
                                                           onChange={handleChange}
                                                           required
                                                           name="backgroundColor"
                                                           value={newChat.backgroundColor}/></label>
                        <button className='submitBtn'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateNewChatModal;
