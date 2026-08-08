//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Html Div Class  [V.0.0.2]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Peloncita Structure Scripts
//-------------------------------------------------------------------------------------
//<script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
//<script src="https://code.jquery.com/jquery-2.1.1.min.js" integrity="sha256-h0cGsrExGgcZtSZ
//<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity
//<script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/jquery.flexslider.min.js" defer></script>
//<script src="resp_js0/js4/main4.js" defer></script>
//<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
//------------------------------------------------------------------------------------
// SCRIPT *
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { getset } 		= require(	'/brqx/base/rcode/es6/com/objects/html/getset.es6'		)

class scr01_js_peloncita extends getset {

	constructor(thm) 
	{

			this.n = "scr01::"
			this.thm = thm
			this.script_01 = new html_style("script")
			this.script_02 = new html_style("script")
			this.script_03 = new html_style("script")
			this.script_04 = new html_style("script")
			this.script_05 = new html_style("script")
			this.script_06 = new html_style("script")
			this.script_07 = new html_style("script")
			this.load_file()
			this.build_data()
	}


	load_file() 
	{
		for (var sLinea of Object.values(this.thm.script_contents)) 
		{
				var html_arr = sLinea.split("@")
				var tame = html_arr[0].trim()
				var src = ""
				var integrity = ""
				var crossorigin = ""
				var charset = ""
				var async = ""
				var defer = ""
				var len_arr = html_arr.length
				if (len_arr > 1) src = html_arr[1].trim()
				if (len_arr > 2) integrity = html_arr[2].trim()
				if (len_arr > 3) crossorigin = html_arr[3].trim()
				if (len_arr > 4) charset = html_arr[4].trim()
				if (len_arr > 5) async = html_arr[5].trim()
				if (len_arr > 6) defer = html_arr[6].trim()

				if (tame == "scr_d01_p01") {
						this.script_01.src = src
						this.script_01.integrity = integrity
						this.script_01.crossorigin = crossorigin
						this.script_01.charset = charset
						this.script_01.async = async
						this.script_01.defer = defer
				}

				if (tame == "scr_d01_p02") {
						this.script_02.src = src
						this.script_02.integrity = integrity
						this.script_02.crossorigin = crossorigin
						this.script_02.charset = charset
						this.script_02.async = async
						this.script_02.defer = defer
				}

				if (tame == "scr_d01_p03") {
						this.script_03.src = src
						this.script_03.integrity = integrity
						this.script_03.crossorigin = crossorigin
						this.script_03.charset = charset
						this.script_03.async = async
						this.script_03.defer = defer
				}

				if (tame == "scr_d01_p04") {
						this.script_04.src = src
						this.script_04.integrity = integrity
						this.script_04.crossorigin = crossorigin
						this.script_04.charset = charset
						this.script_04.async = async
						this.script_04.defer = defer
				}

				if (tame == "scr_d01_p05") {
						this.script_05.src = src
						this.script_05.integrity = integrity
						this.script_05.crossorigin = crossorigin
						this.script_05.charset = charset
						this.script_05.async = async
						this.script_05.defer = defer
				}

				if (tame == "scr_d01_p06") {
						this.script_06.src = src
						this.script_06.integrity = integrity
						this.script_06.crossorigin = crossorigin
						this.script_06.charset = charset
						this.script_06.async = async
						this.script_06.defer = defer
				}

				if (tame == "scr_d01_p07") {
						this.script_07.src = src
						this.script_07.integrity = integrity
						this.script_07.crossorigin = crossorigin
						this.script_07.charset = charset
						this.script_07.async = async
						this.script_07.defer = defer
				}
			}
		}

		create_script_01() //External Div
		{
				var blazy_uri = "https://cdn.jsdelivr.net/blazy/1.8.2/"
				this.script_01.src = blazy_uri + this.script_01.src
				this.script_01.pcreate()
				this.code += this.script_01.code
		}

		create_script_02() //External Div
		{
				var jquery_uri = "https://code.jquery.com/"
				this.script_02.src = jquery_uri + this.script_02.src
				this.script_02.pcreate()
				this.code += this.script_02.code
		}

		create_script_03(depth = "", depth_empty = "") //External Div
		{
				var lightbox_uri = "https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.9.0/js/"
				this.script_03.src = lightbox_uri + this.script_03.src
				this.script_03.pcreate()
				this.code += this.script_03.code
		}

		create_script_04() //External Div
		{
				var bootstrap_uri = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/"
				this.script_04.src = bootstrap_uri + this.script_04.src
				this.script_04.pcreate()
				this.code += this.script_04.code
		}

		create_script_05() //External Div
		{
				var flexslider_uri = "https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/"
				this.script_05.src = flexslider_uri + this.script_05.src
				this.script_05.pcreate()
				this.code += this.script_05.code
		}

		create_script_06() //External Div
		{
				var site_url = this.thm.u.site_url
				this.script_06.src = site_url + this.script_06.src
				this.script_06.pcreate()
				this.code += this.script_06.code
		}

		create_script_07() //External Div
		{
				var twitter_url = "//platform.twitter.com/"
				this.script_07.src = twitter_url + this.script_07.src
				this.script_07.pcreate()
				this.code += this.script_07.code
		}

		create_jquery_ajax() //$this.d('JCode ' + $this.thm.jquery_code )									
		{
				this.code += this.thm.jquery_code
		}

		check_loaded_scripts() {
				var head_code = ""
				this.compo_scripts = new cn01_base(this.thm.u, "scripts")

				if (this.compo_scripts.is_correct_to_reload_type()) //Actualizamos el codigo del objeto
						{
								this.create_script_01()
								this.create_script_02()
								this.create_script_03()
								this.create_script_04()
								this.create_script_05()
								this.create_script_06()
								this.create_jquery_ajax()
								this.create_script_07()
								this.compo_scripts.load_type_details(this.code)
						}

				this.code = this.compo_scripts.code
	}

	build_data() 
	{
			this.check_loaded_scripts()
	}

}

exports.scr01_js_peloncita = scr01_js_peloncita
