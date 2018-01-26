const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
return;

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
	switch (context.taskName) {
		case 'dev-daily':
		case 'dev-pre':
		case 'dev-prod':
		case 'build-daily':
		case 'build-pre':
		case 'build-prod':
			break;
		default:
			console.log(`task ${context.taskName} is not supported. Task supported list:\n\n${[
				'-  dev-daily                  dev daily',
        '-  dev-pre                    dev pre',
        '-  dev-prod                   dev prod',
        '',
        '-  build-daily                build daily',
        '-  build-pre                  build pre',
        '-  build-prod                 build prod',
			].join('\n')}\n`)
			return;
	}

	if (/dev-/.test(context.taskName)) {
		console.log(44, context)
		// require('./handler/webpack.dev')(context);
		let cp = require('child_process').spawn('npm run dev')
	}

	if (/build-/.test(context.taskName)) {
	}
})
