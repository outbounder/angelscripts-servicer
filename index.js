var mustache = require("mustache")
var fs = require("fs")
var _ = require("underscore")
var exec = require("child_process").exec

var generateScript = function(angel, serviceData, next) {
  var template = serviceData.template || __dirname+"/templates/upstart-node.stache"
  serviceData.startOn = serviceData.startOn || "filesystem and started networking"
  fs.readFile(template, function(err, content){
    if(err) return next(err)
    var upstartContent =  mustache.render(content.toString(), serviceData)
    fs.writeFile(angel.cmdData.dest, upstartContent, function(err){
      if(err) return next(err)
      next(null, "done")
    })
  })
}

module.exports = function(angel) {
  var mustache = require("mustache")
  angel.on("make service :src :dest", function(angel, next){
    var serviceData
    try{ 
      serviceData = JSON.parse(fs.readFileSync(angel.cmdData.src, {
        encoding: "utf8"
      }))
    }catch(err){
      return next(err)
    }
    
    if(angel.cmdData.dest.indexOf("@") === -1) {
      generateScript(angel, serviceData, next)
    } else {
      var remote = angel.cmdData.dest
      angel.cmdData.dest = "/tmp/upstartscript"
      generateScript(angel, serviceData, function(err){
        if(err) return next(err)
        exec("scp /tmp/upstartscript "+remote+":/etc/init/"+serviceData.start+".conf", next)
      })
    }
  })
}