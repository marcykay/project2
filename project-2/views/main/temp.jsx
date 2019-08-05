var React = require("react");

class Temp extends React.Component {
    render() {
        return (

        <html lang="en" dir="ltr">

            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Take a Note</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link rel="stylesheet" href="css/style.css"/>
            </head>

            <body>
            <div className="container image-uploader-window">
                <div className="row">
                    <form id="submit-imageform" method="POST" action="/loadImage?_method=POST" encType="multipart/form-data" className="col s12 m8 l6 offset-l3 offset-m2 white entryform">
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

            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script src="/js/script3.js"></script>
            </body>
        </html>
        );
    }
}

module.exports = Temp;
