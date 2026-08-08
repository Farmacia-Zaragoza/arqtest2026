//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JsHeader Truck Class  [V.0.1.3]  (2017-08-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//<div style="display: none" id="truck_links"
//data-links="http://demolink.com/,
//http://demolink1.com/,
//http://demolink.com/
//">
//-------------------------------------------------------------------------------------
// DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 		= require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const rnd = require(path.join(JS_BASE, 'com/libs/arrays/random_array.es6'))

class lks02_div_links_truck extends html_style {
	constructor(thm)
	{
		let tag_type 		= "div"
		super(tag_type)
		this.n 				= "lks02_div_links_truck::"
		this.tag_type 		= "div"
		this.style 			= "display: none"
		this.id 			= "truck_links"
		this.thm 			= thm
		this.fnode 			= this.thm.arr['fnode']['image_list']
		this.fnode_site 	= this.thm.arr['fnode']['site_info_lang']
		this.build_data()
	}

	create_links()
	{
		this.data_links += ""
		var link_01 = this.thm.u.lang_url + "product/truck/"
		var num_elems = this.fnode.arr['oim'].length

		var number = rnd.random(1, num_elems)
		this.data_links += link_01 + number
		this.data_links += ","
		var num_mini_trucks = 34

		// Random numbers - We will change for file
		for (var cont = 1 ; cont < num_mini_trucks ;cont++)
		{
			number = rnd.random(1, num_elems)
			this.data_links += link_01 + number
			this.data_links += ","
		}

		number = rnd.random(1, num_elems)
		this.data_links += link_01 + number
	}

	build_data()
	{
		this.content = ""
		this.create_links()
		this.pcreate()

		//Ok [17-12-08]
		// this.p('code >' + this.code)

	}

}

exports.lks02_div_links_truck = lks02_div_links_truck
