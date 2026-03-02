//Library for SITE Objects
//Site Objects [V.0.0.3]  (2017-02-20)
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//Need defined supermnu_libs
//Bool Definitions
//Cache Definitions
//Site Definitions
var supermnu_drupal = supermnu_libs + "objects/drupal/";
var supermnu_bool = supermnu_drupal + "bool/";
var supermnu_cache = supermnu_drupal + "cache/";
var supermnu_site = supermnu_drupal + "site/";

require(supermnu_bool + "b03_bool_defs.obj");

require(supermnu_bool + "b02_bool_copy.obj");

require(supermnu_bool + "b01_bool.obj");

require(supermnu_cache + "c02_cache_defs.obj");

require(supermnu_cache + "c01_cache.obj");

require(supermnu_site + "s02_site_defs.obj");

require(supermnu_site + "s01_site.obj");
