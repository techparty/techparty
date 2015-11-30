import React from 'react';
import ReactDOM from 'react-dom';

class Application extends React.Component {
  render() {
    return <div>Hello World</div>
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('application')
);