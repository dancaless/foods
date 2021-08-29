 //Создаём функцию для запроса к серверу:
    // Используем async await чтобы интерпретатор ждал когда сервер ответит
    const postData =  async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: data
        });
        // await чтобы дождаться когда всё в json переведется
        return await res.json();
    };

    // Создаём функцию, которая получает JSON из бызы 
    const getResource =  async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
           throw new Error(`Could not fetch ${url}, states ${res.status}`);
        } 

        // await чтобы дождаться когда всё в json переведется
        return await res.json();
    };

    export {postData};
    export {getResource};