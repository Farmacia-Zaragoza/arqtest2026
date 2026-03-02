// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html UL Class  [V.0.0.4  (2017-01-13)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Theme UL Structure - Peloncita site
//------------------------------------------------------------------------------------------------

//*	<ul class="links inline">
//		<a href="/categorias/anno/2009" rel="tag" title="" class="taxonomy_term_78">2009
//		</a>
//     Last LI
//     <li tame="mli_d07_p09" class="justifier visible-inline-lg">
//    ...
// UL
//  LI - START REPEAT
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Slider UL Peloncita 
// ------------------------------------------------------------------------------------
// Methods:
// - reload_contents  : Reload field attributes
// - load_file        : Load dat file from system   
// - build_data   	  : Build html final code for object 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class tax02_ul_peloncita extends html_style{

         
    constructor (   tnode              	= ''  	)
   {   
		super()
        this.tag_type        		=      	'ul'                    

    	this.tnode				=		tnode					
	
        this.li_01          		=       
        					new tax01_li_peloncita(this.tnode)				
        					
		this.li_02				= new html_style('li') 			        					

        super.constructor(this.tag_type)                        

		this.build_data()										

    }

    build_data()
    {
	    this.code       =       '' 					
    	this.content    =       '' 					
		this.class 	  =	"links inline recuerdo-links"						
		
		
//		cat = new categories()

	    // Clean al JS Code
	    sw_active = 0     // To set first active class

		// REVISAR BUCLE



		if (array_key_exists('tna', this.tnode.arr ) )
		{
			let _tmp_0 = Array.from(this.tnode.arr['tna']);
			for (var pos in _tmp_0) 
//			foreach ( this.tnode.arr['tna'] as pos => term_name ) 
			{
				var term_name			=	_tmp_0[pos] 

			{
	
				term_id		= 	this.tnode.arr['tid'][pos]							
				term_path		=	this.tnode.arr['tpa'][pos]								
				term_text		=	term_name												
				term_title		=	term_name												
		
		
		        if (sw_active == 0)
		        { 
					first_class    =	"first "											
		        }
				else
				{
					first_class    =	""													
				}
		
				
				this.li_01.reload_contents(	
										term_id 							,
										term_name							,
										term_path							,
										term_text							,
										term_title							,
										first_class
				)
				
				this.li_01.build_contents()
		
		
		        this.content        +=    this.li_01.code
		
		        sw_active++
		
		
		     } // end foreach
		}
	     
	    this.li_02.class = "justifier visible-inline-lg"				
		this.li_02.pcreate()											 

        this.content        +=    this.li_02.code
	     
		 this.pcreate()
      
  	} // End Build Data


}

exports.tax02_ul_peloncita = tax02_ul_peloncita
