// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS  Html Div Class  [V.0.0.2]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Peloncita Structure Footer
//-------------------------------------------------------------------------------------
// * <footer id="footer">
//     <div class="container">
//     <div class="all-places">
//	   <div class="container all-places-content">													LEVEL 01
// ------------------------------------------------------------------------------------
//*DIV
//  .. n depths ..
//  DIV 
//	  A * repeat
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class foo04_footer_peloncita extends html_style  {
 
    constructor (     	thm	              									,
    					h2_text			    = ''							)
    {   
    // El constructor debe cargar las propiedades del archivo
            this.tag_type     			= 	'footer'						

			this.h2_text					=	h2_text						

			this.thm						=	thm							

        	super(				this.tag_type	)			

//		    puting_contents='Foo02: Input file' . this.input_file  . '>' 
//    		GLOBALS['putcont']+=puting_contents

			
			this.clean_objects() 													
			
			this.build_data()												

    }
	clean_objects()
	{
		this.clean()															
	}


    create_div_01()
    {
		// External Div - Brqx links
		this.div_01 			 =	new foo02_div_peloncita(this.thm)

		this.content			+=  this.div_01.code					
	}		


    create_div_03()
    {
		// External Div - Footer Places
		// Obtenemos el content pero al ser un getset, el atributo es siempre code
		
		this.div_03 			=	new foo03_div_peloncita(this.thm)

		this.content			+=  this.div_03.code					
	}		

	check_loaded_footer()
	{
		let head_code = ''				

		this.compo_footer	= new cn01_base(this.thm.u , 'footer')

		if ( (this.compo_footer.loaded 	== 'no_generated'	) ||
			 (this.thm.u.search_method 	== 'reload'			) )
		{
			this.create_div_01()									
			this.create_div_03()									
	
			this.pcreate()										

			// Actualizamos el codigo del objeto
			this.compo_footer.load_type_details(this.code)						
		}		

		this.code	=	this.compo_footer.code
		
	}

    build_data()
    {
	// To build content is needed to build block
		this.check_loaded_footer()													


    }

}

exports.foo04_footer_peloncita = foo04_footer_peloncita
