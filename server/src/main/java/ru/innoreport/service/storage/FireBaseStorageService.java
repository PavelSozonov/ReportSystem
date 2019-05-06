package ru.innoreport.service.storage;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;

public class FireBaseStorageService implements StorageService {

    final private Storage storage;
    final private String projectName = "innoreport-b3617";
    final private String dbUrl = "https://" + projectName + ".firebaseio.com";
    final private String bucketName = projectName + ".appspot.com";

    public FireBaseStorageService() {
        FileInputStream serviceAccount;
        FirebaseOptions options = null;
        try {
            serviceAccount = new FileInputStream("serviceAccountKey.json");
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(dbUrl)
                    .setStorageBucket(bucketName)
                    .build();
            FirebaseApp.initializeApp(options);
            Bucket bucket = StorageClient.getInstance().bucket();
            storage = bucket.getStorage();
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    /**
     * Uploads a file to Google Cloud Storage to the bucket specified in the BUCKET_NAME
     * environment variable, appending a timestamp to end of the uploaded filename.
     */
    @SuppressWarnings("deprecation")
    public String saveFile(String base64, String id) throws IOException {
        final String fileName = id + ".jpg";

        InputStream inputStream = base64ToInputStream(base64);

        // The inputstream is closed by default, so we don't need to close it here
        BlobInfo blobInfo =
                storage.create(
                        BlobInfo
                                .newBuilder(bucketName, fileName)
                                // Modify access list to allow all users with link to read file
                                .setAcl(new ArrayList<>(Arrays.asList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER))))
                                .build(),
                        inputStream);
        // Return the public download link
        return blobInfo.getMediaLink();
    }

    private InputStream base64ToInputStream(String base64) {
        byte[] decodedString;
        try {
            decodedString = Base64.getDecoder().decode(new String(base64).getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException();
        }
        return new ByteArrayInputStream(decodedString);
    }

    @Override
    public String getFileUri(String id) {
        return "https://www.googleapis.com/download/storage/v1/b/innoreport-b3617.appspot.com/o/" +
                id +
                ".jpg?alt=media";
    }
}
