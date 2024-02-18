let dotPlaced = false;
let allowZeroAfterOperator = true;
let remBracs = 0;

const evaluate = document.getElementById('eval');
const del = document.getElementById('del');
const clear = document.getElementById('clear');
const nums = document.querySelectorAll('.num');
const ansbox = document.querySelector('.ansbox');
const operators = document.querySelectorAll('.operator');
const brackets = document.querySelectorAll('.bracket');
const dot = document.getElementById('dot');

clear.addEventListener('click', function(){
    ansbox.innerHTML = '0';
    dotPlaced = false;
    allowZeroAfterOperator = true;
    remBracs = 0;    
});

nums.forEach(num => {
    num.addEventListener('click', function() {
        switch (ansbox.innerHTML) {
            case '0':
                // If ansbox is 0, you can't add zeros, but you can add regular numbers
                if (num.innerHTML !== '0') {
                    ansbox.innerHTML = num.innerHTML; // Replace 0 with the clicked number
                }
                break;
            default:
                switch (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1)) {
                    case ')':
                        // If the last character is a closing bracket, add multiplication before adding a number
                        ansbox.innerHTML += '×' + num.innerHTML;
                        break;
                    default:
                        if (num.innerHTML === '0') {
                            ansbox.innerHTML += num.innerHTML;
                        } else {
                            ansbox.innerHTML += num.innerHTML;
                        }
                        break;
                }
                break;
        }
    });
});

dot.addEventListener('click', function() {
    switch (ansbox.innerHTML) {
        case '0':
            // If ansbox is 0, you can add a dot after it
            ansbox.innerHTML = '0.'; // Replace 0 with '0.' to add dot
            dotPlaced = true; // Set dotPlaced to true since dot has been placed
            break;
        default:
            const lastChar = ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1);
            if (lastChar === ')' || lastChar === '(' || lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
                // If the last character is an operator or a closing bracket, add zero before adding dot
                ansbox.innerHTML += '0.';
                dotPlaced = true; // Set dotPlaced to true since dot has been placed
            } else {
                // If the last character is not an operator or a closing bracket
                if (!dotPlaced) {
                    ansbox.innerHTML += '.';
                    dotPlaced = true; // Set dotPlaced to true since dot has been placed
                }
            }
            break;
    }
});

brackets.forEach(bracket => {
    bracket.addEventListener('click', function() {
        switch (bracket.innerHTML) {
            case '(':
                // If remBracs is 0, we cannot add ')' anymore
                if (remBracs > 0) {
                    if (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1) === '.') {
                        ansbox.innerHTML += '0(';
                    } else {
                        ansbox.innerHTML += '(';
                    }
                    remBracs++;
                    dotPlaced = false; // Reset dotPlaced
                } else {
                    const lastChar = ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1);
                    // Allowing opening bracket after multiplication or division
                    if (lastChar === 'x' || lastChar === '/') {
                        ansbox.innerHTML += '(';
                        remBracs++;
                        dotPlaced = false; // Reset dotPlaced
                    }
                }
                break;
            case ')':
                // If remBracs is greater than 0 and the last element is not '(', decrement remBracs and add closing bracket
                if (remBracs > 0 && ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1) !== '(') {
                    if (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1) === '.') {
                        ansbox.innerHTML += '0)';
                    } else {
                        ansbox.innerHTML += ')';
                    }
                    remBracs--;
                    dotPlaced = false; // Reset dotPlaced
                }
                break;
        }
        
        // If the last element in ansbox is a number, automatically add multiplication sign before opening bracket
        const lastChar = ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1);
        if (!isNaN(parseInt(lastChar)) && bracket.innerHTML === '(') {
            ansbox.innerHTML += '×(';
            remBracs++;
            dotPlaced = false; // Reset dotPlaced
        }
    });
});



operators.forEach(operator => {
    operator.addEventListener('click', function() {
        switch (operator.innerHTML) {
            case '+':
            case '-':
            case '×':
            case '÷':
                // When adding an operator after a dot, automatically add a zero before the operator
                if (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1) === '.') {
                    ansbox.innerHTML += '0' + operator.innerHTML;
                } else {
                    const lastChar = ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1);
                    // Check conditions for adding operators
                    if (
                        (lastChar !== '+' && lastChar !== '-' && lastChar !== '×' && lastChar !== '÷') ||
                        (lastChar === '-' && operator.innerHTML === '-') ||
                        (lastChar === '(' && operator.innerHTML === '-')
                    ) {
                        ansbox.innerHTML += operator.innerHTML;
                        dotPlaced = false; // Reset dotPlaced
                        allowZeroAfterOperator = true; // Reset allowZeroAfterOperator
                    }
                }
                break;
        }
    });
});