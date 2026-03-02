//Library for Php Objects
//Main Html  [V.0.0.2]  (2017-02-20)
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//- Level 1 - Header
//print ("Before_Head" . $br)													;
//- Level 0 - Row and section
//- Level 0 - Scripts
var cookies_name = "cookies";
var supermnu_thm = supermnu_libs + "theme/" + theme_name + "_" + cookies_name + "/";

require(supermnu_thm + "main_html/hea01_head_" + cookies_name + ".obj");

require(supermnu_thm + "main_html/hdr01_header_" + cookies_name + ".obj");

require(supermnu_thm + "main_html/bdy01_body_" + cookies_name + ".obj");

require(supermnu_thm + "main_html/met01_meta_" + cookies_name + ".obj");

require(supermnu_thm + "main_html/lnk01_link_" + cookies_name + ".obj");

require(supermnu_thm + "main_html/ctn01_container_" + cookies_name + ".obj");

require(supermnu_thm + "main_html/scr01_js_" + cookies_name + ".script");

require(supermnu_thm + "main_html/htm03_html_" + cookies_name + ".obj");
