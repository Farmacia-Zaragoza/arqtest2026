// Node Js - Server with express - http
// Howto test : curl  http://truck.dbrqx.com:40080

const   path                =   require(  'path'                                             );
//-------------------------------------------------------------------------------------
let run_path                =   path.resolve(".")
let a_ruta                  =   run_path.split('/')
let a_len                   =   a_ruta.length -1
//-------------------------------------------------------------------------------------
var branch                  =   a_ruta[a_len - 2 ]        // Architecture Branch  (arq)
var prod                    =   a_ruta[a_len - 1 ]        // Architecture product (garldru)
var site                    =   a_ruta[a_len ]            // Architecture product (garldru)

var prodbranch              =   branch + '/' + prod + '/'
//-------------------------------------------------------------------------------------
var
    application_root = __dirname,
    express 	= require( 'express' ), //Web framework
    bodyParser 	= require('body-parser'), //Parser for reading request body
    http 		= require('http'),
    https 		= require('https'),
    http2 		= require('http2'),
	  tls 		= require('tls'),
    logger 		= require('morgan'),
    fs 			= require('fs'),
	yargs 		= require('yargs'),
	constants	= require('constants'),
	cluster 	= require('cluster'),
	chalk 		= require('chalk' 				),
	numCores 	= require('os').cpus().length	;

global.GLOBALS 			= 	Array()

// Bunyan logger

var bunyan = require('bunyan');

// La idea es pasar la app con parametros

var app = require('/brqx/run/react/' + prodbranch + site + '/apps/fire.es7');


var	bunlog = bunyan.createLogger({name: site});

// info - warn	- error
	bunlog.info("holaaaaaa " + site) ;

// ---------------- MANAGIN PROMISES REJECTION - GREAT --------------
process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {

        console.log( chalk.red.bold( "[PROCESS] Unhandled Promise Rejection" ) )
        console.log( chalk.green.bold( "- - - - - - - - - - - - - - - - - - -" ) )
        console.log( reason 												   )
        console.log( chalk.red.bold( "- -" ) 								   )
    }
)


// Configure server

// this works

// var sock = process.argv[2];

server_http 	= http.createServer(app)				;

var numCores = 6 ;
var sock_http_base 	= '/var/lib/nodejs/nodejs_' + branch + '_' + prod + '_' + site + '_http_sock_'


var o = 0

if (cluster.isMaster)
{
  masterProcess();
}
else if (cluster.isWorker)
{
  o =  `${cluster.worker.id}`


  var sock_http 	= sock_http_base  + o


  // console.log(`I am worker #${cluster.worker.id}`);
  childProcess(sock_http , o);
}


function masterProcess()
{
    for (let i = 0; i < numCores - 1 ; i++)
    {
        cluster.fork();
    }
}

function childProcess(sock_http, o)
{
   		console.log('ID [' + o + '] sock : ' + sock_http )
		// console.log(`Worker ${process.pid} started...`);
		// Si ya existe
		// if (fs.existsSync(sock_http)) 	fs.unlinkSync(sock_http)

		if (fs.existsSync(sock_http)) 	fs.unlinkSync(sock_http)

        // Server HTTP
        server_http.listen(
			sock_http, function ()
			{
                process.umask(0002)
                fs.chmodSync(sock_http, '775')
                // console.log('Started Cluster [' + o + '] Http!')
             }
        )


		// RELOAD APP - Falta probarlo


}
