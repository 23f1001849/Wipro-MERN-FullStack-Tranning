const API_KEY = "zpka_1e173db8ed9a4aed9150a44b5c833bc6_60c613de"; // Replace with your AccuWeather API key
const LOCATION_SEARCH_URL = "https://dataservice.accuweather.com/locations/v1/cities/search";
const CURRENT_CONDITIONS_URL = (locationKey) => `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
const DAILY_FORECAST_URL = (locationKey) => `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;

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
		assertApiKey();

		const location = await resolveLocation(query);
		const [current, forecast] = await Promise.all([
			fetchCurrentConditions(location.key),
			fetchDailyForecast(location.key),
		]);

		renderWeather({ location, current, forecast });
		showStatus(`Showing weather for ${location.displayName}.`, "success");
	} catch (error) {
		console.error(error);
		resultsSection.classList.add("hidden");
		showStatus(error.message || "Unable to fetch weather data right now.", "error");
	} finally {
		setLoading(false);
	}
}

async function resolveLocation(query) {
	const params = {
		q: query,
		language: "en-us",
	};

	const locations = await request(LOCATION_SEARCH_URL, params);

	if (!Array.isArray(locations) || locations.length === 0) {
		throw new Error("No matching locations were found. Try a different search.");
	}

	const topMatch = locations[0];

	return {
		key: topMatch.Key,
		displayName: `${topMatch.LocalizedName}, ${topMatch.AdministrativeArea?.LocalizedName || topMatch.Country?.LocalizedName || ""}`.replace(/,\s*$/, ""),
		region: topMatch.AdministrativeArea?.LocalizedName,
		country: topMatch.Country?.LocalizedName,
		timezone: topMatch.TimeZone?.Name,
		localizedName: topMatch.LocalizedName,
	};
}


async function fetchCurrentConditions(locationKey) {
	const params = {
		details: "true",
	};

	const payload = await request(CURRENT_CONDITIONS_URL(locationKey), params);

	if (!Array.isArray(payload) || payload.length === 0) {
		throw new Error("Current conditions are unavailable for this location.");
	}

	return payload[0];
}

async function fetchDailyForecast(locationKey) {
	const params = {
		metric: "true",
		details: "true",
	};

	return request(DAILY_FORECAST_URL(locationKey), params);
}

function renderWeather({ location, current, forecast }) {
	const observationTime = current.LocalObservationDateTime ? new Date(current.LocalObservationDateTime) : null;
	const iconUrl = getIconUrl(current.WeatherIcon);
	const temperature = current.Temperature?.Metric?.Value;
	const feelsLike = current.RealFeelTemperature?.Metric?.Value;
	const humidity = current.RelativeHumidity;
	const windSpeed = current.Wind?.Speed?.Metric?.Value;
	const windUnit = current.Wind?.Speed?.Metric?.Unit || "kph";
	const windDir = current.Wind?.Direction?.Localized || "";
	const pressure = current.Pressure?.Metric?.Value;
	const pressureUnit = current.Pressure?.Metric?.Unit || "mb";
	const visibility = current.Visibility?.Metric?.Value;
	const visibilityUnit = current.Visibility?.Metric?.Unit || "km";
	const uvIndex = current.UVIndex;

	currentContainer.innerHTML = `
		<header class="current__header">
			<div>
				<p class="current__location">${location.displayName}</p>
				<p class="current__time">${formatObservationTime(observationTime, location.timezone)}</p>
			</div>
			<img src="${iconUrl}" alt="${current.WeatherText}">
		</header>
		<div class="current__metrics">
			<p class="current__temp">${formatTemperature(temperature)}</p>
			<p class="current__condition">${current.WeatherText}</p>
		</div>
		<dl class="current__details">
			<div>
				<dt>Feels like</dt>
				<dd>${formatTemperature(feelsLike)}</dd>
			</div>
			<div>
				<dt>Humidity</dt>
				<dd>${formatNumber(humidity, "%")}</dd>
			</div>
			<div>
				<dt>Wind</dt>
				<dd>${formatWind(windSpeed, windUnit, windDir)}</dd>
			</div>
			<div>
				<dt>Pressure</dt>
				<dd>${formatNumber(pressure, ` ${pressureUnit}`)}</dd>
			</div>
			<div>
				<dt>Visibility</dt>
				<dd>${formatNumber(visibility, ` ${visibilityUnit}`)}</dd>
			</div>
			<div>
				<dt>UV Index</dt>
				<dd>${formatNumber(uvIndex)}</dd>
			</div>
		</dl>
	`;

	const dailyForecasts = forecast?.DailyForecasts?.slice(0, 3) || [];
	const forecastMarkup = dailyForecasts.map((day) => createForecastCard(day)).join("");
	forecastContainer.innerHTML = forecastMarkup || `<p>No forecast data available.</p>`;
	resultsSection.classList.remove("hidden");
}

