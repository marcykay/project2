<div>
<form method="POST" action="/notes/new">
<div>
    <div>
        <label for="title">Title</label>
        <input type="text" name="title" placeholder="title"/>
    </div>
</div>
<div>
    <div>
        <label for="content">Content</label>
        <input type="text" name="content"/>
    </div>
</div>
<div>
    <div>
        <label for="image">Image Link</label>
        <input type="text" name="image" placeholder="Image Link"/>
    </div>
</div>
<div>
    <button type="submit">Save My Note</button>
</div>
</form>
</div>


<div><img src={note.image}></img><h4> {note.title}</h4>
<span>{note.content}
</span>
<p>{retYYYYMMDD(note.edited_time.toString())}
</p>
<a href={"/notes/"+note.id+"/delete"}><p><small>delete note</small></p></a>
</div>


<div className="row">
    <div className="col s12 m8 l6 offset-l3 offset-m2">
        <div className="card hoverable">
            <div className="card-image">
            <a className="btn-floating halfway-fab waves-effect waves-light cyan"><i className="material-icons">close</i></a>
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
                            <textarea name="content" id="textarea1" className="materialize-textarea"></textarea>
                            <label for="textarea1">Content</label>
                        </div>
                        <div className="input-field col s12">
                            <input name="image" type="text" id="image-link-field" className="materialize-textarea"></input>
                            <label for="image-link-field">Image-Link</label>
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
</div>
