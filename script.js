import { stations } from "./stations.js";

function updateStation(id) {
  const data = stations[id];
  if (!data) return;

  document.getElementById("title").textContent = data.title;
  document.getElementById("commune").textContent = "Commune: " + data.commune;
  document.getElementById("status").textContent = "Status: " + data.status;

  document.getElementById("metro-badge").style.display = "none";
  document.getElementById("tram-badge").style.display = "none";
  document.getElementById("train-badge").style.display = "none";

  // show only relevant ones
  data.lines.forEach(line => {
    if (line === "metro") {
      document.getElementById("metro-badge").style.display = "block";
    }

    if (line === "tramway") {
      document.getElementById("tram-badge").style.display = "block";
    }

    if (line === "train") {
      document.getElementById("train-badge").style.display = "block";
    }
  });
}

fetch("AlgiersTransit.svg")
  .then(r => r.text())
  .then(svg => {
    const container = document.getElementById("map-container");
    container.innerHTML = svg;

    // IMPORTANT: SVG is now in DOM → bind events here
    const svgEl = container.querySelector("svg");

    svgEl.querySelectorAll("[id^='metro_'], [id^='tramway_'], [id^='train_']")
      .forEach(el => {
        el.style.cursor = "pointer";

        el.addEventListener("click", () => {
          updateStation(el.id);
        });
      });
  });
// Fetches the SVG and places inside the div with ID "map-container"