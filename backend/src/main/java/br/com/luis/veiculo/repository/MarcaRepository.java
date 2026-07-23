package br.com.luis.veiculo.repository;

import org.springframework.data.repository.CrudRepository;
import br.com.luis.veiculo.model.Marca;

interface MarcaRepository extends CrudRepository<Marca, Integer>{

    
}