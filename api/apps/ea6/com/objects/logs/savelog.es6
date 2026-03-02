// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js Lib Savelog  [V.0.0.2]  (2018-01-15)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology [COMMON_EA6]
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 			= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"	);

const 	echo 			= 	require(	cons.NODE_MOD + 'node-echo'								),
		fs 				= 	require(	'fs'													);	

class savelog
{
	
  constructor() 
  {
	// Atributos
    this.n 				= 	''							 // class name
    this.m	 			= 	''							 // method name

    this.type	 		= 	''							 // type name

    this.lr	 			= 	'\n\r'						 // br

	// Web_debug_change
//	this.br 			= 	'</br>'	
	this.br 			= 	'\n\r'	


    this.lf				=	':</br>'

    
  }	

	dd(msg)
	{
		// Agile debug method. To load with deb - brqx alias
	    let puting_contents					=	this.n + msg  + '>' 	;
        global.GLOBALS['putcont']			+=	puting_contents;

		let file = 'brqx_debug.ddt'

		if (!fs.existsSync(file) ) 
			this.d_start ( msg )
		else
		{
			this.p('ADDING CONTENT')
		    //fs.writeFile('brqx_debug.ddt', GLOBALS['putcont'], function (err) {
		    fs.appendFileSync('brqx_debug.ddt', global.GLOBALS['putcont'])

		}
		global.GLOBALS['putcont']= ''											;
	}


	d(msg)
	{
		// Agile debug method. To load with deb - brqx alias
	    puting_contents				=	this.n + msg  + '>' 	;
        global.GLOBALS['putcont']	+=	puting_contents;
	}

	d_start(msg , letter = 't')
	{
		// Debug adding content only
	    let puting_contents			=	this.n + this.m +  '-' + msg  + '>' 	
        global.GLOBALS['putcont']	=	puting_contents

		let file 					=	'brqx_debug.dd' + letter 	

		if (!fs.existsSync(file) ) 
		{
			fs.appendFileSync(file , global.GLOBALS['putcont']);	    	
	 		fs.chmodSync(file, parseInt('0775',8));  //changed to add the zero
		}
		else
			fs.appendFileSync(file , global.GLOBALS['putcont']);	    	
	}

}	// End Class

exports.savelog = savelog;

