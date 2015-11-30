import React from 'react';
import ReactDOM from 'react-dom';

class Application extends React.Component {

  // React's getInitialState() should live inside the constructor
  constructor(props) {
    super(props);

    this.state = {
      obj: 'teste'
    };
  }

  _fetch() {
    console.log('fetch server data and then populate the state');
  }

  componentDidMount() {
    this._fetch();
  }

  render() {
    return <div>{this.state.obj}</div>
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('application')
);