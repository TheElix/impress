"use strict";

impress.scale = {};

var zmq = impress.require('zmq');

if (zmq) {

  api.zmq = zmq;
  impress.scale.instance = 'standalone'; // standalone, controller, server, balancer, brocker
  impress.scale.status = 'online';   // sleep, online, offline, updating, error, maintenance

  // Init connection to cloud controller
  //
  impress.scale.init = function() {
    if (api.cluster.isMaster && impress.config.scale) {
      var cs = impress.config.scale;

      if (cs.instance === 'controller') {

        console.log('Starting cloud controller...'.green.bold);

        // ZeroMQ publisher socket
        //
        impress.scale.pub = zmq.socket('pub');
        impress.scale.pub.bind(cs.controller + ':' + cs.subPort, function(err) {
          if (err) console.log(err);
          else console.log('  zmq publisher ' + cs.subPort);
        });

        // ZeroMQ reply socket
        //
        impress.scale.rep = zmq.socket('rep');
        impress.scale.rep.on('message', function(request) {
          impress.scale.rep.send('ok');
          impress.scale.pub.send(request.toString());
        });

        impress.scale.rep.bind(cs.controller + ':' + cs.reqPort + '', function(err) {
          if (err) console.log(err);
          else console.log('  zmq reply ' + cs.reqPort);
        });

      } else if (cs.instance === 'server') {

        console.log('Connecting to cloud controller...'.green.bold);

        // ZeroMQ subscriber socket
        //
        impress.scale.sub = zmq.socket('sub');
        impress.scale.sub.on('message', function(reply) {
          var workerId,
              msg = JSON.parse(reply.toString()),
              clusterId = 'C' + msg.node.between('C', 'N');
          if (clusterId !== impress.config.scale.name) {
            for (workerId in api.cluster.workers) api.cluster.workers[workerId].send(msg);
          }
        });
        impress.scale.sub.connect(cs.controller + ':' + cs.subPort);
        impress.scale.sub.subscribe('');
        console.log('  zmq subscriber ' + cs.subPort);

        // ZeroMQ request socket
        //
        impress.scale.req = zmq.socket('req');
        impress.scale.req.on('message', function(reply) {
        });
        impress.scale.req.connect(cs.controller + ':' + cs.reqPort);
        console.log('  zmq request ' + cs.reqPort);

        // impress.scale.controller = {};
        // impress.scale.controller.lastCheck = null;       // new Date().getTime();
        // impress.scale.controller.lastCheckResult = null; // true, false, null
        //
        // Check connection to controller
        //
        // impress.scale.controller.check = function() {
        // };
      }
    }
  };

}
