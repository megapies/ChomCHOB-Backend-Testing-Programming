module.exports = [
    {
        method: 'GET',
        path: '/',
        controller: function(req, res) {
            res.end("Hi")
        }
    }
]