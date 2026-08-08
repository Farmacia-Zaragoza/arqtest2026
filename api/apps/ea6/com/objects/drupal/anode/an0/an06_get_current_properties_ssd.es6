// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Get Current Properties Class  [V.0.2.0]  (2017-01-10)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 02]
// *anode_get_current_properties_ram > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_current_properties_ssd- 		: Try to get current properties from ram
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_generate_object_info } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an07_generate_object_info.es6'))

class anode_get_current_properties_ssd extends anode_generate_object_info {

	constructor()
	{
        super()
		this.n	=	'anode_get_current_properties::'											
    }
            
    get_current_properties_ssd() {   

		this.m 		=	'get_current_properties_ssd'		
		
		// /ram/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/cache/cica.dbrqx.com/anonymous/peloncita/fnode/node/cica_slider/human/a/common/common_76690

		// Aqui hay que tener en cuenta los distintos reloads							        
		// this.p ('BEFORE_SSD_READ ' + this.arr['properties'].length )		

        if ( this.if_exist_properties_ssd_reload_contents()		) 	
        {

			// Load current object properties
			this.load_dat_contents()
			
        } // End if
        else
		{
			// this.p('getting_disk ' + this.type + '  ' + this.short_type)														
			// 1. Intentamos pillar las propiedades de ram si se dedide
			// 2. Si no se decide o no hay fichero lo intentamos desde disco
			this.get_current_properties_disk() 															

		}
    }

}

exports.anode_get_current_properties_ssd = anode_get_current_properties_ssd