pipeline {
  agent any

  environment {
    BACKEND_DIR = 'backend/Projet_Spring_Boot-CarHive'
    ANGULAR_DIR = 'frontend/car-Front-end-Angular'
    VUE_DIR = 'frontend/car-hive-vueJs'
    DOCKERHUB_CREDENTIALS = 'dockerhub_id'
    DOCKERHUB_REPO = 'tonutilisateur/carhive'
    BUILD_TAG = "${env.BUILD_NUMBER}"
  }

  stages {

    stage('📥 Checkout') {
      steps {
        echo "📥 Récupération du code..."
        checkout scm
      }
    }

    stage('🛠️ Build Backend') {
      agent {
        docker {
          image 'maven:3.9.6-eclipse-temurin-17'
          args '-v $HOME/.m2:/root/.m2'
        }
      }
      steps {
        echo "⚙️ Build du backend Spring Boot..."
        dir("${BACKEND_DIR}") {
          sh 'mvn clean package -DskipTests'
        }
      }
    }

    stage('🛠️ Build Frontend') {
      parallel {
        stage('Angular') {
          when {
            expression { fileExists("${ANGULAR_DIR}/angular.json") }
          }
          agent {
            docker {
              image 'node:20'
            }
          }
          steps {
            echo "⚙️ Build du frontend Angular..."
            dir("${ANGULAR_DIR}") {
              sh 'npm install'
              sh 'npm run build --prod'
            }
          }
        }

        stage('Vue') {
          when {
            expression { fileExists("${VUE_DIR}/vite.config.ts") }
          }
          agent {
            docker {
              image 'node:20'
            }
          }
          steps {
            echo "⚙️ Build du frontend Vue..."
            dir("${VUE_DIR}") {
              sh 'npm install'
              sh 'npm run build --prod'
            }
          }
        }
      }
    }

    stage('✅ Tests') {
      parallel {
        stage('Backend Tests') {
          agent {
            docker {
              image 'maven:3.9.6-eclipse-temurin-17'
              args '-v $HOME/.m2:/root/.m2'
            }
          }
          steps {
            dir("${BACKEND_DIR}") {
              sh 'mvn test'
            }
          }
        }

        stage('Frontend Angular Tests') {
          when {
            expression { fileExists("${ANGULAR_DIR}/angular.json") }
          }
          agent {
            docker {
              image 'node:20'
            }
          }
          steps {
            dir("${ANGULAR_DIR}") {
              sh 'npm run test -- --watch=false'
            }
          }
        }

        stage('Frontend Vue Tests') {
          when {
            expression { fileExists("${VUE_DIR}/vite.config.ts") }
          }
          agent {
            docker {
              image 'node:20'
            }
          }
          steps {
            dir("${VUE_DIR}") {
              sh 'npm run test'
            }
          }
        }
      }
    }

    stage('📦 Build & Push Docker Images') {
      steps {
        script {
          echo "🐳 Création des images Docker..."
          docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
            def backendImage = docker.build("${DOCKERHUB_REPO}-backend:${BUILD_TAG}", "${BACKEND_DIR}")
            backendImage.push()
            def frontendImage = docker.build("${DOCKERHUB_REPO}-frontend:${BUILD_TAG}", "${ANGULAR_DIR}")
            frontendImage.push()
          }
        }
      }
    }

    stage('🚀 Deploy with Docker Compose') {
      steps {
        echo "🚀 Lancement des conteneurs..."
        sh 'docker-compose up -d'
      }
    }
  }

  post {
    success {
      echo "✅ Déploiement réussi"
    }
    failure {
      echo "❌ Échec du pipeline"
    }
  }
}
