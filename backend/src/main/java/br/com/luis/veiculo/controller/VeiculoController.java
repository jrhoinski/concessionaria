package br.com.luis.veiculo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.luis.veiculo.model.Veiculo;

@RestController
@RequestMapping(value = "/veiculo")
public class VeiculoController extends GenericController<Veiculo, Integer> {
    
}
