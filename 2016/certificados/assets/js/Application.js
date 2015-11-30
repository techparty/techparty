import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

class Application extends React.Component {

  // React's getInitialState() should live inside the constructor
  constructor(props) {
    super(props);

    this.state = {
      obj: 'teste'
    };
  }

  componentDidMount() {
    //
  }

  render() {
    return (
      <div>
        <Form />
      </div>
    );
  }
}

ReactDOM.render(
  <Application name="Fernando" />,
  document.getElementById('application')
);