// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Theme Cookies Class  [V.0.1.9]  (2017-08-24)
// Spc - Cica_d05 - Home Garland - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Structure
//-------------------------------------------------------------------------------------
// Store structure of nodes && files needed in theme
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//}

class theme_cookies extends theme_structure {

	public 		n		=	'theme_cookies::' 												

	             
    public function constructor (   pg									, 	// 01
    								u									)	// 02 - Url object
   {   
		this.pg								=		pg										 // Page structure
		this.u								=		u										

		this.s 								=	this.u.s									 // site
		this.c								=	this.s.c									 // cache
		
		this.b								=	new bool()									
		this.b.copy(this.s.b )															

      	parent::constructor()																	

		
		// this.p('Before_Cookies_Fast_Node')													

		// Yaml cookies file
		this.arr['fyode']['cookies'] 			= 	new fy01_cookies(this.u)					


		// Dat cookies file
		this.arr['fnode']['cookies'] 			= 	new fn31_cookies(this.u)					

		// Dat cookies file
		this.arr['fnode']['cookies_links'] 	= 	new fn32_cookies_links(this.u)			

		// this.p('End_Cookies_Fast_Node')													

		// Fnode para las banderitas
		fnode_site 							= 	new fn23_site_lang(	this.u 				)

		this.arr['fnode']['site_info_lang'] 	=	fnode_site									 	 
		

		this.u.cat 							= 	new categories()							
		this.u.cot 							= 	new contents()								

    }
  
}


