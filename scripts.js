document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const uploadForm = document.getElementById('upload-form');
    const mediaGallery = document.getElementById('media-gallery');
    const collaborateForm = document.getElementById('collaborate-form');
    const collaborateRequests = document.getElementById('collaborate-requests');
    const logoutButton = document.getElementById('logout-button');
    let currentUser = null;

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            logIn(username, password);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;
            signUp(username, password);
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            logOut();
        });
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const mediaUpload = document.getElementById('media-upload').files[0];
            const mediaElement = createMediaElement(URL.createObjectURL(mediaUpload), mediaUpload.type);
            mediaGallery.appendChild(mediaElement);
            uploadForm.reset();
        });
    }

    if (collaborateForm) {
        collaborateForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const message = document.getElementById('collaborate-message').value;
            const messageElement = createCollaborateMessageElement(message);
            collaborateRequests.appendChild(messageElement);
            collaborateForm.reset();
        });
    }

    function createMediaElement(src, type) {
        let element;
        if (type.startsWith('image/')) {
            element = document.createElement('img');
            element.src = src;
        } else if (type.startsWith('video/')) {
            element = document.createElement('video');
            element.src = src;
            element.controls = true;
        }
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        element.appendChild(commentSection);
        element.onclick = function() {
            if (currentUser) {
                const comment = prompt('Enter your comment:');
                if (comment) {
                    const commentElement = document.createElement('p');
                    commentElement.textContent = `${currentUser}: ${comment}`;
                    commentSection.appendChild(commentElement);
                }
            } else {
                alert('Please log in to comment.');
            }
        };
        return element;
    }

    function createCollaborateMessageElement(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'collaborate-message';
        messageElement.textContent = message;
        return messageElement;
    }

    function signUp(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            alert('Username already exists. Please choose a different username.');
        } else {
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            alert(`User ${username} signed up successfully!`);
            window.location.href = 'index.html';
        }
    }

    function logIn(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username] === password) {
            currentUser = username;
            localStorage.setItem('currentUser', currentUser);
            alert(`User ${username} logged in successfully!`);
            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    }

    function logOut() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }

    // Check if the user is already logged in
    if (window.location.pathname === '/home.html') {
        currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            alert('Please log in first.');
            window.location.href = 'index.html';
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...

    const profilePictureUpload = document.getElementById('profile-picture-upload');
    const profileBio = document.getElementById('profile-bio');
    const saveProfileButton = document.getElementById('save-profile-button');
    const userMediaGallery = document.getElementById('user-media-gallery');
    let currentUser = localStorage.getItem('currentUser');

    if (saveProfileButton) {
        saveProfileButton.addEventListener('click', function() {
            saveUserProfile();
        });

        // Load profile info if user is logged in
        if (currentUser) {
            loadUserProfile();
            loadUserMedia();
        } else {
            alert('Please log in first.');
            window.location.href = 'index.html';
        }
    }

    function saveUserProfile() {
        const profilePicture = profilePictureUpload.files[0];
        const bio = profileBio.value;
        if (profilePicture) {
            const reader = new FileReader();
            reader.onloadend = function() {
                localStorage.setItem(`${currentUser}_profilePicture`, reader.result);
                localStorage.setItem(`${currentUser}_bio`, bio);
                alert('Profile saved successfully!');
            }
            reader.readAsDataURL(profilePicture);
        } else {
            localStorage.setItem(`${currentUser}_bio`, bio);
            alert('Profile saved successfully!');
        }
    }

    function loadUserProfile() {
        const profilePicture = localStorage.getItem(`${currentUser}_profilePicture`);
        const bio = localStorage.getItem(`${currentUser}_bio`);
        if (profilePicture) {
            document.getElementById('profile-picture').src = profilePicture;
        }
        if (bio) {
            profileBio.value = bio;
        }
    }

    function loadUserMedia() {
        // Load user media from localStorage and display in userMediaGallery
        const mediaKeys = Object.keys(localStorage).filter(key => key.startsWith(`${currentUser}_media_`));
        mediaKeys.forEach(key => {
            const media = JSON.parse(localStorage.getItem(key));
            const mediaElement = createMediaElement(media.src, media.type);
            userMediaGallery.appendChild(mediaElement);
        });
    }

    // Existing functions...

    function createMediaElement(src, type) {
        let element;
        if (type.startsWith('image/')) {
            element = document.createElement('img');
            element.src = src;
        } else if (type.startsWith('video/')) {
            element = document.createElement('video');
            element.src = src;
            element.controls = true;
        }
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        element.appendChild(commentSection);
        element.onclick = function() {
            if (currentUser) {
                const comment = prompt('Enter your comment:');
                if (comment) {
                    const commentElement = document.createElement('p');
                    commentElement.textContent = `${currentUser}: ${comment}`;
                    commentSection.appendChild(commentElement);
                }
            } else {
                alert('Please log in to comment.');
            }
        };
        return element;
    }

    // Existing functions...
});

document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('upload-form');
    let currentUser = localStorage.getItem('currentUser');

    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const mediaUpload = document.getElementById('media-upload').files[0];
            saveMedia(mediaUpload);
            uploadForm.reset();
        });
    }

    function saveMedia(media) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const mediaData = {
                src: reader.result,
                type: media.type,
                user: currentUser
            };
            const mediaId = `media_${Date.now()}`;
            localStorage.setItem(mediaId, JSON.stringify(mediaData));
            alert('Upload successful! Your media will be displayed in the gallery.');
        };
        reader.readAsDataURL(media);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('upload-form');
    let currentUser = localStorage.getItem('currentUser');

    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const mediaUpload = document.getElementById('media-upload').files[0];
            saveMedia(mediaUpload);
            uploadForm.reset();
        });
    }

    function saveMedia(media) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const mediaData = {
                src: reader.result,
                type: media.type,
                user: currentUser,
                comments: []
            };
            const mediaId = `media_${Date.now()}`;
            localStorage.setItem(mediaId, JSON.stringify(mediaData));
            alert('Upload successful! Your media will be displayed in the gallery.');
        };
        reader.readAsDataURL(media);
    }
});

