//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of SSHv2.
//
//PHP versions 4 and 5
//
//Here are some examples of how to use this library:
//<code>
//<?php
//include('Net/SSH2.php');
//
//$ssh = new Net_SSH2('www.domain.tld');
//if (!$ssh->login('username', 'password')) {
//exit('Login Failed');
//}
//
//echo $ssh->exec('pwd');
//echo $ssh->exec('ls -la');
//?>
//</code>
//
//<code>
//<?php
//include('Crypt/RSA.php');
//include('Net/SSH2.php');
//
//$key = new Crypt_RSA();
////$key->setPassword('whatever');
//$key->loadKey(file_get_contents('privatekey'));
//
//$ssh = new Net_SSH2('www.domain.tld');
//if (!$ssh->login('username', $key)) {
//exit('Login Failed');
//}
//
//echo $ssh->read('username@username:~$');
//$ssh->write("ls -la\n");
//echo $ssh->read('username@username:~$');
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
//@category   Net
//@package    Net_SSH2
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//#@+
// Execution Bitmap Masks
//
// @see Net_SSH2::bitmap
// @access private
//#@-
//#@+
// Channel constants
//
// RFC4254 refers not to client and server channels but rather to sender and recipient channels.  we don't refer
// to them in that way because RFC4254 toggles the meaning. the client sends a SSH_MSG_CHANNEL_OPEN message with
// a sender channel and the server sends a SSH_MSG_CHANNEL_OPEN_CONFIRMATION in response, with a sender and a
// recepient channel.  at first glance, you might conclude that SSH_MSG_CHANNEL_OPEN_CONFIRMATION's sender channel
// would be the same thing as SSH_MSG_CHANNEL_OPEN's sender channel, but it's not, per this snipet:
//     The 'recipient channel' is the channel number given in the original
//     open request, and 'sender channel' is the channel number allocated by
//     the other side.
//
// @see Net_SSH2::_send_channel_packet()
// @see Net_SSH2::_get_channel_packet()
// @access private
//PuTTy uses 0x100
//#@-
//#@+
// @access public
// @see Net_SSH2::getLog()
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
// @see Net_SSH2::read()
//
//Returns when a string matching $expect exactly is found
//
//
//
//Returns when a string matching the regular expression $expect is found
//
//
//
//Make sure that the log never gets larger than this
//
//
//#@-
//
//Pure-PHP implementation of SSHv2.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Net_SSH2
//
//
const NET_SSH2_MASK_CONSTRUCTOR = 1;
const NET_SSH2_MASK_LOGIN_REQ = 2;
const NET_SSH2_MASK_LOGIN = 4;
const NET_SSH2_MASK_SHELL = 8;
const NET_SSH2_CHANNEL_EXEC = 0;
const NET_SSH2_CHANNEL_SHELL = 1;
const NET_SSH2_LOG_SIMPLE = 1;
const NET_SSH2_LOG_COMPLEX = 2;
const NET_SSH2_LOG_REALTIME = 3;
const NET_SSH2_LOG_REALTIME_FILE = 4;
const NET_SSH2_READ_SIMPLE = 1;
const NET_SSH2_READ_REGEX = 2;
const NET_SSH2_LOG_MAX_SIZE = 1024 * 1024;

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
//Error information
//
//@see Net_SSH2::getErrors()
//@see Net_SSH2::getLastError()
//@var String
//@access private
//
//
//
//Server Identifier
//
//@see Net_SSH2::getServerIdentification()
//@var String
//@access private
//
//
//
//Key Exchange Algorithms
//
//@see Net_SSH2::getKexAlgorithims()
//@var Array
//@access private
//
//
//
//Server Host Key Algorithms
//
//@see Net_SSH2::getServerHostKeyAlgorithms()
//@var Array
//@access private
//
//
//
//Encryption Algorithms: Client to Server
//
//@see Net_SSH2::getEncryptionAlgorithmsClient2Server()
//@var Array
//@access private
//
//
//
//Encryption Algorithms: Server to Client
//
//@see Net_SSH2::getEncryptionAlgorithmsServer2Client()
//@var Array
//@access private
//
//
//
//MAC Algorithms: Client to Server
//
//@see Net_SSH2::getMACAlgorithmsClient2Server()
//@var Array
//@access private
//
//
//
//MAC Algorithms: Server to Client
//
//@see Net_SSH2::getMACAlgorithmsServer2Client()
//@var Array
//@access private
//
//
//
//Compression Algorithms: Client to Server
//
//@see Net_SSH2::getCompressionAlgorithmsClient2Server()
//@var Array
//@access private
//
//
//
//Compression Algorithms: Server to Client
//
//@see Net_SSH2::getCompressionAlgorithmsServer2Client()
//@var Array
//@access private
//
//
//
//Languages: Server to Client
//
//@see Net_SSH2::getLanguagesServer2Client()
//@var Array
//@access private
//
//
//
//Languages: Client to Server
//
//@see Net_SSH2::getLanguagesClient2Server()
//@var Array
//@access private
//
//
//
//Block Size for Server to Client Encryption
//
//"Note that the length of the concatenation of 'packet_length',
//'padding_length', 'payload', and 'random padding' MUST be a multiple
//of the cipher block size or 8, whichever is larger.  This constraint
//MUST be enforced, even when using stream ciphers."
//
//-- http://tools.ietf.org/html/rfc4253#section-6
//
//@see Net_SSH2::Net_SSH2()
//@see Net_SSH2::_send_binary_packet()
//@var Integer
//@access private
//
//
//
//Block Size for Client to Server Encryption
//
//@see Net_SSH2::Net_SSH2()
//@see Net_SSH2::_get_binary_packet()
//@var Integer
//@access private
//
//
//
//Server to Client Encryption Object
//
//@see Net_SSH2::_get_binary_packet()
//@var Object
//@access private
//
//
//
//Client to Server Encryption Object
//
//@see Net_SSH2::_send_binary_packet()
//@var Object
//@access private
//
//
//
//Client to Server HMAC Object
//
//@see Net_SSH2::_send_binary_packet()
//@var Object
//@access private
//
//
//
//Server to Client HMAC Object
//
//@see Net_SSH2::_get_binary_packet()
//@var Object
//@access private
//
//
//
//Size of server to client HMAC
//
//We need to know how big the HMAC will be for the server to client direction so that we know how many bytes to read.
//For the client to server side, the HMAC object will make the HMAC as long as it needs to be.  All we need to do is
//append it.
//
//@see Net_SSH2::_get_binary_packet()
//@var Integer
//@access private
//
//
//
//Server Public Host Key
//
//@see Net_SSH2::getServerPublicHostKey()
//@var String
//@access private
//
//
//
//Session identifer
//
//"The exchange hash H from the first key exchange is additionally
//used as the session identifier, which is a unique identifier for
//this connection."
//
//-- http://tools.ietf.org/html/rfc4253#section-7.2
//
//@see Net_SSH2::_key_exchange()
//@var String
//@access private
//
//
//
//Exchange hash
//
//The current exchange hash
//
//@see Net_SSH2::_key_exchange()
//@var String
//@access private
//
//
//
//Message Numbers
//
//@see Net_SSH2::Net_SSH2()
//@var Array
//@access private
//
//
//
//Disconnection Message 'reason codes' defined in RFC4253
//
//@see Net_SSH2::Net_SSH2()
//@var Array
//@access private
//
//
//
//SSH_MSG_CHANNEL_OPEN_FAILURE 'reason codes', defined in RFC4254
//
//@see Net_SSH2::Net_SSH2()
//@var Array
//@access private
//
//
//
//Terminal Modes
//
//@link http://tools.ietf.org/html/rfc4254#section-8
//@see Net_SSH2::Net_SSH2()
//@var Array
//@access private
//
//
//
//SSH_MSG_CHANNEL_EXTENDED_DATA's data_type_codes
//
//@link http://tools.ietf.org/html/rfc4254#section-5.2
//@see Net_SSH2::Net_SSH2()
//@var Array
//@access private
//
//
//
//Send Sequence Number
//
//See 'Section 6.4.  Data Integrity' of rfc4253 for more info.
//
//@see Net_SSH2::_send_binary_packet()
//@var Integer
//@access private
//
//
//
//Get Sequence Number
//
//See 'Section 6.4.  Data Integrity' of rfc4253 for more info.
//
//@see Net_SSH2::_get_binary_packet()
//@var Integer
//@access private
//
//
//
//Server Channels
//
//Maps client channels to server channels
//
//@see Net_SSH2::_get_channel_packet()
//@see Net_SSH2::exec()
//@var Array
//@access private
//
//
//
//Channel Buffers
//
//If a client requests a packet from one channel but receives two packets from another those packets should
//be placed in a buffer
//
//@see Net_SSH2::_get_channel_packet()
//@see Net_SSH2::exec()
//@var Array
//@access private
//
//
//
//Channel Status
//
//Contains the type of the last sent message
//
//@see Net_SSH2::_get_channel_packet()
//@var Array
//@access private
//
//
//
//Packet Size
//
//Maximum packet size indexed by channel
//
//@see Net_SSH2::_send_channel_packet()
//@var Array
//@access private
//
//
//
//Message Number Log
//
//@see Net_SSH2::getLog()
//@var Array
//@access private
//
//
//
//Message Log
//
//@see Net_SSH2::getLog()
//@var Array
//@access private
//
//
//
//The Window Size
//
//Bytes the other party can send before it must wait for the window to be adjusted (0x7FFFFFFF = 2GB)
//
//@var Integer
//@see Net_SSH2::_send_channel_packet()
//@see Net_SSH2::exec()
//@access private
//
//
//
//Window size
//
//Window size indexed by channel
//
//@see Net_SSH2::_send_channel_packet()
//@var Array
//@access private
//
//
//
//Server signature
//
//Verified against $this->session_id
//
//@see Net_SSH2::getServerPublicHostKey()
//@var String
//@access private
//
//
//
//Server signature format
//
//ssh-rsa or ssh-dss.
//
//@see Net_SSH2::getServerPublicHostKey()
//@var String
//@access private
//
//
//
//Interactive Buffer
//
//@see Net_SSH2::read()
//@var Array
//@access private
//
//
//
//Current log size
//
//Should never exceed NET_SSH2_LOG_MAX_SIZE
//
//@see Net_SSH2::_send_binary_packet()
//@see Net_SSH2::_get_binary_packet()
//@var Integer
//@access private
//
//
//
//Timeout
//
//@see Net_SSH2::setTimeout()
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
//Real-time log file pointer
//
//@see Net_SSH2::_append_log()
//@var Resource
//@access private
//
//
//
//Real-time log file size
//
//@see Net_SSH2::_append_log()
//@var Integer
//@access private
//
//
//
//Has the signature been validated?
//
//@see Net_SSH2::getServerPublicHostKey()
//@var Boolean
//@access private
//
//
//
//Real-time log file wrap boolean
//
//@see Net_SSH2::_append_log()
//@access private
//
//
//
//Flag to suppress stderr from output
//
//@see Net_SSH2::enableQuietMode()
//@access private
//
//
//
//Time of first network activity
//
//@access private
//
//
//
//Exit status returned from ssh if any
//
//@var Integer
//@access private
//
//
//
//Flag to request a PTY when using exec()
//
//@see Net_SSH2::enablePTY()
//@access private
//
//
//
//Flag set while exec() is running when using enablePTY()
//
//@access private
//
//
//
//Contents of stdError
//
//@access private
//
//
//
//The Last Interactive Response
//
//@see Net_SSH2::_keyboard_interactive_process()
//@access private
//
//
//
//Keyboard Interactive Request / Responses
//
//@see Net_SSH2::_keyboard_interactive_process()
//@access private
//
//
//
//Banner Message
//
//Quoting from the RFC, "in some jurisdictions, sending a warning message before
//authentication may be relevant for getting legal protection."
//
//@see Net_SSH2::_filter()
//@see Net_SSH2::getBannerMessage()
//@access private
//
//
//
//Did read() timeout or return normally?
//
//@see Net_SSH2::isTimeout
//@access private
//
//
//
//Default Constructor.
//
//Connects to an SSHv2 server
//
//@param String $host
//@param optional Integer $port
//@param optional Integer $timeout
//@return Net_SSH2
//@access public
//
//
//
//Key Exchange
//
//@param String $kexinit_payload_server
//@access private
//
//
//
//Login
//
//The $password parameter can be a plaintext password, a Crypt_RSA object or an array
//
//@param String $username
//@param Mixed $password
//@param Mixed $...
//@return Boolean
//@see _login_helper
//@access public
//
//
//
//Login Helper
//
//@param String $username
//@param optional String $password
//@return Boolean
//@access private
//@internal It might be worthwhile, at some point, to protect against {@link http://tools.ietf.org/html/rfc4251#section-9.3.9 traffic analysis}
//by sending dummy SSH_MSG_IGNORE messages.
//
//
//
//Login via keyboard-interactive authentication
//
//See {@link http://tools.ietf.org/html/rfc4256 RFC4256} for details.  This is not a full-featured keyboard-interactive authenticator.
//
//@param String $username
//@param String $password
//@return Boolean
//@access private
//
//
//
//Handle the keyboard-interactive requests / responses.
//
//@param String $responses...
//@return Boolean
//@access private
//
//
//
//Login with an RSA private key
//
//@param String $username
//@param Crypt_RSA $password
//@return Boolean
//@access private
//@internal It might be worthwhile, at some point, to protect against {@link http://tools.ietf.org/html/rfc4251#section-9.3.9 traffic analysis}
//by sending dummy SSH_MSG_IGNORE messages.
//
//
//
//Set Timeout
//
//$ssh->exec('ping 127.0.0.1'); on a Linux host will never return and will run indefinitely.  setTimeout() makes it so it'll timeout.
//Setting $timeout to false or 0 will mean there is no timeout.
//
//@param Mixed $timeout
//@access public
//
//
//
//Get the output from stdError
//
//@access public
//
//
//
//Execute Command
//
//If $block is set to false then Net_SSH2::_get_channel_packet(NET_SSH2_CHANNEL_EXEC) will need to be called manually.
//In all likelihood, this is not a feature you want to be taking advantage of.
//
//@param String $command
//@param optional Boolean $block
//@return String
//@access public
//
//
//
//Creates an interactive shell
//
//@see Net_SSH2::read()
//@see Net_SSH2::write()
//@return Boolean
//@access private
//
//
//
//Returns the output of an interactive shell
//
//Returns when there's a match for $expect, which can take the form of a string literal or,
//if $mode == NET_SSH2_READ_REGEX, a regular expression.
//
//@see Net_SSH2::read()
//@param String $expect
//@param Integer $mode
//@return String
//@access public
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
//Closes a channel
//
//If read() timed out you might want to just close the channel and have it auto-restart on the next read() call
//
//@access public
//
//
//
//Is timeout?
//
//Did exec() or read() return because they timed out or because they encountered the end?
//
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
//Is the connection still active?
//
//@access public
//
//
//
//Gets Binary Packets
//
//See '6. Binary Packet Protocol' of rfc4253 for more info.
//
//@see Net_SSH2::_send_binary_packet()
//@return String
//@access private
//
//
//
//Filter Binary Packets
//
//Because some binary packets need to be ignored...
//
//@see Net_SSH2::_get_binary_packet()
//@return String
//@access private
//
//
//
//Enable Quiet Mode
//
//Suppress stderr from output
//
//@access public
//
//
//
//Disable Quiet Mode
//
//Show stderr in output
//
//@access public
//
//
//
//Enable request-pty when using exec()
//
//@access public
//
//
//
//Disable request-pty when using exec()
//
//@access public
//
//
//
//Gets channel data
//
//Returns the data as a string if it's available and false if not.
//
//@param $client_channel
//@return Mixed
//@access private
//
//
//
//Sends Binary Packets
//
//See '6. Binary Packet Protocol' of rfc4253 for more info.
//
//@param String $data
//@see Net_SSH2::_get_binary_packet()
//@return Boolean
//@access private
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
//
//Sends channel data
//
//Spans multiple SSH_MSG_CHANNEL_DATAs if appropriate
//
//@param Integer $client_channel
//@param String $data
//@return Boolean
//@access private
//
//
//
//Closes and flushes a channel
//
//Net_SSH2 doesn't properly close most channels.  For exec() channels are normally closed by the server
//and for SFTP channels are presumably closed when the client disconnects.  This functions is intended
//for SCP more than anything.
//
//@param Integer $client_channel
//@return Boolean
//@access private
//
//
//
//Disconnect
//
//@param Integer $reason
//@return Boolean
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
//Returns all errors
//
//@return String
//@access public
//
//
//
//Returns the last error
//
//@return String
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
//Return a list of the key exchange algorithms the server supports.
//
//@return Array
//@access public
//
//
//
//Return a list of the host key (public key) algorithms the server supports.
//
//@return Array
//@access public
//
//
//
//Return a list of the (symmetric key) encryption algorithms the server supports, when receiving stuff from the client.
//
//@return Array
//@access public
//
//
//
//Return a list of the (symmetric key) encryption algorithms the server supports, when sending stuff to the client.
//
//@return Array
//@access public
//
//
//
//Return a list of the MAC algorithms the server supports, when receiving stuff from the client.
//
//@return Array
//@access public
//
//
//
//Return a list of the MAC algorithms the server supports, when sending stuff to the client.
//
//@return Array
//@access public
//
//
//
//Return a list of the compression algorithms the server supports, when receiving stuff from the client.
//
//@return Array
//@access public
//
//
//
//Return a list of the compression algorithms the server supports, when sending stuff to the client.
//
//@return Array
//@access public
//
//
//
//Return a list of the languages the server supports, when sending stuff to the client.
//
//@return Array
//@access public
//
//
//
//Return a list of the languages the server supports, when receiving stuff from the client.
//
//@return Array
//@access public
//
//
//
//Returns the banner message.
//
//Quoting from the RFC, "in some jurisdictions, sending a warning message before
//authentication may be relevant for getting legal protection."
//
//@return String
//@access public
//
//
//
//Returns the server public host key.
//
//Caching this the first time you connect to a server and checking the result on subsequent connections
//is recommended.  Returns false if the server signature is not signed correctly with the public host key.
//
//@return Mixed
//@access public
//
//
//
//Returns the exit status of an SSH command or false.
//
//@return Integer or false
//@access public
//
//
class Net_SSH2 {
    constructor() {
        this.identifier = "SSH-2.0-phpseclib_0.3";
        this.bitmap = 0;
        this.errors = Array();
        this.server_identifier = "";
        this.encrypt_block_size = 8;
        this.decrypt_block_size = 8;
        this.decrypt = false;
        this.encrypt = false;
        this.hmac_create = false;
        this.hmac_check = false;
        this.hmac_size = false;
        this.session_id = false;
        this.exchange_hash = false;
        this.message_numbers = Array();
        this.disconnect_reasons = Array();
        this.channel_open_failure_reasons = Array();
        this.terminal_modes = Array();
        this.channel_extended_data_type_codes = Array();
        this.send_seq_no = 0;
        this.get_seq_no = 0;
        this.server_channels = Array();
        this.channel_buffers = Array();
        this.channel_status = Array();
        this.packet_size_client_to_server = Array();
        this.message_number_log = Array();
        this.message_log = Array();
        this.window_size = 2147483647;
        this.window_size_server_to_client = Array();
        this.signature = "";
        this.signature_format = "";
        this.interactiveBuffer = "";
        this.signature_validated = false;
        this.quiet_mode = false;
        this.request_pty = false;
        this.in_request_pty_exec = false;
        this.last_interactive_response = "";
        this.keyboard_requests_responses = Array();
        this.banner_message = "";
        this.is_timeout = false;
    }

