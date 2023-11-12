package nblc;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.*;

import com.google.api.services.drive.model.Revision;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import org.javatuples.Pair;
import org.javatuples.Triplet;
import org.json.JSONObject;

public class DriveQuickstart {
    private static final String APPLICATION_NAME =
            "Google Drive API Java Quickstart";
    private static final JsonFactory JSON_FACTORY =
            GsonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES =
            Collections.singletonList(DriveScopes.DRIVE_METADATA_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
    private static Logger logger = LogManager.getLogger(App.class);
    private static final EnvironmentProperties env =
            new DefaultEnvironmentProperties();
    private static final String GDRIVE_PROJECT =
            env.getEnvironmentProperties("gdrive.project");
    private static final String CLIENT_ID =
            env.getEnvironmentProperties("client.id");
    private static final String CLIENT_X509_CERT_URL =
            env.getEnvironmentProperties("client.x509.cert.url");
    private static final String PRIVATE_KEY_ID =
            env.getEnvironmentProperties("private.key.id");
    private static final String PRIVATE_KEY =
            env.getEnvironmentProperties("private.key");
    private static final String PRIVATE_KEY_2 =
            env.getEnvironmentProperties("private.key.2");
    private static final String CLIENT_EMAIL =
            env.getEnvironmentProperties("client.email");
    private static final String UPLOADDB =
            env.getEnvironmentProperties("uploaddb");

    private static Credential getCredentials(
            final NetHttpTransport HTTP_TRANSPORT)
            throws IOException {
        JSONObject json = new JSONObject();
        json.put("type","service_account");
        json.put("project_id",GDRIVE_PROJECT);
        json.put("private_key_id",PRIVATE_KEY_ID);
        json.put("private_key",new String(Base64.getDecoder().
                decode(PRIVATE_KEY+PRIVATE_KEY_2), StandardCharsets.UTF_8));
        json.put("client_email",CLIENT_EMAIL);
        json.put("client_id",CLIENT_ID);
        json.put("auth_uri","https://accounts.google.com/o/oauth2/auth");
        json.put("token_uri","https://oauth2.googleapis.com/token");
        json.put("auth_provider_x509_cert_url",
                "https://www.googleapis.com/oauth2/v1/certs");
        json.put("client_x509_cert_url",CLIENT_X509_CERT_URL);
        json.put("universe_domain","googleapis.com");

        InputStream in = new ByteArrayInputStream(json.toString().getBytes());
        if (in == null) {
            throw new FileNotFoundException(
                    "Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleCredential credential = GoogleCredential.fromStream(in);
        credential =
                new GoogleCredential.Builder()
                        .setTransport(credential.getTransport())
                        .setJsonFactory(credential.getJsonFactory())
                        .setServiceAccountId(credential.getServiceAccountId())
                        .setServiceAccountPrivateKey(credential.
                                getServiceAccountPrivateKey())
                        .setServiceAccountScopes(DriveScopes.all())
                        // Set the email of the user you are impersonating.
                        .setServiceAccountUser(CLIENT_EMAIL)
                        .build();
        return credential;
    }

    public static List<File> Drive()
            throws IOException, GeneralSecurityException {
        // Build a new authorized API client service.
        final NetHttpTransport HTTP_TRANSPORT =
                GoogleNetHttpTransport.newTrustedTransport();
        Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY,
                getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();

        // Print the names and IDs for up to 10 files.
        FileList result = service.files().list()
                .setPageSize(100)
                .setFields("nextPageToken, files(id, name, size)")
                .execute();
        List<File> files = result.getFiles();
        if (files == null || files.isEmpty()) {
            logger.info("No files found.");
        } else {
            logger.trace("Files:");
            for (File file : files) {
                logger.trace(String.format("%s (%s)",
                        file.getName(), file.getId()));
            }
        }
        return files;
    }

    public static void DeleteDb(String filename) throws GeneralSecurityException, IOException {
        List<File> driveFiles = Drive();
        File foundFile = null;
        for (File f : driveFiles) {
            if (f.getName().equals(filename)) {
                logger.trace("Found "+filename+"!");
                foundFile = f;
                break;
            }
        }
        if(foundFile!=null) {
            final NetHttpTransport HTTP_TRANSPORT =
                    GoogleNetHttpTransport.newTrustedTransport();
            Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY,
                    getCredentials(HTTP_TRANSPORT))
                    .setApplicationName(APPLICATION_NAME)
                    .build();
            service.files().delete(foundFile.getId()).execute();
        }
    }

    public static String Upload(String inFilePath, String folder)
            throws IOException, GeneralSecurityException {
        if(UPLOADDB.equals("0") && !inFilePath.toLowerCase().contains("json")) {
            logger.warn("Database upload is OFF!");
            return null;
        }
        // Build a new authorized API client service.
        final NetHttpTransport HTTP_TRANSPORT =
                GoogleNetHttpTransport.newTrustedTransport();
        List<File> driveFiles = Drive();
        Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY,
                getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();
        java.io.File filePath = new java.io.File(inFilePath);
        File fileMetadata = new File();
        fileMetadata.setName(filePath.getName());
        FileContent mediaContent =
                new FileContent("application/x-gzip", filePath);
        try {
            logger.info("Checking to see if " + filePath.getName() +
                    " already exists ...");
            File foundFile = null;
            for (File f : driveFiles) {
                if (f.getName().equals(filePath.getName())) {
                    logger.warn("File already exists!");
                    foundFile = f;
                    break;
                }
            }
            if (foundFile == null) {
                logger.info("Time for an upload ... " + inFilePath);
                logger.info("Creating file now ...");
                fileMetadata.setParents(Collections.singletonList(
                        driveFiles.stream().filter(f -> f.getName().equals(
                                folder))
                                .findFirst().get().getId()));
                File file = service.files().create(fileMetadata, mediaContent)
                        .setFields("id")
                        .execute();
                return file.getId();
            } else {
                logger.info("Updating file now ...");
                File file = service.files().
                        update(foundFile.getId(), fileMetadata, mediaContent)
                        .execute();
                return file.getId();
            }
        } catch (GoogleJsonResponseException e) {
            logger.error("Unable to upload file: " + e.getDetails());
            throw e;
        }
    }

    public static
            HashMap<String,ByteArrayOutputStream> Download(boolean isDownloadDb)
            throws IOException, GeneralSecurityException {
        // Build a new authorized API client service.
        HashMap<String,ByteArrayOutputStream> retList = new HashMap<String,ByteArrayOutputStream>();
        final NetHttpTransport HTTP_TRANSPORT =
                GoogleNetHttpTransport.newTrustedTransport();
        List<File> driveFiles = Drive();

        List<File> foundFiles = new ArrayList<File>();
        for (File f : driveFiles) {
            if (f.getName().equals("attendees.tar.gz") && isDownloadDb) {
                logger.trace(f.getName());
                foundFiles.add(f);
            } else if (f.getName().toLowerCase().contains("json")) {
                logger.trace(f.getName());
                foundFiles.add(f);
            }
        }

        if(foundFiles.size()>0) {
            for(File foundFile : foundFiles) {
                Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY,
                        getCredentials(HTTP_TRANSPORT))
                        .setApplicationName(APPLICATION_NAME)
                        .build();
                try {
                    if (foundFile.getName().equals("attendees.tar.gz")) {
                        logger.trace("Size of file is "+foundFile.getSize()+
                                "; its id is "+foundFile.getId());
                        Drive.Revisions.List oper =
                                service.revisions().list(foundFile.getId());
                        oper.setFields("revisions(size,modifiedTime,id)");
                        List<Triplet<String,Long,DateTime>> revList =
                                new ArrayList<Triplet<String,Long,DateTime>>();
                        for (Revision rev : oper.execute().getRevisions()) {
                            revList.add(Triplet.with(
                                    rev.getId(),
                                    rev.getSize(),
                                    rev.getModifiedTime()));
                        }
                        if(revList.size()>1) {
                            Triplet<String,Long, DateTime> last =
                                    revList.get(revList.size()-2);
                            logger.info(
                                    "Previous version (" + last.getValue(0)+
                                            ") was created on " +
                                            last.getValue2() +
                                            " and had size " +
                                            last.getValue1());
                        }
                        // Remove empty revisions
                        /*
                        if(revList.get(revList.size()-1).getValue1()==0) {
                            for (int i = revList.size()-1; i>=0; i--) {
                                if(revList.get(i).getValue1()==0)
                                    service.revisions().delete(
                                            foundFile.getId(),
                                            revList.get(i).getValue0());
                            }
                        }
                        */
                    }
                    OutputStream outputStream = new ByteArrayOutputStream();
                    service.files().get(foundFile.getId()).
                            executeMediaAndDownloadTo(outputStream);
                    retList.put(foundFile.getName(),
                            (ByteArrayOutputStream) outputStream);
                } catch (GoogleJsonResponseException e) {
                    logger.error("Unable to download file: " + e.getDetails());
                    throw e;
                }
            }
            return retList;
        }
        else return null;
    }

}

