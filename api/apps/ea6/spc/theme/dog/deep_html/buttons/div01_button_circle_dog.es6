//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Button Circle Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//	<div class="col desktop button-container">
//		<a href="http://dog.dbrqx.com/index2/">
//			<div data-toggle="popover"
//			data-trigger="focus" title=""
//			data-content="Click to go to the ... page"
//			class="social-link-button" data-original-title="Page name"></div>
//-------------------------------------------------------------------------------------
//* DIV
//    A
//     DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 						= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')))

class div01_button_circle_dog extends html_style {

	constructor()
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"div01_button_circle_dog::"
		this.passed_text	 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"col-lg-2 col-4 link-container"

		this.div_01					=	new html_style('div')
		this.a_01					=	new html_style('a')

		this.div_01.data_toggle		=	'popover'
		this.div_01.data_trigger	=	'focus'
		this.div_01.class			=	'social-link-button'
		this.div_01.title			=	''

	}


	reload_contents(	class_name		,
						link			,
						title			,
						text			)
	{

		// this.p('Reloading ' + link )

		this.class						=	class_name

		this.a_01.href 					=	link

		this.div_01.data_content		= 	text

		this.div_01.data_original_title	=	title

		this.div_01.pcreate()

		this.a_01.content				=	this.div_01.code

		this.a_01.pcreate()

		this.content					=	this.a_01.code

		this.pcreate()

		// Ok  [18-02-05]
		// this.p ('btn_cir-Code>' + this.code)
	}
}

exports.div01_button_circle_dog = div01_button_circle_dog
