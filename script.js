function calcularSalarioLiquido() {
    var salario = parseFloat(document.getElementById("salarioBruto").value);
    var dependente = parseFloat(document.getElementById("quantosDependentes").value);
    var desejaFerias = document.getElementById("ferias").value;
    var diasFerias = parseFloat(document.getElementById("quantidadeDiasFerias").value);

    var descontoDependente = dependente * 189.59;
    var descontoINSS;
    var descontoIRRF;
    var valorFerias = 0;
    var descontoINSSFerias = 0;
    var descontoIRRFerias = 0;
    var umTercoFerias = 0;

    // Função para calcular desconto do INSS
    function calcularDescontoINSS(salario) {
        if (salario <= 1320.00) {
            return salario * 0.075;
        } else if (salario <= 2571.29) {
            return salario * 0.090;
        } else if (salario <= 3856.94) {
            return salario * 0.120;
        } else if (salario <= 7507.49) {
            return salario * 0.140;
        } else {
            return 876.95;
        }
    }

    // Função para calcular desconto do IRRF
    function calcularDescontoIRRF(salario) {
        if (salario <= 2112.00) {
            return 0;
        } else if (salario <= 2826.65) {
            return salario * 0.075;
        } else if (salario <= 3751.05) {
            return salario * 0.150;
        } else if (salario <= 4664.68) {
            return salario * 0.225;
        } else {
            return salario * 0.275;
        }
    }

    // Cálculo do desconto de INSS
    descontoINSS = calcularDescontoINSS(salario);

    // Cálculo do desconto de IRRF
    descontoIRRF = calcularDescontoIRRF(salario);

    // Cálculo do salário líquido
    var salarioLiquido = salario - descontoINSS - descontoIRRF - descontoDependente;

    // Exibir resultado do salário líquido e descontos
    var resp = `O valor do salário é R$${salarioLiquido.toFixed(2)}`;
    document.getElementById("resultado").textContent = resp;
    document.getElementById("descontoINSS").textContent = `Desconto do INSS: R$${descontoINSS.toFixed(2)}`;
    document.getElementById("descontoIRRF").textContent = `Desconto do IRRF: R$${descontoIRRF.toFixed(2)}`;
    document.getElementById("descontoDependente").textContent = `Desconto de Dependentes: R$${descontoDependente.toFixed(2)}`;

    // Verificar se deseja férias
    if (desejaFerias === "sim" && !isNaN(diasFerias) && diasFerias > 0) {
        // Cálculo do valor das férias
        valorFerias = (salario / 30) * diasFerias;

        // Cálculo do desconto de INSS nas férias
        descontoINSSFerias = calcularDescontoINSS(valorFerias);

        // Cálculo do desconto de IRRF nas férias
        descontoIRRFerias = calcularDescontoIRRF(valorFerias);

        // Cálculo do 1/3 constitucional das férias
        umTercoFerias = salario / 3;

        // Adicionar o 1/3 constitucional ao valor das férias
        valorFerias += umTercoFerias;

        // Exibir resultado das férias
        document.getElementById("valorFerias").textContent = `Valor das Férias: R$${valorFerias.toFixed(2)}`;
        document.getElementById("umTercoFerias").textContent = `1/3 Constitucional das Férias: R$${umTercoFerias.toFixed(2)}`;
        document.getElementById("descontoINSSFerias").textContent = `Desconto do INSS nas Férias: R$${descontoINSSFerias.toFixed(2)}`;
        document.getElementById("descontoIRRFerias").textContent = `Desconto do IRRF nas Férias: R$${descontoIRRFerias.toFixed(2)}`;
        document.getElementById("feriasResult").style.display = "block";
    } else {
        document.getElementById("feriasResult").style.display = "none";
    }
}

document.getElementById("ferias").addEventListener("change", function () {
    var desejaFerias = this.value;
    var feriasDias = document.getElementById("feriasDias");

    if (desejaFerias === "sim") {
        feriasDias.style.display = "block";
    } else {
        feriasDias.style.display = "none";
    }
});
