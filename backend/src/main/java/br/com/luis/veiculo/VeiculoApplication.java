package br.com.luis.veiculo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication é a anotação principal do Spring Boot.
// Ela combina três anotações:
// - @Configuration: indica que esta classe pode definir beans (objetos gerenciados pelo Spring)
// - @EnableAutoConfiguration: configura automaticamente o projeto com base nas dependências do pom.xml
// - @ComponentScan: varre o pacote atual e subpacotes em busca de classes anotadas (@RestController, @Service, etc.)
@SpringBootApplication
public class VeiculoApplication {

	// Método principal que inicia a aplicação Spring Boot
	// SpringApplication.run() sobe o servidor embutido (Tomcat) e inicializa todo o contexto do Spring
	public static void main(String[] args) {
		SpringApplication.run(VeiculoApplication.class, args);
	}

}
