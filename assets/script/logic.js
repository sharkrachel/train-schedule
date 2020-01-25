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

    // create empty array that will hold input data (this is for the reload every  //one minute)
    var trainData = [];

    // user inputs train information
    // next arrival time is calculated using moment.js
    // minutes away is calculated using moment.js
    // train information is sent to firebase
    // train information is added to table from firebase

    //on click function that will send form input information to firebase
    $("#submit").on("click", function (event) {
        //prevents page from refreshing when button is pushed
        event.preventDefault();
        //pushes input data to firebase
        database.ref().push({
            trainName: $(".train-name").val(),
            destination: $(".destination").val(),
            firstTrainTime: $(".first-time").val(),
            frequency: $(".frequency").val()
        });
        //this empties out the imput information on the form
        $(".train-name").val("");
        $(".destination").val("");
        $(".first-time").val("");
        $(".frequency").val("");

    });

    database.ref().on("child_added", function (snapshot) {
        var inputTrainName = snapshot.val().trainName;
        var inputDestination = snapshot.val().destination;
        var inputFrequency = snapshot.val().frequency;
        var inputFirstTrainTime = snapshot.val().firstTrainTime;

        //converts current time to last year
        var convertedTime = moment(inputFirstTrainTime, "HH:mm").subtract(1, "years");

        //current time
        var currentTime = moment();


        //difference between current time and converted time
        var diffTime = moment().diff(moment(convertedTime), "minutes");
        // console.log("Difference in time: " + diffTime);

        //time apart (remainder)
        var tRemainder = diffTime % inputFrequency;
        // console.log("remaining time: " + tRemainder);

        //minutes unti train
        var tMinutesTillTrain = inputFrequency - tRemainder;
        // console.log ("Minutes til Train: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("Arrival time: " + moment(nextTrain).format ("hh:mm"));

        //sets the format of the next train
        nextTrain = nextTrain.format("h:mm a");

        // display data to webpage
        var newRow = $("<tr>").append(
            $("<td>").text(inputTrainName),
            $("<td>").text(inputDestination),
            $("<td>").text(inputFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain)
        );
        $("tbody").append(newRow);
        // this pushes all new data to the train data array (which I use to prevent the same date being displayed on the webpage every minute)
        trainData.push({
            inputTrainName: snapshot.val().trainName,
            inputDestination: snapshot.val().destination,
            inputFrequency: snapshot.val().frequency,
            inputFirstTrainTime: snapshot.val().firstTrainTime
        })
    })

    // this function updates the webpage table
    function updateDisplay() {
        // empties out the previously added data from the tbody element
        $("tbody").empty();

        // for loop to loop through the array of data. This will be displayed to the webpage every minute later on.
        for (let index = 0; index < trainData.length; index++) {
            var inputTrainName = trainData[index].inputTrainName;
            var inputDestination = trainData[index].inputDestination;
            var inputFrequency = trainData[index].inputFrequency;
            var inputFirstTrainTime = trainData[index].inputFirstTrainTime;
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

            var newRow = $("<tr>").append(
                $("<td>").text(inputTrainName),
                $("<td>").text(inputDestination),
                $("<td>").text(inputFrequency),
                $("<td>").text(nextTrain),
                $("<td>").text(tMinutesTillTrain)
            );

            $("tbody").append(newRow);

        }
    }
    //this updates the page every minute with new information, so that the time until next train is accurate. 
    setInterval(updateDisplay, 60000);
});
