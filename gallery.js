document.addEventListener('DOMContentLoaded', function() {
    const mediaGallery = document.getElementById('media-gallery');

    if (mediaGallery) {
        loadAllMedia();
    }

    function createMediaElement(media) {
        let element;
        if (media.type.startsWith('image/')) {
            element = document.createElement('img');
            element.src = media.src;
        } else if (media.type.startsWith('video/')) {
            element = document.createElement('video');
            element.src = media.src;
            element.controls = true;
        }
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        media.comments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentSection.appendChild(commentElement);
        });
        element.appendChild(commentSection);
        element.onclick = function() {
            let currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                const comment = prompt('Enter your comment:');
                if (comment) {
                    const commentElement = document.createElement('p');
                    commentElement.textContent = `${currentUser}: ${comment}`;
                    commentSection.appendChild(commentElement);
                    media.comments.push(`${currentUser}: ${comment}`);
                    localStorage.setItem(media.id, JSON.stringify(media));
                }
            } else {
                alert('Please log in to comment.');
            }
        };
        return element;
    }

    function loadAllMedia() {
        const mediaKeys = Object.keys(localStorage).filter(key => key.startsWith('media_') || key.startsWith('example'));
        mediaKeys.forEach(key => {
            const media = JSON.parse(localStorage.getItem(key));
            const mediaElement = createMediaElement(media);
            mediaGallery.appendChild(mediaElement);
        });
    }
});
function addExampleMedia() {
    const exampleMedia = [
        {
            id: 'example1',
            src: 'example1.jpg',
            type: 'image/jpeg',
            user: 'ExampleUser1',
            comments: ['User1: Beautiful shot!', 'User2: Love this place!']
        },
        {
            id: 'example2',
            src: 'example2.jpg',
            type: 'image/jpeg',
            user: 'ExampleUser2',
            comments: ['User3: Amazing colors!']
        },
        {
            id: 'example3',
            src: 'example1.mp4',
            type: 'video/mp4',
            user: 'ExampleUser3',
            comments: ['User4: Great video!']
        },
        {
            id: 'example4',
            src: 'example2.mp4',
            type: 'video/mp4',
            user: 'ExampleUser4',
            comments: []
        }
    ];

    exampleMedia.forEach(media => {
        if (!localStorage.getItem(media.id)) {
            localStorage.setItem(media.id, JSON.stringify(media));
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const mediaGallery = document.getElementById('media-gallery');

    if (mediaGallery) {
        addExampleMedia();
        loadAllMedia();
    }
});
