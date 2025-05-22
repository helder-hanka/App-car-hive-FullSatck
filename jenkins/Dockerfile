# # ./jenkins/Dockerfile
# FROM jenkins/jenkins:lts-jdk17

# # Passer en root pour les installations système
# USER root

# # Installer Docker CLI
# RUN apt-get update && apt-get install -y docker.io

# # Ajouter jenkins au groupe docker
# RUN usermod -aG docker jenkins

# # Revenir à l’utilisateur jenkins
# USER jenkins

# # Installer les plugins Jenkins nécessaires
# COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
# RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# # Désactiver le setup wizard
# ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# # Copier la config JCasC
# COPY casc_configs/jenkins.yaml /var/jenkins_home/casc_configs/jenkins.yaml


FROM jenkins/jenkins:lts-jdk17

# Désactive le setup wizard
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# Installe Docker dans le conteneur
USER root
RUN apt-get update && apt-get install -y docker.io && \
    usermod -aG docker jenkins && \
    rm -rf /var/lib/apt/lists/*

# (Optionnel) Affiche les permissions du socket Docker
RUN ls -l /var/run/docker.sock || true

# Installe les plugins
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# Copie la config JCasC
COPY casc_configs/jenkins.yaml /var/jenkins_home/casc_configs/jenkins.yaml

# Reviens à l'utilisateur Jenkins (sécurité)
USER jenkins
