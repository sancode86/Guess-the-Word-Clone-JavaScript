

var startTime, endTime;
var secondsTotal = 0;
function startTimer() {
  startTime = new Date();
};
function endTimer() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  secondsTotal = Math.round(timeDiff);
 
}
function updateSecs() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;  
     secondsMostrar = Math.round(timeDiff);
  }
function initTime() {
    window.setInterval("updateTime()", 1000);
}
function updateTime() {
    updateSecs();
    segundosId.innerHTML = secondsMostrar;
}