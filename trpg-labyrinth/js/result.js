window.onload = () => {
  document.getElementById("final-hints").textContent = localStorage.getItem("finalHints") || 0;
  document.getElementById("final-time").textContent = localStorage.getItem("finalTime") || 0;
};