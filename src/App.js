// src/App.js
import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [weekType, setWeekType] = useState('Загрузка...');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const calculateWeekType = () => {
      // ⚠️ ЗАМЕНИ ЭТУ ДАТУ НА ПЕРВЫЙ ДЕНЬ ЧИСЛИТЕЛЯ В ТВОЁМ УЧЕБНОМ ГОДУ
      const firstNumeratorDate = new Date('2025-09-01'); // Понедельник первой числительной недели

      const today = new Date();
      setCurrentDate(today.toLocaleDateString('ru-RU'));

      // Вычисляем разницу в днях
      const diffTime = today - firstNumeratorDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // Определяем номер недели с начала учебного года
      const weekNumber = Math.floor(diffDays / 7) + 1;

      // Числитель — нечётные недели, знаменатель — чётные
      const isNumerator = weekNumber % 2 === 1;

      setWeekType(isNumerator ? 'Числитель' : 'Знаменатель');
    };

    calculateWeekType();
  }, []);

  return (
    <div className="card">
      <h1>Текущая учебная неделя</h1>
      <div className="week-type">{weekType}</div>
      <div>📅 {currentDate}</div>
    </div>
  );
}

export default App;