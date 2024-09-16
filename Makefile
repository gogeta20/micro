
# Variable para el directorio del proyecto
SPRINGBOOT_DIR=project/backend/springboot


build-d:
	docker compose up --build -d

up:
	docker compose up -d

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

#--------------------- FRONT --------------------######################################
front-in:
	docker exec -it front_micro sh

front-logs:
	docker logs front_micro
