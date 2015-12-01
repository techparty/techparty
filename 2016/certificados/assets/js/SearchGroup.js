import React from 'react';
import Form from './Form';

export default class SearchGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  _fetch() {
    console.log('fetching data from server');
  }

  componentDidMount() {
    this._fetch();
  }

  render() {
    return (
      <div className="col">
        <Form />
      </div>
    );
  }
}