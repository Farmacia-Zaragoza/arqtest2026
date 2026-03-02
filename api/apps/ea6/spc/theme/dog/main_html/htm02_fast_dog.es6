// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Flat Main Class  [V.0.0.2]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
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

const 	{ html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'						),		
		{ cn01_base }		= require(	'/brqx/base/rcode/es6/spc/theme/common/fast_node/cnode/cn01_base.es6'		);					


class htm02_fast_flat extends html_style  {

    constructor (   u				= ''					,
     								pg				= ''					,	// Page Object
     								img_bg			= ''					,
    								body_class		= 'sidebars'			,
									html_lang		= 'es' 					)
 
    {   

		let tag_type 					= 'html'
    	super(				tag_type	)			

        this.tag_type     				= 	'html'						
            		
		// Attributes
		
		 this.img_background			=	''					
		 this.img_top					=	''					  
	
		 this.img_logo		    		=	''					  
		 this.img_icon		    		=	''					  
	
		// Composition objects
		
		 this.compo_head 				=	''							
		 this.compo_header 				=	''					
		 this.compo_footer 				=	''					
		 this.compo_scripts				=	''					
		 this.compo_left				=	''					
		 this.compo_right				=	''						
				
	
		// Html Objects
		
		 this.div_01					=	''					
		 this.body_01					=	''					
		 this.section_01				=	''					
		 this.row_01					=	''					
		 this.div_search				=	''					
	
		// String
		
		 this.generated_code = 'no_generated'				

		 this.u 						=	u 							
		 this.pg						=	pg							
		 this.body_class 				=	body_class 				
		 this.html_lang					=	html_lang					

		// Check Exist All Files
					
		this.check_exist_all_files()									
    }

	 check_exist_all_files()
	{
		// Para que se pueda usar la clase deben existir todos los ficheros de codigo

//		print 'htm02Fast_- Checking 01 - ' + '<br>'
		
		// A. HEAD
		this.compo_head		= new cn01_base(this.u , 'head')		

//		print 'htm02Fast Peloncita_- Checking path - ' +  this.compo_head.ram_alias_code_path + '<br>'
//		print 'htm02Fast_- Head Generate - (' + this.compo_head.loaded + ') ' +  this.compo_head.ram_alias_code_path. '<br>'

		this.generated_code 	= this.compo_head.loaded 			
		if (this.generated_code == "generated" ) 		 
		{
			// B. BODY FOOTER
			this.compo_footer	= new cn01_base(this.u , 'footer')	
			
			this.generated_code 	= this.compo_footer.loaded 			
			if (this.generated_code == "generated" )		 
			{
//				print 'htm02Fast_- Closure Generated 01 - ' + '<br>'
				// C. HEADER
				this.compo_header	= new cn01_base(this.u , 'header')	
				this.generated_code 	= this.compo_header.loaded 			
				if (this.generated_code == "generated" )		 
				{
//					print 'htm02Fast_- Header Generated 01 - ' + '<br>'
					// D. TOP						
					this.compo_scripts	= new cn01_base(this.u , 'scripts')
					this.generated_code 	= this.compo_scripts.loaded 			
					if (this.generated_code == "generated" )		 
					{
//						print 'htm02Fast_- Top Generated 01 - ' + '<br>'
						// D. LEFT						
						this.compo_left	= new cn01_base(this.u , 'left')
						this.generated_code 	= this.compo_left.loaded 			
						if (this.generated_code == "generated" )		 
						{
//							print 'htm02Fast_- Right Generated 01 - ' + '<br>'
							// D. RIGHT						
							this.compo_right	= new cn01_base(this.u , 'right')
							this.generated_code 	= this.compo_right.loaded 			
						}
					}
				}
			}
		}

		if (this.generated_code == "generated" )		 
		{
			this.body_01					= 	new html_style('body')		

			this.div_01 					= 	new html_style('div')		

			this.section_01 				= 	new html_style('section')		

			this.row_01 					= 	new html_style('div')		

			this.div_search				= 	new html_style('div')		

			// Pendiente

//			print 'htm02Fast_flat- Generating Body - ' + '<br>'

			this.build_data()												
		}		
	}


  	create_server_footer()
    {
		// Server information page - No cacheable in blocks

		this.pg.create_div()
		this.body_01.content		+=	this.pg.code							
	}

  	create_div()
    {
		this.div_01.id		=	"fb-root"						
		this.div_01.pcreate()									
	
		this.body_01.content			+=  this.div_01.code					
	}

	create_div_search()
	{
		this.div_search.class 	 =	'col-sm-6 col-lg-7 middle-content' 

		this.div_search.content	+= 'SEARCH_BLOCK</br>' 			 //this.thm.d.drupal_content
		search_node				 = new sn01_garland(this.u)
		this.div_search.content	+= search_node.code 			 

		this.div_search.pcreate() 								
		
		this.row_01.content		+= 	this.div_search.code		 
	}


	create_row()
	{
		// Left Part - 3s

		this.row_01.class		= 'row'				
		
		this.row_01.content		+=	this.compo_left.code		

		// Middle Part
	  	this.create_div_search()									
	
		// Left + Right - 4s
		// Right Part - Twitter Facebook
		this.row_01.content		+=	this.compo_right.code	

		this.row_01.pcreate()											

		this.section_01.content	= this.row_01.code	

	}


	create_section()
	{
	 	// create row
	  	this.create_row()
	 	
	 	
	 	this.section_01.class 	= 	'container'											
		this.section_01.id		=	'main-content'										
	 		 	

		this.section_01.pcreate()

		this.body_01.content		+=	this.section_01.code			
	}
	
	body_cache()
	{
		// Here flat function
		// If image is not correct - page is white
		this.body_01.class			= "b-lazy"								

		// La imagen no la conoce - hay que pasarsela
		this.body_01.data_src	=	
				this.img_background 

		this.body_01.content 	+=	this.compo_header.code								

		// Have main code

//		this.body_01.content 	+=	'SECTION'  //
			
		this.create_section()										
	
		// Is not needed to cache
		this.create_div()											

		this.body_01.content 	+=	this.compo_footer.code								

		this.body_01.content 	+=	this.compo_scripts.code								

		// No cacheable
		this.create_server_footer()								

		this.body_01.pcreate()									

		this.content 				+=	this.body_01.code				

		
//		this.content 				+=	this.body_01.code				
	}


    build_data()
    {
	// To build content is needed to build block
		this.content			=	''								
		this.lang				=	'en'							

		// Head
//		this.content = '<head>HOLA</HEAD>'  
//		print 'CODE' + this.compo_head.code + 	'ENDCODE'						
		this.content += this.compo_head.code  
	
//		this.content += 'BODY'											
		this.body_cache() 										

		this.pcreate()											

		// Esta linea no se puede hacer dinamica
//		doctype='<!DOCTYPE html>'									

//		this.code=doctype + this.code							

//	    puting_contents='htm01:FOO code >' + this.code + '>' 	
//        GLOBALS['putcont']+=puting_contents

    }

}

exports.htm02_fast_flat = htm02_fast_flat