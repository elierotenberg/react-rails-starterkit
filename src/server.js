var _ = require('lodash-next');
var spawn = require('child_process').spawn;
var watch = require('node-watch');

var childs = [];

['render-server', 'uplink-server'].forEach((name) => {
  function spawnWorker() {
    var child = spawn('node', [__dirname + '/' + name + '.js']);

    child.stdout.setEncoding('utf-8');
    child.stdout.on('data', (data) => {
      console.log(name, ':', data.slice(0, -1));
    });

    child.stderr.setEncoding('utf-8');
    child.stderr.on('data', (data) => {
      console.warn(name, ':', data.slice(0, -1));
    });

    child.on('close', (code) => {
      console.error(name, ':', 'exited with code', code);
      _.defer(spawnWorker);
    });

    childs.push(child);
  }

  spawnWorker();
});

watch(__dirname, _.debounce(function restart() {
  console.warn('Restarting children processes.');
  childs.forEach((child) => child.kill());
}, 1000));
