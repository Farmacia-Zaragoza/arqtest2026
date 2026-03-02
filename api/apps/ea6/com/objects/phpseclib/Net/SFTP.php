//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of SFTP.
//
//PHP versions 4 and 5
//
//Currently only supports SFTPv2 and v3, which, according to wikipedia.org, "is the most widely used version,
//implemented by the popular OpenSSH SFTP server".  If you want SFTPv4/5/6 support, provide me with access
//to an SFTPv4/5/6 server.
//
//The API for this library is modeled after the API from PHP's {@link http://php.net/book.ftp FTP extension}.
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Net/SFTP.php');
//
//$sftp = new Net_SFTP('www.domain.tld');
//if (!$sftp->login('username', 'password')) {
//exit('Login Failed');
//}
//
//echo $sftp->pwd() . "\r\n";
//$sftp->put('filename.ext', 'hello, world!');
//print_r($sftp->nlist());
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
//@package    Net_SFTP
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMIX Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//
//Include Net_SSH2
//
//
//
//Returns the message content
//
//
//
//Outputs the message content in real-time.
//
//
//#@-
//
//SFTP channel constant
//
//Net_SSH2::exec() uses 0 and Net_SSH2::read() / Net_SSH2::write() use 1.
//
//@see Net_SSH2::_send_channel_packet()
//@see Net_SSH2::_get_channel_packet()
//@access private
//
//
//#@+
// @access public
// @see Net_SFTP::put()
//
//Reads data from a local file.
//
//
//
//Reads data from a string.
//
//
//this value isn't really used anymore but i'm keeping it reserved for historical reasons
//
//Resumes an upload
//
//
//#@-
//
//Pure-PHP implementations of SFTP.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Net_SFTP
//
//

if (!("function" === typeof Net_SSH2)) {
    require("SSH2.php");
}

const NET_SFTP_LOG_SIMPLE = NET_SSH2_LOG_SIMPLE;
const NET_SFTP_LOG_COMPLEX = NET_SSH2_LOG_COMPLEX;
const NET_SFTP_LOG_REALTIME = 3;
const NET_SFTP_CHANNEL = 2;
const NET_SFTP_LOCAL_FILE = 1;
const NET_SFTP_STRING = 2;
const NET_SFTP_RESUME = 4;

