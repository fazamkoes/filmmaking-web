document.addEventListener('DOMContentLoaded', function() {
    const mediaGallery = document.getElementById('media-gallery');

    if (mediaGallery) {
        console.log("media-gallery element found."); // Debugging statement
        addExampleMedia();
        loadAllMedia();
    } else {
        console.error("Element with ID 'media-gallery' not found.");
    }

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
                console.log(`Added example media with ID: ${media.id}`, media); // Debugging statement
            }
        });
    }

    function createMediaElement(media) {
        let element;
        if (media.type.startsWith('image/')) {
            element = document.createElement('img');
            element.src = media.src;
            element.alt = 'Uploaded Image';
        } else if (media.type.startsWith('video/')) {
            element = document.createElement('video');
            element.src = media.src;
            element.controls = true;
        }
        const container = document.createElement('div');
        container.className = 'media-container';

        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        media.comments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentSection.appendChild(commentElement);
        });

        container.appendChild(element);
        container.appendChild(commentSection);

        container.onclick = function() {
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
        return container;
    }

    function loadAllMedia() {
        const mediaKeys = Object.keys(localStorage).filter(key => key.startsWith('media_') || key.startsWith('example'));
        console.log(`Loading media keys:`, mediaKeys); // Debugging statement
        mediaKeys.forEach(key => {
            const media = JSON.parse(localStorage.getItem(key));
            if (media) {
                console.log(`Loading media with ID: ${key}`, media); // Debugging statement
                const mediaElement = createMediaElement(media);
                mediaGallery.appendChild(mediaElement);
            } else {
                console.error(`Failed to load media with ID: ${key}`);
            }
        });
    }
});
