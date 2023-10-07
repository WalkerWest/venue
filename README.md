# Venue Project

> #### New Beginnings Christian Fellowship
> #### Ladies' Christmas Tea

## Source Code

The source code for this project is available at:  [GitHub - WalkerWest / venue](https://github.com/WalkerWest/venue)

## Compilation Notes

* For running locally:
  1.  Option 1: `mvn compile exec:java -Dexec.mainClass="nblc.App"`
  2.  Option 2: `mvn compile exec:exec`
  3.  Option 3: `gradle runWithExec`

## Gradle Notes

Remember, to access Google Drive, this app requires the following environment variables to be set:

* `CLIENT_EMAIL`
* `CLIENT_ID`
* `CLIENT_X509_CERT_URL`
* `GDRIVE_PROJECT`
* `PRIVATE_KEY`
* `PRIVATE_KEY_2`
* `PRIVATE_KEY_ID`

**NOTE:** These environment variables must be set **before** starting the Gradle daemon.

## Building the Docker Image

1.  Change into the `./docker/` subdirectory
2.  Modify the `startup.sh` file to trigger a source recompile
2.  `docker image build --tag ww-test:auto .`
3.  Test the image (optional):
    * include `-e` params for each of the environment variables in the **Gradle Notes** section:

      ```
      -e CLIENT_EMAIL='...' \
      -e CLIENT_ID='...' \
      -e CLIENT_X509_CERT_URL='...' \
      -e GDRIVE_PROJECT='...' \
      -e PRIVATE_KEY='...' \
      -e PRIVATE_KEY_2='...' \
      -e PRIVATE_KEY_ID='...' \
      ```

    * Include the `-e` entries between `run` and `--rm` in the following command:
      `docker run --rm --interactive --tty --init --name ww ww-test:auto /bin/bash`
    * Once in the container, execute: `/root/startup.sh`
    * Hit [CTRL]+[C] to stop the program and `exit` the containter

4.  The the image a second time (optional):

    * With the same `-e` parameters inserted between `run` and `--name` as mentioned above, execute:
      `docker run --name ww ww-test:auto`
    * From another window, locate the Java process and kill it:
      ```
      78490 ?        Sl     0:33 java -jar target/tea-1.0-SNAPSHOT-jar-with-dependencies.jar
      ```
    * Find the left over Docker container and remove it:
      ```
      [root@WW81 venue]# docker ps -a
      CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS                            PORTS     NAMES
      b264ec7434f8   ww-test:auto   "/bin/sh -c /root/st..." 2 minutes ago   Exited (137) About a minute ago             ww
      [root@WW81 venue]# docker rm b264ec7434f8
      b264ec7434f8
      [root@WW81 venue]#
      ```

## Push the Docker Image to Docker Hub

1.  Tag the image: `docker image build --tag walkerwest/ww-test:auto .`
2.  Push the image:  `docker push walkerwest/ww-test:auto`

## Re-Deploy to Google Cloud Run

1.  Go to [Cloud Run Console](https://console.cloud.google.com/)
2.  Verify the correct project is selected
3.  Go to "All Serivces" and, under the "Serverless" heading, choose:  "Cloud Run"
4.  Pick the correct entry from "Services" and click the "Edit &amp; Deploy New Revision" link
5.  **NOTE:**  The same environment variables mentioned above are configured here with their appropriate values.
6.  Click **DEPLOY**
7.  Once deployed, copy the URL, paste it into a browser window and append `/www` onto the end
8.  Additionally, to test REST, remove the `/www` and append `/rest`
    * Add, after `/rest`, `/msg` for the test message: `My message` 
    * Use `/reservation` for JSON: 
      ```
      [{"name":"Walker","seatQty":4,"reservationId":"f2277f09-0a92-4175-9fad-662f031bf4b4"}]
      ```

## Reference Websites

* [Understanding Docker's CMD and ENTRYPOINT Instructions](https://www.cloudbees.com/blog/understanding-dockers-cmd-and-entrypoint-instructions)
* [Run a Java Main Method in Maven](https://www.baeldung.com/maven-java-main-method)
* [Create REST APIs with JAX-RS](https://restfulapi.net/create-rest-apis-with-jax-rs/)

## Embedded Database (Apache Derby) Notes

* [An Overview of 3 Java Embedded Databases](https://dzone.com/articles/3-java-embedded-databases#:~:text=An%20embedded%20database%20is%20a,testability%2C%20and%20ease%20of%20configuration.)
* [Derby Reference PDF](https://db.apache.org/derby/docs/10.5/ref/refderby.pdf)
* [The best UUID type for a database Primary Key](https://vladmihalcea.com/uuid-database-primary-key/)

## Unit Testing

* Run all unit tests with Maven:  `mvn test`
* Run a single unit test:  `mvn -Dtest=nblc.MoreTest#verifyReservationEmpty test`

## Debugging Web Pages

* Run:  `npm install -g browser-sync`

## SAP UI5 Controls

* [UI5 Web Components](https://sap.github.io/ui5-webcomponents/)
* `npm run dev`
* `npx vite build`
* [SVG Pan Zoom](https://github.com/bumbu/svg-pan-zoom)
* [UI5 Wizard](https://sap.github.io/ui5-webcomponents/playground/?path=/story/fiori-wizard--page-mode)

