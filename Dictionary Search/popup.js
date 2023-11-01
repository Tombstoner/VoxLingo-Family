document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchButton');
  const wordInput = document.getElementById('wordInput');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', function () {
    const word = wordInput.value;
    if (word) {
      fetchWordData(word);
    }
  });

  function fetchWordData(word) {
    const apiKey = 'c1fcbbc9-76d5-4177-a18f-acb2761aac8a';
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWordData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        resultContainer.innerHTML = 'Error fetching data';
      });
  }

  function displayWordData(data) {
    resultContainer.innerHTML = '';

    if (data.length === 0) {
      resultContainer.innerHTML = 'Word not found';
      return;
    }

    const wordInfo = data[0];
    const wordMeaning = document.createElement('div');
    wordMeaning.classList.add('word-meaning');

    const wordContainer = document.createElement('div');
    wordContainer.classList.add('word-container');

    if (wordInfo.hwi && wordInfo.hwi.prs && wordInfo.hwi.prs[0].sound) {
      const audioButton = document.createElement('button');
      audioButton.classList.add('audio-button');
      audioButton.addEventListener('click', function () {
        playAudio(wordInfo.hwi.prs[0].sound.audio);
      });

      const audioImage = document.createElement('img');
      audioImage.src = 'speaker.png';
      audioImage.width = 16;
      audioImage.height = 16;
      audioImage.alt = 'Play Audio';

      audioButton.appendChild(audioImage);
      wordContainer.appendChild(audioButton);
      wordContainer.appendChild(document.createTextNode('  '));
    }

    const wordElement = document.createElement('strong');
    wordElement.innerText = wordInfo.hwi.hw;
    wordContainer.appendChild(wordElement);

    const colonElement = document.createElement('span');
    colonElement.classList.add('colon');
    colonElement.innerText = ':';
    wordContainer.appendChild(colonElement);

    const meaning = document.createElement('span');
    meaning.classList.add('meaning');
    meaning.innerText = wordInfo.shortdef.join(', ');

    wordMeaning.appendChild(wordContainer);
    wordMeaning.appendChild(meaning);

    resultContainer.appendChild(wordMeaning);

    if (wordInfo.hwi.prs && wordInfo.hwi.prs[0].mw) {
      const phonetic = document.createElement('div');
      phonetic.innerText = `Phonetic: [${wordInfo.hwi.prs[0].mw}]`;
      resultContainer.appendChild(phonetic);
    }
  }

  function playAudio(audioFileName) {
    // Construct the audio URL
    const languageCode = 'en'; // Adjust as needed
    const countryCode = 'us';   // Adjust as needed
    const audioFormat = 'mp3';  // You mentioned that the format is mp3

    // Determine the subdirectory based on the rules you provided
    let subdirectory = '';
    if (audioFileName.startsWith('bix')) {
      subdirectory = 'bix';
    } else if (audioFileName.startsWith('gg')) {
      subdirectory = 'gg';
    } else if (/[0-9_]/.test(audioFileName.charAt(0))) {
      subdirectory = 'number';
    } else {
      subdirectory = audioFileName.charAt(0);
    }

    // Construct the complete audio URL
    const audioUrl = `https://media.merriam-webster.com/audio/prons/${languageCode}/${countryCode}/${audioFormat}/${subdirectory}/${audioFileName}.${audioFormat}`;

    // Create an audio element and play the audio
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'lookupWord') {
      fetchWordData(request.selectedText);
    }
  });
});
