
function process_farma_str(sLinea_int, pa_term, ccpa_raw, linea_C) 
{
    var sep_coma = ","
    var sep_underscore = "_"
    var sep_space = " "
    var sep_punto = "."
    linea_C = process_str_feeds(sLinea_int).trim()
    var string_sep = "/[" + sep_punto + "]+/"
    var split_arr = preg_split(string_sep, linea_C)
    var linea_pa = split_arr[0]
    var new_line = str_replace(sep_coma, sep_underscore, linea_pa)
    string_sep = "/[" + sep_space + "]+/"
    var arr_pa = preg_split(string_sep, new_line)
    pa_term = ""

    for (var spadata of Object.values(arr_pa)) {
        pa_term += locale_str_ucase(spadata)
    }

    string_sep = "/[" + sep_underscore + "]+/"
    arr_pa = preg_split(string_sep, pa_term)
    pa_term = ""
    var last_item = arr_pa.length
    var c = 0

    for (var spadata of Object.values(arr_pa)) {
        c++
        pa_term += locale_str_ucase(spadata)
        if (c < last_item) pa_term += sep_underscore
    }

    c = 0
    var sfinal = ""
    var arr_len = split_arr.length - 1

    for (var sdata of Object.values(split_arr)) {
        if (c > 0) 
        //echo "Iterando concentraciones: "  + c + " " + sdata + "\n"
            {
                sfinal += sdata
                if (c < arr_len) sfinal += "."
            }

        c++
    }

    var ccpa_raw_space = locale_str_tolower(sfinal).trim()
    ccpa_raw = str_replace(sep_space, sep_underscore, ccpa_raw_space)
}

