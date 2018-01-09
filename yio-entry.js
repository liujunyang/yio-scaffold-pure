var path = require('path');
var fs = require('fs');

var _undefined = void 0;

let util = {
	formatArgs: function (argv) {
		var obj = {};

		var arr = [];
		var argvLength = argv.length;

		for (var i = argvLength - 1; i >= 0; i--) {
			if (argv[i].indexOf('=') === -1) {
				break;
			} else {
				arr.push(argv[i]);
			}
		}

		for(i = 0, len = arr.length; i < len; i++) {
			var subArr = arr[i].split('=');

			if (subArr[1] !== _undefined && subArr[1] !== 'undefined') {
				obj[subArr[0]] = subArr[1];
			}

		}

		return obj;
	}
}

function run (_process) {
	const util = require('./util');
	const args = util.formatArgs(_process.argv);

	return function(callback) {
		callback({
			userDir: args.userDir,
			srcDir: args.srcDir,
			distDir: args.distDir,
			taskName: args.taskName,
			port: args.port
		});
	}

}

run(process)(context => {
	console.log('进入实际项目', context)
})
