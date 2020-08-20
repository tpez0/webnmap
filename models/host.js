var mongoose = require('mongoose')
var Schema = mongoose.Schema

var hostSchema = new Schema({
    hostname: String,
    ip: String,
    mac: String,
    openPorts: Array , "default" : [],
    openVulns: Array , "default" : [], 
    osNmap: String,
    vendor: String
})

module.exports = mongoose.model('Host', hostSchema)