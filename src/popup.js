var background = chrome.extension.getBackgroundPage();
var log = background.log;

/////////////////////

var port;

function onMessage() {

}

function add_to_together(kind)
{
    var tab = background.tab;
    var together_URL =  "x-together://AddItem?kind=" + kind;
        together_URL += "&name=" + encodeURIComponent(tab.title);
        together_URL += "&url="  + encodeURIComponent(tab.url);
    document.getElementById('url_router').src = together_URL;
}

/////////////////////

document.addEventListener('DOMContentLoaded', function(e)
{
  port = chrome.runtime.connect({name: "popup"});
  port.onMessage.addListener(onMessage);

  document.getElementById('together_pdf').addEventListener('click', function() {
    add_to_together("WebPDF");
  });

  document.getElementById('together_bookmark').addEventListener('click', function() {
    add_to_together("Bookmark");
  });

  document.getElementById('together_web').addEventListener('click', function() {
    add_to_together("WebArchive");
  });
}
);
