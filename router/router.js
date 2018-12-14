const fs = require('fs')
const path = require('path')
class Router {
  constructor(router) {
		this._router = router
	}

	_regisRoute(route) {
		switch (route.method) {
			case 'GET':
				this._router.get(route.url, route.controller)
				break;
			case 'POST' :
				this._router.post(route.url, route.controller)
				break;
			case 'PUT' :
				this._router.put(route.url, route.controller)
				break;
			case 'DELETE' :
				this._router.delete(route.url, route.controller)
				break;
			default:
				break;
		}
	}
	_recursiveScanRoute(dir, baseUrl='') {
		fs.readdirSync(dir).forEach(file => {
			if(file == 'index.js') {
				const routes = require(path.join(dir, file))
				routes.forEach(route => {
					const url = `${baseUrl}${route.path}`
					route.url = url
					
					if(route.controller) {
						console.log('route', route.method, url, '\x1b[32mregisted\x1b[0m')
						this._regisRoute(route)
					} else {
						console.log('route', route.method, url, '\x1b[31munregisted\x1b[0m')
					}
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
		return this._router
	}
}

module.exports = Router