// This file is part of rsync-lib
//
// (c) Alberto Fernández <albertofem@gmail.com>
//
// For the full copyright and license information, please read
// the LICENSE file that was distributed with this source code.
//namespace AFM\Rsync;
//
//Abstract protocol
//
//@author Alberto <albertofem@gmail.com>
//

//
//@var string
//
//
//Shortcut to set options from array config
//
//@param array $options
//@param $name
//@param $method
//
//
//Sets rsync executable location, i.e.: /usr/bin/rsync
//
//@param $rsyncLocation
//
//@throws \InvalidArgumentException If the rsync location is not executable
//
class AbstractProtocol {
	constructor() {
		this.executable = "";
	}

	setOption(options: {} | any[], name, method) {
		if (undefined !== options[name]) this[method](options[name]);
	}

	setExecutable(rsyncLocation) {
		if (!is_executable(rsyncLocation)) print("Rsync location '" + rsyncLocation + "' is invalid");
		this.executable = rsyncLocation;
	}

};
