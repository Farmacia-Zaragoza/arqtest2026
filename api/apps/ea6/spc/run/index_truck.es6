//---------------------------------------------------------------------------------
// Index Truck Node Js app
// Install problem : npm install --unsafe-perm

const 	echo 				= require(	'node-echo'		),
	  	fs 	 			= require(	'fs'														),
		path 				= require(	'path'													),
		rp 	 			= require(	'node_modules/fs.realpath'			);


echo("<!doctype html>")
var site_name = "truck"
var theme_name = "truck"

var starttimer = Date.now() / 1000 + Date.now() / 1000
var br = "<br>"

global.start_time = starttimer

var PHP_VER = "v52"

// /mnt/ssd/brqx/base/rcode/es6/spc/run/index_truck.es6
// if (!("base_dir" in global)) base_dir = undefined


var base_dir = 'pepito'

// devuelve la carpeta
// /mnt/ssd/brqx/base/react/zcommon
base_dir = path.resolve('.')

// echo ('ABD ' + base_dir )

fs.stat(base_dir , function (err, stats) {
        if (err) {  console.log(err);     }
        if (stats.isFile()) {base_dir = path.dirname(base_dir) }
    });

// echo (base_dir)

var supermnu_libs = base_dir + "/es6/spc/"

require(supermnu_libs + "inc/" + theme_name + "/zz_fast.lib")

var puting_contents = "index:start:" + starttimer + ">"
var d = new anode_debug_save_file()
d.d_start(puting_contents)
var live = true
var translation = false
var sync = false
var cache = false

/*

var b = new bool(cache, translation, sync, live)
var disk = "noreload"
var ssd = "noreload"
var ram = "noreload"
var search = "noreload"
var c = new cache(b, disk, ssd, ram, search)
var multi_lang = true
var multi_lang_uri = true
var s = new site(c, multi_lang, multi_lang_uri)
s.theme(site_name, theme_name)
var u = new uri(s)
GLOBALS.SITE_URL_OBJECT = u

if (cache and
	(b.page_download or
		(c.ram == "noreload" and !(-1 !== c.arr.ram.indexOf("FPC")))) //a. Level 01 - Load only generated files
	//$u->p('Before p02')
	//$u->p('RamGen B ' . true  . '==' . $pnode->status)
	{
		var pnode = new pn02_fast(u)
	}

if ("A" === "A") if (cache and c.ram == "noreload" and !(-1 !== c.arr.ram.indexOf("FPC")) and undefined !== pnode and pnode.status == 1) //Fast node generation - Only load cached pages | structures
	//print $pnode->code
	{
		print("FPC" + pnode.code)
		var stop_time = Date.now() / 1000 + Date.now() / 1000
		var start_time = GLOBALS.start_time
		var total_time = Math.round(stop_time - start_time, 4)
		var time_str = total_time + " segundos "
	} else if (s.load != "drupal") //B. LOAD PAGE - POSIBLE SECOND CACHE LEVEL : COMPONENTS
	///ssd/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/rphp/dats/peloncita/
	//$u->p('Before_pnode_01')
	//02.Site object
	//print ('Index_Fast_End::Generating - pn01_simple ' . $br)
	{
		var supermnu_dats = supermnu_libs + "dats/" + theme_name + "/"
		pnode = new pn01_simple(u)

		if ("A" === "A" and pnode.status) //print 'N52a ' . $pnode->code
			{
				print(pnode.code)
			}
	}
*/
