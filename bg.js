function onRequest(request, sender, sendResponse) {
  var response = {}
  if (sender.tab && request.action == 'activate') {
      chrome.pageAction.show(sender.tab.id);
  }
  sendResponse(response);
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
