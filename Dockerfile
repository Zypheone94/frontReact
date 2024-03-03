FROM node:14

# Crée et définis le répertoire de travail dans le conteneur
WORKDIR /app/front

# Copie le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application dans le conteneur
# COPY . .

# Exposer le port sur lequel l'application va écouter
EXPOSE 5173

# Commande de démarrage pour lancer l'application lorsqu'un conteneur est démarré
CMD ["npm", "run", "run"]
