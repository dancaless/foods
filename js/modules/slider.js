function slider({
    container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field
}) {
 //! СЛАЙДЕР
    // 1. Определяем сами слайды и кнопки управления на странице:
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        //стрелка назад:
        prev = document.querySelector(prevArrow), 
        //стрелка вперёд:
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        //Далее узнаём фактическую ширину slidesWrapper, обращаясь к Computed CSS стилям
        width = window.getComputedStyle(slidesWrapper).width;
        

    let slideIndex = 1; 
    let offset = 0;

    // Далее вспомогательная функция для преоразования времени в фрмат 09, а не 9
    function getZero(num) {
        if(num >= 0 && num <10 ){
            return `0${num}`;
        } else { 
            return num;
        }
    }

    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);
    //!62 КАРУСЕЛЬ
    //устанавлтиваем ширину "колёсика в замке"
    slidesField.style.width = 100 * slides.length +'%';
    

    //делаем все слайды в ряд и создаём праавило transition
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    //ограничиваем область видимости обёртки:
    slidesWrapper.style.overflow = 'hidden';

    //фиксируем ширину каждого слайда, чтобы они были одинаковыми и равнялись ширине обёртки
    slides.forEach(slide => {
        slide.style.width = width;
    });

    //Функция, которая активирует (делает белым) нужную точку
    function activationElements(elements) {
        elements.forEach(dot => dot.style.opacity = '0.5');
        elements[slideIndex-1].style.opacity = 1;
    }

    // техническая функция, которая берет строку и превращает ее в число, очищая от других символов:
    function strToNum(str) {
        const strNew = str.replace(/\D/g, '');
        return +strNew;
    }
    // console.log(strToNum('200px'));

    //создаем обработчик события
    next.addEventListener('click', () => {
        //чтобы при пролистывании до конца снова в начало возвращалось
        if(offset == strToNum(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            //если нет, то просто смещает на одну ширину обертки
            offset += strToNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        //прописываем номера слайдов в html
        if(slideIndex == slides.length) {
            slideIndex =1;
        } else {
            slideIndex ++; 
        }
        current.textContent = getZero(slideIndex); 

        activationElements(dots);
    });

    prev.addEventListener('click', () => {
        //чтобы при пролистывании до конца снова в начало возвращалось
        if(offset === 0) {
            offset = strToNum(width) * (slides.length - 1);
        } else {
            //если нет, то просто смещает на одну ширину обертки
            offset -= strToNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex ==1) {
            slideIndex = slides.length;
            
        } else {
            slideIndex --;
        }
        current.textContent = getZero(slideIndex); 

        // dots.forEach(dot => dot.style.opacity = '0.5');
        // dots[slideIndex-1].style.opacity = 1;
        activationElements(dots);
    })
        
    //! 61 урок (более простой слайдер)
    
    // // Проставляем тотал сразу на страницу
    

    // //Запускаем функцию (см ниже)
    // showSlides(slideIndex);

    // //2. Создаём функцию, которая получает индекс, скрывает все слайды и оставляет только с нужным индексом
    // function showSlides(n) {
    //     //созадем условия чтобы после последнего слайда был снова первый и наоборот
    //     if(n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if(n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     //скрываем все слайды
    //     slides.forEach(item => item.style.display = 'none');
    //     // показываем нужный слайд
    //     slides[slideIndex-1].style.display = 'block';

    //     current.textContent = getZero(slideIndex);
    // }

    // //3. Cоздаем функцию, которая будет вызывать пердыдущую функцию, увеличивая индекс на 1
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // //4. Назчанаем обработчики событий на кнопки перелистывания слайдов
    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
        
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
    
    
    //! 63 навигация по слайдеру:
    //опредлеяем весь слайдер со всеми элементами, а не только оберткой
    // в начале создал переменную slider, далее делаем ей relative позиционирование
    slider.style.position = 'relative';

    // Создаём обертку для ТОЧЕК и добавляем в слайдер
    const indicators = document.createElement('ol'),
            dots = [];


    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    // добавляем точки
    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');

        // активная точка
        if(i == 0) {
            dot.style.opacity = 1;
        }
        // добавляем точку в массив
        indicators.append(dot);
        // Добавляем каждую точку в созданный массив dots
        dots.push(dot);
    }

    // чтобы можно было нажимать на точки и переходить к нужному слайду:
    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');
            // меняем slideIndex для корректного отображения current
            slideIndex = slideTo;
            current.textContent = getZero(slideIndex);
            // сдвигаем карусель
            offset = strToNum(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            
            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex-1].style.opacity = 1;    
        });
    });
}

export default slider;