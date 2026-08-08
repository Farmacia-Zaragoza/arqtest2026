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

class index_req extends printlog
{
	
  constructor() 
  {
	super()
	// Atributos
    this.startTime 				=	''	 //    =   ''   //    Date, 
    this.app            		=   ''   //    function(req,res){},
    this.body           		=   ''   //    {},
    this.client         		=   ''   //    Socket,
    this.complete       		=   ''   //    Boolean,
    this.connection     		=   ''   //    Socket,
    this.cookies        		=   ''   //     {},
    this.files          		=   ''   //     {},
    this.headers        		=   ''   //    {},
    this.httpVersion    		=   ''   //    String,
    this.httpVersionMajor    	=   ''   //    Number,
    this.httpVersionMinor    	=   ''   //     Number,
    this.method         		=   ''   //    String,  // e.g. GET POST PUT DELETE
    this.next           		=   ''   //    function next(err){},
    this.originalUrl    		=   ''   //    String,     /* e.g. /erer?param1=23¶m2=45 */
    this.params         		=   ''   //    [],
    this.query          		=   ''   //    {},
    this.readable       		=   ''   //    Boolean,
    this.res            		=   ''   //    ServerResponse,
    this.route          		=   ''   //    Route,
    this.signedCookies  		=   ''   //    {},
    this.socket         		=   ''   //    Socket,
    this.url            		=   ''   //    String /*e.g. /erer?param1=23¶m2=45 */
   	
   	//Brqx
   	this.protocol				=	'http'
   	this.domain					=	''
   	this.server_ip				=	''
   	this.port					=	''
   	this.uri					=	''


	} // End Constructor
	
	load(req = '')
	{
		this.method		=	req.method		// GET
		this.url		=	req.url			// uri

		this.uri		=	req.url			// uri
		// url /de
		// console.log('url ' + this.url)
		if (req.secure) 	this.protocol = 'https' 	// http | https
		// subdomain or domain
		this.domain		=	req.hostname			
		this.server_ip	=	req.socket.remoteAddress

		// Falta recargar el site

	}
	
	
	simul()
	{
		// this.p('SIMUL_PAGE')
		this.uri		=	'/it@reload'
		this.protocol 	= 	'http' 	// http | https
		this.domain		=	'node.dbrqx.com'
		this.port		=	'80'

	}	
		
		
}	// End Class

exports.index_req = index_req


