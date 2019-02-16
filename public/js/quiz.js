// function setMultiChoiceListeners(){

// }

document.addEventListener("DOMContentLoaded",() => {
    let selectable = document.querySelectorAll(".option");
    selectable.forEach((item) => {
        item.addEventListener("click",(event) => {
            console.log(`Selected ${event.target.className}`);
            console.log(event.target);
            item.classList.toggle("selected");
            let input = item.querySelector("input");
            console.log(input);
            if (input.selected) {
                input.selected = false;
            } else {
                input.selected = true;
            }
        })
    })

    let submitButton = document.querySelector(".submit-button");

    submitButton.addEventListener("click",() => {
        console.log("submit button clicked");
        var answerData = {};

        let answerFields = document.querySelectorAll(".question-answer");

        answerFields.forEach(item => {
            let question_id = item.dataset.id;

            console.log(`Working on question ${question_id}`);

            answerData[question_id] = [];
            let answers = item.querySelectorAll(".option");

            answers.forEach(answer => {
                let component = {
                    "selected":(answer.classList.contains("selected")),
                    "text":answer.dataset.text
                };
                console.log(component);
                answerData[question_id].push(component)
            })
        })

        fetch("/courses/quiz",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            body: JSON.stringify(answerData)
        })
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })
    })
})