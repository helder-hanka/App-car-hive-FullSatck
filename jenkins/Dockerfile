FROM jenkins/jenkins:lts

USER root

# Installer Docker CLI (pour permettre à Jenkins d'utiliser Docker)
RUN apt-get update && apt-get install -y \
    docker.io \
    curl \
    gnupg \
    unzip \
    sudo \
    git

# Installer Maven
RUN curl -fsSL https://downloads.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar -xz -C /opt/ \
    && ln -s /opt/apache-maven-3.9.6 /opt/maven
ENV MAVEN_HOME=/opt/maven
ENV PATH=$MAVEN_HOME/bin:$PATH

# Installer Node.js + npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Donner accès Docker au user Jenkins
RUN usermod -aG docker jenkins

USER jenkins
