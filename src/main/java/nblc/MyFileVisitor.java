package nblc;

import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorOutputStream;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class MyFileVisitor implements FileVisitor<Path> {

    private static Logger logger = LogManager.getLogger(App.class);

    Path source = null;
    TarArchiveOutputStream tOut = null;
    OutputStream fOut = null;
    BufferedOutputStream buffOut = null;
    GzipCompressorOutputStream gzOut = null;

    public MyFileVisitor(String pathSrc, String tarFileName) throws IOException {
        super();
        this.source = Paths.get(pathSrc);
        fOut = Files.newOutputStream(Paths.get(tarFileName));
        buffOut = new BufferedOutputStream(fOut);
        gzOut = new GzipCompressorOutputStream(buffOut);
        tOut = new TarArchiveOutputStream(gzOut);
    }

    @Override
    public FileVisitResult preVisitDirectory(
            Path dir, BasicFileAttributes attrs) throws IOException {
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFile(
            Path file, BasicFileAttributes attributes) throws IOException {
        if (attributes.isSymbolicLink()) {
            return FileVisitResult.CONTINUE;
        }

        // get filename
        Path targetFile = source.relativize(file);

        try {
            TarArchiveEntry tarEntry = new TarArchiveEntry(
                    file.toFile(), targetFile.toString());

            tOut.putArchiveEntry(tarEntry);
            Files.copy(file, tOut);
            tOut.closeArchiveEntry();
            logger.trace(String.format("file : %s", file));
        } catch (IOException e) {
            logger.error(String.format("Unable to tar.gz : %s%n%s%n",
                    file, e));
        }

        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFileFailed(Path file, IOException exc)
            throws IOException {
        logger.error(String.format("Unable to tar.gz : %s%n%s%n", file, exc));
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult postVisitDirectory(Path dir, IOException exc)
            throws IOException {
        boolean finishedSearch = Files.isSameFile(dir, source);
        if (finishedSearch) {
            tOut.finish();
            tOut.close();
            gzOut.close();
            buffOut.close();
            fOut.close();
            return FileVisitResult.TERMINATE;
        }
        return FileVisitResult.CONTINUE;    }

}
