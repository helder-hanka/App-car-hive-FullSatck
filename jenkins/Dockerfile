FROM jenkins/jenkins:lts-jdk17

# Installer les plugins nécessaires
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# Désactiver le setup wizard
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# Copier la configuration JCasC
COPY casc_confings/jenkins.yaml /var/jenkins_home/casc_configs/jenkins.yaml
