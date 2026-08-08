//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods: No recuerdo donde lo uso
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//class var for drupal && magento{


class dvar {
	constructor(drupal_theme_path = "", drupal_language = "", drupal_head_title = "", drupal_sidebar_left = "", 
	drupal_sidebar_right = "", drupal_header = "", drupal_help = "", drupal_site_name = "", drupal_site_slogan = "", 
	drupal_mission = "", drupal_tabs = "", drupal_tabs2 = "", drupal_title = "", drupal_closure = "", drupal_search_box = "", 
	drupal_messages = "", drupal_feed_icons = "", drupal_logo = "", drupal_icon = "", drupal_content = "", drupal_head = "", 
	drupal_styles = "", drupal_scripts = "") 
	{
		super()
		this.drupal_theme_path = ""
		this.drupal_language = ""
		this.drupal_head_title = ""
		this.drupal_sidebar_left = ""
		this.drupal_sidebar_right = ""
		this.drupal_header = ""
		this.drupal_help = ""
		this.drupal_site_name = ""
		this.drupal_site_slogan = ""
		this.drupal_mission = ""
		this.drupal_tabs = ""
		this.drupal_tabs2 = ""
		this.drupal_title = ""
		this.drupal_closure = ""
		this.drupal_search_box = ""
		this.drupal_messages = ""
		this.drupal_feed_icons = ""
		this.drupal_content = ""
		this.drupal_logo = ""
		this.drupal_icon = ""
		this.drupal_theme_path = drupal_theme_path
		this.drupal_language = drupal_language
		this.drupal_head_title = drupal_head_title
		this.drupal_sidebar_left = drupal_sidebar_left
		this.drupal_sidebar_right = drupal_sidebar_right
		this.drupal_header = drupal_header
		this.drupal_help = drupal_help
		this.drupal_site_name = drupal_site_name
		this.drupal_site_slogan = drupal_site_slogan
		this.drupal_mission = drupal_mission
		this.drupal_tabs = drupal_tabs
		this.drupal_tabs2 = drupal_tabs2
		this.drupal_title = drupal_title
		this.drupal_closure = drupal_closure
		this.drupal_search_box = drupal_search_box
		this.drupal_messages = drupal_messages
		this.drupal_feed_icons = drupal_feed_icons
		this.drupal_content = drupal_content
		this.drupal_logo = drupal_logo
		this.drupal_icon = drupal_icon
		this.drupal_head = drupal_head
		this.drupal_styles = drupal_styles
		this.drupal_scripts = drupal_scripts
	}

}

exports.dvar = dvar