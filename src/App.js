// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Состояния
  const [weekType, setWeekType] = useState('...');
  const [currentDate, setCurrentDate] = useState('');
  const [theme, setTheme] = useState('light'); // 'light' или 'dark'
  const [language, setLanguage] = useState('ru'); // 'ru' или 'en'

  // Определяем системную тему
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || (
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  // Определяем системный язык
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || (
      navigator.language.startsWith('en') ? 'en' : 'ru'
    );
    setLanguage(savedLang);
  }, []);

  // Пересчитываем неделю
  useEffect(() => {
    const calculateWeekType = () => {
      // ⚠️ ЗАМЕНИ НА ПЕРВЫЙ ДЕНЬ ЧИСЛИТЕЛЯ В ТВОЁМ КАЛЕНДАРЕ
      const firstNumeratorDate = new Date('2025-09-01');

      const today = new Date();
      setCurrentDate(today.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US'));

      const diffTime = today - firstNumeratorDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const weekNumber = Math.floor(diffDays / 7) + 1;
      const isNumerator = weekNumber % 2 === 1;

      setWeekType(isNumerator ? (language === 'ru' ? 'Числитель' : 'Numerator') : (language === 'ru' ? 'Знаменатель' : 'Denominator'));
    };

    calculateWeekType();
  }, [language]);

  // Меняем тему
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Меняем язык
  const toggleLanguage = () => {
    const newLang = language === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // Тексты в зависимости от языка
  const texts = {
    title: language === 'ru' ? 'Текущая учебная неделя' : 'Current Academic Week',
    theme: language === 'ru' ? 'Тема' : 'Theme',
    lang: language === 'ru' ? 'Язык' : 'Language',
    light: language === 'ru' ? 'Светлая' : 'Light',
    dark: language === 'ru' ? 'Тёмная' : 'Dark',
    ru: 'Русский',
    en: 'English',
  };

  return (
    <div className="card">
      <div className="controls">
        <button onClick={toggleTheme} className="btn-control">
          {texts.theme}: {theme === 'light' ? texts.light : texts.dark}
        </button>
        <button onClick={toggleLanguage} className="btn-control">
          {texts.lang}: {language === 'ru' ? texts.ru : texts.en}
        </button>
      </div>

      <h1>{texts.title}</h1>
      <div className="week-type">{weekType}</div>
      <div className="date">📅 {currentDate}</div>
    </div>
  );
}

export default App;