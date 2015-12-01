import React from 'react';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="card user-card">
        <h2>Fernando de Siqueira Porazzi</h2>

        <div className="user-card__info">
          <p className="user-card__p">
            <span className="user-card__desc">Dias comparecidos:</span>
            <span className="user-card__count">4</span>
          </p>

          <p className="user-card__p">
            <span className="user-card__desc">Total de horas:</span>
            <span className="user-card__count">12</span>
          </p>
        </div>

        <button className="btn-default">IMPRIMIR</button>
      </section>
    );
  }
}