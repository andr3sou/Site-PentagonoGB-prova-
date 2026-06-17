
// PRODUTOS DA LOJA
const produtosLoja = [
    { id: 1, nome: "Produto 1", preco: 7 },
    { id: 2, nome: "Produto 2", preco: 3 },
    { id: 3, nome: "Produto 3", preco: 8 },
    { id: 4, nome: "Produto 4", preco: 2009 }
];

// Vetor pra armazenar os produtos
let produtosCarrinho = [];


// BOTÕES DO CATÁLOGO

// Seleciona todos os botões dos produtos
const btnProduto1 = document.getElementById("btnProduto1");
const btnProduto2 = document.getElementById("btnProduto2");
const btnProduto3 = document.getElementById("btnProduto3");
const btnProduto4 = document.getElementById("btnProduto4");

btnProduto1.addEventListener("click", function(){
    adicionarAoCarrinho(produtosLoja[0]);
});

btnProduto2.addEventListener("click", function(){
    adicionarAoCarrinho(produtosLoja[1]);
});

btnProduto3.addEventListener("click", function(){
    adicionarAoCarrinho(produtosLoja[2]);
});

btnProduto4.addEventListener("click", function(){
    adicionarAoCarrinho(produtosLoja[3]);
});


// ADICIONAR AO CARRINHO
function adicionarAoCarrinho(produto) {
    // Limpa o texto de compra finalizada caso o usuário adicione mais itens depois de clicar em comprar
    document.getElementById("texto-comprar").textContent = "";

    // Procura se o produto já existe no carrinho
    const itemExiste = produtosCarrinho.find(
        item => item.id === produto.id
    );
    
    if (itemExiste) {
        itemExiste.quantidade++;
    } else {
        produtosCarrinho.push({
            ...produto,
            quantidade: 1
        });
    }

   renderizarCarrinho();
}


// MOSTRAR CARRINHO NA TELA
function renderizarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");

    listaCarrinho.innerHTML = "";
    let valorTotal = 0;

    // Se o carrinho estiver vazio, exibe uma mensagem amigável
    if (produtosCarrinho.length === 0) {
        listaCarrinho.innerHTML = "<p style='color: #666; text-align: center; font-weight: normal;'>Seu carrinho está vazio.</p>";
        total.textContent = "Total: R$ 0";
        return; // Para a execução da função aqui
    }

    // Percorre todos os produtos do carrinho
    produtosCarrinho.forEach(produto => {
        valorTotal += produto.preco * produto.quantidade;

        const item = document.createElement("div");
        item.classList.add("item-carrinho");

        item.innerHTML = `
            <span>
                ${produto.nome}
                (x${produto.quantidade})
            </span>

            <div>
                R$ ${(produto.preco * produto.quantidade)}

                <button onclick="alterarQuantidade(${produto.id}, 1)">
                    +
                </button>

                <button onclick="alterarQuantidade(${produto.id}, -1)">
                    -
                </button>

                <button onclick="removerProduto(${produto.id})">
                    Remover
                </button>
            </div>
        `;
       
        listaCarrinho.appendChild(item);
    });

    // Mostra o valor total
    total.textContent = `Total: R$ ${valorTotal}`;
}


// ALTERAR QUANTIDADE (+ e -)
function alterarQuantidade(id, valor) {
    produtosCarrinho = produtosCarrinho.map(produto => {
        if (produto.id === id) {
            produto.quantidade += valor;
        }
        return produto;
    }).filter(produto => produto.quantidade > 0);

    renderizarCarrinho();
}


// --- NOVAS FUNÇÕES ADICIONADAS ABAIXO ---


// REMOVER PRODUTO (Botão "Remover" individual)
function removerProduto(id) {
    // Filtra o array para manter apenas os produtos que possuem o ID diferente do que foi clicado
    produtosCarrinho = produtosCarrinho.filter(produto => produto.id !== id);
    
    // Atualiza o carrinho na tela
    renderizarCarrinho();
}


// LIMPAR CARRINHO (Botão "Limpar Carrinho")
const btnLimpar = document.getElementById("limpar");

btnLimpar.addEventListener("click", function() {
    // Esvazia o vetor do carrinho
    produtosCarrinho = [];
    
    // Limpa a mensagem de compra se houver
    document.getElementById("texto-comprar").textContent = "";
    
    // Atualiza a tela
    renderizarCarrinho();
});


// FINALIZAR COMPRA (Botão "Comprar")
const btnComprar = document.getElementById("comprar");

btnComprar.addEventListener("click", function() {
    const textoComprar = document.getElementById("texto-comprar");

    // Verifica se o carrinho possui itens
    if (produtosCarrinho.length > 0) {
        textoComprar.style.color = "#2ecc71"; // Cor verde para sucesso
        textoComprar.textContent = "Compra realizada com sucesso! Obrigado.";
        
        // Limpa o carrinho após a compra
        produtosCarrinho = [];
        renderizarCarrinho();
    } else {
        // DISPARA O ALERTA NA TELA do usuário caso esteja vazio
        alert("Atenção: Seu carrinho está vazio! Adicione pelo menos um produto antes de finalizar a compra.");
        
        // Também exibe o aviso em texto na página (opcional)
        textoComprar.style.color = "#ff4d4d"; // Cor vermelha para erro
        textoComprar.textContent = "Seu carrinho está vazio! Adicione produtos antes de comprar.";
    }
});

// Executa uma vez ao carregar a página para mostrar o estado inicial vazio
renderizarCarrinho();

