pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "ton-utilisateur-docker-hub"
        DOCKER_IMAGE_BACKEND = "ton-utilisateur-docker-hub/carhive-backend"
        DOCKER_IMAGE_FRONTEND = "ton-utilisateur-docker-hub/carhive-frontend-angular"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ton-utilisateur/carhive.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend/Projet_Spring_Boot-CarHive'
                sh 'docker build -t $DOCKER_IMAGE_FRONTEND ./frontend/car-Front-end-Angular'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: '']) {
                    sh 'docker push $DOCKER_IMAGE_BACKEND'
                    sh 'docker push $DOCKER_IMAGE_FRONTEND'
                }
            }
        }

        stage('Deploy on Server') {
            steps {
                sshagent(["ssh-server"]) {
                    sh "ssh user@ton-ip-du-serveur 'cd /app && docker compose pull && docker compose up -d'"
                }
            }
        }
    }
}

