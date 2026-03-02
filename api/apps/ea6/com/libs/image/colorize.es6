//Cambio de color en fotos
//[PHP_52]

// PENDIENTE TO REVIEW

function colorize(path_img_src, path_img_dst, target_col = "green") //Rutas absolutas
{
	if (is_file(path_img_src)) //Se supone que no existe
		{
			var img_src = imagecreatefrompng(path_img_src);
			var img_dst = imagecreatefrompng(path_img_src);
			colorize_inner(img_src, img_dst, target_col);
			imagepng(img_dst, path_img_dst, 9);
			imagedestroy(img_src);
			imagedestroy(img_dst);
		}
};

function colorize_inner(img_src, img_dst, target_col) //Values for orange initial
//We must negate values since colorize only works for non-white parts.
{
	var brown = [127, 127, 127];
	var naranja = [77, 77, 77];
	var green = ["27", "121", "185"];
	var light_green = ["147", "221", "185"];
	var light_brown = ["147", "161", "185"];
	var red = ["197", "121", "185"];
	var blue = [0, 0, 255];

	switch (target_col) {
		case "green":
			var rgb = green;
			break;

		case "red":
			rgb = red;
			break;

		case "naranja":
			rgb = red;
			break;

		default:
			rgb = green;
			break;
	}

	rgb = [255 - rgb[0], 255 - rgb[1], 255 - rgb[2]];
	imagefilter(img_dst, IMG_FILTER_NEGATE);
	imagefilter(img_dst, IMG_FILTER_COLORIZE, rgb[0], rgb[1], rgb[2]);
	imagefilter(img_dst, IMG_FILTER_NEGATE);
	imagealphablending(img_dst, false);
	imagesavealpha(img_dst, true);
};
