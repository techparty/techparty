import React from 'react';
import ReactDOM from 'react-dom';

import FaccatImage from '../../images/faccat.png';
import TechpartyImage from '../../images/techparty-logo.png';
import AssinaturaImage from '../../images/assinatura.png';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasData: this.props.canvasData,
      dates: {
        2016: '25 e 29 de Abril',
        2017: '24 e 28 de Abril',
      },
      imagesLoaded: 0,
      canvas: null
    };
  }

  formatDate(date) {
    let time = new Date(date);

    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();

    return `${day}/0${month}/${year}`;
  }

  handleFinished() {
    const { canvas, imagesLoaded } = this.state;
    if (imagesLoaded === 3) {
      this.props.onFinished({ encoded: canvas.toDataURL('image/png') });
    }
  }

  incrementImagesLoaded () {
    const { imagesLoaded } = this.state;
    this.setState((state) => ({ imagesLoaded: state.imagesLoaded + 1 }));
    this.handleFinished();
  }

  componentDidMount() {
    const { canvasData } = this.state;
    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    var ctx = canvas.getContext('2d');
    var faccatImage = new Image();
    var techpartyImage = new Image();
    var signImage = new Image();
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    var xCenter = canvas.width / 2;
    var yCenter = canvas.height / 2;

    faccatImage.src = FaccatImage;
    techpartyImage.src = TechpartyImage;
    signImage.src = AssinaturaImage;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, cWidth, cHeight);

    faccatImage.onload = () => {
      ctx.drawImage(faccatImage, 40, 25);
      this.incrementImagesLoaded();
    };

    techpartyImage.onload = () => {
      ctx.drawImage(techpartyImage, cWidth - 180, 10);
      this.incrementImagesLoaded();
    }

    signImage.onload = () => {
      ctx.drawImage(signImage, xCenter - 64, cHeight - 205);
      this.incrementImagesLoaded();
    }

    ctx.font = 'bold 50px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('Certificado de participação', xCenter, 163);

    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Este certificado está sendo conferido à', xCenter, 223);

    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(canvasData.name, xCenter, 290);

    // username underline
    ctx.beginPath();
    ctx.moveTo(200, 300);
    ctx.lineTo(970, 300);
    ctx.stroke();

    // assinatura underline
    ctx.beginPath();
    ctx.moveTo(710, cHeight - 125);
    ctx.lineTo(450, cHeight - 125);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';

    if (canvasData.isSpeaker) {
      ctx.fillText(`Conferimos o presente certificado à ${ canvasData.name } por ter ministrado`, xCenter, 383);
      ctx.fillText(`a palestra "${ canvasData.talk }" durante a TechParty ${ canvasData.year }`, xCenter, 410);
      ctx.fillText(`promovida pela Faculdades Integradas de Taquara no dia ${this.formatDate(canvasData.date)}, totalizando 50 minutos.`, xCenter, 437);
    }

    if (!canvasData.isSpeaker) {
      ctx.fillText('Certificamos sua participação na TechParty Faccat, realizada entre', xCenter, 383);
      ctx.fillText(`${ this.state.dates[canvasData.year] } de ${ canvasData.year }, na cidade de Taquara/RS, totalizando ${canvasData.totalTime} horas.`, xCenter, 410);
    }

    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Prof. Dr. Marcelo Azambuja', xCenter, cHeight - 100);

    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Coordenador do Curso de Bacharelado em Sistemas de Informação', xCenter, cHeight - 70);

    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Coordenador do Curso de Tecnólogo em Sistemas para Internet', xCenter, cHeight - 45);

    this.setState({ canvas });
  }

  render() {
    return (
      <canvas ref="canvas" width="1170" height="690"></canvas>
    );
  }
}
