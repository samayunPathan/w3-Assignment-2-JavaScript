
document.addEventListener('DOMContentLoaded', function () {
    const mainSearchBar = document.getElementById('main-search-bar');
    const searchBarAdd = document.getElementById('search-bar-add');
    let overlay;

    function showSearchBarAdd() {
        // Create and add overlay
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        // Show search-bar-add
        searchBarAdd.classList.remove('hidden');
    }

    function hideSearchBarAdd() {
        // Remove overlay
        if (overlay) {
            overlay.remove();
        }

        // Hide search-bar-add
        searchBarAdd.classList.add('hidden');
    }

    mainSearchBar.addEventListener('click', function (event) {
        event.stopPropagation();
        showSearchBarAdd();
    });

    // Hide search-bar-add when clicking outside
    document.addEventListener('click', function (event) {
        if (!searchBarAdd.contains(event.target) && !mainSearchBar.contains(event.target)) {
            hideSearchBarAdd();
        }
    });

    // Prevent hiding when clicking inside search-bar-add
    searchBarAdd.addEventListener('click', function (event) {
        event.stopPropagation();
    });

});

// ------ map ------ 



// //  ------ map  && calender ------ 





// calender worked ----- **** 

document.addEventListener('DOMContentLoaded', function () {
    const whereInput = document.getElementById('where-btn');
    const regionDropdown = document.getElementById('region-dropdown');
    const regionOptions = document.querySelectorAll('.region-option');
    const otherInputs = document.querySelectorAll('#checkin-btn, #checkout-btn, #guests-btn');
    const checkinInput = document.getElementById('checkin-btn');
    const checkoutInput = document.getElementById('checkout-btn');
    const searchBar = document.getElementById('search-bar-add');

    // Prevent propagation for Flatpickr calendar
    const preventPropagation = (element) => {
        element.addEventListener('click', (e) => e.stopPropagation());
    };

    // Flatpickr configuration
    const flatpickrConfig = {
        minDate: "today",
        dateFormat: "Y-m-d",
        clickOpens: true,
        onClose: function (selectedDates, dateStr, instance) {
            searchBar.classList.remove('hidden');
        },
        onReady: function (selectedDates, dateStr, instance) {
            preventPropagation(instance.calendarContainer);
        }
    };

    // Initialize Flatpickr for check-in and check-out dates
    const checkinPicker = flatpickr(checkinInput, {
        ...flatpickrConfig,
        onChange: function (selectedDates, dateStr) {
            checkoutPicker.set('minDate', dateStr);
        }
    });

    const checkoutPicker = flatpickr(checkoutInput, flatpickrConfig);

    // Where input and region dropdown logic
    whereInput.addEventListener('click', function (event) {
        event.stopPropagation();
        regionDropdown.classList.toggle('hidden');
    });

    regionOptions.forEach(option => {
        option.addEventListener('click', function () {
            const selectedRegion = this.getAttribute('data-region');
            whereInput.value = selectedRegion;
            regionDropdown.classList.add('hidden');
        });
    });

    // Close dropdown when clicking on other input fields
    otherInputs.forEach(input => {
        input.addEventListener('click', function () {
            regionDropdown.classList.add('hidden');
        });
    });

    // Close dropdown when clicking outside and ensure search bar visibility
    document.addEventListener('click', function (event) {
        if (!whereInput.contains(event.target) && !regionDropdown.contains(event.target) &&
            !event.target.contains('.flatpickr-calendar')) {
            regionDropdown.classList.add('hidden');
        }

        // Ensure search bar stays visible
        searchBar.classList.remove('hidden');
    });

    // Additional logic for guests input and search button can be added here
});



// end calender worked ----- ****** 

// ------ guest start ---- 



