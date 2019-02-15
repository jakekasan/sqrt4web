const fs = require("fs");



var topics = ["Javascript","Python","Data Science","Neural Networks","Decision Trees","Raspberry Pi","History","Maths","Physics","Biology","Geography"]

var topicPrefixes = ["Intro to","Intermediate","Advanced","Expert","Industry uses for","A project using","Lessons about","A history in"]

var sentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Donec nec lectus id est feugiat consequat.",
    "Praesent nibh dui, tempor eu bibendum non, vulputate eu purus.",
    "Ut enim velit, lacinia finibus faucibus sit amet, tempor id purus.",
    "Suspendisse vitae faucibus tortor.",
    "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    "Donec justo ex, maximus id bibendum a, bibendum vitae diam.",
    "Donec malesuada pretium eros, finibus blandit neque pharetra eget.",
    "Aliquam semper, enim vel laoreet finibus, mauris dui aliquet tortor, mollis feugiat lectus mauris vitae velit.",
    "Pellentesque feugiat volutpat risus, quis viverra turpis luctus in.",
    "Aenean id tortor eleifend, iaculis sem vitae, convallis nisl.",
    "Proin venenatis mi sapien, nec sagittis diam suscipit sed.",
    "Ut egestas nibh pellentesque lorem sagittis, id gravida nibh imperdiet.",
    "Cras justo justo, accumsan id purus sed, viverra porttitor turpis.",
    "Aenean vestibulum aliquet augue, et pretium est rhoncus nec.",
    "Aenean rhoncus elementum justo sit amet lacinia.",
    "Suspendisse ac risus convallis, mollis orci ac, commodo dolor.",
    "Nulla egestas egestas lectus, non elementum velit fringilla ac."
]

function GetLessonTitle() {
    return topicPrefixes[Math.floor(Math.random()*topicPrefixes.length)] + " " + topics[Math.floor(Math.random()*topics.length)]
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function* GetOneSentence(){
    var data = shuffle(sentences);
    let count = 0;
    while (count < data.length){
        let sentence = data[count];
        if (count == data.length - 1){
            count = 0;
            data = shuffle(data);
        } else {
            count++;
        }
        yield sentence
    }
}

const sentenceGenerator = GetOneSentence();

function GetSentences(numOfSentences) {
    let text = "";
    for (let a of Array(numOfSentences)){
        let nextSentence = sentenceGenerator.next().value + " ";
        text = text.concat(nextSentence);
    }
    console.log(text.toString());
    return text
}

function randRange(start,end){
    return Math.max(start,Math.ceil(Math.random()*end))
}

function generateSubmodule(submoduleNumber){
    return {
        "id":submoduleNumber,
        "title":GetSentences(1),
        "text":Array(randRange(1,3)).fill(0).map(item => GetSentences(1))
    }
}

function generateSubmodules(){
    let submodules = [];
    let submoduleNumber = 1;
    for (let i of Array(randRange(1,3))){
        submodules.push(generateSubmodule(submoduleNumber));
        submoduleNumber++;
    }
    return submodules
}

function generateModule(moduleNumber){
    return {
        "id":moduleNumber,
        "title": GetSentences(1),
        "submodules": generateSubmodules(),
        "minutes":randRange(1,15)
    }

}

function generateModules(){
    let modules = [];
    moduleNumber = 1;

    for (let i of Array(Math.max(4,Math.floor(Math.random()*12)))){
        modules.push(generateModule(moduleNumber));
        moduleNumber++;
    }

    return modules
}

function generateLesson(fullTitle,lessonNumber) {
    return {
        "title":fullTitle,
        "lessonNumber":lessonNumber,
        "id":lessonNumber,
        "desc":GetSentences(1),
        "fullDesc":GetSentences(4),
        "modules":generateModules()
    }
}

function generateLessons(topic,start = 0){
    let lessons = []
    let lessonNumber = start;

    for (let prefix of topicPrefixes){
        let fullTitle = prefix + " " + topic;
        lessons.push(generateLesson(fullTitle,lessonNumber));
        lessonNumber++;
    }
    return lessons
}

// console.log(generateLessons("3D Print"))

data = []

data = data.concat(generateLessons("3D Printing",2))

for (let topic of topics){
    data = data.concat(generateLessons(topic,data.length))
}


fs.writeFile("results.json",JSON.stringify(data,null,2),(err) => {
    if (err) {
        console.log(err);
    }
})



