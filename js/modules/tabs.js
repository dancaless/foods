function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    let tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    // 1. Скрываем все ненужные табы
    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        // тут же удаляем везде класс активности
        tabs.forEach(item => {
            item.classList.remove(activeClass );
        });
    }

    // 2. Создаём функцию, которая будет ПОКАЗЫВАТЬ нам табы
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        // тут же создаём класс активности
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    // 3 Назначаем обработчки событий клика (делегирвание):
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        // Далее перебираем все табы, чтобы узнать номер таба и отображаем
        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;