# Controle de Gastos Residenciais

Este projeto é um sistema de controle de gastos residenciais que permite gerenciar finanças pessoais de forma eficiente. O sistema permite cadastrar pessoas, registrar transações de receitas e despesas (Cadastros como menor de idade, apenas transações de despesa), e visualizar um resumo financeiro detalhado.

## Funcionalidades

- Cadastro de Pessoas
- Registro de Transações
- Consulta de Totais
- Filtragem de Transações por Tipo

## Tecnologias Utilizadas

- React:
Biblioteca JavaScript para construção de interfaces de usuário.
Componentes funcionais e hooks (useState, useEffect).

- React Router:
Biblioteca para gerenciamento de rotas em aplicações React.
Uso de BrowserRouter, Route, Routes e Link.

- CSS:
Estilização das páginas e componentes.
Arquivos CSS separados para cada página (global.css, home.css, people.css, transactions.css, totalsPage.css).

- Local Storage:
Armazenamento de dados no navegador para persistência de estado.
Uso de localStorage para salvar e carregar dados de pessoas e transações.


## Técnicas Utilizadas

- Gerenciamento de Estado:
Uso de hooks (useState, useEffect) para gerenciar o estado dos componentes.
Estados para armazenar listas de pessoas e transações, IDs disponíveis, filtros, etc.

- Persistência de Dados:
Uso de localStorage para salvar e carregar dados de pessoas e transações.
Persistência de IDs disponíveis e próximos IDs a serem utilizados.

- Filtragem de Dados:
Implementação de filtros para exibir transações por tipo (receitas, despesas, todos).

- Formatação de Dados:
Uso de toLocaleString para formatar valores numéricos como moeda brasileira (BRL).
