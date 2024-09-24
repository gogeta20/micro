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
                git url: 'git@github.com:gogeta20/micro.git', branch: 'master'
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
