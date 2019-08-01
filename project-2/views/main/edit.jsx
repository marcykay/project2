var React = require("react");

class Home extends React.Component {
    render() {
        function retYYYYMMDD(param) {
            let dateObj = new Date(param);
            return `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`;
        }
        let note = this.props.allResults[0];
        console.log(note);

        return (
            <html>
                <head/>
                <body>
                    <h3>EDIT FORM</h3>
                    <div>
                    <form method="POST" action={"/notes/"+note.id+"/edit?_method=put"}>
					<div>
						<div>
                            <label for="title">Title</label>
							<input type="text" name="title" placeholder="title" value={note.title}/>
						</div>
					</div>
					<div>
						<div>
                            <label for="content">Content</label>
							<textarea name="content" rows="8" cols="80" value={note.content}/>
						</div>
					</div>
                    <div>
						<div>
                            <label for="image">Image Link</label>
							<input type="text" name="image" value={note.image}/>
						</div>
					</div>
					<div>
						<button type="submit">Save My Note</button>
					</div>
				    </form>
                    </div>


                </body>
            </html>
        );
    }
}

module.exports = Home;
