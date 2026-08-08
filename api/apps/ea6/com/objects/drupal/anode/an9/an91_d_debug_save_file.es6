// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 01 - 05 ] Node JS To Override Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// To Override object
//--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=-
// Inheritance Line [Inner Level 01] [Global Level 06]
//-------------------------------------------------------------------------------------
// *anode_debug_screen > Anodes >  Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//-------------------------------------------------------------------------------------
// Methods Defined

// - d-d-				:   Debug file adding method
// - d-dd-				:   Debug file adding method
// - d-ddx-				:   Debug file adding method
// - d-ddi-				:   Debug file adding method
// - d-ddt-				:   Debug file adding method


// - d-d_start-			:   To start debug in clean file


// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { override } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an9/an92_override.es6'))	,
	fs 					= require('fs')																				;

class anode_debug_save_file extends override{

	constructor()
	{		
		super()
		this.n 							= 	'override::'
		this.file_append_ddt			=	'brqx_debug.ddt'			
		this.file_append_ddx			=	'brqx_debug.ddx'			

		this.file_append				=	'brqx_debug.ddx'
		this.data_to_append				=	''	
    }

	append()
	{
		fs.appendFile(this.file_append, this.data_to_append, function (err) {
  		if (err) throw err;
  			// console.log('Saved ' + this.file_append);
		});
	}

	create()
	{
		fs.writeFile(this.file_append, this.data_to_append,  (err) => {
  		if (err) throw err;
  			// console.log('Saved ' + this.file_append );
		});
	}

           
	// Debug functions
	dd(msg)
	{
		// Agile debug method. To load with deb - brqx alias
	    let puting_contents=this.n + this.m +  '-' .msg  + '>' 							
        global.GLOBALS['putcont']	+=	puting_contents
        this.data_to_append			=	global.GLOBALS['putcont']	

		this.file_append			=	this.file_append_ddt	
		this.append() 

		this.file_append			=	this.file_append_ddx	
		this.append() 

		global.GLOBALS['putcont']= ''												
	}

	// Debug functions
	ddt(msg)
	{
		// Agile debug method. To load with deb - brqx alias
	    puting_contents=this.n + this.m +  '-' .msg  + '>' 							

        global.GLOBALS['putcont']	+=	puting_contents
        this.data_to_append			=	global.GLOBALS['putcont']	

		this.file_append			=	this.file_append_ddt	
		this.append() 


		global.GLOBALS['putcont']= ''												
	}

	// Debug functions
	ddx(msg)
	{
		// Agile debug method. To load with deb - brqx alias
	    let puting_contents=this.n + this.m +  '-' .msg  + '>' 							

        global.GLOBALS['putcont']	+=	puting_contents
        this.data_to_append			=	global.GLOBALS['putcont']	

		this.file_append			=	this.file_append_ddx	
		this.append() 

		global.GLOBALS['putcont']= ''												
	}

	d_start(msg , letter = 'x')
	{
		// Debug adding content only
	    let puting_contents=this.n + this.m +  '-' .msg  + '>' 	

        global.GLOBALS['putcont']	=	puting_contents
        this.data_to_append			=	global.GLOBALS['putcont']	

		this.file_append			=	this.file_append_ddt	
		this.create() 

		this.file_append			=	this.file_append_ddx	
		this.create() 

	}


	d(msg)
	{
		// Debug adding content only
	    let puting_contents			=	this.n + this.m +  '-' + msg  + '>' 	
        global.GLOBALS['putcont']	=	puting_contents

        this.data_to_append			=	global.GLOBALS['putcont']	

		this.file_append			=	this.file_append_ddx	
		this.append() 
	}

  
}

exports.anode_debug_save_file = anode_debug_save_file