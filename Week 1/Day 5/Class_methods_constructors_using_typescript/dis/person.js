"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.Person = void 0;
// This file will have person class and Student implementation with constructor and methods  
// here we are using export before class so that this class can be imported in other files
var Person = /** @class */ (function () {
    // We are defining constructor to initialize the properties of the class
    function Person(name, age, institute) {
        this.name = name;
        this.age = age;
        this.institute = institute;
        this.id = ++Person.counter;
    }
    // method to greet whcih can be accessed publicly via object of the class
    Person.prototype.greet = function () {
        return "Hello, my name is ".concat(this.name, ", I am ").concat(this.age, " years old and I study at ").concat(this.institute, ". My ID is ").concat(this.id, ".");
    };
    // Protected method to get age and it can be accessed in derived classes
    Person.prototype.getAge = function () {
        return this.age;
    };
    // Method to show private id within the class
    Person.prototype.showId = function () {
        return this.id;
    };
    Person.counter = 0;
    return Person;
}());
exports.Person = Person;
//Closing the class Person
// Now we will create a Student class which will extend Person class
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    // Constructor for Student class which calls the parent constructor using super keyword
    function Student(name, age, institute, skills) {
        var _this = _super.call(this, name, age, institute) || this; // calling parent class constructor
        _this.skills = skills;
        return _this;
    }
    // Method to get student details including skills and greeting from parent class
    Student.prototype.getStudentDetails = function () {
        return "".concat(this.greet(), " I have the following skills: ").concat(this.skills.join(", "), ".");
    };
    // Method to add a new skill to the student's skill set
    Student.prototype.addSkill = function (skill) {
        this.skills.push(skill); //pushing new skill to skills array
    };
    //a method to display protected age from parent class along with skills
    Student.prototype.display = function () {
        console.log("My age is ".concat(this.getAge(), " years and my skills are: ").concat(this.skills.join(", "), "."));
    };
    // there is need of overriding greet method here as it is already public in parent class and accessible via object of Student class
    Student.prototype.greet = function () {
        return "Hello, my name is ".concat(this.name, ", I am ").concat(this.age, " years old and I study at ").concat(this.institute, "\n         I have the following skills: ").concat(this.skills.join(", "), ".");
    };
    return Student;
}(Person)); //Closing the Student class
exports.Student = Student;
