let blockedSites = []; // This will hold the domains of sites to block

// Function to check if a URL is in the blocked sites list
function isSiteBlocked(url) {
  return blockedSites.some(domain => url.includes(domain));
}

// Listen for web requests and block them if necessary
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return { cancel: isSiteBlocked(details.url) };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Listen for messages from the popup script to update the blocked sites
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'updateBlockedList') {
      blockedSites = request.sites;
    }
  }
);
