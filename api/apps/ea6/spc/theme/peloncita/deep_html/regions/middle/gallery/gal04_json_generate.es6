//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Gallery Json Generate Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//{
//"image_name": ["h.jpg","v.jpg","h.jpg","v.jpg"],
//"aspect_ratio": [1.33,0.75,1.33,0.75],
//"image_description": ["I am H", "Wow, I am V", "Hey yo, H up there!!??"],
//"image_alt": ["alt1","alt2","alt3","alt4"
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { getset } 		= require(	'/brqx/base/rcode/es6/com/objects/html/getset.es6'		)

class gal04_json_generate extends getset {

	constructor(vnode = "") //El constructor debe cargar las propiedades del archivo
	{
		this.n = "gal04_mid::";
		this.arr = Array();

		super()
		this.vnode = vnode;
		this.build_data();
	}

	prepare_json() //Jquery code - Se devuelve en el fnode
	{
		var js_code = new gal01_script_jquery(this.vnode);
	}

	create_json() 
	{
		var json = Array();
		json.tit = new json();
		json.img = new json();
		json.rat = new json();
		json.alt = new json();
		this.p("num_tits " + this.vnode.arr.tit.length);
		this.p("num_imgs " + this.vnode.arr.rua2048.length);
		var num_element = this.vnode.arr.tit.length - 1;
		var n = 0;
		{
			let _tmp_0 = this.vnode.arr.tit;

			for (var num in _tmp_0) //a4 - 2048
			{
				var tit = _tmp_0[num];
				var img = this.vnode.arr.rua2048[num];
				var rat = this.vnode.arr.rat[num];

				if (n < num_element) {
					json.img.add_strvalue(img);
					json.tit.add_strvalue(tit);
					json.alt.add_strvalue(tit);
					json.rat.add_value(rat);
				} else {
					json.img.add_laststrvalue(img);
					json.tit.add_laststrvalue(tit);
					json.alt.add_laststrvalue(tit);
					json.rat.add_lastvalue(rat);
				}

				n++;
			}
		}
		json.img.create_attribute("image_name");
		json.rat.create_attribute("aspect_ratio");
		json.tit.create_attribute("image_description");
		json.alt.create_attribute("image_alt");
		var jtot = new json();
		jtot.content += json.img.code + ", ";
		jtot.content += json.rat.code + ", ";
		jtot.content += json.tit.code + ", ";
		jtot.content += json.alt.code;
		jtot.create();
		this.p("imgs_json_file " + this.ram_alias_json_path);
		this.p("imgs_json_url " + this.ram_alias_json_url);
		save_code_to_file(this.ram_alias_json_path, jtot.code);
	}

	build_data() 
	{
		this.prepare_json();
		this.create_json();
	}

};

exports.gal04_json_generate = gal04_json_generate