document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://web-project-backend-6yfh.onrender.com/api/';
    let allCourses = []; // Will hold all courses after fetch

    async function fetchFeaturedCourses() {
        try {
            const response = await fetch(`${API_URL}courses`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allCourses = await response.json();
            renderFeaturedCourses(allCourses.slice(0, 4)); // Initially render only 4
        } catch (error) {
            console.error("Could not fetch featured courses:", error);
            // Fallback to mock data if API fails
            const mockCourses = [
                { title: 'UX/UI Design Masterclass', author: 'Michael Chen', rating: 4.9, reviews: 987, price: 69.99, originalPrice: 220.99, image: 'assets/images/div.png' },
                { title: 'Web Development Bootcamp', author: 'John Smith', rating: 4.8, price: 49.99, bestseller: true, image: 'assets/images/div.png' },
                { title: 'Data Science Fundamentals', author: 'Sarah Johnson', rating: 4.6, price: 59.99, new: true, image:'assets/images/div.png' },
                { title: 'UX/UI Design Masterclass', author: 'Michael Chen', rating: 4.9, price: 69.99, image: 'assets/images/div.png' },
                { title: 'Digital Marketing Strategy', author: 'Emily Rodriguez', rating: 4.7, price: 44.99, image: 'assets/images/div.png' }
            ];
            allCourses = mockCourses; // Store all mock courses
            renderFeaturedCourses(allCourses.slice(0, 4)); // Initially render only 4
            const coursesContainer = document.querySelector('.courses-container');
            if(coursesContainer) {
                const errorMessage = document.createElement('p');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Could not connect to the server. Displaying sample courses.';
                coursesContainer.prepend(errorMessage);
            }
        }
    }

    function renderFeaturedCourses(courses) {
        const coursesContainer = document.querySelector('.courses-container');
        coursesContainer.innerHTML = ''; // Clear existing content
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';

            let badges = '';
            if(course.bestseller) badges += `<div class="bestseller-badge">Bestseller</div>`;
            if(course.new) badges += `<div class="new-badge">New</div>`;

            // Construct the full image URL if image_url is provided, otherwise use a default image
            const imageUrl = course.image_url 
                ? `https://web-project-backend-6yfh.onrender.com${course.image_url}`
                : 'assets/images/div.png';

            courseCard.innerHTML = `
                ${badges}
                <div class="image-container">
                    <img src="${imageUrl}" alt="${course.title}">
                </div>
                <span class="bookmark">&#128278;</span>
                <h3>${course.title}</h3>
                <p>By ${course.author}</p>
                <div class="rating">
                    <span>${'★'.repeat(Math.round(course.rating))}${'☆'.repeat(5 - Math.round(course.rating))}</span>
                    <span>${course.rating}</span>
                </div>
                <div class="card-footer">
                    <div class="price">
                        <span>$${course.price}</span>
                    </div>
                    <button class="add-to-cart-btn"><i class="fas fa-plus"></i> Add to My Courses</button>
                </div>
            `;
            coursesContainer.appendChild(courseCard);

            const addToCartBtn = courseCard.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const authToken = localStorage.getItem('authToken');
                if (authToken) {
                    addToMyCourses(course);
                    addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added';
                    addToCartBtn.disabled = true;
                } else {
                    window.location.href = 'signin.html';
                }
            });
        });

        document.querySelectorAll('.bookmark').forEach(bookmark => {
            bookmark.addEventListener('click', () => {
                bookmark.classList.toggle('bookmarked');
            });
        });
    }

    function addToMyCourses(courseToAdd) {
        let myCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
        const isAlreadyAdded = myCourses.some(course => course.title === courseToAdd.title);
        if (!isAlreadyAdded) {
            myCourses.push(courseToAdd);
            localStorage.setItem('myCourses', JSON.stringify(myCourses));
        } else {
            console.log('Course already exists in My Courses.');
        }
    }

    const viewAllCoursesButton = document.querySelector('.view-all-courses');
    const viewLessCoursesButton = document.querySelector('.view-less-courses');

    if (viewAllCoursesButton && viewLessCoursesButton) {
        viewAllCoursesButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            renderFeaturedCourses(allCourses); // Render all courses
            viewAllCoursesButton.style.display = 'none'; // Hide the button
            viewLessCoursesButton.style.display = 'inline-block'; // Show the "View Less" button
        });

        viewLessCoursesButton.addEventListener('click', (e) => {
            e.preventDefault();
            renderFeaturedCourses(allCourses.slice(0, 4)); // Render first 4 courses
            viewLessCoursesButton.style.display = 'none'; // Hide the "View Less" button
            viewAllCoursesButton.style.display = 'inline-block'; // Show the "View All" button
        });
    }

    const categories = [
        { name: 'Development', courses: 1245, icon: '<i class="fas fa-code"></i>' },
        { name: 'Design', courses: 843, icon: '<i class="fas fa-palette"></i>' },
        { name: 'Business', courses: 956, icon: '<i class="fas fa-chart-line"></i>' },
        { name: 'Photography', courses: 523, icon: '<i class="fas fa-camera"></i>' },
        { name: 'Music', courses: 347, icon: '<i class="fas fa-music"></i>' },
        { name: 'Languages', courses: 692, icon: '<i class="fas fa-language"></i>' }
    ];

    const testimonials = [
        { name: 'Sarah Thompson', title: 'Web Developer', rating: 5, feedback: 'The Web Development Bootcamp completely changed my career path. I went from knowing nothing about coding to landing a job as a junior developer in just 6 months. The instructors are amazing and the community support is incredible.', image: 'assets/images/a1029126-8e1e-41b7-8179-8b454f2b3446.png' },
        { name: 'David Chen', title: 'Data Analyst', rating: 5, feedback: 'The Data Science course on CourseHub was comprehensive and practical. I appreciated how the instructors explained complex concepts in simple terms and provided real-world projects to work on. Highly recommended!', image: 'assets/images/a1029126-8e1e-41b7-8179-8b454f2b3446.png' },
        { name: 'Jessica Martinez', title: 'UX Designer', rating: 5, feedback: 'I\'ve taken several design courses on different platforms, but the UX/UI Design Masterclass on CourseHub was by far the most comprehensive. The portfolio projects helped me land my dream job at a tech startup.', image: 'assets/images/a1029126-8e1e-41b7-8179-8b454f2b3446.png' }
    ];

    const categoriesContainer = document.querySelector('.categories-container');
    if (categoriesContainer) {
        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.innerHTML = `
                <div class="icon">${category.icon}</div>
                <h3>${category.name}</h3>
                <p>${category.courses} courses</p>
            `;
            categoriesContainer.appendChild(categoryCard);
        });
    }

    const testimonialsContainer = document.querySelector('.testimonials-container');
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-header">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="testimonial-author">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.title}</p>
                </div>
            </div>
            <div class="rating">${'★'.repeat(testimonial.rating)}</div>
            <p class="feedback">"${testimonial.feedback}"</p>
        `;
        testimonialsContainer.appendChild(testimonialCard);
    });

    const menuToggle = document.querySelector('header .menu-toggle');
    const navMenu = document.querySelector('header nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('open');
            }
        });
    }

    // Authentication UI update
    const authToken = localStorage.getItem('authToken');
    const loginButton = document.querySelector('.auth-buttons .login');
    const signupButton = document.querySelector('.auth-buttons .signup');
    const logoutButton = document.querySelector('#logout-button');
    const myCoursesLink = document.querySelector('#my-courses-link');

    if (authToken) {
        // User is logged in
        if(loginButton) loginButton.style.display = 'none';
        if(signupButton) signupButton.style.display = 'none';
        if(logoutButton) logoutButton.style.display = 'inline-block';
        if(myCoursesLink) myCoursesLink.style.display = 'inline-block';
    } else {
        // User is not logged in
        if(loginButton) loginButton.style.display = 'inline-block';
        if(signupButton) signupButton.style.display = 'inline-block';
        if(logoutButton) logoutButton.style.display = 'none';
        if(myCoursesLink) myCoursesLink.style.display = 'none';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.reload(); // Reload the page to reflect logout
        });
    }

    const testimonialSection = document.querySelector('.testimonials');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                testimonialSection.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (testimonialSection) {
        observer.observe(testimonialSection);
    }

    // Initial fetch of featured courses
    fetchFeaturedCourses();

});
