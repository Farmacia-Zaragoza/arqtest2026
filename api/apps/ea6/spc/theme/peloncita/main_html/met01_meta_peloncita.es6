// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Html Div Class  [V.0.0.3]  (2017-01-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
//	<meta charset="utf-8">
//	<meta http-equiv="X-UA-Compatible" content="IE=edge">
//	<meta name="viewport" content="width=device-width, initial-scale=1">
//	<meta name="description" content="">
//	<meta name="author" content="">
//  <meta name="theme-color" content="#58A4DE" />
// ------------------------------------------------------------------------------------
//* META * 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { getset } 		= require(	'/brqx/base/rcode/es6/com/objects/html/getset.es6'		)

class met01_meta_peloncita extends getset  {

    constructor (     thm		)
    {   

		this.thm						=	thm							

    	super.constructor()			

		this.meta_01					=	new html_style('meta') 			
		this.meta_02					=	new html_style('meta') 			
		this.meta_03					=	new html_style('meta') 			
		this.meta_04					=	new html_style('meta') 			
		this.meta_05					=	new html_style('meta') 			
		this.meta_06					=	new html_style('meta') 			

		this.load_file()													
	
		this.build_contents()												

    }

    load_file() 
    {   
		// Load dat file searching TAME for TAGS

		// Html Tame    @ Src                 @ Integrity   @ CrossOrigin  @  Charset   @ Async   @ Defer 

		for (var pos in  this.thm.meta_contents)        
          {
			sLinea			=	this.thm.meta_contents[pos]	

            html_arr       	=   sLinea.split("@")
            tame           	=   trim(html_arr[0])   // Obtiene el CN
            name      	    	=   ''
            content         	=   ''
            http_equiv       	=   ''
			charset			=	''

        
            len_arr        = html_arr.length  
    
			// Html Tame    @ Name                @ Content    @ Http-Equiv    @ Charset 
                            
            if (len_arr > 1 )
            name     			=   trim(html_arr[1])   // Obtiene la name
            if (len_arr > 2 )
            content     		=   trim(html_arr[2])   // Obtiene el content
            if (len_arr > 3 )
            http_equiv   		=   trim(html_arr[3])   // Obtiene el httpequiv
            if (len_arr > 4 )
            charset      		=   trim(html_arr[4])   // Obtiene el charset


			// Html Tame    @ Name                @ Content    @ Http-Equiv    @ Charset 
       	    if ( tame == "met_d01_p01"     			)       
			{
					this.meta_01.name					= 	name				
					this.meta_01.mcontent				= 	content			
					this.meta_01.http_equiv				= 	http_equiv		
					this.meta_01.charset					= 	charset			
			}

       	    if ( tame == "met_d01_p02"     			)       
			{
					this.meta_02.name					= 	name				
					this.meta_02.mcontent				= 	content			
					this.meta_02.http_equiv				= 	http_equiv		
					this.meta_02.charset					= 	charset			
			}

       	    if ( tame == "met_d01_p03"     			)       
			{
					this.meta_03.name					= 	name				
					this.meta_03.mcontent				= 	content			
					this.meta_03.http_equiv				= 	http_equiv			
					this.meta_03.charset					= 	charset			
			}

       	    if ( tame == "met_d01_p04"     			)       
			{
					this.meta_04.name					= 	name				
					this.meta_04.mcontent				= 	content			
					this.meta_04.http_equiv				= 	http_equiv			
					this.meta_04.charset					= 	charset			
			}

       	    if ( tame == "met_d01_p05"     			)       
			{
					this.meta_05.name					= 	name				
					this.meta_05.mcontent				= 	content			
					this.meta_05.http_equiv				= 	http_equiv			
					this.meta_05.charset					= 	charset			
			}

       	    if ( tame == "met_d01_p06"     			)       
			{
					this.meta_06.name					= 	name				
					this.meta_06.mcontent				= 	content			
					this.meta_06.http_equiv				= 	http_equiv			
					this.meta_06.charset					= 	charset			
			}


          }     
    }

  	create_metas()
    {
		this.meta_01.pcreate()									
		this.meta_02.pcreate()									
		this.meta_03.pcreate()									
		this.meta_04.pcreate()									
		this.meta_05.pcreate()									
		this.meta_06.pcreate()									
	
		this.code			+=   this.meta_01.code					
		this.code			+=   this.meta_02.code					
		this.code			+=   this.meta_03.code					
		this.code			+=   this.meta_04.code					
		this.code			+=   this.meta_05.code					
		this.code			+=   this.meta_06.code					

	}

    build_contents()
    {

		this.create_metas()											

    }

}

exports.met01_meta_peloncita = met01_meta_peloncita