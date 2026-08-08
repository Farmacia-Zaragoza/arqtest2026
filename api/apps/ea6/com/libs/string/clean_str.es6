//Obtiene solo la primera posicion del separador

function get_first_clean_occurence(str_in = "", sep_int = ".", end_line = "") {
    var string_sep = "/[" + sep_int + "]+/";
    var split_arr = preg_split(string_sep, str_in);
    var arr_len = split_arr.length - 1;
    if (arr_len > 0) end_line = split_arr[1];
    var clean_str_int = split_arr[0].trim();
    return clean_str_int;
};

function clean_str_lines(str_in, sep_out = " ", sep_int = ".") {
    var string_sep = "/[" + sep_int + "]+/";
    var split_arr = preg_split(string_sep, str_in);
    var clean_str_int = "";

    for (var occurence of Object.values(split_arr)) {
        clean_str_int += occurence.trim() + sep_out;
    }

    return clean_str_int;
};

