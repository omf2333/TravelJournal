import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  CitiesSlider from './Homepage/CitiesSlider'
import DaysSlide from './DaysSlide/DaySlide'
import {Switch, Route, HashRouter, Link} from 'react-router-dom';
import { Component } from 'react';
import  LoginModalForm from './LoginForm/LoginPage'
import ManageHomePage from "./BackendManage/ManageHomePage";
import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import { Provider } from 'react-redux';
import{coverReducer} from './reducer/CoverReducer';
import{articleReducer} from './reducer/ArticleReducer';

class Main extends Component{
    render() {
        return( <div id="main">
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/daysSlide' component={DaysSlide}/>
                <Route path ='/managePage' component={ManageHomePage}/>
            </Switch>
        </div>)
    }
}
class HomePage extends Component{
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });

    };

    handleCancel = () => {
        console.log("login cancel")
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    //<Link style={{ textDecoration: 'none' }} to={{pathname: '/login'}}>
    render() {
        return(
            <div>
                <div className='user_div' align="center">

                        <img className="user_div_avatar"
                         src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        onClick={this.showModal}/>
                    <LoginModalForm
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                    />
                </div>
                <CitiesSlider slides={slides} >

                </CitiesSlider>
            </div>)
    }
}
const slides = [
    {
        city: 'Paris',
        country: 'France',
        img:  'https://t2.hddhhn.com/uploads/tu/201703/9999/486e741a94.jpg',
    },
    {
        city: '中国·香港',
        img: 'http://pic1.win4000.com/wallpaper/2018-03-15/5aaa1fd648505.jpg',
    },
    {
        city: 'Prague',
        country: '世纪之旅',
        img: 'http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg',
    }
];
const rootReducer = combineReducers({
    coverState:coverReducer,
    articleState:articleReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk))
)
ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
        <Main/>
    </HashRouter>
    </Provider>
    ,document.getElementById('root')
);