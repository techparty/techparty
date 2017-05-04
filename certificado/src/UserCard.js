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
    var downloadName = 'Certificado_' + this.props.user.name.replace(/\s+/g, '') + '.png',
      showButton,
      content;

    var downloadButton = <a ref="downloadAnchor" download={downloadName} className="btn btn-secondary" onClick={this._download.bind(this)}>DOWNLOAD</a>;

    if (!this.props.user.isSpeaker) {
      content = <div className="user-card__info">
                  <p className="user-card__p">
                    <span className="user-card__desc">Dias comparecidos:</span>
                    <span className="user-card__count">{this.props.user.present}</span>
                  </p>

                  <p className="user-card__p">
                    <span className="user-card__desc">Total de horas:</span>
                    <span className="user-card__count">{this.props.user.totalTime}</span>
                  </p>
                </div>
    }

    if (this.props.user.present) {
      showButton = downloadButton;
    }

    if (this.props.user.isSpeaker) {
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
        <h2>{this.props.user.name}</h2>

        {content}

        {showButton}

        <Canvas onFinished={this._encodeCanvas.bind(this)} canvasData={this.props.user} />
      </section>
    );
  }
}
