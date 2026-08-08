// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Index Lib Fire - Index Sites  [V.0.0.2]  (2018-02-18)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology [COMMON-EA6]
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ index_def } 				= 	require(	path.join(JS_BASE, 'com/objects/fire/f02_index/index_def.es6')),
		{ anode_debug_save_file } 	= 	require(	path.join(JS_BASE, 'com/objects/drupal/anode/an9/an91_d_debug_save_file.es6')),
		{ printlog } 				= 	require(	path.join(JS_BASE, 'com/objects/logs/printlog.es6')),
		{ cbool } 					= 	require(	path.join(JS_BASE, 'com/objects/drupal/bool/b01_bool.es6')),
		{ cache } 					= 	require(	path.join(JS_BASE, 'com/objects/drupal/cache/c01_cache.es6')),
		{ site } 					= 	require(	path.join(JS_BASE, 'com/objects/drupal/site/s01_site.es6')),
		{ uri } 					= 	require(	path.join(JS_BASE, 'com/objects/drupal/uri/u01_obj.es6')),
		{ index_req } 				= 	require(	path.join(JS_BASE, 'com/objects/fire/f03_req/index_req.es6')),
		empty 						= 	require(	'is-empty'													);


class index extends index_def
{

  constructor(	pmt = '' )
  {
	// Atributos
	super()

	this.pmt 				= 	pmt 				// Parameters


	this.req				=	this.pmt.req
	// Usaremos ir - index request
	this.ir					=	new index_req()
	this.sch				=	this.pmt.sch

	if (!empty(this.req))
		this.load()
	else
	{
		this.p('SIMULATING_EA6 ' + this.pmt.live_opt + ' [' + this.pmt.nocode + ']' )
		this.simul()
	}

    this.n 					= 	'fire::'
    this.m					=	'constructor'

	// Will be reloaded from disk
	this.site_name 			= "truck"
	this.theme_name 		= "truck"


	global.start_time 		= this.starttimer

	this.puting_contents 	= "index:start:" + this.starttimer + ">"

	this.d 					= 	new printlog()

	this.d.d_start(this.puting_contents)

	this.b 					= 	new cbool()
	this.b.load(this.pmt)

	this.c 					= 	new cache(this.b)

	this.s 					= 	new site(this.c)
	this.s.pmt				=	this.pmt
	this.s.manage_params()


	this.u 					= 	new uri(this.s , this.ir , this.sch)
	this.u.manage_reload()

	// Igual en node si funciona
	global.SITE_URL_OBJECT = this.u

  }

  simul()
  {
		this.ir.simul()
  }

  load()
  {
		this.ir.load(this.req)
  }


}	// End Class

exports.index = index
