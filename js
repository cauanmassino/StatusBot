async function carregarBarras() {
    try {
        const response = await fetch("http://10.12.3.9:5001/api/barras?token=C4BB38022AF6F0096D02E81BFE4469E91CD7059D18DDE02E1011CDDB8E23799B");
        const dados = await response.json();
        
        console.log("Dados recebidos da API:", dados); // Debug dos dados

        Object.entries(dados).forEach(([dashboard, info]) => {
            const statusItem = Array.from(document.querySelectorAll(".status-item"))
                .find(item => item.querySelector(".status-title").textContent.trim() === dashboard);

            if (statusItem) {
                const barContainer = statusItem.querySelector(".bar-container");
                barContainer.innerHTML = ""; // Limpa as barras existentes

                Object.entries(info.detalhes).forEach(([data, statusContagem]) => {
                    console.log("Data recebida:", data); // Debug da data

                    // Formata a data corretamente
                    const [ano, mes, dia] = data.split("-");
                    const dataFormatada = `${dia}/${mes}/${ano}`;

                    Object.entries(statusContagem).forEach(([status, quantidade]) => {
                        for (let i = 0; i < quantidade; i++)  {const [ano, mes, dia] = data.split("-");
                            const dataFormatada = `${dia}/${mes}/${ano}`;
                            const barElement = document.createElement("div");
                            barElement.classList.add("bar", `bar-${status.toLowerCase()}`);
                            
                            barElement.setAttribute("data-title", `${dataFormatada}: ${status}`);
                            barContainer.appendChild(barElement);
                        }
                    });
                });
            }
        });
    } catch (error) {
        console.error("Erro ao carregar as barras:", error);
    }
}




async function carregarEstadoAtual() {
    try {
        // Faz a requisição para a API de estado atual
        const response = await fetch("http://10.12.3.9:5001/api/estado_atual?token=C4BB38022AF6F0096D02E81BFE4469E91CD7059D18DDE02E1011CDDB8E23799B");
        const data = await response.json();

        // Atualiza o estado de cada robô
        const statusItems = document.querySelectorAll(".status-item");

        statusItems.forEach(item => {
            const robôNome = item.querySelector(".status-title").textContent.trim();
            const estadoAtual = data[robôNome]; // Busca o estado atual para o robô

            if (estadoAtual) {
                const estadoAtualElement = item.querySelector(".status-state");
                estadoAtualElement.textContent = estadoAtual; // Define o texto do estado atual

                // Atualiza as classes com base no estado
                estadoAtualElement.className = "status-state"; // Remove classes anteriores
                if (estadoAtual === "Ativo") {
                    estadoAtualElement.classList.add("Ativo");
                } else if (estadoAtual === "Inativo") {
                    estadoAtualElement.classList.add("Inativo");
                } else if (estadoAtual === "Parado") {
                    estadoAtualElement.classList.add("Parado");
                }
            }
        });
    } catch (error) {
        console.error("Erro ao carregar o estado atual:", error);
    }
}


