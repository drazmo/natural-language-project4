export function checkForSentence(inputText) {
    if (inputText === '' || inputText.length < 3) {
        alert("That sentence may be too short");
        return false;
    }

    return true;
}