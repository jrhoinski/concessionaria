package br.com.luis.veiculo.repository;

import org.springframework.data.repository.CrudRepository;
import br.com.luis.veiculo.model.Marca;

// Repository é a camada responsável pela comunicação com o banco de dados.
// Ao estender CrudRepository, ganhamos automaticamente os métodos:
// - save()      → INSERT ou UPDATE
// - findById()  → SELECT por id
// - findAll()   → SELECT todos
// - deleteById()→ DELETE por id
// - count()     → COUNT
// O primeiro tipo genérico (Marca) é a entidade, o segundo (Integer) é o tipo do id
interface MarcaRepository extends CrudRepository<Marca, Integer> {
    // Podemos declarar métodos personalizados aqui se necessário
    // Ex: List<Marca> findByNome(String nome);
}
