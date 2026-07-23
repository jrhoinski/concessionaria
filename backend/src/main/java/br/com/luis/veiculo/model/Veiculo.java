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

    @ManyToOne
    @JoinColumn(name="id_marca", referencedColumnName = "id")
    private Marca marca;

    public Veiculo ( String modelo, String anoFabricacao, Marca marca) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.marca = marca;
    }
}
