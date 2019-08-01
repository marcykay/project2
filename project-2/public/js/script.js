console.log("script.js running on browser");
console.log(window.location);



let loadEventListener = function() {
    console.log(`func:loadEventListener`);

    document.addEventListener('click', function(event) {
        console.log(`clicked => ${event.target.outerHTML}`);

        if ( event.target.matches("#save-current") ) doPostRequest();
        // if ( event.target.matches( "#button_gamesize" ) ) shuffleGameSize();
        // if ( event.target.matches( "#button_player_mode" ) ) shufflePlayerMode();
        // if ( event.target.matches( "#button_help" ) ) shuffleHelp();
        // if ( event.target.matches( "#button_exit" ) ) location.reload();
    }, false);
}

loadEventListener();

// Materialize CSS JQUERY COMPONENTS
$(document).ready(function() {
    $('.tooltipped').tooltip(); //tooltips
});


let doPostRequest = function() {

    let data = {
        "title": document.getElementById('title1').value,
        "content": document.getElementById('content1').value,
        "image": document.getElementById('image-link1').value
    };
    console.log(JSON.stringify(data));
    console.dir(data);
    let xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    let theUrl = "/notes/new";

    xmlhttp.addEventListener("load", function() {
        console.log("DONE");
        console.log(this.responseText);
    });

    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));

};
