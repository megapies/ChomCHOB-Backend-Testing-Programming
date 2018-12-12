var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")   // for create path string
var app = express()
const ModelLoader = require('./models/loader')
const modelLoader = new ModelLoader()
// var routes = require("./routes")
// const router = new (require('./router'))(express.Router)

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json()) 

const models = (async function() {
	if(await modelLoader.connect()) {
		const models = await modelLoader.load()
		return models
	}
})()
// router.route(routes)
// app.use(router.getRouter())

// initialize server
var server = app.listen(3000, function(){
	var host = server.address().address
	var port = server.address().port

	console.log("Listening at http://%s:%s", host, port)
})