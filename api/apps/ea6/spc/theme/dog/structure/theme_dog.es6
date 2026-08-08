//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js Theme Dog Class  [V.0.0.1]  (2018-01-28)
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//Brqx Group - Agile Farmacia Zaragoza Methodology [PHP_52]
//-------------------------------------------------------------------------------------
//Theme Structure
//-------------------------------------------------------------------------------------
//Store structure of nodes && files needed in theme
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	echo 					= 	require(	'node-echo'												);
		const { theme_structure } = require(path.join(JS_BASE, 'com/objects/drupal/theme/t01_structure.es6'))
		const { fn01_flat } = require(path.join(JS_BASE, 'spc/theme/common/fast_node/fnode/fn01_flat.es6'))
		const { fn02_images } = require(path.join(JS_BASE, 'spc/theme/common/fast_node/fnode/fn02_images.es6'))

		const { fn01_lang_common } = require(path.join(JS_BASE, 'spc/theme/common/fast_node/fnode/fn01_lang_common.es6'))
		const { fn11_links_common } = require(path.join(JS_BASE, 'spc/theme/dog/fast_node/fnode/fn11_links_common.es6'))
		const { fn12_links_lang } = require(path.join(JS_BASE, 'spc/theme/dog/fast_node/fnode/fn12_links_lang.es6'))
		const { fn23_site_lang } = require(path.join(JS_BASE, 'spc/theme/dog/fast_node/fnode/fn23_site_lang.es6'))

		const { fy01_cookies } = require(path.join(JS_BASE, 'spc/theme/common/fast_node/fnode/fy01_cookies.es6'))
		const { fn31_cookies } = require(path.join(JS_BASE, 'spc/theme/dog/fast_node/fnode/fn31_cookies.es6'))

		const { fn32_cookies_links } = require(path.join(JS_BASE, 'spc/theme/dog/fast_node/fnode/fn32_cookies_links.es6'))

		const { cbool } = require(path.join(JS_BASE, 'com/objects/drupal/bool/b01_bool.es6'))
		const { categories } = require(path.join(JS_BASE, 'com/objects/categories/categories.es6'))
		const { contents } = require(path.join(JS_BASE, 'com/objects/categories/contents.es6'))

class theme_dog extends theme_structure {

	constructor(pg, u)
	{
		super()
		this.n 							= 	"thm_dog::"
		this.m							=	'constructor'
		this.pg 						= pg
		this.u 							= u
		this.s 							= this.u.s
		this.c 							= this.u.c
		this.b 							= new cbool()

		this.b.copy(this.s.b)

		if (this.b.page_cookies )
		{
			this.p('COOOKIES_PAGE_OJHITO')

			// Yaml cookies file
			this.arr['fyode']['cookies'] 			= 	new fy01_cookies(this.u)

			// Dat cookies file
			this.arr['fnode']['cookies'] 			= 	new fn31_cookies(this.u)

			// Dat cookies file
			this.arr['fnode']['cookies_links'] 		= 	new fn32_cookies_links(this.u)
		}

		// this.p('AFTER_IMAGES')
		var fnode_common = new fn11_links_common(this.u, "footer")

		// this.p('AFTER_LINKS_COMMON')
		this.arr['fnode']['link_list_common'] = fnode_common
		this.arr['fnode']['link_list_lang'] = new fn12_links_lang(fnode_common, "footer")

		var fnode_flags = new fn01_lang_common(this.u, "footer")
		this.arr['fnode']['flag_list'] = fnode_flags

		var fnode_site = new fn23_site_lang(this.u)
		this.arr['fnode']['site_info_lang'] = fnode_site

//		this.p('END_THEME')

		this.u.cat = new categories()
		this.u.cot = new contents(this.s.folder_dat)
	}

}

exports.theme_dog = theme_dog
