// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node delete - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object
// - build_node       : Load all drupal node details
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--



var { pcomp } 			= require(	path.join(JS_BASE, 'com/objects/drupal/node/dnode.es6')))

// Para poder extender debe haberse incluido antes
class dn01_base extends dnode {

    constructor (	u					=	'' 		,
    								nid	 			= 	''				// 01. Url Object
								)
    {
		// Podemos recuperar el objeto url actual

		this.b						= 	new bool()

		this.u 				=	u
		this.s 				=	this.u.s
		this.c 				=	this.u.c


		this.b.copy (this.s.b)

		//		this.u				=	GLOBALS['SITE_URL_OBJECT']
      	super.constructor()
    }

    delete_current_properties()
    {
//	  	print 'Pn04_Checking:  ' + 		this.u.user_type + '<br>'

		this.delete_files_from_ssd_and_ram_anon()
		this.delete_files_from_ssd_and_ram_auth()

	}


}

?>
