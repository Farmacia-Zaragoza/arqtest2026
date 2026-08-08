//Generacion de imagenes PNG - Color con fondo en Blanco

function create_png(text = "PhoNe", color = "orange", font = "arial.ttf", font_size = "20", img_path = "phone.png") 
{
	var br = "</br>";
	var img = imagecreatetruecolor(300, 30);
	var imageX = imagesx(img);
	var imageY = imagesy(img);
	imagealphablending(img, false);
	imagesavealpha(img, true);
	var transparent = imagecolorallocatealpha(img, 255, 255, 255, 127);
	var white = imagecolorallocate(img, 255, 255, 255);
	var grey = imagecolorallocate(img, 127, 127, 127);
	var orange = imagecolorallocate(img, 244, 177, 75);
	var green = imagecolorallocate(img, 103, 82, 84);

	switch (color) {
		case "green":
			var color_image = green;
			break;

		default:
			color_image = orange;
			break;
	}

	var fontSize = 20;
	var textDim = imagettfbbox(fontSize, 0, font, text);
	var textX = textDim[2] - textDim[0];
	var textY = textDim[7] - textDim[1];
	var text_posX = imageX / 2 - textX / 2;
	var text_posY = imageY / 2 - textY / 2;
	imagefilledrectangle(img, 0, 0, imageX, imageY, white);
	imagealphablending(img, true);
	imagettftext(img, fontSize, 0, text_posX, text_posY, color_image, font, text);
	if (is_writeable(img_path)) imagepng(img, img_path, 9);
	imagedestroy(img);
};

