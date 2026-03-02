//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of SSHv1.
//
//PHP versions 4 and 5
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Net/SSH1.php');
//
//$ssh = new Net_SSH1('www.domain.tld');
//if (!$ssh->login('username', 'password')) {
//exit('Login Failed');
//}
//
//echo $ssh->exec('ls -la');
//?>
//</code>
//
//Here's another short example:
//<code>
//<?php
//include('Net/SSH1.php');
//
//$ssh = new Net_SSH1('www.domain.tld');
//if (!$ssh->login('username', 'password')) {
//exit('Login Failed');
//}
//
//echo $ssh->read('username@username:~$');
//$ssh->write("ls -la\n");
//echo $ssh->read('username@username:~$');
//?>
//</code>
//
//More information on the SSHv1 specification can be found by reading
//{@link http://www.snailbook.com/docs/protocol-1.5.txt protocol-1.5.txt}.
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
//@category   Net
//@package    Net_SSH1
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//#@+
// Encryption Methods
//
// @see Net_SSH1::getSupportedCiphers()
// @access public
//
//No encryption
//
//Not supported.
//
//
//
//IDEA in CFB mode
//
//Not supported.
//
//
//
//DES in CBC mode
//
//
//
//Triple-DES in CBC mode
//
//All implementations are required to support this
//
//
//
//TRI's Simple Stream encryption CBC
//
//Not supported nor is it defined in the official SSH1 specs.  OpenSSH, however, does define it (see cipher.h),
//although it doesn't use it (see cipher.c)
//
//
//
//RC4
//
//Not supported.
//
//@internal According to the SSH1 specs:
//
//"The first 16 bytes of the session key are used as the key for
//the server to client direction.  The remaining 16 bytes are used
//as the key for the client to server direction.  This gives
//independent 128-bit keys for each direction."
//
//This library currently only supports encryption when the same key is being used for both directions.  This is
//because there's only one $crypto object.  Two could be added ($encrypt and $decrypt, perhaps).
//
//
//
//Blowfish
//
//Not supported nor is it defined in the official SSH1 specs.  OpenSSH, however, defines it (see cipher.h) and
//uses it (see cipher.c)
//
//
//#@-
//#@+
// Authentication Methods
//
// @see Net_SSH1::getSupportedAuthentications()
// @access public
//
//.rhosts or /etc/hosts.equiv
//
//
//
//pure RSA authentication
//
//
//
//password authentication
//
//This is the only method that is supported by this library.
//
//
//
//.rhosts with RSA host authentication
//
//
//#@-
//#@+
// Terminal Modes
//
// @link http://3sp.com/content/developer/maverick-net/docs/Maverick.SSH.PseudoTerminalModesMembers.html
// @access private
//#@-
//
//The Response Type
//
//@see Net_SSH1::_get_binary_packet()
//@access private
//
//
//
//The Response Data
//
//@see Net_SSH1::_get_binary_packet()
//@access private
//
//
//#@+
// Execution Bitmap Masks
//
// @see Net_SSH1::bitmap
// @access private
//#@-
//#@+
// @access public
// @see Net_SSH1::getLog()
//
//Returns the message numbers
//
//
//
//Returns the message content
//
//
//
//Outputs the content real-time
//
//
//
//Dumps the content real-time to a file
//
//
//#@-
//#@+
// @access public
// @see Net_SSH1::read()
//
//Returns when a string matching $expect exactly is found
//
//
//
//Returns when a string matching the regular expression $expect is found
//
//
//#@-
//
//Pure-PHP implementation of SSHv1.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Net_SSH1
//
//
const NET_SSH1_CIPHER_NONE = 0;
const NET_SSH1_CIPHER_IDEA = 1;
const NET_SSH1_CIPHER_DES = 2;
const NET_SSH1_CIPHER_3DES = 3;
const NET_SSH1_CIPHER_BROKEN_TSS = 4;
const NET_SSH1_CIPHER_RC4 = 5;
const NET_SSH1_CIPHER_BLOWFISH = 6;
const NET_SSH1_AUTH_RHOSTS = 1;
const NET_SSH1_AUTH_RSA = 2;
const NET_SSH1_AUTH_PASSWORD = 3;
const NET_SSH1_AUTH_RHOSTS_RSA = 4;
const NET_SSH1_TTY_OP_END = 0;
const NET_SSH1_RESPONSE_TYPE = 1;
const NET_SSH1_RESPONSE_DATA = 2;
const NET_SSH1_MASK_CONSTRUCTOR = 1;
const NET_SSH1_MASK_LOGIN = 2;
const NET_SSH1_MASK_SHELL = 4;
const NET_SSH1_LOG_SIMPLE = 1;
const NET_SSH1_LOG_COMPLEX = 2;
const NET_SSH2_LOG_REALTIME = 3;
const NET_SSH2_LOG_REALTIME_FILE = 4;
const NET_SSH1_READ_SIMPLE = 1;
const NET_SSH1_READ_REGEX = 2;

