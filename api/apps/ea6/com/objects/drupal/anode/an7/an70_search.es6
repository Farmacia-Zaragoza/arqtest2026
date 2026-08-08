// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Search Class  [V.0.1.1]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 17]
// *anode_search > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-run_search- 				: 	Run search page
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_file } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an7/an71_file.es6'))

class anode_search extends anode_file {

	constructor()
	{
		super()
		this.n						= 'anode_search::'				    		
	}
            
	run_search()
	{
			this.m	=	'run_search'												
		// SEARCH ZONE 

		// ----------- Esta parte si tiene sentido -----------
		// Usa todas las composiciones. Hace una carga rapida de la pagina sin ser full cache
		// Es una busqueda. Vamos a intentar componer la pagina sin llamar a drupal

		// this.p('SEA') 
					
	
		// Aqui igual es dependiente del tema
		this.pg 					= 	new page_structure()
		
		// Solo debe llamar a la pagina si existen todos los ficheros
		// HEAD - HEADER - TOP - LEFT - RIGHT. Sino hay ue generarlos

		// Cada tema tendra la suya

		//this.p('Before Htm_Fast' )
					
		if (this.u.theme_name == 'peloncita' )
			this.search_page = new htm02_fast_peloncita(	this.u, 
															this.pg,
															this.method_to_load)									
		else						
			this.search_page = new htm02_fast_garsintife(	this.u, 
															this.pg)									

		// this.p('After Htm_Fast - Generated: ' + this.search_page.generated_code)
		
		this.search_page.generated_code = 'generated'								

		// Necesitamos un segundo metodo pues cache es solo a nivel de la pagina cacheada
		
		if ( (this.search_page.generated_code == 'generated') &&
      	     (this.u.search_method != 'reload'			   ) 	)
		
		{
			// this.p('Generated Search Fast 01 - ' )

			this.code			= this.search_page.code  
   		  	this.status = 1	 // Fast loaded
		}			
	// Normalmente solo teniamos un caso. O estaba cacheada o hay que llamar a drupal
	// ahora con las busquedas igual tenemos otro mas
		
	}

}

exports.anode_search = anode_search