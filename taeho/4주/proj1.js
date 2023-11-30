let power = (number, num2 = 2) => {
    return number ** num2;
}

let multiply = (...nums) => {
return nums.reduce((acc, num) => acc * num, 1);
}

let book = {
    title: "Nature of Code",
    price: 30000,
    author: "Daniel Shiffman",
    ISBN: "978-89-6848-190-1",
    page: 620
}


function Zerg(minerals, gas, supply){
    this.minerals = minerals;
    this.gas = gas;
    this.supply = supply;

    this.print = function(){
        console.log(`minerals: ${this.minerals}, gas: ${this.gas}, supply: ${this.supply}`);
    }
}

let queen = new Zerg(150, 0, 2);
let drone = new Zerg(50, 0, 1);
let roach = new Zerg(75, 25, 2);

let zergs = [queen, drone, roach];

for (let zerg of zergs){
    zerg.print();
}

let whoamI = {
    name: "taeho",
    age: 25,
    gender: "male",
    isHandsome: true,
    favMovies: ["Along the gods", "LOTR", "Oldboy"],
    favFood: [
        {
            name: "Kimchi",
            fatty: false
        },
        {
            name: "Cheese burger",
            fatty: true
        }
    ]
}
