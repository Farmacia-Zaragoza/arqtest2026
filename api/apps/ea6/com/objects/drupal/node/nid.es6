//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.2.1]  (2017-01-10)
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//Brqx Group - Agile Farmacia Zaragoza Methodology [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Theme Structure
//-------------------------------------------------------------------------------------
//Nid structure of nodes and files needed in theme
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

var	{ printlog } 				= 	require(	cons.JS_BASE + 'com/objects/logs/printlog.es6'	)	

class nid  extends printlog {
	constructor(folder_dat = "") 
	{
		super()	
		this.n = "nid::"
		this.nid_file = ""
		this.nid_contents = Array()
		this.dat_contents = Array()
		this.arr = Array()
		this.arr['dat'] 			= Array()
		this.arr['dat_content'] 	= Array()
		this.arr['position'] 		= Array()
		
		
		this.lf = ":</br>"
		this.br = "</br>"
		this.nr = "\n\r"
		this.folder_dat = folder_dat
		this.nid_file = this.folder_dat + "contents/nid.dat"
		this.dat_file = this.folder_dat + "contents/files.dat"

		if (this.folder_dat != "") {
			this.nid_contents = readFileAsArray(this.nid_file)
			this.dat_contents = readFileAsArray(this.dat_file)
			this.load_file()
			this.load_dats()
		}
	}

	load_file() 
	{
		for (var sLinea of Object.values(this.nid_contents)) 
		{
			var html_arr = sLinea.split("@")
			var tame = html_arr[0].trim()
			var nid = ""
			var information = ""
			var first_char = tame.substr(0, 1)
			var len_arr = html_arr.length

			if (first_char != "#" and tame != "") 
			//Html Tame    @ Src                 @ Integrity   @ CrossOrigin  @  Charset   @ Async   @ Defer
				{
					if (len_arr > 1) nid = html_arr[1].trim()
					if (len_arr > 2) information = html_arr[2].trim()
					this.arr.nid[tame] = nid
				}
		}
	}

	load_dats() 
	{
		for (var sLinea of Object.values(this.dat_contents)) 
		{
			var html_arr = sLinea.split("@")
			var tame = html_arr[0].trim()
			var dat = ""
			var position = ""
			var information = ""
			var first_char = tame.substr(0, 1)
			var len_arr = html_arr.length

			if (first_char != "#" and tame != "") 
			{
				if (len_arr > 1) dat = html_arr[1].trim()
				if (len_arr > 2) position = html_arr[2].trim()
				if (len_arr > 3) information = html_arr[3].trim()
				this.arr['dat'][tame] = this.folder_dat + dat
				this.arr['datcontent'][tame] = file(this.arr['dat'][tame])
				if (position != "") this.arr['position'][tame] = position
			}
		}
	}

}

exports.nid = nid