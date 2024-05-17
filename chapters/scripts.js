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

function scrollToBottom() {
	window.scrollTo({
		top: document.body.scrollHeight,
		behavior: "smooth",
	});
}

document.onmouseup = document.onkeyup = function (event) {
	let selectedText = window.getSelection();
	let selectedRange = selectedText.toString().trim();
	let highlightBtn = document.getElementById("highlight-btn");

	if (selectedRange.length > 0) {
		if (!highlightBtn) {
			// Create the highlight button if it does not exist
			highlightBtn = document.createElement("button");
			highlightBtn.textContent = "Highlight";
			highlightBtn.id = "highlight-btn";
			document.body.appendChild(highlightBtn);
		}

		// Position the button
		let rect = selectedText.getRangeAt(0).getBoundingClientRect();
		let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		highlightBtn.style.position = "absolute";
		highlightBtn.style.left = `${rect.right + scrollLeft + 10}px`; // 10px to the right from the end of the selection
		highlightBtn.style.top = `${rect.top + scrollTop}px`; // align it with the top of the selection
		highlightBtn.style.zIndex = 1000;

		highlightBtn.onclick = function () {
			applyHighlight();
			document.body.removeChild(highlightBtn);
			window.getSelection().removeAllRanges(); // Unselect text after highlighting
		};
	} else if (highlightBtn) {
		// Remove the button if there is no selection
		document.body.removeChild(highlightBtn);
	}
};

function applyHighlight() {
	const selection = window.getSelection();
	if (!selection.rangeCount) return false;
	let span = document.createElement("span");
	span.style.backgroundColor = "yellow";
	span.classList.add("highlighted-text");

	let range = selection.getRangeAt(0).cloneRange();
	range.surroundContents(span);
	selection.removeAllRanges();
	selection.addRange(range);
	window.getSelection().removeAllRanges(); // Unselect text
}


function changeFont() {
	var selectedFont = document.getElementById('fontSelector').value;
	document.body.style.fontFamily = selectedFont;
}
