// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Selections
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
// * <div class="tagadelic-container">
//      <a href="/vis/taglugar/personal/Akureiry" class="tagadelic level3" rel="tag" title="Akureiry"> Akureiry</a>

//*DIV
//  A
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class tag01_div_peloncita_footer extends html_style  {


    constructor (	fnode						= 	''			)
    {
            this.tag_type     			= 	'div'


			this.n 		=	'tag01_tagadelic::'

			this.fnode					=	fnode

        	super.constructor(this.tag_type)

			this.a_01 					=	new html_style('a')

			this.class 					=	'tagadelic-container'
    }

//      <a href="/vis/taglugar/personal/Akureiry" class="tagadelic level3" rel="tag" title="Akureiry"> Akureiry</a>
	// Div reload contents
    reload_contents(	href					= ''			, 	// 01
	    								class_name				= ''			, 	// 02
    									title					= ''			, 	// 03
    									content 				= ''			) 	// 04
    {

		// Gen/vis/taglugar/personal/Akureiry tagadelic level2 Akureiry Akureiry
		// this.p('Gen' . href . ' ' . class . ' ' . title . ' ' . content)	+=

		this.a_01.class			=	class_name
		this.a_01.href 			= 	href
		this.a_01.title			= 	title

		this.a_01.content		=	content

		this.a_01.pcreate()

		this.content				=	this.a_01.code
		this.pcreate()

	}

}

exports.tag01_div_peloncita_footer = tag01_div_peloncita_footer

