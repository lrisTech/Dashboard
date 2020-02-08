import React from "react";
import logo from "./logo.svg";
import "./ProgressBar.css";

class ProgressBarEx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 60
    };
  }
  render() {
    return (
      <div>
        <ProgressBar percentage={this.state.percentage} />
      </div>
    );
  }
}

const Filler = props => {
  return (
    <div className="filler" style={{ width: `${props.percentage}%` }}></div>
  );
};

const ProgressBar = props => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
};

export default ProgressBarEx;
