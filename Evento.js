async function addContato() {
    let nomeAdd = prompt("Nome?")
    let idadeAdd = prompt("Idade?")

    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa/', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeAdd,
            idade: idadeAdd
        })
    })
    console.log(res)
    if (res.ok) {
        console.log('adicionei')
        atualizarContatos()
    }
}

async function atualizar(identificador) {
    let nomeNovo = prompt("Nome?")
    let idadeNovo = prompt("Idade?")

    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa/' + identificador, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeNovo,
            idade: idadeNovo
        })
    });
    if (res.ok) {
        alert('Atualizou')
        atualizarContatos()
    } else {
        alert('Erro ao atualizar')
    }

}

atualizarContatos();

async function atualizarContatos() {
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa/')
    let body = await resposta.json()
    tarefas.innerHTML = "<ul>"
    body.forEach(pessoa => {
        tarefas.innerHTML += ` 
        <li>${pessoa.nome} - ${pessoa.idade} 
            <button onclick="deletar(${pessoa.id})">Deletar</button>
            <button onclick="atualizar(${pessoa.id})">Atualizar</button>
        </li>`

        let nomes = pessoa.nome
        
    });
    tarefas.innerHTML += "</ul>"


    let numContatos = document.querySelector("#numContatos")
    let contador = document.querySelectorAll("li")
    numContatos.textContent = contador.length
}

async function deletar(identificador) {
    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa/' + identificador, {
        method: 'DELETE',
    });
    if (res.ok) {
        atualizarContatos();
    } else {
        console.log(res.statusText)
    }
}

//Login localStore
let nameForm = document.querySelector("#name-form")
let welcomeContainer = document.querySelector("#welcome")
let logoutBtn = document.querySelector("#logout")
let lista = document.querySelector("#ListaTelefonica")

function checkuser() {
    let userName = localStorage.getItem("name")

    if (userName) {
        nameForm.style.display = "none"
        welcomeContainer.style.display = "block"

        let userNameElement = document.querySelector("#userName")

        userNameElement.textContent = userName;
    } else {
        nameForm.style.display = "block"
        welcomeContainer.style.display = "none"
    }
}

nameForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let nameInput = document.querySelector("#name")

    localStorage.setItem("name", nameInput.value)

    nameForm.value = ""

    let senhaInput = document.querySelector("#senha")

    localStorage.setItem("senha", senhaInput.value)

    nameForm.value = ""

    checkuser()
})

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("name")

    checkuser()
})

checkuser()