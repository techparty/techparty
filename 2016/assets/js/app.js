/*! Author: github.com/fernandoporazzi */

'use strict';

var App = React.createClass({

  render: function () {

    return (
      <div>
        <Header name="TechParty"/>
        <Footer />
      </div>
    );

  }

});

React.render(<App />, document.getElementById('container'));
