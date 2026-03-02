// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Html Div Class  [V.0.0.2]  (2016-11-09)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
// <header  class="header b-lazy" data-src="http://cica.dbrqx.com/rimg/cica/images/brqx_hozdepriegotajoosa_0512x0192.png" data-src-small="">
//   <a id="logo" class="image-wrapper no-shadow" href="/" title="">
//     <img class="b-lazy" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
//      data-src="http://cica.dbrqx.com/rimg/cica/images/brqx_tour_eiffel_logo_04_180_garland.gif" width="180" height="131" alt="">

//* HEADER
//   A
//	  IMG
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class hdr01_header_peloncita extends html_style  {

    constructor (     thm										)
    {   
        this.tag_type     			= 	'header'						
            		
	
		this.compo_header				=	''										

    	super.constructor(				this.tag_type	)			


		this.thm						=	thm							
		this.map						=	this.thm.map + 'header/'		


		this.a_01					=	new html_style('a') 			

		this.img_01				=	new html_style('img') 			

		this.load_file() 													
	
		this.build_data()												

    }

    clean_objects() 
    {   
		this.clean()															
	}

    load_file() {   
    // El constructor debe cargar las propiedades del archivo

    	this.clean_objects() 													
            
		// REVISAR BUCLE            
		  for (sLine in this.thm.top_contents)
          //foreach (this.thm.top_contents as sLinea)
          {
            // Cada linea tiene el formato
            // htmlname    @    class    @    style    @   id
            // El separador debe serl la arroba pues las clases css tienen dos puntos y almoadillas 
            // Habra que estar muy atento a estos valores
            html_arr       =   split("@", sLinea)
            tame           =   trim(html_arr[0])   // Obtiene el CN
            class_name          =   ''
            style          =   ''
            id             =   ''
			name			=	''
			value			=	''
			data_toggle	=	''
			role			=	''

        
            len_arr        = count(html_arr)  
    
                            
            if (len_arr > 1 )
            class_name     		=   trim(html_arr[1])   // Obtiene la clase
            if (len_arr > 2 )
            style     		=   trim(html_arr[2])   // Obtiene el style
            if (len_arr > 3 )
            id        		=   trim(html_arr[3])   // Obtiene el id
            if (len_arr > 4 )
            name      		=   trim(html_arr[4])   // Obtiene el name
            if (len_arr > 5 )
            value     		=   trim(html_arr[5])   // Obtiene el value
            if (len_arr > 6 )
            href     		=   trim(html_arr[6])   // Obtiene el href
            if (len_arr > 7 )
            data_toggle    =   trim(html_arr[7])   // Obtiene el data-toggle
            if (len_arr > 8 )
            role     		=   trim(html_arr[8])   // Obtiene el role
            
            // Depth 01
            if ( tame == "hea_d01_p01"						)       
            {
            		this.reload(    			'header'     , tame  , class_name , style , id)
			}

            // Depth 02
            if ( tame == "ta_d02_p01"						)       
            {
            		this.a_01.reload(    			'a'     , tame  , class_name , style , id)
			}

            // Depth 03
            if ( tame == "tmg_d03_p01"						)       
            {
            		this.img_01.reload(    			'img'     , tame  , class_name , style , id)
			}


          } // End foreach    
    }

	//     <img class="b-lazy" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
	//      data-src="http://cica.dbrqx.com/rimg/cica/images/brqx_tour_eiffel_logo_04_180_garland.gif" width="180" height="131" alt="">
	
		
	create_img()
    {
		// Img
		this.img_01.src			=	"data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="	  

		this.img_01.data_src	=  this.thm.img_logo					
		this.img_01.width	= 	'180'								
		this.img_01.height	= 	'131'								
		

		this.img_01.pcreate()											

		this.a_01.content		+=   this.img_01.code					
	}		

	//   <a id="logo" class="image-wrapper no-shadow" href="/" title="">
	//     <img class="b-lazy" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 

    create_a()
    {
		// A
		this.a_01.href			=	'/'									

		// Igual queremos mostrar el titulo
		this.a_01.title			=	''									
		this.create_img() 												

		this.a_01.pcreate()												

		this.content		+=   this.a_01.code						
	}		

	

	check_loaded_header()
	{

		this.compo_header	= new cn01_base(this.thm.u , 'header')

		if ( this.compo_header.is_correct_to_reload_type() ) 
		
		{
			this.content			=	''								
			this.data_src			=	this.thm.img_top				
	
			this.create_a()											
			
			this.pcreate()											
	
			// Actualizamos el codigo del objeto
			this.compo_header.load_type_details(this.code)						
		}		

		this.code	=	this.compo_header.code
		
	}
	

// <header  class="header b-lazy" data-src="http://cica.dbrqx.com/rimg/cica/images/brqx_hozdepriegotajoosa_0512x0192.png" data-src-small="">
	
    build_data()
    {

		this.check_loaded_header()													

    }

}

exports.hdr01_header_peloncita = hdr01_header_peloncita