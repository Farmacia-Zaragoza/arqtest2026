//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP PKCS#1 (v2.1) compliant implementation of RSA.
//
//PHP versions 4 and 5
//
//Here's an example of how to encrypt and decrypt text with this library:
//<code>
//<?php
//include('Crypt/RSA.php');
//
//$rsa = new Crypt_RSA();
//extract($rsa->createKey());
//
//$plaintext = 'terrafrost';
//
//$rsa->loadKey($privatekey);
//$ciphertext = $rsa->encrypt($plaintext);
//
//$rsa->loadKey($publickey);
//echo $rsa->decrypt($ciphertext);
//?>
//</code>
//
//Here's an example of how to create signatures and verify signatures with this library:
//<code>
//<?php
//include('Crypt/RSA.php');
//
//$rsa = new Crypt_RSA();
//extract($rsa->createKey());
//
//$plaintext = 'terrafrost';
//
//$rsa->loadKey($privatekey);
//$signature = $rsa->sign($plaintext);
//
//$rsa->loadKey($publickey);
//echo $rsa->verify($plaintext, $signature) ? 'verified' : 'unverified';
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
//@package    Crypt_RSA
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMIX Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//
//Include Crypt_Random
//
//
//the class_exists() will only be called if the crypt_random_string function hasn't been defined and
//will trigger a call to __autoload() if you're wanting to auto-load classes
//call function_exists() a second time to stop the require_once from being called outside
//of the auto loader
//
//Use PKCS#1 padding.
//
//Although CRYPT_RSA_ENCRYPTION_OAEP offers more security, including PKCS#1 padding is necessary for purposes of backwards
//compatability with protocols (like SSH-1) written before OAEP's introduction.
//
//
//#@-
//#@+
// @access public
// @see Crypt_RSA::sign()
// @see Crypt_RSA::verify()
// @see Crypt_RSA::setHash()
//
//Use the Probabilistic Signature Scheme for signing
//
//Uses sha1 by default.
//
//@see Crypt_RSA::setSaltLength()
//@see Crypt_RSA::setMGFHash()
//
//
//
//Use the PKCS#1 scheme by default.
//
//Although CRYPT_RSA_SIGNATURE_PSS offers more security, including PKCS#1 signing is necessary for purposes of backwards
//compatability with protocols (like SSH-2) written before PSS's introduction.
//
//
//#@-
//#@+
// @access private
// @see Crypt_RSA::createKey()
//
//ASN1 Integer
//
//
//
//ASN1 Bit String
//
//
//
//ASN1 Sequence (with the constucted bit set)
//
//
//#@-
//#@+
// @access private
// @see Crypt_RSA::Crypt_RSA()
//
//To use the pure-PHP implementation
//
//
//
//To use the OpenSSL library
//
//(if enabled; otherwise, the internal implementation will be used)
//
//
//#@-
//
//Default openSSL configuration file.
//
//
//#@+
// @access public
// @see Crypt_RSA::createKey()
// @see Crypt_RSA::setPrivateKeyFormat()
//
//PKCS#1 formatted private key
//
//Used by OpenSSH
//
//
//
//PuTTY formatted private key
//
//
//
//XML formatted private key
//
//
//#@-
//#@+
// @access public
// @see Crypt_RSA::createKey()
// @see Crypt_RSA::setPublicKeyFormat()
//
//Raw public key
//
//An array containing two Math_BigInteger objects.
//
//The exponent can be indexed with any of the following:
//
//0, e, exponent, publicExponent
//
//The modulus can be indexed with any of the following:
//
//1, n, modulo, modulus
//
//
//
//PKCS#1 formatted public key (raw)
//
//Used by File/X509.php
//
//
//
//XML formatted public key
//
//
//
//OpenSSH formatted public key
//
//Place in $HOME/.ssh/authorized_keys
//
//
//
//PKCS#1 formatted public key (encapsulated)
//
//Used by PHP's openssl_public_encrypt() and openssl's rsautl (when -pubin is set)
//
//
//#@-
//
//Pure-PHP PKCS#1 compliant implementation of RSA.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Crypt_RSA
//
//

if (!("function" === typeof crypt_random_string)) {
    require("Random.php");
}

if (!("function" === typeof Crypt_Hash)) {
    require("Hash.php");
}

const CRYPT_RSA_ENCRYPTION_OAEP = 1;
const CRYPT_RSA_ENCRYPTION_PKCS1 = 2;
const CRYPT_RSA_SIGNATURE_PSS = 1;
const CRYPT_RSA_SIGNATURE_PKCS1 = 2;
const CRYPT_RSA_ASN1_INTEGER = 2;
const CRYPT_RSA_ASN1_BITSTRING = 3;
const CRYPT_RSA_ASN1_SEQUENCE = 48;
const CRYPT_RSA_MODE_INTERNAL = 1;
const CRYPT_RSA_MODE_OPENSSL = 2;
const CRYPT_RSA_OPENSSL_CONFIG = dirname(__filename) + "/../openssl.cnf";
const CRYPT_RSA_PRIVATE_FORMAT_PKCS1 = 0;
const CRYPT_RSA_PRIVATE_FORMAT_PUTTY = 1;
const CRYPT_RSA_PRIVATE_FORMAT_XML = 2;
const CRYPT_RSA_PUBLIC_FORMAT_RAW = 3;
const CRYPT_RSA_PUBLIC_FORMAT_PKCS1_RAW = 4;
const CRYPT_RSA_PUBLIC_FORMAT_XML = 5;
const CRYPT_RSA_PUBLIC_FORMAT_OPENSSH = 6;
const CRYPT_RSA_PUBLIC_FORMAT_PKCS1 = 7;

