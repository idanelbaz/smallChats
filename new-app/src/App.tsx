import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Header from "./components/Header/Header";
import Chat from "./components/Chat/Chat";
import ChatsList from "./components/ChatsList/ChatsList";


const Routes: React.FC = () => {
    return (
        <>
            <Switch>
                <Route path="/home" component={SignUp} exact/>
                <Route path="/login" component={LogIn} exact/>
                <Route path="/chat/:chatName" component={Chat} exact/>
                <Route path="/chatslist" component={ChatsList} exact/>
                <Redirect to="/"/>
            </Switch>
        </>
    );
};


function App() {
    return (
        <div className="App">
            <Header/>
            <Routes/>
        </div>
    );
}

export default App;
