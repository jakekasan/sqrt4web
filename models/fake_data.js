let records = [
    {
        id:0,
        type:"STUDENT",
        name:"Bart Simpson",
        description:"Springfield",
        projects:[]
    },
    {
        id:1,
        type:"STUDENT",
        name:"Ned Flanders",
        description:"Springfield",
        projects:[]
    },
    {
        id:2,
        type:"STUDENT",
        name:"Homer Simpson",
        description:"Springfield",
        projects:[]
    },
    {
        id:3,
        type:"STUDENT",
        name:"Lisa Simpson",
        description:"Springfield",
        projects:[]
    },
    {
        id:4,
        type:"STUDENT",
        name: "Gob Bluth",
        description:"Orange County",
        projects:[]
    },
    {
        id:5,
        type:"STUDENT",
        name: "George Michael Bluth",
        description:"Orange County",
        projects:[]
    },
    {
        id:6,
        type:"STUDENT",
        name: "Darth Vader",
        description:"Death Star",
        projects:[]
    },
    {
        id:7,
        type:"STUDENT",
        name: "Luke Skywalker",
        description: "Tatooine",
        projects:[]
    },
    {
        id:8,
        type:"EDUCATOR",
        name: "Dominik Schreier",
        description: "Prostejov"
    },
    {
        id:9,
        type:"EDUCATOR",
        name:"Jakub Kasan",
        description:"Scotland"
    },
    {
        id:10,
        type:"COURSE",
        name:"3D Printing",
        description:"Learn the basics about 3D printing using Prusa Mk3 printers!",
        authors:[8],
        workshops:[12,13,14]
    },
    {
        id:11,
        type:"COURSE",
        name:"Programming",
        description:"In this course, students will learn how to program in python and javascript. They will start with basic 'hello world' programs and then move to more complicated tasks like I/O and networking.",
        authors:[9],
        workshops:[15,16,17,18]
    },
    {
        id:12,
        type:"WORKSHOP",
        name:"3D Printer Basics",
        description:"In this workshop, students will cover the basics of working with a Prusa Mk3. This includes basic maintenance, calibration as well as the different fillaments and their pro's and con's.",
        students:[1,2,3],
        resources:[27],
        projects:[],
        sponsors:[21],
        author:[8]
    },
    {
        id:13,
        type:"WORKSHOP",
        name:"3D Printer Advanced",
        description:"In this workshop, students will build upon the knowledge they already have and learn about prototyping. They will learn how to split objects into ideal segments for printing.",
        students:[1,2,3],
        resources:[27],
        projects:[],
        sponsors:[21],
        author:[8]
    },
    {
        id:14,
        type:"WORKSHOP",
        name:"Making 3D Engines",
        description:"Here students will learn how to print all the sections of a working internal combustion engine and attach them together using magnets. (Project associated with this)",
        students:[1,2,3],
        resources:[27],
        projects:[24],
        sponsors:[21],
        author:[8]
    },
    {
        id:15,
        type:"WORKSHOP",
        name:"Programming Basics",
        students:[4,5],
        resources:[],
        projects:[],
        sponsors:[],
        author:[9]
    },
    {
        id:16,
        type:"WORKSHOP",
        name:"Programming Advanced",
        students:[4,5],
        resources:[],
        projects:[],
        sponsors:[],
        author:[9]
    },
    {
        id:17,
        type:"WORKSHOP",
        name:"Programming a Web Server",
        description:"In this workshop, students learn to create a web server in javascript. Students will learn routing, static content delivery and html templating, which will enable them to create a simple website from scratch.",
        students:[4,5],
        resources:[],
        projects:[25],
        sponsors:[20],
        author:[9]
    },
    {
        id:18,
        type:"WORKSHOP",
        name:"Using a Raspberry Pi to control a Prusa Mk3",
        description:"This workshop teaches students how to control a Prusa Mk3 printer with a raspberry pi. ",
        students:[6,7],
        resources:[27,28],
        projects:[],
        sponsors:[],
        author:[8,9]
    },
    {
        id:20,
        type:"SPONSOR",
        name:"Google",
        description:"A tech company specializing in finding stuff online. Based in Silicon Valley",
        sponsored:[25]
    },
    {
        id:21,
        type:"SPONSOR",
        name:"Prusa",
        description:"Maker of 3D printers, based in Holesovice, Prague",
        sponsored:[12,13,14,26],
    },
    {
        id:22,
        type:"SPONSOR",
        name:"Raspberry Pi Foundation",
        description:"Small DIY electronics manufacturer based in the UK",
        sponsored:[26]
    },
    {
        id:23,
        type:"SPONSOR",
        name:"BMW",
        description:"Car manufacturer based in Bavaria, Germany",
        sponsored:[24]
    },
    {
        id:24,
        type:"PROJECT",
        name:"Working 3D Engine",
        description:"A working internal combustion engine printed with a 3D printer and assembled with magnets",
        sponsor:[23],
        participants:[1,2,3]
    },
    {
        id:25,
        type:"PROJECT",
        name:"NodeJS Web Server",
        description:"",
        sponsor:[20],
        participants:[4,5]
    },
    {
        id:26,
        type:"PROJECT",
        name:"RPi Prusa Controller",
        description:"",
        sponsors:[21,22],
        participants:[6]
    },
    {
        id:27,
        type:"RESOURCE",
        name:"Prusa Mk3 3D Printer",
        description:"A 3d printer on loan from Prusa, s.r.o.",
        owner:[21]
    },
    {
        id:28,
        type:"RESOURCE",
        name:"Raspberry Pi",
        description:"A RPi 3 provided by one of the course instructors",
        owner:[9]
    }


]

module.exports = records;