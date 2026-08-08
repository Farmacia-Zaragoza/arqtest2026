// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Theme Peloncita Class  [V.0.1.2]  (2017-03-21)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Structure
//-------------------------------------------------------------------------------------
// Store structure of nodes && files needed in theme
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//}

var { theme_nid } 		= require(	'/brqx/base/rcode/es6/com/objects/drupal/theme/t02_nid.es6'		)

class theme_peloncita extends theme_nid {
    
	             
    constructor (   pg									, 					// 01
    				u									)	// 02 - Url Object	
   {   

		this.n 					=	'thm_peloncita '  					
		this.pg							=		pg											 // Page structure

		this.b						= 	new bool()

		this.u 				=	u 													
		this.s 				=	this.u.s 										
		this.c 				=	this.u.c 										
		
		this.b.copy (this.s.b)													


		// /ssd/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/rphp/dats/peloncita/
		// this.p('Dat ' + folder_dat ) 														

		
      	super()																	

		
//      Arr fnode is a fnode array

		this.nid.arr['fnode']['region_left'] 		= 	new fn04_cica_slider(
															this.nid , this.u , 'slider_left', 'region_left', 'region_left')

		// 7

		// Debug array
		// this.darr(this.nid.arr['fnode']['region_leftb'].arr['txt'])  

		this.nid.arr['fnode']['region_right'] 		=	new fn04_cica_slider(
															this.nid , this.u , 'slider_right', 'region_right', 'region_right')

		// 7

		// this.p('Before to run cica list')															
		this.nid.arr['fnode']['region_middle']		=	new fn05_cica_list(
															this.nid , this.u , 'selection', 'region_middle', 'region_middle')

		// 5


		this.nid.arr['fnode']['region_bottom'] 		=	new fn06_infolan(
															this.nid , this.u , 'footer', 'region_bottom', 'region_bottom')

		// 9 


		this.nid.arr['fnode']['types_flags'] 		=	new fn06_infolan(
															this.nid , this.u , 'flags', 'types_flags', 'types_flags')
		// 9

		// Fast Mode - New method to load drupal content
		this.nid.arr['fnode']['types_lm_left_01']	=	new fn07_linea_menu(
															this.nid , this.u , 'lm_left_01', 'region_left')

		// Fast Mode - New method to load drupal content - Paisfada
		this.nid.arr['fnode']['right']['01']			=	new fn08_paisfada(
															this.nid , this.u , 'right_01',  'region_right')

		this.nid.arr['fnode']['right']['02']			=	new fn09_yearfada(
															this.nid , this.u , 'right_02',  'region_right')

		this.nid.arr['fnode']['right']['03']			=	new fn09_yearfada(
															this.nid , this.u , 'right_03',  'region_right')

		this.nid.arr['fnode']['right']['04']			=	new fn09_yearfada(
															this.nid , this.u , 'right_04',  'region_right')

		this.nid.arr['fnode']['right']['05']			=	new fn09_yearfada(
															this.nid , this.u , 'right_05',  'region_right')

		this.nid.arr['fnode']['right']['06']			=	new fn09_yearfada(
															this.nid , this.u , 'right_06',  'region_right')


		// Generate categories
		
		this.u.cat 						= 		new categories()								
		this.u.cot 						= 		new contents()									
		
    }
  
}


