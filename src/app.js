import {State} from './todo';
import {Transition} from './todo';
export class App {
  constructor() {

  	/* Initialisation */

    /* Automate initial*/ 

    this.heading = "States";
    this.Transitions = "Transitions";
    this.states = [];
    this.stateDescription = '';
    this.transitions = [];
    this.start = null ; 
    this.accepts = [];
    this.symbols = [];


    this.test = [];
    this.test2 = [];
    this.test3 = [];
    this.gamma =[];

    /* Automate déterministe */ 
    this.determinist = null ;

    this.deter_transition = [];
    this.T = [];
    this.Q = [];
    this.Z = [];

    this.debug = 0 ;
  }

  addState() {
  				// State should be unique // fix it after	
    if (this.stateDescription) {
      this.states.push(new State(this.stateDescription));
      this.stateDescription = '';
    }
  }


  removeState(state) {
    let index = this.states.indexOf(state);
    if (index !== -1) {
      this.states.splice(index, 1);
    } 
  }


  addTransition() // Suppose that source and target already exist // if not should add them automaticly 
  {
  	if (this.transitionSymbole && this.transitionSource && this.transitionTarget) {
      this.transitions.push(new Transition (this.transitionSource,this.transitionSymbole,this.transitionTarget));
      // Add the symbol to the list of symbols

      var test = true; 

      for(var i = 0; i < this.symbols.length ; i++)
      {
        if(this.symbols[i] == this.transitionSymbole)
          test = false;
      }

      if(test)
      this.symbols.push(this.transitionSymbole);


      this.transitionSymbole = '';
      this.transitionSource = '';
      this.transitionTarget = '';
    }
  }

   removeTransition(transition) {
    let index = this.transitions.indexOf(transition);
    if (index !== -1) {
      this.transitions.splice(index, 1);
    } 
  }


 	dfa_conversion()
 	{

    // Par défaut pour l'instant : Start = first state added, Accept = last state added

    this.start = this.states[0];
    
    length = this.states.length;

    this.accepts.push(this.states[length -1]);


    // Automate avant transformation 

   // this.automate = new Automate (this.states,this.symbols,this.transitions,this.start,this.accepts);
    
    // Transformation : A' = (Q,Z,S,q0,F);

   // this.Q = []; // States of determinist automate
    this.Q.push(this.states[0]); // Start == 0 

    this.debug =  1; // Checked

    // this.Z = this.symbols; // L'ensemble des symboles 

    // deter_transition :  L'ensemble des transactions de l'automate déterministe; 

    // T : Ensemble temporaire de nouvelles états formé de sous-ensemble d'état de l'automate initial 

    this.T.push(this.states[0]); 

    this.debug = 2; // Checked

    

    while(this.T.length > 0)
    {

      var doubles = false ; 

      var i=  Math.floor(Math.random()*(this.T.length)); // (Math.random()*100)%(this.T.length);

      var alpha = new State(this.T[i].description); // Un état de T (Ensemble temporaire)

      if(alpha.description.includes(","))
      {
        doubles = true;
        this.gamma = alpha.description.split(",");
      }

    //this.debug = 3 ; // Checked

        for(var j=0;j<this.symbols.length;j++)
        {

          var beta = []; // L'ensemble des états atteignable par Alpha, avec le symbol courant (symbols[j])

          //this.debug = 4; // Checked 


            for(var k=0;k<this.transitions.length;k++) // On vérifie pour toute les transitions 
            {

                  this.test.push(this.transitions[k].symbole.charCodeAt(0));
                  this.test2.push(alpha.description);

                  //this.debug = 5; Checked 

              if(doubles == false)
              {
                if( this.transitions[k].symbole == this.symbols[j] 
                    && (this.transitions[k].source == alpha.description) ) 
                {
                    //this.debug = 6;
                    beta.push(this.transitions[k].target);
                }
              }
              else
              {
                for(var m = 0; m<this.gamma.length; m++)
                {
                  if(this.transitions[k].symbole == this.symbols[j] && this.transitions[k].source == this.gamma[m] )
                  {
                    beta.push(this.transitions[k].target);
                  }
                }

              }
                
        
            } 

          // beta = Create new state : la concaténation des états qu'on peut atteindre à partir d'alpha, avec le symbole courant 


       
        if(beta.length != 0)
          {
           // Concaténation  

          var beta_state = new State(beta.toString());

          this.test3.push(beta_state.description);


          var test = true ; // test if beta_state is already included in the Q 

         
         //this.debug = 7; Checked
           // Si beta n'est pas déjà inclus déjà dans Q 
              // Alors T.push(new state)
              // Q.push(new state)


            for(var l=0;l<this.Q.length;l++)
            {
             if(this.Q[l].description == beta_state.description ) 
             {
              test = false;
             }
            }


          if(test == true)
          {
            this.T.push(beta_state);
            this.Q.push(beta_state);
          }
          
          //this.debug = 8; Checked

          // Création d'une transition : 
          // Ajouter cette transition à la liste des transitions de l'automate déterministe 

          this.deter_transition.push(new Transition(alpha.description,this.symbols[j],beta_state.description));

          //this.debug = 9 ; // Checked


         }
         else
         {
           this.test3.push("No state");
         }
         
         
        }

      // T.pop(alpha);

       
      this.T.splice(i, 1);

     // this.debug = 10; // Checked 

    }

   // this.determinist = new Automate(Q,Z,deter_transition,null,null);

   
  this.debug = 11; // Double Checked

 	}
 


}