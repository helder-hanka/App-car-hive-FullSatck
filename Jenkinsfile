pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    IMAGE_NAME = "helder"
    DOCKER_IMAGE_BACKEND = "helder/carhive-backend"
    DOCKER_IMAGE_FRONTEND_ANGULAR = "helder/carhive-frontend-angular"
    DOCKER_IMAGE_FRONTEND_VUE = "helder/carhive-frontend-vue"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend/Projet_Spring_Boot-CarHive'
        sh 'docker build -t $DOCKER_IMAGE_FRONTEND_ANGULAR ./frontend/car-Front-end-Angular'
        sh 'docker build -t $DOCKER_IMAGE_FRONTEND_VUE ./frontend/car-hive-vueJs'
      }
    }

    // stage('Start DB') {
    //   steps {
    //     sh 'docker-compose up -d db'
    //     sh 'sleep 10'
    //   }
    // }

    // stage('Backend Tests') {
    //   steps {
    //     dir('backend/Projet_Spring_Boot-CarHive') {
    //       sh './mvnw test -Dspring.profiles.active=test'
    //     }
    //   }
    // }

    stage('Build & Push Backend Image') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
            def app = docker.build("${IMAGE_NAME}:${BUILD_NUMBER}", 'backend/Projet_Spring_Boot-CarHive')
            app.push()
          }
        }
      }
    }

    stage('Build Angular Frontend') {
      steps {
        dir('frontend/car-Front-end-Angular') {
          sh 'npm install && npm run build'
        }
      }
    }

    stage('Build Vue Frontend') {
      steps {
        dir('frontend/car-hive-vueJs') {
          sh 'npm install && npm run build'
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d --build'
      }
    }
  }
}
