function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createColorBox(color) {
  const colorContainer = document.getElementById("color-container");

  const colorBox = document.createElement("div");
  colorBox.style.backgroundColor = color;
  colorBox.classList.add("color-box");

  const closeBtn = document.createElement("span");
  closeBtn.innerText = "x";
  closeBtn.style.fontSize = "1.5rem";
  closeBtn.style.color = 'white'
  closeBtn.style.padding = '10px'
    
  const colorCode = document.createElement ('p');
  colorCode.innerText = color;
  colorCode.style.fontSize = '1.5rem';
  colorCode.style.color = 'white';
  colorCode.style.margin = '10px';
  colorCode.style.textAlign = 'center'
  
  function adjustFontSize() {
    if (window.innerWidth >= 540) {
      colorCode.style.fontSize = '1.5rem';
    } 
    else if  (window.innerWidth >=410) {
        colorCode.style.fontSize = '1.0rem'; 
    }
    else if  (window.innerWidth >=310) {
        colorCode.style.fontSize = '0.6rem'; 
    }

    else {
      colorCode.style.fontSize = '0.4rem';
    }
  }
  
  window.addEventListener('resize', adjustFontSize);
  
  closeBtn.addEventListener("click", function () {
  colorContainer.removeChild(colorBox);
  });
  
  colorContainer.appendChild(colorBox);
  colorBox.appendChild(closeBtn);
  colorBox.appendChild(colorCode);
  
}

window.addEventListener("DOMContentLoaded", function () {
  const numColorsInput = document.getElementById("num-colors");
  const addColorsBtn = document.getElementById("add-colors-btn");

  addColorsBtn.addEventListener("click", function () {
    const numColors = parseInt(numColorsInput.value);
    for (let i = 0; i < numColors; i++) {
      const randomColor = generateRandomColor();
      createColorBox(randomColor);
    }
  });

  for (let i = 0; i < 3; i++) {
    const randomColor = generateRandomColor();
    createColorBox(randomColor);
  }
});
