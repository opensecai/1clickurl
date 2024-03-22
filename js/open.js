document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("generateButton").addEventListener("click", generateURL);
   
    document.getElementById("resetButton").addEventListener("click", resetFields);
});

function generateURL() {
    const listTextarea = document.getElementById('list');
    const idsInput = document.getElementById('idsInput').value;
    const urlInput = document.getElementById('urlInput').value;
    
    const idsArray = idsInput.split(' ');
    const generatedURLs = idsArray.map(id => `${urlInput}${id}`).join('\n');
    
    listTextarea.value = generatedURLs; // Set generated URLs in the textarea
}

function resetFields() {
    document.getElementById('idsInput').value = '';
    
    document.getElementById('list').value = ''; // Clear the textarea
}
