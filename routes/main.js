var router = require('express').Router()
var Host = require('../models/host')
var nmap = require('node-nmap-vulners');
nmap.nmapLocation = "nmap"; //default

var isScanning = false;
var scanStartedAt = "";

/* **************** GET ***************** */
// GET root
router.get('/', function (req, res, next) {

    Host
        .find({})
        .exec(function (err, hosts) {
            Host.countDocuments().exec(function (err, count) {
                if (err) return next(err)
                res.render('index', {
                    host: hosts,
                    isScanning: isScanning,
                    scanStartedAt: scanStartedAt,
                })
            })
        })
})

// GET /#scan
router.get('/#scan', function (req, res, next) {

    Host
        .find({})
        .exec(function (err, hosts) {
            Host.countDocuments().exec(function (err, count) {
                if (err) return next(err)
                res.render('index', {
                    host: hosts
                })
            })
        })
})

// GET /#results
router.get('/#results', function (req, res, next) {

    Host
        .find({})
        .exec(function (err, hosts) {
            Host.countDocuments().exec(function (err, count) {
                if (err) return next(err)
                res.render('index', {
                    host: hosts,
                    isScanning: isScanning,
                })
            })
        })
})

// GET /dropdb than redirect to /#results
router.get('/dropdb', function (req, res, next) {

    Host.deleteMany({}, function (err) {
        console.log('collection dropped');
    })
    res.redirect('/#results');
})


/* **************** POST ***************** */
// POST IP to nmap scan
router.post('/', function (req, res, next) {

    var ipToScan = req.body.ipToScan
    
    // add parameters
    if (req.body.standardport == "on") {
        var ipToScan = ipToScan + " -p0-1023";
    } else {
        var ipToScan = ipToScan
    }

    if (req.body.vulnon == "on") {
        var ipToScan = ipToScan + " -sV --script vulners";
    } else {
        var ipToScan = ipToScan
    }
    //

    var objNMapScan = new nmap.NmapScan(ipToScan);

    objNMapScan.on('complete', function (data) {
        
        console.log("Scan completed");
        /* uncomment to view data on console
        console.log(data);
        */
        isScanning = false;

        var ResultsLength = objNMapScan.scanResults

        for (j = 0; j < ResultsLength.length; j++) {

            var host = new Host()
            var Results = objNMapScan.scanResults;

            host.ip = Results[j].ip;
            host.hostname = Results[j].hostname;
            host.mac = Results[j].mac;
            if (Results[j].openPorts != null) {
                for (i = 0; i < Results[j].openPorts.length; i++) {
                    host.openPorts[i] = Results[j].openPorts[i].port;
                }
            } else {
                host.openPorts[0] = "0";
            }
            if (Results[j].openPorts != null) {
                for (i = 0; i < Results[j].openPorts.length; i++) {
                    host.openVulns[i] = Results[j].openPorts[i].vulners;
                    // console.log(host.openVulns[i]);
                }
            } else {
                host.openVulns[0] = "n/a";
            }
            host.osNmap = Results[j].osNmap;
            host.vendor = Results[j].vendor;

            // remove previous scan
            Host.findOneAndDelete({
                ip: host.ip
            }, function (err, docs) {
                if (err) {
                    console.log(err)
                }
            });

            // save on db
            host.save(function (err) {
                if (err) throw err
            })
        }
    });

    objNMapScan.on('error', function (error) {
        console.log(error);
        res.redirect('/#results');

    });

    function LaunchScan() {
        isScanning = true;
        var today = new Date();
        scanStartedAt = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log("Scan started at " + scanStartedAt);
        res.redirect('/#results');
        objNMapScan.startScan();
    }

    LaunchScan();
})

module.exports = router