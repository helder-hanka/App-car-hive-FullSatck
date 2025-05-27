pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    DOCKER_USERNAME = 'Helder78'
    DOCKER_PASSWORD = credentials('docker-password')
    IMAGE_TAG = "${env.BUILD_NUMBER}"
    IMAGE_NAME = "helder"
    DOCKER_IMAGE_BACKEND = "helder78/carhive-backend"
    DOCKER_IMAGE_FRONTEND_ANGULAR = "helder78/carhive-frontend-angular"
    DOCKER_IMAGE_FRONTEND_VUE = "helder78/carhive-frontend-vue"

    POSTGRES_USER = credentials('pg-user')
    POSTGRES_PASSWORD = credentials('pg-password')
    POSTGRES_DB = credentials('pg-db')
    PGADMIN_EMAIL = credentials('pgadmin-email')
    PGADMIN_PASSWORD = credentials('pgadmin-password')
    JWT_SECRET_KEY = credentials('jwt-secret')
    SECURITY_JWT_EXPIRATION_TIME = credentials('jwt-expiration')
    DOCKER_PASSWORD = 'docker-password'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image for Backend') {
      steps {
        sh 'docker build --no-cache -t $IMAGE_NAME:$IMAGE_TAG $DOCKER_IMAGE_BACKEND ./backend/Projet_Spring_Boot-CarHive'
      }
    }
    stage('Build Docker Image for Frontend Angular') {
      steps {
        sh 'docker build --no-cache -t $IMAGE_NAME:$IMAGE_TAG $DOCKER_IMAGE_FRONTEND_ANGULAR ./frontend/car-Front-end-Angular'
      }
    }
    stage('Build Docker Image for Frontend Vue') {
      steps {
        sh 'docker build --no-cache -t $IMAGE_NAME:$IMAGE_TAG $DOCKER_IMAGE_FRONTEND_VUE ./frontend/car-hive-vueJs'
      }
    }
    stage('Test Docker Image for Backend') {
      steps {
        script {
          sh '''
            docker run --rm -d --name carhive-backend-test -p 8080:8080 $IMAGE_NAME:$IMAGE_TAG
            sleep 10
            curl -f http://localhost:8080/api/v1/cars || exit 1
            docker stop carhive-backend-test
          '''
        }
      }
    }
    stage('Test Docker Image for Frontend Angular') {
      steps {
        script {
          sh '''
            docker run --rm -d --name carhive-frontend-angular-test -p 4200:80 $IMAGE_NAME:$IMAGE_TAG
            sleep 10
            curl -f http://localhost:4200 || exit 1
            docker stop carhive-frontend-angular-test
          '''
        }
      }
    }
    stage('Test Docker Image for Frontend Vue') {
      steps {
        script {
          sh '''
            docker run --rm -d --name carhive-frontend-vue-test -p 8081:80 $IMAGE_NAME:$IMAGE_TAG
            sleep 10
            curl -f http://localhost:8081 || exit 1
            docker stop carhive-frontend-vue-test
          '''
        }
      }
    }
    stage('Push Backend Image') {
      steps {
          script {
            sh '''
              echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
              docker tag $IMAGE_NAME:$IMAGE_TAG $DOCKER_IMAGE_BACKEND:$IMAGE_TAG
              docker push $DOCKER_IMAGE_BACKEND:$IMAGE_TAG
            '''
          }
        }
      }

    stage('Push Frontend Angular Image') {
      steps {
          script {
            sh '''
              echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
              docker tag $IMAGE_NAME:$IMAGE_TAG $DOCKER_IMAGE_FRONTEND_ANGULAR:$IMAGE_TAG
              docker push $DOCKER_IMAGE_FRONTEND_ANGULAR:$IMAGE_TAG
            '''
          }
        }
      }
      
    stage('Push Frontend Vue Image') {
      steps {
          script {
            sh '''
              echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
              docker tag $IMAGE_NAME:$IMAGE_TAG $DOCKER_IMAGE_FRONTEND_VUE:$IMAGE_TAG
              docker push $DOCKER_IMAGE_FRONTEND_VUE:$IMAGE_TAG
            '''
          }
        }
      }
    stage('Cleanup Docker Images') {
      steps {
        script {
          sh '''
            docker rmi $IMAGE_NAME:$IMAGE_TAG || true
            docker rmi $DOCKER_IMAGE_BACKEND:$IMAGE_TAG || true
            docker rmi $DOCKER_IMAGE_FRONTEND_ANGULAR:$IMAGE_TAG || true
            docker rmi $DOCKER_IMAGE_FRONTEND_VUE:$IMAGE_TAG || true
          '''
        }
      }
    }
    stage('Deploy to Production') {
      steps {
        script {
          sh '''
            echo "Deploying to production..."
            # Add your deployment commands here
            # For example, you might use kubectl or docker-compose to deploy the images
          '''
        }
      }
    }
    stage('Notify') {
      steps {
        script {
          // Notify via email, Slack, etc.
          echo 'Sending notification...'
        }
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
}
