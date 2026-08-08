// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.6]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Div Middle Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//*	<div class="col-sm-6 col-lg-7 middle-content">
//    <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
//	  <div class="bubble-background" data-background="rgba(0, 0, 0, 0) url('images/Brqx_FondoGotas_rosa_100x100.gif') repeat-x scroll left top">  </div>
//	  <div class="countries-container"> // Is a view
//-------------------------------------------------------------------------------------
// DIV
//  DIV
//  DIV
//  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

// or arraymap or iterator_to_array dont exist in php 5.2
//innerHTML(node) {
//    return implode(array_map([node.ownerDocument,"saveHTML"],iterator_to_array(node.childNodes)))
//}



class sld06_div_peloncita_middle extends html_style{
    			
             
    constructor (   thm		)  
   {   

		super()
		this.n						= 'sld06_mid::'				    		
	
		// Drupal Theme structure
		thm											 // Theme structure
	
		// Fast node dats
		
		mid_fnode									
	
		fnode									
		ifnode									
		
		search_node 									 // Fast node for searching
			
	    // Num elements of menu
	    num_elements_menu    = 	''                  
		    
	
		// Fast View name                   
		vname										 
	      
	    // Html Structures
	    
	    div_01                                        // Div dhtml object
	
	    div_search                                    // Div dhtml object
            

        this.tag_type                 	=      'div'             					

	  	this.thm							=		thm								
	  	
		this.mid_fnode					=		this.thm.nid.arr['fnode']['region_middle']
		

        parent::constructor(this.tag_type)    


        this.div_02                    	= 		new html_style('div')      			
        this.div_03                    	= 		new html_style('div')      			

       	this.clean_objects()                                              		
		this.build_data()	            
    }

    clean_objects() 
    {   
		this.clean()															
	}


//	<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
    create_div_01()
    {


      	this.div_01		= 	new sld05_div_peloncita_middle(	&this.thm )

		// SELECTION CAROUSEL
		this.content		=	this.div_01.code	 //'DIV_01>'

	}
    
//    <div class="bubble-background" data-background="rgba(0, 0, 0, 0) url('images/gray_placeholder.jpg') repeat-x scroll left top" ></div>
    create_div_02()
    {
	  // Pending to review
      this.div_02.code      = '' 
      this.div_02.content   = ''
	  this.div_02.class     = 'bubble-background'			 

      this.div_02.data_background = 
      		"rgba(0, 0, 0, 0) url('" + this.thm.u.site_url + "resp_images/Brqx_FondoGotas_rosa_100x100.gif') repeat-x scroll left top"
      this.div_02.pcreate()

      this.content		+=	this.div_02.code		//'DIV_02>' 						

	}


//	<div class="countries-container">
    create_div_03()
    {
	  // Pending to review    	
      	this.div_03.code      = '' 
      	this.div_03.content   = '' 
		this.div_03.class 	 = 'countries-container'								


//		print_r (this.current_view)													
		current_viewname		="zb81_sp_paises"										
		group_list_num			= 5														

		// PENDIENTE - BLOQUE PAISES

		// Id is only needed if we have params
		this.vname	=	new vn02_list(
								current_viewname										,
								group_list_num											,
								this.mid_fnode
								)
        
// Tenemos
//		<a href="/pais/alaska_usa" class="imagefield imagefield-field_foto_al_azar imagefield-nodelink" id="imagefield-nodelink-63842"
//		<img src="http://cica.dbrqx.com/files/images/paises/al_azar/brqx_kat10usa_viva_-_Katmai_-_Cascadas_Brooks_-_Paraiso_de_los_osos_con_salmones_-_Falls_Bears_-_V
//		aldez_-_Alaska_-_USA_2010_DSCN7250043_0150.JPG" alt="brqx_kat10usa_viva_-_Katmai_-_Cascadas_Brooks_-_Paraiso_de_los_osos_con_salmones_-_Falls_Bears_-_Valdez_-
//		_Alaska_-_USA_2010_DSCN7250043_0150.JPG" title="brqx_kat10usa_viva_-_Katmai_-_Cascadas_Brooks_-_Paraiso_de_los_osos_con_salmones_-_Falls_Bears_-_Valdez_-_Alas
//		ka_-_USA_2010_DSCN7250043_0150.JPG" width="150" height="112" class="imagefield imagefield-field_foto_al_azar" /

		
//      Queremos
//      <span class="view-field">
//         <a href="/pais/bosnia" class="image-wrapper shadow3">
//             <img class="b-lazy " src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
//              data-src="http://cica.dbrqx.com/files/images/paises/al_azar/brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG" 
//              alt="brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG" title="brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG"  width="120" height="90">
//             </a>
//      </span>

		//<span  class="view-item view-item-zb81-sp-paises">                
		span_01 = new html_style('span')
		span_01.class = "view-field"

		final_code	=	''
		
		// Cambiamos todo. Vamos a tener un array de imagenes tambien aqui
		
		// this.p('Imgs ' + this.vname.arr['oim'].length) 

		img_01 = new lazy_03()			

		cont = 0 
		// Son 43 - vamos a hacer un random de 8
		
		if (!empty(this.vname.arr['oim']))		
		for (var num in this.vname.arr['oim'])
		{
			let img	= 	this.vname.arr['oim'][num]
		
			alt 	=	this.vname.arr['tit'][num]									
			weight	=	this.vname.arr['wid'][num]									
			height	=	this.vname.arr['hei'][num]									

			if ( rand(0,10) < 2 ) 
			{
				img_01.reload_contents(img, alt, weight, height)		
	
	
				span_01.content= img_01.code							
				span_01.pcreate()											
				final_code+=span_01.code									
				cont++														
				if (cont >7) break 										
			}
		}
 		
//		Option to load block - we can do block or view
//		block_type			=  "views"					
//		bloc_id			=  current_viewname			
//		block 				= 	module_invoke(block_type	, 'block','view', current_viewname	) // dont works
//		block_code			=	block['content']

		this.div_03.content = final_code  

		this.div_03.pcreate()

		// this.dd('Paises code ' + this.div_03.code)				
		
		this.content			+=	'DIV_03 ' + this.div_03.code // 'DIV_03>'        
		     
    }

