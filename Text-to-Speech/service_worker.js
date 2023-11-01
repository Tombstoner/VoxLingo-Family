function setupContextMenu() {
    chrome.contextMenus.create({
        id: "speak-text",
        contexts: ["selection"],
        title: "Speak highlighted text"
    })

    chrome.contextMenus.create({
        id: "enq-text",
        contexts: ["selection"],
        title: "Speak highlighted text(Queue Mode)"
    })

    chrome.contextMenus.create({
        id: "pause-speak",
        contexts: ["page", "selection"],
        title: "Pause speaking"
    })

    chrome.contextMenus.create({
        id: "resume-speak",
        contexts: ["page", "selection"],
        title: "Resume speaking"
    })

    chrome.contextMenus.create({
        id: "stop-speak",
        contexts: ["page", "selection"],
        title: "Stop speaking"
    })
}

chrome.runtime.onInstalled.addListener(() => {
    setupContextMenu()
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "speak-text") {
        const highlightedText = info.selectionText

        chrome.tts.speak(highlightedText, { "lang": "hi-IN" });
        setInterval(() => { 
            chrome.tts.pause()
            chrome.tts.resume()
        }, 5000);
    }
    else if (info.menuItemId === "enq-text") {
        const highlightedText = info.selectionText;

        chrome.tts.speak(highlightedText, { "enqueue": true, "lang": "hi-IN" });
        setInterval(() => { 
            chrome.tts.pause()
            chrome.tts.resume()
        }, 5000);
    }
    else if (info.menuItemId === "pause-speak") {
        chrome.tts.pause()
    }
    else if (info.menuItemId === "resume-speak") {
        chrome.tts.resume()
    }
    else if (info.menuItemId === "stop-speak") {
        chrome.tts.stop()
    }
});