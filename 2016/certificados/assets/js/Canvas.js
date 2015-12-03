import React from 'react';
import ReactDOM from 'react-dom';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var canvas = ReactDOM.findDOMNode(this.refs.canvas),
      ctx = canvas.getContext('2d');

    // Draw everything down here =)
  }

  render() {
    return (
      <canvas ref="canvas" width="1170" height="690"></canvas>
    );
  }
}