function createForecastCard(day) {
	const date = day.Date ? new Date(day.Date) : null;
	const iconUrl = getIconUrl(day.Day?.Icon);
	const maxTemp = day.Temperature?.Maximum?.Value;
	const minTemp = day.Temperature?.Minimum?.Value;
	const humidityEntry = day.AirAndPollen?.find((item) => item.Name === "RelativeHumidity");
	const rainChance = day.Day?.PrecipitationProbability;
	const windSpeed = day.Day?.Wind?.Speed?.Value;
	const windUnit = day.Day?.Wind?.Speed?.Unit || "kph";
	const windDir = day.Day?.Wind?.Direction?.Localized || "";

	return `
		<article class="forecast__day">
			<p class="forecast__date">${formatDate(date)}</p>
			<img src="${iconUrl}" alt="${day.Day?.IconPhrase || "Forecast icon"}">
			<p class="forecast__condition">${day.Day?.IconPhrase || ""}</p>
			<p class="forecast__temps">${formatTemperature(maxTemp)} / ${formatTemperature(minTemp)}</p>
			<dl class="forecast__details">
				<div>
					<dt>Humidity</dt>
					<dd>${formatNumber(humidityEntry?.Value, "%")}</dd>
				</div>
				<div>
					<dt>Rain chance</dt>
					<dd>${formatNumber(rainChance, "%")}</dd>
				</div>
				<div>
					<dt>Wind</dt>
					<dd>${formatWind(windSpeed, windUnit, windDir)}</dd>
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
	if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
		return "Unknown date";
	}

	return date.toLocaleDateString(undefined, {
		weekday: "short",
		month: "short",
		day: "numeric",
	});
}

function formatTime(date) {
	if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
		return "";
	}

	return date.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	});
}

function formatObservationTime(date, timezone) {
	if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
		return timezone ? `Timezone: ${timezone}` : "Observation time unavailable";
	}

	const formattedDate = formatDate(date);
	const formattedTime = formatTime(date);
	const tzInfo = timezone ? ` (${timezone})` : "";
	return `Observed ${formattedDate} ${formattedTime}${tzInfo}`;
}

function formatTemperature(value) {
	return typeof value === "number" && Number.isFinite(value)
		? `${Math.round(value)}°C`
		: "—";
}

function formatNumber(value, suffix = "") {
	return typeof value === "number" && Number.isFinite(value)
		? `${value}${suffix}`
		: "—";
}

function formatWind(speed, unit, direction) {
	const speedDisplay = typeof speed === "number" && Number.isFinite(speed)
		? `${Math.round(speed)} ${unit}`
		: "—";
	if (!direction) {
		return speedDisplay;
	}
	return `${speedDisplay} ${direction}`;
}

function getIconUrl(iconNumber) {
	const defaultIcon = "https://developer.accuweather.com/sites/default/files/01-s.png";
	if (typeof iconNumber !== "number") {
		return defaultIcon;
	}
	const padded = iconNumber.toString().padStart(2, "0");
	return `https://developer.accuweather.com/sites/default/files/${padded}-s.png`;
}

async function request(endpoint, params = {}) {
	const searchParams = new URLSearchParams({ apikey: API_KEY, ...params });
	const url = `${endpoint}?${searchParams.toString()}`;
	const response = await fetch(url);

	if (!response.ok) {
		const errorMessage = await extractErrorMessage(response);
		throw new Error(errorMessage || `AccuWeather request failed with status ${response.status}.`);
	}

	return response.json();
}

async function extractErrorMessage(response) {
	try {
		const payload = await response.json();
		return payload?.Message || payload?.message;
	} catch (error) {
		console.error("Failed to parse error payload", error);
		return null;
	}
}

function assertApiKey() {
	if (!API_KEY || API_KEY.startsWith("YOUR_")) {
		throw new Error("Add your AccuWeather API key in script.js to fetch weather data.");
	}
}

// Only attempt the demo search if an API key is present.
loadWeather("London").catch(() => {
	// Silent fallback; the error is already surfaced via status messaging.
});
