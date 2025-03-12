<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculadora - Quadrado, Cubo e Parcelas</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }

    h1 {
      color: #4CAF50;
    }

    h2 {
      color: #2e8b57;
    }

    label {
      font-size: 1.2em;
    }

    button {
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover {
      background-color: #45a049;
    }

    .result {
      margin-top: 20px;
      font-size: 1.3em;
    }

    table {
      margin-top: 20px;
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: center;
    }

    th {
      background-color: #4CAF50;
      color: white;
    }

    input, select {
      padding: 8px;
      font-size: 1em;
      margin: 10px 0;
      width: 100%;
      box-sizing: border-box;
    }

    form {
      margin-bottom: 30px;
    }
  </style>
</head>
<body>

  <h1>Calculadora de Quadrado, Cubo e Parcelas com Juros</h1>

  <!-- Formulário para calcular quadrado ou cubo -->
  <h2>Calculadora de Quadrado e Cubo</h2>
  <form id="numeroForm">
    <label for="numero">Digite um número:</label>
    <input type="number" id="numero" name="numero" required>
    
    <label for="operacao">Escolha a operação:</label>
    <select id="operacao" name="operacao">
      <option value="quadrado">Quadrado</option>
      <option value="cubo">Cubo</option>
    </select>
    
    <button type="submit">Calcular</button>
  </form>

  <!-- Tabela de resultados -->
  <table id="resultadoTabela" style="display:none;">
    <thead>
      <tr>
        <th>Operação</th>
        <th>Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Quadrado</td>
        <td id="resultadoQuadrado"></td>
      </tr>
      <tr>
        <td>Cubo</td>
        <td id="resultadoCubo"></td>
      </tr>
    </tbody>
  </table>

  <!-- Formulário para calcular parcelas com juros -->
  <h2>Calculadora de Parcelas com Juros</h2>
  <form id="compraForm">
    <label for="valorCompra">Valor da Compra:</label>
    <input type="number" id="valorCompra" name="valorCompra" required>

    <label for="numParcelas">Número de Parcelas:</label>
    <input type="number" id="numParcelas" name="numParcelas" required>

    <label for="taxaJuros">Taxa de Juros Mensal (%):</label>
    <input type="number" id="taxaJuros" name="taxaJuros" required>

    <button type="submit">Calcular Parcelas</button>
  </form>

  <div class="result">
    <p>Valor da Parcela: <span id="valorParcela"></span></p>
    <p>Valor Total a Pagar (com juros): <span id="valorTotal"></span></p>
  </div>

  <script src="script.js"></script>

</body>
</html>



// Função para calcular o quadrado
function calcularQuadrado(numero) {
    return numero * numero;
  }
  
  // Função para calcular o cubo
  function calcularCubo(numero) {
    return numero * numero * numero;
  }
  
  // Função para calcular as parcelas com juros
  function calcularParcelas(valorCompra, numParcelas, taxaJuros) {
    // Fórmula de cálculo de parcelas com juros compostos
    const jurosMensal = taxaJuros / 100;
    const parcela = (valorCompra * (1 + jurosMensal) ** numParcelas) / numParcelas;
    const total = parcela * numParcelas;
    return { parcela, total };
  }
  
  // Evento para calcular quadrado e cubo
  document.getElementById('numeroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    
    const numero = parseFloat(document.getElementById('numero').value);
    const operacao = document.getElementById('operacao').value;
    
    let resultadoQuadrado = 0;
    let resultadoCubo = 0;
  
    // Realiza o cálculo dependendo da operação escolhida
    if (operacao === 'quadrado') {
      resultadoQuadrado = calcularQuadrado(numero);
      resultadoCubo = '-';  // Esconde o resultado do cubo
    } else if (operacao === 'cubo') {
      resultadoCubo = calcularCubo(numero);
      resultadoQuadrado = '-';  // Esconde o resultado do quadrado
    }
  
    // Exibe os resultados na tabela
    document.getElementById('resultadoQuadrado').textContent = resultadoQuadrado !== 0 ? resultadoQuadrado : '-';
    document.getElementById('resultadoCubo').textContent = resultadoCubo !== 0 ? resultadoCubo : '-';
  
    // Torna a tabela visível
    document.getElementById('resultadoTabela').style.display = 'table';
  });
  
  // Evento para calcular as parcelas com juros
  document.getElementById('compraForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    
    const valorCompra = parseFloat(document.getElementById('valorCompra').value);
    const numParcelas = parseInt(document.getElementById('numParcelas').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value);
  
    if (valorCompra <= 0 || numParcelas <= 0 || taxaJuros < 0) {
      alert('Por favor, insira valores válidos para a compra, parcelas e taxa de juros.');
      return;
    }
  
    // Calcula as parcelas e o valor total
    const resultadoParcelas = calcularParcelas(valorCompra, numParcelas, taxaJuros);
    
    // Exibe os resultados
    document.getElementById('valorParcela').textContent = resultadoParcelas.parcela.toFixed(2);
    document.getElementById('valorTotal').textContent = resultadoParcelas.total.toFixed(2);
  });
