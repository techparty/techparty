import React from 'react';
import Form from './Form';
import UserCard from './UserCard';

export default class SearchGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      showError: false,
      showSuccess: false,
      isFetchingData: false,
    };
  }

  _fetch(user) {
    var self = this;
    console.log('fetching data from server');

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://techparty-data.herokuapp.com/api/v2/participant/get', true);
    xhr.responseType = 'text';

    xhr.onload = function() {
      if ( xhr.status >= 200 && xhr.status <= 226) {
        if (xhr.responseText) {
          var response = JSON.parse(xhr.responseText);

          self.setState({userData: response});

          self.setState({isFetchingData: false});
          self.setState({showSuccess: true});
          self.setState({showError: false});
        }
      }
    };

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify({email: user.email, cpf: user.cpf}));
  }

  _handleSubmit(user) {
    console.log('_handleSubmit user', user);

    this.setState({isFetchingData: true});

    this._fetch(user);
  }

  render() {
    return (
      <div className="col">
        <Form onFormSubmit={this._handleSubmit.bind(this)} isFetchingData={this.state.isFetchingData} showError={this.state.showError} />

        {this.state.showSuccess ? <UserCard user={this.state.userData} /> : false }
      </div>
    );
  }
}
