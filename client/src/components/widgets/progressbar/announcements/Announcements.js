import React from "react";
// import logo from "./logo.svg";
import axios from "axios"
// import "./ProgressBar.css";
import { connect } from "react-redux";
import {Link, withRouter } from "react-router-dom";

class Announcements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        announcements: []
    };
  } 

  async componentDidMount() {
      let points = 0
      const usersData = {users: this.props.auth.user}
      axios.get('/api/announcements')
      .then(response => {
          console.log(response.data, "temp");
          this.setState({
              announcements: convertAnnouncementObjects(response.data)
          })
      })
      .catch(error => {
          console.log(error);
      })
    }


  render() {
    console.log(this.state.announcements)
    return (
      <div style = {{flexDirection: "column"}}>
        {this.state.announcements}  
      </div>
    );
  }
}

function convertAnnouncementObjects(announcementObjects){
  var ret = []
  announcementObjects.forEach(announcement => {
    var annList = []
    for(var trait in announcement){
      annList.push(announcement[trait])
    }
    ret.push(annList)
  });
  return ret;
}

// const Filler = props => {
//   return (
//     <div className="filler" style={{ width: `${props.percentage}%` }}></div>
//   );
// };

// const ProgressBar = props => {
//   return (
//     <div className="window">
//         <div className="windowHeader">
//             Accountability Tracker
//         </div>
//         <div className="progress-bar">
//             <Filler percentage={props.total} />
//         </div>
//         {props.points} / {props.totalPoints}
//     </div>
//   );
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {  }
)(withRouter(Announcements));

//export default ProgressBarEx;
