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

    cardRender = (data) => {
      const { isMobile } = this.state;
      const cardStyle = { width: isMobile ? '38vw' : 'auto', padding: 0, height: 'auto', margin: '5px' },
        cardImgStyla = { width: isMobile ? '100%' : 240 };
      return data.map((val, key) => <Button key={key} style={cardStyle}>
        <Card
          hoverable
          style={cardImgStyla}
          cover={val.cover}
        >
          {val.meta}
        </Card>
      </Button>);
    }

    selectRender = (data) => {
      const { isMobile } = this.state;
      const style = { width: isMobile ? '150px' : '25%', float: 'left', paddingBottom: isMobile ? '10px' : '' };
      return data.map((val, key) => <div key={key} style={style}>
        {val.lable}<Select defaultValue={val.defaultValue} onChange={val.onChange}>
          {val.option.map((txt, key) => <Option key={key} value={txt.value}>{txt.txt}</Option>)}
        </Select>
      </div>);
    }

    render() {
      const selectData = [
        { lable: '動物：', defaultValue: 'cat', option: [{ value: 'cat', txt: '貓咪' }, { value: 'dog', txt: '狗' }], onChange: (value) => { } },
        { lable: '品種：', defaultValue: 'cat', option: [{ value: 'cat', txt: '米克斯' }, { value: 'dog', txt: '賓士' }], onChange: (value) => { } },
        { lable: '性別：', defaultValue: 'male', option: [{ value: 'male', txt: '公' }, { value: 'female', txt: '母' }], onChange: (value) => { } },
        { lable: '年齡：', defaultValue: 'cat', option: [{ value: 'cat', txt: '2個月以下' }, { value: 'dog', txt: '4個月' }], onChange: (value) => { } },
      ],
        cardData = [
          { cover: <img alt='小黑' src={dog1} />, meta: <Meta title='可愛小黑' description='跪求認養' /> },
          { cover: <img alt='小黑' src={dog2} />, meta: <Meta title='可愛小黑' description='跪求認養' /> },
          { cover: <img alt='小黑' src={dog3} />, meta: <Meta title='可愛小黑' description='跪求認養' /> },
          { cover: <img alt='小黑' src={dog4} />, meta: <Meta title='可愛小黑' description='跪求認養' /> },
          { cover: <img alt='小黑' src={dog5} />, meta: <Meta title='可愛小黑' description='跪求認養' /> },
        ];
      return (
        <div style={{ height: '70vh', overflowY: 'auto' }}>
          <div style={{ width: '100%', height: '3vh', marginBottom: '2%' }}>
            {this.selectRender(selectData)}
          </div>
          <div style={{ marginBottom: '2%' }}><Checkbox>30天後安樂死</Checkbox></div>
          {this.cardRender(cardData)}
        </div>
      );
    }
  }
);