//
//Precomputed Zero
//
//@var Array
//@access private
//
//
//
//Precomputed One
//
//@var Array
//@access private
//
//
//
//Private Key Format
//
//@var Integer
//@access private
//
//
//
//Public Key Format
//
//@var Integer
//@access public
//
//
//
//Modulus (ie. n)
//
//@var Math_BigInteger
//@access private
//
//
//
//Modulus length
//
//@var Math_BigInteger
//@access private
//
//
//
//Exponent (ie. e or d)
//
//@var Math_BigInteger
//@access private
//
//
//
//Primes for Chinese Remainder Theorem (ie. p and q)
//
//@var Array
//@access private
//
//
//
//Exponents for Chinese Remainder Theorem (ie. dP and dQ)
//
//@var Array
//@access private
//
//
//
//Coefficients for Chinese Remainder Theorem (ie. qInv)
//
//@var Array
//@access private
//
//
//
//Hash name
//
//@var String
//@access private
//
//
//
//Hash function
//
//@var Crypt_Hash
//@access private
//
//
//
//Length of hash function output
//
//@var Integer
//@access private
//
//
//
//Length of salt
//
//@var Integer
//@access private
//
//
//
//Hash function for the Mask Generation Function
//
//@var Crypt_Hash
//@access private
//
//
//
//Length of MGF hash function output
//
//@var Integer
//@access private
//
//
//
//Encryption mode
//
//@var Integer
//@access private
//
//
//
//Signature mode
//
//@var Integer
//@access private
//
//
//
//Public Exponent
//
//@var Mixed
//@access private
//
//
//
//Password
//
//@var String
//@access private
//
//
//
//Components
//
//For use with parsing XML formatted keys.  PHP's XML Parser functions use utilized - instead of PHP's DOM functions -
//because PHP's XML Parser functions work on PHP4 whereas PHP's DOM functions - although surperior - don't.
//
//@see Crypt_RSA::_start_element_handler()
//@var Array
//@access private
//
//
//
//Current String
//
//For use with parsing XML formatted keys.
//
//@see Crypt_RSA::_character_handler()
//@see Crypt_RSA::_stop_element_handler()
//@var Mixed
//@access private
//
//
//
//OpenSSL configuration file name.
//
//Set to NULL to use system configuration file.
//@see Crypt_RSA::createKey()
//@var Mixed
//@Access public
//
//
//
//Public key comment field.
//
//@var String
//@access private
//
//
//
//The constructor
//
//If you want to make use of the openssl extension, you'll need to set the mode manually, yourself.  The reason
//Crypt_RSA doesn't do it is because OpenSSL doesn't fail gracefully.  openssl_pkey_new(), in particular, requires
//openssl.cnf be present somewhere and, unfortunately, the only real way to find out is too late.
//
//@return Crypt_RSA
//@access public
//
//
//
//Create public / private key pair
//
//Returns an array with the following three elements:
//- 'privatekey': The private key.
//- 'publickey':  The public key.
//- 'partialkey': A partially computed key (if the execution time exceeded $timeout).
//Will need to be passed back to Crypt_RSA::createKey() as the third parameter for further processing.
//
//@access public
//@param optional Integer $bits
//@param optional Integer $timeout
//@param optional Math_BigInteger $p
//
//
//
//Convert a private key to the appropriate format.
//
//@access private
//@see setPrivateKeyFormat()
//@param String $RSAPrivateKey
//@return String
//
//
//
//Convert a public key to the appropriate format
//
//@access private
//@see setPublicKeyFormat()
//@param String $RSAPrivateKey
//@return String
//
//
//
//Break a public or private key down into its constituant components
//
//@access private
//@see _convertPublicKey()
//@see _convertPrivateKey()
//@param String $key
//@param Integer $type
//@return Array
//
//
//
//Returns the key size
//
//More specifically, this returns the size of the modulo in bits.
//
//@access public
//@return Integer
//
//
//
//Start Element Handler
//
//Called by xml_set_element_handler()
//
//@access private
//@param Resource $parser
//@param String $name
//@param Array $attribs
//
//
//
//Stop Element Handler
//
//Called by xml_set_element_handler()
//
//@access private
//@param Resource $parser
//@param String $name
//
//
//
//Data Handler
//
//Called by xml_set_character_data_handler()
//
//@access private
//@param Resource $parser
//@param String $data
//
//
//
//Loads a public or private key
//
//Returns true on success and false on failure (ie. an incorrect password was provided or the key was malformed)
//
//@access public
//@param String $key
//@param Integer $type optional
//
//
//
//Sets the password
//
//Private keys can be encrypted with a password.  To unset the password, pass in the empty string or false.
//Or rather, pass in $password such that empty($password) && !is_string($password) is true.
//
//@see createKey()
//@see loadKey()
//@access public
//@param String $password
//
//
//
//Defines the public key
//
//Some private key formats define the public exponent and some don't.  Those that don't define it are problematic when
//used in certain contexts.  For example, in SSH-2, RSA authentication works by sending the public key along with a
//message signed by the private key to the server.  The SSH-2 server looks the public key up in an index of public keys
//and if it's present then proceeds to verify the signature.  Problem is, if your private key doesn't include the public
//exponent this won't work unless you manually add the public exponent.
//
//Do note that when a new key is loaded the index will be cleared.
//
//Returns true on success, false on failure
//
//@see getPublicKey()
//@access public
//@param String $key optional
//@param Integer $type optional
//@return Boolean
//
//
//
//Returns the public key
//
//The public key is only returned under two circumstances - if the private key had the public key embedded within it
//or if the public key was set via setPublicKey().  If the currently loaded key is supposed to be the public key this
//function won't return it since this library, for the most part, doesn't distinguish between public and private keys.
//
//@see getPublicKey()
//@access public
//@param String $key
//@param Integer $type optional
//
//
//
//Returns the private key
//
//The private key is only returned if the currently loaded key contains the constituent prime numbers.
//
//@see getPublicKey()
//@access public
//@param String $key
//@param Integer $type optional
//
//
//
//Returns a minimalistic private key
//
//Returns the private key without the prime number constituants.  Structurally identical to a public key that
//hasn't been set as the public key
//
//@see getPrivateKey()
//@access private
//@param String $key
//@param Integer $type optional
//
//
//
//__toString() magic method
//
//@access public
//
//
//
//Generates the smallest and largest numbers requiring $bits bits
//
//@access private
//@param Integer $bits
//@return Array
//
//
//
//DER-decode the length
//
//DER supports lengths up to (2**8)**127, however, we'll only support lengths up to (2**8)**4.  See
//{@link http://itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf#p=13 X.690 paragraph 8.1.3} for more information.
//
//@access private
//@param String $string
//@return Integer
//
//
//
//DER-encode the length
//
//DER supports lengths up to (2**8)**127, however, we'll only support lengths up to (2**8)**4.  See
//{@link http://itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf#p=13 X.690 paragraph 8.1.3} for more information.
//
//@access private
//@param Integer $length
//@return String
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
//
//Determines the private key format
//
//@see createKey()
//@access public
//@param Integer $format
//
//
//
//Determines the public key format
//
//@see createKey()
//@access public
//@param Integer $format
//
//
//
//Determines which hashing function should be used
//
//Used with signature production / verification and (if the encryption mode is CRYPT_RSA_ENCRYPTION_OAEP) encryption and
//decryption.  If $hash isn't supported, sha1 is used.
//
//@access public
//@param String $hash
//
//
//
//Determines which hashing function should be used for the mask generation function
//
//The mask generation function is used by CRYPT_RSA_ENCRYPTION_OAEP and CRYPT_RSA_SIGNATURE_PSS and although it's
//best if Hash and MGFHash are set to the same thing this is not a requirement.
//
//@access public
//@param String $hash
//
//
//
//Determines the salt length
//
//To quote from {@link http://tools.ietf.org/html/rfc3447#page-38 RFC3447#page-38}:
//
//Typical salt lengths in octets are hLen (the length of the output
//of the hash function Hash) and 0.
//
//@access public
//@param Integer $format
//
//
//
//Integer-to-Octet-String primitive
//
//See {@link http://tools.ietf.org/html/rfc3447#section-4.1 RFC3447#section-4.1}.
//
//@access private
//@param Math_BigInteger $x
//@param Integer $xLen
//@return String
//
//
//
//Octet-String-to-Integer primitive
//
//See {@link http://tools.ietf.org/html/rfc3447#section-4.2 RFC3447#section-4.2}.
//
//@access private
//@param String $x
//@return Math_BigInteger
//
//
//
//Exponentiate with or without Chinese Remainder Theorem
//
//See {@link http://tools.ietf.org/html/rfc3447#section-5.1.1 RFC3447#section-5.1.2}.
//
//@access private
//@param Math_BigInteger $x
//@return Math_BigInteger
//
//
//
//Performs RSA Blinding
//
//Protects against timing attacks by employing RSA Blinding.
//Returns $x->modPow($this->exponents[$i], $this->primes[$i])
//
//@access private
//@param Math_BigInteger $x
//@param Math_BigInteger $r
//@param Integer $i
//@return Math_BigInteger
//
//
//
//Performs blinded RSA equality testing
//
//Protects against a particular type of timing attack described.
//
//See {@link http://codahale.com/a-lesson-in-timing-attacks/ A Lesson In Timing Attacks (or, Don't use MessageDigest.isEquals)}
//
//Thanks for the heads up singpolyma!
//
//@access private
//@param String $x
//@param String $y
//@return Boolean
//
//
//
//RSAEP
//
//See {@link http://tools.ietf.org/html/rfc3447#section-5.1.1 RFC3447#section-5.1.1}.
//
//@access private
//@param Math_BigInteger $m
//@return Math_BigInteger
//
//
//
//RSADP
//
//See {@link http://tools.ietf.org/html/rfc3447#section-5.1.2 RFC3447#section-5.1.2}.
//
//@access private
//@param Math_BigInteger $c
//@return Math_BigInteger
//
//
//
//RSASP1
//
//See {@link http://tools.ietf.org/html/rfc3447#section-5.2.1 RFC3447#section-5.2.1}.
//
//@access private
//@param Math_BigInteger $m
//@return Math_BigInteger
//
//
//
//RSAVP1
//
//See {@link http://tools.ietf.org/html/rfc3447#section-5.2.2 RFC3447#section-5.2.2}.
//
//@access private
//@param Math_BigInteger $s
//@return Math_BigInteger
//
//
//
//MGF1
//
//See {@link http://tools.ietf.org/html/rfc3447#appendix-B.2.1 RFC3447#appendix-B.2.1}.
//
//@access private
//@param String $mgfSeed
//@param Integer $mgfLen
//@return String
//
//
//
//RSAES-OAEP-ENCRYPT
//
//See {@link http://tools.ietf.org/html/rfc3447#section-7.1.1 RFC3447#section-7.1.1} and
//{http://en.wikipedia.org/wiki/Optimal_Asymmetric_Encryption_Padding OAES}.
//
//@access private
//@param String $m
//@param String $l
//@return String
//
//
//
//RSAES-OAEP-DECRYPT
//
//See {@link http://tools.ietf.org/html/rfc3447#section-7.1.2 RFC3447#section-7.1.2}.  The fact that the error
//messages aren't distinguishable from one another hinders debugging, but, to quote from RFC3447#section-7.1.2:
//
//Note.  Care must be taken to ensure that an opponent cannot
//distinguish the different error conditions in Step 3.g, whether by
//error message or timing, or, more generally, learn partial
//information about the encoded message EM.  Otherwise an opponent may
//be able to obtain useful information about the decryption of the
//ciphertext C, leading to a chosen-ciphertext attack such as the one
//observed by Manger [36].
//
//As for $l...  to quote from {@link http://tools.ietf.org/html/rfc3447#page-17 RFC3447#page-17}:
//
//Both the encryption and the decryption operations of RSAES-OAEP take
//the value of a label L as input.  In this version of PKCS #1, L is
//the empty string; other uses of the label are outside the scope of
//this document.
//
//@access private
//@param String $c
//@param String $l
//@return String
//
//
//
//RSAES-PKCS1-V1_5-ENCRYPT
//
//See {@link http://tools.ietf.org/html/rfc3447#section-7.2.1 RFC3447#section-7.2.1}.
//
//@access private
//@param String $m
//@return String
//
//
//
//RSAES-PKCS1-V1_5-DECRYPT
//
//See {@link http://tools.ietf.org/html/rfc3447#section-7.2.2 RFC3447#section-7.2.2}.
//
//For compatability purposes, this function departs slightly from the description given in RFC3447.
//The reason being that RFC2313#section-8.1 (PKCS#1 v1.5) states that ciphertext's encrypted by the
//private key should have the second byte set to either 0 or 1 and that ciphertext's encrypted by the
//public key should have the second byte set to 2.  In RFC3447 (PKCS#1 v2.1), the second byte is supposed
//to be 2 regardless of which key is used.  For compatability purposes, we'll just check to make sure the
//second byte is 2 or less.  If it is, we'll accept the decrypted string as valid.
//
//As a consequence of this, a private key encrypted ciphertext produced with Crypt_RSA may not decrypt
//with a strictly PKCS#1 v1.5 compliant RSA implementation.  Public key encrypted ciphertext's should but
//not private key encrypted ciphertext's.
//
//@access private
//@param String $c
//@return String
//
//
//
//EMSA-PSS-ENCODE
//
//See {@link http://tools.ietf.org/html/rfc3447#section-9.1.1 RFC3447#section-9.1.1}.
//
//@access private
//@param String $m
//@param Integer $emBits
//
//
//
//EMSA-PSS-VERIFY
//
//See {@link http://tools.ietf.org/html/rfc3447#section-9.1.2 RFC3447#section-9.1.2}.
//
//@access private
//@param String $m
//@param String $em
//@param Integer $emBits
//@return String
//
//
//
//RSASSA-PSS-SIGN
//
//See {@link http://tools.ietf.org/html/rfc3447#section-8.1.1 RFC3447#section-8.1.1}.
//
//@access private
//@param String $m
//@return String
//
//
//
//RSASSA-PSS-VERIFY
//
//See {@link http://tools.ietf.org/html/rfc3447#section-8.1.2 RFC3447#section-8.1.2}.
//
//@access private
//@param String $m
//@param String $s
//@return String
//
//
//
//EMSA-PKCS1-V1_5-ENCODE
//
//See {@link http://tools.ietf.org/html/rfc3447#section-9.2 RFC3447#section-9.2}.
//
//@access private
//@param String $m
//@param Integer $emLen
//@return String
//
//
//
//RSASSA-PKCS1-V1_5-SIGN
//
//See {@link http://tools.ietf.org/html/rfc3447#section-8.2.1 RFC3447#section-8.2.1}.
//
//@access private
//@param String $m
//@return String
//
//
//
//RSASSA-PKCS1-V1_5-VERIFY
//
//See {@link http://tools.ietf.org/html/rfc3447#section-8.2.2 RFC3447#section-8.2.2}.
//
//@access private
//@param String $m
//@return String
//
//
//
//Set Encryption Mode
//
//Valid values include CRYPT_RSA_ENCRYPTION_OAEP and CRYPT_RSA_ENCRYPTION_PKCS1.
//
//@access public
//@param Integer $mode
//
//
//
//Set Signature Mode
//
//Valid values include CRYPT_RSA_SIGNATURE_PSS and CRYPT_RSA_SIGNATURE_PKCS1
//
//@access public
//@param Integer $mode
//
//
//
//Set public key comment.
//
//@access public
//@param String $comment
//
//
//
//Get public key comment.
//
//@access public
//@return String
//
//
//
//Encryption
//
//Both CRYPT_RSA_ENCRYPTION_OAEP and CRYPT_RSA_ENCRYPTION_PKCS1 both place limits on how long $plaintext can be.
//If $plaintext exceeds those limits it will be broken up so that it does and the resultant ciphertext's will
//be concatenated together.
//
//@see decrypt()
//@access public
//@param String $plaintext
//@return String
//
//
//
//Decryption
//
//@see encrypt()
//@access public
//@param String $plaintext
//@return String
//
//
//
//Create a signature
//
//@see verify()
//@access public
//@param String $message
//@return String
//
//
//
//Verifies a signature
//
//@see sign()
//@access public
//@param String $message
//@param String $signature
//@return Boolean
//
//
class Crypt_RSA {
    constructor() {
        this.privateKeyFormat = CRYPT_RSA_PRIVATE_FORMAT_PKCS1;
        this.publicKeyFormat = CRYPT_RSA_PUBLIC_FORMAT_PKCS1;
        this.encryptionMode = CRYPT_RSA_ENCRYPTION_OAEP;
        this.signatureMode = CRYPT_RSA_SIGNATURE_PSS;
        this.publicExponent = false;
        this.password = false;
        this.components = Array();
        this.comment = "phpseclib-generated-key";
    }

