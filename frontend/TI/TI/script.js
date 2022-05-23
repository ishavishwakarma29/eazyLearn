// For Reverse Clock

const startingMinutes = 10;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countDown');

setInterval(updateCountDown,1000);

function updateCountDown(){
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (minutes==0 && seconds==0) {
        countdownEl.innerHTML = `Time's Up`;
        countdownEl.style.fontSize = '40px';
        countdownEl.style.marginTop = '7vh';
        countdownEl.style.marginLeft = '4vw';
        countdownEl.style.color = 'red';
    }
    if (minutes<0){
        countdownEl.innerHTML = `Time's Up`;
    }
    time--;
}



