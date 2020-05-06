export default class MathInputHandler {
    OPERATORS = {
        PLUS: '+',
        MINUS: '-',
        DIVIDE: '/',
        MULTIPLY: '*',
        POWER: '^',
    };

    FUNCTION_IDENTIFIER = '\\';

    FUNCTIONS = {
        SIN: 'sin',
        COS: 'cos',
        TAN: 'tan',
        ASIN: 'asin',
        ACOS: 'acos',
        ATAN: 'atan',
        LOG: 'log',
        LN: 'ln',
        SQRT: 'sqrt',
        NROOT: 'sqrt[', // TODO: confirm later
    };

    BRACKETS = {
        LEFT_PARANTHESIS: '(',
        RIGHT_PARANTHESIS: ')',
        LEFT_CURLY: '{',
        RIGHT_CURLY: '}',
        LEFT_BRACKET: '[',
        RIGHT_BRACKET: ']'
    };

    bracketPairs = {
        '(':')',
        '{':'}',
        '[':']',
    }

    KEY_CODES = {
        ENTER : 13,
        BACKSPACE: 8,
        SHIFT : 16,
        CTRL: 17,
        CAPS: 20,
        TAB: 9,
        SPACE: 32,
        ALT: 18,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40
    }

    ONE_PARAM_FUNCS = [
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.SIN,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.COS,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.TAN,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.ASIN,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.ACOS,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.ATAN,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.LOG,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.LN,
    ];

    TWO_PARAM_FUNCS = [
        this.OPERATORS.POWER,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.SQRT,
        this.FUNCTION_IDENTIFIER + this.FUNCTIONS.NROOT
    ];

    conversionTable = {
        '^': 'Math.pow',
        '\\sin': 'Math.sin',
    };

    constructor() {
        this.reset();
    }

    reset() {
        this.input = '';
        this.shouldPrepare = true;
        this.mathRoot = new MathNode('');
        this.equation = '';
        this.leftBrackets = [];
    }

    addInput(key, keycode) {
        if (key.length > 1) {
            if (keycode === this.KEY_CODES.BACKSPACE && this.input !== '') {
                this.input = this.input.substring(0, this.input.length-1);
            } else if (keycode === this.KEY_CODES.ENTER) {
                // Compute equation
                this.createMathTree();
            }
        } else if (key.length === 1) {
            this.prepareInput(key);
        } else {
            console.log('empty keycode:', keycode);
        }
    }

    prepareInput(key) {
        this.insertMissingMult(key);
    }
    
    insertMissingMult(key) {
        const prev = this.getPrevInput();
        if (key === ' ')
            return;
            
        if (!this.shouldPrepare
            || this.input === ''
            || this.isOperator(prev)
            || this.isOperator(key)
            || this.isLeftBracket(prev)
            || this.isRightBracket(key)
        ) {
            this.input += key;
            if (key === this.BRACKETS.LEFT_PARANTHESIS) {
                this.shouldPrepare = true;
            }
        } else {
            this.input += '*' + key;
        }
        // Function names don't get separated by mutliplication
        if (key === this.FUNCTION_IDENTIFIER) {
            this.shouldPrepare = false;
        }
    }

    createMathTree() {
        let curInput = this.input;
        let cur = this.mathRoot;
        let isFunc = false;
        for (let i = 0; i < curInput.length; i++) {
            const c = curInput[i];
            if (this.isOperator(c)) {
                if (cur.val === '' && cur.parent === null) {
                    console.log('Operator has no left operand')
                } else {
                    // if cur node has parent & parent isn't ( & op isn't /
                    // then swap with parent
                    // else swap with cur node
                    // make swapped node left child of op
                    // create right child of op and make that cur
                    const opNode = new MathNode(c);
                    if (cur.parent !== null
                        && !this.isLeftBracket(cur.parent.val)
                        && c !== this.OPERATORS.DIVIDE
                    ) {
                        cur.parent.makeChildOf(opNode);
                    } else {
                        cur.makeChildOf(opNode);
                    }
                    if (opNode.parent === null) {
                        this.mathRoot = opNode;
                    }
                    opNode.setRight(new MathNode(''));
                    cur = opNode.right;
                }
            } else if (c === this.FUNCTION_IDENTIFIER) {
                // handle as bracket, but only for ( && ), not all brackets
                cur.val += c;
                isFunc = true;
            } else if (this.isBracket(c)) {
                // push bracket node to stack
                // create left child and make it cur
                // when right bracket is reached pop bracket stack,
                // then make right child of bracket node and make it cur
                if (this.isLeftBracket(c)) {
                    let bracketNode = null;
                    if (isFunc && c === this.BRACKETS.LEFT_PARANTHESIS) {
                        bracketNode = cur;
                        bracketNode.setLeft(new MathNode(''));
                        isFunc = false;
                    } else {
                        bracketNode = new MathNode(c);
                        cur.makeChildOf(bracketNode);
                    }
       
                    this.leftBrackets.push(bracketNode);
                    cur = bracketNode.left;
                } else {
                    const leftBracket = this.leftBrackets.pop();
                    leftBracket.setRight(new MathNode(''));
                    cur = leftBracket.right;
                }
            } else {
                cur.val += c;
            }
        }
        // console.log(this.input);
        // console.log(this.mathRoot);
        this.constructEquation(this.mathRoot);
        // Make sure bracket stack is empty or TODO: before algorithm add missing brackets
    }

    constructEquation(node) {
        if (node === null)
            return;

        const isLeftBracket = this.isLeftBracket(node.val);
        const isOneParamFunc = this.isOneParamFunc(node.val);
        const isTwoParamFunc = this.isTwoParamFunc(node.val);

        if (isLeftBracket) {
            this.equation += node.val;
        } else if (isOneParamFunc || isTwoParamFunc) {
            this.equation += this.conversionTable[node.val] + '(';
        }
        this.constructEquation(node.left);
        if (isTwoParamFunc) {
            this.equation += ',';
        }
        // NOTE: If operator node has no right child,
        // then left child is parent and right child is its left child
        if (isLeftBracket) {
            // Print matching right bracket
            const rightBracket = this.bracketPairs[node.val] ? this.bracketPairs[node.val]: ')';
            this.equation += rightBracket;
        } else if (!(isOneParamFunc || isTwoParamFunc)) {
            this.equation += node.val;
        }

        this.constructEquation(node.right);
        if (isOneParamFunc || isTwoParamFunc) {
            this.equation += ')';
        }
    }

    isOneParamFunc(val) {
        for (let func of this.ONE_PARAM_FUNCS) {
            if (val === func) {
                return true;
            }
        }
        return false;
    }

    isTwoParamFunc(val) {
        for (let func of this.TWO_PARAM_FUNCS) {
            if (val === func) {
                return true;
            }
        }
        return false;
    }

    getPrevInput() {
        for (let i = this.input.length - 1; i >= 0; i--) {
            if (this.input[i] !== ' ') {
                return this.input[i];
            }
        }
    }

    isOperator(text) {
        let result = false;
        Object.keys(this.OPERATORS).forEach(key => {
            if (text === this.OPERATORS[key]) {
                result = true;
            }
        });
        return result;
    }

    isFunction(text) {
        let result = false;
        Object.keys(this.FUNCTIONS).forEach(key => {
            if (text === this.FUNCTIONS[key]) {
                result = true;
            }
        });
        return result;
    }

    isBracket(text) {
        let result = false;
        Object.keys(this.BRACKETS).forEach(key => {
            if (text === this.BRACKETS[key]) {
                result = true;
            }
        });
        return result;
    }

    isLeftBracket(c) {
        return (
            c === this.BRACKETS.LEFT_BRACKET
            || c === this.BRACKETS.LEFT_CURLY
            || c === this.BRACKETS.LEFT_PARANTHESIS
        );
    }

    isRightBracket(c) {
        return (
            c === this.BRACKETS.RIGHT_BRACKET
            || c === this.BRACKETS.RIGHT_CURLY
            || c === this.BRACKETS.RIGHT_PARANTHESIS
        );
    }
}

class MathNode {
    constructor(val) {
        this.val = val;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.isLeft = false;
        this.isRight = false;
    }

    makeChildOf(node) {
        node.parent = this.parent;
        if (this.isLeft) {
            this.parent.left = node;
        } else if (this.isRight) {
            this.parent.right = node;
        }
        node.setLeft(this);
    }

    setLeft(node) {
        node.parent = this;
        node.isLeft = true;
        this.left = node;
    }

    setRight(node) {
        node.parent = this;
        node.isRight = true;
        this.right = node;
    }
}