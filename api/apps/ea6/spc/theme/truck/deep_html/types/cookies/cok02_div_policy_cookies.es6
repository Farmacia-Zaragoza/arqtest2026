// [DOCHANGED_PHP56_NODE]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Cookies Div Truck Class  [V.0.1.1]  (2017-03-16)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div class="policy_content">
//    <section>   * N times (yaml file)
//        <p>

//-------------------------------------------------------------------------------------
//* DIV
//   DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - reload_contents   	  :
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 			= 	require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))

class cok02_div_policy_cookies extends html_style{


    constructor (   thm					= 	''  					)
   {
    // El constructor debe cargar las propiedades del archivo

		let tag_type 						=	'div'
        super(tag_type)

		this.n							= 	'cok01_div_policy_cookies::'

        this.tag_type                 	= 	'div'
		this.class 						=	'policy_content'

		this.thm						=	thm

		this.fyode 						=	this.thm.arr['fyode']['cookies']

		this.fnode 						=	this.thm.arr['fnode']['cookies_links']

		this.section_01					=	new html_style('section')


//    <div class="container text-center">

		this.build_data()
    }


	create_links_section()
	{

		this.section_01.content 	=	this.fnode.code							// 'SECTION>'

		this.section_01.pcreate()

		this.content 				+=	this.section_01.code


	}

  	create_sections()
    {
		// Create multiple sections
  		this.content			+=	this.fyode.code								// 'SECTION>'

  		this.create_links_section()

	}


    build_data()
    {
		this.content 				=	''

		this.create_sections()

		this.pcreate()

		// this.p('policy code >' + this.code)

	} // End Reload

}

exports.cok02_div_policy_cookies = cok02_div_policy_cookies
