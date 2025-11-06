const message: string = "Hello, TypeScript with ES Modules!";
console.log(message);

// Пример экспорта для проверки ES модулей
export const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

// Дополнительный пример с default export
export default function main(): void {
  console.log("Main function executed!");
}