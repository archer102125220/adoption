import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { enquireScreen } from 'enquire-js';
import './GlobalLayout.less';

const mapStateToProps = (state) => {
  return {
    systemName: _.get(state, 'global.systemName'),
    copyright: _.get(state, 'global.copyright'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const linkComponent = [
  { key: 'application', to: '/application', text: '申請表單' },
];

export default connect(mapStateToProps, mapDispatchToProps)(
  class GlobalLayout extends Component {
    state = {
      isMobile: false,
    }

    componentDidMount = () => {
      this.enquireHandler = enquireScreen(mobile => {
        this.setState({
          isMobile: mobile ? true : false,
        });
      }/*, '(max-width: 1024px)' */);
    }

    render() {
      const { children, systemName, copyright } = this.props;
      const menu = (
        <Menu>
          <Menu.Item key='1'><Link to='/logout'>登出</Link></Menu.Item>
        </Menu>
      );
      const { isMobile } = this.state;
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Header>
            <a className='logo'>{systemName}</a>
            <div style={isMobile === false ? { float: 'right' } : {}}>
              {
                isMobile === false && (
                  <div style={{ display: 'inline-block' }}>
                    <Menu
                      theme='dark'
                      mode='horizontal'
                      style={{ lineHeight: '64px' }}
                    >
                      {
                        linkComponent.map(val => renderLink(val))
                      }
                    </Menu>
                  </div>)
              }
              <div style={{ display: 'inline' }}>
                <Dropdown trigger={['click']} overlay={menu}>
                  <span className='action account' style={isMobile === false ? {} : { padding: 0, paddingLeft: '10px' }}>
                    <Avatar size='small' className={isMobile === false ? 'avatar' : 'avatarMobile'} icon='user' />
                  </span>
                </Dropdown>
              </div>
              {
                isMobile === true && (
                  <div style={{ display: 'inline' }}>
                    <Dropdown trigger={['click']} overlay={
                      <Menu>
                        {
                          linkComponent.map(val => renderLink(val))
                        }
                      </Menu>
                    }>
                      <span className='action account' style={isMobile === false ? {} : { padding: 0, paddingLeft: '10px' }}>
                        <Avatar size='small' className={isMobile === false ? 'avatar' : 'avatarMobile'} icon='menu-unfold' />
                      </span>
                    </Dropdown>
                  </div>)
              }
            </div>
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, marginTop: 24 }}>
              {children}
            </div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>{copyright}</Layout.Footer>
        </Layout>
      );
    }
    static propTypes = {
      children: PropTypes.any
    }
  });

const renderLink = (r) => {
  const { key, to, text } = r;
  return (
    <Menu.Item key={key}><Link to={to}>{text}</Link></Menu.Item>
  );
}