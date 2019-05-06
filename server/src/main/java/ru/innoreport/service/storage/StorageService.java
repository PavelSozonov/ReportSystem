package ru.innoreport.service.storage;

import java.io.IOException;

public interface StorageService {

    /**
     * Saves a file to the storage
     *
     * @param base64 is a base64 representation of the file to be saved
     * @param id     of the file
     * @return url of the file
     */
    String saveFile(String base64, String id) throws IOException;

    /**
     * Returns an URI of file with particular ID
     *
     * @param id identifier of the file
     * @return URI which can be used to download the file
     */
    String getFileUri(String id);
}
