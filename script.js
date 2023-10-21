const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordConfirm = document.getElementById('passwordConfirm')

//adiciona evento para quando der submit no form > button no html é 
//do tipo submit, ao clicar nele, o evento do form submit será executado
form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
});
//está recendo o evento (objeto event)
//e.preventDefault() para não recarregar a pag qdo enviar o formulário

//checkInputs vai fazer as validações dos inputs e vai chamar funções
//capazes de alterar a classe do form control para "error" ou "success"
//recebe o valor dos inputs (username.value)
function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmValue = passwordConfirm.value;

    //verificar 1 input de cada vez se seu valor é vazio
    //se for vazio chama a setErrorFor
    if (usernameValue === "") {
        setErrorFor(username, "O nome de usuário é obrigatório.");
    } else {
        setSuccessFor(username);
    }

    if (emailValue === "") {
        setErrorFor(email, "O e-mail é obrigatório.");
    } else if(!checkEmail(emailValue)) {
        setErrorFor(email, "Por favor insira um e-mail válido.");
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === "") {
        setErrorFor(password, "A senha é obrigatória.")
    } else if(passwordValue.length < 6) {
        setErrorFor(password, "Por favor insira uma senha 6 caracteres");
    } else {
        setSuccessFor(password);
    }

    if (passwordConfirmValue === "") {
        setErrorFor(passwordConfirm, "A confirmação de senha é obrigatória.")
    } else if(passwordConfirmValue !== passwordValue) {
        setErrorFor(passwordConfirm, "As senhas são diferentes.");
    } else {
        setSuccessFor(passwordConfirm);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [ ...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    if (formIsValid) {
        console.log('O formulário está 100% válido');
    }    
}

//input.parentElement vai retornar a div pai do input (div form-control)
//coloca nela a classe de form-control-error que vai deixar small
//visível e o íconde de erro com visibilidade e borda vermelha
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    //Adiciona msg de erro
    small.innerText = message;
    //Adiciona a classe de erro
    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    //Adicionar a classe de sucesso
    formControl.className = "form-control success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }