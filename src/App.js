import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import People from "./pages/People";
import Transactions from "./pages/Transactions";
import TotalsPage from "./pages/TotalsPage";
import "./styles/global.css";

function App() {
  // Estado para armazenar a lista de pessoas
  const [people, setPeople] = useState(() => {
    const savedPeople = localStorage.getItem("people");
    return savedPeople ? JSON.parse(savedPeople) : [];
  });

  // Estado para armazenar a lista de transações
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Salva a lista de pessoas no localStorage sempre que ela é atualizada
  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  // Salva a lista de transações no localStorage sempre que ela é atualizada
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/people">Cadastro de Pessoas</Link></li>
            <li><Link to="/transactions">Cadastro de Transações</Link></li>
            <li><Link to="/totals">Consulta de Totais</Link></li>
          </ul>
        </nav>

        <Routes>
          {/* Passa os estados people e transactions como props para o componente Home */}
          <Route path="/" element={<Home people={people} transactions={transactions} />} />
          {/* Passa os estados people, setPeople, transactions e setTransactions como props para o componente People */}
          <Route path="/people" element={<People people={people} setPeople={setPeople} transactions={transactions} setTransactions={setTransactions} />} />
          {/* Passa os estados people, transactions e setTransactions como props para o componente Transactions */}
          <Route path="/transactions" element={<Transactions people={people} transactions={transactions} setTransactions={setTransactions} />} />
          <Route path="/totals" element={<TotalsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;