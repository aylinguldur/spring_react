import React from "react";
import {signup} from "../api/apiCall";
import Input from "../components/input";
import {useTranslation, withTranslation} from 'react-i18next';

class UserSignupPage extends React.Component{
    state={
        username:null,
        displayName:null,
        password:null,
        passRepeat:null,
        pendingApiCall:false,
        errors :{}

    };
    onChange = event => {
        const{name,value}=event.target;
        const errors = {...this.state.errors}
        errors[name]=undefined
        if(name === "password"|| name === "password"){
            if( name === "password" && value!==this.state.passwordRepeat){
                errors.passwordRepeat="Password mismatch";
            }
            else{
                errors.passwordRepeat = "Password mismatch";
            }
        }
        //const value =event.target.value;
        //const name = event.target.name;
        this.setState({[name]:value,errors});
    };


    onClickSignup = async event => {
        event.preventDefault();
        const{username,displayName,password}=this.state;
        const body ={
            username,
            displayName,
            password
        };
        this.setState({pendingApiCall:true});

        try {
            const response = await signup(body);
        } catch(error) {
            if(error.response.data.validationErrors) {
                this.setState({errors: error.response.data.validationErrors});
            }

        }
        this.setState({pendingApiCall: false});
    };


    /*
    onChangeDisplayName=event=>{
        this.setState({displayName:event.target.value})
        console.log(event.target.value);
    }
    onChangePassword=event=>{
        this.setState({displayName:event.target.value})
        console.log(event.target.value);
    }
    onChangePassRepeat=event=>{
        this.setState({displayName:event.target.value})
        console.log(event.target.value);
    }*/
    render(){
        const { pendingApiCall,errors } = this.state;
        const { username,displayName,password, passwordRepeat} = errors;
        const {t} = this.props;
        return(
            <div className="container">
            <form>
                <h1 className="text-center">
                    {t('Sign Up')}
                </h1>
                <Input name="username" label={t("Username")} error={username} onChange={this.onChange}></Input>
                <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange}></Input>
                <Input name="password" label={t('Password')} error={password} onChange={this.onChange} type="password"></Input>
                <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password"></Input>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.onClickSignup} disabled={pendingApiCall || passwordRepeat!==undefined}>
                        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {t('Sign Up')}
                    </button>
                </div>
            </form>
                </div>

        );
    }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

//HighOrder Component

export  default UserSignupPageWithTranslation;