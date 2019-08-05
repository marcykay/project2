console.log("script.js running on browser");
let globalData = {};

let loadEventListeners = function() {

    console.log(`func:loadEventListener`);

    let dummyNote = document.getElementById('dummy_note');
    dummyNote.addEventListener('click', function(event) {
        clearCurrentNote();
        dummyNote.style.display = 'none';
        document.getElementById('real_note').style.display = 'block';
        document.getElementById("title1").focus();
    }, false);

    let elems = document.getElementById('fixed-action-btn');
    let instances = M.FloatingActionButton.init(elems, {
        direction: 'top',
        hoverEnabled: false
    });

    document.getElementById('save-current').addEventListener('click', function(event) {
        saveCurrentNote(false);
    })

    document.getElementById('close-current').addEventListener('click', function(event) {
        console.log("close current");
        saveCurrentNote(true);
        document.getElementById('note-bg').style.backgroundColor = '#FFFFFF';
        document.getElementById('real_note').style.display = 'none';
        dummyNote.style.display = "block";
    })

    document.getElementById('image_icon').addEventListener('click', function(event) {
        showImageUploaderWindow();
    })

    document.getElementById('delete-current').addEventListener('click', function(event) {
        deleteCurrentNote();
    })

    document.getElementById('submit-image').addEventListener('click', function(event) {
        console.log(`clicked #=> ${event.target.id}`);
        ajaxFile();
    });

    document.addEventListener('click', function(event) {
        console.log("clicked #=> " + event.currentTarget.id);
        let targetIcon = event.target;
        if (targetIcon.matches('.bgcolor'))  {
                console.log(targetIcon.dataset.color);
                document.getElementById('note-bg').style.backgroundColor = targetIcon.dataset.color;
                //targetIcon.style.backgroundColor = targetIcon.dataset.color;
                console.log("bg color transplanted:" +targetIcon.dataset.color);
                document.getElementById('note-bg').dataset.color = targetIcon.dataset.color;
        }


    }, false);
}



let ajaxFile = function(notes_id_str) {
    var theUrl = "/loadImage";
    var method = "POST";
    //encType="multipart/form-data"
    console.log(document.getElementById('submit-imageform').myFile.value);
    if (document.getElementById('submit-imageform').myFile.value) {
        var form = document.getElementById('submit-imageform');
        var formData = new FormData(form);
        console.dir(formData);
        console.log("launching httprequest");
        var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
        xmlhttp.addEventListener("load", function() {
            console.log("response received");
            let data = JSON.parse(this.responseText);
            console.log("status text", this.statusText);
            console.log("status code", this.status);
            if (this.statusText === "OK") {
                showImageUploaderWindow();
                document.getElementById("image-link1").value = data.url;
                showImageLink();
            }
        });
        xmlhttp.open(method, theUrl);
        xmlhttp.send(formData);
    }
}


let parsePGTimestampDDMMYYYY = function(pgTimestamp) {
    let dateObj = new Date(pgTimestamp);
    return `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`;
}

let saveCurrentNote = function(reloadPage) {
    let data = {
        "notes_id": document.getElementById('notes_id1').value,
        "title": document.getElementById('title1').value,
        "content": document.getElementById('content1').value,
        "image": document.getElementById('image-link1').value,
        "color": document.getElementById('note-bg').dataset.color,
    };
    console.log(data.color);
    //EMPTY ENTRY DO NOTHING & REMOVE NOTES_ID ASSOCIATION
    if (data["title"] === "" && data["content"] === "") {
        document.getElementById('notes_id1').value = "";
        return "";
    }
    console.dir(data);
    console.log(data["notes_id"]);

    //NEW NOTE WORKFLOW
    if (!data["notes_id"]) {
        var theUrl = "/notes/new";
        var method = "POST";
        console.log(method);
    } else { //EDIT NOTE WORKFLOW
        var theUrl = "/notes/" + data["notes_id"] + "/edit";
        var method = "PUT";
        console.log(method);
    }

    console.log(JSON.stringify(data));
    console.log("running httprequest");
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.addEventListener("load", function() {
        console.log("response received");
        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        console.log("notes_id: ", response.id);
        document.getElementById('notes_id1').value = response.id;
        console.log(document.getElementById('notes_id1').value);
        document.getElementById('timestamp1').innerText = 'Edited ' + parsePGTimestampDDMMYYYY(response.edited_time.toString());
        document.getElementById('timestamp1').style.display = "block";
        if (reloadPage) {
            location.reload(true);
        };
    });
    xmlhttp.open(method, theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));

};

let clearCurrentNote = function() {
    document.getElementById('notes_id1').value = "";
    document.getElementById('title1').value = "";
    document.getElementById('content1').value = "";
    document.getElementById('image-link1').value = "";
    document.getElementById('timestamp1').innerText = "";
    document.getElementById('image-div').style.display = 'none';
    document.getElementById('show_image_link').className = "btn-floating waves-effect waves-light cyan";

};

