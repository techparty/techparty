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
      isFetchingData: false
    };
  }

  _calculateTotalPresent(days) {
    var filtered = days.filter( (d) => {
      return d.present;
    } );
    return filtered.length;
  }

  _calculateTotalTime(days) {
    return this._calculateTotalPresent(days) * 3;
  }

  _fetch(user) {
    var self = this;

    var xhr = new XMLHttpRequest();

    var endpoint = '/participant/get';

    if (user.isSpeaker) endpoint = '/speaker/get';

    var url = 'https://techparty-data.herokuapp.com/api/v2';

    xhr.open('POST', url + endpoint, true);
    xhr.responseType = 'text';

    xhr.onload = function() {
      if ( xhr.status >= 200 && xhr.status <= 226) {
        if (xhr.responseText) {
          var response = JSON.parse(xhr.responseText);

          if (response === null) {
            self.setState({isFetchingData: false});
            alert('Confira seus dados e tente novamente!');
            return;
          }

          if (!user.isSpeaker) {
            response.present = self._calculateTotalPresent(response.days);
            response.totalTime = self._calculateTotalTime(response.days);
          }

          response.isSpeaker = user.isSpeaker;

          self.setState({userData: response});

          self.setState({isFetchingData: false});
          self.setState({showSuccess: true});
          self.setState({showError: false});
        }
      }
    };

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    var params = {};

    params = {
      email: user.email,
      year: user.year,
    };

    if (!user.isSpeaker) params.cpf = user.cpf;

    xhr.send(JSON.stringify(params));
  }

  _handleSubmit(user) {

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