//
//The SSH identifier
//
//@var String
//@access private
//
//
//
//The Socket Object
//
//@var Object
//@access private
//
//
//
//The cryptography object
//
//@var Object
//@access private
//
//
//
//Execution Bitmap
//
//The bits that are set represent functions that have been called already.  This is used to determine
//if a requisite function has been successfully executed.  If not, an error should be thrown.
//
//@var Integer
//@access private
//
//
//
//The Server Key Public Exponent
//
//Logged for debug purposes
//
//@see Net_SSH1::getServerKeyPublicExponent()
//@var String
//@access private
//
//
//
//The Server Key Public Modulus
//
//Logged for debug purposes
//
//@see Net_SSH1::getServerKeyPublicModulus()
//@var String
//@access private
//
//
//
//The Host Key Public Exponent
//
//Logged for debug purposes
//
//@see Net_SSH1::getHostKeyPublicExponent()
//@var String
//@access private
//
//
//
//The Host Key Public Modulus
//
//Logged for debug purposes
//
//@see Net_SSH1::getHostKeyPublicModulus()
//@var String
//@access private
//
//
//
//Supported Ciphers
//
//Logged for debug purposes
//
//@see Net_SSH1::getSupportedCiphers()
//@var Array
//@access private
//
//
//
//Supported Authentications
//
//Logged for debug purposes
//
//@see Net_SSH1::getSupportedAuthentications()
//@var Array
//@access private
//
//
//
//Server Identification
//
//@see Net_SSH1::getServerIdentification()
//@var String
//@access private
//
//
//
//Protocol Flags
//
//@see Net_SSH1::Net_SSH1()
//@var Array
//@access private
//
//
//
//Protocol Flag Log
//
//@see Net_SSH1::getLog()
//@var Array
//@access private
//
//
//
//Message Log
//
//@see Net_SSH1::getLog()
//@var Array
//@access private
//
//
//
//Real-time log file pointer
//
//@see Net_SSH1::_append_log()
//@var Resource
//@access private
//
//
//
//Real-time log file size
//
//@see Net_SSH1::_append_log()
//@var Integer
//@access private
//
//
//
//Real-time log file wrap boolean
//
//@see Net_SSH1::_append_log()
//@var Boolean
//@access private
//
//
//
//Interactive Buffer
//
//@see Net_SSH1::read()
//@var Array
//@access private
//
//
//
//Timeout
//
//@see Net_SSH1::setTimeout()
//@access private
//
//
//
//Current Timeout
//
//@see Net_SSH2::_get_channel_packet()
//@access private
//
//
//
//Default Constructor.
//
//Connects to an SSHv1 server
//
//@param String $host
//@param optional Integer $port
//@param optional Integer $timeout
//@param optional Integer $cipher
//@return Net_SSH1
//@access public
//
//
//
//Login
//
//@param String $username
//@param optional String $password
//@return Boolean
//@access public
//
//
//
//Set Timeout
//
//$ssh->exec('ping 127.0.0.1'); on a Linux host will never return and will run indefinitely.  setTimeout() makes it so it'll timeout.
//Setting $timeout to false or 0 will mean there is no timeout.
//
//@param Mixed $timeout
//
//
//
//Executes a command on a non-interactive shell, returns the output, and quits.
//
//An SSH1 server will close the connection after a command has been executed on a non-interactive shell.  SSH2
//servers don't, however, this isn't an SSH2 client.  The way this works, on the server, is by initiating a
//shell with the -s option, as discussed in the following links:
//
//{@link http://www.faqs.org/docs/bashman/bashref_65.html http://www.faqs.org/docs/bashman/bashref_65.html}
//{@link http://www.faqs.org/docs/bashman/bashref_62.html http://www.faqs.org/docs/bashman/bashref_62.html}
//
//To execute further commands, a new Net_SSH1 object will need to be created.
//
//Returns false on failure and the output, otherwise.
//
//@see Net_SSH1::interactiveRead()
//@see Net_SSH1::interactiveWrite()
//@param String $cmd
//@return mixed
//@access public
//
//
//
//Creates an interactive shell
//
//@see Net_SSH1::interactiveRead()
//@see Net_SSH1::interactiveWrite()
//@return Boolean
//@access private
//
//
//
//Inputs a command into an interactive shell.
//
//@see Net_SSH1::interactiveWrite()
//@param String $cmd
//@return Boolean
//@access public
//
//
//
//Returns the output of an interactive shell when there's a match for $expect
//
//$expect can take the form of a string literal or, if $mode == NET_SSH1_READ_REGEX,
//a regular expression.
//
//@see Net_SSH1::write()
//@param String $expect
//@param Integer $mode
//@return Boolean
//@access public
//
//
//
//Inputs a command into an interactive shell.
//
//@see Net_SSH1::interactiveRead()
//@param String $cmd
//@return Boolean
//@access public
//
//
//
//Returns the output of an interactive shell when no more output is available.
//
//Requires PHP 4.3.0 or later due to the use of the stream_select() function.  If you see stuff like
//"^[[00m", you're seeing ANSI escape codes.  According to
//{@link http://support.microsoft.com/kb/101875 How to Enable ANSI.SYS in a Command Window}, "Windows NT
//does not support ANSI escape sequences in Win32 Console applications", so if you're a Windows user,
//there's not going to be much recourse.
//
//@see Net_SSH1::interactiveRead()
//@return String
//@access public
//
//
//
//Disconnect
//
//@access public
//
//
//
//Destructor.
//
//Will be called, automatically, if you're supporting just PHP5.  If you're supporting PHP4, you'll need to call
//disconnect().
//
//@access public
//
//
//
//Disconnect
//
//@param String $msg
//@access private
//
//
//
//Gets Binary Packets
//
//See 'The Binary Packet Protocol' of protocol-1.5.txt for more info.
//
//Also, this function could be improved upon by adding detection for the following exploit:
//http://www.securiteam.com/securitynews/5LP042K3FY.html
//
//@see Net_SSH1::_send_binary_packet()
//@return Array
//@access private
//
//
//
//Sends Binary Packets
//
//Returns true on success, false on failure.
//
//@see Net_SSH1::_get_binary_packet()
//@param String $data
//@return Boolean
//@access private
//
//
//
//Cyclic Redundancy Check (CRC)
//
//PHP's crc32 function is implemented slightly differently than the one that SSH v1 uses, so
//we've reimplemented it. A more detailed discussion of the differences can be found after
//$crc_lookup_table's initialization.
//
//@see Net_SSH1::_get_binary_packet()
//@see Net_SSH1::_send_binary_packet()
//@param String $data
//@return Integer
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
//
//RSA Encrypt
//
//Returns mod(pow($m, $e), $n), where $n should be the product of two (large) primes $p and $q and where $e
//should be a number with the property that gcd($e, ($p - 1) * ($q - 1)) == 1.  Could just make anything that
//calls this call modexp, instead, but I think this makes things clearer, maybe...
//
//@see Net_SSH1::Net_SSH1()
//@param Math_BigInteger $m
//@param Array $key
//@return Math_BigInteger
//@access private
//
//
//
//Define Array
//
//Takes any number of arrays whose indices are integers and whose values are strings and defines a bunch of
//named constants from it, using the value as the name of the constant and the index as the value of the constant.
//If any of the constants that would be defined already exists, none of the constants will be defined.
//
//@param Array $array
//@access private
//
//
//
//Returns a log of the packets that have been sent and received.
//
//Returns a string if NET_SSH2_LOGGING == NET_SSH2_LOG_COMPLEX, an array if NET_SSH2_LOGGING == NET_SSH2_LOG_SIMPLE and false if !defined('NET_SSH2_LOGGING')
//
//@access public
//@return String or Array
//
//
//
//Formats a log for printing
//
//@param Array $message_log
//@param Array $message_number_log
//@access private
//@return String
//
//
//
//Return the server key public exponent
//
//Returns, by default, the base-10 representation.  If $raw_output is set to true, returns, instead,
//the raw bytes.  This behavior is similar to PHP's md5() function.
//
//@param optional Boolean $raw_output
//@return String
//@access public
//
//
//
//Return the server key public modulus
//
//Returns, by default, the base-10 representation.  If $raw_output is set to true, returns, instead,
//the raw bytes.  This behavior is similar to PHP's md5() function.
//
//@param optional Boolean $raw_output
//@return String
//@access public
//
//
//
//Return the host key public exponent
//
//Returns, by default, the base-10 representation.  If $raw_output is set to true, returns, instead,
//the raw bytes.  This behavior is similar to PHP's md5() function.
//
//@param optional Boolean $raw_output
//@return String
//@access public
//
//
//
//Return the host key public modulus
//
//Returns, by default, the base-10 representation.  If $raw_output is set to true, returns, instead,
//the raw bytes.  This behavior is similar to PHP's md5() function.
//
//@param optional Boolean $raw_output
//@return String
//@access public
//
//
//
//Return a list of ciphers supported by SSH1 server.
//
//Just because a cipher is supported by an SSH1 server doesn't mean it's supported by this library. If $raw_output
//is set to true, returns, instead, an array of constants.  ie. instead of array('Triple-DES in CBC mode'), you'll
//get array(NET_SSH1_CIPHER_3DES).
//
//@param optional Boolean $raw_output
//@return Array
//@access public
//
//
//
//Return a list of authentications supported by SSH1 server.
//
//Just because a cipher is supported by an SSH1 server doesn't mean it's supported by this library. If $raw_output
//is set to true, returns, instead, an array of constants.  ie. instead of array('password authentication'), you'll
//get array(NET_SSH1_AUTH_PASSWORD).
//
//@param optional Boolean $raw_output
//@return Array
//@access public
//
//
//
//Return the server identification.
//
//@return String
//@access public
//
//
//
//Logs data packets
//
//Makes sure that only the last 1MB worth of packets will be logged
//
//@param String $data
//@access private
//
//
class Net_SSH1 {
    constructor() {
        this.identifier = "SSH-1.5-phpseclib";
        this.crypto = false;
        this.bitmap = 0;
        this.supported_ciphers = {
            [NET_SSH1_CIPHER_NONE]: "No encryption",
            [NET_SSH1_CIPHER_IDEA]: "IDEA in CFB mode",
            [NET_SSH1_CIPHER_DES]: "DES in CBC mode",
            [NET_SSH1_CIPHER_3DES]: "Triple-DES in CBC mode",
            [NET_SSH1_CIPHER_BROKEN_TSS]: "TRI's Simple Stream encryption CBC",
            [NET_SSH1_CIPHER_RC4]: "RC4",
            [NET_SSH1_CIPHER_BLOWFISH]: "Blowfish"
        };
        this.supported_authentications = {
            [NET_SSH1_AUTH_RHOSTS]: ".rhosts or /etc/hosts.equiv",
            [NET_SSH1_AUTH_RSA]: "pure RSA authentication",
            [NET_SSH1_AUTH_PASSWORD]: "password authentication",
            [NET_SSH1_AUTH_RHOSTS_RSA]: ".rhosts with RSA host authentication"
        };
        this.server_identification = "";
        this.protocol_flags = Array();
        this.protocol_flag_log = Array();
        this.message_log = Array();
        this.interactiveBuffer = "";
    }

