pipeline {
    agent any

    environment {
        VUE_DOCKER_IMAGE = 'node:16'
        SYMFONY_DOCKER_IMAGE = 'php:8.0-fpm'
        DJANGO_DOCKER_IMAGE = 'python:3.8'
        SPRINGBOOT_DOCKER_IMAGE = 'openjdk:11'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/gogeta20/micro.git', branch: 'master',credentialsId: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCxUMkdzbh8gyCwsiHmRm/wpmO+Rmc0HZDVUDi/CLgerReqxWYKYvJi5WX6NClGd4YlqVwXSUdPHYAO9FYCvVIr960m17XQXu+3OyDPz/PCDSynyk7fjeo1nfkz2wXRIu/5SPFFL8uM6HquvNBt1LPNyyo1tbodH4wNfJMFCUrNK8tJJRzIVyCnQe5nLNBUb5keaRmld42hxBuldBrBeI+25co2D/1ZKxU0CZupEvhA0XxQbZlgFb+9iJA3ls/cdaEz2EOvzsgMIJQabs7+yABDe69Bq2FXnqHyBKMI9u6gzQiTzA/Q/dPq3pGesOwGCX5We8n2W7zRNzfYVpD6nNFagZVlW3Ff+XGTS4K2c1JdbSu/9M2T/eYsF1CoOoOe/4SCNJR6vbw1NzFoPBfigIcMxFr20eLuXBe89duF/Kp2FNjr/H7GbFyUa0JF1/CRG4U5BMKd4aJeunjp+nJExBUUWrsnBn18MECnjeNsJqh9Q5PD0c5J5qebmBwuL+NnP9WFA4C/ehejA5mP/j/89IzTGl0TTR+2AjDqE8KJhvXwUEOidUovBdg3BladyCifFzt8coTASq0lRphXeVUja01/eHY8MQRiEUkd4XqsNjH8dwUQq7s/rEtLPXYPXULnXT25xj7MTP1brRsInqUUYq5//xNdIU3tHAQ6O+FxFauhCw== linuxlite20@gmail.com'
            }
        }

        stage('Build Vue Frontend') {
            agent {
                docker {
                    image env.VUE_DOCKER_IMAGE
                    reuseNode true
                }
            }
            steps {
                sh '''
                    cd project/front/vue
                    npm install
                    npm run build
                '''
            }
        }

        stage('Build Symfony Backend') {
            agent {
                docker {
                    image env.SYMFONY_DOCKER_IMAGE
                    reuseNode true
                }
            }
            steps {
                sh '''
                    cd project/backend/symfony
                    composer install
                    php bin/console doctrine:migrations:migrate --no-interaction
                '''
            }
        }

        stage('Build Django Backend') {
            agent {
                docker {
                    image env.DJANGO_DOCKER_IMAGE
                    reuseNode true
                }
            }
            steps {
                sh '''
                    cd project/backend/django
                    pip install -r requirements.txt
                    python manage.py migrate --no-input
                '''
            }
        }

        stage('Build Spring Boot Backend') {
            agent {
                docker {
                    image env.SPRINGBOOT_DOCKER_IMAGE
                    reuseNode true
                }
            }
            steps {
                sh '''
                    cd project/backend/springboot
                    ./mvnw clean package
                '''
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Vue Tests') {
                    agent {
                        docker {
                            image env.VUE_DOCKER_IMAGE
                            reuseNode true
                        }
                    }
                    steps {
                        sh '''
                            cd project/front/vue
                            npm run test
                        '''
                    }
                }

                stage('Symfony Tests') {
                    agent {
                        docker {
                            image env.SYMFONY_DOCKER_IMAGE
                            reuseNode true
                        }
                    }
                    steps {
                        sh '''
                            cd project/backend/symfony
                            php bin/phpunit
                        '''
                    }
                }

                stage('Django Tests') {
                    agent {
                        docker {
                            image env.DJANGO_DOCKER_IMAGE
                            reuseNode true
                        }
                    }
                    steps {
                        sh '''
                            cd project/backend/django
                            python manage.py test
                        '''
                    }
                }

                stage('Spring Boot Tests') {
                    agent {
                        docker {
                            image env.SPRINGBOOT_DOCKER_IMAGE
                            reuseNode true
                        }
                    }
                    steps {
                        sh '''
                            cd project/backend/springboot
                            ./mvnw test
                        '''
                    }
                }
            }
        }

        stage('Deploy Services') {
            parallel {
                stage('Deploy Frontend') {
                    steps {
                        sh '''
                            docker-compose up -d nginx_proxy
                        '''
                    }
                }

                stage('Deploy Symfony Backend') {
                    steps {
                        sh '''
                            docker-compose up -d symfony_backend
                        '''
                    }
                }

                stage('Deploy Django Backend') {
                    steps {
                        sh '''
                            docker-compose up -d django_backend
                        '''
                    }
                }

                stage('Deploy Spring Boot Backend') {
                    steps {
                        sh '''
                            docker-compose up -d springboot_backend
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
