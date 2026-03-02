// This file is part of rsync-lib
//
// (c) Alberto Fernández <albertofem@gmail.com>
//
// For the full copyright and license information, please read
// the LICENSE file that was distributed with this source code.
/// namespace AFM\Rsync;
//
//Rsync wrapper. Many options are not implemented,
//but you can use setOptionalParameters
//
//@author Alberto Fernández <albertofem@gmail.com>
//

//
//@var string
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var array
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var array
//
//
//@var string
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var bool
//
//
//@var SSH
//
//
//Injects and validates config
//
//@param array $options
//
//
//@param $options
//
//
//Sync $origin directory with $target one.
//If SSH was configured, you must use absolute path
//in the target directory
//
//@param $origin
//@param $target
//
//@throws \InvalidArgumentException If the command failed
//
//
//@return string
//
//
//@return bool
//
//
//@param $archive
//
//
//@return bool
//
//
//@param $pruneEmptyDirs
//
//
//@param $skipNewerFiles
//
//
//@return bool
//
//
//@param $followSymLinks
//
//
//@return bool
//
//
//@param $dryRun
//
//
//@return bool
//
//
//@param $optionalParameters
//
//
//@return array
//
//
//@param $verbose
//
//
//@return bool
//
//
//@param $deleteExcluded
//
//
//@return bool
//
//
//@param $deleteFromTarget
//
//
//@return bool
//
//
//@param $exclude
//
//
//@return array
//
//
//@param $exclude
//
//
//@return string
//
//
//@param $recursive
//
//
//@return bool
//
//
//@param bool $times
//
//
//@return bool
//
//
//@param $showOutput
//
//
//@return bool
//
//
//@param $compression
//
//
//@return bool
//
//
//@param $remoteOrigin
//
//
//@return bool
//
//
//@param $removeSource
//
//
//@return bool
//
//
//@param $info
//
//
//@return bool
//
//
//@param $dest
//
//
//@return string
//
//
//Gets command generated for this current
//rsync configuration. You can use it to test
//or execute it later without using the sync method
//
//@param $origin
//@param $target
//
//@return Command
//
class Rsync extends AbstractProtocol {
	constructor(options: {} | any[] = Array()) {
		this.executable = "/usr/bin/rsync";
		this.archive = true;
		this.skipNewerFiles = false;
		this.followSymLinks = true;
		this.dryRun = false;
		this.optionalParameters = Array();
		this.verbose = false;
		this.deleteFromTarget = false;
		this.deleteExcluded = false;
		this.exclude = Array();
		this.excludeFrom = undefined;
		this.recursive = true;
		this.times = false;
		this.showOutput = true;
		this.compression = false;
		this.remoteOrigin = false;
		this.removeSource = false;
		this.info = false;
		this.compareDest = false;
		this.pruneEmptyDirs = false;
		this.setOption(options, "executable", "setExecutable");
		this.setOption(options, "archive", "setArchive");
		this.setOption(options, "update", "setSkipNewerFiles");
		this.setOption(options, "follow_symlinks", "setFollowSymLinks");
		this.setOption(options, "dry_run", "setDryRun");
		this.setOption(options, "option_parameters", "setOptionalParameters");
		this.setOption(options, "verbose", "setVerbose");
		this.setOption(options, "delete_from_target", "setDeleteFromTarget");
		this.setOption(options, "delete_excluded", "setDeleteExcluded");
		this.setOption(options, "exclude", "setExclude");
		this.setOption(options, "excludeFrom", "setExcludeFrom");
		this.setOption(options, "recursive", "setRecursive");
		this.setOption(options, "times", "setTimes");
		this.setOption(options, "show_output", "setShowOutput");
		this.setOption(options, "ssh", "setSshOptions");
		this.setOption(options, "compression", "setCompression");
		this.setOption(options, "remote_origin", "setRemoteOrigin");
		this.setOption(options, "remove_source", "setRemoveSource");
		this.setOption(options, "info", "setInfo");
		this.setOption(options, "compare_dest", "setCompareDest");
		this.setOption(options, "prune_empty_dirs", "setPruneEmptyDirs");
	}

	setSshOptions(options) {
		if (is_null(this.ssh)) this.ssh = new SSH(options);
	}

	sync(origin, target) //print ('Origin :-' . $origin  . '-' . PHP_EOL)	;
	//print ('Target :-' . $target  . '-' . PHP_EOL)	;
	{
		var command = this.getCommand(origin, target);
		command.execute(this.showOutput);
	}

	getExecutable() {
		return this.executable;
	}

	getArchive() {
		return this.archive;
	}

	setArchive(archive) {
		this.archive = archive;
	}

	getPruneEmptyDirs() {
		return this.pruneEmptyDirs;
	}

