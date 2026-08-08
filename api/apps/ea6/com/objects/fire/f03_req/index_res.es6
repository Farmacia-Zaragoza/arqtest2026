// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js Lib Fire  [V.0.0.1]  (2017-07-07)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology [Express 5]
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"						);

var { printlog } 		= require(path.join(JS_BASE, 'com/objects/logs/printlog.es6')),
	path 				= require( 'path' )														;		

class index_res extends printlog
{
	
  constructor() 
  {
	super()

	// Atributos
    this.n 								= 	'index_res'		//  							 

    this.app            				=   ''   //    function(req, res) {},
    this.chunkedEncoding				=   ''   //    Boolean,
    this.connection     				=   ''   //     Socket,
    this.finished       				=   ''   //    Boolean,
    this.output         				=   ''   //    [],
    this.outputEncodings				=   ''   //    [],
    this.req            				=   ''   //    IncomingMessage,
    this.sendDate       				=   ''   //    Boolean,
    this.shouldkeepAlive    			=   ''   // Boolean,
    this.socket         				=   ''   //     Socket,
    this.useChunkedEncdoingByDefault    =   ''   //    Boolean,
    this.viewCallbacks  				=   ''   //    [],
    this.writable       				=   ''   //     Boolean	
  }	

}	// End Class

exports.index_res = index_res


