import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './Canvas';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      encoded: false
    };
  }

  _encodeCanvas(data) {
    this.setState({encoded: data.encoded});
  }

  _download() {
    var anchor = ReactDOM.findDOMNode(this.refs.downloadAnchor);

    anchor.href = this.state.encoded.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

    return false;
  }

  render() {
    const { user } = this.props;
    const downloadName = `Certificado_TechParty_${user.year}_${user.email}.png`;
    var showButton;
    var content;

    var downloadButton;

    if (this.state.encoded) {
      downloadButton = <a ref="downloadAnchor" download={downloadName} className="btn btn-secondary" onClick={this._download.bind(this)}>DOWNLOAD</a>
    }

    if (!user.isSpeaker) {
      content = <div className="user-card__info">
                  <p className="user-card__p">
                    <span className="user-card__desc">Dias comparecidos:</span>
                    <span className="user-card__count">{user.present}</span>
                  </p>

                  <p className="user-card__p">
                    <span className="user-card__desc">Total de horas:</span>
                    <span className="user-card__count">{user.totalTime}</span>
                  </p>
                </div>
    }

    if (user.present) {
      showButton = downloadButton;
    }

    if (user.isSpeaker) {
      content = <div className="user-card__info">
                  <p className="user-card__p">
                    <span className="user-card__desc">Duração da palestra:</span>
                    <span className="user-card__count">50 minutos</span>
                  </p>
                </div>

      showButton = downloadButton;
    }

    return (
      <section className="card user-card">
        <h2>{user.name}</h2>

        {content}

        {showButton}

        <Canvas onFinished={this._encodeCanvas.bind(this)} canvasData={user} />
      </section>
    );
  }
}
