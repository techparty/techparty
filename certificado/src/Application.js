import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import SearchGroup from './SearchGroup';
import InfoBox from './InfoBox';

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
