chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "LITE"
    })
})

chrome.action.onClicked.addListener(async (tab) => {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'LITE' ? 'DARK' : 'LITE';
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
    });
    if (nextState === 'LITE') {
        chrome.scripting.removeCSS({
            target: { tabId: tab.id },
            files: ['dark.css']
        });
    } 
    else if (nextState === 'DARK') {
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['dark.css']
        });
    }
})