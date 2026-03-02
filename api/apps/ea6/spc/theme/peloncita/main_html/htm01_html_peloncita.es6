//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Html Div Class  [V.0.0.2]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Peloncita Structure Header
//-------------------------------------------------------------------------------------
//<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
//<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language  lang="<?php print $language ">
//------------------------------------------------------------------------------------
//<!DOCTYPE html>
//<html lang="en">
//<head>
//<body data-background = "url('images/Brqx_FondoVariado_300x200_Image11_i.png') repeat scroll left top"
//------------------------------------------------------------------------------------
// DOCTYPE
//HTML
//HEAD
//BODY
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class htm01_html_peloncita extends html_style {

	constructor(thm) 
	{
		this.tag_type = "html"

		this.img_background = ""
		this.img_logo = ""

		super.constructor(this.tag_type)
		this.thm = thm
		this.build_contents()
	}

	create_head() 
	{
		this.head_01 = new hea01_head_peloncita(this.thm)
		this.content += this.head_01.code
	}

	create_body() 
	{
		this.body_01 = new bdy01_body_peloncita(this.thm)
		this.content += this.body_01.code
	}

	build_data() 
	{
		this.content = ""
		this.lang = "en"
		this.create_head()
		this.create_body()
		this.pcreate()
	}

}

exports.htm01_html_peloncita = htm01_html_peloncita