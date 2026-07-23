package br.com.luis.veiculo.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.luis.veiculo.model.Veiculo;
public interface VeiculoRepository extends CrudRepository<Veiculo, Integer> {
    
}
