// Basic REST client for comments: fetch, post, put, delete, and minimal UI wiring.

const apiUrl = 'https://jsonplaceholder.typicode.com/comments';

// POST data to this API endpoint
async function postComment(comment) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const newComment = await response.json();
        displayComments([newComment]);
        return newComment;
    } catch (error) {
        console.error('Error posting comment:', error);
        return null;
    }
}

// PUT data to this API endpoint
async function putComment(comment) {
    try {
        const response = await fetch(`${apiUrl}/${comment.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const updatedComment = await response.json();
        displayComments([updatedComment]);
        return updatedComment;
    } catch (error) {
        console.error('Error updating comment:', error);
        return null;
    }
}

// DELETE data from this API endpoint
async function deleteComment(commentId) {
    try {
        const response = await fetch(`${apiUrl}/${commentId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Network response was not ok');
        const commentDiv = document.getElementById(`comment-${commentId}`);
        if (commentDiv) commentDiv.remove();
        return true;
    } catch (error) {
        console.error('Error deleting comment:', error);
        return false;
    }
}

// Fetch comments
async function fetchComments() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

// Display or update comments in the DOM
function displayComments(comments) {
    const container = ensureContainer();
    comments.forEach(comment => renderOrUpdateComment(container, comment));
}

// Helpers

function ensureContainer() {
    let container = document.getElementById('comments-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'comments-container';
        document.body.appendChild(container);
    }
    return container;
}

function ensureForm() {
    let form = document.getElementById('comment-form');
    if (!form) {
        form = document.createElement('form');
        form.id = 'comment-form';
        form.innerHTML = `
            <input type="hidden" id="comment-id" />
            <label>
                Name
                <input id="comment-name" required />
            </label>
            <label>
                Email
                <input id="comment-email" type="email" required />
            </label>
            <label>
                Comment
                <textarea id="comment-body" required></textarea>
            </label>
            <button id="submit-button" type="submit">Add</button>
        `;
        document.body.prepend(form);
    }
    return form;
}

function renderOrUpdateComment(container, comment) {
    const safeId = comment.id ?? `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    let el = document.getElementById(`comment-${safeId}`);

    if (!el) {
        el = document.createElement('div');
        el.className = 'comment';
        el.id = `comment-${safeId}`;
        el.innerHTML = `
            <h3 class="comment-name"></h3>
            <p class="comment-body"></p>
            <div class="comment-actions">
                <button type="button" class="btn-edit">Edit</button>
                <button type="button" class="btn-delete">Delete</button>
            </div>
        `;
        container.appendChild(el);
    }

    el.dataset.postId = comment.postId || '';
    el.dataset.email = comment.email || '';
    el.dataset.id = comment.id || '';

    const nameEl = el.querySelector('.comment-name');
    const bodyEl = el.querySelector('.comment-body');
    nameEl.textContent = comment.name ?? '';
    bodyEl.textContent = comment.body ?? '';

    if (comment.id && el.id !== `comment-${comment.id}`) {
        el.id = `comment-${comment.id}`;
    }
}

function setupEvents() {
    // Form submit -> POST or PUT
    const form = ensureForm();
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('comment-id').value.trim();
        const name = document.getElementById('comment-name').value.trim();
        const email = document.getElementById('comment-email').value.trim();
        const body = document.getElementById('comment-body').value.trim();

        if (!name || !email || !body) return;

        const payload = { id: id ? Number(id) : undefined, name, email, body, postId: 1 };

        if (id) {
            await putComment(payload);
        } else {
            await postComment(payload);
        }

        form.reset();
        document.getElementById('comment-id').value = '';
        document.getElementById('submit-button').textContent = 'Add';
    });

    // Edit/Delete via event delegation
    const container = ensureContainer();
    container.addEventListener('click', async (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const commentEl = e.target.closest('.comment');
        if (!commentEl) return;

        const idAttr = commentEl.id.replace('comment-', '');
        const id = Number(idAttr);
        if (Number.isNaN(id)) return;

        if (btn.classList.contains('btn-delete')) {
            await deleteComment(id);
        } else if (btn.classList.contains('btn-edit')) {
            // Fill the form for editing
            document.getElementById('comment-id').value = String(id);
            document.getElementById('comment-name').value = commentEl.querySelector('.comment-name').textContent || '';
            document.getElementById('comment-email').value = commentEl.dataset.email || '';
            document.getElementById('comment-body').value = commentEl.querySelector('.comment-body').textContent || '';
            document.getElementById('submit-button').textContent = 'Update';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Ensure UI and wire events, then fetch comments
ensureContainer();
ensureForm();
setupEvents();
fetchComments();