// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Anode Tagadelic Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Drupal Product by Filesystem Structure
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 21]
// *anode_img_tagadelic > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-load_properties-   	   	: Load drupal properties from node type 
// - d-save_properties-       	: Save drupal properties to file 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);


var { anode_load_one_field } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an7/an79_load_one_field.es6'))

class anode_img_tagadelic extends anode_load_one_field {

	constructor()
	{
		super()
		this.n 						= 	'anode_img_tagadelic::'				
	}
            
	/// PENDIENTE			

	load_properties_dmode_tagadelic()
	{
		// block Code len 28476
		// this.p(this.type + ' Code len ' + strlen(this.code))			

		// this.d('Tagadelic > '. this.code)								

		// <a href="/vis/taglugar/personal/Akureiry" class="tagadelic level1" rel="tag" title="Akureiry">Akureiry

		dom_a = new dom(this.code , "a" , 1)		// Imagenes de la vista
					      
		dom_a.create()						

		// Numero de elementos de cada columna
		num_column_elem = dom_a.out.length / this.num_columns					


		// 240
		//this.p('Num elem ' + dom_a.out.length) 								
		
		column = 0  
		cont = 0  		

		for (pos in dom_a.out)
		{
			elem	= dom_a.out[pos]

			// REVISAR DOM
			// this.p('cont ' + cont)												
 			this.dom.loadHTML(elem)
			xpath = new DOMXPath(this.dom)
			
			ssd_a					= xpath.evaluate("string(//a/@href)")
			alt_a					= xpath.evaluate("string(//a/@title)")
			cls_a					= xpath.evaluate("string(//a/@class)")

			txt_a					= xpath.evaluate("string(//a)")

			//  Akureiry
			// this.p('value ' + txt_a)											

			// http://cica.dbrqx.com/files/images/paises/fotomapas/brqx_fotomap_mapa_alaska_usa_2010.gif
			// Original images
			this.arr['url'].push(	ssd_a	) 													
			this.arr['alt'].push(	alt_a 	)							
			this.arr['cls'].push(	cls_a 	)							
			this.arr['tit'].push(	txt_a 	)							

			this.arr['u-' + column ].push(	ssd_a	) 													
			this.arr['a-' + column ].push(	alt_a 	)												
			this.arr['c-' + column ].push(	cls_a 	)												
			this.arr['t-' + column ].push(	txt_a 	)												
		
			column++ 																						
			
			if (column >= num_column_elem) column = 0 													
			
			cont++ 																						
		}

		// Load from Drupal - Is not a drupal node
		// Pendiente
		      
	}

	prepare_properties_dmode_tagadelic()
	{
		// Este si se llama
		// Generate array to save file
		this.arr['properties'].push( "b_columns" + this.sep  + this.num_columns )				 			
		
	}

  
}

exports.anode_img_tagadelic = anode_img_tagadelic