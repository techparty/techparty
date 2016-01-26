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
    console.log('fetching data from server');

    user.name = 'Fernando de Siqueira Porazzi';
    user.attendedDays = 3;
    user.totalHours = 9;

    this.setState({userData: user});
  }

  _handleSubmit(user) {
    console.log('_handleSubmit user', user);

    this.setState({isFetchingData: true});

    this._fetch(user);

    setTimeout(() => {
      this.setState({isFetchingData: false});
      this.setState({showSuccess: true});
      this.setState({showError: false});
    }, 4000);
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