    Net_SSH2(host, port = 22, timeout = 10) //Include Math_BigInteger
    //Used to do Diffie-Hellman key exchange and DSA/RSA signature verification.
    //== microtime(true) in PHP5
    //http://php.net/microtime#61838
    //on windows this returns a "Warning: Invalid CRT parameters detected" error
    //the !count() is done as a workaround for <https://bugs.php.net/42682>
    {
        if (!("function" === typeof Math_BigInteger)) {
            require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Math/BigInteger.php");
        }

        if (!("function" === typeof crypt_random_string)) {
            require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Random.php");
        }

        if (!("function" === typeof Crypt_Hash)) {
            require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Hash.php");
        }

        this.last_packet = strtok(Date.now() / 1000, " ") + strtok("");
        this.message_numbers = {
            1: "NET_SSH2_MSG_DISCONNECT",
            2: "NET_SSH2_MSG_IGNORE",
            3: "NET_SSH2_MSG_UNIMPLEMENTED",
            4: "NET_SSH2_MSG_DEBUG",
            5: "NET_SSH2_MSG_SERVICE_REQUEST",
            6: "NET_SSH2_MSG_SERVICE_ACCEPT",
            20: "NET_SSH2_MSG_KEXINIT",
            21: "NET_SSH2_MSG_NEWKEYS",
            30: "NET_SSH2_MSG_KEXDH_INIT",
            31: "NET_SSH2_MSG_KEXDH_REPLY",
            50: "NET_SSH2_MSG_USERAUTH_REQUEST",
            51: "NET_SSH2_MSG_USERAUTH_FAILURE",
            52: "NET_SSH2_MSG_USERAUTH_SUCCESS",
            53: "NET_SSH2_MSG_USERAUTH_BANNER",
            80: "NET_SSH2_MSG_GLOBAL_REQUEST",
            81: "NET_SSH2_MSG_REQUEST_SUCCESS",
            82: "NET_SSH2_MSG_REQUEST_FAILURE",
            90: "NET_SSH2_MSG_CHANNEL_OPEN",
            91: "NET_SSH2_MSG_CHANNEL_OPEN_CONFIRMATION",
            92: "NET_SSH2_MSG_CHANNEL_OPEN_FAILURE",
            93: "NET_SSH2_MSG_CHANNEL_WINDOW_ADJUST",
            94: "NET_SSH2_MSG_CHANNEL_DATA",
            95: "NET_SSH2_MSG_CHANNEL_EXTENDED_DATA",
            96: "NET_SSH2_MSG_CHANNEL_EOF",
            97: "NET_SSH2_MSG_CHANNEL_CLOSE",
            98: "NET_SSH2_MSG_CHANNEL_REQUEST",
            99: "NET_SSH2_MSG_CHANNEL_SUCCESS",
            100: "NET_SSH2_MSG_CHANNEL_FAILURE"
        };
        this.disconnect_reasons = {
            1: "NET_SSH2_DISCONNECT_HOST_NOT_ALLOWED_TO_CONNECT",
            2: "NET_SSH2_DISCONNECT_PROTOCOL_ERROR",
            3: "NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED",
            4: "NET_SSH2_DISCONNECT_RESERVED",
            5: "NET_SSH2_DISCONNECT_MAC_ERROR",
            6: "NET_SSH2_DISCONNECT_COMPRESSION_ERROR",
            7: "NET_SSH2_DISCONNECT_SERVICE_NOT_AVAILABLE",
            8: "NET_SSH2_DISCONNECT_PROTOCOL_VERSION_NOT_SUPPORTED",
            9: "NET_SSH2_DISCONNECT_HOST_KEY_NOT_VERIFIABLE",
            10: "NET_SSH2_DISCONNECT_CONNECTION_LOST",
            11: "NET_SSH2_DISCONNECT_BY_APPLICATION",
            12: "NET_SSH2_DISCONNECT_TOO_MANY_CONNECTIONS",
            13: "NET_SSH2_DISCONNECT_AUTH_CANCELLED_BY_USER",
            14: "NET_SSH2_DISCONNECT_NO_MORE_AUTH_METHODS_AVAILABLE",
            15: "NET_SSH2_DISCONNECT_ILLEGAL_USER_NAME"
        };
        this.channel_open_failure_reasons = {
            1: "NET_SSH2_OPEN_ADMINISTRATIVELY_PROHIBITED"
        };
        this.terminal_modes = {
            0: "NET_SSH2_TTY_OP_END"
        };
        this.channel_extended_data_type_codes = {
            1: "NET_SSH2_EXTENDED_DATA_STDERR"
        };

        this._define_array(this.message_numbers, this.disconnect_reasons, this.channel_open_failure_reasons, this.terminal_modes, this.channel_extended_data_type_codes, {
            60: "NET_SSH2_MSG_USERAUTH_PASSWD_CHANGEREQ"
        }, {
            60: "NET_SSH2_MSG_USERAUTH_PK_OK"
        }, {
            60: "NET_SSH2_MSG_USERAUTH_INFO_REQUEST",
            61: "NET_SSH2_MSG_USERAUTH_INFO_RESPONSE"
        });

        var start = strtok(Date.now() / 1000, " ") + strtok("");
        this.fsock = fsockopen(host, port, errno, errstr, timeout);

        if (!this.fsock) {
            user_error(rtrim(`Cannot connect to ${host}. Error ${errno}. ${errstr}`));
            return;
        }

        var elapsed = strtok(Date.now() / 1000, " ") + strtok("") - start;
        timeout -= elapsed;

        if (timeout <= 0) {
            user_error(rtrim(`Cannot connect to ${host}. Timeout error`));
            return;
        }

        var read = [this.fsock];
        var write = except = undefined;
        var sec = Math.floor(timeout);
        var usec = 1000000 * (timeout - sec);

        if (!(stream_select(read, write, except, sec, usec) && !read.length)) {
            user_error(rtrim(`Cannot connect to ${host}. Banner timeout`));
            return;
        }

        var temp = "";
        var extra = "";

        while (!feof(this.fsock) && !preg_match("#^SSH-(\\d\\.\\d+)#", temp, matches)) {
            if (temp.substr(-2) == "\r\n") {
                extra += temp;
                temp = "";
            }

            temp += fgets(this.fsock, 255);
        }

        if (feof(this.fsock)) {
            user_error("Connection closed by server");
            return false;
        }

        var ext = Array();

        if (extension_loaded("mcrypt")) {
            ext.push("mcrypt");
        }

        if (extension_loaded("gmp")) {
            ext.push("gmp");
        } else if (extension_loaded("bcmath")) {
            ext.push("bcmath");
        }

        if (!!ext) {
            this.identifier += " (" + ext.join(", ") + ")";
        }

        if ("undefined" !== typeof NET_SSH2_LOGGING) {
            this._append_log("<-", extra + temp);

            this._append_log("->", this.identifier + "\r\n");
        }

        this.server_identifier = trim(temp, "\r\n");

        if (extra.length) {
            this.errors.push(utf8_decode(extra));
        }

        if (matches[1] != "1.99" && matches[1] != "2.0") {
            user_error(`Cannot connect to SSH ${matches[1]} servers`);
            return;
        }

        fputs(this.fsock, this.identifier + "\r\n");

        var response = this._get_binary_packet();

        if (response === false) {
            user_error("Connection closed by server");
            return;
        }

        if (response.charCodeAt(0) != NET_SSH2_MSG_KEXINIT) {
            user_error("Expected SSH_MSG_KEXINIT");
            return;
        }

        if (!this._key_exchange(response)) {
            return;
        }

        this.bitmap = NET_SSH2_MASK_CONSTRUCTOR;
    }

