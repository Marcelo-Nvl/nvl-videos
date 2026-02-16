const feed = document.getElementById("feed");

/* VÍDEOS INICIAIS */
const videos = [
  "videos/v1.mp4",
  "videos/v2.mp4",
  "videos/v3.mp4"
];

/* OBSERVER (AUTOPLAY VISUAL) */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;
    if (!video.dataset.manualPause) {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  });
}, {
  root: feed,
  threshold: 0.6
});

/* CRIAR VÍDEO */
function createVideo(src) {
  const box = document.createElement("div");
  box.className = "video-box";

  const video = document.createElement("video");
  video.src = src;
  video.loop = true;
  video.muted = true;        // necessário para autoplay
  video.playsInline = true;
  video.preload = "metadata";

  /* 👉 TOCAR NO VÍDEO = PLAY / PAUSE */
  video.addEventListener("click", () => {
    if (video.paused) {
      video.muted = false;  // ativa som após interação
      video.play();
      video.dataset.manualPause = "";
    } else {
      video.pause();
      video.dataset.manualPause = "true";
    }
  });

  box.appendChild(video);
  feed.appendChild(box);
  observer.observe(video);
}

/* CARREGAR */
function loadVideos() {
  videos.forEach(src => createVideo(src));
}

/* UPLOAD */
function uploadVideos(files) {
  Array.from(files).forEach(file => {
    const url = URL.createObjectURL(file);
    createVideo(url);
  });
}

/* START */
loadVideos();