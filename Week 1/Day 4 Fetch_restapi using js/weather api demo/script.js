const API_KEY = "cbb9762e6fc24258b5982023252810"; 
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const statusEl = document.querySelector("#status");
const resultsSection = document.querySelector("#results");
const currentContainer = document.querySelector("#current");
const forecastContainer = document.querySelector("#forecast");

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const query = searchInput.value.trim();

	if (!query) {
		showStatus("Please enter a location to continue.", "error");
		return;
	}

	await loadWeather(query);
});

async function loadWeather(query) {
	setLoading(true);
	showStatus(`Looking up weather for ${query}...`, "loading");

	try {
		const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&days=3&aqi=no&alerts=no`;
		const response = await fetch(url);

		if (!response.ok) {
			const errorPayload = await response.json().catch(() => ({}));
			const message = errorPayload?.error?.message || `Request failed with status ${response.status}.`;
			throw new Error(message);
		}

		const data = await response.json();
		renderWeather(data);
		showStatus(`Showing weather for ${data.location.name}, ${data.location.country}.`, "success");
	} catch (error) {
		console.error(error);
		resultsSection.classList.add("hidden");
		showStatus(error.message || "Unable to fetch weather data right now.", "error");
	} finally {
		setLoading(false);
	}
}

function renderWeather(data) {
	const { location, current, forecast } = data;

	const iconUrl = current.condition.icon.startsWith("//")
		? `https:${current.condition.icon}`
		: current.condition.icon;

	const localTime = new Date(location.localtime.replace(/-/g, "/"));

	currentContainer.innerHTML = `
		<header class="current__header">
			<div>
				<p class="current__location">${location.name}, ${location.region || location.country}</p>
				<p class="current__time">Local time: ${formatDate(localTime)} ${formatTime(localTime)}</p>
			</div>
			<img src="${iconUrl}" alt="${current.condition.text}">
		</header>
		<div class="current__metrics">
			<p class="current__temp">${Math.round(current.temp_c)}°C</p>
			<p class="current__condition">${current.condition.text}</p>
		</div>
		<dl class="current__details">
			<div>
				<dt>Feels like</dt>
				<dd>${Math.round(current.feelslike_c)}°C</dd>
			</div>
			<div>
				<dt>Humidity</dt>
				<dd>${current.humidity}%</dd>
			</div>
			<div>
				<dt>Wind</dt>
				<dd>${current.wind_kph} kph ${current.wind_dir}</dd>
			</div>
			<div>
				<dt>Pressure</dt>
				<dd>${current.pressure_mb} mb</dd>
			</div>
			<div>
				<dt>Visibility</dt>
				<dd>${current.vis_km} km</dd>
			</div>
			<div>
				<dt>UV Index</dt>
				<dd>${current.uv}</dd>
			</div>
		</dl>
	`;

	const forecastMarkup = (forecast?.forecastday || [])
		.map((day) => createForecastCard(day))
		.join("");

	forecastContainer.innerHTML = forecastMarkup;
	resultsSection.classList.remove("hidden");
}

function createForecastCard(day) {
	const date = new Date(day.date.replace(/-/g, "/"));
	const iconUrl = day.day.condition.icon.startsWith("//")
		? `https:${day.day.condition.icon}`
		: day.day.condition.icon;

	return `
		<article class="forecast__day">
			<p class="forecast__date">${formatDate(date)}</p>
			<img src="${iconUrl}" alt="${day.day.condition.text}">
			<p class="forecast__condition">${day.day.condition.text}</p>
			<p class="forecast__temps">${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°C</p>
			<dl class="forecast__details">
				<div>
					<dt>Humidity</dt>
					<dd>${day.day.avghumidity}%</dd>
				</div>
				<div>
					<dt>Rain chance</dt>
					<dd>${day.day.daily_chance_of_rain}%</dd>
				</div>
				<div>
					<dt>Max wind</dt>
					<dd>${day.day.maxwind_kph} kph</dd>
				</div>
			</dl>
		</article>
	`;
}

function showStatus(message, type) {
	statusEl.textContent = message;
	statusEl.className = `status status--${type}`;
}

function setLoading(isLoading) {
	if (isLoading) {
		searchButton.disabled = true;
		searchButton.textContent = "Loading...";
	} else {
		searchButton.disabled = false;
		searchButton.textContent = "Get Weather";
	}
}

function formatDate(date) {
	return date.toLocaleDateString(undefined, {
		weekday: "short",
		month: "short",
		day: "numeric",
	});
}

function formatTime(date) {
	return date.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	});
}

// Initial load gives users a working example to explore
loadWeather("London").catch(() => {
	// Silent fallback on first load; user can trigger new searches.
});
