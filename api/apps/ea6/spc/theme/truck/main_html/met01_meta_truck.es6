// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Meta Div Class  [V.0.0.4]  (2017-07-07)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------

//[M_01] <meta charset="utf-8">
//[M_02] <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"">
//[M_03] <meta name="viewport" content="width=device-width, initial-scale=1">
//[M_04] <meta name="description" content="">
//[M_05] <meta name="author" content="">

//[M_06] <meta name="theme-color" content="#58A4DE" />
// ------------------------------------------------------------------------------------
//* META * 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"						);

const 	{ getset } 			= require(	cons.JS_BASE + 'com/objects/html/getset.es6'			),		
		{ html_style } 		= require(	cons.JS_BASE + 'com/objects/html/html_style.es6'		);

class met01_meta_truck extends getset  {

 
    constructor (     thm													)
    {   

		super()

		this.n								=	'met01_truck::'										



		this.thm							=	thm										

		this.fsite	 						=	this.thm.arr['fnode']['site_info_common']	
		this.flang	 						=	this.thm.arr['fnode']['site_info_lang']	

		this.meta_charset					=	new html_style('meta') 						
		this.meta_equiv						=	new html_style('meta') 						
		this.meta_viewport					=	new html_style('meta') 						
		this.meta_og						=	new html_style('meta') 						
		this.meta_normal					=	new html_style('meta') 						

		this.build_data()																
    }


	//[M_01] <meta charset="utf-8">
    create_meta_charset()
    {
		this.meta_charset.charset			 =  'utf-8'												
		this.meta_charset.pcreate()														
		this.code							+=	this.meta_charset.code							
	}		


	//[M_02] <meta http-equiv="X-UA-Compatible" content="IE=edge">
    create_meta_equiv()
    {
		this.meta_equiv.http_equiv			=  'X-UA-Compatible'										
		this.meta_equiv.mcontent			=  'IE=edge,chrome=1"'										
		this.meta_equiv.pcreate()														

		this.code							+=	this.meta_equiv.code							
	}		

	//[M_03] <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"">
    create_meta_viewport()
    {
		this.meta_viewport.name				=  'viewport'												
		this.meta_viewport.mcontent			=  'width=device-width, initial-scale=1, shrink-to-fit=n"'					
		this.meta_viewport.pcreate()														

		this.code							+=	this.meta_viewport.code							
	}		

	//[M_04] <meta name="description" content="">
    create_meta_description()
    {
		// Aqui falta el contenido del meta
		this.meta_normal.name				=  'description'											
		this.meta_normal.mcontent			=  this.flang.s.meta_desc									
		this.create_meta_normal()
	}		

	//[M_05] <meta name="author" content="">
    create_meta_author()
    {
		this.meta_normal.name				=  'author'													
		this.meta_normal.mcontent			=  this.flang.s.meta_author								
		this.create_meta_normal()
	}		

	//[M_06] <meta name="theme-color" content="#58A4DE" />
	//[M_05] <meta name="author" content="">
    create_meta_color()
    {
		this.meta_normal.name				=  'theme-color'											
		this.meta_normal.mcontent			=  '#fff '													
		this.create_meta_normal()
	}		

	// <meta property="og:url" content="http://dog.dbrqx.com/index2/" /> 
	// <meta property="og:type" content="website" /> 
	// <meta property="og:title" content="Brqx Site" /> 
	// <meta property="og:description" content="Dog site" /> 
	// <meta property="og:image" content="http://dog.dbrqx.com/index2/img/buttons/dog_button_2017.svg" />

    create_metas_og()
    {
		this.meta_og.property				=  'og:url'
		this.meta_og.mcontent				=  this.fsite.s.meta_og_url													
		this.create_meta_og()														

		this.meta_og.property				=  'og:type'
		this.meta_og.mcontent				=  this.fsite.s.meta_og_type												
		this.create_meta_og()														

		this.meta_og.property				=  'og:title'
		this.meta_og.mcontent				=  this.flang.s.meta_og_title											
		this.create_meta_og()														

		this.meta_og.property				=  'og:description'
		this.meta_og.mcontent				=  this.flang.s.meta_og_description												
		this.create_meta_og()														

		this.meta_og.property				=  'og:image'
		this.meta_og.mcontent				=  this.flang.s.meta_og_image													
		this.create_meta_og()														

	}		

    create_meta_og()
    {
		this.meta_og.pcreate()														
		this.code							+=	this.meta_og.code							
	}		

    create_meta_normal()
    {
		this.meta_normal.pcreate()														
		this.code							+=	this.meta_normal.code							
	}		
	
    build_data()
    {

		this.create_meta_charset()																
		this.create_meta_equiv()																
		this.create_meta_viewport()																
		this.create_meta_description()																
		this.create_meta_author()																
		this.create_meta_color()																
		this.create_metas_og()																

		// Ok [17-12-20]
		// this.p('MetaCode >' + this.code) 												

    }

}

exports.met01_meta_truck = met01_meta_truck