    Crypt_RSA() {
        if (!("function" === typeof Math_BigInteger)) {
            require("Math/BigInteger.php");
        }

        this.configFile = CRYPT_RSA_OPENSSL_CONFIG;

        if (!("undefined" !== typeof CRYPT_RSA_MODE)) {
            switch (true) {
                case extension_loaded("openssl") && version_compare(PHP_VERSION, "4.2.0", ">=") && file_exists(this.configFile):
                    global.CRYPT_RSA_MODE = CRYPT_RSA_MODE_OPENSSL;
                    break;

                default:
                    global.CRYPT_RSA_MODE = CRYPT_RSA_MODE_INTERNAL;
            }
        }

        this.zero = new Math_BigInteger();
        this.one = new Math_BigInteger(1);
        this.hash = new Crypt_Hash("sha1");
        this.hLen = this.hash.getLength();
        this.hashName = "sha1";
        this.mgfHash = new Crypt_Hash("sha1");
        this.mgfHLen = this.mgfHash.getLength();
    }

    createKey(bits = 1024, timeout = false, partial = Array()) //divide by two to see how many bits P and Q would be
    //from <http://tools.ietf.org/html/rfc3447#appendix-A.1.2>:
    //RSAPrivateKey ::= SEQUENCE {
    //version           Version,
    //modulus           INTEGER,  -- n
    //publicExponent    INTEGER,  -- e
    //privateExponent   INTEGER,  -- d
    //prime1            INTEGER,  -- p
    //prime2            INTEGER,  -- q
    //exponent1         INTEGER,  -- d mod (p-1)
    //exponent2         INTEGER,  -- d mod (q-1)
    //coefficient       INTEGER,  -- (inverse of q) mod p
    //otherPrimeInfos   OtherPrimeInfos OPTIONAL
    //}
    {
        if (!("undefined" !== typeof CRYPT_RSA_EXPONENT)) //http://en.wikipedia.org/wiki/65537_%28number%29
            {
                global.CRYPT_RSA_EXPONENT = "65537";
            }

        if (!("undefined" !== typeof CRYPT_RSA_SMALLEST_PRIME)) {
            global.CRYPT_RSA_SMALLEST_PRIME = 4096;
        }

        if (CRYPT_RSA_MODE == CRYPT_RSA_MODE_OPENSSL && bits >= 384 && CRYPT_RSA_EXPONENT == 65537) //clear the buffer of error strings stemming from a minimalistic openssl.cnf
            {
                var config = Array();

                if (undefined !== this.configFile) {
                    config.config = this.configFile;
                }

                var rsa = openssl_pkey_new({
                    private_key_bits: bits
                } + config);
                openssl_pkey_export(rsa, privatekey, undefined, config);
                var publickey = openssl_pkey_get_details(rsa);
                publickey = publickey.key;
                var privatekey = call_user_func_array([this, "_convertPrivateKey"], Object.values(this._parseKey(privatekey, CRYPT_RSA_PRIVATE_FORMAT_PKCS1)));
                publickey = call_user_func_array([this, "_convertPublicKey"], Object.values(this._parseKey(publickey, CRYPT_RSA_PUBLIC_FORMAT_PKCS1)));

                while (openssl_error_string() !== false)

                return {
                    privatekey: privatekey,
                    publickey: publickey,
                    partialkey: false
                };
            }

        if (!("_static_Crypt_RSA_createKey_e" in global)) _static_Crypt_RSA_createKey_e = undefined;

        if (!(undefined !== _static_Crypt_RSA_createKey_e)) {
            _static_Crypt_RSA_createKey_e = new Math_BigInteger(CRYPT_RSA_EXPONENT);
        }

        extract(this._generateMinMax(bits));
        var absoluteMin = min;
        var temp = bits >> 1;

        if (temp > CRYPT_RSA_SMALLEST_PRIME) {
            var num_primes = Math.floor(bits / CRYPT_RSA_SMALLEST_PRIME);
            temp = CRYPT_RSA_SMALLEST_PRIME;
        } else {
            num_primes = 2;
        }

        extract(this._generateMinMax(temp + bits % temp));
        var finalMax = max;
        extract(this._generateMinMax(temp));
        var generator = new Math_BigInteger();
        var n = this.one.copy();

        if (!!partial) {
            extract(unserialize(partial));
        } else {
            var coefficients, primes;
            var exponents = coefficients = primes = Array();
            var lcm = {
                top: this.one.copy(),
                bottom: false
            };
        }

        var start = Date.now() / 1000;
        var i0 = primes.length + 1;

        do {
            for (var i = i0; i <= num_primes; i++) //textbook RSA implementations use Euler's totient function instead of the least common multiple.
            //see http://en.wikipedia.org/wiki/Euler%27s_totient_function
            {
                if (timeout !== false) {
                    timeout -= Date.now() / 1000 - start;
                    start = Date.now() / 1000;

                    if (timeout <= 0) {
                        return {
                            privatekey: "",
                            publickey: "",
                            partialkey: serialize({
                                primes: primes,
                                coefficients: coefficients,
                                lcm: lcm,
                                exponents: exponents
                            })
                        };
                    }
                }

                if (i == num_primes) {
                    var min;
                    [min, temp] = absoluteMin.divide(n);

                    if (!temp.equals(this.zero)) //ie. ceil()
                        {
                            min = min.add(this.one);
                        }

                    primes[i] = generator.randomPrime(min, finalMax, timeout);
                } else {
                    primes[i] = generator.randomPrime(min, max, timeout);
                }

                if (primes[i] === false) //if we've reached the timeout
                    {
                        if (primes.length > 1) {
                            var partialkey = "";
                        } else {
                            primes.pop();
                            partialkey = serialize({
                                primes: primes,
                                coefficients: coefficients,
                                lcm: lcm,
                                exponents: exponents
                            });
                        }

                        return {
                            privatekey: "",
                            publickey: "",
                            partialkey: partialkey
                        };
                    }

                if (i > 2) {
                    coefficients[i] = n.modInverse(primes[i]);
                }

                n = n.multiply(primes[i]);
                temp = primes[i].subtract(this.one);
                lcm.top = lcm.top.multiply(temp);
                lcm.bottom = lcm.bottom === false ? temp : lcm.bottom.gcd(temp);
                exponents[i] = _static_Crypt_RSA_createKey_e.modInverse(temp);
            }

            [lcm] = lcm.top.divide(lcm.bottom);
            var gcd = lcm.gcd(_static_Crypt_RSA_createKey_e);
            i0 = 1;
        } while (!gcd.equals(this.one));

        var d = _static_Crypt_RSA_createKey_e.modInverse(lcm);

        coefficients[2] = primes[2].modInverse(primes[1]);
        return {
            privatekey: this._convertPrivateKey(n, _static_Crypt_RSA_createKey_e, d, primes, exponents, coefficients),
            publickey: this._convertPublicKey(n, _static_Crypt_RSA_createKey_e),
            partialkey: false
        };
    }

