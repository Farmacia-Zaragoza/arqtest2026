// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Taxonomy Class  [V.0.2.0]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 01]
// *anode_run_from_disk > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-load_properties_file-				: Load an external file like a letter
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 							= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_load_dat_contents } 	= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an1/an10_load_dat_contents.es6'))

class anode_taxonomy extends anode_load_dat_contents {

	constructor()
	{
        super()
		this.n	=	'anode_load_properties_file::'											
    }
            
	load_taxonomy()
	{
		// Hay que gestionar la taxonomia antes de grabar el fichero						
		// Taxonomy independiente
		if (this.node_have_taxonomy)
		{
			// Cuidado que podemos ser un tnode
			// RCD recuerdo cica_recuerdo n 76788
			// this.p('-----STARING_Tax_group ' + this.short_type + ' ' + this.type + '  ' + this.type_name + '  n ' + this.node_id)						

			this.tnode			=		new tnode(	this.u 					, 
													 this.node_id				,
													 this.method_to_load		 ,
													 this.taxonomy			)


			// Child method
			this.update_taxonomy_to_type()												


		}	


	}
	  
}

exports.anode_taxonomy = anode_taxonomy