export class ExpressionCalculator {
    private expression: string;

    constructor(expression: string) {
        this.expression = expression;
    }

    private cleanExpression(): string {
        let cleaned = this.expression.replace(/\s+/g, '');
        
        if (!/^[\d+*.\s]+$/.test(cleaned)) {
            throw new Error('Недопустимые символы в выражении');
        }
        
        return cleaned;
    }

    calculate(): number {
        const cleanedExpression = this.cleanExpression();
        const withMultiplications = this.calculateMultiplications(cleanedExpression);
        return this.calculateAdditions(withMultiplications);
    }

    private calculateMultiplications(expr: string): string {
        return expr.replace(/(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)/g, (match, num1, num2) => {
            return (parseFloat(num1) * parseFloat(num2)).toString();
        });
    }

    private calculateAdditions(expr: string): number {
        return expr.split('+')
            .map(num => parseFloat(num))
            .reduce((sum, current) => sum + current, 0);
    }
}