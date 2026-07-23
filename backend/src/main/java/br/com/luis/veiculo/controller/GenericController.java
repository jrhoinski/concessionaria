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

@CrossOrigin(origins = "*")
public class GenericController<T, ID>{
    @Autowired
    CrudRepository<T, ID> repository;

 
    @RequestMapping(value = "/listar", method = RequestMethod.GET)
    public ResponseEntity<Iterable<T>> listar () {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }                                                                                                           

    // GET id
    @RequestMapping(value = "/listar/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getById(@PathVariable(value="id") ID id){
        Optional<T> object = repository.findById(id);        
        if(object.isPresent()) {
            return new ResponseEntity<>(object.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
  
    // POST
    @RequestMapping(value = "/novo", method = RequestMethod.POST)
    public ResponseEntity<T> novo(@RequestBody T newObject){
        return new ResponseEntity<>(repository.save(newObject), HttpStatus.OK);
    }

    // PUT
    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> atualizar(@PathVariable(value = "id") ID id, @RequestBody T newObject) {
        Optional<T> object = repository.findById(id);

        if(object.isPresent()){
            T oldObject = object.get();
            BeanUtils.copyProperties(newObject, oldObject, "id");
           
            return new ResponseEntity<>(repository.save(oldObject), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE
    @RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deletar (@PathVariable(value = "id") ID id) {
        Optional<T> object = repository.findById(id);

        if(object.isPresent()){
            try {
                repository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (DataIntegrityViolationException e){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
