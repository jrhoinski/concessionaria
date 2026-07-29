package br.com.luis.veiculo.controller;

import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

// @CrossOrigin permite que o frontend (rodando em outra porta/domínio) acesse esta API
// origins = "*" libera para qualquer origem. Em produção, especifique o domínio permitido
@CrossOrigin(origins = "*")
// Classe genérica com os métodos CRUD reutilizáveis por qualquer controller
// T = tipo da entidade (ex: Marca, Veiculo), ID = tipo do identificador (ex: Integer)
public class GenericController<T, ID> {

    // @Autowired injeta automaticamente o repository correspondente ao controller filho
    // O Spring identifica qual implementação usar com base no tipo genérico T
    @Autowired
    CrudRepository<T, ID> repository;

    // GET /listar → retorna todos os registros da entidade
    // ResponseEntity permite controlar o status HTTP da resposta (200, 404, etc.)
    @RequestMapping(value = "/listar", method = RequestMethod.GET)
    public ResponseEntity<Iterable<T>> listar() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    // GET /listar/{id} → retorna um registro específico pelo id
    // @PathVariable extrai o valor {id} da URL
    // Optional evita NullPointerException caso o registro não exista
    @RequestMapping(value = "/listar/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getById(@PathVariable(value = "id") ID id) {
        Optional<T> object = repository.findById(id);
        if (object.isPresent()) {
            return new ResponseEntity<>(object.get(), HttpStatus.OK);
        } else {
            // Retorna 404 se o registro não for encontrado
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // POST /novo → cria um novo registro
    // @RequestBody converte o JSON recebido no corpo da requisição para o objeto Java
    @RequestMapping(value = "/novo", method = RequestMethod.POST)
    public ResponseEntity<T> novo(@RequestBody T newObject) {
        return new ResponseEntity<>(repository.save(newObject), HttpStatus.OK);
    }

    // PUT /atualizar/{id} → atualiza um registro existente
    // BeanUtils.copyProperties copia os campos de newObject para oldObject,
    // ignorando o campo "id" para não sobrescrever a chave primária
    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> atualizar(@PathVariable(value = "id") ID id, @RequestBody T newObject) {
        Optional<T> object = repository.findById(id);

        if (object.isPresent()) {
            T oldObject = object.get();
            // Copia as propriedades do objeto recebido para o objeto existente, preservando o id
            BeanUtils.copyProperties(newObject, oldObject, "id");
            return new ResponseEntity<>(repository.save(oldObject), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE /deletar/{id} → remove um registro pelo id
    // DataIntegrityViolationException ocorre quando tentamos deletar um registro
    // que está sendo referenciado por outro (ex: deletar uma marca que tem veículos)
    @RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deletar(@PathVariable(value = "id") ID id) {
        Optional<T> object = repository.findById(id);

        if (object.isPresent()) {
            try {
                repository.deleteById(id);
                // 200 OK indica que a exclusão foi bem-sucedida
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                // 409 Conflict indica violação de integridade referencial no banco
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