    _convertPrivateKey(n, e, d, primes, exponents, coefficients) //if the format in question does not support multi-prime rsa and multi-prime rsa was used,
    //call _convertPublicKey() instead.
    {
        var num_primes = primes.length;
        var raw = {
            version: num_primes == 2 ? String.fromCharCode(0) : String.fromCharCode(1),
            modulus: n.toBytes(true),
            publicExponent: e.toBytes(true),
            privateExponent: d.toBytes(true),
            prime1: primes[1].toBytes(true),
            prime2: primes[2].toBytes(true),
            exponent1: exponents[1].toBytes(true),
            exponent2: exponents[2].toBytes(true),
            coefficient: coefficients[2].toBytes(true)
        };

        switch (this.privateKeyFormat) {
            case CRYPT_RSA_PRIVATE_FORMAT_XML:
                if (num_primes != 2) {
                    return false;
                }

                return "<RSAKeyValue>\r\n" + "  <Modulus>" + base64_encode(raw.modulus) + "</Modulus>\r\n" + "  <Exponent>" + base64_encode(raw.publicExponent) + "</Exponent>\r\n" + "  <P>" + base64_encode(raw.prime1) + "</P>\r\n" + "  <Q>" + base64_encode(raw.prime2) + "</Q>\r\n" + "  <DP>" + base64_encode(raw.exponent1) + "</DP>\r\n" + "  <DQ>" + base64_encode(raw.exponent2) + "</DQ>\r\n" + "  <InverseQ>" + base64_encode(raw.coefficient) + "</InverseQ>\r\n" + "  <D>" + base64_encode(raw.privateExponent) + "</D>\r\n" + "</RSAKeyValue>";
                break;

            case CRYPT_RSA_PRIVATE_FORMAT_PUTTY:
                if (num_primes != 2) {
                    return false;
                }

                var key = "PuTTY-User-Key-File-2: ssh-rsa\r\nEncryption: ";
                var encryption = !!this.password || "string" === typeof this.password ? "aes256-cbc" : "none";
                key += encryption;
                key += "\r\nComment: " + this.comment + "\r\n";
                var public = pack("Na*Na*Na*", "ssh-rsa".length, "ssh-rsa", raw.publicExponent.length, raw.publicExponent, raw.modulus.length, raw.modulus);
                var source = pack("Na*Na*Na*Na*", "ssh-rsa".length, "ssh-rsa", encryption.length, encryption, this.comment.length, this.comment, public.length, public);
                public = base64_encode(public);
                key += "Public-Lines: " + (public.length + 32 >> 6) + "\r\n";
                key += chunk_split(public, 64);
                var private = pack("Na*Na*Na*Na*", raw.privateExponent.length, raw.privateExponent, raw.prime1.length, raw.prime1, raw.prime2.length, raw.prime2, raw.coefficient.length, raw.coefficient);

                if (!this.password && !("string" === typeof this.password)) {
                    source += pack("Na*", private.length, private);
                    var hashkey = "putty-private-key-file-mac-key";
                } else {
                    private += crypt_random_string(16 - (private.length & 15));
                    source += pack("Na*", private.length, private);

                    if (!("function" === typeof Crypt_AES)) {
                        require("Crypt/AES.php");
                    }

                    var sequence = 0;
                    var symkey = "";

                    while (symkey.length < 32) {
                        var temp = pack("Na*", sequence++, this.password);
                        symkey += pack("H*", sha1(temp));
                    }

                    symkey = symkey.substr(0, 32);
                    var crypto = new Crypt_AES();
                    crypto.setKey(symkey);
                    crypto.disablePadding();
                    private = crypto.encrypt(private);
                    hashkey = "putty-private-key-file-mac-key" + this.password;
                }

                private = base64_encode(private);
                key += "Private-Lines: " + (private.length + 32 >> 6) + "\r\n";
                key += chunk_split(private, 64);

                if (!("function" === typeof Crypt_Hash)) {
                    require("Crypt/Hash.php");
                }

                var hash = new Crypt_Hash("sha1");
                hash.setKey(pack("H*", sha1(hashkey)));
                key += "Private-MAC: " + bin2hex(hash.hash(source)) + "\r\n";
                return key;

            default:
                var components = Array();

                for (var name in raw) {
                    var value = raw[name];
                    components[name] = pack("Ca*a*", CRYPT_RSA_ASN1_INTEGER, this._encodeLength(value.length), value);
                }

                var RSAPrivateKey = components.join("");

                if (num_primes > 2) {
                    var OtherPrimeInfos = "";

                    for (var i = 3; i <= num_primes; i++) //OtherPrimeInfos ::= SEQUENCE SIZE(1..MAX) OF OtherPrimeInfo
                    //
                    //OtherPrimeInfo ::= SEQUENCE {
                    //prime             INTEGER,  -- ri
                    //exponent          INTEGER,  -- di
                    //coefficient       INTEGER   -- ti
                    //}
                    {
                        var OtherPrimeInfo = pack("Ca*a*", CRYPT_RSA_ASN1_INTEGER, this._encodeLength(primes[i].toBytes(true).length), primes[i].toBytes(true));
                        OtherPrimeInfo += pack("Ca*a*", CRYPT_RSA_ASN1_INTEGER, this._encodeLength(exponents[i].toBytes(true).length), exponents[i].toBytes(true));
                        OtherPrimeInfo += pack("Ca*a*", CRYPT_RSA_ASN1_INTEGER, this._encodeLength(coefficients[i].toBytes(true).length), coefficients[i].toBytes(true));
                        OtherPrimeInfos += pack("Ca*a*", CRYPT_RSA_ASN1_SEQUENCE, this._encodeLength(OtherPrimeInfo.length), OtherPrimeInfo);
                    }

                    RSAPrivateKey += pack("Ca*a*", CRYPT_RSA_ASN1_SEQUENCE, this._encodeLength(OtherPrimeInfos.length), OtherPrimeInfos);
                }

                RSAPrivateKey = pack("Ca*a*", CRYPT_RSA_ASN1_SEQUENCE, this._encodeLength(RSAPrivateKey.length), RSAPrivateKey);

                if (!!this.password || "string" === typeof this.password) //symkey is short for symmetric key
                    {
                        var iv = crypt_random_string(8);
                        symkey = pack("H*", md5(this.password + iv));
                        symkey += pack("H*", md5(symkey + this.password + iv)).substr(0, 8);

                        if (!("function" === typeof Crypt_TripleDES)) {
                            require("Crypt/TripleDES.php");
                        }

                        var des = new Crypt_TripleDES();
                        des.setKey(symkey);
                        des.setIV(iv);
                        iv = bin2hex(iv).toUpperCase();
                        RSAPrivateKey = "-----BEGIN RSA PRIVATE KEY-----\r\n" + "Proc-Type: 4,ENCRYPTED\r\n" + `DEK-Info: DES-EDE3-CBC,${iv}\r\n` + "\r\n" + chunk_split(base64_encode(des.encrypt(RSAPrivateKey)), 64) + "-----END RSA PRIVATE KEY-----";
                    } else {
                    RSAPrivateKey = "-----BEGIN RSA PRIVATE KEY-----\r\n" + chunk_split(base64_encode(RSAPrivateKey), 64) + "-----END RSA PRIVATE KEY-----";
                }

                return RSAPrivateKey;
        }
    }

    _convertPublicKey(n, e) {
        var modulus = n.toBytes(true);
        var publicExponent = e.toBytes(true);

        switch (this.publicKeyFormat) {
            case CRYPT_RSA_PUBLIC_FORMAT_RAW:
                return {
                    e: e.copy(),
                    n: n.copy()
                };

            case CRYPT_RSA_PUBLIC_FORMAT_XML:
                return "<RSAKeyValue>\r\n" + "  <Modulus>" + base64_encode(modulus) + "</Modulus>\r\n" + "  <Exponent>" + base64_encode(publicExponent) + "</Exponent>\r\n" + "</RSAKeyValue>";
                break;

            case CRYPT_RSA_PUBLIC_FORMAT_OPENSSH:
                var RSAPublicKey = pack("Na*Na*Na*", "ssh-rsa".length, "ssh-rsa", publicExponent.length, publicExponent, modulus.length, modulus);
                RSAPublicKey = "ssh-rsa " + base64_encode(RSAPublicKey) + " " + this.comment;
                return RSAPublicKey;

            default:
                var components = {
                    modulus: pack("Ca*a*", CRYPT_RSA_ASN1_INTEGER, this._encodeLength(modulus.length), modulus),
                    publicExponent: pack("Ca*a*", CRYPT_RSA_ASN1_INTEGER, this._encodeLength(publicExponent.length), publicExponent)
                };
                RSAPublicKey = pack("Ca*a*a*", CRYPT_RSA_ASN1_SEQUENCE, this._encodeLength(components.modulus.length + components.publicExponent.length), components.modulus, components.publicExponent);

                if (this.publicKeyFormat == CRYPT_RSA_PUBLIC_FORMAT_PKCS1) //sequence(oid(1.2.840.113549.1.1.1), null)) = rsaEncryption.
                    //hex version of MA0GCSqGSIb3DQEBAQUA
                    {
                        var rsaOID = pack("H*", "300d06092a864886f70d0101010500");
                        RSAPublicKey = String.fromCharCode(0) + RSAPublicKey;
                        RSAPublicKey = String.fromCharCode(3) + this._encodeLength(RSAPublicKey.length) + RSAPublicKey;
                        RSAPublicKey = pack("Ca*a*", CRYPT_RSA_ASN1_SEQUENCE, this._encodeLength((rsaOID + RSAPublicKey).length), rsaOID + RSAPublicKey);
                    }

                RSAPublicKey = "-----BEGIN PUBLIC KEY-----\r\n" + chunk_split(base64_encode(RSAPublicKey), 64) + "-----END PUBLIC KEY-----";
                return RSAPublicKey;
        }
    }

