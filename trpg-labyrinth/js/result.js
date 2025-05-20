window.onload = () => {
  document.getElementById("final-hints").textContent = localStorage.getItem("finalHints") || 0;
  document.getElementById("final-time").textContent = localStorage.getItem("finalTime") || 0;
};

// ✅ 트위터 공유 기능
function shareTwitter() {
  const url = 'https://trpg-labrinth.vercel.app/index.html';
  const time = document.getElementById("final-time").textContent;
  const hints = document.getElementById("final-hints").textContent;
  const text = `내 클리어: ${time}초\n힌트 사용: ${hints}회\n나보다 더 빨리 미궁탈출 가능한 사람?\nTRPG길드 설연 미궁게임은 요기!>`;
  window.open(`https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
}