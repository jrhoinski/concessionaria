package br.com.luis.veiculo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.luis.veiculo.model.Marca;

@RestController
@RequestMapping(value = "/marca")
public class MarcaController extends GenericController<Marca, Integer> {
        
}