    build_data()
    {
    	this.code      = '' 
      	this.content   = '' 
		this.class 	 =	'col-md-6 col-lg-7 middle-content col-md-push-3 col-lg-push-2-point-5'			
      	
		// this.d('Building Middle')										

		// Si no es frontpage solo hay contenido drupalsw_isfront
		if (this.thm.u.is_front == 'no' )
		{
			// Situacion normal de paginas que no son front
			// this.d('Building No front')										
						
			// a. Usuario anonimo intenta acceder a admin
			if ( 	(this.thm.u.drupal_user_uid == 	0			) && (this.thm.u.page_type 		== 'private' 	) )
			{
				// debe cargarse una pagina de error pues un usuario anonimo no tiene permisos						
				// Generar una pagina partiendo de un node id dado
				// identificacion de usuario no autenticado
				nid					=	76926								
				this.content			+= 	node_load(nid)					
			}
			else 
			{
			// b. Usuario autentidado - o bien uri no es admin
			//    Usuario anonimo en pagina publica	

				// b1. Es una busqueda
				if (this.thm.u.is_search_page == 'yes' )
				{
					// toca generar contenido de busqueda
					// Vamos a generar unos tabs
					unique_page_position = 'search_00'													
					
					// realmente search node es mas indicado
					// El fnode lo necesita para la url y el metodo de carga
					this.search_node	= new sn01_garland()

					this.search_node.run_from_fnode(this.mid_fnode)


					this.div_search = new sea03_div_peloncita_middle(
											&this.search_node 						)
										
					// this.d('Div code ' + this.div_search.code)																							
	
					this.content	+=	this.div_search.code 												


					this.content	+= 'SLD06_SEARCH_BLOCK</br>'  //this.thm.d.drupal_content
					this.content	+= this.search_node.code  
					
				}
				else
				{			

					// No es una busqueda
					this.content			+=	this.thm.drupal_content								
				}
			}
		}
		else
		{

		  	this.create_div_01()	// Carousel
	
		  	this.create_div_02() // Gotas
		
		  	this.create_div_03() // Paises
		}	

		this.pcreate()

		
	} // End Build Data
  
}

exports.sld06_div_peloncita_middle = sld06_div_peloncita_middle