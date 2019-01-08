$(document).ready(function(){

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

  // Variable to reference the database
  let database = firebase.database();
  
  // Click event for adding new train to schedule
  $("#addTrain").on("click", function(event){
        event.preventDefault();

        // Receive user input and store the data inside variables
        let trainName = $("#train-name").val().trim()
        let destination = $("#destination").val().trim()
        let firstTrainTime = $("#first-train-time").val().trim()
        let frequency = $("#frequency").val().trim()  
                
        // Object for holding new train data
        let submitTrain = {
            trainName: trainName,
            destination: destination,
            trainTime: firstTrainTime,
            frequency: frequency
        }

        // Pushes new train data to the database
        database.ref().push(submitTrain);

        console.log(submitTrain.trainName);
        console.log(submitTrain.destination);
        console.log(submitTrain.firstTrainTime);
        console.log(submitTrain.frequency);

        // Removes text from text boxes
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");
  });

    // Firebase event for adding new train schedules to the database and a row in the html page when a user adds an entry
    database.ref().on("child_added", function(childSnapshot){
        let trainData = childSnapshot.val();
        let trainNames = trainData.trainName;
        let trainFrequency = trainData.frequency;
        let trainDestination = trainData.destination;
        let firstTrain = trainData.trainTime;

        // Calculate the minutes until arrival
        let remainderTrain = moment().diff(moment.unix(firstTrain), "minutes") % trainFrequency;
        let minutesTrain = trainFrequency - remainderTrain;

        // Calculate the arrival time, add the minutesTime to the current time
        let arrivalTrain = moment().add(minutesTrain, "m").format("hh:mm");

        // Add the data for each train into the table on the html page
        $("#newTrain").append(
                "<tr><td>" + trainNames + 
                "</td><td>" + trainDestination + 
                "</td><td>" + trainFrequency + 
                "</td><td>" + arrivalTrain + 
                "</td><td>" + minutesTrain + 
                "</td></tr>")
    
});

















});