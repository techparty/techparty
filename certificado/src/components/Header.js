import React from 'react';

import TechpartyLogo from '../../images/techparty-logo.png';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <h1>
          <a href="./"><img src={TechpartyLogo}></img>TechPary - Certificados</a>
        </h1>
      </header>
    );
  }
}
