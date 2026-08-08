// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Code Class  [V.0.1.9]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [Php_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 18]
// *anode_search > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-run_file- 				: 	Save common code
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_load } 		= 	require(	path.join(JS_BASE, '/com/objects/drupal/anode/an7/an72_load.ea6')));


class anode_file extends anode_load {

	constructor()
	{
        super()
		this.n						= 'anode_file::'				    		
    }
            
	run_file()
	{
		this.m	=	'run_file'												

		//this.p('Running file structure ' +  this.u.no_slash_uri  + '  ' + url_after)			
		// FILE ZONE 

		this.pg 					= 	new page_structure()
		
		// Solo debe llamar a la pagina si existen todos los ficheros
		// HEAD - HEADER - TOP - LEFT - RIGHT. Sino hay ue generarlos

		// Cada tema tendra la suya

		//this.p('Before Htm_Fast' )
					
		if (this.u.theme_name == 'peloncita' )
			this.file_page = new htm02_fast_peloncita(	this.u, 
															this.pg,
															this.method_to_load)									

		// this.p('After Htm_Fast - Generated: ' + this.search_page.generated_code)
		
		this.file_page.generated_code = 'generated'								


		// Esta parte esta pendiente. Hay que ver cuando mostrarla y cuando indicar estado incorrecto		
		// this.p('Generated Search Fast 01 - ' )

		this.code			= this.file_page.code  
	  	this.status = 1	 // Fast loaded
				
	}
	  
}

exports.anode_file = anode_file