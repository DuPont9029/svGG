function convertToSVG() {
    var fileInput = document.getElementById('imageUpload');
    var downloadButton = document.getElementById('downloadButton');
    var imagePreviewContainer = document.getElementById('imagePreviewContainer');

    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var img = new Image();
        img.src = e.target.result;

        img.onload = function() {
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          var context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);

          var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', canvas.toDataURL('image/png'));
          image.setAttribute('x', '0');
          image.setAttribute('y', '0');
          image.setAttribute('width', img.width);
          image.setAttribute('height', img.height);
          svg.setAttribute('viewBox', '0 0 ' + img.width + ' ' + img.height);
          svg.setAttribute('width', '100%');
          svg.setAttribute('height', '100%');
          svg.appendChild(image);

          imagePreviewContainer.innerHTML = '';
          imagePreviewContainer.appendChild(svg);

          var svgData = new XMLSerializer().serializeToString(svg);
          var blob = new Blob([svgData], { type: 'image/svg+xml' });
          var url = URL.createObjectURL(blob);

          downloadButton.href = url;
          downloadButton.style.display = 'block';
        };
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  }