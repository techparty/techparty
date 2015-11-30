var React = require('react');
var ReactDOM = require('react-dom');

var Application = React.createClass({
  render: function() {
    return (
      <p>hello world!</p>
    );
  }
});

ReactDOM.render(
  <Application />,
  document.getElementById('application')
);