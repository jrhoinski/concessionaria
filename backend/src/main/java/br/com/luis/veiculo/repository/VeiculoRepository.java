package br.com.luis.veiculo.repository;

import org.springframework.data.repository.CrudRepository;
import br.com.luis.veiculo.model.Veiculo;

// Mesmo padrão do MarcaRepository, mas para a entidade Veiculo
// O Spring Data JPA cria a implementação automaticamente em tempo de execução
public interface VeiculoRepository extends CrudRepository<Veiculo, Integer> {

}
