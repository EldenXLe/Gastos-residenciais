import React, { useState, useEffect } from "react";
import "./../styles/people.css";

/**
 * Componente People
 * Gerencia o cadastro de pessoas e suas transações associadas.
 * @param {Array} people - Lista de pessoas cadastradas.
 * @param {Function} setPeople - Função para atualizar a lista de pessoas.
 * @param {Array} transactions - Lista de transações registradas.
 * @param {Function} setTransactions - Função para atualizar a lista de transações.
 */
const People = ({ people, setPeople, transactions, setTransactions }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nextId, setNextId] = useState(() => {
    const savedNextId = localStorage.getItem("nextPersonId");
    return savedNextId ? parseInt(savedNextId) : 1;
  });
  const [availableIds, setAvailableIds] = useState(() => {
    const savedAvailableIds = localStorage.getItem("availablePersonIds");
    return savedAvailableIds ? JSON.parse(savedAvailableIds) : [];
  });

  // Salva a lista de pessoas no localStorage sempre que ela é atualizada
  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  // Salva o próximo ID de pessoa no localStorage sempre que ele é atualizado
  useEffect(() => {
    localStorage.setItem("nextPersonId", nextId);
  }, [nextId]);

  // Salva a lista de IDs disponíveis no localStorage sempre que ela é atualizada
  useEffect(() => {
    localStorage.setItem("availablePersonIds", JSON.stringify(availableIds));
  }, [availableIds]);

  /**
   * Adiciona uma nova pessoa à lista de pessoas.
   * Reutiliza IDs disponíveis ou incrementa o próximo ID.
   * @param {Event} e - Evento de submissão do formulário.
   */
  const addPerson = (e) => {
    e.preventDefault();
    if (name && age) {
      const newId = availableIds.length > 0 ? availableIds.shift() : nextId;
      const newPerson = { id: newId, name, age: parseInt(age) };
      setPeople([...people, newPerson]);
      setName("");
      setAge("");
      if (availableIds.length === 0 && newId === nextId) {
        setNextId(nextId + 1);
      }
      setAvailableIds([...availableIds]);
    }
  };

  /**
   * Remove uma pessoa da lista de pessoas e suas transações associadas.
   * Adiciona o ID removido à lista de IDs disponíveis.
   * @param {number} id - ID da pessoa a ser removida.
   */
  const deletePerson = (id) => {
    setPeople(people.filter((person) => person.id !== id));
    setTransactions(transactions.filter((transaction) => transaction.personId !== id));
    setAvailableIds([...availableIds, id].sort((a, b) => a - b));
  };

  return (
    <div>
      <h1>Cadastro de Pessoas</h1>
      <form onSubmit={addPerson}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Adicionar Pessoa</button>
      </form>

      <h2>Pessoas Registradas</h2>
      <ul>
        {people
          .slice() // Cria uma cópia da lista de pessoas
          .sort((a, b) => a.id - b.id) // Ordena a lista de pessoas pelo ID
          .map((person) => (
            <li key={person.id}>
              {person.id}. {person.name} - {person.age} anos
              <button onClick={() => deletePerson(person.id)}>Remover</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default People;