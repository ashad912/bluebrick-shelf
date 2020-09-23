import React from "react";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const withNoAuth = WrappedComponent => {
  return class extends React.Component {


    render() {

      if (this.props.uid) {
        return <Redirect to="/" />;
      }

      return (
        <React.Fragment>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};
const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
  };
};


const composedWithNoAuth = compose(
  connect(
    mapStateToProps
  ),
  withNoAuth
);

export default composedWithNoAuth;
