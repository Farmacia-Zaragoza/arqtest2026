// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Html Div Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - build_node       : Load all drupal node details 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { pnode } 			= require(	'/brqx/base/rcode/es6/com/objects/drupal/node/pnode.es6'		)


// Para poder extender debe haberse incluido antes
class pn01_simple extends pnode {

	
    constructor (user_uid 			= 	0		, 
    							drupal_content 	= 	''		,
								supermnu_dats		=	''		)  
    {   
		super()		

		this.thm			=	''							
		
		this.pg				=	''			
	
		this.htm			=	''				

		this.drupal_content	= 	drupal_content	
		this.supermnu_dats	=	supermnu_dats	
		

    }

    get_current_properties() {   
		
						        
        if ( ( this.ram_real_path_compress	!= '' ) && ( file_exists(this.ram_real_path_compress)) )
//		if ( "a" == "b" )
        {

	      zipload(this.ram_real_path_compress, contents)       		  

        // Cada linea es una propiedad SEPARADOR (@) su valor

          for (var pos in contents)
          {
			 sLinea = contents[pos]

            html_arr      		 	=   sLinea.split("@")
            prop  	         		=   trim(html_arr[0])   // Obtiene el CN
//			arr_prop				=	substr(prop, 0,8) 		
            
            value         			=   ''
        
            len_arr        = html_arr.length  
                            
            if (len_arr > 1 )
            value     						=   trim(html_arr[1])   // Obtiene la clase

            if 	   ( prop 		== "u_real"				)		this.dash_real_url				=	value			
			else if ( prop 		== "u_alias"			)		this.dash_alias_url				=	value			
			else if ( prop 		== "u_user"				)		this.user_is_logged				=	value			

            
          } // End foreach    
  
			// Read code

		  zipload(this.ram_code_path_compress, this.code)       		  
   		  
   		  
   		  		  
        } // End if
        else
		{
			this.save_node()
		}
    }


	load_child_details()
	{
		// RECUERDA - AQUI SOLO ENTRA SI HAY QUE VOLVER A ACTUALIZAR LOS DATOS DE BD

//		print "generando"
		
		// Call to parent. Load view code
		this.load_details()											

		site_title					= 		"Anupam && Ricardo make cica fully responsive posible"		
		
	  	background_image			=		'images/Brqx_FondoVariado_300x200_Image11_i.png'
	  	top_image					=		"images/brqx_hozdepriegotajoosa_0512x0192.png"	 // Top pelona imagen
		logo_image					=  		"images/brqx_tour_eiffel_logo_04_180_garland.gif"
		icon_image					=  		"images/brqx_tour_eiffel_logo_04_180_garland.gif"
		
		
	    left_nid					=		76690
	    right_nid					=		76694
	    middle_info_nid			= 		76691	// Nid Info Selection
	    middle_nid					=		76692 	// Nid Selection List
	
	    footer_nid					=		76693	 // Brqx words information - Multi lang
	
		sw_front_page				=		''		 // Empty means no front page

		// Pn01_gzip:encoding:gzip, deflate:
		gzip_compression=_SERVER['HTTP_ACCEPT_ENCODING']


	    sw_front_page				= this.dash_alias_url				
		
		
		this.pg 					= 	new page_structure()
	        
	  	this.thm					=	new theme_structure(
	  								this.pg								,	// 01
	    							this.supermnu_dats					,	// 02 Path for files
	    							site_title								,	// 03
	    							background_image						,	// 04
	    							top_image								,	// 05
	    							logo_image								,	// 06
	    							icon_image								,	// 07
	    							left_nid								,	// 08
	    							right_nid								,	// 09
	    							middle_nid								,	// 10
	    							middle_info_nid						,	// 11
	    							footer_nid								,	// 12
	    							sw_front_page							,	// 13
									this.drupal_content						// 14 Drupal content				
									)
		
		
	    this.htm		= 	new htm01_html_peloncita(this.thm)	// Drupal theme structure

	    this.code = this.htm.code 		      

	}
	prepare_child_properties()
	{
		// Call to parent prepare method
		this.prepare_properties()		

	}

  
}

?>
