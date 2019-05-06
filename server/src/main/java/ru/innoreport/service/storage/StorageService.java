package ru.innoreport.service.storage;

public interface StorageService {

    /**
     * Saves a file to the storage
     *
     * @param base64File is a base64 representation of the file to be saved
     * @return id of created file
     */
    String saveFile(String base64File);

    /**
     * Returns an URI of file with particular ID
     *
     * @param id identifier of the file
     * @return URI which can be used to download the file
     */
    String getFileUri(String id);
}
