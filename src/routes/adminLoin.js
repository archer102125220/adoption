import React, { Component } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './adminLoin.less';

const FormItem = Form.Item;

if (window.localStorage["remember"] !== true && window.localStorage["remember"] !== 'true') {
  window.localStorage["Account"] = '';
  window.localStorage["password"] = '';
  window.localStorage["remember"] = false;
}

const mapStateToProps = (state) => ({
  adminLoin: _.get(state, 'adminLoin.adminLoin', []),
});

const mapDispatchToProps = (dispatch) => ({
  POST_adminLoin: (payload, callback, loading) => dispatch({ type: 'adminLoin/POST_adminLoin', payload, callback, loading }),
  GET_adminLoin: (payload, callback, loading) => dispatch({ type: 'adminLoin/GET_adminLoin', payload, callback, loading }),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class adminLoin extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleGETAdminLoin = async (payload, callback) => {
      const { GET_adminLoin } = this.props;
      const loading = bool => this.setState({ loading: bool });
      await GET_adminLoin(payload, callback, loading);
    }

    handlePOSTAdminLoin = async (payload, callback) => {
      const { POST_adminLoin } = this.props;
      const loading = bool => this.setState({ loading: bool });
      await POST_adminLoin(payload, callback, loading);
    }

    // componentDidMount() {
    //   this.handleGETAdminLoin();
    // }

    render() {
      const { props } = this;
      return (
        <div>
          <div className='loginBackground'></div>
          <div className='backgroundCover'></div>
          <div className='loginFormBlock'>
            <div style={{ textAlign: 'center' }}>
              <h1>寵物認養平台</h1>
            </div>
            <LoginForm {...props} handleGETAdminLoin={this.handleGETAdminLoin} handlePOSTAdminLoin={this.handlePOSTAdminLoin} />
          </div>
        </div>
      );
    }
  }
);

const LoginForm = Form.create()(
  class NormalLoginForm extends React.Component {
    componentDidMount = () => {

      if (window.localStorage["remember"] === true || window.localStorage["remember"] === 'true') {
        this.props.form.setFieldsValue({
          Account: window.localStorage["Account"],
          password: window.localStorage["password"],
          remember: window.localStorage["remember"] === 'true' ? true : false,
        });
      }
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { Account, password, remember } = values;
          if (remember === true) {
            window.localStorage["Account"] = Account;
            window.localStorage["password"] = password;
            window.localStorage["remember"] = true;
          } else {
            window.localStorage["Account"] = '';
            window.localStorage["password"] = '';
            window.localStorage["remember"] = false;
          }
          // this.props.handlePOSTAdminLoin({ name: Account, password }, () => this.props.history.push('/home'));
          // this.props.handleGETAdminLoin({ name: Account, password }, () => this.props.history.push('/home'));
          this.props.history.push('/home');
        }
      });
    };
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <span>帳號</span>
          <FormItem>
            {getFieldDecorator('Account', {
              rules: [{ required: true, message: '請輸入帳號' }]
            })(
              <Input
                prefix={<Icon type='user' style={{ fontSize: 13 }} />}
                placeholder='帳號'
              />
            )}
          </FormItem>
          <span>密碼</span>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '請輸入密碼' }]
            })(
              <Input
                prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                type='password'
                placeholder='密碼'
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false
            })(<Checkbox>記住我</Checkbox>)}
            <a className='login-form-forgot' href=''>
              忘記密碼?
            </a>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              block
            >
              登入
            </Button>
          </FormItem>
        </Form>
      );
    }
  }
);
