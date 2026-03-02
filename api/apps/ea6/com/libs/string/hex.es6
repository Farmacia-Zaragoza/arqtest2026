
function strToHex_show(string) {
    var hex = "";

    for (var i = 0; i < string.length; i++) {
        var ord = ord(string[i]);
        var hexCode = dechex(ord);
        hex += ("0" + hexCode).substr(-2) + "_";
    }

    return strToUpper(hex);
};

function strToHex(string) {
    var hex = "";

    for (var i = 0; i < string.length; i++) {
        var ord = ord(string[i]);
        var hexCode = dechex(ord);
        hex += ("0" + hexCode).substr(-2);
    }

    return strToUpper(hex);
};

function hexToStr_show(hex) {
    var string = "";
    var sep_int = "_";
    var string_sep = "/[" + sep_int + "]+/";
    var split_arr = preg_split(string_sep, hex);

    for (var str_hex of Object.values(split_arr)) {
        if (str_hex.length > 1) //[0] . $str_hex[1];
            {
                var full_hex_str = hexToStr(str_hex);
                string += full_hex_str + "_#";
            }
    }

    return string;
};

function hexToStr(hex) {
    var string = "";

    for (var i = 0; i < hex.length - 1; i += 2) {
        string += String.fromCharCode(hexdec(hex[i] + hex[i + 1]));
    }

    return string;
};

function Hextest(expected, actual, success) {
    if (expected !== actual) {
        echo(`Expected: '${expected}'\n`);
        echo(`Actual:   '${actual}'\n`);
        echo("\n");
        success = false;
    }

    return success;
};