    Net_SSH1(host, port = 22, timeout = 10, cipher = NET_SSH1_CIPHER_3DES) //get a list of the supported ciphers
    //get a list of the supported authentications
    {
        if (!("function" === typeof Math_BigInteger)) {
            require("Math/BigInteger.php");
        }

        if (!("function" === typeof crypt_random_string) && !("function" === typeof Crypt_Random) && !("function" === typeof crypt_random_string)) {
            require("Crypt/Random.php");
        }

        this.protocol_flags = {
            1: "NET_SSH1_MSG_DISCONNECT",
            2: "NET_SSH1_SMSG_PUBLIC_KEY",
            3: "NET_SSH1_CMSG_SESSION_KEY",
            4: "NET_SSH1_CMSG_USER",
            9: "NET_SSH1_CMSG_AUTH_PASSWORD",
            10: "NET_SSH1_CMSG_REQUEST_PTY",
            12: "NET_SSH1_CMSG_EXEC_SHELL",
            13: "NET_SSH1_CMSG_EXEC_CMD",
            14: "NET_SSH1_SMSG_SUCCESS",
            15: "NET_SSH1_SMSG_FAILURE",
            16: "NET_SSH1_CMSG_STDIN_DATA",
            17: "NET_SSH1_SMSG_STDOUT_DATA",
            18: "NET_SSH1_SMSG_STDERR_DATA",
            19: "NET_SSH1_CMSG_EOF",
            20: "NET_SSH1_SMSG_EXITSTATUS",
            33: "NET_SSH1_CMSG_EXIT_CONFIRMATION"
        };

        this._define_array(this.protocol_flags);

        this.fsock = fsockopen(host, port, errno, errstr, timeout);

        if (!this.fsock) {
            user_error(rtrim(`Cannot connect to ${host}. Error ${errno}. ${errstr}`));
            return;
        }

        this.server_identification = init_line = fgets(this.fsock, 255);

        if ("undefined" !== typeof NET_SSH1_LOGGING) {
            this._append_log("<-", this.server_identification);

            this._append_log("->", this.identifier + "\r\n");
        }

        if (!preg_match("#SSH-([0-9\\.]+)-(.+)#", init_line, parts)) {
            user_error("Can only connect to SSH servers");
            return;
        }

        if (parts[1][0] != 1) {
            user_error(`Cannot connect to SSH ${parts[1]} servers`);
            return;
        }

        fputs(this.fsock, this.identifier + "\r\n");

        var response = this._get_binary_packet();

        if (response[NET_SSH1_RESPONSE_TYPE] != NET_SSH1_SMSG_PUBLIC_KEY) {
            user_error("Expected SSH_SMSG_PUBLIC_KEY");
            return;
        }

        var anti_spoofing_cookie = this._string_shift(response[NET_SSH1_RESPONSE_DATA], 8);

        this._string_shift(response[NET_SSH1_RESPONSE_DATA], 4);

        var temp = unpack("nlen", this._string_shift(response[NET_SSH1_RESPONSE_DATA], 2));
        var server_key_public_exponent = new Math_BigInteger(this._string_shift(response[NET_SSH1_RESPONSE_DATA], Math.ceil(temp.len / 8)), 256);
        this.server_key_public_exponent = server_key_public_exponent;
        temp = unpack("nlen", this._string_shift(response[NET_SSH1_RESPONSE_DATA], 2));
        var server_key_public_modulus = new Math_BigInteger(this._string_shift(response[NET_SSH1_RESPONSE_DATA], Math.ceil(temp.len / 8)), 256);
        this.server_key_public_modulus = server_key_public_modulus;

        this._string_shift(response[NET_SSH1_RESPONSE_DATA], 4);

        temp = unpack("nlen", this._string_shift(response[NET_SSH1_RESPONSE_DATA], 2));
        var host_key_public_exponent = new Math_BigInteger(this._string_shift(response[NET_SSH1_RESPONSE_DATA], Math.ceil(temp.len / 8)), 256);
        this.host_key_public_exponent = host_key_public_exponent;
        temp = unpack("nlen", this._string_shift(response[NET_SSH1_RESPONSE_DATA], 2));
        var host_key_public_modulus = new Math_BigInteger(this._string_shift(response[NET_SSH1_RESPONSE_DATA], Math.ceil(temp.len / 8)), 256);
        this.host_key_public_modulus = host_key_public_modulus;

        this._string_shift(response[NET_SSH1_RESPONSE_DATA], 4);

        extract(unpack("Nsupported_ciphers_mask", this._string_shift(response[NET_SSH1_RESPONSE_DATA], 4)));
        {
            let _tmp_0 = this.supported_ciphers;

            for (var mask in _tmp_0) {
                var name = _tmp_0[mask];

                if ((supported_ciphers_mask & 1 << mask) == 0) {
                    delete this.supported_ciphers[mask];
                }
            }
        }
        extract(unpack("Nsupported_authentications_mask", this._string_shift(response[NET_SSH1_RESPONSE_DATA], 4)));
        {
            let _tmp_1 = this.supported_authentications;

            for (var mask in _tmp_1) {
                var name = _tmp_1[mask];

                if ((supported_authentications_mask & 1 << mask) == 0) {
                    delete this.supported_authentications[mask];
                }
            }
        }
        var session_id = pack("H*", md5(host_key_public_modulus.toBytes() + server_key_public_modulus.toBytes() + anti_spoofing_cookie));
        var session_key = crypt_random_string(32);
        var double_encrypted_session_key = session_key ^ str_pad(session_id, 32, String.fromCharCode(0));

        if (server_key_public_modulus.compare(host_key_public_modulus) < 0) {
            double_encrypted_session_key = this._rsa_crypt(double_encrypted_session_key, [server_key_public_exponent, server_key_public_modulus]);
            double_encrypted_session_key = this._rsa_crypt(double_encrypted_session_key, [host_key_public_exponent, host_key_public_modulus]);
        } else {
            double_encrypted_session_key = this._rsa_crypt(double_encrypted_session_key, [host_key_public_exponent, host_key_public_modulus]);
            double_encrypted_session_key = this._rsa_crypt(double_encrypted_session_key, [server_key_public_exponent, server_key_public_modulus]);
        }

        cipher = undefined !== this.supported_ciphers[cipher] ? cipher : NET_SSH1_CIPHER_3DES;
        var data = pack("C2a*na*N", NET_SSH1_CMSG_SESSION_KEY, cipher, anti_spoofing_cookie, 8 * double_encrypted_session_key.length, double_encrypted_session_key, 0);

        if (!this._send_binary_packet(data)) {
            user_error("Error sending SSH_CMSG_SESSION_KEY");
            return;
        }

        switch (cipher) {
            case NET_SSH1_CIPHER_DES:
                if (!("function" === typeof Crypt_DES)) {
                    require("Crypt/DES.php");
                }

                this.crypto = new Crypt_DES();
                this.crypto.disablePadding();
                this.crypto.enableContinuousBuffer();
                this.crypto.setKey(session_key.substr(0, 8));
                break;

            case NET_SSH1_CIPHER_3DES:
                if (!("function" === typeof Crypt_TripleDES)) {
                    require("Crypt/TripleDES.php");
                }

                this.crypto = new Crypt_TripleDES(CRYPT_DES_MODE_3CBC);
                this.crypto.disablePadding();
                this.crypto.enableContinuousBuffer();
                this.crypto.setKey(session_key.substr(0, 24));
                break;
        }

        response = this._get_binary_packet();

        if (response[NET_SSH1_RESPONSE_TYPE] != NET_SSH1_SMSG_SUCCESS) {
            user_error("Expected SSH_SMSG_SUCCESS");
            return;
        }

        this.bitmap = NET_SSH1_MASK_CONSTRUCTOR;
    }

