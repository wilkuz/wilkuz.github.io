// let sketchParticles = [];
// const num = 1000;

// function setup() {
//   var cnv = createCanvas(windowWidth, windowHeight/3);
//   cnv.style('display', 'block');
//   cnv.style('top', "125vh");
//   cnv.parent("#sketch-holder");
//   if (windowWidth < 380) {
//     cnv.style('display', 'none');
//   }
//   for(let i=0; i < num; i ++) {
//     sketchParticles.push(createVector(random(width),
//     random(height)));
//   }
//   stroke(255);
// }

// function draw() {
//   let noiseScale = 0.01;
//   	background("rgba(255,248,232,0.3)");
//   for(let i=0; i < num; i++){
//     let p = sketchParticles[i];
//     let c = color(171,135,255);
//     fill(c);
//     stroke(c);
//     ellipse(p.x, p.y, 1, 1);
//     let n = noise(p.x * noiseScale, p.y * noiseScale);
//     let a = TAU * n;
//     p.x += cos(a)*2;
//     p.y += sin(a)*3;
//     if(!onScreen(p)) {
//       p.x = random(width);
//       p.y = random(height);
//     }
//   }
// }

// function mouseReleased(scale) {
//   noiseSeed(millis());
// }

// function onScreen(v) {
//   return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeigth/2);
// }

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight/3);
    cnv.style('display', 'block');
    cnv.style('top', "125vh");
    cnv.parent("#sketch-holder");
    if (windowWidth < 380) {
      cnv.style('display', 'none');
    }
    for(let i=0; i < num; i ++) {
      sketchParticles.push(createVector(random(width),
      random(height)));
    }
    stroke(255);
    rectangle(1, 1, 150, 150);
  }