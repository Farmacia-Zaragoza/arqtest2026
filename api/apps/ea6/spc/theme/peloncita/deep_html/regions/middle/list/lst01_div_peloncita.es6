// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// List Json Class  [V.0.1.6]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//  <div id="General-pill-middle" class="tab-pane fade active in" role="tabpanel" aria-labelledby="General-pill-middle-tab">
//*    <div class="list-head clearfix">
//        <div class="image_name">Foto</div>
//        <div class="aspect_ratio">Ratio</div>
//        <div class="image_description">Description</div>
//        <div class="image_alt">Alt</div>

//    <!-- This will show loading gif before json response is loaded -.
//    <div class="ajax-loading image-wrapper">
//        <img src="data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=" alt="cica ajax loading">
//        <!-- 4*3 transparent gif-.


//-------------------------------------------------------------------------------------
// DIV
//  DIV 
//    DIV (x4)
//  DIV 
//    IMG

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class lst01_div_peloncita extends html_style{

    constructor ()  
   {   

		this.n						= 'lst01_div_mid::'						    		
	    
	    this.fnode					= ''
		
		this.vnode					= ''							
	
		
		this.div_03					= ''								
		this.div_04					= ''								
	
		this.div_01						=	new html_style('div') 								
		this.div_02						=	new html_style('div') 								

		this.div_aux						=	new html_style('div') 								
		this.div_row						=	new html_style('div') 								

		this.div_row.class 				=	'row'												



		this.img_01						=	new html_style('img') 								

		this.build_data()	            

    }

    clean_objects() 
    {   
		this.clean()															
	}
	//    <div class="list-head clearfix">
	//        <div class="image_name">Foto</div>
	//        <div class="aspect_ratio">Ratio</div>
	//        <div class="image_description">Description</div>
	//        <div class="image_alt">Alt</div>

	 create_div_01()
	{
		arr = 		array() 						
		class_line 	= 'titulo fecha recuerdo acceso'   
		arr['class'] = split (' ' , class_line) 		 
		content_line 	= 'Foto Ratio Description Alt'   
		arr['content'] = split (' ' , content_line) 		 

		let num_elem = Array

		// PENDIENTE DE REVISAR CODIGO
		for (var num of Object.values(arr['class'])) 
		{
			div 	= 	new html_style('div')			
			div.class =  class_name 						
			div.content = arr['content'][num] 		 
			div.pcreate() 							
			this.div_01.content += div.code 					
		}
		
		this.div_01.class = 'list-head clearfix'		
		
		this.div_01.pcreate() 						
		
		this.content 		+=	this.div_01.code 	
		
	}


	//   <div class="ajax-loading image-wrapper">
	//      <img src="data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=" alt="cica ajax loading">
	//        <!-- 4*3 transparent gif-.
	 create_div_02()
	{
		this.img_01.src 		= 	
				'data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII='	
		this.img_01.alt		=	'cica ajax loading'																						
		
		this.img_01.pcreate()																											
		
		this.div_02.content			+=	this.img_01.code																				
		this.div_02.class 			=	'ajax-loading image-wrapper'																	
		this.div_02.pcreate() 																											
		
		this.content 					+=	this.div_02.code 																			
	}


	 create_divs()
	{
		this.create_div_01() 																
		this.create_div_02() 																
	}


    build_data()
    {
		this.content   = '' 

		this.create_divs() 

		// this.d('content >' . this.content) 
		
				
	} // End Build Data
  
}

exports.lst01_div_peloncita = lst01_div_peloncita
