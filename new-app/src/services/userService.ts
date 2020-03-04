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
    const user = getLoggedinUser();
    const config = {
        headers: { Authorization: `Bearer ${user.token}`}
    };
    try {
        const res = await Axios.get(`http://localhost:3002/api/chat/`,config);
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
    const user = getLoggedinUser();
    const config = {
        headers: { Authorization: `Bearer ${user.token}`}
    };
    try {
        const res = await Axios.post(`http://localhost:3002/api/chat//addChat`, {chat} ,config);
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
    addFriend,
    addUserChat
}

















