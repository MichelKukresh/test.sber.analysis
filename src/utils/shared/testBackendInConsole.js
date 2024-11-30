async function loginAndFetchData(username, password) {   
    
    const loginData = { username, password };
    // URL для получения данных менять нельзя, привязка к скрипту докера
    const signinUrl = 'http://localhost:8080/signin';

    try {
        
        const response = await fetch(signinUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token; 
            console.log(signinUrl);
            console.log(`Получаем токен если пароль совпадает ${token}`);

            // URL для получения данных менять нельзя, привязка к скрипту докера
            const chartsUrl = 'http://localhost:8080/charts';
            console.log(chartsUrl);

            // Выполняем запрос для получения данных
            const chartsResponse = await fetch(chartsUrl, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (chartsResponse.ok) {
                const chartsData = await chartsResponse.json();
                return chartsData.data; 
            } else {
                console.error('Ошибка при получении данных:', chartsResponse.status, await chartsResponse.text());
            }
        } else {
            console.error('Ошибка при входе:', response.status, await response.text());
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

const username = 'login1'; 
const password = 'pass1'; 

loginAndFetchData(username, password)
    .then(data => {
        if (data) {
            console.log('Полученные данные:', data);            
        }
    });

export {loginAndFetchData}

    