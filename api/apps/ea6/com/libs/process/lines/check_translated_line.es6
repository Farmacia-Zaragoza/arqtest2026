<?php


function check_translated_line($INPUT_LINE, $SUBCODE, &$MAIN_TRAN)
{
    // Comprueba que la linea pasada no es una division principal
	$check_translated	=	false;		// Se usara para indicar que se debe traducir
	$check_main			=	false;		// Se usara para indicar que se debe traducir de forma especial (main - terminos indice muy comunes)
    $INPUT_LINE = get_first_clean_occurence($INPUT_LINE,':');

	$SUBCODES="accion_y_mecanismo analisis_clinicos consejos_al_paciente consideraciones_especiales contraindicaciones embarazo farmacocinetica "; 
	$SUBCODES.="indicaciones interacciones normas_correcta_administracion posologia posologia_en_insuficiencia_hepatica posologia_en_insuficiencia_renal "; 
	$SUBCODES.="precauciones efectos_conduccion reacciones_adversas sobredosis referencias_bibliograficas fecha_aprobacion "; 
	$SUBCODES.="composicion_unidad composicion_por_ml forma_farmaceutica intolerancia_alimentaria conservacion_caducidad ingredientes analisis_medio "; 
	$SUBCODES.="energia precacuciones_advertencias alergia latex forma_utilizacion propiedades accion_descripcion funcion";
	
	// echo "Buscando Subcode " . $SUBCODE . "\n\r"; [PR_DISABLED]
	if ($SUBCODE != "")
		$IS_SUBCODE_TO_TRANSLATE=strpos($SUBCODES, $SUBCODE);
	else
		$IS_SUBCODE_TO_TRANSLATE=true;
    
    if ( $INPUT_LINE 		== "ACCIÓN Y MECANISMO" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE 	== "ANALISIS CLINICOS" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }   
    elseif ( $INPUT_LINE 	== "CONSEJOS AL PACIENTE" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE 	== "CONSIDERACIONES ESPECIALES" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE 	== "CONTRAINDICACIONES" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE 	== "EMBARAZO" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE 	== "FARMACOCINÉTICA" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE 	== "INDICACIONES" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE 	== "INTERACCIONES" )
    {   
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE 	== "NORMAS PARA LA CORRECTA ADMINISTRACIÓN" )
    {   
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "POSOLOGÍA" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "POSOLOGÍA EN INSUFICIENCIA HEPÁTICA" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "POSOLOGÍA EN INSUFICIENCIA RENAL" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
	}   
    elseif ( $INPUT_LINE == "PRECAUCIONES" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }       
    elseif ( $INPUT_LINE == "EFECTOS SOBRE LA CONDUCCIÓN" )    
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }       
    elseif ( $INPUT_LINE == "REACCIONES ADVERSAS" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "SOBREDOSIS" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "REFERENCIAS BIBLIOGRAFICAS" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "FECHA DE APROBACIÓN/REVISIÓN DE LA FICHA" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }       
    elseif ( $INPUT_LINE == "LABORATORIO FARMACÉUTICO" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "COMPOSICIÓN POR UNIDAD" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "COMPOSICIÓN POR ML." )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "PRESENTACIÓN" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "USO EN PACIENTES CON INTOLERANCIA ALIMENTARIA" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "CONSERVACIÓN Y CADUCIDAD" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "INGREDIENTES" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "ANÁLISIS MEDIO" )
    {
		$check_translated	=	true;
		$check_main			=	true;	
		    }
    elseif ( $INPUT_LINE == "ENERGÍA" )
    {
        // Tag Parafarmacia
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "PRECAUCIONES Y ADVERTENCIAS" )
    {
        // Tag Parafarmacia
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "ALERGIA AL LATEX" )
    {
        // Tag Parafarmacia - Pnales
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "FORMA DE UTILIZACION" )
    {
        // Tag Parafarmacia - Pnales
		$check_translated	=	true;
		$check_main			=	true;	
	}
    elseif ( $INPUT_LINE == "PROPIEDADES" )
    {
        // Tag Parafarmacia - Pnales
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "ACCIÓN Y DESCRIPCIÓN" )
    {
        // Tag Parafarmacia - Pnales
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "FUNCIÓN" )
    {
        // Tag Parafarmacia - Pnales
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "USO EN CONDICIONES ESPECIALES" )
    {
        // En este caso no deseamos guardar nada
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "USO EN ALERGIAS" )
    {
        // En este caso no deseamos guardar nada
		$check_translated	=	true;
		$check_main			=	true;	
    }
    elseif ( $INPUT_LINE == "INFORMACIÓN NUTRICIONAL" )
    {
        // En este caso no deseamos guardar nada
		$check_translated	=	true;
		$check_main			=	true;	
    }
	// Lineas de contenido - Analizamos el apartado - subcode
	elseif ( $SUBCODE == "nombre_comercial")
    {
        // Si es nombre comercial no debemos traducirlo
		$check_translated	=	false;

    }
	elseif ( $SUBCODE == "laboratorio_farmaceutico")
    {
        // Si es laboratorio farmaceutico solo debemos traducir si es el texto principal
		$check_translated	=	false;
    }
    elseif ( $IS_SUBCODE_TO_TRANSLATE )
    {
		$check_translated	=	true;
    }
        
	// Devolvemos si es una traduccion especial
	$MAIN_TRAN		=	$check_main;	

    return  $check_translated;
}


