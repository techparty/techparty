import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <h1>
          <a href="./">TechPary 2016 - Certificados</a>
        </h1>
      </header>
    );
  }
}