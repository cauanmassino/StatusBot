async function carregarBarras() {
    try {
        // Faz a requisição para a API de barras
        const response = await fetch("http://10.12.6.179:5000/api/barras");
        const barras = await response.json();

        // Itera pelos dashboards disponíveis (Robôs)
        ["Robô Fechamento", "Robô de Notificação", "Fluig", "Robô 4", "Robô 5"].forEach(dashboard => {
            const statusItem = Array.from(document.querySelectorAll(".status-item"))
                .find(item => item.querySelector(".status-title").textContent.trim() === dashboard);

            if (statusItem) {
                const barContainer = statusItem.querySelector(".bar-container");
                barContainer.innerHTML = ""; // Limpa as barras existentes

                // Filtra as barras para o dashboard atual e adiciona dinamicamente
                barras.filter(barra => barra.dashboard === dashboard).forEach(barra => {
                    const barElement = document.createElement("div");
                    barElement.classList.add("bar");

                    // Define a classe com base no status
                    if (barra.status === "Ativo") {
                        barElement.classList.add("bar-Ativo");
                    } else if (barra.status === "Parado") {
                        barElement.classList.add("bar-Parado");
                    } else if (barra.status === "Inativo") {
                        barElement.classList.add("bar-Inativo");
                    }

                    // Adiciona o tooltip
                    barElement.setAttribute("data-title", `${barra.dia}: ${barra.status}`);
                    barContainer.appendChild(barElement);
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
        const response = await fetch("http://10.12.6.179:5000/api/estado_atual");
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
        const response = await fetch("http://10.12.6.179:5000/api/atualizacoes");
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
        const response = await fetch("http://10.12.6.179:5000/api/titles");
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

// Carrega as barras, o estado atual e as atualizações ao iniciar
carregarBarras();
carregarEstadoAtual();
carregarAtualizacoes();  // Adiciona a chamada para carregar as atualizações
carregarTitles();

// Atualiza as barras, o estado atual e as atualizações a cada 10 segundos
setInterval(carregarBarras, 10000);
setInterval(carregarEstadoAtual, 10000);
setInterval(carregarAtualizacoes, 10000);
carregarTitles();
