// --- Edit Course Modal Logic ---
const editCourseModal = document.getElementById('edit-course-modal');
const closeEditCourseModal = document.getElementById('close-edit-course-modal');
const cancelEditCourseBtn = document.getElementById('cancel-edit-course-btn');
const editCourseForm = document.getElementById('edit-course-form');
let editingCourseIndex = null;

function openEditCourseModal(index) {
    const course = coursesData[index];
    document.getElementById('edit-course-name').value = course.name;
    document.getElementById('edit-course-speaker').value = course.speaker;
    document.getElementById('edit-course-rating').value = course.rating;
    document.getElementById('edit-course-price').value = parseFloat(course.price);
    // image not handled for edit
    editingCourseIndex = index;
    editCourseModal.classList.add('show');
}
if (closeEditCourseModal) closeEditCourseModal.addEventListener('click', () => { editCourseModal.classList.remove('show'); });
if (cancelEditCourseBtn) cancelEditCourseBtn.addEventListener('click', () => { editCourseModal.classList.remove('show'); });
if (editCourseForm) editCourseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (editingCourseIndex !== null) {
        coursesData[editingCourseIndex].name = document.getElementById('edit-course-name').value;
        coursesData[editingCourseIndex].speaker = document.getElementById('edit-course-speaker').value;
        coursesData[editingCourseIndex].rating = document.getElementById('edit-course-rating').value;
        coursesData[editingCourseIndex].price = document.getElementById('edit-course-price').value + '$';
        renderCoursesTable();
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
const coursesData = [
    { name: 'Introduction to JavaScript', speaker: 'Monther', rating: '4.2', price: '100$' },
    { name: 'Advanced React Patterns', speaker: 'Ali', rating: '89', price: '40$' },
    { name: 'Database Design Fundamentals', speaker: 'Alla', rating: '67', price: '200$' },
];
const adminsData = [
    { name: 'Admin One', email: 'admin1@example.com', role: 'Super Admin' },
    { name: 'Admin Two', email: 'admin2@example.com', role: 'Moderator' },
];
const usersData = [
    { name: 'User One', email: 'user1@example.com', role: 'Student' },
    { name: 'User Two', email: 'user2@example.com', role: 'Student' },
];

document.addEventListener('DOMContentLoaded', () => {
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

    function renderCoursesTable() {
        mainTitle.textContent = 'Courses Management';
        if (createCourseBtn) createCourseBtn.style.display = '';
        if (createAdminBtn) createAdminBtn.style.display = 'none';
        let html = `<table class="courses-table"><thead><tr><th>Course Name</th><th>Speaker</th><th>Rating</th><th>Price</th><th>Actions</th></tr></thead><tbody>`;
        coursesData.forEach((course, idx) => {
            html += `<tr><td>${course.name}</td><td>${course.speaker}</td><td>${course.rating}</td><td><span class='price-tag success'>${course.price}</span></td><td class='actions'><a href='#' class='action-icon edit' data-idx='${idx}' data-type='course'><i class='fas fa-edit'></i> Edit</a> <a href='#' class='action-icon delete' data-idx='${idx}' data-type='course'><i class='fas fa-trash'></i> Delete</a></td></tr>`;
        });
        html += '</tbody></table>';
        tableContainer.innerHTML = html;
        // Add edit event listeners (DEFERRED to DOMContentLoaded)
        setTimeout(() => {
            document.querySelectorAll('.action-icon.edit[data-type="course"]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    openEditCourseModal(this.getAttribute('data-idx'));
                });
            });
            document.querySelectorAll('.action-icon.delete[data-type="course"]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this course?')) {
                        const idx = this.getAttribute('data-idx');
                        coursesData.splice(idx, 1);
                        renderCoursesTable();
                    }
                });
            });
        }, 0);
    }

    function renderAdminsTable() {
        mainTitle.textContent = 'Admins Management';
        if (createCourseBtn) createCourseBtn.style.display = 'none';
        if (createAdminBtn) createAdminBtn.style.display = '';
        let html = `<table class="courses-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead><tbody>`;
        adminsData.forEach((admin, idx) => {
            html += `<tr><td>${admin.name}</td><td>${admin.email}</td><td>${admin.role}</td><td class='actions'><a href='#' class='action-icon edit' data-idx='${idx}' data-type='admin'><i class='fas fa-edit'></i> Edit</a> <a href='#' class='action-icon delete' data-idx='${idx}' data-type='admin'><i class='fas fa-trash'></i> Delete</a></td></tr>`;
        });
        html += '</tbody></table>';
        tableContainer.innerHTML = html;
        // Add edit event listeners (DEFERRED to DOMContentLoaded)
        setTimeout(() => {
            document.querySelectorAll('.action-icon.edit[data-type="admin"]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    openEditAdminModal(this.getAttribute('data-idx'));
                });
            });
            document.querySelectorAll('.action-icon.delete[data-type="admin"]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this admin?')) {
                        const idx = this.getAttribute('data-idx');
                        adminsData.splice(idx, 1);
                        renderAdminsTable();
                    }
                });
            });
        }, 0);
    }

    function renderUsersTable() {
        mainTitle.textContent = 'Users Management';
        if (createCourseBtn) createCourseBtn.style.display = 'none';
        if (createAdminBtn) createAdminBtn.style.display = 'none';
        let html = `<table class="courses-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></thead><tbody>`;
        usersData.forEach((user, idx) => {
            html += `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.role}</td><td class="actions"><a href='#' class='action-icon delete' data-idx='${idx}'><i class='fas fa-trash'></i> Delete</a></td></tr>`;
        });
        html += '</tbody></table>';
        tableContainer.innerHTML = html;
        // Add delete event listeners for users with confirmation
        setTimeout(() => {
            document.querySelectorAll('.action-icon.delete[data-idx]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this user?')) {
                        const idx = this.getAttribute('data-idx');
                        usersData.splice(idx, 1);
                        renderUsersTable();
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