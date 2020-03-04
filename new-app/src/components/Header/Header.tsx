import React, {useEffect} from "react";
import "./Header.css";
import {ReactComponent as Logo} from "../../logoSvg.svg";
import CreateNewChatModal from "../CreateNewChatModal/CreateNewChatModal";
import {useSelector, useDispatch} from "react-redux";
import {logOut, setMenuToggle, setCreateNewChatModalToggle} from '../../store/actions/userActions';
import {getCurrUser, getIsMenuOpen, getIsCreateChatOpen} from "../../store/selectors/selectors.";
import {useHistory} from "react-router-dom";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector(getCurrUser);
    const isMenuOpen = useSelector(getIsMenuOpen);
    const isCreateNewChatModal = useSelector(getIsCreateChatOpen);

    useEffect(() => {
        const coverAllPageEl = document.querySelector('.coverAllPage');
        if (coverAllPageEl) {
            if (!isMenuOpen) {
                coverAllPageEl.classList.add('none');
            } else {
                coverAllPageEl.classList.remove('none');
            }
        }
    }, [isMenuOpen]);


    const handleClickLogo = () => {
        history.push(`/home`);
    };

    const handleClickLogOut = () => {
        dispatch(logOut());
    };

    const goToUserChats = () => {

    };

    const openCreateNewChatModal = () => {
        dispatch(setCreateNewChatModalToggle());
        dispatch(setMenuToggle())
    };

    const openMenu = (event: any) => {
        if (event.target.className !== 'menu') return;
        dispatch(setMenuToggle())
    };

    const userNameToShow = () => {
        return currUser.email.substring(0, currUser.email.lastIndexOf("@"));
    };

    return (
        <>
            <div className='headerContainer'>
                <div className='logoContainer'>
                    <Logo title='Home' onClick={handleClickLogo} className='Logo'/>
                </div>
                {currUser != null &&
                <div className='menuContainer'>
                    <div className='menu' onClick={openMenu}>
                        {isMenuOpen &&
                        <div className='openMenu'>
                            <div className='heyUser'>Hi {userNameToShow()}</div>
                            <div className='innerMenuContainer'>
                                <div title='Log Out' onClick={handleClickLogOut} className='logOutContainer'>
                                    <div className='logOutSvg'/>
                                </div>
                                <div title='Your Chats' onClick={goToUserChats} className='userChatsContainer'>
                                    <div className='userChatsSvg'/>
                                </div>
                                <div title='Create New Chat' onClick={openCreateNewChatModal}
                                     className='newChatContainer'>
                                    <div className='newChatSvg'/>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                }
            </div>
            <div onClick={() => dispatch(setMenuToggle())} className='coverAllPage'/>
            {isCreateNewChatModal &&
            <CreateNewChatModal/>
            }
        </>
    );
};

export default Header;
