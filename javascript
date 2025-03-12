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
