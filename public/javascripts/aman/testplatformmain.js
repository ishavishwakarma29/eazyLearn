// For Reverse Clock

const startingMinutes = document.getElementById("time").value;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countDown');

setInterval(updateCountDown, 1000);

function updateCountDown() {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (minutes == 0 && seconds == 0) {
        countdownEl.innerHTML = `Time's Up`;
        countdownEl.style.fontSize = '40px';
        countdownEl.style.marginTop = '7vh';
        countdownEl.style.marginLeft = '4vw';
        countdownEl.style.color = 'red';
        const testid = document.getElementById("testid").value;
        window.location = "http://localhost:3000/testplatform/warning/"+testid;
    }
    if (minutes < 0) {
        countdownEl.innerHTML = `Time's Up`;
    }
    time--;
}



//ajax calls
//base case
{
    const testid = document.getElementById("testid").value;
    const qno = 0;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3000/api/testportalmain', true);

    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function () {
        if (this.status = 200) {
            console.log(this.responseText);
            const output = JSON.parse(this.responseText);
            console.log(output);
            document.getElementById("question").innerHTML=output.question;
            for(var i=0;i<4;i++)
            {
                document.getElementById("option"+(i+1)).innerHTML= output.options[i];
            }
        }
    }

    params = `{
        "question_id":"${qno}",
        "test_id":"${testid}"
    }`;
    xhr.send(params);

}

//onclick event -- save and next
document.getElementById("save_n_next").addEventListener("click", save_next);
document.getElementById("save_n_next").addEventListener("click", deselect_radio);
document.getElementById("save_n_next").addEventListener("click", incby1);

function save_next(){
    let optionselected = 0;
    const testid = document.getElementById("testid").value;
    let qno = document.getElementById("qno").value;
    let selected_option = document.querySelector('input[name="answer"]:checked');
    if (selected_option != null) {
        optionselected = selected_option.value;
    } 
    

    const user = document.getElementById("user").value ;

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3000/api/testportalmain', true);

    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function () {
        if (this.status = 200) {
            console.log(this.responseText);
            const output = JSON.parse(this.responseText);
            console.log(output);
            document.getElementById("question").innerHTML=output.question;
            for(var i=0;i<4;i++)
            {
                document.getElementById("option"+(i+1)).innerHTML= output.options[i];
            }
        }
    }

    params = `{
        "question_id":"${qno}",
        "user":"${user}",
        "selected_option":"${optionselected}",
        "test_id":"${testid}"
    }`;
    xhr.send(params);
}

function deselect_radio() {
    var element = document.getElementsByName("answer");
    for (var i = 0; i < element.length; i++)
        element[i].checked = false;
}

function incby1(){
    let qno = document.getElementById("qno").value;
    qno++;
    document.getElementById("qno").value = qno;
    document.getElementById("qchange").innerHTML = qno;
}

//onclick -- clear()
document.getElementById("clear").addEventListener("click", deselect_radio);


//onclick -- submit()
document.getElementById("submit").addEventListener("click", save);


function save(){
    let optionselected = 0;
    const testid = document.getElementById("testid").value;
    let qno = document.getElementById("qno").value;
    let selected_option = document.querySelector('input[name="answer"]:checked');
    if (selected_option != null) {
        optionselected = selected_option.value;
    } 
    

    const user = document.getElementById("user").value ;

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3000/api/testportalmain/saveonly', true);

    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function () {
        if (this.status = 200) {
            console.log(this.responseText);
            const output = JSON.parse(this.responseText);
            console.log(output);
            // document.getElementById("question").innerHTML=output.question;
            // for(var i=0;i<4;i++)
            // {
            //     document.getElementById("option"+(i+1)).innerHTML= output.options[i];
            // }
        }
    }

    params = `{
        "question_id":"${qno}",
        "user":"${user}",
        "selected_option":"${optionselected}",
        "test_id":"${testid}"
    }`;
    xhr.send(params);
}


// function save_data() {
//     let selected_option = document.querySelector('input[name="answer"]:checked');
//     if (selected_option == null) {
//         selected_option = 0;
//     }

//     const user = document.getElementById("user").value ;
//     const qno = document.getElementById("qno").value;

//     const xhr = new XMLHttpRequest();

//     xhr.open('POST', 'http://localhost:3000/api/testportalmain', true);

//     xhr.setRequestHeader('Content-type', 'application/json');

//     xhr.onload = function () {
//         if (this.status = 200) {
//             console.log(this.responseText);
//             const output = JSON.parse(this.responseText);
//             console.log(output);
//             document.getElementById("question").innerHTML=output.question;
//             for(var i=0;i<4;i++)
//             {
//                 document.getElementById("option"+(i+1)).innerHTML= output.options[i];
//             }
//         }
//     }

//     params = `{
//         "question_id":"${qno}",
//         "test_id":"${testid}"
//     }`;
//     xhr.send(params);
// }