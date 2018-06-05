#!/usr/bin/env node

const error = require('./error');
const _ = require('lodash');
const chalk = require('chalk');
const inquirer = require('inquirer');
const profiles = require('./profiles');
const path = require('path');
const copydir = require('copy-dir');
const fsStuff = require('./fs-stuff');
const fs = require('fs');


console.log(chalk.bold('Welcome to the XTech Packager utility'));

var currentPath = process.cwd();

var isStandard = _.toLower(path.dirname(currentPath)).endsWith('\\standard\\applications');
var isCustom = _.toLower(path.dirname(currentPath)).endsWith('\\applications') && _.toLower(path.dirname(path.dirname(path.dirname(currentPath)))).endsWith('\\custom\\companies');

if (!isStandard && !isCustom) {
    error("Current folder must be inside the 'Standard' or 'Custom' of a TaskBuilder Application\ne.g.:\n<your instance>\\Standard\\Applications\\<your app>\n<your instance>\\Custom\\Companies\\<your company>\\Applications\\<your app>");
}

inquirer.prompt([
    {
        name: 'profileHash',
        message: 'Which profile(s) you want to pack? (wildcards allowed)'
    },
    {
        name: 'selectedProfiles',
        type: 'checkbox',
        message: 'Select the profiles to include',
        choices: (answers) => { return profiles.scan(currentPath, answers.profileHash); },
        validate: (input, answers) => { 
            if (input.length == 0)
                return " Select at least one profile";
            return true;
        }
    },
    {
        name: 'destinationFolder',
        message: 'In which folder the profiles will be packed?',
        validate: (input, answers) => { 
            if (!input) {
                return "Empty name not allowed";
            }
            if (!fs.existsSync(input.substring(0, input.lastIndexOf("\\") + 1))) {
                return "Parent folder does not exist.";
            }
            return true;            
        }
    },
    {
        name: 'deleteExisting',
        message: 'Target folder already exists, do you want to erase it first?',
        type: 'confirm',
        default: false,
        when: (answers) => { 
            return fs.existsSync(answers.destinationFolder);
        }
    }//,
    // {
    //     name: 'packStyle',
    //     type: 'list',
    //     message: 'do you want to zip profiles or just copy?',
    //     choices: ['zip', 'copy']
    // }
]).then( answers => {
    var allProfiles = [];
    allProfiles.push(...answers.selectedProfiles,...profiles.clientDocsProfiles(answers.selectedProfiles));
    if (answers.deleteExisting) {
        fsStuff.rimraf(answers.destinationFolder);
    }
    console.log("Copying profiles ...");
    allProfiles.forEach(p => {
        fsStuff.mkDirByPathSync(path.join(answers.destinationFolder, p));
        console.log(p);
        copydir.sync(path.join(currentPath, p), path.join(answers.destinationFolder, p));
    });
    console.log("... done.");
});