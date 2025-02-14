import React, { useState, useEffect } from "react";
import "./../styles/transactions.css";

/**
 * Componente Transactions
 * Gerencia o cadastro de transações e exibe a lista de transações registradas.
 * 
 * @param {Array} people - Lista de pessoas cadastradas.
 * @param {Array} transactions - Lista de transações registradas.
 * @param {Function} setTransactions - Função para atualizar a lista de transações.
 */
const Transactions = ({ people, transactions, setTransactions }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("despesa");
  const [personId, setPersonId] = useState("");
  const [nextId, setNextId] = useState(() => {
    const savedNextId = localStorage.getItem("nextTransactionId");
    return savedNextId ? parseInt(savedNextId) : 1;
  });
  const [availableIds, setAvailableIds] = useState(() => {
    const savedAvailableIds = localStorage.getItem("availableTransactionIds");
    return savedAvailableIds ? JSON.parse(savedAvailableIds) : [];
  });
  const [filter, setFilter] = useState("all"); // Estado para armazenar o tipo de filtro selecionado

  // Salva a lista de transações no localStorage sempre que ela é atualizada
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Salva o próximo ID de transação no localStorage sempre que ele é atualizado
  useEffect(() => {
    localStorage.setItem("nextTransactionId", nextId);
  }, [nextId]);

  // Salva a lista de IDs disponíveis no localStorage sempre que ela é atualizada
  useEffect(() => {
    localStorage.setItem("availableTransactionIds", JSON.stringify(availableIds));
  }, [availableIds]);

  /**
   * Adiciona uma nova transação à lista de transações.
   * Reutiliza IDs disponíveis ou incrementa o próximo ID.
   * @param {Event} e - Evento de submissão do formulário.
   */
  const addTransaction = (e) => {
    e.preventDefault();
    const person = people.find((p) => p.id === parseInt(personId));
    if (!person) {
      alert("Pessoa não encontrada!");
      return;
    }
    if (person.age < 18 && type === "receita") {
      alert("Menores de idade só podem registrar despesas!");
      return;
    }
    if (description && amount && personId) {
      const newId = availableIds.length > 0 ? availableIds.shift() : nextId;
      const newTransaction = {
        id: newId,
        description,
        amount: parseFloat(amount),
        type,
        personId: parseInt(personId),
      };
      setTransactions([...transactions, newTransaction]);
      setDescription("");
      setAmount("");
      setType("despesa");
      setPersonId("");
      if (availableIds.length === 0 && newId === nextId) {
        setNextId(nextId + 1);
      }
      setAvailableIds([...availableIds]);
    }
  };

  // Filtra as transações com base no tipo selecionado
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });


  //Formata um valor numérico como moeda brasileira (BRL).
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div>
      <h1>Cadastro de Transações</h1>
      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="ID da Pessoa"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
        <button type="submit">Adicionar Transação</button>
      </form>

      <h2>Transações Registradas</h2>
      <div className="filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="despesa">Despesas</option>
          <option value="receita">Receitas</option>
        </select>
      </div>
      <ul className="transactions">
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id}>
            Transação ID {transaction.id}: {transaction.description} ({transaction.type}) <br/> Nome e ID: {people.find((p) => p.id === transaction.personId)?.name} - {transaction.personId} <br/> Valor: {formatCurrency(transaction.amount)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;