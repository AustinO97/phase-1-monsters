document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then(res => res.json())
    .then(data => data.forEach(data => renderMonster(data)))

    const monsterDiv = document.querySelector('#create-monster')
    const monsterForm = document.createElement('form')

    //form event listener
    monsterForm.addEventListener('submit', e => {
        e.preventDefault()

        const name = document.querySelector('#name')
        console.log(name)
        const age = document.querySelector('#age')
        const description = document.querySelector('#description')

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name,
                age,
                description
            })
        }
        fetch('http://localhost:3000/monsters/?_limit=50&_page=2', postOptions)
        .then(res => res.json())
        .then(data => renderMonster(data))
    })

    //form elements
    const newName = document.createElement('input')
    newName.placeholder = 'name'
    newName.id = 'name'

    const newAge = document.createElement('input')
    newAge.placeholder = 'age'
    newAge.id = 'age'

    const newDescription = document.createElement('input')
    newDescription.placeholder = 'description'
    newDescription.id = 'description'

    const submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.innerText = 'Create Monster'

    monsterForm.append(newName, newAge, newDescription, submitBtn)
    monsterDiv.append(monsterForm)

    //forwardButton
    const forwardButton = document.querySelector('#forward')
    forwardButton.addEventListener('click', () => {
        fetch('http://localhost:3000/monsters/?_limit=50&_page=2')
        .then(res => res.json())
        //console.log(res)
        .then(data => {
            let monsterContainer = document.querySelector('#monster-container')
            monsterContainer.innerText = ''
            data.forEach(data => renderMonster(data))
            //console.log(data)
        })
    })

    //backwardButton
    const backwardButton = document.querySelector('#back')
    backwardButton.addEventListener('click', () => {
        fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
        .then(res => res.json())
        .then(data => {
            let monsterContainer = document.querySelector('#monster-container')
            monsterContainer.innerText = ''
            data.forEach(data => renderMonster(data))
        })
    })
})

//create div elements
const renderMonster = monster => {

    let monsterContainer = document.querySelector('#monster-container')
    let monsterCard = document.createElement('div')

    let name = document.createElement('h2')
    name.innerText = monster.name

    let age = document.createElement('h4')
    age.innerText = `Age ${monster.age}`

    let p = document.createElement('p')
    p.innerText = `Description ${monster.description}`

    monsterCard.append(name, age, p)
    monsterContainer.append(monsterCard)
}
