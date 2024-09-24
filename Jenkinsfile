pipeline {
    agent any

    environment {
        // Definir variables de entorno globales si es necesario
        VUE_DOCKER_IMAGE = 'node:18-alpine'
        SYMFONY_DOCKER_IMAGE = 'php:8.2.12-apache'
        DJANGO_DOCKER_IMAGE = 'python:3.10'
        SPRINGBOOT_DOCKER_IMAGE = 'maven:3.8.7-eclipse-temurin-17'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'git@github.com:gogeta20/micro.git', branch: 'feature/front-ini'
            }
        }

        stage('Build Vue Frontend') {
            steps {
                script {
                    docker.image(env.VUE_DOCKER_IMAGE).inside {
                        sh '''
                            cd project/front/vue
                            npm install
                            npm run build
                        '''
                    }
                }
            }
        }

        stage('Build Symfony Backend') {
            steps {
                script {
                    docker.image(env.SYMFONY_DOCKER_IMAGE).inside {
                        sh '''
                            cd project/backend/symfony
                            composer install
                            php bin/console doctrine:migrations:migrate --no-interaction
                        '''
                    }
                }
            }
        }

        stage('Build Django Backend') {
            steps {
                script {
                    docker.image(env.DJANGO_DOCKER_IMAGE).inside {
                        sh '''
                            cd project/backend/django
                            pip install -r requirements.txt
                            python manage.py migrate --no-input
                        '''
                    }
                }
            }
        }

        stage('Build Spring Boot Backend') {
            steps {
                script {
                    docker.image(env.SPRINGBOOT_DOCKER_IMAGE).inside {
                        sh '''
                            cd project/backend/springboot
                            ./mvnw clean package
                        '''
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Vue Tests') {
                    steps {
                        docker.image(env.VUE_DOCKER_IMAGE).inside {
                            sh '''
                                cd project/front/vue
                                npm run test
                            '''
                        }
                    }
                }

                stage('Symfony Tests') {
                    steps {
                        docker.image(env.SYMFONY_DOCKER_IMAGE).inside {
                            sh '''
                                cd project/backend/symfony
                                php bin/phpunit
                            '''
                        }
                    }
                }

                stage('Django Tests') {
                    steps {
                        docker.image(env.DJANGO_DOCKER_IMAGE).inside {
                            sh '''
                                cd project/backend/django
                                python manage.py test
                            '''
                        }
                    }
                }

                stage('Spring Boot Tests') {
                    steps {
                        docker.image(env.SPRINGBOOT_DOCKER_IMAGE).inside {
                            sh '''
                                cd project/backend/springboot
                                ./mvnw test
                            '''
                        }
                    }
                }
            }
        }

        stage('Deploy Services') {
            parallel {
                stage('Deploy Frontend') {
                    steps {
                        script {
                            docker.image('nginx:latest').inside {
                                sh '''
                                    # Copiar el build de Vue al contenedor nginx
                                    cp -r project/front/vue/dist/* /usr/share/nginx/html/
                                '''
                            }
                        }
                    }
                }

                stage('Deploy Symfony Backend') {
                    steps {
                        script {
                            docker.image(env.SYMFONY_DOCKER_IMAGE).inside {
                                sh '''
                                    docker-compose up -d symfony_backend
                                '''
                            }
                        }
                    }
                }

                stage('Deploy Django Backend') {
                    steps {
                        script {
                            docker.image(env.DJANGO_DOCKER_IMAGE).inside {
                                sh '''
                                    docker-compose up -d django_backend
                                '''
                            }
                        }
                    }
                }

                stage('Deploy Spring Boot Backend') {
                    steps {
                        script {
                            docker.image(env.SPRINGBOOT_DOCKER_IMAGE).inside {
                                sh '''
                                    docker-compose up -d springboot_backend
                                '''
                            }
                        }
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
