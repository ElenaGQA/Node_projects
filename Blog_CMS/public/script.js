let postList = document.querySelector("#postList");
let postForm = document.querySelector("#postForm");
let title = document.querySelector("#title");
let content = document.querySelector("#content");


document.addEventListener("DOMContentLoaded", (event) => {
    displayPosts();
    postForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let titleValue = title.value;
        let contentValue = content.value;
        fetch('/add-post', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: titleValue, content: contentValue })
        })
            .then(res => res.json())
            .then(res => {
                titleValue = "";
                contentValue = "";
                location.reload();
            })
            .catch(err => {
                console.log(err.message);
            })
    })
})

function displayPosts() {
    fetch('/posts')
        .then(res => res.json())
        .then(data => {
            postList.innerHTML = "";
            data.forEach(post => {
                const li = document.createElement("li");
                li.innerHTML = `<p>${post.title}</p><p>${post.content}</p> <button class = "deleteButton" data-id ="${post.id}" >Delete</button>`;
                postList.appendChild(li);

                li.querySelector(".deleteButton").addEventListener('click', () => {
                    deletePost(li.querySelector(".deleteButton").getAttribute('data-id'));
                })
            });
        })
        .catch(err => {
            console.log(err.message);
        })
}


function deletePost(id) {
    if (confirm("Are you sure you want to delete?")) {
        fetch(`/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "text/plain"
            }
        })
            .then(res => res.text())
            .then(() => {
                location.reload();
            })
            .catch(err => {
                console.log(err.message);
            })
    }
}
