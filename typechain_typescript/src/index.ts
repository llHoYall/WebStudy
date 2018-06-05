// Optional arguments
const name = "HoYa",
age = 36,
gender = "male"

const sayHi = (name, age, gender?) => {
    console.log(`Hello ${name}, ${age}, ${gender}`)
}
sayHi(name, age)

// Types arguments & return
const sayHi2 = (name: string, age: number, gender: string): string => {
    return `Hello ${name}, ${age}, ${gender}`;
}
console.log(sayHi2("HoYa", 37, "male"))

// Interfaces
interface Human {
    name: string;
    age: number;
    gender: string;
}

const person = {
    name: "HoYa",
    age: 38,
    gender: "male"
};

const sayHi3 = (person: Human): string => {
    return `Hello ${person.name}, ${person.age}, ${person.gender}`;
}
console.log(sayHi3(person))

// Class
class Human {
    public name: string;
    public age: number;
    public gender: string;
    constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const hoya = new Human("HoYa", 36, "male")

const sayHi4 = (person: Human): string => {
    return `Hello ${person.name}, ${person.age}, ${person.gender}`;
}
console.log(sayHi4(hoya))

export {}