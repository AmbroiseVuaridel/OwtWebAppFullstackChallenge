FROM openjdk:12
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} owt-web-app-fullstack-challenge.jar
ENTRYPOINT ["java","-jar","/owt-web-app-fullstack-challenge.jar"]
EXPOSE 8083