document.addEventListener('DOMContentLoaded', function () {
    const guestBtn = document.getElementById('guests-btn');
    const guestDropdown = document.getElementById('guest-dropdown');
    const incrementBtns = document.querySelectorAll('.increment');
    const decrementBtns = document.querySelectorAll('.decrement');
    const otherInputs = document.querySelectorAll('input:not(#guests-btn)');

    guestBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        guestDropdown.classList.toggle('hidden');
    });

    function updateCount(type, increment) {
        const countElement = document.getElementById(`${type}-count`);
        let count = parseInt(countElement.textContent);
        if (increment) {
            count++;
        } else if (count > 0) {
            count--;
        }
        countElement.textContent = count;
        updateGuestCount();

        const decrementBtn = document.querySelector(`.decrement[data-type="${type}"]`);
        if (decrementBtn) {
            decrementBtn.disabled = (count === 0);
        }
    }

    incrementBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            updateCount(this.dataset.type, true);
        });
    });

    decrementBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            updateCount(this.dataset.type, false);
        });
    });

    function updateGuestCount() {
        const adultCount = parseInt(document.getElementById('adult-count').textContent);
        const childCount = parseInt(document.getElementById('child-count').textContent);
        const infantCount = parseInt(document.getElementById('infant-count').textContent);
        const petCount = parseInt(document.getElementById('pet-count').textContent);

        const totalGuests = adultCount + childCount;
        let guestText = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`;
        if (infantCount > 0) {
            guestText += `, ${infantCount} infant${infantCount !== 1 ? 's' : ''}`;
        }
        if (petCount > 0) {
            guestText += `, ${petCount} pet${petCount !== 1 ? 's' : ''}`;
        }

        guestBtn.value = guestText;
    }

    // Close dropdown when clicking outside or on other inputs
    document.addEventListener('click', function (event) {
        if (!guestDropdown.contains(event.target) && event.target !== guestBtn) {
            guestDropdown.classList.add('hidden');
        }
    });

    otherInputs.forEach(input => {
        input.addEventListener('click', function () {
            guestDropdown.classList.add('hidden');
        });
    });

    // Prevent dropdown from closing when clicking inside it
    guestDropdown.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});



// share option ------ 


document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");

    const shareButton = document.getElementById('shareButton');
    const shareModal = document.getElementById('shareModal');

    console.log("Share button:", shareButton);
    console.log("Share modal:", shareModal);

    if (shareButton && shareModal) {
        shareButton.addEventListener('click', () => {
            console.log("Share button clicked");
            shareModal.style.display = 'block';
        });

        window.addEventListener('click', (event) => {
            console.log("Window clicked");
            if (event.target === shareModal) {
                console.log("Closing modal");
                shareModal.style.display = 'none';
            }
        });
        // -------copy link 
        // Copy Link functionality
        copyLinkBtn.addEventListener('click', () => {
            // Get the current page URL
            const currentPageUrl = window.location.href;

            // Create a temporary textarea element to hold the URL
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = currentPageUrl;
            document.body.appendChild(tempTextArea);

            // Select and copy the URL
            tempTextArea.select();
            document.execCommand('copy');

            // Remove the temporary textarea
            document.body.removeChild(tempTextArea);

            // Provide user feedback
            alert('Link copied to clipboard!');
            // Or use a more subtle notification method if preferred
        });
        // end copy link 
        shareModal.querySelector('.modal-content').addEventListener('click', (event) => {
            console.log("Modal content clicked");
            event.stopPropagation();
        });
    } else {
        console.error("Share button or modal not found");
    }
});



// ======= one view picture ===== 


document.addEventListener('DOMContentLoaded', function () {
    const showAllButton = document.querySelector('.show-all');
    const fullscreenGallery = document.querySelector('.fullscreen-gallery');
    const closeGalleryButton = document.querySelector('.close-gallery');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const prevButton = document.querySelector('.prev-image');
    const nextButton = document.querySelector('.next-image');
    const imageCounter = document.querySelector('.image-counter');

    const images = [
        '/images/room1.jpg',
        '/images/room2.jpg',
        '/images/room1.jpg',
        '/images/room4.jpeg',
    ];

    let currentImageIndex = 0;

    function showFullscreenGallery() {
        fullscreenGallery.style.display = 'flex';
        showImage(currentImageIndex);
    }

    function closeFullscreenGallery() {
        fullscreenGallery.style.display = 'none';
    }

    function showImage(index) {
        fullscreenImage.src = images[index];
        imageCounter.textContent = `${index + 1} / ${images.length}`;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    }

    showAllButton.addEventListener('click', showFullscreenGallery);
    closeGalleryButton.addEventListener('click', closeFullscreenGallery);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (fullscreenGallery.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeFullscreenGallery();
            }
        }
    });

    // Preload images
    images.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
});



// ----------- fovarite  ------ 
document.addEventListener('DOMContentLoaded', function () {
    const heartButton = document.getElementById('heartButton');
    const heartIcon = document.getElementById('heartIcon');
    let isLiked = false;

    heartButton.addEventListener('click', function () {
        isLiked = !isLiked;

        if (isLiked) {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid', 'active');
        } else {
            heartIcon.classList.remove('fa-solid', 'active');
            heartIcon.classList.add('fa-regular');
        }

        // Store the like state (you might want to send this to a server in a real application)
        localStorage.setItem('isLiked', isLiked);
    });

    // Check if the item was previously liked
    if (localStorage.getItem('isLiked') === 'true') {
        isLiked = true;
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid', 'active');
    }
});