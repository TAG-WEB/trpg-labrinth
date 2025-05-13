function typeWriter(text, elementId, speed = 50) {
  const el = document.getElementById(elementId);
  el.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

window.onload = () => {
  const intro = `알 수 없는 부름에 이끌려, 당신은 오래된 미궁의 문 앞에 섰다.`;
  typeWriter(intro, "narration");
};

function startGame() {
  localStorage.setItem("sceneIndex", "0");
  localStorage.setItem("hintCount", "0");
  localStorage.setItem("startTime", Date.now());
  location.href = "naration.html";
}