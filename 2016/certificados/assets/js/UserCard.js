import React from 'react';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="card user-card">
        <h2>{this.props.user.name}</h2>

        <div className="user-card__info">
          <p className="user-card__p">
            <span className="user-card__desc">Dias comparecidos:</span>
            <span className="user-card__count">{this.props.user.attendedDays}</span>
          </p>

          <p className="user-card__p">
            <span className="user-card__desc">Total de horas:</span>
            <span className="user-card__count">{this.props.user.totalHours}</span>
          </p>
        </div>

        <button className="btn-default">IMPRIMIR</button>
      </section>
    );
  }
}