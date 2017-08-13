/* initialise variables */
var Videos = {
  getData: function() {
    return $.getJSON('http://localhost:3000/videos');
  },
  insert: function (data) {
    //return $.post('/videos', data);
    return $.ajax({
      url: 'http://localhost:3000/videos',
      type: 'POST',
      dataType: "json",
      data: data,
    });
  },

  delete: function () {
   return $.ajax({url: 'http://localhost:3000/videos', type: 'DELETE'});
 }
};


var addBtn = document.getElementById('add-btn');
var frameOptions=document.getElementById('options_frame');
var frameTail= document.getElementById('tail_frame');
var cancelBtn = document.getElementById('cancel-btn');
var tableTails = document.getElementById('table-tails');
var donwloadBtn = document.getElementById('download-btn');
var showBtn = document.getElementById("open_tag");
console.log(showBtn);
var moreTag = document.getElementById('more_tag');
var clearBtn =document.getElementById('clear_tag');

var keyAPI = 'AIzaSyDDJjvq0etG9FtJF2WpAezoHz31yjEgtKQ';
var isChrome = !!window.chrome;
var state = 'In Queue';

/*  add event listeners to buttons */
moreTag.addEventListener('click', switchDisplay);


/* add link to queue */
donwloadBtn.onclick = function(){
  downloadVideo();
}

function downloadVideo() {
    chrome.tabs.query({
      active: true, 
      currentWindow: true},
      function(arrayOfTabs) {
         var activeTab = arrayOfTabs[0];
         var url = activeTab.url; // or do whatever you need
         var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
         if(videoid != null) {
          var name =arrayOfTabs[0].title;
          var url= arrayOfTabs[0].url;
          Videos.insert({url:url,name:name,state:state}).done(initialize);

     }   else { 
          alert("The url is not valid.");
    }
  });
}

showBtn.onclick = function() {
  if (isChrome) {
    chrome.downloads.showDefaultFolder();
  }
  else{
  browser.downloads.showDefaultFolder();
 }
 
}

clearBtn.onclick = function() {
  Videos.delete().done(initialize);
  alert('Cleaned!');
}


/* generic error handler */
function onError(error) {
  console.log(error);
}

function hide() {
  console.log(error);
}

function display(error) {
  console.log(error);
}


$(document).ready(function() {
  initialize();
});



var initialize = function() {
  var table = $('#table-tails');
  table.empty();
  Videos.getData().done(function(json) {
    json.videos.forEach(function(video) {
      
      table.append(
      '<div>'+
        '<div class="row w3-row between w3-border">'+
        '<div id="myQueue" class="w3-col m12 column">'+
          '<label class="w3-small w3-text-black" id="video-title">'+video.name+'</label>'+
          '<label class="w3-tiny w3-text-gray" id="video-State">'+video.state+'</label>'+
        '</div>'+
        '</div>'+
    '</div>');
    });

  });
}


function switchDisplay() {
  if(frameOptions.classList.contains("hide")){
      //frameTail.classList.add("hide");
      frameOptions.classList.remove("hide");
      moreTag.text = "Hide";
    }
    else{
      //frameTail.classList.remove("hide");
      frameOptions.classList.add("hide");
      moreTag.text = "Options";
    }
  }




 
