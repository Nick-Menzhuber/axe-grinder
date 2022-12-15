const createNewComment = async (event) => {
    event.preventDefault();
  
    const text = document.getElementById('comment').value;
  
    if (text) {
      const response = await fetch("/api/comments", {
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
    .getElementById('commentsubmit')
    .addEventListener("submit", createNewComment);
  