    _parseKey(key, type) {
        if (type != CRYPT_RSA_PUBLIC_FORMAT_RAW && !("string" === typeof key)) {
            return false;
        }

        switch (type) {
            case CRYPT_RSA_PUBLIC_FORMAT_RAW:
                if (!Array.isArray(key)) {
                    return false;
                }

                var components = Array();

                switch (true) {
                    case undefined !== key.e:
                        components.publicExponent = key.e.copy();
                        break;

                    case undefined !== key.exponent:
                        components.publicExponent = key.exponent.copy();
                        break;

                    case undefined !== key.publicExponent:
                        components.publicExponent = key.publicExponent.copy();
                        break;

                    case undefined !== key[0]:
                        components.publicExponent = key[0].copy();
                }

                switch (true) {
                    case undefined !== key.n:
                        components.modulus = key.n.copy();
                        break;

                    case undefined !== key.modulo:
                        components.modulus = key.modulo.copy();
                        break;

                    case undefined !== key.modulus:
                        components.modulus = key.modulus.copy();
                        break;

                    case undefined !== key[1]:
                        components.modulus = key[1].copy();
                }

                return undefined !== components.modulus && undefined !== components.publicExponent ? components : false;

            case CRYPT_RSA_PRIVATE_FORMAT_PKCS1:
            case CRYPT_RSA_PUBLIC_FORMAT_PKCS1:
                if (preg_match("#DEK-Info: (.+),(.+)#", key, matches)) //symkey is short for symmetric key
                    {
                        var iv = pack("H*", matches[2].trim());
                        var symkey = pack("H*", md5(this.password + iv.substr(0, 8)));
                        symkey += pack("H*", md5(symkey + this.password + iv.substr(0, 8)));
                        var ciphertext = preg_replace("#.+(\r|\n|\r\n)\\1|[\r\n]|-.+-| #s", "", key);
                        ciphertext = preg_match("#^[a-zA-Z\\d/+]*={0,2}$#", ciphertext) ? base64_decode(ciphertext) : false;

                        if (ciphertext === false) {
                            ciphertext = key;
                        }

                        switch (matches[1]) {
                            case "AES-256-CBC":
                                if (!("function" === typeof Crypt_AES)) {
                                    require("Crypt/AES.php");
                                }

                                var crypto = new Crypt_AES();
                                break;

                            case "AES-128-CBC":
                                if (!("function" === typeof Crypt_AES)) {
                                    require("Crypt/AES.php");
                                }

                                symkey = symkey.substr(0, 16);
                                crypto = new Crypt_AES();
                                break;

                            case "DES-EDE3-CFB":
                                if (!("function" === typeof Crypt_TripleDES)) {
                                    require("Crypt/TripleDES.php");
                                }

                                crypto = new Crypt_TripleDES(CRYPT_DES_MODE_CFB);
                                break;

                            case "DES-EDE3-CBC":
                                if (!("function" === typeof Crypt_TripleDES)) {
                                    require("Crypt/TripleDES.php");
                                }

                                symkey = symkey.substr(0, 24);
                                crypto = new Crypt_TripleDES();
                                break;

                            case "DES-CBC":
                                if (!("function" === typeof Crypt_DES)) {
                                    require("Crypt/DES.php");
                                }

                                crypto = new Crypt_DES();
                                break;

                            default:
                                return false;
                        }

                        crypto.setKey(symkey);
                        crypto.setIV(iv);
                        var decoded = crypto.decrypt(ciphertext);
                    } else {
                    decoded = preg_replace("#-.+-|[\r\n]| #", "", key);
                    decoded = preg_match("#^[a-zA-Z\\d/+]*={0,2}$#", decoded) ? base64_decode(decoded) : false;
                }

                if (decoded !== false) {
                    key = decoded;
                }

                components = Array();

                if (this._string_shift(key).charCodeAt(0) != CRYPT_RSA_ASN1_SEQUENCE) {
                    return false;
                }

                if (this._decodeLength(key) != key.length) {
                    return false;
                }

                var tag = this._string_shift(key).charCodeAt(0);

                if (tag == CRYPT_RSA_ASN1_INTEGER && key.substr(0, 3) == "\\x01\\x00\\x30") {
                    this._string_shift(key, 3);

                    tag = CRYPT_RSA_ASN1_SEQUENCE;
                }

                if (tag == CRYPT_RSA_ASN1_SEQUENCE) //intended for keys for which OpenSSL's asn1parse returns the following:
                    //                        0:d=0  hl=4 l= 290 cons: SEQUENCE
                    //                        4:d=1  hl=2 l=  13 cons:  SEQUENCE
                    //                        6:d=2  hl=2 l=   9 prim:   OBJECT            :rsaEncryption
                    //                       17:d=2  hl=2 l=   0 prim:   NULL
                    //                       19:d=1  hl=4 l= 271 prim:  BIT STRING
                    //skip over the BIT STRING / OCTET STRING tag
                    //skip over the BIT STRING / OCTET STRING length
                    //"The initial octet shall encode, as an unsigned binary integer wtih bit 1 as the least significant bit, the number of
                    //unused bits in the final subsequent octet. The number shall be in the range zero to seven."
                    //-- http://www.itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf (section 8.6.2.2)
                    {
                        this._string_shift(key, this._decodeLength(key));

                        tag = this._string_shift(key).charCodeAt(0);

                        this._decodeLength(key);

                        if (tag == CRYPT_RSA_ASN1_BITSTRING) {
                            this._string_shift(key);
                        }

                        if (this._string_shift(key).charCodeAt(0) != CRYPT_RSA_ASN1_SEQUENCE) {
                            return false;
                        }

                        if (this._decodeLength(key) != key.length) {
                            return false;
                        }

                        tag = this._string_shift(key).charCodeAt(0);
                    }

                if (tag != CRYPT_RSA_ASN1_INTEGER) {
                    return false;
                }

                var length = this._decodeLength(key);

                var temp = this._string_shift(key, length);

                if (temp.length != 1 || temp.charCodeAt(0) > 2) //skip over CRYPT_RSA_ASN1_INTEGER
                    {
                        components.modulus = new Math_BigInteger(temp, 256);

                        this._string_shift(key);

                        length = this._decodeLength(key);
                        components[type == CRYPT_RSA_PUBLIC_FORMAT_PKCS1 ? "publicExponent" : "privateExponent"] = new Math_BigInteger(this._string_shift(key, length), 256);
                        return components;
                    }

                if (this._string_shift(key).charCodeAt(0) != CRYPT_RSA_ASN1_INTEGER) {
                    return false;
                }

                length = this._decodeLength(key);
                components.modulus = new Math_BigInteger(this._string_shift(key, length), 256);

                this._string_shift(key);

                length = this._decodeLength(key);
                components.publicExponent = new Math_BigInteger(this._string_shift(key, length), 256);

                this._string_shift(key);

                length = this._decodeLength(key);
                components.privateExponent = new Math_BigInteger(this._string_shift(key, length), 256);

                this._string_shift(key);

                length = this._decodeLength(key);
                components.primes = {
                    1: new Math_BigInteger(this._string_shift(key, length), 256)
                };

                this._string_shift(key);

                length = this._decodeLength(key);
                components.primes.push(new Math_BigInteger(this._string_shift(key, length), 256));

                this._string_shift(key);

                length = this._decodeLength(key);
                components.exponents = {
                    1: new Math_BigInteger(this._string_shift(key, length), 256)
                };

                this._string_shift(key);

                length = this._decodeLength(key);
                components.exponents.push(new Math_BigInteger(this._string_shift(key, length), 256));

                this._string_shift(key);

                length = this._decodeLength(key);
                components.coefficients = {
                    2: new Math_BigInteger(this._string_shift(key, length), 256)
                };

                if (!!key) {
                    if (this._string_shift(key).charCodeAt(0) != CRYPT_RSA_ASN1_SEQUENCE) {
                        return false;
                    }

                    this._decodeLength(key);

                    while (!!key) {
                        if (this._string_shift(key).charCodeAt(0) != CRYPT_RSA_ASN1_SEQUENCE) {
                            return false;
                        }

                        this._decodeLength(key);

                        key = key.substr(1);
                        length = this._decodeLength(key);
                        components.primes.push(new Math_BigInteger(this._string_shift(key, length), 256));

                        this._string_shift(key);

                        length = this._decodeLength(key);
                        components.exponents.push(new Math_BigInteger(this._string_shift(key, length), 256));

                        this._string_shift(key);

                        length = this._decodeLength(key);
                        components.coefficients.push(new Math_BigInteger(this._string_shift(key, length), 256));
                    }
                }

                return components;

            case CRYPT_RSA_PUBLIC_FORMAT_OPENSSH:
                var parts = key.split(" ", 3);
                key = undefined !== parts[1] ? base64_decode(parts[1]) : false;

                if (key === false) {
                    return false;
                }

                var comment = undefined !== parts[2] ? parts[2] : false;
                var cleanup = key.substr(0, 11) == "\\0\\0\\0\\7ssh-rsa";

                if (key.length <= 4) {
                    return false;
                }

                extract(unpack("Nlength", this._string_shift(key, 4)));
                var publicExponent = new Math_BigInteger(this._string_shift(key, length), -256);

                if (key.length <= 4) {
                    return false;
                }

                extract(unpack("Nlength", this._string_shift(key, 4)));
                var modulus = new Math_BigInteger(this._string_shift(key, length), -256);

                if (cleanup && key.length) {
                    if (key.length <= 4) {
                        return false;
                    }

                    extract(unpack("Nlength", this._string_shift(key, 4)));
                    var realModulus = new Math_BigInteger(this._string_shift(key, length), -256);
                    return key.length ? false : {
                        modulus: realModulus,
                        publicExponent: modulus,
                        comment: comment
                    };
                } else {
                    return key.length ? false : {
                        modulus: modulus,
                        publicExponent: publicExponent,
                        comment: comment
                    };
                }

            case CRYPT_RSA_PRIVATE_FORMAT_XML:
            case CRYPT_RSA_PUBLIC_FORMAT_XML:
                this.components = Array();
                var xml = xml_parser_create("UTF-8");
                xml_set_object(xml, this);
                xml_set_element_handler(xml, "_start_element_handler", "_stop_element_handler");
                xml_set_character_data_handler(xml, "_data_handler");

                if (!xml_parse(xml, "<xml>" + key + "</xml>")) {
                    return false;
                }

                return undefined !== this.components.modulus && undefined !== this.components.publicExponent ? this.components : false;

            case CRYPT_RSA_PRIVATE_FORMAT_PUTTY:
                components = Array();
                key = preg_split("#\r\n|\r|\n#", key);
                type = key[0].replace(/PuTTY-User-Key-File-2: (.+)/g, "$1").trim();

                if (type != "ssh-rsa") {
                    return false;
                }

                var encryption = key[1].replace(/Encryption: (.+)/g, "$1").trim();
                comment = key[2].replace(/Comment: (.+)/g, "$1").trim();
                var publicLength = key[3].replace(/Public-Lines: (\d+)/g, "$1").trim();
                var public = base64_decode(key.slice(4, publicLength).map("trim").join(""));
                public = public.substr(11);
                extract(unpack("Nlength", this._string_shift(public, 4)));
                components.publicExponent = new Math_BigInteger(this._string_shift(public, length), -256);
                extract(unpack("Nlength", this._string_shift(public, 4)));
                components.modulus = new Math_BigInteger(this._string_shift(public, length), -256);
                var privateLength = key[publicLength + 4].replace(/Private-Lines: (\d+)/g, "$1").trim();
                var private = base64_decode(key.slice(publicLength + 5, privateLength).map("trim").join(""));

                switch (encryption) {
                    case "aes256-cbc":
                        if (!("function" === typeof Crypt_AES)) {
                            require("Crypt/AES.php");
                        }

                        symkey = "";
                        var sequence = 0;

                        while (symkey.length < 32) {
                            temp = pack("Na*", sequence++, this.password);
                            symkey += pack("H*", sha1(temp));
                        }

                        symkey = symkey.substr(0, 32);
                        crypto = new Crypt_AES();
                }

                if (encryption != "none") {
                    crypto.setKey(symkey);
                    crypto.disablePadding();
                    private = crypto.decrypt(private);

                    if (private === false) {
                        return false;
                    }
                }

                extract(unpack("Nlength", this._string_shift(private, 4)));

                if (private.length < length) {
                    return false;
                }

                components.privateExponent = new Math_BigInteger(this._string_shift(private, length), -256);
                extract(unpack("Nlength", this._string_shift(private, 4)));

                if (private.length < length) {
                    return false;
                }

                components.primes = {
                    1: new Math_BigInteger(this._string_shift(private, length), -256)
                };
                extract(unpack("Nlength", this._string_shift(private, 4)));

                if (private.length < length) {
                    return false;
                }

                components.primes.push(new Math_BigInteger(this._string_shift(private, length), -256));
                temp = components.primes[1].subtract(this.one);
                components.exponents = {
                    1: components.publicExponent.modInverse(temp)
                };
                temp = components.primes[2].subtract(this.one);
                components.exponents.push(components.publicExponent.modInverse(temp));
                extract(unpack("Nlength", this._string_shift(private, 4)));

                if (private.length < length) {
                    return false;
                }

                components.coefficients = {
                    2: new Math_BigInteger(this._string_shift(private, length), -256)
                };
                return components;
        }
    }

