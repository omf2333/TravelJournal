import { Button, Modal, Form, Input,  Icon,Checkbox} from 'antd/lib/index'
import React from 'react';
import {Component} from 'react';
import './LoginPage.css'
import { Redirect } from 'react-router-dom';
class LoginModal extends Component {
   constructor(props){
       super(props)
       this.state={
           loading:false,
           redirect:false
       }
   }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                setTimeout(() => {
                    console.log('Received values of form: ', values);
                    if(values.username == "OuMingFeng" && values.password=="12345Omf"){
                        this.setState({redirect: true});
                    }
                    this.props.onCancel();
                }, 500);

            }
        });
    };

    render() {
        const {  onCancel,  form } = this.props;
        const { getFieldDecorator } = form;
        console.log(" modal render",this.props)
        const loading = this.state.load;
        const visible = this.props.visible
        if(this.state.redirect){
            return(<Redirect to={{
                pathname: '/managePage'
            }}/>);
        }
        else{
        return (
            <Modal
                className="collection-create-form_last-form-item"
                visible={visible}
                title={null}
                width={300}
                onCancel={onCancel}
                footer = {null}
                wrapClassName={'login'}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item >
                        <div className="login_button_div" align='center'>
                        <Button  ghost htmlType="submit" className="login-form-button" >
                            Log in
                        </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        );}
    }
}



class Login extends Component{
    render() {
        return(
            <div className="vid-container">

                <div className="inner-container">
                    <img className="bgvid inner" src="http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg"/>
                    <div className="box">
                        <h1>Login</h1>
                        <input type="text" placeholder="Username"/>
                        <input type="text" placeholder="Password"/>
                        <button>Login</button>
                        <p>Not a member? <span>Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>);
    }

}
const LoginModalForm = Form.create({ name: 'form_in_modal' })(LoginModal);
export default LoginModalForm;
