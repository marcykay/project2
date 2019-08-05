var React = require("react");

class Home extends React.Component {
    render() {

        function retYYYYMMDD(param) {
            let dateObj = new Date(param);
            return `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`;
        }

        let notes = "";


        return (

            <html lang="en" dir="ltr">

            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Take a Note</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link rel="stylesheet" href="/css/style.css"/>
            </head>

            <body>
            <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper blue-grey darken-4">
                    <a href="/" className="brand-logo tooltipped" data-position="bottom" data-tooltip="Home"><i className="material-icons">home</i>Take A Note</a>
                    <ul className="right hide-on-med-and-down">
                        {/* <li><a href="sass.html"><i className="material-icons">search</i></a></li> */}
                        {/* <li><a href="badges.html"><i className="material-icons">view_module</i></a></li> */}
                        <li><a href="/" className="tooltipped" data-position="bottom" data-tooltip="Refresh"><i className="material-icons">refresh</i></a></li>
                        <li><a href="/logout" className="tooltipped" data-position="bottom" data-tooltip="Logout"><i className="material-icons">exit_to_app</i></a></li>
                    </ul>
                </div>
            </nav>
            </div>

            {/* Image Uploader Window (HIDDEN) */}

            <div className="container image-uploader-window">
                <div className="row">
                    <form id="submit-imageform" method="POST" action="/loadImage?_method=POST" encType="multipart/form-data" className="col s12 m8 l6 offset-l3 offset-m2 entryform grey lighten-1">
                        <div className="file-field input-field">
                            <div className="btn waves-effect waves-light">
                                <span>File</span>
                                <input id="submit-filename" type="file" name="myFile"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                        <div>
                            <p className="right-align">
                                <a id="submit-image" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Upload</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="section"></div>
            <div className="section"></div>


            {/* Miniature Note Taking Bar (HIDDEN WHEN CLICKED) */}

            <div id="dummy_note" className="row">
                <div className="col s12 m8 l6 offset-l3 offset-m2">
                    <div className="card hoverable">
                        <div className="card-content no-margin no-padding">
                            <div className="row">
                                <form method="POST" action="/login?_method=POST" className="col s12">
                                    <div className="input-field col s12">
                                        <input name="title" type="text" id="title" className="materialize-textarea"></input>
                                        <label for="icon_prefix2">Take a note</label>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* "Expanded" Note Taking Bar (HIDDEN DEFAULT) */}

            <div id="real_note" className="row" style={{display:"block"}}>
                <div className="col s12 m8 l6 offset-l3 offset-m2">
                    <div className="card hoverable z-depth-5">

                        <div className="card-image">
                            <a className="btn-floating halfway-fab waves-effect waves-light cyan"><i id="close-current" className="material-icons tooltipped" data-position="bottom" data-tooltip="Close">close</i></a>
                            <img src="" alt=""/>

                            <div className="card-content">
                                <div className="row">
                                    <form method="POST" action="/notes/new" className="col s12">

                                        <div  className="input-field col s12" style={{display:'none'}}>
                                            <input name="notes_id1" type="text" id="notes_id1" className="materialize-textarea" value=""></input>
                                        </div>

                                        <div className="input-field col s12">
                                            <textarea name="title" id="title1" className="materialize-textarea" placeholder="Title" data-length="64"></textarea>

                                        </div>

                                        <div className="input-field col s12">
                                            <textarea name="content" id="content1" className="materialize-textarea" placeholder="Content"></textarea>

                                            <p id="timestamp1" className="right-align no-margin blue-grey-text text-lighten-4 no-margin no-padding" style={{display:'none'}}></p>
                                        </div>

                                        <div id="image-div" className="input-field col s12" style={{display:"none"}}>
                                            <textarea name="image" id="image-link1" className="materialize-textarea" placeholder="Image Link"></textarea>
                                        </div>

                                    </form>
                                </div>
                            </div>

                            <div className="card-action">
                                <div style={{position:"relative", height:"70px"}}>
                                    <div style={{display:"inline-float", margin:0, padding:0, position:"absolute", left:0, top:0}} >
                                        <a href="#" className="btn-floating waves-effect waves-light cyan"><i id="save-current" className="material-icons tooltipped" data-position="bottom" data-tooltip="Save">save</i></a>
                                    </div>
                                    <div id="fixed-action-btn" className="fixed-action-btn" style={{display:"inline-float", margin:0, padding:0, position:"absolute", left:45, top:0, width:"40px" }}>
                                        <a className="btn-floating btn waves-effect waves-light cyan">
                                        <i className="material-icons tooltipped" data-position="bottom" data-tooltip="Change color">color_lens</i>
                                        </a>
                                        <ul>
                                            <li><a className="btn-floating deep-orange lighten-2"><i className="material-icons"></i></a></li>
                                            <li><a className="btn-floating yellow lighten-2"><i className="material-icons"></i></a></li>
                                            <li><a className="btn-floating green lighten-2"><i className="material-icons"></i></a></li>
                                            <li><a className="btn-floating blue lighten-2"><i className="material-icons"></i></a></li>
                                        </ul>
                                    </div>
                                    <div style={{display:"inline-float", margin:0, padding:0, position:"absolute", left:90, top:0, zIindex:10}} >
                                        <a href="#" id="show_image_link" className="btn-floating waves-effect waves-light cyan"><i id="image_icon" className="material-icons tooltipped" data-position="bottom" data-tooltip="Add Image">photo</i></a>
                                    </div>
                                    <div id="delete-current" style={{display:"inline-float", margin:0, padding:0, position:"absolute", left:135, top:0, zIindex:10}} >
                                        <a href="#" className="btn-floating waves-effect waves-light cyan"><i  className="material-icons tooltipped" data-position="bottom" data-tooltip="Delete">delete</i></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Below Displays All Notes in Newest First Order */}


            <div className="mother-flex">
                <div className="flex-container">
                    {notes}
                </div>
            </div>


            {/* Ordered Sequenced DO NOT TOUCH! */}
            <script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script src="/js/materializecss.js"></script>
            <script src="/js/script3.js"></script>
            {/* Ordered Sequenced DO NOT TOUCH! */}

            </body>
        </html>
        );
    }
}

module.exports = Home;
