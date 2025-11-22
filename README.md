# 1. Запускаем вотчер для компиляции (оставляем работать)

npm run dev - автоматически компилирует TS в JS при каждом сохранении

# 2. В другом окне терминала запускаем сервер

npm run serve

# Полная пересборка с чистого листа

npm run clean
npm run build
npm run serve






# Отчет по валидации форм

## Участники команды ts-pair-khuzhokov-balynin

**Кушжетеров Ибрагим Хасанович** - 1 практическая работа, README  
**Мохманд Марватулла** - 2 практическая работа

## Сравнение библиотек валидации

### Критерии оценки библиотек:

- **Zod** - лучшая TypeScript-интеграция, независимость от фреймворка, элегантный API
- **Yup** - проверенная временем библиотека, менее строгая типизация
- **Superstruct** - хорошая поддержка, но меньше возможностей
- **Joi** - практически нет TS поддержки
- **AJV** - слабая интеграция

## Библиотека JustValidate

### Точка входа:
import JustValidate from 'just-validate';
const validator = new JustValidate('#form');

### Конструктор:
new JustValidate(form, options)

### Основные методы:

#### Добавление поля с валидацией
.addField(field, rules)
- field - селектор или DOM-элемент поля
- rules - массив объектов с правилами валидации
- Возвращает: this

#### Обработчики событий
.onSuccess(callback) - обработчик успешной валидации
.onFail(callback) - обработчик ошибок валидации
- Возвращает: this

### Часто используемые правила валидации:

[
  { rule: 'required' },
  { rule: 'email' },
  { rule: 'minLength', value: 6 },
  { rule: 'maxLength', value: 30 },
  { rule: 'password' },
  { rule: 'number' },
  { rule: 'minNumber', value: 0 },
  { rule: 'maxNumber', value: 100 }
]

### Дополнительные методы:

.addRequiredGroup(groupSelector) - добавляет валидацию для группы чекбоксов/радиокнопок
- Возвращает: this

.revalidate() - принудительно перепроверяет все поля формы
- Возвращает: void

.destroy() - полностью удаляет валидатор с формы
- Возвращает: void

### Конфигурация:

const options = {
  focusWrongField: true,          // автофокус на первое невалидное поле
  validateBeforeSubmitting: true  // валидация перед отправкой
};

## Минимально необходимый набор методов

1. new JustValidate(selector, options) - создание валидатора
2. .addField(selector, rules[]) - добавление поля с правилами
3. .onSuccess(callback) - обработчик успешной отправки
4. .onFail(callback) - обработчик ошибок валидации
