function uploadFile() {
    let input = document.getElementById('fileUploader');
    if (input.files.length == 0) {
        alert("No file selected.");
        return;
    }
    let file = input.files[0];
    let formData = new FormData();
    formData.append('file', file);

    fetch('https://share.streamlit.io/yourusername/yourrepo/app.py/upload', {  // Change URL to your Streamlit app
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert("File uploaded and processed successfully.");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error uploading file.");
    });
}

function askQuestion() {
    let question = document.getElementById('userQuestion').value;
    if (!question) {
        alert("Please type a question.");
        return;
    }

    fetch('https://share.streamlit.io/yourusername/yourrepo/app.py/ask', {  // Change URL to your Streamlit app
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.answer;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error processing question.");
    });
}
