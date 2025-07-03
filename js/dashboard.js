document.addEventListener('DOMContentLoaded', () => {
    // Update user info in dashboard header/profile
    function updateUserInfo() {
        const user = JSON.parse(localStorage.getItem('user'));
        // Update welcome message
        const welcomeHeader = document.querySelector('header h2');
        if (welcomeHeader && user && user.name) {
            welcomeHeader.textContent = `Welcome back, ${user.name}!`;
        }
        // Update profile name
        const profileName = document.querySelector('.profile-info p');
        if (profileName && user && user.name) {
            profileName.textContent = user.name;
        }
        // Keep the old profile image, do not update it dynamically
    }

    updateUserInfo();

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

    const recommendedCourses = [
        { title: 'Advanced JavaScript', description: 'Master modern JavaScript features, async programming, and frameworks.', rating: 4.5, reviews: 1200, price: 49.99, popular: true, image: 'assets/images/div.png' },
        { title: 'UI Animation in Figma', description: 'Learn to create engaging UI animations.', rating: 4.8, reviews: 850, price: 39.99, popular: false, image: 'assets/images/div.png' },
        { title: 'Python for Data Science', description: 'A comprehensive guide to data science with Python.', rating: 4.7, reviews: 1500, price: 59.99, popular: true, image: 'assets/images/div.png' }

    ];

    async function loadMyCourses() {
        const myCoursesContainer = document.getElementById('my-courses-container');
        if (!myCoursesContainer) return;

        myCoursesContainer.innerHTML = '<div class="loader-overlay"><div class="loader"></div></div>';

        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://web-project-backend-6yfh.onrender.com/api/my-courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch courses');

            // --- KEY CHANGE HERE ---
            // APIs often wrap arrays in an object. Access the array directly.
            // Use a tool like browser dev tools (Network tab) to see the actual structure.
            // It might be responseData.data, responseData.courses, etc.
            const responseData = await response.json();
            const myCourses = responseData.courses || responseData.data || responseData; // Check for nested array, fallback to responseData itself

            myCoursesContainer.innerHTML = '';

            if (!Array.isArray(myCourses) || myCourses.length === 0) {
                myCoursesContainer.innerHTML = '<p>You haven\'t added any courses yet. <a href="index.html">Explore courses</a> to get started!</p>';
                return;
            }

            myCourses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course-card';
                const imageUrl = course.image_url
                    ? `https://web-project-backend-6yfh.onrender.com${course.image_url}`
                    : 'assets/images/div.png';
                card.innerHTML = `
                    <div class="course-card-banner-container">
                         <img src="${imageUrl}" alt="${course.title}" class="course-card-banner">
                         <div class="in-progress-badge">In Progress</div>
                    </div>
                    <div class="course-card-content">
                         <h4>${course.title}</h4>
                         <p class="course-description">${course.description || (course.speaker ? `By ${course.speaker}` : '')}</p>
                         <button class="leave-btn">Leave</button>
                    </div>
                `;
                myCoursesContainer.appendChild(card);
                card.querySelector('.leave-btn').addEventListener('click', async (e) => {
                    e.preventDefault();
                    const token = localStorage.getItem('token');
                    // Use course._id for MongoDB or course.id for SQL
                    const courseId = course._id || course.id;
                    if (!courseId) {
                        alert('Course ID not found.');
                        return;
                    }
                    // Show loader while leaving
                    card.querySelector('.leave-btn').disabled = true;
                    card.querySelector('.leave-btn').textContent = 'Leaving...';
                    try {
                        const response = await fetch(`https://web-project-backend-6yfh.onrender.com/api/courses/${courseId}/leave`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        if (!response.ok) {
                            const data = await response.json().catch(() => ({}));
                            throw new Error(data.message || 'Failed to leave course');
                        }
                        // Refresh the list after leaving
                        loadMyCourses();
                    } catch (err) {
                        alert(err.message || 'Could not leave the course.');
                        card.querySelector('.leave-btn').disabled = false;
                        card.querySelector('.leave-btn').textContent = 'Leave';
                    }
                });
            });
        } catch (err) {
            console.error(err); // Log the actual error to the console for better debugging
            myCoursesContainer.innerHTML = '<p class="error">Failed to load your courses. Please try again later.</p>';
        }
    }

    function removeCourseFromMyCourses(courseTitle) {
        let myCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
        myCourses = myCourses.filter(course => course.title !== courseTitle);
        localStorage.setItem('myCourses', JSON.stringify(myCourses));
        loadMyCourses(); // Re-render the list
    }

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
                    <span class="stars">${'★'.repeat(Math.round(course.rating))}${'☆'.repeat(5 - Math.round(course.rating))}</span>
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

    // Add loader CSS if not present
    if (!document.getElementById('my-courses-loader-style')) {
        const style = document.createElement('style');
        style.id = 'my-courses-loader-style';
        style.textContent = `
        .loader-overlay { position: relative; min-height: 80px; }
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 36px; height: 36px; animation: spin 1s linear infinite; position: absolute; left: 50%; top: 30px; transform: translateX(-50%); }
        @keyframes spin { 0% { transform: translateX(-50%) rotate(0deg); } 100% { transform: translateX(-50%) rotate(360deg); } }
        `;
        document.head.appendChild(style);
    }
    loadMyCourses();
});
