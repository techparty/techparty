import React from 'react';

export default class InfoBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Use o formulário ao lado para gerare e imprimir seu certificado de participação. Todos os campos tem preenchimento obrigatório e devem corresponder com os dados usados durante a inscrição do evento.</p>
        <p>Caso houver dúvidas, entre em contato com <a href="mailto:fernandoporazzi@gmail.com">fernandoporazzi@gmail.com</a> ou <a href="mailto:rohersmoura@gmail.com">rohersmoura@gmail.com</a> </p>
      </div>
    );
  }
}