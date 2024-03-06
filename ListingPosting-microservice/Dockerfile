# Build Stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /build
COPY ListingPosting-microservice/pom.xml .
COPY ListingPosting-microservice/src ./src
RUN mvn clean package -DskipTests

# Application Stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Utilisation des variables d'environnements
ENV JAR_FILE=target/*.jar
ENV APP_PORT=8081

# Copie du JAR depuis la phase de build
COPY --from=build /build/${JAR_FILE} /app/app.jar

# Nettoyage des dépendances inutiles
RUN apk add --no-cache && \
    rm -rf /var/cache/apk/*

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

# Exposition du port nécessaire
EXPOSE ${APP_PORT}

# Commande d'entrée pour lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
