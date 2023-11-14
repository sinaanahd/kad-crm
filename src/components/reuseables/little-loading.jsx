import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
class LittleLoading extends Component {
  state = {};
  render() {
    return (
      <span className="inside-loader">
        <FaSpinner />
      </span>
    );
  }
}

export default LittleLoading;
