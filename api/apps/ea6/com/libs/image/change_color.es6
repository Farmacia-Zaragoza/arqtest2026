//Cambio de color en fotos
//[PHP_52]

function change_color_png(path_img_src, path_img_dst, change_col, target_col) //Rutas absolutas
{
	if (is_file(path_img_src)) //Se supone que no existe
		{
			var img_src = imagecreatefrompng(path_img_src);
			var img_dst = "";
			if (is_file(path_img_dst)) img_dst = imagecreatefrompng(path_img_dst);else {
				var imageX = imagesx(img_src);
				var imageY = imagesy(img_src);
				img_dst = imagecreatetruecolor(imageX, imageY);
			}
			change_color_html(img_src, img_dst, change_col, target_col);
			imagepng(img_dst, path_img_dst, 9);
			imagedestroy(img_src);
			imagedestroy(img_dst);
		}
};

function change_color_html(img_src, img_dst, change_col, target_col) {
	var changeR, changeG, changeB, targetR, targetG, targetB;
	[changeR, changeG, changeB] = sscanf(change_col, "#%02x%02x%02x");
	[targetR, targetG, targetB] = sscanf(target_col, "#%02x%02x%02x");
	change_color(img_src, img_dst, changeR, changeG, changeB, targetR, targetG, targetB);
};

function change_color(img_src, img_dst, changeR, changeG, changeB, targetR, targetG, targetB) //Note this:
//Pintamos la imagen destino de blanco -  Let's reduce the number of colors in the image to ONE
//Ojo que puede tardar un monton en completar los bucles
{
	var width = imagesx(img_src);
	var height = imagesy(img_src);
	var change_color = imagecolorallocate(img_dst, changeR, changeG, changeB);
	var change_html_color = sprintf("#%02x%02x%02x", changeR, changeG, changeB);
	var target_color = imagecolorallocate(img_dst, targetR, targetG, targetB);
	var target_html_color = sprintf("#%02x%02x%02x", targetR, targetG, targetB);
	imagefilledrectangle(img_dst, 0, 0, width, height, 16777215);

	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) //Get the index of the color of a pixel
		//$alpha = ( imagecolorat( $img_src, $x, $y ) >> 24 & 0xFF );
		//Array
		//127
		//print ('color ' . $color )								;
		//$alpha = 0.1 ; // ( imagecolorat( $img_src, $x, $y ) >> 24 );
		{
			var rgb = imagecolorat(img_src, x, y);
			var red = rgb >> 16 & 255;
			var green = rgb >> 8 & 255;
			var blue = rgb & 255;
			var alpha = (rgb & 2130706432) >> 24;
			var html_color = sprintf("#%02x%02x%02x", red, green, blue);

			if ("a" == "a" and html_color == change_html_color) {
				var color = target_color;
			} else //original image
				{
					color = imagecolorallocate(img_dst, red, green, blue);
				}

			if (false === col) {
				throw die("sorry, out of colors...");
			}

			imagesetpixel(img_dst, x, y, color);
		}
	}
};
