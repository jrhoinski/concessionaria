package br.com.luis.veiculo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.luis.veiculo.model.Marca;

// @RestController indica que esta classe é um controller REST
// Combina @Controller + @ResponseBody, ou seja, os métodos retornam dados (JSON) diretamente
@RestController
// @RequestMapping define o prefixo de todas as rotas deste controller
// Rotas disponíveis: GET /marca/listar, POST /marca/novo, PUT /marca/atualizar/{id}, DELETE /marca/deletar/{id}
@RequestMapping(value = "/marca")
// Herda todos os métodos CRUD do GenericController para a entidade Marca com id do tipo Integer
public class MarcaController extends GenericController<Marca, Integer> {

}