    _key_exchange(kexinit_payload_server) //some SSH servers have buggy implementations of some of the above algorithms
    //skip past the message number (it should be SSH_MSG_KEXINIT)
    //the sending of SSH2_MSG_KEXINIT could go in one of two places.  this is the second place.
    //through diffie-hellman key exchange a symmetric key is obtained
    //$q = $p->bitwise_rightShift(1);
    //To increase the speed of the key exchange, both client and server may
    //           reduce the size of their private exponents.  It should be at least
    //           twice as long as the key material that is generated from the shared
    //           secret.  For more details, see the paper by van Oorschot and Wiener
    //           [VAN-OORSCHOT].
    //           -- http://tools.ietf.org/html/rfc4419#section-6.2
    //2 * 8 * $keyLength
    //ie. $mac_algorithms[$i] == 'none'
    {
        if (!("_static_Net_SSH2__key_exchange_kex_algorithms" in global)) _static_Net_SSH2__key_exchange_kex_algorithms = ["diffie-hellman-group1-sha1", "diffie-hellman-group14-sha1"];
        if (!("_static_Net_SSH2__key_exchange_server_host_key_algorithms" in global)) _static_Net_SSH2__key_exchange_server_host_key_algorithms = ["ssh-rsa", "ssh-dss"];
        if (!("_static_Net_SSH2__key_exchange_encryption_algorithms" in global)) _static_Net_SSH2__key_exchange_encryption_algorithms = ["arcfour256", "arcfour128", "arcfour", "aes128-ctr", "aes192-ctr", "aes256-ctr", "blowfish-ctr", "twofish128-ctr", "twofish192-ctr", "twofish256-ctr", "aes128-cbc", "aes192-cbc", "aes256-cbc", "blowfish-cbc", "twofish128-cbc", "twofish192-cbc", "twofish256-cbc", "twofish-cbc", "3des-ctr", "3des-cbc", "none"];
        if (!("_static_Net_SSH2__key_exchange_mac_algorithms" in global)) _static_Net_SSH2__key_exchange_mac_algorithms = ["hmac-sha1-96", "hmac-sha1", "hmac-md5-96", "hmac-md5", "none"];
        if (!("_static_Net_SSH2__key_exchange_compression_algorithms" in global)) _static_Net_SSH2__key_exchange_compression_algorithms = ["none"];

        switch (this.server_identifier) {
            case "SSH-2.0-SSHD":
                _static_Net_SSH2__key_exchange_mac_algorithms = Object.values(array_diff(_static_Net_SSH2__key_exchange_mac_algorithms, ["hmac-sha1-96", "hmac-md5-96"]));
        }

        {
            if (!("_static_Net_SSH2__key_exchange_str_kex_algorithms" in global)) _static_Net_SSH2__key_exchange_str_kex_algorithms = undefined;
            if (!("_static_Net_SSH2__key_exchange_str_server_host_key_algorithms" in global)) _static_Net_SSH2__key_exchange_str_server_host_key_algorithms = undefined;
            if (!("_static_Net_SSH2__key_exchange_encryption_algorithms_server_to_client" in global)) _static_Net_SSH2__key_exchange_encryption_algorithms_server_to_client = undefined;
            if (!("_static_Net_SSH2__key_exchange_mac_algorithms_server_to_client" in global)) _static_Net_SSH2__key_exchange_mac_algorithms_server_to_client = undefined;
            if (!("_static_Net_SSH2__key_exchange_compression_algorithms_server_to_client" in global)) _static_Net_SSH2__key_exchange_compression_algorithms_server_to_client = undefined;
            if (!("_static_Net_SSH2__key_exchange_encryption_algorithms_client_to_server" in global)) _static_Net_SSH2__key_exchange_encryption_algorithms_client_to_server = undefined;
            if (!("_static_Net_SSH2__key_exchange_mac_algorithms_client_to_server" in global)) _static_Net_SSH2__key_exchange_mac_algorithms_client_to_server = undefined;
            if (!("_static_Net_SSH2__key_exchange_compression_algorithms_client_to_server" in global)) _static_Net_SSH2__key_exchange_compression_algorithms_client_to_server = undefined;
        }

        if (!_static_Net_SSH2__key_exchange_str_kex_algorithms) {
            _static_Net_SSH2__key_exchange_str_kex_algorithms = _static_Net_SSH2__key_exchange_kex_algorithms.join(",");
            _static_Net_SSH2__key_exchange_str_server_host_key_algorithms = _static_Net_SSH2__key_exchange_server_host_key_algorithms.join(",");
            _static_Net_SSH2__key_exchange_encryption_algorithms_server_to_client = _static_Net_SSH2__key_exchange_encryption_algorithms_client_to_server = _static_Net_SSH2__key_exchange_encryption_algorithms.join(",");
            _static_Net_SSH2__key_exchange_mac_algorithms_server_to_client = _static_Net_SSH2__key_exchange_mac_algorithms_client_to_server = _static_Net_SSH2__key_exchange_mac_algorithms.join(",");
            _static_Net_SSH2__key_exchange_compression_algorithms_server_to_client = _static_Net_SSH2__key_exchange_compression_algorithms_client_to_server = _static_Net_SSH2__key_exchange_compression_algorithms.join(",");
        }

        var client_cookie = crypt_random_string(16);
        var response = kexinit_payload_server;

        this._string_shift(response, 1);

        var server_cookie = this._string_shift(response, 16);

        var temp = unpack("Nlength", this._string_shift(response, 4));
        this.kex_algorithms = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.server_host_key_algorithms = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.encryption_algorithms_client_to_server = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.encryption_algorithms_server_to_client = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.mac_algorithms_client_to_server = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.mac_algorithms_server_to_client = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.compression_algorithms_client_to_server = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.compression_algorithms_server_to_client = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.languages_client_to_server = this._string_shift(response, temp.length).split(",");
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.languages_server_to_client = this._string_shift(response, temp.length).split(",");
        extract(unpack("Cfirst_kex_packet_follows", this._string_shift(response, 1)));
        var first_kex_packet_follows = first_kex_packet_follows != 0;
        var kexinit_payload_client = pack("Ca*Na*Na*Na*Na*Na*Na*Na*Na*Na*Na*CN", NET_SSH2_MSG_KEXINIT, client_cookie, _static_Net_SSH2__key_exchange_str_kex_algorithms.length, _static_Net_SSH2__key_exchange_str_kex_algorithms, _static_Net_SSH2__key_exchange_str_server_host_key_algorithms.length, _static_Net_SSH2__key_exchange_str_server_host_key_algorithms, _static_Net_SSH2__key_exchange_encryption_algorithms_client_to_server.length, _static_Net_SSH2__key_exchange_encryption_algorithms_client_to_server, _static_Net_SSH2__key_exchange_encryption_algorithms_server_to_client.length, _static_Net_SSH2__key_exchange_encryption_algorithms_server_to_client, _static_Net_SSH2__key_exchange_mac_algorithms_client_to_server.length, _static_Net_SSH2__key_exchange_mac_algorithms_client_to_server, _static_Net_SSH2__key_exchange_mac_algorithms_server_to_client.length, _static_Net_SSH2__key_exchange_mac_algorithms_server_to_client, _static_Net_SSH2__key_exchange_compression_algorithms_client_to_server.length, _static_Net_SSH2__key_exchange_compression_algorithms_client_to_server, _static_Net_SSH2__key_exchange_compression_algorithms_server_to_client.length, _static_Net_SSH2__key_exchange_compression_algorithms_server_to_client, 0, "", 0, "", 0, 0);

        if (!this._send_binary_packet(kexinit_payload_client)) {
            return false;
        }

        for (var i = 0; i < _static_Net_SSH2__key_exchange_encryption_algorithms.length && !(-1 !== this.encryption_algorithms_server_to_client.indexOf(_static_Net_SSH2__key_exchange_encryption_algorithms[i])); i++)

        if (i == _static_Net_SSH2__key_exchange_encryption_algorithms.length) {
            user_error("No compatible server to client encryption algorithms found");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        var decrypt = _static_Net_SSH2__key_exchange_encryption_algorithms[i];

        switch (decrypt) {
            case "3des-cbc":
            case "3des-ctr":
                var decryptKeyLength = 24;
                break;

            case "aes256-cbc":
            case "aes256-ctr":
            case "twofish-cbc":
            case "twofish256-cbc":
            case "twofish256-ctr":
                decryptKeyLength = 32;
                break;

            case "aes192-cbc":
            case "aes192-ctr":
            case "twofish192-cbc":
            case "twofish192-ctr":
                decryptKeyLength = 24;
                break;

            case "aes128-cbc":
            case "aes128-ctr":
            case "twofish128-cbc":
            case "twofish128-ctr":
            case "blowfish-cbc":
            case "blowfish-ctr":
                decryptKeyLength = 16;
                break;

            case "arcfour":
            case "arcfour128":
                decryptKeyLength = 16;
                break;

            case "arcfour256":
                decryptKeyLength = 32;
                break;

            case "none":
                decryptKeyLength = 0;
        }

        for (i = 0;; i < _static_Net_SSH2__key_exchange_encryption_algorithms.length && !(-1 !== this.encryption_algorithms_client_to_server.indexOf(_static_Net_SSH2__key_exchange_encryption_algorithms[i])); i++)

        if (i == _static_Net_SSH2__key_exchange_encryption_algorithms.length) {
            user_error("No compatible client to server encryption algorithms found");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        var encrypt = _static_Net_SSH2__key_exchange_encryption_algorithms[i];

        switch (encrypt) {
            case "3des-cbc":
            case "3des-ctr":
                var encryptKeyLength = 24;
                break;

            case "aes256-cbc":
            case "aes256-ctr":
            case "twofish-cbc":
            case "twofish256-cbc":
            case "twofish256-ctr":
                encryptKeyLength = 32;
                break;

            case "aes192-cbc":
            case "aes192-ctr":
            case "twofish192-cbc":
            case "twofish192-ctr":
                encryptKeyLength = 24;
                break;

            case "aes128-cbc":
            case "aes128-ctr":
            case "twofish128-cbc":
            case "twofish128-ctr":
            case "blowfish-cbc":
            case "blowfish-ctr":
                encryptKeyLength = 16;
                break;

            case "arcfour":
            case "arcfour128":
                encryptKeyLength = 16;
                break;

            case "arcfour256":
                encryptKeyLength = 32;
                break;

            case "none":
                encryptKeyLength = 0;
        }

        var keyLength = decryptKeyLength > encryptKeyLength ? decryptKeyLength : encryptKeyLength;

        for (i = 0;; i < _static_Net_SSH2__key_exchange_kex_algorithms.length && !(-1 !== this.kex_algorithms.indexOf(_static_Net_SSH2__key_exchange_kex_algorithms[i])); i++)

        if (i == _static_Net_SSH2__key_exchange_kex_algorithms.length) {
            user_error("No compatible key exchange algorithms found");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        switch (_static_Net_SSH2__key_exchange_kex_algorithms[i]) {
            case "diffie-hellman-group1-sha1":
                var prime = "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74" + "020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F1437" + "4FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7ED" + "EE386BFB5A899FA5AE9F24117C4B1FE649286651ECE65381FFFFFFFFFFFFFFFF";
                break;

            case "diffie-hellman-group14-sha1":
                prime = "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74" + "020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F1437" + "4FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7ED" + "EE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF05" + "98DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB" + "9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3B" + "E39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF695581718" + "3995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF";
                break;
        }

        var g = new Math_BigInteger(2);
        prime = new Math_BigInteger(prime, 16);
        var kexHash = new Crypt_Hash("sha1");
        var one = new Math_BigInteger(1);
        keyLength = Math.min(keyLength, kexHash.getLength());
        var max = one.bitwise_leftShift(16 * keyLength).subtract(one);
        var x = one.random(one, max);
        var e = g.modPow(x, prime);
        var eBytes = e.toBytes(true);
        var data = pack("CNa*", NET_SSH2_MSG_KEXDH_INIT, eBytes.length, eBytes);

        if (!this._send_binary_packet(data)) {
            user_error("Connection closed by server");
            return false;
        }

        response = this._get_binary_packet();

        if (response === false) {
            user_error("Connection closed by server");
            return false;
        }

        extract(unpack("Ctype", this._string_shift(response, 1)));

        if (type != NET_SSH2_MSG_KEXDH_REPLY) {
            user_error("Expected SSH_MSG_KEXDH_REPLY");
            return false;
        }

        temp = unpack("Nlength", this._string_shift(response, 4));
        this.server_public_host_key = server_public_host_key = this._string_shift(response, temp.length);
        temp = unpack("Nlength", this._string_shift(server_public_host_key, 4));

        var public_key_format = this._string_shift(server_public_host_key, temp.length);

        temp = unpack("Nlength", this._string_shift(response, 4));

        var fBytes = this._string_shift(response, temp.length);

        var f = new Math_BigInteger(fBytes, -256);
        temp = unpack("Nlength", this._string_shift(response, 4));
        this.signature = this._string_shift(response, temp.length);
        temp = unpack("Nlength", this._string_shift(this.signature, 4));
        this.signature_format = this._string_shift(this.signature, temp.length);
        var key = f.modPow(x, prime);
        var keyBytes = key.toBytes(true);
        this.exchange_hash = pack("Na*Na*Na*Na*Na*Na*Na*Na*", this.identifier.length, this.identifier, this.server_identifier.length, this.server_identifier, kexinit_payload_client.length, kexinit_payload_client, kexinit_payload_server.length, kexinit_payload_server, this.server_public_host_key.length, this.server_public_host_key, eBytes.length, eBytes, fBytes.length, fBytes, keyBytes.length, keyBytes);
        this.exchange_hash = kexHash.hash(this.exchange_hash);

        if (this.session_id === false) {
            this.session_id = this.exchange_hash;
        }

        for (i = 0;; i < _static_Net_SSH2__key_exchange_server_host_key_algorithms.length && !(-1 !== this.server_host_key_algorithms.indexOf(_static_Net_SSH2__key_exchange_server_host_key_algorithms[i])); i++)

        if (i == _static_Net_SSH2__key_exchange_server_host_key_algorithms.length) {
            user_error("No compatible server host key algorithms found");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        if (public_key_format != _static_Net_SSH2__key_exchange_server_host_key_algorithms[i] || this.signature_format != _static_Net_SSH2__key_exchange_server_host_key_algorithms[i]) {
            user_error("Server Host Key Algorithm Mismatch");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        var packet = pack("C", NET_SSH2_MSG_NEWKEYS);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        response = this._get_binary_packet();

        if (response === false) {
            user_error("Connection closed by server");
            return false;
        }

        extract(unpack("Ctype", this._string_shift(response, 1)));

        if (type != NET_SSH2_MSG_NEWKEYS) {
            user_error("Expected SSH_MSG_NEWKEYS");
            return false;
        }

        switch (encrypt) {
            case "3des-cbc":
                if (!("function" === typeof Crypt_TripleDES)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/TripleDES.php");
                }

                this.encrypt = new Crypt_TripleDES();
                break;

            case "3des-ctr":
                if (!("function" === typeof Crypt_TripleDES)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/TripleDES.php");
                }

                this.encrypt = new Crypt_TripleDES(CRYPT_DES_MODE_CTR);
                break;

            case "aes256-cbc":
            case "aes192-cbc":
            case "aes128-cbc":
                if (!("function" === typeof Crypt_AES)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/AES.php");
                }

                this.encrypt = new Crypt_AES();
                this.encrypt_block_size = 16;
                break;

            case "aes256-ctr":
            case "aes192-ctr":
            case "aes128-ctr":
                if (!("function" === typeof Crypt_AES)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/AES.php");
                }

                this.encrypt = new Crypt_AES(CRYPT_AES_MODE_CTR);
                this.encrypt_block_size = 16;
                break;

            case "blowfish-cbc":
                if (!("function" === typeof Crypt_Blowfish)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Blowfish.php");
                }

                this.encrypt = new Crypt_Blowfish();
                this.encrypt_block_size = 8;
                break;

            case "blowfish-ctr":
                if (!("function" === typeof Crypt_Blowfish)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Blowfish.php");
                }

                this.encrypt = new Crypt_Blowfish(CRYPT_BLOWFISH_MODE_CTR);
                this.encrypt_block_size = 8;
                break;

            case "twofish128-cbc":
            case "twofish192-cbc":
            case "twofish256-cbc":
            case "twofish-cbc":
                if (!("function" === typeof Crypt_Twofish)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Twofish.php");
                }

                this.encrypt = new Crypt_Twofish();
                this.encrypt_block_size = 16;
                break;

            case "twofish128-ctr":
            case "twofish192-ctr":
            case "twofish256-ctr":
                if (!("function" === typeof Crypt_Twofish)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Twofish.php");
                }

                this.encrypt = new Crypt_Twofish(CRYPT_TWOFISH_MODE_CTR);
                this.encrypt_block_size = 16;
                break;

            case "arcfour":
            case "arcfour128":
            case "arcfour256":
                if (!("function" === typeof Crypt_RC4)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/RC4.php");
                }

                this.encrypt = new Crypt_RC4();
                break;

            case "none":}

        switch (decrypt) {
            case "3des-cbc":
                if (!("function" === typeof Crypt_TripleDES)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/TripleDES.php");
                }

                this.decrypt = new Crypt_TripleDES();
                break;

            case "3des-ctr":
                if (!("function" === typeof Crypt_TripleDES)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/TripleDES.php");
                }

                this.decrypt = new Crypt_TripleDES(CRYPT_DES_MODE_CTR);
                break;

            case "aes256-cbc":
            case "aes192-cbc":
            case "aes128-cbc":
                if (!("function" === typeof Crypt_AES)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/AES.php");
                }

                this.decrypt = new Crypt_AES();
                this.decrypt_block_size = 16;
                break;

            case "aes256-ctr":
            case "aes192-ctr":
            case "aes128-ctr":
                if (!("function" === typeof Crypt_AES)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/AES.php");
                }

                this.decrypt = new Crypt_AES(CRYPT_AES_MODE_CTR);
                this.decrypt_block_size = 16;
                break;

            case "blowfish-cbc":
                if (!("function" === typeof Crypt_Blowfish)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Blowfish.php");
                }

                this.decrypt = new Crypt_Blowfish();
                this.decrypt_block_size = 8;
                break;

            case "blowfish-ctr":
                if (!("function" === typeof Crypt_Blowfish)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Blowfish.php");
                }

                this.decrypt = new Crypt_Blowfish(CRYPT_BLOWFISH_MODE_CTR);
                this.decrypt_block_size = 8;
                break;

            case "twofish128-cbc":
            case "twofish192-cbc":
            case "twofish256-cbc":
            case "twofish-cbc":
                if (!("function" === typeof Crypt_Twofish)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Twofish.php");
                }

                this.decrypt = new Crypt_Twofish();
                this.decrypt_block_size = 16;
                break;

            case "twofish128-ctr":
            case "twofish192-ctr":
            case "twofish256-ctr":
                if (!("function" === typeof Crypt_Twofish)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/Twofish.php");
                }

                this.decrypt = new Crypt_Twofish(CRYPT_TWOFISH_MODE_CTR);
                this.decrypt_block_size = 16;
                break;

            case "arcfour":
            case "arcfour128":
            case "arcfour256":
                if (!("function" === typeof Crypt_RC4)) {
                    require("/brqx/base/rcode/com/gen/v0_0_1/rphp/objects/phpseclib/Crypt/RC4.php");
                }

                this.decrypt = new Crypt_RC4();
                break;

            case "none":}

        keyBytes = pack("Na*", keyBytes.length, keyBytes);

        if (this.encrypt) {
            this.encrypt.enableContinuousBuffer();
            this.encrypt.disablePadding();
            var iv = kexHash.hash(keyBytes + this.exchange_hash + "A" + this.session_id);

            while (this.encrypt_block_size > iv.length) {
                iv += kexHash.hash(keyBytes + this.exchange_hash + iv);
            }

            this.encrypt.setIV(iv.substr(0, this.encrypt_block_size));
            key = kexHash.hash(keyBytes + this.exchange_hash + "C" + this.session_id);

            while (encryptKeyLength > key.length) {
                key += kexHash.hash(keyBytes + this.exchange_hash + key);
            }

            this.encrypt.setKey(key.substr(0, encryptKeyLength));
        }

        if (this.decrypt) {
            this.decrypt.enableContinuousBuffer();
            this.decrypt.disablePadding();
            iv = kexHash.hash(keyBytes + this.exchange_hash + "B" + this.session_id);

            while (this.decrypt_block_size > iv.length) {
                iv += kexHash.hash(keyBytes + this.exchange_hash + iv);
            }

            this.decrypt.setIV(iv.substr(0, this.decrypt_block_size));
            key = kexHash.hash(keyBytes + this.exchange_hash + "D" + this.session_id);

            while (decryptKeyLength > key.length) {
                key += kexHash.hash(keyBytes + this.exchange_hash + key);
            }

            this.decrypt.setKey(key.substr(0, decryptKeyLength));
        }

        if (encrypt == "arcfour128" || encrypt == "arcfour256") {
            this.encrypt.encrypt(str_repeat("\\0", 1536));
        }

        if (decrypt == "arcfour128" || decrypt == "arcfour256") {
            this.decrypt.decrypt(str_repeat("\\0", 1536));
        }

        for (i = 0;; i < _static_Net_SSH2__key_exchange_mac_algorithms.length && !(-1 !== this.mac_algorithms_client_to_server.indexOf(_static_Net_SSH2__key_exchange_mac_algorithms[i])); i++)

        if (i == _static_Net_SSH2__key_exchange_mac_algorithms.length) {
            user_error("No compatible client to server message authentication algorithms found");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        var createKeyLength = 0;

        switch (_static_Net_SSH2__key_exchange_mac_algorithms[i]) {
            case "hmac-sha1":
                this.hmac_create = new Crypt_Hash("sha1");
                createKeyLength = 20;
                break;

            case "hmac-sha1-96":
                this.hmac_create = new Crypt_Hash("sha1-96");
                createKeyLength = 20;
                break;

            case "hmac-md5":
                this.hmac_create = new Crypt_Hash("md5");
                createKeyLength = 16;
                break;

            case "hmac-md5-96":
                this.hmac_create = new Crypt_Hash("md5-96");
                createKeyLength = 16;
        }

        for (i = 0;; i < _static_Net_SSH2__key_exchange_mac_algorithms.length && !(-1 !== this.mac_algorithms_server_to_client.indexOf(_static_Net_SSH2__key_exchange_mac_algorithms[i])); i++)

        if (i == _static_Net_SSH2__key_exchange_mac_algorithms.length) {
            user_error("No compatible server to client message authentication algorithms found");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        var checkKeyLength = 0;
        this.hmac_size = 0;

        switch (_static_Net_SSH2__key_exchange_mac_algorithms[i]) {
            case "hmac-sha1":
                this.hmac_check = new Crypt_Hash("sha1");
                checkKeyLength = 20;
                this.hmac_size = 20;
                break;

            case "hmac-sha1-96":
                this.hmac_check = new Crypt_Hash("sha1-96");
                checkKeyLength = 20;
                this.hmac_size = 12;
                break;

            case "hmac-md5":
                this.hmac_check = new Crypt_Hash("md5");
                checkKeyLength = 16;
                this.hmac_size = 16;
                break;

            case "hmac-md5-96":
                this.hmac_check = new Crypt_Hash("md5-96");
                checkKeyLength = 16;
                this.hmac_size = 12;
        }

        key = kexHash.hash(keyBytes + this.exchange_hash + "E" + this.session_id);

        while (createKeyLength > key.length) {
            key += kexHash.hash(keyBytes + this.exchange_hash + key);
        }

        this.hmac_create.setKey(key.substr(0, createKeyLength));
        key = kexHash.hash(keyBytes + this.exchange_hash + "F" + this.session_id);

        while (checkKeyLength > key.length) {
            key += kexHash.hash(keyBytes + this.exchange_hash + key);
        }

        this.hmac_check.setKey(key.substr(0, checkKeyLength));

        for (i = 0;; i < _static_Net_SSH2__key_exchange_compression_algorithms.length && !(-1 !== this.compression_algorithms_server_to_client.indexOf(_static_Net_SSH2__key_exchange_compression_algorithms[i])); i++)

        if (i == _static_Net_SSH2__key_exchange_compression_algorithms.length) {
            user_error("No compatible server to client compression algorithms found");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        this.decompress = _static_Net_SSH2__key_exchange_compression_algorithms[i] == "zlib";

        for (i = 0;; i < _static_Net_SSH2__key_exchange_compression_algorithms.length && !(-1 !== this.compression_algorithms_client_to_server.indexOf(_static_Net_SSH2__key_exchange_compression_algorithms[i])); i++)

        if (i == _static_Net_SSH2__key_exchange_compression_algorithms.length) {
            user_error("No compatible client to server compression algorithms found");
            return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
        }

        this.compress = _static_Net_SSH2__key_exchange_compression_algorithms[i] == "zlib";
        return true;
    }

    login(username) {
        var args = arguments.slice(1);

        if (!args) {
            return this._login_helper(username);
        }

        for (var arg of Object.values(args)) {
            if (this._login_helper(username, arg)) {
                return true;
            }
        }

        return false;
    }

    _login_helper(username, password = undefined) {
        if (!(this.bitmap & NET_SSH2_MASK_CONSTRUCTOR)) {
            return false;
        }

        if (!(this.bitmap & NET_SSH2_MASK_LOGIN_REQ)) {
            var packet = pack("CNa*", NET_SSH2_MSG_SERVICE_REQUEST, "ssh-userauth".length, "ssh-userauth");

            if (!this._send_binary_packet(packet)) {
                return false;
            }

            var response = this._get_binary_packet();

            if (response === false) {
                user_error("Connection closed by server");
                return false;
            }

            extract(unpack("Ctype", this._string_shift(response, 1)));

            if (type != NET_SSH2_MSG_SERVICE_ACCEPT) {
                user_error("Expected SSH_MSG_SERVICE_ACCEPT");
                return false;
            }

            this.bitmap |= NET_SSH2_MASK_LOGIN_REQ;
        }

        if (this.last_interactive_response.length) {
            return !("string" === typeof password) && !Array.isArray(password) ? false : this._keyboard_interactive_process(password);
        }

        if ("object" === typeof password && password.constructor.name.toLowerCase() == "crypt_rsa") {
            return this._privatekey_login(username, password);
        }

        if (Array.isArray(password)) {
            if (this._keyboard_interactive_login(username, password)) {
                this.bitmap |= NET_SSH2_MASK_LOGIN;
                return true;
            }

            return false;
        }

        if (!(undefined !== password)) {
            packet = pack("CNa*Na*Na*", NET_SSH2_MSG_USERAUTH_REQUEST, username.length, username, "ssh-connection".length, "ssh-connection", "none".length, "none");

            if (!this._send_binary_packet(packet)) {
                return false;
            }

            response = this._get_binary_packet();

            if (response === false) {
                user_error("Connection closed by server");
                return false;
            }

            extract(unpack("Ctype", this._string_shift(response, 1)));

            switch (type) {
                case NET_SSH2_MSG_USERAUTH_SUCCESS:
                    this.bitmap |= NET_SSH2_MASK_LOGIN;
                    return true;

                default:
                    return false;
            }
        }

        packet = pack("CNa*Na*Na*CNa*", NET_SSH2_MSG_USERAUTH_REQUEST, username.length, username, "ssh-connection".length, "ssh-connection", "password".length, "password", 0, password.length, password);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        if ("undefined" !== typeof NET_SSH2_LOGGING && NET_SSH2_LOGGING == NET_SSH2_LOG_COMPLEX) {
            packet = pack("CNa*Na*Na*CNa*", NET_SSH2_MSG_USERAUTH_REQUEST, "username".length, "username", "ssh-connection".length, "ssh-connection", "password".length, "password", 0, "password".length, "password");
            this.message_log[this.message_log.length - 1] = packet;
        }

        response = this._get_binary_packet();

        if (response === false) {
            user_error("Connection closed by server");
            return false;
        }

        extract(unpack("Ctype", this._string_shift(response, 1)));

        switch (type) {
            case NET_SSH2_MSG_USERAUTH_PASSWD_CHANGEREQ:
                if ("undefined" !== typeof NET_SSH2_LOGGING) {
                    this.message_number_log[this.message_number_log.length - 1] = "NET_SSH2_MSG_USERAUTH_PASSWD_CHANGEREQ";
                }

                extract(unpack("Nlength", this._string_shift(response, 4)));
                this.errors.push("SSH_MSG_USERAUTH_PASSWD_CHANGEREQ: " + utf8_decode(this._string_shift(response, length)));
                return this._disconnect(NET_SSH2_DISCONNECT_AUTH_CANCELLED_BY_USER);

            case NET_SSH2_MSG_USERAUTH_FAILURE:
                extract(unpack("Nlength", this._string_shift(response, 4)));

                var auth_methods = this._string_shift(response, length).split(",");

                extract(unpack("Cpartial_success", this._string_shift(response, 1)));
                var partial_success = partial_success != 0;

                if (!partial_success && -1 !== auth_methods.indexOf("keyboard-interactive")) {
                    if (this._keyboard_interactive_login(username, password)) {
                        this.bitmap |= NET_SSH2_MASK_LOGIN;
                        return true;
                    }

                    return false;
                }

                return false;

            case NET_SSH2_MSG_USERAUTH_SUCCESS:
                this.bitmap |= NET_SSH2_MASK_LOGIN;
                return true;
        }

        return false;
    }

    _keyboard_interactive_login(username, password) {
        var packet = pack("CNa*Na*Na*Na*Na*", NET_SSH2_MSG_USERAUTH_REQUEST, username.length, username, "ssh-connection".length, "ssh-connection", "keyboard-interactive".length, "keyboard-interactive", 0, "", 0, "");

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        return this._keyboard_interactive_process(password);
    }

    _keyboard_interactive_process() {
        var responses = arguments;

        if (this.last_interactive_response.length) {
            var response = this.last_interactive_response;
        } else {
            var orig = response = this._get_binary_packet();

            if (response === false) {
                user_error("Connection closed by server");
                return false;
            }
        }

        extract(unpack("Ctype", this._string_shift(response, 1)));

        switch (type) {
            case NET_SSH2_MSG_USERAUTH_INFO_REQUEST:
                extract(unpack("Nlength", this._string_shift(response, 4)));

                this._string_shift(response, length);

                extract(unpack("Nlength", this._string_shift(response, 4)));

                this._string_shift(response, length);

                extract(unpack("Nlength", this._string_shift(response, 4)));

                this._string_shift(response, length);

                extract(unpack("Nnum_prompts", this._string_shift(response, 4)));

                for (var i = 0; i < responses.length; i++) {
                    if (Array.isArray(responses[i])) {
                        {
                            let _tmp_0 = responses[i];

                            for (var key in _tmp_0) {
                                var value = _tmp_0[key];
                                this.keyboard_requests_responses[key] = value;
                            }
                        }
                        delete responses[i];
                    }
                }

                responses = Object.values(responses);

                if (undefined !== this.keyboard_requests_responses) {
                    for (i = 0;; i < num_prompts; i++) //prompt - ie. "Password: "; must not be empty
                    //$echo = $this->_string_shift($response) != chr(0);
                    {
                        extract(unpack("Nlength", this._string_shift(response, 4)));

                        var prompt = this._string_shift(response, length);

                        {
                            let _tmp_1 = this.keyboard_requests_responses;

                            for (var key in _tmp_1) {
                                var value = _tmp_1[key];

                                if (prompt.substr(0, key.length) == key) {
                                    responses.push(value);
                                    break;
                                }
                            }
                        }
                    }
                }

                if (this.last_interactive_response.length) {
                    this.last_interactive_response = "";
                } else if ("undefined" !== typeof NET_SSH2_LOGGING) {
                    this.message_number_log[this.message_number_log.length - 1] = str_replace("UNKNOWN", "NET_SSH2_MSG_USERAUTH_INFO_REQUEST", this.message_number_log[this.message_number_log.length - 1]);
                }

                if (!responses.length && num_prompts) {
                    this.last_interactive_response = orig;
                    this.bitmap |= NET_SSH_MASK_LOGIN_INTERACTIVE;
                    return false;
                }

                var packet = logged = pack("CN", NET_SSH2_MSG_USERAUTH_INFO_RESPONSE, responses.length);

                for (i = 0;; i < responses.length; i++) {
                    packet += pack("Na*", responses[i].length, responses[i]);
                    logged += pack("Na*", "dummy-answer".length, "dummy-answer");
                }

                if (!this._send_binary_packet(packet)) {
                    return false;
                }

                if ("undefined" !== typeof NET_SSH2_LOGGING) {
                    this.message_number_log[this.message_number_log.length - 1] = str_replace("UNKNOWN", "NET_SSH2_MSG_USERAUTH_INFO_RESPONSE", this.message_number_log[this.message_number_log.length - 1]);
                    this.message_log[this.message_log.length - 1] = logged;
                }

                return this._keyboard_interactive_process();

            case NET_SSH2_MSG_USERAUTH_SUCCESS:
                return true;

            case NET_SSH2_MSG_USERAUTH_FAILURE:
                return false;
        }

        return false;
    }

    _privatekey_login(username, privatekey) //see http://tools.ietf.org/html/rfc4253#page-15
    {
        var publickey = privatekey.getPublicKey(CRYPT_RSA_PUBLIC_FORMAT_RAW);

        if (publickey === false) {
            return false;
        }

        publickey = {
            e: publickey.e.toBytes(true),
            n: publickey.n.toBytes(true)
        };
        publickey = pack("Na*Na*Na*", "ssh-rsa".length, "ssh-rsa", publickey.e.length, publickey.e, publickey.n.length, publickey.n);
        var part1 = pack("CNa*Na*Na*", NET_SSH2_MSG_USERAUTH_REQUEST, username.length, username, "ssh-connection".length, "ssh-connection", "publickey".length, "publickey");
        var part2 = pack("Na*Na*", "ssh-rsa".length, "ssh-rsa", publickey.length, publickey);
        var packet = part1 + String.fromCharCode(0) + part2;

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        var response = this._get_binary_packet();

        if (response === false) {
            user_error("Connection closed by server");
            return false;
        }

        extract(unpack("Ctype", this._string_shift(response, 1)));

        switch (type) {
            case NET_SSH2_MSG_USERAUTH_FAILURE:
                extract(unpack("Nlength", this._string_shift(response, 4)));
                this.errors.push("SSH_MSG_USERAUTH_FAILURE: " + this._string_shift(response, length));
                return false;

            case NET_SSH2_MSG_USERAUTH_PK_OK:
                if ("undefined" !== typeof NET_SSH2_LOGGING) {
                    this.message_number_log[this.message_number_log.length - 1] = str_replace("UNKNOWN", "NET_SSH2_MSG_USERAUTH_PK_OK", this.message_number_log[this.message_number_log.length - 1]);
                }

        }

        packet = part1 + String.fromCharCode(1) + part2;
        privatekey.setSignatureMode(CRYPT_RSA_SIGNATURE_PKCS1);
        var signature = privatekey.sign(pack("Na*a*", this.session_id.length, this.session_id, packet));
        signature = pack("Na*Na*", "ssh-rsa".length, "ssh-rsa", signature.length, signature);
        packet += pack("Na*", signature.length, signature);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        response = this._get_binary_packet();

        if (response === false) {
            user_error("Connection closed by server");
            return false;
        }

        extract(unpack("Ctype", this._string_shift(response, 1)));

        switch (type) {
            case NET_SSH2_MSG_USERAUTH_FAILURE:
                return false;

            case NET_SSH2_MSG_USERAUTH_SUCCESS:
                this.bitmap |= NET_SSH2_MASK_LOGIN;
                return true;
        }

        return false;
    }

    setTimeout(timeout) {
        this.timeout = this.curTimeout = timeout;
    }

    getStdError() {
        return this.stdErrorLog;
    }

    exec(command, callback = undefined) //0x8000 is the maximum max packet size, per http://tools.ietf.org/html/rfc4253#section-6.1, although since PuTTy
    //uses 0x4000, that's what will be used here, as well.
    {
        this.curTimeout = this.timeout;
        this.is_timeout = false;
        this.stdErrorLog = "";

        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        this.window_size_server_to_client[NET_SSH2_CHANNEL_EXEC] = 2147483647;
        var packet_size = 16384;
        var packet = pack("CNa*N3", NET_SSH2_MSG_CHANNEL_OPEN, "session".length, "session", NET_SSH2_CHANNEL_EXEC, this.window_size_server_to_client[NET_SSH2_CHANNEL_EXEC], packet_size);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        this.channel_status[NET_SSH2_CHANNEL_EXEC] = NET_SSH2_MSG_CHANNEL_OPEN;

        var response = this._get_channel_packet(NET_SSH2_CHANNEL_EXEC);

        if (response === false) {
            return false;
        }

        if (this.request_pty === true) {
            var terminal_modes = pack("C", NET_SSH2_TTY_OP_END);
            packet = pack("CNNa*CNa*N5a*", NET_SSH2_MSG_CHANNEL_REQUEST, this.server_channels[NET_SSH2_CHANNEL_EXEC], "pty-req".length, "pty-req", 1, "vt100".length, "vt100", 80, 24, 0, 0, terminal_modes.length, terminal_modes);

            if (!this._send_binary_packet(packet)) {
                return false;
            }

            response = this._get_binary_packet();

            if (response === false) {
                user_error("Connection closed by server");
                return false;
            }

            [type] = unpack("C", this._string_shift(response, 1));

            switch (type) {
                case NET_SSH2_MSG_CHANNEL_SUCCESS:
                    break;

                case NET_SSH2_MSG_CHANNEL_FAILURE:
                default:
                    user_error("Unable to request pseudo-terminal");
                    return this._disconnect(NET_SSH2_DISCONNECT_BY_APPLICATION);
            }

            this.in_request_pty_exec = true;
        }

        packet = pack("CNNa*CNa*", NET_SSH2_MSG_CHANNEL_REQUEST, this.server_channels[NET_SSH2_CHANNEL_EXEC], "exec".length, "exec", 1, command.length, command);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        this.channel_status[NET_SSH2_CHANNEL_EXEC] = NET_SSH2_MSG_CHANNEL_REQUEST;
        response = this._get_channel_packet(NET_SSH2_CHANNEL_EXEC);

        if (response === false) {
            return false;
        }

        this.channel_status[NET_SSH2_CHANNEL_EXEC] = NET_SSH2_MSG_CHANNEL_DATA;

        if (callback === false || this.in_request_pty_exec) {
            return true;
        }

        var output = "";

        while (true) {
            var temp = this._get_channel_packet(NET_SSH2_CHANNEL_EXEC);

            switch (true) {
                case temp === true:
                    return is_callable(callback) ? true : output;

                case temp === false:
                    return false;

                default:
                    if (is_callable(callback)) {
                        callback(temp);
                    } else {
                        output += temp;
                    }

            }
        }
    }

    _initShell() {
        if (this.in_request_pty_exec === true) {
            return true;
        }

        this.window_size_server_to_client[NET_SSH2_CHANNEL_SHELL] = 2147483647;
        var packet_size = 16384;
        var packet = pack("CNa*N3", NET_SSH2_MSG_CHANNEL_OPEN, "session".length, "session", NET_SSH2_CHANNEL_SHELL, this.window_size_server_to_client[NET_SSH2_CHANNEL_SHELL], packet_size);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        this.channel_status[NET_SSH2_CHANNEL_SHELL] = NET_SSH2_MSG_CHANNEL_OPEN;

        var response = this._get_channel_packet(NET_SSH2_CHANNEL_SHELL);

        if (response === false) {
            return false;
        }

        var terminal_modes = pack("C", NET_SSH2_TTY_OP_END);
        packet = pack("CNNa*CNa*N5a*", NET_SSH2_MSG_CHANNEL_REQUEST, this.server_channels[NET_SSH2_CHANNEL_SHELL], "pty-req".length, "pty-req", 1, "vt100".length, "vt100", 80, 24, 0, 0, terminal_modes.length, terminal_modes);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        response = this._get_binary_packet();

        if (response === false) {
            user_error("Connection closed by server");
            return false;
        }

        [type] = unpack("C", this._string_shift(response, 1));

        switch (type) {
            case NET_SSH2_MSG_CHANNEL_SUCCESS:
                break;

            case NET_SSH2_MSG_CHANNEL_FAILURE:
            default:
                user_error("Unable to request pseudo-terminal");
                return this._disconnect(NET_SSH2_DISCONNECT_BY_APPLICATION);
        }

        packet = pack("CNNa*C", NET_SSH2_MSG_CHANNEL_REQUEST, this.server_channels[NET_SSH2_CHANNEL_SHELL], "shell".length, "shell", 1);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        this.channel_status[NET_SSH2_CHANNEL_SHELL] = NET_SSH2_MSG_CHANNEL_REQUEST;
        response = this._get_channel_packet(NET_SSH2_CHANNEL_SHELL);

        if (response === false) {
            return false;
        }

        this.channel_status[NET_SSH2_CHANNEL_SHELL] = NET_SSH2_MSG_CHANNEL_DATA;
        this.bitmap |= NET_SSH2_MASK_SHELL;
        return true;
    }

    read(expect = "", mode = NET_SSH2_READ_SIMPLE) {
        this.curTimeout = this.timeout;
        this.is_timeout = false;

        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            user_error("Operation disallowed prior to login()");
            return false;
        }

        if (!(this.bitmap & NET_SSH2_MASK_SHELL) && !this._initShell()) {
            user_error("Unable to initiate an interactive shell session");
            return false;
        }

        var channel = this.in_request_pty_exec ? NET_SSH2_CHANNEL_EXEC : NET_SSH2_CHANNEL_SHELL;
        var match = expect;

        while (true) {
            if (mode == NET_SSH2_READ_REGEX) {
                preg_match(expect, this.interactiveBuffer, matches);
                match = undefined !== matches[0] ? matches[0] : "";
            }

            var pos = match.length ? strpos(this.interactiveBuffer, match) : false;

            if (pos !== false) {
                return this._string_shift(this.interactiveBuffer, pos + match.length);
            }

            var response = this._get_channel_packet(channel);

            if ("boolean" === typeof response) {
                this.in_request_pty_exec = false;
                return response ? this._string_shift(this.interactiveBuffer, this.interactiveBuffer.length) : false;
            }

            this.interactiveBuffer += response;
        }
    }

    write(cmd) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            user_error("Operation disallowed prior to login()");
            return false;
        }

        if (!(this.bitmap & NET_SSH2_MASK_SHELL) && !this._initShell()) {
            user_error("Unable to initiate an interactive shell session");
            return false;
        }

        var channel = this.in_request_pty_exec ? NET_SSH2_CHANNEL_EXEC : NET_SSH2_CHANNEL_SHELL;
        return this._send_channel_packet(channel, cmd);
    }

    reset() {
        var channel = this.in_request_pty_exec ? NET_SSH2_CHANNEL_EXEC : NET_SSH2_CHANNEL_SHELL;

        this._close_channel(channel);
    }

    isTimeout() {
        return this.is_timeout;
    }

    disconnect() {
        this._disconnect(NET_SSH2_DISCONNECT_BY_APPLICATION);

        if (undefined !== this.realtime_log_file && is_resource(this.realtime_log_file)) {
            fclose(this.realtime_log_file);
        }
    }

    __destruct() {
        this.disconnect();
    }

    isConnected() {
        return this.bitmap & NET_SSH2_MASK_LOGIN;
    }

    _get_binary_packet() //http://php.net/microtime#61838
    //quoting <http://tools.ietf.org/html/rfc4253#section-6.1>,
    //"implementations SHOULD check that the packet length is reasonable"
    //PuTTY uses 0x9000 as the actual max packet size and so to shall we
    //should leave $raw empty
    {
        if (!is_resource(this.fsock) || feof(this.fsock)) {
            user_error("Connection closed prematurely");
            this.bitmask = 0;
            return false;
        }

        var start = strtok(Date.now() / 1000, " ") + strtok("");
        var raw = fread(this.fsock, this.decrypt_block_size);

        if (!raw.length) {
            return "";
        }

        if (this.decrypt !== false) {
            raw = this.decrypt.decrypt(raw);
        }

        if (raw === false) {
            user_error("Unable to decrypt content");
            return false;
        }

        extract(unpack("Npacket_length/Cpadding_length", this._string_shift(raw, 5)));
        var remaining_length = packet_length + 4 - this.decrypt_block_size;

        if (remaining_length < -this.decrypt_block_size || remaining_length > 36864 || remaining_length % this.decrypt_block_size != 0) {
            user_error("Invalid size");
            return false;
        }

        var buffer = "";

        while (remaining_length > 0) {
            var temp = fread(this.fsock, remaining_length);
            buffer += temp;
            remaining_length -= temp.length;
        }

        var stop = strtok(Date.now() / 1000, " ") + strtok("");

        if (buffer.length) {
            raw += this.decrypt !== false ? this.decrypt.decrypt(buffer) : buffer;
        }

        var payload = this._string_shift(raw, packet_length - padding_length - 1);

        var padding = this._string_shift(raw, padding_length);

        if (this.hmac_check !== false) {
            var hmac = fread(this.fsock, this.hmac_size);

            if (hmac != this.hmac_check.hash(pack("NNCa*", this.get_seq_no, packet_length, padding_length, payload + padding))) {
                user_error("Invalid HMAC");
                return false;
            }
        }

        this.get_seq_no++;

        if ("undefined" !== typeof NET_SSH2_LOGGING) {
            var current = strtok(Date.now() / 1000, " ") + strtok("");
            var message_number = undefined !== this.message_numbers[payload.charCodeAt(0)] ? this.message_numbers[payload.charCodeAt(0)] : "UNKNOWN (" + payload.charCodeAt(0) + ")";
            message_number = "<- " + message_number + " (since last: " + Math.round(current - this.last_packet, 4) + ", network: " + Math.round(stop - start, 4) + "s)";

            this._append_log(message_number, payload);

            this.last_packet = current;
        }

        return this._filter(payload);
    }

    _filter(payload) {
        switch (payload.charCodeAt(0)) {
            case NET_SSH2_MSG_DISCONNECT:
                this._string_shift(payload, 1);

                extract(unpack("Nreason_code/Nlength", this._string_shift(payload, 8)));
                this.errors.push("SSH_MSG_DISCONNECT: " + this.disconnect_reasons[reason_code] + "\r\n" + utf8_decode(this._string_shift(payload, length)));
                this.bitmask = 0;
                return false;

            case NET_SSH2_MSG_IGNORE:
                payload = this._get_binary_packet();
                break;

            case NET_SSH2_MSG_DEBUG:
                this._string_shift(payload, 2);

                extract(unpack("Nlength", this._string_shift(payload, 4)));
                this.errors.push("SSH_MSG_DEBUG: " + utf8_decode(this._string_shift(payload, length)));
                payload = this._get_binary_packet();
                break;

            case NET_SSH2_MSG_UNIMPLEMENTED:
                return false;

            case NET_SSH2_MSG_KEXINIT:
                if (this.session_id !== false) {
                    if (!this._key_exchange(payload)) {
                        this.bitmask = 0;
                        return false;
                    }

                    payload = this._get_binary_packet();
                }

        }

        if (this.bitmap & NET_SSH2_MASK_CONSTRUCTOR && !(this.bitmap & NET_SSH2_MASK_LOGIN) && payload.charCodeAt(0) == NET_SSH2_MSG_USERAUTH_BANNER) {
            this._string_shift(payload, 1);

            extract(unpack("Nlength", this._string_shift(payload, 4)));
            this.banner_message = utf8_decode(this._string_shift(payload, length));
            payload = this._get_binary_packet();
        }

        if (this.bitmap & NET_SSH2_MASK_CONSTRUCTOR && this.bitmap & NET_SSH2_MASK_LOGIN) {
            switch (payload.charCodeAt(0)) {
                case NET_SSH2_MSG_GLOBAL_REQUEST:
                    this._string_shift(payload, 1);

                    extract(unpack("Nlength", this._string_shift(payload)));
                    this.errors.push("SSH_MSG_GLOBAL_REQUEST: " + utf8_decode(this._string_shift(payload, length)));

                    if (!this._send_binary_packet(pack("C", NET_SSH2_MSG_REQUEST_FAILURE))) {
                        return this._disconnect(NET_SSH2_DISCONNECT_BY_APPLICATION);
                    }

                    payload = this._get_binary_packet();
                    break;

                case NET_SSH2_MSG_CHANNEL_OPEN:
                    this._string_shift(payload, 1);

                    extract(unpack("N", this._string_shift(payload, 4)));
                    this.errors.push("SSH_MSG_CHANNEL_OPEN: " + utf8_decode(this._string_shift(payload, length)));

                    this._string_shift(payload, 4);

                    extract(unpack("Nserver_channel", this._string_shift(payload, 4)));
                    var packet = pack("CN3a*Na*", NET_SSH2_MSG_REQUEST_FAILURE, server_channel, NET_SSH2_OPEN_ADMINISTRATIVELY_PROHIBITED, 0, "", 0, "");

                    if (!this._send_binary_packet(packet)) {
                        return this._disconnect(NET_SSH2_DISCONNECT_BY_APPLICATION);
                    }

                    payload = this._get_binary_packet();
                    break;

                case NET_SSH2_MSG_CHANNEL_WINDOW_ADJUST:
                    payload = this._get_binary_packet();
            }
        }

        return payload;
    }

    enableQuietMode() {
        this.quiet_mode = true;
    }

    disableQuietMode() {
        this.quiet_mode = false;
    }

    enablePTY() {
        this.request_pty = true;
    }

    disablePTY() {
        this.request_pty = false;
    }

    _get_channel_packet(client_channel, skip_extended = false) {
        if (!!this.channel_buffers[client_channel]) {
            return this.channel_buffers[client_channel].shift();
        }

        while (true) {
            if (this.curTimeout) //http://php.net/microtime#61838
                //on windows this returns a "Warning: Invalid CRT parameters detected" error
                {
                    if (this.curTimeout < 0) {
                        this.is_timeout = true;
                        return true;
                    }

                    var read = [this.fsock];
                    var write = except = undefined;
                    var start = strtok(Date.now() / 1000, " ") + strtok("");
                    var sec = Math.floor(this.curTimeout);
                    var usec = 1000000 * (this.curTimeout - sec);

                    if (!(stream_select(read, write, except, sec, usec) && !read.length)) {
                        this.is_timeout = true;
                        return true;
                    }

                    var elapsed = strtok(Date.now() / 1000, " ") + strtok("") - start;
                    this.curTimeout -= elapsed;
                }

            var response = this._get_binary_packet();

            if (response === false) {
                user_error("Connection closed by server");
                return false;
            }

            if (!response.length) {
                return "";
            }

            this.window_size_server_to_client[client_channel] -= response.length;

            if (this.window_size_server_to_client[client_channel] < 0) {
                var packet = pack("CNN", NET_SSH2_MSG_CHANNEL_WINDOW_ADJUST, this.server_channels[client_channel], this.window_size);

                if (!this._send_binary_packet(packet)) {
                    return false;
                }

                this.window_size_server_to_client[client_channel] += this.window_size;
            }

            extract(unpack("Ctype/Nchannel", this._string_shift(response, 5)));

            switch (this.channel_status[channel]) {
                case NET_SSH2_MSG_CHANNEL_OPEN:
                    switch (type) {
                        case NET_SSH2_MSG_CHANNEL_OPEN_CONFIRMATION:
                            extract(unpack("Nserver_channel", this._string_shift(response, 4)));
                            this.server_channels[channel] = server_channel;

                            this._string_shift(response, 4);

                            var temp = unpack("Npacket_size_client_to_server", this._string_shift(response, 4));
                            this.packet_size_client_to_server[channel] = temp.packet_size_client_to_server;
                            return client_channel == channel ? true : this._get_channel_packet(client_channel, skip_extended);

                        default:
                            user_error("Unable to open channel");
                            return this._disconnect(NET_SSH2_DISCONNECT_BY_APPLICATION);
                    }

                    break;

                case NET_SSH2_MSG_CHANNEL_REQUEST:
                    switch (type) {
                        case NET_SSH2_MSG_CHANNEL_SUCCESS:
                            return true;

                        case NET_SSH2_MSG_CHANNEL_FAILURE:
                            return false;

                        default:
                            user_error("Unable to fulfill channel request");
                            return this._disconnect(NET_SSH2_DISCONNECT_BY_APPLICATION);
                    }

                case NET_SSH2_MSG_CHANNEL_CLOSE:
                    return type == NET_SSH2_MSG_CHANNEL_CLOSE ? true : this._get_channel_packet(client_channel, skip_extended);
            }

            switch (type) {
                case NET_SSH2_MSG_CHANNEL_DATA:
                    extract(unpack("Nlength", this._string_shift(response, 4)));

                    var data = this._string_shift(response, length);

                    if (client_channel == channel) {
                        return data;
                    }

                    if (!(undefined !== this.channel_buffers[client_channel])) {
                        this.channel_buffers[client_channel] = Array();
                    }

                    this.channel_buffers[client_channel].push(data);
                    break;

                case NET_SSH2_MSG_CHANNEL_EXTENDED_DATA:
                    extract(unpack("Ndata_type_code/Nlength", this._string_shift(response, 8)));
                    data = this._string_shift(response, length);
                    this.stdErrorLog += data;

                    if (skip_extended || this.quiet_mode) {
                        break;
                    }

                    if (client_channel == channel) {
                        return data;
                    }

                    if (!(undefined !== this.channel_buffers[client_channel])) {
                        this.channel_buffers[client_channel] = Array();
                    }

                    this.channel_buffers[client_channel].push(data);
                    break;

                case NET_SSH2_MSG_CHANNEL_REQUEST:
                    extract(unpack("Nlength", this._string_shift(response, 4)));

                    var value = this._string_shift(response, length);

                    switch (value) {
                        case "exit-signal":
                            this._string_shift(response, 1);

                            extract(unpack("Nlength", this._string_shift(response, 4)));
                            this.errors.push("SSH_MSG_CHANNEL_REQUEST (exit-signal): " + this._string_shift(response, length));

                            this._string_shift(response, 1);

                            extract(unpack("Nlength", this._string_shift(response, 4)));

                            if (length) {
                                this.errors[this.errors.length] += "\r\n" + this._string_shift(response, length);
                            }

                        case "exit-status":
                            extract(unpack("Cfalse/Nexit_status", this._string_shift(response, 5)));
                            this.exit_status = exit_status;

                            this._send_binary_packet(pack("CN", NET_SSH2_MSG_CHANNEL_EOF, this.server_channels[client_channel]));

                            this._send_binary_packet(pack("CN", NET_SSH2_MSG_CHANNEL_CLOSE, this.server_channels[channel]));

                            this.channel_status[channel] = NET_SSH2_MSG_CHANNEL_EOF;

                        default:
                            break;
                    }

                    break;

                case NET_SSH2_MSG_CHANNEL_CLOSE:
                    this.curTimeout = 0;

                    if (this.bitmap & NET_SSH2_MASK_SHELL) {
                        this.bitmap &= ~NET_SSH2_MASK_SHELL;
                    }

                    if (this.channel_status[channel] != NET_SSH2_MSG_CHANNEL_EOF) {
                        this._send_binary_packet(pack("CN", NET_SSH2_MSG_CHANNEL_CLOSE, this.server_channels[channel]));
                    }

                    this.channel_status[channel] = NET_SSH2_MSG_CHANNEL_CLOSE;
                    return true;

                case NET_SSH2_MSG_CHANNEL_EOF:
                    break;

                default:
                    user_error("Error reading channel data");
                    return this._disconnect(NET_SSH2_DISCONNECT_BY_APPLICATION);
            }
        }
    }

    _send_binary_packet(data) //round up to the nearest $this->encrypt_block_size
    //subtracting strlen($data) is obvious - subtracting 5 is necessary because of packet_length and padding_length
    //we subtract 4 from packet_length because the packet_length field isn't supposed to include itself
    //http://php.net/microtime#61838
    {
        if (!is_resource(this.fsock) || feof(this.fsock)) {
            user_error("Connection closed prematurely");
            this.bitmask = 0;
            return false;
        }

        var packet_length = data.length + 9;
        packet_length += (this.encrypt_block_size - 1) * packet_length % this.encrypt_block_size;
        var padding_length = packet_length - data.length - 5;
        var padding = crypt_random_string(padding_length);
        var packet = pack("NCa*", packet_length - 4, padding_length, data + padding);
        var hmac = this.hmac_create !== false ? this.hmac_create.hash(pack("Na*", this.send_seq_no, packet)) : "";
        this.send_seq_no++;

        if (this.encrypt !== false) {
            packet = this.encrypt.encrypt(packet);
        }

        packet += hmac;
        var start = strtok(Date.now() / 1000, " ") + strtok("");
        var result = packet.length == fputs(this.fsock, packet);
        var stop = strtok(Date.now() / 1000, " ") + strtok("");

        if ("undefined" !== typeof NET_SSH2_LOGGING) {
            var current = strtok(Date.now() / 1000, " ") + strtok("");
            var message_number = undefined !== this.message_numbers[data.charCodeAt(0)] ? this.message_numbers[data.charCodeAt(0)] : "UNKNOWN (" + data.charCodeAt(0) + ")";
            message_number = "-> " + message_number + " (since last: " + Math.round(current - this.last_packet, 4) + ", network: " + Math.round(stop - start, 4) + "s)";

            this._append_log(message_number, data);

            this.last_packet = current;
        }

        return result;
    }

    _append_log(message_number, message) {
        switch (NET_SSH2_LOGGING) {
            case NET_SSH2_LOG_SIMPLE:
                this.message_number_log.push(message_number);
                break;

            case NET_SSH2_LOG_COMPLEX:
                this.message_number_log.push(message_number);

                this._string_shift(message);

                this.log_size += message.length;
                this.message_log.push(message);

                while (this.log_size > NET_SSH2_LOG_MAX_SIZE) {
                    this.log_size -= this.message_log.shift().length;
                    this.message_number_log.shift();
                }

                break;

            case NET_SSH2_LOG_REALTIME:
                echo("<pre>\r\n" + this._format_log([message], [message_number]) + "\r\n</pre>\r\n");
                flush();
                ob_flush();
                break;

            case NET_SSH2_LOG_REALTIME_FILE:
                if (!(undefined !== this.realtime_log_file)) //PHP doesn't seem to like using constants in fopen()
                    {
                        var filename = NET_SSH2_LOG_REALTIME_FILENAME;
                        var fp = fopen(filename, "w");
                        this.realtime_log_file = fp;
                    }

                if (!is_resource(this.realtime_log_file)) {
                    break;
                }

                var entry = this._format_log([message], [message_number]);

                if (this.realtime_log_wrap) {
                    var temp = "<<< START >>>\r\n";
                    entry += temp;
                    fseek(this.realtime_log_file, ftell(this.realtime_log_file) - temp.length);
                }

                this.realtime_log_size += entry.length;

                if (this.realtime_log_size > NET_SSH2_LOG_MAX_SIZE) {
                    fseek(this.realtime_log_file, 0);
                    this.realtime_log_size = entry.length;
                    this.realtime_log_wrap = true;
                }

                fputs(this.realtime_log_file, entry);
        }
    }

    _send_channel_packet(client_channel, data) {
        while (data.length > this.packet_size_client_to_server[client_channel]) {
            var packet = pack("CN2a*", NET_SSH2_MSG_CHANNEL_DATA, this.server_channels[client_channel], this.packet_size_client_to_server[client_channel], this._string_shift(data, this.packet_size_client_to_server[client_channel]));

            if (!this._send_binary_packet(packet)) {
                return false;
            }
        }

        return this._send_binary_packet(pack("CN2a*", NET_SSH2_MSG_CHANNEL_DATA, this.server_channels[client_channel], data.length, data));
    }

    _close_channel(client_channel) //see http://tools.ietf.org/html/rfc4254#section-5.3
    {
        this._send_binary_packet(pack("CN", NET_SSH2_MSG_CHANNEL_EOF, this.server_channels[client_channel]));

        this._send_binary_packet(pack("CN", NET_SSH2_MSG_CHANNEL_CLOSE, this.server_channels[client_channel]));

        this.channel_status[client_channel] = NET_SSH2_MSG_CHANNEL_CLOSE;
        this.curTimeout = 0;

        while (!("boolean" === typeof this._get_channel_packet(client_channel)))

        if (this.bitmap & NET_SSH2_MASK_SHELL) {
            this.bitmap &= ~NET_SSH2_MASK_SHELL;
        }
    }

    _disconnect(reason) {
        if (this.bitmap) {
            var data = pack("CNNa*Na*", NET_SSH2_MSG_DISCONNECT, reason, 0, "", 0, "");

            this._send_binary_packet(data);

            this.bitmap = 0;
            fclose(this.fsock);
            return false;
        }
    }

    _string_shift(string, index = 1) {
        var substr = substr(string, 0, index);
        string = substr(string, index);
        return substr;
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
        if (!("undefined" !== typeof NET_SSH2_LOGGING)) {
            return false;
        }

        switch (NET_SSH2_LOGGING) {
            case NET_SSH2_LOG_SIMPLE:
                return this.message_number_log;
                break;

            case NET_SSH2_LOG_COMPLEX:
                return this._format_log(this.message_log, this.message_number_log);
                break;

            default:
                return false;
        }
    }

    _format_log(message_log, message_number_log) {
        {
            if (!("_static_Net_SSH2__format_log_boundary" in global)) _static_Net_SSH2__format_log_boundary = ":";
            if (!("_static_Net_SSH2__format_log_long_width" in global)) _static_Net_SSH2__format_log_long_width = 65;
            if (!("_static_Net_SSH2__format_log_short_width" in global)) _static_Net_SSH2__format_log_short_width = 16;
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

                var fragment = this._string_shift(current_log, _static_Net_SSH2__format_log_short_width);

                var hex = fragment.replace(/(.)/ges, "\"" + _static_Net_SSH2__format_log_boundary + "\" . str_pad(dechex(ord(substr(\"\\1\", -1))), 2, \"0\", STR_PAD_LEFT)").substr(_static_Net_SSH2__format_log_boundary.length);
                var raw = fragment.replace(/[^\x20-\x7E]|</g, ".");
                output += str_pad(hex, _static_Net_SSH2__format_log_long_width - _static_Net_SSH2__format_log_short_width, " ") + raw + "\r\n";
                j++;
            } while (current_log.length);

            output += "\r\n";
        }

        return output;
    }

    getErrors() {
        return this.errors;
    }

    getLastError() {
        return this.errors[this.errors.length - 1];
    }

    getServerIdentification() {
        return this.server_identifier;
    }

    getKexAlgorithms() {
        return this.kex_algorithms;
    }

    getServerHostKeyAlgorithms() {
        return this.server_host_key_algorithms;
    }

    getEncryptionAlgorithmsClient2Server() {
        return this.encryption_algorithms_client_to_server;
    }

    getEncryptionAlgorithmsServer2Client() {
        return this.encryption_algorithms_server_to_client;
    }

    getMACAlgorithmsClient2Server() {
        return this.mac_algorithms_client_to_server;
    }

    getMACAlgorithmsServer2Client() {
        return this.mac_algorithms_server_to_client;
    }

    getCompressionAlgorithmsClient2Server() {
        return this.compression_algorithms_client_to_server;
    }

    getCompressionAlgorithmsServer2Client() {
        return this.compression_algorithms_server_to_client;
    }

    getLanguagesServer2Client() {
        return this.languages_server_to_client;
    }

    getLanguagesClient2Server() {
        return this.languages_client_to_server;
    }

    getBannerMessage() {
        return this.banner_message;
    }

    getServerPublicHostKey() {
        var signature = this.signature;
        var server_public_host_key = this.server_public_host_key;
        extract(unpack("Nlength", this._string_shift(server_public_host_key, 4)));

        this._string_shift(server_public_host_key, length);

        if (this.signature_validated) {
            return this.bitmap ? this.signature_format + " " + base64_encode(this.server_public_host_key) : false;
        }

        this.signature_validated = true;

        switch (this.signature_format) {
            case "ssh-dss":
                var temp = unpack("Nlength", this._string_shift(server_public_host_key, 4));
                var p = new Math_BigInteger(this._string_shift(server_public_host_key, temp.length), -256);
                temp = unpack("Nlength", this._string_shift(server_public_host_key, 4));
                var q = new Math_BigInteger(this._string_shift(server_public_host_key, temp.length), -256);
                temp = unpack("Nlength", this._string_shift(server_public_host_key, 4));
                var g = new Math_BigInteger(this._string_shift(server_public_host_key, temp.length), -256);
                temp = unpack("Nlength", this._string_shift(server_public_host_key, 4));
                var y = new Math_BigInteger(this._string_shift(server_public_host_key, temp.length), -256);
                temp = unpack("Nlength", this._string_shift(signature, 4));

                if (temp.length != 40) {
                    user_error("Invalid signature");
                    return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
                }

                var r = new Math_BigInteger(this._string_shift(signature, 20), 256);
                var s = new Math_BigInteger(this._string_shift(signature, 20), 256);

                if (r.compare(q) >= 0 || s.compare(q) >= 0) {
                    user_error("Invalid signature");
                    return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
                }

                var w = s.modInverse(q);
                var u1 = w.multiply(new Math_BigInteger(sha1(this.exchange_hash), 16));
                [u1] = u1.divide(q);
                var u2 = w.multiply(r);
                [u2] = u2.divide(q);
                g = g.modPow(u1, p);
                y = y.modPow(u2, p);
                var v = g.multiply(y);
                [v] = v.divide(p);
                [v] = v.divide(q);

                if (!v.equals(r)) {
                    user_error("Bad server signature");
                    return this._disconnect(NET_SSH2_DISCONNECT_HOST_KEY_NOT_VERIFIABLE);
                }

                break;

            case "ssh-rsa":
                temp = unpack("Nlength", this._string_shift(server_public_host_key, 4));
                var e = new Math_BigInteger(this._string_shift(server_public_host_key, temp.length), -256);
                temp = unpack("Nlength", this._string_shift(server_public_host_key, 4));
                var n = new Math_BigInteger(this._string_shift(server_public_host_key, temp.length), -256);
                var nLength = temp.length;
                temp = unpack("Nlength", this._string_shift(signature, 4));
                s = new Math_BigInteger(this._string_shift(signature, temp.length), 256);

                if (s.compare(new Math_BigInteger()) < 0 || s.compare(n.subtract(new Math_BigInteger(1))) > 0) {
                    user_error("Invalid signature");
                    return this._disconnect(NET_SSH2_DISCONNECT_KEY_EXCHANGE_FAILED);
                }

                s = s.modPow(e, n);
                s = s.toBytes();
                var h = pack("N4H*", 3154224, 151389483, 235078170, 83887124, sha1(this.exchange_hash));
                h = String.fromCharCode(1) + str_repeat(String.fromCharCode(255), nLength - 3 - h.length) + h;

                if (s != h) {
                    user_error("Bad server signature");
                    return this._disconnect(NET_SSH2_DISCONNECT_HOST_KEY_NOT_VERIFIABLE);
                }

                break;

            default:
                user_error("Unsupported signature format");
                return this._disconnect(NET_SSH2_DISCONNECT_HOST_KEY_NOT_VERIFIABLE);
        }

        return this.signature_format + " " + base64_encode(this.server_public_host_key);
    }

    getExitStatus() {
        if (is_null(this.exit_status)) {
            return false;
        }

        return this.exit_status;
    }

};
