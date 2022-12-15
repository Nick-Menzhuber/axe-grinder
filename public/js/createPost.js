const createPost = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#createPost').value.trim();
  
    if (text) {
      const response = await fetch(`/api/posts/new`, {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: { "Content-Type": "application/json" },
      });
  console.log(response);    
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to add comment.");
      }
    }
  };
  
  document
    .querySelector('#comment-submit-button')
    .addEventListener("submit", createNewComment);
  