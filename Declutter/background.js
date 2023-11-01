// constants containing news channel urls
const __ZEE_NEWS__ = "https://zeenews.india.com/"
const __TIMES_OF_INDIA__ = "https://timesofindia.indiatimes.com/"
const __INDIAN_EXPRESS__ = "https://indianexpress.com/"

// runs everytime the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    // create context menu for declutter
    chrome.contextMenus.create({
        id: "declutter",
        title: "Declutter webpage",
        contexts: ["page"]
    })

    // create context menu for restore
    chrome.contextMenus.create({
        id: "restore",
        title: "Restore back webpage",
        contexts: ["page"]
    })
})

// runs every time any context menu is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // info(Object) - contains clicked context menu details
    // tab(Object) - contains current tab details 

    // fetched url of webpage
    const url = info.pageUrl

    // if clicked context menu matches declutter option
    if (info.menuItemId === "declutter") {
        // if url starts with with 'zee news' url
        if (url.startsWith(__ZEE_NEWS__)) {
            // inject zeenews.style.css to current tab
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                files: ['css_rulesets/zeenews.styles.css']
            })
        }
        // if url starts with with 'times of india' url
        else if (url.startsWith(__TIMES_OF_INDIA__)) {
            // inject toi.style.css to current tab
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                files: ['css_rulesets/toi.styles.css']
            })
        }
        // if url starts with with 'indian express' url
        else if (url.startsWith(__INDIAN_EXPRESS__)) {
            // inject toi.style.css to current tab
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                files: ['css_rulesets/ie.styles.css']
            })
        }
    }
    // if clicked context menu matches restore option
    else if (info.menuItemId === "restore") {
        // if url starts with with 'zee news' url
        if (url.startsWith(__ZEE_NEWS__)) {
            // remove zeenews.style.css from current tab
            chrome.scripting.removeCSS({
                target: { tabId: tab.id },
                files: ['css_rulesets/zeenews.styles.css']
            })
        }
        // if url starts with with 'times of india' url
        else if (url.startsWith(__TIMES_OF_INDIA__)) {
            // remove toi.style.css from current tab
            chrome.scripting.removeCSS({
                target: { tabId: tab.id },
                files: ['css_rulesets/toi.styles.css']
            })
        }
        // if url starts with with 'indian express' url
        else if (url.startsWith(__INDIAN_EXPRESS__)) {
            // remove ie.style.css from current tab
            chrome.scripting.removeCSS({
                target: { tabId: tab.id },
                files: ['css_rulesets/ie.styles.css']
            })
        }
    }
})