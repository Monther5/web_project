# CourseHub - Online Learning Platform

This project is a modern and responsive user interface for "CourseHub," a fictional online learning platform. It includes a beautiful landing page, a comprehensive user dashboard, authentication, and an admin panel. The application is connected to a live backend API for dynamic course loading and user authentication.

## Features

- **Modern & Clean UI:** Designed with a fresh color palette and clean layout for an excellent user experience.
- **Fully Responsive:** The layout adapts seamlessly to various screen sizes, from mobile phones to desktops.
- **User Authentication:** Full sign-up and sign-in functionality connected to a backend API. The UI dynamically changes based on the user's login status (e.g., showing/hiding "Login", "Logout", "My Courses").
- **Dynamic Course Loading:** Featured courses are fetched from a live backend API. Includes a fallback to mock data and an error message if the API is unavailable.
- **Interactive "My Courses" Functionality:**
    - Logged-in users can add courses to their personal "My Courses" list.
    - The dashboard dynamically displays the user's saved courses.
    - Users can remove courses from their list.
    - This state is persisted using browser localStorage.
- **Interactive Elements:** Smooth animations and transitions on cards, buttons, and navigation items. Includes a "View All" / "View Less" toggle for featured courses.
- **Admin Dashboard:** A functional interface for administrators to view and add new courses via a modal form.
- **Component-Based Design:** Well-structured HTML and CSS make it easy to maintain and scale the project.

## Pages

### 1. Landing Page (`index.html`)

The first point of contact for new visitors.
- **Hero Section:** A welcoming banner with a call-to-action and a course search bar.
- **Featured Courses:** A section to highlight popular or new courses, loaded dynamically from an API.
- **Categories:** Allows users to browse courses by subject, with icons.
- **Testimonials:** Builds trust by showcasing positive feedback from students with animations.
- **Dynamic & Responsive Navigation:** A hamburger menu on smaller screens and dynamic buttons based on auth state.

### 2. User Dashboard (`dashboard.html`)

A personalized space for students to track their progress.
- **Collapsible Sidebar:** A responsive navigation menu with icons for different dashboard sections.
- **Header:** Welcomes the user, shows their profile picture, and includes a notification icon.
- **Statistics Overview:** At-a-glance cards displaying key metrics.
- **My Courses:** A list of courses the user has added, with the ability to remove them.
- **Recommended Courses:** A section suggesting new courses.

### 3. Admin Dashboard (`admin.html`)

An interface for site administrators to manage platform content.
- **Sidebar Navigation:** Quick access to different admin sections.
- **Course Management Table:** A table displaying all available courses with options to edit or delete.
- **Create Course Modal:** A pop-up form to add new courses to the platform.

### 4. Authentication Pages (`signin.html` & `signup.html`)

Clean and simple forms for user sign-in and registration, with API integration for authentication.

## Technologies Used

- **HTML5:** For the structure and content of the web pages.
- **CSS3:** For styling, layout, animations, and responsive design (using Flexbox, Grid, and Media Queries).
- **JavaScript (ES6):** For DOM manipulation, dynamic content rendering, handling user interactions, and API communication (`fetch`).
- **REST API Integration:** Connects to a Node.js/Express backend for user authentication and fetching course data.
- **Browser localStorage:** To persist user sessions (token) and the "My Courses" list.
- **Font Awesome:** For scalable vector icons.

## How to Run

This is a static front-end project that connects to a live backend API. No special build steps are required.

Simply open any of the `.html` files (`index.html`, `dashboard.html`, `admin.html`, etc.) in your web browser to view and interact with the project.