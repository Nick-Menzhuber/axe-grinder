const createPost = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#createPost').value.trim();
    const title = document.querySelector('#postTitle').value.trim();

    if (text && title) {
      const response = await fetch(`/api/posts/new`, {
        method: "POST",
        body: JSON.stringify({ text, title }),
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
    .querySelector('#addPost')
    .addEventListener("submit", createPost);
  