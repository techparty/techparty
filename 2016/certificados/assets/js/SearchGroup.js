import React from 'react';
import Form from './Form';

export default class SearchGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      showSuccess: false
    };
  }

  _fetch() {
    console.log('fetching data from server');
  }

  componentDidMount() {
    this._fetch();
  }

  render() {
    return (
      <div>
        <Form />

        {this.state.showError
          ? 'Error while fetching data'
          : ''
        }

        {this.state.showSuccess
          ? 'show Success component'
          : ''
        }
      </div>
    );
  }
}