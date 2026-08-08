//Generacion de imagenes PNG - Color con fondo en Blanco

const 	TextToSVG 			= require(	'/brqx/base/react/zcommon/node_modules/text-to-svg'							),	// dont work
		const fs = require(	'fs'																		);
		const path = require(	'path'																		);
		const echo = require(	'/brqx/base/react/zcommon/node_modules/node-echo'							);
		const Text2svg = require(	'/brqx/base/react/zcommon/node_modules/text2svg'							), // dont work;
		const logo = require(	'/brqx/base/react/zcommon/node_modules/logo.svg'							); // Works;

function create_svg(text = "PhoNe", 
					color = "orange", 
					font_name = "om_telolet_om-webfont.svg", 
					font_size = "20", 
					class_name = "") 
{
	var br = "</br>"
	var color_value = "#FFFFFF"
	if (color == "orange") color_value = "#F4B14B"
	if (color == "blue") color_value = "#000033"
	var font = "/brqx/base/fonts/correct_fonts/svg/" + font_name + ".svg"

	var font = "/brqx/base/fonts/correct_fonts/otf/Bjorn_Regular.otf"

	if ( fs.existsSync(font) 				&&   
		 fs.lstatSync(font).isFile()  	)
		{
			// Check if is number
			if ( typeof text === "number" ) 
			{
				font_size += 30
			}
			
			const attributes = {fill: color, stroke: 'white'};
			const options = {font: font , logo: text , x: 0, y: 0, fontSize: font_size, anchor: 'top', path : attributes};
			
			var svg = logo.generate(options);

			return svg
		}
}

module.exports.create_svg = create_svg