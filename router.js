class Router {
  constructor(router) {
    this._router = router
	}

  route(routes) {
    for(let i in routes) {
      let r = routes[i]
      switch (r.method) {
        case 'GET':
          this._router.get(r.path, r.controller)
          break
				case 'POST':
					this._router.post(r.path, r.controller)
					break
				case 'DELETE':
					this._router.delete(r.path, r.controller)
					break
				case 'PUT':
					this._router.put(r.path, r.controller)
					break
        default:
          break
      }
    }
	}
	
	getRouter() {
		return _router
	}
}

module.exports = Router