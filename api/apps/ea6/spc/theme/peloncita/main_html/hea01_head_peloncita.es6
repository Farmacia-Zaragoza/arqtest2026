// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.2]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
//<head>
//	METAS
//	<title>Welcome to CICA</title>
//  LINKS
// ------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class hea01_head_peloncita extends html_style  {

    constructor (     thm								)
    {   

        this.tag_type     			= 	'head'						
		
		this.meta_01					=	''

		this.link_01					=	''
	            				
 	
 		this.compo_head					=	''						


		this.thm						=	thm						

    	super.constructor(				this.tag_type	)			

		// Head can't have tame
		this.tame						=	''							


		this.title_01					=	new html_style('title') 	
	
		this.build_data()											

    }


	// 	<div id="logo">
  	create_metas()
    {
		// External Metas

		this.meta_01			=	new met01_meta_peloncita( this.thm)
    
		this.content			+=   this.meta_01.code					
	}

//	<title>Welcome to CICA</title>
  	create_title()
    {
		this.title_01.content		=	this.thm.site_title						
		this.title_01.pcreate()									
	
		this.content			+=   this.title_01.code					
	}


  	create_links()
    {
		// External links
	    this.link_01			=	new lnk01_link_peloncita(this.thm)
	
		this.content			+=   this.link_01.code					
	}

	check_loaded_head()
	{
		head_code = ''				

//		print 'hea01_- Uri - ' + this.thm.u.site_url + '<br>'
		
		this.compo_head	= new cn01_base(this.thm.u , 'head')

//		print 'htm01_- Check head - ' + this.compo_head.ram_alias_code_path + '<br>'
		// this.p('htm01_- Check load - ' + this.compo_head.loaded )

		if ( this.compo_head.is_correct_to_reload_type() ) 
		{

			this.create_metas()											
			this.create_title()											
			this.create_links()											

			// Adding drupal head styles && scripts
			this.content +=  this.thm.drupal_head  						
	 		this.content +=  this.thm.drupal_styles						
	 		this.content +=  this.thm.drupal_scripts 					

			this.pcreate()											

			// Actualizamos el codigo del objeto
			this.compo_head.load_type_details(this.code)						
		}		

		this.code	=	this.compo_head.code

	}

//	<header data-background = "url('images/brqx_hozdepriegotajoosa_0512x0192.png')">
    build_data()
    {
	// To build content is needed to build block

		this.check_loaded_head()											


    }

}

exports.hea01_head_peloncita = hea01_head_peloncita