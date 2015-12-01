import React from 'react';
import UserCard from './UserCard';
import Loader from './Loader';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: true,
      showSuccess: true,
      isFetchingData: false,

      userEmail: '',
      userCpf: ''
    };
  }

  _handleEmailChange(e) {
    this.setState({userEmail: e.target.value});
  }

  _handleCpfChange(e) {
    this.setState({userCpf: e.target.value});
  }

  _handleSubmit(e) {
    e.preventDefault();

    this.setState({isFetchingData: true});

    console.log(this.state.userEmail, this.state.userCpf);

    // Just to to check if states are working properly =)
    // Remove later
    setTimeout(() => {
      this.setState({isFetchingData: false});
    }, 4000);
  }

  render() {
    return (
      <div>
        <section className="card">
          <form onSubmit={this._handleSubmit.bind(this)}>
            <div className="form-item">
              <input type="email" name="email" id="email" required placeholder="E-mail" onChange={this._handleEmailChange.bind(this)} />
            </div>

            <div className="form-item">
              <input type="number" name="cpf" id="cpf" required placeholder="CPF" onChange={this._handleCpfChange.bind(this)} />
            </div>

            <div className="form-item">
              {this.state.isFetchingData ? <Loader /> : false}
              <button className="btn-default">PESQUISAR</button>
            </div>
          </form>

          {this.state.showError
            ? <div className="error">
                <p>Error while fetching data from server.</p>
              </div>
            : false
          }
        </section>

        {this.state.showSuccess
          ? <UserCard />
          : false
        }
      </div>
    );
  }
}