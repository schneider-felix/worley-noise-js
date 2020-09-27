var ctx = document.getElementById("drawing-area").getContext("2d");

var res = 2;

function drawPixel(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}
function drawPixelGrey(x,y,percent){
    ctx.fillStyle = `rgba(${percent * 255}, ${percent * 255}, ${percent * 255}, 255)`;
    ctx.fillRect(x, y,1, 1);
}

function resizeCanvas(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.width);
    ctx.canvas.height = window.innerHeight / res;
    ctx.canvas.width = window.innerWidth / res;
    draw();
}

function draw() {
    let t1 = performance.now();
    let noise = new WorleyNoise(ctx.canvas.width, ctx.canvas.height, 10, 0);
    console.log(noise.getValue(50, 100));
    for(x = 0; x < ctx.canvas.width; x++){
        for(y = 0; y < ctx.canvas.height; y++){
            drawPixelGrey(x, y , 1 - noise.getValue(x, y));
        }
    }

    for(i = 0; i < noise.pointLocations.length; i++){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(noise.pointLocations[i].x, noise.pointLocations[i].y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    let t2 = performance.now();
    console.log("Noise generation took " +Math.floor(t2 - t1) +"ms");
}
//resizeCanvas();
var loop = setInterval(resizeCanvas, 3000);
