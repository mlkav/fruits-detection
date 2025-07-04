let model;
const dropZone = document.getElementById('dropZone');
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const resultBox = document.getElementById('resultBox');
const classLabels = ['Fresh Apples', 'Fresh Banana', 'Rotten Apples', 'Rotten Banana'];

// Load model
async function loadModel() {
  model = await tf.loadGraphModel('model_tfjs/model.json');
}
loadModel();

// Drag-and-drop area: klik
dropZone.addEventListener('click', () => imageInput.click());

// Handle file input
imageInput.addEventListener('change', (e) => handleFiles(e.target.files));

// Drag-over styling
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('hover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('hover');
});

// Drop handler
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('hover');
  const files = e.dataTransfer.files;

  if (files.length > 0) {
    handleFiles(files);
  } else {
    const imgSrc = e.dataTransfer.getData('text/plain');
    if (imgSrc) {
      preview.src = imgSrc;
      preview.hidden = false;
    }
  }
});

// Handle file upload
function handleFiles(files) {
  const file = files[0];
  const reader = new FileReader();
  reader.onload = e => {
    preview.src = e.target.result;
    preview.hidden = false;
  };
  reader.readAsDataURL(file);
}

// Sample image drag
document.querySelectorAll('.sample-card img').forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.src);
  });
});

// Tombol prediksi
document.getElementById('predictBtn').addEventListener('click', async () => {
  if (!model) {
    alert('Model belum siap!');
    return;
  }

  // Validasi gambar
  if (!preview.src || preview.hidden || preview.src === '#' || preview.src.startsWith("file:///")) {
    alert("⚠️ Silakan unggah atau tarik gambar terlebih dahulu sebelum melakukan prediksi.");
    return;
  }

  const img = new Image();
  img.src = preview.src;
  img.onload = async () => {
        const tensor = tf.browser.fromPixels(img, 4) // ambil 4 channel (RGBA)
          .resizeNearestNeighbor([100, 100]) // ukuran sesuai model
          .toFloat()
          .div(tf.scalar(255))
          .expandDims();

    const prediction = model.predict(tensor);
    const predictionData = await prediction.data();

    const bestIdx = predictionData.indexOf(Math.max(...predictionData));
    const label = classLabels[bestIdx];

    if (label) {
      document.getElementById('predictedLabel').innerText = label;
      document.getElementById('confidenceScore').innerText =
        `Confidence: ${(predictionData[bestIdx] * 100).toFixed(2)}%`;
    } else {
      document.getElementById('predictedLabel').innerText = 'Tidak diketahui';
      document.getElementById('confidenceScore').innerText =
        'Sepertinya bukan gambar buah.';
    }

    resultBox.style.display = 'block';
  };
});
