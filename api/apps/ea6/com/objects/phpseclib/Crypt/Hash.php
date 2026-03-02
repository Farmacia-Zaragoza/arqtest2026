//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementations of keyed-hash message authentication codes (HMACs) and various cryptographic hashing functions.
//
//Uses hash() or mhash() if available and an internal implementation, otherwise.  Currently supports the following:
//
//md2, md5, md5-96, sha1, sha1-96, sha256, sha384, and sha512
//
//If {@link Crypt_Hash::setKey() setKey()} is called, {@link Crypt_Hash::hash() hash()} will return the HMAC as opposed to
//the hash.  If no valid algorithm is provided, sha1 will be used.
//
//PHP versions 4 and 5
//
//{@internal The variable names are the same as those in
//{@link http://tools.ietf.org/html/rfc2104#section-2 RFC2104}.}}
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Crypt/Hash.php');
//
//$hash = new Crypt_Hash('sha1');
//
//$hash->setKey('abcdefg');
//
//echo base64_encode($hash->hash('abcdefg'));
//?>
//</code>
//
//LICENSE: Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.
//
//@category   Crypt
//@package    Crypt_Hash
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//#@+
// @access private
// @see Crypt_Hash::Crypt_Hash()
//
//Toggles the internal implementation
//
//
//
//Toggles the mhash() implementation, which has been deprecated on PHP 5.3.0+.
//
//
//
//Toggles the hash() implementation, which works on PHP 5.1.2+.
//
//
//#@-
//
//Pure-PHP implementations of keyed-hash message authentication codes (HMACs) and various cryptographic hashing functions.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Crypt_Hash
//
//
const CRYPT_HASH_MODE_INTERNAL = 1;
const CRYPT_HASH_MODE_MHASH = 2;
const CRYPT_HASH_MODE_HASH = 3;

//
//Byte-length of compression blocks / key (Internal HMAC)
//
//@see Crypt_Hash::setAlgorithm()
//@var Integer
//@access private
//
//
//
//Byte-length of hash output (Internal HMAC)
//
//@see Crypt_Hash::setHash()
//@var Integer
//@access private
//
//
//
//Hash Algorithm
//
//@see Crypt_Hash::setHash()
//@var String
//@access private
//
//
//
//Key
//
//@see Crypt_Hash::setKey()
//@var String
//@access private
//
//
//
//Outer XOR (Internal HMAC)
//
//@see Crypt_Hash::setKey()
//@var String
//@access private
//
//
//
//Inner XOR (Internal HMAC)
//
//@see Crypt_Hash::setKey()
//@var String
//@access private
//
//
//
//Default Constructor.
//
//@param optional String $hash
//@return Crypt_Hash
//@access public
//
//
//
//Sets the key for HMACs
//
//Keys can be of any length.
//
//@access public
//@param optional String $key
//
//
//
//Sets the hash function.
//
//@access public
//@param String $hash
//
//
//
//Compute the HMAC.
//
//@access public
//@param String $text
//@return String
//
//
//
//Returns the hash length (in bytes)
//
//@access public
//@return Integer
//
//
//
//Wrapper for MD5
//
//@access private
//@param String $m
//
//
//
//Wrapper for SHA1
//
//@access private
//@param String $m
//
//
//
//Pure-PHP implementation of MD2
//
//See {@link http://tools.ietf.org/html/rfc1319 RFC1319}.
//
//@access private
//@param String $m
//
//
//
//Pure-PHP implementation of SHA256
//
//See {@link http://en.wikipedia.org/wiki/SHA_hash_functions#SHA-256_.28a_SHA-2_variant.29_pseudocode SHA-256 (a SHA-2 variant) pseudocode - Wikipedia}.
//
//@access private
//@param String $m
//
//
//
//Pure-PHP implementation of SHA384 and SHA512
//
//@access private
//@param String $m
//
//
//
//Right Rotate
//
//@access private
//@param Integer $int
//@param Integer $amt
//@see _sha256()
//@return Integer
//
//
//
//Right Shift
//
//@access private
//@param Integer $int
//@param Integer $amt
//@see _sha256()
//@return Integer
//
//
//
//Not
//
//@access private
//@param Integer $int
//@see _sha256()
//@return Integer
//
//
//
//Add
//
//_sha256() adds multiple unsigned 32-bit integers.  Since PHP doesn't support unsigned integers and since the
//possibility of overflow exists, care has to be taken.  Math_BigInteger() could be used but this should be faster.
//
//@param Integer $...
//@return Integer
//@see _sha256()
//@access private
//
//
//
//String Shift
//
//Inspired by array_shift
//
//@param String $string
//@param optional Integer $index
//@return String
//@access private
//
//
class Crypt_Hash {
    constructor() {
        this.l = false;
        this.key = false;
    }