    login(username, password = "") {
        if (!(this.bitmap & NET_SSH1_MASK_CONSTRUCTOR)) {
            return false;
        }

        var data = pack("CNa*", NET_SSH1_CMSG_USER, username.length, username);

        if (!this._send_binary_packet(data)) {
            user_error("Error sending SSH_CMSG_USER");
            return false;
        }

        var response = this._get_binary_packet();

        if (response === true) {
            return false;
        }

        if (response[NET_SSH1_RESPONSE_TYPE] == NET_SSH1_SMSG_SUCCESS) {
            this.bitmap |= NET_SSH1_MASK_LOGIN;
            return true;
        } else if (response[NET_SSH1_RESPONSE_TYPE] != NET_SSH1_SMSG_FAILURE) {
            user_error("Expected SSH_SMSG_SUCCESS or SSH_SMSG_FAILURE");
            return false;
        }

        data = pack("CNa*", NET_SSH1_CMSG_AUTH_PASSWORD, password.length, password);

        if (!this._send_binary_packet(data)) {
            user_error("Error sending SSH_CMSG_AUTH_PASSWORD");
            return false;
        }

        if ("undefined" !== typeof NET_SSH1_LOGGING && NET_SSH1_LOGGING == NET_SSH1_LOG_COMPLEX) {
            data = pack("CNa*", NET_SSH1_CMSG_AUTH_PASSWORD, "password".length, "password");
            this.message_log[this.message_log.length - 1] = data;
        }

        response = this._get_binary_packet();

        if (response === true) {
            return false;
        }

        if (response[NET_SSH1_RESPONSE_TYPE] == NET_SSH1_SMSG_SUCCESS) {
            this.bitmap |= NET_SSH1_MASK_LOGIN;
            return true;
        } else if (response[NET_SSH1_RESPONSE_TYPE] == NET_SSH1_SMSG_FAILURE) {
            return false;
        } else {
            user_error("Expected SSH_SMSG_SUCCESS or SSH_SMSG_FAILURE");
            return false;
        }
    }

