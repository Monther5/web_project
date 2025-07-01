
document.addEventListener('DOMContentLoaded', () => {
    const createCourseBtn = document.getElementById('createCourseBtn');
    const modal = document.getElementById('createCourseModal');
    const closeModal = document.querySelector('.modal .close');

    if (createCourseBtn) {
        createCourseBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
