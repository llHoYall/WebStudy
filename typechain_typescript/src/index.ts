const name = "HoYa",
age = 37,
gender = "male"

// Optional arguments
const sayHi = (name, age, gender?) => {
    console.log(`Hello ${name}, ${age}, ${gender}`)
}
sayHi(name, age)

// Types arguments & return
const sayHi2 = (name: string, age: number, gender: string): string => {
    return `Hello ${name}, ${age}, ${gender}`;
}
console.log(sayHi2("HoYa", 38, "male"))

export {}