//
//Packet Types
//
//@see Net_SFTP::Net_SFTP()
//@var Array
//@access private
//
//
//
//Status Codes
//
//@see Net_SFTP::Net_SFTP()
//@var Array
//@access private
//
//
//
//The Request ID
//
//The request ID exists in the off chance that a packet is sent out-of-order.  Of course, this library doesn't support
//concurrent actions, so it's somewhat academic, here.
//
//@var Integer
//@see Net_SFTP::_send_sftp_packet()
//@access private
//
//
//
//The Packet Type
//
//The request ID exists in the off chance that a packet is sent out-of-order.  Of course, this library doesn't support
//concurrent actions, so it's somewhat academic, here.
//
//@var Integer
//@see Net_SFTP::_get_sftp_packet()
//@access private
//
//
//
//Packet Buffer
//
//@var String
//@see Net_SFTP::_get_sftp_packet()
//@access private
//
//
//
//Extensions supported by the server
//
//@var Array
//@see Net_SFTP::_initChannel()
//@access private
//
//
//
//Server SFTP version
//
//@var Integer
//@see Net_SFTP::_initChannel()
//@access private
//
//
//
//Current working directory
//
//@var String
//@see Net_SFTP::_realpath()
//@see Net_SFTP::chdir()
//@access private
//
//
//
//Packet Type Log
//
//@see Net_SFTP::getLog()
//@var Array
//@access private
//
//
//
//Packet Log
//
//@see Net_SFTP::getLog()
//@var Array
//@access private
//
//
//
//Error information
//
//@see Net_SFTP::getSFTPErrors()
//@see Net_SFTP::getLastSFTPError()
//@var String
//@access private
//
//
//
//Directory Cache
//
//Rather than always having to open a directory and close it immediately there after to see if a file is a directory or
//rather than always
//
//@see Net_SFTP::_save_dir()
//@see Net_SFTP::_remove_dir()
//@see Net_SFTP::_is_dir()
//@var Array
//@access private
//
//
//
//Default Constructor.
//
//Connects to an SFTP server
//
//@param String $host
//@param optional Integer $port
//@param optional Integer $timeout
//@return Net_SFTP
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
//Returns the current directory name
//
//@return Mixed
//@access public
//
//
//
//Logs errors
//
//@param String $response
//@param optional Integer $status
//@access public
//
//
//
//Canonicalize the Server-Side Path Name
//
//SFTP doesn't provide a mechanism by which the current working directory can be changed, so we'll emulate it.  Returns
//the absolute (canonicalized) path.
//
//@see Net_SFTP::chdir()
//@param String $path
//@return Mixed
//@access private
//
//
//
//Changes the current directory
//
//@param String $dir
//@return Boolean
//@access public
//
//
//
//Returns a list of files in the given directory
//
//@param optional String $dir
//@return Mixed
//@access public
//
//
//
//Returns a detailed list of files in the given directory
//
//@param optional String $dir
//@return Mixed
//@access public
//
//
//
//Reads a list, be it detailed or not, of files in the given directory
//
//$realpath exists because, in the case of the recursive deletes and recursive chmod's $realpath has already
//been calculated.
//
//@param String $dir
//@param optional Boolean $raw
//@param optional Boolean $realpath
//@return Mixed
//@access private
//
//
//
//Returns the file size, in bytes, or false, on failure
//
//Files larger than 4GB will show up as being exactly 4GB.
//
//@param String $filename
//@return Mixed
//@access public
//
//
//
//Save directories to cache
//
//@param String $dir
//@access private
//
//
//
//Remove directories from cache
//
//@param String $dir
//@access private
//
//
//
//Checks cache for directory
//
//Mainly used by chdir, which is, in turn, also used for determining whether or not an individual
//file is a directory or not by stat() and lstat()
//
//@param String $dir
//@access private
//
//
//
//Returns general information about a file.
//
//Returns an array on success and false otherwise.
//
//@param String $filename
//@return Mixed
//@access public
//
//
//
//Returns general information about a file or symbolic link.
//
//Returns an array on success and false otherwise.
//
//@param String $filename
//@return Mixed
//@access public
//
//
//
//Returns general information about a file or symbolic link
//
//Determines information without calling Net_SFTP::_realpath().
//The second parameter can be either NET_SFTP_STAT or NET_SFTP_LSTAT.
//
//@param String $filename
//@param Integer $type
//@return Mixed
//@access private
//
//
//
//Returns the file size, in bytes, or false, on failure
//
//Determines the size without calling Net_SFTP::_realpath()
//
//@param String $filename
//@return Mixed
//@access private
//
//
//
//Truncates a file to a given length
//
//@param String $filename
//@param Integer $new_size
//@return Boolean
//@access public
//
//
//
//Sets access and modification time of file.
//
//If the file does not exist, it will be created.
//
//@param String $filename
//@param optional Integer $time
//@param optional Integer $atime
//@return Boolean
//@access public
//
//
//
//Changes file or directory owner
//
//Returns true on success or false on error.
//
//@param String $filename
//@param Integer $uid
//@param optional Boolean $recursive
//@return Boolean
//@access public
//
//
//
//Changes file or directory group
//
//Returns true on success or false on error.
//
//@param String $filename
//@param Integer $gid
//@param optional Boolean $recursive
//@return Boolean
//@access public
//
//
//
//Set permissions on a file.
//
//Returns the new file permissions on success or false on error.
//If $recursive is true than this just returns true or false.
//
//@param Integer $mode
//@param String $filename
//@param optional Boolean $recursive
//@return Mixed
//@access public
//
//
//
//Sets information about a file
//
//@param String $filename
//@param String $attr
//@param Boolean $recursive
//@return Boolean
//@access private
//
//
//
//Recursively sets information on directories on the SFTP server
//
//Minimizes directory lookups and SSH_FXP_STATUS requests for speed.
//
//@param String $path
//@param String $attr
//@param Integer $i
//@return Boolean
//@access private
//
//
//
//Creates a directory.
//
//@param String $dir
//@return Boolean
//@access public
//
//
//
//Helper function for directory creation
//
//@param String $dir
//@return Boolean
//@access private
//
//
//
//Removes a directory.
//
//@param String $dir
//@return Boolean
//@access public
//
//
//
//Uploads a file to the SFTP server.
//
//By default, Net_SFTP::put() does not read from the local filesystem.  $data is dumped directly into $remote_file.
//So, for example, if you set $data to 'filename.ext' and then do Net_SFTP::get(), you will get a file, twelve bytes
//long, containing 'filename.ext' as its contents.
//
//Setting $mode to NET_SFTP_LOCAL_FILE will change the above behavior.  With NET_SFTP_LOCAL_FILE, $remote_file will
//contain as many bytes as filename.ext does on your local filesystem.  If your filename.ext is 1MB then that is how
//large $remote_file will be, as well.
//
//Currently, only binary mode is supported.  As such, if the line endings need to be adjusted, you will need to take
//care of that, yourself.
//
//As for $start... if it's negative (which it is by default) a new file will be created or an existing
//file truncated depending on $mode | NET_SFTP_RESUME. If it's zero or positive it'll be updated at that
//spot.
//
//@param String $remote_file
//@param String $data
//@param optional Integer $mode
//@param optional Integer $start
//@return Boolean
//@access public
//@internal ASCII mode for SFTPv4/5/6 can be supported by adding a new function - Net_SFTP::setMode().
//
//
//
//Reads multiple successive SSH_FXP_WRITE responses
//
//Sending an SSH_FXP_WRITE packet and immediately reading its response isn't as efficient as blindly sending out $i
//SSH_FXP_WRITEs, in succession, and then reading $i responses.
//
//@param Integer $i
//@return Boolean
//@access private
//
//
//
//Downloads a file from the SFTP server.
//
//Returns a string containing the contents of $remote_file if $local_file is left undefined or a boolean false if
//the operation was unsuccessful.  If $local_file is defined, returns true or false depending on the success of the
//operation.
//
//$offset and $length can be used to download files in chunks.
//
//@param String $remote_file
//@param optional String $local_file
//@param optional Integer $offset
//@param optional Integer $length
//@return Mixed
//@access public
//
//
//
//Deletes a file on the SFTP server.
//
//@param String $path
//@param Boolean $recursive
//@return Boolean
//@access public
//
//
//
//Recursively deletes directories on the SFTP server
//
//Minimizes directory lookups and SSH_FXP_STATUS requests for speed.
//
//@param String $path
//@param Integer $i
//@return Boolean
//@access private
//
//
//
//Renames a file or a directory on the SFTP server
//
//@param String $oldname
//@param String $newname
//@return Boolean
//@access public
//
//
//
//Parse Attributes
//
//See '7.  File Attributes' of draft-ietf-secsh-filexfer-13 for more info.
//
//@param String $response
//@return Array
//@access private
//
//
//
//Attempt to identify the file type
//
//Quoting the SFTP RFC, "Implementations MUST NOT send bits that are not defined" but they seem to anyway
//
//@param Integer $mode
//@return Integer
//@access private
//
//
//
//Parse Longname
//
//SFTPv3 doesn't provide any easy way of identifying a file type.  You could try to open
//a file as a directory and see if an error is returned or you could try to parse the
//SFTPv3-specific longname field of the SSH_FXP_NAME packet.  That's what this function does.
//The result is returned using the
//{@link http://tools.ietf.org/html/draft-ietf-secsh-filexfer-04#section-5.2 SFTPv4 type constants}.
//
//If the longname is in an unrecognized format bool(false) is returned.
//
//@param String $longname
//@return Mixed
//@access private
//
//
//
//Sends SFTP Packets
//
//See '6. General Packet Format' of draft-ietf-secsh-filexfer-13 for more info.
//
//@param Integer $type
//@param String $data
//@see Net_SFTP::_get_sftp_packet()
//@see Net_SSH2::_send_channel_packet()
//@return Boolean
//@access private
//
//
//
//Receives SFTP Packets
//
//See '6. General Packet Format' of draft-ietf-secsh-filexfer-13 for more info.
//
//Incidentally, the number of SSH_MSG_CHANNEL_DATA messages has no bearing on the number of SFTP packets present.
//There can be one SSH_MSG_CHANNEL_DATA messages containing two SFTP packets or there can be two SSH_MSG_CHANNEL_DATA
//messages containing one SFTP packet.
//
//@see Net_SFTP::_send_sftp_packet()
//@return String
//@access private
//
//
//
//Returns a log of the packets that have been sent and received.
//
//Returns a string if NET_SFTP_LOGGING == NET_SFTP_LOG_COMPLEX, an array if NET_SFTP_LOGGING == NET_SFTP_LOG_SIMPLE and false if !defined('NET_SFTP_LOGGING')
//
//@access public
//@return String or Array
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
//Get supported SFTP versions
//
//@return Array
//@access public
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
class Net_SFTP extends Net_SSH2 {
    constructor() {
        super(...arguments);
        this.packet_types = Array();
        this.status_codes = Array();
        this.request_id = false;
        this.packet_type = -1;
        this.packet_buffer = "";
        this.extensions = Array();
        this.pwd = false;
        this.packet_type_log = Array();
        this.packet_log = Array();
        this.sftp_errors = Array();
        this.dirs = Array();
    }

