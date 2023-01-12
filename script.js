var questions = ["Himmelen er grønn", "Jorden er flat", "Venus er firkantet", "Saturn er rundt"]

for(var i = 0 ; i < questions.length ; i++){
  window["q"+i] = document.createElement("p")
  window["q"+i].appendChild(document.createTextNode(questions[i]));
  window["q"+i].style = "font-weight: bold;"
  document.body.insertBefore(window["q"+i], document.getElementsByTagName("button")[0]);

  for(var j = 0 ; j < 2 ; j++){
    window["input"+j] = document.createElement("input")
    window["input"+j].type = "radio"
    window["input"+j].name = "q"+i;
    window["input"+j].value = j;
    window["label"+j] = document.createElement("label")

    document.body.insertBefore(window["input"+j], document.getElementsByTagName("button")[0]);
    document.body.insertBefore(window["label"+j], document.getElementsByTagName("button")[0]);
  }
  window["label0"].appendChild(document.createTextNode("enig"));
  window["label1"].appendChild(document.createTextNode("uenig"));
}
document.body.insertBefore(document.createElement("br"), document.getElementsByTagName("button")[0]);

localStorage.clear()
var allAnswers = JSON.parse(localStorage.getItem("truefalseQuestions")) || [];
console.log(allAnswers);

function svar(){
  for(var i = 0 ; i < questions.length; i++){
    if (isNaN(allAnswers[i+1])) {
      allAnswers[i+1] = 0
    }
    if(document.querySelector('input[name="q'+i+'"]:checked').value == 0){
      allAnswers[i+1]++
    }
  }
  if (isNaN(allAnswers[0])) {
    allAnswers[0] = 0
  }
  allAnswers[0]++
  console.log(allAnswers);
  localStorage.setItem("truefalseQuestions", JSON.stringify(allAnswers));
}
function visResultat(){
  barChart()
}

//stolpediagram med hjelp av at js library
function barChart(){
  var xValues = questions;
  var yValues1 = [];
  var yValues2 = [];
  for(var i = 1 ; i < allAnswers.length ; i++){
    yValues1.push((allAnswers[i]/allAnswers[0])*100);
    yValues2.push(((allAnswers[0]-allAnswers[i])/allAnswers[0])*100);
  }

  var barColors = ["red", "blue"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        label: "enig",
        backgroundColor: barColors[0],
        data: yValues1
      },
      {
        label: "uenig",
        backgroundColor: barColors[1],
        data: yValues2
      }]
    },
    options: {
      title: {
        display: true,
        text: "Oversikt over alle svar"
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                max: 100
            }
        }]
      }
    }
  });
  document.querySelectorAll("iframe").forEach(iframe => iframe.remove())

}