// This function updates the rules for blocking websites.
function updateBlockedSites(blockedSites) {
    // First, we clear all existing rules.
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1] // You can specify more IDs if you have more rules.
    }, () => {
      // After removing the rules, we add new rules based on the blockedSites array.
      const newRules = blockedSites.map((site, index) => ({
        id: index + 1, // Rule IDs should be unique.
        priority: 1,
        action: {
          type: 'block'
        },
        condition: {
          urlFilter: `*://*.${site}/*`, // This will match all subdomains and paths for the site.
          resourceTypes: ['main_frame']
        }
      }));
  
      // Add new rules to block the specified websites.
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: newRules
      });
    });
  }
  
  // Listen for messages from popup.js
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateBlockedList') {
      updateBlockedSites(message.sites);
    }
  });
  