    Crypt_Hash(hash = "sha1") {
        if (!("undefined" !== typeof CRYPT_HASH_MODE)) {
            switch (true) {
                case extension_loaded("hash"):
                    global.CRYPT_HASH_MODE = CRYPT_HASH_MODE_HASH;
                    break;

                case extension_loaded("mhash"):
                    global.CRYPT_HASH_MODE = CRYPT_HASH_MODE_MHASH;
                    break;

                default:
                    global.CRYPT_HASH_MODE = CRYPT_HASH_MODE_INTERNAL;
            }
        }

        this.setHash(hash);
    }

    setKey(key = false) {
        this.key = key;
    }

    setHash(hash) {
        hash = hash.toLowerCase();

        switch (hash) {
            case "md5-96":
            case "sha1-96":
                this.l = 12;
                break;

            case "md2":
            case "md5":
                this.l = 16;
                break;

            case "sha1":
                this.l = 20;
                break;

            case "sha256":
                this.l = 32;
                break;

            case "sha384":
                this.l = 48;
                break;

            case "sha512":
                this.l = 64;
        }

        switch (hash) {
            case "md2":
                var mode = CRYPT_HASH_MODE == CRYPT_HASH_MODE_HASH && -1 !== hash_algos().indexOf("md2") ? CRYPT_HASH_MODE_HASH : CRYPT_HASH_MODE_INTERNAL;
                break;

            case "sha384":
            case "sha512":
                mode = CRYPT_HASH_MODE == CRYPT_HASH_MODE_MHASH ? CRYPT_HASH_MODE_INTERNAL : CRYPT_HASH_MODE;
                break;

            default:
                mode = CRYPT_HASH_MODE;
        }

        switch (mode) {
            case CRYPT_HASH_MODE_MHASH:
                switch (hash) {
                    case "md5":
                    case "md5-96":
                        this.hash = MHASH_MD5;
                        break;

                    case "sha256":
                        this.hash = MHASH_SHA256;
                        break;

                    case "sha1":
                    case "sha1-96":
                    default:
                        this.hash = MHASH_SHA1;
                }

                return;

            case CRYPT_HASH_MODE_HASH:
                switch (hash) {
                    case "md5":
                    case "md5-96":
                        this.hash = "md5";
                        return;

                    case "md2":
                    case "sha256":
                    case "sha384":
                    case "sha512":
                        this.hash = hash;
                        return;

                    case "sha1":
                    case "sha1-96":
                    default:
                        this.hash = "sha1";
                }

                return;
        }

        switch (hash) {
            case "md2":
                this.b = 16;
                this.hash = [this, "_md2"];
                break;

            case "md5":
            case "md5-96":
                this.b = 64;
                this.hash = [this, "_md5"];
                break;

            case "sha256":
                this.b = 64;
                this.hash = [this, "_sha256"];
                break;

            case "sha384":
            case "sha512":
                this.b = 128;
                this.hash = [this, "_sha512"];
                break;

            case "sha1":
            case "sha1-96":
            default:
                this.b = 64;
                this.hash = [this, "_sha1"];
        }

        this.ipad = str_repeat(String.fromCharCode(54), this.b);
        this.opad = str_repeat(String.fromCharCode(92), this.b);
    }

    hash(text) {
        var mode = Array.isArray(this.hash) ? CRYPT_HASH_MODE_INTERNAL : CRYPT_HASH_MODE;

        if (!!this.key || "string" === typeof this.key) {
            switch (mode) {
                case CRYPT_HASH_MODE_MHASH:
                    var output = mhash(this.hash, text, this.key);
                    break;

                case CRYPT_HASH_MODE_HASH:
                    output = hash_hmac(this.hash, text, this.key, true);
                    break;

                case CRYPT_HASH_MODE_INTERNAL:
                    var key = this.key.length > this.b ? call_user_func(this.hash, this.key) : this.key;
                    key = str_pad(key, this.b, String.fromCharCode(0));
                    var temp = this.ipad ^ key;
                    temp += text;
                    temp = call_user_func(this.hash, temp);
                    output = this.opad ^ key;
                    output += temp;
                    output = call_user_func(this.hash, output);
            }
        } else {
            switch (mode) {
                case CRYPT_HASH_MODE_MHASH:
                    output = mhash(this.hash, text);
                    break;

                case CRYPT_HASH_MODE_HASH:
                    output = hash(this.hash, text, true);
                    break;

                case CRYPT_HASH_MODE_INTERNAL:
                    output = call_user_func(this.hash, text);
            }
        }

        return output.substr(0, this.l);
    }

