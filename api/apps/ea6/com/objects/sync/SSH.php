// This file is part of rsync-lib
//
// (c) Alberto Fernández <albertofem@gmail.com>
//
// For the full copyright and license information, please read
// the LICENSE file that was distributed with this source code.
//namespace AFM\Rsync;
//
//Abstract SSH connection command. Note that if you
//don't specify a public key, you will be prompted for
//the remote server password
//
//@author Alberto <albertofem@gmail.com>
//

//
//@var string
//
//
//@var string
//
//
//@var int
//
//
//@var string
//
//
//@var null
//
//
//Injects and validates config
//
//@param array $options
//
//
//@param $host
//
//
//@return mixed
//
//
//@param $port
//
//@throws \InvalidArgumentException If the port is not numeric
//
//
//@return int
//
//
//@param $publicKey
//@throws \InvalidArgumentException
//
//
//@return null
//
//
//@param $username
//
//
//@return mixed
//
//
//Gets commands for this SSH connection
//
//@param bool $hostConnection
//
//@return string
//
//@throws \InvalidArgumentException If you don't specify a SSH username or host
//
//
//Gets only connection options, without user@host string
//
//@return string
//
//
//Gets only host connection, without the rest
//of options
//
//@return string
//
//
//@param $executable
//
//
//@return string
//
class SSH extends AbstractProtocol {
	constructor(options: {} | any[] = Array()) {
		this.executable = "ssh";
		this.port = 22;
		this.publicKey = undefined;
		this.setOption(options, "executable", "setExecutable");
		this.setOption(options, "host", "setHost");
		this.setOption(options, "port", "setPort");
		this.setOption(options, "username", "setUsername");
		this.setOption(options, "public_key", "setPublicKey");
	}

	setHost(host) {
		this.host = host;
	}

	getHost() {
		return this.host;
	}

	setPort(port) {
		if (!("number" === typeof port)) print("SSH port must be an integer");
		this.port = port;
	}

	getPort() {
		return this.port;
	}

	setPublicKey(publicKey) {
		if (!is_readable(publicKey)) print("SSH public key '" + publicKey + "' is not readable");
		this.publicKey = publicKey;
	}

	getPublicKey() {
		return this.publicKey;
	}

	setUsername(username) {
		this.username = username;
	}

	getUsername() {
		return this.username;
	}

	getCommand(hostConnection = true) {
		if (is_null(this.username)) print("You must specify a SSH username");
		if (is_null(this.host)) print("You must specify a SSH host to connect");
		var command = new Command(this.executable);
		if (this.port != 22) command.addArgument("p", this.port);
		if (hostConnection) command.addParameter(this.getHostConnection());
		return command;
	}

	getConnectionOptions() {
		return String(this.getCommand(false));
	}

	getHostConnection() {
		return this.username + "@" + this.host;
	}

	setExecutable(executable) {
		this.executable = executable;
	}

	getExecutable() {
		return this.executable;
	}

};
