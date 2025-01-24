async function carregarBarras() {
    try {
        // Faz a requisição para a API de barras
        const response = await fetch("http://127.0.0.1:5000/api/barras");
        const barras = await response.json();

        // Itera pelos dashboards disponíveis (Robôs)
        ["Robô de Fechamento", "Robô de Notificação", "Fluig", "Robô 4", "Robô 5"].forEach(dashboard => {
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
                    if (barra.status === "ok") {
                        barElement.classList.add("bar-ok");
                    } else if (barra.status === "degraded") {
                        barElement.classList.add("bar-degraded");
                    } else if (barra.status === "outage") {
                        barElement.classList.add("bar-outage");
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
        const response = await fetch("http://127.0.0.1:5000/api/estado_atual");
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
                if (estadoAtual === "Operando") {
                    estadoAtualElement.classList.add("operando");
                } else if (estadoAtual === "Parcial") {
                    estadoAtualElement.classList.add("parcial");
                } else if (estadoAtual === "Parado") {
                    estadoAtualElement.classList.add("parado");
                }
            }
        });
    } catch (error) {
        console.error("Erro ao carregar o estado atual:", error);
    }
}

;

// Carrega as barras e o estado atual ao iniciar
carregarBarras();
carregarEstadoAtual();
