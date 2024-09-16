# SpringBoot.Dockerfile

# Usar la imagen oficial de Maven para la compilación de la aplicación
FROM maven:3.8.7-openjdk-17 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de configuración de Maven
COPY pom.xml .

# Descargar las dependencias de Maven
RUN mvn dependency:go-offline -B

# Copiar todo el código fuente de la aplicación al contenedor
COPY . .

# Compilar la aplicación y crear el archivo JAR
RUN mvn package -DskipTests

# Usar la imagen oficial de OpenJDK para ejecutar la aplicación
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR desde la imagen de compilación
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto para la aplicación Spring Boot
EXPOSE 8080

# Comando para ejecutar la aplicación Spring Boot
CMD ["java", "-jar", "app.jar"]
