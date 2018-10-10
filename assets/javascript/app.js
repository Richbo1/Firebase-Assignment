$(document).ready(function(){
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCBwZDUDsG_U0QMuMRT-CtyZE9761NJ07U",
  authDomain: "train-times-35aaa.firebaseapp.com",
  databaseURL: "https://train-times-35aaa.firebaseio.com",
  projectId: "train-times-35aaa",
  storageBucket: "",
  messagingSenderId: "648018928725"
};
firebase.initializeApp(config);

var trainData = firebase.database();

$("#submit").on("click", function(){
var name = $("#addName").val().trim();
var destination = $("#addDestination").val().trim();
var time =  $("#addTime").val().trim();
var frequency = $("#addFrequency").val().trim();

console.log(name)
console.log(destination)
console.log(time)
console.log(frequency)

var newTrain = {
	name: name,
    destination: destination,
    time: time,
    frequency: frequency,
}

trainData.ref().push(newTrain);
console.log(newTrain.name)
console.log(newTrain.destination)
console.log(newTrain.time)
console.log(newTrain.frequency)

	$("#trainNameInput").val("");
	$("#lineInput").val("");
	$("#destinationInput").val("");
	$("#trainInput").val("");
	$("#frequencyInput").val("");

	return false;



});


trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var name2 = childSnapshot.val().name;
	var destination2 = childSnapshot.val().destination;
	var time2 = childSnapshot.val().time;
	var frequency2 = childSnapshot.val().frequency;

	var timeDis = time2.split(":");
	var trainTime = moment().hours(timeDis[0]).minutes(timeDis[1]);
	var nextA;
	var minsA;
	 

	
	var diffTime = moment().diff(trainTime, "minutes")
	var timeRemainder = diffTime % frequency2;
	minsA = frequency2 - timeRemainder;
	nextA = moment().add(minsA, "m").format("hh:mm A");



	
	
	
	
	$("#trainTable > tbody").append("<tr><td>" + name2 + "</td><td>" + destination2 + "</td><td>" +
          frequency2 + "</td><td>" +nextA + "</td><td>" + minsA  + "</td></tr>");

});
});