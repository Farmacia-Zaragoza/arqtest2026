// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js Lib Fire  [V.0.0.1]  (2017-07-07)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology [Express 5]
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ printlog } 		= 	require(	path.join(JS_BASE, 'com/objects/logs/printlog.es6')),
		path 				= 	require( 'path' 												);

class index_def extends printlog
{

  constructor()
  {
	super()
	// Atributos
    this.n 				= 	'index_def::'

	this.site_name 		= "truck"
	this.theme_name 	= "truck"
	this.starttimer 	= ''

	// /mnt/ssd/brqx/base/rcode/es6/com/objects/fire
	this.base_dir 		= path.resolve(".")

	// this.p('BASE' + this.base_dir)
	// Pendiente
	this.supermnu_libs 	= this.base_dir + "/"

	// Values

	// Objects
	this.d 				= ''
	this.b 				= ''
	this.c 				= ''
	this.s 				= ''
	this.u 				= ''

	this.req			=	''	// Original request
	this.ir				=	''	// Index Request

	//Param object
	this.pmt			=	''

	this.sch			=	''	// Mongo Scheme

	// Reloads
	this.disk 			= "noreload"
	this.ssd 			= "noreload"
	this.ram 			= "noreload"
	this.search 		= "noreload"

	this.code			=	''
  }

}	// End Class

exports.index_def = index_def
