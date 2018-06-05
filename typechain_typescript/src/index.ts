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

export {}