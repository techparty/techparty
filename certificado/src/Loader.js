import React from 'react';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="showbox">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="8" strokeMiterlimit="10"/>
          </svg>
        </div>
      </div>
    );
  }
}