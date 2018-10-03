// Global Variables
//  ============================================
// Arrays and Variables for initiating Data

  var config = {
    apiKey: "AIzaSyAkmFlUFGy0-4IGMPwJLrxj1WXRpKB7Wew",
    authDomain: "solrtraintime.firebaseapp.com",
    databaseURL: "https://solrtraintime.firebaseio.com",
    projectId: "solrtraintime",
    storageBucket: "solrtraintime.appspot.com",
    messagingSenderId: "437146723407"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Functions
//  ============================================
  $('#trainSubmit').on('click', function(event) {
    event.preventDefault();
    
    var trainName = $('#trainName-input').val().trim();
    var trainDest = $('#trainDestination-input').val().trim();
    var trainTime = moment($('#trainTime-input').val().trim(), "hh:mm a").format('HH mm');
    var trainFreq = $('#trainFreq-input').val().trim();
    

    console.log(trainTime)

    var  newTrain = {
      name: trainName,
      dest: trainDest,
      time: trainTime,
      freq: trainFreq
    };
    
    database.ref().push(newTrain);
    
    $('#trainName-input').val("");
    $('#trainDestination-input').val("");
    $('#trainTime-input').val("");
    $('#trainFreq-input').val("");
  });
  
  database.ref().on("child_added", function(trainSnapshot) {
    
    var trainName = trainSnapshot.val().name;
    var trainDest = trainSnapshot.val().dest;
    var trainTime = trainSnapshot.val().time;
    var trainFreq = trainSnapshot.val().freq;
    
  var trainRemainingTime = moment().diff(moment.unix(trainTime, "X"), "hours");
  var trainArrival = trainRemainingTime - trainFreq;
  console.log(trainArrival);

    var trainRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(trainTime),
      $("<td>").text(trainArrival)
    );
    $("#tableTrain > tbody").append(trainRow);
      
      
    }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
    
    
    // Testing / Debugging
    
    
    // Main Process
    //  ============================================

