//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Button Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//* <div class="col-lg-2 col-4 link-container">
//	  <a href=''
//	    <div class="link-text-container">
//   		<div class="link-text-control-right"></div>
//			<div class="link-text">Lorem ipsum dolor sit amet, consectetur
//			<div class="link-text-control-left"></div>
//-------------------------------------------------------------------------------------
//* DIV
//   DIV
//     DIV * 3
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 						= 	require(	cons.JS_BASE  + 'com/objects/html/html_style.es6'		)

class div01_button_dog extends html_style {

	constructor()
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"div01_button_dog::"
		this.passed_text	 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"col-lg-2 col-4 link-container"

		this.div_01					=	new html_style('div')
		this.a_01					=	new html_style('a')


		this.liv_02					=	new html_style('div')
		this.div_02					=	new html_style('div')
		this.riv_02					=	new html_style('div')

		this.div_01.class			= 	'link-text-container'

		this.riv_02.class			= 	'link-text-control-right'
		this.div_02.class			= 	'link-text'
		this.liv_02.class			= 	'link-text-control-left'

		this.riv_02.pcreate()
		this.liv_02.pcreate()


	}

	// <div class="col-lg-2 col-4 link-container">
	create_button()
	{
		this.div_02.content			=	this.passed_test
		this.div_02.pcreate()

		this.div_01.content			=	this.riv_02.code
		this.div_01.content			+=	this.div_02.code
		this.div_01.content			+=	this.liv_02.code

		this.div_01.pcreate()

		// Aqui debo decidir si los links son comunes o dependientes del idioma
		this.a_01.href				=	this.passed_link
		this.a_01.content			=	this.div_01.code
		this.a_01.pcreate()

		this.content				+=	this.a_01.code

		this.pcreate()

		// this.p('btndiv2_code > ' + this.code )
	}

	reload_contents(	text					,
						link 		= ''		)
	{
		this.content 				= 	''

		this.passed_test 			=	text
		this.passed_link 			=	link
		this.create_button()
	}
}

exports.div01_button_dog = div01_button_dog
