import React from 'react';
import Loader from './Loader';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userCpf: '',
      showError: this.props.showError,
      errorMessage: ''
    };
  }

  componentWillReceiveProps() {
    this.setState({showError: this.props.showError});
  }

  _handleEmailChange(e) {
    this.setState({userEmail: e.target.value});
  }

  _handleCpfChange(e) {
    this.setState({userCpf: e.target.value});
  }

  _handleSubmit(e) {
    e.preventDefault();

    //validate data here and send back to parent class
    var email = this.state.userEmail.trim(),
      cpf = this.state.userCpf.trim();

    if (!email || !cpf) {
      this.setState({showError: true});
      this.setState({errorMessage: 'Preencha os campos E-mail e CPF'});
      return;
    }

    // Send data to parent
    this.props.onFormSubmit({email: email, cpf: cpf});
  }

  render() {
    return (
      <div>
        <section className="card">
          <form onSubmit={this._handleSubmit.bind(this)}>
            <div className="form-item">
              <input type="email" name="email" id="email" placeholder="E-mail" onChange={this._handleEmailChange.bind(this)} />
            </div>

            <div className="form-item">
              <input type="number" name="cpf" id="cpf" placeholder="CPF" onChange={this._handleCpfChange.bind(this)} />
            </div>

            <div className="form-item">
              {this.props.isFetchingData ? <Loader /> : false}
              <button className="btn-default">PESQUISAR</button>
            </div>
          </form>

          {this.state.showError
            ? <div className="error">
                <p>{this.state.errorMessage}</p>
              </div>
            : false
          }
        </section>
      </div>
    );
  }
}