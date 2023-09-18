package nblc

import java.io.FileInputStream
import java.io.IOException
import java.util.*
import java.util.function.Consumer
import java.util.regex.MatchResult
import java.util.regex.Pattern
import java.util.stream.Collectors
import java.util.stream.Collectors.*


class DefaultEnvironmentProperties : EnvironmentProperties {

    private var map: Map<String, String>? = null
    private val REPLACEMENT_PATTERN = Pattern.compile("([$][$])|([$][{].*[}])|([$]\\w+)")


    constructor() {
        var tempMap: Map<String?, String?>
        try {
            FileInputStream(
                    System.getProperty("user.dir") + "/tea.properties").use { `is` ->
                val properties = Properties()
                properties.load(`is`)
                tempMap = properties.entries.stream()
                    .collect(
                        Collectors.toUnmodifiableMap(
                            { e -> e.key },
                            { e -> e.value }
                        )) as Map<String?, String?>;
            }
        } catch (ex3: IOException) {
            tempMap = HashMap()
        }
        map = resolvePlaceHolders(addEnvironment(tempMap))
    }

    override fun getEnvironmentProperties(key: String): String? {
        return map!![key]
    }

    private fun resolvePlaceHolders(
            mapin: Map<String, String>): Map<String, String> {
        var myMap = mapin.entries
                .stream()
                .collect(toMap<Map.Entry<String, String>, String, String>(
                    {(key, value) -> key as String },
                    {(_, value): Map.Entry<String, String> -> replaceValue(value, mapin)}
                ))
        return Collections.unmodifiableMap(myMap)
    }

    private fun replaceValue(
            value: String,
            mapin: Map<String, String>): String {
        return REPLACEMENT_PATTERN.matcher(value).replaceAll { mr: MatchResult ->
            var ret: String? = null
            val item = mr.group()
            if ("$$" == item) {
                ret = "\\$"
            } else if (item.startsWith("\${") && item.endsWith("}")) {
                ret = mapin[item.substring(2, item.length - 1)]
            } else if (item.length > 1) {
                ret = mapin[item.substring(1)]
            }
            if (ret == null) {
                throw RuntimeException("Unable to find replacement value for mr "
                        + mr.group())
            }
            ret = replaceValue(ret, mapin)
            ret
        }
    }

    private fun addEnvironment(
            mapin: Map<String?, String?>): Map<String, String> {
        val temp: MutableMap<String?, String?> = HashMap(mapin)
        System.getenv().entries.forEach(Consumer<Map.Entry<String, String?>> { (key, value): Map.Entry<String, String?> ->
            val mappedKey = key
                    .lowercase(Locale.getDefault())
                    .replace('_', '.')
            temp[mappedKey] = value
        })
        return temp.entries.stream().collect(toMap(
            { (key, value) -> key  as String},
            { (_, value) -> value as String }
        ))
    }

}
