var config = {
    apiKey: "AIzaSyCTSKfs9-3UfYroJAEHUeMWTQH7EpqvxbI",
    authDomain: "train-scheduler-6f603.firebaseapp.com",
    databaseURL: "https://train-scheduler-6f603.firebaseio.com",
    projectId: "train-scheduler-6f603",
    storageBucket: "",
    messagingSenderId: "323270692342"
};
 
firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var trainDestination;
var trainTime;
var trainFrequency;
var count = 0;

$('#submit-button').on('click', function() {
	//event.preventDefault();
	
	count++;
	trainName = $('#train-name').val().trim();
	trainDestination = $('#train-destination').val().trim();
	trainTime = $('#train-time').val();
	trainFrequency = $('#train-frequency').val().trim();

	database.ref('/trainData' + count)({
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	})

	var newTrain = $('<tr>');
	var newName = $('<td>' + trainName + '</td>');
	newTrain.append(newName);
	var newDestination = $('<td>' + trainDestination + '</td>');
	newTrain.append(newDestination);
	var newFrequency = $('<td>' + trainFrequency + '</td>');
	newTrain.append(newFrequency);
	var newTime = $('<td>' + trainTime + '</td>');
	newTrain.append(newTime);
	$('#trainTable').append(newTrain);
})

database.ref('/trainData1').on('value', function(snapshot) {
	trainName = snapshot.val().name;
	trainDestination = snapshot.val().destination;
	trainTime = snapshot.val().time;
	trainFrequency = snapshot.val().frequency;

	var date = new Date();
	console.log(date.getHours());
	console.log(date.getMinutes()); 

	var newTrain = $('<tr>');
	var newName = $('<td>' + trainName + '</td>');
	newTrain.append(newName);
	var newDestination = $('<td>' + trainDestination + '</td>');
	newTrain.append(newDestination);
	var newFrequency = $('<td>' + trainFrequency + '</td>');
	newTrain.append(newFrequency);
	var newTime = $('<td>' + trainTime + '</td>');
	newTrain.append(newTime);
	$('#trainTable').append(newTrain);

}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});