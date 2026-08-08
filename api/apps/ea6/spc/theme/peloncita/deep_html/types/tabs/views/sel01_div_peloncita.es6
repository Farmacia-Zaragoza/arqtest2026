// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Selections
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
//<div class="tab-content">
//*	<div id="General-pill" class="tab-pane fade active in">  								div_d09_p01

// div_id , div_tabset_id , slide_text , date , div_03_class

//*DIV
//  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--



class sel01_div_peloncita_middle extends html_style  {


    constructor (	fnode						= 	''			)
    {
       	this.tag_type     			= 	'div'

		this.n 												=	'sel01_div_middle::'

	    // Drupal Block Attributes
	    this.div_d01_id                         			=	''
	    this.div_d01_class_active							= 	''

	    this.div_d02_tabset_id                   			=	''
	    this.div_d02_class_fragment              			=	''

	    this.slide_text									=	''
	    this.div_d03_class                       			=	''

		this.site_url										=	''
		// Objects


		// Fast view node
		this.vnode

		// Fast image node
		this.inode

		// Fast image node
		this.jnode

		// Fast image node
		this.script_jnode

		// Html structures

		this.content_divs

		this.fnode					=	fnode

    	super.constructor(this.tag_type)

    }

	// <div id="General-pill-middle" class="tab-pane fade active in" role="tabpanel" aria-labelledby="General-pill-middle-tab">
    //      Go To Sendas tab for table view
	// Div reload contents
    reload_contents(	vnode					= ''			,	// 01
    									div_d01_id 	        = ''			, 	// 02
	    								div_d01_class_active	= ''			, 	// 03
    									div_d02_tabset_id		= ''			, 	// 04
    									div_d02_class_fragment = ''			,	// 05
	    								slide_text 			= ''			) 	// 06
    {

        //   <div id="General-pill-middle" class="tab-pane fade active in" role="tabpanel" aria-labelledby="General-pill-middle-tab">

		// Drupal Block attributes
		this.vnode					=	vnode

		// General_middle00-pill

		this.id				=	slide_text  + this.fnode.page_position + '-pill'
		this.class			=	'tab-pane fade'.  div_d01_class_active
		this.role 			= 	'tabpanel'

		this.aria_labelledby	=	slide_text  + this.fnode.page_position + 'pill-tab'

		//this.p('SlideBB ' + slide_text )

		if (slide_text == 'General')
		{
			// Flex
			this.content			+=	'Go to ' + slide_text
			this.content_divs		=	new flx04_div_peloncita_middle(	vnode)

			this.content			+=	this.content_divs.content
		}
		else if (slide_text == 'FotoListados'	)
		{
			// Json
			//this.p('LISTADOS Starting block D ' + slide_text )

			this.jnode 			= 	new jn01_gallery(this.vnode)

			this.script_jnode		=	new lst01_script_jquery(	this.vnode				,
																	this.jnode		)

			this.content_divs		=	new lst01_div_peloncita()

			//this.p('LISTADOS End block D ' + slide_text )

			this.content			+=	this.content_divs.content

			//this.p('Before block D ' + slide_text )


			//this.p('LISTADOS -- IIimgs_json_file ' +  this.jnode.ram_alias_json_path )

			//this.p('LISTADOS --  UUimgs_json_url ' +  this.jnode.ram_alias_json_url )

			this.fnode.jquery_code += this.script_jnode.code


			// this.p('End block ')

		}
		else if (slide_text == 'Imagenes'	)
		{			// Json

			//this.p('IMAGES Starting block E ' + slide_text )

			this.jnode 			= 	new jn01_gallery(this.vnode)

			this.script_jnode		=	new gal01_script_jquery(	this.vnode				,
																	this.jnode		)

			this.content_divs		=	new gal01_div_peloncita()

			//this.p('IMAGES End block E ' + slide_text )

			this.content			+=	this.content_divs.content

			//this.p('IMAGENES -- IIimgs_json_file ' +  this.jnode.ram_alias_json_path )

			//this.p('IMAGENES --  UUimgs_json_url ' +  this.jnode.ram_alias_json_url )

			//this.p('IMAGENES --  UUimgs_code_path ' +  this.jnode.ram_alias_code_path )
			this.fnode.jquery_code += this.script_jnode.code

			// this.dd('Content code > ' + this.content_divs.content)

			// this.dd('Script code > ' + this.script_jnode.code)

		}
		else
		this.content				+=	'Next ' + slide_text

		// this.create_view_div()



		this.pcreate()

	}

	// Must to exist
    build_data()			   {}


}