    setTimeout(timeout) {
        this.timeout = this.curTimeout = timeout;
    }

    exec(cmd, block = true) //i don't think it's really all that important if this packet gets sent or not.
    //reset the execution bitmap - a new Net_SSH1 object needs to be created.
    {
        if (!(this.bitmap & NET_SSH1_MASK_LOGIN)) {
            user_error("Operation disallowed prior to login()");
            return false;
        }

        var data = pack("CNa*", NET_SSH1_CMSG_EXEC_CMD, cmd.length, cmd);

        if (!this._send_binary_packet(data)) {
            user_error("Error sending SSH_CMSG_EXEC_CMD");
            return false;
        }

        if (!block) {
            return true;
        }

        var output = "";

        var response = this._get_binary_packet();

        if (response !== false) {
            do {
                output += response[NET_SSH1_RESPONSE_DATA].substr(4);
                response = this._get_binary_packet();
            } while (Array.isArray(response) && response[NET_SSH1_RESPONSE_TYPE] != NET_SSH1_SMSG_EXITSTATUS);
        }

        data = pack("C", NET_SSH1_CMSG_EXIT_CONFIRMATION);

        this._send_binary_packet(data);

        fclose(this.fsock);
        this.bitmap = 0;
        return output;
    }

    _initShell() //connect using the sample parameters in protocol-1.5.txt.
    //according to wikipedia.org's entry on text terminals, "the fundamental type of application running on a text
    //terminal is a command line interpreter or shell".  thus, opening a terminal session to run the shell.
    //stream_set_blocking($this->fsock, 0);
    {
        var data = pack("CNa*N4C", NET_SSH1_CMSG_REQUEST_PTY, "vt100".length, "vt100", 24, 80, 0, 0, NET_SSH1_TTY_OP_END);

        if (!this._send_binary_packet(data)) {
            user_error("Error sending SSH_CMSG_REQUEST_PTY");
            return false;
        }

        var response = this._get_binary_packet();

        if (response === true) {
            return false;
        }

        if (response[NET_SSH1_RESPONSE_TYPE] != NET_SSH1_SMSG_SUCCESS) {
            user_error("Expected SSH_SMSG_SUCCESS");
            return false;
        }

        data = pack("C", NET_SSH1_CMSG_EXEC_SHELL);

        if (!this._send_binary_packet(data)) {
            user_error("Error sending SSH_CMSG_EXEC_SHELL");
            return false;
        }

        this.bitmap |= NET_SSH1_MASK_SHELL;
        return true;
    }

