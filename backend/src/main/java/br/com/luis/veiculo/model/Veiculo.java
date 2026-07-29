package br.com.luis.veiculo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "veiculo")
@Data
@NoArgsConstructor
// @AllArgsConstructor do Lombok gera um construtor com todos os campos como argumentos
@AllArgsConstructor
public class Veiculo {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "modelo")
    private String modelo;
    
    @Column(name = "ano_fabricacao")
    private String anoFabricacao;

    // @ManyToOne define o relacionamento: muitos veículos pertencem a uma marca
    @ManyToOne
    // @JoinColumn define a coluna de chave estrangeira na tabela veiculo que referencia a tabela marca
    @JoinColumn(name = "id_marca", referencedColumnName = "id")
    private Marca marca;

    // Construtor personalizado sem o campo id, útil para criar veículos antes de persistir no banco
    public Veiculo(String modelo, String anoFabricacao, Marca marca) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.marca = marca;
    }
}
