//jquery : quand la page html est completement chargée
$(window).ready(function(){

	style();

	window.onresize = style;

});

var style = function(){
	//style pour centrer le formulaire verticalement
//	$("#form").css("margin-top", (($(window).height()/2)-($("#form").height())));
    $("#form").css("margin-top", 20);
}

function send(id) {
	// var xdr = getXDomainRequest();

	// xdr.open("POST", "http://localhost:1337/request", true);
	// xdr.setRequestHeader("Content-Type", "application/json");
	// xdr.send(JSON.stringify({
	// 	textField: document.getElementById("textField").value
	// }));
    console.log(id);
	var object = {};
	object.textField = $("#textField").val();
	var resultTest = false;

    
//communiquer avec le serveur sur la porte 1337
	$.ajax({
        type: "POST",
        data: JSON.stringify(object),
        dataType: "json",
        contentType : 'application/json',
        url: 'http://localhost:1337/'+id,
        success: function(result){
        	resultTest = true;
        	console.log("youpi, results got!");
        console.log(result);
        //afficher l'objet json dans le console, cet objet est un tableau json en faite.
        console.log(JSON.stringify(result, null, 2)); // spacing level = 2
        $("#result").empty();
        $( "#result" ).append(jsonToHtml(result,object.textField));
        },
        // error: function(erreur){
        // console.log("aaaaaa erreur!!!!!");
        // },
        // complete: function(result,statut){
        // 	console.log("aaaaaaa  complete");
        // }

    });

    //modifier cette ligne si on veut afficher un message d'erreur différent
    setTimeout(function(){ 
        if(!resultTest){
        	$("#result").empty();
            $( "#result" ).append("<p class='number'>"+'We find 0 results correspondant'+"</p>");
        }
    }, 3000);
}

 //la fonction qui va transformer
    function jsonToHtml(jsonObject,textField){

        //tableau ou on va mettre notre html
        var monHtml = "";
        monHtml += "<p class='number'>"+'We find '+jsonObject.length+' results correspondant'+"</p>"
        //pour chaque objet json dans mon tableau json
        for(var i = 0; i< jsonObject.length; i++){
            
            //on récupère l'objet json a chaque fois
            var objet = jsonObject[i];

            monHtml += "<div class='object'>";

            //pour chaque CLEF + VALEUR de mon objet json
            $.each(objet, function(key, value) {
                //highlight the keyword that we've searched with
                 if(key!='link' && value!=null && value.indexOf(textField)>=0){
                    value = value.replace(textField,'<mark>'+textField+'</mark>');                  
                   }
                 if(key=='link'){
                    value = value.replace(value,"<a href="+value+">"+value+"</a>")
                 }
                //transfer each pair of key-value in form html   
                 monHtml += "<p>"+"<span class='key'>"+key+"</span>"+" : "+"<span class='value'>"+value+"</span>"+"</p>";


                }
            );
                
            monHtml += "</div>";

        }
       return monHtml;
    }

    




