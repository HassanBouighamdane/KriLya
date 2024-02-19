# Build Stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /build
COPY . .
RUN mvn clean install -DskipTests

#application stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Utilisation des variables d'environnements
ENV JAR_FILE=target/spring-boot-data-jpa-0.0.1-SNAPSHOT.jar
ENV APP_PORT=8081

# Copie du JAR depuis la phase de build
COPY ${JAR_FILE} /app/app.jar

# Nettoyage des dépendances inutiles
RUN apk add --no-cache && \
    rm -rf /var/cache/apk/*

# Exposition du port nécessaire
EXPOSE ${APP_PORT}

# Commande d'entrée pour lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
