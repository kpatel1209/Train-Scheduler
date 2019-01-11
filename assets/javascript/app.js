// Initialize Firebase
let config = {
    apiKey: "AIzaSyBm8IQAYI-s_L8G7jowcwmUKUsSGxhaWH8",
    authDomain: "gt-bootcamp-d9916.firebaseapp.com",
    databaseURL: "https://gt-bootcamp-d9916.firebaseio.com",
    projectId: "gt-bootcamp-d9916",
    storageBucket: "gt-bootcamp-d9916.appspot.com",
    messagingSenderId: "325409057571"
  };
  firebase.initializeApp(config);

// Database variable
let database = firebase.database();

// On click function to submit new train schedule
$("#submit-train-btn").on("click", function(event){
    event.preventDefault();

    // Store user input into variables
    let trainName = $("#train-name").val().trim();
    let trainDestination = $("#train-destination").val().trim();
    let trainFirstTime = $("#train-first-time").val().trim();
    let trainFrequency = $("#train-frequency").val().trim();

    // Temporary object for the new train data
    let newTrainData = {
        name: trainName,
        destination: trainDestination,
        firstTime: trainFirstTime,
        frequency: trainFrequency
    };

    // Push the new tran data into Firebase
    database.ref().push(newTrainData);

    console.log(newTrainData.name);
    console.log(newTrainData.destination);
    console.log(newTrainData.firstTime);
    console.log(newTrainData.frequency);

    // Clear the values from the form after submitting new train data
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-first-time").val("");
    $("#train-frequency").val("");
});

// Function for Firebase to add the new data to the current train schedule table on the html page
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

    // Variables to store snapshots
    let trainName = childSnapshot.val().name;
    let trainDestination = childSnapshot.val().destination;
    let firstTrainTime = childSnapshot.val().firstTime;
    let trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    // Use moment.js to calculate Next Arrival and Minutes Away
    // The first train time needs to be after the current time
    let convertFirstTrainTime = moment(firstTrainTime, "hh:mm a").subtract(1, "years");

    // Variable for current time
    let nowTime = moment().format("hh:mm a");
    console.log("Current Time: " + nowTime);

    // Variable for the difference between nowTime and firstTrainTime
    let timeDifference = moment().diff(moment(convertFirstTrainTime), "minutes");

    // Variable for remaining time
    let timeRemaining = timeDifference % trainFrequency;

    // Variable for minutes until the next train arrival
    let minutesAway = trainFrequency - timeRemaining;

    // Variable for the next train arrival
    let nextTrainArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

    // This to allow the new train data to appear under the Current Train Schedule table on the html page
    $("#current-train-schedule > tbody").append("<tr><td>" + 
        trainName + "</td><td>" + 
        trainDestination + "</td><td>" + 
        trainFrequency + "</td><td>" + 
        nextTrainArrival + "</td><td>" + 
        minutesAway + "</td></tr>");
});