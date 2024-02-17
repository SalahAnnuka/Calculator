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
        ans = ansbox.innerHTML;
        ansbox.innerHTML = '0';

        optemp = operator.innerHTML;
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