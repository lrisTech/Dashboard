import React from "react";
// import logo from "./logo.svg";
import axios from "axios"
import "./ProgressBar.css";
import { connect } from "react-redux";
import {Link, withRouter } from "react-router-dom";

class ProgressBarEx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        posts: [],
        percentage: 0
    };
}

    async componentDidMount() {
        let points = 10
        const usersData = {users: this.props.auth.user}
        axios.post('/api/googlesheets', usersData)

        .then(response => {
            console.log(response);
            let totalPoints = 24
            if (response.data.length === 5) {
                if (response.data[4] === "Provisional") {
                    //Points: 14
                    totalPoints = 14
                } else {
                    //For inactive brothers, should be 0
                    totalPoints = 3
                }
            }
            points = (response.data[2] / totalPoints)*100

            console.log(response.data[0]+ ": " + response.data[2])
            this.setState({percentage: points})
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {  }
)(withRouter(ProgressBarEx));

//export default ProgressBarEx;
