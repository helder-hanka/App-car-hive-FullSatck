pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    DOCKER_USERNAME = 'helder78'
    DOCKER_PASSWORD = credentials('docker-password')
    IMAGE_TAG = "${env.BUILD_NUMBER}"

    DOCKER_IMAGE_BACKEND = "carhive-backend"
    DOCKER_IMAGE_FRONTEND_ANGULAR = "carhive-frontend-angular"
    DOCKER_IMAGE_FRONTEND_VUE = "carhive-frontend-vue"
    JWT_SECRET_KEY_ENV = credentials('jwt-secret-key')
    JWT_EXPIRATION_TIME = credentials('security-jwt-expiration-time')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install Dependencies') {
      steps {
        script {
          sh '''
            echo "Installing dependencies..."
            cd backend/Projet_Spring_Boot-CarHive
            ./mvnw clean install -DskipTests
            cd ../../frontend/car-Front-end-Angular
            npm install
            cd ../car-hive-vueJs
            npm install
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

    stage('Test Backend Image') {
      steps {
        script {
          sh """
            // docker run --rm -d --name carhive-backend-test -p 8080:8080 $DOCKER_USERNAME/$DOCKER_IMAGE_BACKEND:$IMAGE_TAG
            docker run --rm -d --name carhive-backend-test -p 8080:8080 -e JWT_SECRET_KEY=$JWT_SECRET_KEY_ENV -e JWT_EXPIRATION_TIME=$JWT_EXPIRATION_TIME $DOCKER_USERNAME/$DOCKER_IMAGE_BACKEND:$IMAGE_TAG
            sleep 30
            curl -f http://localhost:8080/api/v1/cars || exit 1
            docker stop carhive-backend-test
          """
        }
      }
    }

    stage('Test Angular Frontend Image') {
      steps {
        script {
          sh """
            docker run --rm -d --name carhive-angular-test -p 4200:80 $DOCKER_USERNAME/$DOCKER_IMAGE_FRONTEND_ANGULAR:$IMAGE_TAG
            sleep 30
            curl -f http://localhost:4200 || exit 1
            docker stop carhive-angular-test
          """
        }
      }
    }

    stage('Test Vue Frontend Image') {
      steps {
        script {
          sh """
            docker run --rm -d --name carhive-vue-test -p 8086:80 $DOCKER_USERNAME/$DOCKER_IMAGE_FRONTEND_VUE:$IMAGE_TAG
            sleep 30
            curl -f http://localhost:8086 || exit 1
            docker stop carhive-vue-test
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
