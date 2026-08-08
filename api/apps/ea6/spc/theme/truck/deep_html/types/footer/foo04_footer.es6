// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Footer Flat Class  [V.0.1.1]  (2017-03-16)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//* <footer class="clearfix">
//     <div class="col-sm-6 col-xs-12 text-center link"> - External - N
//     <div class="cookies"> - External
//       <div class="container text-center">
//         This website uses cookies to enhance browsing experience.

//-------------------------------------------------------------------------------------
// DIV
//  P - Repeat
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - reload_contents   	  : Build html final code for object
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		empty 						= require(	'is_empty'											),
		{ foo03_div_footer }		= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/footer/foo03_div.es6'),
		{ cok01_div_cookies }		= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/cookies/cok01_div_cookies.es6'));


class foo04_footer extends html_style{


    constructor (   thm										)
   {

        let tag_type                 		= 	'footer'

        super(tag_type)

		this.n								= 'foo04_footer::'

		this.fnode							=	''


		this.div_02							=	''

	// Strings

		this.cookies_msg					=	''
		this.link_href						=	''
		this.link_title						=	''

        this.tag_type                 		= 	'footer'

		this.thm							=	thm


		this.fnode_lang						=	this.thm.arr['fnode']['link_list_lang']
		this.fnode_common					=	this.thm.arr['fnode']['link_list_common']

		// /ssd/home/ser/zd/main/es/zdom/emp/truck/zd_main_truck/es/
		// this.p('site_path_footer' . this.fnode.u.site_path 	)

		this.class 							=	'clearfix'

		this.liv_01							=	new foo03_div_footer(this.thm, 'text-left')

		this.riv_01							=	new foo03_div_footer(this.thm, 'text-right')


		this.build_data()
    }

	// <div class="cookies">
    //    <div class="container text-center">
    //       This website uses cookies to enhance browsing experience. By continuing using this website you accept cookies. This website uses cookies to enhance browsing experience. By continuing using this website you accept cookies. This website uses cookies to enhance browsing experience. By continuing using this website you accept cookies.

	create_div_cookies()
	{

//		this.div_02	= 	new div01_div_div('cookies','container text-center', this.cookies_msg )

		this.div_02	= 	new cok01_div_cookies(this.thm)

		this.content 	+=	this.div_02.code
	}


    build_data()
    {
		this.content	= 		''

		// this.p('Before bucle ' + this.fnode.arr['url'].length)

		if ( !empty(this.fnode_common.arr['url']) )
		{
			let pos 		= 	0 															 // left
			let url			=	this.fnode_common.arr['url'][pos]
			let title		=	this.fnode_common.arr['tit'][pos]
			let target		=	this.fnode_common.arr['tar'][pos]
			let txt			=	''

			if (!empty(this.fnode_lang.arr['txt'][pos]))
			{
				txt		=	this.fnode_lang.arr['txt'][pos]
			}

			this.riv_01.reload_contents(url, title , txt , target  )

			this.content 	+=	this.riv_01.code


			pos 		=	1 															 // right
			url			=	this.fnode_common.arr['url'][pos]
			title		=	this.fnode_common.arr['tit'][pos]
			target		=	this.fnode_common.arr['tar'][pos]

			if (!empty(this.fnode_lang.arr['txt']))
				txt		=	this.fnode_lang.arr['txt'][pos]


			this.liv_01.reload_contents(url, title , txt , target  )

			this.content 	+=	this.liv_01.code

		}


		this.create_div_cookies()
	 	this.pcreate()

		// Ok [17-11-02]
		// this.p('code >' + this.code)

	} // End Build Data

}

exports.foo04_footer = foo04_footer
