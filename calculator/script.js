let dotPlaced = false;
let ans = "";
let optemp = "";

const eval = document.getElementById('eval');
const del = document.getElementById('del');
const clear = document.getElementById('clear');
const nums = document.querySelectorAll('.num');
const ansbox = document.querySelector('.ansbox');
const operators = document.querySelectorAll('.operator');

nums.forEach(num => {
    num.addEventListener('click', function() { 
        const numtext = num.innerHTML;

        if (numtext === '.' && !dotPlaced) {
            if (!ansbox.innerHTML.endsWith('.')) {
                ansbox.innerHTML += numtext;
                dotPlaced = true;
            }
        } else if (numtext !== '.' || !dotPlaced) {
            ansbox.innerHTML = ansbox.innerHTML === '0' ? numtext : ansbox.innerHTML + numtext;
            
            if (numtext === '.') {
                dotPlaced = true;
            }
        }
    });
});

del.addEventListener('click', function(){
    if (ansbox.innerHTML.length != 1)
        ansbox.innerHTML = ansbox.innerHTML.slice(0,-1);
    else ansbox.innerHTML = '0';
});

clear.addEventListener('click', function(){
    ansbox.innerHTML = '0';
});

operators.forEach(operator => {
    operator.addEventListener('click', function(){
        switch (operator.innerHTML){
            case '+':
                switch (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1)){
                    case '+': break;
                    case '-': break;
                    case '÷': break;
                    case '×': break;
                    case '(': break;
                    default: ansbox.innerHTML += operator.innerHTML; break;
                }
                break;
            case '-':
                switch (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1)){
                    case '+': ansbox.innerHTML.slice(0,-1); ansbox.innerHTML += operator.innerHTML; break;
                    case '-': break;
                    case '÷': ansbox.innerHTML += operator.innerHTML; break;
                    case '×': ansbox.innerHTML += operator.innerHTML; break;
                    case '(': ansbox.innerHTML += operator.innerHTML; break;
                    default: ansbox.innerHTML += operator.innerHTML; break;
                }
                break;
            case '÷':
                switch (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1)){
                    case '+': break;
                    case '-': break;
                    case '÷': break;
                    case '×': break;
                    case '(': break;
                    default: ansbox.innerHTML += operator.innerHTML; break;
                }
                break;
            case '×':
                switch (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1)){
                    case '+': 
                    case '-': 
                    case '÷': 
                    case '×': 
                    case '(': break;
                    default: ansbox.innerHTML += operator.innerHTML; break;
                }
                break;
            default:
                break;
        }
    });
});

eval.addEventListener('click', function(){
    switch (optemp){
        case '+':
            ansbox.innerHTML = ans + ansbox.innerHTML;
            break;
        case '-':
            ansbox.innerHTML = ans - ansbox.innerHTML;
            break;
        case '÷':
            ansbox.innerHTML = ans / ansbox.innerHTML;
            break;
        case '×':
            ansbox.innerHTML = ans * ansbox.innerHTML;
            break;
        default:
            break;
    }
});

brackets.forEach(bracket => {
    bracket.addEventListener('click', function(){
        switch (bracket.innerHTML){
            case '(':
                switch (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1)){
                    default: 
                        ansbox.innerHTML += bracket.innerHTML; 
                        rembracs++; 
                        break;
                }
                break;
            case ')':
                if (rembracs > 0) {
                    switch (ansbox.innerHTML.charAt(ansbox.innerHTML.length - 1)){
                        case '+': 
                        case '-': 
                        case '÷': 
                        case '×': 
                        case '(': 
                            break;
                        default: 
                            ansbox.innerHTML += bracket.innerHTML; 
                            rembracs--; 
                            break;
                    }
                }
                break;
            default: 
                break;
        }
    });
});



function isNumber(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}