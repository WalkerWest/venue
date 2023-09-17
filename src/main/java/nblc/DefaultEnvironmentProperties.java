package nblc;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public final class DefaultEnvironmentProperties
        implements EnvironmentProperties {
    private final Map<String, String> map;
    private final static Pattern REPLACEMENT_PATTERN
            = Pattern.compile("([$][$])|([$][{].*[}])|([$]\\w+)");

    public DefaultEnvironmentProperties() {
        Map<String, String> tempMap;

        try(FileInputStream is= new FileInputStream(
                System.getProperty("user.dir")+"/tea.properties")) {
            Properties properties = new Properties();
            properties.load(is);
            tempMap = properties
                    .entrySet()
                    .stream()
                    .collect(Collectors
                            .toUnmodifiableMap(
                                    e -> (String)e.getKey(),
                                    e -> (String)e.getValue()));
        } catch(IOException ex3) {
            tempMap = new HashMap<>();
        }
        map = resolvePlaceHolders(addEnvironment(tempMap));
    }
    public Optional<String> getEnvironmentProperties(String key) {
        return Optional.ofNullable(map.get(key));
    }
    private static Map<String, String> resolvePlaceHolders(
            final Map<String, String> mapin) {
        return mapin.entrySet()
                .stream()
                .collect(Collectors
                        .toUnmodifiableMap(
                                Map.Entry::getKey,
                                e -> replaceValue(e.getValue(), mapin)));
    }

    private static String replaceValue(
            final String value,
            final Map<String, String> mapin) {
        return REPLACEMENT_PATTERN.matcher(value).replaceAll(mr -> {
            String ret = null;
            String item = mr.group();
            if("$$".equals(item)) {
                ret = "\\$";
            } else if(item.startsWith("${") && item.endsWith("}")) {
                ret = mapin.get(item.substring(2, item.length()-1));
            } else if(item.length() > 1) {
                ret = mapin.get(item.substring(1));
            }
            if(ret == null) {
                throw new RuntimeException(
                        "Unable to find replacement value for mr "
                                + mr.group());
            }
            ret = replaceValue(ret, mapin);
            return ret;
        });
    }

    private static Map<String, String> addEnvironment(
            final Map<String, String> mapin) {
        Map<String, String> temp = new HashMap<>(mapin);
        System.getenv().entrySet().forEach(e -> {
            String mappedKey = e.getKey()
                    .toLowerCase()
                    .replace('_', '.');
            temp.put(mappedKey, e.getValue());
        });
        return Map.ofEntries(temp.entrySet()
                .toArray(new Map.Entry[temp.entrySet().size()]));
    }

}