    getSize() {
        return !(undefined !== this.modulus) ? 0 : this.modulus.toBits().length;
    }

    _start_element_handler(parser, name, attribs) //$name = strtoupper($name);
    {
        switch (name) {
            case "MODULUS":
                this.current = this.components.modulus;
                break;

            case "EXPONENT":
                this.current = this.components.publicExponent;
                break;

            case "P":
                this.current = this.components.primes[1];
                break;

            case "Q":
                this.current = this.components.primes[2];
                break;

            case "DP":
                this.current = this.components.exponents[1];
                break;

            case "DQ":
                this.current = this.components.exponents[2];
                break;

            case "INVERSEQ":
                this.current = this.components.coefficients[2];
                break;

            case "D":
                this.current = this.components.privateExponent;
                break;

            default:
                delete this.current;
        }

        this.current = "";
    }

    _stop_element_handler(parser, name) //$name = strtoupper($name);
    {
        if (name == "RSAKEYVALUE") {
            return;
        }

        this.current = new Math_BigInteger(base64_decode(this.current), 256);
    }

    _data_handler(parser, data) {
        if (!(undefined !== this.current) || "object" === typeof this.current) {
            return;
        }

        this.current += data.trim();
    }

    loadKey(key, type = false) {
        if (type === false) {
            var types = [CRYPT_RSA_PUBLIC_FORMAT_RAW, CRYPT_RSA_PRIVATE_FORMAT_PKCS1, CRYPT_RSA_PRIVATE_FORMAT_XML, CRYPT_RSA_PRIVATE_FORMAT_PUTTY, CRYPT_RSA_PUBLIC_FORMAT_OPENSSH];

            for (var type of Object.values(types)) {
                var components = this._parseKey(key, type);

                if (components !== false) {
                    break;
                }
            }
        } else {
            components = this._parseKey(key, type);
        }

        if (components === false) {
            return false;
        }

        if (undefined !== components.comment && components.comment !== false) {
            this.comment = components.comment;
        }

        this.modulus = components.modulus;
        this.k = this.modulus.toBytes().length;
        this.exponent = undefined !== components.privateExponent ? components.privateExponent : components.publicExponent;

        if (undefined !== components.primes) {
            this.primes = components.primes;
            this.exponents = components.exponents;
            this.coefficients = components.coefficients;
            this.publicExponent = components.publicExponent;
        } else {
            this.primes = Array();
            this.exponents = Array();
            this.coefficients = Array();
            this.publicExponent = false;
        }

        return true;
    }

    setPassword(password = false) {
        this.password = password;
    }

    setPublicKey(key = false, type = false) {
        if (key === false && !!this.modulus) {
            this.publicExponent = this.exponent;
            return true;
        }

        if (type === false) {
            var types = [CRYPT_RSA_PUBLIC_FORMAT_RAW, CRYPT_RSA_PUBLIC_FORMAT_PKCS1, CRYPT_RSA_PUBLIC_FORMAT_XML, CRYPT_RSA_PUBLIC_FORMAT_OPENSSH];

            for (var type of Object.values(types)) {
                var components = this._parseKey(key, type);

                if (components !== false) {
                    break;
                }
            }
        } else {
            components = this._parseKey(key, type);
        }

        if (components === false) {
            return false;
        }

        if (!this.modulus || !this.modulus.equals(components.modulus)) {
            this.modulus = components.modulus;
            this.exponent = this.publicExponent = components.publicExponent;
            return true;
        }

        this.publicExponent = components.publicExponent;
        return true;
    }

    getPublicKey(type = CRYPT_RSA_PUBLIC_FORMAT_PKCS1) {
        if (!this.modulus || !this.publicExponent) {
            return false;
        }

        var oldFormat = this.publicKeyFormat;
        this.publicKeyFormat = type;

        var temp = this._convertPublicKey(this.modulus, this.publicExponent);

        this.publicKeyFormat = oldFormat;
        return temp;
    }

    getPrivateKey(type = CRYPT_RSA_PUBLIC_FORMAT_PKCS1) {
        if (!this.primes) {
            return false;
        }

        var oldFormat = this.privateKeyFormat;
        this.privateKeyFormat = type;

        var temp = this._convertPrivateKey(this.modulus, this.publicExponent, this.exponent, this.primes, this.exponents, this.coefficients);

        this.privateKeyFormat = oldFormat;
        return temp;
    }

    _getPrivatePublicKey(mode = CRYPT_RSA_PUBLIC_FORMAT_PKCS1) {
        if (!this.modulus || !this.exponent) {
            return false;
        }

        var oldFormat = this.publicKeyFormat;
        this.publicKeyFormat = mode;

        var temp = this._convertPublicKey(this.modulus, this.exponent);

        this.publicKeyFormat = oldFormat;
        return temp;
    }

    __toString() {
        var key = this.getPrivateKey(this.privateKeyFormat);

        if (key !== false) {
            return key;
        }

        key = this._getPrivatePublicKey(this.publicKeyFormat);
        return key !== false ? key : "";
    }

