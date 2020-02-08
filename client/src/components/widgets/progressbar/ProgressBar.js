import React from "react";
// import logo from "./logo.svg";
import axios from "axios"
import "./ProgressBar.css";

class ProgressBarEx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        posts: [],
        percentage: 60
    };
}

    componentDidMount() {
      axios.get('/api/googlesheets')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
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
