/*! Author: github.com/fernandoporazzi */

;(function(w, d, undefined) {

  'use strict';

  var App = React.createClass({
    render: function () {

      return(
        <div>
          <h1>TechParty</h1>
        </div>
      );

    },
  });

  React.render(<App />, document.getElementById('content'));

})(window, document);
