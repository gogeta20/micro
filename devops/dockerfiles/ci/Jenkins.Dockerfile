# Jenkins.Dockerfile

FROM jenkins/jenkins:lts

# Instalar Docker
USER root
RUN apt-get update && \
    apt-get install -y docker.io

# Devolver el control al usuario Jenkins
USER jenkins
