// URL base da API Spring Boot. Todas as requisições serão feitas para este endereço
const API = 'http://localhost:8081';

// ==================== NAVEGAÇÃO ====================

// Controla qual seção (marcas ou veículos) está visível na tela
// O parâmetro "nome" recebe 'marcas' ou 'veiculos'
function mostrarSecao(nome) {
    // Remove a classe 'ativa' de todas as seções, ocultando-as via CSS
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    // Remove a classe 'ativa' de todos os botões do menu
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('ativa'));

    // Adiciona 'ativa' apenas na seção correspondente ao botão clicado
    document.getElementById('secao-' + nome).classList.add('ativa');
    // Destaca o botão clicado no menu
    event.target.classList.add('ativa');

    // Ao entrar na seção de veículos, carrega as marcas no select e lista os veículos
    if (nome === 'veiculos') {
        carregarMarcasNoSelect();
        carregarVeiculos();
    }
}

// ==================== FEEDBACK ====================

// Exibe uma mensagem temporária de sucesso ou erro para o usuário
// id: id do elemento HTML onde a mensagem será exibida
// mensagem: texto a ser exibido
// tipo: 'sucesso' ou 'erro' (usado como classe CSS para estilização)
function mostrarfeedback(id, mensagem, tipo) {
    const el = document.getElementById(id);
    el.textContent = mensagem;
    el.className = 'feedback ' + tipo;
    // Remove a mensagem após 3 segundos (3000ms)
    setTimeout(() => { el.className = 'feedback'; }, 3000);
}

// ==================== MARCAS ====================

// Busca todas as marcas na API e preenche a tabela no HTML
async function carregarMarcas() {
    // fetch() faz uma requisição HTTP. Por padrão é GET
    const res = await fetch(`${API}/marca/listar`);
    // Converte a resposta JSON para um array JavaScript
    const marcas = await res.json();

    const tbody = document.getElementById('tabela-marcas');
    tbody.innerHTML = ''; // Limpa a tabela antes de preencher

    // Para cada marca, cria uma linha na tabela com botões de editar e excluir
    marcas.forEach(marca => {
        tbody.innerHTML += `
        <tr>
            <td>${marca.id}</td>
            <td>${marca.nome}</td>
            <td>
                <button class="btn btn-editar" onclick="editarMarca(${marca.id}, '${marca.nome}')">Editar</button>
                <button class="btn btn-deletar" onclick="deletarMarca(${marca.id})">Excluir</button>
            </td>
        </tr>`;
    });
}

// Salva uma marca nova (POST) ou atualiza uma existente (PUT)
async function salvarMarca() {
    // Se o campo hidden marca-id tiver valor, é uma edição; senão, é um cadastro novo
    const id = document.getElementById('marca-id').value;
    const nome = document.getElementById('marca-nome').value.trim();

    if (!nome) {
        mostrarfeedback('feedback-marcas', 'Informe o nome da marca.', 'erro');
        return;
    }

    // Define a URL e o método HTTP com base em ser criação ou edição
    const url = id ? `${API}/marca/atualizar/${id}` : `${API}/marca/novo`;
    const metodo = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method: metodo,
        headers: {
            // Informa ao servidor que o corpo da requisição está em formato JSON
            'Content-Type': 'application/json'
        },
        // JSON.stringify converte o objeto JavaScript para string JSON
        body: JSON.stringify({ nome })
    });

    if (res.ok) {
        mostrarfeedback('feedback-marcas', 'Marca salva com sucesso.', 'sucesso');
        limparFormMarca();
        carregarMarcas(); // Atualiza a tabela após salvar
    } else {
        mostrarfeedback('feedback-marcas', 'Erro ao salvar marca.', 'erro');
    }
}

// Exclui uma marca pelo id após confirmação do usuário
async function deletarMarca(id) {
    if (!confirm('Deseja deletar esta marca?')) return;

    const res = await fetch(`${API}/marca/deletar/${id}`, { method: 'DELETE' });

    if (res.ok) {
        mostrarfeedback('feedback-marcas', 'Marca deletada com sucesso.', 'sucesso');
        carregarMarcas();
    } else if (res.status === 409) {
        // Status 409 Conflict: a marca está vinculada a um veículo e não pode ser excluída
        mostrarfeedback('feedback-marcas', 'Não é possível deletar: marca está sendo utilizada por um veículo.', 'erro');
    } else {
        mostrarfeedback('feedback-marcas', 'Erro ao deletar marca.', 'erro');
    }
}

