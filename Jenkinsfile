pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // Stockés dans Jenkins
    // IMAGE_NAME = "helder78/carhive-backend"
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
            sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend/Projet_Spring_Boot-CarHiv'
            sh 'docker build -t $DOCKER_IMAGE_FRONTEND_ANGULAR ./frontend/car-Front-end-Angular'
            sh 'docker build -t $DOCKER_IMAGE_FRONTEND_VUE ./frontend/car-hive-vueJs'
        }
    }

    stage('Backend Tests') {
      steps {
        dir('backend/Projet_Spring_Boot-CarHive') {
          sh './mvnw test'
        }
      }
    }

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


// pipeline {
//   agent any

//   environment {
//     BACKEND_DIR = 'backend/Projet_Spring_Boot-CarHive'
//     ANGULAR_DIR = 'frontend/car-Front-end-Angular'
//     VUE_DIR = 'frontend/car-hive-vueJs'
//     BUILD_TAG = "${env.BUILD_NUMBER}"
//     DOCKERHUB_REPO = credentials('dockerhub_repo') // 🔐 Récupéré via Jenkins
//   }

//   stages {
//     stage('📥 Checkout') {
//       steps {
//         echo "📥 Récupération du code..."
//         checkout scm
//       }
//     }

//     stage('🛠️ Build Backend') {
//       agent {
//         docker {
//           image 'maven:3.9.6-eclipse-temurin-17'
//           args '-v $HOME/.m2:/root/.m2 -v /var/run/docker.sock:/var/run/docker.sock'
//         }
//       }
//       steps {
//         echo "⚙️ Build du backend Spring Boot..."
//         dir("${BACKEND_DIR}") {
//           sh 'mvn clean package -DskipTests'
//         }
//       }
//     }

//     stage('🛠️ Build Frontend') {
//       parallel {
//         stage('Angular') {
//           when { expression { fileExists("${ANGULAR_DIR}/angular.json") } }
//           agent {
//             docker {
//               image 'node:20'
//               args '-v /var/run/docker.sock:/var/run/docker.sock'
//             }
//           }
//           steps {
//             echo "⚙️ Build du frontend Angular..."
//             dir("${ANGULAR_DIR}") {
//               sh 'npm install'
//               sh 'npm run build --prod'
//             }
//           }
//         }

//         stage('Vue') {
//           when { expression { fileExists("${VUE_DIR}/vite.config.ts") } }
//           agent {
//             docker {
//               image 'node:20'
//               args '-v /var/run/docker.sock:/var/run/docker.sock'
//             }
//           }
//           steps {
//             echo "⚙️ Build du frontend Vue..."
//             dir("${VUE_DIR}") {
//               sh 'npm install'
//               sh 'npm run build --prod'
//             }
//           }
//         }
//       }
//     }

//     stage('✅ Tests') {
//       parallel {
//         stage('Backend Tests') {
//           agent {
//             docker {
//               image 'maven:3.9.6-eclipse-temurin-17'
//               args '-v $HOME/.m2:/root/.m2 -v /var/run/docker.sock:/var/run/docker.sock'
//             }
//           }
//           steps {
//             dir("${BACKEND_DIR}") {
//               sh 'mvn test'
//             }
//           }
//         }

//         stage('Frontend Angular Tests') {
//           when { expression { fileExists("${ANGULAR_DIR}/angular.json") } }
//           agent {
//             docker {
//               image 'node:20'
//               args '-v /var/run/docker.sock:/var/run/docker.sock'
//             }
//           }
//           steps {
//             dir("${ANGULAR_DIR}") {
//               sh 'npm run test -- --watch=false'
//             }
//           }
//         }

//         stage('Frontend Vue Tests') {
//           when { expression { fileExists("${VUE_DIR}/vite.config.ts") } }
//           agent {
//             docker {
//               image 'node:20'
//               args '-v /var/run/docker.sock:/var/run/docker.sock'
//             }
//           }
//           steps {
//             dir("${VUE_DIR}") {
//               sh 'npm run test'
//             }
//           }
//         }
//       }
//     }

//     stage('📦 Build & Push Docker Images') {
//       steps {
//         script {
//           echo "🐳 Création des images Docker..."
//           withCredentials([usernamePassword(credentialsId: 'dockerhub_id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
//             sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

//             def backendImage = docker.build("${DOCKERHUB_REPO}-backend:${BUILD_TAG}", "${BACKEND_DIR}")
//             backendImage.push()

//             def frontendImage = docker.build("${DOCKERHUB_REPO}-frontend:${BUILD_TAG}", "${ANGULAR_DIR}")
//             frontendImage.push()
//           }
//         }
//       }
//     }

//     stage('🚀 Deploy with Docker Compose') {
//       steps {
//         echo "🚀 Lancement des conteneurs..."
//         sh 'docker-compose up -d'
//       }
//     }
//   }

//   post {
//     success {
//       echo "✅ Déploiement réussi"
//     }
//     failure {
//       echo "❌ Échec du pipeline"
//     }
//   }
// }