    _generateMinMax(bits) {
        var bytes = bits >> 3;
        var min = str_repeat(String.fromCharCode(0), bytes);
        var max = str_repeat(String.fromCharCode(255), bytes);
        var msb = bits & 7;

        if (msb) {
            min = String.fromCharCode(1 << msb - 1) + min;
            max = String.fromCharCode((1 << msb) - 1) + max;
        } else {
            min[0] = String.fromCharCode(128);
        }

        return {
            min: new Math_BigInteger(min, 256),
            max: new Math_BigInteger(max, 256)
        };
    }

    _decodeLength(string) {
        var length = this._string_shift(string).charCodeAt(0);

        if (length & 128) //definite length, long form
            {
                length &= 127;

                var temp = this._string_shift(string, length);

                [length] = unpack("N", str_pad(temp, 4, String.fromCharCode(0), STR_PAD_LEFT).substr(-4));
            }

        return length;
    }

    _encodeLength(length) {
        if (length <= 127) {
            return String.fromCharCode(length);
        }

        var temp = ltrim(pack("N", length), String.fromCharCode(0));
        return pack("Ca*", 128 | temp.length, temp);
    }

    _string_shift(string, index = 1) {
        var substr = substr(string, 0, index);
        string = substr(string, index);
        return substr;
    }

    setPrivateKeyFormat(format) {
        this.privateKeyFormat = format;
    }

    setPublicKeyFormat(format) {
        this.publicKeyFormat = format;
    }

    setHash(hash) //Crypt_Hash supports algorithms that PKCS#1 doesn't support.  md5-96 and sha1-96, for example.
    {
        switch (hash) {
            case "md2":
            case "md5":
            case "sha1":
            case "sha256":
            case "sha384":
            case "sha512":
                this.hash = new Crypt_Hash(hash);
                this.hashName = hash;
                break;

            default:
                this.hash = new Crypt_Hash("sha1");
                this.hashName = "sha1";
        }

        this.hLen = this.hash.getLength();
    }

    setMGFHash(hash) //Crypt_Hash supports algorithms that PKCS#1 doesn't support.  md5-96 and sha1-96, for example.
    {
        switch (hash) {
            case "md2":
            case "md5":
            case "sha1":
            case "sha256":
            case "sha384":
            case "sha512":
                this.mgfHash = new Crypt_Hash(hash);
                break;

            default:
                this.mgfHash = new Crypt_Hash("sha1");
        }

        this.mgfHLen = this.mgfHash.getLength();
    }

    setSaltLength(sLen) {
        this.sLen = sLen;
    }

    _i2osp(x, xLen) {
        x = x.toBytes();

        if (x.length > xLen) {
            user_error("Integer too large");
            return false;
        }

        return str_pad(x, xLen, String.fromCharCode(0), STR_PAD_LEFT);
    }

    _os2ip(x) {
        return new Math_BigInteger(x, 256);
    }

    _exponentiate(x) {
        if (!this.primes || !this.coefficients || !this.exponents) {
            return x.modPow(this.exponent, this.modulus);
        }

        var num_primes = this.primes.length;

        if ("undefined" !== typeof CRYPT_RSA_DISABLE_BLINDING) {
            var m_i = {
                1: x.modPow(this.exponents[1], this.primes[1]),
                2: x.modPow(this.exponents[2], this.primes[2])
            };
            var h = m_i[1].subtract(m_i[2]);
            h = h.multiply(this.coefficients[2]);
            [h] = h.divide(this.primes[1]);
            var m = m_i[2].add(h.multiply(this.primes[2]));
            var r = this.primes[1];

            for (var i = 3; i <= num_primes; i++) {
                m_i = x.modPow(this.exponents[i], this.primes[i]);
                r = r.multiply(this.primes[i - 1]);
                h = m_i.subtract(m);
                h = h.multiply(this.coefficients[i]);
                [h] = h.divide(this.primes[i]);
                m = m.add(r.multiply(h));
            }
        } else {
            var smallest = this.primes[1];

            for (i = 2;; i <= num_primes; i++) {
                if (smallest.compare(this.primes[i]) > 0) {
                    smallest = this.primes[i];
                }
            }

            var one = new Math_BigInteger(1);
            r = one.random(one, smallest.subtract(one));
            m_i = {
                1: this._blind(x, r, 1),
                2: this._blind(x, r, 2)
            };
            h = m_i[1].subtract(m_i[2]);
            h = h.multiply(this.coefficients[2]);
            [h] = h.divide(this.primes[1]);
            m = m_i[2].add(h.multiply(this.primes[2]));
            r = this.primes[1];

            for (i = 3;; i <= num_primes; i++) {
                m_i = this._blind(x, r, i);
                r = r.multiply(this.primes[i - 1]);
                h = m_i.subtract(m);
                h = h.multiply(this.coefficients[i]);
                [h] = h.divide(this.primes[i]);
                m = m.add(r.multiply(h));
            }
        }

        return m;
    }

    _blind(x, r, i) {
        x = x.multiply(r.modPow(this.publicExponent, this.primes[i]));
        x = x.modPow(this.exponents[i], this.primes[i]);
        r = r.modInverse(this.primes[i]);
        x = x.multiply(r);
        [x] = x.divide(this.primes[i]);
        return x;
    }

    _equals(x, y) {
        if (x.length != y.length) {
            return false;
        }

        var result = 0;

        for (var i = 0; i < x.length; i++) {
            result |= x.charCodeAt(i) ^ y.charCodeAt(i);
        }

        return result == 0;
    }

    _rsaep(m) {
        if (m.compare(this.zero) < 0 || m.compare(this.modulus) > 0) {
            user_error("Message representative out of range");
            return false;
        }

        return this._exponentiate(m);
    }

    _rsadp(c) {
        if (c.compare(this.zero) < 0 || c.compare(this.modulus) > 0) {
            user_error("Ciphertext representative out of range");
            return false;
        }

        return this._exponentiate(c);
    }

    _rsasp1(m) {
        if (m.compare(this.zero) < 0 || m.compare(this.modulus) > 0) {
            user_error("Message representative out of range");
            return false;
        }

        return this._exponentiate(m);
    }

    _rsavp1(s) {
        if (s.compare(this.zero) < 0 || s.compare(this.modulus) > 0) {
            user_error("Signature representative out of range");
            return false;
        }

        return this._exponentiate(s);
    }

    _mgf1(mgfSeed, maskLen) //if $maskLen would yield strings larger than 4GB, PKCS#1 suggests a "Mask too long" error be output.
    {
        var t = "";
        var count = Math.ceil(maskLen / this.mgfHLen);

        for (var i = 0; i < count; i++) {
            var c = pack("N", i);
            t += this.mgfHash.hash(mgfSeed + c);
        }

        return t.substr(0, maskLen);
    }

    _rsaes_oaep_encrypt(m, l = "") //Length checking
    //if $l is larger than two million terrabytes and you're using sha1, PKCS#1 suggests a "Label too long" error
    //be output.
    //RSA encryption
    //Output the ciphertext C
    {
        var mLen = m.length;

        if (mLen > this.k - 2 * this.hLen - 2) {
            user_error("Message too long");
            return false;
        }

        var lHash = this.hash.hash(l);
        var ps = str_repeat(String.fromCharCode(0), this.k - mLen - 2 * this.hLen - 2);
        var db = lHash + ps + String.fromCharCode(1) + m;
        var seed = crypt_random_string(this.hLen);

        var dbMask = this._mgf1(seed, this.k - this.hLen - 1);

        var maskedDB = db ^ dbMask;

        var seedMask = this._mgf1(maskedDB, this.hLen);

        var maskedSeed = seed ^ seedMask;
        var em = String.fromCharCode(0) + maskedSeed + maskedDB;
        m = this._os2ip(em);

        var c = this._rsaep(m);

        c = this._i2osp(c, this.k);
        return c;
    }

    _rsaes_oaep_decrypt(c, l = "") //Length checking
    //if $l is larger than two million terrabytes and you're using sha1, PKCS#1 suggests a "Label too long" error
    //be output.
    //EME-OAEP decoding
    {
        if (c.length != this.k || this.k < 2 * this.hLen + 2) {
            user_error("Decryption error");
            return false;
        }

        c = this._os2ip(c);

        var m = this._rsadp(c);

        if (m === false) {
            user_error("Decryption error");
            return false;
        }

        var em = this._i2osp(m, this.k);

        var lHash = this.hash.hash(l);
        var y = em.charCodeAt(0);
        var maskedSeed = em.substr(1, this.hLen);
        var maskedDB = em.substr(this.hLen + 1);

        var seedMask = this._mgf1(maskedDB, this.hLen);

        var seed = maskedSeed ^ seedMask;

        var dbMask = this._mgf1(seed, this.k - this.hLen - 1);

        var db = maskedDB ^ dbMask;
        var lHash2 = db.substr(0, this.hLen);
        m = db.substr(this.hLen);

        if (lHash != lHash2) {
            user_error("Decryption error");
            return false;
        }

        m = ltrim(m, String.fromCharCode(0));

        if (m.charCodeAt(0) != 1) {
            user_error("Decryption error");
            return false;
        }

        return m.substr(1);
    }

