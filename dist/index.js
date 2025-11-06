// Функция для преобразования ФИО в инициалы с фамилией 
export function convertFIOToInitials(fullName) {
    // Парсинг и проверка входных данных
    const parsedName = parseAndValidateFIO(fullName);
    if (!parsedName.isValid) {
        throw new Error(parsedName.error || 'Неверный формат ФИО');
    }
    // TypeScript теперь знает, что эти поля определены при isValid = true
    const lastName = parsedName.lastName;
    const firstName = parsedName.firstName;
    const middleName = parsedName.middleName;
    // Создаем инициалы (первая буква имени и отчества)
    const firstInitial = firstName.charAt(0).toUpperCase() + '.';
    const middleInitial = middleName ? middleName.charAt(0).toUpperCase() + '.' : '';
    // Возвращаем фамилию с инициалами
    return `${lastName} ${firstInitial}${middleInitial}`.trim();
}
// Функция для парсинга и валидации ФИО
export function parseAndValidateFIO(fullName) {
    if (!fullName || typeof fullName !== 'string') {
        return { isValid: false, error: 'ФИО должно быть строкой' };
    }
    // Убираем лишние пробелы и разбиваем по пробелам
    const parts = fullName.trim().split(/\s+/).filter(part => part.length > 0);
    // Проверяем минимальное количество частей (фамилия и имя)
    if (parts.length < 2) {
        return {
            isValid: false,
            error: 'Введите фамилию и имя (и отчество при наличии)'
        };
    }
    // Проверяем, что все части состоят только из букв
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\-]+$/;
    for (const part of parts) {
        if (!nameRegex.test(part)) {
            return {
                isValid: false,
                error: 'ФИО может содержать только буквы и дефисы'
            };
        }
    }
    // Извлекаем фамилию, имя и отчество (parts гарантированно имеет минимум 2 элемента)
    const lastName = formatNamePart(parts[0]); // ! - утверждаем, что не undefined
    const firstName = formatNamePart(parts[1]); // ! - утверждаем, что не undefined
    const middleName = parts.length > 2 ? formatNamePart(parts[2]) : undefined;
    return {
        isValid: true,
        lastName,
        firstName,
        middleName
    };
}
// Функция для форматирования части имени (первая буква заглавная, остальные строчные)
function formatNamePart(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
// Функция для обработки формы
export function setupFormHandler() {
    const form = document.getElementById('fioForm');
    const resultOutput = document.getElementById('result');
    const fullNameInput = document.getElementById('fullName');
    if (!form || !resultOutput || !fullNameInput) {
        console.error('Не найдены необходимые элементы формы');
        return;
    }
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const fullName = fullNameInput.value.trim();
        try {
            // Парсинг и валидация данных перед вызовом основной функции
            const validationResult = parseAndValidateFIO(fullName);
            if (!validationResult.isValid) {
                throw new Error(validationResult.error);
            }
            // Вызов основной функции преобразования
            const result = convertFIOToInitials(fullName);
            // Вывод результата
            resultOutput.textContent = result;
            resultOutput.className = '';
        }
        catch (error) {
            // Вывод ошибки
            resultOutput.textContent = error instanceof Error ? error.message : 'Произошла ошибка';
            resultOutput.className = 'error';
        }
    });
}
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupFormHandler();
    console.log('Форма ФИО инициализирована');
});
//# sourceMappingURL=index.js.map