
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'

_createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
}


function query() {
    return axios.get(BASE_URL).then(res=>res.data)
   // return storageService.query(STORAGE_KEY)
}
function getById(bugId) {
   // return storageService.get(STORAGE_KEY, bugId)
    return axios.get(BASE_URL+ bugId).then(res=>res.data)

}

function remove(bugId) {
    console.log(bugId)
    //return storageService.remove(STORAGE_KEY, bugId)
    return axios.get(BASE_URL+ bugId).then(res=>res.data)

}

function save(bug) {
    console.log(bug)
    //let queryParams = `?title=${bug.title}&severity=${bug.severity}`
    if (bug._id) {
        return axios.put(BASE_URL, bug).then(res => res.data)
    } else {
        return axios.post(BASE_URL, bug).then(res => res.data)
    }
}

function getEmptyBug(title = '', severity = '') {
    return { title, severity }
}

function getDefaultFilter() {
    return { txt: '', severity: '', pageIdx: 0 }
}



function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (!bugs || !bugs.length) {
        bugs = [
            {
                title: "Infinite Loop Detected",
                severity: 4,
                _id: "1NF1N1T3"
            },
            {
                title: "Keyboard Not Found",
                severity: 3,
                _id: "K3YB0RD"
            },
            {
                title: "404 Coffee Not Found",
                severity: 2,
                _id: "C0FF33"
            },
            {
                title: "Unexpected Response",
                severity: 1,
                _id: "G0053"
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, bugs)
    }
}

function _createBug(title,severity){
    const bug={title,severity}
    bug._id=utilService.makeId
    return bug
}