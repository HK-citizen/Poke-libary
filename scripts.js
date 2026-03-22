// scripts.js

// Handle tab switching
function showTab(tabName) {
  // Hide all tabs
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.style.display = "none");

  // Show selected tab
  const selected = document.getElementById(tabName);
  if (selected) {
    selected.style.display = "block";
  }

  // Refresh library view if library tab is opened
  if (tabName === "library") {
    renderLibrary();
  }
}

// Save game to library
function saveGameToLibrary(gameName, saveData) {
  let library = JSON.parse(localStorage.getItem("library")) || {};
  library[gameName] = { saveData };
  localStorage.setItem("library", JSON.stringify(library));
}

// Render library list
function renderLibrary() {
  const library = JSON.parse(localStorage.getItem("library")) || {};
  const libraryList = document.getElementById("libraryList");
  libraryList.innerHTML = "";

  for (const game in library) {
    const entry = document.createElement("div");
    entry.className = "library-entry";
    entry.innerHTML = `
      <strong>${game}</strong>
      <button onclick="saveState('${game}','exampleSaveData')">Save</button>
      <button onclick="alert(loadState('${game}'))">Load</button>
    `;
    libraryList.appendChild(entry);
  }
}

// Save state
function saveState(gameName, stateData) {
  let library = JSON.parse(localStorage.getItem("library")) || {};
  if (!library[gameName]) library[gameName] = {};
  library[gameName].saveState = stateData;
  localStorage.setItem("library", JSON.stringify(library));
}

// Load state
function loadState(gameName) {
  let library = JSON.parse(localStorage.getItem("library")) || {};
  return library[gameName]?.saveState || null;
}

// Initialize default tab
document.addEventListener("DOMContentLoaded", () => {
  showTab("play"); // Default to Play tab
});
