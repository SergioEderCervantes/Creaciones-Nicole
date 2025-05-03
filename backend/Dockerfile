FROM python:3.13-slim

WORKDIR /app

# Copia el requirements.txt
COPY requirements.txt .

# Instala dependencias
RUN pip install -r requirements.txt

# Copia el resto del directorio
COPY . .

# Expone el perto donde corre flask
EXPOSE 5000

# Comando para ejecutar todo
CMD [ "flask", "run", "--host=0.0.0.0", "--debug"]

# CMD [ "bash" ]