let deleteCurrentNote = function() {
    let data = {
        "notes_id": document.getElementById('notes_id1').value,
        "title": document.getElementById('title1').value,
        "content": document.getElementById('content1').value,
        "image": document.getElementById('image-link1').value
    };
    console.log("deleting current note : " + data["notes_id"]);
    //EMPTY ENTRY DO NOTHING & REMOVE NOTES_ID ASSOCIATION
    if (data["notes_id"] === "" || data["notes_id"] === null) {
        clearCurrentNote();
        return "";
    }

    if (data["notes_id"]) {
        var theUrl = "/notes/" + data["notes_id"] + "/delete";
        var method = "POST";
        console.log(method);
        console.log(JSON.stringify(data));
        console.log("running httprequest");
        var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
        xmlhttp.addEventListener("load", function() {
            console.log("deleted response received");
            //console.log(this.responseText);
            location.reload(true);
        });
        xmlhttp.open(method, theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(data));
    }
    // clearCurrentNote();

};

let updateNotesAll = function() {

    var theUrl = "/user";
    var method = "GET";
    console.log(method);

    //console.log(JSON.stringify(data));
    console.log("running httprequest");
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.addEventListener("load", function() {
        console.log("response received");
        globalData = JSON.parse(this.responseText);
        globalData.allResults.map((res) => {
            document.getElementById(res.id).addEventListener('click', function(event) {
                console.log("FIRED! " + event.currentTarget.id);
                showNoteEntry(event.currentTarget.id);
            }, false);
        })
    });
    xmlhttp.open(method, theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();

};

let showImageLink = function() {
    document.getElementById("image-div").style.display="block";
}

let showNoteEntry = function(notes_id_str) {
    var theUrl = "/notes/" + notes_id_str + "/edit";
    var method = "GET";
    console.log("URL");
    console.log(theUrl);

    //console.log(JSON.stringify(data));
    console.log("running httprequest");
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.addEventListener("load", function() {
        console.log("response received");
        let data = JSON.parse(this.responseText);
        console.log(data);
        document.getElementById('dummy_note').style.display = 'none';
        document.getElementById('real_note').style.display = 'block';
        document.getElementById("notes_id1").value = data.id;
        document.getElementById("title1").value = data.title;
        document.getElementById("content1").value = data.content;
        document.getElementById("content1").rows = 15;
        document.getElementById("content1").focus();
        document.getElementById('timestamp1').innerText = 'Edited ' + parsePGTimestampDDMMYYYY(data.edited_time.toString());
        document.getElementById("image-link1").value = data.image;
        document.getElementById('timestamp1').style.display = "block";
        showImageLink();
        M.textareaAutoResize(document.getElementById('content1'));
        //M.updateTextFields();

    });
    xmlhttp.open(method, theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
}

let showImageUploaderWindow = function() {
    console.log("show image uploader window");
    let imageUpLoader = document.getElementsByClassName('image-uploader-window')[0];
    if (imageUpLoader.style.display === 'block') {
        imageUpLoader.style.display = 'none';
    } else {
        document.getElementsByClassName('image-uploader-window')[0].style.display = 'block';

    }

};

var resizeTimer;

function reportWindowSize(event) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        arrangeCards();
    }, 800);
}

function arrangeCards() {
    let value = document.getElementsByClassName("flex-item");
    console.dir(value);
    let sumHeight = 0;
    for (let i = 0; i < value.length; i++) {
        sumHeight += value[i].offsetHeight + 7;
    }
    let windowWidth = window.innerWidth * 0.9;
    // return sumHeight;
    // setting screensizes, <=600px mobile 90%, >600 tablet 85%, >992desktop 70%
    let colNumbers = 1;
    let margin = 0.05;
    if (windowWidth <= 600) {
        colNumbers = 1;
    } else if (windowWidth > 600 && windowWidth <= 992) {
        colNumbers = 2;
    } else if (windowWidth > 992 && windowWidth <= 1200) {
        colNumbers = 4;
    } else if (windowWidth > 1200) {
        colNumbers = 4;
    }

    for (let i = 0; i < value.length; i++) {
        document.getElementsByClassName("flex-item")[i].style.maxWidth = (100 / colNumbers) + "%";
    }

    let colHeightMultiplier = 1.3;
    let colHeight = sumHeight / colNumbers * colHeightMultiplier;
    document.getElementsByClassName("flex-container")[0].style.maxHeight = colHeight + "px";

    console.log(document.getElementsByClassName("flex-container")[0].style.maxHeight = colHeight + "px");

    console.log("scroll width: "+document.getElementsByClassName("flex-container")[0].scrollWidth);

    console.log("window width: "+windowWidth);

}

window.onresize = reportWindowSize;
window.onload = function() {
    updateNotesAll();
    loadEventListeners();
    reportWindowSize();
}

// let showNoteEntry = function(notes_id_str) {
//     document.getElementById('dummy_note').style.display = 'none';
//     document.getElementById('real_note').style.display = 'block';
//     let notes_id_int = parseInt(notes_id_str);
//     console.log(globalData);
//     console.log(notes_id_int);
//     console.log(globalData["allResults"][0]["title"]);
//     console.log(globalData["allResults"][notes_id_int]["content"]);
//     console.log(globalData["allResults"][notes_id_int]);
//     // document.getElementById("notes_id1").value = data.id;
//     // document.getElementById("title1").value = data.title;
//     // document.getElementById("content1").value = data.title;
//     // document.getElementById('timestamp1').innerText = 'Edited ' + parsePGTimestampDDMMYYYY(data.edited_time.toString());
//     // document.getElementById("image-link1").value = data.image;
//     // document.getElementById('timestamp1').style.display = "block";
// }
