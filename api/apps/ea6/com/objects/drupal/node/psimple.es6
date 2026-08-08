// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Page Node Simiple Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - get_child_properties   	  : Build html final code for object 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ pnode } 				= 	require(path.join(JS_BASE, 'com/objects/drupal/node/pnode.es6'))

class psimple extends pnode {

	constructor()
	{
		super()
		this.n		= 	'psimple::'										
	}

    get_child_properties(prop, value) {   
	// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	// Luego cada tipo tendra un ajuste como este	

	        if 	   ( prop 		== "u_real"				)		this.u.drupal_real_dash_uri		=	value			
			else if ( prop 		== "u_alias"			)		this.u.dash_url					=	value			
			else if ( prop 		== "u_user"				)		this.u.drupal_user_uid			=	value			
    }


	prepare_specific_child_properties()
	{
		this.arr['properties'].push( "u_real"  +   this.sep  + this.u.drupal_real_dash_uri	)				
		this.arr['properties'].push( "u_alias" +   this.sep  + this.u.dash_url				)			
		this.arr['properties'].push( "u_user"  +   this.sep  + this.u.drupal_user_uid		)			
	}
  
}

exports.psimple = psimple