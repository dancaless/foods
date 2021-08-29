import {closeModal, openModal} from './modal';
import {postData} from '../services/services';
function forms(formSelector, modalTimerId) {
    // !!!FORMS
        
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading:'img/form/spinner.svg',
        success: 'Спасибо, Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'

    };

    //Подвязываем функцию formData всем формам
    forms.forEach(item =>{
        bindpostData(item);
    }); 

   

    function  bindpostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // чтобы отменить перезагрузку страницы

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block; 
                margin: 0 auto;
            `;
            // form.after(statusMessage); - так тоже работает
            form.insertAdjacentElement('afterend', statusMessage);

            
            //Как было:
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');


            // Если не используется formData, то ниже пишем заголовок. в нашем случае он не нужен:
            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form); // главное - чтобы в html у форм был атрибут name

            const object = {};
            // переводим formData в JSON. Сначала перводим в простой объект
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });
            // ниже более современный сопсоб это сделать:
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const obj = {a: 23, b: 50};
            // console.log(Object.entries(obj));

            // Далее из объекта формируем JSON
            // const json = JSON.stringify(object);  

            postData('http://localhost:3000/requests',json)
            .then(data => {
                console.log(data); 
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();

            })
            .catch(() => {
                // Если будет ошибка, то reject в промисе не выполнится.
                showThanksModal(message.failure);
                console.error('error');
            })
            .finally(() => {
                form.reset();
            });
            
            // request.addEventListener('load', () => {
            //     if (request.status ===200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     }else {
            //         
            //     }
            // });
        });
    }

    // МОДАЛЬНОЕ ОКНО С БЛГОДАРНОСТЬЮ:
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        // создаём новое мод.окно с благодарностью:
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>✖</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        // чтобы при повторном открытии модалки была снова форма
        setTimeout(() => {
            //удаляем созданную модалку
            thanksModal.remove(); 
            // снова отображаем первоначальную модалку
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            // закрываем модальное окно
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;
