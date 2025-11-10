const container = document.querySelector('.container');

//fetch api data

fetch('http://localhost:2000')
.then(response => response.json())
.then(data => {
    data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML=`
        <h2> ${post.title} </h2>
        <hr>`;
        container.appendChild(postElement);

    }
    );
})