// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Html Div Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-cn01_base-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - get_child_properties   	: Build html final code for object
// - load_type_details       	: Load all drupal node details
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ pcomp } 				= require(	cons.JS_BASE + 'com/objects/drupal/node/pcomp.es6'							),
		{ cbool } 				= require(	cons.JS_BASE + 'com/objects/drupal/bool/b01_bool.es6'							);


// Para poder extender debe haberse incluido antes
class cn01_base extends pcomp {


    constructor (	u	 				= 	''				,	// 01. Url Object
    				compo_zone			=	'left'			,	// 02. Zone
					stype				=	'cica_compo'	)   // 04. Node Type
    {

		super()
		this.n									= 	'cn01_base::'
		this.u									=	u

		this.b									= 	new cbool()

		this.s 									=	this.u.s
		this.c 									=	this.u.c


		this.b.copy (this.s.b)

		this.type								=	'composition'
		this.short_type							=	'CO'

		this.compo_zone							= 	compo_zone
		this.stype								=	stype 												 // Subtype - cica_image
		this.type_name							=	this.stype


		// NID what views need to load values

		this.b.type_user						=	false

		this.b.type_common						=	true
		this.b.type_translation					= 	false
		this.b.type_translated					= 	true

		this.b.type_have_taxonomy				=	false
		this.b.type_have_code					=	true
		this.b.type_have_properties				=	true
		this.b.type_have_specific_properties	=	true


		this.change								=	'/' + this.type +	'/'

		this.suffix								=	 'zone_' + compo_zone
   		this.suffix_disk 						= 	this.suffix

		this.suffix_lang						=	this.suffix + '_' +	this.s.lang


   		this.suffix_code 						= 	this.suffix_lang + '.' + this.u.ssl_page + '_code' + '.compo'


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()

 		// /brqx/pers/drupal/v50/fnode/peloncita/cica_compo/left.dat
		// this.p('Path_compo ' + this.load_from_disk_path)
		// /brqx/pers/drupal/v50/fnode/truck/composition/zone_head

		if (this.s.load == 'drupal')
		{
			this.run_from_drupal()
			// create_paths - get_current_properties
		}
		else
		{
			this.run_from_disk()
			// create_paths - get_current_properties_from_disk
		}
		// this.p('RAM_cnode ' + this.ram_alias_path							)
		// /mnt/ram/brqx/base/react/zcommon/apps/cache/nsu/node.dbrqx.com/nouser/truck/composition/human/a/common/zone_head
    }

    get_child_properties(prop, value) {

		// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
		// Pendiente de revisar

            if 	   ( 	prop 		== "c_gen"				)		this.code_generated							=	value
			else if ( 	prop 		== "b_type"				)		this.bock_type								=	value


	}

	// ----- OJO EXTERNAL METHOD - DONT CHANGE NAME
	load_type_details(compo_code = '')
	{
		this.n									= 	'cn01_base::'
		this.m	=	'load_type_details'
		// RECUERDA - AQUI SOLO ENTRA SI HAY QUE VOLVER A ACTUALIZAR LOS DATOS DE BD

		// Call to parent. Load view code
		this.code			=	compo_code

	  	// this.pnn('cn01_Code ' + this.code.length + ' P ' + this.ram_alias_code_path)

		if (this.s.load				== 'drupal' 		)
			this.save_node()
		else
			this.save_node_disk()


	}

}

exports.cn01_base = cn01_base
