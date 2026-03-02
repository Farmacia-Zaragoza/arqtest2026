// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Manage Code Type Class  [V.0.1.1]  (2017-01-10)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 10]
// *anode_manage_code_type > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-managing_code_type-			: Changin path and adding suffix
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_auth } 		= require(	cons.JS_BASE + 'com/objects/drupal/anode/an5/an50_auth.es6'		),
	path 				= require(	'path'																	);


class anode_manage_code_type extends anode_auth {

	constructor()
	{
		super()
		this.n						= 'anode_manage_code_type::'
	}				    		
            

	// Javascript no funciona con parametros con referencia
	managing_code_type(u_param , txt_add = 'code')
	{
		this.m 		= 	'managing_code_type'									


		this.replace(				u_param, "/page/", this.change )
		let param			=	path.dirname( this.result )						

		
		let common_str = '/common'														

		if (txt_add.substr(0,1) != "/" )	common_str +=	'/'						

		param			+=	common_str + txt_add

		// En javascript tenemos que usar una variable del objeto para devolver el valor, pues no hay paso de parametros por referencia		
		this.current_result 	= param									
		
	}

}

exports.anode_manage_code_type = anode_manage_code_type