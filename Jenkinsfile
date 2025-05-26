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

    stage('Build Docker Images for Backend and Frontend') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend/Projet_Spring_Boot-CarHive'
      }
    }
    stage('Build Docker Images for Frontend Angular') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE_FRONTEND_ANGULAR ./frontend/car-Front-end-Angular'
      }
    }
    stage('Build Docker Images for Frontend Vue') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE_FRONTEND_VUE ./frontend/car-hive-vueJs'
      }
    }  
    // stage('Build Docker Images') {
    //   steps {
    //     sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend/Projet_Spring_Boot-CarHive'
    //     sh 'docker build -t $DOCKER_IMAGE_FRONTEND_ANGULAR ./frontend/car-Front-end-Angular'
    //     sh 'docker build -t $DOCKER_IMAGE_FRONTEND_VUE ./frontend/car-hive-vueJs'
    //   }
    // }
    // stage('Build Docker Images') {
    //   steps {
    //     sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend/Projet_Spring_Boot-CarHive'
    //     sh 'docker build -t $DOCKER_IMAGE_FRONTEND_ANGULAR ./frontend/car-Front-end-Angular'
    //     sh 'docker build -t $DOCKER_IMAGE_FRONTEND_VUE ./frontend/car-hive-vueJs'
    //   }
    // }

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

    stage('Push Backend Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
          sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
          sh "docker push $DOCKER_IMAGE_BACKEND"
          sh "docker push $DOCKER_IMAGE_FRONTEND_ANGULAR"
          sh "docker push $DOCKER_IMAGE_FRONTEND_VUE"
        }
        // script {
        //   docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
        //     def app = docker.build("${IMAGE_NAME}:${BUILD_NUMBER}", 'backend/Projet_Spring_Boot-CarHive')
        //     app.push()
        //   }
        // }
      }
    }

    // stage('Build Angular Frontend') {
    //   steps {
    //     dir('frontend/car-Front-end-Angular') {
    //       sh 'npm install && npm run build'
    //     }
    //   }
    // }

    // stage('Build Vue Frontend') {
    //   steps {
    //     dir('frontend/car-hive-vueJs') {
    //       sh 'npm install && npm run build'
    //     }
    //   }
    // }

    stage('Deploy with Docker Compose') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d --build'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
  // options {
  //   timeout(time: 1, unit: 'HOURS')
  // }
  // triggers {
  //   pollSCM('H/15 * * * *') // Poll SCM every 15 minutes
  // }
  // tools {
  //   maven 'Maven 3.6.3' // Specify the Maven version
  //   jdk 'JDK 11' // Specify the JDK version
  // }
  // parameters {
  //   string(name: 'DOCKERHUB_CREDENTIALS', defaultValue: '', description: 'DockerHub credentials ID')
  //   string(name: 'IMAGE_NAME', defaultValue: 'helder', description: 'Base name for Docker images')
  // }
  // triggers {
  //   cron('H/15 * * * *') // Poll SCM every 15 minutes
  // }
  // options {
  //   disableConcurrentBuilds() // Prevent concurrent builds
  //   buildDiscarder(logRotator(numToKeepStr: '10')) // Keep last 10 builds
  // }
}
