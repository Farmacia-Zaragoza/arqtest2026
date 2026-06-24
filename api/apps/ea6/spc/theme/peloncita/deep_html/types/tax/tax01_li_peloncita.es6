// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html LI Class  [V.0.0.5]  (2017-01-13)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure Tax
//------------------------------------------------------------------------------------------------
// CURRENT :
//	<li tame="mli_d07_p01">
//	    <a href="/categorias/anno/2005" rel="tag">
//	        <figure class="image-wrapper text-center">
//	            <img class="shadow1 b-lazy" data-src="../images/calendar.svg"
//	            src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
//	            <figcaption>2005</figcaption>
//	        </figure>
//	    </a>

//*LI
//  A
//	  FIGURE
//		IMG
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Slider LI Peloncita  Class
// ------------------------------------------------------------------------------------
// Methods:
// - build_data       : Generate object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class tax01_li_peloncita extends html_style  {


    constructor (	tnode              	= ''  	)
    {
        this.tag_type     			= 	'li'

		this.n						= 'tax01_li::'

	    // Attributes

	    this.term_id					= ''
	    this.term_name				= ''
	    this.term_href				= ''
	    this.term_title				= ''
	    this.term_text				= ''
	    this.first_class				= ''

		this.img_file					=	''

    	this.tnode					=		tnode

		this.a_01						= 	new html_style('a')
		this.figure_01				= 	new html_style('figure')
		this.img_01					= 	new html_style('img')

       	super.constructor(this.tag_type)

    }

    reload_contents(  term_id              = ''  	,
									  term_name            = ''	,
	                                  term_href            = ''  	,
                                      term_text  	        = ''	,
                                      term_title     		= ''	,
                                      first_class		    = ''
								   )
    {

			this.term_id					=	term_id
			this.term_name				=	term_name
			this.term_href				=	term_href
			this.term_text				=	term_text
			this.term_title				=	term_title
			this.first_class				=	first_class

//	  		print this.n + 'Href' + this.term_href 	. this.lf
			// tax01_li::Href /categorias/pais/brasil/taxonomyterm1740:

			this.img_file		= this.tnode.u.site_url + this.tnode.u.cat.process_cat(this.term_href)

//			print this.n + 'Term ' + this.term_href +  ' Img ' + this.img_file +  this.lf


			this.build_data()
	}


    clean_objects()
    {

  		this.term_id					= ''
  		this.term_name				= ''
  		this.term_href				= ''
  		this.term_text				= ''
  		this.term_title				= ''

//		this.clean()
//		this.a_01.clean()
	}
//		<a href="/categorias/anno/2009" rel="tag" title="" class="taxonomy_term_78">2009

//  <img class="shadow1 b-lazy" data-src="../images/calendar.svg"
//  src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">

	create_img()
	{
		this.img_01.class 	= 	"shadow1 b-lazy"
		this.img_01.data_src	=	this.img_file
		this.img_01.src		=	"data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

		this.img_01.pcreate()

		this.figure_01.content	=	this.img_01.code
	}

//	        <figure class="image-wrapper text-center">
//	            <img class="shadow1 b-lazy" data-src="../images/calendar.svg"
//	            <figcaption>2005</figcaption>
//	        </figure>
	create_figure()
	{
		this.create_img()
		this.figure_01.class 	 = 'image-wrapper text-center'
		this.figure_01.content	+=	'<figcaption>' + this.term_name + '</figcaption>'

		this.figure_01.pcreate()

		this.a_01.content		=	this.figure_01.code
	}

//	    <a href="/categorias/anno/2005" rel="tag">
//	        <figure class="image-wrapper text-center">

    create_a()
    {

    	this.create_figure()

        this.a_01.href       	= 	this.term_href
        this.a_01.rel       		= 	'tag'								 // this could be in file
        this.a_01.title       	= 	this.term_title

        this.a_01.pcreate()
    }

//	<li tame="mli_d07_p01">
    create_li()
    {
		this.create_a()
		// Aqui no llega el term_id
		this.content 		=	this.a_01.code
    }

    build_data()
    {
		this.create_li()

		this.pcreate()

    }


}

exports.tax01_li_peloncita = tax01_li_peloncita
