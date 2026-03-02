//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Random Number Generator
//
//PHP versions 4 and 5
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Crypt/Random.php');
//
//echo bin2hex(crypt_random_string(8));
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
//@package    Crypt_Random
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//
//"Is Windows" test
//
//@access private
//
//
//
//Generate a random string.
//
//Although microoptimizations are generally discouraged as they impair readability this function is ripe with
//microoptimizations because this function has the potential of being called a huge number of times.
//eg. for RSA key generation.
//
//@param Integer $length
//@return String
//@access public
//
//
const CRYPT_RANDOM_IS_WINDOWS = PHP_OS.substr(0, 3).toUpperCase() === "WIN";

function crypt_random_string(length) //at this point we have no choice but to use a pure-PHP CSPRNG
//cascade entropy across multiple PHP instances by fixing the session and collecting all
//environmental variables, including the previous session data and the current session
//data.
//
//mt_rand seeds itself by looking at the PID and the time, both of which are (relatively)
//easy to guess at. linux uses mouse clicks, keyboard timings, etc, as entropy sources, but
//PHP isn't low level to be able to use those as sources and on a web server there's not likely
//going to be a ton of keyboard or mouse action. web servers do have one thing that we can use
//however. a ton of people visiting the website. obviously you don't want to base your seeding
//soley on parameters a potential attacker sends but (1) not everything in $_SERVER is controlled
//by the user and (2) this isn't just looking at the data sent by the current user - it's based
//on the data sent by all users. one user requests the page and a hash of their info is saved.
//another user visits the page and the serialization of their data is utilized along with the
//server envirnment stuff and a hash of the previous http request data (which itself utilizes
//a hash of the session data before that). certainly an attacker should be assumed to have
//full control over his own http requests. he, however, is not going to have control over
//everyone's http requests.
{
    if (CRYPT_RANDOM_IS_WINDOWS) //method 1. prior to PHP 5.3 this would call rand() on windows hence the function_exists('class_alias') call.
        //ie. class_alias is a function that was introduced in PHP 5.3
        {
            if ("function" === typeof mcrypt_create_iv && "function" === typeof class_alias) {
                return mcrypt_create_iv(length);
            }

            if ("function" === typeof openssl_random_pseudo_bytes && version_compare(PHP_VERSION, "5.3.4", ">=")) {
                return openssl_random_pseudo_bytes(length);
            }
        } else //method 1. the fastest
        {
            if ("function" === typeof openssl_random_pseudo_bytes) {
                return openssl_random_pseudo_bytes(length);
            }

            if (!("_static_crypt_random_string_fp" in global)) _static_crypt_random_string_fp = true;

            if (_static_crypt_random_string_fp === true) //warning's will be output unles the error suppression operator is used. errors such as
                //"open_basedir restriction in effect", "Permission denied", "No such file or directory", etc.
                {
                    _static_crypt_random_string_fp = fopen("/dev/urandom", "rb");
                }

            if (_static_crypt_random_string_fp !== true && _static_crypt_random_string_fp !== false) //surprisingly faster than !is_bool() or is_resource()
                {
                    return fread(_static_crypt_random_string_fp, length);
                }

            if ("function" === typeof mcrypt_create_iv) {
                return mcrypt_create_iv(length, MCRYPT_DEV_URANDOM);
            }
        }

    {
        if (!("_static_crypt_random_string_crypto" in global)) _static_crypt_random_string_crypto = false;
        if (!("_static_crypt_random_string_v" in global)) _static_crypt_random_string_v = undefined;
    }

    if (_static_crypt_random_string_crypto === false) //save old session data
        //restore old session data
        //in SSH2 a shared secret and an exchange hash are generated through the key exchange process.
        //the IV client to server is the hash of that "nonce" with the letter A and for the encryption key it's the letter C.
        //if the hash doesn't produce enough a key or an IV that's long enough concat successive hashes of the
        //original hash and the current hash. we'll be emulating that. for more info see the following URL:
        //
        //http://tools.ietf.org/html/rfc4253#section-7.2
        //
        //see the is_string($crypto) part for an example of how to expand the keys
        //ciphers are used as per the nist.gov link below. also, see this link:
        //
        //http://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator#Designs_based_on_cryptographic_primitives
        {
            var old_session_id = session_id();
            var old_use_cookies = ini_get("session.use_cookies");
            var old_session_cache_limiter = session_cache_limiter();

            if (undefined !== _SESSION) {
                var _OLD_SESSION = _SESSION;
            }

            if (old_session_id != "") {
                session_write_close();
            }

            session_id(1);
            ini_set("session.use_cookies", 0);
            session_cache_limiter("");
            session_start();
            _static_crypt_random_string_v = seed = _SESSION.seed = pack("H*", sha1(serialize(_SERVER) + serialize(_POST) + serialize(_GET) + serialize(_COOKIE) + serialize(GLOBALS) + serialize(_SESSION) + serialize(_OLD_SESSION)));

            if (!(undefined !== _SESSION.count)) {
                _SESSION.count = 0;
            }

            _SESSION.count++;
            session_write_close();

            if (old_session_id != "") {
                session_id(old_session_id);
                session_start();
                ini_set("session.use_cookies", old_use_cookies);
                session_cache_limiter(old_session_cache_limiter);
            } else {
                if (undefined !== _OLD_SESSION) {
                    var _SESSION = _OLD_SESSION;
                    delete _OLD_SESSION;
                } else {
                    delete _SESSION;
                }
            }

            var key = pack("H*", sha1(seed + "A"));
            var iv = pack("H*", sha1(seed + "C"));

            switch (true) {
                case "function" === typeof Crypt_AES:
                    _static_crypt_random_string_crypto = new Crypt_AES(CRYPT_AES_MODE_CTR);
                    break;

                case "function" === typeof Crypt_TripleDES:
                    _static_crypt_random_string_crypto = new Crypt_TripleDES(CRYPT_DES_MODE_CTR);
                    break;

                case "function" === typeof Crypt_DES:
                    _static_crypt_random_string_crypto = new Crypt_DES(CRYPT_DES_MODE_CTR);
                    break;

                case "function" === typeof Crypt_RC4:
                    _static_crypt_random_string_crypto = new Crypt_RC4();
                    break;

                default:
                    _static_crypt_random_string_crypto = seed;
                    return crypt_random_string(length);
            }

            _static_crypt_random_string_crypto.setKey(key);

            _static_crypt_random_string_crypto.setIV(iv);

            _static_crypt_random_string_crypto.enableContinuousBuffer();
        }

    if ("string" === typeof _static_crypt_random_string_crypto) //the following is based off of ANSI X9.31:
        //
        //http://csrc.nist.gov/groups/STM/cavp/documents/rng/931rngext.pdf
        //
        //OpenSSL uses that same standard for it's random numbers:
        //
        //http://www.opensource.apple.com/source/OpenSSL/OpenSSL-38/openssl/fips-1.0/rand/fips_rand.c
        //(do a search for "ANS X9.31 A.2.4")
        //
        //ANSI X9.31 recommends ciphers be used and phpseclib does use them if they're available (see
        //later on in the code) but if they're not we'll use sha1
        {
            var result = "";

            while (result.length < length) //each loop adds 20 bytes
            //microtime() isn't packed as "densely" as it could be but then neither is that the idea.
            //the idea is simply to ensure that each "block" has a unique element to it.
            {
                var i = pack("H*", sha1(Date.now() / 1000));
                var r = pack("H*", sha1(i ^ _static_crypt_random_string_v));
                _static_crypt_random_string_v = pack("H*", sha1(r ^ i));
                result += r;
            }

            return result.substr(0, length);
        }

    result = "";

    while (result.length < length) {
        i = _static_crypt_random_string_crypto.encrypt(Date.now() / 1000);
        r = _static_crypt_random_string_crypto.encrypt(i ^ _static_crypt_random_string_v);
        _static_crypt_random_string_v = _static_crypt_random_string_crypto.encrypt(r ^ i);
        result += r;
    }

    return result.substr(0, length);
};
