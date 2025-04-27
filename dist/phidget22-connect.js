"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
// To default to previous behavior before this was an option.
var DEFAULT_RETRY_ON_FAIL = false;
module.exports = function (RED) {
    function Phidget22ConnectNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.status({ fill: 'green', shape: 'ring', text: 'connecting' });
        try {
            var conn_1 = new phidget22.NetworkConnection(parseInt(config.port), config.hostname);
            conn_1.onAuthenticationNeeded = function () {
                var msg = { topic: 'AuthenticationNeeded', payload: {} };
                node.send(msg);
                // The type on onAuthenticationNeeded from phidget22 package may be wrong; doesn't allow null.
                return '';
            };
            conn_1.onConnect = function () {
                var msg = { topic: 'Connect', payload: {} };
                node.status({ fill: 'green', shape: 'dot', text: 'connected' });
                node.send(msg);
            };
            conn_1.onDisconnect = function () {
                var msg = { topic: 'Disconnect', payload: {} };
                node.status({ fill: 'red', shape: 'ring', text: 'disconnected' });
                node.send(msg);
            };
            conn_1.onError = function (code, errMsg) {
                var msg = { topic: 'Error', payload: { code: code, msg: errMsg } };
                node.send(msg);
            };
            if (config.debug) {
                node.warn("Attempting to Connect to Server (".concat(config.hostname, ":").concat(config.port, ")"));
            }
            conn_1
                .connect(config.retry || DEFAULT_RETRY_ON_FAIL)
                .then(function () {
                if (config.debug) {
                    node.warn("Connect Success (".concat(config.hostname, ":").concat(config.port, ")"));
                }
                node.status({ fill: 'green', shape: 'dot', text: 'connected' });
            })
                .catch(function (err) {
                node.error('Connect failed: ' + err);
                node.status({ fill: 'red', shape: 'dot', text: 'connect failed' });
            });
            node.on('close', function (done) {
                try {
                    conn_1.close();
                    conn_1.delete();
                    node.status({ fill: 'green', shape: 'ring', text: 'closed' });
                    done();
                }
                catch (err) {
                    node.status({ fill: 'red', shape: 'ring', text: 'disconnect failed' });
                    done(err);
                }
            });
        }
        catch (err) {
            node.error('error creating connection: ' + err);
            node.status({ fill: 'red', shape: 'dot', text: 'error' });
        }
    }
    RED.nodes.registerType('phidget22-connect', Phidget22ConnectNode);
    RED.httpAdmin.get('/phidget22/js/*', function (req, res) {
        var options = {
            root: __dirname + '/static/',
            dotfiles: 'deny',
        };
        var filename = req.params[0];
        res.sendFile(filename, options);
    });
};