    _rsaes_pkcs1_v1_5_encrypt(m) //Length checking
    //see the comments of _rsaes_pkcs1_v1_5_decrypt() to understand why this is being done
    //RSA encryption
    //Output the ciphertext C
    {
        var mLen = m.length;

        if (mLen > this.k - 11) {
            user_error("Message too long");
            return false;
        }

        var psLen = this.k - mLen - 3;
        var ps = "";

        while (ps.length != psLen) {
            var temp = crypt_random_string(psLen - ps.length);
            temp = str_replace("\\x00", "", temp);
            ps += temp;
        }

        var type = 2;

        if ("undefined" !== typeof CRYPT_RSA_PKCS15_COMPAT && (!(undefined !== this.publicExponent) || this.exponent !== this.publicExponent)) //"The padding string PS shall consist of k-3-||D|| octets. ... for block type 01, they shall have value FF"
            {
                type = 1;
                ps = str_repeat("\\xFF", psLen);
            }

        var em = String.fromCharCode(0) + String.fromCharCode(type) + ps + String.fromCharCode(0) + m;
        m = this._os2ip(em);

        var c = this._rsaep(m);

        c = this._i2osp(c, this.k);
        return c;
    }

    _rsaes_pkcs1_v1_5_decrypt(c) //Length checking
    //EME-PKCS1-v1_5 decoding
    {
        if (c.length != this.k) //or if k < 11
            {
                user_error("Decryption error");
                return false;
            }

        c = this._os2ip(c);

        var m = this._rsadp(c);

        if (m === false) {
            user_error("Decryption error");
            return false;
        }

        var em = this._i2osp(m, this.k);

        if (em.charCodeAt(0) != 0 || em.charCodeAt(1) > 2) {
            user_error("Decryption error");
            return false;
        }

        var ps = em.substr(2, strpos(em, String.fromCharCode(0), 2) - 2);
        m = em.substr(ps.length + 3);

        if (ps.length < 8) {
            user_error("Decryption error");
            return false;
        }

        return m;
    }

    _emsa_pss_encode(m, emBits) //if $m is larger than two million terrabytes and you're using sha1, PKCS#1 suggests a "Label too long" error
    //be output.
    //ie. ceil($emBits / 8)
    {
        var emLen = emBits + 1 >> 3;
        var sLen = this.sLen == false ? this.hLen : this.sLen;
        var mHash = this.hash.hash(m);

        if (emLen < this.hLen + sLen + 2) {
            user_error("Encoding error");
            return false;
        }

        var salt = crypt_random_string(sLen);
        var m2 = "\\0\\0\\0\\0\\0\\0\\0\\0" + mHash + salt;
        var h = this.hash.hash(m2);
        var ps = str_repeat(String.fromCharCode(0), emLen - sLen - this.hLen - 2);
        var db = ps + String.fromCharCode(1) + salt;

        var dbMask = this._mgf1(h, emLen - this.hLen - 1);

        var maskedDB = db ^ dbMask;
        maskedDB[0] = ~String.fromCharCode(255 << (emBits & 7)) & maskedDB[0];
        var em = maskedDB + h + String.fromCharCode(188);
        return em;
    }

    _emsa_pss_verify(m, em, emBits) //if $m is larger than two million terrabytes and you're using sha1, PKCS#1 suggests a "Label too long" error
    //be output.
    //ie. ceil($emBits / 8);
    //should be $sLen long
    {
        var emLen = emBits + 1 >> 3;
        var sLen = this.sLen == false ? this.hLen : this.sLen;
        var mHash = this.hash.hash(m);

        if (emLen < this.hLen + sLen + 2) {
            return false;
        }

        if (em[em.length - 1] != String.fromCharCode(188)) {
            return false;
        }

        var maskedDB = em.substr(0, -this.hLen - 1);
        var h = em.substr(-this.hLen - 1, this.hLen);
        var temp = String.fromCharCode(255 << (emBits & 7));

        if ((~maskedDB[0] & temp) != temp) {
            return false;
        }

        var dbMask = this._mgf1(h, emLen - this.hLen - 1);

        var db = maskedDB ^ dbMask;
        db[0] = ~String.fromCharCode(255 << (emBits & 7)) & db[0];
        temp = emLen - this.hLen - sLen - 2;

        if (db.substr(0, temp) != str_repeat(String.fromCharCode(0), temp) || db.charCodeAt(temp) != 1) {
            return false;
        }

        var salt = db.substr(temp + 1);
        var m2 = "\\0\\0\\0\\0\\0\\0\\0\\0" + mHash + salt;
        var h2 = this.hash.hash(m2);
        return this._equals(h, h2);
    }

    _rsassa_pss_sign(m) //EMSA-PSS encoding
    //RSA signature
    //Output the signature S
    {
        var em = this._emsa_pss_encode(m, 8 * this.k - 1);

        m = this._os2ip(em);

        var s = this._rsasp1(m);

        s = this._i2osp(s, this.k);
        return s;
    }

    _rsassa_pss_verify(m, s) //Length checking
    {
        if (s.length != this.k) {
            user_error("Invalid signature");
            return false;
        }

        var modBits = 8 * this.k;

        var s2 = this._os2ip(s);

        var m2 = this._rsavp1(s2);

        if (m2 === false) {
            user_error("Invalid signature");
            return false;
        }

        var em = this._i2osp(m2, modBits >> 3);

        if (em === false) {
            user_error("Invalid signature");
            return false;
        }

        return this._emsa_pss_verify(m, em, modBits - 1);
    }

    _emsa_pkcs1_v1_5_encode(m, emLen) {
        var h = this.hash.hash(m);

        if (h === false) {
            return false;
        }

        switch (this.hashName) {
            case "md2":
                var t = pack("H*", "3020300c06082a864886f70d020205000410");
                break;

            case "md5":
                t = pack("H*", "3020300c06082a864886f70d020505000410");
                break;

            case "sha1":
                t = pack("H*", "3021300906052b0e03021a05000414");
                break;

            case "sha256":
                t = pack("H*", "3031300d060960864801650304020105000420");
                break;

            case "sha384":
                t = pack("H*", "3041300d060960864801650304020205000430");
                break;

            case "sha512":
                t = pack("H*", "3051300d060960864801650304020305000440");
        }

        t += h;
        var tLen = t.length;

        if (emLen < tLen + 11) {
            user_error("Intended encoded message length too short");
            return false;
        }

        var ps = str_repeat(String.fromCharCode(255), emLen - tLen - 3);
        var em = `\\0\\1${ps}\\0${t}`;
        return em;
    }

    _rsassa_pkcs1_v1_5_sign(m) //EMSA-PKCS1-v1_5 encoding
    //Output the signature S
    {
        var em = this._emsa_pkcs1_v1_5_encode(m, this.k);

        if (em === false) {
            user_error("RSA modulus too short");
            return false;
        }

        m = this._os2ip(em);

        var s = this._rsasp1(m);

        s = this._i2osp(s, this.k);
        return s;
    }

    _rsassa_pkcs1_v1_5_verify(m, s) //Length checking
    {
        if (s.length != this.k) {
            user_error("Invalid signature");
            return false;
        }

        s = this._os2ip(s);

        var m2 = this._rsavp1(s);

        if (m2 === false) {
            user_error("Invalid signature");
            return false;
        }

        var em = this._i2osp(m2, this.k);

        if (em === false) {
            user_error("Invalid signature");
            return false;
        }

        var em2 = this._emsa_pkcs1_v1_5_encode(m, this.k);

        if (em2 === false) {
            user_error("RSA modulus too short");
            return false;
        }

        return this._equals(em, em2);
    }

    setEncryptionMode(mode) {
        this.encryptionMode = mode;
    }

    setSignatureMode(mode) {
        this.signatureMode = mode;
    }

    setComment(comment) {
        this.comment = comment;
    }

    getComment() {
        return this.comment;
    }

    encrypt(plaintext) {
        switch (this.encryptionMode) {
            case CRYPT_RSA_ENCRYPTION_PKCS1:
                var length = this.k - 11;

                if (length <= 0) {
                    return false;
                }

                plaintext = str_split(plaintext, length);
                var ciphertext = "";

                for (var m of Object.values(plaintext)) {
                    ciphertext += this._rsaes_pkcs1_v1_5_encrypt(m);
                }

                return ciphertext;

            default:
                length = this.k - 2 * this.hLen - 2;

                if (length <= 0) {
                    return false;
                }

                plaintext = str_split(plaintext, length);
                ciphertext = "";

                for (var m of Object.values(plaintext)) {
                    ciphertext += this._rsaes_oaep_encrypt(m);
                }

                return ciphertext;
        }
    }

    decrypt(ciphertext) {
        if (this.k <= 0) {
            return false;
        }

        ciphertext = str_split(ciphertext, this.k);
        ciphertext[ciphertext.length - 1] = str_pad(ciphertext[ciphertext.length - 1], this.k, String.fromCharCode(0), STR_PAD_LEFT);
        var plaintext = "";

        switch (this.encryptionMode) {
            case CRYPT_RSA_ENCRYPTION_PKCS1:
                var decrypt = "_rsaes_pkcs1_v1_5_decrypt";
                break;

            default:
                decrypt = "_rsaes_oaep_decrypt";
        }

        for (var c of Object.values(ciphertext)) {
            var temp = this[decrypt](c);

            if (temp === false) {
                return false;
            }

            plaintext += temp;
        }

        return plaintext;
    }

    sign(message) {
        if (!this.modulus || !this.exponent) {
            return false;
        }

        switch (this.signatureMode) {
            case CRYPT_RSA_SIGNATURE_PKCS1:
                return this._rsassa_pkcs1_v1_5_sign(message);

            default:
                return this._rsassa_pss_sign(message);
        }
    }

    verify(message, signature) {
        if (!this.modulus || !this.exponent) {
            return false;
        }

        switch (this.signatureMode) {
            case CRYPT_RSA_SIGNATURE_PKCS1:
                return this._rsassa_pkcs1_v1_5_verify(message, signature);

            default:
                return this._rsassa_pss_verify(message, signature);
        }
    }

};
