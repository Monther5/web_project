// --- API Helper Functions ---
// Upload course image
async function uploadCourseImage(courseId, file) {
    if (!file || !courseId) {
        throw new Error('No image or course_id provided.');
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('course_id', courseId);
    // Only set Authorization header, not Content-Type
    const res = await fetch(`${baseUrl}courses/upload-image`, {
        method: 'POST',
        headers: authHeaders(),
        body: formData
    });
    return await res.json();
}
// Replace 'API_URL' with your actual endpoints
const baseUrl = 'https://web-project-backend-6yfh.onrender.com/api/'; // Replace with your actual base URL

// Helper to get the token (customize as needed)
function getAuthToken() {
    // Example: from localStorage, or replace with your logic
    return localStorage.getItem('token') || '';
}

function authHeaders(extra = {}) {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE5LCJlbWFpbCI6Im5ld3VzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTEzOTg0NTQsImV4cCI6MTc1MTQwMjA1NH0.uyPLdccchCtDXFfj-BpK5W-dlbKB9SUperUUWw4mFZI";
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...extra
    };
}

async function fetchCourses() {
    const res = await fetch(`${baseUrl}courses`, { headers: authHeaders() });
    return await res.json();
}
async function fetchAdmins() {
    const res = await fetch(`${baseUrl}users/admins`, { headers: authHeaders() });
    return await res.json();
}
async function fetchUsers() {
    const res = await fetch(`${baseUrl}users`, { headers: authHeaders() });
    return await res.json();
}
async function createCourse(data) {
    const res = await fetch(`${baseUrl}courses`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    return await res.json();
}
async function updateCourse(id, data) {
    const res = await fetch(`${baseUrl}courses/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    return await res.json();
}
async function deleteCourse(id) {
    await fetch(`${baseUrl}courses/${id}`, { method: 'DELETE', headers: authHeaders() });
}
async function createAdmin(data) {
    const res = await fetch(`${baseUrl}users/admins`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    return await res.json();
}
async function updateAdmin(id, data) {
    const res = await fetch(`${baseUrl}users/admins/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    return await res.json();
}
async function deleteAdmin(id) {
    await fetch(`${baseUrl}users/admins/${id}`, { method: 'DELETE', headers: authHeaders() });
}
async function deleteUser(id) {
    await fetch(`${baseUrl}users/admins/${id}`, { method: 'DELETE', headers: authHeaders() });
}

// --- Edit Course Modal Logic ---
let editCourseModal, closeEditCourseModal, cancelEditCourseBtn, editCourseForm, editingCourseIndex;

// Defer course modal logic until DOMContentLoaded so renderCoursesTable is in scope
document.addEventListener('DOMContentLoaded', () => {
    editCourseModal = document.getElementById('edit-course-modal');
    closeEditCourseModal = document.getElementById('close-edit-course-modal');
    cancelEditCourseBtn = document.getElementById('cancel-edit-course-btn');
    editCourseForm = document.getElementById('edit-course-form');
    editingCourseIndex = null;

    window.openEditCourseModal = function (index) {
        const course = coursesData[index];
        document.getElementById('edit-course-name').value = course.title;
        document.getElementById('edit-course-speaker').value = course.speaker;
        document.getElementById('edit-course-rating').value = course.rating;
        document.getElementById('edit-course-price').value = parseFloat(course.price);
        editingCourseIndex = index;
        editCourseModal.classList.add('show');
    };

    if (closeEditCourseModal) closeEditCourseModal.addEventListener('click', () => { editCourseModal.classList.remove('show'); });
    if (cancelEditCourseBtn) cancelEditCourseBtn.addEventListener('click', () => { editCourseModal.classList.remove('show'); });
    if (editCourseForm) editCourseForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (editingCourseIndex !== null) {
            const course = coursesData[editingCourseIndex];
            const updated = {
                title: document.getElementById('edit-course-name').value,
                speaker: document.getElementById('edit-course-speaker').value,
                rating: document.getElementById('edit-course-rating').value,
                price: document.getElementById('edit-course-price').value
            };
            await updateCourse(course.id || course._id || editingCourseIndex, updated);
            await renderCoursesTable();
            editCourseModal.classList.remove('show');
        }
    });

    // --- Edit Admin Modal Logic ---
    const editAdminModal = document.getElementById('edit-admin-modal');
    const closeEditAdminModal = document.getElementById('close-edit-admin-modal');
    const cancelEditAdminBtn = document.getElementById('cancel-edit-admin-btn');
    const editAdminForm = document.getElementById('edit-admin-form');
    let editingAdminIndex = null;

    function openEditAdminModal(index) {
        const admin = adminsData[index];
        document.getElementById('edit-admin-name').value = admin.name;
        document.getElementById('edit-admin-email').value = admin.email;
        document.getElementById('edit-admin-role').value = admin.role;
        editingAdminIndex = index;
        editAdminModal.classList.add('show');
    }
    if (closeEditAdminModal) closeEditAdminModal.addEventListener('click', () => { editAdminModal.classList.remove('show'); });
    if (cancelEditAdminBtn) cancelEditAdminBtn.addEventListener('click', () => { editAdminModal.classList.remove('show'); });
    if (editAdminForm) editAdminForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (editingAdminIndex !== null) {
            adminsData[editingAdminIndex].name = document.getElementById('edit-admin-name').value;
            adminsData[editingAdminIndex].email = document.getElementById('edit-admin-email').value;
            adminsData[editingAdminIndex].role = document.getElementById('edit-admin-role').value;
            renderAdminsTable();
            editAdminModal.classList.remove('show');
        }
    });
    // Make data arrays global so they are accessible everywhere
    let coursesData = [];
    let adminsData = [];
    let usersData = [];

    // Modal logic
    const createCourseBtn = document.getElementById('create-course-btn');
    const modal = document.getElementById('create-course-modal');
    // Fix: Use the correct close button for create course modal
    const closeModal = document.querySelector('#create-course-modal .close-btn, #create-course-modal .close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const createAdminBtn = document.getElementById('create-admin-btn');
    const adminModal = document.getElementById('create-admin-modal');
    const closeAdminModal = document.getElementById('close-admin-modal');
    const cancelAdminBtn = document.getElementById('cancel-admin-btn');

    if (createCourseBtn) {
        createCourseBtn.addEventListener('click', () => {
            modal.classList.add('show');
        });
    }
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.classList.remove('show');
        }
    });

    if (createAdminBtn) {
        createAdminBtn.addEventListener('click', () => {
            adminModal.classList.add('show');
        });
    }
    if (closeAdminModal) {
        closeAdminModal.addEventListener('click', () => {
            adminModal.classList.remove('show');
        });
    }
    if (cancelAdminBtn) {
        cancelAdminBtn.addEventListener('click', () => {
            adminModal.classList.remove('show');
        });
    }
    window.addEventListener('click', (event) => {
        if (event.target == adminModal) {
            adminModal.classList.remove('show');
        }
    });

    // Tab logic
    const tableContainer = document.getElementById('table-container');
    const mainTitle = document.getElementById('main-title');
    const tabCourses = document.getElementById('tab-courses');
    const tabAdmins = document.getElementById('tab-admins');
    const tabUsers = document.getElementById('tab-users');

    async function renderCoursesTable() {
        mainTitle.textContent = 'Courses Management';
        if (createCourseBtn) createCourseBtn.style.display = '';
        if (createAdminBtn) createAdminBtn.style.display = 'none';
        coursesData = await fetchCourses();
        let html = `<table class="courses-table"><thead><tr><th id="course-name-header">Course Name</th><th>Speaker</th><th>Rating</th><th>Price</th><th>Actions</th></tr></thead><tbody>`;
        coursesData.forEach((course, idx) => {
            // Always use the actual course title from the backend
            let courseName = course.title;
            let actionsHtml = `<a href='#' class='action-icon edit' data-idx='${idx}' data-type='course'><i class='fas fa-edit'></i> Edit</a>
                <a href='#' class='action-icon delete' data-idx='${idx}' data-type='course'><i class='fas fa-trash'></i> Delete</a>`;
            if (course.image) {
                // Show image if present
                actionsHtml += `<img src='${course.image}' alt='Course Image' style='max-width:60px;max-height:40px;display:block;margin:4px auto 0 auto;border-radius:4px;border:1px solid #ccc;' />`;
            } else {
                // Show upload button if no image
                actionsHtml += `<a href='#' class='action-icon upload-image' data-idx='${idx}' data-type='course'><i class='fas fa-upload'></i> Upload Image</a>
                <input type='file' accept='image/*' style='display:none' class='upload-image-input' data-idx='${idx}' />`;
            }
            html += `<tr><td>${courseName}</td><td>${course.speaker}</td><td>${course.rating}</td><td><span class='price-tag success'>${course.price}</span></td><td class='actions'>${actionsHtml}</td></tr>`;
        });
        html += '</tbody></table>';
        tableContainer.innerHTML = html;
        setTimeout(() => {
            // Upload image button logic
            document.querySelectorAll('.action-icon.upload-image[data-type="course"]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    const idx = this.getAttribute('data-idx');
                    const input = document.querySelector(`.upload-image-input[data-idx='${idx}']`);
                    if (input) input.click();
                });
            });
            document.querySelectorAll('.upload-image-input').forEach(input => {
                input.addEventListener('change', async function (e) {
                    const idx = this.getAttribute('data-idx');
                    const course = coursesData[idx];
                    const file = this.files[0];
                    try {
                        if (!file) throw new Error('No image selected.');
                        const courseId = course && (course.id || course._id);
                        if (!courseId) throw new Error('No course_id provided.');
                        // Debug log
                        console.log('Uploading image for course_id:', courseId, 'file:', file);
                        await uploadCourseImage(courseId, file);
                        alert('Image uploaded!');
                        await renderCoursesTable();
                    } catch (err) {
                        alert(err.message || 'Image upload failed.');
                    }
                });
            });
            document.querySelectorAll('.action-icon.edit[data-type="course"]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    openEditCourseModal(this.getAttribute('data-idx'));
                });
            });
            document.querySelectorAll('.action-icon.delete[data-type="course"]').forEach(el => {
                el.addEventListener('click', async function (e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this course?')) {
                        const idx = this.getAttribute('data-idx');
                        const course = coursesData[idx];
                        await deleteCourse(course.id || course._id || idx); // Use id or fallback
                        await renderCoursesTable();
                    }
                });
            });
        }, 0);
    }

    async function renderAdminsTable() {
        mainTitle.textContent = 'Admins Management';
        if (createCourseBtn) createCourseBtn.style.display = 'none';
        if (createAdminBtn) createAdminBtn.style.display = '';
        adminsData = await fetchAdmins();
        let html = `<table class="courses-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead><tbody>`;
        adminsData.forEach((admin, idx) => {
            html += `<tr><td>${admin.name}</td><td>${admin.email}</td><td>${admin.role}</td><td class='actions'><a href='#' class='action-icon edit' data-idx='${idx}' data-type='admin'><i class='fas fa-edit'></i> Edit</a> <a href='#' class='action-icon delete' data-idx='${idx}' data-type='admin'><i class='fas fa-trash'></i> Delete</a></td></tr>`;
        });
        html += '</tbody></table>';
        tableContainer.innerHTML = html;
        setTimeout(() => {
            document.querySelectorAll('.action-icon.edit[data-type="admin"]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    openEditAdminModal(this.getAttribute('data-idx'));
                });
            });
            document.querySelectorAll('.action-icon.delete[data-type="admin"]').forEach(el => {
                el.addEventListener('click', async function (e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this admin?')) {
                        const idx = this.getAttribute('data-idx');
                        const admin = adminsData[idx];
                        await deleteAdmin(admin.id || admin._id || idx);
                        await renderAdminsTable();
                    }
                });
            });
        }, 0);
    }

    async function renderUsersTable() {
        mainTitle.textContent = 'Users Management';
        if (createCourseBtn) createCourseBtn.style.display = 'none';
        if (createAdminBtn) createAdminBtn.style.display = 'none';
        usersData = await fetchUsers();
        let html = `<table class="courses-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></thead><tbody>`;
        usersData.forEach((user, idx) => {
            html += `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.role}</td><td class="actions"><a href='#' class='action-icon delete' data-idx='${idx}'><i class='fas fa-trash'></i> Delete</a></td></tr>`;
        });
        html += '</tbody></table>';
        tableContainer.innerHTML = html;
        setTimeout(() => {
            document.querySelectorAll('.action-icon.delete[data-idx]').forEach(el => {
                el.addEventListener('click', async function (e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this user?')) {
                        const idx = this.getAttribute('data-idx');
                        const user = usersData[idx];
                        await deleteUser(user.id || user._id || idx);
                        await renderUsersTable();
                    }
                });
            });
        }, 0);
    }

    // Tab switching
    if (tabCourses) tabCourses.addEventListener('click', function () {
        tabCourses.classList.add('active');
        tabAdmins.classList.remove('active');
        tabUsers.classList.remove('active');
        renderCoursesTable();
    });
    if (tabAdmins) tabAdmins.addEventListener('click', function () {
        tabCourses.classList.remove('active');
        tabAdmins.classList.add('active');
        tabUsers.classList.remove('active');
        renderAdminsTable();
    });
    if (tabUsers) tabUsers.addEventListener('click', function () {
        tabCourses.classList.remove('active');
        tabAdmins.classList.remove('active');
        tabUsers.classList.add('active');
        renderUsersTable();
    });

    // Initial render
    renderCoursesTable();
});