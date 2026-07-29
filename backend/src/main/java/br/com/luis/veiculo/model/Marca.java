package br.com.luis.veiculo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Entity indica que esta classe representa uma tabela no banco de dados (JPA/Hibernate)
@Entity
// @Table define o nome da tabela no banco. Se omitido, usaria o nome da classe
@Table(name = "marca")
// @Data do Lombok gera automaticamente: getters, setters, toString, equals e hashCode
@Data
// @NoArgsConstructor do Lombok gera um construtor sem argumentos, exigido pelo JPA
@NoArgsConstructor
public class Marca {

    // @Id indica que este campo é a chave primária da tabela
    @Id
    // @Column mapeia o campo Java para a coluna do banco de dados
    @Column(name = "id")
    // @GeneratedValue define que o valor do id será gerado automaticamente pelo banco (auto increment)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome")
    private String nome;
    
}
