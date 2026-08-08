// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.6]  (2016-11-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------

// *   [ only content]
//        <!-- start footer -.
//      <div class="all-places">
//      <div class="container all-places-content">


//* FOOTER
//   DIV
//   DIV

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Slider Div02 Peloncita Class  
// ------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - reload_contents  : Reload field attributes
// - load_file        : Load dat file from system   
// - build_data       : Build html final code for object 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { getset } 		= require(	'/brqx/base/rcode/es6/com/objects/html/getset.es6'		)

class pla04_footer_peloncita extends getset{

    constructor (   fnode		           	= ''			,
					text									)
									 
   {   

		this.n						= 'pla04_foo::'				    		
		        

        this.fnode  				=      	fnode							
        this.text  				=      	text								


        super.constructor()								



        this.div_01          		=       
        				new pla01_div_peloncita_footer(
        						this.fnode								,
								this.text									)

        this.div_02          		=       
        				new pla03_div_peloncita_footer(
        						this.fnode								)

				

		this.build_data()	            

    }


    build_data()
    {

		this.code		= 	this.div_01.code 											
		this.code		+= 	this.div_02.code 											
		
      
  } // End Build Data
    
}

exports.pla04_footer_peloncita = pla04_footer_peloncita
