
# Variable para el directorio del proyecto
SPRINGBOOT_DIR=project/backend/springboot


build-d:
	docker compose up --build -d

up:
	docker compose up --build -d

down:
	docker compose down

restart: down up

ps:
	docker compose ps

logs:
	docker compose logs $(c)

init-volumes:
	mkdir -p devops/volumes/mysql devops/volumes/postgres devops/volumes/jenkins

clean-volumes:
	docker volume rm $$(docker volume ls -q)

build:
	docker compose build

help:
	@echo "Comandos disponibles:"
	@echo "  up              - Levantar todos los contenedores"
	@echo "  down            - Detener todos los contenedores"
	@echo "  restart         - Reiniciar todos los contenedores"
	@echo "  ps              - Verificar el estado de los contenedores"
	@echo "  logs c=[nombre] - Ver logs de un contenedor específico"
	@echo "  init-volumes    - Crear las carpetas de volúmenes necesarias"
	@echo "  clean-volumes   - Limpiar volúmenes no utilizados"
	@echo "  build           - Construir imágenes de Docker sin levantar los contenedores"


# Comando para crear el proyecto Spring Boot
create-springboot-project:
	@echo "Creating Spring Boot project..."
	@docker run --rm -v $(PWD):/app -w /app maven:3.8.7-eclipse-temurin-17 bash -c "\
	    curl -s https://get.sdkman.io | bash && \
	    source $HOME/.sdkman/bin/sdkman-init.sh && \
	    sdk install springboot && \
	    spring init --dependencies=web --package-name=com.example.springboot --name=springboot-api $(SPRINGBOOT_DIR)"
