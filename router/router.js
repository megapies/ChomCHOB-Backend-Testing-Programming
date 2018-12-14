const fs = require('fs')
const path = require('path')
class Router {
  constructor(router) {
		this._router = router
	}

	_recursiveScanRoute(dir, baseUrl='') {
		fs.readdirSync(dir).forEach(file => {
			if(file == 'index.js') {
				const routes = require(path.join(dir, file))
				routes.forEach(route => {
					const url = `${baseUrl}${route.path}`
					console.log('scan', url)
				})
			}
			if (file.indexOf('.') < 0) {
				this._recursiveScanRoute(path.join(dir, file), `${baseUrl}/${file}`)
			}
		})
	}

  load() {
    this._recursiveScanRoute(path.join(__dirname, 'routes'))
	}
	
	getRouter() {
		return _router
	}
}

module.exports = Router