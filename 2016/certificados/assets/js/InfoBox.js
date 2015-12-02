import React from 'react';

export default class InfoBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col info-box">
        <section className="card">
          <p>Use o formulário ao lado para gerar e imprimir seu certificado de participação. Todos os campos tem preenchimento obrigatório e devem corresponder com os dados usados durante a inscrição do evento.</p>
          <p>Caso houver dúvidas, entre em contato pelos seguintes emails:</p>
          <ul>
            <li><a href="mailto:fernandoporazzi@gmail.com">fernandoporazzi@gmail.com</a></li>
            <li><a href="mailto:rohersmoura@gmail.com">rohersmoura@gmail.com</a></li>
          </ul>
        </section>

        <section className="logo-box">
          <img src="https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xpf1/v/t34.0-12/11944454_909590355770757_677381732_n.jpg?oh=4aa418507c3c641eb9da69837a5a189a&oe=5661749E&__gda__=1449228483_462db22aea1588ffe0abdb44adb9c52d" />
        </section>
      </div>
    );
  }
}