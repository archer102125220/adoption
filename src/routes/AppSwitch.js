import React, { Component } from "react";
import { Switch } from "dva/router";
import GlobalLayout from "./../layouts/GlobalLayout";
import PropTypes from "prop-types";

export default class AppSwitch extends Component {
  render() {
    const { children } = this.props;
    if (window.location.href.split("/#/")[1] === "login") {
      return <Switch>{children}</Switch>;
    }
    return (
      <GlobalLayout>
        <Switch>{children}</Switch>
      </GlobalLayout>
    );
  }
  static propTypes = {
    children: PropTypes.any
  };
}
