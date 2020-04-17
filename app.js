const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //context is how we manipulate pixels in canvas
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5; // controls__range in index.html

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //!painting == (painting===false): 클릭하지 않고 마우스만 캔버스에 움직일 때 --직선을 그리기 위한 좌표 설정
    ctx.beginPath(); //Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
    ctx.moveTo(x, y); // x, y from line 21, 22
  } else {
    //클릭하면 직선을 그림과 동시에 그 직선을 검은색으로 칠함
    ctx.lineTo(x, y); //Connects the last point(line 26) in the current sub-path to the specified (x, y) coordinates with a straight line.
    ctx.stroke();
  }
}

function onMouseUp(event) {
  //--when stopping keep clicking
  stopPainting();
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //mousemove --when moving on canvas
  canvas.addEventListener("mousedown", startPainting); //mousedown --when clicking
  canvas.addEventListener("mouseup", stopPainting); //mouseup --when stopping keep clicking
  canvas.addEventListener("mouseleave", stopPainting); //mouseleave --when mouse off to the canvas
  canvas.addEventListener("click", handleCanvasClick);
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (range) {
  //if문 안에 이벤트를 일으키는 이유는 range라는 element가 존재하는지 확인할 수 있는 안전성 측면 때문
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
