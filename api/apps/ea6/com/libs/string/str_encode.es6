//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
//Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
//---------------------------------------------------------------------------
//Brqx 2016 - 22/06/16				Depth:[03]
//Version : 0.0.1                  Type :[FUNCTION]
//---------------------------------------------------------------------------
//- Notas
//---------------------------------------------------------------------------
//+ Devuelve cadenas capitalizadas en base a utf8
//---------------------------------------------------------------------------
//- Funciones
//---------------------------------------------------------------------------
//-- locale_str_tolower - locale_str_ucase
//---------------------------------------------------------------------------
//- Requiere
//---------------------------------------------------------------------------
//-- strtolower_utf8
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//codifica Unicode langs
//For php 5.2

function encode(str) //big endian
{
    str = mb_convert_encoding(str, "UTF-32", "UTF-8")
    var split = str_split(str, 4)
    var res = ""

    for (var c of Object.values(split)) {
        var cur = 0

        for (var i = 0 i < 4 i++) {
            cur |= c.charCodeAt(i) << 8 * (3 - i)
        }

        res += "&#" + cur + ""
    }

    return res
}

