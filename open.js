const svg = document.querySelector("svg");
const button = document.querySelector("button");

const width = 600;
const height = 200;

const numberOfDataPoints = 50;

const xStep = width / numberOfDataPoints;
const yMin = Math.round(height * 1);
const yMax = height - yMin;

function addVectors(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
}

function drawRibbon() {
  const data = [];
  
  for (let i = 0; i <= numberOfDataPoints; i++) {
    data.push({
      x: xStep * i,
      y: yMin + Math.round(Math.random() * (yMax - yMin))
    });
  }

  const polygons = [];

  const angle = Math.PI * 0.25;

  const r = height * 0.1;

  const vector = {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r
  };

  data.forEach((current, index) => {
    const next = data[index + 1];
    if (next) {
      const polygon = [
        current,
        next,
        addVectors(next, vector),
        addVectors(current, vector)
      ];

      polygons.push(polygon);
    }
  });

  const hue = Math.floor(Math.random() * 360);

  svg.innerHTML = polygons.map((polygon, index) => {
    const d = polygon
      .map((point) => {
        return `${point.x} ${point.y}`;
      })
      .join(" L ");

    const h = (hue + index * 10) % 360;
    const l = index % 2 === 0 ? 70 - index * 1 : 90 - index * 1;
    return `<path d="M ${d}" fill="hsl(${h}, 80%, ${l}%)" />`;
  }).reverse().join('\n');
}

drawRibbon();

button.addEventListener("click", () => {
  drawRibbon();
});
