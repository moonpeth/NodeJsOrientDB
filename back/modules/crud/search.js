var db = require('../db')();
var util = require('util');
var search = {
	//excute SQL
	getAllFrom: function(tableName, res){
    // the synchronous code that we want to catch thrown errors on
    console.log("result");
    db.select().from(tableName).all()
		.then(function(result) {
			//util.inspect() return a string representation of object
			console.log("resultsdqf");
			return res.json(result);
		});
	},
  
    //search the articles in db whose labels contains mylabel.
    searchByLabel: function(mylabel, res){
        db.select().from('Documents').containsText({label: mylabel}).all()
        .then(function (result){
            return res.json(result);
        });
     },

    searchByKeyword: function(keyword, res){
        //firstly, search in the keywords
        db.select().from('Documents').containsText({keywords: keyword}).all()
        .then(function (result1){
             //secondely, search in the abstract
             db.select().from('Documents').containsText({abstract: keyword}).all()
             .then(function (result2){
            // console.log(result1.concat(result2));
            resultNoDuplication = removeDuplication(result1.concat(result2));
            console.log(resultNoDuplication);      
            var result=[];
            for(var item in resultNoDuplication){
                result.push(resultNoDuplication[item]);
            }
            return res.json(result);
              });
        });
    },

    //search the articles in db whose labels contains mylabel.
    searchByType: function(mytype, res){
        db.select().from('Documents').containsText({type: mytype}).all()
        .then(function (result){
            return res.json(result);
        });
     }


}

function removeDuplication(arrayDup){
    var result = new Array();
    for(var tab in arrayDup){
        result[arrayDup[tab].title] = arrayDup[tab];
    }

    return result;
}

module.exports = search;

