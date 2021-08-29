function timer(id, deadline) {
    // TIMER:

    // Создаём функцию, расчитывающу РАЗНИЦУ между дедлайном и временем просмотра
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //узнаём количество ДНЕЙ до конца
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // минут
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    // Далее вспомогательная функция для преоразования времени в фрмат 09, а не 9
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // Пишем функцию, устанавливающую уже готовые данные на страницу:
    function setClock(selector, endtime) {
        // находим КУДА вставлять данные:
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeinterval = setInterval(updateClock, 1000); // запускаться будет раз в секунду

        updateClock(); //это чтобы при обновлении страницы не было мигания на таймере, т.к. первый раз он обноситс через 1 секунду (см выше)

        // Создаём функцию, которая будет ОБНОВЛЯТЬ наш таймер каждую секунду:
        function updateClock() {
            // содержит 3 главных действия: 
            // 1.Расчёт времени, котое осталось на данный момент
            const t = getTimeRemaining(endtime);

            // 2.Расчитанные величины помещаем на страницу
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // 3. Осталавливать таймер:
            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
    }
    setClock(id, deadline);
}

export default timer;