    write(cmd) {
        return this.interactiveWrite(cmd);
    }

    read(expect, mode = NET_SSH1_READ_SIMPLE) {
        if (!(this.bitmap & NET_SSH1_MASK_LOGIN)) {
            user_error("Operation disallowed prior to login()");
            return false;
        }

        if (!(this.bitmap & NET_SSH1_MASK_SHELL) && !this._initShell()) {
            user_error("Unable to initiate an interactive shell session");
            return false;
        }

        var match = expect;

        while (true) {
            if (mode == NET_SSH1_READ_REGEX) {
                preg_match(expect, this.interactiveBuffer, matches);
                match = undefined !== matches[0] ? matches[0] : "";
            }

            var pos = match.length ? strpos(this.interactiveBuffer, match) : false;

            if (pos !== false) {
                return this._string_shift(this.interactiveBuffer, pos + match.length);
            }

            var response = this._get_binary_packet();

            if (response === true) {
                return this._string_shift(this.interactiveBuffer, this.interactiveBuffer.length);
            }

            this.interactiveBuffer += response[NET_SSH1_RESPONSE_DATA].substr(4);
        }
    }

    interactiveWrite(cmd) {
        if (!(this.bitmap & NET_SSH1_MASK_LOGIN)) {
            user_error("Operation disallowed prior to login()");
            return false;
        }

        if (!(this.bitmap & NET_SSH1_MASK_SHELL) && !this._initShell()) {
            user_error("Unable to initiate an interactive shell session");
            return false;
        }

        var data = pack("CNa*", NET_SSH1_CMSG_STDIN_DATA, cmd.length, cmd);

        if (!this._send_binary_packet(data)) {
            user_error("Error sending SSH_CMSG_STDIN");
            return false;
        }

        return true;
    }

    interactiveRead() {
        if (!(this.bitmap & NET_SSH1_MASK_LOGIN)) {
            user_error("Operation disallowed prior to login()");
            return false;
        }

        if (!(this.bitmap & NET_SSH1_MASK_SHELL) && !this._initShell()) {
            user_error("Unable to initiate an interactive shell session");
            return false;
        }

        var read = [this.fsock];
        var write = except = undefined;

        if (stream_select(read, write, except, 0)) {
            var response = this._get_binary_packet();

            return response[NET_SSH1_RESPONSE_DATA].substr(4);
        } else {
            return "";
        }
    }

    disconnect() {
        this._disconnect();
    }

    __destruct() {
        this._disconnect();
    }

    _disconnect(msg = "Client Quit") {
        if (this.bitmap) //$response = $this->_get_binary_packet();
            //            if ($response === true) {
            //                $response = array(NET_SSH1_RESPONSE_TYPE => -1);
            //            }
            //            switch ($response[NET_SSH1_RESPONSE_TYPE]) {
            //                case NET_SSH1_SMSG_EXITSTATUS:
            //                    $data = pack('C', NET_SSH1_CMSG_EXIT_CONFIRMATION);
            //                    break;
            //                default:
            //                    $data = pack('CNa*', NET_SSH1_MSG_DISCONNECT, strlen($msg), $msg);
            //            }
            {
                var data = pack("C", NET_SSH1_CMSG_EOF);

                this._send_binary_packet(data);

                data = pack("CNa*", NET_SSH1_MSG_DISCONNECT, msg.length, msg);

                this._send_binary_packet(data);

                fclose(this.fsock);
                this.bitmap = 0;
            }
    }

