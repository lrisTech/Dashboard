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
        percentage: 0,
        points: 0,
        totalPoints: 0
    };
}

    async componentDidMount() {
        let points = 0
        const usersData = {users: this.props.auth.user}
        axios.post('/api/googlesheets', usersData)
        .then(response => {
            console.log(response);
            let totalPoints = 24
            const status = response.data[4];
            switch(status) {
                case "Inactive":
                    points = 100
                    break;
                case "Provisional":
                    totalPoints = 14
                default:
                    points = (response.data[2] / totalPoints)*100
            }
            console.log(response.data[0]+ ": " + response.data[2])
            this.setState({
                percentage: points,
                points: response.data[2],
                totalPoints: totalPoints
            })
        })
        .catch(error => {
            console.log(error);
        })
    }


  render() {
    return (
      <div>
        <ProgressBar percentage={this.state.percentage} points={this.state.points} totalPoints={this.state.totalPoints}/>
      </div>
    );
  }
}

const Filler = props => {
  return (
    <div className="filler" style={{ width: `${props.percentage}%` }}>
      20
   </div>
    
    );
};

const ProgressBar = props => {
  return (
    <div className="window">
        <div className="windowHeader">
            ACCOUNTABILITY TRACKER
        </div>
        <div className="progress-bar">
            <Filler percentage={props.total} />
        </div>
        <div className="ratio">
        {props.points} / {props.totalPoints}
        </div>
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
