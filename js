window.onload = function() {
    // Faz a requisição para o endpoint da API
    fetch('http://127.0.0.1:5000/api/barras')
        .then(response => response.json())  // Converte a resposta em JSON
        .then(data => {
            const barContainer = document.querySelector('.bar-container');
            
            // Limpa o conteúdo existente na barra (caso haja algum)
            barContainer.innerHTML = '';

            // Para cada item no JSON, cria uma barra
            data.forEach(item => {
                const bar = document.createElement('div');
                bar.classList.add('bar'); // Adiciona a classe base
                bar.setAttribute('data-title', item.dia);  // Define o nome do dia como atributo

                // Adiciona a classe que determina a cor da barra com base no status
                switch (item.status) {
                    case 'ok':
                        bar.classList.add('bar-ok');
                        break;
                    case 'degraded':
                        bar.classList.add('bar-degraded');
                        break;
                    case 'outage':
                        bar.classList.add('bar-outage');
                        break;
                }

                // Adiciona a barra ao container
                barContainer.appendChild(bar);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
};

