pipeline {
  agent any

  environment {
    DOCKER_USERNAME = 'helder78'
    DOCKER_PASSWORD = credentials('docker-password')
    IMAGE_TAG = "${env.BUILD_NUMBER}"

    DOCKER_IMAGE_BACKEND = "carhive-backend"
    DOCKER_IMAGE_FRONTEND_ANGULAR = "carhive-frontend-angular"
    DOCKER_IMAGE_FRONTEND_VUE = "carhive-frontend-vue"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test Backend') {
      steps {
        dir('backend/Projet_Spring_Boot-CarHive') {
          sh './mvnw clean install'
        }
      }
    }

    stage('Install Dependencies & Run Backend Unit Tests') {
      steps {
        script {
          sh '''
            echo "Installing dependencies and running backend unit tests..."
            cd backend/Projet_Spring_Boot-CarHive
            ./mvnw clean install
          '''
        }
      }
    }

    stage('Test Docker Access') {
      steps {
        script {
          sh 'docker version'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          sh """
            docker build -t $DOCKER_USERNAME/$DOCKER_IMAGE_BACKEND:$IMAGE_TAG ./backend/Projet_Spring_Boot-CarHive
            docker build -t $DOCKER_USERNAME/$DOCKER_IMAGE_FRONTEND_ANGULAR:$IMAGE_TAG ./frontend/car-Front-end-Angular
            docker build -t $DOCKER_USERNAME/$DOCKER_IMAGE_FRONTEND_VUE:$IMAGE_TAG ./frontend/car-hive-vueJs
          """
        }
      }
    }

    stage('Push Docker Images') {
      steps {
        script {
          sh """
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            docker push $DOCKER_USERNAME/$DOCKER_IMAGE_BACKEND:$IMAGE_TAG
            docker push $DOCKER_USERNAME/$DOCKER_IMAGE_FRONTEND_ANGULAR:$IMAGE_TAG
            docker push $DOCKER_USERNAME/$DOCKER_IMAGE_FRONTEND_VUE:$IMAGE_TAG
          """
        }
      }
    }

    stage('Cleanup Docker Images') {
      steps {
        script {
          sh """
            docker rmi $DOCKER_USERNAME/$DOCKER_IMAGE_BACKEND:$IMAGE_TAG || true
            docker rmi $DOCKER_USERNAME/$DOCKER_IMAGE_FRONTEND_ANGULAR:$IMAGE_TAG || true
            docker rmi $DOCKER_USERNAME/$DOCKER_IMAGE_FRONTEND_VUE:$IMAGE_TAG || true
          """
        }
      }
    }

    stage('Deploy to Production') {
      steps {
        script {
          sh '''
            echo "Deploying to production..."
            # Place deployment commands here, e.g.:
            # docker-compose -f docker-compose.prod.yml up -d
          '''
        }
      }
    }

    stage('Notify') {
      steps {
        echo 'Sending notification...'
        // Ajouter intégration Slack ou email ici
      }
    }
  }

  post {
    always {
      cleanWs()
    }
    success {
      echo '✅ Pipeline completed successfully!'
    }
    failure {
      echo '❌ Pipeline failed!'
    }
  }
}
