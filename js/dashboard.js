document.addEventListener('DOMContentLoaded', () => {
    const stats = [
        { 
            type: 'goal',
            title: 'Weekly Goal', 
            value: '4.5', 
            unit: '/8h',
            description: 'of weekly goal completed',
            percentage: 56 
        },
        { 
            type: 'stat',
            title: 'Courses in Progress', 
            value: '3', 
            subtitle: 'Active courses', 
            icon: '&#128218;' // book icon
        },
        { 
            type: 'stat',
            title: 'Certificates Earned', 
            value: '2', 
            subtitle: 'Completed courses', 
            icon: '&#127894;' // certificate/badge icon
        }
    ];

    const myCourses = [
        { title: 'Web Development Fundamentals', description: 'Learn HTML, CSS, and JavaScript basics to build responsive websites.', progress: 65, author: 'John Smith', authorImage: 'user page.png', image: 'assets/images/div.png' },
        { title: 'UX Design Principles', description: 'Master the fundamentals of user experience design and prototyping.', progress: 32, author: 'Sarah Johnson', authorImage: 'user page.png', image: 'assets/images/div.png' },
        { title: 'Data Science Essentials', description: 'Introduction to data analysis, visualization, and machine learning.', progress: 18, author: 'Michael Chen', authorImage: 'user page.png', image: 'assets/images/div.png' },
        { title: 'Advanced CSS and Sass', description: 'Take your CSS skills to the next level with Sass.', progress: 50, author: 'Jane Doe', authorImage: 'user page.png', image: 'assets/images/div.png' }
    ];

    const recommendedCourses = [
        { title: 'Advanced JavaScript', description: 'Master modern JavaScript features, async programming, and frameworks.', rating: 4.5, reviews: 1200, price: 49.99, popular: true, image: 'assets/images/div.png' },
        { title: 'UI Animation in Figma', description: 'Learn to create engaging UI animations.', rating: 4.8, reviews: 850, price: 39.99, popular: false, image: 'assets/images/div.png' },
        { title: 'Python for Data Science', description: 'A comprehensive guide to data science with Python.', rating: 4.7, reviews: 1500, price: 59.99, popular: true, image: 'assets/images/div.png' }

    ];

    const statsContainer = document.querySelector('.stats-cards');
    stats.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        let cardContent = '';

        if (stat.type === 'goal') {
            cardContent = `
                <div class="stat-header">
                    <h4>${stat.title}</h4>
                    <span class="more-options">&#8942;</span>
                </div>
                <div class="stat-body">
                    <div class="goal-value">
                        <span class="value">${stat.value}</span>
                        <span class="unit">${stat.unit}</span>
                    </div>
                    <div class="circular-progress" style="--progress: ${stat.percentage}">
                        <span class="progress-value">${stat.percentage}%</span>
                    </div>
                </div>
                <p class="stat-footer">${stat.percentage}% ${stat.description}</p>
            `;
        } else if (stat.type === 'stat') {
            cardContent = `
                 <div class="stat-header">
                    <h4>${stat.title}</h4>
                    <span class="more-options">&#8942;</span>
                </div>
                <div class="stat-body">
                     <div class="stat-info">
                        <p class="value">${stat.value}</p>
                        <p class="subtitle">${stat.subtitle}</p>
                    </div>
                    <div class="stat-icon">${stat.icon}</div>
                </div>
            `;
        }
        card.innerHTML = cardContent;
        statsContainer.appendChild(card);
    });

    const myCoursesContainer = document.getElementById('my-courses-container');
    myCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-card-banner-container">
                 <img src="${course.image}" alt="${course.title}" class="course-card-banner">
                 <div class="in-progress-badge">In Progress</div>
            </div>
            <div class="course-card-content">
                <h4>${course.title}</h4>
                <p class="course-description">${course.description}</p>
            </div>
        `;
        myCoursesContainer.appendChild(card);
    });

    const recommendedContainer = document.getElementById('recommended-courses-container');
    recommendedCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-card-banner-container">
                <img src="${course.image}" alt="${course.title}" class="course-card-banner">
                ${course.popular ? '<div class="popular-badge">Popular</div>' : ''}
            </div>
            <div class="course-card-content">
                <h4>${course.title}</h4>
                <p class="course-description">${course.description}</p>
                <div class="rating">
                    <span class="stars">${ '★'.repeat(Math.round(course.rating)) }${ '☆'.repeat(5 - Math.round(course.rating)) }</span>
                    <span>${course.rating} (${course.reviews} reviews)</span>
                </div>
                <div class="price">$${course.price}</div>
            </div>
        `;
        recommendedContainer.appendChild(card);
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the document click listener from firing immediately
            sidebar.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            // If the sidebar is open and the click is outside the sidebar and the toggle button
            if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
});
