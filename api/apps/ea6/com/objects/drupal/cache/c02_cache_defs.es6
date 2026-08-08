//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS - Cache Definition Common Class  [V.0.0.1]  (2017-07-11)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Manage page cache
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

var { printlog } 		= require(	path.join(JS_BASE, 'com/objects/logs/printlog.es6')		)

class cache_defs extends printlog {
	constructor() {
		super()
		this.n 				= "cache_defs::"

		// Tenemos que definir todos los posibles arrays a usar
		this.arr 			= Array()

		// objects
		
		this.b				=	''

		this.arr['ram'] 	= Array()
		this.arr['ssd'] 	= Array()
		this.arr['dis'] 	= Array()
		this.arr['cod'] 	= Array()
		
		
		this.disk 			= "reload"
		this.ssd 			= "reload"
		this.ram 			= "reload"
		this.search 		= "noreload"
		
		this.special_disk 	= ""
		this.special_ssd 	= ""
		this.special_ram 	= ""
		this.special_code 	= ""
	}

}

exports.cache_defs = cache_defs