const state = {
    users: [
        {
            username: "ananya",
            password: "spring123",
            name: "Ananya Verma",
            grade: "VIII A",
            roll: "23",
            house: "Bluebells",
            clubs: "STEM Club, Music Ensemble",
        },
    ],
    currentUser: null,
    monthlyActivities: [
        {
            id: 1,
            subject: "Mathematics",
            activity: "Create project file detailing tables between 12 to 19.",
            month: "October 2025",
            dueDate: "2025-10-12",
        },
        {
            id: 2,
            subject: "Science",
            activity: "Prepare a presentation on renewable energy sources.",
            month: "October 2025",
            dueDate: "2025-10-18",
        },
        {
            id: 3,
            subject: "English",
            activity: "Submit a book review of your favourite adventure novel.",
            month: "October 2025",
            dueDate: "2025-10-20",
        },
        {
            id: 4,
            subject: "Computer Science",
            activity: "Design a scratch project that teaches basic geometry.",
            month: "November 2025",
            dueDate: "2025-11-05",
        },
        {
            id: 5,
            subject: "Art",
            activity: "Create a mood board inspired by Diwali celebrations.",
            month: "November 2025",
            dueDate: "2025-11-15",
        },
    ],
};

const body = document.body;
const authSection = document.querySelector("#auth");
const dashboardSection = document.querySelector("#dashboard");
const monthlySection = document.querySelector("#monthly");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const loginFeedback = document.querySelector("#loginFeedback");
const registerFeedback = document.querySelector("#registerFeedback");
const profileButton = document.querySelector("#profileBtn");
const timetableButton = document.querySelector("#timetableBtn");
const monthlyButton = document.querySelector("#monthlyBtn");
const logoutButton = document.querySelector("#logoutBtn");
const profileCard = document.querySelector("#profile");
const timetableCard = document.querySelector("#timetable");
const studentName = document.querySelector("#studentName");
const profileName = document.querySelector("#profileName");
const profileGrade = document.querySelector("#profileGrade");
const profileRoll = document.querySelector("#profileRoll");
const profileHouse = document.querySelector("#profileHouse");
const profileClubs = document.querySelector("#profileClubs");
const subjectSelect = document.querySelector("#subjectSelect");
const activityList = document.querySelector("#activityList");
const emptyState = document.querySelector("#emptyState");

const resetAlert = (element) => {
    element?.classList.add("d-none");
    element?.classList.remove("alert", "alert-success", "alert-danger");
    if (element) {
        element.textContent = "";
    }
};

const togglePanel = (card, trigger, { shownLabel, hiddenLabel }) => {
    const isVisible = card.classList.toggle("active");
    trigger.textContent = isVisible ? shownLabel : hiddenLabel;
    trigger.setAttribute("aria-expanded", String(isVisible));
    card.setAttribute("aria-hidden", String(!isVisible));

    if (isVisible) {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};

const closePanel = (card, trigger, defaultLabel) => {
    card.classList.remove("active");
    card.setAttribute("aria-hidden", "true");
    trigger.textContent = defaultLabel;
    trigger.setAttribute("aria-expanded", "false");
};

const updateProfile = (user) => {
    profileName.textContent = user.name;
    profileGrade.textContent = user.grade;
    profileRoll.textContent = user.roll ?? "—";
    profileHouse.textContent = user.house ?? "—";
    profileClubs.textContent = user.clubs?.trim() || "Add your interests from the profile card.";
    studentName.textContent = user.name.split(" ")[0] || user.name;
};

const renderActivities = (subject) => {
    const filtered = subject === "all"
        ? state.monthlyActivities
        : state.monthlyActivities.filter((item) => item.subject === subject);

    activityList.innerHTML = "";

    if (filtered.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    filtered.forEach((item) => {
        const card = document.createElement("div");
        card.className = "activity-card";
        card.setAttribute("role", "listitem");
        card.innerHTML = `
            <span>${item.subject}</span>
            <h3 class="h5">${item.activity}</h3>
            <p class="mb-0">${item.month}</p>
            <time datetime="${item.dueDate}">Due by ${new Date(item.dueDate).toLocaleDateString()}</time>
        `;
        activityList.appendChild(card);
    });
};

const populateSubjects = () => {
    const uniqueSubjects = Array.from(new Set(state.monthlyActivities.map((item) => item.subject)));
    uniqueSubjects.sort().forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
};

const resetDashboardPanels = () => {
    closePanel(profileCard, profileButton, "View Student Profile");
    closePanel(timetableCard, timetableButton, "Time Table");
};

const showDashboard = (user) => {
    state.currentUser = user;
    body.classList.add("is-authenticated");
    authSection.hidden = true;
    authSection.setAttribute("aria-hidden", "true");
    dashboardSection.hidden = false;
    dashboardSection.setAttribute("aria-hidden", "false");
    monthlySection.hidden = true;
    monthlySection.setAttribute("aria-hidden", "true");
    monthlyButton.textContent = "Monthly Chart";
    monthlyButton.setAttribute("aria-expanded", "false");
    updateProfile(user);
    resetDashboardPanels();
    renderActivities(subjectSelect.value || "all");
};

const logout = () => {
    state.currentUser = null;
    body.classList.remove("is-authenticated");
    authSection.hidden = false;
    authSection.setAttribute("aria-hidden", "false");
    dashboardSection.hidden = true;
    dashboardSection.setAttribute("aria-hidden", "true");
    monthlySection.hidden = true;
    monthlySection.setAttribute("aria-hidden", "true");
    monthlyButton.textContent = "Monthly Chart";
    monthlyButton.setAttribute("aria-expanded", "false");
    subjectSelect.value = "all";
    renderActivities("all");
    resetAlert(loginFeedback);
    resetAlert(registerFeedback);
    loginForm.reset();
    registerForm.reset();
    loginForm.classList.remove("was-validated");
    registerForm.classList.remove("was-validated");
};

loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    loginForm.classList.add("was-validated");

    if (!loginForm.checkValidity()) {
        return;
    }

    const username = loginForm.loginUsername.value.trim().toLowerCase();
    const password = loginForm.loginPassword.value.trim();

    const user = state.users.find(
        (entry) => entry.username.toLowerCase() === username && entry.password === password,
    );

    if (!user) {
        loginFeedback.textContent = "Invalid credentials. Please try again or register below.";
        loginFeedback.classList.remove("d-none");
        loginFeedback.classList.add("alert", "alert-danger");
        return;
    }

    resetAlert(loginFeedback);
    showDashboard(user);
});

registerForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    registerForm.classList.add("was-validated");

    if (!registerForm.checkValidity()) {
        resetAlert(registerFeedback);
        return;
    }

    const name = registerForm.registerName.value.trim();
    const username = registerForm.registerUsername.value.trim().toLowerCase();
    const password = registerForm.registerPassword.value.trim();
    const grade = registerForm.registerGrade.value.trim();
    const roll = registerForm.registerRoll.value.trim();
    const house = registerForm.registerHouse.value.trim();
    const clubs = registerForm.registerClubs.value.trim();

    const usernameTaken = state.users.some((entry) => entry.username.toLowerCase() === username);

    if (usernameTaken) {
        registerFeedback.textContent = "That username is already taken. Try a different one.";
        registerFeedback.classList.remove("d-none");
        registerFeedback.classList.remove("alert-success");
        registerFeedback.classList.add("alert", "alert-danger");
        return;
    }

    const newUser = { username, password, name, grade, roll, house, clubs };
    state.users.push(newUser);

    registerFeedback.textContent = "Registration successful! You can log in with your new account.";
    registerFeedback.classList.remove("d-none", "alert-danger");
    registerFeedback.classList.add("alert", "alert-success");

    loginForm.loginUsername.value = username;
    loginForm.loginPassword.value = password;

    registerForm.reset();
    registerForm.classList.remove("was-validated");
});

profileButton?.addEventListener("click", () => {
    togglePanel(profileCard, profileButton, {
        shownLabel: "Hide Student Profile",
        hiddenLabel: "View Student Profile",
    });
});

timetableButton?.addEventListener("click", () => {
    togglePanel(timetableCard, timetableButton, {
        shownLabel: "Hide Time Table",
        hiddenLabel: "Time Table",
    });
});

monthlyButton?.addEventListener("click", () => {
    const isHidden = monthlySection.hasAttribute("hidden");
    if (isHidden) {
        monthlySection.removeAttribute("hidden");
        monthlySection.setAttribute("aria-hidden", "false");
        monthlyButton.textContent = "Hide Monthly Chart";
        monthlyButton.setAttribute("aria-expanded", "true");
        monthlySection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        monthlySection.setAttribute("hidden", "");
        monthlySection.setAttribute("aria-hidden", "true");
        monthlyButton.textContent = "Monthly Chart";
        monthlyButton.setAttribute("aria-expanded", "false");
    }
});

logoutButton?.addEventListener("click", () => {
    if (!state.currentUser) {
        return;
    }
    logout();
});

subjectSelect?.addEventListener("change", (event) => {
    renderActivities(event.target.value);
});

loginForm?.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => resetAlert(loginFeedback));
});

populateSubjects();
renderActivities("all");
