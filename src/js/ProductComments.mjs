export default class ProductComments {
  constructor(productId) {
    this.productId = productId;
    this.storageKey = `comments-${productId}`;

    this.form = document.getElementById("commentForm");
    this.list = document.getElementById("commentsList");
    this.message = document.getElementById("commentMessage");
    this.count = document.getElementById("commentCount");
  }

  init() {
    if (!this.form) return;

    this.renderComments();

    this.form.addEventListener(
      "submit",
      this.saveComment.bind(this)
    );
  }

  saveComment(event) {
    event.preventDefault();

    this.message.innerHTML = "";

    const name =
      document
        .getElementById("commentName")
        .value
        .trim();

    const rating = Number(
      document
        .getElementById("commentRating")
        .value
    );

    const text =
      document
        .getElementById("commentText")
        .value
        .trim();

    if (name.length < 2) {
      this.showError("Please enter your name.");
      return;
    }

    if (!rating) {
      this.showError("Please choose a rating.");
      return;
    }

    if (text.length < 10) {
      this.showError(
        "Review must contain at least 10 characters."
      );
      return;
    }

    const comments = this.getComments();

    comments.unshift({
      name,
      rating,
      text,
      created: Date.now()
    });

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(comments)
    );

    this.form.reset();

    this.showSuccess(
      "✔ Thank you! Your review has been posted."
    );

    this.renderComments();
  }

  getComments() {
    return JSON.parse(
      localStorage.getItem(this.storageKey)
    ) || [];
  }

  renderComments() {

    const comments = this.getComments();

    this.count.textContent = comments.length;

    if (comments.length === 0) {

      this.list.innerHTML = `
      <div class="no-comments">
      No reviews yet.<br>
      Be the first to review this product.
      </div>
      `;

      return;
    }

    const average =
      comments.reduce(
        (sum, c) => sum + c.rating,
        0
      ) / comments.length;

    this.list.innerHTML = `

<div class="review-summary">

<div class="review-average">

${average.toFixed(1)}

</div>

<div>

<div class="review-stars">

${this.makeStars(Math.round(average))}

</div>

<p>${comments.length} review(s)</p>

</div>

</div>

${comments
  .map((comment) => this.commentTemplate(comment))
  .join("")}
`;

  }

  commentTemplate(comment) {

    return `

<div class="comment-card">

<div class="comment-header">

<div class="comment-avatar">

${this.getInitials(comment.name)}

</div>

<div>

<div class="comment-name">

${comment.name}

</div>

<div class="comment-date">

${this.formatDate(comment.created)}

</div>

</div>

</div>

<div class="comment-rating">

${this.makeStars(comment.rating)}

</div>

<p class="comment-text">

${comment.text}

</p>

</div>

`;

  }

  makeStars(rating) {

    return "★".repeat(rating) +
      "☆".repeat(5-rating);

  }

  getInitials(name) {

    return name
      .split(" ")
      .map(word=>word[0])
      .join("")
      .substring(0,2)
      .toUpperCase();

  }

  formatDate(timestamp){

    return new Date(timestamp)
      .toLocaleDateString(undefined,{
        year:"numeric",
        month:"short",
        day:"numeric"
      });

  }

  showSuccess(message){

    this.message.innerHTML=`
      <div class="comment-success">
      ${message}
      </div>
    `;

    setTimeout(()=>{
      this.message.innerHTML="";
    },3000);

  }

  showError(message){

    this.message.innerHTML=`
      <div class="comment-error">
      ${message}
      </div>
    `;

    setTimeout(()=>{
      this.message.innerHTML="";
    },3000);

  }

}