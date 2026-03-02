// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Gallery Json Class  [V.0.1.6]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div id="General-pill-middle" class="tab-pane fade active in" role="tabpanel" aria-labelledby="General-pill-middle-tab">
//*   <div class="ajax-loading image-wrapper">
//      <img src="data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=" alt="cica ajax loading">
//        <!-- 4*3 transparent gif-.

//   <div class="mosaic-table table-view visible-lg">
//      <div class="row">
//         <div class="col-lg-4 td"> x 3
//                <!-- content will be loaded with ajax dynamically here -.
//            </div>
//    <div class="mosaic-table-small table-view visible-sm visible-md">
//        <div class="row">
//            <div class="col-sm-6 td"></div>
//            <div class="col-sm-6 td"></div>
//    <div class="mosaic-table-xs table-view visible-xs">
//        <div class="row">
//            <div class="col-xs-12 td"></div>                                            
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class gal01_div_peloncita extends html_style{

    constructor ()  
    {   

		this.n						= 'gal01_mid::'						    		
    
    	this.fnode						=	''
	
		this.vnode						=	''												


		this.div_01						=	new html_style('div') 								
		this.div_02						=	new html_style('div') 								
		this.div_03						=	new html_style('div') 								
		this.div_04						=	new html_style('div') 								

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

//    <h1>Only H Type slideshow with flex slider 2.6.3</h1>

//   <div class="ajax-loading image-wrapper">
//      <img src="data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=" alt="cica ajax loading">
//        <!-- 4*3 transparent gif-.
	create_div_01()
	{
		this.img_01.src 		= 	
				'data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII='	
		this.img_01.alt		=	'cica ajax loading'																						
		
		this.img_01.pcreate()																											
		
		this.div_01.content			+=	this.img_01.code																				
		this.div_01.class 			=	'ajax-loading image-wrapper'																	
		this.div_01.pcreate() 																											
		
		this.content 					+=	this.div_01.code 																			
	}

//        <div class="mosaic-table table-view visible-lg">
//            <div class="row">
//                <div class="col-lg-4 td"> x3
//                    <!-- content will be loaded with ajax dynamically here -.

	create_div_02()
	{
					
		this.div_aux.class 		= 	'col-lg-4 td'										
		this.div_aux.pcreate()															
		
		this.div_row.content		=	this.div_aux.code											
		this.div_row.content		+=	this.div_aux.code											
		this.div_row.content		+=	this.div_aux.code											

		this.div_row.class 		=	'row'												
		this.div_row.pcreate() 															
		
		this.div_02.class 		=	'mosaic-table table-view visible-lg' 				
		this.div_02.content		=	this.div_row.code 								

		this.div_02.pcreate() 																			
		this.content 					+=	this.div_02.code 																			
	}

//    <div class="mosaic-table-small table-view visible-sm visible-md">
//        <div class="row">
//            <div class="col-sm-6 td"></div> x2

	create_div_03()
	{
		this.div_aux.class 		= 	'col-sm-6 td'										
		this.div_aux.pcreate()															
		
		this.div_row.content		=	this.div_aux.code											
		this.div_row.content		+=	this.div_aux.code											
		this.div_row.pcreate() 															
		
		this.div_03.class 		=	'mosaic-table-small table-view visible-sm visible-md' 				
		this.div_03.content		=	this.div_row.code 								

		this.div_03.pcreate() 																			
		this.content 					+=	this.div_03.code 																			
	}


//    <div class="mosaic-table-xs table-view visible-xs">
//        <div class="row">
//            <div class="col-xs-12 td"></div>                                            

	create_div_04()
	{
		this.div_aux.class 		= 	'col-xs-12 td'										
		this.div_aux.pcreate()															
		
		this.div_row.content		=	this.div_aux.code											
		this.div_row.pcreate() 															
		
		this.div_04.class 		=	'mosaic-table-xs table-view visible-xs'				
		this.div_04.content		=	this.div_row.code 								

		this.div_04.pcreate() 															
		this.content 					+=	this.div_04.code 																			
						
	}
	


	create_divs()
	{
		this.create_div_01() 																
		this.create_div_02() 																
			this.create_div_03() 																
		this.create_div_04() 																
		
	}


    build_data()
    {
		// Devolvemos content
      	this.content   = '' 

		this.create_divs() 

		// this.d('content >' . this.content) 
		
				
	} // End Build Data
  
}

exports.gal01_div_peloncita = gal01_div_peloncita