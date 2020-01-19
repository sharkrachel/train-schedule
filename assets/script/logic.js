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
        event.preventDefault();
        database.ref().push({
            trainName: $(".train-name").val(),
            destination: $(".destination").val(),
            firstTrainTime: $(".first-time").val(),
            frequency: $(".frequency").val()
        });


    })

});
