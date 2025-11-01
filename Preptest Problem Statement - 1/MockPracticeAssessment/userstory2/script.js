// Cache the bits of UI we poke at frequently
const eventsContainer = document.querySelector('#eventsContainer');
const categorySelect = document.querySelector('#categoryFilter');
const dateInput = document.querySelector('#dateFilter');
const resetButton = document.querySelector('#resetFilters');
const liveButton = document.querySelector('#simulateLiveBtn');
const messageBox = document.querySelector('#message');

const state = {
    events: [],
    filtered: []
};

const statusClassMap = {
    UPCOMING: 'status-upcoming',
    LIVE: 'status-live',
    COMPLETE: 'status-complete'
};

// Load mock data once the page starts
const fetchEvents = async () => {
    try {
        const response = await fetch('mock-events.json');
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const { events = [] } = data;
        state.events = events;
        populateCategoryFilter(events);
        applyFilters();
        showMessage('Loaded events successfully.', 'text-success');
    } catch (error) {
        console.error(error);
        showMessage('Unable to load events. Please try again later.', 'text-danger');
    }
};

// Add unique categories into the dropdown
const populateCategoryFilter = (eventList) => {
    const categories = new Set(eventList.map(({ category }) => category));
    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.append(option);
    });
};

const renderEvents = (eventList) => {
    if (!eventsContainer) return;
    eventsContainer.innerHTML = '';
    if (eventList.length === 0) {
        eventsContainer.innerHTML = '<div class="col-12 text-center text-muted">No events found for the selected filters.</div>';
        return;
    }

    const fragment = document.createDocumentFragment();
    eventList.forEach((eventItem) => {
        const { id, title, category, date, venue, status, description } = eventItem;
        const column = document.createElement('article');
        column.className = 'col-md-4 mb-4';
        column.innerHTML = `
            <div class="event-card h-100 p-3 bg-white border rounded-3 shadow-sm" data-id="${id}">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="mb-0">${title}</h5>
                    <span class="status-pill ${statusClassMap[status] || 'status-upcoming'}">${status.toLowerCase()}</span>
                </div>
                <p class="text-muted small mb-1">${category} &bull; ${new Date(date).toLocaleDateString()}</p>
                <p class="mb-2">${description}</p>
                <p class="fw-semibold mb-0">Venue: ${venue}</p>
            </div>
        `;
        fragment.append(column);
    });
    eventsContainer.append(fragment);
};

const applyFilters = () => {
    const selectedCategory = categorySelect.value;
    const selectedDate = dateInput.value ? new Date(dateInput.value) : null;

    let filtered = [...state.events];

    if (selectedCategory !== 'all') {
        filtered = filtered.filter(({ category }) => category === selectedCategory);
    }

    if (selectedDate) {
        filtered = filtered.filter(({ date }) => new Date(date) >= selectedDate);
    }

    state.filtered = filtered;
    renderEvents(filtered);
};

const resetFilters = () => {
    categorySelect.value = 'all';
    dateInput.value = '';
    applyFilters();
};

// Pretend an event pushed in from the server while the user watches
const simulateLiveUpdate = () => {
    const sampleEvent = {
        id: `live-${Date.now()}`,
        title: 'Instant Networking Session',
        category: 'Networking',
        date: new Date().toISOString(),
        venue: 'Virtual Stage',
        status: 'LIVE',
        description: 'Meet partners and sponsors in a quick 20 minute round-table.'
    };

    state.events = [sampleEvent, ...state.events];
    applyFilters();
    showMessage('Live update added a new networking session.', 'text-primary');
};

const showMessage = (text, className) => {
    messageBox.textContent = text;
    messageBox.className = `${className || ''}`;
};

// Wire all UI actions together
categorySelect.addEventListener('change', applyFilters);

dateInput.addEventListener('input', () => {
    window.requestAnimationFrame(applyFilters);
});

resetButton.addEventListener('click', resetFilters);

liveButton.addEventListener('click', simulateLiveUpdate);

fetchEvents();
