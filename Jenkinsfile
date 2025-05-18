pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "ascandar"
        DOCKER_IMAGE_BACKEND = "ascandar/carhive-backend"
        DOCKER_IMAGE_FRONTEND = "ascandar/carhive-frontend-angular"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/helder-hanka/App-car-hive-FullSatck.git'
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
                sshagent(["08a85a85-b192-4db5-bc04-7066e8183714"]) {
                    sh "ssh docker_admin@192.168.1.26 'cd /app && docker compose pull && docker compose up -d'"
                }
            }
        }
    }
}

