"use strict";
// main.ts file will help us in creating objects of Person and Student class and calling their methods
Object.defineProperty(exports, "__esModule", { value: true });
//Step 1: importing person and student class from person.ts file
var person_1 = require("../person"); // importing Person and Student class from person.ts file
// Creating an object of Person class
var person1 = new person_1.Person("Alice", 30, "Wonderland University");
console.log(person1.greet());
console.log("Person ID: ".concat(person1.showId()));
console.log("---------------------------");
console.log("Person Counter:", person_1.Person.counter);
// Creating an object of Student class
var student1 = new person_1.Student("Bob", 20, "Builder Institute", ["JavaScript", "TypeScript"]);
console.log(student1.getStudentDetails());
student1.addSkill("React");
student1.display();
console.log("Student ID: ".concat(student1.showId()));
console.log("---------------------------");
console.log("Person Counter after creating Student:", person_1.Person.counter);
