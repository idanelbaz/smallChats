import Axios from 'axios';


function getLoggedinUser() {
    const user = JSON.parse(<string>sessionStorage.getItem('LoggedUser'));
    if (user) return user;
    else return null

}

async function logIn(user: any) {
    try {
        const res = await Axios.post(`http://localhost:3001/api/user/`, user);
        const currUser = res.data;
        sessionStorage.setItem('LoggedUser', JSON.stringify(currUser));
        return currUser;
    } catch (err) {
        throw err;
    }
}

async function signUp(user: any) {
    try {
        const res = await Axios.post(`http://localhost:3001/api/user/signup`, user);
        const currUser = res.data;
        sessionStorage.setItem('LoggedUser', JSON.stringify(currUser));
        return currUser;
    } catch (err) {
        throw err;
    }
}

async function logOut() {
    try {
        await Axios.post(`http://localhost:3001/api/user/logout`);
        sessionStorage.clear()
    } catch (err) {
        throw err;
    }
}

async function loadChats() {
    try {
        const res = await Axios.get(`http://localhost:3001/api/chat/`);
        return res.data;
    } catch (err) {
        throw err;
    }
}


async function updateUser() {
    const user = getLoggedinUser();
    try {
        const res = await Axios.get(`http://localhost:3001/api/user/${user._id}`);
        sessionStorage.setItem('LoggedUser', JSON.stringify(res.data));
        return res.data;
    } catch (err) {
        throw err;
    }
}

async function addFriend(userId:any) {
    const user = getLoggedinUser();
    try {
        const res = await Axios.post(`http://localhost:3001/api/user/addfriend`, {currUser:user, addedUserId:userId});
        return res.data;
    } catch (err) {
        throw err;
    }
}

async function addUserChat(chat:any) {
    try {
        const res = await Axios.post(`http://localhost:3001/api/chat//addChat`, {chat});
        return res.data;
    } catch (err) {
        throw err;
    }
}


export default {
    logIn,
    logOut,
    signUp,
    getLoggedinUser,
    loadChats,
    updateUser,
    addFriend,
    addUserChat
}

















