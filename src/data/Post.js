export class Post {
  constructor(postDetails) {
    this.id = postDetails.id;
    this.title = postDetails.title;
    this.datetime = postDetails.datetime;
    this.body = postDetails.body;
  }

  showInfo() {
    return (
      <>
        <h2 className="post-title">{this.title}</h2>
        <p className="post-date">{this.datetime}</p>
        <p className="post-body">{this.body}</p>
      </>
    );
  }
}
