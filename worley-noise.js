var Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

function distributePoints(width, height, amount){
    var points = [];
    for(i = 0; i < amount; i++){
        points[i] = new Point(Math.random() * width, Math.random() * height);
    }
    return points;
}
function dist(x1, x2, y1, y2){
    return Math.sqrt((x1 -x2)**2 + (y1 - y2)**2);
}

var WorleyNoise = function(width, height, density, n){
    let points = distributePoints(width, height, density);
    //clamp n to max of density
    if(n >= density){
        n = density - 1;
    }
    let biggestDistance = 0;
    let pixels = []
    for(x = 0; x < width; x++){
        pixels[x] = [];
        for(y = 0; y < height; y++){
            let pointDistances = [];
            let pd;
            for(i = 0; i < points.length; i++){
                let distance = Math.floor(dist(x, points[i].x, y, points[i].y));
                if(pd === undefined || pd > distance){
                    pd = distance;
                }
                pointDistances[pointDistances.length] = distance;
            }
            //Using just sort() won't work here because it will handle the numbers as if they were strings
            pointDistances.sort((a, b) => a - b);

            if(pointDistances[n] > biggestDistance){
                biggestDistance = pointDistances[n];
            }
            pixels[x][y] = pointDistances[n];
        }
    }
    console.log(biggestDistance);
    this.pixelData = pixels;
    this.maxDist = biggestDistance;
    this.pointLocations = points;

    this.getValue = function(x, y){
        return pixels[x][y] / biggestDistance;
    }
}





