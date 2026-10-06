/* =========================================
   LOGIN
   ========================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value;

        const contaSalva = JSON.parse(
            localStorage.getItem("contaClinica")
        );

        if (!contaSalva) {
            alert("Você ainda não possui uma conta. Clique em 'Criar uma'.");
            return;
        }

        if (
            (usuario === contaSalva.email || usuario === contaSalva.cpf) &&
            senha === contaSalva.senha
        ) {

            alert("Login realizado com sucesso!");

        } else {

            alert("E-mail/CPF ou senha incorretos.");

        }

    });
}


/* =========================================
   CADASTRO
   ========================================= */

const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const senha = document.getElementById("novaSenha").value;
        const confirmarSenha =
            document.getElementById("confirmarSenha").value;

        if (senha !== confirmarSenha) {

            alert("As senhas não são iguais.");
            return;

        }

        if (senha.length < 6) {

            alert("A senha deve ter pelo menos 6 caracteres.");
            return;

        }

        const novaConta = {
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            senha: senha
        };

        localStorage.setItem(
            "contaClinica",
            JSON.stringify(novaConta)
        );

        alert("Conta criada com sucesso!");

        window.location.href = "index.html";

    });
}


/* =========================================
   RECUPERAR SENHA - ETAPA 1
   ========================================= */

const recuperarForm =
    document.getElementById("recuperarForm");

if (recuperarForm) {

    recuperarForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("emailRecuperacao")
            .value
            .trim();

        const contaSalva = JSON.parse(
            localStorage.getItem("contaClinica")
        );

        if (!contaSalva) {

            alert(
                "Nenhuma conta foi encontrada. " +
                "Primeiro crie uma conta."
            );

            return;
        }

        if (email !== contaSalva.email) {

            alert(
                "Este e-mail não está cadastrado."
            );

            return;
        }

        /*
         * Guarda o e-mail que está tentando
         * recuperar a senha.
         */
        localStorage.setItem(
            "emailRecuperacao",
            email
        );

        // Esconde o primeiro formulário
        recuperarForm.style.display = "none";

        // Mostra o formulário do código
        const codigoForm =
            document.getElementById("codigoForm");

        codigoForm.style.display = "block";

    });
}


/* =========================================
   RECUPERAR SENHA - ETAPA 2
   ========================================= */

const codigoForm =
    document.getElementById("codigoForm");

if (codigoForm) {

    codigoForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const codigo =
            document.getElementById("codigo")
            .value
            .trim();

        /*
         * Código fictício para demonstração.
         * Em um sistema real seria enviado
         * por e-mail ou SMS.
         */
        if (codigo !== "123456") {

            alert("Código incorreto.");

            return;
        }

        // Esconde o formulário do código
        codigoForm.style.display = "none";

        // Mostra o formulário da nova senha
        const novaSenhaForm =
            document.getElementById("novaSenhaForm");

        novaSenhaForm.style.display = "block";

    });
}


/* =========================================
   RECUPERAR SENHA - ETAPA 3
   ========================================= */

const novaSenhaForm =
    document.getElementById("novaSenhaForm");

if (novaSenhaForm) {

    novaSenhaForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const novaSenha =
            document.getElementById("senhaRecuperada")
            .value;

        const confirmarSenha =
            document.getElementById(
                "confirmarSenhaRecuperada"
            ).value;

        if (novaSenha.length < 6) {

            alert(
                "A nova senha deve ter pelo menos 6 caracteres."
            );

            return;
        }

        if (novaSenha !== confirmarSenha) {

            alert("As senhas não são iguais.");

            return;
        }

        const contaSalva = JSON.parse(
            localStorage.getItem("contaClinica")
        );

        if (!contaSalva) {

            alert("Conta não encontrada.");

            return;
        }

        // Atualiza a senha
        contaSalva.senha = novaSenha;

        // Salva a nova senha
        localStorage.setItem(
            "contaClinica",
            JSON.stringify(contaSalva)
        );

        // Remove o e-mail temporário
        localStorage.removeItem("emailRecuperacao");

        alert(
            "Senha alterada com sucesso!"
        );

        // Volta para o login
        window.location.href = "index.html";

    });
}
