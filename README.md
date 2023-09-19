# Venue Project

> #### New Beginnings Christian Fellowship
> #### Ladies' Christmas Tea

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

## Reference Website

* [Understanding Docker's CMD and ENTRYPOINT Instructions](https://www.cloudbees.com/blog/understanding-dockers-cmd-and-entrypoint-instructions)
* [Run a Java Main Method in Maven](https://www.baeldung.com/maven-java-main-method)
* [Create REST APIs with JAX-RS](https://restfulapi.net/create-rest-apis-with-jax-rs/)
