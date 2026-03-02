//Library for Php Objects
//Theme Inc  [V.0.0.2]  (2017-02-20)
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//- Theme and Page Structures
//- Fast Page load - Level 2 - Direct from disk
//print (' Supermnu pnode ' . $supermnu_pnode . $br )	;
//-Theme cookies
//-Theme Strucutures customized
var supermnu_thm = supermnu_libs + "theme/" + theme_name + "/";
var supermnu_pnode = supermnu_thm + "fast_node/pnode/";
var supermnu_drupal = supermnu_libs + "objects/drupal/";
var supermnu_pnodecom = supermnu_com + "fast_node/pnode/";

require(supermnu_drupal + "theme/t04_debug.thm");

require(supermnu_drupal + "theme/t03_debug_array.thm");

require(supermnu_drupal + "theme/t02_nid.thm");

require(supermnu_drupal + "theme/t01_structure.thm");

require(supermnu_pnode + "pn01_simple.pnode");

require(supermnu_com + "structure/theme_cookies.thm");

require(supermnu_thm + "structure/theme_" + theme_name + ".thm");
