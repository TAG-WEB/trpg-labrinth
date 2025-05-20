let sceneIndex = parseInt(localStorage.getItem("sceneIndex") || "0");
let hintCount = parseInt(localStorage.getItem("hintCount") || "0");
let startTime = parseInt(localStorage.getItem("startTime") || Date.now());

let scenes = [];

function updateTimer() {
  const now = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("timer").textContent = now;
}

function showHint() {
  document.getElementById("hint").textContent = scenes[sceneIndex].hint;
  hintCount++;
  document.getElementById("hint-count").textContent = hintCount;
  localStorage.setItem("hintCount", hintCount);
}

function submitAnswer() {
  const input = document.getElementById("answer-input").value.trim();
  if (input === scenes[sceneIndex].answer) {
    localStorage.setItem("sceneIndex", sceneIndex + 1);
    location.href = "naration.html";
  } else {
    alert("정답이 아닙니다.");
  }
}

function nextScene() {
  sceneIndex++;
  localStorage.setItem("sceneIndex", sceneIndex);
  if (sceneIndex >= scenes.length) {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    localStorage.setItem("finalTime", totalTime);
    localStorage.setItem("finalHints", hintCount);
    location.href = "result.html";
  } else {
    const next = scenes[sceneIndex];
    if (next.type === "naration") {
      location.href = "naration.html";
    } else if (next.type === "question") {
      location.href = "game.html";
    }
  }
}

function typeWriter(text, elementId, speed = 40, callback) {
  const el = document.getElementById(elementId);
  el.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

window.onload = async () => {
  const res = await fetch("data/scenes.json");
  scenes = await res.json();
  const current = scenes[sceneIndex];
  if (current.type === "naration") {
	setSceneImage(current.image);
    typeWriter(current.text, "narration");
  } else if (current.type === "question") {
    setSceneImage(current.image);
	document.getElementById("question-text").textContent = current.question;
    document.getElementById("hint-count").textContent = hintCount;
    setInterval(updateTimer, 1000);
  }
}

function setSceneImage(imageName) {
  const imgEl = document.getElementById("scene-image");
  if (imgEl && imageName) {
    imgEl.src = `assets/images/${imageName}`;
    imgEl.style.display = "block";
  } else if (imgEl) {
    imgEl.style.display = "none";
  }
};