async function carregarAtualizacoes() {
    try {
        // Faz a requisição para a API de atualizações
        const response = await fetch("http://10.12.3.9:5001/api/atualizacoes?token=C4BB38022AF6F0096D02E81BFE4469E91CD7059D18DDE02E1011CDDB8E23799B");
        const atualizacoes = await response.json();

        const container = document.getElementById("atualizacoes-container");
        container.innerHTML = "";  // Limpa as atualizações existentes

        // Adiciona cada atualização como um novo item na lista
        atualizacoes.forEach(atualizacao => {
            const div = document.createElement("div");
            div.classList.add("atualizacao");
            div.innerHTML = `
                <p><strong>Robô:</strong> ${atualizacao.robô_nome}</p>
                <p><strong>Status:</strong> ${atualizacao.status}</p>
                <p><strong>Hora:</strong> ${atualizacao.horario}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Erro ao carregar as atualizações:", error);
    }
}


async function carregarTitles() {
    try {
        // Faz a requisição para obter os títulos dos robôs
        const response = await fetch("http://10.12.3.9:5001/api/titles?token=C4BB38022AF6F0096D02E81BFE4469E91CD7059D18DDE02E1011CDDB8E23799B");
        const titles = await response.json();

        // Atualiza o atributo "title" de cada ícone de informação
        document.querySelectorAll(".info-icon").forEach(icon => {
            const nomeRobo = icon.getAttribute("data-nome");
            if (titles[nomeRobo]) {
                icon.setAttribute("title", titles[nomeRobo]); // Define o atributo "title"
            }
        });
    } catch (error) {
        console.error("Erro ao carregar os títulos:", error);
    }
}




async function carregarPorcentagemAtivos() {
    try {
        const response = await fetch("http://10.12.3.9:5001/api/barras?token=C4BB38022AF6F0096D02E81BFE4469E91CD7059D18DDE02E1011CDDB8E23799B");
        const data = await response.json();

        document.querySelectorAll(".status-item").forEach(item => {
            const roboNome = item.querySelector(".status-title").textContent.trim();
            const porcentagem = data[roboNome]?.tempo_atividade || 0;

            const porcentagemElement = item.querySelector(".status-percentage-class");
            porcentagemElement.textContent = "Tempo de atividade: "+porcentagem;
          

            if (!porcentagemElement) {
                
                porcentagemElement = document.createElement("div");
                porcentagemElement.className = "status-percentage";
                //item.appendChild(porcentagemElement);
            }
            //porcentagemElement.textContent = `Tempo de Atividade: ${porcentagem}%`;
        });

    } catch (error) {
        console.error("Erro ao carregar a porcentagem de ativos:", error);
    }
}



async function carregarRobos() {
    const token = "C4BB38022AF6F0096D02E81BFE4469E91CD7059D18DDE02E1011CDDB8E23799B";
    const url = `http://10.12.3.9:5001/api/robos?token=C4BB38022AF6F0096D02E81BFE4469E91CD7059D18DDE02E1011CDDB8E23799B`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.robos) {
            const container = document.getElementById("status-container"); // Onde os blocos serão inseridos
            
            container.innerHTML = ""; // Limpa a área antes de adicionar novos elementos

            data.robos.forEach(robo => {
                const statusItem = document.createElement("div");
                statusItem.classList.add("status-item");

                statusItem.innerHTML = `
                    <div class="status-header">
                        <div class="status-title">
                            ${robo}
                            <i class="bi bi-question-circle info-icon" data-nome="${robo}"></i>
                        </div>
                        <span class="status-state">Carregando...</span>
                    </div>
                    <div class="bar-container"></div>
                    <div class="status-footer">
                        <span>30 dias atrás</span>
                        <span class="status-percentage-class">Carregando...</span>
                        <span>Hoje</span>
                    </div>
                `;

                container.appendChild(statusItem);
            });
        } else {
            console.error("Erro ao carregar os robôs:", data.erro);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}







// Carrega as barras, o estado atual e as atualizações ao iniciar
carregarBarras();
carregarEstadoAtual();
carregarAtualizacoes();  // Adiciona a chamada para carregar as atualizações
carregarTitles();
carregarRobos();
carregarPorcentagemAtivos();


// Atualiza as barras, o estado atual e as atualizações a cada 10 segundos
setInterval(carregarBarras, 10000);
setInterval(carregarEstadoAtual, 10000);
setInterval(carregarAtualizacoes, 10000);
carregarTitles();


document.getElementById("gerar-png").addEventListener("click", () => {
    const elementoParaImagem = document.getElementById("area-captura");

    html2canvas(elementoParaImagem, {
        scale: 2, // Melhora a qualidade da imagem
        useCORS: true // Permite capturar imagens externas sem erro
    }).then(canvas => {
        const imagemDataURL = canvas.toDataURL("image/png"); // Converte para PNG
        const link = document.createElement("a");
        link.href = imagemDataURL;
        link.download = "captura_status.png"; // Nome do arquivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(error => {
        console.error("Erro ao gerar PNG:", error);
    });
});




