// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js Truck Head Class  [V.0.0.4]  (2017-07-07)
// Brqx Group - Agile Farmacia Zaragoza Methodology [EA6]
//-------------------------------------------------------------------------------------
// Truck Structure Header
//-------------------------------------------------------------------------------------
//<head>
//	METAS
//	<title>Welcome to CICA</title>
//  LINKS
// ------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 			= require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const { ifnojs } = require(path.join(JS_BASE, 'com/objects/html/ifnojs.es6'))
		const { met01_meta_truck } = require(path.join(JS_BASE, 'spc/theme/truck/main_html/met01_meta_truck.es6'))
		const { lnk01_link_truck } = require(path.join(JS_BASE, 'spc/theme/truck/main_html/lnk01_link_truck.es6'))
		const { cn03_scripts } = require(path.join(JS_BASE, 'spc/theme/common/fast_node/cnode/cn03_scripts.es6'))

class hea01_head_truck extends html_style  {

    constructor (     thm								)
    {
		let tag_type   			= 	'head'

       	super(					tag_type	)

		this.tag_type     				= 	'head'

    	this.title_01					=	''

		this.meta_01					=	''

		this.link_01					=	''

		this.ifnojs						=	''

 		// Cnode objects

 		this.compo_head					=	''

		this.thm						=	thm

		this.fnode						=	this.thm.arr['fnode']['site_info_lang']

		// Head can't have tame
		this.tame						=	''

		this.ifnojs						=	new ifnojs()

		this.title_01					=	new html_style('title')

		this.build_data()

    }

	// 	<div id="logo">
  	create_metas()
    {
		// External Metas

		this.meta_01					=	new met01_meta_truck( this.thm	)

		this.content					+=  this.meta_01.code
	}

//	<title>Welcome to CICA</title>
  	create_title()
    {
		// Lang_Ok [17_07_07]
		// this.p('Title ' . this.fnode.site_title)

		this.title_01.content		=	this.fnode.site_title
		this.title_01.pcreate()

		this.content			+=  this.title_01.code
	}

  	create_links()
    {
		// External links
	    this.link_01			=	new lnk01_link_truck(this.thm)

		this.content			+=  this.link_01.code
	}

	// <!--[if lt IE 9]>
    //        <script src="js/vendor/html5-3.6-respond-1.4.2.min.js"></script>
    //     <![endif]-.
  	create_ifnojs()
    {
		// External links
		this.ifnojs.ifno_complex_mode_02('9' , 'lt' ,
				'<script src="js/vendor/html5-3.6-respond-1.4.2.min.js"></script>'  )

		this.content += this.ifnojs.code
	}

	check_loaded_head()
	{
		let head_code = ''

//		print 'hea01_- Uri - ' . this.thm.u.site_url . '<br>'

		this.compo_head	= new cn03_scripts(this.thm.u , 'head')

//		print 'htm01_- Check head - ' . this.compo_head.ram_alias_code_path . '<br>'
		// this.p('htm01_- Check load - ' . this.compo_head.loaded )

		if ( this.compo_head.is_correct_to_reload_type() )
		{

			this.create_metas()
			this.create_title()
			this.create_links()
			this.create_ifnojs()

			// Adding drupal head styles && scripts
			this.content += this.thm.drupal_head
	 		this.content += this.thm.drupal_styles
	 		this.content += this.thm.drupal_scripts

			this.pcreate()

			// Actualizamos el codigo del objeto
			this.compo_head.load_type_details(this.code)
		}

		this.code	=	this.compo_head.code

	}

    build_data()
    {
		this.check_loaded_head()

		// Ok [17-11-02]
		// this.p('Code >' + this.code)

		// this.dd('Code >' + this.code)
    }

}

exports.hea01_head_truck = hea01_head_truck

