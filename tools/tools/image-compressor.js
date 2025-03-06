// Wait for the DOM to be loaded
window.addEventListener("DOMContentLoaded", () => {
  const inputImage = document.getElementById("inputImage");
  const preview = document.getElementById("preview");
  const downloadBtn = document.getElementById("downloadBtn");

  let compressedBlob = null;

  inputImage.addEventListener("change", () => {
    const file = inputImage.files[0];
    if (!file) return;

    // Show preview of original image
    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // Use Compressor.js
    new Compressor(file, {
      quality: 0.6, // Adjust quality (0 to 1)
      success(result) {
        compressedBlob = result;
        downloadBtn.disabled = false;
      },
      error(err) {
        console.error(err.message);
      }
    });
  });

  downloadBtn.addEventListener("click", () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed_" + inputImage.files[0].name;
    a.click();
    URL.revokeObjectURL(url);
  });
});