    _get_binary_packet() //http://php.net/microtime#61838
    //if ( $temp['crc'] != $this->_crc($padding . $type . $data) ) {
    //user_error('Bad CRC in packet from server');
    //return false;
    //}
    {
        if (feof(this.fsock)) //user_error('connection closed prematurely');
            {
                return false;
            }

        if (this.curTimeout) //http://php.net/microtime#61838
            //on windows this returns a "Warning: Invalid CRT parameters detected" error
            {
                var except;
                var read = [this.fsock];
                var write = except = undefined;
                var start = strtok(Date.now() / 1000, " ") + strtok("");
                var sec = Math.floor(this.curTimeout);
                var usec = 1000000 * (this.curTimeout - sec);

                if (!(stream_select(read, write, except, sec, usec) && !read.length)) //$this->_disconnect('Timeout');
                    {
                        return true;
                    }

                var elapsed = strtok(Date.now() / 1000, " ") + strtok("") - start;
                this.curTimeout -= elapsed;
            }

        start = strtok(Date.now() / 1000, " ") + strtok("");
        var temp = unpack("Nlength", fread(this.fsock, 4));
        var padding_length = 8 - (temp.length & 7);
        var length = temp.length + padding_length;

        while (length > 0) {
            temp = fread(this.fsock, length);
            raw += temp;
            length -= temp.length;
        }

        var stop = strtok(Date.now() / 1000, " ") + strtok("");

        if (raw.length && this.crypto !== false) {
            var raw = this.crypto.decrypt(raw);
        }

        var padding = raw.substr(0, padding_length);
        var type = raw[padding_length];
        var data = raw.substr(padding_length + 1, -4);
        temp = unpack("Ncrc", raw.substr(-4));
        type = type.charCodeAt(0);

        if ("undefined" !== typeof NET_SSH1_LOGGING) {
            temp = undefined !== this.protocol_flags[type] ? this.protocol_flags[type] : "UNKNOWN";
            temp = "<- " + temp + " (" + Math.round(stop - start, 4) + "s)";

            this._append_log(temp, data);
        }

        return {
            [NET_SSH1_RESPONSE_TYPE]: type,
            [NET_SSH1_RESPONSE_DATA]: data
        };
    }

    _send_binary_packet(data) //http://php.net/microtime#61838
    {
        if (feof(this.fsock)) //user_error('connection closed prematurely');
            {
                return false;
            }

        var length = data.length + 4;
        var padding = crypt_random_string(8 - (length & 7));
        var orig = data;
        data = padding + data;
        data += pack("N", this._crc(data));

        if (this.crypto !== false) {
            data = this.crypto.encrypt(data);
        }

        var packet = pack("Na*", length, data);
        var start = strtok(Date.now() / 1000, " ") + strtok("");
        var result = packet.length == fputs(this.fsock, packet);
        var stop = strtok(Date.now() / 1000, " ") + strtok("");

        if ("undefined" !== typeof NET_SSH1_LOGGING) {
            var temp = undefined !== this.protocol_flags[orig.charCodeAt(0)] ? this.protocol_flags[orig.charCodeAt(0)] : "UNKNOWN";
            temp = "-> " + temp + " (" + Math.round(stop - start, 4) + "s)";

            this._append_log(temp, orig);
        }

        return result;
    }

    _crc(data) //For this function to yield the same output as PHP's crc32 function, $crc would have to be
    //set to 0xFFFFFFFF, initially - not 0x00000000 as it currently is.
    //In addition to having to set $crc to 0xFFFFFFFF, initially, the return value must be XOR'd with
    //0xFFFFFFFF for this function to return the same thing that PHP's crc32 function would.
    {
        if (!("_static_Net_SSH1__crc_crc_lookup_table" in global)) _static_Net_SSH1__crc_crc_lookup_table = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
        var crc = 0;
        var length = data.length;

        for (var i = 0; i < length; i++) //We AND $crc >> 8 with 0x00FFFFFF because we want the eight newly added bits to all
        //be zero.  PHP, unfortunately, doesn't always do this.  0x80000000 >> 8, as an example,
        //yields 0xFF800000 - not 0x00800000.  The following link elaborates:
        //http://www.php.net/manual/en/language.operators.bitwise.php#57281
        {
            crc = crc >> 8 & 16777215 ^ _static_Net_SSH1__crc_crc_lookup_table[crc & 255 ^ data.charCodeAt(i)];
        }

        return crc;
    }

    _string_shift(string, index = 1) {
        var substr = substr(string, 0, index);
        string = substr(string, index);
        return substr;
    }

    _rsa_crypt(m, key) //if (!class_exists('Crypt_RSA')) {
    //            require_once('Crypt/RSA.php');
    //        }
    //        $rsa = new Crypt_RSA();
    //        $rsa->loadKey($key, CRYPT_RSA_PUBLIC_FORMAT_RAW);
    //        $rsa->setEncryptionMode(CRYPT_RSA_ENCRYPTION_PKCS1);
    //        return $rsa->encrypt($m);
    //To quote from protocol-1.5.txt:
    //The most significant byte (which is only partial as the value must be
    //less than the public modulus, which is never a power of two) is zero.
    //
    //The next byte contains the value 2 (which stands for public-key
    //encrypted data in the PKCS standard [PKCS#1]).  Then, there are non-
    //zero random bytes to fill any unused space, a zero byte, and the data
    //to be encrypted in the least significant bytes, the last byte of the
    //data in the least significant byte.
    //Presumably the part of PKCS#1 they're refering to is "Section 7.2.1 Encryption Operation",
    //under "7.2 RSAES-PKCS1-v1.5" and "7 Encryption schemes" of the following URL:
    //ftp://ftp.rsasecurity.com/pub/pkcs/pkcs-1/pkcs-1v2-1.pdf
    {
        var modulus = key[1].toBytes();
        var length = modulus.length - m.length - 3;
        var random = "";

        while (random.length != length) {
            var block = crypt_random_string(length - random.length);
            block = str_replace("\\x00", "", block);
            random += block;
        }

        var temp = String.fromCharCode(0) + String.fromCharCode(2) + random + String.fromCharCode(0) + m;
        m = new Math_BigInteger(temp, 256);
        m = m.modPow(key[0], key[1]);
        return m.toBytes();
    }

