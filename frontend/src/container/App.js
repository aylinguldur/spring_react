import React from "react";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";


function App() {
    return (
        <div>
            <Router>
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={UserSignupPage}/>
                    <Route path="/user/:username" component={UserPage}/>
                    <Redirect to="/"/>
                </Switch>
            </Router>
            <LanguageSelector/>
        </div>
    );
}

export default App;
