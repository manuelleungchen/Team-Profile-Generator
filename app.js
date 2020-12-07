// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { count } = require("console");


async function getTeamMembersCount() {
    const inquirer = require('inquirer');

    const membersCount = await inquirer.prompt([
        {
            type: 'number',
            message: 'How many members in the team?',
            name: 'membersNumber'
        },
    ]);

    return membersCount.membersNumber;
}

async function getMembersInfo(membersCount) {
    let name;
    let id;
    let email;
    let role;
    let employees = [];

    for (let counter = 0; counter < membersCount; counter++) {

        name = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name',
            },
        ]);

        id = await inquirer.prompt([
            {
                type: 'number',
                message: 'What is your ID Number?',
                name: 'id',
            },
        ]);

        email = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is your email?',
                name: 'email',
            },
        ]);
        role = await inquirer.prompt([
            {
                type: 'list',
                message: 'What is your role?',
                name: 'role',
                choices: ["Manager", "Engineer", "Intern"],
                loop: false,
            },
        ]);

        switch (role.role) {
            case "Manager":
                office = await inquirer.prompt([
                    {
                        type: 'number',
                        message: 'What is your office number?',
                        name: 'office',
                    },
                ]);
                employees.push(new Manager(name.name, id.id, email.email, office.office));
                break;

            case "Engineer":
                github = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is your Github?',
                        name: 'github',
                    },
                ]);
                employees.push(new Engineer(name.name, id.id, email.email, github.github));
                break;

            case "Intern":
                school = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is your school?',
                        name: 'school',
                    },
                ]);
                employees.push(new Intern(name.name, id.id, email.email, school.school));
                break;

        }

        console.log(" ");

    }

    return employees;

}

function init() {
    console.log("Launching App .....");
    console.log("Welcome to Team Profile GENERATOR");
    console.log("  ");

    getTeamMembersCount().then((count) => {

        getMembersInfo(count).then((data) => {
            fs.writeFile("./output/team.html", render(data), (err) => 
            err ? console.error(err) : console.log("Page Created Successfully!")

            )
        }).catch(console.error);

    }).catch(console.error);

}

init();