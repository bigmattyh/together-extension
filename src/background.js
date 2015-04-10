const LOGGING       = false;

const ICON_ACTIVE   = "icons/icon_active.png";
const ICON_INACTIVE = "icons/icon_inactive.png";

//////////////////////

var content_port, popup_port, tab, tabTitle, tabURL;
const bA = chrome.browserAction;

bA.setIcon({path:ICON_INACTIVE});

//////////////////////

function onPopupOpen()
{
  log("Popup opened.");
  bA.setIcon({path:ICON_ACTIVE});

  popup_port.onMessage.addListener(onPopupMessage);
  popup_port.onDisconnect.addListener(onPopupClose);

  chrome.tabs.getSelected(function(t) { tab = t; });
}

function onPopupClose(m)
{
  log("Popup closed.");
  bA.setIcon({path:ICON_INACTIVE});
}

function onPopupMessage(m)
{

}
function onContentMessage(m)
{

}

//////////////////////////

chrome.runtime.onConnect.addListener(function(port)
{
  if (port.name == "popup")
  {
    popup_port = port;
    onPopupOpen();
  }
  else
  if (port.name == "content")
  {
    content_port = port;
    content_port.onMessage.addListener(onContentMessage);
  }
});

// Logging
function log() { if (!LOGGING) return; for (var i = 0; i < arguments.length; i++) { console.log(arguments[i]) } }
