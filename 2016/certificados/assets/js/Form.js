import React from 'react';
import UserCard from './UserCard';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      showSuccess: true
    };
  }

  render() {
    return (
      <div>
        <section className="card">
          <form>
            <div className="form-item">
              <input type="email" name="email" id="email" required placeholder="E-mail" />
            </div>

            <div className="form-item">
              <input type="number" name="cpf" id="cpf" required placeholder="CPF" />
            </div>

            <div className="form-item">
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