    Net_SFTP(host, port = 22, timeout = 10) //http://tools.ietf.org/html/draft-ietf-secsh-filexfer-13#section-7.1
    //the order, in this case, matters quite a lot - see Net_SFTP::_parseAttributes() to understand why
    //http://tools.ietf.org/html/draft-ietf-secsh-filexfer-04#section-6.3
    //the flag definitions change somewhat in SFTPv5+.  if SFTPv5+ support is added to this library, maybe name
    //the array for that $this->open5_flags and similarily alter the constant names.
    //http://tools.ietf.org/html/draft-ietf-secsh-filexfer-04#section-5.2
    //see Net_SFTP::_parseLongname() for an explanation
    {
        super.Net_SSH2(host, port, timeout);
        this.packet_types = {
            1: "NET_SFTP_INIT",
            2: "NET_SFTP_VERSION",
            3: "NET_SFTP_OPEN",
            4: "NET_SFTP_CLOSE",
            5: "NET_SFTP_READ",
            6: "NET_SFTP_WRITE",
            7: "NET_SFTP_LSTAT",
            9: "NET_SFTP_SETSTAT",
            11: "NET_SFTP_OPENDIR",
            12: "NET_SFTP_READDIR",
            13: "NET_SFTP_REMOVE",
            14: "NET_SFTP_MKDIR",
            15: "NET_SFTP_RMDIR",
            16: "NET_SFTP_REALPATH",
            17: "NET_SFTP_STAT",
            18: "NET_SFTP_RENAME",
            101: "NET_SFTP_STATUS",
            102: "NET_SFTP_HANDLE",
            103: "NET_SFTP_DATA",
            104: "NET_SFTP_NAME",
            105: "NET_SFTP_ATTRS",
            200: "NET_SFTP_EXTENDED"
        };
        this.status_codes = {
            0: "NET_SFTP_STATUS_OK",
            1: "NET_SFTP_STATUS_EOF",
            2: "NET_SFTP_STATUS_NO_SUCH_FILE",
            3: "NET_SFTP_STATUS_PERMISSION_DENIED",
            4: "NET_SFTP_STATUS_FAILURE",
            5: "NET_SFTP_STATUS_BAD_MESSAGE",
            6: "NET_SFTP_STATUS_NO_CONNECTION",
            7: "NET_SFTP_STATUS_CONNECTION_LOST",
            8: "NET_SFTP_STATUS_OP_UNSUPPORTED",
            9: "NET_SFTP_STATUS_INVALID_HANDLE",
            10: "NET_SFTP_STATUS_NO_SUCH_PATH",
            11: "NET_SFTP_STATUS_FILE_ALREADY_EXISTS",
            12: "NET_SFTP_STATUS_WRITE_PROTECT",
            13: "NET_SFTP_STATUS_NO_MEDIA",
            14: "NET_SFTP_STATUS_NO_SPACE_ON_FILESYSTEM",
            15: "NET_SFTP_STATUS_QUOTA_EXCEEDED",
            16: "NET_SFTP_STATUS_UNKNOWN_PRINCIPAL",
            17: "NET_SFTP_STATUS_LOCK_CONFLICT",
            18: "NET_SFTP_STATUS_DIR_NOT_EMPTY",
            19: "NET_SFTP_STATUS_NOT_A_DIRECTORY",
            20: "NET_SFTP_STATUS_INVALID_FILENAME",
            21: "NET_SFTP_STATUS_LINK_LOOP",
            22: "NET_SFTP_STATUS_CANNOT_DELETE",
            23: "NET_SFTP_STATUS_INVALID_PARAMETER",
            24: "NET_SFTP_STATUS_FILE_IS_A_DIRECTORY",
            25: "NET_SFTP_STATUS_BYTE_RANGE_LOCK_CONFLICT",
            26: "NET_SFTP_STATUS_BYTE_RANGE_LOCK_REFUSED",
            27: "NET_SFTP_STATUS_DELETE_PENDING",
            28: "NET_SFTP_STATUS_FILE_CORRUPT",
            29: "NET_SFTP_STATUS_OWNER_INVALID",
            30: "NET_SFTP_STATUS_GROUP_INVALID",
            31: "NET_SFTP_STATUS_NO_MATCHING_BYTE_RANGE_LOCK"
        };
        this.attributes = {
            1: "NET_SFTP_ATTR_SIZE",
            2: "NET_SFTP_ATTR_UIDGID",
            4: "NET_SFTP_ATTR_PERMISSIONS",
            8: "NET_SFTP_ATTR_ACCESSTIME",
            [-1 << 31]: "NET_SFTP_ATTR_EXTENDED"
        };
        this.open_flags = {
            1: "NET_SFTP_OPEN_READ",
            2: "NET_SFTP_OPEN_WRITE",
            4: "NET_SFTP_OPEN_APPEND",
            8: "NET_SFTP_OPEN_CREATE",
            16: "NET_SFTP_OPEN_TRUNCATE",
            32: "NET_SFTP_OPEN_EXCL"
        };
        this.file_types = {
            1: "NET_SFTP_TYPE_REGULAR",
            2: "NET_SFTP_TYPE_DIRECTORY",
            3: "NET_SFTP_TYPE_SYMLINK",
            4: "NET_SFTP_TYPE_SPECIAL",
            5: "NET_SFTP_TYPE_UNKNOWN",
            6: "NET_SFTP_TYPE_SOCKET",
            7: "NET_SFTP_TYPE_CHAR_DEVICE",
            8: "NET_SFTP_TYPE_BLOCK_DEVICE",
            9: "NET_SFTP_TYPE_FIFO"
        };

        this._define_array(this.packet_types, this.status_codes, this.attributes, this.open_flags, this.file_types);
    }

