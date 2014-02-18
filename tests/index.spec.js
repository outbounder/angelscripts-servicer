var fs = require("fs")

describe("angelscripts-servicer", function(){
  var Angel = require("organic-angel")
  var angel;
  var cwd;

  beforeEach(function(next){
    angel = new Angel(false)
    angel.loadScripts([__dirname+"/../index.js"], next)
    cwd = process.cwd()
    process.chdir(__dirname+"/data")
  })

  afterEach(function(){
    process.chdir(cwd)
  })

  it("generates upstart script locally", function(next){
    angel.do("make service ./service.json ./test.conf", function(err, status){
      expect(err).toBeFalsy()
      expect(status).toBe("done")
      expect(fs.existsSync(__dirname+"/data/test.conf")).toBe(true)
      fs.unlink(__dirname+"/data/test.conf", next)
    })
  })
})