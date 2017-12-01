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


$('#submit-button').on('click', function(event) {
	event.preventDefault();
	
	var trainName = $('#train-name').val().trim();
	var trainDestination = $('#train-destination').val().trim();
	var trainTime = $('#train-time').val();
	var trainFrequency = $('#train-frequency').val().trim();

	var newTrain = {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	}

	database.ref().push(newTrain);

	$('#train-name').val('');
	$('#train-destination').val('');
	$('#train-time').val('');
	$('#train-frequency').val('');
})

database.ref().on('child_added', function(childSnapshot) {
	var train = childSnapshot.val();

	var convertedTime = moment(train.time, 'hh:mm A').subtract(1, 'years');
	console.log(convertedTime);
	var currentTime = moment();
	console.log('Current Time: ' + moment(currentTime).format('hh:mm A'));
	var diffTime = moment().diff(moment(convertedTime), 'minutes');
	console.log('Difference in Time: ' + diffTime);
	var remainder = diffTime % train.frequency;
	console.log('Remainder: ' + remainder);
	var minutesAway = train.frequency - remainder;
	console.log('Minutes Away: ' + minutesAway);
	var nextTrain = moment().add(minutesAway, 'minutes');
	console.log('Arrival Time: ' + moment(nextTrain).format('hh:mm A'));


	
	var newTrain = $('<tr>');
	var newName = $('<td>' + train.name + '</td>');
	newTrain.append(newName);
	var newDestination = $('<td>' + train.destination + '</td>');
	newTrain.append(newDestination);
	var newFrequency = $('<td>' + train.frequency + '</td>');
	newTrain.append(newFrequency);
	var newTime = $('<td>' + moment(nextTrain).format('hh:mm A') + '</td>');
	newTrain.append(newTime);
	var nextArrival = $('<td>' + minutesAway + '</td>');
	newTrain.append(nextArrival);
	$('#trainTable').append(newTrain);

}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});