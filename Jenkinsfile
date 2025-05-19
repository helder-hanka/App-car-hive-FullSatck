pipeline {
  agent any // Utilise un agent Jenkins libre (machine Jenkins ou container)

  environment {
    COMPOSE_FILE = 'docker-compose.yml' // Fichier docker-compose utilisé
  }

  options {
    timestamps() // Affiche l’heure dans les logs
    skipStagesAfterUnstable() // Arrête les étapes suivantes si une est instable
  }

  stages {
    // 1️⃣ Phase de récupération du code source
    stage('Checkout') {
      steps {
        echo '📥 Clonage du dépôt...'
        checkout scm // clone le dépôt Git relié au job Jenkins
      }
    }

    // 2️⃣ Build du backend Java Spring Boot
    stage('Build Backend') {
      steps {
        echo '⚙️ Compilation du backend Spring Boot...'
        dir('backend/Projet_Spring_Boot-CarHive') {
          sh 'mvn clean package -DskipTests' // compile sans lancer les tests
        }
      }
    }

    // 3️⃣ Build du frontend Angular
    stage('Build Frontend Angular') {
      steps {
        echo '⚙️ Build Angular...'
        dir('frontend/car-Front-end-Angular') {
          sh 'npm install'
          sh 'npm run build --prod'
        }
      }
    }

    // 4️⃣ Build du frontend Vue.js
    stage('Build Frontend Vue') {
      steps {
        echo '⚙️ Build Vue.js...'
        dir('frontend/car-hive-vueJs') {
          sh 'npm install'
          sh 'npm run build --prod'
        }
      }
    }

    // 5️⃣ Build des images Docker
    stage('Docker Compose Build') {
      steps {
        echo '🐳 Build des images Docker...'
        sh 'docker-compose build'
      }
    }

    // 6️⃣ Démarrage des containers
    stage('Docker Compose Up') {
      steps {
        echo '🚀 Lancement des services via Docker Compose...'
        sh 'docker-compose up -d'
      }
    }
  }

  // 🔁 Étapes de post-pipeline
  post {
    success {
      echo '✅ Déploiement terminé avec succès !'
    }
    failure {
      echo '❌ Échec du pipeline.'
    }
    always {
      echo '🧹 Nettoyage temporaire (si besoin)...'
    }
  }
}
