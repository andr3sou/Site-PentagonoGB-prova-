// PRODUTOS DA LOJA
const produtosLoja = [
    { id: 1, nome: "Produto", preco: 50 },
    { id: 2, nome: "Produto", preco: 75 },
    { id: 3, nome: "Produto", preco: 100 },
    { id: 4, nome: "Produto", preco: 150 }
];

// CARRINHO
let produtosCarrinho = [];

// PEGA TODOS OS BOTÕES DOS PRODUTOS
const botoesAdicionar = document.querySelectorAll(".produto button");

// ADICIONA EVENTO AOS BOTÕES
botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        adicionarAoCarrinho(produtosLoja[index].id);
    });
});

// ADICIONAR PRODUTO
function adicionarAoCarrinho(id) {

    const produto = produtosLoja.find(prod => prod.id === id);

    const existente = produtosCarrinho.find(prod => prod.id === id);

    if (existente) {
        existente.quantidade++;
    } else {
        produtosCarrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    renderizarCarrinho();
}

// RENDERIZAR CARRINHO
function renderizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");

    lista.innerHTML = "";

    let somaTotal = 0;

    produtosCarrinho.forEach(produto => {

        somaTotal += produto.preco * produto.quantidade;

        const div = document.createElement("div");
        div.className = "item-carrinho";

        div.innerHTML = `
            <span>
                ${produto.nome} (x${produto.quantidade})
            </span>

            <div>
                R$ ${produto.preco * produto.quantidade}

                <button onclick="mudarQuantidade(${produto.id}, 1)">
                    +
                </button>

                <button onclick="mudarQuantidade(${produto.id}, -1)">
                    -
                </button>

                <button onclick="removerProduto(${produto.id})">
                    Remover
                </button>
            </div>
        `;

        lista.appendChild(div);
    });

    total.textContent = "Total: R$ " + somaTotal.toFixed(2);
}

// ALTERAR QUANTIDADE
function mudarQuantidade(id, valor) {

    produtosCarrinho = produtosCarrinho
        .map(produto => {

            if (produto.id === id) {

                return {
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    quantidade: produto.quantidade + valor
                };
            }

            return produto;
        })
        .filter(produto => produto.quantidade > 0);

    renderizarCarrinho();
}

// REMOVER PRODUTO
function removerProduto(id) {

    produtosCarrinho = produtosCarrinho.filter(
        produto => produto.id !== id
    );

    renderizarCarrinho();
}

// LIMPAR CARRINHO
const btnLimpar = document.getElementById("limpar");

btnLimpar.addEventListener("click", () => {

    if (produtosCarrinho.length > 0) {
        produtosCarrinho = [];
        renderizarCarrinho();
    }
});

// COMPRAR
const btnComprar = document.getElementById("comprar");

btnComprar.addEventListener("click", () => {

    const textoAlerta = document.getElementById("texto-comprar");

    if (produtosCarrinho.length > 0) {

        produtosCarrinho = [];
        renderizarCarrinho();

        textoAlerta.textContent = "Sucesso na compra!";
        textoAlerta.style.color = "green";

    } else {

        textoAlerta.textContent = "Sem itens para comprar!";
        textoAlerta.style.color = "red";
    }
});
