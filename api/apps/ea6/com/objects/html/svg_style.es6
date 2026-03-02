// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Svg Style Class  [V.0.0.4]  (2018-02-01)
// Brqx Group - Agile Farmacia Zaragoza Methodology - [COMMON-EA6]
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - create_svg_base	  : Create or image or svg based on site params
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 					= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"								);


const 	{ html_style } 			= 	require(	cons.JS_BASE + 'com/objects/html/html_style.es6'									),
		scpf 					= 	require( 	cons.JS_BASE + 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'	);


class svg_style extends html_style {
	
  constructor(   tag_type     	= ''  , 
                 tame         	= ''  , 
                 class_name    	= ''  ,
                 style        	= ''  ,
                 id           	= ''  ,
                 name         	= ''  ,   
				 value        	= ''  ,   
                 src          	= ''  ) 
	
  	{
 	super(tag_type, tame , class_name , style , id , name , value , src)
 	
    this.n 								= 	'svg_style::'	 
    this.svg_path						=	''
    this.svg_name						=	''
    this.svg_alt						=	''				// To Image Alt
    
    this.svg_01_code					=	''
    this.svg_code_path					=	''
    this.svg_code_url					=	''
    this.svg_class						=	''

    this.svg_lang						=	''
   
   	this.img_01							=	new html_style('img')
   	
   	this.fnode							=	''
    }

	create_svg_inline()
	{
		// It suppose when is called we have asigned an fnode to use
		
		this.svg_code_path 			= 	this.fnode.u.site_path + this.svg_path + this.svg_name 	

		// this.p('Mail_Code_svg_path ' + this.svg_code_path)										

		this.create_svg_inline_with_full_path()
	}

	create_svg_inline_with_full_path()
	{
		// It suppose when is called we have asigned an fnode to use
		
		this.svg_01_code 			= 	scpf.file_get_svg_code(this.svg_code_path)									
		
		this.content				+=	this.svg_01_code											
	}

	create_svg_external()
	{
		this.svg_code_url 			= 	this.fnode.u.http_domainbar + this.svg_path + this.svg_name 			

		this.create_svg_external_with_full_path()

	}

	create_svg_external_with_full_path()
	{
		this.img_01					= 	new html_style('img')

		this.img_01.src 			= 	this.svg_code_url 			

		this.img_01.alt				=	this.svg_alt

		this.img_01.class			=	this.svg_class

		this.img_01.lang			=	this.svg_lang

		this.img_01.pcreate()
		
		this.content				+=	this.img_01.code											
	}
    
	create_svg_base()
	{
		if ( this.fnode.b.site_inline )		
		{
			// Is a path
			this.create_svg_inline()
		}
		else
		{
			// Is an url
			this.create_svg_external()
		}
	}

	create_svg_base_with_full_path()
	{
		if ( this.fnode.b.site_inline )		
			this.create_svg_inline_with_full_path()
		else
			this.create_svg_external_with_full_path()
	}

}

exports.svg_style = svg_style