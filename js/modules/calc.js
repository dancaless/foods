 function calc() {
 
    // !КАЛЬКУЛЯТОР:
    const result = document.querySelector('.calculating__result span');

    let sex, height, age, weight, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    // Далее прописываем функцию, которая будет из local storage брать данные чтобы выделить нужные блоки "из кеша"
    function initLocSettings(selector, activeClass) { 
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }

    initLocSettings('#gender div', 'calculating__choose-item_active');
    initLocSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    

    // 1)Создаём функцию расчета
    function calcTotal(){
        // проверка чтобы все поля были заполнены:
        if (!sex || !height ||!age || !weight || !ratio) {
            result.textContent = '____';
            return;
        } 

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))* ratio); 
        }
    }
    calcTotal();

    // 2) Получение данных со страницы:
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    // далее записываем выбор в LocalStorage
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
            
                console.log(ratio, sex);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    // 3) Функции для инпутов
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            // чтобы вводили только цифры
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            } 
            calcTotal(); 
        });
        
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

// как экспортируется модуль в CommonJS
// module.exports = calc;

// как экспортируется в ES6
export default calc;