    login(username) //SFTPv4+ defines a 'newline' extension.  SFTPv3 seems to have unofficial support for it via 'newline@vandyke.com',
    //         however, I'm not sure what 'newline@vandyke.com' is supposed to do (the fact that it's unofficial means that it's
    //         not in the official SFTPv3 specs) and 'newline@vandyke.com' / 'newline' are likely not drop-in substitutes for
    //         one another due to the fact that 'newline' comes with a SSH_FXF_TEXT bitmask whereas it seems unlikely that
    //         'newline@vandyke.com' would.
    //if (isset($this->extensions['newline@vandyke.com'])) {
    //            $this->extensions['newline'] = $this->extensions['newline@vandyke.com'];
    //            unset($this->extensions['newline@vandyke.com']);
    //        }
    //A Note on SFTPv4/5/6 support:
    //         <http://tools.ietf.org/html/draft-ietf-secsh-filexfer-13#section-5.1> states the following:
    //         "If the client wishes to interoperate with servers that support noncontiguous version
    //          numbers it SHOULD send '3'"
    //         Given that the server only sends its version number after the client has already done so, the above
    //         seems to be suggesting that v3 should be the default version.  This makes sense given that v3 is the
    //         most popular.
    //         <http://tools.ietf.org/html/draft-ietf-secsh-filexfer-13#section-5.5> states the following;
    //         "If the server did not send the "versions" extension, or the version-from-list was not included, the
    //          server MAY send a status response describing the failure, but MUST then close the channel without
    //          processing any further requests."
    //         So what do you do if you have a client whose initial SSH_FXP_INIT packet says it implements v3 and
    //         a server whose initial SSH_FXP_VERSION reply says it implements v4 and only v4?  If it only implements
    //         v4, the "versions" extension is likely not going to have been sent so version re-negotiation as discussed
    //         in draft-ietf-secsh-filexfer-13 would be quite impossible.  As such, what Net_SFTP would do is close the
    //         channel and reopen it with a new and updated SSH_FXP_INIT packet.
    {
        var args = arguments;

        if (!call_user_func_array(["Net_SSH2", "login"], args)) {
            return false;
        }

        this.window_size_server_to_client[NET_SFTP_CHANNEL] = this.window_size;
        var packet = pack("CNa*N3", NET_SSH2_MSG_CHANNEL_OPEN, "session".length, "session", NET_SFTP_CHANNEL, this.window_size, 16384);

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        this.channel_status[NET_SFTP_CHANNEL] = NET_SSH2_MSG_CHANNEL_OPEN;

        var response = this._get_channel_packet(NET_SFTP_CHANNEL);

        if (response === false) {
            return false;
        }

        packet = pack("CNNa*CNa*", NET_SSH2_MSG_CHANNEL_REQUEST, this.server_channels[NET_SFTP_CHANNEL], "subsystem".length, "subsystem", 1, "sftp".length, "sftp");

        if (!this._send_binary_packet(packet)) {
            return false;
        }

        this.channel_status[NET_SFTP_CHANNEL] = NET_SSH2_MSG_CHANNEL_REQUEST;
        response = this._get_channel_packet(NET_SFTP_CHANNEL);

        if (response === false) //from PuTTY's psftp.exe
            //we don't do $this->exec($command, false) because exec() operates on a different channel and plus the SSH_MSG_CHANNEL_OPEN that exec() does
            //is redundant
            {
                var command = "test -x /usr/lib/sftp-server && exec /usr/lib/sftp-server\n" + "test -x /usr/local/lib/sftp-server && exec /usr/local/lib/sftp-server\n" + "exec sftp-server";
                packet = pack("CNNa*CNa*", NET_SSH2_MSG_CHANNEL_REQUEST, this.server_channels[NET_SFTP_CHANNEL], "exec".length, "exec", 1, command.length, command);

                if (!this._send_binary_packet(packet)) {
                    return false;
                }

                this.channel_status[NET_SFTP_CHANNEL] = NET_SSH2_MSG_CHANNEL_REQUEST;
                response = this._get_channel_packet(NET_SFTP_CHANNEL);

                if (response === false) {
                    return false;
                }
            }

        this.channel_status[NET_SFTP_CHANNEL] = NET_SSH2_MSG_CHANNEL_DATA;

        if (!this._send_sftp_packet(NET_SFTP_INIT, "\\0\\0\\0\\3")) {
            return false;
        }

        response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_VERSION) {
            user_error("Expected SSH_FXP_VERSION");
            return false;
        }

        extract(unpack("Nversion", this._string_shift(response, 4)));
        this.version = version;

        while (!!response) {
            extract(unpack("Nlength", this._string_shift(response, 4)));

            var key = this._string_shift(response, length);

            extract(unpack("Nlength", this._string_shift(response, 4)));

            var value = this._string_shift(response, length);

            this.extensions[key] = value;
        }

        this.request_id = 1;

        switch (this.version) {
            case 2:
            case 3:
                break;

            default:
                return false;
        }

        this.pwd = this._realpath(".");

        this._save_dir(this.pwd);

