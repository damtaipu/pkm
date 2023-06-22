## Sistema de Teste de Funcionalidades em Angular 16
Este é um sistema desenvolvido em Angular 16 que tem como objetivo realizar testes de diversas funcionalidades e recursos. Foi construído utilizando standalone components, adotando o padrão de inversão e injeção de dependências em uma arquitetura clean. O sistema acessa a PokeAPI para obter informações sobre Pokémon e oferece recursos como filtro de busca por nome, paginação dos resultados, gerenciamento do estado dos comentários e favoritos utilizando o NGRX. Além disso, utiliza as bibliotecas Bootstrap e NG Bootstrap para os modais, Lazy loading para otimização de carregamento e formControls para a implementação de formulários reativos.

### Funcionalidades
O sistema oferece as seguintes funcionalidades de teste:

Filtro de Busca por Nome de Pokémon: É possível pesquisar Pokémon pelo seu nome utilizando um filtro de busca. Os resultados serão exibidos na página, permitindo testar a funcionalidade de filtragem.
Paginação dos Resultados: Os resultados da pesquisa são exibidos em uma lista paginada, permitindo a navegação entre as páginas de resultados. Essa funcionalidade pode ser testada para verificar o comportamento correto da paginação.
Gerenciamento de Estado com NGRX: O sistema utiliza a biblioteca NGRX para gerenciar o estado dos comentários e favoritos dos Pokémon. É possível testar a adição, remoção e visualização dos comentários e favoritos, verificando se o estado é mantido corretamente.
Utilização das Bibliotecas Bootstrap e NG Bootstrap: Os modais do sistema são implementados utilizando as bibliotecas Bootstrap e NG Bootstrap. É possível testar a abertura e o fechamento dos modais, bem como a interação com os componentes presentes neles.
Lazy Loading: O sistema utiliza o recurso de Lazy Loading, que otimiza o carregamento da aplicação, dividindo-a em módulos carregados sob demanda. Isso permite uma melhor performance e uma experiência de usuário mais rápida.
FormControls e Formulários Reativos: O sistema utiliza os formControls do Angular para implementar formulários reativos, proporcionando validações e interações avançadas nos campos de entrada de dados.

### Arquitetura Clean e Inversão de Dependências
O sistema adota o padrão de arquitetura clean, que tem como objetivo separar as responsabilidades e manter uma estrutura de código limpa e organizada. A arquitetura é dividida em camadas, cada uma com sua responsabilidade específica.
A adoção da arquitetura clean e da inversão de dependências traz benefícios como a separação clara de responsabilidades, facilitando a manutenção e testabilidade do código, além de permitir a substituição de implementações sem afetar as outras camadas.

### Dependências e Ferramentas
O sistema utiliza as seguintes dependências e ferramentas:

 - Angular 16: Um framework de desenvolvimento web utilizado para
   construir a aplicação.
 - Bootstrap: Uma biblioteca de componentes CSS que oferece um conjunto
   completo de recursos de interface do usuário para agilizar o
   desenvolvimento.
 - NG Bootstrap: Uma biblioteca que oferece componentes Bootstrap
   otimizados para uso com o Angular, fornecendo recursos adicionais e
   uma integração mais suave com o framework.
 - NGRX: Uma biblioteca para gerenciamento de estado baseado em Redux,
   que permite a criação de uma store centralizada para armazenar o
   estado da aplicação e ações que modificam esse estado.
 - Lazy Loading: Um recurso do Angular que permite carregar módulos sob
   demanda, melhorando a performance e o tempo de carregamento da
   aplicação.
 - FormControls: Recurso do Angular para a implementação de formulários
   reativos, proporcionando validações e interações avançadas nos campos
   de entrada de dados.

### Instalação e Execução
Link para visualização online: https://softplan-teste.web.app/

Para instalar e executar o sistema localmente, siga as etapas abaixo:

 - Clone o repositório do sistema para o seu ambiente local.
 - Certifique-se de ter o Angular CLI v16 instalado globalmente em sua
   máquina.

