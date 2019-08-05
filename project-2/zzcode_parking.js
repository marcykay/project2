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





<input name="title" type="text" id="title1" className="materialize-textarea" value={note.title}></input>


notes = this.props.allResults.map((note)=>{
     return <div className="col s12 m6 l3">
             <div className="card hoverable z-depth-2">
                 <div className="card-image">
                 <img src={note.image} alt=""/>
                 <div className="card-content no-margin no-padding">
                 </div>
                     <div className="row">
                         <form method="GET" action="/notes/new" className="col s12" name={note.id}>
                             <div  className="input-field col s12" style={{display:'none'}}>
                                <input name="title" type="text" className="materialize-textarea" value={note.id}></input>
                             </div>
                             <div className="input-field col s12">
                                 <h4>{note.title}</h4>
                             </div>

                             <div className="input-field col s12">
                                 <textarea name="content" id="textarea1" className="materialize-textarea" value={note.content}></textarea>
                                 <p className="right-align no-margin blue-grey-text text-lighten-4 no-margin no-padding">{"Edited: "+retYYYYMMDD(note.edited_time.toString())}
                                 </p>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
 });




 <div id={note.id} class="col s12 m6 l2">
             <div class="card medium ">
                 <div class="card-image">
                     <img src={note.image}/>
                 </div>
                 <div class="card-content">
                     <span class="card-title">{note.title}</span>
                     <p class="">{note.content}</p>
                 </div>
             </div>
         </div>


         <div id={note.id} className="col s12 m6 l2">
                     <div className="card waves-effect waves-block waves-light">
                         <div className="card-image waves-effect waves-block waves-light">
                           <img className="activator" src={note.image}/>
                         </div>

                         <div className="card-content">
                             <span className="card-title activator grey-text text-darken-4">{note.title}<i className="material-icons right">more_vert</i></span>
                         </div>

                         <div className="card-reveal">
                           <span className="card-title grey-text text-darken-4">{note.title}<i className="material-icons right">close</i></span>
                           <p>{note.content}</p>
                         </div>
                     </div>
                 </div>