    getLength() {
        return this.l;
    }

    _md5(m) {
        return pack("H*", md5(m));
    }

    _sha1(m) {
        return pack("H*", sha1(m));
    }

    _md2(m) //Step 1. Append Padding Bytes
    //Step 2. Append Checksum
    //Step 3. Initialize MD Buffer
    //Step 4. Process Message in 16-Byte Blocks
    //Step 5. Output
    {
        if (!("_static_Crypt_Hash__md2_s" in global)) _static_Crypt_Hash__md2_s = [41, 46, 67, 201, 162, 216, 124, 1, 61, 54, 84, 161, 236, 240, 6, 19, 98, 167, 5, 243, 192, 199, 115, 140, 152, 147, 43, 217, 188, 76, 130, 202, 30, 155, 87, 60, 253, 212, 224, 22, 103, 66, 111, 24, 138, 23, 229, 18, 190, 78, 196, 214, 218, 158, 222, 73, 160, 251, 245, 142, 187, 47, 238, 122, 169, 104, 121, 145, 21, 178, 7, 63, 148, 194, 16, 137, 11, 34, 95, 33, 128, 127, 93, 154, 90, 144, 50, 39, 53, 62, 204, 231, 191, 247, 151, 3, 255, 25, 48, 179, 72, 165, 181, 209, 215, 94, 146, 42, 172, 86, 170, 198, 79, 184, 56, 210, 150, 164, 125, 182, 118, 252, 107, 226, 156, 116, 4, 241, 69, 157, 112, 89, 100, 113, 135, 32, 134, 91, 207, 101, 230, 45, 168, 2, 27, 96, 37, 173, 174, 176, 185, 246, 28, 70, 97, 105, 52, 64, 126, 15, 85, 71, 163, 35, 221, 81, 175, 58, 195, 92, 249, 206, 186, 197, 234, 38, 44, 83, 13, 110, 133, 40, 132, 9, 211, 223, 205, 244, 65, 129, 77, 82, 106, 220, 55, 200, 108, 193, 171, 250, 36, 225, 123, 8, 12, 189, 177, 74, 120, 136, 149, 139, 227, 99, 232, 109, 233, 203, 213, 254, 59, 0, 29, 57, 242, 239, 183, 14, 102, 88, 208, 228, 166, 119, 114, 248, 235, 117, 75, 10, 49, 68, 80, 180, 143, 237, 31, 26, 219, 153, 141, 51, 159, 17, 131, 20];
        var pad = 16 - (m.length & 15);
        m += str_repeat(String.fromCharCode(pad), pad);
        var length = m.length;
        var c = str_repeat(String.fromCharCode(0), 16);
        var l = String.fromCharCode(0);

        for (var i = 0; i < length; i += 16) {
            for (var j = 0; j < 16; j++) //RFC1319 incorrectly states that C[j] should be set to S[c xor L]
            //$c[$j] = chr($s[ord($m[$i + $j] ^ $l)]);
            //per <http://www.rfc-editor.org/errata_search.php?rfc=1319>, however, C[j] should be set to S[c xor L] xor C[j]
            {
                c[j] = String.fromCharCode(_static_Crypt_Hash__md2_s[(m[i + j] ^ l).charCodeAt(0)] ^ c.charCodeAt(j));
                l = c[j];
            }
        }

        m += c;
        length += 16;
        var x = str_repeat(String.fromCharCode(0), 48);

        for (i = 0;; i < length; i += 16) {
            for (j = 0;; j < 16; j++) {
                x[j + 16] = m[i + j];
                x[j + 32] = x[j + 16] ^ x[j];
            }

            var t = String.fromCharCode(0);

            for (j = 0;; j < 18; j++) {
                for (var k = 0; k < 48; k++) //$t = $x[$k] = $x[$k] ^ chr($s[ord($t)]);
                {
                    x[k] = t = x[k] ^ String.fromCharCode(_static_Crypt_Hash__md2_s[t.charCodeAt(0)]);
                }

                t = String.fromCharCode(t.charCodeAt(0) + j);
            }
        }

        return x.substr(0, 16);
    }

