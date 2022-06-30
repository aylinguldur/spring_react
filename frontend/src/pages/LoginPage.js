import React from "react";
import Input from "../components/input";
import {changeLanguage} from "../api/apiCall";
import {withTranslation} from "react-i18next";
import {login} from "../api/apiCall";

class LoginPage extends React.Component{
    state={
        username:null,
        password:null
    };

    onChange = event =>{
        const{name,value}=event.target;
        this.setState({
            [name]:value
        })
    }

    onChangeLanguage = language =>{
        console.log(language);
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    onClick = event =>{
        event.preventDefault();
        const {username,password}=this.state
        const creds = {
            username,
            password
        }
        login(creds);
    }
    render(){
        const { t } = this.props;
        return(
            <div className="container">
                <form>
                    <h1 className="text-center">
                        {t('Login')}
                    </h1>
                    <Input name="username" label="Username" onChange={this.onChange} ></Input>
                    <Input name="password" label="Password" type="password" onChange={this.onChange}></Input>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={this.onClick}>
                           Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);

export default LoginPageWithTranslation;