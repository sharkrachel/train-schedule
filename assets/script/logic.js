$(document).ready(function () {

    // Your web app's Firebase configuration

    var firebaseConfig = {
        apiKey: "AIzaSyBzvMUOK6nXRyuB1LK2Dwwul2-rhfhWhs4",
        authDomain: "bootcamp-first-project-dc48a.firebaseapp.com",
        databaseURL: "https://bootcamp-first-project-dc48a.firebaseio.com",
        projectId: "bootcamp-first-project-dc48a",
        storageBucket: "bootcamp-first-project-dc48a.appspot.com",
        messagingSenderId: "551321302298",
        appId: "1:551321302298:web:873bfeec3720e55ec0a8a3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    // user inputs train information
    // next arrival time is calculated using moment.js
    // minutes away is calculated using moment.js
    // train information is sent to firebase
    // train information is added to table from firebase

    //on click function that will send form input information to firebase
    $("#submit").on("click", function (event) {
        //prevents page from refreshing when button is pushed
        event.preventDefault();
        database.ref().push({
            trainName: $(".train-name").val(),
            destination: $(".destination").val(),
            firstTrainTime: $(".first-time").val(),
            frequency: $(".frequency").val()
        });

        $(".train-name").val("");
        $(".destination").val("");
        $(".first-time").val("");
        $(".frequency").val("");

    });
database.ref().on("child_added", function(snapshot){

var inputTrainName = snapshot.val().trainName;
var inputDestination = snapshot.val().destination;
var inputFrequency = snapshot.val().frequency;
var inputFirstTrainTime = snapshot.val().firstTrainTime;

//convert time if to ensure it's in the correct format
var convertedTime = moment(inputFirstTrainTime, "HH:mm").subtract(1, "years");

//current time
var currentTime = moment();

//difference between current time and converted time
var diffTime = moment().diff(moment(convertedTime), "minutes");
console.log("Difference in time: " + diffTime);

//time apart (remainder)

var tRemainder = diffTime % inputFrequency;
console.log("remaining time: " + tRemainder);

//minutes unti train
var tMinutesTillTrain = inputFrequency - tRemainder;
// console.log ("Minutes til Train: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("Arrival time: " + moment(nextTrain).format ("hh:mm"));

nextTrain = nextTrain.format("h:mm a");

// var nextArrival = 0;
// var minutesAway = 0;

var newRow = $("<tr>"). append(
    $("<td>").text(inputTrainName),
    $("<td>").text(inputDestination),
    $("<td>").text(inputFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
);

$("tbody").append(newRow);

});

});
