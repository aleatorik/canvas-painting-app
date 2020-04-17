const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //context is how we manipulate pixels in canvas

canvas.width = 600;
canvas.height = 600;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5; // controls__range in index.html

let painting = false;

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

function onMouseDown(event) {
  //--when clicking
  painting = true;
}

function onMouseUp(event) {
  //--when stopping keep clicking
  stopPainting();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //mousemove --when moving on canvas
  canvas.addEventListener("mousedown", startPainting); //mousedown --when clicking
  canvas.addEventListener("mouseup", stopPainting); //mouseup --when stopping keep clicking
  canvas.addEventListener("mouseleave", stopPainting); //mouseleave --when mouse off to the canvas
}
