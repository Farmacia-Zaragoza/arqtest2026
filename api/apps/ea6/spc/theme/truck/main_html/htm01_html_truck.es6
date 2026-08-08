// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Html Div Class  [V.0.0.2]  (2017-10-16)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
//<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
//<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="bb print language  lang="bb print language ">
// ------------------------------------------------------------------------------------
//<!DOCTYPE html>
//<html lang="en">
//<head>
//<body>
// ------------------------------------------------------------------------------------
//* DOCTYPE
//  HTML
//   HEAD
//	 BODY
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 			= require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),
		{ ifnojs } 				= require(	path.join(JS_BASE, 'com/objects/html/ifnojs.es6'))),

		{ hea01_head_truck }	= require(	path.join(JS_BASE, 'spc/theme/truck/main_html/hea01_head_truck.es6'))),
		{ bdy01_body_truck }	= require(	path.join(JS_BASE, 'spc/theme/truck/main_html/bdy01_body_truck.es6')));


class htm01_html_truck extends html_style  {

    constructor (     thm						)
	{
        let tag_type     			= 	'html'
    	super(				tag_type	)

        this.tag_type     			= 	'html'

		this.thm						=	thm

		this.ifnojs					=	new ifnojs()

		this.n 						=		'htm01_html_truck'

    	this.body_01    			=	''


	// Attributes

		this.img_background		=	''
		this.img_logo			=	''


		// Another level fast full page cache

		this.build_data()
    }
	//<head>
    create_head()
    {
		// External Head
		this.head_01	=
				new hea01_head_truck(this.thm)	// Drupal theme structure

//		this.content			+=  '<HEAD>HOLA</HEAD>' //this.head_01.code
		this.code			+=  this.head_01.code
			}

    create_body()
    {
		// External Div
		this.body_01	=
				new bdy01_body_truck( this.thm )	// Drupal theme structure

//		this.content			+=  '<BODY>HOLA</BODY>'  //this.body_01.code
		this.code				+=  this.body_01.code
	}


// <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-.
// <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-.
// <!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-.
// <!--[if gt IE 8]><!-.
// <html class="no-js" lang="">
// <!--<![endif]-.

	create_if_no_js()
	{
		this.ifnojs.ifno_oneline('7' , 'lt' , 'no-js lt-ie9 lt-ie8 lt-ie7' )
		this.code = this.ifnojs.code
		this.ifnojs.ifno_oneline('7' , ''   , 'no-js lt-ie9 lt-ie8')
		this.code += this.ifnojs.code
		this.ifnojs.ifno_oneline('8' , ''   , 'no-js lt-ie9')
		this.code += this.ifnojs.code
		this.ifnojs.ifno_complex('8' , 'gt'  	)
		this.code += this.ifnojs.code

	}


    build_data()
    {
	// To build content is needed to build block
		this.code			=	''

		this.create_if_no_js()

		this.create_head()
		this.create_body()

		// this.pcreate()

		this.code 		+= 	'</html>'

		// Esta linea no se puede hacer dinamica
//		doctype='<!DOCTYPE html>'

		// this.dd('Code >' + this.code )


    }

}

exports.htm01_html_truck = htm01_html_truck
