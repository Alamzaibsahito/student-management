#! /usr/bin/env node
import inquirer from "inquirer";
console.log(`Welcome to Student Management System!\n`);
// Creating a class of student
class Student {
    name;
    // Properties
    static idcounter = 0;
    studentID;
    courses = [];
    balance = 0;
    push;
    constructor(name) {
        this.name = name;
        Student.idcounter++;
        this.studentID = this.generateStudentID();
    }
    generateStudentID() {
        return 100 + Student.idcounter; // 1001, 1002,1003 and so on
    }
    enrollCourse(course) {
        this.courses.push(course);
        this.balance += 1000; // each course fees is 1000
    }
    viewBalance() {
        return this.balance; // pending balance of a student
    }
    payCoursesFees(amount) {
        this.balance -= amount; // the balance of student will - amount paid by student
    }
    showStatus() {
        console.log(`
        Name:${this.name}
        Student ID: ${this.studentID}
        Courses Enrolled: ${this.courses.join(" , ")} ,
        Balance: ${this.balance}
        `);
    }
    getStudentID() {
        return this.studentID;
    }
    getName() {
        return this.name;
    }
}
// class ends here
const students = []; // students list will be stored here
async function mainMenu() {
    const userInputMenu = await inquirer.prompt({
        type: "list",
        name: "menu",
        message: "Select your Menu",
        choices: [
            '1. Add New Student',
            '2. Enroll Student in Course',
            '3. View Student Balance',
            '4. Pay Course fees',
            '5. Show Student Status',
            '6. End Menu'
        ]
    });
    // destructuring
    const { menu } = userInputMenu;
    if (menu === '1. Add New Student')
        await addNewStudent();
    if (menu === '2. Enroll Student in Course')
        await enrollStudent();
    if (menu === '3. View Student Balance')
        await ViewBalance();
    if (menu === '4. Pay Course fees')
        await payTutionFees();
    if (menu === '5. Show Student Status')
        await showStatus();
    if (menu === '6. End Menu') {
        console.log(`Thank you for using student management system\n`);
        process.exit();
    }
    mainMenu();
}
// starting creating functions
async function addNewStudent() {
    const userInput = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter Student Name here'
    });
    const student = new Student(userInput.name);
    students.push(student);
    console.log(`Student ${student.getName()} added with ID ${student.getStudentID()}\n`);
}
// addNewStudent ends here
// enrollStudent start here
async function enrollStudent() {
    const student = await selectStudent();
    if (student) {
        const userInput = await inquirer.prompt({
            type: 'list',
            name: 'course',
            message: 'Select courses to enroll',
            choices: ['TypeScript', 'JavaScript', 'Python', 'Next.js']
        });
        student.enrollCourse(userInput.course);
        console.log(`Successfully Enrolled in Course: ${userInput.course}`);
    }
}
// enrollStudent ends here
// viewBalance start here
async function ViewBalance() {
    const student = await selectStudent();
    if (student) {
        console.log(`Balance: ${student.viewBalance()}`);
    }
}
// viewBalance ends here
// payTutionFees () starts here
async function payTutionFees() {
    const student = await selectStudent();
    if (student) {
        const userInput = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: 'Enter amount you want to pay?'
        });
        student.payCoursesFees(parseFloat(userInput.amount));
        console.log(`Paid  ${userInput.amount}. Balance remaining ${student.viewBalance()}`);
    }
}
// payTutionFees () ends here
// showStatus start here
async function showStatus() {
    const student = await selectStudent();
    if (student) {
        student.showStatus();
    }
}
// showStatus ends here
// selectStudent start here
async function selectStudent() {
    if (students.length === 0) {
        console.log("No Students record available.\n");
    }
    else {
        const stdSelect = await inquirer.prompt({
            type: 'list',
            name: 'stdID',
            message: 'Select a student',
            choices: students.map((std) => ({
                name: std.getName(),
                value: std.getStudentID()
            }))
        });
        return (students.find((std) => std.getStudentID() === stdSelect.stdID) || null);
    }
}
// selectStudent() ends here
mainMenu();
