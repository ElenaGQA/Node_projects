

let postList = document.querySelector("#postList");
let postForm = document.querySelector("#postForm");
let title = document.querySelector("#title");
let content = document.querySelector("#content");


document.addEventListener("DOMContentLoaded", (event) => {

    postForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let titleValue = title.value;
        let contentValue = content.value;
        //we didn' write the validation 
        fetch('/add-post', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(titleValue, contentValue)
        })
            .then(res => {
                res.json();
            })
            .then(res => {
                titleValue = "";
                contentValue = "";
            })
            .catch(err => {
                console.log(err.message);
            })

        function displayPosts() {
            fetch('/posts', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    postList.innerHTML = ""; // Clear existing list

                    data.forEach(post => {
                        const li = document.createElement("li"); 
                        li.textContent = `<p>${post.title}</p><p>${post.content}</p> <button>Delete</button>`; 
                        postList.appendChild(li); 
                    });

                })
                .catch(err => {
                    console.log(err.message);
                });
        }
        // have fetch with method get (/posts). We need to show those posts in postList ul in this structure

        // <li> <p>title</p> <p>content</p> <button>Delete</button> </li>
    })











});

