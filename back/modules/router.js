var searchCrud = require('./crud/search');

module.exports = function (router) {

	router.post('/getAllFrom', function (req, res) {
		searchCrud.getAllFrom(req.body.textField, res);
	});
    
    router.post('/byLabel',function (req, res) {
    	searchCrud.searchByLabel(req.body.textField, res);
    });
 
    router.post('/byKeyword',function (req, res) {
        searchCrud.searchByKeyword(req.body.textField, res);
    });
 
    router.post('/byType',function (req, res) {
        console.log("req "+req);
        console.log("req.body "+req.body);
        console.log("req.body.textField "+req.body.textField);
        searchCrud.searchByType(req.body.textField, res);
    });

	return router;
};