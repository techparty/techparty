import React from 'react';
import ReactDom from 'react-dom';

class Application extends React.Component {
  render() {
    return <div>Hello World</div>
  }
}

ReactDom.render(
  <Application />,
  document.getElementById('application')
);