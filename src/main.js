const video = document.getElementById('camera');
const startBtn = document.getElementById('start-btn');
const status = document.getElementById('status');

function setStatus(message) {
  status.textContent = message;
}

async function startCamera() {
  if (!window.isSecureContext) {
    setStatus('Camera requires HTTPS. Open this page over a secure connection.');
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setStatus('Camera API is not supported on this browser.');
    return;
  }

  setStatus('Requesting camera access…');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    video.srcObject = stream;
    await video.play();

    startBtn.classList.add('hidden');
    setStatus('Camera active');
    setTimeout(() => setStatus(''), 2000);
  } catch (err) {
    console.error('Camera error:', err);
    if (err.name === 'NotAllowedError') {
      setStatus('Camera permission denied. Check your browser settings and try again.');
    } else if (err.name === 'NotFoundError') {
      setStatus('No camera found on this device.');
    } else {
      setStatus(`Camera error: ${err.message}`);
    }
  }
}

startBtn.addEventListener('click', startCamera);
