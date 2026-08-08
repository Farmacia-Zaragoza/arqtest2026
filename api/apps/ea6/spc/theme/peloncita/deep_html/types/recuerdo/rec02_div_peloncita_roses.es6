// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Roses
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
//  <div class="left rose">
//  <div class="right rose">
// ------------------------------------------------------------------------------------
//*DIV
// DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class rec02_div_peloncita_roses extends getset  {

    constructor (	fnode			=	''						)
    {

		this.n			=	'rec02_roses::'

		super.constructor()

	    this.slide_text									=	''
	    this.node_id                         				=	''

		this.content_img									=	''

		this.site_url										=	''

		this.fnode					=	fnode

		this.div_rose_left			= new rec01_div_peloncita_left_rose(this.fnode)
		this.div_rose_right			= new rec01_div_peloncita_right_rose(this.fnode)

		this.build_data()
    }

	// Div reload contents

    clean_objects()
    {
		this.clean()
	}

	build_data()
	{

		this.code			= this.div_rose_left.code
		this.code			+= this.div_rose_right.code

	}

}

