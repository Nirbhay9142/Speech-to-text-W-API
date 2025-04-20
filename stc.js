const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let isRecording = false;
const playButton = document.getElementById("playButton");
const textArea = document.getElementById("text");

function initializeRecognition() {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .slice(event.resultIndex)
            .map(result => result[0].transcript)
            .join('');
        textArea.value = transcript;
        saveTextToBackend(transcript);
    };

    recognition.onend = () => {
        if (isRecording) {
            playButton.src = "mic.png";
            isRecording = false;
        }
    };

    recognition.onerror = (event) => {
        console.error('Error:', event.error);
        playButton.src = "mic.png";
        isRecording = false;
    };
}

playButton.addEventListener('click', () => {
    if (isRecording) {
        // Force immediate stop
        recognition.abort();
        playButton.src = "mic.png";
        isRecording = false;
    } else {
        // Create fresh recognition instance
        initializeRecognition();
        recognition.start();
        playButton.src = "stop.png";
        isRecording = true;
    }
});

// Rest of your code (saveTextToBackend function) remains same