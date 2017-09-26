import React from 'react';
import ReactDOM from 'react-dom';

import './loader.css';
import './style.css';

import Header from './components/Header';
import SearchGroup from './components/SearchGroup';
import InfoBox from './components/InfoBox';

class Application extends React.Component {
  constructor(props) {
    super(props);
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
  <Application />,
  document.getElementById('application')
);
