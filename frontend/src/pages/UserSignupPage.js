import React from "react";
import {signup} from "../api/apiCall";
import Input from "../components/input";
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import {withApiProgress} from "../shared/ApiProgress";

class UserSignupPage extends React.Component{
    state={
        username:null,
        displayName:null,
        password:null,
        passRepeat:null,
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

        try {
            const response = await signup(body);
        } catch(error) {
            if(error.response.data.validationErrors) {
                this.setState({errors: error.response.data.validationErrors});
            }

        }
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
        const { errors } = this.state;
        const { username,displayName,password, passwordRepeat} = errors;
        const {t,pendingApiCall} = this.props;
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
                    <ButtonWithProgress  onClick={this.onClickSignup} disabled={pendingApiCall || passwordRepeat!==undefined}
                                         pendingApiCall={pendingApiCall} text={t('Sign Up')}/>
                </div>
            </form>
            </div>

        );
    }
}
//HighOrder Component


const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgress = withApiProgress(UserSignupPageWithTranslation,'/api/1.0/users');
export  default UserSignupPageWithApiProgress;