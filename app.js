const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputs = {
  dlinaZagotovki: document.getElementById("dlinaZagotovki"),
  shirinaZagotovki: document.getElementById("shirinaZagotovki"),
  tolschinaKartona: document.getElementById("tolschinaKartona"),
  dlinaKorobki: document.getElementById("dlinaKorobki"),
  schirinaKorobki: document.getElementById("schirinaKorobki"),
  visotaKorobki: document.getElementById("visotaKorobki"),
};

const drawButton = document.getElementById("drawButton");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");

let points = [];

drawButton.addEventListener("click", drawLines);
clearButton.addEventListener("click", clearCanvas);
saveButton.addEventListener("click", saveAsPng);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLines() {
  const dlinaZagotovki = parseFloat(inputs.dlinaZagotovki.value);
  const shirinaZagotovki = parseFloat(inputs.shirinaZagotovki.value);
  const tolschinaKartona = parseFloat(inputs.tolschinaKartona.value);
  const dlinaKorobki = parseFloat(inputs.dlinaKorobki.value);
  const schirinaKorobki = parseFloat(inputs.schirinaKorobki.value);
  const visotaKorobki = parseFloat(inputs.visotaKorobki.value);

  if (
    !isNaN(dlinaZagotovki) &&
    !isNaN(shirinaZagotovki) &&
    !isNaN(tolschinaKartona) &&
    !isNaN(dlinaKorobki) &&
    !isNaN(schirinaKorobki) &&
    !isNaN(visotaKorobki)
  ) {
    // Constants
    const prosechka = 8;
    const pi = Math.PI;
    const ugol = (15 * pi) / 180;
    const ugolZamykaniya = (165 * pi) / 180;

    // Calculate visotaKlapana
    const visotaKlapana =
      (shirinaZagotovki - (visotaKorobki + tolschinaKartona)) / 2;

    // Calculate the cosine of the angle
    const kosinusUgla = Math.cos(ugol);

    // Calculate the length of the first segment
    const dlinaPervogoOtrezka =
      (dlinaZagotovki - (2 * dlinaKorobki + 2 * schirinaKorobki + 4 * 3 + 4)) /
      kosinusUgla;

    // Calculation of the opposite catheter
    const oppositeÑatheter = Math.sin(ugolZamykaniya) * dlinaPervogoOtrezka;

    // Calculate of last line pt37-pt1
    const lastLineLength =
      shirinaZagotovki - (2 * oppositeÑatheter + 2 * visotaKlapana);

    // Get the starting point from the user
    let pt1 = { x: 300, y: 800 };

    // Calculate the point for the end of the first segment
    let pt2 = {
      x: pt1.x + dlinaPervogoOtrezka * Math.cos(ugol),
      y: pt1.y + dlinaPervogoOtrezka * Math.sin(ugol),
    };

    points.push(pt1, pt2);

    // Pervy klapan
    let pt3 = { x: pt2.x + prosechka, y: pt2.y };
    let pt4 = { x: pt3.x, y: pt3.y + visotaKlapana };
    let pt5 = {
      x: pt4.x + (dlinaKorobki + tolschinaKartona - prosechka),
      y: pt4.y,
    };
    let pt6 = { x: pt5.x, y: pt5.y - visotaKlapana };
    let pt7 = { x: pt6.x + prosechka, y: pt6.y };

    points.push(pt3, pt4, pt5, pt6, pt7);

    // Vtoroy klapan
    let pt8 = { x: pt7.x, y: pt7.y + visotaKlapana };
    let pt9 = {
      x: pt8.x + (schirinaKorobki + tolschinaKartona - prosechka),
      y: pt8.y,
    };
    let pt10 = { x: pt9.x, y: pt9.y - visotaKlapana };
    let pt11 = { x: pt10.x + prosechka, y: pt10.y };

    points.push(pt8, pt9, pt10, pt11);

    // Tretiy klapan
    let pt12 = { x: pt11.x, y: pt11.y + visotaKlapana };
    let pt13 = {
      x: pt12.x + (dlinaKorobki + tolschinaKartona - prosechka),
      y: pt12.y,
    };
    let pt14 = { x: pt13.x, y: pt13.y - visotaKlapana };
    let pt15 = { x: pt14.x + prosechka, y: pt14.y };

    points.push(pt12, pt13, pt14, pt15);

    // Chetverty klapan
    let pt16 = { x: pt15.x, y: pt15.y + visotaKlapana };
    let pt17 = {
      x: pt16.x + (schirinaKorobki + tolschinaKartona - prosechka / 2),
      y: pt16.y,
    };

    points.push(pt16, pt17);

    // Storona bezklapana
    let pt18 = { x: pt17.x, y: pt17.y - visotaKlapana };
    let pt19 = { x: pt18.x, y: pt18.y - (visotaKorobki + tolschinaKartona) };
    let pt20 = { x: pt19.x, y: pt19.y - visotaKlapana };

    points.push(pt18, pt19, pt20);

    // Piaty klapan
    let pt21 = {
      x: pt20.x - (schirinaKorobki + tolschinaKartona - prosechka / 2),
      y: pt20.y,
    };
    let pt22 = { x: pt21.x, y: pt21.y + visotaKlapana };
    let pt23 = { x: pt22.x - prosechka, y: pt22.y };

    points.push(pt21, pt22, pt23);

    // Shestoy klapan
    let pt24 = { x: pt23.x, y: pt23.y - visotaKlapana };
    let pt25 = {
      x: pt24.x - (dlinaKorobki + tolschinaKartona - prosechka),
      y: pt24.y,
    };
    let pt26 = { x: pt25.x, y: pt25.y + visotaKlapana };
    let pt27 = { x: pt26.x - prosechka, y: pt26.y };

    points.push(pt24, pt25, pt26, pt27);

    // Sedmoy klapan
    let pt28 = { x: pt27.x, y: pt27.y - visotaKlapana };
    let pt29 = {
      x: pt28.x - (schirinaKorobki + tolschinaKartona - prosechka),
      y: pt28.y,
    };
    let pt30 = { x: pt29.x, y: pt29.y + visotaKlapana };
    let pt31 = { x: pt30.x - prosechka, y: pt30.y };

    points.push(pt28, pt29, pt30, pt31);

    // Vosmoy klapan
    let pt32 = { x: pt31.x, y: pt31.y - visotaKlapana };
    let pt33 = {
      x: pt32.x - (dlinaKorobki + tolschinaKartona - prosechka),
      y: pt32.y,
    };
    let pt34 = { x: pt33.x, y: pt33.y + visotaKlapana };
    let pt35 = { x: pt34.x - prosechka, y: pt34.y };

    points.push(pt32, pt33, pt34, pt35);

    let pt36 = {
      x: pt35.x + dlinaPervogoOtrezka * Math.cos(ugolZamykaniya),
      y: pt35.y + dlinaPervogoOtrezka * Math.sin(ugolZamykaniya),
    };

    let pt37 = {
      x: pt36.x,
      y: pt36.y + lastLineLength,
    };

    points.push(pt36, pt37);

    clearCanvas();
    drawLinesOnCanvas();
  } else {
    alert("Пожалуйста, введите все значения.");
  }
}

function drawLinesOnCanvas() {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.stroke();
}

// Функция для сохранения изображения в формате PNG
function saveAsPng() {
  // Заполнить фон белым цветом перед сохранением
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Рисовать линии снова после заполнения фона
  drawLinesOnCanvas();

  // Сохранить как PNG
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "drawing.png";
  link.click();
}

// // Функция для сохранения изображения в формате SVG
// function saveAsSvg() {
//   const svg = `<svg width="${canvas.width}" height="${canvas.height}">
//     <path d="M ${points
//       .map((p) => `${p.x} ${p.y}`)
//       .join(" L ")}" stroke="blue" stroke-width="1" fill="none"/>
//   </svg>`;

//   const link = document.createElement("a");
//   link.href = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
//   link.download = "drawing.svg";
//   link.click();
// }
