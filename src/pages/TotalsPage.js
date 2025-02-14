import React, { useState, useEffect } from "react";
import "./../styles/totalsPage.css";

/**
 * Componente TotalsPage
 * Exibe um resumo financeiro com o total de receitas, despesas e saldo líquido para cada pessoa cadastrada.
 */
const TotalsPage = () => {
  const [people, setPeople] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Carrega os dados de pessoas e transações do localStorage ao inicializar o componente
  useEffect(() => {
    const savedPeople = localStorage.getItem("people");
    const savedTransactions = localStorage.getItem("transactions");
    if (savedPeople) {
      setPeople(JSON.parse(savedPeople));
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  /**
   * Calcula o total de receitas, despesas e saldo líquido para uma pessoa específica.
   * @param {number} personId - ID da pessoa.
   * @returns {Object} - Objeto contendo o total de receitas, despesas e saldo líquido.
   */
  const calculateTotals = (personId) => {
    const personTransactions = transactions.filter(transaction => transaction.personId === personId);
    const income = personTransactions.filter(transaction => transaction.type === "receita").reduce((acc, transaction) => acc + transaction.amount, 0);
    const expenses = personTransactions.filter(transaction => transaction.type === "despesa").reduce((acc, transaction) => acc + transaction.amount, 0);
    return { income, expenses, netBalance: income - expenses };
  };

  // Calcula o total geral de receitas, despesas e saldo líquido
  const totalIncome = transactions.filter(transaction => transaction.type === "receita").reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenses = transactions.filter(transaction => transaction.type === "despesa").reduce((acc, transaction) => acc + transaction.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  /**
   * Formata um valor numérico como moeda brasileira (BRL).
   * @param {number} value - Valor a ser formatado.
   * @returns {string} - Valor formatado como moeda.
   */
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div>
      <h1>Consulta de Totais</h1>
      <h2>Resumo Financeiro</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Renda Total</th>
            <th>Despesas Totais</th>
            <th>Saldo Líquido</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => {
            const { income, expenses, netBalance } = calculateTotals(person.id);
            return (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{formatCurrency(income)}</td>
                <td>{formatCurrency(expenses)}</td>
                <td>{formatCurrency(netBalance)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Totais Gerais</h2>
      <table className="totals">
        <tbody>
          <tr>
            <td>Renda Total:</td>
            <td>{formatCurrency(totalIncome)}</td>
          </tr>
          <tr>
            <td>Despesas Totais:</td>
            <td>{formatCurrency(totalExpenses)}</td>
          </tr>
          <tr>
            <td>Saldo Líquido:</td>
            <td>{formatCurrency(netBalance)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TotalsPage;