from flask import Flask, jsonify
from flask_cors import CORS

# Criação da aplicação Flask
app = Flask(__name__)

# Ativa o CORS para permitir requisições externas (como do front-end)
CORS(app)

# Rota para fornecer os dados fictícios das barras
@app.route("/api/barras")
def get_barras():
    # Dados fictícios representando os dias e seus status
    barras = [
        {"dia": "Dia 1", "status": "ok"},
        {"dia": "Dia 2", "status": "outage"},
        {"dia": "Dia 3", "status": "degraded"},
        {"dia": "Dia 4", "status": "ok"},
        {"dia": "Dia 5", "status": "outage"},
    ]
    return jsonify(barras)

# Rota inicial para verificar se a API está funcionando
@app.route("/")
def index():
    return "API está funcionando!"

# Ponto de entrada da aplicação
if __name__ == "__main__":
    app.run(debug=True)
