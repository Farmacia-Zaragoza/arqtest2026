//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS -  Bool Class  [V.0.0.5]  (2017-11-26)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 					= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"			);

const 	{ bool_copy } 			= 	require(	path.join(JS_BASE, 'com/objects/drupal/bool/b02_bool_copy.es6')))

// Change to cbool to be the same than php
class cbool extends bool_copy {
	constructor() 
	{
		super()
		this.n 					= 	"bool::"
	}

	load(	pmt = '' )			 
	{

		this.n 					= 	"bool::"
		this.m 					= 	"load"

		this.pmt				= 	pmt

		// this.p('Passing_cache ' + true +  ' ' + pmt.cache_disk)

		this.site_cache 		= 	this.pmt.cache_disk
		this.mongo_cache		= 	this.pmt.cache_mongo

		this.nocode				= 	this.pmt.nocode
		this.max_elems			= 	this.pmt.max_elems

		this.site_lang 			= 	this.pmt.lang
		this.site_lang_uri 		= 	this.pmt.lang_uri

		this.site_live 			= 	this.pmt.live
		this.site_translation 	= 	this.pmt.trans
		this.site_sync 			= 	this.pmt.sync

		
		// Is possible to equal different objects ... I'll try tomorrow
	}

	live() //Set boolean for live site
	{
		this.site_live 			= true
	}

	dev() //Set boolean for dev site
	{
		this.site_live 			= false
	}

}

exports.cbool = cbool