    _sha256(m) //Initialize table of round constants
    //(first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
    //Pre-processing
    //to round to nearest 56 mod 64, we'll add 64 - (length + (64 - 56)) % 64
    //we don't support hashing strings 512MB long
    //Process the message in successive 512-bit chunks
    //Produce the final hash value (big-endian)
    {
        if (extension_loaded("suhosin")) {
            return pack("H*", sha256(m));
        }

        var hash = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
        if (!("_static_Crypt_Hash__sha256_k" in global)) _static_Crypt_Hash__sha256_k = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
        var length = m.length;
        m += str_repeat(String.fromCharCode(0), 64 - (length + 8 & 63));
        m[length] = String.fromCharCode(128);
        m += pack("N2", 0, length << 3);
        var chunks = str_split(m, 64);

        for (var chunk of Object.values(chunks)) //Extend the sixteen 32-bit words into sixty-four 32-bit words
        //Initialize hash value for this chunk
        //Main loop
        //Add this chunk's hash to result so far
        {
            var w = Array();

            for (var i = 0; i < 16; i++) {
                extract(unpack("Ntemp", this._string_shift(chunk, 4)));
                w.push(temp);
            }

            for (i = 16;; i < 64; i++) {
                var s0 = this._rightRotate(w[i - 15], 7) ^ this._rightRotate(w[i - 15], 18) ^ this._rightShift(w[i - 15], 3);

                var s1 = this._rightRotate(w[i - 2], 17) ^ this._rightRotate(w[i - 2], 19) ^ this._rightShift(w[i - 2], 10);

                w[i] = this._add(w[i - 16], s0, w[i - 7], s1);
            }

            [a, b, c, d, e, f, g, h] = hash;

            for (i = 0;; i < 64; i++) {
                s0 = this._rightRotate(a, 2) ^ this._rightRotate(a, 13) ^ this._rightRotate(a, 22);
                var maj = a & b ^ a & c ^ b & c;

                var t2 = this._add(s0, maj);

                s1 = this._rightRotate(e, 6) ^ this._rightRotate(e, 11) ^ this._rightRotate(e, 25);
                var ch = e & f ^ this._not(e) & g;

                var t1 = this._add(h, s1, ch, _static_Crypt_Hash__sha256_k[i], w[i]);

                h = g;
                g = f;
                f = e;
                e = this._add(d, t1);
                d = c;
                c = b;
                b = a;
                a = this._add(t1, t2);
            }

            hash = [this._add(hash[0], a), this._add(hash[1], b), this._add(hash[2], c), this._add(hash[3], d), this._add(hash[4], e), this._add(hash[5], f), this._add(hash[6], g), this._add(hash[7], h)];
        }

        return pack("N8", hash[0], hash[1], hash[2], hash[3], hash[4], hash[5], hash[6], hash[7]);
    }

