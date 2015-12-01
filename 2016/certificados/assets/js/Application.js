import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import SearchGroup from './SearchGroup';
import InfoBox from './InfoBox';

class Application extends React.Component {

  // React's getInitialState() should live inside the constructor
  constructor(props) {
    super(props);

    this.state = {
      obj: 'teste'
    };
  }

  componentDidMount() {
    //
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <SearchGroup />
        <InfoBox />
      </div>
    );
  }
}

ReactDOM.render(
  <Application name="Fernando" />,
  document.getElementById('application')
);