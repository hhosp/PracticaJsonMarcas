// @ts-ignore
const ajv = new Ajv();

const URL3 = 'https://jsonplaceholder.typicode.com/posts';

const userIdInput = document.getElementById('userIdInput') as HTMLInputElement;
const searchButton = document.getElementById('searchButton');
const results = document.getElementById('results');

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const postSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            userId: { type: "number" },
            id: { type: "number" },
            title: { type: "string" },
            body: { type: "string" }
        },
        required: ["userId", "id", "title", "body"]
    }
};

async function fetchPosts(userId: number) {        
    const response = await fetch(`${URL3}?userId=${userId}`);
    const posts: Post[] = await response.json();

    const validate = ajv.compile(postSchema);
    const valid = validate(posts);
    if (!valid) {
        console.error("Invalid data:", validate.errors);
        throw new Error("Invalid data");
    }
    console.log("Data is valid");
    return posts;
}

async function searchPosts() {
    const userId = Number(userIdInput.value);
    const posts = await fetchPosts(userId);
    if (results) {
        results.innerHTML = ''; // Esto elimina todo el contenido dentro del elemento 'results'
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;
            results.appendChild(postElement);
        });
    }
}

searchButton?.addEventListener('click', searchPosts);