var React = require("react");

class Home extends React.Component {
    render() {
        function retYYYYMMDD(param) {
            let dateObj = new Date(param);
            return `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`;
        }
        console.log(this.props);
        let notes = "";
        if (this.props.allResults === null) {
            notes = <p className="center-align flow-text">No notes found</p>;
         } else {
            notes = this.props.allResults.map((note)=>{
                 return <div className="col s12 m6 l3">
                         <div className="card hoverable z-depth-2">
                             <div className="card-image">
                             <img src={note.image} alt=""/>
                             <div className="card-content">
                             </div>
                                 <div className="row">
                                     <form method="GET" action="/notes/new" className="col s12">
                                         <div className="input-field col s12">
                                             <input name="title" type="text" id="title1" className="materialize-textarea" value={note.title}></input>
                                         </div>

                                         <div className="input-field col s12">
                                             <textarea name="content" id="textarea1" className="materialize-textarea" value={note.content}></textarea>
                                             <p className="right-align no-margin">{retYYYYMMDD(note.edited_time.toString())}
                                             </p>
                                         </div>
                                     </form>
                                 </div>
                             </div>
                             <div className="card-action">
                                 <a href="#" className="btn-floating waves-effect waves-light cyan"><i className="material-icons">person_add</i></a>
                                 <a href="#" className="btn-floating waves-effect waves-light cyan"><i className="material-icons">color_lens</i></a>
                                 <a href="#" className="btn-floating waves-effect waves-light cyan"><i className="material-icons">photo</i></a>
                                 <a href="#" className="btn-floating waves-effect waves-light cyan"><i className="material-icons">delete</i></a>
                             </div>
                         </div>
                     </div>
             });
        }


        return (
            <html lang="en" dir="ltr">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Take a Note</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link rel="stylesheet" href="css/style.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            </head>
            <body>
            <nav>
                <div className="nav-wrapper blue-grey darken-4">
                    <a href="/" className="brand-logo tooltipped" data-position="bottom" data-tooltip="Home"><i className="material-icons">home</i>Take A Note</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html"><i className="material-icons">search</i></a></li>
                        <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
                        <li><a href="/" className="tooltipped" data-position="bottom" data-tooltip="Refresh"><i className="material-icons">refresh</i></a></li>
                        <li><a href="/logout" className="tooltipped" data-position="bottom" data-tooltip="Logout"><i className="material-icons">exit_to_app</i></a></li>
                    </ul>
                </div>
            </nav>

            <div className="section"></div>
            <div className="section"></div>

            <div className="row">
                <div className="col s12 m8 l6 offset-l3 offset-m2">
                    <div className="card hoverable z-depth-3">
                        <div className="card-image">
                        <a className="btn-floating halfway-fab waves-effect waves-light cyan"><i id="save-current" className="material-icons">close</i></a>
                        <img src="" alt=""/>
                        <div className="card-content">
                        </div>
                            <div className="row">
                                <form method="POST" action="/notes/new" className="col s12">
                                    <div className="input-field col s12">
                                        <input name="title" type="text" id="title1" className="materialize-textarea"></input>
                                        <label for="title1">Title</label>
                                    </div>

                                    <div className="input-field col s12">
                                        <textarea name="content" id="content1" className="materialize-textarea"></textarea>
                                        <label for="content1">Content</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input name="image" type="text" id="image-link1" className="materialize-textarea"></input>
                                        <label for="image-link1">Image-Link</label>
                                    </div>


                                </form>
                            </div>
                        </div>
                        <div className="card-action">
                            <a href="#" className="btn-floating waves-effect waves-light cyan"><i className="material-icons">person_add</i></a>
                            <a href="#" className="btn-floating waves-effect waves-light cyan"><i className="material-icons">color_lens</i></a>
                            <a href="#" className="btn-floating waves-effect waves-light cyan"><i className="material-icons">photo</i></a>
                            <a href="#" id="delete-current" className="btn-floating waves-effect waves-light cyan"><i className="material-icons">delete</i></a>

                        </div>
                    </div>
                </div>
            </div>


                <div>
                <div className="row">
                {notes}
                </div>
                </div>
                <script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
                <script src="/js/script.js"></script>

            </body>
        </html>
        );
    }
}

module.exports = Home;
