const name = "HoYa",
age = 37,
gender = "male"

// Optional arguments
const sayHi = (name, age, gender?) => {
    console.log(`Hello ${name}, ${age}, ${gender}`)
}
sayHi(name, age)

export {}