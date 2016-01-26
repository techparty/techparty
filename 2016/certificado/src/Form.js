import React from 'react';
import Loader from './Loader';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userCpf: '',
      isSpeaker: false,
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

  _handleIsSpeakerChange(e) {
    var speaker = !this.state.isSpeaker;

    this.setState({isSpeaker: speaker});
  }

  _validateCpf(strCPF) {
    // Código retirado do site da Receita Federal

    var Soma;
    var Resto;
    Soma = 0;
    var i;

    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
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

    if (!this._validateCpf(cpf)) {
      this.setState({showError: true});
      this.setState({errorMessage: 'CPF inválido'});
      return;
    }

    // Send data to parent
    this.props.onFormSubmit({email: email, cpf: cpf, isSpeaker: this.state.isSpeaker});
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
              <input type="checkbox" name="is_speaker" id="is_speaker" className="is_speaker" onChange={this._handleIsSpeakerChange.bind(this)} />
              <label htmlFor="is_speaker">Sou palestrante</label>
            </div>

            <div className="form-item">
              {this.props.isFetchingData ? <Loader /> : false}
              <button className="btn btn-primary">PESQUISAR</button>
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
