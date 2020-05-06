import MathInputHandler from '../components/utils/MathInputHandler';

const handler = new MathInputHandler();

beforeEach(() => {
    handler.reset()
});

test('Test isOperator', () => {
    Object.keys(handler.OPERATORS).forEach(key => {
        expect(handler.isOperator(handler.OPERATORS[key])).toBe(true);
    });
});

test('Test isFunction', () => {
    Object.keys(handler.FUNCTIONS).forEach(key => {
        expect(handler.isFunction(handler.FUNCTIONS[key])).toBe(true);
    });
});

test('Test isBracket', () => {
    Object.keys(handler.BRACKETS).forEach(key => {
        expect(handler.isBracket(handler.BRACKETS[key])).toBe(true);
    });
});

test('Test getPrevInput', () => {
    const input = '3xy + ';
    for (let c of input) {
        handler.addInput(c);
    }
    expect(handler.getPrevInput()).toBe('+');
});

test('Test prepareInput', () => {
    const input = '3xy + (5+y/2) -\\sin(2x) + (1/(\\cos(xy)(\\sin^2(x)+\\cos^2(x)))';
    for (let c of input) {
        handler.addInput(c);
    }

    const result = '3*x*y + (5+y/2) -\\sin(2*x) + (1/(\\cos(x*y)*(\\sin^2(x)+\\cos^2(x)))';
    expect(handler.input).toBe(result);
});

test('Test createMathTree', () => {
    // const input = '3xy + (5+y/2)';
    const input = '3^(y+2) + \\sin((x+2)(x-2))';
    for (let c of input) {
        handler.addInput(c);
    }

    handler.createMathTree();
    const result = 'Math.pow(3,(y+2)+Math.sin((x+2)*(x-2)))';
    expect(handler.equation).toBe(result);
});