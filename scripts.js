document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('upload-form');
    let currentUser = localStorage.getItem('currentUser');

    console.log('Current user:', currentUser); // Debugging statement

    if (!currentUser) {
        alert('Please log in to upload media.');
        return;
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const mediaUpload = document.getElementById('media-upload').files[0];
            console.log('Selected file:', mediaUpload); // Debugging statement

            if (mediaUpload) {
                saveMedia(mediaUpload);
                uploadForm.reset();
            } else {
                alert('Please select a media file to upload.');
            }
        });
    } else {
        console.error("Upload form not found.");
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
            console.log(`Saved media with ID: ${mediaId}`, mediaData); // Debugging statement
            alert('Upload successful! Your media will be displayed in the gallery.');
        };
        reader.onerror = function() {
            console.error('Error reading file:', reader.error);
            alert('Failed to upload media. Please try again.');
        };
        reader.readAsDataURL(media);
    }
});
