var arrow, curve, D;

window.onload = function () {
  arrow = document.getElementById("arrow");
  curve = document.getElementById("curve");
  D = curve.getTotalLength();
  curve.style.strokeDashoffset = D;
  curve.style.strokeDasharray = D;
  curve.setAttribute("transform", "translate(0,20)");
  requestAnimationFrame(run);
};

var t = 3, // parameter 0->1 to parametrize position on curve
  dt = 0.002, // step size
  vision = 9; // how many steps to look ahead for rotation

function run() {
  t = (t + dt) % 1;
  
  
  var p = curve.getPointAtLength(t * D);
  
 

  // To calculate angle get one point ahead, and one you just passed
  var p0 = curve.getPointAtLength(((1 + t - 0.5 * vision * dt) % 1) * D);
  var p1 = curve.getPointAtLength(((t + vision * dt) % 1) * D);
  

  var angle = 180 + Math.atan2(p1.y - p.y, p1.x - p.x) * (180 / Math.PI);

  var p3 = p1.x + 5 * (p.x - p0.x);
  var p4 = p1.y + 5 * (p.y - p0.y);
 

  arrow.setAttribute(
    "transform",
    "translate(" + p3 + "," + p4 + ") rotate(" + angle + ")"
  );
  
  
    requestAnimationFrame(run);
  

  curve.style.strokeDashoffset = D - t * D + 10;

  
}
