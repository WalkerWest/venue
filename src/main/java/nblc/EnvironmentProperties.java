package nblc;

import java.util.Optional;

public interface EnvironmentProperties {
    Optional<String> getEnvironmentProperties(String key);
}
