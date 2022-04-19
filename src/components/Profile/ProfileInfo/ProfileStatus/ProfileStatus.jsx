import React from "react";
import s from "./ProfileStatus.module.css";

class ProfileStatus extends React.Component {

  state = {
    editMod: false,
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({ editMod: true });
  }

  deactivateEditMode = () => {
    this.setState({ editMod: false });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.target.value
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({status: this.props.status});
    }
  }

  render() {
    return (
      <div className={s.status}>
        {!this.state.editMod &&
          <div>
            <span
              className={s.text}
                onDoubleClick={this.activateEditMode}
              >
                {this.props.status || "STATUS"}
              </span>
          </div>
        }
        {this.state.editMod &&
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        }
      </div>
    )
  }
};

export default ProfileStatus;