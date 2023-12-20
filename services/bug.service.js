import fs from 'fs'
import { utilService } from './utils.service.js';
import { loggerService } from './logger.service.js'




export const bugService = {
    query,
    getById,
    remove,
    save
}


const bugs = utilService.readJsonFile('data/bug.json')
//console.log(bugs)

function query(){
    return Promise.resolve(bugs)
}


function getById(bugId) {
    console.log(bugId);
    const bug = bugs.find(bug => bug._id === bugId)
    console.log(bug);
    if (!bug) return Promise.reject('Bug dosent exist!')
    
    return Promise.resolve(bug)
}

function remove(bugId,loggedinUser){
    const idx = bugs.findIndex(bug => bug._id === bugId)
    if (idx === -1) return Promise.reject('No Such Bug')
    const bug = bugs[idx]
    console.log(bug)

    if (!loggedinUser.isAdmin &&
        bug.owner._id !== loggedinUser._id) {
        return Promise.reject('Not your bug')
    }

    bugs.splice(idx, 1)
    return _saveBugssToFile()
}



function save(bug){
    if(bug._id)
        {
    const bugIdx = bugs.findIndex(currBug => currBug._id===bug._id)
    bugs[bugIdx]=bug

        }
    else{
        bug._id=utilService.makeId()
        bug.createdAt=new Date()
        bug.owner = userService.getLoggedinUser()
        bugs.unshift(bug)
    }
    return  _saveBugssToFile().then(() => bug)
}

function _saveBugssToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 2)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            resolve()
        })
    })
}