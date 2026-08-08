// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Anode Load in Any Position Class  [V.0.1.9]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 20]
// *anode_loadanypos > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-intelligent_url_load_any_pos- 			: 	Uris inteligentes - Ordenan y gestionan cadenas
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const { anode_img } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an7/an74_img.es6'))


class anode_loadanypos extends anode_img {

	constructor()
	{            
		super()
		this.n						= 'anode_loadanypos::'
	}
					
	
	intelligent_url_load_any_pos()
	{
		// Debe definir el path real en razon de un path dado comprobando cualquier combinacion
		// 2013/portugal/lisboa ==> 2013/Portugal/b02_Lisboa 
		// lisboa/2013/portugal ==> 2013/Portugal/b02_Lisboa

		this.m	=	'intelligent_url_load_any_pos'												
				
		real_path			=	''															
		
		// 2013/Portugal/b0_Lisboa
		//this.p('Url after' + url_after) 																
		
		// Eliminamos elementos duplicados
		original_path_arr 	=  	this.u.slash_ideal_uri.split('/') 									


		if (!is_dir(this.path)) 
		{

			current_line = ''																
			ideal_path		= 	''															

			cont = 0 
			cont_line =  original_path_arr.length										

			// 4			
			// this.p('Count line ' + cont_line)											
			
			while (cont < cont_line)
			{

				path			= 	this.base_folder_path + ideal_path						

				// REVISAR BUCLE

				for (elem in original_path_arr)
				//foreach (original_path_arr as pos => elem)												
				{
					// :os 2 line /2013/Portugal/b0_Lisboa

					real_path = match_path(elem , path)								
					if (real_path  != '' ) 
					{
						//this.p('Matching Elem: ' + elem + ' Path:  ' + path) 																
						// El path es correcto
						// this.p('Unset ' +  pos)													
						unset(original_path_arr[pos])																
						break 
					} 
				
					//this.p('Pos ' + pos + ' line ' + ideal_path)						

				} // End foreach
				
				if (real_path  != '' )
					ideal_path+= basename(real_path)	+ '/'											

				cont++ 																
			} // End While

		// Tenemos el array de los current
		// Ideal path 2013/Portugal/b02_Lisboa/
		// path /ssd/myr/img_base_resolution/2013/Portugal/b02_Li		
			// this.p('Ideal path ' + ideal_path)				

			this.u.real_sub_query	=	ideal_path										
			this.path					= 	this.base_folder_path + ideal_path			

			// this.p('path ' + this.path)				
		
		}
		
	}
	  
}

exports.anode_loadanypos = anode_loadanypos