    _define_array() {
        var args = arguments;

        for (var arg of Object.values(args)) {
            for (var key in arg) {
                var value = arg[key];

                if (!(undefined !== global[value])) {
                    global[value] = key;
                } else {
                    break;
                }
            }
        }
    }

    getLog() {
        if (!("undefined" !== typeof NET_SSH1_LOGGING)) {
            return false;
        }

        switch (NET_SSH1_LOGGING) {
            case NET_SSH1_LOG_SIMPLE:
                return this.message_number_log;
                break;

            case NET_SSH1_LOG_COMPLEX:
                return this._format_log(this.message_log, this.protocol_flags_log);
                break;

            default:
                return false;
        }
    }

    _format_log(message_log, message_number_log) {
        {
            if (!("_static_Net_SSH1__format_log_boundary" in global)) _static_Net_SSH1__format_log_boundary = ":";
            if (!("_static_Net_SSH1__format_log_long_width" in global)) _static_Net_SSH1__format_log_long_width = 65;
            if (!("_static_Net_SSH1__format_log_short_width" in global)) _static_Net_SSH1__format_log_short_width = 16;
        }
        var output = "";

        for (var i = 0; i < message_log.length; i++) {
            output += message_number_log[i] + "\r\n";
            var current_log = message_log[i];
            var j = 0;

            do //replace non ASCII printable characters with dots
            //http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
            //also replace < with a . since < messes up the output on web browsers
            {
                if (current_log.length) {
                    output += str_pad(dechex(j), 7, "0", STR_PAD_LEFT) + "0  ";
                }

                var fragment = this._string_shift(current_log, _static_Net_SSH1__format_log_short_width);

                var hex = fragment.replace(/(.)/ges, "\"" + _static_Net_SSH1__format_log_boundary + "\" . str_pad(dechex(ord(substr(\"\\1\", -1))), 2, \"0\", STR_PAD_LEFT)").substr(_static_Net_SSH1__format_log_boundary.length);
                var raw = fragment.replace(/[^\x20-\x7E]|</g, ".");
                output += str_pad(hex, _static_Net_SSH1__format_log_long_width - _static_Net_SSH1__format_log_short_width, " ") + raw + "\r\n";
                j++;
            } while (current_log.length);

            output += "\r\n";
        }

        return output;
    }

    getServerKeyPublicExponent(raw_output = false) {
        return raw_output ? this.server_key_public_exponent.toBytes() : this.server_key_public_exponent.toString();
    }

    getServerKeyPublicModulus(raw_output = false) {
        return raw_output ? this.server_key_public_modulus.toBytes() : this.server_key_public_modulus.toString();
    }

    getHostKeyPublicExponent(raw_output = false) {
        return raw_output ? this.host_key_public_exponent.toBytes() : this.host_key_public_exponent.toString();
    }

    getHostKeyPublicModulus(raw_output = false) {
        return raw_output ? this.host_key_public_modulus.toBytes() : this.host_key_public_modulus.toString();
    }

    getSupportedCiphers(raw_output = false) {
        return raw_output ? Object.keys(this.supported_ciphers) : Object.values(this.supported_ciphers);
    }

    getSupportedAuthentications(raw_output = false) {
        return raw_output ? Object.keys(this.supported_authentications) : Object.values(this.supported_authentications);
    }

    getServerIdentification() {
        return rtrim(this.server_identification);
    }

    _append_log(protocol_flags, message) {
        switch (NET_SSH1_LOGGING) {
            case NET_SSH1_LOG_SIMPLE:
                this.protocol_flags_log.push(protocol_flags);
                break;

            case NET_SSH1_LOG_COMPLEX:
                this.protocol_flags_log.push(protocol_flags);

                this._string_shift(message);

                this.log_size += message.length;
                this.message_log.push(message);

                while (this.log_size > NET_SSH2_LOG_MAX_SIZE) {
                    this.log_size -= this.message_log.shift().length;
                    this.protocol_flags_log.shift();
                }

                break;

            case NET_SSH1_LOG_REALTIME:
                echo("<pre>\r\n" + this._format_log([message], [protocol_flags]) + "\r\n</pre>\r\n");
                flush();
                ob_flush();
                break;

            case NET_SSH1_LOG_REALTIME_FILE:
                if (!(undefined !== this.realtime_log_file)) //PHP doesn't seem to like using constants in fopen()
                    {
                        var filename = NET_SSH2_LOG_REALTIME_FILE;
                        var fp = fopen(filename, "w");
                        this.realtime_log_file = fp;
                    }

                if (!is_resource(this.realtime_log_file)) {
                    break;
                }

                var entry = this._format_log([message], [protocol_flags]);

                if (this.realtime_log_wrap) {
                    var temp = "<<< START >>>\r\n";
                    entry += temp;
                    fseek(this.realtime_log_file, ftell(this.realtime_log_file) - temp.length);
                }

                this.realtime_log_size += entry.length;

                if (this.realtime_log_size > NET_SSH1_LOG_MAX_SIZE) {
                    fseek(this.realtime_log_file, 0);
                    this.realtime_log_size = entry.length;
                    this.realtime_log_wrap = true;
                }

                fputs(this.realtime_log_file, entry);
        }
    }

};
