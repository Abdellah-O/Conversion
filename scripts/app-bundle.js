define('app',['exports', './todo'], function (exports, _todo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.heading = "States";
      this.Transitions = "Transitions";
      this.states = [];
      this.stateDescription = '';
      this.transitions = [];
      this.start = null;
      this.accepts = [];
      this.symbols = [];

      this.test = [];
      this.test2 = [];
      this.test3 = [];
      this.gamma = [];

      this.determinist = null;

      this.deter_transition = [];
      this.T = [];
      this.Q = [];
      this.Z = [];

      this.debug = 0;
    }

    App.prototype.addState = function addState() {
      if (this.stateDescription) {
        this.states.push(new _todo.State(this.stateDescription));
        this.stateDescription = '';
      }
    };

    App.prototype.removeState = function removeState(state) {
      var index = this.states.indexOf(state);
      if (index !== -1) {
        this.states.splice(index, 1);
      }
    };

    App.prototype.addTransition = function addTransition() {
      if (this.transitionSymbole && this.transitionSource && this.transitionTarget) {
        this.transitions.push(new _todo.Transition(this.transitionSource, this.transitionSymbole, this.transitionTarget));


        var test = true;

        for (var i = 0; i < this.symbols.length; i++) {
          if (this.symbols[i] == this.transitionSymbole) test = false;
        }

        if (test) this.symbols.push(this.transitionSymbole);

        this.transitionSymbole = '';
        this.transitionSource = '';
        this.transitionTarget = '';
      }
    };

    App.prototype.removeTransition = function removeTransition(transition) {
      var index = this.transitions.indexOf(transition);
      if (index !== -1) {
        this.transitions.splice(index, 1);
      }
    };

    App.prototype.dfa_conversion = function dfa_conversion() {

      this.start = this.states[0];

      length = this.states.length;

      this.accepts.push(this.states[length - 1]);

      this.Q.push(this.states[0]);

      this.debug = 1;

      this.T.push(this.states[0]);

      this.debug = 2;

      while (this.T.length > 0) {

        var doubles = false;

        var i = Math.floor(Math.random() * this.T.length);

        var alpha = new _todo.State(this.T[i].description);

        if (alpha.description.includes(",")) {
          doubles = true;
          this.gamma = alpha.description.split(",");
        }

        for (var j = 0; j < this.symbols.length; j++) {

          var beta = [];

          for (var k = 0; k < this.transitions.length; k++) {

            this.test.push(this.transitions[k].symbole.charCodeAt(0));
            this.test2.push(alpha.description);

            if (doubles == false) {
              if (this.transitions[k].symbole == this.symbols[j] && this.transitions[k].source == alpha.description) {
                beta.push(this.transitions[k].target);
              }
            } else {
              for (var m = 0; m < this.gamma.length; m++) {
                if (this.transitions[k].symbole == this.symbols[j] && this.transitions[k].source == this.gamma[m]) {
                  beta.push(this.transitions[k].target);
                }
              }
            }
          }

          if (beta.length != 0) {

            var beta_state = new _todo.State(beta.toString());

            this.test3.push(beta_state.description);

            var test = true;

            for (var l = 0; l < this.Q.length; l++) {
              if (this.Q[l].description == beta_state.description) {
                test = false;
              }
            }

            if (test == true) {
              this.T.push(beta_state);
              this.Q.push(beta_state);
            }

            this.deter_transition.push(new _todo.Transition(alpha.description, this.symbols[j], beta_state.description));
          } else {
            this.test3.push("No state");
          }
        }

        this.T.splice(i, 1);
      }

      this.debug = 11;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.use.basicConfiguration();
    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('todo',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var State = exports.State = function State(description) {
    _classCallCheck(this, State);

    this.description = description;
    this.start = false;
    this.accept = false;
  };

  var Transition = exports.Transition = function Transition(source, symbole, target) {
    _classCallCheck(this, Transition);

    this.symbole = symbole;
    this.source = source;
    this.target = target;
  };

  var Automate = exports.Automate = function Automate(states, symbols, transitions, start, accepts) {
    _classCallCheck(this, Automate);

    this.states = states;
    this.symbols = symbols;
    this.transitions = transitions;
    this.start = start;
    this.accepts = accepts;
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <div> Debug : ${debug} </div>\n  <h1>${heading}</h1>\n\n  <form submit.trigger=\"addState()\">\n    <input type=\"text\" value.bind=\"stateDescription\">\n    <button type=\"submit\">Add State</button>\n  </form>\n\n\n  <h1> ${Transitions} </h1>\n  <form submit.trigger=\"addTransition()\">\n    <input type=\"text\" value.bind=\"transitionSource\"> \n    <input type=\"text\" value.bind=\"transitionSymbole\">\n    <input type=\"text\" value.bind=\"transitionTarget\">\n    <button type=\"submit\">Add Transition</button>\n  </form>\n\n\n\n<form submit.trigger = \"dfa_conversion()\">\n\n\n<ul>\n    <li repeat.for=\"state of states\">\n      <span >\n       <input type = \"radio\" name =\"start\" value.bind = \"stateStart\">\n\n        <input type=\"checkbox\" name =\"accept\" value = \"${state.description}\">\n\n         ${state.description}\n      </span>\n      <button click.trigger=\"removeState(state)\">Remove</button>\n    </li>    \n</ul>\n\n\n  <ul>\n    <li repeat.for=\"transition of transitions\">\n      \n      Source : <span> ${transition.source} </span>\n      \n      Symbole : <span> ${transition.symbole} </span>\n      \n      Target : <span> ${transition.target} </span>\n\n      <button click.trigger=\"removeTransition(transition)\">Remove</button>\n    </li>    \n  </ul>\n\n  \t<button type =\"submit\"> Conversion </button>\n\n  </form>    \n\n\n\n<h3> L'automate non déterministe :</h3>\n  <ul>\n\n\n  \t<li> Start : ${start.description} </li>\n    <li repeat.for=\"accept of accepts\"> Accept : ${accept.description} </li>\n    <li> Liste des symboles :\n    <span repeat.for=\"symbol of symbols\"> ${symbol} </span> \n\n    </li>\n  </ul>\n\n\n<h3> L'automate déterministe :  </h3>\n\n      <h5> Les états : </h5>\n      <ul>\n          <li repeat.for=\"state of Q\"> ${state.description} </li>\n      </ul>\n\n\n      <h5> Les transitions </h5>\n      <ul>\n          <li repeat.for=\"transition of deter_transition\"> \n            \n              Source : <span> ${transition.source} </span>\n      \n              Symbole : <span> ${transition.symbole} </span>\n              \n              Target : <span> ${transition.target} </span>\n\n\n           </li>\n      </ul>\n\n\n      <!-- \n\n      Testing : \n      <ul>\n          Test 1 : <li repeat.for=\"testing of test\"> ${testing} </li>\n         Test 2<ul> <li repeat.for=\"testing2 of test2\"> ${testing2}</li> </ul>\n         Test 3 <ul> <li repeat.for=\"testing3 of test3\"> ${testing3} </li> <ul> \n          Gamma  <ul> <li repeat.for=\"g of gamma\"> ${g} </li> <ul> \n      </ul>\n\n      -->\n\n\n<br/>\n<div> Checkbox : for the \"Accept\" states </div>\n<div> Radio : for the \"Start\" state  </div>\n\n</template>"; });
//# sourceMappingURL=app-bundle.js.map