from flask import Flask, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
import os
import json

# Caminho para os diretórios de templates e estáticos
base_dir = os.path.abspath(os.path.dirname(__file__))

# Criação da aplicação Flask, especificando os diretórios de templates e estáticos
app = Flask(__name__)

# Ativa o CORS para permitir requisições externas (como do front-end)
#CORS(app)

# Rota para renderizar a página inicial
@app.route("/")
def index():
    return render_template("index.html")

# Rota para fornecer os dados fictícios das barras
@app.route("/api/barras")
def get_barras():
    barras = [
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"}, {"dashboard": "Robô de Fechamento", "dia": "Dia 5", "status": "outage"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 2", "status": "outage"},{"dashboard": "Robô de Fechamento", "dia": "Dia 5", "status": "outage"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 3", "status": "degraded"},{"dashboard": "Robô de Fechamento", "dia": "Dia 5", "status": "outage"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 4", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 5", "status": "outage"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 6", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 8", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 1", "status": "ok"},{"dashboard": "Robô de Fechamento", "dia": "Dia 30", "status": "ok"},
        {"dashboard": "Robô de Fechamento", "dia": "Dia 2", "status": "outage"},
        
        {"dashboard": "Robô de Notificação", "dia": "Dia 2", "status": "ok"},
        {"dashboard": "Robô de Notificação", "dia": "Dia 3", "status": "outage"},
        {"dashboard": "Robô de Notificação", "dia": "Dia 2", "status": "ok"},
        {"dashboard": "Robô de Notificação", "dia": "Dia 2", "status": "ok"},
        {"dashboard": "Robô de Notificação", "dia": "Dia 2", "status": "ok"},
        
        {"dashboard": "Fluig", "dia": "Dia 1", "status": "outage"},
        {"dashboard": "Fluig", "dia": "Dia 1", "status": "outage"},
        {"dashboard": "Fluig", "dia": "Dia 1", "status": "outage"},
        {"dashboard": "Robô 4", "dia": "Dia 1", "status": "degraded"},
        {"dashboard": "Robô 5", "dia": "Dia 1", "status": "ok"},
    ]
    return jsonify(barras)

@app.route("/api/estado_atual")
def get_estado_atual():
    estados = {
        "Robô de Fechamento": "Operando",
        "Robô de Notificação": "Parcial",
        "Fluig": "Parado",
        "Robô 4": "Operando",
        "Robô 5": "Parado",
    }
    return jsonify(estados)


if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True, port=5000)

#Adicionando uma Rota para Registrar as Atualizações
@app.route("/api/registrar_atualizacao", methods=["POST"])
def registrar_atualizacao():
    data = request.json  # Recebe os dados da requisição (status, robô, etc.)
    robô_nome = data.get("robô_nome")
    status = data.get("status")
    
    # Cria uma entrada para o log
    atualizacao = {
        "robô_nome": robô_nome,
        "status": status,
        "horario": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    # Salva o log em um arquivo JSON ou pode ser um banco de dados
    with open("atualizacoes_log.json", "a") as f:
        json.dump(atualizacao, f)
        f.write("\n")
    
    return jsonify({"message": "Atualização registrada com sucesso!"})







#Rota para Buscar as Atualizações
@app.route("/api/atualizacoes", methods=["GET"])
def obter_atualizacoes():
    try:
        # Lê o arquivo de atualizações
        with open("atualizacoes_log.json", "r") as f:
            atualizacoes = f.readlines()
        
        # Converte cada linha para um dicionário JSON
        atualizacoes = [json.loads(line) for line in atualizacoes]
        return jsonify(atualizacoes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
