var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")   // for create path string
const ModelLoader = require('./models/loader')
// var routes = require("./routes")
// const router = new (require('./router'))(express.Router)

class Application {
	constructor(modelLoader) {
		this.models = {}
		this.app = express()
		this.modelLoader = modelLoader

		this.app.use(bodyParser.urlencoded({
			extended: true
		}))
		this.app.use(bodyParser.json()) 
	}

	async start() {
		if(await this.modelLoader.connect()) {
			this.models = await this.modelLoader.load()
		} else {
			console.log('Terminate application')
			return
		}


		// initialize server
		const server = this.app.listen(3000, function(){
			const host = server.address().address
			const port = server.address().port

			console.log("Listening at http://%s:%s", host, port)
		})
	}
}

const modelLoader = new ModelLoader()
const application = new Application(modelLoader)
application.start()



