package br.com.luis.veiculo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.luis.veiculo.model.Veiculo;

// Mesmo padrão do MarcaController, mas para a entidade Veiculo
// Rotas disponíveis: GET /veiculo/listar, POST /veiculo/novo, PUT /veiculo/atualizar/{id}, DELETE /veiculo/deletar/{id}
@RestController
@RequestMapping(value = "/veiculo")
public class VeiculoController extends GenericController<Veiculo, Integer> {

}
