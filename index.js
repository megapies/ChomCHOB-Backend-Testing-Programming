process.env.NODE_PATH = "./";
require("module").Module._initPaths();

var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")   // for create path string
const ModelLoader = require('./models')
const RouterLoader = require('./router/router')
const CoreController = require('controllers')


// var routes = require("./routes")
// const router = new (require('./router'))(express.Router)

class Application {
	constructor(coreController, routerLoader) {
		this.models = {}
		this.app = express()
		this.routerLoader = routerLoader
		this.coreController = coreController

		this.app.use(bodyParser.urlencoded({
			extended: true
		}))
		this.app.use(bodyParser.json()) 
	}

	async start() {

		this.routerLoader.load()
		this.app.use(this.routerLoader.getRouter())

		// initialize server
		const server = this.app.listen(3000, function(){
			const host = server.address().address
			const port = server.address().port

			console.log("Listening at http://%s:%s", host, port)
		})
	}
}

const routerLoader = new RouterLoader(express.Router())
const coreController = CoreController.instance
const application = new Application(coreController, routerLoader)
application.start()



