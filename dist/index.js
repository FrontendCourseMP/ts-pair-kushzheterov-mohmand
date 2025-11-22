// ==================== TASK 1: FIO to Initials ====================
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
// Функция для обработки формы ФИО
export function setupFIOFormHandler() {
    const form = document.getElementById('fioForm');
    const resultOutput = document.getElementById('result');
    const fullNameInput = document.getElementById('fullName');
    if (!form || !resultOutput || !fullNameInput) {
        console.error('Не найдены необходимые элементы формы ФИО');
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
// ==================== TASK 2: Expression Calculator ====================
export class ExpressionCalculator {
    constructor(expression) {
        this.expression = expression;
    }
    // Method to clean and validate the expression
    cleanExpression() {
        // Remove extra spaces and validate characters
        let cleaned = this.expression.replace(/\s+/g, '');
        // Validate: only numbers, +, *, and . are allowed
        if (!/^[\d+*.]+$/.test(cleaned)) {
            throw new Error('Недопустимые символы в выражении. Допускаются только цифры, +, * и .');
        }
        return cleaned;
    }
    // Method to calculate the expression
    calculate() {
        const cleanedExpression = this.cleanExpression();
        // Handle multiplication first (higher precedence)
        const withMultiplications = this.calculateMultiplications(cleanedExpression);
        // Then handle additions
        return this.calculateAdditions(withMultiplications);
    }
    calculateMultiplications(expr) {
        // Replace all multiplication operations with their results
        return expr.replace(/(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)/g, (match, num1, num2) => {
            return (parseFloat(num1) * parseFloat(num2)).toString();
        });
    }
    calculateAdditions(expr) {
        // Split by + and sum all numbers
        const numbers = expr.split('+').map(num => {
            const parsed = parseFloat(num);
            if (isNaN(parsed)) {
                throw new Error('Неверный формат числа');
            }
            return parsed;
        });
        return numbers.reduce((sum, current) => sum + current, 0);
    }
    // Static method for quick calculation
    static calculate(expression) {
        const calculator = new ExpressionCalculator(expression);
        return calculator.calculate();
    }
}
// Function to handle calculator form
export function setupCalculatorFormHandler() {
    const form = document.getElementById('calculatorForm');
    const resultOutput = document.getElementById('calculatorResult');
    const expressionInput = document.getElementById('expressionInput');
    if (!form || !resultOutput || !expressionInput) {
        console.error('Не найдены необходимые элементы формы калькулятора');
        return;
    }
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const expression = expressionInput.value.trim();
        try {
            const calculator = new ExpressionCalculator(expression);
            const result = calculator.calculate();
            // Вывод результата
            resultOutput.textContent = `Result: ${result}`;
            resultOutput.className = '';
        }
        catch (error) {
            // Вывод ошибки
            resultOutput.textContent = error instanceof Error ? error.message : 'Произошла ошибка';
            resultOutput.className = 'error';
        }
    });
}
// ==================== MAIN INITIALIZATION ====================
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupFIOFormHandler();
    setupCalculatorFormHandler();
    console.log('Все формы инициализированы');
});
// ==================== EXPORTS FOR TESTING ====================
export { formatNamePart, ExpressionCalculator as Calculator };
//# sourceMappingURL=index.js.map