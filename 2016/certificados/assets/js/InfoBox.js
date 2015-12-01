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
      </div>
    );
  }
}