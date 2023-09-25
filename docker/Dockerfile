FROM amazonlinux:2

ARG version=11.0.20.9-1
# In addition to installing the Amazon corretto, we also install
# fontconfig. The folks who manage the docker hub's
# official image library have found that font management
# is a common usecase, and painpoint, and have
# recommended that Java images include font support.
#
# See:
#  https://github.com/docker-library/official-images/blob/master/test/tests/java-uimanager-font/container.java

# The logic and code related to Fingerprint is contributed by @tianon in a Github PR's Conversation
# Comment = https://github.com/docker-library/official-images/pull/7459#issuecomment-592242757
# PR = https://github.com/docker-library/official-images/pull/7459
RUN set -eux \
    && export GNUPGHOME="$(mktemp -d)" \
    && curl -fL -o corretto.key https://yum.corretto.aws/corretto.key \
    && gpg --batch --import corretto.key \
    && gpg --batch --export --armor '6DC3636DAE534049C8B94623A122542AB04F24E3' > corretto.key \
    && rpm --import corretto.key \
    && rm -r "$GNUPGHOME" corretto.key \
    && curl -fL -o /etc/yum.repos.d/corretto.repo https://yum.corretto.aws/corretto.repo \
    && grep -q '^gpgcheck=1' /etc/yum.repos.d/corretto.repo \
    && echo "priority=9" >> /etc/yum.repos.d/corretto.repo \
    && yum install -y java-11-amazon-corretto-devel-$version \
    && (find /usr/lib/jvm/java-11-amazon-corretto -name src.zip -delete || true) \
    && yum install -y fontconfig \
    && yum clean all

ENV LANG C.UTF-8
ENV JAVA_HOME=/usr/lib/jvm/java-11-amazon-corretto

RUN yum -y install git
RUN yum -y install mlocate
RUN yum -y install mysql
RUN yum -y install mariadb-server
RUN yum -y install procps
RUN yum -y install screen
RUN yum -y install which
RUN yum -y install maven

RUN yum -y install net-tools
RUN yum -y install links

COPY .bashrc /root
COPY .bash_profile /root
COPY startup.sh /root

EXPOSE 8080

RUN mkdir /app
WORKDIR "/app"
RUN git clone https://github.com/WalkerWest/venue.git
WORKDIR "/app/venue"
RUN mvn clean compile assembly:single

# CMD /root/startup.sh
WORKDIR "/app/venue"
ENTRYPOINT ["java", "-jar", "target/tea-1.0-SNAPSHOT-jar-with-dependencies.jar"]
