import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";
import ProgressBar from "../../widgets/progressbar/ProgressBar"
import Announcements from "../../widgets/progressbar/announcements/Announcements"


import Modal from "./Modal/Modal";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    members: [],
    id: "",
    owner: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

  render() {
    // const { projects } = this.props.projects;

    // let content;

    // let projectData = projects.sort().map(project => (
    //   <div
    //     key={project._id}
    //     className="project-icon"
    //     onClick={() => this.props.history.push(`/projects/${project._id}`)}
    //   >
    //     <div className="project-name">{project.name}</div>
    //     <div
    //       className="project-info-button"
    //       onClick={this.toggleEditModal.bind(
    //         this,
    //         project.name,
    //         project.teamMembers,
    //         project._id,
    //         project.owner
    //       )}
    //     >
    //       Edit project
    //     </div>
    //     <div className="project-info-button">Go to project</div>
    //   </div>
    // ));

    // if (projects.length > 0) {
    //   // At least one project
    //   content = (
    //     <>
    //       <button className="main-btn" onClick={this.toggleModal}>
    //         Create another project
    //       </button>
    //       <div className="modal-wrapper">
    //         <Modal
    //           onClose={this.toggleModal}
    //           modal={this.state.modal}
    //           edit={this.state.edit}
    //           name={this.state.name}
    //           members={this.state.members}
    //           id={this.state.id}
    //           owner={this.state.owner}
    //         />
    //       </div>
    //       <div className="projects-wrapper">{projectData}</div>
    //     </>
    //   );
    // } else {
    //   // No projects
    //   content = (
    //     <>
    //       <div className="projects">
    //         <div className="no-projects">
    //           <h1 className="header">You have no projects</h1>
    //           <button className="main-btn" onClick={this.toggleModal}>
    //             Create your first project
    //           </button>
    //           <div className="modal-wrapper">
    //             <Modal onClose={this.toggleModal} modal={this.state.modal} />
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   );
    // }

    // return (
    //   <div className="main-content">
    //     <h1 className="header">Your Projects</h1>
    //     {/* {content} */}
    //   </div>
    // );
        {/* <ProgressBar></ProgressBar> */}
    return (
      <div className="main-content" style ={{display: "flex", alignContent: "stretch", height: "100vh", backgroundColor: "transparent"}}>
                {/* <h1 className="header">Welcome to your PCT Dashboard</h1> */}

        <div className = "column">
          <div className = "module profileInfo">

          </div>
          <div className = "module photoOfDay">

          </div>
        </div>
        <div className = "column">
          <div className = "module announcements">
            <Announcements></Announcements>
          </div>
          <div className = "module suggestionBox">

          </div>
        </div>
        <div className = "column">
          <div className = "module calendar">
            
          </div>
          <div className = "module progressbar">
            
          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