	setPruneEmptyDirs(pruneEmptyDirs) {
		this.pruneEmptyDirs = pruneEmptyDirs;
	}

	setSkipNewerFiles(skipNewerFiles) {
		this.skipNewerFiles = skipNewerFiles;
	}

	getSkipNewerFiles() {
		return this.skipNewerFiles;
	}

	setFollowSymLinks(followSymLinks) {
		this.followSymLinks = followSymLinks;
	}

	getFollowSymLinks() {
		return this.followSymLinks;
	}

	setDryRun(dryRun) {
		this.dryRun = dryRun;
	}

	getDryRun() {
		return this.dryRun;
	}

	setOptionalParameters(optionalParameters) {
		this.optionalParameters = optionalParameters;
	}

	getOptionalParameters() {
		return this.optionalParameters;
	}

	setVerbose(verbose) {
		this.verbose = verbose;
	}

	getVerbose() {
		return this.verbose;
	}

	setDeleteExcluded(deleteExcluded) {
		this.deleteExcluded = deleteExcluded;
	}

	getDeleteExcluded() {
		return this.deleteExcluded;
	}

	setDeleteFromTarget(deleteFromTarget) {
		this.deleteFromTarget = deleteFromTarget;
	}

	getDeleteFromTarget() {
		return this.deleteFromTarget;
	}

	setExclude(exclude) {
		this.exclude = exclude;
	}

	getExclude() {
		return this.exclude;
	}

	setExcludeFrom(excludeFrom) {
		this.excludeFrom = excludeFrom;
	}

	getExcludeFrom() {
		return this.excludeFrom;
	}

	setRecursive(recursive) {
		this.recursive = recursive;
	}

	getRecursive() {
		return this.recursive;
	}

	setTimes(times) {
		this.times = times;
	}

	getTimes() {
		return this.times;
	}

	setShowOutput(showOutput) {
		this.showOutput = showOutput;
	}

	getShowOutput() {
		return this.showOutput;
	}

	setCompression(compression) {
		this.compression = compression;
	}

	getCompression() {
		return this.compression;
	}

	setRemoteOrigin(remoteOrigin) {
		this.remoteOrigin = !!remoteOrigin;
	}

	getRemoteOrigin() {
		return this.remoteOrigin;
	}

	setRemoveSource(removeSource) {
		this.removeSource = !!removeSource;
	}

	getRemoveSource() {
		return this.removeSource;
	}

	setInfo(info) {
		this.info = info;
	}

	getInfo() {
		return this.info;
	}

	setCompareDest(dest) {
		this.compareDest = dest;
	}

	getCompareDest() {
		return this.compareDest;
	}

	getCommand(origin, target) {
		var command = new Command(this.executable);
		if (this.skipNewerFiles) command.addOption("u");
		if (this.followSymLinks) command.addOption("L");
		if (this.dryRun) command.addOption("n");
		if (this.verbose) command.addOption("v");
		if (this.compression) command.addOption("z");
		var extra_options = this.getOptionalParameters();

		if (!!extra_options) //if the extra options were given as a flat string, then convert it to an array
			{
				if ("string" === typeof extra_options) extra_options = str_split(extra_options);

				if (Array.isArray(extra_options)) {
					for (var option of Object.values(extra_options)) {
						command.addOption(option);
					}
				}
			}

		if (this.times) command.addArgument("times");
		if (this.deleteFromTarget) command.addArgument("delete");
		if (this.removeSource) command.addArgument("remove-source-files");
		if (this.deleteExcluded) command.addArgument("delete-excluded");
		if (this.info) command.addArgument("info", this.info);
		if (this.compareDest) command.addArgument("compare-dest", this.compareDest);

		if (!!this.exclude) {
			for (var excluded of Object.values(this.exclude)) {
				command.addArgument("exclude", excluded);
			}
		}

		if (!!this.excludeFrom) {
			command.addArgument("exclude-from", this.excludeFrom);
		}

		if (this.archive) command.addOption("a");
		if (!this.archive && this.recursive) command.addOption("r");
		if (this.pruneEmptyDirs) command.addArgument("prune-empty-dirs");

		if (!is_null(this.ssh)) {
			var ssh = this.ssh.getConnectionOptions();
			command.addArgument("rsh", ssh);
		}

		if (is_null(this.ssh)) {
			command.addParameter(origin);
			command.addParameter(target);
		} else if (this.remoteOrigin) {
			command.addParameter(this.ssh.getHostConnection() + ":" + origin);
			command.addParameter(target);
		} else {
			command.addParameter(origin);
			command.addParameter(this.ssh.getHostConnection() + ":" + target);
		}

		return command;
	}

};
