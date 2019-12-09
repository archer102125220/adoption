import React, { Component } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { enquireScreen } from 'enquire-js';
import { Select, Checkbox, Card, Button } from 'antd';
import dog1 from './../assets/2600abd0-76e0-42ed-9487-210d373631f5.jpg';
import dog2 from './../assets/98201866-81ec-4a04-a99a-3cd2b2c67b01.jpg';
import dog3 from './../assets/b99db4ca-8b47-42d7-b616-cf16fe0652a8.jpg';
import dog4 from './../assets/ef79b50a-3fdc-4465-a6b9-b9d9a5066358.jpg';
import dog5 from './../assets/fd9b8aa3-8f26-4408-b559-0082a72ae414.jpg';

const { Meta } = Card;

const { Option } = Select;

const mapStateToProps = (state) => ({
  adminLoin: _.get(state, 'adminLoin.adminLoin', []),
});

const mapDispatchToProps = (dispatch) => ({
  POST_application: (payload, callback, loading) => dispatch({ type: 'adminLoin/POST_application', payload, callback, loading }),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        DateBirth: null,
        gender: '',
        email: '',
        phone: '',
        IDNumber: '',
        isMobile: false
      };
    }

    handleGETAdminLoin = async (payload, callback) => {
      const { GET_adminLoin } = this.props;
      const loading = bool => this.setState({ loading: bool });
      await GET_adminLoin(payload, callback, loading);
    }

    componentDidMount = () => {
      this.enquireHandler = enquireScreen(mobile => {
        this.setState({
          isMobile: mobile ? true : false,
        });
      }/*, '(max-width: 1024px)' */);
    }

    render() {
      const { isMobile, name, DateBirth, gender, email, phone, IDNumber, dateFormat, selectAfter } = this.state;
      const style = { width: isMobile ? '150px' : '25%', float: 'left', paddingBottom: isMobile ? '10px' : '' };
      return (
        <div style={{ height: '70vh', overflowY: 'auto' }}>
          <div style={{ width: '100%', height: '3vh', marginBottom: '2%' }}>
            <div style={style}>動物：<Select defaultValue='cat'>
              <Option value='cat'>貓咪</Option>
              <Option value='dog'>狗</Option>
            </Select></div>
            <div style={style}>品種：<Select defaultValue='cat'>
              <Option value='cat'>米克斯</Option>
              <Option value='dog'>貴賓</Option>
            </Select></div>
            <div style={style}>性別：<Select defaultValue='cat'>
              <Option value='cat'>公</Option>
              <Option value='dog'>母</Option>
            </Select></div>
            <div style={style}>年齡：<Select defaultValue='cat'>
              <Option value='cat'>2個月以下</Option>
              <Option value='dog'>4個月</Option>
            </Select></div>
          </div>
          <div style={{ marginBottom: '2%' }}><Checkbox>30天後安樂死</Checkbox></div>
          <Button style={{ width: 'auto', padding: 0, height: 'auto', margin: '5px' }}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt='小黑' src={dog1} />}
            >
              <Meta title='可愛小黑' description='跪求認養' />
            </Card>
          </Button>
          <Button style={{ width: 'auto', padding: 0, height: 'auto', margin: '5px' }}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt='小黑' src={dog2} />}
            >
              <Meta title='可愛小黑' description='跪求認養' />
            </Card>
          </Button>
          <Button style={{ width: 'auto', padding: 0, height: 'auto', margin: '5px' }}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt='小黑' src={dog3} />}
            >
              <Meta title='可愛小黑' description='跪求認養' />
            </Card>
          </Button>
          <Button style={{ width: 'auto', padding: 0, height: 'auto', margin: '5px' }}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt='小黑' src={dog4} />}
            >
              <Meta title='可愛小黑' description='跪求認養' />
            </Card>
          </Button>
          <Button style={{ width: 'auto', padding: 0, height: 'auto', margin: '5px' }}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt='小黑' src={dog5} />}
            >
              <Meta title='可愛小黑' description='跪求認養' />
            </Card>
          </Button>
        </div>
      );
    }
  }
);