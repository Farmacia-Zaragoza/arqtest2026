//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//View List Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Vista sin argumentos
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-get_child_properties-  : Load specific properties
//- d-load_child_details-    : Generate array from drupal
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

class vn02_list extends vsimple {

	constructor(name = "", group_list_num = "3", fnode = "", length = "", sort = "unso", random = "001") 
	{

		super()
		this.n = "vn02_list::"

		this.fnode = fnode
		this.b = new bool()
		this.u = u
		this.s = this.u.s
		this.c = this.u.c
		this.b.copy(this.s.b)
		this.name = name
		this.length = length
		this.sort = sort
		this.random = random
		this.type = "view"
		this.short_type = "VWL"
		this.view_type = "vsimple"
		this.stype = this.view_type
		this.type_name = this.stype + "_" + this.name
		this.dom = new DOMDocument()
		this.b.type_common = true
		this.b.type_have_taxonomy = false
		this.b.type_have_code = true
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.type + "/" + this.view_type + "/"
		this.suffix = this.name
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".vlist"
		this.generate_load_from_disk_path()
		var arrays_line = "oim rat wid hei tit"
		this.arr.types = arrays_line.split(" ")

		if (this.s.load == "drupal") //create_paths - get_current_properties
			{
				this.run_from_drupal()
			} else //create_paths - get_current_properties_from_disk
			{
				this.run_from_disk()
			}
	}

	get_child_properties(prop, value) //Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	//Luego cada tipo tendra un ajuste como este
	{
		if (prop == "v_name") this.name = valueelse if (prop == "v_type") this.view_type = valueelse if (prop == "v_leng") this.length = valueelse if (prop == "v_grnu") this.group_list_num = valueelse if (prop == "v_nums") this.num_elems = value
	}

	load_child_details2() //RECUERDA - AQUI SOLO ENTRA SI HAY QUE VOLVER A ACTUALIZAR LOS DATOS DE BD
	//Group lenght of every html output
	//Numero de imagenes
	{
		var dom_a = new dom(this.code, "a", this.group_list_num)
		dom_a.create()
		this.num_elems = dom_a.out.length

		for (var elem of Object.values(dom_a.out)) //Guardamos todo el link - esto lo cambiaremos	o modificaremos
		{
			this.arr.lnk.push(elem)
		}
	}

	prepare_specific_child_properties() {
		this.arr.properties.push("v_grnu" + this.sep + this.group_list_num)
		this.arr.properties.push("v_nums" + this.sep + this.num_elems)
	}

	load_child_details() 
	{
		if (this.s.load == "drupal") 
			{
				var dom_img = new dom(this.code, "img", 1)
				dom_img.create()

				for (var elem of Object.values(dom_img.out)) 
				{
					this.dom.loadHTML(elem)
					var xpath = new DOMXPath(this.dom)
					var ssd_img = xpath.evaluate("string(//img/@src)")
					var alt_img = xpath.evaluate("string(//img/@alt)")
					this.arr.oim.push(ssd_img)
					this.arr.tit.push(alt_img)
					this.inode = new in02_simple(ssd_img, this.fnode)
					this.arr.wid.push(this.inode.width)
					this.arr.hei.push(this.inode.height)
					this.arr.rat.push(this.inode.relation)
				}
			}
	}

}

