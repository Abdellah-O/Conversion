export class State {
  constructor(description) {
    this.description = description;
    this.start = false ; 
    this.accept = false ; 
  }
}

export class Transition{
	constructor(source,symbole,target)
	{
		this.symbole = symbole;
		this.source = source ;
		this.target = target; 
	}
}

export class Automate 
{
	constructor(states,symbols,transitions,start,accepts)
	{
		this.states = states; 
		this.symbols = symbols;
		this.transitions = transitions;
		this.start = start;
		this.accepts = accepts;
	}
}






 /* JSON 
  done()
  {

  	var length = states.length; 

  	var object = {

  		"states": states,
  		"transitions" : transitons,
  		"start" : states[0],
  		"accept" : states[length -1]
  	}

  	// Testing JSON

  	// Storing Data ; 

  	var json = JSON.stringify(object);

  	localStorage.setItem("Automate",json);

  	// Retrieving Data;

  	var text = localStorage.getItem("Automate");

  	var done = JSON.parse(text);

  }

  */
