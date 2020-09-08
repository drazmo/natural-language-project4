export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    if (Client.checkForSentence(formText)) {
        console.log("::: Form Submitted :::")
        fetch('http://localhost:8081/analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: formText })
            }).then(res => res.json())
            .then(function(res) {
                let results_start = document.getElementById('results_start')
                let results_agree = document.getElementById('results_agree')
                let results_disagree = document.getElementById('results_disagree')

                results_start.style.display = 'none';
                results_agree.style.display = 'none';
                results_disagree.style.display = 'none';

                if (res.data.agreement === 'DISAGREEMENT') {
                    results_disagree.style.display = 'block';
                } else {
                    results_agree.style.display = 'block';
                }

                document.getElementById('results').innerHTML = res.data.agreement + ' / ' + res.data.irony;
            })
    }
}