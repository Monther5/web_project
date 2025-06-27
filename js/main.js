document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        { title: 'Web Development Bootcamp', author: 'John Smith', rating: 4.8, reviews: 2345, price: 49.99, originalPrice: 100.00, bestseller: true, image: 'div.png' },
        { title: 'Data Science Fundamentals', author: 'Sarah Johnson', rating: 4.6, reviews: 1929, price: 59.99, originalPrice: 179.09, new: true, image: 'div.png' },
        { title: 'UX/UI Design Masterclass', author: 'Michael Chen', rating: 4.9, reviews: 987, price: 69.99, originalPrice: 220.99, image: 'div.png' },
        { title: 'Digital Marketing Strategy', author: 'Emily Rodriguez', rating: 4.7, reviews: 1456, price: 44.99, originalPrice: 140.99, image: 'div.png' }
    ];

    const categories = [
        { name: 'Development', courses: 1245, icon: '&lt;/&gt;' },
        { name: 'Design', courses: 843, icon: '&#128444;' },
        { name: 'Business', courses: 966, icon: '&#128200;' },
        { name: 'Photography', courses: 523, icon: '&#128247;' },
        { name: 'Music', courses: 347, icon: '&#127925;' },
        { name: 'Languages', courses: 692, icon: 'AB' }
    ];

    const testimonials = [
        { name: 'Sarah Thompson', title: 'Web Developer', rating: 5, feedback: 'The Web Development Bootcamp completely changed my career path. I went from knowing nothing about coding to landing a job as a junior developer in just 6 months. The instructors are amazing and the community support is incredible.', image: 'profile.png' },
        { name: 'David Chen', title: 'Data Analyst', rating: 5, feedback: 'The Data Science course on CourseHub was comprehensive and practical. I appreciated how the instructors explained complex concepts in simple terms and provided real-world projects to work on. Highly recommended!', image: 'profile.png' },
        { name: 'Jessica Martinez', title: 'UX Designer', rating: 5, feedback: 'I\'ve taken several design courses on different platforms, but the UX/UI Design Masterclass on CourseHub was by far the most comprehensive. The portfolio projects helped me land my dream job at a tech startup.', image: 'profile.png' }
    ];

    const coursesContainer = document.querySelector('.courses-container');
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';

        let badges = '';
        if(course.bestseller) badges += `<div class="bestseller-badge">Bestseller</div>`;
        if(course.new) badges += `<div class="new-badge">New</div>`;

        courseCard.innerHTML = `
            ${badges}
            <div class="image-container">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <span class="bookmark">&#128278;</span>
            <h3>${course.title}</h3>
            <p>By ${course.author}</p>
            <div class="rating">
                <span>${'★'.repeat(Math.round(course.rating))}${'☆'.repeat(5 - Math.round(course.rating))}</span>
                <span>${course.rating} (${course.reviews})</span>
            </div>
            <div class="price">
                <span>$${course.price}</span>
                <span style="text-decoration: line-through;">$${course.originalPrice}</span>
            </div>
        `;
        coursesContainer.appendChild(courseCard);
    });

    const categoriesContainer = document.querySelector('.categories-container');
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

    document.querySelectorAll('.bookmark').forEach(bookmark => {
        bookmark.addEventListener('click', () => {
            bookmark.classList.toggle('bookmarked');
        });
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
});