// Preenche o formulário com os dados da marca para edição
function editarMarca(id, nome) {
    document.getElementById('marca-id').value = id;
    document.getElementById('marca-nome').value = nome;
}

// Limpa todos os campos do formulário de marca
function limparFormMarca() {
    document.getElementById('marca-id').value = '';
    document.getElementById('marca-nome').value = '';
}

// ==================== VEÍCULOS ====================

// Busca as marcas na API e preenche o <select> do formulário de veículo
async function carregarMarcasNoSelect() {
    const res = await fetch(`${API}/marca/listar`);
    const marcas = await res.json();

    const select = document.getElementById('veiculo-marca');
    select.innerHTML = '<option value="">Selecione uma marca</option>';

    marcas.forEach(marca => {
        select.innerHTML += `<option value="${marca.id}">${marca.nome}</option>`;
    });
}

// Busca todos os veículos na API e preenche a tabela no HTML
async function carregarVeiculos() {
    const res = await fetch(`${API}/veiculo/listar`);
    const veiculos = await res.json();

    const tbody = document.getElementById('tabela-veiculos');
    tbody.innerHTML = '';

    veiculos.forEach(v => {
        tbody.innerHTML += `
        <tr>
            <td>${v.id}</td>
            <td>${v.modelo}</td>
            <td>${v.anoFabricacao}</td>
            <td>${v.marca.nome}</td>
            <td>
                <button class="btn btn-editar" onclick="editarVeiculo(${v.id}, '${v.modelo}', '${v.anoFabricacao}', ${v.marca.id})">Editar</button>
                <button class="btn btn-deletar" onclick="deletarVeiculo(${v.id})">Deletar</button>
            </td>
        </tr>`;
    });
}

// Salva um veículo novo (POST) ou atualiza um existente (PUT)
async function salvarVeiculo() {
    const id = document.getElementById('veiculo-id').value;
    const modelo = document.getElementById('veiculo-modelo').value.trim();
    const anoFabricacao = document.getElementById('veiculo-ano').value.trim();
    const marcaId = document.getElementById('veiculo-marca').value;

    if (!modelo || !anoFabricacao || !marcaId) {
        mostrarfeedback('feedback-veiculos', 'Preencha todos os campos.', 'erro');
        return;
    }

    const url = id ? `${API}/veiculo/atualizar/${id}` : `${API}/veiculo/novo`;
    const metodo = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        // Envia o objeto marca apenas com o id, pois o backend faz o relacionamento pelo id
        body: JSON.stringify({ modelo, anoFabricacao, marca: { id: parseInt(marcaId) } })
    });

    if (res.ok) {
        mostrarfeedback('feedback-veiculos', 'Veículo salvo com sucesso.', 'sucesso');
        limparFormVeiculo();
        carregarVeiculos();
    } else {
        mostrarfeedback('feedback-veiculos', 'Erro ao salvar veículo.', 'erro');
    }
}

// Exclui um veículo pelo id após confirmação do usuário
async function deletarVeiculo(id) {
    if (!confirm('Deseja deletar este veículo?')) return;

    const res = await fetch(`${API}/veiculo/deletar/${id}`, { method: 'DELETE' });

    if (res.ok) {
        mostrarfeedback('feedback-veiculos', 'Veículo deletado com sucesso.', 'sucesso');
        carregarVeiculos();
    } else {
        mostrarfeedback('feedback-veiculos', 'Erro ao deletar veículo.', 'erro');
    }
}

// Preenche o formulário com os dados do veículo para edição
// await garante que o select de marcas seja carregado antes de selecionar a marca correta
async function editarVeiculo(id, modelo, anoFabricacao, marcaId) {
    document.getElementById('veiculo-id').value = id;
    document.getElementById('veiculo-modelo').value = modelo;
    document.getElementById('veiculo-ano').value = anoFabricacao;
    await carregarMarcasNoSelect(); // Aguarda o select ser preenchido
    document.getElementById('veiculo-marca').value = marcaId; // Seleciona a marca correta
}

// Limpa todos os campos do formulário de veículo
function limparFormVeiculo() {
    document.getElementById('veiculo-id').value = '';
    document.getElementById('veiculo-modelo').value = '';
    document.getElementById('veiculo-ano').value = '';
    document.getElementById('veiculo-marca').value = '';
}

// Carrega as marcas automaticamente quando a página é aberta
carregarMarcas();
