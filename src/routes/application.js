import React, { Component } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { DatePicker, Select, Input, Button, Radio } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Option } = Select;

const mapStateToProps = (state) => ({
  adminLoin: _.get(state, 'adminLoin.adminLoin', []),
});

const mapDispatchToProps = (dispatch) => ({
  POST_application: (payload, callback, loading) => dispatch({ type: 'adminLoin/POST_application', payload, callback, loading }),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class application extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        DateBirth: null,
        gender: '',
        email: '',
        phone: '',
        IDNumber: '',
        dateFormat: 'YYYY/MM/DD',
        selectAfter: (
          <Select defaultValue='@gmail.com' style={{ width: 145 }}>
            <Option value='@gmail.com'>@gmail.com</Option>
            <Option value='@yahoo.com.tw'>@yahoo.com.tw</Option>
          </Select>
        )
      };
    }

    handleGETAdminLoin = async (payload, callback) => {
      const { GET_adminLoin } = this.props;
      const loading = bool => this.setState({ loading: bool });
      await GET_adminLoin(payload, callback, loading);
    }

    render() {
      const { name, DateBirth, gender, email, phone, IDNumber, dateFormat, selectAfter } = this.state;

      return (
        <div>
          <h1 style={{ textAlign: 'center' }}>寵物認養申請</h1>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore='真實姓名' value={name} onChange={(e) => this.setState({ name: e.target.value })} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore='身分證字號' value={IDNumber} onChange={(e) => this.setState({ IDNumber: e.target.value })} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore='出生年月日' style={{ width: '6.7%' }} />
            <DatePicker format={dateFormat} value={DateBirth !== null ? moment(DateBirth, dateFormat) : null} onChange={(date, dateString) => this.setState({ DateBirth: dateString })} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: '93.3%' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore='性別' style={{ width: '3.5%' }} />
            <Radio.Group style={{ width: '96.5%' }} onChange={(e) => this.setState({ gender: e.target.value })} value={gender} buttonStyle='solid'>
              <Radio.Button style={{ width: '50%', textAlign: 'center' }} value='男'>男</Radio.Button>
              <Radio.Button style={{ width: '50%', textAlign: 'center' }} value='女'>女</Radio.Button>
            </Radio.Group>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore='E-mail' addonAfter={selectAfter} value={email} onChange={(e) => this.setState({ email: e.target.value })} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore='電話號碼' value={phone} onChange={(e) => this.setState({ phone: e.target.value })} />
          </div>
        </div>
      );
    }
  }
);