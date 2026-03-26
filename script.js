const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const planBtn = document.getElementById("planBtn");
const finishBtn = document.getElementById("finishBtn");

const place = document.getElementById("place");
const otherPlace = document.getElementById("otherPlace");
const otherPlaceWrap = document.getElementById("otherPlaceWrap");
const result = document.getElementById("result");

const texts = ["No 😶", "Are you sure? 😳", "Really? 😏", "Last chance 😈"];

function showScreen(screenToShow) {
  [screen1, screen2, screen3, screen4].forEach((screen) => {
    screen.classList.remove("active");
  });

  screenToShow.classList.add("active");
}

yesBtn.addEventListener("click", () => {
  showScreen(screen2);
});

planBtn.addEventListener("click", () => {
  showScreen(screen3);
});

place.addEventListener("change", function () {
  if (this.value === "other") {
    otherPlaceWrap.classList.remove("hidden");
  } else {
    otherPlaceWrap.classList.add("hidden");
    otherPlace.value = "";
  }
});

// Impossible moving No button
document.addEventListener("mousemove", (e) => {
  if (!screen1.classList.contains("active")) return;

  const rect = noBtn.getBoundingClientRect();

  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 120) {
    const moveX = (Math.random() - 0.5) * 320;
    const moveY = (Math.random() - 0.5) * 220;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    noBtn.textContent = texts[Math.floor(Math.random() * texts.length)];
  }
});

finishBtn.addEventListener("click", () => {
  const time = document.getElementById("time").value.trim();
  const placeValue =
    place.value === "other" ? otherPlace.value.trim() : place.value;
  const message = document.getElementById("message").value.trim();

  if (!time) {
    alert("Please enter your available time.");
    return;
  }

  if (!place.value) {
    alert("Please choose a place.");
    return;
  }

  if (place.value === "other" && !otherPlace.value.trim()) {
    alert("Please write your place idea.");
    return;
  }

  result.innerHTML = `
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Place:</strong> ${placeValue}</p>
    <p><strong>Message:</strong> ${message || "No message 😏"}</p>
  `;

  showScreen(screen4);
});