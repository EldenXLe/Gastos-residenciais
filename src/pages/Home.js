import React from "react";
import "./../styles/home.css";

/**
 * Componente Home
 * Exibe a página inicial do sistema com informações e funcionalidades disponíveis.
 * @param {Array} people - Lista de pessoas cadastradas.
 * @param {Array} transactions - Lista de transações registradas.
 */
const Home = ({ people, transactions }) => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Controle de Gastos Residenciais</h1>
      <h2>Selecione uma opção na barra de navegação acima para iniciar!</h2>
      <p>
        Este sistema permite que você gerencie suas finanças pessoais de forma
        eficiente. Você pode cadastrar pessoas, registrar transações de receitas
        e despesas, e visualizar um resumo financeiro detalhado.
      </p>
      <div className="features">
        <h3>Funcionalidades:</h3>
        <ul>
          <li>Cadastro de Pessoas</li>
          <li>Registro de Transações</li>
          <li>Consulta de Totais</li>
          <li>Filtragem de Transações por Tipo</li>
        </ul>
      </div>
      <div className="summary">
        <h3>Resumo Rápido:</h3>
        <p>Total de Pessoas Cadastradas: {people.length}</p>
        <p>Total de Transações Registradas: {transactions.length}</p>
      </div>
    </div>
  );
};

export default Home;