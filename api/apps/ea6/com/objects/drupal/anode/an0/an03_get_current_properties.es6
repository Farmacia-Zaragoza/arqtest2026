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
// - d-get_current_properties_ram- 		: Try to get current properties from ram
// - d-get_current_code_ram- 			: Try to get current code from ram
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_run_from_disk } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an0/an04_run_from_disk.es6')))

class anode_get_current_properties extends anode_run_from_disk {

	constructor()
	{
        super()
		this.n	=	'anode_get_current_properties::'											
    }
            
    get_current_properties_ram() {   

		this.m		=	'get_current_properties_ram'

		// this.p ('BEFORE_RAM_READ ' + this.arr['properties'].length )		
		// Aqui hay que tener en cuenta los distintos reloads							        
        if ( this.if_exist_properties_ram_reload_contents()		) 	
        {
			// this.p('Loadding_RAM_Dat_contents')															
			// Load current object properties
			this.load_dat_contents()
			
        } // End if
        else
		{
			// 1. Intentamos pillar las propiedades de ram si se dedide
			// 2. Si no se decide o no hay fichero lo intentamos desde ssd y sino desde disco general
			// this.pt('Trying_ssd ' + this.short_type )											
			
			this.get_current_properties_ssd() 															

		}
    }

}

exports.anode_get_current_properties = anode_get_current_properties