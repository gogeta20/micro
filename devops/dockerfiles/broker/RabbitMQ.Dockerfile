# RabbitMQ.Dockerfile

FROM rabbitmq:3-management

# Si necesitas habilitar plugins o configurar usuarios
RUN rabbitmq-plugins enable --offline rabbitmq_management

# Añadir configuración personalizada si es necesario
COPY ./conf/rabbitmq/rabbitmq.conf /etc/rabbitmq/rabbitmq.conf
