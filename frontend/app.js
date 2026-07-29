const API = 'http://localhost:8081'; // URL base da API

// Navagação
function mostrarSecao(nome) {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.add('ativa'));

    document.getElementById('secao-' + nome).classList.add('ativa');
    event.target.classList.add('ativa');

    if(nome ==='veiculos') { 
        carregarMarcasNoSelect(); 
        carregarVeiculos(); 
    }
}

// Feedback
function mostrarfeedback(id, mensagem, tipo){
    const el = document.getElementById(id);
    el.textContent = mensagem;
    el.className = 'feedback ' + tipo;
    setTimeout(() => { el.className = 'feedback'; }, 3000);
}

async function carregarMarcas(){
    const res  = await fetch(`${API}/marca/listar`);
    const marcas = await res.json();

    const tbody = document.getElementById('tabela-marcas');
    tbody.innerHTML = '';

    marcas.forEach(marca => {
       tbody.innerHTML += `
        <tr>
            <td>${marca.id}</td>
            <td>${marca.nome}</td>
            <td>
                <button class="btn btn-editar" onclick="editarMarca(${marca.id}, '${marca.nome}')">Editar</button>
                <button class="btn btn-deletar" onclick="deletarMarca(${marca.id})">Excluir</button>
            </td>
        </tr>`
    });
}

async function salvarMarca(){
    const id = document.getElementById('marca-id').value;
    const nome = document.getElementById('marca-nome').value.trim();

    if(!nome){
        mostrarfeedback('feedback-marca', 'Informe o nome da marca.', 'erro');
        return;
    }
    const url = id ? `${API}/marca/atualizar/${id}` : `${API}/marca/novo`;
    const metodo = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome})
    });
    
    if(res.ok) {
        mostrarfeedback('feedback-marcas', 'Marca Salva com sucesso', 'sucesso');
        limparFormMarca();
        carregarMarcas();
    } else {
        mostrarfeedback('feedback-marcas', 'Erro ao salvar marca.', 'erro');
    }
}

async function deletarMarca(id) {

    if(!confirm('Deseja deletar esta marca?')) return;

    const res = await fetch(`${API}/marca/deletar/${id}`, {method: 'DELETE'});

    if(res.ok) {
        mostrarfeedback('feedback-marcas', 'Marca deletada com sucesso.', 'sucesso');
        carregarMarcas();
    } else if(res.status === 409) {
        mostrarfeedback('feedback-marcas', 'Não é possível deletar: marca está sendo utilizada por um veículo.', 'erro');
    } else {
        mostrarfeedback('feedback-marcas', 'Erro ao deletar marca.', 'erro');
    } 
}

function editarMarca(id, nome) {
    document.getElementById('marca-id').value = id;
    document.getElementById('marca-nome').value = nome;    
}

function limparFormMarca() {
    document.getElementById('marca-id').value = '';
    document.getElementById('marca-nome').value = '';
}

// Veículos
async function carregarMarcasNoSelect() {
    const res = await fetch(`${API}/marca/listar`);
    const marcas = await res.json();

    const select = document.getElementById('veiculo-marca');
    select.innerHTML = '<option value="">Selecione uma marca</option>';

    marcas.forEach(marca => {
        select.innerHTML += `<option value="${marca.id}">${marca.nome}</option>`;
    });
}

async function carregarVeiculos(){
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

async function salvarVeiculo(){
    const id = document.getElementById('veiculo-id').value;
    const modelo = document.getElementById('veiculo-modelo').value.trim();
    const anoFabricacao = document.getElementById('veiculo-ano').value.trim();
    const marcaId = document.getElementById('veiculo-marca').value;

    if(!modelo || !anoFabricacao || !marcaId) {
        mostrarfeedback('feedback-veiculos', 'Preencha todos os campos.', 'erro');
        return;
    }

    const url = id ? `${API}/veiculo/atualizar/${id}` : `${API}/veiculo/novo`;
    const metodo = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({modelo, anoFabricacao, marca:{id: parseInt(marcaId)} })
    });

    if(res.ok) {
        mostrarfeedback('feedback-veiculos', 'Veículo salvo com sucesso.', 'sucesso');
        limparFormVeiculo();
        carregarVeiculos();
    } else {
        mostrarfeedback('feedback-veiculos', 'Erro ao salvar veículo.', 'erro');
    }
}

async function deletarVeiculo(id) {
    if(!confirm('Deseja deletar este veículo?')) return;

    const res = await fetch(`${API}/veiculo/deletar/${id}`, {method: 'DELETE'});

    if(res.ok) {
        mostrarfeedback('feedback-veiculos', 'Veículo deletado com sucesso.', 'sucesso');
        carregarVeiculos();
    } else {
        mostrarfeedback('feedback-veiculos', 'Erro ao deletar veículo.', 'erro');
    }
}

async function editarVeiculo(id, modelo, anoFabricacao, marcaId) {
    document.getElementById('veiculo-id').value = id;
    document.getElementById('veiculo-modelo').value = modelo;
    document.getElementById('veiculo-ano').value = anoFabricacao;
    await carregarMarcasNoSelect();
    document.getElementById('veiculo-marca').value = marcaId;
}

function limparFormVeiculo() {
    document.getElementById('veiculo-id').value = '';
    document.getElementById('veiculo-modelo').value = '';
    document.getElementById('veiculo-ano').value = '';
    document.getElementById('veiculo-marca').value = '';
}

carregarMarcas();
