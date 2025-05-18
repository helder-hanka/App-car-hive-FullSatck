pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "ascandar"
        DOCKER_IMAGE_BACKEND = "ascandar/carhive-backend"
        DOCKER_IMAGE_FRONTEND_ANGULAR = "ascandar/carhive-frontend-angular"
        DOCKER_IMAGE_FRONTEND_VUE = "ascandar/carhive-frontend-vue"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Checkout Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/helder-hanka/App-car-hive-FullSatck.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend/Projet_Spring_Boot-CarHive'
                sh 'docker build -t $DOCKER_IMAGE_FRONTEND_ANGULAR ./frontend/car-Front-end-Angular'
                sh 'docker build -t $DOCKER_IMAGE_FRONTEND_VUE ./frontend/car-hive-vueJs'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: '']) {
                    sh 'docker push $DOCKER_IMAGE_BACKEND'
                    sh 'docker push $DOCKER_IMAGE_FRONTEND_ANGULAR'
                    sh 'docker push $DOCKER_IMAGE_FRONTEND_VUE'
                }
            }
        }
    }
}

