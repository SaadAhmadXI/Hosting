let currentUser;

function authenticateUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isOwner = username === 'SaadAhmadXI' && password === 'saad@21102005';

    if (isOwner) {
        currentUser = username;
        return true;
    }

    const existingUser = users.find(user => user.username === username);

    if (existingUser && existingUser.password === password) {
        currentUser = username;
        return true;
    }

    if (existingUser && existingUser.password !== password) {
        alert('Incorrect password. Please enter the correct password. Or Username is Already Taken');
        return false;
    }

    const imageURL = existingUser ? existingUser.imageURL : `Images/user1.png`;

    currentUser = username;
    users.push({ username, password, imageURL });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function showAuthentication() {
    const authenticationDiv = document.getElementById('authentication');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');

    authenticationDiv.classList.remove('hidden');

    loginBtn.addEventListener('click', function () {
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        if (authenticateUser(username, password)) {
            authenticationDiv.classList.add('hidden');
            loadCommentsFromStorage();
            document.getElementById('comment-section').classList.remove('hidden');
        } else {
        }
    });
}

function loadCommentsFromStorage() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentContainer = document.querySelector(".comments");

    commentContainer.innerHTML = "";

    comments.forEach((comment, index) => {
        createCommentElement(comment, index);
    });
    commentContainer.scrollTop = commentContainer.scrollHeight;
}

function checkForNewComments() {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    
    if (storedComments.length > comments.length) {
        const newComment = storedComments[storedComments.length - 1];
        createCommentElement(newComment, comments.length);
        comments = storedComments;
    }
}

if (currentUser) {
    document.getElementById('comment-section').classList.remove('hidden');
    loadCommentsFromStorage();

    setInterval(checkForNewComments, 5000);
} else {
    showAuthentication();
}


function createCommentElement(comment, index) {
    const newComment = document.createElement("div");
    newComment.classList.add("comment");

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === comment.username);

    let imageURL;
        if (comment.username === 'SaadAhmadXI') {
            imageURL = 'Images/userO.png';
            }
        else {
        const usernameSeed = hashString(comment.username);
        const randomImageNumber = (usernameSeed % 6) + 1;
        imageURL = `Images/user${randomImageNumber}.png`;
        }

    let commentHTML = `
        <div class="user-info">
            <div class="user-details">
                <img src="${imageURL}" alt="User Image" class="user-image">
                <strong>${comment.username}:</strong>
                <div class="comment-text">${comment.commentText}</div>
            </div>
        </div>
    `;

    const currentUserIsOwner = currentUser === 'SaadAhmadXI';
    const currentUserIsCommenter = comment.username === currentUser;

    if (currentUserIsOwner || currentUserIsCommenter) {
        commentHTML += `
            <div class="comment-actions">
                <button class="edit-comment-btn" data-index="${index}">Edit</button>
                <button class="delete-comment-btn" data-index="${index}">Delete</button>
            </div>
        `;
    }

    newComment.innerHTML = commentHTML;

    const commentContainer = document.querySelector(".comments");
    commentContainer.appendChild(newComment);

    if (currentUserIsOwner || currentUserIsCommenter) {
        const editButton = newComment.querySelector(".edit-comment-btn");
        const deleteButton = newComment.querySelector(".delete-comment-btn");

        editButton.addEventListener("click", editComment);
        deleteButton.addEventListener("click", deleteComment);
    }
}

function editComment(event) {
    const commentIndex = event.target.getAttribute("data-index");
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    const commentToEdit = comments[commentIndex];

    if (currentUser === 'SaadAhmadXI' || (commentToEdit && commentToEdit.username === currentUser)) {
        const editedCommentText = prompt('Edit your comment:', commentToEdit.commentText);

        if (editedCommentText !== null) {
            comments[commentIndex].commentText = editedCommentText;
            saveCommentsToStorage(comments);
            loadCommentsFromStorage();
        }
    } else {
        alert('You can only edit your own messages.');
    }
}

function deleteComment(event) {
    const commentIndex = event.target.getAttribute("data-index");
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    const commentToDelete = comments[commentIndex];

    if (currentUser === 'SaadAhmadXI' || (commentToDelete && commentToDelete.username === currentUser)) {
        comments.splice(commentIndex, 1);
        saveCommentsToStorage(comments);
        loadCommentsFromStorage();
    } else {
        alert('You can only delete your own messages.');
    }
}

function saveCommentsToStorage(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}

document.getElementById("comment-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const commentText = document.getElementById("commentText").value;

    const newComment = {
        username: currentUser,
        commentText: commentText
    };

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(newComment);

    saveCommentsToStorage(comments);

    document.getElementById("commentText").value = "";
    loadCommentsFromStorage();
});

if (currentUser) {
    document.getElementById('comment-section').classList.remove('hidden');
    loadCommentsFromStorage();
} else {
    showAuthentication();
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return hash;
}