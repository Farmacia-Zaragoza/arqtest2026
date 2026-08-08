//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Helper Dog Div Button Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------

//* <li class="bottomli text-center">
//	  <a href="dog.dbrqx.com/test_0">test 0


//-------------------------------------------------------------------------------------
//* LI
//    A
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')))

class li01_menu_dog extends html_style {

	constructor()
	{
		let tag_type 				= 	"li"
		super(tag_type)
		this.n 						= 	"li01_menu_dog::"

		this.class					=	'bottomli text-center'

		this.a_01					=	new html_style('a')

		this.tag_type 				= 	"li"

	}

	reload_contents( mnu_name , mnu_link = '' )
	{

		this.a_01.content				=	mnu_name
		this.a_01.href					=	mnu_link

		this.a_01.pcreate()
		this.content					=	this.a_01.code

		this.pcreate()

		//Ok [18-01-06]
		// this.p('li01_Code > ' +  this.code)

	}

}

exports.li01_menu_dog = li01_menu_dog