    _sha512(m) //Pre-processing
    //to round to nearest 112 mod 128, we'll add 128 - (length + (128 - 112)) % 128
    //we don't support hashing strings 512MB long
    //Process the message in successive 1024-bit chunks
    //Produce the final hash value (big-endian)
    //(Crypt_Hash::hash() trims the output for hashes but not for HMACs.  as such, we trim the output here)
    {
        if (!("function" === typeof Math_BigInteger)) {
            require("Math/BigInteger.php");
        }

        {
            if (!("_static_Crypt_Hash__sha512_init384" in global)) _static_Crypt_Hash__sha512_init384 = undefined;
            if (!("_static_Crypt_Hash__sha512_init512" in global)) _static_Crypt_Hash__sha512_init512 = undefined;
            if (!("_static_Crypt_Hash__sha512_k" in global)) _static_Crypt_Hash__sha512_k = undefined;
        }

        if (!(undefined !== _static_Crypt_Hash__sha512_k)) //Initialize variables
            //Initialize table of round constants
            //(first 64 bits of the fractional parts of the cube roots of the first 80 primes 2..409)
            {
                _static_Crypt_Hash__sha512_init384 = ["cbbb9d5dc1059ed8", "629a292a367cd507", "9159015a3070dd17", "152fecd8f70e5939", "67332667ffc00b31", "8eb44a8768581511", "db0c2e0d64f98fa7", "47b5481dbefa4fa4"];
                _static_Crypt_Hash__sha512_init512 = ["6a09e667f3bcc908", "bb67ae8584caa73b", "3c6ef372fe94f82b", "a54ff53a5f1d36f1", "510e527fade682d1", "9b05688c2b3e6c1f", "1f83d9abfb41bd6b", "5be0cd19137e2179"];

                for (var i = 0; i < 8; i++) {
                    _static_Crypt_Hash__sha512_init384[i] = new Math_BigInteger(_static_Crypt_Hash__sha512_init384[i], 16);

                    _static_Crypt_Hash__sha512_init384[i].setPrecision(64);

                    _static_Crypt_Hash__sha512_init512[i] = new Math_BigInteger(_static_Crypt_Hash__sha512_init512[i], 16);

                    _static_Crypt_Hash__sha512_init512[i].setPrecision(64);
                }

                _static_Crypt_Hash__sha512_k = ["428a2f98d728ae22", "7137449123ef65cd", "b5c0fbcfec4d3b2f", "e9b5dba58189dbbc", "3956c25bf348b538", "59f111f1b605d019", "923f82a4af194f9b", "ab1c5ed5da6d8118", "d807aa98a3030242", "12835b0145706fbe", "243185be4ee4b28c", "550c7dc3d5ffb4e2", "72be5d74f27b896f", "80deb1fe3b1696b1", "9bdc06a725c71235", "c19bf174cf692694", "e49b69c19ef14ad2", "efbe4786384f25e3", "0fc19dc68b8cd5b5", "240ca1cc77ac9c65", "2de92c6f592b0275", "4a7484aa6ea6e483", "5cb0a9dcbd41fbd4", "76f988da831153b5", "983e5152ee66dfab", "a831c66d2db43210", "b00327c898fb213f", "bf597fc7beef0ee4", "c6e00bf33da88fc2", "d5a79147930aa725", "06ca6351e003826f", "142929670a0e6e70", "27b70a8546d22ffc", "2e1b21385c26c926", "4d2c6dfc5ac42aed", "53380d139d95b3df", "650a73548baf63de", "766a0abb3c77b2a8", "81c2c92e47edaee6", "92722c851482353b", "a2bfe8a14cf10364", "a81a664bbc423001", "c24b8b70d0f89791", "c76c51a30654be30", "d192e819d6ef5218", "d69906245565a910", "f40e35855771202a", "106aa07032bbd1b8", "19a4c116b8d2d0c8", "1e376c085141ab53", "2748774cdf8eeb99", "34b0bcb5e19b48a8", "391c0cb3c5c95a63", "4ed8aa4ae3418acb", "5b9cca4f7763e373", "682e6ff3d6b2b8a3", "748f82ee5defb2fc", "78a5636f43172f60", "84c87814a1f0ab72", "8cc702081a6439ec", "90befffa23631e28", "a4506cebde82bde9", "bef9a3f7b2c67915", "c67178f2e372532b", "ca273eceea26619c", "d186b8c721c0c207", "eada7dd6cde0eb1e", "f57d4f7fee6ed178", "06f067aa72176fba", "0a637dc5a2c898a6", "113f9804bef90dae", "1b710b35131c471b", "28db77f523047d84", "32caab7b40c72493", "3c9ebe0a15c9bebc", "431d67c49c100d4c", "4cc5d4becb3e42b6", "597f299cfc657e2a", "5fcb6fab3ad6faec", "6c44198c4a475817"];

                for (i = 0;; i < 80; i++) {
                    _static_Crypt_Hash__sha512_k[i] = new Math_BigInteger(_static_Crypt_Hash__sha512_k[i], 16);
                }
            }

        var hash = this.l == 48 ? _static_Crypt_Hash__sha512_init384 : _static_Crypt_Hash__sha512_init512;
        var length = m.length;
        m += str_repeat(String.fromCharCode(0), 128 - (length + 16 & 127));
        m[length] = String.fromCharCode(128);
        m += pack("N4", 0, 0, 0, length << 3);
        var chunks = str_split(m, 128);

        for (var chunk of Object.values(chunks)) //Extend the sixteen 32-bit words into eighty 32-bit words
        //Initialize hash value for this chunk
        //Main loop
        //Add this chunk's hash to result so far
        {
            var w = Array();

            for (i = 0;; i < 16; i++) {
                var temp = new Math_BigInteger(this._string_shift(chunk, 8), 256);
                temp.setPrecision(64);
                w.push(temp);
            }

            for (i = 16;; i < 80; i++) {
                temp = [w[i - 15].bitwise_rightRotate(1), w[i - 15].bitwise_rightRotate(8), w[i - 15].bitwise_rightShift(7)];
                var s0 = temp[0].bitwise_xor(temp[1]);
                s0 = s0.bitwise_xor(temp[2]);
                temp = [w[i - 2].bitwise_rightRotate(19), w[i - 2].bitwise_rightRotate(61), w[i - 2].bitwise_rightShift(6)];
                var s1 = temp[0].bitwise_xor(temp[1]);
                s1 = s1.bitwise_xor(temp[2]);
                w[i] = w[i - 16].copy();
                w[i] = w[i].add(s0);
                w[i] = w[i].add(w[i - 7]);
                w[i] = w[i].add(s1);
            }

            var a = hash[0].copy();
            var b = hash[1].copy();
            var c = hash[2].copy();
            var d = hash[3].copy();
            var e = hash[4].copy();
            var f = hash[5].copy();
            var g = hash[6].copy();
            var h = hash[7].copy();

            for (i = 0;; i < 80; i++) {
                temp = [a.bitwise_rightRotate(28), a.bitwise_rightRotate(34), a.bitwise_rightRotate(39)];
                s0 = temp[0].bitwise_xor(temp[1]);
                s0 = s0.bitwise_xor(temp[2]);
                temp = [a.bitwise_and(b), a.bitwise_and(c), b.bitwise_and(c)];
                var maj = temp[0].bitwise_xor(temp[1]);
                maj = maj.bitwise_xor(temp[2]);
                var t2 = s0.add(maj);
                temp = [e.bitwise_rightRotate(14), e.bitwise_rightRotate(18), e.bitwise_rightRotate(41)];
                s1 = temp[0].bitwise_xor(temp[1]);
                s1 = s1.bitwise_xor(temp[2]);
                temp = [e.bitwise_and(f), g.bitwise_and(e.bitwise_not())];
                var ch = temp[0].bitwise_xor(temp[1]);
                var t1 = h.add(s1);
                t1 = t1.add(ch);
                t1 = t1.add(_static_Crypt_Hash__sha512_k[i]);
                t1 = t1.add(w[i]);
                h = g.copy();
                g = f.copy();
                f = e.copy();
                e = d.add(t1);
                d = c.copy();
                c = b.copy();
                b = a.copy();
                a = t1.add(t2);
            }

            hash = [hash[0].add(a), hash[1].add(b), hash[2].add(c), hash[3].add(d), hash[4].add(e), hash[5].add(f), hash[6].add(g), hash[7].add(h)];
        }

        temp = hash[0].toBytes() + hash[1].toBytes() + hash[2].toBytes() + hash[3].toBytes() + hash[4].toBytes() + hash[5].toBytes();

        if (this.l != 48) {
            temp += hash[6].toBytes() + hash[7].toBytes();
        }

        return temp;
    }

    _rightRotate(int, amt) {
        var invamt = 32 - amt;
        var mask = (1 << invamt) - 1;
        return int << invamt & 4294967295 | int >> amt & mask;
    }

    _rightShift(int, amt) {
        var mask = (1 << 32 - amt) - 1;
        return int >> amt & mask;
    }

    _not(int) {
        return ~int & 4294967295;
    }

    _add() {
        if (!("_static_Crypt_Hash__add_mod" in global)) _static_Crypt_Hash__add_mod = undefined;

        if (!(undefined !== _static_Crypt_Hash__add_mod)) {
            _static_Crypt_Hash__add_mod = Math.pow(2, 32);
        }

        var result = 0;
        var arguments = arguments;

        for (var argument of Object.values(arguments)) {
            result += argument < 0 ? (argument & 2147483647) + 2147483648 : argument;
        }

        return fmod(result, _static_Crypt_Hash__add_mod);
    }

    _string_shift(string, index = 1) {
        var substr = substr(string, 0, index);
        string = substr(string, index);
        return substr;
    }

};
