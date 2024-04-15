FROM maven:3.8.5-eclipse-temurin-17-alpine
WORKDIR app
COPY src src
COPY pom.xml pom.xml
RUN mvn clean package -DskipTests
EXPOSE 8080
CMD java -jar target/papaluz-0.0.1-SNAPSHOT.jar
