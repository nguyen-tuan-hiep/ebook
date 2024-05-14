const theme = localStorage.getItem("theme");
if (theme) {
	document.body.setAttribute("data-theme", theme);
}

function toggleDarkMode() {
	var darkModeIcon = document.querySelector(".controls .darkmode-icon");
	var lightModeIcon = document.querySelector(".controls .lightmode-icon");

	// Toggle visibility of darkmode and lightmode icons
	darkModeIcon.style.display =
		darkModeIcon.style.display === "none" ? "block" : "none";
	lightModeIcon.style.display =
		lightModeIcon.style.display === "none" ? "block" : "none";
	const currentTheme = document.body.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";
	document.body.setAttribute("data-theme", newTheme);
	localStorage.setItem("theme", newTheme);
}

function toggleMenu() {
	const popupMenu = document.getElementById("popup-menu");
	const overlay = document.getElementById("overlay");
	popupMenu.classList.toggle("popup-visible");
	overlay.classList.toggle("overlay-visible");
}

let currentChapterIndex = 0;

function navigateToSection(sectionId) {
	var section = document.getElementById(sectionId);
	if (section) {
		section.scrollIntoView({
			behavior: "smooth",
		});
	}
}

function changeFontSize(value) {
	document.body.style.fontSize = `${value}px`;
}

function toggleFullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

function initializePage() {
	const defaultLanguage = "vi";
	const paragraphs = document.querySelectorAll("p");

	paragraphs.forEach((paragraph) => {
		if (paragraph.lang !== defaultLanguage) {
			paragraph.classList.add("hidden");
		}
	});
}

function toggleLanguage() {
  const paragraphs = document.querySelectorAll("p");
  const languageSelector = document.querySelector(".language-selector");
  const selectedLanguage = languageSelector.textContent.trim();

  paragraphs.forEach((paragraph) => {
    if (selectedLanguage === "Eng" && paragraph.lang === "en") {
      paragraph.classList.remove("hidden");
    } else if (selectedLanguage === "Viet" && paragraph.lang === "vi") {
      paragraph.classList.remove("hidden");
    } else {
      paragraph.classList.add("hidden");
    }
  });

  languageSelector.textContent = selectedLanguage === "Viet" ? "Eng" : "Viet";
}


initializePage();
