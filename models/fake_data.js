let records = [
    {
        id:0,
        type:"STUDENT",
        name:"Bart Simpson",
        address:"Springfield",
        projects:[]
    },
    {
        id:1,
        type:"STUDENT",
        name:"Ned Flanders",
        address:"Springfield",
        projects:[]
    },
    {
        id:2,
        type:"STUDENT",
        name:"Homer Simpson",
        address:"Springfield",
        projects:[]
    },
    {
        id:3,
        type:"STUDENT",
        name:"Lisa Simpson",
        address:"Springfield",
        projects:[]
    },
    {
        id:4,
        type:"STUDENT",
        name: "Gob Bluth",
        address:"Orange County",
        projects:[]
    },
    {
        id:5,
        type:"STUDENT",
        name: "George Michael Bluth",
        address:"Orange County",
        projects:[]
    },
    {
        id:6,
        type:"STUDENT",
        name: "Darth Vader",
        address:"Death Star",
        projects:[]
    },
    {
        id:7,
        type:"STUDENT",
        name: "Luke Skywalker",
        address: "Tatooine",
        projects:[]
    },
    {
        id:8,
        type:"EDUCATOR",
        name: "Dominik Schreier",
        address: "Prostejov"
    },
    {
        id:9,
        type:"EDUCATOR",
        name:"Jakub Kasan",
        address:"Scotland"
    },
    {
        id:10,
        type:"COURSE",
        title:"3D Printing",
        authors:[8],
        workshops:[12,13,14]
    },
    {
        id:11,
        type:"COURSE",
        title:"Programming",
        authors:[9],
        workshops:[15,16,17,18]
    },
    {
        id:12,
        type:"WORKSHOP",
        title:"3D Printer Basics",
        students:[1,2,3],
        resources:[],
        projects:[],
        sponsors:[21],
        author:[8]
    },
    {
        id:13,
        type:"WORKSHOP",
        title:"3D Printer Advanced",
        students:[1,2,3],
        resources:[],
        projects:[],
        sponsors:[21],
        author:[8]
    },
    {
        id:14,
        type:"WORKSHOP",
        title:"Making 3D Engines",
        students:[1,2,3],
        resources:[],
        projects:[24],
        sponsors:[21],
        author:[8]
    },
    {
        id:15,
        type:"WORKSHOP",
        title:"Programming Basics",
        students:[4,5],
        resources:[],
        projects:[],
        sponsors:[],
        author:[9]
    },
    {
        id:16,
        type:"WORKSHOP",
        title:"Programming Advanced",
        students:[4,5],
        resources:[],
        projects:[],
        sponsors:[],
        author:[9]
    },
    {
        id:17,
        type:"WORKSHOP",
        title:"Programming a Web Server",
        students:[4,5],
        resources:[],
        projects:[25],
        sponsors:[20],
        author:[9]
    },
    {
        id:18,
        type:"WORKSHOP",
        title:"Using a Raspberry Pi to control a Prusa Mk3",
        students:[6,7],
        resources:[],
        projects:[],
        sponsors:[],
        author:[8,9]
    },
    {
        id:20,
        type:"SPONSOR",
        name:"Google",
        address:"Mountain View",
        sponsored:[25]
    },
    {
        id:21,
        type:"SPONSOR",
        name:"Prusa",
        address:"Prague",
        sponsored:[12,13,14,26],
    },
    {
        id:22,
        type:"SPONSOR",
        name:"Raspberry Pi Foundation",
        address:"England",
        sponsored:[26]
    },
    {
        id:23,
        type:"SPONSOR",
        name:"BMW",
        address:"Bavaria",
        sponsored:[24]
    },
    {
        id:24,
        type:"PROJECT",
        name:"Working 3D Engine",
        description:"",
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
    }


]

module.exports = records;