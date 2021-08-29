function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // чтобы фон не скролился
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    }

    // Создаем функцию, которая скрывате модалку (чтобы не повторять код)
    function closeModal(modalSelector ) {
    const modal = document.querySelector(modalSelector);    
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    }

function modal(triggerSelector, modalSelector , modalTimerId) {

    // МОДАЛЬНОЕ ОКНО:
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    // КАК СДЕЛАЛ УЧИТЭЛ. Создаём 2 функцииЖ открывающую модалку и закрывающую
    modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // чтобы модальное окно закрывалось, при клике вне модального окна
    modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
    closeModal(modalSelector);
    }
    });

    // Чтобы закрывалось при нажатии на эксейп
    document.addEventListener('keydown', (event) => {
    if(event.code == 'Escape' && modal.classList.contains('show')) {
    closeModal(modalSelector);
    }
    });

    // 044 МОДИФИКАЦИЯ модального окна
   

    // чтобы модалка появлялась при проскроливании до конца
    function showModalByScroll(){
    // window.pageYOffset - сколько сверху уже пролистали
    // document.documentElement.clientHeight - видимая часть без прокрутки
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal(modalSelector, modalTimerId);
    window.removeEventListener('scroll', showModalByScroll);
    }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};