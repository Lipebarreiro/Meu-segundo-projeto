// chamando todas as variaveis

var form = document.querySelector("#formulario");
var mensagem = document.querySelector("#mensagem");
var cifra = document.querySelector("#cifraSelection");
var chaveCesarDiv = document.querySelector("#inputChaveCesar");
var chaveCesar = document.querySelector("#chaveCesar");
var codificar = document.querySelector("#codificar");
var decodificar = document.querySelector("#decodificar");
var botaoSubmit = document.querySelector("#botaoSubmit");
var paragrafoResposta = document.querySelector("#textoResposta");

// inserção do campo de incremento caso a cifra de cesar seja selecionada

cifra.addEventListener("change", function (event) {
  var valorSelecionado = event.target.value;
  if (valorSelecionado == "cesar") {
    chaveCesarDiv.style.display = "block";
  } else {
    chaveCesarDiv.style.display = "none";
  }
});

// muda o texto do botão entre codificar e decodificar

codificar.addEventListener("click", function () {
  botaoSubmit.innerText = "Codificar";
});

decodificar.addEventListener("click", function () {
  botaoSubmit.innerText = "Decodificar";
});

// codificação e decodificação / cifra de César

function cifraDeCesar(texto, chave) {
  if (chave < 0) {
    return cifraDeCesar(texto, chave + 26);
  }

  var retorno = "";

  for (var i = 0; i < texto.length; i++) {
    var caracter = texto[i];
    var codigo = texto.charCodeAt(i);
    if (codigo >= 65 && codigo <= 90) {
      var codigoAlterado = ((codigo + chave - 65) % 26) + 65;
      caracter = String.fromCharCode(codigoAlterado);
    } else if (codigo >= 97 && codigo <= 122) {
      var codigoAlterado = ((codigo + chave - 97) % 26) + 97;
      caracter = String.fromCharCode(codigoAlterado);
    }
    retorno += caracter;
  }
  return retorno;
}

// codificação e decodificação / base 64

function base64(texto, decodificarEstaSelecionado) {
  var retorno;
  if (decodificarEstaSelecionado) {
    retorno = atob(texto);
  } else {
    retorno = btoa(texto);
  }
  return retorno;
}

function submit(event) {
  event.preventDefault();
  var textoCifrado;
  if (cifra.value == "cesar") {
    var chave = +chaveCesar.value || 0;
    if (codificar.checked) {
      textoCifrado = cifraDeCesar(mensagem.value, chave);
    } else {
      textoCifrado = cifraDeCesar(mensagem.value, -chave);
    }
  } else {
    textoCifrado = base64(mensagem.value, decodificar.checked);
  }

  paragrafoResposta.textContent = textoCifrado;
}

form.addEventListener("submit", submit);