        return true;
    }

    pwd() {
        return this.pwd;
    }

    _logError(response, status = -1) {
        if (status == -1) {
            extract(unpack("Nstatus", this._string_shift(response, 4)));
        }

        var error = this.status_codes[status];

        if (this.version > 2) {
            extract(unpack("Nlength", this._string_shift(response, 4)));
            this.sftp_errors.push(error + ": " + this._string_shift(response, length));
        } else {
            this.sftp_errors.push(error);
        }
    }

    _realpath(path) {
        if (this.pwd === false) //http://tools.ietf.org/html/draft-ietf-secsh-filexfer-13#section-8.9
            {
                if (!this._send_sftp_packet(NET_SFTP_REALPATH, pack("Na*", path.length, path))) {
                    return false;
                }

                var response = this._get_sftp_packet();

                switch (this.packet_type) {
                    case NET_SFTP_NAME:
                        this._string_shift(response, 4);

                        extract(unpack("Nlength", this._string_shift(response, 4)));
                        return this._string_shift(response, length);

                    case NET_SFTP_STATUS:
                        this._logError(response);

                        return false;

                    default:
                        user_error("Expected SSH_FXP_NAME or SSH_FXP_STATUS");
                        return false;
                }
            }

        if (path[0] != "/") {
            path = this.pwd + "/" + path;
        }

        path = path.split("/");
        var new = Array();

        for (var dir of Object.values(path)) {
            if (!dir.length) {
                continue;
            }

            switch (dir) {
                case "..":
                    new.pop();

                case ".":
                    break;

                default:
                    new.push(dir);
            }
        }

        return "/" + new.join("/");
    }

    chdir(dir) //confirm that $dir is, in fact, a valid directory
    {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        if (dir[dir.length - 1] != "/") {
            dir += "/";
        }

        dir = this._realpath(dir);

        if (this._is_dir(dir)) {
            this.pwd = dir;
            return true;
        }

        if (!this._send_sftp_packet(NET_SFTP_OPENDIR, pack("Na*", dir.length, dir))) {
            return false;
        }

        var response = this._get_sftp_packet();

        switch (this.packet_type) {
            case NET_SFTP_HANDLE:
                var handle = response.substr(4);
                break;

            case NET_SFTP_STATUS:
                this._logError(response);

                return false;

            default:
                user_error("Expected SSH_FXP_HANDLE or SSH_FXP_STATUS");
                return false;
        }

        if (!this._send_sftp_packet(NET_SFTP_CLOSE, pack("Na*", handle.length, handle))) {
            return false;
        }

        response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) {
            this._logError(response, status);

            return false;
        }

        this._save_dir(dir);

        this.pwd = dir;
        return true;
    }

    nlist(dir = ".") {
        return this._list(dir, false);
    }

    rawlist(dir = ".") {
        return this._list(dir, true);
    }

    _list(dir, raw = true, realpath = true) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        dir = this._realpath(dir + "/");

        if (dir === false) {
            return false;
        }

        if (!this._send_sftp_packet(NET_SFTP_OPENDIR, pack("Na*", dir.length, dir))) {
            return false;
        }

        var response = this._get_sftp_packet();

        switch (this.packet_type) {
            case NET_SFTP_HANDLE:
                var handle = response.substr(4);
                break;

            case NET_SFTP_STATUS:
                this._logError(response);

                return false;

            default:
                user_error("Expected SSH_FXP_HANDLE or SSH_FXP_STATUS");
                return false;
        }

        this._save_dir(dir);

        var contents = Array();

        while (true) //http://tools.ietf.org/html/draft-ietf-secsh-filexfer-13#section-8.2.2
        //why multiple SSH_FXP_READDIR packets would be sent when the response to a single one can span arbitrarily many
        //SSH_MSG_CHANNEL_DATA messages is not known to me.
        {
            if (!this._send_sftp_packet(NET_SFTP_READDIR, pack("Na*", handle.length, handle))) {
                return false;
            }

            response = this._get_sftp_packet();

            switch (this.packet_type) {
                case NET_SFTP_NAME:
                    extract(unpack("Ncount", this._string_shift(response, 4)));

                    for (var i = 0; i < count; i++) {
                        extract(unpack("Nlength", this._string_shift(response, 4)));

                        var shortname = this._string_shift(response, length);

                        extract(unpack("Nlength", this._string_shift(response, 4)));

                        var longname = this._string_shift(response, length);

                        var attributes = this._parseAttributes(response);

                        if (!(undefined !== attributes.type)) {
                            var fileType = this._parseLongname(longname);

                            if (fileType) {
                                attributes.type = fileType;
                            }
                        }

                        if (!raw) {
                            contents.push(shortname);
                        } else {
                            contents[shortname] = attributes;
                        }

                        if (undefined !== attributes.type && attributes.type == NET_SFTP_TYPE_DIRECTORY && (shortname != "." && shortname != "..")) {
                            this._save_dir(dir + "/" + shortname);
                        }
                    }

                    break;

                case NET_SFTP_STATUS:
                    extract(unpack("Nstatus", this._string_shift(response, 4)));

                    if (status != NET_SFTP_STATUS_EOF) {
                        this._logError(response, status);

                        return false;
                    }

                    break;

                default:
                    user_error("Expected SSH_FXP_NAME or SSH_FXP_STATUS");
                    return false;
            }
        }

        if (!this._send_sftp_packet(NET_SFTP_CLOSE, pack("Na*", handle.length, handle))) {
            return false;
        }

        response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) {
            this._logError(response, status);

            return false;
        }

        return contents;
    }

    size(filename) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        filename = this._realpath(filename);

        if (filename === false) {
            return false;
        }

        return this._size(filename);
    }

    _save_dir(dir) //preg_replace('#^/|/(?=/)|/$#', '', $dir) == str_replace('//', '/', trim($dir, '/'))
    {
        var dirs = dir.replace(/^/|/(?=/)|/$/g, "").split("/");
        var temp = this.dirs;

        for (var dir of Object.values(dirs)) {
            if (!(undefined !== temp[dir])) {
                temp[dir] = Array();
            }

            temp = temp[dir];
        }
    }

    _remove_dir(dir) {
        var dirs = dir.replace(/^/|/(?=/)|/$/g, "").split("/");
        var temp = this.dirs;

        for (var dir of Object.values(dirs)) {
            if (dir == end(dirs)) {
                delete temp[dir];
                return true;
            }

            if (!(undefined !== temp[dir])) {
                return false;
            }

            temp = temp[dir];
        }
    }

    _is_dir(dir) {
        var dirs = dir.replace(/^/|/(?=/)|/$/g, "").split("/");
        var temp = this.dirs;

        for (var dir of Object.values(dirs)) {
            if (!(undefined !== temp[dir])) {
                return false;
            }

            temp = temp[dir];
        }

        return true;
    }

    stat(filename) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        filename = this._realpath(filename);

        if (filename === false) {
            return false;
        }

        var stat = this._stat(filename, NET_SFTP_STAT);

        if (stat === false) {
            return false;
        }

        if (undefined !== stat.type) {
            return stat;
        }

        var pwd = this.pwd;
        stat.type = this.chdir(filename) ? NET_SFTP_TYPE_DIRECTORY : NET_SFTP_TYPE_REGULAR;
        this.pwd = pwd;
        return stat;
    }

    lstat(filename) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        filename = this._realpath(filename);

        if (filename === false) {
            return false;
        }

        var lstat = this._stat(filename, NET_SFTP_LSTAT);

        if (lstat === false) {
            return false;
        }

        if (undefined !== lstat.type) {
            return lstat;
        }

        var stat = this._stat(filename, NET_SFTP_STAT);

        if (lstat != stat) {
            return array_merge(lstat, {
                type: NET_SFTP_TYPE_SYMLINK
            });
        }

        var pwd = this.pwd;
        lstat.type = this.chdir(filename) ? NET_SFTP_TYPE_DIRECTORY : NET_SFTP_TYPE_REGULAR;
        this.pwd = pwd;
        return lstat;
    }

    _stat(filename, type) //SFTPv4+ adds an additional 32-bit integer field - flags - to the following:
    {
        var packet = pack("Na*", filename.length, filename);

        if (!this._send_sftp_packet(type, packet)) {
            return false;
        }

        var response = this._get_sftp_packet();

        switch (this.packet_type) {
            case NET_SFTP_ATTRS:
                return this._parseAttributes(response);

            case NET_SFTP_STATUS:
                this._logError(response);

                return false;
        }

        user_error("Expected SSH_FXP_ATTRS or SSH_FXP_STATUS");
        return false;
    }

    _size(filename) {
        var result = this._stat(filename, NET_SFTP_STAT);

        if (result === false) {
            return false;
        }

        return undefined !== result.size ? result.size : -1;
    }

    truncate(filename, new_size) {
        var attr = pack("N3", NET_SFTP_ATTR_SIZE, new_size / 4294967296, new_size);
        return this._setstat(filename, attr, false);
    }

    touch(filename, time = undefined, atime = undefined) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        filename = this._realpath(filename);

        if (filename === false) {
            return false;
        }

        if (!(undefined !== time)) {
            time = time();
        }

        if (!(undefined !== atime)) {
            atime = time;
        }

        var flags = NET_SFTP_OPEN_WRITE | NET_SFTP_OPEN_CREATE | NET_SFTP_OPEN_EXCL;
        var attr = pack("N3", NET_SFTP_ATTR_ACCESSTIME, time, atime);
        var packet = pack("Na*Na*", filename.length, filename, flags, attr);

        if (!this._send_sftp_packet(NET_SFTP_OPEN, packet)) {
            return false;
        }

        var response = this._get_sftp_packet();

        switch (this.packet_type) {
            case NET_SFTP_HANDLE:
                var handle = response.substr(4);

                if (!this._send_sftp_packet(NET_SFTP_CLOSE, pack("Na*", handle.length, handle))) {
                    return false;
                }

                response = this._get_sftp_packet();

                if (this.packet_type != NET_SFTP_STATUS) {
                    user_error("Expected SSH_FXP_STATUS");
                    return false;
                }

                extract(unpack("Nstatus", this._string_shift(response, 4)));

                if (status != NET_SFTP_STATUS_OK) {
                    this._logError(response, status);

                    return false;
                }

                return true;

            case NET_SFTP_STATUS:
                this._logError(response);

                break;

            default:
                user_error("Expected SSH_FXP_HANDLE or SSH_FXP_STATUS");
                return false;
        }

        return this._setstat(filename, attr, false);
    }

    chown(filename, uid, recursive = false) //quoting from <http://www.kernel.org/doc/man-pages/online/pages/man2/chown.2.html>,
    //"if the owner or group is specified as -1, then that ID is not changed"
    {
        var attr = pack("N3", NET_SFTP_ATTR_UIDGID, uid, -1);
        return this._setstat(filename, attr, recursive);
    }

    chgrp(filename, gid, recursive = false) {
        var attr = pack("N3", NET_SFTP_ATTR_UIDGID, -1, gid);
        return this._setstat(filename, attr, recursive);
    }

    chmod(mode, filename, recursive = false) {
        if ("string" === typeof mode && "number" === typeof filename) {
            var temp = mode;
            mode = filename;
            filename = temp;
        }

        var attr = pack("N2", NET_SFTP_ATTR_PERMISSIONS, mode & 7777);

        if (!this._setstat(filename, attr, recursive)) {
            return false;
        }

        if (recursive) {
            return true;
        }

        var packet = pack("Na*", filename.length, filename);

        if (!this._send_sftp_packet(NET_SFTP_STAT, packet)) {
            return false;
        }

        var response = this._get_sftp_packet();

        switch (this.packet_type) {
            case NET_SFTP_ATTRS:
                var attrs = this._parseAttributes(response);

                return attrs.permissions;

            case NET_SFTP_STATUS:
                this._logError(response);

                return false;
        }

        user_error("Expected SSH_FXP_ATTRS or SSH_FXP_STATUS");
        return false;
    }

    _setstat(filename, attr, recursive) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        filename = this._realpath(filename);

        if (filename === false) {
            return false;
        }

        if (recursive) {
            var i = 0;

            var result = this._setstat_recursive(filename, attr, i);

            this._read_put_responses(i);

            return result;
        }

        if (!this._send_sftp_packet(NET_SFTP_SETSTAT, pack("Na*a*", filename.length, filename, attr))) {
            return false;
        }

        var response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) {
            this._logError(response, status);

            return false;
        }

        return true;
    }

    _setstat_recursive(path, attr, i) {
        if (!this._read_put_responses(i)) {
            return false;
        }

        i = 0;

        var entries = this._list(path, true, false);

        if (entries === false) {
            return this._setstat(path, attr, false);
        }

        if (!entries) {
            return false;
        }

        for (var filename in entries) {
            var props = entries[filename];

            if (filename == "." || filename == "..") {
                continue;
            }

            if (!(undefined !== props.type)) {
                return false;
            }

            var temp = path + "/" + filename;

            if (props.type == NET_SFTP_TYPE_DIRECTORY) {
                if (!this._setstat_recursive(temp, attr, i)) {
                    return false;
                }
            } else {
                if (!this._send_sftp_packet(NET_SFTP_SETSTAT, pack("Na*a*", temp.length, temp, attr))) {
                    return false;
                }

                i++;

                if (i >= 50) {
                    if (!this._read_put_responses(i)) {
                        return false;
                    }

                    i = 0;
                }
            }
        }

        if (!this._send_sftp_packet(NET_SFTP_SETSTAT, pack("Na*a*", path.length, path, attr))) {
            return false;
        }

        i++;

        if (i >= 50) {
            if (!this._read_put_responses(i)) {
                return false;
            }

            i = 0;
        }

        return true;
    }

    mkdir(dir, mode = -1, recursive = false) //by not providing any permissions, hopefully the server will use the logged in users umask - their
    //default permissions.
    {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        dir = this._realpath(dir);
        var attr = mode == -1 ? "\\0\\0\\0\\0" : pack("N2", NET_SFTP_ATTR_PERMISSIONS, mode & 7777);

        if (recursive) {
            var dirs = dir.replace(//(?=/)|/$/g, "").split("/");

            if (!dirs[0]) {
                dirs.shift();
                dirs[0] = "/" + dirs[0];
            }

            for (var i = 0; i < dirs.length; i++) {
                var temp = dirs.slice(0, i + 1);
                temp = temp.join("/");

                var result = this._mkdir_helper(temp, attr);
            }

            return result;
        }

        return this._mkdir_helper(dir, attr);
    }

    _mkdir_helper(dir, attr) {
        if (!this._send_sftp_packet(NET_SFTP_MKDIR, pack("Na*a*", dir.length, dir, attr))) {
            return false;
        }

        var response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) {
            this._logError(response, status);

            return false;
        }

        this._save_dir(dir);

        return true;
    }

    rmdir(dir) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        dir = this._realpath(dir);

        if (dir === false) {
            return false;
        }

        if (!this._send_sftp_packet(NET_SFTP_RMDIR, pack("Na*", dir.length, dir))) {
            return false;
        }

        var response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) //presumably SSH_FX_NO_SUCH_FILE or SSH_FX_PERMISSION_DENIED?
            {
                this._logError(response, status);

                return false;
            }

        this._remove_dir(dir);

        return true;
    }

    put(remote_file, data, mode = NET_SFTP_STRING, start = -1) //according to the SFTP specs, NET_SFTP_OPEN_APPEND should "force all writes to append data at the end of the file."
    //in practice, it doesn't seem to do that.
    //$flags|= ($mode & NET_SFTP_RESUME) ? NET_SFTP_OPEN_APPEND : NET_SFTP_OPEN_TRUNCATE;
    //if NET_SFTP_OPEN_APPEND worked as it should the following (up until the -----------) wouldn't be necessary
    //--------------
    //http://tools.ietf.org/html/draft-ietf-secsh-filexfer-13#section-8.2.3
    //PuTTY uses 4096
    {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        remote_file = this._realpath(remote_file);

        if (remote_file === false) {
            return false;
        }

        var flags = NET_SFTP_OPEN_WRITE | NET_SFTP_OPEN_CREATE;
        var offset = 0;

        if (mode & NET_SFTP_RESUME || start >= 0) {
            if (start >= 0) {
                offset = start;
            } else {
                var size = this._size(remote_file);

                offset = size !== false ? size : 0;
            }
        } else {
            flags |= NET_SFTP_OPEN_TRUNCATE;
        }

        var packet = pack("Na*N2", remote_file.length, remote_file, flags, 0);

        if (!this._send_sftp_packet(NET_SFTP_OPEN, packet)) {
            return false;
        }

        var response = this._get_sftp_packet();

        switch (this.packet_type) {
            case NET_SFTP_HANDLE:
                var handle = response.substr(4);
                break;

            case NET_SFTP_STATUS:
                this._logError(response);

                return false;

            default:
                user_error("Expected SSH_FXP_HANDLE or SSH_FXP_STATUS");
                return false;
        }

        var initialize = true;

        if (mode & NET_SFTP_LOCAL_FILE) {
            if (!is_file(data)) {
                user_error(`${data} is not a valid file`);
                return false;
            }

            var fp = fopen(data, "rb");

            if (!fp) {
                return false;
            }

            size = filesize(data);
        } else {
            size = data.length;
        }

        var sent = 0;
        size = size < 0 ? (size & 2147483647) + 2147483648 : size;
        var sftp_packet_size = 4096;
        var i = 0;

        while (sent < size) {
            var temp = mode & NET_SFTP_LOCAL_FILE ? fread(fp, sftp_packet_size) : this._string_shift(data, sftp_packet_size);
            var subtemp = offset + sent;
            packet = pack("Na*N3a*", handle.length, handle, subtemp / 4294967296, subtemp, temp.length, temp);

            if (!this._send_sftp_packet(NET_SFTP_WRITE, packet)) {
                fclose(fp);
                return false;
            }

            sent += temp.length;
            i++;

            if (i == 50) {
                if (!this._read_put_responses(i)) {
                    i = 0;
                    break;
                }

                i = 0;
            }
        }

        if (!this._read_put_responses(i)) {
            return false;
        }

        if (mode & NET_SFTP_LOCAL_FILE) {
            fclose(fp);
        }

        if (!this._send_sftp_packet(NET_SFTP_CLOSE, pack("Na*", handle.length, handle))) {
            return false;
        }

        response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) {
            this._logError(response, status);

            return false;
        }

        return true;
    }

    _read_put_responses(i) {
        while (i--) {
            var response = this._get_sftp_packet();

            if (this.packet_type != NET_SFTP_STATUS) {
                user_error("Expected SSH_FXP_STATUS");
                return false;
            }

            extract(unpack("Nstatus", this._string_shift(response, 4)));

            if (status != NET_SFTP_STATUS_OK) {
                this._logError(response, status);

                break;
            }
        }

        return i < 0;
    }

    get(remote_file, local_file = false, offset = 0, length = -1) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        remote_file = this._realpath(remote_file);

        if (remote_file === false) {
            return false;
        }

        var packet = pack("Na*N2", remote_file.length, remote_file, NET_SFTP_OPEN_READ, 0);

        if (!this._send_sftp_packet(NET_SFTP_OPEN, packet)) {
            return false;
        }

        var response = this._get_sftp_packet();

        switch (this.packet_type) {
            case NET_SFTP_HANDLE:
                var handle = response.substr(4);
                break;

            case NET_SFTP_STATUS:
                this._logError(response);

                return false;

            default:
                user_error("Expected SSH_FXP_HANDLE or SSH_FXP_STATUS");
                return false;
        }

        if (local_file !== false) {
            var fp = fopen(local_file, "wb");

            if (!fp) {
                return false;
            }
        } else {
            var content = "";
        }

        var size = 1 << 20 < length || length < 0 ? 1 << 20 : length;

        while (true) {
            packet = pack("Na*N3", handle.length, handle, offset / 4294967296, offset, size);

            if (!this._send_sftp_packet(NET_SFTP_READ, packet)) {
                if (local_file !== false) {
                    fclose(fp);
                }

                return false;
            }

            response = this._get_sftp_packet();

            switch (this.packet_type) {
                case NET_SFTP_DATA:
                    var temp = response.substr(4);
                    offset += temp.length;

                    if (local_file === false) {
                        content += temp;
                    } else {
                        fputs(fp, temp);
                    }

                    break;

                case NET_SFTP_STATUS:
                    this._logError(response);

                    break;

                default:
                    user_error("Expected SSH_FXP_DATA or SSH_FXP_STATUS");

                    if (local_file !== false) {
                        fclose(fp);
                    }

                    return false;
            }

            if (length > 0 && length <= offset - size) {
                break;
            }
        }

        if (length > 0 && length <= offset - size) {
            if (local_file === false) {
                content = content.substr(0, length);
            } else {
                ftruncate(fp, length);
            }
        }

        if (local_file !== false) {
            fclose(fp);
        }

        if (!this._send_sftp_packet(NET_SFTP_CLOSE, pack("Na*", handle.length, handle))) {
            return false;
        }

        response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) {
            this._logError(response, status);

            return false;
        }

        if (undefined !== content) {
            return content;
        }

        return true;
    }

    delete(path, recursive = true) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        path = this._realpath(path);

        if (path === false) {
            return false;
        }

        if (!this._send_sftp_packet(NET_SFTP_REMOVE, pack("Na*", path.length, path))) {
            return false;
        }

        var response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) {
            this._logError(response, status);

            if (!recursive) {
                return false;
            }

            var i = 0;

            var result = this._delete_recursive(path, i);

            this._read_put_responses(i);

            return result;
        }

        return true;
    }

    _delete_recursive(path, i) //normally $entries would have at least . and .. but it might not if the directories
    //permissions didn't allow reading
    {
        if (!this._read_put_responses(i)) {
            return false;
        }

        i = 0;

        var entries = this._list(path, true, false);

        if (!entries) {
            return false;
        }

        for (var filename in entries) {
            var props = entries[filename];

            if (filename == "." || filename == "..") {
                continue;
            }

            if (!(undefined !== props.type)) {
                return false;
            }

            var temp = path + "/" + filename;

            if (props.type == NET_SFTP_TYPE_DIRECTORY) {
                if (!this._delete_recursive(temp, i)) {
                    return false;
                }
            } else {
                if (!this._send_sftp_packet(NET_SFTP_REMOVE, pack("Na*", temp.length, temp))) {
                    return false;
                }

                i++;

                if (i >= 50) {
                    if (!this._read_put_responses(i)) {
                        return false;
                    }

                    i = 0;
                }
            }
        }

        if (!this._send_sftp_packet(NET_SFTP_RMDIR, pack("Na*", path.length, path))) {
            return false;
        }

        this._remove_dir(path);

        i++;

        if (i >= 50) {
            if (!this._read_put_responses(i)) {
                return false;
            }

            i = 0;
        }

        return true;
    }

    rename(oldname, newname) {
        if (!(this.bitmap & NET_SSH2_MASK_LOGIN)) {
            return false;
        }

        oldname = this._realpath(oldname);
        newname = this._realpath(newname);

        if (oldname === false || newname === false) {
            return false;
        }

        var packet = pack("Na*Na*", oldname.length, oldname, newname.length, newname);

        if (!this._send_sftp_packet(NET_SFTP_RENAME, packet)) {
            return false;
        }

        var response = this._get_sftp_packet();

        if (this.packet_type != NET_SFTP_STATUS) {
            user_error("Expected SSH_FXP_STATUS");
            return false;
        }

        extract(unpack("Nstatus", this._string_shift(response, 4)));

        if (status != NET_SFTP_STATUS_OK) {
            this._logError(response, status);

            return false;
        }

        return true;
    }

    _parseAttributes(response) //SFTPv4+ have a type field (a byte) that follows the above flag field
    {
        var attr = Array();
        extract(unpack("Nflags", this._string_shift(response, 4)));
        {
            let _tmp_0 = this.attributes;

            for (var key in _tmp_0) {
                var value = _tmp_0[key];

                switch (flags & key) {
                    case NET_SFTP_ATTR_SIZE:
                        extract(unpack("Nupper/Nsize", this._string_shift(response, 8)));
                        attr.size = upper ? 4294967296 * upper : 0;
                        attr.size += size < 0 ? (size & 2147483647) + 2147483648 : size;
                        break;

                    case NET_SFTP_ATTR_UIDGID:
                        attr += unpack("Nuid/Ngid", this._string_shift(response, 8));
                        break;

                    case NET_SFTP_ATTR_PERMISSIONS:
                        attr += unpack("Npermissions", this._string_shift(response, 4));
                        attr += {
                            mode: attr.permissions
                        };

                        var fileType = this._parseMode(attr.permissions);

                        if (fileType !== false) {
                            attr += {
                                type: fileType
                            };
                        }

                        break;

                    case NET_SFTP_ATTR_ACCESSTIME:
                        attr += unpack("Natime/Nmtime", this._string_shift(response, 8));
                        break;

                    case NET_SFTP_ATTR_EXTENDED:
                        extract(unpack("Ncount", this._string_shift(response, 4)));

                        for (var i = 0; i < count; i++) {
                            extract(unpack("Nlength", this._string_shift(response, 4)));

                            var key = this._string_shift(response, length);

                            extract(unpack("Nlength", this._string_shift(response, 4)));
                            attr[key] = this._string_shift(response, length);
                        }

                }
            }
        }
        return attr;
    }

    _parseMode(mode) //values come from http://lxr.free-electrons.com/source/include/uapi/linux/stat.h#L12
    //see, also, http://linux.die.net/man/2/stat
    {
        switch (mode & 170000) {
            case 0:
                return false;

            case 40000:
                return NET_SFTP_TYPE_DIRECTORY;

            case 100000:
                return NET_SFTP_TYPE_REGULAR;

            case 120000:
                return NET_SFTP_TYPE_SYMLINK;

            case 10000:
                return NET_SFTP_TYPE_FIFO;

            case 20000:
                return NET_SFTP_TYPE_CHAR_DEVICE;

            case 60000:
                return NET_SFTP_BLOCK_DEVICE;

            case 140000:
                return NET_SFTP_TYPE_SOCKET;

            case 160000:
                return NET_SFTP_TYPE_SPECIAL;

            default:
                return NET_SFTP_TYPE_UNKNOWN;
        }
    }

    _parseLongname(longname) //http://en.wikipedia.org/wiki/Unix_file_types
    //http://en.wikipedia.org/wiki/Filesystem_permissions#Notation_of_traditional_Unix_permissions
    {
        if (preg_match("#^[^/]([r-][w-][xstST-]){3}#", longname)) {
            switch (longname[0]) {
                case "-":
                    return NET_SFTP_TYPE_REGULAR;

                case "d":
                    return NET_SFTP_TYPE_DIRECTORY;

                case "l":
                    return NET_SFTP_TYPE_SYMLINK;

                default:
                    return NET_SFTP_TYPE_SPECIAL;
            }
        }

        return false;
    }

    _send_sftp_packet(type, data) //http://php.net/microtime#61838
    {
        var packet = this.request_id !== false ? pack("NCNa*", data.length + 5, type, this.request_id, data) : pack("NCa*", data.length + 1, type, data);
        var start = strtok(Date.now() / 1000, " ") + strtok("");

        var result = this._send_channel_packet(NET_SFTP_CHANNEL, packet);

        var stop = strtok(Date.now() / 1000, " ") + strtok("");

        if ("undefined" !== typeof NET_SFTP_LOGGING) {
            var packet_type = "-> " + this.packet_types[type] + " (" + Math.round(stop - start, 4) + "s)";

            if (NET_SFTP_LOGGING == NET_SFTP_LOG_REALTIME) {
                echo("<pre>\r\n" + this._format_log([data], [packet_type]) + "\r\n</pre>\r\n");
                flush();
                ob_flush();
            } else {
                this.packet_type_log.push(packet_type);

                if (NET_SFTP_LOGGING == NET_SFTP_LOG_COMPLEX) {
                    this.packet_log.push(data);
                }
            }
        }

        return result;
    }

    _get_sftp_packet() //http://php.net/microtime#61838
    //SFTP packet length
    //SFTP packet type and data payload
    {
        this.curTimeout = false;
        var start = strtok(Date.now() / 1000, " ") + strtok("");

        while (this.packet_buffer.length < 4) {
            var temp = this._get_channel_packet(NET_SFTP_CHANNEL);

            if ("boolean" === typeof temp) {
                this.packet_type = false;
                this.packet_buffer = "";
                return false;
            }

            this.packet_buffer += temp;
        }

        extract(unpack("Nlength", this._string_shift(this.packet_buffer, 4)));
        var tempLength = length;
        tempLength -= this.packet_buffer.length;

        while (tempLength > 0) {
            temp = this._get_channel_packet(NET_SFTP_CHANNEL);

            if ("boolean" === typeof temp) {
                this.packet_type = false;
                this.packet_buffer = "";
                return false;
            }

            this.packet_buffer += temp;
            tempLength -= temp.length;
        }

        var stop = strtok(Date.now() / 1000, " ") + strtok("");
        this.packet_type = this._string_shift(this.packet_buffer).charCodeAt(0);

        if (this.request_id !== false) //remove the request id
            //account for the request id and the packet type
            {
                this._string_shift(this.packet_buffer, 4);

                length -= 5;
            } else //account for the packet type
            {
                length -= 1;
            }

        var packet = this._string_shift(this.packet_buffer, length);

        if ("undefined" !== typeof NET_SFTP_LOGGING) {
            var packet_type = "<- " + this.packet_types[this.packet_type] + " (" + Math.round(stop - start, 4) + "s)";

            if (NET_SFTP_LOGGING == NET_SFTP_LOG_REALTIME) {
                echo("<pre>\r\n" + this._format_log([packet], [packet_type]) + "\r\n</pre>\r\n");
                flush();
                ob_flush();
            } else {
                this.packet_type_log.push(packet_type);

                if (NET_SFTP_LOGGING == NET_SFTP_LOG_COMPLEX) {
                    this.packet_log.push(packet);
                }
            }
        }

        return packet;
    }

    getSFTPLog() {
        if (!("undefined" !== typeof NET_SFTP_LOGGING)) {
            return false;
        }

        switch (NET_SFTP_LOGGING) {
            case NET_SFTP_LOG_COMPLEX:
                return this._format_log(this.packet_log, this.packet_type_log);
                break;

            default:
                return this.packet_type_log;
        }
    }

    getSFTPErrors() {
        return this.sftp_errors;
    }

    getLastSFTPError() {
        return this.sftp_errors.length ? this.sftp_errors[this.sftp_errors.length - 1] : "";
    }

    getSupportedVersions() {
        var temp = {
            version: this.version
        };

        if (undefined !== this.extensions.versions) {
            temp.extensions = this.extensions.versions;
        }

        return temp;
    }

    _disconnect(reason) {
        this.pwd = false;

        super._disconnect(reason);
    }

};
