/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagNameOrComponentSettings
 * @returns { ClassDecorator }
 */
const customElement = (tagNameOrComponentSettings) => {
    return (target) => {
        if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
            target.metadata = {};
        }
        if (typeof tagNameOrComponentSettings === "string") {
            target.metadata.tag = tagNameOrComponentSettings;
            return;
        }
        const { tag, languageAware, themeAware, fastNavigation, } = tagNameOrComponentSettings;
        target.metadata.tag = tag;
        if (languageAware) {
            target.metadata.languageAware = languageAware;
        }
        if (themeAware) {
            target.metadata.themeAware = themeAware;
        }
        if (fastNavigation) {
            target.metadata.fastNavigation = fastNavigation;
        }
        ["render", "renderer", "template", "staticAreaTemplate", "styles", "staticAreaStyles", "dependencies"].forEach((customElementEntity) => {
            const _customElementEntity = customElementEntity === "render" ? "renderer" : customElementEntity;
            const customElementEntityValue = tagNameOrComponentSettings[_customElementEntity];
            customElementEntityValue && Object.defineProperty(target, customElementEntity, {
                get: () => customElementEntityValue,
            });
        });
    };
};

/**
 * Returns a property decorator.
 *
 * @param { Property } propData
 * @returns { PropertyDecorator }
 */
const property = (propData) => {
    return (target, propertyKey) => {
        const ctor = target.constructor;
        if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
            ctor.metadata = {};
        }
        const metadata = ctor.metadata;
        if (!metadata.properties) {
            metadata.properties = {};
        }
        const propsMetadata = metadata.properties;
        if (!propsMetadata[propertyKey]) {
            propsMetadata[propertyKey] = propData || { type: String };
        }
    };
};

/**
 * Returns a slot decorator.
 *
 * @param { Slot } slotData
 * @returns { PropertyDecorator }
 */
const slot = (slotData) => {
    return (target, slotKey) => {
        const ctor = target.constructor;
        if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
            ctor.metadata = {};
        }
        const metadata = ctor.metadata;
        if (!metadata.slots) {
            metadata.slots = {};
        }
        const slotMetadata = metadata.slots;
        if (slotData && slotData.default && slotMetadata.default) {
            throw new Error("Only one slot can be the default slot.");
        }
        const key = slotData && slotData.default ? "default" : slotKey;
        slotData = slotData || { type: HTMLElement };
        if (!slotData.type) {
            slotData.type = HTMLElement;
        }
        if (!slotMetadata[key]) {
            slotMetadata[key] = slotData;
        }
        if (slotData.default) {
            delete slotMetadata.default.default;
            slotMetadata.default.propertyName = slotKey;
        }
        ctor.metadata.managedSlots = true;
    };
};

/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
const event = (name, data = {}) => {
    return (target) => {
        if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
            target.metadata = {};
        }
        const metadata = target.metadata;
        if (!metadata.events) {
            metadata.events = {};
        }
        const eventsMetadata = metadata.events;
        if (!eventsMetadata[name]) {
            eventsMetadata[name] = data;
        }
    };
};

const features = new Map();
const registerFeature = (name, feature) => {
    features.set(name, feature);
};
const getFeature = (name) => {
    return features.get(name);
};

var class2type$1 = {};
var hasOwn$1 = class2type$1.hasOwnProperty;
var toString$1 = class2type$1.toString;
var fnToString$1 = hasOwn$1.toString;
var ObjectFunctionString$1 = fnToString$1.call(Object);
var fnIsPlainObject$1 = function (obj) {
    var proto, Ctor;
    if (!obj || toString$1.call(obj) !== "[object Object]") {
        return false;
    }
    proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return true;
    }
    Ctor = hasOwn$1.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString$1.call(Ctor) === ObjectFunctionString$1;
};

var oToken$1 = Object.create(null);
var fnMerge$2 = function (arg1, arg2, arg3, arg4) {
    var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? undefined : oToken$1;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (name === '__proto__' || target === copy) {
                    continue;
                }
                if (deep && copy && (fnIsPlainObject$1(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && fnIsPlainObject$1(src) ? src : {};
                    }
                    target[name] = fnMerge$2(deep, arguments[1], clone, copy);
                }
                else if (copy !== skipToken) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

const fnMerge$1 = function (arg1, arg2) {
    return fnMerge$2(true, false, ...arguments);
};

const assetParameters = {"themes":{"default":"sap_fiori_3","all":["sap_fiori_3","sap_fiori_3_dark","sap_belize","sap_belize_hcb","sap_belize_hcw","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_horizon","sap_horizon_dark","sap_horizon_hcb","sap_horizon_hcw","sap_horizon_exp","sap_horizon_dark_exp","sap_horizon_hcb_exp","sap_horizon_hcw_exp"]},"languages":{"default":"en","all":["ar","bg","ca","cs","cy","da","de","el","en","en_GB","en_US_sappsd","en_US_saprigi","en_US_saptrc","es","es_MX","et","fi","fr","fr_CA","hi","hr","hu","in","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt_PT","pt","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh_CN","zh_TW"]},"locales":{"default":"en","all":["ar","ar_EG","ar_SA","bg","ca","cs","da","de","de_AT","de_CH","el","el_CY","en","en_AU","en_GB","en_HK","en_IE","en_IN","en_NZ","en_PG","en_SG","en_ZA","es","es_AR","es_BO","es_CL","es_CO","es_MX","es_PE","es_UY","es_VE","et","fa","fi","fr","fr_BE","fr_CA","fr_CH","fr_LU","he","hi","hr","hu","id","it","it_CH","ja","kk","ko","lt","lv","ms","nb","nl","nl_BE","pl","pt","pt_PT","ro","ru","ru_UA","sk","sl","sr","sr_Latn","sv","th","tr","uk","vi","zh_CN","zh_HK","zh_SG","zh_TW"]}};

const DEFAULT_THEME = assetParameters.themes.default;
const SUPPORTED_THEMES = assetParameters.themes.all;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;
const SUPPORTED_LOCALES = assetParameters.locales.all;

const getMetaTagValue = (metaTagName) => {
    const metaTag = document.querySelector(`META[name="${metaTagName}"]`), metaTagContent = metaTag && metaTag.getAttribute("content");
    return metaTagContent;
};
const validateThemeOrigin = (origin) => {
    const allowedOrigins = getMetaTagValue("sap-allowedThemeOrigins");
    return allowedOrigins && allowedOrigins.split(",").some(allowedOrigin => {
        return allowedOrigin === "*" || origin === allowedOrigin.trim();
    });
};
const buildCorrectUrl = (oldUrl, newOrigin) => {
    const oldUrlPath = new URL(oldUrl).pathname;
    return new URL(oldUrlPath, newOrigin).toString();
};
const validateThemeRoot = (themeRoot) => {
    let resultUrl;
    try {
        if (themeRoot.startsWith(".") || themeRoot.startsWith("/")) {
            // Handle relative url
            // new URL("/newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
            // new URL("./newExmPath", "http://example.com/exmPath") => http://example.com/exmPath/newExmPath
            // new URL("../newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
            resultUrl = new URL(themeRoot, window.location.href).toString();
        }
        else {
            const themeRootURL = new URL(themeRoot);
            const origin = themeRootURL.origin;
            if (origin && validateThemeOrigin(origin)) {
                // If origin is allowed, use it
                resultUrl = themeRootURL.toString();
            }
            else {
                // If origin is not allow and the URL is not relative, we have to replace the origin
                // with current location
                resultUrl = buildCorrectUrl(themeRootURL.toString(), window.location.href);
            }
        }
        if (!resultUrl.endsWith("/")) {
            resultUrl = `${resultUrl}/`;
        }
        return `${resultUrl}UI5/`;
    }
    catch (e) {
        // Catch if URL is not correct
    }
};

/**
 * Different types of AnimationMode.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.AnimationMode
 */
var AnimationMode;
(function (AnimationMode) {
    /**
     * @public
     * @type {Full}
     */
    AnimationMode["Full"] = "full";
    /**
     * @public
     * @type {Basic}
     */
    AnimationMode["Basic"] = "basic";
    /**
     * @public
     * @type {Minimal}
     */
    AnimationMode["Minimal"] = "minimal";
    /**
     * @public
     * @type {None}
     */
    AnimationMode["None"] = "none";
})(AnimationMode || (AnimationMode = {}));
var AnimationMode$1 = AnimationMode;

let initialized = false;
let initialConfig = {
    animationMode: AnimationMode$1.Full,
    theme: DEFAULT_THEME,
    themeRoot: undefined,
    rtl: undefined,
    language: undefined,
    timezone: undefined,
    calendarType: undefined,
    secondaryCalendarType: undefined,
    noConflict: false,
    formatSettings: {},
    fetchDefaultLanguage: false,
};
const getTheme$1 = () => {
    initConfiguration();
    return initialConfig.theme;
};
const getThemeRoot$1 = () => {
    initConfiguration();
    return initialConfig.themeRoot;
};
const getRTL$1 = () => {
    initConfiguration();
    return initialConfig.rtl;
};
const getLanguage$1 = () => {
    initConfiguration();
    return initialConfig.language;
};
/**
 * Returns if the default language, that is inlined at build time,
 * should be fetched over the network instead.
 * @returns {Boolean}
 */
const getFetchDefaultLanguage$1 = () => {
    initConfiguration();
    return initialConfig.fetchDefaultLanguage;
};
const getNoConflict$1 = () => {
    initConfiguration();
    return initialConfig.noConflict;
};
/**
 * Get the configured calendar type
 * @returns { String } the name of the configured calendar type
 */
const getCalendarType$1 = () => {
    initConfiguration();
    return initialConfig.calendarType;
};
const getSecondaryCalendarType$1 = () => {
    initConfiguration();
    return initialConfig.secondaryCalendarType;
};
/**
 * Returns the configured IANA timezone ID.
 * @returns { String } the configured IANA timezone ID, e.g. "America/New_York"
 */
const getTimezone$1 = () => {
    initConfiguration();
    return initialConfig.timezone;
};
const getFormatSettings = () => {
    initConfiguration();
    return initialConfig.formatSettings;
};
const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);
const parseConfigurationScript = () => {
    const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility
    let configJSON;
    if (configScript) {
        try {
            configJSON = JSON.parse(configScript.innerHTML);
        }
        catch (err) {
            console.warn("Incorrect data-sap-ui-config format. Please use JSON"); /* eslint-disable-line */
        }
        if (configJSON) {
            initialConfig = fnMerge$1(initialConfig, configJSON);
        }
    }
};
const parseURLParameters = () => {
    const params = new URLSearchParams(window.location.search);
    // Process "sap-*" params first
    params.forEach((value, key) => {
        const parts = key.split("sap-").length;
        if (parts === 0 || parts === key.split("sap-ui-").length) {
            return;
        }
        applyURLParam(key, value, "sap");
    });
    // Process "sap-ui-*" params
    params.forEach((value, key) => {
        if (!key.startsWith("sap-ui")) {
            return;
        }
        applyURLParam(key, value, "sap-ui");
    });
};
const normalizeThemeRootParamValue = (value) => {
    const themeRoot = value.split("@")[1];
    return validateThemeRoot(themeRoot);
};
const normalizeThemeParamValue = (param, value) => {
    if (param === "theme" && value.includes("@")) { // the theme parameter might have @<URL-TO-THEME> in the value - strip this
        return value.split("@")[0];
    }
    return value;
};
const applyURLParam = (key, value, paramType) => {
    const lowerCaseValue = value.toLowerCase();
    const param = key.split(`${paramType}-`)[1];
    if (booleanMapping.has(value)) {
        value = booleanMapping.get(lowerCaseValue);
    }
    if (param === "theme") {
        initialConfig.theme = normalizeThemeParamValue(param, value);
        if (value && value.includes("@")) {
            initialConfig.themeRoot = normalizeThemeRootParamValue(value);
        }
    }
    else {
        initialConfig[param] = value;
    }
};
const applyOpenUI5Configuration = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
        return;
    }
    const OpenUI5Config = openUI5Support.getConfigurationSettingsObject();
    initialConfig = fnMerge$1(initialConfig, OpenUI5Config);
};
const initConfiguration = () => {
    if (typeof document === "undefined" || initialized) {
        return;
    }
    // 1. Lowest priority - configuration script
    parseConfigurationScript();
    // 2. URL parameters overwrite configuration script parameters
    parseURLParameters();
    // 3. If OpenUI5 is detected, it has the highest priority
    applyOpenUI5Configuration();
    initialized = true;
};

class EventProvider {
    constructor() {
        this._eventRegistry = new Map();
    }
    attachEvent(eventName, fnFunction) {
        const eventRegistry = this._eventRegistry;
        const eventListeners = eventRegistry.get(eventName);
        if (!Array.isArray(eventListeners)) {
            eventRegistry.set(eventName, [fnFunction]);
            return;
        }
        if (!eventListeners.includes(fnFunction)) {
            eventListeners.push(fnFunction);
        }
    }
    detachEvent(eventName, fnFunction) {
        const eventRegistry = this._eventRegistry;
        const eventListeners = eventRegistry.get(eventName);
        if (!eventListeners) {
            return;
        }
        const indexOfFnToDetach = eventListeners.indexOf(fnFunction);
        if (indexOfFnToDetach !== -1) {
            eventListeners.splice(indexOfFnToDetach, 1);
        }
        if (eventListeners.length === 0) {
            eventRegistry.delete(eventName);
        }
    }
    /**
     * Fires an event and returns the results of all event listeners as an array.
     *
     * @param eventName the event to fire
     * @param data optional data to pass to each event listener
     * @returns {Array} an array with the results of all event listeners
     */
    fireEvent(eventName, data) {
        const eventRegistry = this._eventRegistry;
        const eventListeners = eventRegistry.get(eventName);
        if (!eventListeners) {
            return [];
        }
        return eventListeners.map(fn => {
            return fn.call(this, data);
        });
    }
    /**
     * Fires an event and returns a promise that will resolve once all listeners have resolved.
     *
     * @param eventName the event to fire
     * @param data optional data to pass to each event listener
     * @returns {Promise} a promise that will resolve when all listeners have resolved
     */
    fireEventAsync(eventName, data) {
        return Promise.all(this.fireEvent(eventName, data));
    }
    isHandlerAttached(eventName, fnFunction) {
        const eventRegistry = this._eventRegistry;
        const eventListeners = eventRegistry.get(eventName);
        if (!eventListeners) {
            return false;
        }
        return eventListeners.includes(fnFunction);
    }
    hasListeners(eventName) {
        return !!this._eventRegistry.get(eventName);
    }
}

const eventProvider$4 = new EventProvider();
const LANG_CHANGE = "languageChange";
const attachLanguageChange = (listener) => {
    eventProvider$4.attachEvent(LANG_CHANGE, listener);
};

const MAX_PROCESS_COUNT = 10;
class RenderQueue {
    constructor() {
        this.list = []; // Used to store the web components in order
        this.lookup = new Set(); // Used for faster search
    }
    add(webComponent) {
        if (this.lookup.has(webComponent)) {
            return;
        }
        this.list.push(webComponent);
        this.lookup.add(webComponent);
    }
    remove(webComponent) {
        if (!this.lookup.has(webComponent)) {
            return;
        }
        this.list = this.list.filter(item => item !== webComponent);
        this.lookup.delete(webComponent);
    }
    shift() {
        const webComponent = this.list.shift();
        if (webComponent) {
            this.lookup.delete(webComponent);
            return webComponent;
        }
    }
    isEmpty() {
        return this.list.length === 0;
    }
    isAdded(webComponent) {
        return this.lookup.has(webComponent);
    }
    /**
     * Processes the whole queue by executing the callback on each component,
     * while also imposing restrictions on how many times a component may be processed.
     *
     * @param callback - function with one argument (the web component to be processed)
     */
    process(callback) {
        let webComponent;
        const stats = new Map();
        webComponent = this.shift();
        while (webComponent) {
            const timesProcessed = stats.get(webComponent) || 0;
            if (timesProcessed > MAX_PROCESS_COUNT) {
                throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
            }
            callback(webComponent);
            stats.set(webComponent, timesProcessed + 1);
            webComponent = this.shift();
        }
    }
}

/**
 * Returns a singleton HTML element, inserted in given parent element of HTML page,
 * used mostly to store and share global resources between multiple UI5 Web Components runtimes.
 *
 * @param { string } tag the element tag/selector
 * @param { HTMLElement } parentElement the parent element to insert the singleton element instance
 * @param { Function } createEl a factory function for the element instantiation, by default document.createElement is used
 * @returns { Element }
 */
const getSingletonElementInstance = (tag, parentElement = document.body, createEl) => {
    let el = document.querySelector(tag);
    if (el) {
        return el;
    }
    el = createEl ? createEl() : document.createElement(tag);
    return parentElement.insertBefore(el, parentElement.firstChild);
};

const getMetaDomEl = () => {
    const el = document.createElement("meta");
    el.setAttribute("name", "ui5-shared-resources");
    el.setAttribute("content", ""); // attribute "content" should be present when "name" is set.
    return el;
};
const getSharedResourcesInstance = () => {
    if (typeof document === "undefined") {
        return null;
    }
    return getSingletonElementInstance(`meta[name="ui5-shared-resources"]`, document.head, getMetaDomEl);
};
/**
 * Use this method to initialize/get resources that you would like to be shared among UI5 Web Components runtime instances.
 * The data will be accessed via a singleton "ui5-shared-resources" HTML element in the "body" element of the page.
 *
 * @public
 * @param namespace Unique ID of the resource, may contain "." to denote hierarchy
 * @param initialValue Object or primitive that will be used as an initial value if the resource does not exist
 * @returns {*}
 */
const getSharedResource = (namespace, initialValue) => {
    const parts = namespace.split(".");
    let current = getSharedResourcesInstance();
    if (!current) {
        return initialValue;
    }
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const lastPart = i === parts.length - 1;
        if (!Object.prototype.hasOwnProperty.call(current, part)) {
            current[part] = lastPart ? initialValue : {};
        }
        current = current[part];
    }
    return current;
};

const VersionInfo = {
	version: "1.18.0",
	major: 1,
	minor: 18,
	patch: 0,
	suffix: "",
	isNext: false,
	buildTime: 1696231634,
};

let currentRuntimeIndex;
let currentRuntimeAlias = "";
const compareCache = new Map();
/**
 * Central registry where all runtimes register themselves by pushing an object.
 * The index in the registry servers as an ID for the runtime.
 * @type {*}
 */
const Runtimes = getSharedResource("Runtimes", []);
/**
 * Registers the current runtime in the shared runtimes resource registry
 */
const registerCurrentRuntime = () => {
    if (currentRuntimeIndex === undefined) {
        currentRuntimeIndex = Runtimes.length;
        const versionInfo = VersionInfo;
        Runtimes.push({
            ...versionInfo,
            alias: currentRuntimeAlias,
            description: `Runtime ${currentRuntimeIndex} - ver ${versionInfo.version}${""}`,
        });
    }
};
/**
 * Returns the index of the current runtime's object in the shared runtimes resource registry
 * @returns {*}
 */
const getCurrentRuntimeIndex = () => {
    return currentRuntimeIndex;
};
/**
 * Compares two runtimes and returns 1 if the first is of a bigger version, -1 if the second is of a bigger version, and 0 if equal
 * @param index1 The index of the first runtime to compare
 * @param index2 The index of the second runtime to compare
 * @returns {number}
 */
const compareRuntimes = (index1, index2) => {
    const cacheIndex = `${index1},${index2}`;
    if (compareCache.has(cacheIndex)) {
        return compareCache.get(cacheIndex);
    }
    const runtime1 = Runtimes[index1];
    const runtime2 = Runtimes[index2];
    if (!runtime1 || !runtime2) {
        throw new Error("Invalid runtime index supplied");
    }
    // If any of the two is a next version, bigger buildTime wins
    if (runtime1.isNext || runtime2.isNext) {
        return runtime1.buildTime - runtime2.buildTime;
    }
    // If major versions differ, bigger one wins
    const majorDiff = runtime1.major - runtime2.major;
    if (majorDiff) {
        return majorDiff;
    }
    // If minor versions differ, bigger one wins
    const minorDiff = runtime1.minor - runtime2.minor;
    if (minorDiff) {
        return minorDiff;
    }
    // If patch versions differ, bigger one wins
    const patchDiff = runtime1.patch - runtime2.patch;
    if (patchDiff) {
        return patchDiff;
    }
    // Bigger suffix wins, f.e. rc10 > rc9
    // Important: suffix is alphanumeric, must use natural compare
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    const result = collator.compare(runtime1.suffix, runtime2.suffix);
    compareCache.set(cacheIndex, result);
    return result;
};
const getAllRuntimes = () => {
    return Runtimes;
};

const Tags = getSharedResource("Tags", new Map());
const Definitions = new Set();
let Failures = new Map();
let failureTimeout;
const UNKNOWN_RUNTIME = -1;
const registerTag = (tag) => {
    Definitions.add(tag);
    Tags.set(tag, getCurrentRuntimeIndex());
};
const isTagRegistered = (tag) => {
    return Definitions.has(tag);
};
const getAllRegisteredTags = () => {
    return [...Definitions.values()];
};
const recordTagRegistrationFailure = (tag) => {
    let tagRegRuntimeIndex = Tags.get(tag);
    if (tagRegRuntimeIndex === undefined) {
        tagRegRuntimeIndex = UNKNOWN_RUNTIME; // If the tag is taken, but not registered in Tags, then a version before 1.1.0 defined it => use the "unknown" key
    }
    if (!Failures.has(tagRegRuntimeIndex)) {
        Failures.set(tagRegRuntimeIndex, new Set());
    }
    Failures.get(tagRegRuntimeIndex).add(tag);
    if (!failureTimeout) {
        failureTimeout = setTimeout(() => {
            displayFailedRegistrations();
            Failures = new Map();
            failureTimeout = undefined;
        }, 1000);
    }
};
const displayFailedRegistrations = () => {
    const allRuntimes = getAllRuntimes();
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    const currentRuntime = allRuntimes[currentRuntimeIndex];
    let message = `Multiple UI5 Web Components instances detected.`;
    if (allRuntimes.length > 1) {
        message = `${message}\nLoading order (versions before 1.1.0 not listed): ${allRuntimes.map(runtime => `\n${runtime.description}`).join("")}`;
    }
    [...Failures.keys()].forEach(otherRuntimeIndex => {
        let comparison;
        let otherRuntime;
        if (otherRuntimeIndex === UNKNOWN_RUNTIME) { // version < 1.1.0 defined the tag
            comparison = 1; // the current runtime is considered newer
            otherRuntime = {
                description: `Older unknown runtime`,
            };
        }
        else {
            comparison = compareRuntimes(currentRuntimeIndex, otherRuntimeIndex);
            otherRuntime = allRuntimes[otherRuntimeIndex];
        }
        let compareWord;
        if (comparison > 0) {
            compareWord = "an older";
        }
        else if (comparison < 0) {
            compareWord = "a newer";
        }
        else {
            compareWord = "the same";
        }
        message = `${message}\n\n"${currentRuntime.description}" failed to define ${Failures.get(otherRuntimeIndex).size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntime.description}": ${([...Failures.get(otherRuntimeIndex)]).sort().join(", ")}.`;
        if (comparison > 0) {
            message = `${message}\nWARNING! If your code uses features of the above web components, unavailable in ${otherRuntime.description}, it might not work as expected!`;
        }
        else {
            message = `${message}\nSince the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
        }
    });
    message = `${message}\n\nTo prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/03-scoping.md.`;
    console.warn(message); // eslint-disable-line
};

const rtlAwareSet = new Set();
const markAsRtlAware = (klass) => {
    rtlAwareSet.add(klass);
};
const isRtlAware = (klass) => {
    return rtlAwareSet.has(klass);
};

const registeredElements$1 = new Set();
const eventProvider$3 = new EventProvider();
const invalidatedWebComponents = new RenderQueue(); // Queue for invalidated web components
let renderTaskPromise, renderTaskPromiseResolve;
let mutationObserverTimer;
let queuePromise;
/**
 * Schedules a render task (if not already scheduled) to render the component
 *
 * @param webComponent
 * @returns {Promise}
 */
const renderDeferred = async (webComponent) => {
    // Enqueue the web component
    invalidatedWebComponents.add(webComponent);
    // Schedule a rendering task
    await scheduleRenderTask();
};
/**
 * Renders a component synchronously and adds it to the registry of rendered components
 *
 * @param webComponent
 */
const renderImmediately = (webComponent) => {
    eventProvider$3.fireEvent("beforeComponentRender", webComponent);
    registeredElements$1.add(webComponent);
    webComponent._render();
};
/**
 * Cancels the rendering of a component, if awaiting to be rendered, and removes it from the registry of rendered components
 *
 * @param webComponent
 */
const cancelRender = (webComponent) => {
    invalidatedWebComponents.remove(webComponent);
    registeredElements$1.delete(webComponent);
};
/**
 * Schedules a rendering task, if not scheduled already
 */
const scheduleRenderTask = async () => {
    if (!queuePromise) {
        queuePromise = new Promise(resolve => {
            window.requestAnimationFrame(() => {
                // Render all components in the queue
                // console.log(`--------------------RENDER TASK START------------------------------`); // eslint-disable-line
                invalidatedWebComponents.process(renderImmediately);
                // console.log(`--------------------RENDER TASK END------------------------------`); // eslint-disable-line
                // Resolve the promise so that callers of renderDeferred can continue
                queuePromise = null;
                resolve();
                // Wait for Mutation observer before the render task is considered finished
                if (!mutationObserverTimer) {
                    mutationObserverTimer = setTimeout(() => {
                        mutationObserverTimer = undefined;
                        if (invalidatedWebComponents.isEmpty()) {
                            _resolveTaskPromise();
                        }
                    }, 200);
                }
            });
        });
    }
    await queuePromise;
};
/**
 * return a promise that will be resolved once all invalidated web components are rendered
 */
const whenDOMUpdated = () => {
    if (renderTaskPromise) {
        return renderTaskPromise;
    }
    renderTaskPromise = new Promise(resolve => {
        renderTaskPromiseResolve = resolve;
        window.requestAnimationFrame(() => {
            if (invalidatedWebComponents.isEmpty()) {
                renderTaskPromise = undefined;
                resolve();
            }
        });
    });
    return renderTaskPromise;
};
const whenAllCustomElementsAreDefined = () => {
    const definedPromises = getAllRegisteredTags().map(tag => customElements.whenDefined(tag));
    return Promise.all(definedPromises);
};
const renderFinished = async () => {
    await whenAllCustomElementsAreDefined();
    await whenDOMUpdated();
};
const _resolveTaskPromise = () => {
    if (!invalidatedWebComponents.isEmpty()) {
        // More updates are pending. Resolve will be called again
        return;
    }
    if (renderTaskPromiseResolve) {
        renderTaskPromiseResolve();
        renderTaskPromiseResolve = undefined;
        renderTaskPromise = undefined;
    }
};
/**
 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
 *
 * Usage:
 * reRenderAllUI5Elements() -> re-renders all components
 * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
 * reRenderAllUI5Elements({themeAware: true}) -> re-renders only themeAware components
 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
 * etc...
 *
 * @public
 * @param {object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
 * @returns {Promise<void>}
 */
const reRenderAllUI5Elements = async (filters) => {
    registeredElements$1.forEach((element) => {
        const ctor = element.constructor;
        const tag = ctor.getMetadata().getTag();
        const rtlAware = isRtlAware(ctor);
        const languageAware = ctor.getMetadata().isLanguageAware();
        const themeAware = ctor.getMetadata().isThemeAware();
        if (!filters || (filters.tag === tag) || (filters.rtlAware && rtlAware) || (filters.languageAware && languageAware) || (filters.themeAware && themeAware)) {
            renderDeferred(element);
        }
    });
    await renderFinished();
};

let curLanguage;
let fetchDefaultLanguage;
/**
 * Returns the currently configured language, or the browser language as a fallback.
 * @public
 * @returns {string}
 */
const getLanguage = () => {
    if (curLanguage === undefined) {
        curLanguage = getLanguage$1();
    }
    return curLanguage;
};
/**
 * Defines if the default language, that is inlined, should be
 * fetched over the network instead of using the inlined one.
 * <b>Note:</b> By default the language will not be fetched.
 *
 * @public
 * @param {boolean} fetchDefaultLang
 */
const setFetchDefaultLanguage = (fetchDefaultLang) => {
    fetchDefaultLanguage = fetchDefaultLang;
};
/**
 * Returns if the default language, that is inlined, should be fetched over the network.
 * @public
 * @returns {boolean}
 */
const getFetchDefaultLanguage = () => {
    if (fetchDefaultLanguage === undefined) {
        setFetchDefaultLanguage(getFetchDefaultLanguage$1());
    }
    return fetchDefaultLanguage;
};

/**
 * Different calendar types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.CalendarType
 */
var CalendarType$1;
(function (CalendarType) {
    /**
     * @public
     * @type {Gregorian}
     */
    CalendarType["Gregorian"] = "Gregorian";
    /**
     * @public
     * @type {Islamic}
     */
    CalendarType["Islamic"] = "Islamic";
    /**
     * @public
     * @type {Japanese}
     */
    CalendarType["Japanese"] = "Japanese";
    /**
     * @public
     * @type {Buddhist}
     */
    CalendarType["Buddhist"] = "Buddhist";
    /**
     * @public
     * @type {Persian}
     */
    CalendarType["Persian"] = "Persian";
})(CalendarType$1 || (CalendarType$1 = {}));
var CalendarType$2 = CalendarType$1;

let calendarType;
let secondaryCalendarType;
/**
 * Returns the configured or default calendar type.
 * @public
 * @returns { CalendarType } the effective calendar type
 */
const getCalendarType = () => {
    if (calendarType === undefined) {
        calendarType = getCalendarType$1();
    }
    if (calendarType && calendarType in CalendarType$2) {
        return calendarType;
    }
    return CalendarType$2.Gregorian;
};
/**
 * Returns the configured secondary calendar type.
 * @public
 * @returns { CalendarType | undefined } the effective calendar type
 * @since 1.18.0
 */
const getSecondaryCalendarType = () => {
    if (secondaryCalendarType === undefined) {
        secondaryCalendarType = getSecondaryCalendarType$1();
    }
    if (secondaryCalendarType && secondaryCalendarType in CalendarType$2) {
        return secondaryCalendarType;
    }
    return secondaryCalendarType;
};

let currTimezone;
/**
 * Returns the configured IANA timezone ID.
 *
 * @private
 * @returns {string}
 */
const getTimezone = () => {
    if (currTimezone === undefined) {
        currTimezone = getTimezone$1();
    }
    return currTimezone;
};

var getDesigntimePropertyAsArray$1 = (value) => {
    const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
    return m && m[2] ? m[2].split(/,/) : null;
};

var TimezoneUtils = {};
var sLocalTimezone = "";
var aSupportedTimezoneIDs;
var oIntlDateTimeFormatCache = {
  _oCache: new Map(),
  _iCacheLimit: 10,
  get: function (sTimezone) {
    var cacheEntry = this._oCache.get(sTimezone);
    if (cacheEntry) {
      return cacheEntry;
    }
    var oOptions = {
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: sTimezone,
      timeZoneName: "short",
      era: "narrow",
      weekday: "short"
    };
    var oInstance = new Intl.DateTimeFormat("en-US", oOptions);
    if (this._oCache.size === this._iCacheLimit) {
      this._oCache = new Map();
    }
    this._oCache.set(sTimezone, oInstance);
    return oInstance;
  }
};
TimezoneUtils.isValidTimezone = function (sTimezone) {
  if (!sTimezone) {
    return false;
  }
  if (Intl.supportedValuesOf) {
    try {
      aSupportedTimezoneIDs = aSupportedTimezoneIDs || Intl.supportedValuesOf("timeZone");
      if (aSupportedTimezoneIDs.includes(sTimezone)) {
        return true;
      }
    } catch (oError) {
      aSupportedTimezoneIDs = [];
    }
  }
  try {
    oIntlDateTimeFormatCache.get(sTimezone);
    return true;
  } catch (oError) {
    return false;
  }
};
TimezoneUtils.convertToTimezone = function (oDate, sTargetTimezone) {
  var oFormatParts = this._getParts(oDate, sTargetTimezone);
  return TimezoneUtils._getDateFromParts(oFormatParts);
};
TimezoneUtils._getParts = function (oDate, sTargetTimezone) {
  var sKey, oPart, oDateParts = Object.create(null), oIntlDate = oIntlDateTimeFormatCache.get(sTargetTimezone), oParts = oIntlDate.formatToParts(new Date(oDate.getTime()));
  for (sKey in oParts) {
    oPart = oParts[sKey];
    if (oPart.type !== "literal") {
      oDateParts[oPart.type] = oPart.value;
    }
  }
  return oDateParts;
};
TimezoneUtils._getDateFromParts = function (oParts) {
  var oDate = new Date(0), iUTCYear = parseInt(oParts.year);
  if (oParts.era === "B") {
    iUTCYear = iUTCYear * -1 + 1;
  }
  oDate.setUTCFullYear(iUTCYear, parseInt(oParts.month) - 1, parseInt(oParts.day));
  oDate.setUTCHours(parseInt(oParts.hour), parseInt(oParts.minute), parseInt(oParts.second), parseInt(oParts.fractionalSecond || 0));
  return oDate;
};
TimezoneUtils.calculateOffset = function (oDate, sTimezoneSource) {
  var oFirstGuess = this.convertToTimezone(oDate, sTimezoneSource), iInitialOffset = oDate.getTime() - oFirstGuess.getTime(), oDateSource = new Date(oDate.getTime() + iInitialOffset), oDateTarget = this.convertToTimezone(oDateSource, sTimezoneSource);
  return (oDateSource.getTime() - oDateTarget.getTime()) / 1000;
};
TimezoneUtils.getLocalTimezone = function () {
  if (sLocalTimezone) {
    return sLocalTimezone;
  }
  sLocalTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
  return sLocalTimezone;
};

var detectNavigatorLanguage = () => {
    const browserLanguages = navigator.languages;
    const navigatorLanguage = () => {
        return navigator.language;
    };
    const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage();
    return rawLocale || DEFAULT_LANGUAGE;
};

const rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
let Locale$1 = class Locale {
    constructor(sLocaleId) {
        const aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));
        if (aResult === null) {
            throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
        }
        this.sLocaleId = sLocaleId;
        this.sLanguage = aResult[1] || DEFAULT_LANGUAGE;
        this.sScript = aResult[2] || "";
        this.sRegion = aResult[3] || "";
        this.sVariant = (aResult[4] && aResult[4].slice(1)) || null;
        this.sExtension = (aResult[5] && aResult[5].slice(1)) || null;
        this.sPrivateUse = aResult[6] || null;
        if (this.sLanguage) {
            this.sLanguage = this.sLanguage.toLowerCase();
        }
        if (this.sScript) {
            this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, s => {
                return s.toUpperCase();
            });
        }
        if (this.sRegion) {
            this.sRegion = this.sRegion.toUpperCase();
        }
    }
    getLanguage() {
        return this.sLanguage;
    }
    getScript() {
        return this.sScript;
    }
    getRegion() {
        return this.sRegion;
    }
    getVariant() {
        return this.sVariant;
    }
    getVariantSubtags() {
        return this.sVariant ? this.sVariant.split("-") : [];
    }
    getExtension() {
        return this.sExtension;
    }
    getExtensionSubtags() {
        return this.sExtension ? this.sExtension.slice(2).split("-") : [];
    }
    getPrivateUse() {
        return this.sPrivateUse;
    }
    getPrivateUseSubtags() {
        return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
    }
    hasPrivateUseSubtag(sSubtag) {
        return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
    }
    toString() {
        const r = [this.sLanguage];
        if (this.sScript) {
            r.push(this.sScript);
        }
        if (this.sRegion) {
            r.push(this.sRegion);
        }
        if (this.sVariant) {
            r.push(this.sVariant);
        }
        if (this.sExtension) {
            r.push(this.sExtension);
        }
        if (this.sPrivateUse) {
            r.push(this.sPrivateUse);
        }
        return r.join("-");
    }
};

const cache$2 = new Map();
const getLocaleInstance = (lang) => {
    if (!cache$2.has(lang)) {
        cache$2.set(lang, new Locale$1(lang));
    }
    return cache$2.get(lang);
};
const convertToLocaleOrNull = (lang) => {
    try {
        if (lang && typeof lang === "string") {
            return getLocaleInstance(lang);
        }
    }
    catch (e) {
        // ignore
    }
    return new Locale$1(DEFAULT_LOCALE);
};
/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = (lang) => {
    if (lang) {
        return convertToLocaleOrNull(lang);
    }
    const configLanguage = getLanguage();
    if (configLanguage) {
        return getLocaleInstance(configLanguage);
    }
    return convertToLocaleOrNull(detectNavigatorLanguage());
};

let formatSettings$1;
class LegacyDateFormats {
    /**
     * Returns the currently set customizing data for Islamic calendar support
     *
     * @return {object[]} Returns an array that contains the customizing data.
     * @public
     */
    static getLegacyDateCalendarCustomizing() {
        if (formatSettings$1 === undefined) {
            formatSettings$1 = getFormatSettings();
        }
        return formatSettings$1.legacyDateCalendarCustomizing || [];
    }
}
registerFeature("LegacyDateFormats", LegacyDateFormats);

let formatSettings;
/**
 * Returns the first day of the week from the configured format settings or based on the current locale.
 * @public
 * @returns {Number} 0 (Sunday) through 6 (Saturday)
 */
const getFirstDayOfWeek = () => {
    if (formatSettings === undefined) {
        formatSettings = getFormatSettings();
    }
    return formatSettings.firstDayOfWeek;
};
const legacyDateFormats = getFeature("LegacyDateFormats");
const getLegacyDateCalendarCustomizing = legacyDateFormats ? LegacyDateFormats.getLegacyDateCalendarCustomizing : () => { return []; };

const emptyFn$2 = () => { };
/**
 * OpenUI5 FormatSettings shim
 */
const FormatSettings = {
    getFormatLocale: getLocale,
    getLegacyDateFormat: emptyFn$2,
    getCustomLocaleData: emptyFn$2,
    getLegacyDateCalendarCustomizing,
};

const emptyFn$1 = () => { };
/**
 * OpenUI5 Configuration Shim
 */
const Configuration = {
    getLanguage,
    getCalendarType,
    getSupportedLanguages: () => getDesigntimePropertyAsArray$1("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$"),
    getOriginInfo: emptyFn$1,
    getFormatSettings: () => FormatSettings,
    getTimezone: () => getTimezone() || TimezoneUtils.getLocalTimezone(),
};

var aAllParts = [
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'fractionalSecond'
    ], rIsUTCString = /Z|GMT|:.*[\+|\-]|^([\+|\-]\d{2})?\d{4}(-\d{2}){0,2}$/, aWeekday = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ], aMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ], mWeekdayToDay = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6
    };
function addLeadingZeros(iValue, iLength) {
    return (iValue < 0 ? '-' : '') + Math.abs(iValue).toString().padStart(iLength, '0');
}
function UI5Date$1(vDateParts, sTimezoneID) {
    var oDateInstance = UI5Date$1._createDateInstance(vDateParts);
    Object.defineProperties(this, {
        sTimezoneID: { value: sTimezoneID },
        oDate: {
            value: oDateInstance,
            writable: true
        },
        oDateParts: {
            value: undefined,
            writable: true
        }
    });
    if (isNaN(oDateInstance)) {
        return;
    }
    if (vDateParts.length > 1 || vDateParts.length === 1 && typeof vDateParts[0] === 'string' && !rIsUTCString.test(vDateParts[0])) {
        this._setParts(aAllParts, [
            oDateInstance.getFullYear(),
            oDateInstance.getMonth(),
            oDateInstance.getDate(),
            oDateInstance.getHours(),
            oDateInstance.getMinutes(),
            oDateInstance.getSeconds(),
            oDateInstance.getMilliseconds()
        ]);
    }
}
UI5Date$1.prototype = Object.create(Date.prototype, { constructor: { value: Date } });
UI5Date$1.prototype[Symbol.toStringTag] = 'Date';
UI5Date$1.prototype._getPart = function (sPart) {
    var iResult;
    if (isNaN(this.oDate)) {
        return NaN;
    }
    this.oDateParts = this.oDateParts || TimezoneUtils._getParts(this.oDate, this.sTimezoneID);
    if (sPart === 'weekday') {
        return mWeekdayToDay[this.oDateParts.weekday];
    }
    iResult = parseInt(this.oDateParts[sPart]);
    if (sPart === 'month') {
        iResult -= 1;
    } else if (sPart === 'year') {
        if (this.oDateParts.era === 'B') {
            iResult = 1 - iResult;
        }
    }
    return iResult;
};
UI5Date$1.prototype._setParts = function (aParts, aValues) {
    var i, oCurrentDateParts, oNewDateAsUTCTimestamp, iNewTimestamp, sPart, vValue, oDateParts = {}, iMaxLength = Math.min(aParts.length, aValues.length);
    if (iMaxLength === 0) {
        return this.setTime(NaN);
    }
    for (i = 0; i < iMaxLength; i += 1) {
        vValue = parseInt(+aValues[i]);
        sPart = aParts[i];
        if (isNaN(vValue)) {
            return this.setTime(NaN);
        }
        if (sPart === 'month') {
            vValue += 1;
        } else if (sPart === 'year') {
            if (vValue <= 0) {
                vValue = 1 - vValue;
                oDateParts.era = 'B';
            } else {
                oDateParts.era = 'A';
            }
        }
        oDateParts[sPart] = vValue.toString();
    }
    if (this.oDateParts) {
        oCurrentDateParts = this.oDateParts;
    } else if (isNaN(this.oDate)) {
        oCurrentDateParts = {
            day: '1',
            fractionalSecond: '0',
            hour: '0',
            minute: '0',
            month: '1',
            second: '0'
        };
    } else {
        oCurrentDateParts = TimezoneUtils._getParts(this.oDate, this.sTimezoneID);
    }
    oDateParts = Object.assign({}, oCurrentDateParts, oDateParts);
    oNewDateAsUTCTimestamp = TimezoneUtils._getDateFromParts(oDateParts);
    if (isNaN(oNewDateAsUTCTimestamp)) {
        return this.setTime(NaN);
    }
    iNewTimestamp = oNewDateAsUTCTimestamp.getTime() + TimezoneUtils.calculateOffset(oNewDateAsUTCTimestamp, this.sTimezoneID) * 1000;
    return this.setTime(iNewTimestamp);
};
UI5Date$1.prototype.clone = function () {
    return UI5Date$1.getInstance(this);
};
UI5Date$1.prototype.getDate = function () {
    return this._getPart('day');
};
UI5Date$1.prototype.getDay = function () {
    return this._getPart('weekday');
};
UI5Date$1.prototype.getFullYear = function () {
    return this._getPart('year');
};
UI5Date$1.prototype.getHours = function () {
    return this._getPart('hour');
};
UI5Date$1.prototype.getMilliseconds = function () {
    return this._getPart('fractionalSecond');
};
UI5Date$1.prototype.getMinutes = function () {
    return this._getPart('minute');
};
UI5Date$1.prototype.getMonth = function () {
    return this._getPart('month');
};
UI5Date$1.prototype.getSeconds = function () {
    return this._getPart('second');
};
UI5Date$1.prototype.getTimezoneOffset = function () {
    return TimezoneUtils.calculateOffset(this.oDate, this.sTimezoneID) / 60;
};
UI5Date$1.prototype.getYear = function () {
    return this._getPart('year') - 1900;
};
UI5Date$1.prototype.setDate = function (iDay) {
    return this._setParts(['day'], arguments);
};
UI5Date$1.prototype.setFullYear = function (iYear, iMonth, iDay) {
    return this._setParts([
        'year',
        'month',
        'day'
    ], arguments);
};
UI5Date$1.prototype.setHours = function (iHours, iMinutes, iSeconds, iMilliseconds) {
    return this._setParts([
        'hour',
        'minute',
        'second',
        'fractionalSecond'
    ], arguments);
};
UI5Date$1.prototype.setMilliseconds = function (iMilliseconds) {
    return this._setParts(['fractionalSecond'], arguments);
};
UI5Date$1.prototype.setMinutes = function (iMinutes, iSeconds, iMilliseconds) {
    return this._setParts([
        'minute',
        'second',
        'fractionalSecond'
    ], arguments);
};
UI5Date$1.prototype.setMonth = function (iMonth, iDay) {
    return this._setParts([
        'month',
        'day'
    ], arguments);
};
UI5Date$1.prototype.setSeconds = function (iSeconds, iMilliseconds) {
    return this._setParts([
        'second',
        'fractionalSecond'
    ], arguments);
};
UI5Date$1.prototype.setTime = function (iTime) {
    this.oDateParts = undefined;
    return this.oDate.setTime(iTime);
};
UI5Date$1.prototype.setYear = function (iYear) {
    return this._setParts(['year'], [parseInt(iYear) + 1900]);
};
UI5Date$1.prototype.toDateString = function () {
    if (isNaN(this.oDate)) {
        return this.oDate.toDateString();
    }
    return aWeekday[this.getDay()] + ' ' + aMonths[this.getMonth()] + ' ' + addLeadingZeros(this.getDate(), 2) + ' ' + addLeadingZeros(this.getFullYear(), 4);
};
UI5Date$1.prototype.toString = function () {
    if (isNaN(this.oDate)) {
        return this.oDate.toString();
    }
    return this.toDateString() + ' ' + this.toTimeString();
};
UI5Date$1.prototype.toTimeString = function () {
    var iHours, iMinutes, sSign, iTimeZoneOffset;
    if (isNaN(this.oDate)) {
        return this.oDate.toTimeString();
    }
    iTimeZoneOffset = this.getTimezoneOffset();
    sSign = iTimeZoneOffset > 0 ? '-' : '+';
    iHours = Math.floor(Math.abs(iTimeZoneOffset) / 60);
    iMinutes = Math.abs(iTimeZoneOffset) % 60;
    return addLeadingZeros(this.getHours(), 2) + ':' + addLeadingZeros(this.getMinutes(), 2) + ':' + addLeadingZeros(this.getSeconds(), 2) + ' GMT' + sSign + addLeadingZeros(iHours, 2) + addLeadingZeros(iMinutes, 2);
};
[
    'getTime',
    'getUTCDate',
    'getUTCDay',
    'getUTCFullYear',
    'getUTCHours',
    'getUTCMilliseconds',
    'getUTCMinutes',
    'getUTCMonth',
    'getUTCSeconds',
    'toGMTString',
    'toISOString',
    'toJSON',
    'toUTCString',
    'valueOf'
].forEach(function (sMethod) {
    UI5Date$1.prototype[sMethod] = function () {
        return this.oDate[sMethod].apply(this.oDate, arguments);
    };
});
[
    'toLocaleDateString',
    'toLocaleString',
    'toLocaleTimeString'
].forEach(function (sMethod) {
    UI5Date$1.prototype[sMethod] = function (sLocale, oOptions) {
        return this.oDate[sMethod](sLocale || Configuration.getLanguageTag(), Object.assign({ timeZone: this.sTimezoneID }, oOptions));
    };
});
[
    'setUTCDate',
    'setUTCFullYear',
    'setUTCHours',
    'setUTCMilliseconds',
    'setUTCMinutes',
    'setUTCMonth',
    'setUTCSeconds'
].forEach(function (sMethod) {
    UI5Date$1.prototype[sMethod] = function () {
        this.oDateParts = undefined;
        return this.oDate[sMethod].apply(this.oDate, arguments);
    };
});
UI5Date$1._createDateInstance = function (vParts) {
    if (vParts[0] instanceof Date) {
        vParts[0] = vParts[0].valueOf();
    }
    return new (Function.prototype.bind.apply(Date, [].concat.apply([null], vParts)))();
};
UI5Date$1.getInstance = function () {
    var sTimezone = Configuration.getTimezone();
    if (sTimezone !== TimezoneUtils.getLocalTimezone()) {
        return new UI5Date$1(arguments, sTimezone);
    }
    return UI5Date$1._createDateInstance(arguments);
};
UI5Date$1.checkDate = function (oDate) {
    if (isNaN(oDate.getTime())) {
        throw new Error('The given Date is not valid');
    }
    if (!(oDate instanceof UI5Date$1) && Configuration.getTimezone() !== TimezoneUtils.getLocalTimezone()) {
        throw new Error('Configured time zone requires the parameter \'oDate\' to be an instance of' + ' sap.ui.core.date.UI5Date');
    }
};

// @ts-ignore
const UI5DateWrapped = UI5Date$1;
class UI5Date extends UI5DateWrapped {
}

var ObjectPath = {};
var defaultRootContext = window;
function getObjectPathArray(vObjectPath) {
  return Array.isArray(vObjectPath) ? vObjectPath.slice() : vObjectPath.split(".");
}
ObjectPath.create = function (vObjectPath, oRootContext) {
  var oObject = oRootContext || defaultRootContext;
  var aNames = getObjectPathArray(vObjectPath);
  for (var i = 0; i < aNames.length; i++) {
    var sName = aNames[i];
    if (oObject[sName] === null || oObject[sName] !== undefined && (typeof oObject[sName] !== "object" && typeof oObject[sName] !== "function")) {
      throw new Error("Could not set object-path for '" + aNames.join(".") + "', path segment '" + sName + "' already exists.");
    }
    oObject[sName] = oObject[sName] || ({});
    oObject = oObject[sName];
  }
  return oObject;
};
ObjectPath.get = function (vObjectPath, oRootContext) {
  var oObject = oRootContext || defaultRootContext;
  var aNames = getObjectPathArray(vObjectPath);
  var sPropertyName = aNames.pop();
  for (var i = 0; i < aNames.length && oObject; i++) {
    oObject = oObject[aNames[i]];
  }
  return oObject ? oObject[sPropertyName] : undefined;
};
ObjectPath.set = function (vObjectPath, vValue, oRootContext) {
  oRootContext = oRootContext || defaultRootContext;
  var aNames = getObjectPathArray(vObjectPath);
  var sPropertyName = aNames.pop();
  var oObject = ObjectPath.create(aNames, oRootContext);
  oObject[sPropertyName] = vValue;
};

var fnAssert = function (bResult, vMessage) {
  if (!bResult) {
    var sMessage = typeof vMessage === "function" ? vMessage() : vMessage;
    console.assert(bResult, sMessage);
  }
};

var fnNow = !(typeof window != "undefined" && window.performance && performance.now && performance.timing) ? Date.now : (function () {
  var iNavigationStart = performance.timing.navigationStart;
  return function perfnow() {
    return iNavigationStart + performance.now();
  };
})();

var Log = {};
Log.Level = {
    NONE: -1,
    FATAL: 0,
    ERROR: 1,
    WARNING: 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5,
    ALL: 5 + 1
};
var aLog = [], mMaxLevel = { '': Log.Level.ERROR }, iLogEntriesLimit = 3000, oListener = null, bLogSupportInfo = false;
function pad0(i, w) {
    return ('000' + String(i)).slice(-w);
}
function level(sComponent) {
    return !sComponent || isNaN(mMaxLevel[sComponent]) ? mMaxLevel[''] : mMaxLevel[sComponent];
}
function discardLogEntries() {
    var iLogLength = aLog.length;
    if (iLogLength) {
        var iEntriesToKeep = Math.min(iLogLength, Math.floor(iLogEntriesLimit * 0.7));
        if (oListener) {
            oListener.onDiscardLogEntries(aLog.slice(0, iLogLength - iEntriesToKeep));
        }
        if (iEntriesToKeep) {
            aLog = aLog.slice(-iEntriesToKeep, iLogLength);
        } else {
            aLog = [];
        }
    }
}
function getLogEntryListenerInstance() {
    if (!oListener) {
        oListener = {
            listeners: [],
            onLogEntry: function (oLogEntry) {
                for (var i = 0; i < oListener.listeners.length; i++) {
                    if (oListener.listeners[i].onLogEntry) {
                        oListener.listeners[i].onLogEntry(oLogEntry);
                    }
                }
            },
            onDiscardLogEntries: function (aDiscardedLogEntries) {
                for (var i = 0; i < oListener.listeners.length; i++) {
                    if (oListener.listeners[i].onDiscardLogEntries) {
                        oListener.listeners[i].onDiscardLogEntries(aDiscardedLogEntries);
                    }
                }
            },
            attach: function (oLog, oLstnr) {
                if (oLstnr) {
                    oListener.listeners.push(oLstnr);
                    if (oLstnr.onAttachToLog) {
                        oLstnr.onAttachToLog(oLog);
                    }
                }
            },
            detach: function (oLog, oLstnr) {
                for (var i = 0; i < oListener.listeners.length; i++) {
                    if (oListener.listeners[i] === oLstnr) {
                        if (oLstnr.onDetachFromLog) {
                            oLstnr.onDetachFromLog(oLog);
                        }
                        oListener.listeners.splice(i, 1);
                        return;
                    }
                }
            }
        };
    }
    return oListener;
}
Log.fatal = function (sMessage, vDetails, sComponent, fnSupportInfo) {
    log(Log.Level.FATAL, sMessage, vDetails, sComponent, fnSupportInfo);
};
Log.error = function (sMessage, vDetails, sComponent, fnSupportInfo) {
    log(Log.Level.ERROR, sMessage, vDetails, sComponent, fnSupportInfo);
};
Log.warning = function (sMessage, vDetails, sComponent, fnSupportInfo) {
    log(Log.Level.WARNING, sMessage, vDetails, sComponent, fnSupportInfo);
};
Log.info = function (sMessage, vDetails, sComponent, fnSupportInfo) {
    log(Log.Level.INFO, sMessage, vDetails, sComponent, fnSupportInfo);
};
Log.debug = function (sMessage, vDetails, sComponent, fnSupportInfo) {
    log(Log.Level.DEBUG, sMessage, vDetails, sComponent, fnSupportInfo);
};
Log.trace = function (sMessage, vDetails, sComponent, fnSupportInfo) {
    log(Log.Level.TRACE, sMessage, vDetails, sComponent, fnSupportInfo);
};
Log.setLevel = function (iLogLevel, sComponent, _bDefault) {
    sComponent = sComponent || '';
    if (!_bDefault || mMaxLevel[sComponent] == null) {
        mMaxLevel[sComponent] = iLogLevel;
        var sLogLevel;
        Object.keys(Log.Level).forEach(function (sLevel) {
            if (Log.Level[sLevel] === iLogLevel) {
                sLogLevel = sLevel;
            }
        });
        log(Log.Level.INFO, 'Changing log level ' + (sComponent ? 'for \'' + sComponent + '\' ' : '') + 'to ' + sLogLevel, '', 'sap.base.log');
    }
};
Log.getLevel = function (sComponent) {
    return level(sComponent);
};
Log.isLoggable = function (iLevel, sComponent) {
    return (iLevel == null ? Log.Level.DEBUG : iLevel) <= level(sComponent);
};
Log.logSupportInfo = function (bEnabled) {
    bLogSupportInfo = bEnabled;
};
function log(iLevel, sMessage, vDetails, sComponent, fnSupportInfo) {
    if (!fnSupportInfo && !sComponent && typeof vDetails === 'function') {
        fnSupportInfo = vDetails;
        vDetails = '';
    }
    if (!fnSupportInfo && typeof sComponent === 'function') {
        fnSupportInfo = sComponent;
        sComponent = '';
    }
    if (iLevel <= level(sComponent)) {
        var fNow = fnNow(), oNow = new Date(fNow), iMicroSeconds = Math.floor((fNow - Math.floor(fNow)) * 1000), oLogEntry = {
                time: pad0(oNow.getHours(), 2) + ':' + pad0(oNow.getMinutes(), 2) + ':' + pad0(oNow.getSeconds(), 2) + '.' + pad0(oNow.getMilliseconds(), 3) + pad0(iMicroSeconds, 3),
                date: pad0(oNow.getFullYear(), 4) + '-' + pad0(oNow.getMonth() + 1, 2) + '-' + pad0(oNow.getDate(), 2),
                timestamp: fNow,
                level: iLevel,
                message: String(sMessage || ''),
                details: String(vDetails || ''),
                component: String(sComponent || '')
            };
        if (bLogSupportInfo && typeof fnSupportInfo === 'function') {
            oLogEntry.supportInfo = fnSupportInfo();
        }
        if (iLogEntriesLimit) {
            if (aLog.length >= iLogEntriesLimit) {
                discardLogEntries();
            }
            aLog.push(oLogEntry);
        }
        if (oListener) {
            oListener.onLogEntry(oLogEntry);
        }
        if (console) {
            var isDetailsError = vDetails instanceof Error, logText = oLogEntry.date + ' ' + oLogEntry.time + ' ' + oLogEntry.message + ' - ' + oLogEntry.details + ' ' + oLogEntry.component;
            switch (iLevel) {
            case Log.Level.FATAL:
            case Log.Level.ERROR:
                isDetailsError ? console.error(logText, '\n', vDetails) : console.error(logText);
                break;
            case Log.Level.WARNING:
                isDetailsError ? console.warn(logText, '\n', vDetails) : console.warn(logText);
                break;
            case Log.Level.INFO:
                if (console.info) {
                    isDetailsError ? console.info(logText, '\n', vDetails) : console.info(logText);
                } else {
                    isDetailsError ? console.log(logText, '\n', vDetails) : console.log(logText);
                }
                break;
            case Log.Level.DEBUG:
                isDetailsError ? console.debug(logText, '\n', vDetails) : console.debug(logText);
                break;
            case Log.Level.TRACE:
                isDetailsError ? console.trace(logText, '\n', vDetails) : console.trace(logText);
                break;
            }
            if (console.info && oLogEntry.supportInfo) {
                console.info(oLogEntry.supportInfo);
            }
        }
        return oLogEntry;
    }
}
Log.getLogEntries = function () {
    return aLog.slice();
};
Log.getLogEntriesLimit = function () {
    return iLogEntriesLimit;
};
Log.setLogEntriesLimit = function (iLimit) {
    if (iLimit < 0) {
        throw new Error('The log entries limit needs to be greater than or equal to 0!');
    }
    iLogEntriesLimit = iLimit;
    if (aLog.length >= iLogEntriesLimit) {
        discardLogEntries();
    }
};
Log.addLogListener = function (oListener) {
    getLogEntryListenerInstance().attach(this, oListener);
};
Log.removeLogListener = function (oListener) {
    getLogEntryListenerInstance().detach(this, oListener);
};
function Logger(sComponent) {
    this.fatal = function (msg, detail, comp, support) {
        Log.fatal(msg, detail, comp || sComponent, support);
        return this;
    };
    this.error = function (msg, detail, comp, support) {
        Log.error(msg, detail, comp || sComponent, support);
        return this;
    };
    this.warning = function (msg, detail, comp, support) {
        Log.warning(msg, detail, comp || sComponent, support);
        return this;
    };
    this.info = function (msg, detail, comp, support) {
        Log.info(msg, detail, comp || sComponent, support);
        return this;
    };
    this.debug = function (msg, detail, comp, support) {
        Log.debug(msg, detail, comp || sComponent, support);
        return this;
    };
    this.trace = function (msg, detail, comp, support) {
        Log.trace(msg, detail, comp || sComponent, support);
        return this;
    };
    this.setLevel = function (level, comp) {
        Log.setLevel(level, comp || sComponent);
        return this;
    };
    this.getLevel = function (comp) {
        return Log.getLevel(comp || sComponent);
    };
    this.isLoggable = function (level, comp) {
        return Log.isLoggable(level, comp || sComponent);
    };
}
Log.getLogger = function (sComponent, iDefaultLogLevel) {
    if (!isNaN(iDefaultLogLevel) && mMaxLevel[sComponent] == null) {
        mMaxLevel[sComponent] = iDefaultLogLevel;
    }
    return new Logger(sComponent);
};

var fnUniqueSort = function (aArray) {
    fnAssert(Array.isArray(aArray), 'uniqueSort: input parameter must be an Array');
    var iLength = aArray.length;
    if (iLength > 1) {
        aArray.sort();
        var j = 0;
        for (var i = 1; i < iLength; i++) {
            if (aArray.indexOf(aArray[i]) === i) {
                aArray[++j] = aArray[i];
            }
        }
        if (++j < iLength) {
            aArray.splice(j, iLength - j);
        }
    }
    return aArray;
};

function isFunction(obj) {
    return typeof obj === 'function';
}
var Metadata = function (sClassName, oClassInfo) {
    fnAssert(typeof sClassName === 'string' && sClassName, 'Metadata: sClassName must be a non-empty string');
    fnAssert(typeof oClassInfo === 'object', 'Metadata: oClassInfo must be empty or an object');
    if (!oClassInfo || typeof oClassInfo.metadata !== 'object') {
        oClassInfo = {
            metadata: oClassInfo || {},
            constructor: ObjectPath.get(sClassName)
        };
        oClassInfo.metadata.__version = 1;
    }
    oClassInfo.metadata.__version = oClassInfo.metadata.__version || 2;
    if (!isFunction(oClassInfo.constructor)) {
        throw Error('constructor for class ' + sClassName + ' must have been declared before creating metadata for it');
    }
    this._sClassName = sClassName;
    this._oClass = oClassInfo.constructor;
    this.extend(oClassInfo);
};
Metadata.prototype.extend = function (oClassInfo) {
    this.applySettings(oClassInfo);
    this.afterApplySettings();
};
Metadata.prototype.applySettings = function (oClassInfo) {
    var that = this, oStaticInfo = oClassInfo.metadata, oPrototype;
    if (oStaticInfo.baseType) {
        var oParentClass;
        if (isFunction(oStaticInfo.baseType)) {
            oParentClass = oStaticInfo.baseType;
            if (!isFunction(oParentClass.getMetadata)) {
                throw new TypeError('baseType must be a UI5 class with a static getMetadata function');
            }
        } else {
            oParentClass = ObjectPath.get(oStaticInfo.baseType);
            if (!isFunction(oParentClass)) {
                Log.fatal('base class \'' + oStaticInfo.baseType + '\' does not exist');
            }
        }
        if (oParentClass.getMetadata) {
            this._oParent = oParentClass.getMetadata();
            fnAssert(oParentClass === oParentClass.getMetadata().getClass(), 'Metadata: oParentClass must match the class in the parent metadata');
        } else {
            this._oParent = new Metadata(oStaticInfo.baseType, {});
        }
    } else {
        this._oParent = undefined;
    }
    this._bAbstract = !!oStaticInfo['abstract'];
    this._bFinal = !!oStaticInfo['final'];
    this._sStereotype = oStaticInfo.stereotype || (this._oParent ? this._oParent._sStereotype : 'object');
    this._bDeprecated = !!oStaticInfo['deprecated'];
    this._aInterfaces = oStaticInfo.interfaces || [];
    this._aPublicMethods = oStaticInfo.publicMethods || [];
    this._bInterfacesUnique = false;
    oPrototype = this._oClass.prototype;
    for (var n in oClassInfo) {
        if (n !== 'metadata' && n !== 'constructor') {
            oPrototype[n] = oClassInfo[n];
            if (!n.match(/^_|^on|^init$|^exit$/)) {
                that._aPublicMethods.push(n);
            }
        }
    }
};
Metadata.prototype.afterApplySettings = function () {
    if (this._oParent) {
        this._aAllPublicMethods = this._oParent._aAllPublicMethods.concat(this._aPublicMethods);
        this._bInterfacesUnique = false;
    } else {
        this._aAllPublicMethods = this._aPublicMethods;
    }
};
Metadata.prototype.getStereotype = function () {
    return this._sStereotype;
};
Metadata.prototype.getName = function () {
    return this._sClassName;
};
Metadata.prototype.getClass = function () {
    return this._oClass;
};
Metadata.prototype.getParent = function () {
    return this._oParent;
};
Metadata.prototype._dedupInterfaces = function () {
    if (!this._bInterfacesUnique) {
        fnUniqueSort(this._aInterfaces);
        fnUniqueSort(this._aPublicMethods);
        fnUniqueSort(this._aAllPublicMethods);
        this._bInterfacesUnique = true;
    }
};
Metadata.prototype.getPublicMethods = function () {
    this._dedupInterfaces();
    return this._aPublicMethods;
};
Metadata.prototype.getAllPublicMethods = function () {
    this._dedupInterfaces();
    return this._aAllPublicMethods;
};
Metadata.prototype.getInterfaces = function () {
    this._dedupInterfaces();
    return this._aInterfaces;
};
Metadata.prototype.isInstanceOf = function (sInterface) {
    if (this._oParent) {
        if (this._oParent.isInstanceOf(sInterface)) {
            return true;
        }
    }
    var a = this._aInterfaces;
    for (var i = 0, l = a.length; i < l; i++) {
        if (a[i] === sInterface) {
            return true;
        }
    }
    return false;
};
Object.defineProperty(Metadata.prototype, '_mImplementedTypes', {
    get: function () {
        if (this === Metadata.prototype) {
            throw new Error('sap.ui.base.Metadata: The \'_mImplementedTypes\' property must not be accessed on the prototype');
        }
        var result = Object.create(this._oParent ? this._oParent._mImplementedTypes : null);
        result[this._sClassName] = true;
        var aInterfaces = this._aInterfaces, i = aInterfaces.length;
        while (i-- > 0) {
            if (!result[aInterfaces[i]]) {
                result[aInterfaces[i]] = true;
            }
        }
        Object.defineProperty(this, '_mImplementedTypes', {
            value: Object.freeze(result),
            writable: false,
            configurable: false
        });
        return result;
    },
    configurable: true
});
Metadata.prototype.isA = function (vTypeName) {
    var mTypes = this._mImplementedTypes;
    if (Array.isArray(vTypeName)) {
        for (var i = 0; i < vTypeName.length; i++) {
            if (vTypeName[i] in mTypes) {
                return true;
            }
        }
        return false;
    }
    return vTypeName in mTypes;
};
Metadata.prototype.isAbstract = function () {
    return this._bAbstract;
};
Metadata.prototype.isFinal = function () {
    return this._bFinal;
};
Metadata.prototype.isDeprecated = function () {
    return this._bDeprecated;
};
Metadata.prototype.addPublicMethods = function (sMethod) {
    var aNames = sMethod instanceof Array ? sMethod : arguments;
    Array.prototype.push.apply(this._aPublicMethods, aNames);
    Array.prototype.push.apply(this._aAllPublicMethods, aNames);
    this._bInterfacesUnique = false;
};
Metadata.createClass = function (fnBaseClass, sClassName, oClassInfo, FNMetaImpl) {
    if (typeof fnBaseClass === 'string') {
        FNMetaImpl = oClassInfo;
        oClassInfo = sClassName;
        sClassName = fnBaseClass;
        fnBaseClass = null;
    }
    fnAssert(!fnBaseClass || isFunction(fnBaseClass));
    fnAssert(typeof sClassName === 'string' && !!sClassName);
    fnAssert(!oClassInfo || typeof oClassInfo === 'object');
    fnAssert(!FNMetaImpl || isFunction(FNMetaImpl));
    FNMetaImpl = FNMetaImpl || Metadata;
    if (isFunction(FNMetaImpl.preprocessClassInfo)) {
        oClassInfo = FNMetaImpl.preprocessClassInfo(oClassInfo);
    }
    oClassInfo = oClassInfo || {};
    oClassInfo.metadata = oClassInfo.metadata || {};
    if (!oClassInfo.hasOwnProperty('constructor')) {
        oClassInfo.constructor = undefined;
    }
    var fnClass = oClassInfo.constructor;
    fnAssert(!fnClass || isFunction(fnClass));
    if (fnBaseClass) {
        if (!fnClass) {
            if (oClassInfo.metadata.deprecated) {
                fnClass = function () {
                    Log.warning('Usage of deprecated class: ' + sClassName);
                    fnBaseClass.apply(this, arguments);
                };
            } else {
                fnClass = function () {
                    fnBaseClass.apply(this, arguments);
                };
            }
        }
        fnClass.prototype = Object.create(fnBaseClass.prototype);
        fnClass.prototype.constructor = fnClass;
        oClassInfo.metadata.baseType = fnBaseClass;
    } else {
        fnClass = fnClass || function () {
        };
        delete oClassInfo.metadata.baseType;
    }
    oClassInfo.constructor = fnClass;
    ObjectPath.set(sClassName, fnClass);
    var oMetadata = new FNMetaImpl(sClassName, oClassInfo);
    fnClass.getMetadata = fnClass.prototype.getMetadata = function () {
        return oMetadata;
    };
    if (!fnClass.getMetadata().isFinal()) {
        fnClass.extend = function (sSCName, oSCClassInfo, fnSCMetaImpl) {
            return Metadata.createClass(fnClass, sSCName, oSCClassInfo, fnSCMetaImpl || FNMetaImpl);
        };
    }
    return fnClass;
};

var BaseObject = Metadata.createClass('sap.ui.base.Object', {
    constructor: function () {
        if (!(this instanceof BaseObject)) {
            throw Error('Cannot instantiate object: "new" is missing!');
        }
    }
});
BaseObject.prototype.destroy = function () {
};
BaseObject.prototype.getInterface = function () {
    var oInterface = new BaseObject._Interface(this, this.getMetadata().getAllPublicMethods());
    this.getInterface = function () {
        return oInterface;
    };
    return oInterface;
};
BaseObject.defineClass = function (sClassName, oStaticInfo, FNMetaImpl) {
    var oMetadata = new (FNMetaImpl || Metadata)(sClassName, oStaticInfo);
    var fnClass = oMetadata.getClass();
    fnClass.getMetadata = fnClass.prototype.getMetadata = function () {
        return oMetadata;
    };
    if (!oMetadata.isFinal()) {
        fnClass.extend = function (sSCName, oSCClassInfo, fnSCMetaImpl) {
            return Metadata.createClass(fnClass, sSCName, oSCClassInfo, fnSCMetaImpl || FNMetaImpl);
        };
    }
    Log.debug('defined class \'' + sClassName + '\'' + (oMetadata.getParent() ? ' as subclass of ' + oMetadata.getParent().getName() : ''));
    return oMetadata;
};
BaseObject.prototype.isA = function (vTypeName) {
    return this.getMetadata().isA(vTypeName);
};
BaseObject.isA = function (oObject, vTypeName) {
    return oObject instanceof BaseObject && oObject.isA(vTypeName);
};
BaseObject._Interface = function (oObject, aMethods, _bReturnFacade) {
    if (!oObject) {
        return oObject;
    }
    function fCreateDelegator(oObject, sMethodName) {
        return function () {
            var tmp = oObject[sMethodName].apply(oObject, arguments);
            if (_bReturnFacade) {
                return this;
            } else {
                return tmp instanceof BaseObject ? tmp.getInterface() : tmp;
            }
        };
    }
    if (!aMethods) {
        return {};
    }
    var sMethodName;
    for (var i = 0, ml = aMethods.length; i < ml; i++) {
        sMethodName = aMethods[i];
        if (!oObject[sMethodName] || typeof oObject[sMethodName] === 'function') {
            this[sMethodName] = fCreateDelegator(oObject, sMethodName);
        }
    }
};

const emptyFn = () => { };
/**
 * OpenUI5 Core shim
 */
const Core = {
    getConfiguration: () => Configuration,
    getLibraryResourceBundle: emptyFn(),
    getFormatSettings: () => FormatSettings,
};

var CalendarType = {
  Gregorian: "Gregorian",
  Islamic: "Islamic",
  Japanese: "Japanese",
  Persian: "Persian",
  Buddhist: "Buddhist"
};

const M_ISO639_OLD_TO_NEW$2 = {
    "iw": "he",
    "ji": "yi",
};
const getModernLanguage = (sLanguage) => {
    return M_ISO639_OLD_TO_NEW$2[sLanguage] || sLanguage;
};
const Localization = {
    getModernLanguage,
};

var rLanguageTag = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
var LanguageTag = function (sLanguageTag) {
  var aResult = rLanguageTag.exec(sLanguageTag.replace(/_/g, "-"));
  if (aResult === null) {
    throw new TypeError("The given language tag'" + sLanguageTag + "' does not adhere to BCP-47.");
  }
  this.language = aResult[1] || null;
  this.script = aResult[2] || null;
  this.region = aResult[3] || null;
  this.variant = aResult[4] && aResult[4].slice(1) || null;
  this.variantSubtags = this.variant ? this.variant.split("-") : [];
  this.extension = aResult[5] && aResult[5].slice(1) || null;
  this.extensionSubtags = this.variant ? this.variant.split("-") : [];
  this.privateUse = aResult[6] || null;
  this.privateUseSubtags = this.privateUse ? this.privateUse.slice(2).split("-") : [];
  if (this.language) {
    this.language = this.language.toLowerCase();
  }
  if (this.script) {
    this.script = this.script.toLowerCase().replace(/^[a-z]/, function ($) {
      return $.toUpperCase();
    });
  }
  if (this.region) {
    this.region = this.region.toUpperCase();
  }
  Object.freeze(this);
};
LanguageTag.prototype.toString = function () {
  return join(this.language, this.script, this.region, this.variant, this.extension, this.privateUse);
};
function join() {
  return Array.prototype.filter.call(arguments, Boolean).join("-");
}

var Locale = BaseObject.extend('sap.ui.core.Locale', {
    constructor: function (vLocale) {
        BaseObject.apply(this);
        if (vLocale instanceof LanguageTag) {
            this.oLanguageTag = vLocale;
            this.sLocaleId = this.oLanguageTag.toString();
        } else {
            this.oLanguageTag = new LanguageTag(vLocale);
            this.sLocaleId = vLocale;
        }
        Object.assign(this, this.oLanguageTag);
        this.sLanguage = this.language;
    },
    getLanguage: function () {
        return this.language;
    },
    getScript: function () {
        return this.script;
    },
    getRegion: function () {
        return this.region;
    },
    getVariant: function () {
        return this.variant;
    },
    getVariantSubtags: function () {
        return this.variantSubtags;
    },
    getExtension: function () {
        return this.extension;
    },
    getExtensionSubtags: function () {
        return this.extensionSubtags;
    },
    getPrivateUse: function () {
        return this.privateUse;
    },
    getPrivateUseSubtags: function () {
        return this.privateUseSubtags;
    },
    hasPrivateUseSubtag: function (sSubtag) {
        fnAssert(sSubtag && sSubtag.match(/^[0-9A-Z]{1,8}$/i), 'subtag must be a valid BCP47 private use tag');
        return this.privateUseSubtags.indexOf(sSubtag) >= 0;
    },
    toString: function () {
        return this.oLanguageTag.toString();
    },
    getSAPLogonLanguage: function () {
        return Localization._getSAPLogonLanguage(this);
    }
});
Locale._getCoreLocale = function (oLocale) {
    if (oLocale instanceof LanguageTag) {
        oLocale = new Locale(oLocale);
    }
    return oLocale;
};

var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function (obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

var oToken = Object.create(null);
var fnMerge = function () {
    var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? undefined : oToken;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (name === '__proto__' || target === copy) {
                    continue;
                }
                if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && fnIsPlainObject(src) ? src : {};
                    }
                    target[name] = fnMerge(deep, arguments[1], clone, copy);
                } else if (copy !== skipToken) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

var fnExtend = function () {
    var args = [
        false,
        true
    ];
    args.push.apply(args, arguments);
    return fnMerge.apply(null, args);
};

const localeDataMap = new Map();
const loaders$3 = new Map();
const cldrPromises = new Map();
const reportedErrors$1 = new Set();
let warningShown$1 = false;
const M_ISO639_OLD_TO_NEW$1 = {
    "iw": "he",
    "ji": "yi",
    "in": "id",
};
const _showAssetsWarningOnce$1 = (localeId) => {
    if (warningShown$1) {
        return;
    }
    console.warn(`[LocaleData] Supported locale "${localeId}" not configured, import the "Assets.js" module from the webcomponents package you are using.`); /* eslint-disable-line */
    warningShown$1 = true;
};
const calcLocale = (language, region, script) => {
    // normalize language and handle special cases
    language = (language && M_ISO639_OLD_TO_NEW$1[language]) || language;
    // Special case 1: in an SAP context, the inclusive language code "no" always means Norwegian Bokmal ("nb")
    if (language === "no") {
        language = "nb";
    }
    // Special case 2: for Chinese, derive a default region from the script (this behavior is inherited from Java)
    if (language === "zh" && !region) {
        if (script === "Hans") {
            region = "CN";
        }
        else if (script === "Hant") {
            region = "TW";
        }
    }
    // Special case 3: for Serbian, there are cyrillic and latin scripts, "sh" and "sr-latn" map to "latin", "sr" maps to cyrillic.
    if (language === "sh" || (language === "sr" && script === "Latn")) {
        language = "sr";
        region = "Latn";
    }
    // try language + region
    let localeId = `${language}_${region}`;
    if (SUPPORTED_LOCALES.includes(localeId)) {
        if (loaders$3.has(localeId)) {
            // supported and has loader
            return localeId;
        }
        // supported, no loader - fallback to default and warn
        _showAssetsWarningOnce$1(localeId);
        return DEFAULT_LOCALE;
    }
    // not supported, try language only
    localeId = language;
    if (SUPPORTED_LOCALES.includes(localeId)) {
        if (loaders$3.has(localeId)) {
            // supported and has loader
            return localeId;
        }
        // supported, no loader - fallback to default and warn
        _showAssetsWarningOnce$1(localeId);
        return DEFAULT_LOCALE;
    }
    // not supported - fallback to default locale
    return DEFAULT_LOCALE;
};
// internal set data
const setLocaleData = (localeId, content) => {
    localeDataMap.set(localeId, content);
};
// external getSync
const getLocaleData = (localeId) => {
    // if there is no loader, the default fallback was fetched and a warning was given - use default locale instead
    if (!loaders$3.has(localeId)) {
        localeId = DEFAULT_LOCALE;
    }
    const content = localeDataMap.get(localeId);
    if (!content) {
        throw new Error(`CLDR data for locale ${localeId} is not loaded!`);
    }
    return content;
};
// load bundle over the network once
const _loadCldrOnce = (localeId) => {
    if (!cldrPromises.get(localeId)) {
        const loadCldr = loaders$3.get(localeId);
        if (!loadCldr) {
            throw new Error(`CLDR data for locale ${localeId} is not loaded!`);
        }
        cldrPromises.set(localeId, loadCldr(localeId));
    }
    return cldrPromises.get(localeId);
};
// external getAsync
const fetchCldr = async (language, region, script) => {
    const localeId = calcLocale(language, region, script);
    // reuse OpenUI5 CLDR if present
    const openUI5Support = getFeature("OpenUI5Support");
    if (openUI5Support) {
        const cldrContent = openUI5Support.getLocaleDataObject();
        if (cldrContent) {
            // only if openui5 actually returned valid content
            setLocaleData(localeId, cldrContent);
            return;
        }
    }
    // fetch it
    try {
        const cldrContent = await _loadCldrOnce(localeId);
        setLocaleData(localeId, cldrContent);
    }
    catch (error) {
        const e = error;
        if (!reportedErrors$1.has(e.message)) {
            reportedErrors$1.add(e.message);
            console.error(e.message); /* eslint-disable-line */
        }
    }
};
const registerLocaleDataLoader = (localeId, loader) => {
    loaders$3.set(localeId, loader);
};
// register default loader for "en" from ui5 CDN (dev workflow without assets)
registerLocaleDataLoader("en", async () => {
    const cldrContent = await fetch(`https://sdk.openui5.org/1.103.0/resources/sap/ui/core/cldr/en.json`);
    return cldrContent.json();
});
// When the language changes dynamically (the user calls setLanguage),
// re-fetch the required CDRD data.
attachLanguageChange(() => {
    const locale = getLocale();
    return fetchCldr(locale.getLanguage(), locale.getRegion(), locale.getScript());
});

const loadResource = (moduleName) => {
    const moduleFormat = moduleName.match(/sap\/ui\/core\/cldr\/(\w+)\.json/);
    if (!moduleFormat) {
        throw new Error(`Unknown module "${moduleName}"`);
    }
    const localeId = moduleFormat[1];
    return getLocaleData(localeId);
};
const LoaderExtensions = {
    loadResource,
};

var CalendarWeekNumbering = {
  Default: "Default",
  ISO_8601: "ISO_8601",
  MiddleEastern: "MiddleEastern",
  WesternTraditional: "WesternTraditional"
};
Object.defineProperty(CalendarWeekNumbering, "getWeekConfigurationValues", {
  value: function (sCalendarWeekNumbering) {
    switch (sCalendarWeekNumbering) {
      case CalendarWeekNumbering.ISO_8601:
        return {
          firstDayOfWeek: 1,
          minimalDaysInFirstWeek: 4
        };
      case CalendarWeekNumbering.MiddleEastern:
        return {
          firstDayOfWeek: 6,
          minimalDaysInFirstWeek: 1
        };
      case CalendarWeekNumbering.WesternTraditional:
        return {
          firstDayOfWeek: 0,
          minimalDaysInFirstWeek: 1
        };
      default:
        return undefined;
    }
  }
});

var rCIgnoreCase = /c/i, rEIgnoreCase = /e/i, mLegacyUnit2CurrentUnit = {
        'acceleration-meter-per-second-squared': 'acceleration-meter-per-square-second',
        'concentr-milligram-per-deciliter': 'concentr-milligram-ofglucose-per-deciliter',
        'concentr-part-per-million': 'concentr-permillion',
        'consumption-liter-per-100kilometers': 'consumption-liter-per-100-kilometer',
        'pressure-millimeter-of-mercury': 'pressure-millimeter-ofhg',
        'pressure-pound-per-square-inch': 'pressure-pound-force-per-square-inch',
        'pressure-inch-hg': 'pressure-inch-ofhg',
        'torque-pound-foot': 'torque-pound-force-foot'
    }, rNumberInScientificNotation = /^([+-]?)((\d+)(?:\.(\d+))?)[eE]([+-]?\d+)$/, rTrailingZeroes = /0+$/;
var LocaleData$1 = BaseObject.extend('sap.ui.core.LocaleData', {
    constructor: function (oLocale) {
        this.oLocale = Locale._getCoreLocale(oLocale);
        BaseObject.apply(this);
        var oDataLoaded = getData(this.oLocale);
        this.mData = oDataLoaded.mData;
        this.sCLDRLocaleId = oDataLoaded.sCLDRLocaleId;
    },
    _get: function () {
        return this._getDeep(this.mData, arguments);
    },
    _getMerged: function () {
        return this._get.apply(this, arguments);
    },
    _getDeep: function (oObject, aPropertyNames) {
        var oResult = oObject;
        for (var i = 0; i < aPropertyNames.length; i++) {
            oResult = oResult[aPropertyNames[i]];
            if (oResult === undefined) {
                break;
            }
        }
        return oResult;
    },
    getOrientation: function () {
        return this._get('orientation');
    },
    getCurrentLanguageName: function () {
        var oLanguages = this.getLanguages();
        var sCurrentLanguage;
        var sLanguage = Localization.getModernLanguage(this.oLocale.language);
        var sScript = this.oLocale.getScript();
        if (sLanguage === 'sr' && sScript === 'Latn') {
            sLanguage = 'sh';
            sScript = null;
        }
        if (this.oLocale.getRegion()) {
            sCurrentLanguage = oLanguages[sLanguage + '_' + this.oLocale.getRegion()];
        }
        if (!sCurrentLanguage && sScript) {
            sCurrentLanguage = oLanguages[sLanguage + '_' + sScript];
        }
        if (!sCurrentLanguage) {
            sCurrentLanguage = oLanguages[sLanguage];
        }
        return sCurrentLanguage;
    },
    getLanguages: function () {
        return this._get('languages');
    },
    getScripts: function () {
        return this._get('scripts');
    },
    getTerritories: function () {
        return this._get('territories');
    },
    getMonths: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'months', 'format', sWidth);
    },
    getMonthsStandAlone: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'months', 'stand-alone', sWidth);
    },
    getDays: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide' || sWidth == 'short', 'sWidth must be narrow, abbreviate, wide or short');
        return this._get(getCLDRCalendarName(sCalendarType), 'days', 'format', sWidth);
    },
    getDaysStandAlone: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide' || sWidth == 'short', 'sWidth must be narrow, abbreviated, wide or short');
        return this._get(getCLDRCalendarName(sCalendarType), 'days', 'stand-alone', sWidth);
    },
    getQuarters: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'quarters', 'format', sWidth);
    },
    getQuartersStandAlone: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'quarters', 'stand-alone', sWidth);
    },
    getDayPeriods: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'dayPeriods', 'format', sWidth);
    },
    getDayPeriodsStandAlone: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'dayPeriods', 'stand-alone', sWidth);
    },
    getDatePattern: function (sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'dateFormats', sStyle);
    },
    getFlexibleDayPeriods: function (sWidth, sCalendarType) {
        return this._get(getCLDRCalendarName(sCalendarType), 'flexibleDayPeriods', 'format', sWidth);
    },
    getFlexibleDayPeriodsStandAlone: function (sWidth, sCalendarType) {
        return this._get(getCLDRCalendarName(sCalendarType), 'flexibleDayPeriods', 'stand-alone', sWidth);
    },
    getFlexibleDayPeriodOfTime: function (iHour, iMinute) {
        var iAbsoluteMinutes, oDayPeriodRules, sPeriodMatch;
        iAbsoluteMinutes = (iHour * 60 + iMinute) % 1440;
        oDayPeriodRules = this._get('dayPeriodRules');
        function parseToAbsoluteMinutes(sValue) {
            var aSplit = sValue.split(':'), sHour = aSplit[0], sMinute = aSplit[1];
            return parseInt(sHour) * 60 + parseInt(sMinute);
        }
        sPeriodMatch = Object.keys(oDayPeriodRules).find(function (sDayPeriodRule) {
            var oDayPeriodRule = oDayPeriodRules[sDayPeriodRule];
            return oDayPeriodRule['_at'] && parseToAbsoluteMinutes(oDayPeriodRule['_at']) === iAbsoluteMinutes;
        });
        if (sPeriodMatch) {
            return sPeriodMatch;
        }
        return Object.keys(oDayPeriodRules).find(function (sDayPeriodRule) {
            var iEndValue, aIntervals, iStartValue, oDayPeriodRule = oDayPeriodRules[sDayPeriodRule];
            if (oDayPeriodRule['_at']) {
                return false;
            }
            iStartValue = parseToAbsoluteMinutes(oDayPeriodRule['_from']);
            iEndValue = parseToAbsoluteMinutes(oDayPeriodRule['_before']);
            if (iStartValue > iEndValue) {
                aIntervals = [
                    {
                        start: iStartValue,
                        end: 1440
                    },
                    {
                        start: 0,
                        end: iEndValue
                    }
                ];
            } else {
                aIntervals = [{
                        start: iStartValue,
                        end: iEndValue
                    }];
            }
            return aIntervals.some(function (oInterval) {
                return oInterval.start <= iAbsoluteMinutes && oInterval.end > iAbsoluteMinutes;
            });
        });
    },
    getTimePattern: function (sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'timeFormats', sStyle);
    },
    getDateTimePattern: function (sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', sStyle);
    },
    getCombinedDateTimePattern: function (sDateStyle, sTimeStyle, sCalendarType) {
        fnAssert(sDateStyle == 'short' || sDateStyle == 'medium' || sDateStyle == 'long' || sDateStyle == 'full', 'sStyle must be short, medium, long or full');
        fnAssert(sTimeStyle == 'short' || sTimeStyle == 'medium' || sTimeStyle == 'long' || sTimeStyle == 'full', 'sStyle must be short, medium, long or full');
        var sDateTimePattern = this.getDateTimePattern(sDateStyle, sCalendarType), sDatePattern = this.getDatePattern(sDateStyle, sCalendarType), sTimePattern = this.getTimePattern(sTimeStyle, sCalendarType);
        return sDateTimePattern.replace('{0}', sTimePattern).replace('{1}', sDatePattern);
    },
    getCombinedDateTimeWithTimezonePattern: function (sDateStyle, sTimeStyle, sCalendarType) {
        return this.applyTimezonePattern(this.getCombinedDateTimePattern(sDateStyle, sTimeStyle, sCalendarType));
    },
    applyTimezonePattern: function (sPattern) {
        var aPatterns = [sPattern];
        var aMissingTokens = [{
                group: 'Timezone',
                length: 2,
                field: 'zone',
                symbol: 'V'
            }];
        this._appendItems(aPatterns, aMissingTokens);
        return aPatterns[0];
    },
    getTimezoneTranslations: function () {
        this.mTimezoneTranslations = this.mTimezoneTranslations || _resolveTimezoneTranslationStructure(this._get('timezoneNames'));
        return Object.assign({}, this.mTimezoneTranslations);
    },
    getCustomDateTimePattern: function (sSkeleton, sCalendarType) {
        var oAvailableFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'availableFormats');
        return this._getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType);
    },
    getIntervalPattern: function (sId, sCalendarType) {
        var oIntervalFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats'), aIdParts, sIntervalId, sDifference, oInterval, sPattern;
        if (sId) {
            aIdParts = sId.split('-');
            sIntervalId = aIdParts[0];
            sDifference = aIdParts[1];
            oInterval = oIntervalFormats[sIntervalId];
            if (oInterval) {
                sPattern = oInterval[sDifference];
                if (sPattern) {
                    return sPattern;
                }
            }
        }
        return oIntervalFormats.intervalFormatFallback;
    },
    getCombinedIntervalPattern: function (sPattern, sCalendarType) {
        var oIntervalFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats'), sFallbackPattern = oIntervalFormats.intervalFormatFallback;
        return sFallbackPattern.replace(/\{(0|1)\}/g, sPattern);
    },
    getCustomIntervalPattern: function (sSkeleton, vGreatestDiff, sCalendarType) {
        var oAvailableFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats');
        return this._getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vGreatestDiff);
    },
    _getFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var vPattern, aPatterns, oIntervalFormats;
        if (!vDiff) {
            vPattern = oAvailableFormats[sSkeleton];
        } else if (typeof vDiff === 'string') {
            if (vDiff == 'j' || vDiff == 'J') {
                vDiff = this.getPreferredHourSymbol();
            }
            oIntervalFormats = oAvailableFormats[sSkeleton];
            vPattern = oIntervalFormats && oIntervalFormats[vDiff];
        }
        if (vPattern) {
            if (typeof vPattern === 'object') {
                aPatterns = Object.keys(vPattern).map(function (sKey) {
                    return vPattern[sKey];
                });
            } else {
                return vPattern;
            }
        }
        if (!aPatterns) {
            aPatterns = this._createFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vDiff);
        }
        if (aPatterns && aPatterns.length === 1) {
            return aPatterns[0];
        }
        return aPatterns;
    },
    _createFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var aTokens = this._parseSkeletonFormat(sSkeleton), aPatterns, oBestMatch = this._findBestMatch(aTokens, sSkeleton, oAvailableFormats), oToken, oAvailableDateTimeFormats, oSymbol, oGroup, sPattern, sSinglePattern, sDiffSymbol, sDiffGroup, rMixedSkeleton = /^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/, bSingleDate, i;
        if (vDiff) {
            if (typeof vDiff === 'string') {
                sDiffGroup = mCLDRSymbols[vDiff] ? mCLDRSymbols[vDiff].group : '';
                if (sDiffGroup) {
                    bSingleDate = mCLDRSymbolGroups[sDiffGroup].index > aTokens[aTokens.length - 1].index;
                }
                sDiffSymbol = vDiff;
            } else {
                bSingleDate = true;
                if (aTokens[0].symbol === 'y' && oBestMatch && oBestMatch.pattern.G) {
                    oSymbol = mCLDRSymbols['G'];
                    oGroup = mCLDRSymbolGroups[oSymbol.group];
                    aTokens.splice(0, 0, {
                        symbol: 'G',
                        group: oSymbol.group,
                        match: oSymbol.match,
                        index: oGroup.index,
                        field: oGroup.field,
                        length: 1
                    });
                }
                for (i = aTokens.length - 1; i >= 0; i--) {
                    oToken = aTokens[i];
                    if (vDiff[oToken.group]) {
                        bSingleDate = false;
                        break;
                    }
                }
                for (i = 0; i < aTokens.length; i++) {
                    oToken = aTokens[i];
                    if (vDiff[oToken.group]) {
                        sDiffSymbol = oToken.symbol;
                        break;
                    }
                }
                if ((sDiffSymbol == 'h' || sDiffSymbol == 'K') && vDiff.DayPeriod) {
                    sDiffSymbol = 'a';
                }
            }
            if (bSingleDate) {
                return [this.getCustomDateTimePattern(sSkeleton, sCalendarType)];
            }
            if (oBestMatch && oBestMatch.missingTokens.length === 0) {
                sPattern = oBestMatch.pattern[sDiffSymbol];
                if (sPattern && oBestMatch.distance > 0) {
                    sPattern = this._expandFields(sPattern, oBestMatch.patternTokens, aTokens);
                }
            }
            if (!sPattern) {
                oAvailableDateTimeFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'availableFormats');
                if (rMixedSkeleton.test(sSkeleton) && 'ahHkKjJms'.indexOf(sDiffSymbol) >= 0) {
                    sPattern = this._getMixedFormatPattern(sSkeleton, oAvailableDateTimeFormats, sCalendarType, vDiff);
                } else {
                    sSinglePattern = this._getFormatPattern(sSkeleton, oAvailableDateTimeFormats, sCalendarType);
                    sPattern = this.getCombinedIntervalPattern(sSinglePattern, sCalendarType);
                }
            }
            aPatterns = [sPattern];
        } else if (!oBestMatch) {
            sPattern = sSkeleton;
            aPatterns = [sPattern];
        } else {
            if (typeof oBestMatch.pattern === 'string') {
                aPatterns = [oBestMatch.pattern];
            } else if (typeof oBestMatch.pattern === 'object') {
                aPatterns = [];
                for (var sKey in oBestMatch.pattern) {
                    sPattern = oBestMatch.pattern[sKey];
                    aPatterns.push(sPattern);
                }
            }
            if (oBestMatch.distance > 0) {
                if (oBestMatch.missingTokens.length > 0) {
                    if (rMixedSkeleton.test(sSkeleton)) {
                        aPatterns = [this._getMixedFormatPattern(sSkeleton, oAvailableFormats, sCalendarType)];
                    } else {
                        aPatterns = this._expandFields(aPatterns, oBestMatch.patternTokens, aTokens);
                        aPatterns = this._appendItems(aPatterns, oBestMatch.missingTokens, sCalendarType);
                    }
                } else {
                    aPatterns = this._expandFields(aPatterns, oBestMatch.patternTokens, aTokens);
                }
            }
        }
        if (sSkeleton.indexOf('J') >= 0) {
            aPatterns.forEach(function (sPattern, iIndex) {
                aPatterns[iIndex] = sPattern.replace(/ ?[abB](?=([^']*'[^']*')*[^']*)$/g, '');
            });
        }
        return aPatterns;
    },
    _parseSkeletonFormat: function (sSkeleton) {
        var aTokens = [], oToken = { index: -1 }, sSymbol, oSymbol, oGroup;
        for (var i = 0; i < sSkeleton.length; i++) {
            sSymbol = sSkeleton.charAt(i);
            if (sSymbol == 'j' || sSymbol == 'J') {
                sSymbol = this.getPreferredHourSymbol();
            }
            if (sSymbol == oToken.symbol) {
                oToken.length++;
                continue;
            }
            oSymbol = mCLDRSymbols[sSymbol];
            oGroup = mCLDRSymbolGroups[oSymbol.group];
            if (oSymbol.group == 'Other' || oGroup.diffOnly) {
                throw new Error('Symbol \'' + sSymbol + '\' is not allowed in skeleton format \'' + sSkeleton + '\'');
            }
            if (oGroup.index <= oToken.index) {
                throw new Error('Symbol \'' + sSymbol + '\' at wrong position or duplicate in skeleton format \'' + sSkeleton + '\'');
            }
            oToken = {
                symbol: sSymbol,
                group: oSymbol.group,
                match: oSymbol.match,
                index: oGroup.index,
                field: oGroup.field,
                length: 1
            };
            aTokens.push(oToken);
        }
        return aTokens;
    },
    _findBestMatch: function (aTokens, sSkeleton, oAvailableFormats) {
        var aTestTokens, aMissingTokens, oToken, oTestToken, iTest, iDistance, bMatch, iFirstDiffPos, oTokenSymbol, oTestTokenSymbol, oBestMatch = {
                distance: 10000,
                firstDiffPos: -1
            };
        for (var sTestSkeleton in oAvailableFormats) {
            if (sTestSkeleton === 'intervalFormatFallback' || sTestSkeleton.indexOf('B') > -1) {
                continue;
            }
            aTestTokens = this._parseSkeletonFormat(sTestSkeleton);
            iDistance = 0;
            aMissingTokens = [];
            bMatch = true;
            if (aTokens.length < aTestTokens.length) {
                continue;
            }
            iTest = 0;
            iFirstDiffPos = aTokens.length;
            for (var i = 0; i < aTokens.length; i++) {
                oToken = aTokens[i];
                oTestToken = aTestTokens[iTest];
                if (iFirstDiffPos === aTokens.length) {
                    iFirstDiffPos = i;
                }
                if (oTestToken) {
                    oTokenSymbol = mCLDRSymbols[oToken.symbol];
                    oTestTokenSymbol = mCLDRSymbols[oTestToken.symbol];
                    if (oToken.symbol === oTestToken.symbol) {
                        if (oToken.length === oTestToken.length) {
                            if (iFirstDiffPos === i) {
                                iFirstDiffPos = aTokens.length;
                            }
                        } else {
                            if (oToken.length < oTokenSymbol.numericCeiling ? oTestToken.length < oTestTokenSymbol.numericCeiling : oTestToken.length >= oTestTokenSymbol.numericCeiling) {
                                iDistance += Math.abs(oToken.length - oTestToken.length);
                            } else {
                                iDistance += 5;
                            }
                        }
                        iTest++;
                        continue;
                    } else {
                        if (oToken.match == oTestToken.match) {
                            iDistance += Math.abs(oToken.length - oTestToken.length) + 10;
                            iTest++;
                            continue;
                        }
                    }
                }
                aMissingTokens.push(oToken);
                iDistance += 50 - i;
            }
            if (iTest < aTestTokens.length) {
                bMatch = false;
            }
            if (bMatch && (iDistance < oBestMatch.distance || iDistance === oBestMatch.distance && iFirstDiffPos > oBestMatch.firstDiffPos)) {
                oBestMatch.distance = iDistance;
                oBestMatch.firstDiffPos = iFirstDiffPos;
                oBestMatch.missingTokens = aMissingTokens;
                oBestMatch.pattern = oAvailableFormats[sTestSkeleton];
                oBestMatch.patternTokens = aTestTokens;
            }
        }
        if (oBestMatch.pattern) {
            return oBestMatch;
        }
    },
    _expandFields: function (vPattern, aPatternTokens, aTokens) {
        var bSinglePattern = typeof vPattern === 'string';
        var aPatterns;
        if (bSinglePattern) {
            aPatterns = [vPattern];
        } else {
            aPatterns = vPattern;
        }
        var aResult = aPatterns.map(function (sPattern) {
            var mGroups = {}, mPatternGroups = {}, sResultPatterm = '', bQuoted = false, i = 0, iSkeletonLength, iPatternLength, iBestLength, iNewLength, oSkeletonToken, oBestToken, oSymbol, sChar;
            aTokens.forEach(function (oToken) {
                mGroups[oToken.group] = oToken;
            });
            aPatternTokens.forEach(function (oToken) {
                mPatternGroups[oToken.group] = oToken;
            });
            while (i < sPattern.length) {
                sChar = sPattern.charAt(i);
                if (bQuoted) {
                    sResultPatterm += sChar;
                    if (sChar == '\'') {
                        bQuoted = false;
                    }
                } else {
                    oSymbol = mCLDRSymbols[sChar];
                    if (oSymbol && mGroups[oSymbol.group] && mPatternGroups[oSymbol.group]) {
                        oSkeletonToken = mGroups[oSymbol.group];
                        oBestToken = mPatternGroups[oSymbol.group];
                        iSkeletonLength = oSkeletonToken.length;
                        iBestLength = oBestToken.length;
                        iPatternLength = 1;
                        while (sPattern.charAt(i + 1) == sChar) {
                            i++;
                            iPatternLength++;
                        }
                        if (iSkeletonLength === iBestLength || (iSkeletonLength < oSymbol.numericCeiling ? iPatternLength >= oSymbol.numericCeiling : iPatternLength < oSymbol.numericCeiling)) {
                            iNewLength = iPatternLength;
                        } else {
                            iNewLength = Math.max(iPatternLength, iSkeletonLength);
                        }
                        for (var j = 0; j < iNewLength; j++) {
                            sResultPatterm += sChar;
                        }
                    } else {
                        sResultPatterm += sChar;
                        if (sChar == '\'') {
                            bQuoted = true;
                        }
                    }
                }
                i++;
            }
            return sResultPatterm;
        });
        return bSinglePattern ? aResult[0] : aResult;
    },
    _appendItems: function (aPatterns, aMissingTokens, sCalendarType) {
        var oAppendItems = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'appendItems');
        aPatterns.forEach(function (sPattern, iIndex) {
            var sDisplayName, sAppendPattern, sAppendField;
            aMissingTokens.forEach(function (oToken) {
                sAppendPattern = oAppendItems[oToken.group];
                sDisplayName = '\'' + this.getDisplayName(oToken.field) + '\'';
                sAppendField = '';
                for (var i = 0; i < oToken.length; i++) {
                    sAppendField += oToken.symbol;
                }
                aPatterns[iIndex] = sAppendPattern.replace(/\{0\}/, sPattern).replace(/\{1\}/, sAppendField).replace(/\{2\}/, sDisplayName);
            }.bind(this));
        }.bind(this));
        return aPatterns;
    },
    _getMixedFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var rMixedSkeleton = /^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/, rWideMonth = /MMMM|LLLL/, rAbbrevMonth = /MMM|LLL/, rWeekDay = /E|e|c/, oResult, sDateSkeleton, sTimeSkeleton, sStyle, sDatePattern, sTimePattern, sDateTimePattern, sResultPattern;
        oResult = rMixedSkeleton.exec(sSkeleton);
        sDateSkeleton = oResult[1];
        sTimeSkeleton = oResult[2];
        sDatePattern = this._getFormatPattern(sDateSkeleton, oAvailableFormats, sCalendarType);
        if (vDiff) {
            sTimePattern = this.getCustomIntervalPattern(sTimeSkeleton, vDiff, sCalendarType);
        } else {
            sTimePattern = this._getFormatPattern(sTimeSkeleton, oAvailableFormats, sCalendarType);
        }
        if (rWideMonth.test(sDateSkeleton)) {
            sStyle = rWeekDay.test(sDateSkeleton) ? 'full' : 'long';
        } else if (rAbbrevMonth.test(sDateSkeleton)) {
            sStyle = 'medium';
        } else {
            sStyle = 'short';
        }
        sDateTimePattern = this.getDateTimePattern(sStyle, sCalendarType);
        sResultPattern = sDateTimePattern.replace(/\{1\}/, sDatePattern).replace(/\{0\}/, sTimePattern);
        return sResultPattern;
    },
    getNumberSymbol: function (sType) {
        fnAssert(sType == 'decimal' || sType == 'group' || sType == 'plusSign' || sType == 'minusSign' || sType == 'percentSign', 'sType must be decimal, group, plusSign, minusSign or percentSign');
        return this._get('symbols-latn-' + sType);
    },
    getLenientNumberSymbols: function (sType) {
        fnAssert(sType == 'plusSign' || sType == 'minusSign', 'sType must be plusSign or minusSign');
        return this._get('lenient-scope-number')[sType];
    },
    getDecimalPattern: function () {
        return this._get('decimalFormat').standard;
    },
    getCurrencyPattern: function (sContext) {
        return this._get('currencyFormat')[sContext] || this._get('currencyFormat').standard;
    },
    getCurrencySpacing: function (sPosition) {
        return this._get('currencyFormat', 'currencySpacing', sPosition === 'after' ? 'afterCurrency' : 'beforeCurrency');
    },
    getPercentPattern: function () {
        return this._get('percentFormat').standard;
    },
    getMiscPattern: function (sName) {
        fnAssert(sName == 'approximately' || sName == 'atLeast' || sName == 'atMost' || sName == 'range', 'sName must be approximately, atLeast, atMost or range');
        return this._get('miscPattern')[sName];
    },
    getMinimalDaysInFirstWeek: function () {
        return this._get('weekData-minDays');
    },
    getFirstDayOfWeek: function () {
        return this._get('weekData-firstDay');
    },
    getWeekendStart: function () {
        return this._get('weekData-weekendStart');
    },
    getWeekendEnd: function () {
        return this._get('weekData-weekendEnd');
    },
    getCustomCurrencyCodes: function () {
        var mCustomCurrencies = this._get('currency') || {}, mCustomCurrencyCodes = {};
        Object.keys(mCustomCurrencies).forEach(function (sCurrencyKey) {
            mCustomCurrencyCodes[sCurrencyKey] = sCurrencyKey;
        });
        return mCustomCurrencyCodes;
    },
    getCurrencyDigits: function (sCurrency) {
        var mCustomCurrencies = this._get('currency');
        if (mCustomCurrencies) {
            if (mCustomCurrencies[sCurrency] && mCustomCurrencies[sCurrency].hasOwnProperty('digits')) {
                return mCustomCurrencies[sCurrency].digits;
            } else if (mCustomCurrencies['DEFAULT'] && mCustomCurrencies['DEFAULT'].hasOwnProperty('digits')) {
                return mCustomCurrencies['DEFAULT'].digits;
            }
        }
        var iDigits = this._get('currencyDigits', sCurrency);
        if (iDigits == null) {
            iDigits = this._get('currencyDigits', 'DEFAULT');
            if (iDigits == null) {
                iDigits = 2;
            }
        }
        return iDigits;
    },
    getCurrencySymbol: function (sCurrency) {
        var oCurrencySymbols = this.getCurrencySymbols();
        return oCurrencySymbols && oCurrencySymbols[sCurrency] || sCurrency;
    },
    getCurrencyCodeBySymbol: function (sCurrencySymbol) {
        var oCurrencySymbols = this._get('currencySymbols'), sCurrencyCode;
        for (sCurrencyCode in oCurrencySymbols) {
            if (oCurrencySymbols[sCurrencyCode] === sCurrencySymbol) {
                return sCurrencyCode;
            }
        }
        return sCurrencySymbol;
    },
    getCurrencySymbols: function () {
        var mCustomCurrencies = this._get('currency'), mCustomCurrencySymbols = {}, sIsoCode;
        for (var sCurrencyKey in mCustomCurrencies) {
            sIsoCode = mCustomCurrencies[sCurrencyKey].isoCode;
            if (mCustomCurrencies[sCurrencyKey].symbol) {
                mCustomCurrencySymbols[sCurrencyKey] = mCustomCurrencies[sCurrencyKey].symbol;
            } else if (sIsoCode) {
                mCustomCurrencySymbols[sCurrencyKey] = this._get('currencySymbols')[sIsoCode];
            }
        }
        return Object.assign({}, this._get('currencySymbols'), mCustomCurrencySymbols);
    },
    getUnitDisplayName: function (sUnit) {
        var mUnitFormat = this.getUnitFormat(sUnit);
        return mUnitFormat && mUnitFormat['displayName'] || '';
    },
    getRelativePatterns: function (aScales, sStyle) {
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        var aPatterns = [], aPluralCategories = this.getPluralCategories(), oScale, oTimeEntry, iValue, iSign;
        if (!aScales) {
            aScales = [
                'year',
                'month',
                'week',
                'day',
                'hour',
                'minute',
                'second'
            ];
        }
        aScales.forEach(function (sScale) {
            oScale = this._get('dateFields', sScale + '-' + sStyle);
            for (var sEntry in oScale) {
                if (sEntry.indexOf('relative-type-') === 0) {
                    iValue = parseInt(sEntry.substr(14));
                    aPatterns.push({
                        scale: sScale,
                        value: iValue,
                        pattern: oScale[sEntry]
                    });
                } else if (sEntry.indexOf('relativeTime-type-') == 0) {
                    oTimeEntry = oScale[sEntry];
                    iSign = sEntry.substr(18) === 'past' ? -1 : 1;
                    aPluralCategories.forEach(function (sKey) {
                        var sPattern = oTimeEntry['relativeTimePattern-count-' + sKey];
                        if (sPattern) {
                            aPatterns.push({
                                scale: sScale,
                                sign: iSign,
                                pattern: sPattern
                            });
                        }
                    });
                }
            }
        }.bind(this));
        return aPatterns;
    },
    getRelativePattern: function (sScale, iDiff, bFuture, sStyle) {
        var sPattern, oTypes, sKey, sPluralCategory;
        if (typeof bFuture === 'string') {
            sStyle = bFuture;
            bFuture = undefined;
        }
        if (bFuture === undefined) {
            bFuture = iDiff > 0;
        }
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        sKey = sScale + '-' + sStyle;
        if (iDiff === 0 || iDiff === -2 || iDiff === 2) {
            sPattern = this._get('dateFields', sKey, 'relative-type-' + iDiff);
        }
        if (!sPattern) {
            oTypes = this._get('dateFields', sKey, 'relativeTime-type-' + (bFuture ? 'future' : 'past'));
            sPluralCategory = this.getPluralCategory(Math.abs(iDiff).toString());
            sPattern = oTypes['relativeTimePattern-count-' + sPluralCategory];
        }
        return sPattern;
    },
    getRelativeSecond: function (iDiff, sStyle) {
        return this.getRelativePattern('second', iDiff, sStyle);
    },
    getRelativeMinute: function (iDiff, sStyle) {
        if (iDiff == 0) {
            return null;
        }
        return this.getRelativePattern('minute', iDiff, sStyle);
    },
    getRelativeHour: function (iDiff, sStyle) {
        if (iDiff == 0) {
            return null;
        }
        return this.getRelativePattern('hour', iDiff, sStyle);
    },
    getRelativeDay: function (iDiff, sStyle) {
        return this.getRelativePattern('day', iDiff, sStyle);
    },
    getRelativeWeek: function (iDiff, sStyle) {
        return this.getRelativePattern('week', iDiff, sStyle);
    },
    getRelativeMonth: function (iDiff, sStyle) {
        return this.getRelativePattern('month', iDiff, sStyle);
    },
    getDisplayName: function (sType, sStyle) {
        fnAssert(sType == 'second' || sType == 'minute' || sType == 'hour' || sType == 'zone' || sType == 'day' || sType == 'weekday' || sType == 'week' || sType == 'month' || sType == 'quarter' || sType == 'year' || sType == 'era', 'sType must be second, minute, hour, zone, day, weekday, week, month, quarter, year, era');
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        var aSingleFormFields = [
                'era',
                'weekday',
                'zone'
            ], sKey = aSingleFormFields.indexOf(sType) === -1 ? sType + '-' + sStyle : sType;
        return this._get('dateFields', sKey, 'displayName');
    },
    getRelativeYear: function (iDiff, sStyle) {
        return this.getRelativePattern('year', iDiff, sStyle);
    },
    getDecimalFormat: function (sStyle, sNumber, sPlural) {
        var sFormat;
        var oFormats;
        switch (sStyle) {
        case 'long':
            oFormats = this._get('decimalFormat-long');
            break;
        default:
            oFormats = this._get('decimalFormat-short');
            break;
        }
        if (oFormats) {
            var sName = sNumber + '-' + sPlural;
            sFormat = oFormats[sName];
            if (!sFormat) {
                sName = sNumber + '-other';
                sFormat = oFormats[sName];
            }
        }
        return sFormat;
    },
    getCurrencyFormat: function (sStyle, sNumber, sPlural) {
        var sFormat;
        var oFormats = this._get('currencyFormat-' + sStyle);
        if (!oFormats) {
            if (sStyle === 'sap-short') {
                throw new Error('Failed to get CLDR data for property "currencyFormat-sap-short"');
            }
            oFormats = this._get('currencyFormat-short');
        }
        if (oFormats) {
            var sName = sNumber + '-' + sPlural;
            sFormat = oFormats[sName];
            if (!sFormat) {
                sName = sNumber + '-other';
                sFormat = oFormats[sName];
            }
        }
        return sFormat;
    },
    getListFormat: function (sType, sStyle) {
        var oFormats = this._get('listPattern-' + (sType || 'standard') + '-' + (sStyle || 'wide'));
        if (oFormats) {
            return oFormats;
        }
        return {};
    },
    getResolvedUnitFormat: function (sUnit) {
        sUnit = this.getUnitFromMapping(sUnit) || sUnit;
        return this.getUnitFormat(sUnit);
    },
    getUnitFormat: function (sUnit) {
        var oResult = this._get('units', 'short', sUnit);
        if (!oResult && mLegacyUnit2CurrentUnit[sUnit]) {
            oResult = this._get('units', 'short', mLegacyUnit2CurrentUnit[sUnit]);
        }
        return oResult;
    },
    getUnitFormats: function () {
        return this._getMerged('units', 'short');
    },
    getUnitFromMapping: function (sMapping) {
        return this._get('unitMappings', sMapping);
    },
    getEras: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'wide' || sWidth == 'abbreviated' || sWidth == 'narrow', 'sWidth must be wide, abbreviate or narrow');
        var oEras = this._get(getCLDRCalendarName(sCalendarType), 'era-' + sWidth), aEras = [];
        for (var i in oEras) {
            aEras[parseInt(i)] = oEras[i];
        }
        return aEras;
    },
    getEraDates: function (sCalendarType) {
        var oEraDates = this._get('eras-' + sCalendarType.toLowerCase()), aEraDates = [];
        for (var i in oEraDates) {
            aEraDates[parseInt(i)] = oEraDates[i];
        }
        return aEraDates;
    },
    getCalendarWeek: function (sStyle, iWeekNumber) {
        fnAssert(sStyle == 'wide' || sStyle == 'narrow', 'sStyle must be wide or narrow');
        var oMessageBundle = Core.getLibraryResourceBundle('sap.ui.core', this.oLocale.toString()), sKey = 'date.week.calendarweek.' + sStyle;
        return oMessageBundle.getText(sKey, iWeekNumber);
    },
    firstDayStartsFirstWeek: function () {
        return this.oLocale.getLanguage() === 'en' && this.oLocale.getRegion() === 'US';
    },
    getPreferredCalendarType: function () {
        var sCalendarName, sType, i, aCalendars = this._get('calendarPreference') || [];
        for (i = 0; i < aCalendars.length; i++) {
            sCalendarName = aCalendars[i].split('-')[0];
            for (sType in CalendarType) {
                if (sCalendarName === sType.toLowerCase()) {
                    return sType;
                }
            }
        }
        return CalendarType.Gregorian;
    },
    getPreferredHourSymbol: function () {
        return this._get('timeData', '_preferred');
    },
    getPluralCategories: function () {
        var oPlurals = this._get('plurals'), aCategories = Object.keys(oPlurals);
        aCategories.push('other');
        return aCategories;
    },
    getPluralCategory: function (vNumber) {
        var sNumber = typeof vNumber === 'number' ? vNumber.toString() : vNumber, oPlurals = this._get('plurals');
        if (!this._pluralTest) {
            this._pluralTest = {};
        }
        for (var sCategory in oPlurals) {
            var fnTest = this._pluralTest[sCategory];
            if (!fnTest) {
                fnTest = this._parsePluralRule(oPlurals[sCategory]);
                this._pluralTest[sCategory] = fnTest;
            }
            if (fnTest(sNumber).bMatch) {
                return sCategory;
            }
        }
        return 'other';
    },
    _parsePluralRule: function (sRule) {
        var OP_OR = 'or', OP_AND = 'and', OP_MOD = '%', OP_EQ = '=', OP_NEQ = '!=', OPD_N = 'n', OPD_I = 'i', OPD_F = 'f', OPD_T = 't', OPD_V = 'v', OPD_W = 'w', OPD_C = 'c', OPD_E = 'e', RANGE = '..', SEP = ',';
        var i = 0, aTokens;
        aTokens = sRule.split(' ');
        function accept(sToken) {
            if (aTokens[i] === sToken) {
                i++;
                return true;
            }
            return false;
        }
        function consume() {
            var sToken = aTokens[i];
            i++;
            return sToken;
        }
        function or_condition() {
            var fnAnd, fnOr;
            fnAnd = and_condition();
            if (accept(OP_OR)) {
                fnOr = or_condition();
                return function (o) {
                    return fnAnd(o) || fnOr(o);
                };
            }
            return fnAnd;
        }
        function and_condition() {
            var fnRelation, fnAnd;
            fnRelation = relation();
            if (accept(OP_AND)) {
                fnAnd = and_condition();
                return function (o) {
                    return fnRelation(o) && fnAnd(o);
                };
            }
            return fnRelation;
        }
        function relation() {
            var fnExpr, fnRangeList, bEq;
            fnExpr = expr();
            if (accept(OP_EQ)) {
                bEq = true;
            } else if (accept(OP_NEQ)) {
                bEq = false;
            } else {
                throw new Error('Expected \'=\' or \'!=\'');
            }
            fnRangeList = range_list();
            if (bEq) {
                return function (o) {
                    return fnRangeList(o).indexOf(fnExpr(o)) >= 0;
                };
            } else {
                return function (o) {
                    return fnRangeList(o).indexOf(fnExpr(o)) === -1;
                };
            }
        }
        function expr() {
            var fnOperand;
            fnOperand = operand();
            if (accept(OP_MOD)) {
                var iDivisor = parseInt(consume());
                return function (o) {
                    return fnOperand(o) % iDivisor;
                };
            }
            return fnOperand;
        }
        function operand() {
            if (accept(OPD_N)) {
                return function (o) {
                    return o.n;
                };
            } else if (accept(OPD_I)) {
                return function (o) {
                    return o.i;
                };
            } else if (accept(OPD_F)) {
                return function (o) {
                    return o.f;
                };
            } else if (accept(OPD_T)) {
                return function (o) {
                    return o.t;
                };
            } else if (accept(OPD_V)) {
                return function (o) {
                    return o.v;
                };
            } else if (accept(OPD_W)) {
                return function (o) {
                    return o.w;
                };
            } else if (accept(OPD_C)) {
                return function (o) {
                    return o.c;
                };
            } else if (accept(OPD_E)) {
                return function (o) {
                    return o.c;
                };
            } else {
                throw new Error('Unknown operand: ' + consume());
            }
        }
        function range_list() {
            var aValues = [], sRangeList = consume(), aParts = sRangeList.split(SEP), aRange, iFrom, iTo;
            aParts.forEach(function (sPart) {
                aRange = sPart.split(RANGE);
                if (aRange.length === 1) {
                    aValues.push(parseInt(sPart));
                } else {
                    iFrom = parseInt(aRange[0]);
                    iTo = parseInt(aRange[1]);
                    for (var i = iFrom; i <= iTo; i++) {
                        aValues.push(i);
                    }
                }
            });
            return function (o) {
                return aValues;
            };
        }
        var fnOr = or_condition();
        if (i != aTokens.length) {
            throw new Error('Not completely parsed');
        }
        return function (sValue) {
            var iDotPos, iExponent, iExponentPos, sFraction, sFractionNoZeros, sInteger, o;
            sValue = sValue.replace(rCIgnoreCase, 'e');
            iExponentPos = sValue.search(rEIgnoreCase);
            iExponent = iExponentPos < 0 ? 0 : parseInt(sValue.slice(iExponentPos + 1));
            sValue = LocaleData$1.convertToDecimal(sValue);
            iDotPos = sValue.indexOf('.');
            if (iDotPos === -1) {
                sInteger = sValue;
                sFraction = '';
                sFractionNoZeros = '';
            } else {
                sInteger = sValue.slice(0, iDotPos);
                sFraction = sValue.slice(iDotPos + 1);
                sFractionNoZeros = sFraction.replace(rTrailingZeroes, '');
            }
            o = {
                n: parseFloat(sValue),
                i: parseInt(sInteger),
                v: sFraction.length,
                w: sFractionNoZeros.length,
                f: sFraction === '' ? 0 : parseInt(sFraction),
                t: sFractionNoZeros === '' ? 0 : parseInt(sFractionNoZeros),
                c: iExponent
            };
            return {
                bMatch: fnOr(o),
                oOperands: o
            };
        };
    }
});
LocaleData$1.convertToDecimal = function (vValue) {
    var iIntegerLength, iExponent, iFractionLength, bNegative, iNewIntegerLength, aResult, sValue = String(vValue);
    if (!sValue.includes('e') && !sValue.includes('E')) {
        return sValue;
    }
    aResult = sValue.match(rNumberInScientificNotation);
    bNegative = aResult[1] === '-';
    sValue = aResult[2].replace('.', '');
    iIntegerLength = aResult[3] ? aResult[3].length : 0;
    iFractionLength = aResult[4] ? aResult[4].length : 0;
    iExponent = parseInt(aResult[5]);
    iNewIntegerLength = iIntegerLength + iExponent;
    if (iExponent > 0) {
        sValue = iExponent < iFractionLength ? sValue.slice(0, iNewIntegerLength) + '.' + sValue.slice(iNewIntegerLength) : sValue = sValue.padEnd(iNewIntegerLength, '0');
    } else {
        sValue = -iExponent < iIntegerLength ? sValue = sValue.slice(0, iNewIntegerLength) + '.' + sValue.slice(iNewIntegerLength) : sValue = '0.' + sValue.padStart(iFractionLength - iExponent, '0');
    }
    if (bNegative) {
        sValue = '-' + sValue;
    }
    return sValue;
};
var mCLDRSymbolGroups = {
    'Era': {
        field: 'era',
        index: 0
    },
    'Year': {
        field: 'year',
        index: 1
    },
    'Quarter': {
        field: 'quarter',
        index: 2
    },
    'Month': {
        field: 'month',
        index: 3
    },
    'Week': {
        field: 'week',
        index: 4
    },
    'Day-Of-Week': {
        field: 'weekday',
        index: 5
    },
    'Day': {
        field: 'day',
        index: 6
    },
    'DayPeriod': {
        field: 'hour',
        index: 7,
        diffOnly: true
    },
    'Hour': {
        field: 'hour',
        index: 8
    },
    'Minute': {
        field: 'minute',
        index: 9
    },
    'Second': {
        field: 'second',
        index: 10
    },
    'Timezone': {
        field: 'zone',
        index: 11
    }
};
var mCLDRSymbols = {
    'G': {
        group: 'Era',
        match: 'Era',
        numericCeiling: 1
    },
    'y': {
        group: 'Year',
        match: 'Year',
        numericCeiling: 100
    },
    'Y': {
        group: 'Year',
        match: 'Year',
        numericCeiling: 100
    },
    'Q': {
        group: 'Quarter',
        match: 'Quarter',
        numericCeiling: 3
    },
    'q': {
        group: 'Quarter',
        match: 'Quarter',
        numericCeiling: 3
    },
    'M': {
        group: 'Month',
        match: 'Month',
        numericCeiling: 3
    },
    'L': {
        group: 'Month',
        match: 'Month',
        numericCeiling: 3
    },
    'w': {
        group: 'Week',
        match: 'Week',
        numericCeiling: 100
    },
    'W': {
        group: 'Week',
        match: 'Week',
        numericCeiling: 100
    },
    'd': {
        group: 'Day',
        match: 'Day',
        numericCeiling: 100
    },
    'D': {
        group: 'Day',
        match: 'Day',
        numericCeiling: 100
    },
    'E': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 1
    },
    'e': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 3
    },
    'c': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 2
    },
    'h': {
        group: 'Hour',
        match: 'Hour12',
        numericCeiling: 100
    },
    'H': {
        group: 'Hour',
        match: 'Hour24',
        numericCeiling: 100
    },
    'k': {
        group: 'Hour',
        match: 'Hour24',
        numericCeiling: 100
    },
    'K': {
        group: 'Hour',
        match: 'Hour12',
        numericCeiling: 100
    },
    'm': {
        group: 'Minute',
        match: 'Minute',
        numericCeiling: 100
    },
    's': {
        group: 'Second',
        match: 'Second',
        numericCeiling: 100
    },
    'z': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'Z': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'O': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'v': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'V': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'X': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'x': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'S': {
        group: 'Other',
        numericCeiling: 100
    },
    'u': {
        group: 'Other',
        numericCeiling: 100
    },
    'U': {
        group: 'Other',
        numericCeiling: 1
    },
    'r': {
        group: 'Other',
        numericCeiling: 100
    },
    'F': {
        group: 'Other',
        numericCeiling: 100
    },
    'g': {
        group: 'Other',
        numericCeiling: 100
    },
    'a': {
        group: 'DayPeriod',
        numericCeiling: 1
    },
    'b': {
        group: 'Other',
        numericCeiling: 1
    },
    'B': {
        group: 'Other',
        numericCeiling: 1
    },
    'A': {
        group: 'Other',
        numericCeiling: 100
    }
};
function getDesigntimePropertyAsArray(sValue) {
    var m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(sValue);
    return m && m[2] ? m[2].split(/,/) : null;
}
var _cldrLocales = getDesigntimePropertyAsArray('$cldr-locales:ar,ar_EG,ar_SA,bg,ca,cy,cs,da,de,de_AT,de_CH,el,el_CY,en,en_AU,en_GB,en_HK,en_IE,en_IN,en_NZ,en_PG,en_SG,en_ZA,es,es_AR,es_BO,es_CL,es_CO,es_MX,es_PE,es_UY,es_VE,et,fa,fi,fr,fr_BE,fr_CA,fr_CH,fr_LU,he,hi,hr,hu,id,it,it_CH,ja,kk,ko,lt,lv,ms,nb,nl,nl_BE,pl,pt,pt_PT,ro,ru,ru_UA,sk,sl,sr,sr_Latn,sv,th,tr,uk,vi,zh_CN,zh_HK,zh_SG,zh_TW$');
var M_SUPPORTED_LOCALES = function () {
    var LOCALES = _cldrLocales, result = {}, i;
    if (LOCALES) {
        for (i = 0; i < LOCALES.length; i++) {
            result[LOCALES[i]] = true;
        }
    }
    return result;
}();
var mLocaleDatas = {};
function _resolveTimezoneTranslationStructure(oNode, sKey, oResult, aParentTranslations) {
    aParentTranslations = aParentTranslations ? aParentTranslations.slice() : [];
    oResult = oResult || {};
    sKey = sKey || '';
    Object.keys(oNode).forEach(function (sChildKey) {
        var vChildNode = oNode[sChildKey];
        if (typeof vChildNode === 'object') {
            var aParentTranslationForChild = aParentTranslations.slice();
            var sParent = vChildNode['_parent'];
            if (sParent) {
                aParentTranslationForChild.push(sParent);
            }
            _resolveTimezoneTranslationStructure(vChildNode, sKey + sChildKey + '/', oResult, aParentTranslationForChild);
        } else if (typeof vChildNode === 'string' && sChildKey !== '_parent') {
            var sParents = aParentTranslations.length ? aParentTranslations.join(', ') + ', ' : '';
            oResult[sKey + sChildKey] = sParents + vChildNode;
        }
    });
    return oResult;
}
function getCLDRCalendarName(sCalendarType) {
    if (!sCalendarType) {
        sCalendarType = Configuration.getCalendarType();
    }
    return 'ca-' + sCalendarType.toLowerCase();
}
function getData(oLocale) {
    var sLanguage = oLocale.getLanguage() || '', sScript = oLocale.getScript() || '', sRegion = oLocale.getRegion() || '', mData;
    function merge(obj, fallbackObj) {
        var name, value, fallbackValue;
        if (!fallbackObj) {
            return;
        }
        for (name in fallbackObj) {
            if (fallbackObj.hasOwnProperty(name)) {
                value = obj[name];
                fallbackValue = fallbackObj[name];
                if (value === undefined) {
                    obj[name] = fallbackValue;
                } else if (value === null) {
                    delete obj[name];
                } else if (typeof value === 'object' && typeof fallbackValue === 'object' && !Array.isArray(value)) {
                    merge(value, fallbackValue);
                }
            }
        }
    }
    function getOrLoad(sId) {
        if (!mLocaleDatas[sId] && (!M_SUPPORTED_LOCALES || M_SUPPORTED_LOCALES[sId] === true)) {
            var data = mLocaleDatas[sId] = LoaderExtensions.loadResource('sap/ui/core/cldr/' + sId + '.json', {
                dataType: 'json',
                failOnError: false
            });
            if (data && data.__fallbackLocale) {
                merge(data, getOrLoad(data.__fallbackLocale));
                delete data.__fallbackLocale;
            }
        }
        return mLocaleDatas[sId];
    }
    sLanguage = sLanguage && Localization.getModernLanguage(sLanguage) || sLanguage;
    if (sLanguage === 'no') {
        sLanguage = 'nb';
    }
    if (sLanguage === 'zh' && !sRegion) {
        if (sScript === 'Hans') {
            sRegion = 'CN';
        } else if (sScript === 'Hant') {
            sRegion = 'TW';
        }
    }
    if (sLanguage === 'sh' || sLanguage === 'sr' && sScript === 'Latn') {
        sLanguage = 'sr_Latn';
    }
    var sId = sLanguage + '_' + sRegion;
    var sCLDRLocaleId = sId;
    if (sLanguage && sRegion) {
        mData = getOrLoad(sId);
    }
    if (!mData && sLanguage) {
        mData = getOrLoad(sLanguage);
        sCLDRLocaleId = sLanguage;
    }
    if (!mData) {
        mData = getOrLoad('en');
        sCLDRLocaleId = 'en';
    }
    mLocaleDatas[sId] = mData;
    sCLDRLocaleId = sCLDRLocaleId.replace(/_/g, '-');
    return {
        mData: mData,
        sCLDRLocaleId: sCLDRLocaleId
    };
}
var CustomLocaleData = LocaleData$1.extend('sap.ui.core.CustomLocaleData', {
    constructor: function (oLocale) {
        LocaleData$1.apply(this, arguments);
        this.mCustomData = Configuration.getFormatSettings().getCustomLocaleData();
    },
    _get: function () {
        var aArguments = Array.prototype.slice.call(arguments), sCalendar, sKey;
        if (aArguments[0].indexOf('ca-') == 0) {
            sCalendar = aArguments[0];
            if (sCalendar == getCLDRCalendarName()) {
                aArguments = aArguments.slice(1);
            }
        }
        sKey = aArguments.join('-');
        var vValue = this.mCustomData[sKey];
        if (vValue == null) {
            vValue = this._getDeep(this.mCustomData, arguments);
            if (vValue == null) {
                vValue = this._getDeep(this.mData, arguments);
            }
        }
        return vValue;
    },
    _getMerged: function () {
        var mData = this._getDeep(this.mData, arguments);
        var mCustomData = this._getDeep(this.mCustomData, arguments);
        return fnExtend({}, mData, mCustomData);
    },
    getFirstDayOfWeek: function () {
        var sCalendarWeekNumbering = Configuration.getCalendarWeekNumbering();
        if (sCalendarWeekNumbering === CalendarWeekNumbering.Default) {
            return LocaleData$1.prototype.getFirstDayOfWeek.call(this);
        }
        return CalendarWeekNumbering.getWeekConfigurationValues(sCalendarWeekNumbering).firstDayOfWeek;
    },
    getMinimalDaysInFirstWeek: function () {
        var sCalendarWeekNumbering = Configuration.getCalendarWeekNumbering();
        if (sCalendarWeekNumbering === CalendarWeekNumbering.Default) {
            return LocaleData$1.prototype.getMinimalDaysInFirstWeek.call(this);
        }
        return CalendarWeekNumbering.getWeekConfigurationValues(sCalendarWeekNumbering).minimalDaysInFirstWeek;
    }
});
LocaleData$1.getInstance = function (oLocale) {
    oLocale = Locale._getCoreLocale(oLocale);
    return oLocale.hasPrivateUseSubtag('sapufmt') ? new CustomLocaleData(oLocale) : new LocaleData$1(oLocale);
};
LocaleData$1._cldrLocales = _cldrLocales;

var mRegistry = new Map();
var _Calendars = {
  get: function (sCalendarType) {
    if (!mRegistry.has(sCalendarType)) {
      throw new Error("Required calendar type: " + sCalendarType + " not loaded.");
    }
    return mRegistry.get(sCalendarType);
  },
  set: function (sCalendarType, CalendarClass) {
    mRegistry.set(sCalendarType, CalendarClass);
  }
};

var CalendarUtils = {
    getWeekConfigurationValues: function (sCalendarWeekNumbering, oLocale) {
        var oLocaleData, oWeekConfigurationValues;
        if (!sCalendarWeekNumbering) {
            return CalendarUtils.getWeekConfigurationValues(Configuration.getCalendarWeekNumbering(), oLocale);
        }
        oWeekConfigurationValues = CalendarWeekNumbering.getWeekConfigurationValues(sCalendarWeekNumbering);
        if (oWeekConfigurationValues) {
            return oWeekConfigurationValues;
        }
        if (sCalendarWeekNumbering === CalendarWeekNumbering.Default) {
            oLocale = oLocale || Configuration.getFormatSettings().getFormatLocale();
            oLocaleData = LocaleData$1.getInstance(oLocale);
            return {
                firstDayOfWeek: oLocaleData.getFirstDayOfWeek(),
                minimalDaysInFirstWeek: oLocaleData.getMinimalDaysInFirstWeek()
            };
        }
        return undefined;
    }
};

var UniversalDate$1 = BaseObject.extend('sap.ui.core.date.UniversalDate', {
    constructor: function () {
        var clDate = UniversalDate$1.getClass();
        return this.createDate(clDate, arguments);
    }
});
UniversalDate$1.UTC = function () {
    var clDate = UniversalDate$1.getClass();
    return clDate.UTC.apply(clDate, arguments);
};
UniversalDate$1.now = function () {
    return Date.now();
};
UniversalDate$1.prototype.createDate = function (clDate, aArgs) {
    if (clDate === Date) {
        return UI5Date$1.getInstance.apply(null, aArgs);
    }
    switch (aArgs.length) {
    case 0:
        return new clDate();
    case 1:
        return new clDate(aArgs[0] instanceof Date ? aArgs[0].getTime() : aArgs[0]);
    case 2:
        return new clDate(aArgs[0], aArgs[1]);
    case 3:
        return new clDate(aArgs[0], aArgs[1], aArgs[2]);
    case 4:
        return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3]);
    case 5:
        return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4]);
    case 6:
        return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4], aArgs[5]);
    case 7:
        return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4], aArgs[5], aArgs[6]);
    }
};
UniversalDate$1.getInstance = function (oDate, sCalendarType) {
    var clDate, oInstance;
    if (oDate instanceof UniversalDate$1) {
        oDate = oDate.getJSDate();
    }
    if (oDate && isNaN(oDate.getTime())) {
        throw new Error('The given date object is invalid');
    }
    if (!sCalendarType) {
        sCalendarType = Configuration.getCalendarType();
    }
    clDate = UniversalDate$1.getClass(sCalendarType);
    oInstance = Object.create(clDate.prototype);
    oInstance.oDate = oDate ? UI5Date$1.getInstance(oDate) : UI5Date$1.getInstance();
    oInstance.sCalendarType = sCalendarType;
    return oInstance;
};
UniversalDate$1.getClass = function (sCalendarType) {
    if (!sCalendarType) {
        sCalendarType = Configuration.getCalendarType();
    }
    return _Calendars.get(sCalendarType);
};
[
    'getDate',
    'getMonth',
    'getFullYear',
    'getYear',
    'getDay',
    'getHours',
    'getMinutes',
    'getSeconds',
    'getMilliseconds',
    'getUTCDate',
    'getUTCMonth',
    'getUTCFullYear',
    'getUTCDay',
    'getUTCHours',
    'getUTCMinutes',
    'getUTCSeconds',
    'getUTCMilliseconds',
    'getTime',
    'valueOf',
    'getTimezoneOffset',
    'toString',
    'toDateString',
    'setDate',
    'setFullYear',
    'setYear',
    'setMonth',
    'setHours',
    'setMinutes',
    'setSeconds',
    'setMilliseconds',
    'setUTCDate',
    'setUTCFullYear',
    'setUTCMonth',
    'setUTCHours',
    'setUTCMinutes',
    'setUTCSeconds',
    'setUTCMilliseconds'
].forEach(function (sName) {
    UniversalDate$1.prototype[sName] = function () {
        return this.oDate[sName].apply(this.oDate, arguments);
    };
});
UniversalDate$1.prototype.getJSDate = function () {
    return this.oDate;
};
UniversalDate$1.prototype.getCalendarType = function () {
    return this.sCalendarType;
};
UniversalDate$1.prototype.getEra = function () {
    return UniversalDate$1.getEraByDate(this.sCalendarType, this.oDate.getFullYear(), this.oDate.getMonth(), this.oDate.getDate());
};
UniversalDate$1.prototype.setEra = function (iEra) {
};
UniversalDate$1.prototype.getUTCEra = function () {
    return UniversalDate$1.getEraByDate(this.sCalendarType, this.oDate.getUTCFullYear(), this.oDate.getUTCMonth(), this.oDate.getUTCDate());
};
UniversalDate$1.prototype.setUTCEra = function (iEra) {
};
UniversalDate$1.prototype.getWeek = function (oLocale, vCalendarWeekNumbering) {
    return UniversalDate$1.getWeekByDate(this.sCalendarType, this.getFullYear(), this.getMonth(), this.getDate(), oLocale, vCalendarWeekNumbering);
};
UniversalDate$1.prototype.setWeek = function (oWeek, oLocale, vCalendarWeekNumbering) {
    var oDate = UniversalDate$1.getFirstDateOfWeek(this.sCalendarType, oWeek.year || this.getFullYear(), oWeek.week, oLocale, vCalendarWeekNumbering);
    this.setFullYear(oDate.year, oDate.month, oDate.day);
};
UniversalDate$1.prototype.getUTCWeek = function (oLocale, vCalendarWeekNumbering) {
    return UniversalDate$1.getWeekByDate(this.sCalendarType, this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), oLocale, vCalendarWeekNumbering);
};
UniversalDate$1.prototype.setUTCWeek = function (oWeek, oLocale, vCalendarWeekNumbering) {
    var oDate = UniversalDate$1.getFirstDateOfWeek(this.sCalendarType, oWeek.year || this.getFullYear(), oWeek.week, oLocale, vCalendarWeekNumbering);
    this.setUTCFullYear(oDate.year, oDate.month, oDate.day);
};
UniversalDate$1.prototype.getQuarter = function () {
    return Math.floor(this.getMonth() / 3);
};
UniversalDate$1.prototype.getUTCQuarter = function () {
    return Math.floor(this.getUTCMonth() / 3);
};
UniversalDate$1.prototype.getDayPeriod = function () {
    if (this.getHours() < 12) {
        return 0;
    } else {
        return 1;
    }
};
UniversalDate$1.prototype.getUTCDayPeriod = function () {
    if (this.getUTCHours() < 12) {
        return 0;
    } else {
        return 1;
    }
};
UniversalDate$1.prototype.getTimezoneShort = function () {
    if (this.oDate.getTimezoneShort) {
        return this.oDate.getTimezoneShort();
    }
};
UniversalDate$1.prototype.getTimezoneLong = function () {
    if (this.oDate.getTimezoneLong) {
        return this.oDate.getTimezoneLong();
    }
};
var iMillisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
UniversalDate$1.getWeekByDate = function (sCalendarType, iYear, iMonth, iDay, oLocale, vCalendarWeekNumbering) {
    vCalendarWeekNumbering = vCalendarWeekNumbering || Configuration.getCalendarWeekNumbering();
    checkWeekConfig(vCalendarWeekNumbering);
    oLocale = oLocale || Configuration.getFormatSettings().getFormatLocale();
    var clDate = this.getClass(sCalendarType);
    var oFirstDay = getFirstDayOfFirstWeek(clDate, iYear, oLocale, vCalendarWeekNumbering);
    var oDate = new clDate(clDate.UTC(iYear, iMonth, iDay));
    var iWeek, iLastYear, iNextYear, oLastFirstDay, oNextFirstDay;
    var bSplitWeek = isSplitWeek(vCalendarWeekNumbering, oLocale);
    if (bSplitWeek) {
        iWeek = calculateWeeks(oFirstDay, oDate);
    } else {
        iLastYear = iYear - 1;
        iNextYear = iYear + 1;
        oLastFirstDay = getFirstDayOfFirstWeek(clDate, iLastYear, oLocale, vCalendarWeekNumbering);
        oNextFirstDay = getFirstDayOfFirstWeek(clDate, iNextYear, oLocale, vCalendarWeekNumbering);
        if (oDate >= oNextFirstDay) {
            iYear = iNextYear;
            iWeek = 0;
        } else if (oDate < oFirstDay) {
            iYear = iLastYear;
            iWeek = calculateWeeks(oLastFirstDay, oDate);
        } else {
            iWeek = calculateWeeks(oFirstDay, oDate);
        }
    }
    return {
        year: iYear,
        week: iWeek
    };
};
UniversalDate$1.getFirstDateOfWeek = function (sCalendarType, iYear, iWeek, oLocale, vCalendarWeekNumbering) {
    vCalendarWeekNumbering = vCalendarWeekNumbering || Configuration.getCalendarWeekNumbering();
    checkWeekConfig(vCalendarWeekNumbering);
    oLocale = oLocale || Configuration.getFormatSettings().getFormatLocale();
    var clDate = this.getClass(sCalendarType);
    var oFirstDay = getFirstDayOfFirstWeek(clDate, iYear, oLocale, vCalendarWeekNumbering);
    var oDate = new clDate(oFirstDay.valueOf() + iWeek * iMillisecondsInWeek);
    var bSplitWeek = isSplitWeek(vCalendarWeekNumbering, oLocale);
    if (bSplitWeek && iWeek === 0 && oFirstDay.getUTCFullYear() < iYear) {
        return {
            year: iYear,
            month: 0,
            day: 1
        };
    }
    return {
        year: oDate.getUTCFullYear(),
        month: oDate.getUTCMonth(),
        day: oDate.getUTCDate()
    };
};
function isSplitWeek(vCalendarWeekNumbering, oLocale) {
    var oLocaleData = LocaleData$1.getInstance(oLocale);
    return (vCalendarWeekNumbering === CalendarWeekNumbering.Default || vCalendarWeekNumbering === CalendarWeekNumbering.WesternTraditional) && oLocaleData.firstDayStartsFirstWeek();
}
function checkWeekConfig(vCalendarWeekNumbering) {
    if (typeof vCalendarWeekNumbering === 'object') {
        if (typeof vCalendarWeekNumbering.firstDayOfWeek !== 'number' || typeof vCalendarWeekNumbering.minimalDaysInFirstWeek !== 'number') {
            throw new TypeError('Week config requires firstDayOfWeek and minimalDaysInFirstWeek to be set');
        }
    } else if (!Object.values(CalendarWeekNumbering).includes(vCalendarWeekNumbering)) {
        throw new TypeError('Illegal format option calendarWeekNumbering: \'' + vCalendarWeekNumbering + '\'');
    }
}
function resolveCalendarWeekConfiguration(vCalendarWeekNumbering, oLocale) {
    if (typeof vCalendarWeekNumbering === 'object' && typeof vCalendarWeekNumbering.firstDayOfWeek === 'number' && typeof vCalendarWeekNumbering.minimalDaysInFirstWeek === 'number') {
        return vCalendarWeekNumbering;
    }
    return CalendarUtils.getWeekConfigurationValues(vCalendarWeekNumbering, oLocale);
}
function getFirstDayOfFirstWeek(clDate, iYear, oLocale, vCalendarWeekNumbering) {
    oLocale = oLocale || Configuration.getFormatSettings().getFormatLocale();
    var oWeekConfig = resolveCalendarWeekConfiguration(vCalendarWeekNumbering, oLocale);
    var iMinDays = oWeekConfig.minimalDaysInFirstWeek;
    var iFirstDayOfWeek = oWeekConfig.firstDayOfWeek;
    var oFirstDay = new clDate(clDate.UTC(iYear, 0, 1));
    var iDayCount = 7;
    if (isNaN(oFirstDay.getTime())) {
        throw new Error('Could not determine the first day of the week, because the date ' + 'object is invalid');
    }
    while (oFirstDay.getUTCDay() !== iFirstDayOfWeek) {
        oFirstDay.setUTCDate(oFirstDay.getUTCDate() - 1);
        iDayCount--;
    }
    if (iDayCount < iMinDays) {
        oFirstDay.setUTCDate(oFirstDay.getUTCDate() + 7);
    }
    return oFirstDay;
}
function calculateWeeks(oFromDate, oToDate) {
    return Math.floor((oToDate.valueOf() - oFromDate.valueOf()) / iMillisecondsInWeek);
}
var mEras = {};
UniversalDate$1.getEraByDate = function (sCalendarType, iYear, iMonth, iDay) {
    var aEras = getEras(sCalendarType), iTimestamp = new Date(0).setUTCFullYear(iYear, iMonth, iDay), oEra;
    for (var i = aEras.length - 1; i >= 0; i--) {
        oEra = aEras[i];
        if (!oEra) {
            continue;
        }
        if (oEra._start && iTimestamp >= oEra._startInfo.timestamp) {
            return i;
        }
        if (oEra._end && iTimestamp < oEra._endInfo.timestamp) {
            return i;
        }
    }
};
UniversalDate$1.getCurrentEra = function (sCalendarType) {
    var oNow = UI5Date$1.getInstance();
    return this.getEraByDate(sCalendarType, oNow.getFullYear(), oNow.getMonth(), oNow.getDate());
};
UniversalDate$1.getEraStartDate = function (sCalendarType, iEra) {
    var aEras = getEras(sCalendarType), oEra = aEras[iEra] || aEras[0];
    if (oEra._start) {
        return oEra._startInfo;
    }
};
function getEras(sCalendarType) {
    var oLocale = Configuration.getFormatSettings().getFormatLocale(), oLocaleData = LocaleData$1.getInstance(oLocale), aEras = mEras[sCalendarType];
    if (!aEras) {
        var aEras = oLocaleData.getEraDates(sCalendarType);
        if (!aEras[0]) {
            aEras[0] = { _start: '1-1-1' };
        }
        for (var i = 0; i < aEras.length; i++) {
            var oEra = aEras[i];
            if (!oEra) {
                continue;
            }
            if (oEra._start) {
                oEra._startInfo = parseDateString(oEra._start);
            }
            if (oEra._end) {
                oEra._endInfo = parseDateString(oEra._end);
            }
        }
        mEras[sCalendarType] = aEras;
    }
    return aEras;
}
function parseDateString(sDateString) {
    var aParts = sDateString.split('-'), iYear, iMonth, iDay;
    if (aParts[0] == '') {
        iYear = -parseInt(aParts[1]);
        iMonth = parseInt(aParts[2]) - 1;
        iDay = parseInt(aParts[3]);
    } else {
        iYear = parseInt(aParts[0]);
        iMonth = parseInt(aParts[1]) - 1;
        iDay = parseInt(aParts[2]);
    }
    return {
        timestamp: new Date(0).setUTCFullYear(iYear, iMonth, iDay),
        year: iYear,
        month: iMonth,
        day: iDay
    };
}

// @ts-ignore
const UniversalDate = UniversalDate$1;

let CalendarDate$1 = class CalendarDate {
    constructor(year, month, date, calendarType) {
        let aArgs = arguments, // eslint-disable-line
        oJSDate, oNow, sCalendarType;
        switch (aArgs.length) {
            case 0: // defaults to the current date
                oNow = UI5Date.getInstance();
                return this.constructor(oNow.getFullYear(), oNow.getMonth(), oNow.getDate());
            case 1: // CalendarDate
            case 2: // CalendarDate, sCalendarType
                if (!(aArgs[0] instanceof CalendarDate)) {
                    throw new Error("Invalid arguments: the first argument must be of type CalendarDate.");
                }
                sCalendarType = aArgs[1] ? aArgs[1] : aArgs[0]._oUDate.sCalendarType;
                // Use source.valueOf() (returns the same point of time regardless calendar type) instead of
                // source's getters to avoid non-gregorian Year, Month and Date may be used to construct a Gregorian date
                oJSDate = UI5Date.getInstance(aArgs[0].valueOf());
                // Make this date really local. Now getters are safe.
                oJSDate.setFullYear(oJSDate.getUTCFullYear(), oJSDate.getUTCMonth(), oJSDate.getUTCDate());
                oJSDate.setHours(oJSDate.getUTCHours(), oJSDate.getUTCMinutes(), oJSDate.getUTCSeconds(), oJSDate.getUTCMilliseconds());
                this._oUDate = createUniversalUTCDate(oJSDate, sCalendarType);
                break;
            case 3: // year, month, date
            case 4: // year, month, date, sCalendarType
                checkNumericLike(aArgs[0], `Invalid year: ${aArgs[0]}`);
                checkNumericLike(aArgs[1], `Invalid month: ${aArgs[1]}`);
                checkNumericLike(aArgs[2], `Invalid date: ${aArgs[2]}`);
                oJSDate = UI5Date.getInstance(0, 0, 1);
                oJSDate.setFullYear(aArgs[0], aArgs[1], aArgs[2]); // 2 digits year is not supported. If so, it is considered as full year as well.
                if (aArgs[3]) {
                    sCalendarType = aArgs[3];
                }
                this._oUDate = createUniversalUTCDate(oJSDate, sCalendarType);
                break;
            default:
                throw new Error(`${"Invalid arguments. Accepted arguments are: 1) oCalendarDate, (optional)calendarType"
                    + "or 2) year, month, date, (optional) calendarType"}${aArgs}`);
        }
    }
    getYear() {
        return this._oUDate.getUTCFullYear();
    }
    setYear(year) {
        checkNumericLike(year, `Invalid year: ${year}`);
        this._oUDate.setUTCFullYear(year);
        return this;
    }
    getMonth() {
        return this._oUDate.getUTCMonth();
    }
    /**
     * Sets the given month as ordinal month of the year.
     * @param {int} month An integer between 0 and 11, representing the months January through December( or their
     * equivalent month names for the given calendar).
     * If the specified value is is outside of the expected range, this method attempts to update the date information
     * accordingly. For example, if 12 is given as a month, the year will be incremented by 1, and 1 will be used for month.
     * @param {int} [date] An integer between 1 and 31, representing the day of the month, but other values are allowed.
     * 0 will result in the previous month's last day.
     * -1 will result in the day before the previous month's last day.
     * 32 will result in:
     * - first day of the next month if the current month has 31 days.
     * - second day of the next month if the current month has 30 days.
     * Other value will result in adding or subtracting days according to the given value.
     * @returns {sap.ui.unified.calendar.CalendarDate} <code>this</code> for method chaining.
     */
    setMonth(month, date) {
        checkNumericLike(month, `Invalid month: ${month}`);
        if (date || date === 0) {
            checkNumericLike(date, `Invalid date: ${date}`);
            this._oUDate.setUTCMonth(month, date);
        }
        else {
            this._oUDate.setUTCMonth(month);
        }
        return this;
    }
    getDate() {
        return this._oUDate.getUTCDate();
    }
    setDate(date) {
        checkNumericLike(date, `Invalid date: ${date}`);
        this._oUDate.setUTCDate(date);
        return this;
    }
    getDay() {
        return this._oUDate.getUTCDay();
    }
    getCalendarType() {
        return this._oUDate.sCalendarType;
    }
    isBefore(oCalendarDate) {
        checkCalendarDate(oCalendarDate);
        return this.valueOf() < oCalendarDate.valueOf();
    }
    isAfter(oCalendarDate) {
        checkCalendarDate(oCalendarDate);
        return this.valueOf() > oCalendarDate.valueOf();
    }
    isSameOrBefore(oCalendarDate) {
        checkCalendarDate(oCalendarDate);
        return this.valueOf() <= oCalendarDate.valueOf();
    }
    isSameOrAfter(oCalendarDate) {
        checkCalendarDate(oCalendarDate);
        return this.valueOf() >= oCalendarDate.valueOf();
    }
    isSame(oCalendarDate) {
        checkCalendarDate(oCalendarDate);
        return this.valueOf() === oCalendarDate.valueOf();
    }
    toLocalJSDate() {
        // Use this._oUDate.getTime()(returns the same point of time regardless calendar type)  instead of
        // this._oUDate's getters to avoid non-gregorian Year, Month and Date to be used to construct a Gregorian date
        const oLocalDate = UI5Date.getInstance(this._oUDate.getTime());
        // Make this date really local. Now getters are safe.
        oLocalDate.setFullYear(oLocalDate.getUTCFullYear(), oLocalDate.getUTCMonth(), oLocalDate.getUTCDate());
        oLocalDate.setHours(0, 0, 0, 0);
        return oLocalDate;
    }
    toUTCJSDate() {
        // Use this._oUDate.getTime()(returns the same point of time regardless calendar type)  instead of
        // this._oUDate's getters to avoid non-gregorian Year, Month and Date to be used to construct a Gregorian date
        const oUTCDate = UI5Date.getInstance(this._oUDate.getTime());
        oUTCDate.setUTCHours(0, 0, 0, 0);
        return oUTCDate;
    }
    toString() {
        return `${this._oUDate.sCalendarType}: ${this.getYear()}/${this.getMonth() + 1}/${this.getDate()}`;
    }
    valueOf() {
        return this._oUDate.getTime();
    }
    static fromLocalJSDate(oJSDate, sCalendarType) {
        // Cross frame check for a date should be performed here otherwise setDateValue would fail in OPA tests
        // because Date object in the test is different than the Date object in the application (due to the iframe).
        // We can use jQuery.type or this method:
        function isValidDate(date) {
            return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date); // eslint-disable-line
        }
        if (!isValidDate(oJSDate)) {
            throw new Error(`Date parameter must be a JavaScript Date object: [${oJSDate}].`);
        }
        return new CalendarDate(oJSDate.getFullYear(), oJSDate.getMonth(), oJSDate.getDate(), sCalendarType);
    }
    static fromTimestamp(iTimestamp, sCalendarType) {
        const oCalDate = new CalendarDate(0, 0, 1);
        let oUDate;
        try {
            oUDate = UniversalDate.getInstance(UI5Date.getInstance(iTimestamp), sCalendarType);
        }
        catch (e) {
            oUDate = new Date(NaN); // UniversalDate.getInstance may now throw an Exception - keep the old behavior
        }
        oCalDate._oUDate = oUDate;
        return oCalDate;
    }
};
function createUniversalUTCDate(oDate, sCalendarType) {
    if (sCalendarType) {
        return UniversalDate.getInstance(createUTCDate(oDate), sCalendarType);
    }
    return new UniversalDate(createUTCDate(oDate).getTime());
}
/**
 * Creates a JavaScript UTC Date corresponding to the given JavaScript Date.
 * @param {Date} oDate JavaScript date object. Time related information is cut.
 * @returns {Date} JavaScript date created from the date object, but this time considered as UTC date information.
 */
function createUTCDate(oDate) {
    const oUTCDate = new Date(Date.UTC(0, 0, 1)); // no need to replace with UI5Date as we are creating a new UTC date object
    oUTCDate.setUTCFullYear(oDate.getFullYear(), oDate.getMonth(), oDate.getDate());
    return oUTCDate;
}
function checkCalendarDate(oCalendarDate) {
    if (!(oCalendarDate instanceof CalendarDate$1)) {
        throw new Error(`Invalid calendar date: [${oCalendarDate}]. Expected: CalendarDate`);
    }
}
/**
 * Verifies the given value is numeric like, i.e. 3, "3" and throws an error if it is not.
 * @param {any} value The value of any type to check. If null or undefined, this method throws an error.
 * @param {string} message The message to be used if an error is to be thrown
 * @throws will throw an error if the value is null or undefined or is not like a number
 */
function checkNumericLike(value, message) {
    if (value === undefined || value === Infinity || isNaN(value)) { // eslint-disable-line
        throw message;
    }
}

/**
 * Adds or subtracts a given amount of days/months/years from a date.
 * If minDate or maxDate are given, the result will be enforced within these limits
 *
 * @param date CalendarDate instance
 * @param amount how many days/months/years to add (can be a negative number)
 * @param unit what to modify: "day", "month" or "year"
 * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
 * @param minDate minimum date to enforce
 * @param maxDate maximum date to enforce
 */
const modifyDateBy = (date, amount, unit, preserveDate = true, minDate, maxDate) => {
    const newDate = new CalendarDate$1(date);
    switch (unit) {
        case "day":
            newDate.setDate(date.getDate() + amount);
            break;
        case "month":
            if (preserveDate) {
                newDate.setMonth(date.getMonth() + amount);
                const stillSameMonth = amount === -1 && newDate.getMonth() === date.getMonth(); // f.e. PageUp remained in the same month
                const monthSkipped = amount === 1 && newDate.getMonth() - date.getMonth() > 1; // f.e. PageDown skipped a whole month
                if (stillSameMonth || monthSkipped) { // Select the last day of the month in any of these 2 scenarios
                    newDate.setDate(0);
                }
            }
            else {
                if (amount === 1) {
                    newDate.setMonth(newDate.getMonth() + 1, 1);
                }
                if (amount === -1) {
                    newDate.setDate(0);
                }
            }
            break;
        case "year":
            newDate.setYear(date.getYear() + amount);
            if (newDate.getMonth() !== date.getMonth()) { // f.e. 29th Feb to next/prev year
                newDate.setDate(0); // Select the last day of the month
            }
            break;
    }
    if (minDate && newDate.isBefore(minDate)) {
        return new CalendarDate$1(minDate);
    }
    if (maxDate && newDate.isAfter(maxDate)) {
        return new CalendarDate$1(maxDate);
    }
    return newDate;
};

/**
 * Returns a timestamp with only the year, month and day (with zero hours, minutes and seconds) and without 000 for milliseconds
 * @param { number } millisecondsUTC
 * @returns { number }
 */
const getRoundedTimestamp = (millisecondsUTC) => {
    if (!millisecondsUTC) {
        // no need to replace with UI5Date, as we don't use any non-UTC functions
        millisecondsUTC = new Date().getTime();
    }
    const rounded = millisecondsUTC - (millisecondsUTC % (24 * 60 * 60 * 1000));
    return rounded / 1000;
};

/**
 * Returns a UTC timestamp representing today
 * @public
 */
const getTodayUTCTimestamp = (primaryCalendarType) => CalendarDate$1.fromLocalJSDate(UI5Date.getInstance(), primaryCalendarType).valueOf() / 1000;

/**
 * Different types of ValueStates.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.ValueState
 */
var ValueState;
(function (ValueState) {
    /**
     *
     * @public
     * @type {None}
     */
    ValueState["None"] = "None";
    /**
     *
     * @public
     * @type {Success}
     */
    ValueState["Success"] = "Success";
    /**
     *
     * @public
     * @type {Warning}
     */
    ValueState["Warning"] = "Warning";
    /**
     *
     * @public
     * @type {Error}
     */
    ValueState["Error"] = "Error";
    /**
     *
     * @public
     * @type {Information}
     */
    ValueState["Information"] = "Information";
})(ValueState || (ValueState = {}));
var ValueState$1 = ValueState;

const associatedElements = new WeakMap();
const registeredElements = new WeakMap();
const observerOptions = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
};
const getEffectiveAriaLabelText = (el) => {
    const accessibleEl = el;
    if (!accessibleEl.accessibleNameRef) {
        if (accessibleEl.accessibleName) {
            return accessibleEl.accessibleName;
        }
        return undefined;
    }
    return getAllAccessibleNameRefTexts(el);
};
/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 */
const getAllAccessibleNameRefTexts = (el) => {
    const ids = el.accessibleNameRef?.split(" ") ?? [];
    const owner = el.getRootNode();
    let result = "";
    ids.forEach((elementId, index) => {
        const element = owner.querySelector(`[id='${elementId}']`);
        const text = `${element && element.textContent ? element.textContent : ""}`;
        if (text) {
            result += text;
            if (index < ids.length - 1) {
                result += " ";
            }
        }
    });
    return result;
};
const _getAllAssociatedElementsFromDOM = (el) => {
    const set = new Set();
    // adding labels with attribute for matching the el.id
    const labelsForAssociated = _getAssociatedLabels(el);
    labelsForAssociated.forEach(itm => {
        set.add(itm);
    });
    // adding other elements that id is the same as accessibleNameRef value
    const value = el["accessibleNameRef"];
    const ids = value?.split(" ") ?? [];
    ids.forEach(id => {
        const refEl = _getReferencedElementById(el, id);
        if (refEl) {
            set.add(refEl);
        }
    });
    return Array.from(set);
};
const _getAssociatedLabels = (el) => {
    const labels = el.getRootNode().querySelectorAll(`[for="${el.id}"]`);
    return Array.from(labels);
};
const _getReferencedElementById = (el, elementId) => {
    return el.getRootNode().querySelector(`[id='${elementId}']`);
};
/**
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related "label for" texts
 */
const getAssociatedLabelForTexts = (el) => {
    const results = [];
    const labels = _getAssociatedLabels(el);
    labels.forEach((label) => {
        const labelText = label.textContent;
        labelText && results.push(labelText);
    });
    if (results.length) {
        return results.join(" ");
    }
    return undefined;
};
const _createInvalidationCallback = (el) => {
    const invalidationCallback = (changeInfo) => {
        if (!(changeInfo && changeInfo.type === "property" && changeInfo.name === "accessibleNameRef")) {
            return;
        }
        const registeredElement = registeredElements.get(el);
        if (!registeredElement) {
            return;
        }
        const oldAssociatedElements = registeredElement.observedElements;
        const newAssociatedElements = _getAllAssociatedElementsFromDOM(el);
        oldAssociatedElements.forEach(oldElement => {
            if (!newAssociatedElements.includes(oldElement)) {
                _removeObservedElementFromRegisteredElement(registeredElement, oldElement);
            }
        });
        newAssociatedElements.forEach(newElement => {
            if (!oldAssociatedElements.includes(newElement)) {
                _addObservedElementToRegisteredElement(registeredElement, newElement);
                registeredElement.observedElements.push(newElement);
            }
        });
        registeredElement?.callback();
    };
    return invalidationCallback;
};
const registerUI5Element = (el, callback) => {
    if (registeredElements.has(el)) {
        return;
    }
    const allAssociatedElements = _getAllAssociatedElementsFromDOM(el);
    const invalidationCallback = _createInvalidationCallback(el);
    const registeredElement = {
        host: el,
        observedElements: allAssociatedElements,
        callback,
        invalidationCallback,
    };
    registeredElements.set(el, registeredElement);
    el.attachInvalidate(invalidationCallback);
    allAssociatedElements.forEach((element) => {
        _addObservedElementToRegisteredElement(registeredElement, element);
    });
    callback();
};
const _addObservedElementToRegisteredElement = (registeredElement, element) => {
    let associatedElement = associatedElements.get(element);
    if (!associatedElement) {
        associatedElement = { observer: null, callbacks: [] };
        const observer = new MutationObserver(() => {
            const callbacks = associatedElement.callbacks;
            callbacks.forEach(callback => {
                callback();
            });
            const domEl = document.getElementById(element.id);
            // if no longer should be observed from this registeredElement, remove it
            if (!(registeredElement.host.id === element.getAttribute("for") || domEl)) {
                _removeObservedElementFromRegisteredElement(registeredElement, element);
            }
        });
        associatedElement.observer = observer;
        observer.observe(element, observerOptions);
        associatedElements.set(element, associatedElement);
    }
    if (!associatedElement.callbacks.includes(registeredElement.callback)) {
        associatedElement.callbacks.push(registeredElement.callback);
    }
};
const _removeObservedElementFromRegisteredElement = (registeredElement, element) => {
    const associatedElement = associatedElements.get(element);
    if (associatedElement) {
        associatedElement.callbacks = associatedElement.callbacks.filter(itm => itm !== registeredElement.callback);
        if (!associatedElement.callbacks.length) {
            associatedElement.observer?.disconnect();
            associatedElements.delete(element);
        }
    }
    registeredElement.observedElements = registeredElement.observedElements.filter(itm => itm !== element);
};
const deregisterUI5Element = (el) => {
    const registeredElement = registeredElements.get(el);
    if (!registeredElement) {
        return;
    }
    const oldObservedElements = [...registeredElement.observedElements];
    oldObservedElements.forEach(observedElement => {
        _removeObservedElementFromRegisteredElement(registeredElement, observedElement);
    });
    el.detachInvalidate(registeredElement.invalidationCallback);
    registeredElements.delete(el);
};

var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["BACKSPACE"] = 8] = "BACKSPACE";
    KeyCodes[KeyCodes["TAB"] = 9] = "TAB";
    KeyCodes[KeyCodes["ENTER"] = 13] = "ENTER";
    KeyCodes[KeyCodes["SHIFT"] = 16] = "SHIFT";
    KeyCodes[KeyCodes["CONTROL"] = 17] = "CONTROL";
    KeyCodes[KeyCodes["ALT"] = 18] = "ALT";
    KeyCodes[KeyCodes["BREAK"] = 19] = "BREAK";
    KeyCodes[KeyCodes["CAPS_LOCK"] = 20] = "CAPS_LOCK";
    KeyCodes[KeyCodes["ESCAPE"] = 27] = "ESCAPE";
    KeyCodes[KeyCodes["SPACE"] = 32] = "SPACE";
    KeyCodes[KeyCodes["PAGE_UP"] = 33] = "PAGE_UP";
    KeyCodes[KeyCodes["PAGE_DOWN"] = 34] = "PAGE_DOWN";
    KeyCodes[KeyCodes["END"] = 35] = "END";
    KeyCodes[KeyCodes["HOME"] = 36] = "HOME";
    KeyCodes[KeyCodes["ARROW_LEFT"] = 37] = "ARROW_LEFT";
    KeyCodes[KeyCodes["ARROW_UP"] = 38] = "ARROW_UP";
    KeyCodes[KeyCodes["ARROW_RIGHT"] = 39] = "ARROW_RIGHT";
    KeyCodes[KeyCodes["ARROW_DOWN"] = 40] = "ARROW_DOWN";
    KeyCodes[KeyCodes["PRINT"] = 44] = "PRINT";
    KeyCodes[KeyCodes["INSERT"] = 45] = "INSERT";
    KeyCodes[KeyCodes["DELETE"] = 46] = "DELETE";
    KeyCodes[KeyCodes["DIGIT_0"] = 48] = "DIGIT_0";
    KeyCodes[KeyCodes["DIGIT_1"] = 49] = "DIGIT_1";
    KeyCodes[KeyCodes["DIGIT_2"] = 50] = "DIGIT_2";
    KeyCodes[KeyCodes["DIGIT_3"] = 51] = "DIGIT_3";
    KeyCodes[KeyCodes["DIGIT_4"] = 52] = "DIGIT_4";
    KeyCodes[KeyCodes["DIGIT_5"] = 53] = "DIGIT_5";
    KeyCodes[KeyCodes["DIGIT_6"] = 54] = "DIGIT_6";
    KeyCodes[KeyCodes["DIGIT_7"] = 55] = "DIGIT_7";
    KeyCodes[KeyCodes["DIGIT_8"] = 56] = "DIGIT_8";
    KeyCodes[KeyCodes["DIGIT_9"] = 57] = "DIGIT_9";
    KeyCodes[KeyCodes["A"] = 65] = "A";
    KeyCodes[KeyCodes["B"] = 66] = "B";
    KeyCodes[KeyCodes["C"] = 67] = "C";
    KeyCodes[KeyCodes["D"] = 68] = "D";
    KeyCodes[KeyCodes["E"] = 69] = "E";
    KeyCodes[KeyCodes["F"] = 70] = "F";
    KeyCodes[KeyCodes["G"] = 71] = "G";
    KeyCodes[KeyCodes["H"] = 72] = "H";
    KeyCodes[KeyCodes["I"] = 73] = "I";
    KeyCodes[KeyCodes["J"] = 74] = "J";
    KeyCodes[KeyCodes["K"] = 75] = "K";
    KeyCodes[KeyCodes["L"] = 76] = "L";
    KeyCodes[KeyCodes["M"] = 77] = "M";
    KeyCodes[KeyCodes["N"] = 78] = "N";
    KeyCodes[KeyCodes["O"] = 79] = "O";
    KeyCodes[KeyCodes["P"] = 80] = "P";
    KeyCodes[KeyCodes["Q"] = 81] = "Q";
    KeyCodes[KeyCodes["R"] = 82] = "R";
    KeyCodes[KeyCodes["S"] = 83] = "S";
    KeyCodes[KeyCodes["T"] = 84] = "T";
    KeyCodes[KeyCodes["U"] = 85] = "U";
    KeyCodes[KeyCodes["V"] = 86] = "V";
    KeyCodes[KeyCodes["W"] = 87] = "W";
    KeyCodes[KeyCodes["X"] = 88] = "X";
    KeyCodes[KeyCodes["Y"] = 89] = "Y";
    KeyCodes[KeyCodes["Z"] = 90] = "Z";
    KeyCodes[KeyCodes["WINDOWS"] = 91] = "WINDOWS";
    KeyCodes[KeyCodes["CONTEXT_MENU"] = 93] = "CONTEXT_MENU";
    KeyCodes[KeyCodes["TURN_OFF"] = 94] = "TURN_OFF";
    KeyCodes[KeyCodes["SLEEP"] = 95] = "SLEEP";
    KeyCodes[KeyCodes["NUMPAD_0"] = 96] = "NUMPAD_0";
    KeyCodes[KeyCodes["NUMPAD_1"] = 97] = "NUMPAD_1";
    KeyCodes[KeyCodes["NUMPAD_2"] = 98] = "NUMPAD_2";
    KeyCodes[KeyCodes["NUMPAD_3"] = 99] = "NUMPAD_3";
    KeyCodes[KeyCodes["NUMPAD_4"] = 100] = "NUMPAD_4";
    KeyCodes[KeyCodes["NUMPAD_5"] = 101] = "NUMPAD_5";
    KeyCodes[KeyCodes["NUMPAD_6"] = 102] = "NUMPAD_6";
    KeyCodes[KeyCodes["NUMPAD_7"] = 103] = "NUMPAD_7";
    KeyCodes[KeyCodes["NUMPAD_8"] = 104] = "NUMPAD_8";
    KeyCodes[KeyCodes["NUMPAD_9"] = 105] = "NUMPAD_9";
    KeyCodes[KeyCodes["NUMPAD_ASTERISK"] = 106] = "NUMPAD_ASTERISK";
    KeyCodes[KeyCodes["NUMPAD_PLUS"] = 107] = "NUMPAD_PLUS";
    KeyCodes[KeyCodes["NUMPAD_MINUS"] = 109] = "NUMPAD_MINUS";
    KeyCodes[KeyCodes["NUMPAD_COMMA"] = 110] = "NUMPAD_COMMA";
    KeyCodes[KeyCodes["NUMPAD_SLASH"] = 111] = "NUMPAD_SLASH";
    KeyCodes[KeyCodes["F1"] = 112] = "F1";
    KeyCodes[KeyCodes["F2"] = 113] = "F2";
    KeyCodes[KeyCodes["F3"] = 114] = "F3";
    KeyCodes[KeyCodes["F4"] = 115] = "F4";
    KeyCodes[KeyCodes["F5"] = 116] = "F5";
    KeyCodes[KeyCodes["F6"] = 117] = "F6";
    KeyCodes[KeyCodes["F7"] = 118] = "F7";
    KeyCodes[KeyCodes["F8"] = 119] = "F8";
    KeyCodes[KeyCodes["F9"] = 120] = "F9";
    KeyCodes[KeyCodes["F10"] = 121] = "F10";
    KeyCodes[KeyCodes["F11"] = 122] = "F11";
    KeyCodes[KeyCodes["F12"] = 123] = "F12";
    KeyCodes[KeyCodes["NUM_LOCK"] = 144] = "NUM_LOCK";
    KeyCodes[KeyCodes["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
    KeyCodes[KeyCodes["COLON"] = 186] = "COLON";
    KeyCodes[KeyCodes["PLUS"] = 187] = "PLUS";
    KeyCodes[KeyCodes["COMMA"] = 188] = "COMMA";
    KeyCodes[KeyCodes["SLASH"] = 189] = "SLASH";
    KeyCodes[KeyCodes["DOT"] = 190] = "DOT";
    KeyCodes[KeyCodes["PIPE"] = 191] = "PIPE";
    KeyCodes[KeyCodes["SEMICOLON"] = 192] = "SEMICOLON";
    KeyCodes[KeyCodes["MINUS"] = 219] = "MINUS";
    KeyCodes[KeyCodes["GREAT_ACCENT"] = 220] = "GREAT_ACCENT";
    KeyCodes[KeyCodes["EQUALS"] = 221] = "EQUALS";
    KeyCodes[KeyCodes["SINGLE_QUOTE"] = 222] = "SINGLE_QUOTE";
    KeyCodes[KeyCodes["BACKSLASH"] = 226] = "BACKSLASH";
})(KeyCodes || (KeyCodes = {}));
const isEnter = (event) => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);
const isEnterShift = (event) => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && checkModifierKeys(event, false, false, true);
const isSpace = (event) => (event.key ? (event.key === "Spacebar" || event.key === " ") : event.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event);
const isSpaceShift = (event) => (event.key ? (event.key === "Spacebar" || event.key === " ") : event.keyCode === KeyCodes.SPACE) && checkModifierKeys(event, false, false, true);
const isLeft = (event) => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && !hasModifierKeys(event);
const isRight = (event) => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && !hasModifierKeys(event);
const isUp = (event) => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && !hasModifierKeys(event);
const isDown = (event) => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && !hasModifierKeys(event);
const isUpShift = (event) => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, false, false, true);
const isDownShift = (event) => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, false, false, true);
const isLeftShift = (event) => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && checkModifierKeys(event, false, false, true);
const isRightShift = (event) => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && checkModifierKeys(event, false, false, true);
const isHome = (event) => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && !hasModifierKeys(event);
const isEnd = (event) => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && !hasModifierKeys(event);
const isHomeCtrl = (event) => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && checkModifierKeys(event, true, false, false);
const isEndCtrl = (event) => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && checkModifierKeys(event, true, false, false);
const isEscape = (event) => (event.key ? event.key === "Escape" || event.key === "Esc" : event.keyCode === KeyCodes.ESCAPE) && !hasModifierKeys(event);
const isTabNext = (event) => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && !hasModifierKeys(event);
const isTabPrevious = (event) => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ false, /* Shift */ true);
const isBackSpace = (event) => (event.key ? event.key === "Backspace" : event.keyCode === KeyCodes.BACKSPACE) && !hasModifierKeys(event);
const isDelete = (event) => (event.key ? event.key === "Delete" : event.keyCode === KeyCodes.DELETE) && !hasModifierKeys(event);
const isPageUp = (event) => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && !hasModifierKeys(event);
const isPageDown = (event) => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && !hasModifierKeys(event);
const isPageUpShift = (event) => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && checkModifierKeys(event, false, false, true);
const isPageUpAlt = (event) => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && checkModifierKeys(event, false, true, false);
const isPageDownShift = (event) => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && checkModifierKeys(event, false, false, true);
const isPageDownAlt = (event) => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && checkModifierKeys(event, false, true, false);
const isPageUpShiftCtrl = (event) => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && checkModifierKeys(event, true, false, true);
const isPageDownShiftCtrl = (event) => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && checkModifierKeys(event, true, false, true);
const isShow = (event) => {
    if (event.key) {
        return isF4(event) || isShowByArrows(event);
    }
    return (event.keyCode === KeyCodes.F4 && !hasModifierKeys(event)) || (event.keyCode === KeyCodes.ARROW_DOWN && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false));
};
const isF4 = (event) => {
    return event.key === "F4" && !hasModifierKeys(event);
};
const isF4Shift = (event) => (event.key ? event.key === "F4" : event.keyCode === KeyCodes.F4) && checkModifierKeys(event, false, false, true);
const isF6Next = (event) => ((event.key ? event.key === "F6" : event.keyCode === KeyCodes.F6) && checkModifierKeys(event, false, false, false))
    || ((event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, true, true, false));
const isF6Previous = (event) => ((event.key ? event.key === "F6" : event.keyCode === KeyCodes.F6) && checkModifierKeys(event, false, false, true))
    || ((event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, true, true, false));
const isShowByArrows = (event) => {
    return ((event.key === "ArrowDown" || event.key === "Down") || (event.key === "ArrowUp" || event.key === "Up")) && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false);
};
const hasModifierKeys = (event) => event.shiftKey || event.altKey || getCtrlKey(event);
const getCtrlKey = (event) => !!(event.metaKey || event.ctrlKey); // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.
const checkModifierKeys = (event, bCtrlKey, bAltKey, bShiftKey) => event.shiftKey === bShiftKey && event.altKey === bAltKey && getCtrlKey(event) === bCtrlKey;

const isSSR = typeof document === "undefined";
const internals = {
    get userAgent() {
        if (isSSR) {
            return "";
        }
        return navigator.userAgent;
    },
    get touch() {
        if (isSSR) {
            return false;
        }
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    },
    get ie() {
        if (isSSR) {
            return false;
        }
        return /(msie|trident)/i.test(internals.userAgent);
    },
    get chrome() {
        if (isSSR) {
            return false;
        }
        return !internals.ie && /(Chrome|CriOS)/.test(internals.userAgent);
    },
    get firefox() {
        if (isSSR) {
            return false;
        }
        return /Firefox/.test(internals.userAgent);
    },
    get safari() {
        if (isSSR) {
            return false;
        }
        return !internals.ie && !internals.chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(internals.userAgent);
    },
    get webkit() {
        if (isSSR) {
            return false;
        }
        return !internals.ie && /webkit/.test(internals.userAgent);
    },
    get windows() {
        if (isSSR) {
            return false;
        }
        return navigator.platform.indexOf("Win") !== -1;
    },
    get macOS() {
        if (isSSR) {
            return false;
        }
        return !!navigator.userAgent.match(/Macintosh|Mac OS X/i);
    },
    get iOS() {
        if (isSSR) {
            return false;
        }
        return !!(navigator.platform.match(/iPhone|iPad|iPod/)) || !!(internals.userAgent.match(/Mac/) && "ontouchend" in document);
    },
    get android() {
        if (isSSR) {
            return false;
        }
        return !internals.windows && /Android/.test(internals.userAgent);
    },
    get androidPhone() {
        if (isSSR) {
            return false;
        }
        return internals.android && /(?=android)(?=.*mobile)/i.test(internals.userAgent);
    },
    get ipad() {
        if (isSSR) {
            return false;
        }
        // With iOS 13 the string 'iPad' was removed from the user agent string through a browser setting, which is applied on all sites by default:
        // "Request Desktop Website -> All websites" (for more infos see: https://forums.developer.apple.com/thread/119186).
        // Therefore the OS is detected as MACINTOSH instead of iOS and the device is a tablet if the Device.support.touch is true.
        return /ipad/i.test(internals.userAgent) || (/Macintosh/i.test(internals.userAgent) && "ontouchend" in document);
    },
};
let windowsVersion;
let webkitVersion;
let tablet;
const isWindows8OrAbove = () => {
    if (isSSR) {
        return false;
    }
    if (!internals.windows) {
        return false;
    }
    if (windowsVersion === undefined) {
        const matches = internals.userAgent.match(/Windows NT (\d+).(\d)/);
        windowsVersion = matches ? parseFloat(matches[1]) : 0;
    }
    return windowsVersion >= 8;
};
const isWebkit537OrAbove = () => {
    if (isSSR) {
        return false;
    }
    if (!internals.webkit) {
        return false;
    }
    if (webkitVersion === undefined) {
        const matches = internals.userAgent.match(/(webkit)[ /]([\w.]+)/);
        webkitVersion = matches ? parseFloat(matches[1]) : 0;
    }
    return webkitVersion >= 537.10;
};
const detectTablet = () => {
    if (isSSR) {
        return false;
    }
    if (tablet !== undefined) {
        return;
    }
    if (internals.ipad) {
        tablet = true;
        return;
    }
    if (internals.touch) {
        if (isWindows8OrAbove()) {
            tablet = true;
            return;
        }
        if (internals.chrome && internals.android) {
            tablet = !/Mobile Safari\/[.0-9]+/.test(internals.userAgent);
            return;
        }
        let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1; // may be undefined in Windows Phone devices
        if (internals.android && isWebkit537OrAbove()) {
            densityFactor = 1;
        }
        tablet = (Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600);
        return;
    }
    tablet = (internals.ie && internals.userAgent.indexOf("Touch") !== -1) || (internals.android && !internals.androidPhone);
};
const isSafari = () => internals.safari;
const isChrome = () => internals.chrome;
const isTablet = () => {
    detectTablet();
    return (internals.touch || isWindows8OrAbove()) && tablet;
};
const isPhone = () => {
    detectTablet();
    return internals.touch && !tablet;
};
const isDesktop = () => {
    if (isSSR) {
        return false;
    }
    return (!isTablet() && !isPhone()) || isWindows8OrAbove();
};
const isCombi = () => {
    return isTablet() && isDesktop();
};
const isIOS = () => {
    return internals.iOS;
};
const isAndroid = () => {
    return internals.android || internals.androidPhone;
};

/**
 * Defines which pickers the calendar is allowed to show - day/month/year, only month/year, or only year.
 *
 * @class
 * @enum {string}
 * @private
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CalendarPickersMode
 */
var CalendarPickersMode;
(function (CalendarPickersMode) {
    /**
     * User can select days, months and years
     * @public
     * @type {DAY_MONTH_YEAR}
     */
    CalendarPickersMode["DAY_MONTH_YEAR"] = "DAY_MONTH_YEAR";
    /**
     * User can select months and years
     * @public
     * @type {MONTH_YEAR}
     */
    CalendarPickersMode["MONTH_YEAR"] = "MONTH_YEAR";
    /**
     * User can select years
     * @public
     * @type {MONTH_YEAR}
     */
    CalendarPickersMode["YEAR"] = "YEAR";
})(CalendarPickersMode || (CalendarPickersMode = {}));
var CalendarPickersMode$1 = CalendarPickersMode;

const eventProvider$2 = new EventProvider();
const THEME_REGISTERED = "themeRegistered";
const attachThemeRegistered = (listener) => {
    eventProvider$2.attachEvent(THEME_REGISTERED, listener);
};
const fireThemeRegistered = (theme) => {
    return eventProvider$2.fireEvent(THEME_REGISTERED, theme);
};

const themeStyles = new Map();
const loaders$2 = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();
const registerThemePropertiesLoader = (packageName, themeName, loader) => {
    loaders$2.set(`${packageName}/${themeName}`, loader);
    registeredPackages.add(packageName);
    registeredThemes.add(themeName);
    fireThemeRegistered(themeName);
};
const getThemeProperties = async (packageName, themeName) => {
    const style = themeStyles.get(`${packageName}_${themeName}`);
    if (style !== undefined) { // it's valid for style to be an empty string
        return style;
    }
    if (!registeredThemes.has(themeName)) {
        const regThemesStr = [...registeredThemes.values()].join(", ");
        console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
        return _getThemeProperties(packageName, DEFAULT_THEME);
    }
    return _getThemeProperties(packageName, themeName);
};
const _getThemeProperties = async (packageName, themeName) => {
    const loader = loaders$2.get(`${packageName}/${themeName}`);
    if (!loader) {
        // no themes for package
        console.error(`Theme [${themeName}] not registered for package [${packageName}]`); /* eslint-disable-line */
        return;
    }
    let data;
    try {
        data = await loader(themeName);
    }
    catch (error) {
        const e = error;
        console.error(packageName, e.message); /* eslint-disable-line */
        return;
    }
    const themeProps = data._ || data; // Refactor: remove _ everywhere
    themeStyles.set(`${packageName}_${themeName}`, themeProps);
    return themeProps;
};
const getRegisteredPackages = () => {
    return registeredPackages;
};
const isThemeRegistered = (theme) => {
    return registeredThemes.has(theme);
};

/**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText, attributes) => {
    const style = document.createElement("style");
    style.type = "text/css";
    if (attributes) {
        Object.entries(attributes).forEach(pair => style.setAttribute(...pair));
    }
    style.textContent = cssText;
    document.head.appendChild(style);
    return style;
};

/**
 * Creates a <link> tag in the <head> tag
 * @param href - the CSS
 * @param attributes - optional attributes to add to the tag
 */
const createLinkInHead = (href, attributes) => {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    if (attributes) {
        Object.entries(attributes).forEach(pair => link.setAttribute(...pair));
    }
    link.href = href;
    document.head.appendChild(link);
    return new Promise(resolve => {
        link.addEventListener("load", resolve);
        link.addEventListener("error", resolve); // intended
    });
};

const getStyleId = (name, value) => {
    return value ? `${name}|${value}` : name;
};
const createStyle = (data, name, value = "") => {
    const content = typeof data === "string" ? data : data.content;
    if (document.adoptedStyleSheets && !isSafari()) {
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(content);
        stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
    }
    else {
        const attributes = {};
        attributes[name] = value;
        createStyleInHead(content, attributes);
    }
};
const updateStyle = (data, name, value = "") => {
    const content = typeof data === "string" ? data : data.content;
    if (document.adoptedStyleSheets && !isSafari()) {
        const stylesheet = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
        if (stylesheet) {
            stylesheet.replaceSync(content || "");
        }
    }
    else {
        const style = document.querySelector(`head>style[${name}="${value}"]`);
        if (style) {
            style.textContent = content || "";
        }
    }
};
const hasStyle = (name, value = "") => {
    if (document.adoptedStyleSheets && !isSafari()) {
        return !!document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
    }
    return !!document.querySelector(`head>style[${name}="${value}"]`);
};
const removeStyle = (name, value = "") => {
    if (document.adoptedStyleSheets && !isSafari()) {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => sh._ui5StyleId !== getStyleId(name, value));
    }
    else {
        const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
        styleElement?.parentElement?.removeChild(styleElement);
    }
};
const createOrUpdateStyle = (data, name, value = "") => {
    if (hasStyle(name, value)) {
        updateStyle(data, name, value);
    }
    else {
        createStyle(data, name, value);
    }
};

const warnings = new Set();
const getThemeMetadata = () => {
    // Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
    let el = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
    if (el) {
        return getComputedStyle(el).backgroundImage;
    }
    el = document.createElement("span");
    el.style.display = "none";
    // Try with sapThemeMetaData-Base-baseLib first
    el.classList.add("sapThemeMetaData-Base-baseLib");
    document.body.appendChild(el);
    let metadata = getComputedStyle(el).backgroundImage;
    // Try with sapThemeMetaData-UI5-sap-ui-core only if the previous selector was not found
    if (metadata === "none") {
        el.classList.add("sapThemeMetaData-UI5-sap-ui-core");
        metadata = getComputedStyle(el).backgroundImage;
    }
    document.body.removeChild(el);
    return metadata;
};
const parseThemeMetadata = (metadataString) => {
    const params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);
    if (params && params.length >= 2) {
        let paramsString = params[1];
        paramsString = paramsString.replace(/\\"/g, `"`);
        if (paramsString.charAt(0) !== "{" && paramsString.charAt(paramsString.length - 1) !== "}") {
            try {
                paramsString = decodeURIComponent(paramsString);
            }
            catch (ex) {
                if (!warnings.has("decode")) {
                    console.warn("Malformed theme metadata string, unable to decodeURIComponent"); // eslint-disable-line
                    warnings.add("decode");
                }
                return;
            }
        }
        try {
            return JSON.parse(paramsString);
        }
        catch (ex) {
            if (!warnings.has("parse")) {
                console.warn("Malformed theme metadata string, unable to parse JSON"); // eslint-disable-line
                warnings.add("parse");
            }
        }
    }
};
const processThemeMetadata = (metadata) => {
    let themeName;
    let baseThemeName;
    try {
        themeName = metadata.Path.match(/\.([^.]+)\.css_variables$/)[1];
        baseThemeName = metadata.Extends[0];
    }
    catch (ex) {
        if (!warnings.has("object")) {
            console.warn("Malformed theme metadata Object", metadata); // eslint-disable-line
            warnings.add("object");
        }
        return;
    }
    return {
        themeName,
        baseThemeName,
    };
};
const getThemeDesignerTheme = () => {
    const metadataString = getThemeMetadata();
    if (!metadataString || metadataString === "none") {
        return;
    }
    const metadata = parseThemeMetadata(metadataString);
    if (metadata) {
        return processThemeMetadata(metadata);
    }
};

const eventProvider$1 = new EventProvider();
const THEME_LOADED = "themeLoaded";
const fireThemeLoaded = (theme) => {
    return eventProvider$1.fireEvent(THEME_LOADED, theme);
};

let currThemeRoot;
/**
 * Returns the current theme root.
 *
 * @public
 * @since 1.14.0
 * @returns { string } the current theme root
 */
const getThemeRoot = () => {
    if (currThemeRoot === undefined) {
        currThemeRoot = getThemeRoot$1();
    }
    return currThemeRoot;
};
const formatThemeLink = (theme) => {
    return `${getThemeRoot()}Base/baseLib/${theme}/css_variables.css`; // theme root is always set at this point.
};
const attachCustomThemeStylesToHead = async (theme) => {
    const link = document.querySelector(`[sap-ui-webcomponents-theme="${theme}"]`);
    if (link) {
        document.head.removeChild(link);
    }
    await createLinkInHead(formatThemeLink(theme), { "sap-ui-webcomponents-theme": theme });
};

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming";
const isThemeBaseRegistered = () => {
    const registeredPackages = getRegisteredPackages();
    return registeredPackages.has(BASE_THEME_PACKAGE);
};
const loadThemeBase = async (theme) => {
    if (!isThemeBaseRegistered()) {
        return;
    }
    const cssData = await getThemeProperties(BASE_THEME_PACKAGE, theme);
    if (cssData) {
        createOrUpdateStyle(cssData, "data-ui5-theme-properties", BASE_THEME_PACKAGE);
    }
};
const deleteThemeBase = () => {
    removeStyle("data-ui5-theme-properties", BASE_THEME_PACKAGE);
};
const loadComponentPackages = async (theme) => {
    const registeredPackages = getRegisteredPackages();
    const packagesStylesPromises = [...registeredPackages].map(async (packageName) => {
        if (packageName === BASE_THEME_PACKAGE) {
            return;
        }
        const cssData = await getThemeProperties(packageName, theme);
        if (cssData) {
            createOrUpdateStyle(cssData, `data-ui5-component-properties-${getCurrentRuntimeIndex()}`, packageName);
        }
    });
    return Promise.all(packagesStylesPromises);
};
const detectExternalTheme = async (theme) => {
    // If theme designer theme is detected, use this
    const extTheme = getThemeDesignerTheme();
    if (extTheme) {
        return extTheme;
    }
    // If OpenUI5Support is enabled, try to find out if it loaded variables
    const openUI5Support = getFeature("OpenUI5Support");
    if (openUI5Support && openUI5Support.isOpenUI5Detected()) {
        const varsLoaded = openUI5Support.cssVariablesLoaded();
        if (varsLoaded) {
            return {
                themeName: openUI5Support.getConfigurationSettingsObject()?.theme,
                baseThemeName: "", // baseThemeName is only relevant for custom themes
            };
        }
    }
    else if (getThemeRoot()) {
        await attachCustomThemeStylesToHead(theme);
        return getThemeDesignerTheme();
    }
};
const applyTheme = async (theme) => {
    const extTheme = await detectExternalTheme(theme);
    // Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded
    if (!extTheme || theme !== extTheme.themeName) {
        await loadThemeBase(theme);
    }
    else {
        deleteThemeBase();
    }
    // Always load component packages properties. For non-registered themes, try with the base theme, if any
    const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
    await loadComponentPackages(packagesTheme || DEFAULT_THEME);
    fireThemeLoaded(theme);
};

let curTheme;
/**
 * Returns the current theme.
 * @public
 * @returns {string} the current theme name
 */
const getTheme = () => {
    if (curTheme === undefined) {
        curTheme = getTheme$1();
    }
    return curTheme;
};
/**
 * Returns if the currently set theme is part of legacy theme families ("sap_belize" or "sap_fiori_3").
 * <b>Note</b>: in addition, the method checks the base theme of a custom theme, built via the ThemeDesigner.
 *
 * @private
 * @returns { boolean }
 */
const isLegacyThemeFamily = () => {
    const currentTheme = getTheme();
    if (!isKnownTheme(currentTheme)) {
        return !getThemeDesignerTheme()?.baseThemeName?.startsWith("sap_horizon");
    }
    return !currentTheme.startsWith("sap_horizon");
};
const isKnownTheme = (theme) => SUPPORTED_THEMES.includes(theme);

/**
 * Supported icon collection aliases.
 *
 * Users might specify a collection, using both the key and the value in the following key-value pairs,
 * e.g the following pairs are completely exchangeable:
 *
 * - "SAP-icons/accept" and "SAP-icons-v4/accept"
 * - "horizon/accept" and "SAP-icons-v5/accept"
 * - "SAP-icons-TNT/actor" and "tnt/actor"
 * - "BusinessSuiteInAppSymbols/3d" and "business-suite/3d"
 */
var IconCollectionsAlias;
(function (IconCollectionsAlias) {
    IconCollectionsAlias["SAP-icons"] = "SAP-icons-v4";
    IconCollectionsAlias["horizon"] = "SAP-icons-v5";
    IconCollectionsAlias["SAP-icons-TNT"] = "tnt";
    IconCollectionsAlias["BusinessSuiteInAppSymbols"] = "business-suite";
})(IconCollectionsAlias || (IconCollectionsAlias = {}));
/**
 * Returns the collection name for a given alias:
 *
 * - "SAP-icons-TNT"resolves to "tnt"
 * - "BusinessSuiteInAppSymbols" resolves to "business-suite"
 * - "horizon" resolves to "SAP-icons-v5"
 *
 * @param { string } collectionName
 * @return { string } the normalized collection name
 */
const getIconCollectionByAlias = (collectionName) => {
    if (IconCollectionsAlias[collectionName]) {
        return IconCollectionsAlias[collectionName];
    }
    return collectionName;
};

var RegisteredIconCollection;
(function (RegisteredIconCollection) {
    RegisteredIconCollection["SAPIconsV4"] = "SAP-icons-v4";
    RegisteredIconCollection["SAPIconsV5"] = "SAP-icons-v5";
    RegisteredIconCollection["SAPIconsTNTV2"] = "tnt-v2";
    RegisteredIconCollection["SAPIconsTNTV3"] = "tnt-v3";
    RegisteredIconCollection["SAPBSIconsV1"] = "business-suite-v1";
    RegisteredIconCollection["SAPBSIconsV2"] = "business-suite-v2";
})(RegisteredIconCollection || (RegisteredIconCollection = {}));
const iconCollections = new Map();
iconCollections.set("SAP-icons", {
    "legacy": RegisteredIconCollection.SAPIconsV4,
    "sap_horizon": RegisteredIconCollection.SAPIconsV5,
});
iconCollections.set("tnt", {
    "legacy": RegisteredIconCollection.SAPIconsTNTV2,
    "sap_horizon": RegisteredIconCollection.SAPIconsTNTV3,
});
iconCollections.set("business-suite", {
    "legacy": RegisteredIconCollection.SAPBSIconsV1,
    "sap_horizon": RegisteredIconCollection.SAPBSIconsV2,
});
/**
 * Registers collection version per theme.
 * </b>For exmaple:</b> registerIconCollectionForTheme("my-custom-icons", {"sap_horizon": "my-custom-icons-v5"})
 * @param { string } collectionName
 * @param { ThemeToCollectionMap } themeCollectionMap
 */
const registerIconCollectionForTheme = (collectionName, themeCollectionMap) => {
    if (iconCollections.has(collectionName)) {
        iconCollections.set(collectionName, { ...themeCollectionMap, ...iconCollections.get(collectionName) });
        return;
    }
    iconCollections.set(collectionName, themeCollectionMap);
};
const getIconCollectionForTheme = (collectionName) => {
    const themeFamily = isLegacyThemeFamily() ? "legacy" : "sap_horizon";
    return iconCollections.has(collectionName) ? iconCollections.get(collectionName)[themeFamily] : collectionName;
};

const IconCollectionConfiguration = new Map();
/**
 * Returns the configured default icon collection for a given theme.
 *
 * @param { string } theme
 * @public
 * @returns { string | undefined }
 */
const getDefaultIconCollection = (theme) => {
    return IconCollectionConfiguration.get(theme);
};

/**
 * Returns the effective theme dependant icon collection:
 *
 * - "no collection" resolves to "SAP-icons-v4" in "Quartz" and "Belize", and to "SAP-icons-v5" in "Horizon"
 * - "tnt" (and its alias "SAP-icons-TNT") resolves to "tnt-v2" in "Quartz", "Belize", and resolves to "tnt-v3" in "Horizon"
 * - "business-suite" (and its alias "BusinessSuiteInAppSymbols") resolves to "business-suite-v1" in "Quartz", "Belize", and resolves to "business-suite-v2" in "Horizon"
 *
 * @param { IconCollection } collectionName
 * @returns { IconCollection } the effective collection name
 */
const getEffectiveIconCollection = (collectionName) => {
    const defaultIconCollection = getDefaultIconCollection(getTheme());
    // no collection + default collection, configured via setDefaultIconCollection - return the configured icon collection.
    if (!collectionName && defaultIconCollection) {
        return getIconCollectionByAlias(defaultIconCollection);
    }
    // no collection - return "SAP-icons-v4" or  "SAP-icons-v5".
    if (!collectionName) {
        return getIconCollectionForTheme("SAP-icons");
    }
    // has collection - return "SAP-icons-v4", "SAP-icons-v5", "tnt-v1", "tnt-v2", "business-suite-v1", "business-suite-v2", or custom ones.
    return getIconCollectionForTheme(collectionName);
};

const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;
/* Map for old language names for a few ISO639 codes. */
const M_ISO639_NEW_TO_OLD = {
    "he": "iw",
    "yi": "ji",
    "nb": "no",
    "sr": "sh",
};
/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or the default locale, if no locale provided.
 */
const normalizeLocale = (locale) => {
    let m;
    if (!locale) {
        return DEFAULT_LOCALE;
    }
    if (typeof locale === "string" && (m = localeRegEX.exec(locale.replace(/_/g, "-")))) { /* eslint-disable-line */
        let language = m[1].toLowerCase();
        let region = m[3] ? m[3].toUpperCase() : undefined;
        const script = m[2] ? m[2].toLowerCase() : undefined;
        const variants = m[4] ? m[4].slice(1) : undefined;
        const isPrivate = m[6];
        language = M_ISO639_NEW_TO_OLD[language] || language;
        // recognize and convert special SAP supportability locales (overwrites m[]!)
        if ((isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate))) /* eslint-disable-line */ ||
            (variants && (m = SAPSupportabilityLocales.exec(variants)))) { /* eslint-disable-line */
            return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
        }
        // Chinese: when no region but a script is specified, use default region for each script
        if (language === "zh" && !region) {
            if (script === "hans") {
                region = "CN";
            }
            else if (script === "hant") {
                region = "TW";
            }
        }
        return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : ""); /* eslint-disable-line */
    }
    return DEFAULT_LOCALE;
};

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = (locale) => {
    if (!locale) {
        return DEFAULT_LOCALE;
    }
    if (locale === "zh_HK") {
        return "zh_TW";
    }
    // if there are multiple segments (separated by underscores), remove the last one
    const p = locale.lastIndexOf("_");
    if (p >= 0) {
        return locale.slice(0, p);
    }
    // for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)
    return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
};

// contains package names for which the warning has been shown
const warningShown = new Set();
const reportedErrors = new Set();
const bundleData = new Map();
const bundlePromises = new Map();
const loaders$1 = new Map();
const _setI18nBundleData = (packageName, data) => {
    bundleData.set(packageName, data);
};
const getI18nBundleData = (packageName) => {
    return bundleData.get(packageName);
};
const _hasLoader = (packageName, localeId) => {
    const bundleKey = `${packageName}/${localeId}`;
    return loaders$1.has(bundleKey);
};
// load bundle over the network once
const _loadMessageBundleOnce = (packageName, localeId) => {
    const bundleKey = `${packageName}/${localeId}`;
    const loadMessageBundle = loaders$1.get(bundleKey);
    if (loadMessageBundle && !bundlePromises.get(bundleKey)) {
        bundlePromises.set(bundleKey, loadMessageBundle(localeId));
    }
    return bundlePromises.get(bundleKey); // Investigate if i18n loader exists and this won't return undefined.
};
const _showAssetsWarningOnce = (packageName) => {
    if (!warningShown.has(packageName)) {
        console.warn(`[${packageName}]: Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */ ` Add \`import "${packageName}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`); /* eslint-disable-line */
        warningShown.add(packageName);
    }
};
const useFallbackBundle = (packageName, localeId) => {
    return localeId !== DEFAULT_LANGUAGE && !_hasLoader(packageName, localeId);
};
/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */
const fetchI18nBundle = async (packageName) => {
    const language = getLocale().getLanguage();
    const region = getLocale().getRegion();
    let localeId = language + (region ? `-${region}` : ``);
    if (useFallbackBundle(packageName, localeId)) {
        localeId = normalizeLocale(localeId);
        while (useFallbackBundle(packageName, localeId)) {
            localeId = nextFallbackLocale(localeId);
        }
    }
    // use default language unless configured to always fetch it from the network
    const fetchDefaultLanguage = getFetchDefaultLanguage();
    if (localeId === DEFAULT_LANGUAGE && !fetchDefaultLanguage) {
        _setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
        return;
    }
    if (!_hasLoader(packageName, localeId)) {
        _showAssetsWarningOnce(packageName);
        return;
    }
    try {
        const data = await _loadMessageBundleOnce(packageName, localeId);
        _setI18nBundleData(packageName, data);
    }
    catch (error) {
        const e = error;
        if (!reportedErrors.has(e.message)) {
            reportedErrors.add(e.message);
            console.error(e.message); /* eslint-disable-line */
        }
    }
};
// When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles
attachLanguageChange((lang /* eslint-disable-line */) => {
    const allPackages = [...bundleData.keys()];
    return Promise.all(allPackages.map(fetchI18nBundle));
});

const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;
const formatMessage = (text, values) => {
    values = values || [];
    return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
        if ($1) {
            return '\''; /* eslint-disable-line */
        }
        if ($2) {
            return $2.replace(/''/g, '\''); /* eslint-disable-line */
        }
        if ($3) {
            const ind = typeof $3 === "string" ? parseInt($3) : $3;
            return String(values[ind]);
        }
        throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
    });
};

const I18nBundleInstances = new Map();
/**
 * @class
 * @public
 */
class I18nBundle {
    constructor(packageName) {
        this.packageName = packageName;
    }
    /**
     * Returns a text in the currently loaded language
     *
     * @public
     * @param {Object|String} textObj key/defaultText pair or just the key
     * @param params Values for the placeholders
     * @returns {string}
     */
    getText(textObj, ...params) {
        if (typeof textObj === "string") {
            textObj = { key: textObj, defaultText: textObj };
        }
        if (!textObj || !textObj.key) {
            return "";
        }
        const bundle = getI18nBundleData(this.packageName);
        if (bundle && !bundle[textObj.key]) {
            // eslint-disable-next-line no-console
            console.warn(`Key ${textObj.key} not found in the i18n bundle, the default text will be used`);
        }
        const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : (textObj.defaultText || textObj.key);
        return formatMessage(messageText, params);
    }
}
/**
 * Returns the I18nBundle instance for the given package synchronously.
 *
 * @public
 * @param packageName
 * @returns { I18nBundle }
 */
const getI18nBundleSync = (packageName) => {
    if (I18nBundleInstances.has(packageName)) {
        return I18nBundleInstances.get(packageName);
    }
    const i18nBundle = new I18nBundle(packageName);
    I18nBundleInstances.set(packageName, i18nBundle);
    return i18nBundle;
};
/**
 * Fetches and returns the I18nBundle instance for the given package.
 *
 * @public
 * @param packageName
 * @returns { Promise<I18nBundle> }
 */
const getI18nBundle = async (packageName) => {
    await fetchI18nBundle(packageName);
    return getI18nBundleSync(packageName);
};

const DEFAULT_THEME_FAMILY = "legacy"; // includes sap_belize_* and sap_fiori_*
const loaders = new Map();
const registry = getSharedResource("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", new Map());
const ICON_NOT_FOUND$1 = "ICON_NOT_FOUND";
const _loadIconCollectionOnce = async (collectionName) => {
    if (!iconCollectionPromises.has(collectionName)) {
        if (!loaders.has(collectionName)) {
            throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
        }
        const loadIcons = loaders.get(collectionName);
        iconCollectionPromises.set(collectionName, loadIcons(collectionName));
    }
    return iconCollectionPromises.get(collectionName);
};
const _fillRegistry = (bundleData) => {
    Object.keys(bundleData.data).forEach(iconName => {
        const iconData = bundleData.data[iconName];
        registerIcon(iconName, {
            pathData: (iconData.path || iconData.paths),
            ltr: iconData.ltr,
            accData: iconData.acc,
            collection: bundleData.collection,
            packageName: bundleData.packageName,
        });
    });
};
// set
const registerIcon = (name, iconData) => {
    const key = `${iconData.collection}/${name}`;
    registry.set(key, {
        pathData: iconData.pathData,
        ltr: iconData.ltr,
        accData: iconData.accData,
        packageName: iconData.packageName,
        customTemplate: iconData.customTemplate,
        viewBox: iconData.viewBox,
        collection: iconData.collection,
    });
};
/**
 * Processes the full icon name and splits it into - "name", "collection".
 * - removes legacy protocol ("sap-icon://")
 * - resolves aliases (f.e "SAP-icons-TNT/actor" => "tnt/actor")
 *
 * @param { string } name
 * @return { object }
 */
const processName = (name) => {
    // silently support ui5-compatible URIs
    if (name.startsWith("sap-icon://")) {
        name = name.replace("sap-icon://", "");
    }
    let collection;
    [name, collection] = name.split("/").reverse();
    name = name.replace("icon-", "");
    if (collection) {
        collection = getIconCollectionByAlias(collection);
    }
    return { name, collection };
};
const getIconDataSync = (iconName) => {
    const { name, collection } = processName(iconName);
    return getRegisteredIconData(collection, name);
};
const getIconData = async (iconName) => {
    const { name, collection } = processName(iconName);
    let iconData = ICON_NOT_FOUND$1;
    try {
        iconData = (await _loadIconCollectionOnce(getEffectiveIconCollection(collection)));
    }
    catch (error) {
        const e = error;
        console.error(e.message); /* eslint-disable-line */
    }
    if (iconData === ICON_NOT_FOUND$1) {
        return iconData;
    }
    const registeredIconData = getRegisteredIconData(collection, name);
    if (registeredIconData) {
        return registeredIconData;
    }
    // not filled by another await. many getters will await on the same loader, but fill only once
    if (Array.isArray(iconData)) {
        iconData.forEach(data => {
            _fillRegistry(data);
            registerIconCollectionForTheme(collection, { [data.themeFamily || DEFAULT_THEME_FAMILY]: data.collection });
        });
    }
    else {
        _fillRegistry(iconData);
    }
    return getRegisteredIconData(collection, name);
};
const getRegisteredIconData = (collection, name) => {
    const registryKey = `${getEffectiveIconCollection(collection)}/${name}`;
    return registry.get(registryKey);
};
/**
 * Returns the accessible name for the given icon,
 * or undefined if accessible name is not present.
 *
 * @param { string } name
 * @return { Promise }
 */
const getIconAccessibleName = async (name) => {
    if (!name) {
        return;
    }
    let iconData = getIconDataSync(name);
    if (!iconData) {
        iconData = await getIconData(name);
    }
    if (iconData && iconData !== ICON_NOT_FOUND$1 && iconData.accData) {
        const i18nBundle = await getI18nBundle(iconData.packageName);
        return i18nBundle.getText(iconData.accData);
    }
};

const name$j = "appointment-2";
const pathData$j = "M32 481V65q0-14 9.5-23T64 33h64V1h32v32h192V1h32v32h64q14 0 23 9t9 23v416q0 14-9 23t-23 9H64q-13 0-22.5-9T32 481zm416 0V129H64v352h384zM256 193q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zM128 321q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm256-128q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm0 128q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm-128 0q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zM96 225q0-14 9-23t23-9 23 9 9 23-9 23-23 9-23-9-9-23zM384 97V65h-32v32h32zM128 65v32h32V65h-32z";
const ltr$j = false;
const collection$j = "SAP-icons-v4";
const packageName$j = "@ui5/webcomponents-icons";

registerIcon(name$j, { pathData: pathData$j, ltr: ltr$j, collection: collection$j, packageName: packageName$j });

const name$i = "appointment-2";
const pathData$i = "M403 64q32 0 54.5 22.5T480 141v294q0 32-22.5 54.5T403 512H109q-32 0-54.5-22.5T32 435V141q0-32 22.5-54.5T109 64h25V26q0-11 7.5-18.5T160 0t18.5 7.5T186 26v38h140V26q0-11 7.5-18.5T352 0t18.5 7.5T378 26v38h25zm-294 51q-11 0-18.5 7.5T83 141v64h346v-64q0-11-7.5-18.5T403 115h-25v19q0 11-7.5 18.5T352 160t-18.5-7.5T326 134v-19H186v19q0 11-7.5 18.5T160 160t-18.5-7.5T134 134v-19h-25zm294 346q11 0 18.5-7.5T429 435V256H83v179q0 11 7.5 18.5T109 461h294zM160 320q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm96 0q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm96 0q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9z";
const ltr$i = false;
const collection$i = "SAP-icons-v5";
const packageName$i = "@ui5/webcomponents-icons";

registerIcon(name$i, { pathData: pathData$i, ltr: ltr$i, collection: collection$i, packageName: packageName$i });

isLegacyThemeFamily() ? pathData$j : pathData$i;

const ICON_DECLINE = { key: "ICON_DECLINE", defaultText: "Decline" };
const ICON_ERROR = { key: "ICON_ERROR", defaultText: "Error" };

const name$h = "decline";
const pathData$h = "M86 109l22-23q5-5 12-5 6 0 11 5l124 125L380 86q5-5 11-5 7 0 12 5l22 23q12 11 0 23L301 256l124 125q11 11 0 22l-22 23q-8 5-12 5-3 0-11-5L255 301 131 426q-5 5-11 5-4 0-12-5l-22-23q-11-11 0-22l124-125L86 132q-12-12 0-23z";
const ltr$h = false;
const accData$3 = ICON_DECLINE;
const collection$h = "SAP-icons-v4";
const packageName$h = "@ui5/webcomponents-icons";

registerIcon(name$h, { pathData: pathData$h, ltr: ltr$h, accData: accData$3, collection: collection$h, packageName: packageName$h });

const name$g = "decline";
const pathData$g = "M292 256l117 116q7 7 7 18 0 12-7.5 19t-18.5 7q-10 0-18-8L256 292 140 408q-8 8-18 8-11 0-18.5-7.5T96 390q0-10 8-18l116-116-116-116q-8-8-8-18 0-11 7.5-18.5T122 96t18 7l116 117 116-117q7-7 18-7t18.5 7.5T416 122t-7 18z";
const ltr$g = false;
const accData$2 = ICON_DECLINE;
const collection$g = "SAP-icons-v5";
const packageName$g = "@ui5/webcomponents-icons";

registerIcon(name$g, { pathData: pathData$g, ltr: ltr$g, accData: accData$2, collection: collection$g, packageName: packageName$g });

isLegacyThemeFamily() ? pathData$h : pathData$g;

/**
 * Different types of HasPopup.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.HasPopup
 */
var HasPopup;
(function (HasPopup) {
    /**
     * Dialog popup type.
     * @public
     * @type {Dialog}
     */
    HasPopup["Dialog"] = "Dialog";
    /**
     * Grid popup type.
     * @public
     * @type {Grid}
     */
    HasPopup["Grid"] = "Grid";
    /**
     * ListBox popup type.
     * @public
     * @type {ListBox}
     */
    HasPopup["ListBox"] = "ListBox";
    /**
     * Menu popup type.
     * @public
     * @type {Menu}
     */
    HasPopup["Menu"] = "Menu";
    /**
     * Tree popup type.
     * @public
     * @type {Tree}
     */
    HasPopup["Tree"] = "Tree";
})(HasPopup || (HasPopup = {}));
var HasPopup$1 = HasPopup;

const BUTTON_ARIA_TYPE_ACCEPT = { key: "BUTTON_ARIA_TYPE_ACCEPT", defaultText: "Positive Action" };
const BUTTON_ARIA_TYPE_REJECT = { key: "BUTTON_ARIA_TYPE_REJECT", defaultText: "Negative Action" };
const BUTTON_ARIA_TYPE_EMPHASIZED = { key: "BUTTON_ARIA_TYPE_EMPHASIZED", defaultText: "Emphasized" };
const DATEPICKER_OPEN_ICON_TITLE = { key: "DATEPICKER_OPEN_ICON_TITLE", defaultText: "Open Picker" };
const DATEPICKER_DATE_DESCRIPTION = { key: "DATEPICKER_DATE_DESCRIPTION", defaultText: "Date Input" };
const INPUT_SUGGESTIONS = { key: "INPUT_SUGGESTIONS", defaultText: "Suggestions available" };
const INPUT_SUGGESTIONS_TITLE = { key: "INPUT_SUGGESTIONS_TITLE", defaultText: "Select" };
const INPUT_SUGGESTIONS_ONE_HIT = { key: "INPUT_SUGGESTIONS_ONE_HIT", defaultText: "1 result available" };
const INPUT_SUGGESTIONS_MORE_HITS = { key: "INPUT_SUGGESTIONS_MORE_HITS", defaultText: "{0} results are available" };
const INPUT_SUGGESTIONS_NO_HIT = { key: "INPUT_SUGGESTIONS_NO_HIT", defaultText: "No results" };
const RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON = { key: "RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON", defaultText: "Decline" };
const VALUE_STATE_TYPE_ERROR = { key: "VALUE_STATE_TYPE_ERROR", defaultText: "Value State Error" };
const VALUE_STATE_TYPE_WARNING = { key: "VALUE_STATE_TYPE_WARNING", defaultText: "Value State Warning" };
const VALUE_STATE_TYPE_SUCCESS = { key: "VALUE_STATE_TYPE_SUCCESS", defaultText: "Value State Success" };
const VALUE_STATE_TYPE_INFORMATION = { key: "VALUE_STATE_TYPE_INFORMATION", defaultText: "Value State Information" };
const VALUE_STATE_ERROR = { key: "VALUE_STATE_ERROR", defaultText: "Invalid entry" };
const VALUE_STATE_WARNING = { key: "VALUE_STATE_WARNING", defaultText: "Warning issued" };
const VALUE_STATE_INFORMATION = { key: "VALUE_STATE_INFORMATION", defaultText: "Informative entry" };
const VALUE_STATE_SUCCESS = { key: "VALUE_STATE_SUCCESS", defaultText: "Entry successfully validated" };
const CALENDAR_HEADER_NEXT_BUTTON = { key: "CALENDAR_HEADER_NEXT_BUTTON", defaultText: "Next" };
const CALENDAR_HEADER_PREVIOUS_BUTTON = { key: "CALENDAR_HEADER_PREVIOUS_BUTTON", defaultText: "Previous" };
const DAY_PICKER_WEEK_NUMBER_TEXT = { key: "DAY_PICKER_WEEK_NUMBER_TEXT", defaultText: "Week number" };
const DAY_PICKER_NON_WORKING_DAY = { key: "DAY_PICKER_NON_WORKING_DAY", defaultText: "Non-Working Day" };
const DAY_PICKER_TODAY = { key: "DAY_PICKER_TODAY", defaultText: "Today" };
const MONTH_PICKER_DESCRIPTION = { key: "MONTH_PICKER_DESCRIPTION", defaultText: "Month Picker" };
const YEAR_PICKER_DESCRIPTION = { key: "YEAR_PICKER_DESCRIPTION", defaultText: "Year Picker" };
const DIALOG_HEADER_ARIA_ROLE_DESCRIPTION = { key: "DIALOG_HEADER_ARIA_ROLE_DESCRIPTION", defaultText: "Interactive Header" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE", defaultText: "Use Shift+Arrow keys to resize" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE", defaultText: "Use Arrow keys to move" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE", defaultText: "Use Arrow keys to move, Shift+Arrow keys to resize" };

const whenDOMReady = () => {
    return new Promise(resolve => {
        if (document.body) {
            resolve();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                resolve();
            });
        }
    });
};

const styleData$q = {
    packageName: "@ui5/webcomponents-base",
    fileName: "FontFace.css",
    content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72")}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold')}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold')}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light')}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono')}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold')}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex')}`,
};

const styleData$p = {
    packageName: "@ui5/webcomponents-base",
    fileName: "OverrideFontFace.css",
    content: `@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}`,
};

const insertFontFace = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    // Only set the main font if there is no OpenUI5 support, or there is, but OpenUI5 is not loaded
    if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
        insertMainFontFace();
    }
    // Always set the override font - OpenUI5 in CSS Vars mode does not set it, unlike the main font
    insertOverrideFontFace();
};
const insertMainFontFace = () => {
    if (!hasStyle("data-ui5-font-face")) {
        createStyle(styleData$q, "data-ui5-font-face");
    }
};
const insertOverrideFontFace = () => {
    if (!hasStyle("data-ui5-font-face-override")) {
        createStyle(styleData$p, "data-ui5-font-face-override");
    }
};

const styleData$o = {
    packageName: "@ui5/webcomponents-base",
    fileName: "SystemCSSVars.css",
    content: `:root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}[dir=rtl]{--_ui5_dir:rtl}[dir=ltr]{--_ui5_dir:ltr}`,
};

const insertSystemCSSVars = () => {
    if (!hasStyle("data-ui5-system-css-vars")) {
        createStyle(styleData$o, "data-ui5-system-css-vars");
    }
};

let booted = false;
let bootPromise;
const eventProvider = new EventProvider();
const boot = async () => {
    if (bootPromise !== undefined) {
        return bootPromise;
    }
    const bootExecutor = async (resolve) => {
        if (typeof document === "undefined") {
            resolve();
            return;
        }
        attachThemeRegistered(onThemeRegistered);
        registerCurrentRuntime();
        const openUI5Support = getFeature("OpenUI5Support");
        const isOpenUI5Loaded = openUI5Support ? openUI5Support.isOpenUI5Detected() : false;
        const f6Navigation = getFeature("F6Navigation");
        if (openUI5Support) {
            await openUI5Support.init();
        }
        if (f6Navigation && !isOpenUI5Loaded) {
            f6Navigation.init();
        }
        await whenDOMReady();
        await applyTheme(getTheme());
        openUI5Support && openUI5Support.attachListeners();
        insertFontFace();
        insertSystemCSSVars();
        resolve();
        booted = true;
        await eventProvider.fireEventAsync("boot");
    };
    bootPromise = new Promise(bootExecutor);
    return bootPromise;
};
/**
 * Callback, executed after theme properties registration
 * to apply the newly registered theme.
 * @private
 * @param { string } theme
 */
const onThemeRegistered = (theme) => {
    const currentTheme = getTheme();
    if (booted && theme === currentTheme) {
        applyTheme(currentTheme);
    }
};

const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();
const kebabToCamelCase = (string) => {
    if (!kebabToCamelMap.has(string)) {
        const result = toCamelCase(string.split("-"));
        kebabToCamelMap.set(string, result);
    }
    return kebabToCamelMap.get(string);
};
const camelToKebabCase = (string) => {
    if (!camelToKebabMap.has(string)) {
        const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        camelToKebabMap.set(string, result);
    }
    return camelToKebabMap.get(string);
};
const toCamelCase = (parts) => {
    return parts.map((string, index) => {
        return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }).join("");
};

/**
 * Determines the slot to which a node should be assigned
 * @param node Text node or HTML element
 * @returns {string}
 */
const getSlotName = (node) => {
    // Text nodes can only go to the default slot
    if (!(node instanceof HTMLElement)) {
        return "default";
    }
    // Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
    const slot = node.getAttribute("slot");
    if (slot) {
        const match = slot.match(/^(.+?)-\d+$/);
        return match ? match[1] : slot;
    }
    // Use default slot as a fallback
    return "default";
};
const getSlottedNodes = (node) => {
    if (node instanceof HTMLSlotElement) {
        return node.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
    }
    return [node];
};
const getSlottedNodesList = (nodeList) => {
    return nodeList.reduce((acc, curr) => acc.concat(getSlottedNodes(curr)), []);
};

let suf;
let rulesObj = {
    include: [/^ui5-/],
    exclude: [],
};
const tagsCache = new Map(); // true/false means the tag should/should not be cached, undefined means not known yet.
/**
 * Returns the currently set scoping suffix, or undefined if not set.
 *
 * @public
 * @returns {String|undefined}
 */
const getCustomElementsScopingSuffix = () => {
    return suf;
};
/**
 * Determines whether custom elements with the given tag should be scoped or not.
 * The tag is first matched against the "include" rules and then against the "exclude" rules and the
 * result is cached until new rules are set.
 *
 * @public
 * @param tag
 */
const shouldScopeCustomElement = (tag) => {
    if (!tagsCache.has(tag)) {
        const result = rulesObj.include.some(rule => tag.match(rule)) && !rulesObj.exclude.some(rule => tag.match(rule));
        tagsCache.set(tag, result);
    }
    return tagsCache.get(tag);
};
/**
 * Returns the currently set scoping suffix, if any and if the tag should be scoped, or undefined otherwise.
 *
 * @public
 * @param tag
 * @returns {String}
 */
const getEffectiveScopingSuffixForTag = (tag) => {
    if (shouldScopeCustomElement(tag)) {
        return getCustomElementsScopingSuffix();
    }
};
/**
 * @public
 * Used for getting a scoped name for a CSS variable using the same transformation used in the build
 * @name the name of the css variable as written in the code
 * @returns a variable name with the current version inserted as available at runtime
 */
const getScopedVarName = (name) => {
    const versionStr = `v${VersionInfo.version.replaceAll(".", "-")}`;
    const expr = /(--_?ui5)([^,:)\s]+)/g;
    return name.replaceAll(expr, `$1-${versionStr}$2`);
};

/**
 *
 * @class
 * @public
 */
class UI5ElementMetadata {
    constructor(metadata) {
        this.metadata = metadata;
    }
    getInitialState() {
        if (Object.prototype.hasOwnProperty.call(this, "_initialState")) {
            return this._initialState;
        }
        const initialState = {};
        const slotsAreManaged = this.slotsAreManaged();
        // Initialize properties
        const props = this.getProperties();
        for (const propName in props) { // eslint-disable-line
            const propType = props[propName].type;
            const propDefaultValue = props[propName].defaultValue;
            if (propType === Boolean) {
                initialState[propName] = false;
                if (propDefaultValue !== undefined) {
                    console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
                }
            }
            else if (props[propName].multiple) {
                initialState[propName] = [];
            }
            else if (propType === Object) {
                initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
            }
            else if (propType === String) {
                initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
            }
            else {
                initialState[propName] = propDefaultValue;
            }
        }
        // Initialize slots
        if (slotsAreManaged) {
            const slots = this.getSlots();
            for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
                const propertyName = slotData.propertyName || slotName;
                initialState[propertyName] = [];
            }
        }
        this._initialState = initialState;
        return initialState;
    }
    /**
     * Validates the property's value and returns it if correct
     * or returns the default value if not.
     * <b>Note:</b> Only intended for use by UI5Element.js
     * @public
     */
    static validatePropertyValue(value, propData) {
        const isMultiple = propData.multiple;
        if (isMultiple && value) {
            return value.map((propValue) => validateSingleProperty(propValue, propData));
        }
        return validateSingleProperty(value, propData);
    }
    /**
     * Validates the slot's value and returns it if correct
     * or throws an exception if not.
     * <b>Note:</b> Only intended for use by UI5Element.js
     * @pubic
     */
    static validateSlotValue(value, slotData) {
        return validateSingleSlot(value, slotData);
    }
    /**
     * Returns the tag of the UI5 Element without the scope
     * @public
     */
    getPureTag() {
        return this.metadata.tag || "";
    }
    /**
     * Returns the tag of the UI5 Element
     * @public
     */
    getTag() {
        const pureTag = this.metadata.tag;
        if (!pureTag) {
            return "";
        }
        const suffix = getEffectiveScopingSuffixForTag(pureTag);
        if (!suffix) {
            return pureTag;
        }
        return `${pureTag}-${suffix}`;
    }
    /**
     * Determines whether a property should have an attribute counterpart
     * @public
     * @param propName
     * @returns {boolean}
     */
    hasAttribute(propName) {
        const propData = this.getProperties()[propName];
        return propData.type !== Object && !propData.noAttribute && !propData.multiple;
    }
    /**
     * Returns an array with the properties of the UI5 Element (in camelCase)
     * @public
     * @returns {string[]}
     */
    getPropertiesList() {
        return Object.keys(this.getProperties());
    }
    /**
     * Returns an array with the attributes of the UI5 Element (in kebab-case)
     * @public
     * @returns {string[]}
     */
    getAttributesList() {
        return this.getPropertiesList().filter(this.hasAttribute.bind(this)).map(camelToKebabCase);
    }
    /**
     * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
     * @returns {boolean}
     */
    canSlotText() {
        const defaultSlot = this.getSlots().default;
        return defaultSlot && defaultSlot.type === Node;
    }
    /**
     * Determines whether this UI5 Element supports any slots
     * @public
     */
    hasSlots() {
        return !!Object.entries(this.getSlots()).length;
    }
    /**
     * Determines whether this UI5 Element supports any slots with "individualSlots: true"
     * @public
     */
    hasIndividualSlots() {
        return this.slotsAreManaged() && Object.values(this.getSlots()).some(slotData => slotData.individualSlots);
    }
    /**
     * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
     * @public
     */
    slotsAreManaged() {
        return !!this.metadata.managedSlots;
    }
    /**
     * Determines whether this control supports F6 fast navigation
     * @public
     */
    supportsF6FastNavigation() {
        return !!this.metadata.fastNavigation;
    }
    /**
     * Returns an object with key-value pairs of properties and their metadata definitions
     * @public
     */
    getProperties() {
        if (!this.metadata.properties) {
            this.metadata.properties = {};
        }
        return this.metadata.properties;
    }
    /**
     * Returns an object with key-value pairs of events and their metadata definitions
     * @public
     */
    getEvents() {
        if (!this.metadata.events) {
            this.metadata.events = {};
        }
        return this.metadata.events;
    }
    /**
     * Returns an object with key-value pairs of slots and their metadata definitions
     * @public
     */
    getSlots() {
        if (!this.metadata.slots) {
            this.metadata.slots = {};
        }
        return this.metadata.slots;
    }
    /**
     * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
     * @returns {boolean}
     */
    isLanguageAware() {
        return !!this.metadata.languageAware;
    }
    /**
     * Determines whether this UI5 Element has any theme dependant carachteristics.
     * @returns {boolean}
     */
    isThemeAware() {
        return !!this.metadata.themeAware;
    }
    /**
     * Matches a changed entity (property/slot) with the given name against the "invalidateOnChildChange" configuration
     * and determines whether this should cause and invalidation
     *
     * @param slotName the name of the slot in which a child was changed
     * @param type the type of change in the child: "property" or "slot"
     * @param name the name of the property/slot that changed
     * @returns {boolean}
     */
    shouldInvalidateOnChildChange(slotName, type, name) {
        const config = this.getSlots()[slotName].invalidateOnChildChange;
        // invalidateOnChildChange was not set in the slot metadata - by default child changes do not affect the component
        if (config === undefined) {
            return false;
        }
        // The simple format was used: invalidateOnChildChange: true/false;
        if (typeof config === "boolean") {
            return config;
        }
        // The complex format was used: invalidateOnChildChange: { properties, slots }
        if (typeof config === "object") {
            // A property was changed
            if (type === "property") {
                // The config object does not have a properties field
                if (config.properties === undefined) {
                    return false;
                }
                // The config object has the short format: properties: true/false
                if (typeof config.properties === "boolean") {
                    return config.properties;
                }
                // The config object has the complex format: properties: [...]
                if (Array.isArray(config.properties)) {
                    return config.properties.includes(name);
                }
                throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
            }
            // A slot was changed
            if (type === "slot") {
                // The config object does not have a slots field
                if (config.slots === undefined) {
                    return false;
                }
                // The config object has the short format: slots: true/false
                if (typeof config.slots === "boolean") {
                    return config.slots;
                }
                // The config object has the complex format: slots: [...]
                if (Array.isArray(config.slots)) {
                    return config.slots.includes(name);
                }
                throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
            }
        }
        throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
    }
}
const validateSingleProperty = (value, propData) => {
    const propertyType = propData.type;
    let propertyValidator = propData.validator;
    if (propertyType && propertyType.isDataTypeClass) {
        propertyValidator = propertyType;
    }
    if (propertyValidator) {
        return propertyValidator.isValid(value) ? value : propData.defaultValue;
    }
    if (!propertyType || propertyType === String) {
        return (typeof value === "string" || typeof value === "undefined" || value === null) ? value : value.toString();
    }
    if (propertyType === Boolean) {
        return typeof value === "boolean" ? value : false;
    }
    if (propertyType === Object) {
        return typeof value === "object" ? value : propData.defaultValue;
    }
    // Check if "value" is part of the enum (propertyType) values and return the defaultValue if not found.
    return value in propertyType ? value : propData.defaultValue;
};
const validateSingleSlot = (value, slotData) => {
    value && getSlottedNodes(value).forEach(el => {
        if (!(el instanceof slotData.type)) {
            throw new Error(`The element is not of type ${slotData.type.toString()}`);
        }
    });
    return value;
};

class StaticArea extends HTMLElement {
}
if (!customElements.get("ui5-static-area")) {
    customElements.define("ui5-static-area", StaticArea);
}

const getEventProvider = () => getSharedResource("CustomStyle.eventProvider", new EventProvider());
const CUSTOM_CSS_CHANGE = "CustomCSSChange";
const attachCustomCSSChange = (listener) => {
    getEventProvider().attachEvent(CUSTOM_CSS_CHANGE, listener);
};
const getCustomCSSFor = () => getSharedResource("CustomStyle.customCSSFor", {});
attachCustomCSSChange((tag) => {
    {
        reRenderAllUI5Elements({ tag });
    }
});
const getCustomCSS = (tag) => {
    const customCSSFor = getCustomCSSFor();
    return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers
const getStylesString = (styles) => {
    if (Array.isArray(styles)) {
        return styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES).map((style) => {
            return typeof style === "string" ? style : style.content;
        }).join(" ");
    }
    return typeof styles === "string" ? styles : styles.content;
};

const effectiveStyleMap = new Map();
attachCustomCSSChange((tag) => {
    effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});
const getEffectiveStyle = (ElementClass, forStaticArea = false) => {
    const tag = ElementClass.getMetadata().getTag();
    const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (!effectiveStyleMap.has(key)) {
        let effectiveStyle;
        let busyIndicatorStyles = "";
        if (openUI5Enablement) {
            busyIndicatorStyles = getStylesString(openUI5Enablement.getBusyIndicatorStyles());
        }
        if (forStaticArea) {
            effectiveStyle = getStylesString(ElementClass.staticAreaStyles);
        }
        else {
            const customStyle = getCustomCSS(tag) || "";
            const builtInStyles = getStylesString(ElementClass.styles);
            effectiveStyle = `${builtInStyles} ${customStyle}`;
        }
        effectiveStyle = `${effectiveStyle} ${busyIndicatorStyles}`;
        effectiveStyleMap.set(key, effectiveStyle);
    }
    return effectiveStyleMap.get(key); // The key is guaranteed to exist
};

const constructableStyleMap = new Map();
attachCustomCSSChange((tag) => {
    constructableStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});
/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = (ElementClass, forStaticArea = false) => {
    const tag = ElementClass.getMetadata().getTag();
    const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
    if (!constructableStyleMap.has(key)) {
        const styleContent = getEffectiveStyle(ElementClass, forStaticArea);
        const style = new CSSStyleSheet();
        style.replaceSync(styleContent);
        constructableStyleMap.set(key, [style]);
    }
    return constructableStyleMap.get(key);
};

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
    let styleStrOrHrefsArr;
    const ctor = element.constructor;
    const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
    let renderResult;
    if (forStaticArea) {
        renderResult = element.renderStatic(); // this is checked before calling updateShadowRoot
    }
    else {
        renderResult = element.render(); // this is checked before calling updateShadowRoot
    }
    if (!shadowRoot) {
        console.warn(`There is no shadow root to update`); // eslint-disable-line
        return;
    }
    if (document.adoptedStyleSheets && !isSafari()) { // Chrome
        shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor, forStaticArea);
    }
    else { // FF, Safari
        styleStrOrHrefsArr = getEffectiveStyle(ctor, forStaticArea);
    }
    if (ctor.renderer) {
        ctor.renderer(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
        return;
    }
    ctor.render(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
};

const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";
const getEffectiveContentDensity = (el) => getComputedStyle(el).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR);

const M_ISO639_OLD_TO_NEW = {
    "iw": "he",
    "ji": "yi",
    "in": "id",
    "sh": "sr",
};
const A_RTL_LOCALES = getDesigntimePropertyAsArray$1("$cldr-rtl-locales:ar,fa,he$") || [];
/**
 * Checks whether the language is using RTL
 * @param {string} language
 * @returns {boolean} whether the language is using RTL
 */
const impliesRTL = (language) => {
    language = (language && M_ISO639_OLD_TO_NEW[language]) || language;
    return A_RTL_LOCALES.indexOf(language) >= 0;
};
/**
 * Gets the effective RTL setting by first checking the configuration
 * and if not set using the currently set language or the navigator language if the language is not explicitly set.
 * @returns {boolean} whether RTL should be used
 */
const getRTL = () => {
    if (typeof document === "undefined") {
        return false;
    }
    const configurationRTL = getRTL$1();
    if (configurationRTL !== undefined) {
        return !!configurationRTL;
    }
    return impliesRTL(getLanguage() || detectNavigatorLanguage());
};

const GLOBAL_DIR_CSS_VAR = "--_ui5_dir";
const getEffectiveDir = (element) => {
    const doc = window.document;
    const dirValues = ["ltr", "rtl"]; // exclude "auto" and "" from all calculations
    const locallyAppliedDir = getComputedStyle(element).getPropertyValue(GLOBAL_DIR_CSS_VAR);
    // In that order, inspect the CSS Var (for modern browsers), the element itself, html and body (for IE fallback)
    if (dirValues.includes(locallyAppliedDir)) {
        return locallyAppliedDir;
    }
    if (dirValues.includes(element.dir)) {
        return element.dir;
    }
    if (dirValues.includes(doc.documentElement.dir)) {
        return doc.documentElement.dir;
    }
    if (dirValues.includes(doc.body.dir)) {
        return doc.body.dir;
    }
    // Finally, check the configuration for explicitly set RTL or language-implied RTL
    return getRTL() ? "rtl" : undefined;
};

const pureTagName = "ui5-static-area-item";
const popupIntegrationAttr = "data-sap-ui-integration-popup-content";
/**
 *
 * @class
 * @author SAP SE
 * @private
 */
class StaticAreaItem extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
        this.attachShadow({ mode: "open" });
    }
    /**
     * @param {UI5Element} ownerElement the UI5Element instance that owns this static area item
     */
    setOwnerElement(ownerElement) {
        this.ownerElement = ownerElement;
        this.classList.add(this.ownerElement._id); // used for getting the popover in the tests
        if (this.ownerElement.hasAttribute("data-ui5-static-stable")) {
            this.setAttribute("data-ui5-stable", this.ownerElement.getAttribute("data-ui5-static-stable")); // stable selector
        }
    }
    /**
     * Updates the shadow root of the static area item with the latest state, if rendered
     */
    update() {
        if (this._rendered) {
            this.updateAdditionalProperties();
            updateShadowRoot(this.ownerElement, true);
        }
    }
    updateAdditionalProperties() {
        this._updateAdditionalAttrs();
        this._updateContentDensity();
        this._updateDirection();
    }
    /**
     * Sets the correct content density based on the owner element's state
     * @private
     */
    _updateContentDensity() {
        if (getEffectiveContentDensity(this.ownerElement) === "compact") {
            this.classList.add("sapUiSizeCompact");
            this.classList.add("ui5-content-density-compact");
        }
        else {
            this.classList.remove("sapUiSizeCompact");
            this.classList.remove("ui5-content-density-compact");
        }
    }
    _updateDirection() {
        if (this.ownerElement) {
            const dir = getEffectiveDir(this.ownerElement);
            if (dir) {
                this.setAttribute("dir", dir);
            }
            else {
                this.removeAttribute("dir");
            }
        }
    }
    _updateAdditionalAttrs() {
        this.setAttribute(pureTagName, "");
        this.setAttribute(popupIntegrationAttr, "");
    }
    /**
     * @protected
     * Returns reference to the DOM element where the current fragment is added.
     */
    async getDomRef() {
        this.updateAdditionalProperties();
        if (!this._rendered) {
            this._rendered = true;
            updateShadowRoot(this.ownerElement, true);
        }
        await renderFinished(); // Wait for the content of the ui5-static-area-item to be rendered
        return this.shadowRoot;
    }
    static getTag() {
        const suffix = getEffectiveScopingSuffixForTag(pureTagName);
        if (!suffix) {
            return pureTagName;
        }
        return `${pureTagName}-${suffix}`;
    }
    static createInstance() {
        if (!customElements.get(StaticAreaItem.getTag())) {
            customElements.define(StaticAreaItem.getTag(), StaticAreaItem);
        }
        return document.createElement(this.getTag());
    }
}

/**
 * The tag prefixes to be ignored.
 */
const tagPrefixes = [];
/**
 * Determines whether custom elements with the given tag should be ignored.
 *
 * @private
 * @param { string } tag
 */
const shouldIgnoreCustomElement = (tag) => {
    return tagPrefixes.some(pref => tag.startsWith(pref));
};

const observers = new WeakMap();
/**
 * @param node
 * @param callback
 * @param options
 */
const observeDOMNode = (node, callback, options) => {
    const observer = new MutationObserver(callback);
    observers.set(node, observer);
    observer.observe(node, options);
};
/**
 * @param node
 */
const unobserveDOMNode = (node) => {
    const observer = observers.get(node);
    if (observer) {
        observer.disconnect();
        observers.delete(node);
    }
};

// Fire these events even with noConflict: true
const excludeList = [
    "value-changed",
    "click",
];
let noConflict;
const shouldFireOriginalEvent = (eventName) => {
    return excludeList.includes(eventName);
};
const shouldNotFireOriginalEvent = (eventName) => {
    const nc = getNoConflict();
    // return !(nc.events && nc.events.includes && nc.events.includes(eventName));
    return !(typeof nc !== "boolean" && nc.events && nc.events.includes && nc.events.includes(eventName));
};
/**
 * Returns if the "noConflict" configuration is set.
 * @public
 * @returns { NoConflictData }
 */
const getNoConflict = () => {
    if (noConflict === undefined) {
        noConflict = getNoConflict$1();
    }
    return noConflict;
};
const skipOriginalEvent = (eventName) => {
    const nc = getNoConflict();
    // Always fire these events
    if (shouldFireOriginalEvent(eventName)) {
        return false;
    }
    // Read from the configuration
    if (nc === true) {
        return true;
    }
    return !shouldNotFireOriginalEvent(eventName);
};

// Note: disabled is present in IE so we explicitly allow it here.
// Others, such as title/hidden, we explicitly override, so valid too
const allowList = [
    "disabled",
    "title",
    "hidden",
    "role",
    "draggable",
];
/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = (name) => {
    if (allowList.includes(name) || name.startsWith("aria")) {
        return true;
    }
    const classes = [
        HTMLElement,
        Element,
        Node,
    ];
    return !classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
const executeTemplate = (template, component) => {
    const tagsToScope = getTagsToScope(component);
    const scope = getCustomElementsScopingSuffix();
    return template.call(component, component, tagsToScope, scope);
};
/**
 * Returns all tags, used inside component's template subject to scoping.
 * @param component - the component
 * @returns {Array[]}
 * @private
 */
const getTagsToScope = (component) => {
    const ctor = component.constructor;
    const componentTag = ctor.getMetadata().getPureTag();
    const tagsToScope = ctor.getUniqueDependencies().map((dep) => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);
    if (shouldScopeCustomElement(componentTag)) {
        tagsToScope.push(componentTag);
    }
    return tagsToScope;
};

let autoId = 0;
const elementTimeouts = new Map();
const uniqueDependenciesCache = new Map();
/**
 * Triggers re-rendering of a UI5Element instance due to state change.
 * @param {ChangeInfo} changeInfo An object with information about the change that caused invalidation.
 * @private
 */
function _invalidate(changeInfo) {
    // Invalidation should be suppressed: 1) before the component is rendered for the first time 2) and during the execution of onBeforeRendering
    // This is necessary not only as an optimization, but also to avoid infinite loops on invalidation between children and parents (when invalidateOnChildChange is used)
    if (this._suppressInvalidation) {
        return;
    }
    // Call the onInvalidation hook
    this.onInvalidation(changeInfo);
    this._changedState.push(changeInfo);
    renderDeferred(this);
    this._eventProvider.fireEvent("invalidate", { ...changeInfo, target: this });
}
/**
 * Base class for all UI5 Web Components
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.UI5Element
 * @extends HTMLElement
 * @public
 */
class UI5Element extends HTMLElement {
    constructor() {
        super();
        const ctor = this.constructor;
        this._changedState = []; // Filled on each invalidation, cleared on re-render (used for debugging)
        this._suppressInvalidation = true; // A flag telling whether all invalidations should be ignored. Initialized with "true" because a UI5Element can not be invalidated until it is rendered for the first time
        this._inDOM = false; // A flag telling whether the UI5Element is currently in the DOM tree of the document or not
        this._fullyConnected = false; // A flag telling whether the UI5Element's onEnterDOM hook was called (since it's possible to have the element removed from DOM before that)
        this._childChangeListeners = new Map(); // used to store lazy listeners per slot for the child change event of every child inside that slot
        this._slotChangeListeners = new Map(); // used to store lazy listeners per slot for the slotchange event of all slot children inside that slot
        this._eventProvider = new EventProvider(); // used by parent components for listening to changes to child components
        let deferredResolve;
        this._domRefReadyPromise = new Promise(resolve => {
            deferredResolve = resolve;
        });
        this._domRefReadyPromise._deferredResolve = deferredResolve;
        this._doNotSyncAttributes = new Set(); // attributes that are excluded from attributeChangedCallback synchronization
        this._state = { ...ctor.getMetadata().getInitialState() };
        this._upgradeAllProperties();
        if (ctor._needsShadowDOM()) {
            this.attachShadow({ mode: "open" });
        }
    }
    /**
     * Returns a unique ID for this UI5 Element
     *
     * @deprecated - This property is not guaranteed in future releases
     * @protected
     */
    get _id() {
        if (!this.__id) {
            this.__id = `ui5wc_${++autoId}`;
        }
        return this.__id;
    }
    render() {
        const template = this.constructor.template;
        return executeTemplate(template, this);
    }
    renderStatic() {
        const template = this.constructor.staticAreaTemplate;
        return executeTemplate(template, this);
    }
    /**
     * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
     * @private
     */
    async connectedCallback() {
        const ctor = this.constructor;
        this.setAttribute(ctor.getMetadata().getPureTag(), "");
        if (ctor.getMetadata().supportsF6FastNavigation()) {
            this.setAttribute("data-sap-ui-fastnavgroup", "true");
        }
        const slotsAreManaged = ctor.getMetadata().slotsAreManaged();
        this._inDOM = true;
        if (slotsAreManaged) {
            // always register the observer before yielding control to the main thread (await)
            this._startObservingDOMChildren();
            await this._processChildren();
        }
        if (!this._inDOM) { // Component removed from DOM while _processChildren was running
            return;
        }
        renderImmediately(this);
        this._domRefReadyPromise._deferredResolve();
        this._fullyConnected = true;
        this.onEnterDOM();
    }
    /**
     * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
     * @private
     */
    disconnectedCallback() {
        const ctor = this.constructor;
        const slotsAreManaged = ctor.getMetadata().slotsAreManaged();
        this._inDOM = false;
        if (slotsAreManaged) {
            this._stopObservingDOMChildren();
        }
        if (this._fullyConnected) {
            this.onExitDOM();
            this._fullyConnected = false;
        }
        if (this.staticAreaItem && this.staticAreaItem.parentElement) {
            this.staticAreaItem.parentElement.removeChild(this.staticAreaItem);
        }
        cancelRender(this);
    }
    /**
     * Called every time before the component renders.
     * @public
     */
    onBeforeRendering() { }
    /**
     * Called every time after the component renders.
     * @public
     */
    onAfterRendering() { }
    /**
     * Called on connectedCallback - added to the DOM.
     * @public
     */
    onEnterDOM() { }
    /**
     * Called on disconnectedCallback - removed from the DOM.
     * @public
     */
    onExitDOM() { }
    /**
     * @private
     */
    _startObservingDOMChildren() {
        const ctor = this.constructor;
        const shouldObserveChildren = ctor.getMetadata().hasSlots();
        if (!shouldObserveChildren) {
            return;
        }
        const canSlotText = ctor.getMetadata().canSlotText();
        const mutationObserverOptions = {
            childList: true,
            subtree: canSlotText,
            characterData: canSlotText,
        };
        observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
    }
    /**
     * @private
     */
    _stopObservingDOMChildren() {
        unobserveDOMNode(this);
    }
    /**
     * Note: this method is also manually called by "compatibility/patchNodeValue.js"
     * @private
     */
    async _processChildren() {
        const hasSlots = this.constructor.getMetadata().hasSlots();
        if (hasSlots) {
            await this._updateSlots();
        }
    }
    /**
     * @private
     */
    async _updateSlots() {
        const ctor = this.constructor;
        const slotsMap = ctor.getMetadata().getSlots();
        const canSlotText = ctor.getMetadata().canSlotText();
        const domChildren = Array.from(canSlotText ? this.childNodes : this.children);
        const slotsCachedContentMap = new Map(); // Store here the content of each slot before the mutation occurred
        const propertyNameToSlotMap = new Map(); // Used for reverse lookup to determine to which slot the property name corresponds
        // Init the _state object based on the supported slots and store the previous values
        for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
            const propertyName = slotData.propertyName || slotName;
            propertyNameToSlotMap.set(propertyName, slotName);
            slotsCachedContentMap.set(propertyName, [...this._state[propertyName]]);
            this._clearSlot(slotName, slotData);
        }
        const autoIncrementMap = new Map();
        const slottedChildrenMap = new Map();
        const allChildrenUpgraded = domChildren.map(async (child, idx) => {
            // Determine the type of the child (mainly by the slot attribute)
            const slotName = getSlotName(child);
            const slotData = slotsMap[slotName];
            // Check if the slotName is supported
            if (slotData === undefined) {
                if (slotName !== "default") {
                    const validValues = Object.keys(slotsMap).join(", ");
                    console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
                }
                return;
            }
            // For children that need individual slots, calculate them
            if (slotData.individualSlots) {
                const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
                autoIncrementMap.set(slotName, nextIndex);
                child._individualSlot = `${slotName}-${nextIndex}`;
            }
            // Await for not-yet-defined custom elements
            if (child instanceof HTMLElement) {
                const localName = child.localName;
                const shouldWaitForCustomElement = localName.includes("-") && !shouldIgnoreCustomElement(localName);
                if (shouldWaitForCustomElement) {
                    const isDefined = window.customElements.get(localName);
                    if (!isDefined) {
                        const whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
                        let timeoutPromise = elementTimeouts.get(localName);
                        if (!timeoutPromise) {
                            timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
                            elementTimeouts.set(localName, timeoutPromise);
                        }
                        await Promise.race([whenDefinedPromise, timeoutPromise]);
                    }
                    window.customElements.upgrade(child);
                }
            }
            child = ctor.getMetadata().constructor.validateSlotValue(child, slotData);
            // Listen for any invalidation on the child if invalidateOnChildChange is true or an object (ignore when false or not set)
            if (instanceOfUI5Element(child) && slotData.invalidateOnChildChange) {
                const childChangeListener = this._getChildChangeListener(slotName);
                if (childChangeListener) {
                    child.attachInvalidate.call(child, childChangeListener);
                }
            }
            // Listen for the slotchange event if the child is a slot itself
            if (child instanceof HTMLSlotElement) {
                this._attachSlotChange(child, slotName);
            }
            const propertyName = slotData.propertyName || slotName;
            if (slottedChildrenMap.has(propertyName)) {
                slottedChildrenMap.get(propertyName).push({ child, idx });
            }
            else {
                slottedChildrenMap.set(propertyName, [{ child, idx }]);
            }
        });
        await Promise.all(allChildrenUpgraded);
        // Distribute the child in the _state object, keeping the Light DOM order,
        // not the order elements are defined.
        slottedChildrenMap.forEach((children, propertyName) => {
            this._state[propertyName] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
        });
        // Compare the content of each slot with the cached values and invalidate for the ones that changed
        let invalidated = false;
        for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
            const propertyName = slotData.propertyName || slotName;
            if (!arraysAreEqual(slotsCachedContentMap.get(propertyName), this._state[propertyName])) {
                _invalidate.call(this, {
                    type: "slot",
                    name: propertyNameToSlotMap.get(propertyName),
                    reason: "children",
                });
                invalidated = true;
            }
        }
        // If none of the slots had an invalidation due to changes to immediate children,
        // the change is considered to be text content of the default slot
        if (!invalidated) {
            _invalidate.call(this, {
                type: "slot",
                name: "default",
                reason: "textcontent",
            });
        }
    }
    /**
     * Removes all children from the slot and detaches listeners, if any
     * @private
     */
    _clearSlot(slotName, slotData) {
        const propertyName = slotData.propertyName || slotName;
        const children = this._state[propertyName];
        children.forEach(child => {
            if (instanceOfUI5Element(child)) {
                const childChangeListener = this._getChildChangeListener(slotName);
                if (childChangeListener) {
                    child.detachInvalidate.call(child, childChangeListener);
                }
            }
            if (child instanceof HTMLSlotElement) {
                this._detachSlotChange(child, slotName);
            }
        });
        this._state[propertyName] = [];
    }
    /**
     * Attach a callback that will be executed whenever the component is invalidated
     *
     * @param {InvalidationInfo} callback
     * @public
     */
    attachInvalidate(callback) {
        this._eventProvider.attachEvent("invalidate", callback);
    }
    /**
     * Detach the callback that is executed whenever the component is invalidated
     *
     * @param {InvalidationInfo} callback
     * @public
     */
    detachInvalidate(callback) {
        this._eventProvider.detachEvent("invalidate", callback);
    }
    /**
     * Callback that is executed whenever a monitored child changes its state
     *
     * @param {sting} slotName the slot in which a child was invalidated
     * @param { ChangeInfo } childChangeInfo the changeInfo object for the child in the given slot
     * @private
     */
    _onChildChange(slotName, childChangeInfo) {
        if (!this.constructor.getMetadata().shouldInvalidateOnChildChange(slotName, childChangeInfo.type, childChangeInfo.name)) {
            return;
        }
        // The component should be invalidated as this type of change on the child is listened for
        // However, no matter what changed on the child (property/slot), the invalidation is registered as "type=slot" for the component itself
        _invalidate.call(this, {
            type: "slot",
            name: slotName,
            reason: "childchange",
            child: childChangeInfo.target,
        });
    }
    /**
     * Do not override this method in derivatives of UI5Element
     * @private
     */
    attributeChangedCallback(name, oldValue, newValue) {
        let newPropertyValue;
        if (this._doNotSyncAttributes.has(name)) { // This attribute is mutated internally, not by the user
            return;
        }
        const properties = this.constructor.getMetadata().getProperties();
        const realName = name.replace(/^ui5-/, "");
        const nameInCamelCase = kebabToCamelCase(realName);
        if (properties.hasOwnProperty(nameInCamelCase)) { // eslint-disable-line
            const propData = properties[nameInCamelCase];
            const propertyType = propData.type;
            let propertyValidator = propData.validator;
            if (propertyType && propertyType.isDataTypeClass) {
                propertyValidator = propertyType;
            }
            if (propertyValidator) {
                newPropertyValue = propertyValidator.attributeToProperty(newValue);
            }
            else if (propertyType === Boolean) {
                newPropertyValue = newValue !== null;
            }
            else {
                newPropertyValue = newValue;
            }
            this[nameInCamelCase] = newPropertyValue;
        }
    }
    /**
     * @private
     */
    _updateAttribute(name, newValue) {
        const ctor = this.constructor;
        if (!ctor.getMetadata().hasAttribute(name)) {
            return;
        }
        const properties = ctor.getMetadata().getProperties();
        const propData = properties[name];
        const propertyType = propData.type;
        let propertyValidator = propData.validator;
        const attrName = camelToKebabCase(name);
        const attrValue = this.getAttribute(attrName);
        if (propertyType && propertyType.isDataTypeClass) {
            propertyValidator = propertyType;
        }
        if (propertyValidator) {
            const newAttrValue = propertyValidator.propertyToAttribute(newValue);
            if (newAttrValue === null) { // null means there must be no attribute for the current value of the property
                this._doNotSyncAttributes.add(attrName); // skip the attributeChangedCallback call for this attribute
                this.removeAttribute(attrName); // remove the attribute safely (will not trigger synchronization to the property value due to the above line)
                this._doNotSyncAttributes.delete(attrName); // enable synchronization again for this attribute
            }
            else {
                this.setAttribute(attrName, newAttrValue);
            }
        }
        else if (propertyType === Boolean) {
            if (newValue === true && attrValue === null) {
                this.setAttribute(attrName, "");
            }
            else if (newValue === false && attrValue !== null) {
                this.removeAttribute(attrName);
            }
        }
        else if (typeof newValue !== "object") {
            if (attrValue !== newValue) {
                this.setAttribute(attrName, newValue);
            }
        } // else { return; } // old object handling
    }
    /**
     * @private
     */
    _upgradeProperty(propertyName) {
        if (this.hasOwnProperty(propertyName)) { // eslint-disable-line
            const value = this[propertyName];
            delete this[propertyName];
            this[propertyName] = value;
        }
    }
    /**
     * @private
     */
    _upgradeAllProperties() {
        const allProps = this.constructor.getMetadata().getPropertiesList();
        allProps.forEach(this._upgradeProperty.bind(this));
    }
    /**
     * Returns a singleton event listener for the "change" event of a child in a given slot
     *
     * @param slotName the name of the slot, where the child is
     * @returns {ChildChangeListener}
     * @private
     */
    _getChildChangeListener(slotName) {
        if (!this._childChangeListeners.has(slotName)) {
            this._childChangeListeners.set(slotName, this._onChildChange.bind(this, slotName));
        }
        return this._childChangeListeners.get(slotName);
    }
    /**
     * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
     *
     * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
     * @returns {SlotChangeListener}
     * @private
     */
    _getSlotChangeListener(slotName) {
        if (!this._slotChangeListeners.has(slotName)) {
            this._slotChangeListeners.set(slotName, this._onSlotChange.bind(this, slotName));
        }
        return this._slotChangeListeners.get(slotName);
    }
    /**
     * @private
     */
    _attachSlotChange(child, slotName) {
        const slotChangeListener = this._getSlotChangeListener(slotName);
        if (slotChangeListener) {
            child.addEventListener("slotchange", slotChangeListener);
        }
    }
    /**
     * @private
     */
    _detachSlotChange(child, slotName) {
        child.removeEventListener("slotchange", this._getSlotChangeListener(slotName));
    }
    /**
     * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
     *
     * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
     * @private
     */
    _onSlotChange(slotName) {
        _invalidate.call(this, {
            type: "slot",
            name: slotName,
            reason: "slotchange",
        });
    }
    /**
     * A callback that is executed each time an already rendered component is invalidated (scheduled for re-rendering)
     *
     * @param  changeInfo An object with information about the change that caused invalidation.
     * The object can have the following properties:
     *  - type: (property|slot) tells what caused the invalidation
     *   1) property: a property value was changed either directly or as a result of changing the corresponding attribute
     *   2) slot: a slotted node(nodes) changed in one of several ways (see "reason")
     *
     *  - name: the name of the property or slot that caused the invalidation
     *
     *  - reason: (children|textcontent|childchange|slotchange) relevant only for type="slot" only and tells exactly what changed in the slot
     *   1) children: immediate children (HTML elements or text nodes) were added, removed or reordered in the slot
     *   2) textcontent: text nodes in the slot changed value (or nested text nodes were added or changed value). Can only trigger for slots of "type: Node"
     *   3) slotchange: a slot element, slotted inside that slot had its "slotchange" event listener called. This practically means that transitively slotted children changed.
     *      Can only trigger if the child of a slot is a slot element itself.
     *   4) childchange: indicates that a UI5Element child in that slot was invalidated and in turn invalidated the component.
     *      Can only trigger for slots with "invalidateOnChildChange" metadata descriptor
     *
     *  - newValue: the new value of the property (for type="property" only)
     *
     *  - oldValue: the old value of the property (for type="property" only)
     *
     *  - child the child that was changed (for type="slot" and reason="childchange" only)
     *
     * @public
     */
    onInvalidation(changeInfo) { } // eslint-disable-line
    /**
     * Do not call this method directly, only intended to be called by js
     * @protected
     */
    _render() {
        const ctor = this.constructor;
        const hasIndividualSlots = ctor.getMetadata().hasIndividualSlots();
        // suppress invalidation to prevent state changes scheduling another rendering
        this._suppressInvalidation = true;
        this.onBeforeRendering();
        // Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
        if (this._onComponentStateFinalized) {
            this._onComponentStateFinalized();
        }
        // resume normal invalidation handling
        this._suppressInvalidation = false;
        // Update the shadow root with the render result
        /*
        if (this._changedState.length) {
            let element = this.localName;
            if (this.id) {
                element = `${element}#${this.id}`;
            }
            console.log("Re-rendering:", element, this._changedState.map(x => { // eslint-disable-line
                let res = `${x.type}`;
                if (x.reason) {
                    res = `${res}(${x.reason})`;
                }
                res = `${res}: ${x.name}`;
                if (x.type === "property") {
                    res = `${res} ${JSON.stringify(x.oldValue)} => ${JSON.stringify(x.newValue)}`;
                }

                return res;
            }));
        }
        */
        this._changedState = [];
        // Update shadow root and static area item
        if (ctor._needsShadowDOM()) {
            updateShadowRoot(this);
        }
        if (this.staticAreaItem) {
            this.staticAreaItem.update();
        }
        // Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
        if (hasIndividualSlots) {
            this._assignIndividualSlotsToChildren();
        }
        // Call the onAfterRendering hook
        this.onAfterRendering();
    }
    /**
     * @private
     */
    _assignIndividualSlotsToChildren() {
        const domChildren = Array.from(this.children);
        domChildren.forEach((child) => {
            if (child._individualSlot) {
                child.setAttribute("slot", child._individualSlot);
            }
        });
    }
    /**
     * @private
     */
    _waitForDomRef() {
        return this._domRefReadyPromise;
    }
    /**
     * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
     * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
     * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
     *
     * @public
     */
    getDomRef() {
        // If a component set _getRealDomRef to its children, use the return value of this function
        if (typeof this._getRealDomRef === "function") {
            return this._getRealDomRef();
        }
        if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
            return;
        }
        const children = [...this.shadowRoot.children].filter(child => !["link", "style"].includes(child.localName));
        if (children.length !== 1) {
            console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`); // eslint-disable-line
        }
        return children[0];
    }
    /**
     * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
     * This is the element that will receive the focus by default.
     * @public
     */
    getFocusDomRef() {
        const domRef = this.getDomRef();
        if (domRef) {
            const focusRef = domRef.querySelector("[data-sap-focus-ref]");
            return focusRef || domRef;
        }
    }
    /**
     * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
     * This is the element that will receive the focus by default.
     * @public
     */
    async getFocusDomRefAsync() {
        await this._waitForDomRef();
        return this.getFocusDomRef();
    }
    /**
     * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
     * @param {FocusOptions} focusOptions additional options for the focus
     * @public
     */
    async focus(focusOptions) {
        await this._waitForDomRef();
        const focusDomRef = this.getFocusDomRef();
        if (focusDomRef && typeof focusDomRef.focus === "function") {
            focusDomRef.focus(focusOptions);
        }
    }
    /**
     *
     * @public
     * @param name - name of the event
     * @param data - additional data for the event
     * @param cancelable - true, if the user can call preventDefault on the event object
     * @param bubbles - true, if the event bubbles
     * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
     */
    fireEvent(name, data, cancelable = false, bubbles = true) {
        const eventResult = this._fireEvent(name, data, cancelable, bubbles);
        const camelCaseEventName = kebabToCamelCase(name);
        if (camelCaseEventName !== name) {
            return eventResult && this._fireEvent(camelCaseEventName, data, cancelable);
        }
        return eventResult;
    }
    _fireEvent(name, data, cancelable = false, bubbles = true) {
        const noConflictEvent = new CustomEvent(`ui5-${name}`, {
            detail: data,
            composed: false,
            bubbles,
            cancelable,
        });
        // This will be false if the no-conflict event is prevented
        const noConflictEventResult = this.dispatchEvent(noConflictEvent);
        if (skipOriginalEvent(name)) {
            return noConflictEventResult;
        }
        const normalEvent = new CustomEvent(name, {
            detail: data,
            composed: false,
            bubbles,
            cancelable,
        });
        // This will be false if the normal event is prevented
        const normalEventResult = this.dispatchEvent(normalEvent);
        // Return false if any of the two events was prevented (its result was false).
        return normalEventResult && noConflictEventResult;
    }
    /**
     * Returns the actual children, associated with a slot.
     * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
     * @public
     */
    getSlottedNodes(slotName) {
        return getSlottedNodesList(this[slotName]);
    }
    /**
     * Determines whether the component should be rendered in RTL mode or not.
     * Returns: "rtl", "ltr" or undefined
     *
     * @public
     * @returns {String|undefined}
     */
    get effectiveDir() {
        markAsRtlAware(this.constructor); // if a UI5 Element calls this method, it's considered to be rtl-aware
        return getEffectiveDir(this);
    }
    /**
     * Used to duck-type UI5 elements without using instanceof
     * @returns {boolean}
     * @public
     */
    get isUI5Element() {
        return true;
    }
    get classes() {
        return {};
    }
    /**
     * Do not override this method in derivatives of UI5Element, use metadata properties instead
     * @private
     */
    static get observedAttributes() {
        return this.getMetadata().getAttributesList();
    }
    /**
     * @private
     */
    static _needsShadowDOM() {
        return !!this.template || Object.prototype.hasOwnProperty.call(this.prototype, "render");
    }
    /**
     * @private
     */
    static _needsStaticArea() {
        return !!this.staticAreaTemplate || Object.prototype.hasOwnProperty.call(this.prototype, "renderStatic");
    }
    /**
     * @public
     */
    getStaticAreaItemDomRef() {
        if (!this.constructor._needsStaticArea()) {
            throw new Error("This component does not use the static area");
        }
        if (!this.staticAreaItem) {
            this.staticAreaItem = StaticAreaItem.createInstance();
            this.staticAreaItem.setOwnerElement(this);
        }
        if (!this.staticAreaItem.parentElement) {
            getSingletonElementInstance("ui5-static-area").appendChild(this.staticAreaItem);
        }
        return this.staticAreaItem.getDomRef();
    }
    /**
     * @private
     */
    static _generateAccessors() {
        const proto = this.prototype;
        const slotsAreManaged = this.getMetadata().slotsAreManaged();
        // Properties
        const properties = this.getMetadata().getProperties();
        for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
            if (!isValidPropertyName(prop)) {
                console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
            }
            if (propData.type === Boolean && propData.defaultValue) {
                throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
            }
            if (propData.type === Array) {
                throw new Error(`Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
            }
            if (propData.type === Object && propData.defaultValue) {
                throw new Error(`Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`);
            }
            if (propData.multiple && propData.defaultValue) {
                throw new Error(`Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`);
            }
            Object.defineProperty(proto, prop, {
                get() {
                    if (this._state[prop] !== undefined) {
                        return this._state[prop];
                    }
                    const propDefaultValue = propData.defaultValue;
                    if (propData.type === Boolean) {
                        return false;
                    }
                    else if (propData.type === String) { // eslint-disable-line
                        return propDefaultValue;
                    }
                    else if (propData.multiple) { // eslint-disable-line
                        return [];
                    }
                    else {
                        return propDefaultValue;
                    }
                },
                set(value) {
                    let isDifferent;
                    const ctor = this.constructor;
                    const metadataCtor = ctor.getMetadata().constructor;
                    value = metadataCtor.validatePropertyValue(value, propData);
                    const propertyType = propData.type;
                    let propertyValidator = propData.validator;
                    const oldState = this._state[prop];
                    if (propertyType && propertyType.isDataTypeClass) {
                        propertyValidator = propertyType;
                    }
                    if (propertyValidator) {
                        isDifferent = !propertyValidator.valuesAreEqual(oldState, value);
                    }
                    else if (Array.isArray(oldState) && Array.isArray(value) && propData.multiple && propData.compareValues) { // compareValues is added for IE, test if needed now
                        isDifferent = !arraysAreEqual(oldState, value);
                    }
                    else {
                        isDifferent = oldState !== value;
                    }
                    if (isDifferent) {
                        this._state[prop] = value;
                        _invalidate.call(this, {
                            type: "property",
                            name: prop,
                            newValue: value,
                            oldValue: oldState,
                        });
                        this._updateAttribute(prop, value);
                    }
                },
            });
        }
        // Slots
        if (slotsAreManaged) {
            const slots = this.getMetadata().getSlots();
            for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
                if (!isValidPropertyName(slotName)) {
                    console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
                }
                const propertyName = slotData.propertyName || slotName;
                Object.defineProperty(proto, propertyName, {
                    get() {
                        if (this._state[propertyName] !== undefined) {
                            return this._state[propertyName];
                        }
                        return [];
                    },
                    set() {
                        throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
                    },
                });
            }
        }
    }
    /**
     * Returns the CSS for this UI5 Web Component Class
     * @protected
     */
    static get styles() {
        return "";
    }
    /**
     * Returns the Static Area CSS for this UI5 Web Component Class
     * @protected
     */
    static get staticAreaStyles() {
        return "";
    }
    /**
     * Returns an array with the dependencies for this UI5 Web Component, which could be:
     *  - composed components (used in its shadow root or static area item)
     *  - slotted components that the component may need to communicate with
     *
     * @protected
     */
    static get dependencies() {
        return [];
    }
    /**
     * Returns a list of the unique dependencies for this UI5 Web Component
     *
     * @public
     */
    static getUniqueDependencies() {
        if (!uniqueDependenciesCache.has(this)) {
            const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
            uniqueDependenciesCache.set(this, filtered);
        }
        return uniqueDependenciesCache.get(this) || [];
    }
    /**
     * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
     *
     * @returns {Promise}
     */
    static whenDependenciesDefined() {
        return Promise.all(this.getUniqueDependencies().map(dep => dep.define()));
    }
    /**
     * Hook that will be called upon custom element definition
     *
     * @protected
     * @returns {Promise<void>}
     */
    static async onDefine() {
        return Promise.resolve();
    }
    /**
     * Registers a UI5 Web Component in the browser window object
     * @public
     * @returns {Promise<UI5Element>}
     */
    static async define() {
        await boot();
        await Promise.all([
            this.whenDependenciesDefined(),
            this.onDefine(),
        ]);
        const tag = this.getMetadata().getTag();
        const definedLocally = isTagRegistered(tag);
        const definedGlobally = customElements.get(tag);
        if (definedGlobally && !definedLocally) {
            recordTagRegistrationFailure(tag);
        }
        else if (!definedGlobally) {
            this._generateAccessors();
            registerTag(tag);
            window.customElements.define(tag, this);
        }
        return this;
    }
    /**
     * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
     * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
     * @public
     * @returns {UI5ElementMetadata}
     */
    static getMetadata() {
        if (this.hasOwnProperty("_metadata")) { // eslint-disable-line
            return this._metadata;
        }
        const metadataObjects = [this.metadata];
        let klass = this; // eslint-disable-line
        while (klass !== UI5Element) {
            klass = Object.getPrototypeOf(klass);
            metadataObjects.unshift(klass.metadata);
        }
        const mergedMetadata = fnMerge$1({}, ...metadataObjects);
        this._metadata = new UI5ElementMetadata(mergedMetadata);
        return this._metadata;
    }
}
/**
 * Returns the metadata object for this UI5 Web Component Class
 * @protected
 */
UI5Element.metadata = {};
/**
 * Always use duck-typing to cover all runtimes on the page.
 * @returns {boolean}
 */
const instanceOfUI5Element = (object) => {
    return "isUI5Element" in object;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=window,s$2=i$1.trustedTypes,e$3=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$3="$lit$",n$1=`lit$${(Math.random()+"").slice(9)}$`,l$3="?"+n$1,h=`<${l$3}>`,r$1=document,u$2=()=>r$1.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$2=Array.isArray,v=t=>c$2(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$2="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${a$2}(?:([^\\s"'>=/]+)(${a$2}*=${a$2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),b=w(2),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r$1.createTreeWalker(r$1,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$3?e$3.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$1?"!--"===c[1]?u=_:void 0!==c[1]?u=m$1:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p$1):void 0!==c[3]&&(u=p$1):u===p$1?">"===c[0]?(u=null!=l?l:f$1,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p$1:'"'===c[3]?$:g):u===$||u===g?u=p$1:u===_||u===m$1?u=f$1:(u=p$1,l=void 0);const w=u===p$1&&t[i+1].startsWith("/>")?" ":"";r+=u===f$1?s+h:v>=0?(e.push(d),s.slice(0,v)+o$3+s.slice(v)+n$1+w):s+n$1+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$3)||i.startsWith(n$1)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$3).split(n$1),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$1),i=t.length-1;if(i>0){h.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u$2()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u$2());}}}else if(8===h.nodeType)if(h.data===l$3)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$1,t+1));)v.push({type:7,index:r}),t+=n$1.length-1;}r++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$1).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r$1,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$1.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u$2()),this.k(u$2()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$2?s$2.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j={O:o$3,P:n$1,A:l$3,C:1,M:V,L:M,R:v,D:S,I:R,V:k,H:L,N:z,U:H,F:Z},B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u$2(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$2=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {I:l$2}=j,r=()=>document.createComment(""),c$1=(o,i,n)=>{var t;const v=o._$AA.parentNode,d=void 0===i?o._$AB:i._$AA;if(void 0===n){const i=v.insertBefore(r(),d),t=v.insertBefore(r(),d);n=new l$2(i,t,o,o.options);}else {const l=n._$AB.nextSibling,i=n._$AM,u=i!==o;if(u){let l;null===(t=n._$AQ)||void 0===t||t.call(n,o),n._$AM=o,void 0!==n._$AP&&(l=o._$AU)!==i._$AU&&n._$AP(l);}if(l!==d||u){let o=n._$AA;for(;o!==l;){const l=o.nextSibling;v.insertBefore(o,d),o=l;}}}return n},f=(o,l,i=o)=>(o._$AI(l,i),o),s$1={},a$1=(o,l=s$1)=>o._$AH=l,m=o=>o._$AH,p=o=>{var l;null===(l=o._$AP)||void 0===l||l.call(o,!1,!0);let i=o._$AA;const n=o._$AB.nextSibling;for(;i!==n;){const o=i.nextSibling;i.remove(),i=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u$1=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c=e$2(class extends i{constructor(e){if(super(e),e.type!==t.CHILD)throw Error("repeat() can only be used in text expressions")}ct(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.ct(e,s,t).values}update(s,[t,r,c]){var d;const a=m(s),{values:p$1,keys:v}=this.ct(t,r,c);if(!Array.isArray(a))return this.ut=v,p$1;const h=null!==(d=this.ut)&&void 0!==d?d:this.ut=[],m$1=[];let y,x,j=0,k=a.length-1,w=0,A=p$1.length-1;for(;j<=k&&w<=A;)if(null===a[j])j++;else if(null===a[k])k--;else if(h[j]===v[w])m$1[w]=f(a[j],p$1[w]),j++,w++;else if(h[k]===v[A])m$1[A]=f(a[k],p$1[A]),k--,A--;else if(h[j]===v[A])m$1[A]=f(a[j],p$1[A]),c$1(s,m$1[A+1],a[j]),j++,A--;else if(h[k]===v[w])m$1[w]=f(a[k],p$1[w]),c$1(s,a[j],a[k]),k--,w++;else if(void 0===y&&(y=u$1(v,w,A),x=u$1(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x.get(v[w]),t=void 0!==e?a[e]:null;if(null===t){const e=c$1(s,a[j]);f(e,p$1[w]),m$1[w]=e;}else m$1[w]=f(t,p$1[w]),c$1(s,a[j],t),a[e]=null;w++;}else p(a[k]),k--;else p(a[j]),j++;for(;w<=A;){const e=c$1(s,m$1[A+1]);f(e,p$1[w]),m$1[w++]=e;}for(;j<=k;){const e=a[j++];null!==e&&p(e);}return this.ut=v,a$1(s,m$1),T}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2=e$2(class extends i{constructor(t$1){var i;if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||(null===(i=t$1.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.it){this.it=new Set,void 0!==i.strings&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.nt)||void 0===r?void 0:r.has(t))&&this.it.add(t);return this.render(s)}const e=i.element.classList;this.it.forEach((t=>{t in s||(e.remove(t),this.it.delete(t));}));for(const t in s){const i=!!s[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.it.add(t)):(e.remove(t),this.it.delete(t)));}return T}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

class StyleMapDirective extends i {
	constructor(partInfo) {
		var _a;
		super(partInfo);
		if (partInfo.type !== t.ATTRIBUTE ||
			partInfo.name !== 'style' ||
			((_a = partInfo.strings) === null || _a === void 0 ? void 0 : _a.length) > 2) {
			throw new Error('The `styleMap` directive must be used in the `style` attribute ' +
				'and must be the only part in the attribute.');
		}
	}
	render(styleInfo) {
		return "";
	}
	update(part, [styleInfo]) {
		const { style } = part.element;
		if (this._previousStyleProperties === undefined) {
			this._previousStyleProperties = new Set();
			for (const name in styleInfo) {
				this._previousStyleProperties.add(name);
			}
			// return this.render(styleInfo);
		}
		// Remove old properties that no longer exist in styleInfo
		// We use forEach() instead of for-of so that re don't require down-level
		// iteration.
		this._previousStyleProperties.forEach((name) => {
			// If the name isn't in styleInfo or it's null/undefined
			if (styleInfo[name] == null) {
				this._previousStyleProperties.delete(name);
				if (name.includes('-')) {
					style.removeProperty(name);
				}
				else {
					// Note reset using empty string (vs null) as IE11 does not always
					// reset via null (https://developer.mozilla.org/en-US/docs/Web/API/ElementCSSInlineStyle/style#setting_styles)
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					style[name] = '';
				}
			}
		});
		// Add or update properties
		for (const name in styleInfo) {
			const value = styleInfo[name];
			if (value != null) {
				this._previousStyleProperties.add(name);
				if (name.includes('-')) {
					style.setProperty(name, value);
				}
				else {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					style[name] = value;
				}
			}
		}
		return T;
	}
}

const styleMap = e$2(StyleMapDirective);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$1=l=>null!=l?l:A;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let e$1 = class e extends i{constructor(i){if(super(i),this.et=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this.ft=void 0,this.et=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.et)return this.ft;this.et=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}};e$1.directiveName="unsafeHTML",e$1.resultType=1;const o$1=e$2(e$1);

const effectiveHtml = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.html : x;
    return fn(strings, ...values);
};
const effectiveSvg = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.svg : b;
    return fn(strings, ...values);
};
const litRender = (templateResult, container, styleStrOrHrefsArr, forStaticArea, options) => {
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (openUI5Enablement && !forStaticArea) {
        templateResult = openUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, options.host, templateResult);
    }
    if (typeof styleStrOrHrefsArr === "string") {
        templateResult = effectiveHtml `<style>${styleStrOrHrefsArr}</style>${templateResult}`;
    }
    else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
        templateResult = effectiveHtml `${styleStrOrHrefsArr.map(href => effectiveHtml `<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
    }
    D(templateResult, container, options);
};
const scopeTag = (tag, tags, suffix) => {
    const litStatic = getFeature("LitStatic");
    if (litStatic) {
        return litStatic.unsafeStatic((tags || []).includes(tag) ? `${tag}-${suffix}` : tag);
    }
};

var rMessageFormat = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;
var fnFormatMessage = function (sPattern, aValues) {
    fnAssert(typeof sPattern === 'string' || sPattern instanceof String, 'pattern must be string');
    if (arguments.length > 2 || aValues != null && !Array.isArray(aValues)) {
        aValues = Array.prototype.slice.call(arguments, 1);
    }
    aValues = aValues || [];
    return sPattern.replace(rMessageFormat, function ($0, $1, $2, $3, offset) {
        if ($1) {
            return '\'';
        } else if ($2) {
            return $2.replace(/''/g, '\'');
        } else if ($3) {
            return String(aValues[parseInt($3)]);
        }
        throw new Error('formatMessage: pattern syntax error at pos. ' + offset);
    });
};

var fnEqual = function (a, b, maxDepth, contains, depth) {
    if (typeof maxDepth == 'boolean') {
        contains = maxDepth;
        maxDepth = undefined;
    }
    if (!depth) {
        depth = 0;
    }
    if (!maxDepth) {
        maxDepth = 10;
    }
    if (depth > maxDepth) {
        Log.warning('deepEqual comparison exceeded maximum recursion depth of ' + maxDepth + '. Treating values as unequal');
        return false;
    }
    if (a === b || Number.isNaN(a) && Number.isNaN(b)) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (!contains && a.length !== b.length) {
            return false;
        }
        if (a.length > b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (!fnEqual(a[i], b[i], maxDepth, contains, depth + 1)) {
                return false;
            }
        }
        return true;
    }
    if (typeof a == 'object' && typeof b == 'object') {
        if (!a || !b) {
            return false;
        }
        if (a.constructor !== b.constructor) {
            return false;
        }
        if (!contains && Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        if (a instanceof Node) {
            return a.isEqualNode(b);
        }
        if (a instanceof Date) {
            return a.valueOf() === b.valueOf();
        }
        for (var i in a) {
            if (!fnEqual(a[i], b[i], maxDepth, contains, depth + 1)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

var DateFormat$1 = function () {
    throw new Error();
};
var mDateFormatTypes = {
    DATE: 'date',
    TIME: 'time',
    DATETIME: 'datetime',
    DATETIME_WITH_TIMEZONE: 'datetimeWithTimezone'
};
var mCldrDatePattern = {};
var checkTimezoneParameterType = function (sTimezone) {
    if (typeof sTimezone !== 'string' && !(sTimezone instanceof String) && sTimezone != null) {
        throw new TypeError('The given timezone must be a string.');
    }
};
DateFormat$1.oDateInfo = {
    type: mDateFormatTypes.DATE,
    oDefaultFormatOptions: {
        style: 'medium',
        relativeScale: 'day',
        relativeStyle: 'wide'
    },
    aFallbackFormatOptions: [
        { style: 'short' },
        { style: 'medium' },
        { pattern: 'yyyy-MM-dd' },
        {
            pattern: 'yyyyMMdd',
            strictParsing: true
        }
    ],
    bShortFallbackFormatOptions: true,
    bPatternFallbackWithoutDelimiter: true,
    getPattern: function (oLocaleData, sStyle, sCalendarType) {
        return oLocaleData.getDatePattern(sStyle, sCalendarType);
    },
    oRequiredParts: {
        'text': true,
        'year': true,
        'weekYear': true,
        'month': true,
        'day': true
    },
    aRelativeScales: [
        'year',
        'month',
        'week',
        'day'
    ],
    aRelativeParseScales: [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second'
    ],
    aIntervalCompareFields: [
        'Era',
        'FullYear',
        'Quarter',
        'Month',
        'Week',
        'Date'
    ]
};
DateFormat$1.oDateTimeInfo = {
    type: mDateFormatTypes.DATETIME,
    oDefaultFormatOptions: {
        style: 'medium',
        relativeScale: 'auto',
        relativeStyle: 'wide'
    },
    aFallbackFormatOptions: [
        { style: 'short' },
        { style: 'medium' },
        { pattern: 'yyyy-MM-dd\'T\'HH:mm:ss' },
        { pattern: 'yyyyMMdd HHmmss' }
    ],
    getPattern: function (oLocaleData, sStyle, sCalendarType) {
        var iSlashIndex = sStyle.indexOf('/');
        if (iSlashIndex > 0) {
            return oLocaleData.getCombinedDateTimePattern(sStyle.substr(0, iSlashIndex), sStyle.substr(iSlashIndex + 1), sCalendarType);
        } else {
            return oLocaleData.getCombinedDateTimePattern(sStyle, sStyle, sCalendarType);
        }
    },
    oRequiredParts: {
        'text': true,
        'year': true,
        'weekYear': true,
        'month': true,
        'day': true,
        'hour0_23': true,
        'hour1_24': true,
        'hour0_11': true,
        'hour1_12': true
    },
    aRelativeScales: [
        'year',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second'
    ],
    aRelativeParseScales: [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second'
    ],
    aIntervalCompareFields: [
        'Era',
        'FullYear',
        'Quarter',
        'Month',
        'Week',
        'Date',
        'DayPeriod',
        'Hours',
        'Minutes',
        'Seconds'
    ]
};
DateFormat$1._getDateTimeWithTimezoneInfo = function (oFormatOptions) {
    var bShowDate = oFormatOptions.showDate === undefined || oFormatOptions.showDate;
    var bShowTime = oFormatOptions.showTime === undefined || oFormatOptions.showTime;
    var bShowTimezone = oFormatOptions.showTimezone === undefined || oFormatOptions.showTimezone;
    var oBaselineType = DateFormat$1.oDateTimeInfo;
    if (bShowDate && !bShowTime) {
        oBaselineType = DateFormat$1.oDateInfo;
    } else if (!bShowDate && bShowTime) {
        oBaselineType = DateFormat$1.oTimeInfo;
    }
    return Object.assign({}, oBaselineType, {
        type: mDateFormatTypes.DATETIME_WITH_TIMEZONE,
        getTimezonePattern: function (sPattern) {
            if (!bShowDate && !bShowTime && bShowTimezone) {
                return 'VV';
            } else if (!bShowTimezone) {
                return sPattern;
            } else {
                return sPattern + ' VV';
            }
        },
        getPattern: function (oLocaleData, sStyle, sCalendarType) {
            if (!bShowDate && !bShowTime && bShowTimezone) {
                return 'VV';
            }
            if (!bShowTimezone) {
                return oBaselineType.getPattern(oLocaleData, sStyle, sCalendarType);
            }
            var sPattern = oBaselineType.getPattern(oLocaleData, sStyle, sCalendarType);
            return oLocaleData.applyTimezonePattern(sPattern);
        }
    });
};
DateFormat$1.oTimeInfo = {
    type: mDateFormatTypes.TIME,
    oDefaultFormatOptions: {
        style: 'medium',
        relativeScale: 'auto',
        relativeStyle: 'wide'
    },
    aFallbackFormatOptions: [
        { style: 'short' },
        { style: 'medium' },
        { pattern: 'HH:mm:ss' },
        { pattern: 'HHmmss' }
    ],
    getPattern: function (oLocaleData, sStyle, sCalendarType) {
        return oLocaleData.getTimePattern(sStyle, sCalendarType);
    },
    oRequiredParts: {
        'text': true,
        'hour0_23': true,
        'hour1_24': true,
        'hour0_11': true,
        'hour1_12': true
    },
    aRelativeScales: [
        'hour',
        'minute',
        'second'
    ],
    aRelativeParseScales: [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second'
    ],
    aIntervalCompareFields: [
        'DayPeriod',
        'Hours',
        'Minutes',
        'Seconds'
    ]
};
DateFormat$1.getInstance = function (oFormatOptions, oLocale) {
    return this.getDateInstance(oFormatOptions, oLocale);
};
DateFormat$1.getDateInstance = function (oFormatOptions, oLocale) {
    return this.createInstance(oFormatOptions, oLocale, this.oDateInfo);
};
DateFormat$1.getDateTimeInstance = function (oFormatOptions, oLocale) {
    return this.createInstance(oFormatOptions, oLocale, this.oDateTimeInfo);
};
DateFormat$1.getDateTimeWithTimezoneInstance = function (oFormatOptions, oLocale) {
    if (oFormatOptions && !(oFormatOptions instanceof Locale)) {
        (function () {
            oFormatOptions = Object.assign({}, oFormatOptions);
            if (typeof oFormatOptions.showTimezone === 'string') {
                var sShowTimezone = oFormatOptions.showTimezone;
                if (oFormatOptions.showDate === undefined && oFormatOptions.showTime === undefined) {
                    if (sShowTimezone === 'Hide') {
                        oFormatOptions.showTimezone = false;
                    } else if (sShowTimezone === 'Only') {
                        oFormatOptions.showDate = false;
                        oFormatOptions.showTime = false;
                    }
                }
                oFormatOptions.showTimezone = sShowTimezone !== 'Hide';
            }
        }());
        if (oFormatOptions.showDate === false && oFormatOptions.showTime === false && oFormatOptions.showTimezone === false) {
            throw new TypeError('Invalid Configuration. One of the following format options must be true: ' + 'showDate, showTime or showTimezone.');
        }
    }
    return this.createInstance(oFormatOptions, oLocale, DateFormat$1._getDateTimeWithTimezoneInfo(oFormatOptions || {}));
};
DateFormat$1.getTimeInstance = function (oFormatOptions, oLocale) {
    return this.createInstance(oFormatOptions, oLocale, this.oTimeInfo);
};
function createIntervalPatternWithNormalConnector(oFormat) {
    var sPattern = oFormat.oLocaleData.getIntervalPattern('', oFormat.oFormatOptions.calendarType);
    sPattern = sPattern.replace(/[^\{\}01 ]/, '-');
    return sPattern.replace(/\{(0|1)\}/g, oFormat.oFormatOptions.pattern);
}
DateFormat$1.createInstance = function (oFormatOptions, oLocale, oInfo, bIsFallback) {
    var aFallbackFormatOptions, oFormat, sPattern;
    oFormat = Object.create(this.prototype);
    if (oFormatOptions instanceof Locale) {
        oLocale = oFormatOptions;
        oFormatOptions = undefined;
    }
    if (!oLocale) {
        oLocale = Configuration.getFormatSettings().getFormatLocale();
    }
    oFormat.oLocale = oLocale;
    oFormat.oLocaleData = LocaleData$1.getInstance(oLocale);
    oFormat.oFormatOptions = fnExtend({}, oInfo.oDefaultFormatOptions, oFormatOptions);
    if (oInfo.type === mDateFormatTypes.DATETIME_WITH_TIMEZONE) {
        oFormat.oFormatOptions.interval = false;
        oFormat.oFormatOptions.singleIntervalValue = false;
        oFormat.oFormatOptions.UTC = false;
    } else {
        oFormat.oFormatOptions.showTimezone = undefined;
        oFormat.oFormatOptions.showDate = undefined;
        oFormat.oFormatOptions.showTime = undefined;
    }
    oFormat.type = oInfo.type;
    if (!oFormat.oFormatOptions.calendarType) {
        oFormat.oFormatOptions.calendarType = Configuration.getCalendarType();
    }
    if (oFormat.oFormatOptions.firstDayOfWeek === undefined && oFormat.oFormatOptions.minimalDaysInFirstWeek !== undefined || oFormat.oFormatOptions.firstDayOfWeek !== undefined && oFormat.oFormatOptions.minimalDaysInFirstWeek === undefined) {
        throw new TypeError('Format options firstDayOfWeek and minimalDaysInFirstWeek need both to be set, but only one was provided.');
    }
    if (oFormat.oFormatOptions.calendarWeekNumbering && !Object.values(CalendarWeekNumbering).includes(oFormat.oFormatOptions.calendarWeekNumbering)) {
        throw new TypeError('Illegal format option calendarWeekNumbering: \'' + oFormat.oFormatOptions.calendarWeekNumbering + '\'');
    }
    if (!oFormat.oFormatOptions.pattern) {
        if (oFormat.oFormatOptions.format) {
            oFormat.oFormatOptions.pattern = oFormat.oLocaleData.getCustomDateTimePattern(oFormat.oFormatOptions.format, oFormat.oFormatOptions.calendarType);
        } else {
            oFormat.oFormatOptions.pattern = oInfo.getPattern(oFormat.oLocaleData, oFormat.oFormatOptions.style, oFormat.oFormatOptions.calendarType);
        }
    }
    if (oFormat.oFormatOptions.interval) {
        var sSinglePattern, sDelimiter = oFormat.oFormatOptions.intervalDelimiter;
        if (oFormat.oFormatOptions.format) {
            oFormat.intervalPatterns = oFormat.oLocaleData.getCustomIntervalPattern(oFormat.oFormatOptions.format, null, oFormat.oFormatOptions.calendarType);
            if (typeof oFormat.intervalPatterns === 'string') {
                oFormat.intervalPatterns = [oFormat.intervalPatterns];
            }
            sSinglePattern = oFormat.oLocaleData.getCustomDateTimePattern(oFormat.oFormatOptions.format, oFormat.oFormatOptions.calendarType);
            oFormat.intervalPatterns.push(sSinglePattern);
        } else {
            sSinglePattern = oFormat.oFormatOptions.pattern;
            oFormat.intervalPatterns = [
                oFormat.oLocaleData.getCombinedIntervalPattern(oFormat.oFormatOptions.pattern, oFormat.oFormatOptions.calendarType),
                oFormat.oFormatOptions.pattern
            ];
        }
        var sCommonConnectorPattern = createIntervalPatternWithNormalConnector(oFormat);
        oFormat.intervalPatterns.push(sCommonConnectorPattern);
        if (sDelimiter) {
            sDelimiter = sDelimiter.replace(/'/g, '\'\'');
            sDelimiter = '\'' + sDelimiter + '\'';
            oFormat.intervalPatterns.unshift(sSinglePattern + sDelimiter + sSinglePattern);
        }
        oFormat.intervalPatterns = Array.from(new Set(oFormat.intervalPatterns));
    }
    if (!bIsFallback) {
        aFallbackFormatOptions = oInfo.aFallbackFormatOptions;
        if (oInfo.bShortFallbackFormatOptions) {
            sPattern = oInfo.getPattern(oFormat.oLocaleData, 'short');
            aFallbackFormatOptions = aFallbackFormatOptions.concat(DateFormat$1._createFallbackOptionsWithoutDelimiter(sPattern));
        }
        if (oFormat.oFormatOptions.pattern && oInfo.bPatternFallbackWithoutDelimiter) {
            aFallbackFormatOptions = DateFormat$1._createFallbackOptionsWithoutDelimiter(oFormat.oFormatOptions.pattern).concat(aFallbackFormatOptions);
        }
        aFallbackFormatOptions = aFallbackFormatOptions.reduce(function (aFallbacks, oOptions) {
            var aKeys = Object.keys(oOptions), bDuplicate = aFallbacks.some(function (oOptions0) {
                    return Object.keys(oOptions0).length === aKeys.length && aKeys.every(function (sKey) {
                        return oOptions0[sKey] === oOptions[sKey];
                    });
                });
            if (!bDuplicate) {
                aFallbacks.push(oOptions);
            }
            return aFallbacks;
        }, []);
        oFormat.aFallbackFormats = DateFormat$1._createFallbackFormat(aFallbackFormatOptions, oFormat.oFormatOptions.calendarType, oLocale, oInfo, oFormat.oFormatOptions);
    }
    oFormat.oRequiredParts = oInfo.oRequiredParts;
    oFormat.aRelativeScales = oInfo.aRelativeScales;
    oFormat.aRelativeParseScales = oInfo.aRelativeParseScales;
    oFormat.aIntervalCompareFields = oInfo.aIntervalCompareFields;
    oFormat.init();
    return oFormat;
};
DateFormat$1.prototype.init = function () {
    var sCalendarType = this.oFormatOptions.calendarType;
    this.aMonthsAbbrev = this.oLocaleData.getMonths('abbreviated', sCalendarType);
    this.aMonthsWide = this.oLocaleData.getMonths('wide', sCalendarType);
    this.aMonthsNarrow = this.oLocaleData.getMonths('narrow', sCalendarType);
    this.aMonthsAbbrevSt = this.oLocaleData.getMonthsStandAlone('abbreviated', sCalendarType);
    this.aMonthsWideSt = this.oLocaleData.getMonthsStandAlone('wide', sCalendarType);
    this.aMonthsNarrowSt = this.oLocaleData.getMonthsStandAlone('narrow', sCalendarType);
    this.aDaysAbbrev = this.oLocaleData.getDays('abbreviated', sCalendarType);
    this.aDaysWide = this.oLocaleData.getDays('wide', sCalendarType);
    this.aDaysNarrow = this.oLocaleData.getDays('narrow', sCalendarType);
    this.aDaysShort = this.oLocaleData.getDays('short', sCalendarType);
    this.aDaysAbbrevSt = this.oLocaleData.getDaysStandAlone('abbreviated', sCalendarType);
    this.aDaysWideSt = this.oLocaleData.getDaysStandAlone('wide', sCalendarType);
    this.aDaysNarrowSt = this.oLocaleData.getDaysStandAlone('narrow', sCalendarType);
    this.aDaysShortSt = this.oLocaleData.getDaysStandAlone('short', sCalendarType);
    this.aQuartersAbbrev = this.oLocaleData.getQuarters('abbreviated', sCalendarType);
    this.aQuartersWide = this.oLocaleData.getQuarters('wide', sCalendarType);
    this.aQuartersNarrow = this.oLocaleData.getQuarters('narrow', sCalendarType);
    this.aQuartersAbbrevSt = this.oLocaleData.getQuartersStandAlone('abbreviated', sCalendarType);
    this.aQuartersWideSt = this.oLocaleData.getQuartersStandAlone('wide', sCalendarType);
    this.aQuartersNarrowSt = this.oLocaleData.getQuartersStandAlone('narrow', sCalendarType);
    this.aErasNarrow = this.oLocaleData.getEras('narrow', sCalendarType);
    this.aErasAbbrev = this.oLocaleData.getEras('abbreviated', sCalendarType);
    this.aErasWide = this.oLocaleData.getEras('wide', sCalendarType);
    this.aDayPeriodsAbbrev = this.oLocaleData.getDayPeriods('abbreviated', sCalendarType);
    this.aDayPeriodsNarrow = this.oLocaleData.getDayPeriods('narrow', sCalendarType);
    this.aDayPeriodsWide = this.oLocaleData.getDayPeriods('wide', sCalendarType);
    this.oFlexibleDayPeriodsAbbrev = this.oLocaleData.getFlexibleDayPeriods('abbreviated', sCalendarType);
    this.oFlexibleDayPeriodsNarrow = this.oLocaleData.getFlexibleDayPeriods('narrow', sCalendarType);
    this.oFlexibleDayPeriodsWide = this.oLocaleData.getFlexibleDayPeriods('wide', sCalendarType);
    this.oFlexibleDayPeriodsAbbrevSt = this.oLocaleData.getFlexibleDayPeriodsStandAlone('abbreviated', sCalendarType);
    this.oFlexibleDayPeriodsNarrowSt = this.oLocaleData.getFlexibleDayPeriodsStandAlone('narrow', sCalendarType);
    this.oFlexibleDayPeriodsWideSt = this.oLocaleData.getFlexibleDayPeriodsStandAlone('wide', sCalendarType);
    this.aFormatArray = this.parseCldrDatePattern(this.oFormatOptions.pattern);
    this.sAllowedCharacters = this.getAllowedCharacters(this.aFormatArray);
};
DateFormat$1._createFallbackFormat = function (aFallbackFormatOptions, sCalendarType, oLocale, oInfo, oParentFormatOptions) {
    return aFallbackFormatOptions.map(function (oOptions) {
        var oFormatOptions = Object.assign({}, oOptions);
        oFormatOptions.showDate = oParentFormatOptions.showDate;
        oFormatOptions.showTime = oParentFormatOptions.showTime;
        oFormatOptions.showTimezone = oParentFormatOptions.showTimezone;
        if (typeof oInfo.getTimezonePattern === 'function' && oFormatOptions.pattern) {
            oFormatOptions.pattern = oInfo.getTimezonePattern(oFormatOptions.pattern);
        }
        if (oParentFormatOptions.interval) {
            oFormatOptions.interval = true;
        }
        oFormatOptions.calendarType = sCalendarType;
        return DateFormat$1.createInstance(oFormatOptions, oLocale, oInfo, true);
    });
};
DateFormat$1._createFallbackOptionsWithoutDelimiter = function (sBasePattern) {
    var rNonDateFields = /[^dMyGU]/g, oDayReplace = {
            regex: /d+/g,
            replace: 'dd'
        }, oMonthReplace = {
            regex: /M+/g,
            replace: 'MM'
        }, oYearReplace = {
            regex: /[yU]+/g,
            replace: [
                'yyyy',
                'yy'
            ]
        };
    sBasePattern = sBasePattern.replace(rNonDateFields, '');
    sBasePattern = sBasePattern.replace(oDayReplace.regex, oDayReplace.replace);
    sBasePattern = sBasePattern.replace(oMonthReplace.regex, oMonthReplace.replace);
    return oYearReplace.replace.map(function (sReplace) {
        return {
            pattern: sBasePattern.replace(oYearReplace.regex, sReplace),
            strictParsing: true
        };
    });
};
var oParseHelper = {
    isNumber: function (iCharCode) {
        return iCharCode >= 48 && iCharCode <= 57;
    },
    findNumbers: function (sValue, iMaxLength) {
        var iLength = 0;
        while (iLength < iMaxLength && this.isNumber(sValue.charCodeAt(iLength))) {
            iLength++;
        }
        return sValue.substr(0, iLength);
    },
    startsWithIgnoreCase: function (sValue, sSubstring, sLocale) {
        if (sValue.startsWith(sSubstring)) {
            return true;
        }
        try {
            var sSubToLocaleUpperCase = sSubstring.toLocaleUpperCase(sLocale);
            var sValueUpperCase = sValue.toLocaleUpperCase(sLocale);
            if (sSubToLocaleUpperCase.length !== sSubstring.length || sValueUpperCase.length !== sValue.length) {
                return false;
            }
            return sValueUpperCase.startsWith(sSubToLocaleUpperCase);
        } catch (e) {
            return false;
        }
    },
    findEntry: function (sValue, aList, sLocale) {
        var iFoundIndex = -1, iMatchedLength = 0;
        for (var j = 0; j < aList.length; j++) {
            if (aList[j] && aList[j].length > iMatchedLength && this.startsWithIgnoreCase(sValue, aList[j], sLocale)) {
                iFoundIndex = j;
                iMatchedLength = aList[j].length;
            }
        }
        return {
            index: iFoundIndex,
            length: iMatchedLength
        };
    },
    parseTZ: function (sValue, bColonSeparated) {
        var iLength = 0;
        var iTZFactor = sValue.charAt(0) === '+' ? -1 : 1;
        var sPart;
        iLength++;
        sPart = this.findNumbers(sValue.substr(iLength), 2);
        var iTZDiffHour = parseInt(sPart);
        iLength += 2;
        if (bColonSeparated) {
            iLength++;
        }
        sPart = this.findNumbers(sValue.substr(iLength), 2);
        var iTZDiff = 0;
        if (sPart) {
            iLength += 2;
            iTZDiff = parseInt(sPart);
        }
        return {
            length: iLength,
            tzDiff: (iTZDiff + 60 * iTZDiffHour) * 60 * iTZFactor
        };
    },
    checkValid: function (sSymbolName, bPartInvalid, oFormat) {
        if (sSymbolName in oFormat.oRequiredParts && bPartInvalid) {
            return false;
        }
        return true;
    }
};
DateFormat$1._createPatternSymbol = function (mParameters) {
    var fnIsNumeric = typeof mParameters.isNumeric === 'function' && mParameters.isNumeric || function () {
        return mParameters.isNumeric || false;
    };
    return {
        name: mParameters.name,
        format: mParameters.format || function () {
            return '';
        },
        parse: mParameters.parse || function () {
            return {};
        },
        isNumeric: fnIsNumeric
    };
};
DateFormat$1.prototype.oSymbols = {
    '': DateFormat$1._createPatternSymbol({
        name: 'text',
        format: function (oField, oDate) {
            return oField.value;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sChar;
            var bValid = true;
            var iValueIndex = 0;
            var iPatternIndex = 0;
            var sDelimiter = '-~\u2010\u2011\u2012\u2013\u2014\uFE58\uFE63\uFF0D\uFF5E';
            for (; iPatternIndex < oPart.value.length; iPatternIndex++) {
                sChar = oPart.value.charAt(iPatternIndex);
                if (sChar === ' ') {
                    while (sValue.charAt(iValueIndex) === ' ') {
                        iValueIndex++;
                    }
                } else if (sDelimiter.includes(sChar)) {
                    if (!sDelimiter.includes(sValue.charAt(iValueIndex))) {
                        bValid = false;
                    }
                    iValueIndex++;
                } else {
                    if (sValue.charAt(iValueIndex) !== sChar) {
                        bValid = false;
                    }
                    iValueIndex++;
                }
                if (!bValid) {
                    break;
                }
            }
            if (bValid) {
                return { length: iValueIndex };
            } else {
                var bPartInvalid = false;
                if (oConfig.index < oConfig.formatArray.length - 1) {
                    bPartInvalid = oConfig.formatArray[oConfig.index + 1].type in oFormat.oRequiredParts;
                }
                return { valid: oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat) };
            }
        }
    }),
    'G': DateFormat$1._createPatternSymbol({
        name: 'era',
        format: function (oField, oDate, bUTC, oFormat) {
            var iEra = oDate.getUTCEra();
            if (oField.digits <= 3) {
                return oFormat.aErasAbbrev[iEra];
            } else if (oField.digits === 4) {
                return oFormat.aErasWide[iEra];
            } else {
                return oFormat.aErasNarrow[iEra];
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var aErasVariants = [
                oFormat.aErasWide,
                oFormat.aErasAbbrev,
                oFormat.aErasNarrow
            ];
            for (var i = 0; i < aErasVariants.length; i++) {
                var aVariants = aErasVariants[i];
                var oFound = oParseHelper.findEntry(sValue, aVariants, oFormat.oLocaleData.sCLDRLocaleId);
                if (oFound.index !== -1) {
                    return {
                        era: oFound.index,
                        length: oFound.length
                    };
                }
            }
            return {
                era: oFormat.aErasWide.length - 1,
                valid: oParseHelper.checkValid(oPart.type, true, oFormat)
            };
        }
    }),
    'y': DateFormat$1._createPatternSymbol({
        name: 'year',
        format: function (oField, oDate, bUTC, oFormat) {
            var iYear = oDate.getUTCFullYear();
            var sYear = String(iYear);
            var sCalendarType = oFormat.oFormatOptions.calendarType;
            if (oField.digits === 2 && sYear.length > 2) {
                sYear = sYear.substr(sYear.length - 2);
            }
            if (sCalendarType !== CalendarType.Japanese && oField.digits === 1 && iYear < 100) {
                sYear = sYear.padStart(4, '0');
            }
            return sYear.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var iExpectedDigits, sPart, bPartInvalid, sCalendarType = oFormat.oFormatOptions.calendarType;
            if (oPart.digits === 1) {
                iExpectedDigits = 4;
            } else if (oPart.digits === 2) {
                iExpectedDigits = 2;
            } else {
                iExpectedDigits = oPart.digits;
            }
            sPart = oParseHelper.findNumbers(sValue, iExpectedDigits);
            bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length !== iExpectedDigits;
            var iYear = parseInt(sPart);
            if (sCalendarType !== CalendarType.Japanese && sPart.length <= 2) {
                var oCurrentDate = UniversalDate$1.getInstance(UI5Date$1.getInstance(), sCalendarType), iCurrentYear = oCurrentDate.getUTCFullYear(), iCurrentCentury = Math.floor(iCurrentYear / 100), iYearDiff = iCurrentCentury * 100 + iYear - iCurrentYear;
                if (iYearDiff < -70) {
                    iYear += (iCurrentCentury + 1) * 100;
                } else if (iYearDiff < 30) {
                    iYear += iCurrentCentury * 100;
                } else {
                    iYear += (iCurrentCentury - 1) * 100;
                }
            }
            return {
                length: sPart.length,
                valid: oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat),
                year: iYear
            };
        },
        isNumeric: true
    }),
    'Y': DateFormat$1._createPatternSymbol({
        name: 'weekYear',
        format: function (oField, oDate, bUTC, oFormat) {
            var oWeek = oDate.getUTCWeek(oFormat.oLocale, getCalendarWeekParameter(oFormat.oFormatOptions));
            var iWeekYear = oWeek.year;
            var sWeekYear = String(iWeekYear);
            var sCalendarType = oFormat.oFormatOptions.calendarType;
            if (oField.digits === 2 && sWeekYear.length > 2) {
                sWeekYear = sWeekYear.substr(sWeekYear.length - 2);
            }
            if (sCalendarType !== CalendarType.Japanese && oField.digits === 1 && iWeekYear < 100) {
                sWeekYear = sWeekYear.padStart(4, '0');
            }
            return sWeekYear.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var iExpectedDigits, sPart, bPartInvalid, sCalendarType = oFormat.oFormatOptions.calendarType;
            if (oPart.digits === 1) {
                iExpectedDigits = 4;
            } else if (oPart.digits === 2) {
                iExpectedDigits = 2;
            } else {
                iExpectedDigits = oPart.digits;
            }
            sPart = oParseHelper.findNumbers(sValue, iExpectedDigits);
            bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length !== iExpectedDigits;
            var iYear = parseInt(sPart);
            var iWeekYear = iYear;
            if (sCalendarType !== CalendarType.Japanese && sPart.length <= 2) {
                var oCurrentDate = UniversalDate$1.getInstance(UI5Date$1.getInstance(), sCalendarType), iCurrentYear = oCurrentDate.getUTCFullYear(), iCurrentCentury = Math.floor(iCurrentYear / 100), iYearDiff = iCurrentCentury * 100 + iWeekYear - iCurrentYear;
                if (iYearDiff < -70) {
                    iWeekYear += (iCurrentCentury + 1) * 100;
                } else if (iYearDiff < 30) {
                    iWeekYear += iCurrentCentury * 100;
                } else {
                    iWeekYear += (iCurrentCentury - 1) * 100;
                }
            }
            return {
                length: sPart.length,
                valid: oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat),
                year: iYear,
                weekYear: iWeekYear
            };
        },
        isNumeric: true
    }),
    'M': DateFormat$1._createPatternSymbol({
        name: 'month',
        format: function (oField, oDate, bUTC, oFormat) {
            var iMonth = oDate.getUTCMonth();
            if (oField.digits === 3) {
                return oFormat.aMonthsAbbrev[iMonth];
            } else if (oField.digits === 4) {
                return oFormat.aMonthsWide[iMonth];
            } else if (oField.digits > 4) {
                return oFormat.aMonthsNarrow[iMonth];
            } else {
                return String(iMonth + 1).padStart(oField.digits, '0');
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var iMonth, sPart, bPartInvalid, bValid, aMonthsVariants = [
                    oFormat.aMonthsWide,
                    oFormat.aMonthsWideSt,
                    oFormat.aMonthsAbbrev,
                    oFormat.aMonthsAbbrevSt,
                    oFormat.aMonthsNarrow,
                    oFormat.aMonthsNarrowSt
                ];
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
                bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2;
                bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
                iMonth = parseInt(sPart) - 1;
                if (oConfig.strict && (iMonth > 11 || iMonth < 0)) {
                    bValid = false;
                }
            } else {
                for (var i = 0; i < aMonthsVariants.length; i++) {
                    var aVariants = aMonthsVariants[i];
                    var oFound = oParseHelper.findEntry(sValue, aVariants, oFormat.oLocaleData.sCLDRLocaleId);
                    if (oFound.index !== -1) {
                        return {
                            month: oFound.index,
                            length: oFound.length
                        };
                    }
                }
                bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
            }
            return {
                month: iMonth,
                length: sPart ? sPart.length : 0,
                valid: bValid
            };
        },
        isNumeric: function (iDigits) {
            return iDigits < 3;
        }
    }),
    'L': DateFormat$1._createPatternSymbol({
        name: 'monthStandalone',
        format: function (oField, oDate, bUTC, oFormat) {
            var iMonth = oDate.getUTCMonth();
            if (oField.digits === 3) {
                return oFormat.aMonthsAbbrevSt[iMonth];
            } else if (oField.digits === 4) {
                return oFormat.aMonthsWideSt[iMonth];
            } else if (oField.digits > 4) {
                return oFormat.aMonthsNarrowSt[iMonth];
            } else {
                return String(iMonth + 1).padStart(oField.digits, '0');
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var iMonth, sPart, bPartInvalid, bValid, aMonthsVariants = [
                    oFormat.aMonthsWide,
                    oFormat.aMonthsWideSt,
                    oFormat.aMonthsAbbrev,
                    oFormat.aMonthsAbbrevSt,
                    oFormat.aMonthsNarrow,
                    oFormat.aMonthsNarrowSt
                ];
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
                bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2;
                bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
                iMonth = parseInt(sPart) - 1;
                if (oConfig.strict && (iMonth > 11 || iMonth < 0)) {
                    bValid = false;
                }
            } else {
                for (var i = 0; i < aMonthsVariants.length; i++) {
                    var aVariants = aMonthsVariants[i];
                    var oFound = oParseHelper.findEntry(sValue, aVariants, oFormat.oLocaleData.sCLDRLocaleId);
                    if (oFound.index !== -1) {
                        return {
                            month: oFound.index,
                            length: oFound.length
                        };
                    }
                }
                bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
            }
            return {
                month: iMonth,
                length: sPart ? sPart.length : 0,
                valid: bValid
            };
        },
        isNumeric: function (iDigits) {
            return iDigits < 3;
        }
    }),
    'w': DateFormat$1._createPatternSymbol({
        name: 'weekInYear',
        format: function (oField, oDate, bUTC, oFormat) {
            var oWeek = oDate.getUTCWeek(oFormat.oLocale, getCalendarWeekParameter(oFormat.oFormatOptions));
            var iWeek = oWeek.week;
            var sWeek = String(iWeek + 1);
            if (oField.digits < 3) {
                sWeek = sWeek.padStart(oField.digits, '0');
            } else {
                sWeek = oFormat.oLocaleData.getCalendarWeek(oField.digits === 3 ? 'narrow' : 'wide', sWeek.padStart(2, '0'));
            }
            return sWeek;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart, bPartInvalid, bValid, iWeek, iLength = 0;
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, 2);
                iLength = sPart.length;
                iWeek = parseInt(sPart) - 1;
                bPartInvalid = !sPart || oConfig.exactLength && iLength < 2;
                bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
            } else {
                sPart = oFormat.oLocaleData.getCalendarWeek(oPart.digits === 3 ? 'narrow' : 'wide');
                sPart = sPart.replace('{0}', '([0-9]+)');
                var rWeekNumber = new RegExp(sPart), oResult = rWeekNumber.exec(sValue);
                if (oResult) {
                    iLength = oResult[0].length;
                    iWeek = parseInt(oResult[oResult.length - 1]) - 1;
                } else {
                    bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
                }
            }
            return {
                length: iLength,
                valid: bValid,
                week: iWeek
            };
        },
        isNumeric: function (iDigits) {
            return iDigits < 3;
        }
    }),
    'W': DateFormat$1._createPatternSymbol({ name: 'weekInMonth' }),
    'D': DateFormat$1._createPatternSymbol({ name: 'dayInYear' }),
    'd': DateFormat$1._createPatternSymbol({
        name: 'day',
        format: function (oField, oDate) {
            var iDate = oDate.getUTCDate();
            return String(iDate).padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2)), bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2, bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat), iDay = parseInt(sPart);
            if (oConfig.strict && (iDay > 31 || iDay < 1)) {
                bValid = false;
            }
            return {
                day: iDay,
                length: sPart.length,
                valid: bValid
            };
        },
        isNumeric: true
    }),
    'Q': DateFormat$1._createPatternSymbol({
        name: 'quarter',
        format: function (oField, oDate, bUTC, oFormat) {
            var iQuarter = oDate.getUTCQuarter();
            if (oField.digits === 3) {
                return oFormat.aQuartersAbbrev[iQuarter];
            } else if (oField.digits === 4) {
                return oFormat.aQuartersWide[iQuarter];
            } else if (oField.digits > 4) {
                return oFormat.aQuartersNarrow[iQuarter];
            } else {
                return String(iQuarter + 1).padStart(oField.digits, '0');
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart, bPartInvalid, iQuarter, bValid;
            var aQuartersVariants = [
                oFormat.aQuartersWide,
                oFormat.aQuartersWideSt,
                oFormat.aQuartersAbbrev,
                oFormat.aQuartersAbbrevSt,
                oFormat.aQuartersNarrow,
                oFormat.aQuartersNarrowSt
            ];
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
                bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2;
                bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
                iQuarter = parseInt(sPart) - 1;
                if (oConfig.strict && iQuarter > 3) {
                    bValid = false;
                }
            } else {
                for (var i = 0; i < aQuartersVariants.length; i++) {
                    var aVariants = aQuartersVariants[i];
                    var oFound = oParseHelper.findEntry(sValue, aVariants, oFormat.oLocaleData.sCLDRLocaleId);
                    if (oFound.index !== -1) {
                        return {
                            quarter: oFound.index,
                            length: oFound.length
                        };
                    }
                }
                bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
            }
            return {
                length: sPart ? sPart.length : 0,
                quarter: iQuarter,
                valid: bValid
            };
        },
        isNumeric: function (iDigits) {
            return iDigits < 3;
        }
    }),
    'q': DateFormat$1._createPatternSymbol({
        name: 'quarterStandalone',
        format: function (oField, oDate, bUTC, oFormat) {
            var iQuarter = oDate.getUTCQuarter();
            if (oField.digits === 3) {
                return oFormat.aQuartersAbbrevSt[iQuarter];
            } else if (oField.digits === 4) {
                return oFormat.aQuartersWideSt[iQuarter];
            } else if (oField.digits > 4) {
                return oFormat.aQuartersNarrowSt[iQuarter];
            } else {
                return String(iQuarter + 1).padStart(oField.digits, '0');
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart, bPartInvalid, iQuarter, bValid;
            var aQuartersVariants = [
                oFormat.aQuartersWide,
                oFormat.aQuartersWideSt,
                oFormat.aQuartersAbbrev,
                oFormat.aQuartersAbbrevSt,
                oFormat.aQuartersNarrow,
                oFormat.aQuartersNarrowSt
            ];
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
                bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2;
                bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
                iQuarter = parseInt(sPart) - 1;
                if (oConfig.strict && iQuarter > 3) {
                    bValid = false;
                }
            } else {
                for (var i = 0; i < aQuartersVariants.length; i++) {
                    var aVariants = aQuartersVariants[i];
                    var oFound = oParseHelper.findEntry(sValue, aVariants, oFormat.oLocaleData.sCLDRLocaleId);
                    if (oFound.index !== -1) {
                        return {
                            quarter: oFound.index,
                            length: oFound.length
                        };
                    }
                }
                bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
            }
            return {
                length: sPart ? sPart.length : 0,
                quarter: iQuarter,
                valid: bValid
            };
        },
        isNumeric: function (iDigits) {
            return iDigits < 3;
        }
    }),
    'F': DateFormat$1._createPatternSymbol({ name: 'dayOfWeekInMonth' }),
    'E': DateFormat$1._createPatternSymbol({
        name: 'dayNameInWeek',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDay = oDate.getUTCDay();
            if (oField.digits < 4) {
                return oFormat.aDaysAbbrev[iDay];
            } else if (oField.digits === 4) {
                return oFormat.aDaysWide[iDay];
            } else if (oField.digits === 5) {
                return oFormat.aDaysNarrow[iDay];
            } else {
                return oFormat.aDaysShort[iDay];
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var aDaysVariants = [
                oFormat.aDaysWide,
                oFormat.aDaysWideSt,
                oFormat.aDaysAbbrev,
                oFormat.aDaysAbbrevSt,
                oFormat.aDaysShort,
                oFormat.aDaysShortSt,
                oFormat.aDaysNarrow,
                oFormat.aDaysNarrowSt
            ];
            for (var i = 0; i < aDaysVariants.length; i++) {
                var aVariants = aDaysVariants[i];
                var oFound = oParseHelper.findEntry(sValue, aVariants, oFormat.oLocaleData.sCLDRLocaleId);
                if (oFound.index !== -1) {
                    return {
                        dayOfWeek: oFound.index,
                        length: oFound.length
                    };
                }
            }
        }
    }),
    'c': DateFormat$1._createPatternSymbol({
        name: 'dayNameInWeekStandalone',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDay = oDate.getUTCDay();
            if (oField.digits < 4) {
                return oFormat.aDaysAbbrevSt[iDay];
            } else if (oField.digits === 4) {
                return oFormat.aDaysWideSt[iDay];
            } else if (oField.digits === 5) {
                return oFormat.aDaysNarrowSt[iDay];
            } else {
                return oFormat.aDaysShortSt[iDay];
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var aDaysVariants = [
                oFormat.aDaysWide,
                oFormat.aDaysWideSt,
                oFormat.aDaysAbbrev,
                oFormat.aDaysAbbrevSt,
                oFormat.aDaysShort,
                oFormat.aDaysShortSt,
                oFormat.aDaysNarrow,
                oFormat.aDaysNarrowSt
            ];
            for (var i = 0; i < aDaysVariants.length; i++) {
                var aVariants = aDaysVariants[i];
                var oFound = oParseHelper.findEntry(sValue, aVariants, oFormat.oLocaleData.sCLDRLocaleId);
                if (oFound.index !== -1) {
                    return {
                        day: oFound.index,
                        length: oFound.length
                    };
                }
            }
        }
    }),
    'u': DateFormat$1._createPatternSymbol({
        name: 'dayNumberOfWeek',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDay = oDate.getUTCDay();
            return oFormat._adaptDayOfWeek(iDay);
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, oPart.digits), bPartInvalid = oConfig.exactLength && sPart.length !== oPart.digits;
            return {
                dayNumberOfWeek: parseInt(sPart),
                length: sPart.length,
                valid: oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat)
            };
        },
        isNumeric: true
    }),
    'a': DateFormat$1._createPatternSymbol({
        name: 'amPmMarker',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDayPeriod = oDate.getUTCDayPeriod();
            if (oField.digits <= 3) {
                return oFormat.aDayPeriodsAbbrev[iDayPeriod];
            } else if (oField.digits === 4) {
                return oFormat.aDayPeriodsWide[iDayPeriod];
            } else {
                return oFormat.aDayPeriodsNarrow[iDayPeriod];
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig, sTimezone) {
            var rAMPM, bAMPMAlternativeCase, oEntry, i, aMatch, normalize, aVariants, aDayPeriodsVariants = [
                    oFormat.aDayPeriodsWide,
                    oFormat.aDayPeriodsAbbrev,
                    oFormat.aDayPeriodsNarrow
                ];
            rAMPM = /[aApP](?:\.)?[\x20\xA0]?[mM](?:\.)?/;
            aMatch = sValue.match(rAMPM);
            bAMPMAlternativeCase = aMatch && aMatch.index === 0;
            function normalize(sValue) {
                return sValue.replace(/[\x20\xA0]/g, '').replace(/\./g, '');
            }
            if (bAMPMAlternativeCase) {
                sValue = normalize(sValue);
            }
            for (i = 0; i < aDayPeriodsVariants.length; i += 1) {
                aVariants = aDayPeriodsVariants[i];
                if (bAMPMAlternativeCase) {
                    aVariants = aVariants.map(normalize);
                }
                oEntry = oParseHelper.findEntry(sValue, aVariants, oFormat.oLocaleData.sCLDRLocaleId);
                if (oEntry.index !== -1) {
                    return {
                        pm: oEntry.index === 1,
                        length: bAMPMAlternativeCase ? aMatch[0].length : oEntry.length
                    };
                }
            }
            return { valid: false };
        }
    }),
    'B': DateFormat$1._createPatternSymbol({
        name: 'flexibleDayPeriod',
        format: function (oField, oDate, bUTC, oFormat) {
            var bContainsHour = oFormat.aFormatArray.some(function (oFormatElement) {
                    return 'hHKk'.includes(oFormatElement.symbol);
                }), sFlexibleDayPeriod = oFormat.oLocaleData.getFlexibleDayPeriodOfTime(oDate.getUTCHours(), oDate.getUTCMinutes());
            if (bContainsHour) {
                if (oField.digits <= 3) {
                    return oFormat.oFlexibleDayPeriodsAbbrev[sFlexibleDayPeriod];
                }
                if (oField.digits === 4) {
                    return oFormat.oFlexibleDayPeriodsWide[sFlexibleDayPeriod];
                }
                return oFormat.oFlexibleDayPeriodsNarrow[sFlexibleDayPeriod];
            }
            if (oField.digits <= 3) {
                return oFormat.oFlexibleDayPeriodsAbbrevSt[sFlexibleDayPeriod];
            }
            if (oField.digits === 4) {
                return oFormat.oFlexibleDayPeriodsWideSt[sFlexibleDayPeriod];
            }
            return oFormat.oFlexibleDayPeriodsNarrowSt[sFlexibleDayPeriod];
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var i, oFound, oVariant, bContainsHour = oFormat.aFormatArray.some(function (oFormatElement) {
                    return 'hHKk'.includes(oFormatElement.symbol);
                }), aFlexibleDayPeriodVariants = [
                    oFormat.oFlexibleDayPeriodsWide,
                    oFormat.oFlexibleDayPeriodsAbbrev,
                    oFormat.oFlexibleDayPeriodsNarrow
                ];
            if (bContainsHour) {
                for (i = 0; i < aFlexibleDayPeriodVariants.length; i++) {
                    oVariant = aFlexibleDayPeriodVariants[i];
                    oFound = oParseHelper.findEntry(sValue, Object.values(oVariant), oFormat.oLocaleData.sCLDRLocaleId);
                    if (oFound.index !== -1) {
                        return {
                            flexDayPeriod: Object.keys(oVariant)[oFound.index],
                            length: oFound.length
                        };
                    }
                }
            }
            return { valid: false };
        }
    }),
    'H': DateFormat$1._createPatternSymbol({
        name: 'hour0_23',
        format: function (oField, oDate) {
            var iHours = oDate.getUTCHours();
            return String(iHours).padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2)), iHours = parseInt(sPart), bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2, bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
            if (oConfig.strict && iHours > 23) {
                bValid = false;
            }
            return {
                hour: iHours,
                length: sPart.length,
                valid: bValid
            };
        },
        isNumeric: true
    }),
    'k': DateFormat$1._createPatternSymbol({
        name: 'hour1_24',
        format: function (oField, oDate) {
            var iHours = oDate.getUTCHours();
            var sHours = iHours === 0 ? '24' : String(iHours);
            return sHours.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2)), iHours = parseInt(sPart), bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2, bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
            if (iHours === 24) {
                iHours = 0;
            }
            if (oConfig.strict && iHours > 23) {
                bValid = false;
            }
            return {
                hour: iHours,
                length: sPart.length,
                valid: bValid
            };
        },
        isNumeric: true
    }),
    'K': DateFormat$1._createPatternSymbol({
        name: 'hour0_11',
        format: function (oField, oDate) {
            var iHours = oDate.getUTCHours();
            var sHours = String(iHours > 11 ? iHours - 12 : iHours);
            return sHours.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2)), iHours = parseInt(sPart), bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2, bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
            if (oConfig.strict && iHours > 11) {
                bValid = false;
            }
            return {
                hour: iHours,
                length: sPart.length,
                valid: bValid
            };
        },
        isNumeric: true
    }),
    'h': DateFormat$1._createPatternSymbol({
        name: 'hour1_12',
        format: function (oField, oDate) {
            var iHours = oDate.getUTCHours();
            var sHours;
            if (iHours > 12) {
                sHours = String(iHours - 12);
            } else if (iHours === 0) {
                sHours = '12';
            } else {
                sHours = String(iHours);
            }
            return sHours.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bPM = oConfig.dateValue.pm, sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2)), iHours = parseInt(sPart), bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2, bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
            if (iHours === 12) {
                iHours = 0;
                bPM = bPM === undefined ? true : bPM;
            }
            if (oConfig.strict && iHours > 11) {
                bValid = false;
            }
            return {
                hour: iHours,
                length: sPart.length,
                pm: bPM,
                valid: bValid
            };
        },
        isNumeric: true
    }),
    'm': DateFormat$1._createPatternSymbol({
        name: 'minute',
        format: function (oField, oDate) {
            var iMinutes = oDate.getUTCMinutes();
            return String(iMinutes).padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2)), iMinutes = parseInt(sPart), bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < 2, bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
            if (oConfig.strict && iMinutes > 59) {
                bValid = false;
            }
            return {
                length: sPart.length,
                minute: iMinutes,
                valid: bValid
            };
        },
        isNumeric: true
    }),
    's': DateFormat$1._createPatternSymbol({
        name: 'second',
        format: function (oField, oDate) {
            var iSeconds = oDate.getUTCSeconds();
            return String(iSeconds).padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var iExpectedDigits = Math.max(oPart.digits, 2), sPart = oParseHelper.findNumbers(sValue, iExpectedDigits), bPartInvalid = sPart === '' || oConfig.exactLength && sPart.length < iExpectedDigits, iSeconds = parseInt(sPart), bValid = oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat);
            if (oConfig.strict && iSeconds > 59) {
                bValid = false;
            }
            return {
                length: sPart.length,
                second: iSeconds,
                valid: bValid
            };
        },
        isNumeric: true
    }),
    'S': DateFormat$1._createPatternSymbol({
        name: 'fractionalsecond',
        format: function (oField, oDate) {
            var iMilliseconds = oDate.getUTCMilliseconds();
            var sMilliseconds = String(iMilliseconds);
            var sFractionalseconds = sMilliseconds.padStart(3, '0');
            sFractionalseconds = sFractionalseconds.substr(0, oField.digits);
            sFractionalseconds = sFractionalseconds.padEnd(oField.digits, '0');
            return sFractionalseconds;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, oPart.digits), iLength = sPart.length, bPartInvalid = oConfig.exactLength && iLength < oPart.digits;
            sPart = sPart.substr(0, 3);
            sPart = sPart.padEnd(3, '0');
            var iMilliseconds = parseInt(sPart);
            return {
                length: iLength,
                millisecond: iMilliseconds,
                valid: oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat)
            };
        },
        isNumeric: true
    }),
    'z': DateFormat$1._createPatternSymbol({
        name: 'timezoneGeneral',
        format: function (oField, oDate, bUTC, oFormat, sTimezone) {
            if (oField.digits > 3 && oDate.getTimezoneLong && oDate.getTimezoneLong()) {
                return oDate.getTimezoneLong();
            } else if (oDate.getTimezoneShort && oDate.getTimezoneShort()) {
                return oDate.getTimezoneShort();
            }
            var iTimezoneOffset = TimezoneUtils.calculateOffset(oDate, sTimezone);
            var sTimeZone = 'GMT';
            var iTZOffset = Math.abs(iTimezoneOffset / 60);
            var bPositiveOffset = iTimezoneOffset > 0;
            var iHourOffset = Math.floor(iTZOffset / 60);
            var iMinuteOffset = Math.floor(iTZOffset % 60);
            if (!bUTC && iTZOffset !== 0) {
                sTimeZone += bPositiveOffset ? '-' : '+';
                sTimeZone += String(iHourOffset).padStart(2, '0');
                sTimeZone += ':';
                sTimeZone += String(iMinuteOffset).padStart(2, '0');
            } else {
                sTimeZone += 'Z';
            }
            return sTimeZone;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var iLength = 0;
            var iTZDiff;
            var oTZ = sValue.substring(0, 3);
            if (oTZ === 'GMT' || oTZ === 'UTC') {
                iLength = 3;
            } else if (sValue.substring(0, 2) === 'UT') {
                iLength = 2;
            } else if (sValue.charAt(0) === 'Z') {
                iLength = 1;
                iTZDiff = 0;
            } else {
                return { error: 'cannot be parsed correctly by sap.ui.core.format.DateFormat: The given timezone is not supported!' };
            }
            if (sValue.charAt(0) !== 'Z') {
                var oParsedTZ = oParseHelper.parseTZ(sValue.substr(iLength), true);
                iLength += oParsedTZ.length;
                iTZDiff = oParsedTZ.tzDiff;
            }
            return {
                length: iLength,
                tzDiff: iTZDiff
            };
        }
    }),
    'Z': DateFormat$1._createPatternSymbol({
        name: 'timezoneRFC822',
        format: function (oField, oDate, bUTC, oFormat, sTimezone) {
            var iTimezoneOffset = TimezoneUtils.calculateOffset(oDate, sTimezone);
            var iTZOffset = Math.abs(iTimezoneOffset / 60);
            var bPositiveOffset = iTimezoneOffset > 0;
            var iHourOffset = Math.floor(iTZOffset / 60);
            var iMinuteOffset = Math.floor(iTZOffset % 60);
            var sTimeZone = '';
            if (!bUTC) {
                sTimeZone += bPositiveOffset ? '-' : '+';
                sTimeZone += String(iHourOffset).padStart(2, '0');
                sTimeZone += String(iMinuteOffset).padStart(2, '0');
            }
            return sTimeZone;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            return oParseHelper.parseTZ(sValue, false);
        }
    }),
    'X': DateFormat$1._createPatternSymbol({
        name: 'timezoneISO8601',
        format: function (oField, oDate, bUTC, oFormat, sTimezone) {
            var iTimezoneOffset = TimezoneUtils.calculateOffset(oDate, sTimezone);
            var iTZOffset = Math.abs(iTimezoneOffset / 60);
            var bPositiveOffset = iTimezoneOffset > 0;
            var iHourOffset = Math.floor(iTZOffset / 60);
            var iMinuteOffset = Math.floor(iTZOffset % 60);
            var sTimeZone = '';
            if (!bUTC && iTZOffset !== 0) {
                sTimeZone += bPositiveOffset ? '-' : '+';
                sTimeZone += String(iHourOffset).padStart(2, '0');
                if (oField.digits > 1 || iMinuteOffset > 0) {
                    if (oField.digits === 3 || oField.digits === 5) {
                        sTimeZone += ':';
                    }
                    sTimeZone += String(iMinuteOffset).padStart(2, '0');
                }
            } else {
                sTimeZone += 'Z';
            }
            return sTimeZone;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            if (sValue.charAt(0) === 'Z') {
                return {
                    length: 1,
                    tzDiff: 0
                };
            } else {
                return oParseHelper.parseTZ(sValue, oPart.digits === 3 || oPart.digits === 5);
            }
        }
    }),
    'V': DateFormat$1._createPatternSymbol({
        name: 'timezoneID',
        format: function (oField, oDate, bUTC, oFormat, sTimezone) {
            if (!bUTC && oField.digits === 2) {
                return oFormat.oLocaleData.getTimezoneTranslations()[sTimezone] || sTimezone;
            }
            return '';
        },
        parse: function (sValue, oPart, oFormat, oConfig, sTimezone) {
            var oTimezoneParsed = {
                timezone: '',
                length: 0
            };
            if (oPart.digits === 2) {
                var mTimezoneTranslations = oFormat.oLocaleData.getTimezoneTranslations();
                if (sValue === mTimezoneTranslations[sTimezone]) {
                    return {
                        timezone: sTimezone,
                        length: sValue.length
                    };
                }
                var aTimezoneTranslations = Object.values(mTimezoneTranslations);
                var oTimezoneResult = oParseHelper.findEntry(sValue, aTimezoneTranslations, oFormat.oLocaleData.sCLDRLocaleId);
                if (oTimezoneResult.index !== -1) {
                    return {
                        timezone: Object.keys(mTimezoneTranslations)[oTimezoneResult.index],
                        length: oTimezoneResult.length
                    };
                }
                var sCurrentValue = '';
                for (var i = 0; i < sValue.length; i++) {
                    sCurrentValue += sValue[i];
                    if (TimezoneUtils.isValidTimezone(sCurrentValue)) {
                        oTimezoneParsed.timezone = sCurrentValue;
                        oTimezoneParsed.length = sCurrentValue.length;
                    }
                }
            }
            return oTimezoneParsed;
        }
    })
};
DateFormat$1.prototype._format = function (oJSDate, bUTC, sTimezone) {
    if (this.oFormatOptions.relative) {
        var sRes = this.formatRelative(oJSDate, bUTC, this.oFormatOptions.relativeRange, sTimezone);
        if (sRes) {
            return sRes;
        }
    }
    var sCalendarType = this.oFormatOptions.calendarType;
    var oDate = UniversalDate$1.getInstance(oJSDate, sCalendarType);
    var aBuffer = [], oPart, sResult, sSymbol;
    for (var i = 0; i < this.aFormatArray.length; i++) {
        oPart = this.aFormatArray[i];
        sSymbol = oPart.symbol || '';
        aBuffer.push(this.oSymbols[sSymbol].format(oPart, oDate, bUTC, this, sTimezone));
    }
    sResult = aBuffer.join('');
    if (Configuration.getOriginInfo()) {
        sResult = new String(sResult);
        sResult.originInfo = {
            source: 'Common Locale Data Repository',
            locale: this.oLocale.toString(),
            style: this.oFormatOptions.style,
            pattern: this.oFormatOptions.pattern
        };
    }
    return sResult;
};
DateFormat$1.prototype.format = function (vJSDate, bUTC) {
    var sTimezone;
    if (this.type === mDateFormatTypes.DATETIME_WITH_TIMEZONE) {
        sTimezone = bUTC;
        bUTC = false;
        checkTimezoneParameterType(sTimezone);
        if (sTimezone && !TimezoneUtils.isValidTimezone(sTimezone)) {
            Log.error('The given timezone isn\'t valid.');
            return '';
        }
    }
    var sCalendarType = this.oFormatOptions.calendarType, sResult;
    if (bUTC === undefined) {
        bUTC = this.oFormatOptions.UTC;
    }
    sTimezone = sTimezone || Configuration.getTimezone();
    if (Array.isArray(vJSDate)) {
        if (!this.oFormatOptions.interval) {
            Log.error('Non-interval DateFormat can\'t format more than one date instance.');
            return '';
        }
        if (vJSDate.length !== 2) {
            Log.error('Interval DateFormat can only format with 2 date instances but ' + vJSDate.length + ' is given.');
            return '';
        }
        vJSDate = vJSDate.map(function (oJSDate) {
            return convertToTimezone(oJSDate, sTimezone, bUTC);
        });
        if (this.oFormatOptions.singleIntervalValue) {
            if (vJSDate[0] === null) {
                Log.error('First date instance which is passed to the interval DateFormat shouldn\'t be null.');
                return '';
            }
            if (vJSDate[1] === null) {
                sResult = this._format(vJSDate[0], bUTC, sTimezone);
            }
        }
        if (sResult === undefined) {
            if (!vJSDate.every(isValidDateObject)) {
                Log.error('At least one date instance which is passed to the interval DateFormat isn\'t valid.');
                return '';
            }
            sResult = this._formatInterval(vJSDate, bUTC);
        }
    } else {
        if (!isValidDateObject(vJSDate)) {
            if (this.type === mDateFormatTypes.DATETIME_WITH_TIMEZONE && this.oFormatOptions.pattern.includes('VV')) {
                return this.oLocaleData.getTimezoneTranslations()[sTimezone] || sTimezone;
            }
            Log.error('The given date instance isn\'t valid.');
            return '';
        }
        if (this.oFormatOptions.interval) {
            Log.error('Interval DateFormat expects an array with two dates for the first argument but only one date is given.');
            return '';
        }
        vJSDate = convertToTimezone(vJSDate, sTimezone, bUTC);
        sResult = this._format(vJSDate, bUTC, sTimezone);
    }
    if (sCalendarType === CalendarType.Japanese && this.oLocale.getLanguage() === 'ja') {
        sResult = sResult.replace(/(^|[^\d])1年/g, '$1元年');
    }
    return sResult;
};
DateFormat$1.prototype._useCustomIntervalDelimiter = function (oDiffFields) {
    var aTokens;
    if (!this.oFormatOptions.intervalDelimiter) {
        return false;
    }
    if (this.oFormatOptions.format) {
        aTokens = this.oLocaleData._parseSkeletonFormat(this.oFormatOptions.format);
        return aTokens.some(function (oToken) {
            return oDiffFields[oToken.group];
        });
    }
    return true;
};
DateFormat$1.prototype._formatInterval = function (aJSDates, bUTC) {
    var oDate, oPart, sPattern, sSymbol, aBuffer = [], sCalendarType = this.oFormatOptions.calendarType, aFormatArray = [], oFromDate = UniversalDate$1.getInstance(aJSDates[0], sCalendarType), oToDate = UniversalDate$1.getInstance(aJSDates[1], sCalendarType), oDiffFields = this._getDiffFields([
            oFromDate,
            oToDate
        ]);
    if (!oDiffFields) {
        return this._format(aJSDates[0], bUTC);
    }
    if (this._useCustomIntervalDelimiter(oDiffFields)) {
        sPattern = this.intervalPatterns[0];
    } else if (this.oFormatOptions.format) {
        sPattern = this.oLocaleData.getCustomIntervalPattern(this.oFormatOptions.format, oDiffFields, sCalendarType);
    } else {
        sPattern = this.oLocaleData.getCombinedIntervalPattern(this.oFormatOptions.pattern, sCalendarType);
    }
    aFormatArray = this.parseCldrDatePattern(sPattern);
    oDate = oFromDate;
    for (var i = 0; i < aFormatArray.length; i++) {
        oPart = aFormatArray[i];
        sSymbol = oPart.symbol || '';
        if (oPart.repeat) {
            oDate = oToDate;
        }
        aBuffer.push(this.oSymbols[sSymbol].format(oPart, oDate, bUTC, this));
    }
    return aBuffer.join('');
};
var mFieldToGroup = {
    Era: 'Era',
    FullYear: 'Year',
    Quarter: 'Quarter',
    Month: 'Month',
    Week: 'Week',
    Date: 'Day',
    DayPeriod: 'DayPeriod',
    Hours: 'Hour',
    Minutes: 'Minute',
    Seconds: 'Second'
};
DateFormat$1.prototype._getDiffFields = function (aDates) {
    var bDiffFound = false, mDiff = {};
    this.aIntervalCompareFields.forEach(function (sField) {
        var sGetterPrefix = 'getUTC', sMethodName = sGetterPrefix + sField, sFieldGroup = mFieldToGroup[sField], vFromValue = aDates[0][sMethodName].apply(aDates[0]), vToValue = aDates[1][sMethodName].apply(aDates[1]);
        if (!fnEqual(vFromValue, vToValue)) {
            bDiffFound = true;
            mDiff[sFieldGroup] = true;
        }
    });
    if (bDiffFound) {
        return mDiff;
    }
    return null;
};
DateFormat$1.prototype._parse = function (sValue, aFormatArray, bUTC, bStrict, sTimezone) {
    var sFlexibleDayPeriod, oNextPart, oPart, bPM, oPrevPart, oResult, sSubValue, oDateValue = {
            valid: true,
            lastTimezonePatternSymbol: ''
        }, iIndex = 0, oParseConf = {
            formatArray: aFormatArray,
            dateValue: oDateValue,
            strict: bStrict
        }, that = this;
    function getSymbol(oPart0) {
        return that.oSymbols[oPart0.symbol || ''];
    }
    function isNumeric(oPart0) {
        return !!oPart0 && getSymbol(oPart0).isNumeric(oPart0.digits);
    }
    for (var i = 0; i < aFormatArray.length; i++) {
        sSubValue = sValue.substr(iIndex);
        oPart = aFormatArray[i];
        oPrevPart = aFormatArray[i - 1];
        oNextPart = aFormatArray[i + 1];
        oParseConf.index = i;
        oParseConf.exactLength = isNumeric(oPart) && (isNumeric(oPrevPart) || isNumeric(oNextPart));
        oResult = getSymbol(oPart).parse(sSubValue, oPart, this, oParseConf, sTimezone) || {};
        if (oResult.tzDiff !== undefined || oResult.timezone) {
            oResult.lastTimezonePatternSymbol = oPart.symbol;
        }
        oDateValue = fnExtend(oDateValue, oResult);
        if (oResult.valid === false) {
            break;
        }
        iIndex += oResult.length || 0;
    }
    oDateValue.index = iIndex;
    bPM = oDateValue.pm;
    if (oDateValue.flexDayPeriod && oDateValue.hour * 60 + (oDateValue.minute || 0) < 720) {
        sFlexibleDayPeriod = this.oLocaleData.getFlexibleDayPeriodOfTime(oDateValue.hour + 12, oDateValue.minute || 0);
        bPM = oDateValue.flexDayPeriod === sFlexibleDayPeriod;
    }
    if (bPM) {
        oDateValue.hour += 12;
    }
    if (oDateValue.dayNumberOfWeek === undefined && oDateValue.dayOfWeek !== undefined) {
        oDateValue.dayNumberOfWeek = this._adaptDayOfWeek(oDateValue.dayOfWeek);
    }
    if (oDateValue.quarter !== undefined && oDateValue.month === undefined && oDateValue.day === undefined) {
        oDateValue.month = 3 * oDateValue.quarter;
        oDateValue.day = 1;
    }
    return oDateValue;
};
DateFormat$1.prototype._parseInterval = function (sValue, sCalendarType, bUTC, bStrict, sTimezone) {
    var aDateValues, iRepeat, oDateValue;
    this.intervalPatterns.some(function (sPattern) {
        var aFormatArray = this.parseCldrDatePattern(sPattern);
        iRepeat = undefined;
        for (var i = 0; i < aFormatArray.length; i++) {
            if (aFormatArray[i].repeat) {
                iRepeat = i;
                break;
            }
        }
        if (iRepeat === undefined) {
            oDateValue = this._parse(sValue, aFormatArray, bUTC, bStrict, sTimezone);
            if (oDateValue.index === 0 || oDateValue.index < sValue.length) {
                oDateValue.valid = false;
            }
            if (oDateValue.valid === false) {
                return;
            }
            aDateValues = [
                oDateValue,
                oDateValue
            ];
            return true;
        } else {
            aDateValues = [];
            oDateValue = this._parse(sValue, aFormatArray.slice(0, iRepeat), bUTC, bStrict, sTimezone);
            if (oDateValue.valid === false) {
                return;
            }
            aDateValues.push(oDateValue);
            var iLength = oDateValue.index;
            oDateValue = this._parse(sValue.substring(iLength), aFormatArray.slice(iRepeat), bUTC, bStrict, sTimezone);
            if (oDateValue.index === 0 || oDateValue.index + iLength < sValue.length) {
                oDateValue.valid = false;
            }
            if (oDateValue.valid === false) {
                return;
            }
            aDateValues.push(oDateValue);
            return true;
        }
    }.bind(this));
    return aDateValues;
};
function getCalendarWeekParameter(oFormatOptions) {
    if (oFormatOptions.calendarWeekNumbering) {
        return oFormatOptions.calendarWeekNumbering;
    } else if (oFormatOptions.firstDayOfWeek !== undefined && oFormatOptions.minimalDaysInFirstWeek !== undefined) {
        return {
            firstDayOfWeek: oFormatOptions.firstDayOfWeek,
            minimalDaysInFirstWeek: oFormatOptions.minimalDaysInFirstWeek
        };
    }
    return undefined;
}
var convertToTimezone = function (oJSDate, sTimezone, bUTC) {
    if (!bUTC && isValidDateObject(oJSDate)) {
        return TimezoneUtils.convertToTimezone(oJSDate, sTimezone);
    }
    return oJSDate;
};
var fnCreateDate = function (oDateValue, sCalendarType, bUTC, bStrict, sTimezone, oFormatOptions, oLocale) {
    if (!oDateValue.valid) {
        return null;
    }
    var oDate, iYear = typeof oDateValue.year === 'number' ? oDateValue.year : 1970;
    oDate = UniversalDate$1.getInstance(new Date(0), sCalendarType);
    oDate.setUTCEra(oDateValue.era || UniversalDate$1.getCurrentEra(sCalendarType));
    oDate.setUTCFullYear(iYear);
    oDate.setUTCMonth(oDateValue.month || 0);
    oDate.setUTCDate(oDateValue.day || 1);
    oDate.setUTCHours(oDateValue.hour || 0);
    oDate.setUTCMinutes(oDateValue.minute || 0);
    oDate.setUTCSeconds(oDateValue.second || 0);
    oDate.setUTCMilliseconds(oDateValue.millisecond || 0);
    if (bStrict && (oDateValue.day || 1) !== oDate.getUTCDate()) {
        return null;
    }
    if (oDateValue.week !== undefined && (oDateValue.month === undefined || oDateValue.day === undefined)) {
        oDate.setUTCWeek({
            year: oDateValue.weekYear || oDateValue.year,
            week: oDateValue.week
        }, oLocale, getCalendarWeekParameter(oFormatOptions));
        if (oDateValue.dayNumberOfWeek !== undefined) {
            oDate.setUTCDate(oDate.getUTCDate() + oDateValue.dayNumberOfWeek - 1);
        }
    }
    oDate = oDate.getJSDate();
    if (!bUTC && (oDateValue.lastTimezonePatternSymbol === 'V' && oDateValue.timezone || oDateValue.tzDiff === undefined)) {
        if (oDateValue.timezone) {
            sTimezone = oDateValue.timezone;
        }
        if (sTimezone) {
            oDateValue.tzDiff = TimezoneUtils.calculateOffset(oDate, sTimezone);
        }
    }
    if (oDateValue.tzDiff) {
        oDate.setUTCSeconds(oDate.getUTCSeconds() + oDateValue.tzDiff);
    }
    return oDate;
};
function mergeWithoutOverwrite(object1, object2) {
    if (object1 === object2) {
        return object1;
    }
    var oMergedObject = {};
    Object.keys(object1).forEach(function (sKey) {
        oMergedObject[sKey] = object1[sKey];
    });
    Object.keys(object2).forEach(function (sKey) {
        if (!oMergedObject.hasOwnProperty(sKey)) {
            oMergedObject[sKey] = object2[sKey];
        }
    });
    return oMergedObject;
}
function isValidDateRange(oStartDate, oEndDate) {
    if (oStartDate.getTime() > oEndDate.getTime()) {
        return false;
    }
    return true;
}
function isValidDateObject(oDate) {
    return oDate && typeof oDate.getTime === 'function' && !isNaN(oDate.getTime());
}
DateFormat$1.prototype.parse = function (sValue, bUTC, bStrict) {
    var bShowDate = this.oFormatOptions.showDate === undefined || this.oFormatOptions.showDate;
    var bShowTime = this.oFormatOptions.showTime === undefined || this.oFormatOptions.showTime;
    if (this.type === mDateFormatTypes.DATETIME_WITH_TIMEZONE && (bShowDate && !bShowTime || !bShowDate && bShowTime)) {
        throw new TypeError('The input can only be parsed back to date if both date and time are supplied.');
    }
    var sTimezone;
    if (bUTC === undefined && this.type !== mDateFormatTypes.DATETIME_WITH_TIMEZONE) {
        bUTC = this.oFormatOptions.UTC;
    }
    var bUTCInputParameter = bUTC;
    if (this.type === mDateFormatTypes.DATETIME_WITH_TIMEZONE) {
        sTimezone = bUTC;
        bUTC = false;
        checkTimezoneParameterType(sTimezone);
        if (sTimezone && !TimezoneUtils.isValidTimezone(sTimezone)) {
            Log.error('The given timezone isn\'t valid.');
            return null;
        }
    }
    sValue = sValue == null ? '' : String(sValue).trim();
    var oDateValue;
    var sCalendarType = this.oFormatOptions.calendarType;
    sTimezone = sTimezone || Configuration.getTimezone();
    if (bStrict === undefined) {
        bStrict = this.oFormatOptions.strictParsing;
    }
    if (sCalendarType === CalendarType.Japanese && this.oLocale.getLanguage() === 'ja') {
        sValue = sValue.replace(/元年/g, '1年');
    }
    if (!this.oFormatOptions.interval) {
        var oJSDate = this.parseRelative(sValue, bUTC);
        if (oJSDate) {
            return oJSDate;
        }
        oDateValue = this._parse(sValue, this.aFormatArray, bUTC, bStrict, sTimezone);
        if (oDateValue.index === 0 || oDateValue.index < sValue.length) {
            oDateValue.valid = false;
        }
        oJSDate = fnCreateDate(oDateValue, sCalendarType, bUTC, bStrict, sTimezone, this.oFormatOptions, this.oLocale);
        if (oJSDate) {
            if (this.type === mDateFormatTypes.DATETIME_WITH_TIMEZONE) {
                var bShowTimezone = this.oFormatOptions.showTimezone === undefined || this.oFormatOptions.showTimezone;
                if (!bShowTimezone && bShowDate && bShowTime) {
                    return [
                        oJSDate,
                        undefined
                    ];
                } else if (bShowTimezone && !bShowDate && !bShowTime) {
                    return [
                        undefined,
                        oDateValue.timezone
                    ];
                }
                return [
                    oJSDate,
                    oDateValue.timezone || undefined
                ];
            }
            return oJSDate;
        }
    } else {
        var aDateValues = this._parseInterval(sValue, sCalendarType, bUTC, bStrict, sTimezone);
        var oJSDate1, oJSDate2;
        if (aDateValues && aDateValues.length === 2) {
            var oDateValue1 = mergeWithoutOverwrite(aDateValues[0], aDateValues[1]);
            var oDateValue2 = mergeWithoutOverwrite(aDateValues[1], aDateValues[0]);
            oJSDate1 = fnCreateDate(oDateValue1, sCalendarType, bUTC, bStrict, sTimezone, this.oFormatOptions, this.oLocale);
            oJSDate2 = fnCreateDate(oDateValue2, sCalendarType, bUTC, bStrict, sTimezone, this.oFormatOptions, this.oLocale);
            if (oJSDate1 && oJSDate2) {
                if (this.oFormatOptions.singleIntervalValue && oJSDate1.getTime() === oJSDate2.getTime()) {
                    return [
                        oJSDate1,
                        null
                    ];
                }
                var bValid = isValidDateRange(oJSDate1, oJSDate2);
                if (bStrict && !bValid) {
                    Log.error('StrictParsing: Invalid date range. The given end date is before the start date.');
                    return [
                        null,
                        null
                    ];
                }
                return [
                    oJSDate1,
                    oJSDate2
                ];
            }
        }
    }
    if (this.aFallbackFormats) {
        var vDate;
        this.aFallbackFormats.every(function (oFallbackFormat) {
            vDate = oFallbackFormat.parse(sValue, bUTCInputParameter, bStrict);
            if (Array.isArray(vDate)) {
                if (oFallbackFormat.type === mDateFormatTypes.DATETIME_WITH_TIMEZONE) {
                    return false;
                }
                return !(vDate[0] && vDate[1]);
            } else {
                return !vDate;
            }
        });
        return vDate;
    }
    if (!this.oFormatOptions.interval) {
        return null;
    } else {
        return [
            null,
            null
        ];
    }
};
DateFormat$1.prototype.parseCldrDatePattern = function (sPattern) {
    if (mCldrDatePattern[sPattern]) {
        return mCldrDatePattern[sPattern];
    }
    var aFormatArray = [], i, bQuoted = false, oCurrentObject = null, sState = '', sNewState = '', mAppeared = {}, bIntervalStartFound = false;
    for (i = 0; i < sPattern.length; i++) {
        var sCurChar = sPattern.charAt(i), sNextChar, sPrevChar, sPrevPrevChar;
        if (bQuoted) {
            if (sCurChar === '\'') {
                sPrevChar = sPattern.charAt(i - 1);
                sPrevPrevChar = sPattern.charAt(i - 2);
                sNextChar = sPattern.charAt(i + 1);
                if (sPrevChar === '\'' && sPrevPrevChar !== '\'') {
                    bQuoted = false;
                } else if (sNextChar === '\'') {
                    i += 1;
                } else {
                    bQuoted = false;
                    continue;
                }
            }
            if (sState === 'text') {
                oCurrentObject.value += sCurChar;
            } else {
                oCurrentObject = {
                    type: 'text',
                    value: sCurChar
                };
                aFormatArray.push(oCurrentObject);
                sState = 'text';
            }
        } else {
            if (sCurChar === '\'') {
                bQuoted = true;
            } else if (this.oSymbols[sCurChar]) {
                sNewState = this.oSymbols[sCurChar].name;
                if (sState === sNewState) {
                    oCurrentObject.digits++;
                } else {
                    oCurrentObject = {
                        type: sNewState,
                        symbol: sCurChar,
                        digits: 1
                    };
                    aFormatArray.push(oCurrentObject);
                    sState = sNewState;
                    if (!bIntervalStartFound) {
                        if (mAppeared[sNewState]) {
                            oCurrentObject.repeat = true;
                            bIntervalStartFound = true;
                        } else {
                            mAppeared[sNewState] = true;
                        }
                    }
                }
            } else {
                if (sState === 'text') {
                    oCurrentObject.value += sCurChar;
                } else {
                    oCurrentObject = {
                        type: 'text',
                        value: sCurChar
                    };
                    aFormatArray.push(oCurrentObject);
                    sState = 'text';
                }
            }
        }
    }
    mCldrDatePattern[sPattern] = aFormatArray;
    return aFormatArray;
};
DateFormat$1.prototype.parseRelative = function (sValue, bUTC) {
    var aPatterns, oEntry, rPattern, oResult, iValue;
    if (!sValue) {
        return null;
    }
    aPatterns = this.oLocaleData.getRelativePatterns(this.aRelativeParseScales, this.oFormatOptions.relativeStyle);
    for (var i = 0; i < aPatterns.length; i++) {
        oEntry = aPatterns[i];
        rPattern = new RegExp('^\\s*' + oEntry.pattern.replace(/\{0\}/, '(\\d+)') + '\\s*$', 'i');
        oResult = rPattern.exec(sValue);
        if (oResult) {
            if (oEntry.value !== undefined) {
                return computeRelativeDate(oEntry.value, oEntry.scale);
            } else {
                iValue = parseInt(oResult[1]);
                return computeRelativeDate(iValue * oEntry.sign, oEntry.scale);
            }
        }
    }
    function computeRelativeDate(iDiff, sScale) {
        var oResult = UI5Date$1.getInstance();
        if (bUTC) {
            oResult.setUTCFullYear(oResult.getFullYear(), oResult.getMonth(), oResult.getDate());
            oResult.setUTCHours(oResult.getHours(), oResult.getMinutes(), oResult.getSeconds(), oResult.getMilliseconds());
            switch (sScale) {
            case 'second':
                oResult.setUTCSeconds(oResult.getUTCSeconds() + iDiff);
                break;
            case 'minute':
                oResult.setUTCMinutes(oResult.getUTCMinutes() + iDiff);
                break;
            case 'hour':
                oResult.setUTCHours(oResult.getUTCHours() + iDiff);
                break;
            case 'day':
                oResult.setUTCDate(oResult.getUTCDate() + iDiff);
                break;
            case 'week':
                oResult.setUTCDate(oResult.getUTCDate() + iDiff * 7);
                break;
            case 'month':
                oResult.setUTCMonth(oResult.getUTCMonth() + iDiff);
                break;
            case 'quarter':
                oResult.setUTCMonth(oResult.getUTCMonth() + iDiff * 3);
                break;
            case 'year':
                oResult.setUTCFullYear(oResult.getUTCFullYear() + iDiff);
                break;
            }
        } else {
            switch (sScale) {
            case 'second':
                oResult.setSeconds(oResult.getSeconds() + iDiff);
                break;
            case 'minute':
                oResult.setMinutes(oResult.getMinutes() + iDiff);
                break;
            case 'hour':
                oResult.setHours(oResult.getHours() + iDiff);
                break;
            case 'day':
                oResult.setDate(oResult.getDate() + iDiff);
                break;
            case 'week':
                oResult.setDate(oResult.getDate() + iDiff * 7);
                break;
            case 'month':
                oResult.setMonth(oResult.getMonth() + iDiff);
                break;
            case 'quarter':
                oResult.setMonth(oResult.getMonth() + iDiff * 3);
                break;
            case 'year':
                oResult.setFullYear(oResult.getFullYear() + iDiff);
                break;
            }
        }
        return oResult;
    }
};
DateFormat$1.prototype.formatRelative = function (oJSDate, bUTC, aRange, sTimezone) {
    var oDateUTC, iDiff, iDiffSeconds, sPattern, oToday = convertToTimezone(new Date(), sTimezone), sScale = this.oFormatOptions.relativeScale || 'day';
    iDiffSeconds = (oJSDate.getTime() - oToday.getTime()) / 1000;
    if (this.oFormatOptions.relativeScale === 'auto') {
        sScale = this._getScale(iDiffSeconds, this.aRelativeScales);
        sScale = fixScaleForMonths(oJSDate, oToday, sScale, iDiffSeconds);
    }
    if (!aRange) {
        aRange = this._mRanges[sScale];
    }
    if (sScale === 'year' || sScale === 'month' || sScale === 'day') {
        oToday = new Date(Date.UTC(oToday.getUTCFullYear(), oToday.getUTCMonth(), oToday.getUTCDate()));
        oDateUTC = new Date(0);
        oDateUTC.setUTCFullYear(oJSDate.getUTCFullYear(), oJSDate.getUTCMonth(), oJSDate.getUTCDate());
        oJSDate = oDateUTC;
    }
    iDiff = this._getDifference(sScale, [
        oToday,
        oJSDate
    ]);
    if (this.oFormatOptions.relativeScale !== 'auto' && (iDiff < aRange[0] || iDiff > aRange[1])) {
        return null;
    }
    sPattern = this.oLocaleData.getRelativePattern(sScale, iDiff, iDiffSeconds > 0, this.oFormatOptions.relativeStyle);
    return fnFormatMessage(sPattern, [Math.abs(iDiff)]);
};
DateFormat$1.prototype._mRanges = {
    second: [
        -60,
        60
    ],
    minute: [
        -60,
        60
    ],
    hour: [
        -24,
        24
    ],
    day: [
        -6,
        6
    ],
    week: [
        -4,
        4
    ],
    month: [
        -12,
        12
    ],
    year: [
        -10,
        10
    ]
};
DateFormat$1.prototype._mScales = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000,
    quarter: 7776000,
    year: 31536000
};
DateFormat$1.prototype._getScale = function (iDiffSeconds, aScales) {
    var sScale, sTestScale;
    iDiffSeconds = Math.abs(iDiffSeconds);
    for (var i = 0; i < aScales.length; i++) {
        sTestScale = aScales[i];
        if (iDiffSeconds >= this._mScales[sTestScale]) {
            sScale = sTestScale;
            break;
        }
    }
    if (!sScale) {
        sScale = aScales[aScales.length - 1];
    }
    return sScale;
};
function fixScaleForMonths(oJSDate, oToday, sScale, iDiffSeconds) {
    var iMonthDiff = Math.abs(oJSDate.getUTCMonth() - oToday.getUTCMonth());
    if (sScale === 'week' && iMonthDiff === 2) {
        return 'month';
    } else if (sScale === 'week' && iMonthDiff === 1) {
        if (oJSDate.getUTCDate() === oToday.getUTCDate() || iDiffSeconds < 0 && oJSDate.getUTCDate() < oToday.getUTCDate() || iDiffSeconds > 0 && oJSDate.getUTCDate() > oToday.getUTCDate()) {
            return 'month';
        }
    } else if (sScale === 'month' && iMonthDiff === 1) {
        if (iDiffSeconds > 0 && oJSDate.getUTCDate() < oToday.getUTCDate() || iDiffSeconds < 0 && oJSDate.getUTCDate() > oToday.getUTCDate()) {
            return 'week';
        }
    }
    return sScale;
}
function cutDateFields(oDate, iStartIndex) {
    var sMethodName, aFields = [
            'FullYear',
            'Month',
            'Date',
            'Hours',
            'Minutes',
            'Seconds',
            'Milliseconds'
        ], oDateCopy = new Date(oDate.getTime());
    for (var i = iStartIndex; i < aFields.length; i++) {
        sMethodName = 'setUTC' + aFields[iStartIndex];
        oDateCopy[sMethodName].apply(oDateCopy, [0]);
    }
    return oDateCopy;
}
var mRelativeDiffs = {
    year: function (oFromDate, oToDate) {
        return oToDate.getUTCFullYear() - oFromDate.getUTCFullYear();
    },
    month: function (oFromDate, oToDate) {
        return oToDate.getUTCMonth() - oFromDate.getUTCMonth() + this.year(oFromDate, oToDate) * 12;
    },
    week: function (oFromDate, oToDate, oFormat) {
        var iFromDay = oFormat._adaptDayOfWeek(oFromDate.getUTCDay());
        var iToDay = oFormat._adaptDayOfWeek(oToDate.getUTCDay());
        oFromDate = cutDateFields(oFromDate, 3);
        oToDate = cutDateFields(oToDate, 3);
        return (oToDate.getTime() - oFromDate.getTime() - (iToDay - iFromDay) * oFormat._mScales.day * 1000) / (oFormat._mScales.week * 1000);
    },
    day: function (oFromDate, oToDate, oFormat) {
        oFromDate = cutDateFields(oFromDate, 3);
        oToDate = cutDateFields(oToDate, 3);
        return (oToDate.getTime() - oFromDate.getTime()) / (oFormat._mScales.day * 1000);
    },
    hour: function (oFromDate, oToDate, oFormat) {
        oFromDate = cutDateFields(oFromDate, 4);
        oToDate = cutDateFields(oToDate, 4);
        return (oToDate.getTime() - oFromDate.getTime()) / (oFormat._mScales.hour * 1000);
    },
    minute: function (oFromDate, oToDate, oFormat) {
        oFromDate = cutDateFields(oFromDate, 5);
        oToDate = cutDateFields(oToDate, 5);
        return (oToDate.getTime() - oFromDate.getTime()) / (oFormat._mScales.minute * 1000);
    },
    second: function (oFromDate, oToDate, oFormat) {
        oFromDate = cutDateFields(oFromDate, 6);
        oToDate = cutDateFields(oToDate, 6);
        return (oToDate.getTime() - oFromDate.getTime()) / (oFormat._mScales.second * 1000);
    }
};
DateFormat$1.prototype._adaptDayOfWeek = function (iDayOfWeek) {
    var vCalendarWeekParameter = getCalendarWeekParameter(this.oFormatOptions), iFirstDayOfWeek;
    if (typeof vCalendarWeekParameter === 'object') {
        iFirstDayOfWeek = vCalendarWeekParameter.firstDayOfWeek;
    } else {
        iFirstDayOfWeek = CalendarUtils.getWeekConfigurationValues(vCalendarWeekParameter, this.oLocale).firstDayOfWeek;
    }
    var iDayNumberOfWeek = iDayOfWeek - (iFirstDayOfWeek - 1);
    if (iDayNumberOfWeek <= 0) {
        iDayNumberOfWeek += 7;
    }
    return iDayNumberOfWeek;
};
DateFormat$1.prototype._getDifference = function (sScale, aDates) {
    var oFromDate = aDates[0];
    var oToDate = aDates[1];
    return Math.round(mRelativeDiffs[sScale](oFromDate, oToDate, this));
};
DateFormat$1.prototype.getAllowedCharacters = function (aFormatArray) {
    if (this.oFormatOptions.relative) {
        return '';
    }
    var sAllowedCharacters = '';
    var bNumbers = false;
    var bAll = false;
    var oPart;
    for (var i = 0; i < aFormatArray.length; i++) {
        oPart = aFormatArray[i];
        switch (oPart.type) {
        case 'text':
            if (sAllowedCharacters.indexOf(oPart.value) < 0) {
                sAllowedCharacters += oPart.value;
            }
            break;
        case 'day':
        case 'year':
        case 'weekYear':
        case 'dayNumberOfWeek':
        case 'weekInYear':
        case 'hour0_23':
        case 'hour1_24':
        case 'hour0_11':
        case 'hour1_12':
        case 'minute':
        case 'second':
        case 'fractionalsecond':
            if (!bNumbers) {
                sAllowedCharacters += '0123456789';
                bNumbers = true;
            }
            break;
        case 'month':
        case 'monthStandalone':
            if (oPart.digits < 3) {
                if (!bNumbers) {
                    sAllowedCharacters += '0123456789';
                    bNumbers = true;
                }
            } else {
                bAll = true;
            }
            break;
        default:
            bAll = true;
            break;
        }
    }
    if (bAll) {
        sAllowedCharacters = '';
    }
    return sAllowedCharacters;
};
DateFormat$1.prototype.getPlaceholderText = function () {
    var oResourceBundle = Core.getLibraryResourceBundle();
    return oResourceBundle.getText('date.placeholder', [this.format.apply(this, this.getSampleValue())]);
};
DateFormat$1.prototype.getSampleValue = function () {
    var oDate, iFullYear = UI5Date$1.getInstance().getFullYear(), bUTC = this.oFormatOptions.UTC;
    function getDate(iYear, iMonth, iDay, iHours, iMinutes, iSeconds, iMilliseconds) {
        return bUTC ? UI5Date$1.getInstance(Date.UTC(iYear, iMonth, iDay, iHours, iMinutes, iSeconds, iMilliseconds)) : UI5Date$1.getInstance(iYear, iMonth, iDay, iHours, iMinutes, iSeconds, iMilliseconds);
    }
    oDate = getDate(iFullYear, 11, 31, 23, 59, 58, 123);
    if (this.type === mDateFormatTypes.DATETIME_WITH_TIMEZONE) {
        return [
            oDate,
            Configuration.getTimezone()
        ];
    }
    if (this.oFormatOptions.interval) {
        return [[
                getDate(iFullYear, 11, 22, 9, 12, 34, 567),
                oDate
            ]];
    }
    return [oDate];
};

// @ts-ignore
const DateFormatWrapped = DateFormat$1;
class DateFormat extends DateFormatWrapped {
}

// @ts-ignore
const LocaleDataWrapped = LocaleData$1;
class LocaleData extends LocaleDataWrapped {
}

const cache$1 = new Map();
const getCachedLocaleDataInstance = (locale) => {
    if (!cache$1.has(locale)) {
        cache$1.set(locale, new LocaleData(locale));
    }
    return cache$1.get(locale);
};

const cache = new Map();
const getMinCalendarDate = (primaryCalendarType) => {
    const key = `min ${primaryCalendarType}`;
    if (!cache.has(key)) {
        const minDate = new CalendarDate$1(1, 0, 1, primaryCalendarType);
        minDate.setYear(1);
        minDate.setMonth(0);
        minDate.setDate(1);
        cache.set(key, minDate);
    }
    return cache.get(key);
};
const getMaxCalendarDate = (primaryCalendarType) => {
    const key = `max ${primaryCalendarType}`;
    if (!cache.has(key)) {
        const maxDate = new CalendarDate$1(1, 0, 1, primaryCalendarType);
        maxDate.setYear(9999);
        maxDate.setMonth(11);
        const tempDate = new CalendarDate$1(maxDate, primaryCalendarType);
        tempDate.setDate(1);
        tempDate.setMonth(tempDate.getMonth() + 1, 0);
        maxDate.setDate(tempDate.getDate()); // 31st for Gregorian Calendar
        cache.set(key, maxDate);
    }
    return cache.get(key);
};

var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DateComponentBase_1;
/**
 * @class
 *
 * Abstract class that provides common functionality for date-related components (day picker, month picker, year picker, calendar, date picker, date range picker, date time picker)
 * This includes:
 *  - "languageAware: true" metadata setting, CLDR fetch and i18n initialization
 *  - common properties (primaryCalendar, minDate, maxDate and formatPattern) declaration and methods that operate on them
 *  - additional common methods
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.DateComponentBase
 * @extends sap.ui.webc.base.UI5Element
 * @public
 */
let DateComponentBase = DateComponentBase_1 = class DateComponentBase extends UI5Element {
    constructor() {
        super();
    }
    get _primaryCalendarType() {
        const localeData = getCachedLocaleDataInstance(getLocale());
        return this.primaryCalendarType || getCalendarType() || localeData.getPreferredCalendarType();
    }
    get _secondaryCalendarType() {
        return this.secondaryCalendarType || getSecondaryCalendarType();
    }
    get _minDate() {
        let minDate;
        if (this.minDate) {
            minDate = this._getMinMaxCalendarDateFromString(this.minDate);
        }
        return minDate || getMinCalendarDate(this._primaryCalendarType);
    }
    get _maxDate() {
        let maxDate;
        if (this.maxDate) {
            maxDate = this._getMinMaxCalendarDateFromString(this.maxDate);
        }
        return maxDate || getMaxCalendarDate(this._primaryCalendarType);
    }
    get _formatPattern() {
        return this.formatPattern || "medium"; // get from config
    }
    get _isPattern() {
        return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
    }
    _getMinMaxCalendarDateFromString(date) {
        if (this.getFormat().parse(date)) {
            return this._getCalendarDateFromString(date);
        }
        const jsDate = this.getISOFormat().parse(date);
        if (jsDate) {
            return CalendarDate$1.fromLocalJSDate(jsDate, this._primaryCalendarType);
        }
    }
    _getCalendarDateFromString(value) {
        const jsDate = this.getFormat().parse(value);
        if (jsDate) {
            return CalendarDate$1.fromLocalJSDate(jsDate, this._primaryCalendarType);
        }
    }
    _getTimeStampFromString(value) {
        const calDate = this._getCalendarDateFromString(value);
        if (calDate) {
            return calDate.toUTCJSDate().valueOf();
        }
    }
    _getStringFromTimestamp(timestamp) {
        const localDate = new Date(timestamp);
        return this.getFormat().format(localDate, true);
    }
    getFormat() {
        return this._isPattern
            ? DateFormat.getDateInstance({
                strictParsing: true,
                pattern: this._formatPattern,
                calendarType: this._primaryCalendarType,
            })
            : DateFormat.getDateInstance({
                strictParsing: true,
                style: this._formatPattern,
                calendarType: this._primaryCalendarType,
            });
    }
    getISOFormat() {
        if (!this._isoFormatInstance) {
            this._isoFormatInstance = DateFormat.getDateInstance({
                strictParsing: true,
                pattern: "YYYY-MM-dd",
                calendarType: this._primaryCalendarType,
            });
        }
        return this._isoFormatInstance;
    }
    static async onDefine() {
        [DateComponentBase_1.i18nBundle] = await Promise.all([
            getI18nBundle("@ui5/webcomponents"),
            fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
        ]);
    }
};
__decorate$g([
    property({ type: CalendarType$2 })
], DateComponentBase.prototype, "primaryCalendarType", void 0);
__decorate$g([
    property({ type: CalendarType$2 })
], DateComponentBase.prototype, "secondaryCalendarType", void 0);
__decorate$g([
    property()
], DateComponentBase.prototype, "formatPattern", void 0);
__decorate$g([
    property()
], DateComponentBase.prototype, "minDate", void 0);
__decorate$g([
    property()
], DateComponentBase.prototype, "maxDate", void 0);
DateComponentBase = DateComponentBase_1 = __decorate$g([
    customElement({
        languageAware: true,
        renderer: litRender,
    })
], DateComponentBase);
var DateComponentBase$1 = DateComponentBase;

/* eslint no-unused-vars: 0 */
function block0$g(context, tags, suffix) { return effectiveHtml `<svg class="ui5-icon-root" part="root" tabindex="${l$1(this._tabIndex)}" dir="${l$1(this._dir)}" viewBox="${l$1(this.viewBox)}" role="${l$1(this.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${l$1(this.effectiveAccessibleName)}" aria-hidden=${l$1(this.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @keydown=${this._onkeydown} @keyup=${this._onkeyup}>${blockSVG1.call(this, context, tags, suffix)}</svg>`; }
function block1$d(context, tags, suffix) { return effectiveSvg `<title id="${l$1(this._id)}-tooltip">${l$1(this.effectiveAccessibleName)}</title>`; }
function block2$d(context, tags, suffix) { return effectiveSvg `${l$1(this.customSvg)}`; }
function block3$a(context, tags, suffix, item, index) { return effectiveSvg `<path d="${l$1(item)}"></path>`; }
function blockSVG1(context, tags, suffix) {
    return effectiveSvg `${this.hasIconTooltip ? block1$d.call(this, context, tags, suffix) : undefined}<g role="presentation">${this.customSvg ? block2$d.call(this, context, tags, suffix) : undefined}${c(this.pathData, (item, index) => item._id || index, (item, index) => block3$a.call(this, context, tags, suffix, item, index))}</g>`;
}

/**
 * Different Icon semantic designs.
*
* @readonly
* @enum {string}
* @public
* @author SAP SE
* @alias sap.ui.webc.main.types.IconDesign
*/
var IconDesign;
(function (IconDesign) {
    /**
     * Contrast design
     * @public
     * @type {Contrast}
     */
    IconDesign["Contrast"] = "Contrast";
    /**
     * Critical design
     * @public
     * @type {Critical}
     */
    IconDesign["Critical"] = "Critical";
    /**
     * Default design (brand design)
     * @public
     * @type {Default}
    */
    IconDesign["Default"] = "Default";
    /**
     * info type
     * @public
     * @type {Information}
     */
    IconDesign["Information"] = "Information";
    /**
     * Negative design
     * @public
     * @type {Negative}
     */
    IconDesign["Negative"] = "Negative";
    /**
     * Neutral design
     * @public
     * @type {Neutral}
     */
    IconDesign["Neutral"] = "Neutral";
    /**
     * Design that indicates an icon which isn't interactive
     * @public
     * @type {NonInteractive}
     */
    IconDesign["NonInteractive"] = "NonInteractive";
    /**
     * Positive design
     * @public
     * @type {Positive}
     */
    IconDesign["Positive"] = "Positive";
})(IconDesign || (IconDesign = {}));
var IconDesign$1 = IconDesign;

const styleData$n = { packageName: "@ui5/webcomponents-theming", fileName: "themes/sap_fiori_3/parameters-bundle.css", content: ":root{--sapThemeMetaData-Base-baseLib:{\"Path\":\"Base.baseLib.sap_fiori_3.css_variables\",\"PathPattern\":\"/%frameworkId%/%libId%/%themeId%/%fileId%.css\",\"Extends\":[\"sap_base_fiori\",\"baseTheme\"],\"Tags\":[\"Fiori_3\",\"LightColorScheme\"],\"FallbackThemeId\":\"sap_belize\",\"Engine\":{\"Name\":\"theming-engine\",\"Version\":\"1.23061.0\"},\"Version\":{ \"Build\":\"11.6.8.20230911071338\",\"Source\":\"11.6.8\"}};--sapBrandColor:#0a6ed1;--sapHighlightColor:#0854a0;--sapBaseColor:#fff;--sapShellColor:#354a5f;--sapBackgroundColor:#f7f7f7;--sapFontFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapTextColor:#32363a;--sapLinkColor:#0a6ed1;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#0854a0;--sapHoverColor:#ededed;--sapActiveColor:#0854a0;--sapHighlightTextColor:#fff;--sapTitleColor:#32363a;--sapNegativeColor:#b00;--sapCriticalColor:#df6e0c;--sapPositiveColor:#107e3e;--sapInformativeColor:#0a6ed1;--sapNeutralColor:#6a6d70;--sapNegativeElementColor:#b00;--sapCriticalElementColor:#df6e0c;--sapPositiveElementColor:#107e3e;--sapInformativeElementColor:#0a6ed1;--sapNeutralElementColor:#6a6d70;--sapNegativeTextColor:#b00;--sapCriticalTextColor:#b3590a;--sapPositiveTextColor:#107e3e;--sapInformativeTextColor:#0a6ed1;--sapNeutralTextColor:#6a6d70;--sapErrorColor:#b00;--sapWarningColor:#df6e0c;--sapSuccessColor:#107e3e;--sapInformationColor:#0a6ed1;--sapErrorBackground:#ffebeb;--sapWarningBackground:#fef7f1;--sapSuccessBackground:#f1fdf6;--sapInformationBackground:#f5faff;--sapNeutralBackground:#f4f4f4;--sapErrorBorderColor:#b00;--sapWarningBorderColor:#df6e0c;--sapSuccessBorderColor:#107e3e;--sapInformationBorderColor:#0a6ed1;--sapNeutralBorderColor:#6a6d70;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.25rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.4;--sapContent_IconHeight:1rem;--sapContent_IconColor:#0854a0;--sapContent_ContrastIconColor:#fff;--sapContent_NonInteractiveIconColor:#6a6d70;--sapContent_MarkerIconColor:#286eb4;--sapContent_MarkerTextColor:#0e7581;--sapContent_MeasureIndicatorColor:#89919a;--sapContent_Selected_MeasureIndicatorColor:#89919a;--sapContent_Placeholderloading_Background:#ccc;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#ccc 0%,#ccc 20%,#999 50%,#ccc 80%,#ccc);--sapContent_ImagePlaceholderBackground:#ccc;--sapContent_ImagePlaceholderForegroundColor:#fff;--sapContent_RatedColor:#d08014;--sapContent_UnratedColor:#89919a;--sapContent_BusyColor:#0854a0;--sapContent_FocusColor:#000;--sapContent_FocusStyle:dotted;--sapContent_FocusWidth:.0625rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#000;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0 0.0625rem rgba(0,0,0,.1),0 0.125rem 0.5rem 0 rgba(0,0,0,.1);--sapContent_Shadow1:0 0 0 0.0625rem rgba(0,0,0,.42),0 0.125rem 0.5rem 0 rgba(0,0,0,.3);--sapContent_Shadow2:0 0 0 0.0625rem rgba(0,0,0,.42),0 0.625rem 1.875rem 0 rgba(0,0,0,.3);--sapContent_Shadow3:0 0 0 0.0625rem rgba(0,0,0,.42),0 1.25rem 5rem 0 rgba(0,0,0,.3);--sapContent_TextShadow:0 0 0.125rem #fff;--sapContent_ContrastTextShadow:0 0 0.0625rem rgba(0,0,0,.7);--sapContent_HeaderShadow:0 0.125rem 0.125rem 0 rgba(0,0,0,.05),inset 0 -0.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow:none;--sapContent_Selected_Shadow:none;--sapContent_Negative_Shadow:none;--sapContent_Critical_Shadow:none;--sapContent_Positive_Shadow:none;--sapContent_Informative_Shadow:none;--sapContent_Neutral_Shadow:none;--sapContent_SearchHighlightColor:#d4f7db;--sapContent_HelpColor:#3f8600;--sapContent_LabelColor:#6a6d70;--sapContent_MonospaceFontFamily:\"72Mono\",\"72Monofull\",lucida console,monospace;--sapContent_MonospaceBoldFontFamily:\"72Mono-Bold\",\"72Mono-Boldfull\",lucida console,monospace;--sapContent_IconFontFamily:\"SAP-icons\";--sapContent_DisabledTextColor:rgba(50,54,58,.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.65;--sapContent_ContrastTextColor:#fff;--sapContent_ForegroundColor:#efefef;--sapContent_ForegroundBorderColor:#89919a;--sapContent_ForegroundTextColor:#32363a;--sapContent_BadgeBackground:#d04343;--sapContent_BadgeTextColor:#fff;--sapContent_DragAndDropActiveColor:#0854a0;--sapContent_Selected_TextColor:#fff;--sapContent_Selected_Background:#0854a0;--sapContent_Selected_Hover_Background:#095caf;--sapContent_Selected_ForegroundColor:#0854a0;--sapContent_ForcedColorAdjust:none;--sapContent_Illustrative_Color1:#0a6ed1;--sapContent_Illustrative_Color2:#72b5f8;--sapContent_Illustrative_Color3:#ffba10;--sapContent_Illustrative_Color4:#4a5055;--sapContent_Illustrative_Color5:#9da4aa;--sapContent_Illustrative_Color6:#c6cace;--sapContent_Illustrative_Color7:#e7e9ea;--sapContent_Illustrative_Color8:#fff;--sapContent_Illustrative_Color9:#64edd2;--sapContent_Illustrative_Color10:#e7e9ea;--sapContent_Illustrative_Color11:#f31ded;--sapContent_Illustrative_Color12:#5dc122;--sapContent_Illustrative_Color13:#4ba1f6;--sapContent_Illustrative_Color14:#298ff4;--sapContent_Illustrative_Color15:#e6a400;--sapContent_Illustrative_Color16:#085aaa;--sapContent_Illustrative_Color17:#00a5a8;--sapContent_Illustrative_Color18:#d9ddde;--sapContent_Illustrative_Color19:#ccd0d2;--sapContent_Illustrative_Color20:#bec4c6;--sapFontLightFamily:\"72-Light\",\"72-Lightfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBoldFamily:\"72-Bold\",\"72-Boldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSemiboldFamily:\"72-Semibold\",\"72-Semiboldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSemiboldDuplexFamily:\"72-SemiboldDuplex\",\"72-SemiboldDuplexfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBlackFamily:\"72Black\",\"72Blackfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:2.25rem;--sapFontHeader2Size:1.5rem;--sapFontHeader3Size:1.25rem;--sapFontHeader4Size:1.125rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapLink_TextDecoration:none;--sapLink_Hover_Color:#0854a0;--sapLink_Hover_TextDecoration:underline;--sapLink_Active_Color:#0a6ed1;--sapLink_Active_TextDecoration:underline;--sapLink_Visited_Color:#0a6ed1;--sapLink_InvertedColor:#d3e8fd;--sapLink_SubtleColor:#074888;--sapShell_Background:#edeff0;--sapShell_BackgroundImage:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#354a5f;--sapShell_TextColor:#fff;--sapShell_InteractiveBackground:#354a5f;--sapShell_InteractiveTextColor:#d1e8ff;--sapShell_InteractiveBorderColor:#7996b4;--sapShell_GroupTitleTextColor:#32363a;--sapShell_GroupTitleTextShadow:0 0 0.125rem #fff;--sapShell_Hover_Background:#283848;--sapShell_Active_Background:#23303e;--sapShell_Active_TextColor:#fff;--sapShell_Selected_Background:#23303e;--sapShell_Selected_TextColor:#fff;--sapShell_Selected_Hover_Background:#23303e;--sapShell_Favicon:none;--sapShell_Navigation_Background:#354a5f;--sapShell_Navigation_Hover_Background:#283848;--sapShell_Navigation_SelectedColor:#d1e8ff;--sapShell_Navigation_Selected_TextColor:#d1e8ff;--sapShell_Navigation_TextColor:#fff;--sapShell_Navigation_Active_TextColor:#fff;--sapShell_Navigation_Active_Background:#23303e;--sapShell_Shadow:0 0.125rem 0.125rem 0 rgba(0,0,0,.08),inset 0 -0.0625rem 0 0 rgba(0,0,0,.18);--sapShell_NegativeColor:#f88;--sapShell_CriticalColor:#f8b67d;--sapShell_PositiveColor:#abe2c2;--sapShell_InformativeColor:#b1d6fb;--sapShell_NeutralColor:#d4d6d7;--sapShell_Category_1_Background:#286eb4;--sapShell_Category_1_BorderColor:#286eb4;--sapShell_Category_1_TextColor:#fff;--sapShell_Category_1_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_2_Background:#db1f77;--sapShell_Category_2_BorderColor:#db1f77;--sapShell_Category_2_TextColor:#fff;--sapShell_Category_2_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_3_Background:#d58215;--sapShell_Category_3_BorderColor:#d58215;--sapShell_Category_3_TextColor:#fff;--sapShell_Category_3_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_4_Background:#892971;--sapShell_Category_4_BorderColor:#892971;--sapShell_Category_4_TextColor:#fff;--sapShell_Category_4_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_5_Background:#bb2f2f;--sapShell_Category_5_BorderColor:#bb2f2f;--sapShell_Category_5_TextColor:#fff;--sapShell_Category_5_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_6_Background:#1193a2;--sapShell_Category_6_BorderColor:#1193a2;--sapShell_Category_6_TextColor:#fff;--sapShell_Category_6_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_7_Background:#cf5db3;--sapShell_Category_7_BorderColor:#cf5db3;--sapShell_Category_7_TextColor:#fff;--sapShell_Category_7_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_8_Background:#8b9668;--sapShell_Category_8_BorderColor:#8b9668;--sapShell_Category_8_TextColor:#fff;--sapShell_Category_8_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_9_Background:#597da1;--sapShell_Category_9_BorderColor:#597da1;--sapShell_Category_9_TextColor:#fff;--sapShell_Category_9_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_10_Background:#647987;--sapShell_Category_10_BorderColor:#647987;--sapShell_Category_10_TextColor:#fff;--sapShell_Category_10_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_11_Background:#dc5b5b;--sapShell_Category_11_BorderColor:#dc5b5b;--sapShell_Category_11_TextColor:#fff;--sapShell_Category_11_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_12_Background:#5154bd;--sapShell_Category_12_BorderColor:#5154bd;--sapShell_Category_12_TextColor:#fff;--sapShell_Category_12_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_13_Background:#bc1b66;--sapShell_Category_13_BorderColor:#bc1b66;--sapShell_Category_13_TextColor:#fff;--sapShell_Category_13_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_14_Background:#49797e;--sapShell_Category_14_BorderColor:#49797e;--sapShell_Category_14_TextColor:#fff;--sapShell_Category_14_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_15_Background:#476380;--sapShell_Category_15_BorderColor:#476380;--sapShell_Category_15_TextColor:#fff;--sapShell_Category_15_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_16_Background:#687a33;--sapShell_Category_16_BorderColor:#687a33;--sapShell_Category_16_TextColor:#fff;--sapShell_Category_16_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapAvatar_1_Background:#d08014;--sapAvatar_1_BorderColor:#d08014;--sapAvatar_1_TextColor:#fff;--sapAvatar_2_Background:#d04343;--sapAvatar_2_BorderColor:#d04343;--sapAvatar_2_TextColor:#fff;--sapAvatar_3_Background:#db1f77;--sapAvatar_3_BorderColor:#db1f77;--sapAvatar_3_TextColor:#fff;--sapAvatar_4_Background:#c0399f;--sapAvatar_4_BorderColor:#c0399f;--sapAvatar_4_TextColor:#fff;--sapAvatar_5_Background:#6367de;--sapAvatar_5_BorderColor:#6367de;--sapAvatar_5_TextColor:#fff;--sapAvatar_6_Background:#286eb4;--sapAvatar_6_BorderColor:#286eb4;--sapAvatar_6_TextColor:#fff;--sapAvatar_7_Background:#0f828f;--sapAvatar_7_BorderColor:#0f828f;--sapAvatar_7_TextColor:#fff;--sapAvatar_8_Background:#7ca10c;--sapAvatar_8_BorderColor:#7ca10c;--sapAvatar_8_TextColor:#fff;--sapAvatar_9_Background:#925ace;--sapAvatar_9_BorderColor:#925ace;--sapAvatar_9_TextColor:#fff;--sapAvatar_10_Background:#647987;--sapAvatar_10_BorderColor:#647987;--sapAvatar_10_TextColor:#fff;--sapButton_Background:#fff;--sapButton_BorderColor:#0854a0;--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.25rem;--sapButton_TextColor:#0854a0;--sapButton_Hover_Background:#ebf5fe;--sapButton_Hover_BorderColor:#0854a0;--sapButton_Hover_TextColor:#0854a0;--sapButton_IconColor:#0854a0;--sapButton_Active_Background:#0854a0;--sapButton_Active_BorderColor:#0854a0;--sapButton_Active_TextColor:#fff;--sapButton_Emphasized_Background:#0a6ed1;--sapButton_Emphasized_BorderColor:#0a6ed1;--sapButton_Emphasized_TextColor:#fff;--sapButton_Emphasized_Hover_Background:#085caf;--sapButton_Emphasized_Hover_BorderColor:#085caf;--sapButton_Emphasized_Hover_TextColor:#fff;--sapButton_Emphasized_Active_Background:#0854a0;--sapButton_Emphasized_Active_BorderColor:#0854a0;--sapButton_Emphasized_Active_TextColor:#fff;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Emphasized_FontWeight:bold;--sapButton_Reject_Background:#fff;--sapButton_Reject_BorderColor:#b00;--sapButton_Reject_TextColor:#b00;--sapButton_Reject_Hover_Background:#ffebeb;--sapButton_Reject_Hover_BorderColor:#b00;--sapButton_Reject_Hover_TextColor:#b00;--sapButton_Reject_Active_Background:#a20000;--sapButton_Reject_Active_BorderColor:#a20000;--sapButton_Reject_Active_TextColor:#fff;--sapButton_Reject_Selected_Background:#a20000;--sapButton_Reject_Selected_BorderColor:#a20000;--sapButton_Reject_Selected_TextColor:#fff;--sapButton_Reject_Selected_Hover_Background:#b00;--sapButton_Reject_Selected_Hover_BorderColor:#b00;--sapButton_Accept_Background:#fff;--sapButton_Accept_BorderColor:#107e3e;--sapButton_Accept_TextColor:#107e3e;--sapButton_Accept_Hover_Background:#f1fdf6;--sapButton_Accept_Hover_BorderColor:#107e3e;--sapButton_Accept_Hover_TextColor:#107e3e;--sapButton_Accept_Active_Background:#0d6733;--sapButton_Accept_Active_BorderColor:#0d6733;--sapButton_Accept_Active_TextColor:#fff;--sapButton_Accept_Selected_Background:#0d6733;--sapButton_Accept_Selected_BorderColor:#0d6733;--sapButton_Accept_Selected_TextColor:#fff;--sapButton_Accept_Selected_Hover_Background:#107e3e;--sapButton_Accept_Selected_Hover_BorderColor:#107e3e;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#0854a0;--sapButton_Lite_Hover_Background:#ebf5fe;--sapButton_Lite_Hover_BorderColor:#0854a0;--sapButton_Lite_Hover_TextColor:#0854a0;--sapButton_Lite_Active_Background:#0854a0;--sapButton_Lite_Active_BorderColor:#0854a0;--sapButton_Selected_Background:#0854a0;--sapButton_Selected_BorderColor:#0854a0;--sapButton_Selected_TextColor:#fff;--sapButton_Selected_Hover_Background:#095caf;--sapButton_Selected_Hover_BorderColor:#095caf;--sapButton_Attention_Background:#fff;--sapButton_Attention_BorderColor:#df6e0c;--sapButton_Attention_TextColor:#32363a;--sapButton_Attention_Hover_Background:#fef7f1;--sapButton_Attention_Hover_BorderColor:#df6e0c;--sapButton_Attention_Hover_TextColor:#32363a;--sapButton_Attention_Active_Background:#f3801c;--sapButton_Attention_Active_BorderColor:#f3801c;--sapButton_Attention_Active_TextColor:#fff;--sapButton_Attention_Selected_Background:#f3801c;--sapButton_Attention_Selected_BorderColor:#f3801c;--sapButton_Attention_Selected_TextColor:#fff;--sapButton_Attention_Selected_Hover_Background:#f48e34;--sapButton_Attention_Selected_Hover_BorderColor:#f48e34;--sapButton_Negative_Background:#b00;--sapButton_Negative_BorderColor:#b00;--sapButton_Negative_TextColor:#fff;--sapButton_Negative_Hover_Background:#970000;--sapButton_Negative_Hover_BorderColor:#970000;--sapButton_Negative_Hover_TextColor:#fff;--sapButton_Negative_Active_Background:#800;--sapButton_Negative_Active_BorderColor:#800;--sapButton_Negative_Active_TextColor:#fff;--sapButton_Critical_Background:#df6e0c;--sapButton_Critical_BorderColor:#df6e0c;--sapButton_Critical_TextColor:#fff;--sapButton_Critical_Hover_Background:#f3801c;--sapButton_Critical_Hover_BorderColor:#f3801c;--sapButton_Critical_Hover_TextColor:#fff;--sapButton_Critical_Active_Background:#f5933e;--sapButton_Critical_Active_BorderColor:#f5933e;--sapButton_Critical_Active_TextColor:#fff;--sapButton_Success_Background:#107e3e;--sapButton_Success_BorderColor:#107e3e;--sapButton_Success_TextColor:#fff;--sapButton_Success_Hover_Background:#0c5e2e;--sapButton_Success_Hover_BorderColor:#0c5e2e;--sapButton_Success_Hover_TextColor:#fff;--sapButton_Success_Active_Background:#0a5128;--sapButton_Success_Active_BorderColor:#0a5128;--sapButton_Success_Active_TextColor:#fff;--sapButton_Information_Background:#0a6ed1;--sapButton_Information_BorderColor:#0a6ed1;--sapButton_Information_TextColor:#fff;--sapButton_Information_Hover_Background:#0961b9;--sapButton_Information_Hover_BorderColor:#0961b9;--sapButton_Information_Hover_TextColor:#fff;--sapButton_Information_Active_Background:#0854a0;--sapButton_Information_Active_BorderColor:#0854a0;--sapButton_Information_Active_TextColor:#fff;--sapButton_Neutral_Background:#6a6d70;--sapButton_Neutral_BorderColor:#6a6d70;--sapButton_Neutral_TextColor:#fff;--sapButton_Neutral_Hover_Background:#595b5e;--sapButton_Neutral_Hover_BorderColor:#595b5e;--sapButton_Neutral_Hover_TextColor:#fff;--sapButton_Neutral_Active_Background:#515456;--sapButton_Neutral_Active_BorderColor:#515456;--sapButton_Neutral_Active_TextColor:#fff;--sapButton_Track_Background:#ededed;--sapButton_Track_BorderColor:#89919a;--sapButton_Track_TextColor:#32363a;--sapButton_Track_Hover_Background:#ededed;--sapButton_Track_Hover_BorderColor:#0854a0;--sapButton_Track_Selected_Background:#ebf5fe;--sapButton_Track_Selected_BorderColor:#0854a0;--sapButton_Track_Selected_TextColor:#32363a;--sapButton_Track_Selected_Hover_Background:#ebf5fe;--sapButton_Track_Selected_Hover_BorderColor:#095caf;--sapButton_Handle_Background:#fff;--sapButton_Handle_BorderColor:#89919a;--sapButton_Handle_TextColor:#32363a;--sapButton_Handle_Hover_Background:#ebf5fe;--sapButton_Handle_Hover_BorderColor:#0854a0;--sapButton_Handle_Selected_Background:#0854a0;--sapButton_Handle_Selected_BorderColor:#0854a0;--sapButton_Handle_Selected_TextColor:#fff;--sapButton_Handle_Selected_Hover_Background:#095caf;--sapButton_Handle_Selected_Hover_BorderColor:#095caf;--sapButton_Track_Negative_Background:#ffebeb;--sapButton_Track_Negative_BorderColor:#b00;--sapButton_Track_Negative_TextColor:#b00;--sapButton_Track_Negative_Hover_Background:#ffebeb;--sapButton_Track_Negative_Hover_BorderColor:#b00;--sapButton_Handle_Negative_Background:#fff;--sapButton_Handle_Negative_BorderColor:#b00;--sapButton_Handle_Negative_TextColor:#b00;--sapButton_Handle_Negative_Hover_Background:#ffebeb;--sapButton_Handle_Negative_Hover_BorderColor:#b00;--sapButton_Track_Positive_Background:#f1fdf6;--sapButton_Track_Positive_BorderColor:#107e3e;--sapButton_Track_Positive_TextColor:#107e3e;--sapButton_Track_Positive_Hover_Background:#f1fdf6;--sapButton_Track_Positive_Hover_BorderColor:#107e3e;--sapButton_Handle_Positive_Background:#fff;--sapButton_Handle_Positive_BorderColor:#107e3e;--sapButton_Handle_Positive_TextColor:#107e3e;--sapButton_Handle_Positive_Hover_Background:#f1fdf6;--sapButton_Handle_Positive_Hover_BorderColor:#107e3e;--sapButton_TokenBackground:#fafafa;--sapButton_TokenBorderColor:#c2c2c2;--sapField_Background:#fff;--sapField_BackgroundStyle:none;--sapField_TextColor:#32363a;--sapField_PlaceholderTextColor:#74777a;--sapField_BorderColor:#89919a;--sapField_HelpBackground:#fff;--sapField_BorderWidth:.0625rem;--sapField_BorderStyle:solid;--sapField_BorderCornerRadius:.125rem;--sapField_Shadow:none;--sapField_Hover_Background:#fff;--sapField_Hover_BackgroundStyle:none;--sapField_Hover_BorderColor:#0854a0;--sapField_Hover_HelpBackground:#ebf5fe;--sapField_Hover_Shadow:none;--sapField_Hover_InvalidShadow:none;--sapField_Hover_WarningShadow:none;--sapField_Hover_SuccessShadow:none;--sapField_Hover_InformationShadow:none;--sapField_Active_BorderColor:#0854a0;--sapField_Focus_Background:#fff;--sapField_Focus_BorderColor:#89919a;--sapField_Focus_HelpBackground:#fff;--sapField_ReadOnly_Background:hsla(0,0%,95%,.5);--sapField_ReadOnly_BackgroundStyle:none;--sapField_ReadOnly_BorderColor:#89919a;--sapField_ReadOnly_BorderStyle:solid;--sapField_ReadOnly_HelpBackground:hsla(0,0%,95%,.5);--sapField_RequiredColor:#ce3b3b;--sapField_InvalidColor:#b00;--sapField_InvalidBackground:#fff;--sapField_InvalidBackgroundStyle:none;--sapField_InvalidBorderWidth:.125rem;--sapField_InvalidBorderStyle:solid;--sapField_InvalidShadow:none;--sapField_WarningColor:#df6e0c;--sapField_WarningBackground:#fff;--sapField_WarningBackgroundStyle:none;--sapField_WarningBorderWidth:.125rem;--sapField_WarningBorderStyle:solid;--sapField_WarningShadow:none;--sapField_SuccessColor:#107e3e;--sapField_SuccessBackground:#fff;--sapField_SuccessBackgroundStyle:none;--sapField_SuccessBorderWidth:.0625rem;--sapField_SuccessBorderStyle:solid;--sapField_SuccessShadow:none;--sapField_InformationColor:#0a6ed1;--sapField_InformationBackground:#fff;--sapField_InformationBackgroundStyle:none;--sapField_InformationBorderWidth:.125rem;--sapField_InformationBorderStyle:solid;--sapField_InformationShadow:none;--sapGroup_TitleBackground:transparent;--sapGroup_TitleBorderColor:#d9d9d9;--sapGroup_TitleTextColor:#32363a;--sapGroup_Title_FontSize:1.125rem;--sapGroup_ContentBackground:#fff;--sapGroup_ContentBorderColor:#d9d9d9;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:0;--sapGroup_FooterBackground:transparent;--sapToolbar_Background:transparent;--sapToolbar_SeparatorColor:#d9d9d9;--sapList_HeaderBackground:#f2f2f2;--sapList_HeaderBorderColor:#e5e5e5;--sapList_HeaderTextColor:#32363a;--sapList_BorderColor:#e5e5e5;--sapList_BorderWidth:.0625rem;--sapList_TextColor:#32363a;--sapList_Active_TextColor:#fff;--sapList_Active_Background:#0854a0;--sapList_SelectionBackgroundColor:#e5f0fa;--sapList_SelectionBorderColor:#0854a0;--sapList_Hover_SelectionBackground:#d8e9f8;--sapList_Background:#fff;--sapList_Hover_Background:#ededed;--sapList_AlternatingBackground:#f2f2f2;--sapList_GroupHeaderBackground:#fff;--sapList_GroupHeaderBorderColor:#d9d9d9;--sapList_GroupHeaderTextColor:#32363a;--sapList_TableGroupHeaderBackground:#efefef;--sapList_TableGroupHeaderBorderColor:#d9d9d9;--sapList_TableGroupHeaderTextColor:#32363a;--sapList_FooterBackground:#fafafa;--sapList_FooterTextColor:#32363a;--sapList_TableFooterBorder:#d9d9d9;--sapList_TableFixedBorderColor:#8c8c8c;--sapMessage_ErrorBorderColor:#b00;--sapMessage_WarningBorderColor:#df6e0c;--sapMessage_SuccessBorderColor:#107e3e;--sapMessage_InformationBorderColor:#0a6ed1;--sapPopover_BorderCornerRadius:.25rem;--sapProgress_Background:#fff;--sapProgress_BorderColor:#89919a;--sapProgress_TextColor:#32363a;--sapProgress_FontSize:.75rem;--sapProgress_NegativeBackground:#fff;--sapProgress_NegativeBorderColor:#89919a;--sapProgress_NegativeTextColor:#32363a;--sapProgress_CriticalBackground:#fff;--sapProgress_CriticalBorderColor:#89919a;--sapProgress_CriticalTextColor:#32363a;--sapProgress_PositiveBackground:#fff;--sapProgress_PositiveBorderColor:#89919a;--sapProgress_PositiveTextColor:#32363a;--sapProgress_InformationBackground:#fff;--sapProgress_InformationBorderColor:#89919a;--sapProgress_InformationTextColor:#32363a;--sapProgress_Value_Background:#6a6d70;--sapProgress_Value_BorderColor:#89919a;--sapProgress_Value_TextColor:#32363a;--sapProgress_Value_NegativeBackground:#b00;--sapProgress_Value_NegativeBorderColor:#fff;--sapProgress_Value_NegativeTextColor:#32363a;--sapProgress_Value_CriticalBackground:#df6e0c;--sapProgress_Value_CriticalBorderColor:#fff;--sapProgress_Value_CriticalTextColor:#32363a;--sapProgress_Value_PositiveBackground:#107e3e;--sapProgress_Value_PositiveBorderColor:#fff;--sapProgress_Value_PositiveTextColor:#32363a;--sapProgress_Value_InformationBackground:#0a6ed1;--sapProgress_Value_InformationBorderColor:#fff;--sapProgress_Value_InformationTextColor:#32363a;--sapScrollBar_FaceColor:#949494;--sapScrollBar_TrackColor:#fff;--sapScrollBar_BorderColor:#949494;--sapScrollBar_SymbolColor:#0854a0;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#8c8c8c;--sapSlider_Background:#89919a;--sapSlider_BorderColor:#89919a;--sapSlider_Selected_Background:#0854a0;--sapSlider_Selected_BorderColor:#0854a0;--sapSlider_HandleBackground:#fff;--sapSlider_HandleBorderColor:#89919a;--sapSlider_RangeHandleBackground:transparent;--sapSlider_Hover_HandleBackground:#ebf5fe;--sapSlider_Hover_HandleBorderColor:#0854a0;--sapSlider_Hover_RangeHandleBackground:#ebf5fe;--sapSlider_Active_HandleBackground:#0854a0;--sapSlider_Active_HandleBorderColor:#0854a0;--sapSlider_Active_RangeHandleBackground:transparent;--sapPageHeader_Background:#fff;--sapPageHeader_BorderColor:#d9d9d9;--sapPageHeader_TextColor:#32363a;--sapPageFooter_Background:#fff;--sapPageFooter_BorderColor:#d9d9d9;--sapPageFooter_TextColor:#32363a;--sapInfobar_Background:#0f828f;--sapInfobar_Hover_Background:#0e7581;--sapInfobar_Active_Background:#0a545c;--sapInfobar_NonInteractive_Background:#e6e6e6;--sapInfobar_TextColor:#fff;--sapObjectHeader_Background:#fff;--sapObjectHeader_Hover_Background:#ededed;--sapObjectHeader_BorderColor:#d9d9d9;--sapObjectHeader_Title_TextColor:#32363a;--sapObjectHeader_Title_FontSize:1.25rem;--sapObjectHeader_Title_SnappedFontSize:1.25rem;--sapObjectHeader_Title_FontFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapObjectHeader_Subtitle_TextColor:#6a6d70;--sapBlockLayer_Background:#000;--sapTile_Background:#fff;--sapTile_Hover_Background:#f5f5f5;--sapTile_Active_Background:#f5f5f5;--sapTile_BorderColor:transparent;--sapTile_BorderCornerRadius:.25rem;--sapTile_TitleTextColor:#32363a;--sapTile_TextColor:#6a6d70;--sapTile_IconColor:#5a7da0;--sapTile_SeparatorColor:#ccc;--sapTile_Interactive_BorderColor:#b3b3b3;--sapTile_OverlayBackground:rgba(0,0,0,.8);--sapTile_OverlayForegroundColor:#fff;--sapAccentColor1:#d08014;--sapAccentColor2:#d04343;--sapAccentColor3:#db1f77;--sapAccentColor4:#c0399f;--sapAccentColor5:#6367de;--sapAccentColor6:#286eb4;--sapAccentColor7:#0f828f;--sapAccentColor8:#7ca10c;--sapAccentColor9:#925ace;--sapAccentColor10:#647987;--sapAccentBackgroundColor1:#fff3b8;--sapAccentBackgroundColor2:#ffd0e7;--sapAccentBackgroundColor3:#fff0fa;--sapAccentBackgroundColor4:#ffdcf3;--sapAccentBackgroundColor5:#ded3ff;--sapAccentBackgroundColor6:#d1efff;--sapAccentBackgroundColor7:#c2fcee;--sapAccentBackgroundColor8:#ebf5cb;--sapAccentBackgroundColor9:#dafdf5;--sapAccentBackgroundColor10:#eaecee;--sapIndicationColor_1:#800;--sapIndicationColor_1_Background:#800;--sapIndicationColor_1_BorderColor:#800;--sapIndicationColor_1_TextColor:#fff;--sapIndicationColor_1_Hover_Background:#6f0000;--sapIndicationColor_1_Active_Background:#500;--sapIndicationColor_1_Active_BorderColor:#800;--sapIndicationColor_1_Active_TextColor:#fff;--sapIndicationColor_1_Selected_Background:#500;--sapIndicationColor_1_Selected_BorderColor:#800;--sapIndicationColor_1_Selected_TextColor:#fff;--sapIndicationColor_1b:#fb9d9d;--sapIndicationColor_1b_BorderColor:#fb9d9d;--sapIndicationColor_1b_Hover_Background:#fa8585;--sapIndicationColor_2:#b00;--sapIndicationColor_2_Background:#b00;--sapIndicationColor_2_BorderColor:#b00;--sapIndicationColor_2_TextColor:#fff;--sapIndicationColor_2_Hover_Background:#a20000;--sapIndicationColor_2_Active_Background:#800;--sapIndicationColor_2_Active_BorderColor:#b00;--sapIndicationColor_2_Active_TextColor:#fff;--sapIndicationColor_2_Selected_Background:#800;--sapIndicationColor_2_Selected_BorderColor:#b00;--sapIndicationColor_2_Selected_TextColor:#fff;--sapIndicationColor_2b:#fcc4c4;--sapIndicationColor_2b_BorderColor:#fcc4c4;--sapIndicationColor_2b_Hover_Background:#fbacac;--sapIndicationColor_3:#df6e0c;--sapIndicationColor_3_Background:#df6e0c;--sapIndicationColor_3_BorderColor:#df6e0c;--sapIndicationColor_3_TextColor:#fff;--sapIndicationColor_3_Hover_Background:#d0670b;--sapIndicationColor_3_Active_Background:#c2600a;--sapIndicationColor_3_Active_BorderColor:#df6e0c;--sapIndicationColor_3_Active_TextColor:#fff;--sapIndicationColor_3_Selected_Background:#c2600a;--sapIndicationColor_3_Selected_BorderColor:#df6e0c;--sapIndicationColor_3_Selected_TextColor:#fff;--sapIndicationColor_3b:#fff2c0;--sapIndicationColor_3b_BorderColor:#fff2c0;--sapIndicationColor_3b_Hover_Background:#ffeda6;--sapIndicationColor_4:#107e3e;--sapIndicationColor_4_Background:#107e3e;--sapIndicationColor_4_BorderColor:#107e3e;--sapIndicationColor_4_TextColor:#fff;--sapIndicationColor_4_Hover_Background:#0d6733;--sapIndicationColor_4_Active_Background:#0a5128;--sapIndicationColor_4_Active_BorderColor:#107e3e;--sapIndicationColor_4_Active_TextColor:#fff;--sapIndicationColor_4_Selected_Background:#0a5128;--sapIndicationColor_4_Selected_BorderColor:#107e3e;--sapIndicationColor_4_Selected_TextColor:#fff;--sapIndicationColor_4b:#bae8bc;--sapIndicationColor_4b_BorderColor:#bae8bc;--sapIndicationColor_4b_Hover_Background:#a7e2a9;--sapIndicationColor_5:#0a6ed1;--sapIndicationColor_5_Background:#0a6ed1;--sapIndicationColor_5_BorderColor:#0a6ed1;--sapIndicationColor_5_TextColor:#fff;--sapIndicationColor_5_Hover_Background:#0961b9;--sapIndicationColor_5_Active_Background:#0854a0;--sapIndicationColor_5_Active_BorderColor:#0a6ed1;--sapIndicationColor_5_Active_TextColor:#fff;--sapIndicationColor_5_Selected_Background:#0854a0;--sapIndicationColor_5_Selected_BorderColor:#0a6ed1;--sapIndicationColor_5_Selected_TextColor:#fff;--sapIndicationColor_5b:#d3effd;--sapIndicationColor_5b_BorderColor:#d3effd;--sapIndicationColor_5b_Hover_Background:#bbe6fc;--sapIndicationColor_6:#0f828f;--sapIndicationColor_6_Background:#0f828f;--sapIndicationColor_6_BorderColor:#0f828f;--sapIndicationColor_6_TextColor:#fff;--sapIndicationColor_6_Hover_Background:#0d6d78;--sapIndicationColor_6_Active_Background:#0a5861;--sapIndicationColor_6_Active_BorderColor:#0f828f;--sapIndicationColor_6_Active_TextColor:#fff;--sapIndicationColor_6_Selected_Background:#0a5861;--sapIndicationColor_6_Selected_BorderColor:#0f828f;--sapIndicationColor_6_Selected_TextColor:#fff;--sapIndicationColor_6b:#cdf5ec;--sapIndicationColor_6b_BorderColor:#cdf5ec;--sapIndicationColor_6b_Hover_Background:#b8f1e4;--sapIndicationColor_7:#925ace;--sapIndicationColor_7_Background:#925ace;--sapIndicationColor_7_BorderColor:#925ace;--sapIndicationColor_7_TextColor:#fff;--sapIndicationColor_7_Hover_Background:#8546c8;--sapIndicationColor_7_Active_Background:#7838bd;--sapIndicationColor_7_Active_BorderColor:#925ace;--sapIndicationColor_7_Active_TextColor:#fff;--sapIndicationColor_7_Selected_Background:#7838bd;--sapIndicationColor_7_Selected_BorderColor:#925ace;--sapIndicationColor_7_Selected_TextColor:#fff;--sapIndicationColor_7b:#e2dbff;--sapIndicationColor_7b_BorderColor:#e2dbff;--sapIndicationColor_7b_Hover_Background:#cdc2ff;--sapIndicationColor_8:#c0399f;--sapIndicationColor_8_Background:#c0399f;--sapIndicationColor_8_BorderColor:#c0399f;--sapIndicationColor_8_TextColor:#fff;--sapIndicationColor_8_Hover_Background:#ac338f;--sapIndicationColor_8_Active_Background:#992d7e;--sapIndicationColor_8_Active_BorderColor:#c0399f;--sapIndicationColor_8_Active_TextColor:#fff;--sapIndicationColor_8_Selected_Background:#992d7e;--sapIndicationColor_8_Selected_BorderColor:#c0399f;--sapIndicationColor_8_Selected_TextColor:#fff;--sapIndicationColor_8b:#f8d6ff;--sapIndicationColor_8b_BorderColor:#f8d6ff;--sapIndicationColor_8b_Hover_Background:#f4bdff;--sapIndicationColor_9:#1d2d3e;--sapIndicationColor_9_Background:#1d2d3e;--sapIndicationColor_9_BorderColor:#1d2d3e;--sapIndicationColor_9_TextColor:#fff;--sapIndicationColor_9_Hover_Background:#15202d;--sapIndicationColor_9_Active_Background:#0d141b;--sapIndicationColor_9_Active_BorderColor:#1d2d3e;--sapIndicationColor_9_Active_TextColor:#fff;--sapIndicationColor_9_Selected_Background:#0d141b;--sapIndicationColor_9_Selected_BorderColor:#1d2d3e;--sapIndicationColor_9_Selected_TextColor:#fff;--sapIndicationColor_9b:#fff;--sapIndicationColor_9b_BorderColor:#d9d9d9;--sapIndicationColor_9b_Hover_Background:#f2f2f2;--sapIndicationColor_10:#45484a;--sapIndicationColor_10_Background:#45484a;--sapIndicationColor_10_BorderColor:#45484a;--sapIndicationColor_10_TextColor:#fff;--sapIndicationColor_10_Hover_Background:#393b3d;--sapIndicationColor_10_Active_Background:#2c2e30;--sapIndicationColor_10_Active_BorderColor:#45484a;--sapIndicationColor_10_Active_TextColor:#fff;--sapIndicationColor_10_Selected_Background:#2c2e30;--sapIndicationColor_10_Selected_BorderColor:#45484a;--sapIndicationColor_10_Selected_TextColor:#fff;--sapIndicationColor_10b:#eaecee;--sapIndicationColor_10b_BorderColor:#eaecee;--sapIndicationColor_10b_Hover_Background:#dcdfe3;--sapLegend_WorkingBackground:#fafafa;--sapLegend_NonWorkingBackground:#dedede;--sapLegend_CurrentDateTime:#c0399f;--sapLegendColor1:#d58215;--sapLegendColor2:#dc5b5b;--sapLegendColor3:#db1f77;--sapLegendColor4:#9b3b3b;--sapLegendColor5:#cf5db3;--sapLegendColor6:#286eb4;--sapLegendColor7:#1193a2;--sapLegendColor8:#8b9668;--sapLegendColor9:#647987;--sapLegendColor10:#892971;--sapLegendColor11:#725a3a;--sapLegendColor12:#bb2f2f;--sapLegendColor13:#bc1b66;--sapLegendColor14:#8b714f;--sapLegendColor15:#606190;--sapLegendColor16:#597da1;--sapLegendColor17:#49797e;--sapLegendColor18:#687a33;--sapLegendColor19:#295989;--sapLegendColor20:#5154bd;--sapLegendBackgroundColor1:#fdf3e7;--sapLegendBackgroundColor2:#faeaea;--sapLegendBackgroundColor3:#fce9f2;--sapLegendBackgroundColor4:#f8ecec;--sapLegendBackgroundColor5:#f9ebf5;--sapLegendBackgroundColor6:#ebf3fa;--sapLegendBackgroundColor7:#e8fbfd;--sapLegendBackgroundColor8:#f3f4ef;--sapLegendBackgroundColor9:#f1f3f4;--sapLegendBackgroundColor10:#f9ebf6;--sapLegendBackgroundColor11:#f6f2ed;--sapLegendBackgroundColor12:#faeaea;--sapLegendBackgroundColor13:#fce9f2;--sapLegendBackgroundColor14:#f5f2ee;--sapLegendBackgroundColor15:#f0f0f5;--sapLegendBackgroundColor16:#eff2f6;--sapLegendBackgroundColor17:#eff5f6;--sapLegendBackgroundColor18:#f5f7ed;--sapLegendBackgroundColor19:#ebf2f9;--sapLegendBackgroundColor20:#ecedf8;--sapChart_OrderedColor_1:#438cd5;--sapChart_OrderedColor_2:#e66729;--sapChart_OrderedColor_3:#16976c;--sapChart_OrderedColor_4:#ed4a7b;--sapChart_OrderedColor_5:#945ecf;--sapChart_OrderedColor_6:#1193a2;--sapChart_OrderedColor_7:#525df4;--sapChart_OrderedColor_8:#bf399e;--sapChart_OrderedColor_9:#6c8893;--sapChart_OrderedColor_10:#ed5f5f;--sapChart_OrderedColor_11:#2f6497;--sapChart_Bad:#dc0d0e;--sapChart_Critical:#cb7d0c;--sapChart_Good:#3c9d57;--sapChart_Neutral:#848f94;--sapChart_Sequence_1:#438cd5;--sapChart_Sequence_2:#e66729;--sapChart_Sequence_3:#16976c;--sapChart_Sequence_4:#ed4a7b;--sapChart_Sequence_5:#945ecf;--sapChart_Sequence_6:#1193a2;--sapChart_Sequence_7:#525df4;--sapChart_Sequence_8:#bf399e;--sapChart_Sequence_9:#6c8893;--sapChart_Sequence_10:#ed5f5f;--sapChart_Sequence_11:#2f6497;--sapChart_Sequence_Neutral:#848f94;}" };

const styleData$m = { packageName: "@ui5/webcomponents", fileName: "themes/sap_fiori_3/parameters-bundle.css", content: ":root{--ui5-v1-18-0-avatar-hover-box-shadow-offset:0px 0px 0px 0.0625rem;--ui5-v1-18-0-avatar-initials-color:var(--sapContent_ImagePlaceholderForegroundColor);--ui5-v1-18-0-avatar-border-radius:.25rem;--ui5-v1-18-0-avatar-border-radius-img-deduction:0.0625rem;--ui5-v1-18-0-avatar-initials-border:none;--ui5-v1-18-0-avatar-accent1:var(--sapAccentColor1);--ui5-v1-18-0-avatar-accent2:var(--sapAccentColor2);--ui5-v1-18-0-avatar-accent3:var(--sapAccentColor3);--ui5-v1-18-0-avatar-accent4:var(--sapAccentColor4);--ui5-v1-18-0-avatar-accent5:var(--sapAccentColor5);--ui5-v1-18-0-avatar-accent6:var(--sapAccentColor6);--ui5-v1-18-0-avatar-accent7:var(--sapAccentColor7);--ui5-v1-18-0-avatar-accent8:var(--sapAccentColor8);--ui5-v1-18-0-avatar-accent9:var(--sapAccentColor9);--ui5-v1-18-0-avatar-accent10:var(--sapAccentColor10);--ui5-v1-18-0-avatar-placeholder:var(--sapContent_ImagePlaceholderBackground);--ui5-v1-18-0-avatar-accent1-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent2-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent3-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent4-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent5-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent6-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent7-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent8-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent9-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent10-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-placeholder-color:var(--ui5-v1-18-0-avatar-initials-color);--ui5-v1-18-0-avatar-accent1-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent2-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent3-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent4-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent5-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent6-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent7-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent8-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent9-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-accent10-border-color:var(--sapField_BorderColor);--ui5-v1-18-0-avatar-placeholder-border-color:var(--sapField_BorderColor);--_ui5-v1-18-0_avatar_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-18-0_avatar_focus_offset:1px;--_ui5-v1-18-0_avatar_focus_width:1px;--_ui5-v1-18-0_avatar_focus_color:var(--sapContent_FocusColor);--_ui5-v1-18-0_avatar_fontsize_XS:0.75rem;--_ui5-v1-18-0_avatar_fontsize_M:1.625rem;--_ui5-v1-18-0_avatar_fontsize_L:2rem;--_ui5-v1-18-0_avatar_fontsize_XL:2.75rem;--_ui5-v1-18-0_avatar_icon_XS:1rem;--_ui5-v1-18-0_avatar_icon_S:1.5rem;--_ui5-v1-18-0_avatar_icon_M:2rem;--_ui5-v1-18-0_avatar_icon_L:2.5rem;--_ui5-v1-18-0_avatar_icon_XL:3rem;--_ui5-v1-18-0_avatar_fontsize_XS:1rem;--_ui5-v1-18-0_avatar_fontsize_S:1.125rem;--_ui5-v1-18-0_avatar_fontsize_M:1.5rem;--_ui5-v1-18-0_avatar_fontsize_L:2.25rem;--_ui5-v1-18-0_avatar_fontsize_XL:3rem;--_ui5-v1-18-0_avatar_group_button_focus_border:none;--_ui5-v1-18-0-badge-height:1rem;--_ui5-v1-18-0-badge-border:0.0625em solid;--_ui5-v1-18-0-badge-border-radius:0.5rem;--_ui5-v1-18-0-badge-padding-inline:0.3125em;--_ui5-v1-18-0-badge-padding-inline-icon-only:0.1875rem;--_ui5-v1-18-0-badge-text-transform:uppercase;--_ui5-v1-18-0-badge-icon-gap:0.125rem;--_ui5-v1-18-0-badge-font-size:var(--sapFontSmallSize);--_ui5-v1-18-0-badge-font:\"72override\",var(--sapFontFamily);--_ui5-v1-18-0-badge-font-weight:bold;--_ui5-v1-18-0-badge-default-border-color:var(--ui5-v1-18-0-badge-color-scheme-1-border);--_ui5-v1-18-0-badge-default-background:var(--ui5-v1-18-0-badge-color-scheme-1-background);--_ui5-v1-18-0-badge-default-color:var(--ui5-v1-18-0-badge-color-scheme-1-color);--_ui5-v1-18-0-badge-letter-spacing:0.0125em;--ui5-v1-18-0-badge-color-scheme-1-background:var(--sapLegendBackgroundColor1);--ui5-v1-18-0-badge-color-scheme-1-border:var(--sapAccentColor1);--ui5-v1-18-0-badge-color-scheme-1-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-2-background:var(--sapLegendBackgroundColor2);--ui5-v1-18-0-badge-color-scheme-2-border:var(--sapAccentColor2);--ui5-v1-18-0-badge-color-scheme-2-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-3-background:var(--sapLegendBackgroundColor3);--ui5-v1-18-0-badge-color-scheme-3-border:var(--sapAccentColor3);--ui5-v1-18-0-badge-color-scheme-3-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-4-background:var(--sapLegendBackgroundColor5);--ui5-v1-18-0-badge-color-scheme-4-border:var(--sapAccentColor4);--ui5-v1-18-0-badge-color-scheme-4-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-5-background:var(--sapLegendBackgroundColor20);--ui5-v1-18-0-badge-color-scheme-5-border:var(--sapAccentColor5);--ui5-v1-18-0-badge-color-scheme-5-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-6-background:var(--sapLegendBackgroundColor6);--ui5-v1-18-0-badge-color-scheme-6-border:var(--sapAccentColor6);--ui5-v1-18-0-badge-color-scheme-6-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-7-background:var(--sapLegendBackgroundColor7);--ui5-v1-18-0-badge-color-scheme-7-border:var(--sapAccentColor7);--ui5-v1-18-0-badge-color-scheme-7-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-8-background:var(--sapLegendBackgroundColor18);--ui5-v1-18-0-badge-color-scheme-8-border:var(--sapLegendColor18);--ui5-v1-18-0-badge-color-scheme-8-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-9-background:var(--sapLegendBackgroundColor10);--ui5-v1-18-0-badge-color-scheme-9-border:var(--sapAccentColor10);--ui5-v1-18-0-badge-color-scheme-9-color:var(--sapTextColor);--ui5-v1-18-0-badge-color-scheme-10-background:var(--sapLegendBackgroundColor9);--ui5-v1-18-0-badge-color-scheme-10-border:var(--sapAccentColor9);--ui5-v1-18-0-badge-color-scheme-10-color:var(--sapTextColor);--browser_scrollbar_border_radius:var(--sapElement_BorderCornerRadius);--browser_scrollbar_border:none;--_ui5-v1-18-0_busy_indicator_color:var(--sapContent_IconColor);--_ui5-v1-18-0_busy_indicator_focus_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-18-0_busy_indicator_focus_border_radius:0px;--_ui5-v1-18-0_button_focused_border:0.0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_button_focused_border_radius:0.25rem;--_ui5-v1-18-0_button_focused_inner_border_radius:0;--_ui5-v1-18-0_button_base_min_compact_width:2rem;--_ui5-v1-18-0_button_base_height:var(--sapElement_Height);--_ui5-v1-18-0_button_compact_height:1.625rem;--_ui5-v1-18-0_button_border_radius:var(--sapButton_BorderCornerRadius);--_ui5-v1-18-0_button_compact_padding:0.4375rem;--_ui5-v1-18-0_button_focus_offset:1px;--_ui5-v1-18-0_button_focus_width:1px;--_ui5-v1-18-0_button_pressed_focused_border_color:var(--sapContent_ContrastFocusColor);--_ui5-v1-18-0_button_fontFamily:var(--sapFontFamily);--_ui5-v1-18-0_button_emphasized_focused_border_color:var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_button_base_min_width:2.25rem;--_ui5-v1-18-0_button_base_padding:0.5625rem;--_ui5-v1-18-0_button_base_icon_only_padding:0.5625rem;--_ui5-v1-18-0_button_base_icon_margin:0.375rem;--_ui5-v1-18-0_button_icon_font_size:1rem;--_ui5-v1-18-0_button_text_shadow:none;--_ui5-v1-18-0_button_emphasized_focused_border:0.0625rem dotted var(--sapContent_ContrastFocusColor);--_ui5-v1-18-0_button_emphasized_focused_border_before:0.0625rem solid var(--sapContent_FocusColor);--_ui5-v1-18-0_button_emphasized_outline:1px solid var(--sapContent_FocusColor);--_ui5-v1-18-0_card_box_shadow:var(--sapContent_Shadow0);--_ui5-v1-18-0_card_hover_box_shadow:var(--_ui5-v1-18-0_card_box_shadow);--_ui5-v1-18-0_card_border:1px solid var(--sapTile_BorderColor);--_ui5-v1-18-0_card_border-radius:var(--sapElement_BorderCornerRadius);--_ui5-v1-18-0_card_header_padding:1rem;--_ui5-v1-18-0_card_header_hover_bg:var(--sapList_Hover_Background);--_ui5-v1-18-0_card_header_active_bg:var(--_ui5-v1-18-0_card_header_hover_bg);--_ui5-v1-18-0_card_header_border:1px solid var(--_ui5-v1-18-0_card_header_border_color);--_ui5-v1-18-0_card_header_border_color:var(--sapTile_SeparatorColor);--_ui5-v1-18-0_card_header_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-18-0_card_header_focus_radius:0px;--_ui5-v1-18-0_card_header_focus_bottom_radius:0px;--_ui5-v1-18-0_card_header_focus_offset:1px;--_ui5-v1-18-0_card_header_title_font_family:\"72override\",var(--sapFontFamily);--_ui5-v1-18-0_card_header_title_font_size:var(--sapFontHeader5Size);--_ui5-v1-18-0_card_header_title_font_weight:normal;--_ui5-v1-18-0_card_header_subtitle_margin_top:.25rem;--ui5-v1-18-0_carousel_background_color_solid:var(--sapGroup_ContentBackground);--ui5-v1-18-0_carousel_background_color_translucent:var(--sapBackgroundColor);--ui5-v1-18-0_carousel_button_size:2.5rem;--ui5-v1-18-0_carousel_inactive_dot_size:0.25rem;--ui5-v1-18-0_carousel_inactive_dot_margin:0 0.375rem;--ui5-v1-18-0_carousel_inactive_dot_border:1px solid var(--sapContent_ForegroundBorderColor);--ui5-v1-18-0_carousel_inactive_dot_background:var(--sapContent_ForegroundBorderColor);--ui5-v1-18-0_carousel_active_dot_border:1px solid var(--sapContent_Selected_ForegroundColor);--ui5-v1-18-0_carousel_active_dot_background:var(--sapContent_Selected_ForegroundColor);--ui5-v1-18-0_carousel_navigation_button_active_box_shadow:var(--sapContent_Shadow1);--_ui5-v1-18-0_checkbox_box_shadow:none;--_ui5-v1-18-0_checkbox_transition:unset;--_ui5-v1-18-0_checkbox_focus_border:none;--_ui5-v1-18-0_checkbox_disabled_opacity:.5;--_ui5-v1-18-0_checkbox_border_radius:0;--_ui5-v1-18-0_checkbox_hover_background:var(--sapField_Hover_Background);--_ui5-v1-18-0_checkbox_active_background:var(--sapField_Hover_Background);--_ui5-v1-18-0_checkbox_checkmark_warning_color:var(--sapField_TextColor);--_ui5-v1-18-0_checkbox_inner_warning_color:var(--sapField_WarningColor);--_ui5-v1-18-0_checkbox_inner_information_color:currentColor;--_ui5-v1-18-0_checkbox_checkmark_color:var(--sapSelectedColor);--_ui5-v1-18-0_checkbox_focus_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-18-0_checkbox_focus_border_radius:0;--_ui5-v1-18-0_checkbox_outer_hover_background:transparent;--_ui5-v1-18-0_checkbox_inner_width_height:1.375rem;--_ui5-v1-18-0_checkbox_inner_hover_border_color:var(--sapField_HoverBorderColor);--_ui5-v1-18-0_checkbox_inner_hover_checked_border_color:var(--sapField_HoverBorderColor);--_ui5-v1-18-0_checkbox_inner_selected_border_color:var(--sapField_BorderColor);--_ui5-v1-18-0_checkbox_inner_disabled_border_color:var(--sapField_BorderColor);--_ui5-v1-18-0_checkbox_inner_active_border_color:var(--sapField_BorderColor);--_ui5-v1-18-0_checkbox_inner_error_border:0.125rem solid var(--sapField_InvalidColor);--_ui5-v1-18-0_checkbox_inner_warning_border:0.125rem solid var(--sapField_WarningColor);--_ui5-v1-18-0_checkbox_inner_information_border:0.125rem solid var(--sapField_InformationColor);--_ui5-v1-18-0_checkbox_inner_information_box_shadow:none;--_ui5-v1-18-0_checkbox_inner_warning_box_shadow:none;--_ui5-v1-18-0_checkbox_inner_error_box_shadow:none;--_ui5-v1-18-0_checkbox_inner_success_box_shadow:none;--_ui5-v1-18-0_checkbox_inner_default_box_shadow:none;--_ui5-v1-18-0_checkbox_inner_warning_background_hover:var(--sapField_WarningBackground);--_ui5-v1-18-0_checkbox_inner_error_background_hover:var(--sapField_InvalidBackground);--_ui5-v1-18-0_checkbox_inner_success_background_hover:var(--sapField_SuccessBackground);--_ui5-v1-18-0_checkbox_inner_information_background_hover:var(--sapField_InformationBackground);--_ui5-v1-18-0_checkbox_inner_success_border:var(--sapField_BorderWidth) solid var(--sapField_SuccessColor);--_ui5-v1-18-0_checkbox_inner_background:var(--sapField_Background);--_ui5-v1-18-0_checkbox_wrapped_focus_left_top_bottom_position:.5625rem;--_ui5-v1-18-0_checkbox_compact_wrapper_padding:.5rem;--_ui5-v1-18-0_checkbox_compact_width_height:2rem;--_ui5-v1-18-0_checkbox_compact_inner_size:1rem;--_ui5-v1-18-0_checkbox_compact_focus_position:.375rem;--_ui5-v1-18-0_checkbox_label_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_checkbox_label_offset:var(--_ui5-v1-18-0_checkbox_wrapper_padding);--_ui5-v1-18-0_checkbox_disabled_label_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_checkbox_default_focus_border:none;--_ui5-v1-18-0_checkbox_focus_outline_display:block;--_ui5-v1-18-0_checkbox_right_focus_distance:0;--_ui5-v1-18-0_checkbox_wrapper_padding:.6875rem;--_ui5-v1-18-0_checkbox_width_height:2.75rem;--_ui5-v1-18-0_checkbox_inner_border:.0625rem solid var(--sapField_BorderColor);--_ui5-v1-18-0_checkbox_focus_position:0.5625rem;--_ui5-v1-18-0_checkbox_inner_border_radius:.125rem;--_ui5-v1-18-0_checkbox_wrapped_content_margin_top:0;--_ui5-v1-18-0_checkbox_wrapped_focus_padding:.5rem;--_ui5-v1-18-0_checkbox_inner_readonly_border:1px solid var(--sapField_ReadOnly_BorderColor);--_ui5-v1-18-0_checkbox_compact_wrapped_label_margin_top:-0.125rem;--_ui5-v1-18-0_color-palette-item-container-sides-padding:0.3125rem;--_ui5-v1-18-0_color-palette-item-container-rows-padding:0.6875rem;--_ui5-v1-18-0_color-palette-item-focus-height:1.5rem;--_ui5-v1-18-0_color-palette-item-container-padding:var(--_ui5-v1-18-0_color-palette-item-container-sides-padding) var(--_ui5-v1-18-0_color-palette-item-container-rows-padding);--_ui5-v1-18-0_color-palette-item-hover-margin:0;--_ui5-v1-18-0_color-palette-row-height:9.5rem;--_ui5-v1-18-0_color-palette-button-height:3rem;--_ui5-v1-18-0_color-palette-item-before-focus-color:0.0625rem solid #fff;--_ui5-v1-18-0_color-palette-item-before-focus-offset:0.0625rem;--_ui5-v1-18-0_color-palette-item-before-focus-hover-offset:0.0625rem;--_ui5-v1-18-0_color-palette-item-after-focus-color:0.0625rem dotted #000;--_ui5-v1-18-0_color-palette-item-after-focus-offset:0.0625rem;--_ui5-v1-18-0_color-palette-item-after-focus-hover-offset:0.0625rem;--_ui5-v1-18-0_color-palette-item-before-focus-border-radius:0;--_ui5-v1-18-0_color-palette-item-outer-border-radius:0.25rem;--_ui5-v1-18-0_color-palette-item-inner-border-radius:0.1875rem;--_ui5-v1-18-0_color-palette-item-hover-outer-border-radius:0.25rem;--_ui5-v1-18-0_color-palette-item-hover-inner-border-radius:0.1875rem;--_ui5-v1-18-0_color_picker_slider_handle_box_shadow:0.0625rem solid var(--sapField_BorderColor);--_ui5-v1-18-0_color_picker_slider_handle_border:0.125rem solid var(--sapField_BorderColor);--_ui5-v1-18-0_color_picker_slider_handle_outline_hover:0.125rem solid var(--sapButton_Hover_BorderColor);--_ui5-v1-18-0_color_picker_slider_handle_outline_focus:0.0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_color_picker_slider_handle_margin_top:0.125rem;--_ui5-v1-18-0_color_picker_slider_handle_focus_margin_top:0.125rem;--_ui5-v1-18-0_color_picker_circle_outer_border:0.0625rem solid var(--sapContent_ContrastShadowColor);--_ui5-v1-18-0_color_picker_circle_inner_border:0.0625rem solid var(--sapField_BorderColor);--_ui5-v1-18-0_color_picker_circle_inner_circle_size:0.5625rem;--_ui5-v1-18-0_color_picker_slider_container_margin_top:-10px;--_ui5-v1-18-0_color_picker_slider_handle_inline_focus:none;--_ui5-v1-18-0_datepicker_icon_border:none;--_ui5-v1-18-0-datepicker_border_radius:0;--_ui5-v1-18-0-datepicker-hover-background:var(--sapField_Hover_Background);--_ui5-v1-18-0-datepicker_icon_border_radius:0;--_ui5-v1-18-0_daypicker_item_box_shadow:inset 0 0 0 0.0625rem var(--sapContent_Selected_ForegroundColor);--_ui5-v1-18-0_daypicker_item_margin:2px;--_ui5-v1-18-0_daypicker_item_border:none;--_ui5-v1-18-0_daypicker_item_selected_border_color:var(--sapList_Background);--_ui5-v1-18-0_daypicker_daynames_container_height:2rem;--_ui5-v1-18-0_daypicker_weeknumbers_container_padding_top:2rem;--_ui5-v1-18-0_daypicker_item_othermonth_background_color:var(--sapList_Background);--_ui5-v1-18-0_daypicker_item_othermonth_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_daypicker_item_othermonth_hover_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_daypicker_item_now_inner_border_radius:0;--_ui5-v1-18-0_daypicker_item_outline_width:1px;--_ui5-v1-18-0_daypicker_item_outline_offset:1px;--_ui5-v1-18-0_daypicker_item_now_focus_after_width:calc(100% - 0.25rem);--_ui5-v1-18-0_daypicker_item_now_focus_after_height:calc(100% - 0.25rem);--_ui5-v1-18-0_daypicker_item_now_selected_focus_after_width:calc(100% - 0.375rem);--_ui5-v1-18-0_daypicker_item_now_selected_focus_after_height:calc(100% - 0.375rem);--_ui5-v1-18-0_daypicker_item_selected_box_shadow:var(--_ui5-v1-18-0_daypicker_item_box_shadow),var(--_ui5-v1-18-0_daypicker_item_box_shadow);--_ui5-v1-18-0_daypicker_item_selected_daytext_hover_background:transparent;--_ui5-v1-18-0_daypicker_item_outline_focus_after:none;--_ui5-v1-18-0_daypicker_item_border_focus_after:var(--_ui5-v1-18-0_daypicker_item_outline_width) dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_daypicker_item_width_focus_after:calc(100% - 0.25rem);--_ui5-v1-18-0_daypicker_item_height_focus_after:calc(100% - 0.25rem);--_ui5-v1-18-0_daypicker_item_now_border:0.125rem solid var(--sapLegend_CurrentDateTime);--_ui5-v1-18-0_daypicker_item_now_outline:none;--_ui5-v1-18-0_daypicker_item_now_outline_offset:none;--_ui5-v1-18-0_daypicker_item_now_outline_offset_focus_after:var(--_ui5-v1-18-0_daypicker_item_now_outline_offset);--_ui5-v1-18-0_daypicker_item_selected_between_border:5%;--_ui5-v1-18-0_daypicker_item_selected_between_background:transparent;--_ui5-v1-18-0_daypicker_item_selected_between_text_background:var(--sapList_SelectionBackgroundColor);--_ui5-v1-18-0_daypicker_item_selected_between_text_font:inherit;--_ui5-v1-18-0_daypicker_item_selected_between_hover_background:inherit;--_ui5-v1-18-0_daypicker_item_now_box_shadow:inset 0 0 0 0.0625rem var(--_ui5-v1-18-0_daypicker_item_selected_border_color);--_ui5-v1-18-0_daypicker_item_selected_text_outline:none;--_ui5-v1-18-0_daypicker_item_now_not_selected_inset:0;--_ui5-v1-18-0_daypicker_item_now_inset:0.1875rem;--_ui5-v1-18-0_daypicker_item_now_border_color:var(--sapLegend_CurrentDateTime);--_ui5-v1-18-0_daypicker_item_weeekend_filter:brightness(100%);--_ui5-v1-18-0_daypicker_item_selected_hover:var(--sapContent_Selected_Hover_Background);--_ui5-v1-18-0_daypicker_two_calendar_item_now_inset:0.1875rem;--_ui5-v1-18-0_daypicker_item_selected__secondary_type_text_outline:none;--_ui5-v1-18-0_daypicker_two_calendar_item_now_day_text_content:none;--_ui5-v1-18-0_daypicker_two_calendar_item_now_selected_border_width:0.0625rem;--_ui5-v1-18-0_daypicker_two_calendar_item_border_radius:0.3125rem;--_ui5-v1-18-0_daypicker_two_calendar_item_border_focus_border_radius:0rem;--_ui5-v1-18-0_daypicker_two_calendar_item_no_selected_inset:0.125rem;--_ui5-v1-18-0_daypicker_two_calendar_item_selected_now_border_radius_focus:0.0625rem;--_ui5-v1-18-0_daypicker_two_calendar_item_no_selected_focus_inset:0.125rem;--_ui5-v1-18-0_daypicker_two_calendar_item_no_select_focus_border_radius:0.0625rem;--_ui5-v1-18-0_dp_two_calendar_item_secondary_text_border_radios:0.25rem;--_ui5-v1-18-0_daypicker_two_calendar_item_now_selected_border_inset:0.125rem;--_ui5-v1-18-0_daypicker_item_selected_background:var(--sapContent_Selected_Background);--_ui5-v1-18-0_daypicker_dayname_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_daypicker_weekname_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_daypicker_item_border_radius_focus_after:0.0625rem;--_ui5-v1-18-0_daypicker_item_border_radius_item:0.0625rem;--_ui5-v1-18-0_daypicker_item_selected_border:none;--_ui5-v1-18-0_daypicker_item_not_selected_focus_border:0.0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_daypicker_item_selected_focus_color:var(--sapContent_ContrastFocusColor);--_ui5-v1-18-0_daypicker_item_selected_focus_width:0.0625rem;--_ui5-v1-18-0_daypicker_item_no_selected_inset:0.125rem;--_ui5-v1-18-0_daypicker_item_now_border_focus_after:0.0625rem dotted var(--sapList_SelectionBorderColor);--_ui5-v1-18-0_daypicker_item_now_border_radius_focus_after:0.0625rem;--_ui5-v1-18-0_day_picker_item_selected_now_border:0.1875rem solid var(--sapList_Background);--_ui5-v1-18-0_day_picker_item_selected_now_border_focus:0.0625rem dotted var(--sapContent_ContrastFocusColor);--_ui5-v1-18-0_day_picker_item_selected_now_border_radius_focus:0.0625rem;--_ui5-v1-18-0-dp-item_withsecondtype_border:0.1875rem;--_ui5-v1-18-0_daypicker_item_border_radius:0.25rem;--_ui5-v1-18-0_daypicker_item_selected_text_border:none;--_ui5-v1-18-0_daypicker_item_selected_between_text_border_radios:0.25rem;--_ui5-v1-18-0_daypicker_item_select_between_border:1px solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-18-0_daypicker_item_now_selected_outline_offset:-0.3125rem;--_ui5-v1-18-0_file_uploader_hover_border:1px solid var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_file_uploader_value_state_error_hover_background_color:var(--sapField_Hover_Background);--_ui5-v1-18-0_dialog_resize_handle_color:var(--sapButton_Lite_TextColor);--_ui5-v1-18-0_dialog_resize_handle_right:-0.25rem;--_ui5-v1-18-0_dialog_resize_handle_bottom:-0.0625rem;--_ui5-v1-18-0_dialog_header_focus_bottom_offset:3px;--_ui5-v1-18-0_dialog_header_focus_top_offset:2px;--_ui5-v1-18-0_dialog_header_focus_left_offset:2px;--_ui5-v1-18-0_dialog_header_focus_right_offset:2px;--_ui5-v1-18-0_dialog_header_border_radius:0px;--_ui5-v1-18-0_dialog_header_error_state_icon_color:var(--sapNegativeElementColor);--_ui5-v1-18-0_dialog_header_information_state_icon_color:var(--sapInformativeElementColor);--_ui5-v1-18-0_dialog_header_success_state_icon_color:var(--sapPositiveElementColor);--_ui5-v1-18-0_dialog_header_warning_state_icon_color:var(--sapCriticalElementColor);--_ui5-v1-18-0_dialog_header_state_line_height:0.0625rem;--ui5-v1-18-0-group-header-listitem-background-color:var(--sapList_GroupHeaderBackground);--_ui5-v1-18-0_input_width:13.125rem;--_ui5-v1-18-0_input_min_width:2.75rem;--_ui5-v1-18-0_input_height:var(--sapElement_Height);--_ui5-v1-18-0_input_compact_height:1.625rem;--_ui5-v1-18-0_input_hover_border:var(--sapField_BorderWidth) var(--sapField_BorderStyle) var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_input_value_state_error_hover_background:var(--sapField_Hover_Background);--_ui5-v1-18-0_input_background_color:var(--sapField_Background);--_ui5-v1-18-0_input_border_radius:var(--sapField_BorderCornerRadius);--_ui5-v1-18-0_input_focus_border_radius:0;--_ui5-v1-18-0_input_placeholder_style:italic;--_ui5-v1-18-0_input_placeholder_color:var(--sapField_PlaceholderTextColor);--_ui5-v1-18-0_input_bottom_border_height:0;--_ui5-v1-18-0_input_bottom_border_color:transparent;--_ui5-v1-18-0_input_focused_border_color:var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_input_state_border_width:0.125rem;--_ui5-v1-18-0_input_information_border_width:0.125rem;--_ui5-v1-18-0_input_error_font_weight:normal;--_ui5-v1-18-0_input_warning_font_weight:normal;--_ui5-v1-18-0_input_focus_border_width:1px;--_ui5-v1-18-0_input_error_warning_border_style:solid;--_ui5-v1-18-0_input_error_warning_font_style:inherit;--_ui5-v1-18-0_input_error_warning_text_indent:0;--_ui5-v1-18-0_input_disabled_color:var(--sapContent_DisabledTextColor);--_ui5-v1-18-0_input_disabled_font_weight:normal;--_ui5-v1-18-0_input_disabled_border_color:var(--sapField_BorderColor);--_ui5-v1-18-0-input_disabled_background:var(--sapField_Background);--_ui5-v1-18-0_input_readonly_border_color:var(--sapField_ReadOnly_BorderColor);--_ui5-v1-18-0_input_readonly_background:var(--sapField_ReadOnly_Background);--_ui5-v1-18-0_input_custom_icon_padding:.5625rem .625rem;--_ui5-v1-18-0_input_error_warning_custom_icon_padding:.5rem .625rem;--_ui5-v1-18-0_input_error_warning_custom_focused_icon_padding:.5rem .625rem;--_ui5-v1-18-0_input_information_custom_icon_padding:.5rem .625rem;--_ui5-v1-18-0_input_information_custom_focused_icon_padding:.5rem .625rem;--_ui5-v1-18-0_input_error_warning_icon_padding:.5rem .5rem .5rem .5625rem;--_ui5-v1-18-0_input_error_warning_focused_icon_padding:.5rem .5rem .5rem .5625rem;--_ui5-v1-18-0_input_information_icon_padding:.5rem .5rem .5rem .5625rem;--_ui5-v1-18-0_input_information_focused_icon_padding:.5rem .5rem .5rem .5625rem;--_ui5-v1-18-0_input_disabled_opacity:var(--sapContent_DisabledOpacity);--_ui5-v1-18-0_input_icon_min_width:2.25rem;--_ui5-v1-18-0_input_compact_min_width:2rem;--_ui5-v1-18-0_input_transition:none;--_ui5-v1-18-0-input-value-state-icon-display:none;--_ui5-v1-18-0_input_focused_value_state_error_background:var(--sapField_InvalidBackground);--_ui5-v1-18-0_input_focused_value_state_warning_background:var(--sapField_WarningBackground);--_ui5-v1-18-0_input_focused_value_state_success_background:var(--sapField_SuccessBackground);--_ui5-v1-18-0_input_focused_value_state_information_background:var(--sapField_InformationBackground);--_ui5-v1-18-0_input_value_state_error_border_color:var(--sapField_InvalidColor);--_ui5-v1-18-0_input_focused_value_state_error_border_color:var(--sapField_InvalidColor);--_ui5-v1-18-0_input_focused_value_state_error_focus_outline_color:var(--sapContent_FocusColor);--_ui5-v1-18-0_input_focused_value_state_warning_focus_outline_color:var(--sapContent_FocusColor);--_ui5-v1-18-0_input_focused_value_state_success_focus_outline_color:var(--sapContent_FocusColor);--_ui5-v1-18-0_input_value_state_warning_border_color:var(--sapField_WarningColor);--_ui5-v1-18-0_input_focused_value_state_warning_border_color:var(--sapField_WarningColor);--_ui5-v1-18-0_input_value_state_success_border_color:var(--sapField_SuccessColor);--_ui5-v1-18-0_input_focused_value_state_success_border_color:var(--sapField_SuccessColor);--_ui5-v1-18-0_input_value_state_success_border_width:1px;--_ui5-v1-18-0_input_value_state_information_border_color:var(--sapField_InformationColor);--_ui5-v1-18-0_input_focused_value_state_information_border_color:var(--sapField_InformationColor);--_ui5-v1-18-0-input-value-state-information-border-width:1px;--_ui5-v1-18-0-input-background-image:none;--_ui5-v1-18-0_input_focus_offset:1px;--ui5-v1-18-0_input_focus_pseudo_element_content:\"\";--_ui5-v1-18-0_input_value_state_error_warning_placeholder_font_weight:normal;--_ui5-v1-18-0_input_focus_outline_color:var(--sapContent_FocusColor);--_ui5-v1-18-0-input_error_placeholder_color:var(--sapField_PlaceholderTextColor);--_ui5-v1-18-0_input_icon_width:2.25rem;--_ui5-v1-18-0_input_icon_wrapper_height:100%;--_ui5-v1-18-0_input_icon_wrapper_state_height:100%;--_ui5-v1-18-0_input_icon_wrapper_success_state_height:100%;--_ui5-v1-18-0-input-icons-count:0;--_ui5-v1-18-0_input_margin_top_bottom:0.1875rem;--_ui5-v1-18-0_input_tokenizer_min_width:3.25rem;--_ui5-v1-18-0-input-border:1px solid var(--sapField_BorderColor);--_ui5-v1-18-0_input_icon_padding:.5625rem;--_ui5-v1-18-0_input_icon_color:var(--sapContent_IconColor);--_ui5-v1-18-0_input_icon_pressed_color:var(--sapButton_Active_TextColor);--_ui5-v1-18-0_input_icon_pressed_bg:var(--sapButton_Selected_Background);--_ui5-v1-18-0_input_icon_hover_bg:var(--sapButton_Lite_Hover_Background);--_ui5-v1-18-0_input_icon_border_radius:0;--_ui5-v1-18-0_input_icon_box_shadow:none;--_ui5-v1-18-0_input_icon_border:1px solid transparent;--_ui5-v1-18-0_input_error_icon_box_shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);--_ui5-v1-18-0_input_warning_icon_box_shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);--_ui5-v1-18-0_input_information_icon_box_shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);--_ui5-v1-18-0_input_success_icon_box_shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);--_ui5-v1-18-0_input_icon_error_pressed_color:var(--sapButton_Active_TextColor);--_ui5-v1-18-0_input_icon_warning_pressed_color:var(--sapButton_Active_TextColor);--_ui5-v1-18-0_input_icon_information_pressed_color:var(--sapButton_Active_TextColor);--_ui5-v1-18-0_input_icon_success_pressed_color:var(--sapButton_Active_TextColor);--_ui5-v1-18-0_link_focused_hover_text_decoration:underline;--_ui5-v1-18-0_link_focused_hover_text_color:var(--sapLinkColor);--_ui5-v1-18-0_link_active_text_decoration:underline;--_ui5-v1-18-0_link_border:0.0625rem dotted transparent;--_ui5-v1-18-0_link_border_focus:0.0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_link_focus_border-radius:0;--_ui5-v1-18-0_link_focus_background_color:transparent;--_ui5-v1-18-0_link_focus_color:var(--sapLinkColor);--_ui5-v1-18-0_link_focus_text_decoration:underline;--_ui5-v1-18-0_link_subtle_text_decoration:none;--_ui5-v1-18-0_link_subtle_text_decoration_hover:underline;--_ui5-v1-18-0_link_text_decoration:none;--_ui5-v1-18-0_link_hover_text_decoration:underline;--ui5-v1-18-0_list_footer_text_color:var(--sapTextColor);--ui5-v1-18-0-listitem-background-color:var(--sapList_Background);--ui5-v1-18-0-listitem-border-bottom:var(--sapList_BorderWidth) solid var(--sapList_BorderColor);--ui5-v1-18-0-listitem-selected-border-bottom:1px solid var(--sapList_SelectionBorderColor);--ui5-v1-18-0-listitem-focused-selected-border-bottom:1px solid var(--sapList_SelectionBorderColor);--ui5-v1-18-0-listitem-active-border-color:var(--sapContent_ContrastFocusColor);--ui5-v1-18-0-listitem-padding:0 1rem;--ui5-v1-18-0-listitem-focus-border-radius:0;--ui5-v1-18-0-listitem-focus-offset:0.125rem;--_ui5-v1-18-0_listitembase_focus_width:1px;--_ui5-v1-18-0-listitembase_disabled_opacity:0.5;--_ui5-v1-18-0_product_switch_item_border:none;--_ui5-v1-18-0_menu_popover_border_radius:var(--sapElement_BorderCornerRadius);--_ui5-v1-18-0_menu_item_padding:0 1rem 0 0.75rem;--_ui5-v1-18-0_menu_item_submenu_icon_right:1rem;--_ui5-v1-18-0_menu_item_additional_text_start_margin:1rem;--_ui5-v1-18-0_monthpicker_item_border:none;--_ui5-v1-18-0_monthpicker_item_margin:1px;--_ui5-v1-18-0_monthpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5-v1-18-0_monthpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5-v1-18-0_monthpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_monthpicker_item_focus_after_offset:2px;--_ui5-v1-18-0_monthpicker_item_focus_after_border_radius:0;--_ui5-v1-18-0_monthpicker_item_selected_text_color:var(--sapContent_ContrastTextColor);--_ui5-v1-18-0_monthpicker_item_selected_background_color:var(--sapSelectedColor);--_ui5-v1-18-0_monthpicker_item_selected_hover_color:var(--sapContent_Selected_Background);--_ui5-v1-18-0_monthpicker_item_selected_box_shadow:none;--_ui5-v1-18-0_monthpicker_item_focus_after_outline:none;--_ui5-v1-18-0_monthpicker_item_selected_font_wieght:inherit;--_ui5-v1-18-0_monthpicker_item_border_radius:0.25rem;--_ui5-v1-18-0_message_strip_icon_width:2.5rem;--_ui5-v1-18-0_message_strip_button_border_width:0;--_ui5-v1-18-0_message_strip_button_border_style:none;--_ui5-v1-18-0_message_strip_button_border_color:transparent;--_ui5-v1-18-0_message_strip_button_border_radius:0;--_ui5-v1-18-0_message_strip_padding:0.4375rem 2.5rem 0.4375rem 2.5rem;--_ui5-v1-18-0_message_strip_padding_block_no_icon:0.4375rem 0.4375rem;--_ui5-v1-18-0_message_strip_padding_inline_no_icon:1rem 2.5rem;--_ui5-v1-18-0_message_strip_button_height:1.625rem;--_ui5-v1-18-0_message_strip_border_width:1px;--_ui5-v1-18-0_message_strip_close_button_border:none;--_ui5-v1-18-0_message_strip_icon_top:0.4375rem;--_ui5-v1-18-0_message_strip_focus_width:1px;--_ui5-v1-18-0_message_strip_focus_offset:-2px;--_ui5-v1-18-0_message_strip_close_button_top:0.125rem;--_ui5-v1-18-0_message_strip_close_button_right:0.125rem;--_ui5-v1-18-0_panel_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-18-0_panel_border_radius:0px;--_ui5-v1-18-0_panel_border_radius_expanded:0;--_ui5-v1-18-0_panel_default_header_border:none;--_ui5-v1-18-0_panel_border_bottom:0.0625rem solid var(--sapGroup_TitleBorderColor);--_ui5-v1-18-0_panel_outline_offset:-3px;--_ui5-v1-18-0_panel_icon_color:var(--sapContent_IconColor);--_ui5-v1-18-0_panel_header_padding_right:0.5rem;--_ui5-v1-18-0_panel_header_button_wrapper_padding:.25rem;--_ui5-v1-18-0_panel_focus_offset:1px;--_ui5-v1-18-0_panel_content_padding:0.625rem 1rem 1.375rem 1rem;--_ui5-v1-18-0_panel_header_background_color:var(--sapBackgroundColor);--_ui5-v1-18-0_panel_button_root_width:2.75rem;--_ui5-v1-18-0_popover_background:var(--sapGroup_ContentBackground);--_ui5-v1-18-0_popover_box_shadow:var(--sapContent_Shadow2);--_ui5-v1-18-0_popover_no_arrow_box_shadow:var(--sapContent_Shadow1);--_ui5-v1-18-0_popup_content_padding_s:1rem;--_ui5-v1-18-0_popup_content_padding_m_l:2rem;--_ui5-v1-18-0_popup_content_padding_xl:3rem;--_ui5-v1-18-0_popup_header_footer_padding_s:1rem;--_ui5-v1-18-0_popup_header_footer_padding_m_l:2rem;--_ui5-v1-18-0_popup_header_footer_padding_xl:3rem;--_ui5-v1-18-0_popup_viewport_margin:10px;--_ui5-v1-18-0_popup_header_font_weight:400;--_ui5-v1-18-0_popup_header_font_family:var(--sapFontFamily);--_ui5-v1-18-0_popup_header_prop_header_text_alignment:flex-start;--_ui5-v1-18-0_popup_border_radius:var(--sapElement_BorderCornerRadius);--_ui5-v1-18-0_popup_header_background:var(--sapPageHeader_Background);--_ui5-v1-18-0_popup_header_shadow:var(--sapContent_HeaderShadow);--_ui5-v1-18-0_popup_header_border:none;--_ui5-v1-18-0_progress_indicator_background_none:var(--sapField_Background);--_ui5-v1-18-0_progress_indicator_background_error:var(--sapField_Background);--_ui5-v1-18-0_progress_indicator_background_warning:var(--sapField_Background);--_ui5-v1-18-0_progress_indicator_background_success:var(--sapField_Background);--_ui5-v1-18-0_progress_indicator_background_information:var(--sapField_Background);--_ui5-v1-18-0_progress_indicator_value_state_none:var(--sapNeutralElementColor);--_ui5-v1-18-0_progress_indicator_value_state_error:var(--sapNegativeElementColor);--_ui5-v1-18-0_progress_indicator_value_state_warning:var(--sapCriticalElementColor);--_ui5-v1-18-0_progress_indicator_value_state_success:var(--sapPositiveElementColor);--_ui5-v1-18-0_progress_indicator_value_state_information:var(--sapInformativeElementColor);--_ui5-v1-18-0_progress_indicator_border_color_error:var(--sapField_BorderColor);--_ui5-v1-18-0_progress_indicator_border_color_warning:var(--sapField_BorderColor);--_ui5-v1-18-0_progress_indicator_border_color_success:var(--sapField_BorderColor);--_ui5-v1-18-0_progress_indicator_border_color_information:var(--sapField_BorderColor);--_ui5-v1-18-0_progress_indicator_color:var(--sapTextColor);--_ui5-v1-18-0_progress_indicator_bar_color:var(--sapContent_ContrastTextColor);--_ui5-v1-18-0_progress_indicator_border:0.0625rem solid var(--sapField_BorderColor);--_ui5-v1-18-0_progress_indicator_bar_border_max:none;--_ui5-v1-18-0_progress_indicator_icon_visibility:none;--_ui5-v1-18-0_progress_indicator_side_points_visibility:none;--_ui5-v1-18-0_progress_indicator_host_height:1rem;--_ui5-v1-18-0_progress_indicator_host_min_height:1rem;--_ui5-v1-18-0_progress_indicator_root_border_radius:0.5rem;--_ui5-v1-18-0_progress_indicator_root_height:100%;--_ui5-v1-18-0_progress_indicator_root_overflow:hidden;--_ui5-v1-18-0_progress_indicator_bar_height:100%;--_ui5-v1-18-0_progress_indicator_bar_border_radius:0.5rem 0 0 0.5rem;--_ui5-v1-18-0_progress_indicator_remaining_bar_overflow:hidden;--_ui5-v1-18-0_progress_indicator_icon_size:var(--sapFontSmallSize);--_ui5-v1-18-0_progress_indicator_value_margin:0 0.375rem;--_ui5-v1-18-0_radio_button_min_width:2.75rem;--_ui5-v1-18-0_radio_button_hover_fill:var(--sapField_Hover_Background);--_ui5-v1-18-0_radio_button_hover_fill_error:var(--sapField_Hover_Background);--_ui5-v1-18-0_radio_button_hover_fill_warning:var(--sapField_Hover_Background);--_ui5-v1-18-0_radio_button_hover_fill_success:var(--sapField_Hover_Background);--_ui5-v1-18-0_radio_button_hover_fill_information:var(--sapField_Hover_Background);--_ui5-v1-18-0_radio_button_border_width:1px;--_ui5-v1-18-0_radio_button_checked_fill:var(--sapSelectedColor);--_ui5-v1-18-0_radio_button_checked_error_fill:var(--sapField_InvalidColor);--_ui5-v1-18-0_radio_button_checked_warning_fill:var(--sapField_TextColor);--_ui5-v1-18-0_radio_button_checked_success_fill:var(--sapField_SuccessColor);--_ui5-v1-18-0_radio_button_checked_information_fill:var(--sapField_InformationColor);--_ui5-v1-18-0_radio_button_warning_error_border_dash:0;--_ui5-v1-18-0_radio_button_outer_ring_color:var(--sapField_BorderColor);--_ui5-v1-18-0_radio_button_outer_ring_width:var(--sapField_BorderWidth);--_ui5-v1-18-0_radio_button_outer_ring_bg:var(--sapField_Background);--_ui5-v1-18-0_radio_button_outer_ring_hover_color:var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_radio_button_outer_ring_active_color:var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_radio_button_outer_ring_checked_hover_color:var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_radio_button_outer_ring_padding:0 0.625rem;--_ui5-v1-18-0_radio_button_outer_ring_padding_with_label:0 0.6875rem;--_ui5-v1-18-0_radio_button_border_radius:0;--_ui5-v1-18-0_radio_button_border:none;--_ui5-v1-18-0_radio_button_focus_border:none;--_ui5-v1-18-0_radio_button_focus_outline:block;--_ui5-v1-18-0_radio_button_focus_dist:0.5rem;--_ui5-v1-18-0_radio_button_color:var(--sapField_BorderColor);--_ui5-v1-18-0_radio_button_label_offset:1px;--_ui5-v1-18-0_radio_button_label_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_radio_button_items_align:unset;--_ui5-v1-18-0_radio_button_inner_ring_radius:22%;--_ui5-v1-18-0_radio_button_read_only_border_type:none;--_ui5-v1-18-0_radio_button_inner_ring_color:var(--sapSelectedColor);--_ui5-v1-18-0_radio_button_information_border_width:var(--sapField_InformationBorderWidth);--_ui5-v1-18-0_radio_button_read_only_border_width:var(--sapField_BorderWidth);--_ui5-v1-18-0_radio_button_read_only_inner_ring_color:var(--sapContent_NonInteractiveIconColor);--_ui5-v1-18-0_rating_indicator_border_radius:0px;--_ui5-v1-18-0_rating_indicator_outline_offset:0px;--_ui5-v1-18-0_rating_indicator_item_height:1em;--_ui5-v1-18-0_rating_indicator_item_width:1em;--_ui5-v1-18-0_rating_indicator_readonly_item_height:1em;--_ui5-v1-18-0_rating_indicator_readonly_item_width:1em;--_ui5-v1-18-0_rating_indicator_readonly_item_spacing:0px;--_ui5-v1-18-0_rating_indicator_component_spacing:0.5rem 0px;--_ui5-v1-18-0_segmented_btn_inner_border:0.0625rem solid var(--sapButton_BorderColor);--_ui5-v1-18-0_segmented_btn_inner_border_odd_child:0;--_ui5-v1-18-0_segmented_btn_inner_pressed_border_odd_child:0;--_ui5-v1-18-0_segmented_btn_inner_border_radius:0;--_ui5-v1-18-0_segmented_btn_item_border_left:0px;--_ui5-v1-18-0_segmented_btn_item_border_right:0.0625rem;--_ui5-v1-18-0_select_disabled_background:var(--sapField_Background);--_ui5-v1-18-0_select_disabled_border_color:var(--sapField_BorderColor);--_ui5-v1-18-0_select_state_error_warning_border_style:solid;--_ui5-v1-18-0_select_state_error_warning_border_width:0.125rem;--_ui5-v1-18-0_select_hover_icon_left_border:1px solid transparent;--_ui5-v1-18-0_select_focus_width:1px;--_ui5-v1-18-0_select_label_color:var(--sapField_TextColor);--_ui5-v1-18-0_split_button_focused_border:0.0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_split_button_focused_border_radius:0.125rem;--_ui5-v1-18-0_split_button_hover_border_radius:0;--_ui5-v1-18-0_split_button_attention_separator_color:var(--sapButton_Attention_BorderColor);--_ui5-v1-18-0_split_button_middle_separator_width:0;--_ui5-v1-18-0_split_button_middle_separator_left:0;--_ui5-v1-18-0_split_button_middle_separator_hover_display:block;--_ui5-v1-18-0_split_button_text_button_width:2.25rem;--_ui5-v1-18-0_split_button_text_button_right_border_width:0;--_ui5-v1-18-0_split_button_transparent_hover_background:var(--sapButton_Lite_Background);--_ui5-v1-18-0_split_button_host_transparent_hover_background:transparent;--_ui5-v1-18-0_split_button_transparent_hover_color:var(--sapButton_Lite_TextColor);--_ui5-v1-18-0_split_button_transparent_disabled_background:transparent;--_ui5-v1-18-0_split_button_inner_focused_border_radius_outer:0.25rem;--_ui5-v1-18-0_split_button_inner_focused_border_radius_inner:0;--_ui5-v1-18-0_split_button_host_default_box_shadow:inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_BorderColor);--_ui5-v1-18-0_split_button_host_attention_box_shadow:inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Attention_BorderColor);--_ui5-v1-18-0_split_button_host_emphasized_box_shadow:inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_split_button_host_positive_box_shadow:inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Accept_BorderColor);--_ui5-v1-18-0_split_button_host_negative_box_shadow:inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Reject_BorderColor);--_ui5-v1-18-0_split_button_host_transparent_box_shadow:inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Lite_BorderColor);--_ui5-v1-18-0_split_button_host_transparent_hover_box_shadow:none;--_ui5-v1-18-0_split_text_button_border_color:transparent;--_ui5-v1-18-0_split_text_button_background_color:transparent;--_ui5-v1-18-0_split_text_button_emphasized_border:var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_split_text_button_emphasized_border_width:0.0625rem 0 0.0625rem 0.0625rem;--_ui5-v1-18-0_split_text_button_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-18-0_split_text_button_emphasized_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_split_text_button_positive_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-18-0_split_text_button_negative_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-18-0_split_text_button_attention_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-18-0_split_text_button_transparent_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_--_ui5-v1-18-0_split_button_text_button_border_width_rtl:0.0625rem 0.0625rem 0.0625rem 0;--_ui5-v1-18-0_split_text_button_emphasized_border_width_rtl:0.0625rem;--_ui5-v1-18-0_split_arrow_button_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-18-0_split_arrow_button_emphasized_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_split_arrow_button_emphasized_hover_border_left:var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_split_arrow_button_positive_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-18-0_split_arrow_button_negative_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-18-0_split_arrow_button_attention_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-18-0_split_arrow_button_transparent_hover_border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-18-0_split_text_button_hover_border_right:none;--_ui5-v1-18-0_split_text_button_emphasized_hover_border_right:none;--_ui5-v1-18-0_split_text_button_positive_hover_border_right:none;--_ui5-v1-18-0_split_text_button_negative_hover_border_right:none;--_ui5-v1-18-0_split_text_button_attention_hover_border_right:none;--_ui5-v1-18-0_split_text_button_transparent_hover_border_right:none;--_ui5-v1-18-0_split_text_button_hover_border_left:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-18-0_split_text_button_emphasized_hover_border_left:var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_split_text_button_positive_hover_border_left:var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-18-0_split_text_button_negative_hover_border_left:var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-18-0_split_text_button_attention_hover_border_left:var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-18-0_split_text_button_transparent_hover_border_left:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-18-0_split_text_button_hover_border_left_rtl:var(--sapButton_BorderWidth) solid transparent;--_ui5-v1-18-0_split_text_button_emphasized_hover_border_left_rtl:var(--sapButton_BorderWidth) solid transparent;--_ui5-v1-18-0_split_text_button_positive_hover_border_left_rtl:var(--sapButton_BorderWidth) solid transparent;--_ui5-v1-18-0_split_text_button_negative_hover_border_left_rtl:var(--sapButton_BorderWidth) solid transparent;--_ui5-v1-18-0_split_text_button_attention_hover_border_left_rtl:var(--sapButton_BorderWidth) solid transparent;--_ui5-v1-18-0_split_text_button_transparent_hover_border_left_rtl:var(--sapButton_BorderWidth) solid transparent;--_ui5-v1-18-0_split_text_button_hover_border_right_rtl:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-18-0_split_text_button_emphasized_hover_border_right_rtl:var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_split_text_button_positive_hover_border_right_rtl:var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-18-0_split_text_button_negative_hover_border_right_rtl:var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-18-0_split_text_button_attention_hover_border_right_rtl:var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-18-0_split_text_button_transparent_hover_border_right_rtl:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-18-0_split_arrow_button_wrapper_emphasized_hover_border_left_width_rtl:var(--sapButton_BorderWidth);--_ui5-v1-18-0_switch_height:2.75rem;--_ui5-v1-18-0_switch_width:3.25rem;--_ui5-v1-18-0_switch_min_width:3.875rem;--_ui5-v1-18-0_switch_with_label_width:100%;--_ui5-v1-18-0_switch_focus_outline:var(--_ui5-v1-18-0_switch_foucs_border_size) dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_switch_root_outline_top:0.25rem;--_ui5-v1-18-0_switch_root_outline_bottom:0.25rem;--_ui5-v1-18-0_switch_root_outline_left:0;--_ui5-v1-18-0_switch_root_outline_right:0;--_ui5-v1-18-0_switch_foucs_border_size:1px;--_ui5-v1-18-0-switch-root-border-radius:0;--_ui5-v1-18-0-switch-root-box-shadow:none;--_ui5-v1-18-0_switch_root_after_outline:none;--_ui5-v1-18-0-switch-focus:\"\";--_ui5-v1-18-0_switch_disabled_opacity:.4;--_ui5-v1-18-0_switch_transform:translateX(100%) translateX(-1.875rem);--_ui5-v1-18-0_switch_transform_with_label:translateX(100%) translateX(-1.875rem);--_ui5-v1-18-0_switch_rtl_transform:translateX(-100%) translateX(1.875rem);--_ui5-v1-18-0_switch_rtl_transform_with_label:translateX(-100%) translateX(1.875rem);--_ui5-v1-18-0_switch_track_with_label_width:100%;--_ui5-v1-18-0_switch_track_with_label_height:1.375rem;--_ui5-v1-18-0_switch_track_width:100%;--_ui5-v1-18-0_switch_track_height:1.375rem;--_ui5-v1-18-0_switch_track_border_radius:0.75rem;--_ui5-v1-18-0-switch-track-border:1px solid;--_ui5-v1-18-0_switch_track_active_background_color:var(--sapButton_Track_Selected_Background);--_ui5-v1-18-0_switch_track_inactive_background_color:var(--sapButton_Track_Background);--_ui5-v1-18-0_switch_track_hover_active_background_color:var(--sapButton_Track_Selected_Background);--_ui5-v1-18-0_switch_track_hover_inactive_background_color:var(--sapButton_Track_Background);--_ui5-v1-18-0_switch_track_active_border_color:var(--sapContent_ForegroundBorderColor);--_ui5-v1-18-0_switch_track_inactive_border_color:var(--sapContent_ForegroundBorderColor);--_ui5-v1-18-0_switch_track_hover_active_border_color:var(--sapButton_Hover_BorderColor);--_ui5-v1-18-0_switch_track_hover_inactive_border_color:var(--sapButton_Hover_BorderColor);--_ui5-v1-18-0_switch_track_semantic_accept_background_color:var(--sapSuccessBackground);--_ui5-v1-18-0_switch_track_semantic_reject_background_color:var(--sapErrorBackground);--_ui5-v1-18-0_switch_track_semantic_hover_accept_background_color:var(--sapSuccessBackground);--_ui5-v1-18-0_switch_track_semantic_hover_reject_background_color:var(--sapErrorBackground);--_ui5-v1-18-0_switch_track_semantic_accept_border_color:var(--sapSuccessBorderColor);--_ui5-v1-18-0_switch_track_semantic_reject_border_color:var(--sapErrorBorderColor);--_ui5-v1-18-0_switch_track_semantic_hover_accept_border_color:var(--sapSuccessBorderColor);--_ui5-v1-18-0_switch_track_semantic_hover_reject_border_color:var(--sapErrorBorderColor);--_ui5-v1-18-0_switch_track_transition:none;--_ui5-v1-18-0_switch_track_icon_display:none;--_ui5-v1-18-0_switch_handle_width:2rem;--_ui5-v1-18-0_switch_handle_height:2rem;--_ui5-v1-18-0_switch_handle_with_label_width:2rem;--_ui5-v1-18-0_switch_handle_with_label_height:2rem;--_ui5-v1-18-0_switch_handle_border:var(--_ui5-v1-18-0_switch_handle_border_width) solid var(--sapButton_Handle_BorderColor);--_ui5-v1-18-0_switch_handle_border_width:0.0625rem;--_ui5-v1-18-0_switch_handle_border_radius:1rem;--_ui5-v1-18-0_switch_handle_active_background_color:var(--sapButton_Selected_Background);--_ui5-v1-18-0_switch_handle_inactive_background_color:var(--sapButton_TokenBackground);--_ui5-v1-18-0_switch_handle_hover_active_background_color:var(--sapButton_Selected_Hover_Background);--_ui5-v1-18-0_switch_handle_hover_inactive_background_color:var(--sapButton_Handle_Hover_Background);--_ui5-v1-18-0_switch_handle_active_border_color:var(--sapButton_Selected_BorderColor);--_ui5-v1-18-0_switch_handle_inactive_border_color:var(--sapContent_ForegroundBorderColor);--_ui5-v1-18-0_switch_handle_hover_active_border_color:var(--sapButton_Selected_BorderColor);--_ui5-v1-18-0_switch_handle_hover_inactive_border_color:var(--sapButton_Hover_BorderColor);--_ui5-v1-18-0_switch_handle_semantic_accept_background_color:var(--sapButton_Background);--_ui5-v1-18-0_switch_handle_semantic_reject_background_color:var(--sapButton_Background);--_ui5-v1-18-0_switch_handle_semantic_hover_accept_background_color:var(--sapSuccessBackground);--_ui5-v1-18-0_switch_handle_semantic_hover_reject_background_color:var(--sapErrorBackground);--_ui5-v1-18-0_switch_handle_semantic_accept_border_color:var(--sapSuccessBorderColor);--_ui5-v1-18-0_switch_handle_semantic_reject_border_color:var(--sapErrorBorderColor);--_ui5-v1-18-0_switch_handle_semantic_hover_accept_border_color:var(--sapSuccessBorderColor);--_ui5-v1-18-0_switch_handle_semantic_hover_reject_border_color:var(--sapErrorBorderColor);--_ui5-v1-18-0_switch_handle_on_hover_box_shadow:none;--_ui5-v1-18-0_switch_handle_off_hover_box_shadow:none;--_ui5-v1-18-0_switch_handle_semantic_on_hover_box_shadow:var(--sapContent_Informative_Shadow);--_ui5-v1-18-0_switch_handle_semantic_off_hover_box_shadow:var(--sapContent_Negative_Shadow);--_ui5-v1-18-0-switch-handle-icon-display:none;--_ui5-v1-18-0_switch_handle_left:-0.0625rem;--_ui5-v1-18-0-switch-slider-texts-display:inline;--_ui5-v1-18-0_switch_text_font_family:\"72override\",var(--sapFontFamily);--_ui5-v1-18-0_switch_text_font_size:var(--sapFontSmallSize);--_ui5-v1-18-0_switch_text_with_label_font_family:\"72override\",var(--sapFontFamily);--_ui5-v1-18-0_switch_text_with_label_font_size:var(--sapFontSmallSize);--_ui5-v1-18-0_switch_text_with_label_width:none;--_ui5-v1-18-0_switch_text_width:none;--_ui5-v1-18-0_switch_text_inactive_left:auto;--_ui5-v1-18-0_switch_text_inactive_left_alternate:auto;--_ui5-v1-18-0_switch_text_inactive_right:0.125rem;--_ui5-v1-18-0_switch_text_inactive_right_alternate:0.125rem;--_ui5-v1-18-0_switch_text_active_left:calc(-100% + 2rem);--_ui5-v1-18-0_switch_text_active_left_alternate:calc(-100% + 2rem);--_ui5-v1-18-0_switch_text_active_right:auto;--_ui5-v1-18-0_switch_text_active_color:var(--sapButton_Track_Selected_TextColor);--_ui5-v1-18-0_switch_text_inactive_color:var(--sapTextColor);--_ui5-v1-18-0_switch_text_semantic_accept_color:var(--sapPositiveElementColor);--_ui5-v1-18-0_switch_text_semantic_reject_color:var(--sapNegativeElementColor);--_ui5-v1-18-0_switch_text_overflow:none;--_ui5-v1-18-0_switch_text_z_index:inherit;--_ui5-v1-18-0_switch_text_hidden:hidden;--_ui5-v1-18-0_switch_text_min_width:1.625rem;--_ui5-v1-18-0_switch_icon_width:0.75rem;--_ui5-v1-18-0_switch_icon_height:0.75rem;--_ui5-v1-18-0_tc_header_height:var(--_ui5-v1-18-0_tc_item_height);--_ui5-v1-18-0_tc_header_height_text_only:var(--_ui5-v1-18-0_tc_item_text_only_height);--_ui5-v1-18-0_tc_header_height_text_with_additional_text:var(--_ui5-v1-18-0_tc_item_text_only_with_additional_text_height);--_ui5-v1-18-0_tc_header_box_shadow:var(--sapContent_HeaderShadow);--_ui5-v1-18-0_tc_header_background:var(--sapObjectHeader_Background);--_ui5-v1-18-0_tc_header_background_translucent:var(--sapObjectHeader_Background);--_ui5-v1-18-0_tc_content_background:var(--sapBackgroundColor);--_ui5-v1-18-0_tc_content_background_translucent:var(--sapGroup_ContentBackground);--_ui5-v1-18-0_tc_headeritem_padding:1rem;--_ui5-v1-18-0_tc_headerItem_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_tc_headerItem_additional_text_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_tc_headerItem_text_selected_color:var(--sapSelectedColor);--_ui5-v1-18-0_tc_headerItem_text_selected_hover_color:var(--sapSelectedColor);--_ui5-v1-18-0_tc_headeritem_text_font_weight:normal;--_ui5-v1-18-0_tc_headerItem_additional_text_font_weight:normal;--_ui5-v1-18-0_tc_headerItem_neutral_color:var(--sapNeutralColor);--_ui5-v1-18-0_tc_headerItem_positive_color:var(--sapPositiveColor);--_ui5-v1-18-0_tc_headerItem_negative_color:var(--sapNegativeColor);--_ui5-v1-18-0_tc_headerItem_critical_color:var(--sapCriticalColor);--_ui5-v1-18-0_tc_headerItem_neutral_border_color:var(--_ui5-v1-18-0_tc_headerItem_neutral_color);--_ui5-v1-18-0_tc_headerItem_positive_border_color:var(--_ui5-v1-18-0_tc_headerItem_positive_color);--_ui5-v1-18-0_tc_headerItem_negative_border_color:var(--_ui5-v1-18-0_tc_headerItem_negative_color);--_ui5-v1-18-0_tc_headerItem_critical_border_color:var(--_ui5-v1-18-0_tc_headerItem_critical_color);--_ui5-v1-18-0_tc_headerItem_neutral_selected_border_color:var(--_ui5-v1-18-0_tc_headerItem_neutral_color);--_ui5-v1-18-0_tc_headerItem_positive_selected_border_color:var(--_ui5-v1-18-0_tc_headerItem_positive_color);--_ui5-v1-18-0_tc_headerItem_negative_selected_border_color:var(--_ui5-v1-18-0_tc_headerItem_negative_color);--_ui5-v1-18-0_tc_headerItem_critical_selected_border_color:var(--_ui5-v1-18-0_tc_headerItem_critical_color);--_ui5-v1-18-0_tc_headerItem_transition:none;--_ui5-v1-18-0_tc_headerItem_hover_border_visibility:hidden;--_ui5-v1-18-0_tc_headerItem_focus_offset:0px;--_ui5-v1-18-0_tc_headerItemContent_border_radius:0.125rem 0.125rem 0 0;--_ui5-v1-18-0_tc_headerItemContent_border_bg:transparent;--_ui5-v1-18-0_tc_headerItem_neutral_border_bg:transparent;--_ui5-v1-18-0_tc_headerItem_positive_border_bg:transparent;--_ui5-v1-18-0_tc_headerItem_negative_border_bg:transparent;--_ui5-v1-18-0_tc_headerItem_critical_border_bg:transparent;--_ui5-v1-18-0_tc_headerItemContent_border_height:0;--_ui5-v1-18-0_tc_headerItemContent_focus_offset:1rem;--_ui5-v1-18-0_tc_headerItem_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-18-0_tc_headerItem_text_focus_border_offset_left:0px;--_ui5-v1-18-0_tc_headerItem_text_focus_border_offset_right:0px;--_ui5-v1-18-0_tc_headerItem_text_focus_border_offset_top:0px;--_ui5-v1-18-0_tc_headerItem_text_focus_border_offset_bottom:0px;--_ui5-v1-18-0_tc_headerItem_mixed_mode_focus_border_offset_left:0.75rem;--_ui5-v1-18-0_tc_headerItem_mixed_mode_focus_border_offset_right:0.625rem;--_ui5-v1-18-0_tc_headerItem_mixed_mode_focus_border_offset_top:0.75rem;--_ui5-v1-18-0_tc_headerItem_mixed_mode_focus_border_offset_bottom:0.75rem;--_ui5-v1-18-0_tc_headerItemContent_focus_border:none;--_ui5-v1-18-0_tc_headerItemContent_default_focus_border:none;--_ui5-v1-18-0_tc_headerItemContent_focus_border_radius:0;--_ui5-v1-18-0_tc_headerItemSemanticIcon_display:none;--_ui5-v1-18-0_tc_headerItemSemanticIcon_size:0.75rem;--_ui5-v1-18-0_tc_headerItem_focus_border_radius:0px;--_ui5-v1-18-0_tc_mixedMode_itemText_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_tc_mixedMode_itemText_font_family:var(--sapFontFamily);--_ui5-v1-18-0_tc_mixedMode_itemText_font_size:var(--sapFontSmallSize);--_ui5-v1-18-0_tc_mixedMode_itemText_font_weight:normal;--_ui5-v1-18-0_tc_headerItem_expand_button_margin_inline_start:0.625rem;--_ui5-v1-18-0_tc_headerItem_single_click_expand_button_margin_inline_start:0.875rem;--_ui5-v1-18-0_tc_headerItem_expand_button_border_radius:var(--sapButton_BorderCornerRadius);--_ui5-v1-18-0_tc_headerItem_expand_button_separator_display:none;--_ui5-v1-18-0_tc_overflowItem_positive_color:var(--sapPositiveColor);--_ui5-v1-18-0_tc_overflowItem_negative_color:var(--sapNegativeColor);--_ui5-v1-18-0_tc_overflowItem_critical_color:var(--sapCriticalColor);--_ui5-v1-18-0_tc_overflowItem_focus_offset:0.125rem;--_ui5-v1-18-0_tc_overflowItem_extraIndent:0rem;--_ui5-v1-18-0_tc_headerItemIcon_border:1px solid var(--sapHighlightColor);--_ui5-v1-18-0_tc_headerItemIcon_color:var(--sapHighlightColor);--_ui5-v1-18-0_tc_headerItemIcon_selected_background:var(--sapHighlightColor);--_ui5-v1-18-0_tc_headerItemIcon_selected_color:var(--sapGroup_ContentBackground);--_ui5-v1-18-0_tc_headerItemIcon_positive_selected_background:var(--sapPositiveColor);--_ui5-v1-18-0_tc_headerItemIcon_negative_selected_background:var(--sapNegativeColor);--_ui5-v1-18-0_tc_headerItemIcon_critical_selected_background:var(--sapCriticalColor);--_ui5-v1-18-0_tc_headerItemIcon_neutral_selected_background:var(--sapNeutralColor);--_ui5-v1-18-0_tc_headerItemIcon_semantic_selected_color:var(--sapGroup_ContentBackground);--_ui5-v1-18-0_tc_headerItemIcon_background_color:transparent;--_ui5-v1-18-0_tc_headerItem_focus_border_offset:-2px;--_ui5-v1-18-0_tc_headerItemIcon_focus_border_radius:0;--_ui5-v1-18-0_tc_overflow_text_color:var(--sapButton_TextColor);--_ui5-v1-18-0_tc_header_border_bottom:0.0625rem solid var(--sapObjectHeader_Background);--_ui5-v1-18-0_tc_headerItemContent_border_bottom:0.1875rem solid var(--sapSelectedColor);--_ui5-v1-18-0_tc_overflowItem_default_color:var(--sapNeutralTextColor);--_ui5-v1-18-0_tc_overflowItem_current_color:CurrentColor;--_ui5-v1-18-0_tc_content_border_bottom:0.0625rem solid var(--sapObjectHeader_BorderColor);--_ui5-v1-18-0_tc_headerItem_text_hover_color:#1a1c1f;--_ui5-v1-18-0_textarea_state_border_width:0.125rem;--_ui5-v1-18-0_textarea_information_border_width:0.125rem;--_ui5-v1-18-0_textarea_placeholder_font_style:italic;--_ui5-v1-18-0_textarea_value_state_error_warning_placeholder_font_weight:normal;--_ui5-v1-18-0_textarea_error_placeholder_font_style:italic;--_ui5-v1-18-0_textarea_error_placeholder_color:var(--sapField_PlaceholderTextColor);--_ui5-v1-18-0_textarea_error_hover_background_color:var(--sapField_Hover_Background);--_ui5-v1-18-0_textarea_hover_border:var(--sapField_BorderWidth) var(--sapField_BorderStyle) var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_textarea_error_warning_border_style:solid;--_ui5-v1-18-0_textarea_disabled_opacity:0.4;--_ui5-v1-18-0_textarea_line_height:1.4;--_ui5-v1-18-0_textarea_focus_pseudo_element_content:\"\";--_ui5-v1-18-0_textarea_focused_value_state_error_background:var(--sapField_InvalidBackground);--_ui5-v1-18-0_textarea_focused_value_state_warning_background:var(--sapField_WarningBackground);--_ui5-v1-18-0_textarea_focused_value_state_success_background:var(--sapField_SuccessBackground);--_ui5-v1-18-0_textarea_focused_value_state_information_background:var(--sapField_InformationBackground);--_ui5-v1-18-0_textarea_focused_value_state_error_focus_outline_color:var(--sapContent_FocusColor);--_ui5-v1-18-0_textarea_focused_value_state_warning_focus_outline_color:var(--sapContent_FocusColor);--_ui5-v1-18-0_textarea_focused_value_state_success_focus_outline_color:var(--sapContent_FocusColor);--_ui5-v1-18-0_textarea_focus_offset:1px;--_ui5-v1-18-0_textarea_readonly_focus_offset:1px;--_ui5-v1-18-0_textarea_value_state_focus_offset:1px;--_ui5-v1-18-0_textarea_focus_outline_color:var(--sapContent_FocusColor);--_ui5-v1-18-0_textarea_min_height:2.25rem;--_ui5-v1-18-0_textarea_padding_right_and_left:0.5625rem;--_ui5-v1-18-0_textarea_padding_right_and_left_error_warning:0.5rem;--_ui5-v1-18-0_textarea_padding_right_and_left_information:0.5rem;--_ui5-v1-18-0_textarea_padding_right_and_left_readonly:0.5625rem;--_ui5-v1-18-0_textarea_padding_top:0.4375rem;--_ui5-v1-18-0_textarea_padding_bottom:0.4375rem;--_ui5-v1-18-0_textarea_padding_top_readonly:0.4375rem;--_ui5-v1-18-0_textarea_padding_bottom_readonly:0.4375rem;--_ui5-v1-18-0_textarea_padding_top_error_warning:0.375rem;--_ui5-v1-18-0_textarea_padding_bottom_error_warning:0.375rem;--_ui5-v1-18-0_textarea_padding_top_information:0.375rem;--_ui5-v1-18-0_textarea_padding_bottom_information:0.375rem;--_ui5-v1-18-0_textarea_exceeded_text_height:1rem;--_ui5-v1-18-0_textarea_readonly_border_style:var(--sapField_BorderStyle);--_ui5-v1-18-0-time_picker_border_radius:0;--_ui5-v1-18-0_time_picker_border:0.0625rem solid transparent;--_ui5-v1-18-0_toast_vertical_offset:3rem;--_ui5-v1-18-0_toast_horizontal_offset:2rem;--_ui5-v1-18-0_toast_background:var(--sapList_Background);--_ui5-v1-18-0_toast_shadow:var(--sapContent_Shadow2);--_ui5-v1-18-0_toast_offset_width:-0.1875rem;--_ui5-v1-18-0_wheelslider_item_text_size:var(--sapFontSize);--_ui5-v1-18-0_wheelslider_label_text_size:var(--sapFontSmallSize);--_ui5-v1-18-0_wheelslider_selection_frame_margin_top:calc(var(--_ui5-v1-18-0_wheelslider_item_height)*2);--_ui5-v1-18-0_wheelslider_mobile_selection_frame_margin_top:calc(var(--_ui5-v1-18-0_wheelslider_item_height)*4);--_ui5-v1-18-0_wheelslider_label_text_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_wheelslider_height:240px;--_ui5-v1-18-0_wheelslider_mobile_height:432px;--_ui5-v1-18-0_wheelslider_item_width:48px;--_ui5-v1-18-0_wheelslider_item_height:46px;--_ui5-v1-18-0_wheelslider_arrows_visibility:hidden;--_ui_wheelslider_item_expanded_hover_color:var(--sapList_Hover_Background);--_ui5-v1-18-0_wheelslider_item_background_color:var(--sapLegend_WorkingBackground);--_ui5-v1-18-0_wheelslider_item_text_color:var(--sapTextColor);--_ui_wheelslider_item_hover_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5-v1-18-0_wheelslider_item_border_color:var(--sapList_Background);--_ui5-v1-18-0_wheelslider_item_hovered_border_color:var(--sapList_Background);--_ui5-v1-18-0_wheelslider_collapsed_item_text_color:var(--_ui5-v1-18-0_wheelslider_item_border_color);--_ui5-v1-18-0_wheelslider_selected_item_background_color:var(--sapContent_Selected_Background);--_ui5-v1-18-0_wheelslider_selected_item_hover_background_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5-v1-18-0_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5-v1-18-0_wheelslider_active_item_text_color:var(--sapContent_Selected_TextColor);--_ui5-v1-18-0_wheelslider_selection_frame_color:var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius:var(--_ui5-v1-18-0_button_border_radius);--_ui5-v1-18-0_toggle_button_pressed_focussed:var(--sapButton_Selected_BorderColor);--_ui5-v1-18-0_toggle_button_pressed_focussed_hovered:var(--sapButton_Selected_BorderColor);--_ui5-v1-18-0_toggle_button_selected_positive_text_color:var(--sapButton_Selected_TextColor);--_ui5-v1-18-0_toggle_button_selected_negative_text_color:var(--sapButton_Selected_TextColor);--_ui5-v1-18-0_toggle_button_selected_attention_text_color:var(--sapButton_Selected_TextColor);--_ui5-v1-18-0_toggle_button_emphasized_pressed_focussed_hovered:var(--sapContent_FocusColor);--_ui5-v1-18-0_toggle_button_emphasized_text_shadow:none;--_ui5-v1-18-0_yearpicker_item_selected_focus:var(--sapContent_Selected_Background);--_ui5-v1-18-0_yearpicker_item_selected_hover_color:var(--sapContent_Selected_Background);--_ui5-v1-18-0_yearpicker_item_border:none;--_ui5-v1-18-0_yearpicker_item_margin:1px;--_ui5-v1-18-0_yearpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5-v1-18-0_yearpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5-v1-18-0_yearpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_yearpicker_item_focus_after_offset:2px;--_ui5-v1-18-0_yearpicker_item_focus_after_border_radius:0;--_ui5-v1-18-0_yearpicker_item_selected_background_color:var(--sapSelectedColor);--_ui5-v1-18-0_yearpicker_item_selected_text_color:var(--sapContent_ContrastTextColor);--_ui5-v1-18-0_yearpicker_item_selected_box_shadow:none;--_ui5-v1-18-0_yearpicker_item_focus_after_outline:none;--_ui5-v1-18-0_yearpicker_item_border_radius:0.25rem;--_ui5-v1-18-0_calendar_header_arrow_button_border:none;--_ui5-v1-18-0_calendar_header_arrow_button_border_radius:0.25rem;--_ui5-v1-18-0_calendar_header_middle_button_width:6.25rem;--_ui5-v1-18-0_calendar_header_middle_button_flex:1 1 auto;--_ui5-v1-18-0_calendar_header_middle_button_focus_border_radius:0.25rem;--_ui5-v1-18-0_calendar_header_middle_button_focus_border:none;--_ui5-v1-18-0_calendar_header_middle_button_focus_after_display:block;--_ui5-v1-18-0_calendar_header_button_background_color:none;--_ui5-v1-18-0_calendar_header_arrow_button_box_shadow:none;--_ui5-v1-18-0_calendar_header_middle_button_focus_background:transparent;--_ui5-v1-18-0_calendar_header_middle_button_focus_outline:none;--_ui5-v1-18-0_calendar_header_middle_button_focus_active_outline:none;--_ui5-v1-18-0_calendar_header_middle_button_focus_active_background:var(--sapButton_Active_Background);--_ui5-v1-18-0_calendar_header_middle_button_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_calendar_header_middle_button_focus_after_width:calc(100% - 0.375rem);--_ui5-v1-18-0_calendar_header_middle_button_focus_after_height:calc(100% - 0.375rem);--_ui5-v1-18-0_calendar_header_middle_button_focus_after_top_offset:0.125rem;--_ui5-v1-18-0_calendar_header_middle_button_focus_after_left_offset:0.125rem;--ui5-v1-18-0_table_bottom_border:1px solid var(--sapList_BorderColor);--ui5-v1-18-0_table_header_row_outline_width:1px;--ui5-v1-18-0_table_multiselect_column_width:2.75rem;--ui5-v1-18-0_table_header_row_font_family:var(--sapFontFamily);--ui5-v1-18-0_table_header_row_border_bottom_color:var(--sapList_BorderColor);--ui5-v1-18-0_table_header_row_border_width:1px;--_ui5-v1-18-0_table_load_more_border-bottom:none;--ui5-v1-18-0_table_header_row_font_weight:normal;--ui5-v1-18-0_table_row_outline_width:1px;--ui5-v1-18-0_table_group_row_font-weight:normal;--ui5-v1-18-0_table_border_width:0 0 1px 0;--_ui5-v1-18-0-toolbar-padding-left:0.5rem;--_ui5-v1-18-0-toolbar-padding-right:0.5rem;--_ui5-v1-18-0-toolbar-item-margin-left:0;--_ui5-v1-18-0-toolbar-item-margin-right:0.25rem;--_ui5-v1-18-0_load_more_padding:0;--_ui5-v1-18-0_load_more_border:1px top solid transparent;--_ui5-v1-18-0_load_more_border_radius:none;--_ui5-v1-18-0_load_more_outline_width:1px;--_ui5-v1-18-0_token_background:var(--sapButton_TokenBackground);--_ui5-v1-18-0_token_readonly_background:var(--sapButton_TokenBackground);--_ui5-v1-18-0_token_readonly_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_token_border_radius:var(--sapButton_BorderCornerRadius);--_ui5-v1-18-0_token_outline_offset:-0.125rem;--_ui5-v1-18-0_token_hover_border_color:var(--sapButton_Hover_BorderColor);--_ui5-v1-18-0_token_right_margin:0.3125rem;--_ui5-v1-18-0_token_padding:0.25rem 0;--_ui5-v1-18-0_token_left_padding:0.3125rem;--_ui5-v1-18-0_token_readonly_padding:0.25rem 0.375rem;--_ui5-v1-18-0_token_selected_focus_outline:var(--_ui5-v1-18-0_token_focus_outline_width) dotted var(--sapContent_ContrastFocusColor);--_ui5-v1-18-0_token_focus_outline:var(--_ui5-v1-18-0_token_focus_outline_width) dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_token_selected_hover_border_color:var(--sapButton_Selected_Hover_BorderColor);--_ui5-v1-18-0_token_focused_selected_border:1px solid var(--sapButton_Selected_BorderColor);--ui5-v1-18-0_token_focus_pseudo_element_content:none;--_ui5-v1-18-0_token_focus_offset:-0.25rem;--_ui5-v1-18-0_token_selected_text_font_family:\"72override\",var(--sapFontFamily);--_ui5-v1-18-0_token_selected_internal_border_bottom:none;--_ui5-v1-18-0_token_selected_internal_border_bottom_radius:0;--_ui5-v1-18-0_token_text_icon_top:0;--_ui5-v1-18-0_token_selected_focused_offset_bottom:var(--_ui5-v1-18-0_token_focus_offset);--_ui5-v1-18-0_token_focus_outline_width:0.0625rem;--_ui5-v1-18-0_token_text_color:var(--sapTextColor);--_ui5-v1-18-0_tokenizer_n_more_text_color:var(--sapField_TextColor);--_ui5-v1-18-0_tokenizer-popover_offset:.3125rem;--_ui5-v1-18-0-tree-item-minimal-background:var(--sapList_SelectionBackgroundColor);--_ui5-v1-18-0-tree-item-minimal-children-indicator-display:initial;--_ui5-v1-18-0_value_state_message_border:none;--_ui5-v1-18-0_value_state_header_border:none;--_ui5-v1-18-0_input_value_state_icon_display:none;--_ui5-v1-18-0_value_state_message_padding:0.5rem;--_ui5-v1-18-0_value_state_header_padding:.5625rem 1rem;--_ui5-v1-18-0_value_state_message_popover_box_shadow:none;--_ui5-v1-18-0_value_state_message_icon_width:.875rem;--_ui5-v1-18-0_value_state_message_icon_height:.875rem;--_ui5-v1-18-0_input_value_state_icon_offset:.5rem;--_ui5-v1-18-0_value_state_header_offset:-0.125rem;--_ui5-v1-18-0_value_state_message_popover_border_radius:0;--_ui5-v1-18-0-multi_combobox_token_margin_top:1px;--_ui5-v1-18-0_slider_progress_container_background:var(--sapField_BorderColor);--_ui5-v1-18-0_slider_progress_container_dot_display:none;--_ui5-v1-18-0_slider_progress_container_dot_background:var(--sapField_BorderColor);--_ui5-v1-18-0_slider_progress_border:none;--_ui5-v1-18-0_slider_padding:1.406rem 1.0625rem;--_ui5-v1-18-0_slider_inner_height:0.25rem;--_ui5-v1-18-0_slider_outer_height:1.6875rem;--_ui5-v1-18-0_slider_progress_border_radius:0.25rem;--_ui5-v1-18-0_slider_progress_background:var(--sapActiveColor);--_ui5-v1-18-0_slider_handle_icon_display:none;--_ui5-v1-18-0_range_slider_root_hover_handle_icon_display:none;--_ui5-v1-18-0_slider_handle_border:solid 0.125rem var(--sapField_BorderColor);--_ui5-v1-18-0_slider_handle_border_radius:1rem;--_ui5-v1-18-0_slider_tickmark_bg:var(--sapField_BorderColor);--_ui5-v1-18-0_slider_handle_margin_left:calc((var(--_ui5-v1-18-0_slider_handle_width)/2)*-1);--_ui5-v1-18-0_slider_handle_hover_border:0.125rem solid var(--sapButton_Hover_BorderColor);--_ui5-v1-18-0_slider_handle_outline:0.0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_slider_handle_focus_border:var(--_ui5-v1-18-0_slider_handle_hover_border);--_ui5-v1-18-0_slider_handle_outline_offset:0.075rem;--_ui5-v1-18-0_slider_progress_outline:0.0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_slider_progress_outline_offset:-0.8125rem;--_ui5-v1-18-0_slider_disabled_opacity:0.4;--_ui5-v1-18-0_slider_tooltip_fontsize:var(--sapFontSmallSize);--_ui5-v1-18-0_slider_tooltip_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_slider_tooltip_background:var(--sapField_Background);--_ui5-v1-18-0_slider_tooltip_border_radius:var(--sapElement_BorderCornerRadius);--_ui5-v1-18-0_slider_tooltip_border_color:var(--sapField_BorderColor);--_ui5-v1-18-0_slider_tooltip_border:0.0625rem solid var(--_ui5-v1-18-0_slider_tooltip_border_color);--_ui5-v1-18-0_slider_tooltip_box_shadow:none;--_ui5-v1-18-0_slider_tooltip_padding:0.4125rem;--_ui5-v1-18-0_slider_tooltip_height:1rem;--_ui5-v1-18-0_slider_tooltip_min_width:2rem;--_ui5-v1-18-0_slider_tooltip_bottom:2rem;--_ui5-v1-18-0_slider_label_fontsize:var(--sapFontSmallSize);--_ui5-v1-18-0_slider_label_color:var(--sapContent_LabelColor);--_ui5-v1-18-0_range_slider_progress_focus_display:none;--_ui5-v1-18-0_range_slider_progress_focus_top:-1.063rem;--_ui5-v1-18-0_range_slider_progress_focus_left:-1.438rem;--_ui5-v1-18-0_range_slider_progress_focus_padding:0 1.375rem 0 1.438rem;--_ui5-v1-18-0_range_slider_progress_focus_height:2rem;--_ui5-v1-18-0_range_slider_legacy_progress_focus_display:block;--_ui5-v1-18-0_slider_handle_focus_width:0;--_ui5-v1-18-0_slider_start_end_point_size:.375rem;--_ui5-v1-18-0_slider_start_end_point_left:-0.875rem;--_ui5-v1-18-0_slider_start_end_point_top:-.1875rem;--_ui5-v1-18-0_slider_handle_background_focus:var(--sapButton_Active_Background);--_ui5-v1-18-0_slider_handle_focused_tooltip_distance:var(--_ui5-v1-18-0_slider_tooltip_bottom);--_ui5-v1-18-0_slider_tooltip_border_box:content-box;--_ui5-v1-18-0_range_slider_active_handle_icon_display:none;--_ui5-v1-18-0_range_slider_progress_focus_width:100%;--_ui5-v1-18-0_slider_tickmark_height:1rem;--_ui5-v1-18-0_slider_progress_box_sizing:content-box;--_ui5-v1-18-0_slider_tickmark_in_range_bg:var(--sapField_BorderColor);--_ui5-v1-18-0_range_slider_focus_outline_width:100%;--_ui5-v1-18-0_slider_progress_outline_offset_left:0;--_ui5-v1-18-0_range_slider_focus_outline_radius:0;--_ui5-v1-18-0_slider_progress_container_top:0;--_ui5-v1-18-0_slider_progress_height:100%;--_ui5-v1-18-0_slider_active_progress_border:none;--_ui5-v1-18-0_slider_active_progress_left:0;--_ui5-v1-18-0_slider_active_progress_top:0;--_ui5-v1-18-0_slider_no_tickmarks_progress_container_top:var(--_ui5-v1-18-0_slider_progress_container_top);--_ui5-v1-18-0_slider_no_tickmarks_progress_height:var(--_ui5-v1-18-0_slider_progress_height);--_ui5-v1-18-0_slider_no_tickmarks_active_progress_border:var(--_ui5-v1-18-0_slider_active_progress_border);--_ui5-v1-18-0_slider_no_tickmarks_active_progress_left:var(--_ui5-v1-18-0_slider_active_progress_left);--_ui5-v1-18-0_slider_no_tickmarks_active_progress_top:var(--_ui5-v1-18-0_slider_active_progress_top);--_ui5-v1-18-0_slider_handle_focus_visibility:none;--_ui5-v1-18-0_slider_handle_icon_size:1rem;--_ui5-v1-18-0_slider_inner_min_width:4rem;--_ui5-v1-18-0_range_slider_handle_background_focus:transparent;--_ui5-v1-18-0_slider_handle_top:-.875rem;--_ui5-v1-18-0_range_slider_handle_background:transparent;--_ui5-v1-18-0_range_slider_handle_active_background:transparent;--_ui5-v1-18-0_slider_handle_background:var(--sapButton_Background);--_ui5-v1-18-0_slider_handle_hover_background:var(--sapButton_Hover_Background);--_ui5-v1-18-0_range_slider_root_hover_handle_bg:transparent;--_ui5-v1-18-0_range_slider_root_active_handle_icon_display:none;--_ui5-v1-18-0_slider_handle_width:1.875rem;--_ui5-v1-18-0_slider_handle_height:1.875rem;--_ui5-v1-18-0_slider_handle_box_sizing:border-box;--_ui5-v1-18-0_slider_tickmark_top:-.34375rem;--_ui5-v1-18-0_step_input_input_error_background_color:var(--sapField_InvalidBackground);--_ui5-v1-18-0-step_input_button_state_hover_background_color:var(--sapField_Background);--_ui5-v1-18-0_step_input_border_style:1px solid var(--sapField_BorderColor);--_ui5-v1-18-0_step_input_border_style_hover:1px solid var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_step_input_button_background_color:var(--sapField_Background);--_ui5-v1-18-0_step_input_input_border:1px solid transparent;--_ui5-v1-18-0_step_input_input_margin_top:-0.0625rem;--_ui5-v1-18-0_step_input_button_display:inline-block;--_ui5-v1-18-0_step_input_button_left:0;--_ui5-v1-18-0_step_input_button_right:0;--_ui5-v1-18-0_step_input_input_border_focused_after:var(--_ui5-v1-18-0_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5-v1-18-0_step_input_input_border_top_bottom_focused_after:0.0625rem;--_ui5-v1-18-0_step_input_input_border_radius_focused_after:0;--_ui5-v1-18-0_step_input_input_information_border_color_focused_after:var(--sapField_BorderColor);--_ui5-v1-18-0_step_input_input_warning_border_color_focused_after:var(--sapField_BorderColor);--_ui5-v1-18-0_step_input_input_success_border_color_focused_after:var(--sapField_BorderColor);--_ui5-v1-18-0_step_input_input_error_border_color_focused_after:var(--sapField_BorderColor);--_ui5-v1-18-0_step_input_disabled_button_background:var(--sapField_ReadOnly_Background);--_ui5-v1-18-0_step_input_border_color_hover:var(--sapField_Hover_Background);--_ui5-v1-18-0_step_input_border_hover:1px solid var(--sapField_Hover_BorderColor);--_ui5-v1-18-0_input_input_background_color:var(--sapField_InvalidBackground);--_ui5-v1-18-0_step_input_min_width:7.25rem;--_ui5-v1-18-0_step_input_padding:2.5rem;--_ui5-v1-18-0_calendar_height:24.5rem;--_ui5-v1-18-0_calendar_width:20rem;--_ui5-v1-18-0_calendar_padding:1rem;--_ui5-v1-18-0_calendar_left_right_padding:0.5rem;--_ui5-v1-18-0_calendar_top_bottom_padding:1rem;--_ui5-v1-18-0_calendar_header_height:3rem;--_ui5-v1-18-0_calendar_header_arrow_button_width:2.5rem;--_ui5-v1-18-0_calendar_header_padding:0.25rem 0;--_ui5-v1-18-0_checkbox_root_side_padding:.6875rem;--_ui5-v1-18-0_checkbox_icon_size:1rem;--_ui5-v1-18-0_checkbox_partially_icon_size:.75rem;--_ui5-v1-18-0_custom_list_item_rb_min_width:2.75rem;--_ui5-v1-18-0_day_picker_item_width:2.25rem;--_ui5-v1-18-0_day_picker_item_height:2.875rem;--_ui5-v1-18-0_day_picker_empty_height:3rem;--_ui5-v1-18-0_day_picker_item_justify_content:space-between;--_ui5-v1-18-0_dp_two_calendar_item_now_text_padding_top:0.387rem;--_ui5-v1-18-0_dp_two_calendar_item_primary_text_height:1.8125rem;--_ui5-v1-18-0_dp_two_calendar_item_secondary_text_height:1rem;--_ui5-v1-18-0_dp_two_calendar_item_text_padding_top:0.575rem;--_ui5-v1-18-0_color-palette-item-height:1.75rem;--_ui5-v1-18-0_color-palette-item-hover-height:2.375rem;--_ui5-v1-18-0_color-palette-item-margin:calc((var(--_ui5-v1-18-0_color-palette-item-hover-height) - var(--_ui5-v1-18-0_color-palette-item-height))/2);--_ui5-v1-18-0_color-palette-row-width:12rem;--_ui5-v1-18-0_color-palette-swatch-container-padding:0.3125rem 0.6875rem;--_ui5-v1-18-0_datetime_picker_width:40.0625rem;--_ui5-v1-18-0_datetime_picker_height:25rem;--_ui5-v1-18-0_datetime_timeview_width:17rem;--_ui5-v1-18-0_datetime_timeview_phonemode_width:19.5rem;--_ui5-v1-18-0_datetime_timeview_padding:1rem;--_ui5-v1-18-0_dialog_content_min_height:2.75rem;--_ui5-v1-18-0_dialog_footer_height:2.75rem;--_ui5-v1-18-0_input_inner_padding:0 0.625rem;--_ui5-v1-18-0_input_inner_padding_with_icon:0 0.25rem 0 0.625rem;--_ui5-v1-18-0_input_inner_space_to_tokenizer:0.125rem;--_ui5-v1-18-0_input_inner_space_to_n_more_text:0.1875rem;--_ui5-v1-18-0_list_no_data_height:3rem;--_ui5-v1-18-0_list_item_cb_margin_right:0;--_ui5-v1-18-0_list_item_title_size:var(--sapFontLargeSize);--_ui5-v1-18-0_list_no_data_font_size:var(--sapFontLargeSize);--_ui5-v1-18-0_list_item_img_size:3rem;--_ui5-v1-18-0_list_item_img_top_margin:0.5rem;--_ui5-v1-18-0_list_item_img_bottom_margin:0.5rem;--_ui5-v1-18-0_list_item_img_hn_margin:0.75rem;--_ui5-v1-18-0_list_item_dropdown_base_height:2.5rem;--_ui5-v1-18-0_list_item_base_height:var(--sapElement_LineHeight);--_ui5-v1-18-0_list_item_icon_size:1.125rem;--_ui5-v1-18-0_list_item_icon_padding-inline-end:0.5rem;--_ui5-v1-18-0_list_item_selection_btn_margin_top:calc(var(--_ui5-v1-18-0_checkbox_wrapper_padding)*-1);--_ui5-v1-18-0_list_item_content_vertical_offset:calc((var(--_ui5-v1-18-0_list_item_base_height) - var(--_ui5-v1-18-0_list_item_title_size))/2);--_ui5-v1-18-0_group_header_list_item_height:2.75rem;--_ui5-v1-18-0_list_busy_row_height:3rem;--_ui5-v1-18-0_month_picker_item_height:3rem;--_ui5-v1-18-0_list_buttons_left_space:0.125rem;--_ui5-v1-18-0_popup_default_header_height:2.75rem;--_ui5-v1-18-0-notification-overflow-popover-padding:0.25rem 0.5rem;--_ui5-v1-18-0_year_picker_item_height:3rem;--_ui5-v1-18-0_tokenizer_padding:0.25rem;--_ui5-v1-18-0_token_height:1.625rem;--_ui5-v1-18-0_token_icon_size:.75rem;--_ui5-v1-18-0_token_icon_padding:0.25rem 0.5rem;--_ui5-v1-18-0_token_wrapper_right_padding:0.3125rem;--_ui5-v1-18-0_token_wrapper_left_padding:0;--_ui5-v1-18-0_tl_bubble_padding:1rem;--_ui5-v1-18-0_tl_indicator_before_bottom:-1.625rem;--_ui5-v1-18-0_tl_padding:1rem 1rem 1rem .5rem;--_ui5-v1-18-0_tl_li_margin_bottom:1.625rem;--_ui5-v1-18-0_switch_focus_width_size_horizon_exp:calc(100% + 4px);--_ui5-v1-18-0_switch_focus_height_size_horizon_exp:calc(100% + 4px);--_ui5-v1-18-0_tc_item_text:3rem;--_ui5-v1-18-0_tc_item_height:4.75rem;--_ui5-v1-18-0_tc_item_text_only_height:2.75rem;--_ui5-v1-18-0_tc_item_text_only_with_additional_text_height:3.75rem;--_ui5-v1-18-0_tc_item_text_line_height:1.325rem;--_ui5-v1-18-0_tc_item_icon_circle_size:2.75rem;--_ui5-v1-18-0_tc_item_icon_size:1.25rem;--_ui5-v1-18-0_tc_item_add_text_margin_top:0.375rem;--_ui5-v1-18-0_textarea_margin:.25rem 0;--_ui5-v1-18-0_panel_header_height:2.75rem;--_ui5-v1-18-0_radio_button_height:2.75rem;--_ui5-v1-18-0_radio_button_label_side_padding:.875rem;--_ui5-v1-18-0_radio_button_inner_size:2.75rem;--_ui5-v1-18-0_radio_button_svg_size:1.375rem;--_ui5-v1-18-0-responsive_popover_header_height:2.75rem;--ui5-v1-18-0_side_navigation_item_height:2.75rem;--_ui5-v1-18-0_load_more_text_height:2.75rem;--_ui5-v1-18-0_load_more_text_font_size:var(--sapFontMediumSize);--_ui5-v1-18-0_load_more_desc_padding:0.375rem 2rem 0.875rem 2rem;--ui5-v1-18-0_table_header_row_height:2.75rem;--ui5-v1-18-0_table_row_height:2.75rem;--ui5-v1-18-0_table_focus_outline_offset:-0.125rem;--ui5-v1-18-0_table_group_row_height:2rem;--_ui5-v1-18-0-tree-indent-step:1.5rem;--_ui5-v1-18-0-tree-toggle-box-width:2.75rem;--_ui5-v1-18-0-tree-toggle-box-height:2.25rem;--_ui5-v1-18-0-tree-toggle-icon-size:1.0625rem;--_ui5-v1-18-0_timeline_tli_indicator_before_bottom:-1.625rem;--_ui5-v1-18-0_timeline_tli_indicator_before_right:-1.625rem;--_ui5-v1-18-0_timeline_tli_indicator_before_without_icon_bottom:-1.875rem;--_ui5-v1-18-0_timeline_tli_indicator_before_without_icon_right:-1.9375rem;--_ui5-v1-18-0_split_button_middle_separator_top:0;--_ui5-v1-18-0_split_button_middle_separator_height:2.25rem;--_ui5-v1-18-0-toolbar-separator-height:2rem;--_ui5-v1-18-0-toolbar-height:2.75rem;--_ui5-v1-18-0_toolbar_overflow_padding:0.25rem 0.5rem}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5-v1-18-0_input_min_width:2rem;--_ui5-v1-18-0_input_icon_width:2rem;--_ui5-v1-18-0_input_error_warning_icon_padding:.1875rem .375rem .1875rem .4375rem;--_ui5-v1-18-0_input_error_warning_focused_icon_padding:.1875rem .375rem .1875rem .4375rem;--_ui5-v1-18-0_input_information_icon_padding:.1875rem .375rem .1875rem .4375rem;--_ui5-v1-18-0_input_information_focused_icon_padding:.1875rem .375rem .1875rem .4375rem;--_ui5-v1-18-0_input_custom_icon_padding:.25rem .5rem;--_ui5-v1-18-0_input_error_warning_custom_icon_padding:.1875rem .5rem;--_ui5-v1-18-0_input_error_warning_custom_focused_icon_padding:.1875rem .5rem;--_ui5-v1-18-0_input_information_custom_icon_padding:.1875rem .5rem;--_ui5-v1-18-0_input_information_custom_focused_icon_padding:.1875rem .5rem;--_ui5-v1-18-0_input_icon_padding:.25rem .4375rem;--_ui5-v1-18-0_panel_header_button_wrapper_padding:.5625rem .375rem;--_ui5-v1-18-0_radio_button_min_width:2rem;--_ui5-v1-18-0_radio_button_focus_dist:0.375rem;--_ui5-v1-18-0_radio_button_outer_ring_padding_with_label:0 0.5rem;--_ui5-v1-18-0_rating_indicator_item_height:0.67em;--_ui5-v1-18-0_rating_indicator_item_width:0.67em;--_ui5-v1-18-0_rating_indicator_readonly_item_height:0.67em;--_ui5-v1-18-0_rating_indicator_readonly_item_width:0.67em;--_ui5-v1-18-0_rating_indicator_component_spacing:0.8125rem 0px;--_ui5-v1-18-0_switch_height:2rem;--_ui5-v1-18-0_switch_width:2.5rem;--_ui5-v1-18-0_switch_with_label_width:100%;--_ui5-v1-18-0_switch_root_outline_top:0;--_ui5-v1-18-0_switch_root_outline_bottom:0;--_ui5-v1-18-0_switch_transform:translateX(100%) translateX(-1.5rem);--_ui5-v1-18-0_switch_transform_with_label:translateX(100%) translateX(-1.5rem);--_ui5-v1-18-0_switch_rtl_transform:translateX(1.5rem) translateX(-100%);--_ui5-v1-18-0_switch_rtl_transform_with_label:translateX(1.5rem) translateX(-100%);--_ui5-v1-18-0_switch_track_with_label_width:100%;--_ui5-v1-18-0_switch_track_with_label_height:1.375rem;--_ui5-v1-18-0_switch_track_width:100%;--_ui5-v1-18-0_switch_track_height:1.375rem;--_ui5-v1-18-0_switch_handle_width:1.625rem;--_ui5-v1-18-0_switch_handle_height:1.625rem;--_ui5-v1-18-0_switch_handle_with_label_width:1.625rem;--_ui5-v1-18-0_switch_handle_with_label_height:1.625rem;--_ui5-v1-18-0_switch_text_font_size:var(--sapFontSmallSize);--_ui5-v1-18-0_switch_text_width:none;--_ui5-v1-18-0_switch_text_active_left:calc(-100% + 1.625rem);--_ui5-v1-18-0_textarea_padding_right_and_left:0.4375rem;--_ui5-v1-18-0_textarea_padding_right_and_left_error_warning:0.375rem;--_ui5-v1-18-0_textarea_padding_right_and_left_information:0.375rem;--_ui5-v1-18-0_textarea_padding_right_and_left_readonly:0.4375rem;--_ui5-v1-18-0_textarea_padding_top:0.125rem;--_ui5-v1-18-0_textarea_padding_bottom:0.125rem;--_ui5-v1-18-0_textarea_padding_top_readonly:0.125rem;--_ui5-v1-18-0_textarea_padding_bottom_readonly:0.125rem;--_ui5-v1-18-0_textarea_padding_top_error_warning:0.0625rem;--_ui5-v1-18-0_textarea_padding_bottom_error_warning:0.0625rem;--_ui5-v1-18-0_textarea_padding_top_information:0.0625rem;--_ui5-v1-18-0_textarea_padding_bottom_information:0.0625rem;--_ui5-v1-18-0_textarea_exceeded_text_height:0.375rem;--_ui5-v1-18-0_textarea_min_height:1.625rem;--_ui5-v1-18-0_tokenizer-popover_offset:.1875rem;--_ui5-v1-18-0_slider_handle_icon_size:.875rem;--_ui5-v1-18-0_slider_padding:1rem 1.0625rem;--_ui5-v1-18-0_button_base_height:var(--sapElement_Compact_Height);--_ui5-v1-18-0_button_base_padding:0.4375rem;--_ui5-v1-18-0_button_base_min_width:2rem;--_ui5-v1-18-0_button_icon_font_size:1rem;--_ui5-v1-18-0_calendar_height:18rem;--_ui5-v1-18-0_calendar_width:17.75rem;--_ui5-v1-18-0_calendar_left_right_padding:0.25rem;--_ui5-v1-18-0_calendar_top_bottom_padding:0.5rem;--_ui5-v1-18-0_calendar_header_height:2rem;--_ui5-v1-18-0_calendar_header_arrow_button_width:2rem;--_ui5-v1-18-0_calendar_header_padding:0;--_ui5-v1-18-0_checkbox_root_side_padding:var(--_ui5-v1-18-0_checkbox_wrapped_focus_padding);--_ui5-v1-18-0_checkbox_wrapped_content_margin_top:var(--_ui5-v1-18-0_checkbox_compact_wrapped_label_margin_top);--_ui5-v1-18-0_checkbox_wrapped_focus_left_top_bottom_position:var(--_ui5-v1-18-0_checkbox_compact_focus_position);--_ui5-v1-18-0_checkbox_width_height:var(--_ui5-v1-18-0_checkbox_compact_width_height);--_ui5-v1-18-0_checkbox_wrapper_padding:var(--_ui5-v1-18-0_checkbox_compact_wrapper_padding);--_ui5-v1-18-0_checkbox_focus_position:var(--_ui5-v1-18-0_checkbox_compact_focus_position);--_ui5-v1-18-0_checkbox_inner_width_height:var(--_ui5-v1-18-0_checkbox_compact_inner_size);--_ui5-v1-18-0_checkbox_icon_size:.75rem;--_ui5-v1-18-0_checkbox_partially_icon_size:.5rem;--_ui5-v1-18-0_color-palette-item-height:1.25rem;--_ui5-v1-18-0_color-palette-item-focus-height:1rem;--_ui5-v1-18-0_color-palette-item-container-sides-padding:0.1875rem;--_ui5-v1-18-0_color-palette-item-container-rows-padding:0.8125rem;--_ui5-v1-18-0_color-palette-item-hover-height:1.625rem;--_ui5-v1-18-0_color-palette-item-margin:calc((var(--_ui5-v1-18-0_color-palette-item-hover-height) - var(--_ui5-v1-18-0_color-palette-item-height))/2);--_ui5-v1-18-0_color-palette-row-width:8.125rem;--_ui5-v1-18-0_color-palette-swatch-container-padding:0.1875rem 0.8125rem;--_ui5-v1-18-0_color-palette-item-hover-margin:0;--_ui5-v1-18-0_color-palette-row-height:7.5rem;--_ui5-v1-18-0_color-palette-button-height:2rem;--_ui5-v1-18-0_color_picker_slider_container_margin_top:-4px;--_ui5-v1-18-0_custom_list_item_rb_min_width:2rem;--_ui5-v1-18-0_daypicker_weeknumbers_container_padding_top:2rem;--_ui5-v1-18-0_day_picker_item_width:2rem;--_ui5-v1-18-0_day_picker_item_height:2rem;--_ui5-v1-18-0_day_picker_empty_height:2.125rem;--_ui5-v1-18-0_day_picker_item_justify_content:flex-end;--_ui5-v1-18-0_dp_two_calendar_item_now_text_padding_top:0rem;--_ui5-v1-18-0_dp_two_calendar_item_primary_text_height:1rem;--_ui5-v1-18-0_dp_two_calendar_item_secondary_text_height:0.75rem;--_ui5-v1-18-0_dp_two_calendar_item_text_padding_top:0;--_ui5-v1-18-0_datetime_picker_height:17rem;--_ui5-v1-18-0_datetime_picker_width:34.0625rem;--_ui5-v1-18-0_datetime_timeview_width:17rem;--_ui5-v1-18-0_datetime_timeview_phonemode_width:18.5rem;--_ui5-v1-18-0_datetime_timeview_padding:0.5rem;--_ui5-v1-18-0_dialog_content_min_height:2.5rem;--_ui5-v1-18-0_dialog_footer_height:2.5rem;--_ui5-v1-18-0_input_height:var(--sapElement_Compact_Height);--_ui5-v1-18-0_input_inner_padding:0 0.5rem;--_ui5-v1-18-0_input_inner_padding_with_icon:0 0.2rem 0 0.5rem;--_ui5-v1-18-0_input_inner_space_to_tokenizer:0.125rem;--_ui5-v1-18-0_input_inner_space_to_n_more_text:0.125rem;--_ui5-v1-18-0_input_icon_min_width:var(--_ui5-v1-18-0_input_compact_min_width);--_ui5-v1-18-0_menu_item_padding:0 0.75rem 0 0.5rem;--_ui5-v1-18-0_menu_item_submenu_icon_right:0.75rem;--_ui5-v1-18-0-notification-overflow-popover-padding:0.25rem 0.5rem;--_ui5-v1-18-0_popup_default_header_height:2.5rem;--_ui5-v1-18-0_textarea_margin:.1875rem 0;--_ui5-v1-18-0_list_no_data_height:2rem;--_ui5-v1-18-0_list_item_cb_margin_right:.5rem;--_ui5-v1-18-0_list_item_title_size:var(--sapFontSize);--_ui5-v1-18-0_list_item_img_top_margin:0.55rem;--_ui5-v1-18-0_list_no_data_font_size:var(--sapFontSize);--_ui5-v1-18-0_list_item_dropdown_base_height:2rem;--_ui5-v1-18-0_list_item_base_height:2rem;--_ui5-v1-18-0_list_item_icon_size:1rem;--_ui5-v1-18-0_list_item_selection_btn_margin_top:calc(var(--_ui5-v1-18-0_checkbox_wrapper_padding)*-1);--_ui5-v1-18-0_list_item_content_vertical_offset:calc((var(--_ui5-v1-18-0_list_item_base_height) - var(--_ui5-v1-18-0_list_item_title_size))/2);--_ui5-v1-18-0_list_busy_row_height:2rem;--_ui5-v1-18-0_list_buttons_left_space:0.125rem;--_ui5-v1-18-0_month_picker_item_height:2rem;--_ui5-v1-18-0_year_picker_item_height:2rem;--_ui5-v1-18-0_panel_header_height:2.5rem;--_ui5-v1-18-0_token_height:1.25rem;--_ui5-v1-18-0_token_right_margin:0.25rem;--_ui5-v1-18-0_token_left_padding:0.25rem;--_ui5-v1-18-0_token_readonly_padding:0.125rem 0.25rem;--_ui5-v1-18-0_token_focus_offset:-0.125rem;--_ui5-v1-18-0_token_icon_size:.75rem;--_ui5-v1-18-0_token_icon_padding:0.125rem 0.25rem;--_ui5-v1-18-0_token_wrapper_right_padding:0.25rem;--_ui5-v1-18-0_token_wrapper_left_padding:0;--_ui5-v1-18-0_token_outline_offset:-0.125rem;--_ui5-v1-18-0_tl_bubble_padding:.5rem;--_ui5-v1-18-0_tl_indicator_before_bottom:-.5rem;--_ui5-v1-18-0_tl_padding:.5rem;--_ui5-v1-18-0_tl_li_margin_bottom:.5rem;--_ui5-v1-18-0_wheelslider_item_width:64px;--_ui5-v1-18-0_wheelslider_item_height:32px;--_ui5-v1-18-0_wheelslider_height:224px;--_ui5-v1-18-0_wheelslider_selection_frame_margin_top:calc(var(--_ui5-v1-18-0_wheelslider_item_height)*2);--_ui5-v1-18-0_wheelslider_arrows_visibility:visible;--_ui5-v1-18-0_wheelslider_mobile_selection_frame_margin_top:128px;--_ui5-v1-18-0_tc_item_text:2rem;--_ui5-v1-18-0_tc_item_text_line_height:1.325rem;--_ui5-v1-18-0_tc_item_add_text_margin_top:0.3125rem;--_ui5-v1-18-0_tc_item_height:4rem;--_ui5-v1-18-0_tc_header_height:var(--_ui5-v1-18-0_tc_item_height);--_ui5-v1-18-0_tc_item_icon_circle_size:2rem;--_ui5-v1-18-0_tc_item_icon_size:1rem;--_ui5-v1-18-0_radio_button_height:2rem;--_ui5-v1-18-0_radio_button_label_side_padding:.5rem;--_ui5-v1-18-0_radio_button_inner_size:2rem;--_ui5-v1-18-0_radio_button_svg_size:1rem;--_ui5-v1-18-0-responsive_popover_header_height:2.5rem;--ui5-v1-18-0_side_navigation_item_height:2rem;--_ui5-v1-18-0_slider_handle_height:1.25rem;--_ui5-v1-18-0_slider_handle_width:1.25rem;--_ui5-v1-18-0_slider_handle_top:-.5rem;--_ui5-v1-18-0_slider_tooltip_height:1rem;--_ui5-v1-18-0_slider_tooltip_padding:0.25rem;--_ui5-v1-18-0_slider_progress_outline_offset:-0.625rem;--_ui5-v1-18-0_slider_outer_height:1.3125rem;--_ui5-v1-18-0_split_button_middle_separator_top:0;--_ui5-v1-18-0_split_button_middle_separator_height:1.625rem;--_ui5-v1-18-0_step_input_min_width:6rem;--_ui5-v1-18-0_step_input_padding:2rem;--_ui5-v1-18-0_load_more_text_height:2.625rem;--_ui5-v1-18-0_load_more_text_font_size:var(--sapFontSize);--_ui5-v1-18-0_load_more_desc_padding:0 2rem 0.875rem 2rem;--ui5-v1-18-0_table_header_row_height:2rem;--ui5-v1-18-0_table_row_height:2rem;--_ui5-v1-18-0-tree-indent-step:0.5rem;--_ui5-v1-18-0-tree-toggle-box-width:2rem;--_ui5-v1-18-0-tree-toggle-box-height:1.5rem;--_ui5-v1-18-0-tree-toggle-icon-size:0.8125rem;--_ui5-v1-18-0_timeline_tli_indicator_before_bottom:-0.5rem;--_ui5-v1-18-0_timeline_tli_indicator_before_right:-0.5rem;--_ui5-v1-18-0_timeline_tli_indicator_before_without_icon_bottom:-0.75rem;--_ui5-v1-18-0_timeline_tli_indicator_before_without_icon_right:-0.8125rem;--_ui5-v1-18-0_vsd_header_container:2.5rem;--_ui5-v1-18-0_vsd_sub_header_container_height:2rem;--_ui5-v1-18-0_vsd_header_height:4rem;--_ui5-v1-18-0_vsd_expand_content_height:25.4375rem;--_ui5-v1-18-0-toolbar-separator-height:1.5rem;--_ui5-v1-18-0-toolbar-height:2rem;--_ui5-v1-18-0_toolbar_overflow_padding:0.1875rem 0.375rem}:root,[dir=ltr]{--_ui5-v1-18-0_rotation_90deg:rotate(90deg);--_ui5-v1-18-0_rotation_minus_90deg:rotate(-90deg);--_ui5-v1-18-0_icon_transform_scale:none;--_ui5-v1-18-0_panel_toggle_btn_rotation:var(--_ui5-v1-18-0_rotation_90deg);--_ui5-v1-18-0_li_notification_group_toggle_btn_rotation:var(--_ui5-v1-18-0_rotation_90deg);--_ui5-v1-18-0_timeline_scroll_container_offset:0.5rem;--_ui5-v1-18-0_popover_upward_arrow_margin:0.1875rem 0 0 0.1875rem;--_ui5-v1-18-0_popover_right_arrow_margin:0.1875rem 0 0 -0.375rem;--_ui5-v1-18-0_popover_downward_arrow_margin:-0.375rem 0 0 0.125rem;--_ui5-v1-18-0_popover_left_arrow_margin:0.125rem 0 0 0.25rem;--_ui5-v1-18-0_dialog_resize_cursor:se-resize;--_ui5-v1-18-0_progress_indicator_bar_border_radius:0.5rem 0 0 0.5rem;--_ui5-v1-18-0_progress_indicator_remaining_bar_border_radius:0 0.5rem 0.5rem 0;--_ui5-v1-18-0_menu_submenu_margin_offset:-0.25rem 0;--_ui5-v1-18-0_menu_submenu_placement_type_left_margin_offset:0.25rem 0;--_ui5-v1-18-0-menu_item_icon_float:right;--_ui5-v1-18-0-shellbar-notification-btn-count-offset:-0.125rem}[dir=rtl]{--_ui5-v1-18-0_icon_transform_scale:scale(-1,1);--_ui5-v1-18-0_panel_toggle_btn_rotation:var(--_ui5-v1-18-0_rotation_minus_90deg);--_ui5-v1-18-0_li_notification_group_toggle_btn_rotation:var(--_ui5-v1-18-0_rotation_minus_90deg);--_ui5-v1-18-0_timeline_scroll_container_offset:-0.5rem;--_ui5-v1-18-0_popover_upward_arrow_margin:.1875rem .125rem 0 0;--_ui5-v1-18-0_popover_right_arrow_margin:.1875rem .25rem 0 0;--_ui5-v1-18-0_popover_downward_arrow_margin:-0.4375rem .125rem 0 0;--_ui5-v1-18-0_popover_left_arrow_margin:.1875rem -.375rem 0 0;--_ui5-v1-18-0_dialog_resize_cursor:sw-resize;--_ui5-v1-18-0_progress_indicator_bar_border_radius:0 0.5rem 0.5rem 0;--_ui5-v1-18-0_progress_indicator_remaining_bar_border_radius:0.5rem 0 0 0.5rem;--_ui5-v1-18-0_menu_submenu_margin_offset:0 -0.25rem;--_ui5-v1-18-0_menu_submenu_placement_type_left_margin_offset:0 0.25rem;--_ui5-v1-18-0-menu_item_icon_float:left;--_ui5-v1-18-0_segmented_btn_item_border_left:0.0625rem;--_ui5-v1-18-0_segmented_btn_item_border_right:0px;--_ui5-v1-18-0-shellbar-notification-btn-count-offset:auto;--_ui5-v1-18-0_split_text_button_hover_border_left:none;--_ui5-v1-18-0_split_text_button_emphasized_hover_border_left:none;--_ui5-v1-18-0_split_text_button_positive_hover_border_left:none;--_ui5-v1-18-0_split_text_button_negative_hover_border_left:none;--_ui5-v1-18-0_split_text_button_attention_hover_border_left:none;--_ui5-v1-18-0_split_text_button_transparent_hover_border_left:none;--_ui5-v1-18-0_split_text_button_hover_border_right:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-18-0_split_text_button_emphasized_hover_border_right:var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-18-0_split_text_button_positive_hover_border_right:var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-18-0_split_text_button_negative_hover_border_right:var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-18-0_split_text_button_attention_hover_border_right:var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-18-0_split_text_button_transparent_hover_border_right:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor)}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$l = { packageName: "@ui5/webcomponents", fileName: "themes/Icon.css", content: ":host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([hidden]){display:none}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{fill:currentColor;color:var(--sapContent_NonInteractiveIconColor);display:inline-block;height:1rem;outline:none;width:1rem}:host([design=Contrast]){color:var(--sapContent_ContrastIconColor)}:host([design=Critical]){color:var(--sapCriticalElementColor)}:host([design=Default]){color:var(--sapContent_IconColor)}:host([design=Information]){color:var(--sapInformativeElementColor)}:host([design=Negative]){color:var(--sapNegativeElementColor)}:host([design=Neutral]){color:var(--sapNeutralElementColor)}:host([design=NonInteractive]){color:var(--sapContent_NonInteractiveIconColor)}:host([design=Positive]){color:var(--sapPositiveElementColor)}:host([interactive][focused]) .ui5-icon-root{border-radius:var(--ui5-v1-18-0-icon-focus-border-radius);outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor)}.ui5-icon-root{display:flex;height:100%;outline:none;vertical-align:top;width:100%}:host([interactive]){cursor:pointer}.ui5-icon-root:not([dir=ltr]){transform:var(--_ui5-v1-18-0_icon_transform_scale);transform-origin:center}" };

var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const PRESENTATION_ROLE = "presentation";
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component represents an SVG icon.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element, <br>
 * or as an interactive element that can be focused and clicked.
 *
 * <h3>Usage</h3>
 *
 * 1. <b>Get familiar with the icons collections.</b>
 * <br>
 * Before displaying an icon, you need to explore the icons collections to find and import the desired icon.
 * <br>
 * Currently there are 3 icons collection, available as 3 npm packages:
 * <br>
 *
 * <ul>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons">@ui5/webcomponents-icons</ui5-link> represents the "SAP-icons" collection and includes the following
 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons">icons</ui5-link>.
 * </li>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt">@ui5/webcomponents-icons-tnt</ui5-link> represents the "tnt" collection and includes the following
 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT">icons</ui5-link>.
 * </li>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite">@ui5/webcomponents-icons-icons-business-suite</ui5-link> represents the "business-suite" collection and includes the following
 * <ui5-link target="_blank" href="https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols">icons</ui5-link>.
 * </li>
 * </ul>
 *
 * 2. <b>After exploring the icons collections, add one or more of the packages as dependencies to your project.</b>
 * <br>
 * <code>npm i @ui5/webcomponents-icons</code><br>
 * <code>npm i @ui5/webcomponents-icons-tnt</code><br>
 * <code>npm i @ui5/webcomponents-icons-business-suite</code>
 * <br><br>
 *
 * 3. <b>Then, import the desired icon</b>.
 * <br>
 * <code>import "@ui5/{package_name}/dist/{icon_name}.js";</code>
 * <br><br>
 *
 * <b>For Example</b>:
 * <br>
 *
 * For the standard "SAP-icons" icon collection, import an icon from the <code>@ui5/webcomponents-icons</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons/dist/employee.js";</code>
 * <br><br>
 *
 * For the "tnt" (SAP Fiori Tools) icon collection, import an icon from the <code>@ui5/webcomponents-icons-tnt</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons-tnt/dist/antenna.js";</code>
 * <br><br>
 *
 * For the "business-suite" (SAP Business Suite) icon collection, import an icon from the <code>@ui5/webcomponents-icons-business-suite</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons-business-suite/dist/ab-testing.js";</code>
 * <br><br>
 *
 * 4. <b>Display the icon using the <code>ui5-icon</code> web component.</b><br>
 * Set the icon collection ("SAP-icons", "tnt" or "business-suite" - "SAP-icons" is the default icon collection and can be skipped)<br>
 * and the icon name to the <code>name</code> property.
 * <br><br>
 *
 * <code>&lt;ui5-icon name="employee">&lt;/ui5-icon></code><br>
 * <code>&lt;ui5-icon name="tnt/antenna">&lt;/ui5-icon></code><br>
 * <code>&lt;ui5-icon name="business-suite/ab-testing">&lt;/ui5-icon></code>
 *
 * <br><br>
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-icon</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the outermost wrapper of the <code>ui5-icon</code></li>
 * </ul>
 *
 * <br><br>
 * <h3>Keyboard Handling</h3>
 *
 * <ul>
 * <li>[SPACE, ENTER, RETURN] - Fires the <code>click</code> event if the <code>interactive</code> property is set to true.</li>
 * <li>[SHIFT] - If [SPACE] or [ENTER],[RETURN] is pressed, pressing [SHIFT] releases the ui5-icon without triggering the click event.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Icon
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-icon
 * @implements sap.ui.webc.main.IIcon
 * @public
 */
let Icon = class Icon extends UI5Element {
    _onFocusInHandler() {
        if (this.interactive) {
            this.focused = true;
        }
    }
    _onFocusOutHandler() {
        this.focused = false;
    }
    _onkeydown(e) {
        if (!this.interactive) {
            return;
        }
        if (isEnter(e)) {
            this.fireEvent("click");
        }
        if (isSpace(e)) {
            e.preventDefault(); // prevent scrolling
        }
    }
    _onkeyup(e) {
        if (this.interactive && isSpace(e)) {
            this.fireEvent("click");
        }
    }
    /**
    * Enforce "ltr" direction, based on the icons collection metadata.
    */
    get _dir() {
        return this.ltr ? "ltr" : undefined;
    }
    get effectiveAriaHidden() {
        if (this.ariaHidden === "") {
            if (this.isDecorative) {
                return true;
            }
            return;
        }
        return this.ariaHidden;
    }
    get _tabIndex() {
        return this.interactive ? "0" : undefined;
    }
    get isDecorative() {
        return this.effectiveAccessibleRole === PRESENTATION_ROLE;
    }
    get effectiveAccessibleRole() {
        if (this.accessibleRole) {
            return this.accessibleRole;
        }
        if (this.interactive) {
            return "button";
        }
        return this.effectiveAccessibleName ? "img" : PRESENTATION_ROLE;
    }
    async onBeforeRendering() {
        const name = this.name;
        if (!name) {
            /* eslint-disable-next-line */
            return console.warn("Icon name property is required", this);
        }
        let iconData = getIconDataSync(name);
        if (!iconData) {
            iconData = await getIconData(name);
        }
        if (!iconData) {
            this.invalid = true;
            /* eslint-disable-next-line */
            return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
        }
        if (iconData === ICON_NOT_FOUND) {
            this.invalid = true;
            /* eslint-disable-next-line */
            return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
        }
        this.viewBox = iconData.viewBox || "0 0 512 512";
        if (iconData.customTemplate) {
            iconData.pathData = [];
            this.customSvg = executeTemplate(iconData.customTemplate, this);
        }
        // in case a new valid name is set, show the icon
        this.invalid = false;
        this.pathData = Array.isArray(iconData.pathData) ? iconData.pathData : [iconData.pathData];
        this.accData = iconData.accData;
        this.ltr = iconData.ltr;
        this.packageName = iconData.packageName;
        this._onfocusout = this.interactive ? this._onFocusOutHandler.bind(this) : undefined;
        this._onfocusin = this.interactive ? this._onFocusInHandler.bind(this) : undefined;
        if (this.accessibleName) {
            this.effectiveAccessibleName = this.accessibleName;
        }
        else if (this.accData) {
            const i18nBundle = await getI18nBundle(this.packageName);
            this.effectiveAccessibleName = i18nBundle.getText(this.accData) || undefined;
        }
        else {
            this.effectiveAccessibleName = undefined;
        }
    }
    get hasIconTooltip() {
        return this.showTooltip && this.effectiveAccessibleName;
    }
};
__decorate$f([
    property({ type: IconDesign$1, defaultValue: IconDesign$1.Default })
], Icon.prototype, "design", void 0);
__decorate$f([
    property({ type: Boolean })
], Icon.prototype, "interactive", void 0);
__decorate$f([
    property()
], Icon.prototype, "name", void 0);
__decorate$f([
    property()
], Icon.prototype, "accessibleName", void 0);
__decorate$f([
    property({ type: Boolean })
], Icon.prototype, "showTooltip", void 0);
__decorate$f([
    property()
], Icon.prototype, "accessibleRole", void 0);
__decorate$f([
    property()
], Icon.prototype, "ariaHidden", void 0);
__decorate$f([
    property({ multiple: true })
], Icon.prototype, "pathData", void 0);
__decorate$f([
    property({ type: Object, defaultValue: undefined, noAttribute: true })
], Icon.prototype, "accData", void 0);
__decorate$f([
    property({ type: Boolean })
], Icon.prototype, "focused", void 0);
__decorate$f([
    property({ type: Boolean })
], Icon.prototype, "invalid", void 0);
__decorate$f([
    property({ noAttribute: true, defaultValue: undefined })
], Icon.prototype, "effectiveAccessibleName", void 0);
Icon = __decorate$f([
    customElement({
        tag: "ui5-icon",
        languageAware: true,
        themeAware: true,
        renderer: litRender,
        template: block0$g,
        styles: styleData$l,
    })
    /**
     * Fired on mouseup, <code>SPACE</code> and <code>ENTER</code>.
     * - on mouse click, the icon fires native <code>click</code> event
     * - on <code>SPACE</code> and <code>ENTER</code>, the icon fires custom <code>click</code> event
     * @private
     * @since 1.0.0-rc.8
     */
    ,
    event("click")
], Icon);
Icon.define();
var Icon$1 = Icon;

const markedEvents = new WeakMap();
/**
 * Marks the given event with random marker.
 */
const markEvent = (event, value) => {
    markedEvents.set(event, value);
};

const willShowContent = (childNodes) => {
    return Array.from(childNodes).filter(node => {
        return node.nodeType !== Node.COMMENT_NODE && (node.nodeType !== Node.TEXT_NODE || (node.nodeValue || "").trim().length !== 0);
    }).length > 0;
};

/**
 * Different Button designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonDesign
 */
var ButtonDesign;
(function (ButtonDesign) {
    /**
     * default type (no special styling)
     * @public
     * @type {Default}
     */
    ButtonDesign["Default"] = "Default";
    /**
     * accept type (green button)
     * @public
     * @type {Positive}
     */
    ButtonDesign["Positive"] = "Positive";
    /**
     * reject style (red button)
     * @public
     * @type {Negative}
     */
    ButtonDesign["Negative"] = "Negative";
    /**
     * transparent type
     * @public
     * @type {Transparent}
     */
    ButtonDesign["Transparent"] = "Transparent";
    /**
     * emphasized type
     * @public
     * @type {Emphasized}
     */
    ButtonDesign["Emphasized"] = "Emphasized";
    /**
     * attention type
     * @public
     * @type {Attention}
     */
    ButtonDesign["Attention"] = "Attention";
})(ButtonDesign || (ButtonDesign = {}));
var ButtonDesign$1 = ButtonDesign;

/**
 * Determines if the button has special form-related functionality.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonType
 */
var ButtonType;
(function (ButtonType) {
    /**
     * The button does not do anything special when inside a form
     * @public
     * @type {Button}
     */
    ButtonType["Button"] = "Button";
    /**
     * The button acts as a submit button (submits a form)
     * @public
     * @type {Submit}
     */
    ButtonType["Submit"] = "Submit";
    /**
     * The button acts as a reset button (resets a form)
     * @public
     * @type {Reset}
     */
    ButtonType["Reset"] = "Reset";
})(ButtonType || (ButtonType = {}));
var ButtonType$1 = ButtonType;

/* eslint no-unused-vars: 0 */
function block0$f(context, tags, suffix) { return effectiveHtml `<button type="button" class="ui5-button-root" ?disabled="${this.disabled}" data-sap-focus-ref  @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} @mousedown=${this._onmousedown} @mouseup=${this._onmouseup} @keydown=${this._onkeydown} @keyup=${this._onkeyup} @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" tabindex=${l$1(this.tabIndexValue)} aria-expanded="${l$1(this.accessibilityAttributes.expanded)}" aria-controls="${l$1(this.accessibilityAttributes.controls)}" aria-haspopup="${l$1(this.accessibilityAttributes.hasPopup)}" aria-label="${l$1(this.ariaLabelText)}" title="${l$1(this.buttonTitle)}" part="button">${this.icon ? block1$c.call(this, context, tags, suffix) : undefined}<span id="${l$1(this._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${this.hasButtonType ? block2$c.call(this, context, tags, suffix) : undefined}</button> `; }
function block1$c(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} class="ui5-button-icon" name="${l$1(this.icon)}" accessible-role="${l$1(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon class="ui5-button-icon" name="${l$1(this.icon)}" accessible-role="${l$1(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></ui5-icon>`; }
function block2$c(context, tags, suffix) { return effectiveHtml `<span class="ui5-hidden-text">${l$1(this.buttonTypeText)}</span>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$k = { packageName: "@ui5/webcomponents", fileName: "themes/Button.css", content: ":host{vertical-align:middle}.ui5-hidden-text{clip:rect(1px,1px,1px,1px);font-size:0;left:-1000px;pointer-events:none;position:absolute;top:-1000px;user-select:none}:host(:not([hidden])){display:inline-block}:host{background-color:var(--sapButton_Background);border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);border-radius:var(--_ui5-v1-18-0_button_border_radius);box-sizing:border-box;color:var(--sapButton_TextColor);cursor:pointer;font-family:var(--_ui5-v1-18-0_button_fontFamily);font-size:var(--sapFontSize);height:var(--_ui5-v1-18-0_button_base_height);line-height:normal;min-width:var(--_ui5-v1-18-0_button_base_min_width);overflow:hidden;text-overflow:ellipsis;text-shadow:var(--_ui5-v1-18-0_button_text_shadow);white-space:nowrap}.ui5-button-root{align-items:center;background:transparent;border:none;box-sizing:border-box;color:inherit;cursor:inherit;display:flex;font:inherit;height:100%;justify-content:center;letter-spacing:inherit;line-height:inherit;min-width:inherit;outline:none;overflow:inherit;padding:0 var(--_ui5-v1-18-0_button_base_padding);position:relative;text-overflow:inherit;text-shadow:inherit;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:inherit;width:100%;word-spacing:inherit}:host(:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host(:not([hidden]):not([disabled]).ui5_hovered){background:var(--sapButton_Hover_Background);border:1px solid var(--sapButton_Hover_BorderColor);color:var(--sapButton_Hover_TextColor)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-inline-start:var(--_ui5-v1-18-0_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;overflow:inherit;position:relative;text-overflow:inherit;white-space:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-inline-start:var(--_ui5-v1-18-0_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-inline-start:0}:host([disabled]){cursor:default;opacity:var(--sapContent_DisabledOpacity);pointer-events:unset}:host([has-icon]:not([icon-only])) .ui5-button-text{min-width:calc(var(--_ui5-v1-18-0_button_base_min_width) - var(--_ui5-v1-18-0_button_base_icon_margin) - 1rem)}:host([disabled]:active){pointer-events:none}:host([focused]) .ui5-button-root:after{border:var(--_ui5-v1-18-0_button_focused_border);border-radius:var(--_ui5-v1-18-0_button_focused_border_radius);bottom:.0625rem;box-sizing:border-box;content:\"\";left:.0625rem;position:absolute;right:.0625rem;top:.0625rem}:host([design=Emphasized][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-18-0_button_emphasized_focused_border_color)}:host([design=Emphasized][focused]) .ui5-button-root:before{border:var(--_ui5-v1-18-0_button_emphasized_focused_border_before);border-radius:var(--_ui5-v1-18-0_button_focused_border_radius);bottom:.0625rem;box-sizing:border-box;content:\"\";left:.0625rem;position:absolute;right:.0625rem;top:.0625rem}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;overflow:inherit;text-overflow:inherit;white-space:inherit}:host([ui5-button][active]:not([disabled]):not([non-interactive])){background-color:var(--sapButton_Active_Background);background-image:none;border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([design=Positive]){background-color:var(--sapButton_Accept_Background);border-color:var(--sapButton_Accept_BorderColor);color:var(--sapButton_Accept_TextColor)}:host([design=Positive]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered),:host([design=Positive]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--sapButton_Accept_Hover_BorderColor);color:var(--sapButton_Accept_Hover_TextColor)}:host([ui5-button][design=Positive][active]:not([non-interactive])){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--sapButton_Accept_Active_TextColor)}:host([design=Negative]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor)}:host([design=Negative]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered),:host([design=Negative]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor);color:var(--sapButton_Reject_Hover_TextColor)}:host([ui5-button][design=Negative][active]:not([non-interactive])){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--sapButton_Reject_Active_TextColor)}:host([design=Attention]){background-color:var(--sapButton_Attention_Background);border-color:var(--sapButton_Attention_BorderColor);color:var(--sapButton_Attention_TextColor)}:host([design=Attention]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered),:host([design=Attention]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover){background-color:var(--sapButton_Attention_Hover_Background);border-color:var(--sapButton_Attention_Hover_BorderColor);color:var(--sapButton_Attention_Hover_TextColor)}:host([ui5-button][design=Attention][active]:not([non-interactive])){background-color:var(--sapButton_Attention_Active_Background);border-color:var(--sapButton_Attention_Active_BorderColor);color:var(--sapButton_Attention_Active_TextColor)}:host([design=Emphasized]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);border-width:var(--_ui5-v1-18-0_button_emphasized_border_width);color:var(--sapButton_Emphasized_TextColor);font-weight:var(--sapButton_Emphasized_FontWeight)}:host([design=Emphasized]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered),:host([design=Emphasized]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor);border-width:var(--_ui5-v1-18-0_button_emphasized_border_width);color:var(--sapButton_Emphasized_Hover_TextColor)}:host([ui5-button][design=Empasized][active]:not([non-interactive])){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Emphasized_Active_TextColor)}:host([design=Emphasized][focused]) .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor);outline:none}:host([design=Transparent]){background-color:var(--sapButton_Lite_Background);border-color:var(--sapButton_Lite_BorderColor);color:var(--sapButton_Lite_TextColor)}:host([design=Transparent]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered),:host([design=Transparent]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover){background-color:var(--sapButton_Lite_Hover_Background);border-color:var(--sapButton_Lite_Hover_BorderColor);color:var(--sapButton_Lite_Hover_TextColor)}:host([ui5-button][design=Transparent][active]:not([non-interactive])){background-color:var(--sapButton_Lite_Active_Background);border-color:var(--sapButton_Lite_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([pressed][focused]) .ui5-button-root:after,:host([ui5-segmented-button-item][active][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-18-0_button_pressed_focused_border_color);outline:none}:host([ui5-segmented-button-item][focused]:not(:last-child)) .ui5-button-root:after{border-bottom-right-radius:var(--_ui5-v1-18-0_button_focused_inner_border_radius);border-top-right-radius:var(--_ui5-v1-18-0_button_focused_inner_border_radius)}:host([ui5-segmented-button-item][focused]:not(:first-child)) .ui5-button-root:after{border-bottom-left-radius:var(--_ui5-v1-18-0_button_focused_inner_border_radius);border-top-left-radius:var(--_ui5-v1-18-0_button_focused_inner_border_radius)}" };

var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Button_1;
let isGlobalHandlerAttached = false;
let activeButton = null;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-button</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>button - Used to style the native button element</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Button
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-button
 * @implements sap.ui.webc.main.IButton
 * @public
 */
let Button = Button_1 = class Button extends UI5Element {
    constructor() {
        super();
        this._deactivate = () => {
            if (activeButton) {
                activeButton.active = false;
            }
        };
        if (!isGlobalHandlerAttached) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached = true;
        }
        const handleTouchStartEvent = (e) => {
            markEvent(e, "button");
            if (this.nonInteractive) {
                return;
            }
            this.active = true;
        };
        this._ontouchstart = {
            handleEvent: handleTouchStartEvent,
            passive: true,
        };
    }
    onEnterDOM() {
        this._isTouch = (isPhone() || isTablet()) && !isCombi();
    }
    async onBeforeRendering() {
        const formSupport = getFeature("FormSupport");
        if (this.type !== ButtonType$1.Button && !formSupport) {
            console.warn(`In order for the "type" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        if (this.submits && !formSupport) {
            console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        this.iconOnly = this.isIconOnly;
        this.hasIcon = !!this.icon;
        this.buttonTitle = this.tooltip || await getIconAccessibleName(this.icon);
    }
    _onclick(e) {
        if (this.nonInteractive) {
            return;
        }
        markEvent(e, "button");
        const formSupport = getFeature("FormSupport");
        if (formSupport && this._isSubmit) {
            formSupport.triggerFormSubmit(this);
        }
        if (formSupport && this._isReset) {
            formSupport.triggerFormReset(this);
        }
        if (isSafari()) {
            this.getDomRef()?.focus();
        }
    }
    _onmousedown(e) {
        if (this.nonInteractive || this._isTouch) {
            return;
        }
        markEvent(e, "button");
        this.active = true;
        activeButton = this; // eslint-disable-line
    }
    _ontouchend(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.active = false;
        if (activeButton) {
            activeButton.active = false;
        }
    }
    _onmouseup(e) {
        markEvent(e, "button");
    }
    _onkeydown(e) {
        markEvent(e, "button");
        if (isSpace(e) || isEnter(e)) {
            this.active = true;
        }
    }
    _onkeyup(e) {
        if (isSpace(e) || isEnter(e)) {
            this.active = false;
        }
    }
    _onfocusout() {
        if (this.nonInteractive) {
            return;
        }
        this.active = false;
        if (isDesktop()) {
            this.focused = false;
        }
    }
    _onfocusin(e) {
        if (this.nonInteractive) {
            return;
        }
        markEvent(e, "button");
        if (isDesktop()) {
            this.focused = true;
        }
    }
    get hasButtonType() {
        return this.design !== ButtonDesign$1.Default && this.design !== ButtonDesign$1.Transparent;
    }
    get iconRole() {
        if (!this.icon) {
            return "";
        }
        return "presentation";
    }
    get isIconOnly() {
        return !willShowContent(this.text);
    }
    static typeTextMappings() {
        return {
            "Positive": BUTTON_ARIA_TYPE_ACCEPT,
            "Negative": BUTTON_ARIA_TYPE_REJECT,
            "Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
        };
    }
    get buttonTypeText() {
        return Button_1.i18nBundle.getText(Button_1.typeTextMappings()[this.design]);
    }
    get tabIndexValue() {
        const tabindex = this.getAttribute("tabindex");
        if (tabindex) {
            return tabindex;
        }
        return this.nonInteractive ? "-1" : this._tabIndex;
    }
    get showIconTooltip() {
        return this.iconOnly && !this.tooltip;
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get _isSubmit() {
        return this.type === ButtonType$1.Submit || this.submits;
    }
    get _isReset() {
        return this.type === ButtonType$1.Reset;
    }
    static async onDefine() {
        Button_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate$e([
    property({ type: ButtonDesign$1, defaultValue: ButtonDesign$1.Default })
], Button.prototype, "design", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "disabled", void 0);
__decorate$e([
    property()
], Button.prototype, "icon", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "iconEnd", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "submits", void 0);
__decorate$e([
    property()
], Button.prototype, "tooltip", void 0);
__decorate$e([
    property({ defaultValue: undefined })
], Button.prototype, "accessibleName", void 0);
__decorate$e([
    property({ defaultValue: "" })
], Button.prototype, "accessibleNameRef", void 0);
__decorate$e([
    property({ type: Object })
], Button.prototype, "accessibilityAttributes", void 0);
__decorate$e([
    property({ type: ButtonType$1, defaultValue: ButtonType$1.Button })
], Button.prototype, "type", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "active", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "iconOnly", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "focused", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "hasIcon", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "nonInteractive", void 0);
__decorate$e([
    property({ noAttribute: true })
], Button.prototype, "buttonTitle", void 0);
__decorate$e([
    property({ type: Object })
], Button.prototype, "_iconSettings", void 0);
__decorate$e([
    property({ defaultValue: "0", noAttribute: true })
], Button.prototype, "_tabIndex", void 0);
__decorate$e([
    property({ type: Boolean })
], Button.prototype, "_isTouch", void 0);
__decorate$e([
    slot({ type: Node, "default": true })
], Button.prototype, "text", void 0);
Button = Button_1 = __decorate$e([
    customElement({
        tag: "ui5-button",
        languageAware: true,
        renderer: litRender,
        template: block0$f,
        styles: styleData$k,
        dependencies: [Icon$1],
    })
    /**
     * Fired when the component is activated either with a
     * mouse/tap or by using the Enter or Space key.
     * <br><br>
     * <b>Note:</b> The event will not be fired if the <code>disabled</code>
     * property is set to <code>true</code>.
     *
     * @event sap.ui.webc.main.Button#click
     * @public
     * @native
     */
    ,
    event("click")
], Button);
Button.define();
var Button$1 = Button;

const getActiveElement = () => {
    let element = document.activeElement;
    while (element && element.shadowRoot && element.shadowRoot.activeElement) {
        element = element.shadowRoot.activeElement;
    }
    return element;
};

const popupUtilsData = getSharedResource("PopupUtilsData", { currentZIndex: 100 });
const getFocusedElement = () => {
    const element = getActiveElement();
    return (element && typeof element.focus === "function") ? element : null;
};
const isFocusedElementWithinNode = (node) => {
    const fe = getFocusedElement();
    if (fe) {
        return isNodeContainedWithin(node, fe);
    }
    return false;
};
const isNodeContainedWithin = (parent, child) => {
    let currentNode = parent;
    if (currentNode.shadowRoot) {
        const children = Array.from(currentNode.shadowRoot.children);
        currentNode = children.find(n => n.localName !== "style");
        if (!currentNode) {
            return false;
        }
    }
    if (currentNode === child) {
        return true;
    }
    const childNodes = currentNode.localName === "slot" ? currentNode.assignedNodes() : currentNode.children;
    if (childNodes) {
        return Array.from(childNodes).some(n => isNodeContainedWithin(n, child));
    }
    return false;
};
const isPointInRect = (x, y, rect) => {
    return x >= rect.left && x <= rect.right
        && y >= rect.top && y <= rect.bottom;
};
const isClickInRect = (e, rect) => {
    let x;
    let y;
    if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
    }
    else {
        const touch = e.touches[0];
        x = touch.clientX;
        y = touch.clientY;
    }
    return isPointInRect(x, y, rect);
};
function instanceOfPopup(object) {
    return "isUI5Element" in object && "_show" in object;
}
const getClosedPopupParent = (el) => {
    const parent = el.parentElement || (el.getRootNode && el.getRootNode().host);
    if (parent && ((instanceOfPopup(parent) || parent === document.documentElement))) {
        return parent;
    }
    return getClosedPopupParent(parent);
};
const getNextZIndex = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    if (openUI5Support && openUI5Support.isOpenUI5Detected()) { // use OpenUI5 for getting z-index values, if loaded
        return openUI5Support.getNextZIndex();
    }
    popupUtilsData.currentZIndex += 2;
    return popupUtilsData.currentZIndex;
};

/* eslint no-unused-vars: 0 */
function block0$e(context, tags, suffix) { return effectiveHtml `${this._isPhone ? block1$b.call(this, context, tags, suffix) : block7$3.call(this, context, tags, suffix)}`; }
function block1$b(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-dialog", tags, suffix)} accessible-name=${l$1(this.accessibleName)} accessible-name-ref=${l$1(this.accessibleNameRef)} accessible-role=${l$1(this.accessibleRole)} stretch _disable-initial-focus @ui5-before-open="${l$1(this._beforeDialogOpen)}" @ui5-after-open="${l$1(this._propagateDialogEvent)}" @ui5-before-close="${l$1(this._propagateDialogEvent)}" @ui5-after-close="${l$1(this._afterDialogClose)}" exportparts="content, header, footer">${!this._hideHeader ? block2$b.call(this, context, tags, suffix) : undefined}<slot></slot><slot slot="footer" name="footer"></slot></${scopeTag("ui5-dialog", tags, suffix)}>` : effectiveHtml `<ui5-dialog accessible-name=${l$1(this.accessibleName)} accessible-name-ref=${l$1(this.accessibleNameRef)} accessible-role=${l$1(this.accessibleRole)} stretch _disable-initial-focus @ui5-before-open="${l$1(this._beforeDialogOpen)}" @ui5-after-open="${l$1(this._propagateDialogEvent)}" @ui5-before-close="${l$1(this._propagateDialogEvent)}" @ui5-after-close="${l$1(this._afterDialogClose)}" exportparts="content, header, footer">${!this._hideHeader ? block2$b.call(this, context, tags, suffix) : undefined}<slot></slot><slot slot="footer" name="footer"></slot></ui5-dialog>`; }
function block2$b(context, tags, suffix) { return effectiveHtml `${this.header.length ? block3$9.call(this, context, tags, suffix) : block4$6.call(this, context, tags, suffix)}`; }
function block3$9(context, tags, suffix) { return effectiveHtml `<slot slot="header" name="header"></slot>`; }
function block4$6(context, tags, suffix) { return effectiveHtml `<div class="${o$2(this.classes.header)}" slot="header">${this.headerText ? block5$6.call(this, context, tags, suffix) : undefined}${!this._hideCloseButton ? block6$4.call(this, context, tags, suffix) : undefined}</div>`; }
function block5$6(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-title", tags, suffix)} level="H2" class="ui5-popup-header-text ui5-responsive-popover-header-text">${l$1(this.headerText)}</${scopeTag("ui5-title", tags, suffix)}>` : effectiveHtml `<ui5-title level="H2" class="ui5-popup-header-text ui5-responsive-popover-header-text">${l$1(this.headerText)}</ui5-title>`; }
function block6$4(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-button", tags, suffix)} icon="decline" design="Transparent" aria-label="${l$1(this._closeDialogAriaLabel)}" @click="${this.close}"></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `<ui5-button icon="decline" design="Transparent" aria-label="${l$1(this._closeDialogAriaLabel)}" @click="${this.close}"></ui5-button>`; }
function block7$3(context, tags, suffix) { return effectiveHtml `<section style="${styleMap(this.styles.root)}" class="${o$2(this.classes.root)}" role="${l$1(this._role)}" aria-modal="${l$1(this._ariaModal)}" aria-label="${l$1(this._ariaLabel)}" aria-labelledby="${l$1(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(this.styles.arrow)}"></span>${this._displayHeader ? block8$3.call(this, context, tags, suffix) : undefined}<div style="${styleMap(this.styles.content)}" class="${o$2(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this._displayFooter ? block11$2.call(this, context, tags, suffix) : undefined}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section>`; }
function block8$3(context, tags, suffix) { return effectiveHtml `<header class="ui5-popup-header-root" id="ui5-popup-header" part="header">${this.header.length ? block9$3.call(this, context, tags, suffix) : block10$2.call(this, context, tags, suffix)}</header>`; }
function block9$3(context, tags, suffix) { return effectiveHtml `<slot name="header"></slot>`; }
function block10$2(context, tags, suffix) { return effectiveHtml `<h1 class="ui5-popup-header-text">${l$1(this.headerText)}</h1>`; }
function block11$2(context, tags, suffix) { return effectiveHtml `${this.footer.length ? block12$1.call(this, context, tags, suffix) : undefined}`; }
function block12$1(context, tags, suffix) { return effectiveHtml `<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`; }

/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.types.DataType
 * @public
 */
class DataType {
    /**
     * Checks if the value is valid for its data type.
     * @public
     * @abstract
     * @returns {Boolean}
     */
    // eslint-disable-next-line
    static isValid(value) {
        return false;
    }
    static attributeToProperty(attributeValue) {
        return attributeValue;
    }
    static propertyToAttribute(propertyValue) {
        return propertyValue === null ? null : String(propertyValue);
    }
    static valuesAreEqual(value1, value2) {
        return value1 === value2;
    }
    static generateTypeAccessors(types) {
        Object.keys(types).forEach(type => {
            Object.defineProperty(this, type, {
                get() {
                    return types[type];
                },
            });
        });
    }
    static get isDataTypeClass() {
        return true;
    }
}

/**
 * @class
 * Integer data type.
 *
 * @constructor
 * @extends sap.ui.webc.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webc.base.types.Integer
 * @public
 */
class Integer extends DataType {
    static isValid(value) {
        return Number.isInteger(value);
    }
    static attributeToProperty(attributeValue) {
        return parseInt(attributeValue);
    }
}

/**
 * @class
 * DOM Element reference or ID.
 * <b>Note:</b> If an ID is passed, it is expected to be part of the same <code>document</code> element as the consuming component.
 *
 * @constructor
 * @extends sap.ui.webc.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webc.base.types.DOMReference
 * @public
 */
class DOMReference extends DataType {
    static isValid(value) {
        return (typeof value === "string" || value instanceof HTMLElement);
    }
    static propertyToAttribute(propertyValue) {
        if (propertyValue instanceof HTMLElement) {
            return null;
        }
        return propertyValue;
    }
}

/**
 * Returns a value clamped between an upper bound 'max' and lower bound 'min'.
 * @param {number} val value
 * @param {number} min lower bound
 * @param {number} max upper bound
 * @returns {number}
 */
const clamp = (val, min, max) => {
    return Math.min(Math.max(val, min), max);
};

const isElementHidden = (el) => {
    if (el.nodeName === "SLOT") {
        return false;
    }
    return (el.offsetWidth <= 0 && el.offsetHeight <= 0) || (el.style && el.style.visibility === "hidden");
};

const rClickable = /^(?:a|area)$/i;
const rFocusable = /^(?:input|select|textarea|button)$/i;
const isElementClickable = (el) => {
    if (el.disabled) {
        return false;
    }
    const tabIndex = el.getAttribute("tabindex");
    if (tabIndex !== null && tabIndex !== undefined) {
        return parseInt(tabIndex) >= 0;
    }
    return rFocusable.test(el.nodeName)
        || (rClickable.test(el.nodeName)
            && !!el.href);
};

const isFocusTrap = (el) => {
    return el.hasAttribute("data-ui5-focus-trap");
};
const getFirstFocusableElement = async (container, startFromContainer) => {
    if (!container || isElementHidden(container)) {
        return null;
    }
    return findFocusableElement(container, true, startFromContainer);
};
const getLastFocusableElement = async (container, startFromContainer) => {
    if (!container || isElementHidden(container)) {
        return null;
    }
    return findFocusableElement(container, false, startFromContainer);
};
const isElemFocusable = (el) => {
    return el.hasAttribute("data-ui5-focus-redirect") || !isElementHidden(el);
};
const findFocusableElement = async (container, forward, startFromContainer) => {
    let child;
    let assignedElements;
    let currentIndex = -1;
    if (container.shadowRoot) {
        child = forward ? container.shadowRoot.firstChild : container.shadowRoot.lastChild;
    }
    else if (container instanceof HTMLSlotElement && container.assignedNodes()) {
        assignedElements = container.assignedNodes();
        currentIndex = forward ? 0 : assignedElements.length - 1;
        child = assignedElements[currentIndex];
    }
    else if (startFromContainer) {
        child = container;
    }
    else {
        child = forward ? container.firstElementChild : container.lastElementChild;
    }
    let focusableDescendant;
    /* eslint-disable no-await-in-loop */
    while (child) {
        const originalChild = child;
        if (instanceOfUI5Element(child)) {
            child = await child.getFocusDomRefAsync();
        }
        if (!child) {
            return null;
        }
        if (child.nodeType === 1 && isElemFocusable(child) && !isFocusTrap(child)) {
            if (isElementClickable(child)) {
                return (child && typeof child.focus === "function") ? child : null;
            }
            focusableDescendant = await findFocusableElement(child, forward);
            if (focusableDescendant) {
                return (focusableDescendant && typeof focusableDescendant.focus === "function") ? focusableDescendant : null;
            }
        }
        child = forward ? originalChild.nextSibling : originalChild.previousSibling;
        // If the child element is not part of the currently assigned element,
        // we have to check the next/previous element assigned to the slot or continue with the next/previous sibling of the slot,
        // otherwise, the nextSibling/previousSibling is the next element inside the light DOM
        if (assignedElements && !assignedElements[currentIndex].contains(child)) {
            currentIndex = forward ? currentIndex + 1 : currentIndex - 1;
            child = assignedElements[currentIndex];
        }
    }
    /* eslint-enable no-await-in-loop */
    return null;
};

const NO_SCROLLBAR_STYLE_CLASS = "ui5-content-native-scrollbars";
const getEffectiveScrollbarStyle = () => document.body.classList.contains(NO_SCROLLBAR_STYLE_CLASS);

let resizeObserver;
const observedElements = new Map();
const getResizeObserver = () => {
    if (!resizeObserver) {
        resizeObserver = new window.ResizeObserver(entries => {
            window.requestAnimationFrame(() => {
                entries.forEach(entry => {
                    const callbacks = observedElements.get(entry.target);
                    // Callbacks could be async and we need to handle returned promises to comply with the eslint "no-misused-promises" rule.
                    // Although Promise.all awaits all, we don't await the additional task after calling the callbacks and should not make any difference.
                    callbacks && Promise.all(callbacks.map((callback) => callback()));
                });
            });
        });
    }
    return resizeObserver;
};
const observe = (element, callback) => {
    const callbacks = observedElements.get(element) || [];
    // if no callbacks have been added for this element - start observing it
    if (!callbacks.length) {
        getResizeObserver().observe(element);
    }
    // save the callbacks in an array
    observedElements.set(element, [...callbacks, callback]);
};
const unobserve = (element, callback) => {
    const callbacks = observedElements.get(element) || [];
    if (callbacks.length === 0) {
        return;
    }
    const filteredCallbacks = callbacks.filter((fn) => fn !== callback);
    if (filteredCallbacks.length === 0) {
        getResizeObserver().unobserve(element);
        observedElements.delete(element);
    }
    else {
        observedElements.set(element, filteredCallbacks);
    }
};
/**
 * Allows to register/deregister resize observers for a DOM element
 *
 * @public
 * @class
  */
class ResizeHandler {
    /**
     * @static
     * @public
     * @param {*} element UI5 Web Component or DOM Element to be observed
     * @param {*} callback Callback to be executed
     */
    static register(element, callback) {
        let effectiveElement = element;
        if (instanceOfUI5Element(effectiveElement)) {
            effectiveElement = effectiveElement.getDomRef();
        }
        if (effectiveElement instanceof HTMLElement) {
            observe(effectiveElement, callback);
        }
        else {
            console.warn("Cannot register ResizeHandler for element", element); // eslint-disable-line
        }
    }
    /**
     * @static
     * @public
     * @param {*} element UI5 Web Component or DOM Element to be unobserved
     * @param {*} callback Callback to be removed
     */
    static deregister(element, callback) {
        let effectiveElement = element;
        if (instanceOfUI5Element(effectiveElement)) {
            effectiveElement = effectiveElement.getDomRef();
        }
        if (effectiveElement instanceof HTMLElement) {
            unobserve(effectiveElement, callback);
        }
        else {
            console.warn("Cannot deregister ResizeHandler for element", element); // eslint-disable-line
        }
    }
}

const mediaRanges = new Map();
const DEAFULT_RANGE_SET = new Map();
DEAFULT_RANGE_SET.set("S", [0, 599]);
DEAFULT_RANGE_SET.set("M", [600, 1023]);
DEAFULT_RANGE_SET.set("L", [1024, 1439]);
DEAFULT_RANGE_SET.set("XL", [1440, Infinity]);
/**
 * Enumeration containing the names and settings of predefined screen width media query range sets.
 *
 * @namespace
 * @name MediaRange.RANGESETS
 * @public
 */
var RANGESETS;
(function (RANGESETS) {
    /**
     * A 4-step range set (S-M-L-XL).
     *
     * The ranges of this set are:
     * <ul>
     * <li><code>"S"</code>: For screens smaller than 600 pixels.</li>
     * <li><code>"M"</code>: For screens greater than or equal to 600 pixels and smaller than 1024 pixels.</li>
     * <li><code>"L"</code>: For screens greater than or equal to 1024 pixels and smaller than 1440 pixels.</li>
     * <li><code>"XL"</code>: For screens greater than or equal to 1440 pixels.</li>
     * </ul>
     *
     * @name MediaRange.RANGESETS.RANGE_4STEPS
     * @public
     */
    RANGESETS["RANGE_4STEPS"] = "4Step";
})(RANGESETS || (RANGESETS = {}));
/**
 * Initializes a screen width media query range set.
 *
 * This initialization step makes the range set ready to be used for one of the other functions in namespace <code>MediaRange</code>.
 *
 * A range set can be defined as shown in the following example:
 * <pre>
 * MediaRange.initRangeSet("MyRangeSet", [200, 400], ["Small", "Medium", "Large"]);
 * </pre>
 * This example defines the following named ranges:
 * <ul>
 * <li><code>"Small"</code>: For screens smaller than 200 pixels.</li>
 * <li><code>"Medium"</code>: For screens greater than or equal to 200 pixels and smaller than 400 pixels.</li>
 * <li><code>"Large"</code>: For screens greater than or equal to 400 pixels.</li>
 * </ul>
 *
 * @param {string} name The name of the range set to be initialized.
 * The name must be a valid id and consist only of letters and numeric digits.
 * @param {Range} [range] The given range set.
 * @name MediaRange.initRangeSet
 */
const initRangeSet = (name, range) => {
    mediaRanges.set(name, range);
};
/**
 * Returns information about the current active range of the range set with the given name.
 *
 * If the optional parameter <code>width</code> is given, the active range will be determined for that width,
 * otherwise it is determined for the current window size.
 *
 * @param {string} name The name of the range set. The range set must be initialized beforehand ({@link MediaRange.initRangeSet})
 * @param {number} [width] An optional width, based on which the range should be determined;
 * If <code>width</code> is not provided, the window size will be used.
 * @returns {string} The name of the current active interval of the range set.
 *
 * @name MediaRange.getCurrentRange
 * @function
 * @public
 */
const getCurrentRange = (name, width = window.innerWidth) => {
    let rangeSet = mediaRanges.get(name);
    if (!rangeSet) {
        rangeSet = mediaRanges.get(RANGESETS.RANGE_4STEPS);
    }
    let currentRangeName;
    const effectiveWidth = Math.floor(width);
    rangeSet.forEach((value, key) => {
        if (effectiveWidth >= value[0] && effectiveWidth <= value[1]) {
            currentRangeName = key;
        }
    });
    return currentRangeName || [...rangeSet.keys()][0];
};
/**
 * API for screen width changes.
 *
 * @namespace
 * @name MediaRange
 */
const MediaRange = {
    RANGESETS,
    initRangeSet,
    getCurrentRange,
};
MediaRange.initRangeSet(MediaRange.RANGESETS.RANGE_4STEPS, DEAFULT_RANGE_SET);

/* eslint no-unused-vars: 0 */
function block0$d(context, tags, suffix) { return effectiveHtml `<section style="${styleMap(this.styles.root)}" class="${o$2(this.classes.root)}" role="${l$1(this._role)}" aria-modal="${l$1(this._ariaModal)}" aria-label="${l$1(this._ariaLabel)}" aria-labelledby="${l$1(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><div style="${styleMap(this.styles.content)}" class="${o$2(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `; }

/* eslint no-unused-vars: 0 */
function block0$c(context, tags, suffix) { return effectiveHtml `<div class="ui5-block-layer" ?hidden=${this._blockLayerHidden} tabindex="0" style="${styleMap(this.styles.blockLayer)}" @keydown="${this._preventBlockLayerFocus}" @mousedown="${this._preventBlockLayerFocus}"></div>`; }

/**
 * Popup accessible roles.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopupAccessibleRole
 */
var PopupAccessibleRole;
(function (PopupAccessibleRole) {
    /**
     * Represents no ARIA role.
     * @public
     * @type {None}
     */
    PopupAccessibleRole["None"] = "None";
    /**
     * Represents the ARIA role "dialog".
     * @public
     * @type {Dialog}
     */
    PopupAccessibleRole["Dialog"] = "Dialog";
    /**
     * Represents the ARIA role "alertdialog".
     * @public
     * @type {AlertDialog}
     */
    PopupAccessibleRole["AlertDialog"] = "AlertDialog";
})(PopupAccessibleRole || (PopupAccessibleRole = {}));
var PopupAccessibleRole$1 = PopupAccessibleRole;

let openedRegistry$1 = [];
const addOpenedPopup = (instance, parentPopovers = []) => {
    if (!openedRegistry$1.some(popup => popup.instance === instance)) {
        openedRegistry$1.push({
            instance,
            parentPopovers,
        });
    }
    _updateTopModalPopup();
    if (openedRegistry$1.length === 1) {
        attachGlobalListener();
    }
};
const removeOpenedPopup = (instance) => {
    openedRegistry$1 = openedRegistry$1.filter(el => {
        return el.instance !== instance;
    });
    _updateTopModalPopup();
    if (!openedRegistry$1.length) {
        detachGlobalListener();
    }
};
const getOpenedPopups = () => {
    return [...openedRegistry$1];
};
const _keydownListener = (event) => {
    if (!openedRegistry$1.length) {
        return;
    }
    if (isEscape(event)) {
        openedRegistry$1[openedRegistry$1.length - 1].instance.close(true);
    }
};
const attachGlobalListener = () => {
    document.addEventListener("keydown", _keydownListener);
};
const detachGlobalListener = () => {
    document.removeEventListener("keydown", _keydownListener);
};
const _updateTopModalPopup = () => {
    let popup;
    let hasModal = false;
    for (let i = openedRegistry$1.length - 1; i >= 0; i--) {
        popup = openedRegistry$1[i].instance;
        if (!hasModal && popup.isModal) {
            popup.isTopModalPopup = true;
            hasModal = true;
        }
        else {
            popup.isTopModalPopup = false;
        }
    }
};

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$j = { packageName: "@ui5/webcomponents", fileName: "themes/Popup.css", content: ":host{display:none;min-width:1px;position:fixed}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$i = { packageName: "@ui5/webcomponents", fileName: "themes/PopupStaticAreaStyles.css", content: ".ui5-block-layer{background-color:var(--sapBlockLayer_Background);bottom:-500px;display:none;left:-500px;opacity:.6;outline:none;pointer-events:all;position:fixed;right:-500px;top:-500px;z-index:-1}.ui5-block-layer:not([hidden]){display:inline-block}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$h = { packageName: "@ui5/webcomponents", fileName: "themes/PopupGlobal.css", content: ".ui5-popup-scroll-blocker{overflow:hidden}" };

var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popup_1;
const createBlockingStyle = () => {
    if (!hasStyle("data-ui5-popup-scroll-blocker")) {
        createStyle(styleData$h, "data-ui5-popup-scroll-blocker");
    }
};
createBlockingStyle();
const pageScrollingBlockers = new Set();
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * Base class for all popup Web Components.
 *
 * If you need to create your own popup-like custom UI5 Web Components, it is highly recommended that you extend
 * at least Popup in order to have consistency with other popups in terms of modal behavior and z-index management.
 *
 * 1. The Popup class handles modality:
 *  - The "isModal" getter can be overridden by derivatives to provide their own conditions when they are modal or not
 *  - Derivatives may call the "blockPageScrolling" and "unblockPageScrolling" static methods to temporarily remove scrollbars on the html element
 *  - Derivatives may call the "open" and "close" methods which handle focus, manage the popup registry and for modal popups, manage the blocking layer
 *
 *  2. Provides blocking layer (relevant for modal popups only):
 *   - It is in the static area
 *   - Controlled by the "open" and "close" methods
 *
 * 3. The Popup class "traps" focus:
 *  - Derivatives may call the "applyInitialFocus" method (usually when opening, to transfer focus inside the popup)
 *
 * 4. The Popup class automatically assigns "z-index"
 *  - Each time a popup is opened, it gets a higher than the previously opened popup z-index
 *
 * 5. The template of this component exposes two inline partials you can override in derivatives:
 *  - beforeContent (upper part of the box, useful for header/title/close button)
 *  - afterContent (lower part, useful for footer/action buttons)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Popup
 * @extends sap.ui.webc.base.UI5Element
 * @public
 */
let Popup = Popup_1 = class Popup extends UI5Element {
    constructor() {
        super();
        this._resizeHandler = this._resize.bind(this);
    }
    onBeforeRendering() {
        this._blockLayerHidden = !this.isOpen() || !this.isTopModalPopup;
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._resizeHandler);
    }
    onExitDOM() {
        if (this.isOpen()) {
            Popup_1.unblockPageScrolling(this);
            this._removeOpenedPopup();
        }
        ResizeHandler.deregister(this, this._resizeHandler);
    }
    get _displayProp() {
        return "block";
    }
    _resize() {
        this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
    }
    /**
     * Prevents the user from interacting with the content under the block layer
     */
    _preventBlockLayerFocus(e) {
        e.preventDefault();
    }
    /**
     * Temporarily removes scrollbars from the html element
     * @protected
     */
    static blockPageScrolling(popup) {
        pageScrollingBlockers.add(popup);
        if (pageScrollingBlockers.size !== 1) {
            return;
        }
        document.documentElement.classList.add("ui5-popup-scroll-blocker");
    }
    /**
     * Restores scrollbars on the html element, if needed
     * @protected
     */
    static unblockPageScrolling(popup) {
        pageScrollingBlockers.delete(popup);
        if (pageScrollingBlockers.size !== 0) {
            return;
        }
        document.documentElement.classList.remove("ui5-popup-scroll-blocker");
    }
    _scroll(e) {
        this.fireEvent("scroll", {
            scrollTop: e.target.scrollTop,
            targetRef: e.target,
        });
    }
    _onkeydown(e) {
        const isTabOutAttempt = e.target === this._root && isTabPrevious(e);
        // if the popup is closed, focus is already moved, so Enter keydown may result in click on the newly focused element
        const isEnterOnClosedPopupChild = isEnter(e) && !this.isOpen();
        if (isTabOutAttempt || isEnterOnClosedPopupChild) {
            e.preventDefault();
        }
    }
    _onfocusout(e) {
        // relatedTarget is the element, which will get focus. If no such element exists, focus the root.
        // This happens after the mouse is released in order to not interrupt text selection.
        if (!e.relatedTarget) {
            this._shouldFocusRoot = true;
        }
    }
    _onmousedown(e) {
        if (!isSafari()) { // Remove when adopting native dialog
            this._root.removeAttribute("tabindex");
        }
        if (this.shadowRoot.contains(e.target)) {
            this._shouldFocusRoot = true;
        }
        else {
            this._shouldFocusRoot = false;
        }
    }
    _onmouseup() {
        if (!isSafari()) { // Remove when adopting native dialog
            this._root.tabIndex = -1;
        }
        if (this._shouldFocusRoot) {
            if (isChrome()) {
                this._root.focus();
            }
            this._shouldFocusRoot = false;
        }
    }
    /**
     * Focus trapping
     * @private
     */
    async forwardToFirst() {
        const firstFocusable = await getFirstFocusableElement(this);
        if (firstFocusable) {
            firstFocusable.focus();
        }
        else {
            this._root.focus();
        }
    }
    /**
     * Focus trapping
     * @private
     */
    async forwardToLast() {
        const lastFocusable = await getLastFocusableElement(this);
        if (lastFocusable) {
            lastFocusable.focus();
        }
        else {
            this._root.focus();
        }
    }
    /**
     * Use this method to focus the element denoted by "initialFocus", if provided, or the first focusable element otherwise.
     * @protected
     */
    async applyInitialFocus() {
        await this.applyFocus();
    }
    /**
     * Focuses the element denoted by <code>initialFocus</code>, if provided,
     * or the first focusable element otherwise.
     * @public
     * @method
     * @name sap.ui.webc.main.Popup#applyFocus
     * @async
     * @returns {Promise} Promise that resolves when the focus is applied
     */
    async applyFocus() {
        await this._waitForDomRef();
        if (this.getRootNode() === this) {
            return;
        }
        const element = this.getRootNode().getElementById(this.initialFocus)
            || document.getElementById(this.initialFocus)
            || await getFirstFocusableElement(this)
            || this._root; // in case of no focusable content focus the root
        if (element) {
            if (element === this._root) {
                element.tabIndex = -1;
            }
            element.focus();
        }
    }
    /**
     * Tells if the component is opened
     * @public
     * @method
     * @name sap.ui.webc.main.Popup#isOpen
     * @returns {boolean}
     */
    isOpen() {
        return this.opened;
    }
    isFocusWithin() {
        return isFocusedElementWithinNode(this._root);
    }
    /**
     * Shows the block layer (for modal popups only) and sets the correct z-index for the purpose of popup stacking
     * @protected
     */
    async _open(preventInitialFocus) {
        const prevented = !this.fireEvent("before-open", {}, true, false);
        if (prevented) {
            return;
        }
        if (this.isModal && !this.shouldHideBackdrop) {
            // create static area item ref for block layer
            this.getStaticAreaItemDomRef();
            this._blockLayerHidden = false;
            Popup_1.blockPageScrolling(this);
        }
        this._zIndex = getNextZIndex();
        this.style.zIndex = this._zIndex?.toString() || "";
        this._focusedElementBeforeOpen = getFocusedElement();
        this._show();
        this._addOpenedPopup();
        this.opened = true;
        this.open = true;
        await renderFinished();
        if (!this._disableInitialFocus && !preventInitialFocus) {
            await this.applyInitialFocus();
        }
        this.fireEvent("after-open", {}, false, false);
    }
    /**
     * Adds the popup to the "opened popups registry"
     * @protected
     */
    _addOpenedPopup() {
        addOpenedPopup(this);
    }
    /**
     * Closes the popup.
     * @public
     * @method
     * @name sap.ui.webc.main.Popup#close
     * @returns {void}
     */
    close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
        if (!this.opened) {
            return;
        }
        const prevented = !this.fireEvent("before-close", { escPressed }, true, false);
        if (prevented) {
            return;
        }
        if (this.isModal) {
            this._blockLayerHidden = true;
            Popup_1.unblockPageScrolling(this);
        }
        this.hide();
        this.opened = false;
        this.open = false;
        if (!preventRegistryUpdate) {
            this._removeOpenedPopup();
        }
        if (!this.preventFocusRestore && !preventFocusRestore) {
            this.resetFocus();
        }
        this.fireEvent("after-close", {}, false, false);
    }
    /**
     * Removes the popup from the "opened popups registry"
     * @protected
     */
    _removeOpenedPopup() {
        removeOpenedPopup(this);
    }
    /**
     * Returns the focus to the previously focused element
     * @protected
     */
    resetFocus() {
        if (!this._focusedElementBeforeOpen) {
            return;
        }
        this._focusedElementBeforeOpen.focus();
        this._focusedElementBeforeOpen = null;
    }
    /**
     * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
     * @protected
     */
    _show() {
        this.style.display = this._displayProp;
    }
    /**
     * Sets "none" display to the popup
     * @protected
     */
    hide() {
        this.style.display = "none";
    }
    /**
     * Ensures ariaLabel is never null or empty string
     * @returns {string | undefined}
     * @protected
     */
    get _ariaLabel() {
        return getEffectiveAriaLabelText(this);
    }
    get _root() {
        return this.shadowRoot.querySelector(".ui5-popup-root");
    }
    get _role() {
        return (this.accessibleRole === PopupAccessibleRole$1.None) ? undefined : this.accessibleRole.toLowerCase();
    }
    get _ariaModal() {
        return this.accessibleRole === PopupAccessibleRole$1.None ? undefined : "true";
    }
    get contentDOM() {
        return this.shadowRoot.querySelector(".ui5-popup-content");
    }
    get styles() {
        return {
            root: {},
            content: {},
            blockLayer: {
                "zIndex": this._zIndex ? this._zIndex - 1 : "",
            },
        };
    }
    get classes() {
        return {
            root: {
                "ui5-popup-root": true,
                "ui5-content-native-scrollbars": getEffectiveScrollbarStyle(),
            },
            content: {
                "ui5-popup-content": true,
            },
        };
    }
};
__decorate$d([
    property()
], Popup.prototype, "initialFocus", void 0);
__decorate$d([
    property({ type: Boolean })
], Popup.prototype, "preventFocusRestore", void 0);
__decorate$d([
    property({ type: Boolean })
], Popup.prototype, "open", void 0);
__decorate$d([
    property({ type: Boolean, noAttribute: true })
], Popup.prototype, "opened", void 0);
__decorate$d([
    property({ defaultValue: undefined })
], Popup.prototype, "accessibleName", void 0);
__decorate$d([
    property({ defaultValue: "" })
], Popup.prototype, "accessibleNameRef", void 0);
__decorate$d([
    property({ type: PopupAccessibleRole$1, defaultValue: PopupAccessibleRole$1.Dialog })
], Popup.prototype, "accessibleRole", void 0);
__decorate$d([
    property()
], Popup.prototype, "mediaRange", void 0);
__decorate$d([
    property({ type: Boolean })
], Popup.prototype, "_disableInitialFocus", void 0);
__decorate$d([
    property({ type: Boolean })
], Popup.prototype, "_blockLayerHidden", void 0);
__decorate$d([
    property({ type: Boolean, noAttribute: true })
], Popup.prototype, "isTopModalPopup", void 0);
__decorate$d([
    slot({ type: HTMLElement, "default": true })
], Popup.prototype, "content", void 0);
Popup = Popup_1 = __decorate$d([
    customElement({
        renderer: litRender,
        styles: styleData$j,
        template: block0$d,
        staticAreaTemplate: block0$c,
        staticAreaStyles: styleData$i,
    })
    /**
     * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening. <b>This event does not bubble.</b>
     *
     * @public
     * @event sap.ui.webc.main.Popup#before-open
     * @allowPreventDefault
     */
    ,
    event("before-open")
    /**
     * Fired after the component is opened. <b>This event does not bubble.</b>
     *
     * @public
     * @event sap.ui.webc.main.Popup#after-open
     */
    ,
    event("after-open")
    /**
     * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. <b>This event does not bubble.</b>
     *
     * @public
     * @event sap.ui.webc.main.Popup#before-close
     * @allowPreventDefault
     * @param {boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
     */
    ,
    event("before-close", {
        escPressed: { type: Boolean },
    })
    /**
     * Fired after the component is closed. <b>This event does not bubble.</b>
     *
     * @public
     * @event sap.ui.webc.main.Popup#after-close
     */
    ,
    event("after-close")
    /**
     * Fired whenever the popup content area is scrolled
     *
     * @private
     * @event sap.ui.webc.main.Popup#scroll
     */
    ,
    event("scroll")
], Popup);
var Popup$1 = Popup;

/**
 * Popover placement types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverPlacementType
 */
var PopoverPlacementType;
(function (PopoverPlacementType) {
    /**
     * Popover will be placed at the left side of the reference element.
     * @public
     * @type {Left}
     */
    PopoverPlacementType["Left"] = "Left";
    /**
     * Popover will be placed at the right side of the reference element.
     * @public
     * @type {Right}
     */
    PopoverPlacementType["Right"] = "Right";
    /**
     * Popover will be placed at the top of the reference element.
     * @public
     * @type {Top}
     */
    PopoverPlacementType["Top"] = "Top";
    /**
     * Popover will be placed at the bottom of the reference element.
     * @public
     * @type {Bottom}
     */
    PopoverPlacementType["Bottom"] = "Bottom";
})(PopoverPlacementType || (PopoverPlacementType = {}));
var PopoverPlacementType$1 = PopoverPlacementType;

/**
 * Popover vertical align types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverVerticalAlign
 */
var PopoverVerticalAlign;
(function (PopoverVerticalAlign) {
    /**
     *
     * @public
     * @type {Center}
     */
    PopoverVerticalAlign["Center"] = "Center";
    /**
     * Popover will be placed at the top of the reference control.
     * @public
     * @type {Top}
     */
    PopoverVerticalAlign["Top"] = "Top";
    /**
     * Popover will be placed at the bottom of the reference control.
     * @public
     * @type {Bottom}
     */
    PopoverVerticalAlign["Bottom"] = "Bottom";
    /**
     * Popover will be streched
     * @public
     * @type {Stretch}
     */
    PopoverVerticalAlign["Stretch"] = "Stretch";
})(PopoverVerticalAlign || (PopoverVerticalAlign = {}));
var PopoverVerticalAlign$1 = PopoverVerticalAlign;

/**
 * Popover horizontal align types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverHorizontalAlign
 */
var PopoverHorizontalAlign;
(function (PopoverHorizontalAlign) {
    /**
     * Popover is centered.
     * @public
     * @type {Center}
     */
    PopoverHorizontalAlign["Center"] = "Center";
    /**
     * Popover is aligned with the left side of the target. When direction is RTL, it is right aligned.
     * @public
     * @type {Left}
     */
    PopoverHorizontalAlign["Left"] = "Left";
    /**
     * Popover is aligned with the right side of the target. When direction is RTL, it is left aligned.
     * @public
     * @type {Right}
     */
    PopoverHorizontalAlign["Right"] = "Right";
    /**
     * Popover is stretched.
     * @public
     * @type {Stretch}
     */
    PopoverHorizontalAlign["Stretch"] = "Stretch";
})(PopoverHorizontalAlign || (PopoverHorizontalAlign = {}));
var PopoverHorizontalAlign$1 = PopoverHorizontalAlign;

let updateInterval;
const intervalTimeout = 300;
const openedRegistry = [];
const repositionPopovers = () => {
    openedRegistry.forEach(popover => {
        popover.instance.reposition();
    });
};
const closePopoversIfLostFocus = () => {
    if (document.activeElement.tagName === "IFRAME") {
        getRegistry().reverse().forEach(popup => popup.instance.close(false, false, true));
    }
};
const runUpdateInterval = () => {
    updateInterval = setInterval(() => {
        repositionPopovers();
        closePopoversIfLostFocus();
    }, intervalTimeout);
};
const stopUpdateInterval = () => {
    clearInterval(updateInterval);
};
const attachGlobalScrollHandler = () => {
    document.addEventListener("scroll", repositionPopovers, { capture: true });
};
const detachGlobalScrollHandler = () => {
    document.removeEventListener("scroll", repositionPopovers, { capture: true });
};
const attachScrollHandler = (popover) => {
    popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, { capture: true });
};
const detachScrollHandler = (popover) => {
    popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers, { capture: true });
};
const attachGlobalClickHandler = () => {
    document.addEventListener("mousedown", clickHandler);
};
const detachGlobalClickHandler = () => {
    document.removeEventListener("mousedown", clickHandler);
};
const clickHandler = (event) => {
    const openedPopups = getOpenedPopups();
    if (openedPopups.length === 0) {
        return;
    }
    const isTopPopupPopover = instanceOfPopover(openedPopups[openedPopups.length - 1].instance);
    if (!isTopPopupPopover) {
        return;
    }
    // loop all open popovers
    for (let i = (openedPopups.length - 1); i !== -1; i--) {
        const popup = openedPopups[i].instance;
        // if popup is modal, opener is clicked, popup is dialog skip closing
        if (popup.isModal || popup.isOpenerClicked(event)) {
            return;
        }
        if (isClickInRect(event, popup.getBoundingClientRect())) {
            break;
        }
        popup.close();
    }
};
const addOpenedPopover = (instance) => {
    const parentPopovers = getParentPopoversIfNested(instance);
    addOpenedPopup(instance, parentPopovers);
    openedRegistry.push({
        instance,
        parentPopovers,
    });
    attachScrollHandler(instance);
    if (openedRegistry.length === 1) {
        attachGlobalScrollHandler();
        attachGlobalClickHandler();
        runUpdateInterval();
    }
};
const removeOpenedPopover = (instance) => {
    const popoversToClose = [instance];
    for (let i = 0; i < openedRegistry.length; i++) {
        const indexOfCurrentInstance = openedRegistry[i].parentPopovers.indexOf(instance);
        if (openedRegistry[i].parentPopovers.length > 0 && indexOfCurrentInstance > -1) {
            popoversToClose.push(openedRegistry[i].instance);
        }
    }
    for (let i = popoversToClose.length - 1; i >= 0; i--) {
        for (let j = 0; j < openedRegistry.length; j++) {
            let indexOfItemToRemove = -1;
            if (popoversToClose[i] === openedRegistry[j].instance) {
                indexOfItemToRemove = j;
            }
            if (indexOfItemToRemove >= 0) {
                removeOpenedPopup(openedRegistry[indexOfItemToRemove].instance);
                detachScrollHandler(openedRegistry[indexOfItemToRemove].instance);
                const itemToClose = openedRegistry.splice(indexOfItemToRemove, 1);
                itemToClose[0].instance.close(false, true);
            }
        }
    }
    if (!openedRegistry.length) {
        detachGlobalScrollHandler();
        detachGlobalClickHandler();
        stopUpdateInterval();
    }
};
const getRegistry = () => {
    return openedRegistry;
};
const getParentPopoversIfNested = (instance) => {
    let currentElement = instance.parentNode;
    const parentPopovers = [];
    while (currentElement && currentElement.parentNode) {
        for (let i = 0; i < openedRegistry.length; i++) {
            if (currentElement === openedRegistry[i].instance) {
                parentPopovers.push(currentElement);
            }
        }
        currentElement = currentElement.parentNode;
    }
    return parentPopovers;
};

/* eslint no-unused-vars: 0 */
function block0$b(context, tags, suffix) { return effectiveHtml `<section style="${styleMap(this.styles.root)}" class="${o$2(this.classes.root)}" role="${l$1(this._role)}" aria-modal="${l$1(this._ariaModal)}" aria-label="${l$1(this._ariaLabel)}" aria-labelledby="${l$1(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(this.styles.arrow)}"></span>${this._displayHeader ? block1$a.call(this, context, tags, suffix) : undefined}<div style="${styleMap(this.styles.content)}" class="${o$2(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this._displayFooter ? block4$5.call(this, context, tags, suffix) : undefined}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `; }
function block1$a(context, tags, suffix) { return effectiveHtml `<header class="ui5-popup-header-root" id="ui5-popup-header" part="header">${this.header.length ? block2$a.call(this, context, tags, suffix) : block3$8.call(this, context, tags, suffix)}</header>`; }
function block2$a(context, tags, suffix) { return effectiveHtml `<slot name="header"></slot>`; }
function block3$8(context, tags, suffix) { return effectiveHtml `<h1 class="ui5-popup-header-text">${l$1(this.headerText)}</h1>`; }
function block4$5(context, tags, suffix) { return effectiveHtml `${this.footer.length ? block5$5.call(this, context, tags, suffix) : undefined}`; }
function block5$5(context, tags, suffix) { return effectiveHtml `<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$g = { packageName: "@ui5/webcomponents", fileName: "themes/BrowserScrollbar.css", content: ":not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:horizontal{height:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:vertical{width:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar{background-color:var(--sapScrollBar_TrackColor);border-left:var(--browser_scrollbar_border)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb{background-color:var(--sapScrollBar_FaceColor);border-radius:var(--browser_scrollbar_border_radius)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb:hover{background-color:var(--sapScrollBar_Hover_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-corner{background-color:var(--sapScrollBar_TrackColor)}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$f = { packageName: "@ui5/webcomponents", fileName: "themes/PopupsCommon.css", content: ":host{background:var(--sapGroup_ContentBackground);border-radius:var(--_ui5-v1-18-0_popup_border_radius);box-sizing:border-box;display:none;min-height:2rem;position:fixed}.ui5-popup-root{background:inherit;border-radius:inherit;box-sizing:border-box;display:flex;flex-direction:column;height:100%;outline:none;overflow:hidden;width:100%}.ui5-popup-root .ui5-popup-header-root{border-bottom:var(--_ui5-v1-18-0_popup_header_border);box-shadow:var(--_ui5-v1-18-0_popup_header_shadow);color:var(--sapPageHeader_TextColor)}.ui5-popup-content{color:var(--sapTextColor)}.ui5-popup-footer-root{background:var(--sapPageFooter_Background);border-top:1px solid var(--sapPageFooter_BorderColor);color:var(--sapPageFooter_TextColor)}.ui5-popup-footer-root,.ui5-popup-header-root,:host([header-text]) .ui5-popup-header-text{align-items:center;display:flex;font-family:\"72override\",var(--_ui5-v1-18-0_popup_header_font_family);font-size:1rem;justify-content:center;margin:0}.ui5-popup-header-root .ui5-popup-header-text{font-weight:var(--_ui5-v1-18-0_popup_header_font_weight)}.ui5-popup-content{box-sizing:border-box;overflow:auto}:host([header-text]) .ui5-popup-header-text{display:inline-block;line-height:var(--_ui5-v1-18-0_popup_default_header_height);max-height:var(--_ui5-v1-18-0_popup_default_header_height);max-width:100%;min-height:var(--_ui5-v1-18-0_popup_default_header_height);overflow:hidden;text-align:center;text-overflow:ellipsis;white-space:nowrap}:host([header-text]) .ui5-popup-header-root{justify-content:var(--_ui5-v1-18-0_popup_header_prop_header_text_alignment)}:host(:not([header-text])) .ui5-popup-header-text{display:none}:host([disable-scrolling]) .ui5-popup-content{overflow:hidden}:host([media-range=S]) .ui5-popup-content{padding:1rem var(--_ui5-v1-18-0_popup_content_padding_s)}:host([media-range=L]) .ui5-popup-content,:host([media-range=M]) .ui5-popup-content{padding:1rem var(--_ui5-v1-18-0_popup_content_padding_m_l)}:host([media-range=XL]) .ui5-popup-content{padding:1rem var(--_ui5-v1-18-0_popup_content_padding_xl)}.ui5-popup-header-root{background:var(--_ui5-v1-18-0_popup_header_background)}:host([media-range=S]) .ui5-popup-footer-root,:host([media-range=S]) .ui5-popup-header-root{padding-left:var(--_ui5-v1-18-0_popup_header_footer_padding_s);padding-right:var(--_ui5-v1-18-0_popup_header_footer_padding_s)}:host([media-range=L]) .ui5-popup-footer-root,:host([media-range=L]) .ui5-popup-header-root,:host([media-range=M]) .ui5-popup-footer-root,:host([media-range=M]) .ui5-popup-header-root{padding-left:var(--_ui5-v1-18-0_popup_header_footer_padding_m_l);padding-right:var(--_ui5-v1-18-0_popup_header_footer_padding_m_l)}:host([media-range=XL]) .ui5-popup-footer-root,:host([media-range=XL]) .ui5-popup-header-root{padding-left:var(--_ui5-v1-18-0_popup_header_footer_padding_xl);padding-right:var(--_ui5-v1-18-0_popup_header_footer_padding_xl)}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$e = { packageName: "@ui5/webcomponents", fileName: "themes/Popover.css", content: ":host{background-color:var(--_ui5-v1-18-0_popover_background);box-shadow:var(--_ui5-v1-18-0_popover_box_shadow);max-width:calc(100% - var(--_ui5-v1-18-0_popup_viewport_margin)*2)}:host([hide-arrow]){box-shadow:var(--_ui5-v1-18-0_popover_no_arrow_box_shadow)}:host([opened][actual-placement-type=Top]){margin-top:var(--_ui5-v1-18-0-popover-margin-bottom)}:host([opened][actual-placement-type=Bottom]){margin-top:var(--_ui5-v1-18-0-popover-margin-top)}:host([actual-placement-type=Bottom]) .ui5-popover-arrow{height:.5625rem;left:calc(50% - .5625rem);top:-.5rem}:host([actual-placement-type=Bottom]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-18-0_popover_upward_arrow_margin)}:host([actual-placement-type=Left]) .ui5-popover-arrow{right:-.5625rem;top:calc(50% - .5625rem);width:.5625rem}:host([actual-placement-type=Left]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-18-0_popover_right_arrow_margin)}:host([actual-placement-type=Top]) .ui5-popover-arrow{height:.5625rem;left:calc(50% - .5625rem);top:100%}:host([actual-placement-type=Top]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-18-0_popover_downward_arrow_margin)}:host(:not([actual-placement-type])) .ui5-popover-arrow,:host([actual-placement-type=Right]) .ui5-popover-arrow{height:1rem;left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem}:host(:not([actual-placement-type])) .ui5-popover-arrow:after,:host([actual-placement-type=Right]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-18-0_popover_left_arrow_margin)}:host([hide-arrow]) .ui5-popover-arrow{display:none}.ui5-popover-root{min-width:6.25rem}.ui5-popover-arrow{display:block;height:1rem;overflow:hidden;pointer-events:none;position:absolute;width:1rem}.ui5-popover-arrow:after{background-color:var(--_ui5-v1-18-0_popover_background);box-shadow:var(--_ui5-v1-18-0_popover_box_shadow);content:\"\";display:block;height:.7rem;transform:rotate(-45deg);width:.7rem}" };

var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popover_1;
const ARROW_SIZE = 8;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-popover</code> component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * <h3>Structure</h3>
 *
 * The popover has three main areas:
 * <ul>
 * <li>Header (optional)</li>
 * <li>Content</li>
 * <li>Footer (optional)</li>
 * </ul>
 *
 * <b>Note:</b> The <code>ui5-popover</code> is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * <code>modal</code> property.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-popover</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>header - Used to style the header of the component</li>
 * <li>content - Used to style the content of the component</li>
 * <li>footer - Used to style the footer of the component</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Popover.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Popover
 * @extends sap.ui.webc.main.Popup
 * @tagname ui5-popover
 * @since 1.0.0-rc.6
 * @public
 */
let Popover = Popover_1 = class Popover extends Popup$1 {
    static get VIEWPORT_MARGIN() {
        return 10; // px
    }
    constructor() {
        super();
    }
    onAfterRendering() {
        if (!this.isOpen() && this.open) {
            let opener;
            if (this.opener instanceof HTMLElement) {
                opener = this.opener;
            }
            else if (typeof this.opener === "string") {
                opener = this.getRootNode().getElementById(this.opener);
            }
            if (!opener) {
                console.warn("Valid opener id is required."); // eslint-disable-line
                return;
            }
            this.showAt(opener);
        }
        else if (this.isOpen() && !this.open) {
            this.close();
        }
    }
    isOpenerClicked(e) {
        const target = e.target;
        if (target === this._opener) {
            return true;
        }
        const ui5ElementTarget = target;
        if (ui5ElementTarget.getFocusDomRef && ui5ElementTarget.getFocusDomRef() === this._opener) {
            return true;
        }
        return e.composedPath().indexOf(this._opener) > -1;
    }
    /**
     * Shows the popover.
     * @param {HTMLElement} opener the element that the popover is shown at
     * @param {boolean} [preventInitialFocus=false] prevents applying the focus inside the popover
     * @public
     * @async
     * @method
     * @name sap.ui.webc.main.Popover#showAt
     * @async
     * @returns {Promise} Resolved when the popover is open
     */
    async showAt(opener, preventInitialFocus = false) {
        if (!opener || this.opened) {
            return;
        }
        this._opener = opener;
        this._openerRect = opener.getBoundingClientRect();
        await super._open(preventInitialFocus);
    }
    /**
     * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
     * @private
     */
    _addOpenedPopup() {
        addOpenedPopover(this);
    }
    /**
     * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
     * @private
     */
    _removeOpenedPopup() {
        removeOpenedPopover(this);
    }
    shouldCloseDueToOverflow(placement, openerRect) {
        const threshold = 32;
        const limits = {
            "Right": openerRect.right,
            "Left": openerRect.left,
            "Top": openerRect.top,
            "Bottom": openerRect.bottom,
        };
        const closedPopupParent = getClosedPopupParent(this._opener);
        let overflowsBottom = false;
        let overflowsTop = false;
        if (closedPopupParent.showAt) {
            const contentRect = closedPopupParent.contentDOM.getBoundingClientRect();
            overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
            overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
        }
        return (limits[placement] < 0 || (limits[placement] + threshold > closedPopupParent.innerHeight)) || overflowsBottom || overflowsTop;
    }
    shouldCloseDueToNoOpener(openerRect) {
        return openerRect.top === 0
            && openerRect.bottom === 0
            && openerRect.left === 0
            && openerRect.right === 0;
    }
    isOpenerOutsideViewport(openerRect) {
        return openerRect.bottom < 0
            || openerRect.top > window.innerHeight
            || openerRect.right < 0
            || openerRect.left > window.innerWidth;
    }
    /**
     * @override
     */
    _resize() {
        super._resize();
        if (this.opened) {
            this.reposition();
        }
    }
    reposition() {
        this._show();
    }
    _show() {
        let placement;
        const popoverSize = this.getPopoverSize();
        if (popoverSize.width === 0 || popoverSize.height === 0) {
            // size can not be determined properly at this point, popover will be shown with the next reposition
            return;
        }
        if (this.isOpen()) {
            // update opener rect if it was changed during the popover being opened
            this._openerRect = this._opener.getBoundingClientRect();
        }
        if (this.shouldCloseDueToNoOpener(this._openerRect) && this.isFocusWithin()) {
            // reuse the old placement as the opener is not available,
            // but keep the popover open as the focus is within
            placement = this._oldPlacement;
        }
        else {
            placement = this.calcPlacement(this._openerRect, popoverSize);
        }
        if (this._preventRepositionAndClose || this.isOpenerOutsideViewport(this._openerRect)) {
            return this.close();
        }
        this._oldPlacement = placement;
        this.actualPlacementType = placement.placementType;
        let left = clamp(this._left, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientWidth - popoverSize.width - Popover_1.VIEWPORT_MARGIN);
        if (this.actualPlacementType === PopoverPlacementType$1.Right) {
            left = Math.max(left, this._left);
        }
        let top = clamp(this._top, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientHeight - popoverSize.height - Popover_1.VIEWPORT_MARGIN);
        if (this.actualPlacementType === PopoverPlacementType$1.Bottom) {
            top = Math.max(top, this._top);
        }
        this.arrowTranslateX = placement.arrow.x;
        this.arrowTranslateY = placement.arrow.y;
        top = this._adjustForIOSKeyboard(top);
        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
        });
        super._show();
        if (this.horizontalAlign === PopoverHorizontalAlign$1.Stretch && this._width) {
            this.style.width = this._width;
        }
    }
    /**
     * Adjust the desired top position to compensate for shift of the screen
     * caused by opened keyboard on iOS which affects all elements with position:fixed.
     * @private
     * @param {int} top The target top in px.
     * @returns {int} The adjusted top in px.
     */
    _adjustForIOSKeyboard(top) {
        if (!isIOS()) {
            return top;
        }
        const actualTop = Math.ceil(this.getBoundingClientRect().top);
        return top + (Number.parseInt(this.style.top || "0") - actualTop);
    }
    getPopoverSize() {
        if (!this.opened) {
            Object.assign(this.style, {
                display: "block",
                top: "-10000px",
                left: "-10000px",
            });
        }
        const rect = this.getBoundingClientRect(), width = rect.width, height = rect.height;
        return { width, height };
    }
    get arrowDOM() {
        return this.shadowRoot.querySelector(".ui5-popover-arrow");
    }
    /**
     * @private
     */
    calcPlacement(targetRect, popoverSize) {
        let left = 0;
        let top = 0;
        const allowTargetOverlap = this.allowTargetOverlap;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        let maxHeight = clientHeight;
        let maxWidth = clientWidth;
        const placementType = this.getActualPlacementType(targetRect, popoverSize);
        this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placementType, targetRect);
        const isVertical = placementType === PopoverPlacementType$1.Top
            || placementType === PopoverPlacementType$1.Bottom;
        if (this.horizontalAlign === PopoverHorizontalAlign$1.Stretch && isVertical) {
            popoverSize.width = targetRect.width;
            this._width = `${targetRect.width}px`;
        }
        else if (this.verticalAlign === PopoverVerticalAlign$1.Stretch && !isVertical) {
            popoverSize.height = targetRect.height;
        }
        const arrowOffset = this.hideArrow ? 0 : ARROW_SIZE;
        // calc popover positions
        switch (placementType) {
            case PopoverPlacementType$1.Top:
                left = this.getVerticalLeft(targetRect, popoverSize);
                top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);
                if (!allowTargetOverlap) {
                    maxHeight = targetRect.top - arrowOffset;
                }
                break;
            case PopoverPlacementType$1.Bottom:
                left = this.getVerticalLeft(targetRect, popoverSize);
                top = targetRect.bottom + arrowOffset;
                if (allowTargetOverlap) {
                    top = Math.max(Math.min(top, clientHeight - popoverSize.height), 0);
                }
                else {
                    maxHeight = clientHeight - targetRect.bottom - arrowOffset;
                }
                break;
            case PopoverPlacementType$1.Left:
                left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
                top = this.getHorizontalTop(targetRect, popoverSize);
                if (!allowTargetOverlap) {
                    maxWidth = targetRect.left - arrowOffset;
                }
                break;
            case PopoverPlacementType$1.Right:
                left = targetRect.left + targetRect.width + arrowOffset;
                top = this.getHorizontalTop(targetRect, popoverSize);
                if (allowTargetOverlap) {
                    left = Math.max(Math.min(left, clientWidth - popoverSize.width), 0);
                }
                else {
                    maxWidth = clientWidth - targetRect.right - arrowOffset;
                }
                break;
        }
        // correct popover positions
        if (isVertical) {
            if (popoverSize.width > clientWidth || left < 0) {
                left = 0;
            }
            else if (left + popoverSize.width > clientWidth) {
                left -= left + popoverSize.width - clientWidth;
            }
        }
        else {
            if (popoverSize.height > clientHeight || top < 0) { // eslint-disable-line
                top = 0;
            }
            else if (top + popoverSize.height > clientHeight) {
                top -= top + popoverSize.height - clientHeight;
            }
        }
        this._maxHeight = Math.round(maxHeight - Popover_1.VIEWPORT_MARGIN);
        this._maxWidth = Math.round(maxWidth - Popover_1.VIEWPORT_MARGIN);
        if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
            this._left = Math.round(left);
        }
        if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
            this._top = Math.round(top);
        }
        const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));
        const arrowPos = this.getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius);
        return {
            arrow: arrowPos,
            top: this._top,
            left: this._left,
            placementType,
        };
    }
    /**
     * Calculates the position for the arrow.
     * @private
     * @param targetRect BoundingClientRect of the target element
     * @param {{width: number, height: number}} popoverSize Width and height of the popover
     * @param left Left offset of the popover
     * @param top Top offset of the popover
     * @param isVertical If the popover is positioned vertically to the target element
     * @param {number} borderRadius Value of the border-radius property
     * @returns {{x: number, y: number}} Arrow's coordinates
     */
    getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius) {
        const horizontalAlign = this._actualHorizontalAlign;
        let arrowXCentered = horizontalAlign === PopoverHorizontalAlign$1.Center || horizontalAlign === PopoverHorizontalAlign$1.Stretch;
        if (horizontalAlign === PopoverHorizontalAlign$1.Right && left <= targetRect.left) {
            arrowXCentered = true;
        }
        if (horizontalAlign === PopoverHorizontalAlign$1.Left && left + popoverSize.width >= targetRect.left + targetRect.width) {
            arrowXCentered = true;
        }
        let arrowTranslateX = 0;
        if (isVertical && arrowXCentered) {
            arrowTranslateX = targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2;
        }
        let arrowTranslateY = 0;
        if (!isVertical) {
            arrowTranslateY = targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2;
        }
        // Restricts the arrow's translate value along each dimension,
        // so that the arrow does not clip over the popover's rounded borders.
        const safeRangeForArrowY = popoverSize.height / 2 - borderRadius - ARROW_SIZE / 2;
        arrowTranslateY = clamp(arrowTranslateY, -safeRangeForArrowY, safeRangeForArrowY);
        const safeRangeForArrowX = popoverSize.width / 2 - borderRadius - ARROW_SIZE / 2;
        arrowTranslateX = clamp(arrowTranslateX, -safeRangeForArrowX, safeRangeForArrowX);
        return {
            x: Math.round(arrowTranslateX),
            y: Math.round(arrowTranslateY),
        };
    }
    /**
     * Fallbacks to new placement, prioritizing <code>Left</code> and <code>Right</code> placements.
     * @private
     */
    fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
        if (targetRect.left > popoverSize.width) {
            return PopoverPlacementType$1.Left;
        }
        if (clientWidth - targetRect.right > targetRect.left) {
            return PopoverPlacementType$1.Right;
        }
        if (clientHeight - targetRect.bottom > popoverSize.height) {
            return PopoverPlacementType$1.Bottom;
        }
        if (clientHeight - targetRect.bottom < targetRect.top) {
            return PopoverPlacementType$1.Top;
        }
    }
    getActualPlacementType(targetRect, popoverSize) {
        const placementType = this.placementType;
        let actualPlacementType = placementType;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        switch (placementType) {
            case PopoverPlacementType$1.Top:
                if (targetRect.top < popoverSize.height
                    && targetRect.top < clientHeight - targetRect.bottom) {
                    actualPlacementType = PopoverPlacementType$1.Bottom;
                }
                break;
            case PopoverPlacementType$1.Bottom:
                if (clientHeight - targetRect.bottom < popoverSize.height
                    && clientHeight - targetRect.bottom < targetRect.top) {
                    actualPlacementType = PopoverPlacementType$1.Top;
                }
                break;
            case PopoverPlacementType$1.Left:
                if (targetRect.left < popoverSize.width) {
                    actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
                }
                break;
            case PopoverPlacementType$1.Right:
                if (clientWidth - targetRect.right < popoverSize.width) {
                    actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
                }
                break;
        }
        return actualPlacementType;
    }
    getVerticalLeft(targetRect, popoverSize) {
        const horizontalAlign = this._actualHorizontalAlign;
        let left = 0;
        switch (horizontalAlign) {
            case PopoverHorizontalAlign$1.Center:
            case PopoverHorizontalAlign$1.Stretch:
                left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
                break;
            case PopoverHorizontalAlign$1.Left:
                left = targetRect.left;
                break;
            case PopoverHorizontalAlign$1.Right:
                left = targetRect.right - popoverSize.width;
                break;
        }
        return left;
    }
    getHorizontalTop(targetRect, popoverSize) {
        let top = 0;
        switch (this.verticalAlign) {
            case PopoverVerticalAlign$1.Center:
            case PopoverVerticalAlign$1.Stretch:
                top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
                break;
            case PopoverVerticalAlign$1.Top:
                top = targetRect.top;
                break;
            case PopoverVerticalAlign$1.Bottom:
                top = targetRect.bottom - popoverSize.height;
                break;
        }
        return top;
    }
    get isModal() {
        return this.modal;
    }
    get shouldHideBackdrop() {
        return this.hideBackdrop;
    }
    get _ariaLabelledBy() {
        if (!this._ariaLabel && this._displayHeader) {
            return "ui5-popup-header";
        }
        return undefined;
    }
    get styles() {
        return {
            ...super.styles,
            root: {
                "max-height": this._maxHeight ? `${this._maxHeight}px` : "",
                "max-width": this._maxWidth ? `${this._maxWidth}px` : "",
            },
            arrow: {
                transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`,
            },
        };
    }
    get classes() {
        const allClasses = super.classes;
        allClasses.root["ui5-popover-root"] = true;
        return allClasses;
    }
    /**
     * Hook for descendants to hide header.
     */
    get _displayHeader() {
        return !!(this.header.length || this.headerText);
    }
    /**
     * Hook for descendants to hide footer.
     */
    get _displayFooter() {
        return true;
    }
    get _actualHorizontalAlign() {
        if (this.effectiveDir === "rtl") {
            if (this.horizontalAlign === PopoverHorizontalAlign$1.Left) {
                return PopoverHorizontalAlign$1.Right;
            }
            if (this.horizontalAlign === PopoverHorizontalAlign$1.Right) {
                return PopoverHorizontalAlign$1.Left;
            }
        }
        return this.horizontalAlign;
    }
};
__decorate$c([
    property()
], Popover.prototype, "headerText", void 0);
__decorate$c([
    property({ type: PopoverPlacementType$1, defaultValue: PopoverPlacementType$1.Right })
], Popover.prototype, "placementType", void 0);
__decorate$c([
    property({ type: PopoverHorizontalAlign$1, defaultValue: PopoverHorizontalAlign$1.Center })
], Popover.prototype, "horizontalAlign", void 0);
__decorate$c([
    property({ type: PopoverVerticalAlign$1, defaultValue: PopoverVerticalAlign$1.Center })
], Popover.prototype, "verticalAlign", void 0);
__decorate$c([
    property({ type: Boolean })
], Popover.prototype, "modal", void 0);
__decorate$c([
    property({ type: Boolean })
], Popover.prototype, "hideBackdrop", void 0);
__decorate$c([
    property({ type: Boolean })
], Popover.prototype, "hideArrow", void 0);
__decorate$c([
    property({ type: Boolean })
], Popover.prototype, "allowTargetOverlap", void 0);
__decorate$c([
    property({ validator: DOMReference })
], Popover.prototype, "opener", void 0);
__decorate$c([
    property({ type: Boolean })
], Popover.prototype, "disableScrolling", void 0);
__decorate$c([
    property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateX", void 0);
__decorate$c([
    property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateY", void 0);
__decorate$c([
    property({ type: PopoverPlacementType$1, defaultValue: PopoverPlacementType$1.Right })
], Popover.prototype, "actualPlacementType", void 0);
__decorate$c([
    property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxHeight", void 0);
__decorate$c([
    property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxWidth", void 0);
__decorate$c([
    slot({ type: HTMLElement })
], Popover.prototype, "header", void 0);
__decorate$c([
    slot({ type: HTMLElement })
], Popover.prototype, "footer", void 0);
Popover = Popover_1 = __decorate$c([
    customElement({
        tag: "ui5-popover",
        styles: [
            styleData$g,
            styleData$f,
            styleData$e,
        ],
        template: block0$b,
    })
], Popover);
const instanceOfPopover = (object) => {
    return "showAt" in object;
};
Popover.define();
var Popover$1 = Popover;

const name$f = "resize-corner";
const pathData$f = "M384 224v32q0 12-10 22L182 470q-10 10-22 10h-32zM224 480l160-160v32q0 12-10 22l-96 96q-10 10-22 10h-32zm160-64v32q0 12-10 22t-22 10h-32z";
const ltr$f = false;
const collection$f = "SAP-icons-v4";
const packageName$f = "@ui5/webcomponents-icons";

registerIcon(name$f, { pathData: pathData$f, ltr: ltr$f, collection: collection$f, packageName: packageName$f });

const name$e = "resize-corner";
const pathData$e = "M202 512q-11 0-18.5-7.5T176 486q0-10 8-18l204-205q7-7 18-7t18.5 7.5T432 282t-7 18L220 505q-7 7-18 7zm128 0q-11 0-18.5-7.5T304 486q0-10 8-18l76-77q7-7 18-7t18.5 7.5T432 410t-7 18l-77 77q-7 7-18 7z";
const ltr$e = false;
const collection$e = "SAP-icons-v5";
const packageName$e = "@ui5/webcomponents-icons";

registerIcon(name$e, { pathData: pathData$e, ltr: ltr$e, collection: collection$e, packageName: packageName$e });

isLegacyThemeFamily() ? pathData$f : pathData$e;

const name$d = "error";
const pathData$d = "M512 256q0 53-20.5 100t-55 81.5-81 54.5-99.5 20-100-20.5-81.5-55T20 355 0 256q0-54 20-100.5t55-81T156.5 20 256 0t99.5 20T437 75t55 81.5 20 99.5zM399 364q6-6 0-12l-86-86q-6-6 0-12l81-81q6-6 0-12l-37-37q-2-2-6-2t-6 2l-83 82q-1 3-6 3-3 0-6-3l-84-83q-1-2-6-2-4 0-6 2l-37 37q-6 6 0 12l83 82q6 6 0 12l-83 82q-2 2-2.5 6t2.5 6l36 37q4 2 6 2 4 0 6-2l85-84q2-2 6-2t6 2l88 88q4 2 6 2t6-2z";
const ltr$d = false;
const accData$1 = ICON_ERROR;
const collection$d = "SAP-icons-v4";
const packageName$d = "@ui5/webcomponents-icons";

registerIcon(name$d, { pathData: pathData$d, ltr: ltr$d, accData: accData$1, collection: collection$d, packageName: packageName$d });

const name$c = "error";
const pathData$c = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm45 256l74-73q9-11 9-23 0-13-9.5-22.5T352 128q-12 0-23 9l-73 74-73-74q-10-9-23-9t-22.5 9.5T128 160q0 12 9 23l74 73-74 73q-9 10-9 23t9.5 22.5T160 384t23-9l73-74 73 74q11 9 23 9 13 0 22.5-9.5T384 352t-9-23z";
const ltr$c = false;
const accData = ICON_ERROR;
const collection$c = "SAP-icons-v5";
const packageName$c = "@ui5/webcomponents-icons";

registerIcon(name$c, { pathData: pathData$c, ltr: ltr$c, accData, collection: collection$c, packageName: packageName$c });

isLegacyThemeFamily() ? pathData$d : pathData$c;

const name$b = "alert";
const pathData$b = "M501 374q5 10 7.5 19.5T512 412v5q0 31-23 47t-50 16H74q-13 0-26-4t-23.5-12-17-20T0 417q0-13 4-22.5t9-20.5L198 38q21-38 61-38 38 0 59 38zM257 127q-13 0-23.5 8T223 161q1 7 2 12 3 25 4.5 48t3.5 61q0 11 7.5 16t16.5 5q22 0 23-21l2-36 9-85q0-18-10.5-26t-23.5-8zm0 299q20 0 31.5-12t11.5-32q0-19-11.5-31T257 339t-31.5 12-11.5 31q0 20 11.5 32t31.5 12z";
const ltr$b = false;
const collection$b = "SAP-icons-v4";
const packageName$b = "@ui5/webcomponents-icons";

registerIcon(name$b, { pathData: pathData$b, ltr: ltr$b, collection: collection$b, packageName: packageName$b });

const name$a = "alert";
const pathData$a = "M505 399q7 13 7 27 0 21-15.5 37.5T456 480H56q-25 0-40.5-16.5T0 426q0-14 7-27L208 59q17-27 48-27 14 0 27 6.5T304 59zM288 176q0-14-9-23t-23-9-23 9-9 23v96q0 14 9 23t23 9 23-9 9-23v-96zm-32 240q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
const ltr$a = false;
const collection$a = "SAP-icons-v5";
const packageName$a = "@ui5/webcomponents-icons";

registerIcon(name$a, { pathData: pathData$a, ltr: ltr$a, collection: collection$a, packageName: packageName$a });

isLegacyThemeFamily() ? pathData$b : pathData$a;

const name$9 = "sys-enter-2";
const pathData$9 = "M512 256q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256t20.5-100 55-81.5T157 20t99-20q53 0 100 20t81.5 54.5T492 156t20 100zm-118-87q4-8-1-13l-36-36q-3-4-8-4t-8 5L237 294q-3 1-4 0l-70-52q-4-3-7-3t-4.5 2-2.5 3l-29 41q-6 8 2 14l113 95q2 2 7 2t8-4z";
const ltr$9 = true;
const collection$9 = "SAP-icons-v4";
const packageName$9 = "@ui5/webcomponents-icons";

registerIcon(name$9, { pathData: pathData$9, ltr: ltr$9, collection: collection$9, packageName: packageName$9 });

const name$8 = "sys-enter-2";
const pathData$8 = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm150 183q10-9 10-23 0-13-9.5-22.5T384 128t-22 9L186 308l-68-63q-9-9-22-9t-22.5 9.5T64 268q0 15 10 24l91 83q9 9 21 9 13 0 23-9z";
const ltr$8 = true;
const collection$8 = "SAP-icons-v5";
const packageName$8 = "@ui5/webcomponents-icons";

registerIcon(name$8, { pathData: pathData$8, ltr: ltr$8, collection: collection$8, packageName: packageName$8 });

isLegacyThemeFamily() ? pathData$9 : pathData$8;

const name$7 = "information";
const pathData$7 = "M0 256q0-53 20.5-100t55-81.5T157 20t99-20q54 0 100.5 20t81 55 54.5 81.5 20 99.5q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256zm192 112v33h128v-33h-32V215q0-6-7-6h-88v31h32v128h-33zm34-201q14 11 30 11 17 0 29.5-11.5T298 138q0-19-13-31-12-12-29-12-19 0-30.5 12.5T214 138q0 17 12 29z";
const ltr$7 = false;
const collection$7 = "SAP-icons-v4";
const packageName$7 = "@ui5/webcomponents-icons";

registerIcon(name$7, { pathData: pathData$7, ltr: ltr$7, collection: collection$7, packageName: packageName$7 });

const name$6 = "information";
const pathData$6 = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm0 160q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zm32 64q0-14-9-23t-23-9-23 9-9 23v160q0 14 9 23t23 9 23-9 9-23V224z";
const ltr$6 = false;
const collection$6 = "SAP-icons-v5";
const packageName$6 = "@ui5/webcomponents-icons";

registerIcon(name$6, { pathData: pathData$6, ltr: ltr$6, collection: collection$6, packageName: packageName$6 });

isLegacyThemeFamily() ? pathData$7 : pathData$6;

/* eslint no-unused-vars: 0 */
function block0$a(context, tags, suffix) { return effectiveHtml `<section style="${styleMap(this.styles.root)}" class="${o$2(this.classes.root)}" role="${l$1(this._role)}" aria-modal="${l$1(this._ariaModal)}" aria-label="${l$1(this._ariaLabel)}" aria-labelledby="${l$1(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span>${this._displayHeader ? block1$9.call(this, context, tags, suffix) : undefined}<div style="${styleMap(this.styles.content)}" class="${o$2(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this.footer.length ? block10$1.call(this, context, tags, suffix) : undefined}${this._showResizeHandle ? block11$1.call(this, context, tags, suffix) : undefined}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `; }
function block1$9(context, tags, suffix) { return effectiveHtml `<header><div class="ui5-popup-header-root" id="ui5-popup-header" role="group" aria-describedby=${l$1(this.effectiveAriaDescribedBy)} aria-roledescription=${l$1(this.ariaRoleDescriptionHeaderText)} tabindex="${l$1(this._headerTabIndex)}" @keydown="${this._onDragOrResizeKeyDown}" @mousedown="${this._onDragMouseDown}" part="header" state="${l$1(this.state)}">${this.hasValueState ? block2$9.call(this, context, tags, suffix) : undefined}${this.header.length ? block3$7.call(this, context, tags, suffix) : block4$4.call(this, context, tags, suffix)}${this.resizable ? block5$4.call(this, context, tags, suffix) : block8$2.call(this, context, tags, suffix)}</div></header>`; }
function block2$9(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} class="ui5-dialog-value-state-icon" name="${l$1(this._dialogStateIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon class="ui5-dialog-value-state-icon" name="${l$1(this._dialogStateIcon)}"></ui5-icon>`; }
function block3$7(context, tags, suffix) { return effectiveHtml `<slot name="header"></slot>`; }
function block4$4(context, tags, suffix) { return effectiveHtml `<h1 id="ui5-popup-header-text" class="ui5-popup-header-text">${l$1(this.headerText)}</h1>`; }
function block5$4(context, tags, suffix) { return effectiveHtml `${this.draggable ? block6$3.call(this, context, tags, suffix) : block7$2.call(this, context, tags, suffix)}`; }
function block6$3(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l$1(this.ariaDescribedByHeaderTextDraggableAndResizable)}</span>`; }
function block7$2(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l$1(this.ariaDescribedByHeaderTextResizable)}</span>`; }
function block8$2(context, tags, suffix) { return effectiveHtml `${this.draggable ? block9$2.call(this, context, tags, suffix) : undefined}`; }
function block9$2(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l$1(this.ariaDescribedByHeaderTextDraggable)}</span>`; }
function block10$1(context, tags, suffix) { return effectiveHtml `<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`; }
function block11$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} name="resize-corner" class="ui5-popup-resize-handle" @mousedown="${this._onResizeMouseDown}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon name="resize-corner" class="ui5-popup-resize-handle" @mousedown="${this._onResizeMouseDown}"></ui5-icon>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$d = { packageName: "@ui5/webcomponents", fileName: "themes/Dialog.css", content: ".ui5-hidden-text{clip:rect(1px,1px,1px,1px);font-size:0;left:-1000px;pointer-events:none;position:absolute;top:-1000px;user-select:none}:host{border-radius:var(--sapElement_BorderCornerRadius);box-shadow:var(--sapContent_Shadow3);flex-direction:column;max-height:94%;max-width:90%;min-height:6rem;min-width:20rem}:host([stretch]){height:94%;width:90%}:host([stretch][on-phone]){border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}:host([draggable]) .ui5-popup-header-root,:host([draggable]) ::slotted([slot=header]){cursor:move}:host([draggable]) .ui5-popup-header-root *{cursor:auto}:host([draggable]) .ui5-popup-root{user-select:text}.ui5-popup-root{display:flex;flex-direction:column;max-width:100vw}.ui5-popup-header-root{position:relative}.ui5-popup-header-root:before{background:var(--sapObjectHeader_BorderColor);content:\"\";height:var(--_ui5-v1-18-0_dialog_header_state_line_height);inset-block-end:0;inset-block-start:auto;inset-inline-end:0;inset-inline-start:0;position:absolute}:host([state=Error]) .ui5-popup-header-root:before{background:var(--sapErrorBorderColor)}:host([state=Information]) .ui5-popup-header-root:before{background:var(--sapInformationBorderColor)}:host([state=Success]) .ui5-popup-header-root:before{background:var(--sapSuccessBorderColor)}:host([state=Warning]) .ui5-popup-header-root:before{background:var(--sapWarningBorderColor)}.ui5-dialog-value-state-icon{margin-inline-end:.5rem}:host([state=Error]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-18-0_dialog_header_error_state_icon_color)}:host([state=Information]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-18-0_dialog_header_information_state_icon_color)}:host([state=Success]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-18-0_dialog_header_success_state_icon_color)}:host([state=Warning]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-18-0_dialog_header_warning_state_icon_color)}.ui5-popup-header-root{outline:none}.ui5-popup-header-root:focus:after{border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-18-0_dialog_header_border_radius) var(--_ui5-v1-18-0_dialog_header_border_radius) 0 0;bottom:var(--_ui5-v1-18-0_dialog_header_focus_bottom_offset);content:\"\";left:var(--_ui5-v1-18-0_dialog_header_focus_left_offset);pointer-events:none;position:absolute;right:var(--_ui5-v1-18-0_dialog_header_focus_right_offset);top:var(--_ui5-v1-18-0_dialog_header_focus_top_offset)}:host([stretch]) .ui5-popup-content{height:100%;width:100%}.ui5-popup-content{flex:1 1 auto;min-height:var(--_ui5-v1-18-0_dialog_content_min_height)}.ui5-popup-resize-handle{bottom:var(--_ui5-v1-18-0_dialog_resize_handle_bottom);color:var(--_ui5-v1-18-0_dialog_resize_handle_color);cursor:var(--_ui5-v1-18-0_dialog_resize_cursor);inset-inline-end:var(--_ui5-v1-18-0_dialog_resize_handle_right);position:absolute}::slotted([slot=footer]){height:var(--_ui5-v1-18-0_dialog_footer_height)}::slotted([slot=footer][ui5-bar][design=Footer]){border-top:none}::slotted([slot=header][ui5-bar]){box-shadow:none}" };

var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Dialog_1;
/**
 * Defines the step size at which this component would change by when being dragged or resized with the keyboard.
 */
const STEP_SIZE = 16;
/**
 * Defines the icons corresponding to the dialog's state.
 */
const ICON_PER_STATE = {
    [ValueState$1.Error]: "error",
    [ValueState$1.Warning]: "alert",
    [ValueState$1.Success]: "sys-enter-2",
    [ValueState$1.Information]: "information",
};
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-dialog</code> component is used to temporarily display some information in a
 * size-limited window in front of the regular app screen.
 * It is used to prompt the user for an action or a confirmation.
 * The <code>ui5-dialog</code> interrupts the current app processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The dialog combines concepts known from other technologies where the windows have
 * names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
 * <br><br>
 * The <code>ui5-dialog</code> is modal, which means that an user action is required before it is possible to return to the parent window.
 * To open multiple dialogs, each dialog element should be separate in the markup. This will ensure the correct modal behavior. Avoid nesting dialogs within each other.
 * The content of the <code>ui5-dialog</code> is fully customizable.
 *
 * <h3>Structure</h3>
 * A <code>ui5-dialog</code> consists of a header, content, and a footer for action buttons.
 * The <code>ui5-dialog</code> is usually displayed at the center of the screen.
 * Its position can be changed by the user. To enable this, you need to set the property <code>draggable</code> accordingly.

 *
 * <h3>Responsive Behavior</h3>
 * The <code>stretch</code> property can be used to stretch the
 * <code>ui5-dialog</code> on full screen.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-dialog</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>header - Used to style the header of the component</li>
 * <li>content - Used to style the content of the component</li>
 * <li>footer - Used to style the footer of the component</li>
 * </ul>
 * <b>Note:</b> When a <code>ui5-bar</code> is used in the header or in the footer, you should remove the default dialog's paddings.
 * <br>
 * For more information see the sample "Bar in Header/Footer".

 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Dialog";</code>
 *
 * <b>Note:</b> We don't recommend nesting popup-like components (<code>ui5-dialog</code>, <code>ui5-popover</code>) inside <code>ui5-dialog</code>.
 * Ideally you should create all popups on the same level inside your HTML page and just open them from one another, rather than nesting them.
 *
 * <b>Note:</b> We don't recommend nesting popup-like components (<code>ui5-dialog</code>, <code>ui5-popover</code>) inside other components containing z-index.
 * This might break z-index management.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Dialog
 * @extends sap.ui.webc.main.Popup
 * @tagname ui5-dialog
 * @public
 */
let Dialog = Dialog_1 = class Dialog extends Popup$1 {
    constructor() {
        super();
        this._draggedOrResized = false;
        this._revertSize = () => {
            Object.assign(this.style, {
                top: "",
                left: "",
                width: "",
                height: "",
            });
        };
        this._screenResizeHandler = this._screenResize.bind(this);
        this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
        this._dragMouseUpHandler = this._onDragMouseUp.bind(this);
        this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this);
        this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this);
        this._dragStartHandler = this._handleDragStart.bind(this);
    }
    static async onDefine() {
        Dialog_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    static _isHeader(element) {
        return element.classList.contains("ui5-popup-header-root") || element.getAttribute("slot") === "header";
    }
    /**
     * Shows the dialog.
     *
     * @param {boolean} [preventInitialFocus=false] Prevents applying the focus inside the popup
     * @public
     * @method
     * @name sap.ui.webc.main.Dialog#show
     * @async
     * @returns {Promise} Resolves when the dialog is open
     */
    async show(preventInitialFocus = false) {
        await super._open(preventInitialFocus);
    }
    get isModal() {
        return true;
    }
    get shouldHideBackdrop() {
        return false;
    }
    get _ariaLabelledBy() {
        let ariaLabelledById;
        if (this.headerText !== "" && !this._ariaLabel) {
            ariaLabelledById = "ui5-popup-header-text";
        }
        return ariaLabelledById;
    }
    get ariaRoleDescriptionHeaderText() {
        return (this.resizable || this.draggable) ? Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_ROLE_DESCRIPTION) : undefined;
    }
    get effectiveAriaDescribedBy() {
        return (this.resizable || this.draggable) ? `${this._id}-descr` : undefined;
    }
    get ariaDescribedByHeaderTextResizable() {
        return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE);
    }
    get ariaDescribedByHeaderTextDraggable() {
        return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE);
    }
    get ariaDescribedByHeaderTextDraggableAndResizable() {
        return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE);
    }
    get _displayProp() {
        return "flex";
    }
    /**
     * Determines if the header should be shown.
     */
    get _displayHeader() {
        return this.header.length || this.headerText || this.draggable || this.resizable;
    }
    get _movable() {
        return !this.stretch && this.onDesktop && (this.draggable || this.resizable);
    }
    get _headerTabIndex() {
        return this._movable ? "0" : undefined;
    }
    get _showResizeHandle() {
        return this.resizable && this.onDesktop;
    }
    get _minHeight() {
        let minHeight = Number.parseInt(window.getComputedStyle(this.contentDOM).minHeight);
        const header = this._root.querySelector(".ui5-popup-header-root");
        if (header) {
            minHeight += header.offsetHeight;
        }
        const footer = this._root.querySelector(".ui5-popup-footer-root");
        if (footer) {
            minHeight += footer.offsetHeight;
        }
        return minHeight;
    }
    get hasValueState() {
        return this.state !== ValueState$1.None;
    }
    get _dialogStateIcon() {
        return ICON_PER_STATE[this.state];
    }
    get _role() {
        if (this.accessibleRole === PopupAccessibleRole$1.None) {
            return undefined;
        }
        if (this.state === ValueState$1.Error || this.state === ValueState$1.Warning) {
            return PopupAccessibleRole$1.AlertDialog.toLowerCase();
        }
        return this.accessibleRole.toLowerCase();
    }
    _show() {
        super._show();
        this._center();
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        this._isRTL = this.effectiveDir === "rtl";
        this.onPhone = isPhone();
        this.onDesktop = isDesktop();
    }
    onAfterRendering() {
        if (!this.isOpen() && this.open) {
            this.show();
        }
        else if (this.isOpen() && !this.open) {
            this.close();
        }
    }
    onEnterDOM() {
        super.onEnterDOM();
        this._attachScreenResizeHandler();
        this.addEventListener("dragstart", this._dragStartHandler);
    }
    onExitDOM() {
        super.onExitDOM();
        this._detachScreenResizeHandler();
        this.removeEventListener("dragstart", this._dragStartHandler);
    }
    /**
     * @override
     */
    _resize() {
        super._resize();
        if (!this._draggedOrResized) {
            this._center();
        }
    }
    _screenResize() {
        this._center();
    }
    _attachScreenResizeHandler() {
        if (!this._screenResizeHandlerAttached) {
            window.addEventListener("resize", this._screenResizeHandler);
            this._screenResizeHandlerAttached = true;
        }
    }
    _detachScreenResizeHandler() {
        if (this._screenResizeHandlerAttached) {
            window.removeEventListener("resize", this._screenResizeHandler);
            this._screenResizeHandlerAttached = false; // prevent dialog from repositioning during resizing
        }
    }
    _center() {
        const height = window.innerHeight - this.offsetHeight, width = window.innerWidth - this.offsetWidth;
        Object.assign(this.style, {
            top: `${Math.round(height / 2)}px`,
            left: `${Math.round(width / 2)}px`,
        });
    }
    /**
     * Event handlers
     */
    _onDragMouseDown(e) {
        // allow dragging only on the header
        if (!this._movable || !this.draggable || !Dialog_1._isHeader(e.target)) {
            return;
        }
        e.preventDefault();
        const { top, left, } = this.getBoundingClientRect();
        const { width, height, } = window.getComputedStyle(this);
        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
            width: `${Math.round(Number.parseFloat(width) * 100) / 100}px`,
            height: `${Math.round(Number.parseFloat(height) * 100) / 100}px`,
        });
        this._x = e.clientX;
        this._y = e.clientY;
        this._draggedOrResized = true;
        this._attachMouseDragHandlers();
    }
    _onDragMouseMove(e) {
        e.preventDefault();
        const { clientX, clientY } = e;
        const calcX = this._x - clientX;
        const calcY = this._y - clientY;
        const { left, top, } = this.getBoundingClientRect();
        Object.assign(this.style, {
            left: `${Math.floor(left - calcX)}px`,
            top: `${Math.floor(top - calcY)}px`,
        });
        this._x = clientX;
        this._y = clientY;
    }
    _onDragMouseUp() {
        delete this._x;
        delete this._y;
        this._detachMouseDragHandlers();
    }
    _onDragOrResizeKeyDown(e) {
        if (!this._movable || !Dialog_1._isHeader(e.target)) {
            return;
        }
        if (this.draggable && [isUp, isDown, isLeft, isRight].some(key => key(e))) {
            this._dragWithEvent(e);
            return;
        }
        if (this.resizable && [isUpShift, isDownShift, isLeftShift, isRightShift].some(key => key(e))) {
            this._resizeWithEvent(e);
        }
    }
    _dragWithEvent(e) {
        const { top, left, width, height, } = this.getBoundingClientRect();
        let newPos = 0;
        let posDirection = "top";
        switch (true) {
            case isUp(e):
                newPos = top - STEP_SIZE;
                posDirection = "top";
                break;
            case isDown(e):
                newPos = top + STEP_SIZE;
                posDirection = "top";
                break;
            case isLeft(e):
                newPos = left - STEP_SIZE;
                posDirection = "left";
                break;
            case isRight(e):
                newPos = left + STEP_SIZE;
                posDirection = "left";
                break;
        }
        newPos = clamp(newPos, 0, posDirection === "left" ? window.innerWidth - width : window.innerHeight - height);
        this.style[posDirection] = `${newPos}px`;
    }
    _resizeWithEvent(e) {
        this._draggedOrResized = true;
        this.addEventListener("ui5-before-close", this._revertSize, { once: true });
        const { top, left } = this.getBoundingClientRect(), style = window.getComputedStyle(this), minWidth = Number.parseFloat(style.minWidth), maxWidth = window.innerWidth - left, maxHeight = window.innerHeight - top;
        let width = Number.parseFloat(style.width), height = Number.parseFloat(style.height);
        switch (true) {
            case isUpShift(e):
                height -= STEP_SIZE;
                break;
            case isDownShift(e):
                height += STEP_SIZE;
                break;
            case isLeftShift(e):
                width -= STEP_SIZE;
                break;
            case isRightShift(e):
                width += STEP_SIZE;
                break;
        }
        width = clamp(width, minWidth, maxWidth);
        height = clamp(height, this._minHeight, maxHeight);
        Object.assign(this.style, {
            width: `${width}px`,
            height: `${height}px`,
        });
    }
    _attachMouseDragHandlers() {
        window.addEventListener("mousemove", this._dragMouseMoveHandler);
        window.addEventListener("mouseup", this._dragMouseUpHandler);
    }
    _detachMouseDragHandlers() {
        window.removeEventListener("mousemove", this._dragMouseMoveHandler);
        window.removeEventListener("mouseup", this._dragMouseUpHandler);
    }
    _onResizeMouseDown(e) {
        if (!this._movable || !this.resizable) {
            return;
        }
        e.preventDefault();
        const { top, left, } = this.getBoundingClientRect();
        const { width, height, minWidth, } = window.getComputedStyle(this);
        this._initialX = e.clientX;
        this._initialY = e.clientY;
        this._initialWidth = Number.parseFloat(width);
        this._initialHeight = Number.parseFloat(height);
        this._initialTop = top;
        this._initialLeft = left;
        this._minWidth = Number.parseFloat(minWidth);
        this._cachedMinHeight = this._minHeight;
        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
        });
        this._draggedOrResized = true;
        this._attachMouseResizeHandlers();
    }
    _onResizeMouseMove(e) {
        const { clientX, clientY } = e;
        let newWidth, newLeft;
        if (this._isRTL) {
            newWidth = clamp(this._initialWidth - (clientX - this._initialX), this._minWidth, this._initialLeft + this._initialWidth);
            newLeft = clamp(this._initialLeft + (clientX - this._initialX), 0, this._initialX + this._initialWidth - this._minWidth);
        }
        else {
            newWidth = clamp(this._initialWidth + (clientX - this._initialX), this._minWidth, window.innerWidth - this._initialLeft);
        }
        const newHeight = clamp(this._initialHeight + (clientY - this._initialY), this._cachedMinHeight, window.innerHeight - this._initialTop);
        Object.assign(this.style, {
            height: `${newHeight}px`,
            width: `${newWidth}px`,
            left: newLeft ? `${newLeft}px` : undefined,
        });
    }
    _onResizeMouseUp() {
        delete this._initialX;
        delete this._initialY;
        delete this._initialWidth;
        delete this._initialHeight;
        delete this._initialTop;
        delete this._initialLeft;
        delete this._minWidth;
        delete this._cachedMinHeight;
        this._detachMouseResizeHandlers();
    }
    _handleDragStart(e) {
        if (this.draggable) {
            e.preventDefault();
        }
    }
    _attachMouseResizeHandlers() {
        window.addEventListener("mousemove", this._resizeMouseMoveHandler);
        window.addEventListener("mouseup", this._resizeMouseUpHandler);
        this.addEventListener("ui5-before-close", this._revertSize, { once: true });
    }
    _detachMouseResizeHandlers() {
        window.removeEventListener("mousemove", this._resizeMouseMoveHandler);
        window.removeEventListener("mouseup", this._resizeMouseUpHandler);
    }
};
__decorate$b([
    property()
], Dialog.prototype, "headerText", void 0);
__decorate$b([
    property({ type: Boolean })
], Dialog.prototype, "stretch", void 0);
__decorate$b([
    property({ type: Boolean })
], Dialog.prototype, "draggable", void 0);
__decorate$b([
    property({ type: Boolean })
], Dialog.prototype, "resizable", void 0);
__decorate$b([
    property({ type: ValueState$1, defaultValue: ValueState$1.None })
], Dialog.prototype, "state", void 0);
__decorate$b([
    property({ type: Boolean })
], Dialog.prototype, "onPhone", void 0);
__decorate$b([
    property({ type: Boolean })
], Dialog.prototype, "onDesktop", void 0);
__decorate$b([
    slot()
], Dialog.prototype, "header", void 0);
__decorate$b([
    slot()
], Dialog.prototype, "footer", void 0);
Dialog = Dialog_1 = __decorate$b([
    customElement({
        tag: "ui5-dialog",
        template: block0$a,
        styles: [
            styleData$g,
            styleData$f,
            styleData$d,
        ],
        dependencies: [
            Icon$1,
        ],
    })
], Dialog);
Dialog.define();
var Dialog$1 = Dialog;

/**
 * Different types of Title level.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.TitleLevel
 */
var TitleLevel;
(function (TitleLevel) {
    /**
     * Renders <code>h1</code> tag.
     * @public
     * @type {H1}
     */
    TitleLevel["H1"] = "H1";
    /**
     * Renders <code>h2</code> tag.
     * @public
     * @type {H2}
     */
    TitleLevel["H2"] = "H2";
    /**
     * Renders <code>h3</code> tag.
     * @public
     * @type {H3}
     */
    TitleLevel["H3"] = "H3";
    /**
     * Renders <code>h4</code> tag.
     * @public
     * @type {H4}
     */
    TitleLevel["H4"] = "H4";
    /**
     * Renders <code>h5</code> tag.
     * @public
     * @type {H5}
     */
    TitleLevel["H5"] = "H5";
    /**
     * Renders <code>h6</code> tag.
     * @public
     * @type {H6}
     */
    TitleLevel["H6"] = "H6";
})(TitleLevel || (TitleLevel = {}));
var TitleLevel$1 = TitleLevel;

/**
 * Different types of wrapping.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.WrappingType
 */
var WrappingType;
(function (WrappingType) {
    /**
     * The text will be truncated with an ellipsis.
     * @public
     * @type {None}
     */
    WrappingType["None"] = "None";
    /**
     * The text will wrap. The words will not be broken based on hyphenation.
     * @public
     * @type {Normal}
     */
    WrappingType["Normal"] = "Normal";
})(WrappingType || (WrappingType = {}));
var WrappingType$1 = WrappingType;

/* eslint no-unused-vars: 0 */
function block0$9(context, tags, suffix) { return effectiveHtml `${this.h1 ? block1$8.call(this, context, tags, suffix) : undefined}${this.h2 ? block2$8.call(this, context, tags, suffix) : undefined}${this.h3 ? block3$6.call(this, context, tags, suffix) : undefined}${this.h4 ? block4$3.call(this, context, tags, suffix) : undefined}${this.h5 ? block5$3.call(this, context, tags, suffix) : undefined}${this.h6 ? block6$2.call(this, context, tags, suffix) : undefined}`; }
function block1$8(context, tags, suffix) { return effectiveHtml `<h1 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h1>`; }
function block2$8(context, tags, suffix) { return effectiveHtml `<h2 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h2>`; }
function block3$6(context, tags, suffix) { return effectiveHtml `<h3 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h3>`; }
function block4$3(context, tags, suffix) { return effectiveHtml `<h4 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h4>`; }
function block5$3(context, tags, suffix) { return effectiveHtml `<h5 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h5>`; }
function block6$2(context, tags, suffix) { return effectiveHtml `<h6 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h6>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$c = { packageName: "@ui5/webcomponents", fileName: "themes/Title.css", content: ":host(:not([hidden])){cursor:text;display:block}:host{color:var(--sapGroup_TitleTextColor);font-family:\"72override\",var(--sapFontHeaderFamily);font-size:var(--sapFontHeader2Size);max-width:100%;text-shadow:var(--sapContent_TextShadow)}.ui5-title-root{-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0;box-sizing:border-box;cursor:inherit;display:inline-block;font-size:inherit;font-weight:400;margin:0;max-width:100%;overflow:hidden;position:relative;text-overflow:ellipsis;vertical-align:bottom;white-space:nowrap}:host([wrapping-type=Normal]) .ui5-title-root,:host([wrapping-type=Normal]) ::slotted(*){white-space:pre-line}::slotted(*){font-family:inherit;font-size:inherit;text-shadow:inherit}:host([level=H1]){font-size:var(--sapFontHeader1Size)}:host([level=H2]){font-size:var(--sapFontHeader2Size)}:host([level=H3]){font-size:var(--sapFontHeader3Size)}:host([level=H4]){font-size:var(--sapFontHeader4Size)}:host([level=H5]){font-size:var(--sapFontHeader5Size)}:host([level=H6]){font-size:var(--sapFontHeader6Size)}" };

var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-title</code> component is used to display titles inside a page.
 * It is a simple, large-sized text with explicit header/title semantics.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Title";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Title
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-title
 * @public
 */
let Title = class Title extends UI5Element {
    /**
     * Defines the text of the component.
     * This component supports nesting a <code>Link</code> component inside.
     * <br><br>
     * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @name sap.ui.webc.main.Title.prototype.default
     * @public
     */
    get normalizedLevel() {
        return this.level.toLowerCase();
    }
    get h1() {
        return this.normalizedLevel === "h1";
    }
    get h2() {
        return this.normalizedLevel === "h2";
    }
    get h3() {
        return this.normalizedLevel === "h3";
    }
    get h4() {
        return this.normalizedLevel === "h4";
    }
    get h5() {
        return this.normalizedLevel === "h5";
    }
    get h6() {
        return this.normalizedLevel === "h6";
    }
};
__decorate$a([
    property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], Title.prototype, "wrappingType", void 0);
__decorate$a([
    property({ type: TitleLevel$1, defaultValue: TitleLevel$1.H2 })
], Title.prototype, "level", void 0);
Title = __decorate$a([
    customElement({
        tag: "ui5-title",
        renderer: litRender,
        template: block0$9,
        styles: styleData$c,
    })
], Title);
Title.define();
var Title$1 = Title;

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$b = { packageName: "@ui5/webcomponents", fileName: "themes/ResponsivePopover.css", content: ":host{--_ui5-v1-18-0_input_width:100%;min-height:2rem;min-width:6.25rem}:host([opened]){display:inline-block}.ui5-responsive-popover-header{align-items:center;display:flex;height:var(--_ui5-v1-18-0-responsive_popover_header_height);justify-content:space-between;width:100%}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5-v1-18-0_button_base_min_width))}.ui5-responsive-popover-header-no-title{justify-content:flex-end}" };

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResponsivePopover_1;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-responsive-popover</code> acts as a Popover on desktop and tablet, while on phone it acts as a Dialog.
 * The component improves tremendously the user experience on mobile.
 *
 * <h3>Usage</h3>
 * Use it when you want to make sure that all the content is visible on any device.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-responsive-popover</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>header - Used to style the header of the component</li>
 * <li>content - Used to style the content of the component</li>
 * <li>footer - Used to style the footer of the component</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ResponsivePopover
 * @extends sap.ui.webc.main.Popover
 * @tagname ui5-responsive-popover
 * @since 1.0.0-rc.6
 * @public
 */
let ResponsivePopover = ResponsivePopover_1 = class ResponsivePopover extends Popover$1 {
    constructor() {
        super();
    }
    /**
     * Shows popover on desktop and dialog on mobile.
     * @param {HTMLElement} opener the element that the popover is shown at
     * @param {boolean} [preventInitialFocus=false] Prevents applying the focus inside the popup
     * @public
     * @async
     * @method
     * @name sap.ui.webc.main.ResponsivePopover#showAt
     * @returns {Promise} Resolves when the responsive popover is open
     */
    async showAt(opener, preventInitialFocus = false) {
        if (!isPhone()) {
            await super.showAt(opener, preventInitialFocus);
        }
        else {
            this.style.display = "contents";
            const nextZIndex = getNextZIndex();
            if (!nextZIndex) {
                return;
            }
            this.style.zIndex = nextZIndex.toString();
            await this._dialog.show(preventInitialFocus);
        }
    }
    /**
     * Closes the popover/dialog.
     * @public
     * @method
     * @name sap.ui.webc.main.ResponsivePopover#close
     * @returns {void}
     */
    close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
        if (!isPhone()) {
            super.close(escPressed, preventRegistryUpdate, preventFocusRestore);
        }
        else {
            this._dialog.close(escPressed, preventRegistryUpdate, preventFocusRestore);
        }
    }
    toggle(opener) {
        if (this.isOpen()) {
            return this.close();
        }
        this.showAt(opener);
    }
    /**
     * Tells if the responsive popover is open.
     * @public
     * @method
     * @name sap.ui.webc.main.ResponsivePopover#isOpen
     * @returns {boolean}
     */
    isOpen() {
        return (isPhone() && this._dialog) ? this._dialog.isOpen() : super.isOpen();
    }
    get classes() {
        const allClasses = super.classes;
        allClasses.header = {
            "ui5-responsive-popover-header": true,
            "ui5-responsive-popover-header-no-title": !this.headerText,
        };
        return allClasses;
    }
    get _dialog() {
        return this.shadowRoot.querySelector("[ui5-dialog]");
    }
    get contentDOM() {
        return isPhone() ? this._dialog.contentDOM : super.contentDOM;
    }
    get _isPhone() {
        return isPhone();
    }
    get _displayHeader() {
        return (isPhone() || !this.contentOnlyOnDesktop) && super._displayHeader;
    }
    get _displayFooter() {
        return isPhone() || !this.contentOnlyOnDesktop;
    }
    get _closeDialogAriaLabel() {
        return ResponsivePopover_1.i18nBundle.getText(RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
    }
    _beforeDialogOpen(e) {
        this.open = true;
        this.opened = true;
        this._propagateDialogEvent(e);
    }
    _afterDialogClose(e) {
        this.open = false;
        this.opened = false;
        this._propagateDialogEvent(e);
    }
    _propagateDialogEvent(e) {
        const type = e.type.replace("ui5-", "");
        this.fireEvent(type, e.detail);
    }
    get isModal() {
        if (!isPhone()) {
            return super.isModal;
        }
        return this._dialog.isModal;
    }
    static async onDefine() {
        ResponsivePopover_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate$9([
    property({ type: Boolean })
], ResponsivePopover.prototype, "contentOnlyOnDesktop", void 0);
__decorate$9([
    property({ type: Boolean })
], ResponsivePopover.prototype, "_hideHeader", void 0);
__decorate$9([
    property({ type: Boolean })
], ResponsivePopover.prototype, "_hideCloseButton", void 0);
ResponsivePopover = ResponsivePopover_1 = __decorate$9([
    customElement({
        tag: "ui5-responsive-popover",
        styles: [Popover$1.styles, styleData$b],
        template: block0$e,
        dependencies: [
            ...Popover$1.dependencies,
            Button$1,
            Dialog$1,
            Title$1,
        ],
    })
], ResponsivePopover);
ResponsivePopover.define();
var ResponsivePopover$1 = ResponsivePopover;

const getDaysInMonth = (date) => {
    const tempCalendarDate = new CalendarDate$1(date);
    tempCalendarDate.setDate(1);
    tempCalendarDate.setMonth(tempCalendarDate.getMonth() + 1);
    tempCalendarDate.setDate(0);
    return tempCalendarDate.getDate();
};

const transformDateToSecondaryType = (primaryCalendarType, secondaryCalendarType, timeStamp, hasYearPicker) => {
    let firstDate = CalendarDate$1.fromLocalJSDate(UI5Date.getInstance(timeStamp * 1000), primaryCalendarType);
    let lastDate = CalendarDate$1.fromLocalJSDate(UI5Date.getInstance(timeStamp * 1000), primaryCalendarType);
    firstDate.setDate(1);
    if (hasYearPicker) {
        firstDate.setMonth(0);
        lastDate.setMonth(11);
    }
    lastDate.setDate(getDaysInMonth(lastDate));
    firstDate = new CalendarDate$1(firstDate, secondaryCalendarType);
    lastDate = new CalendarDate$1(lastDate, secondaryCalendarType);
    return { firstDate, lastDate };
};

/**
 * Convert month number to month name (text).
 * If the numbers of the two months are the same you will get the name of the month,
 * otherwise you will get the two names separated by a dash
 *
 * @param firstMonth CalendarDate Month
 * @param lastMonth CalendarDate Month
 * @param calendarType calendar type
 * @returns {String}
 */
const convertMonthNumbersToMonthNames = (firstMonth, lastMonth, calendarType) => {
    const localeData = getCachedLocaleDataInstance(getLocale());
    const pattern = localeData.getIntervalPattern("");
    const secondaryMonthsNames = localeData.getMonthsStandAlone("abbreviated", calendarType);
    const secondaryMonthsNamesWide = localeData.getMonthsStandAlone("wide", calendarType);
    if (firstMonth === lastMonth) {
        return {
            text: localeData.getMonths("abbreviated", calendarType)[firstMonth],
            textInfo: localeData.getMonths("wide", calendarType)[firstMonth],
        };
    }
    return {
        text: pattern.replace(/\{0\}/, secondaryMonthsNames[firstMonth]).replace(/\{1\}/, secondaryMonthsNames[lastMonth]),
        textInfo: pattern.replace(/\{0\}/, secondaryMonthsNamesWide[firstMonth]).replace(/\{1\}/, secondaryMonthsNamesWide[lastMonth]),
    };
};

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-date</code> component defines a calendar date to be used inside <code>ui5-calendar</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CalendarDate
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-date
 * @implements sap.ui.webc.main.ICalendarDate
 * @public
 */
let CalendarDate = class CalendarDate extends UI5Element {
};
__decorate$8([
    property()
], CalendarDate.prototype, "value", void 0);
CalendarDate = __decorate$8([
    customElement("ui5-date")
], CalendarDate);
CalendarDate.define();
var CalendarDateComponent = CalendarDate;

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 *
 * Abstract base class for Calendar, DayPicker, MonthPicker and YearPicker that adds support for:
 *  - common properties (timestamp, selectedDates): declarations and methods that operate on them
 *  - other common code
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CalendarPart
 * @extends sap.ui.webc.main.DateComponentBase
 * @public
 */
class CalendarPart extends DateComponentBase$1 {
    get _minTimestamp() {
        return this._minDate.valueOf() / 1000;
    }
    get _maxTimestamp() {
        return this._maxDate.valueOf() / 1000;
    }
    /**
     * Returns the effective timestamp to be used by the respective calendar part
     * @protected
     */
    get _timestamp() {
        let timestamp = this.timestamp !== undefined ? this.timestamp : getTodayUTCTimestamp(this._primaryCalendarType);
        if (this._maxTimestamp && this._maxTimestamp < timestamp) {
            timestamp = this._maxTimestamp;
        }
        else if (this._minTimestamp && this._minTimestamp > timestamp) {
            timestamp = this._minTimestamp;
        }
        return timestamp;
    }
    get _localDate() {
        return new Date(this._timestamp * 1000);
    }
    /**
     * Returns a CalendarDate instance, representing the _timestamp getter - this date is central to all components' rendering logic
     * @protected
     */
    get _calendarDate() {
        return CalendarDate$1.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
    }
    /**
     * Change a timestamp and enforce limits
     *
     * @param timestamp
     * @protected
     */
    _safelySetTimestamp(timestamp) {
        const min = this._minDate.valueOf() / 1000;
        const max = this._maxDate.valueOf() / 1000;
        if (timestamp < min) {
            timestamp = min;
        }
        if (timestamp > max) {
            timestamp = max;
        }
        this.timestamp = timestamp;
    }
    /**
     * Modify a timestamp by a certain amount of days/months/years and enforce limits
     * @param amount
     * @param unit
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @protected
     */
    _safelyModifyTimestampBy(amount, unit, preserveDate) {
        const newDate = modifyDateBy(this._calendarDate, amount, unit, preserveDate);
        this._safelySetTimestamp(newDate.valueOf() / 1000);
    }
    _getTimestampFromDom(domNode) {
        const oMonthDomRef = domNode.getAttribute("data-sap-timestamp");
        return parseInt(oMonthDomRef);
    }
}
__decorate$7([
    property({ validator: Integer })
], CalendarPart.prototype, "timestamp", void 0);

const name$5 = "slim-arrow-left";
const pathData$5 = "M351.5 421q12 12 0 23-5 5-11 5t-11-5l-166-165q-9-10-9-23t9-23l165-164q5-5 11.5-5t11.5 5 5 11-5 11l-159 159q-6 6 0 12z";
const ltr$5 = false;
const collection$5 = "SAP-icons-v4";
const packageName$5 = "@ui5/webcomponents-icons";

registerIcon(name$5, { pathData: pathData$5, ltr: ltr$5, collection: collection$5, packageName: packageName$5 });

const name$4 = "slim-arrow-left";
const pathData$4 = "M326 96q11 0 18.5 7.5T352 122q0 10-8 18L223 256l121 116q8 8 8 18 0 11-7.5 18.5T326 416q-10 0-17-7L168 274q-8-6-8-18 0-11 8-19l141-134q7-7 17-7z";
const ltr$4 = false;
const collection$4 = "SAP-icons-v5";
const packageName$4 = "@ui5/webcomponents-icons";

registerIcon(name$4, { pathData: pathData$4, ltr: ltr$4, collection: collection$4, packageName: packageName$4 });

isLegacyThemeFamily() ? pathData$5 : pathData$4;

const name$3 = "slim-arrow-right";
const pathData$3 = "M357.5 233q10 10 10 23t-10 23l-165 165q-12 11-23 0t0-23l160-159q6-6 0-12l-159-159q-5-5-5-11t5-11 11-5 11 5z";
const ltr$3 = false;
const collection$3 = "SAP-icons-v4";
const packageName$3 = "@ui5/webcomponents-icons";

registerIcon(name$3, { pathData: pathData$3, ltr: ltr$3, collection: collection$3, packageName: packageName$3 });

const name$2 = "slim-arrow-right";
const pathData$2 = "M186 416q-11 0-18.5-7.5T160 390q0-10 8-18l121-116-121-116q-8-8-8-18 0-11 7.5-18.5T186 96q10 0 17 7l141 134q8 8 8 19 0 12-8 18L203 409q-7 7-17 7z";
const ltr$2 = false;
const collection$2 = "SAP-icons-v5";
const packageName$2 = "@ui5/webcomponents-icons";

registerIcon(name$2, { pathData: pathData$2, ltr: ltr$2, collection: collection$2, packageName: packageName$2 });

isLegacyThemeFamily() ? pathData$3 : pathData$2;

/* eslint no-unused-vars: 0 */
function block0$8(context, tags, suffix) { return suffix ? effectiveHtml `<div class="ui5-calheader-root"><div data-ui5-cal-header-btn-prev class="${o$2(this.classes.prevButton)}" role="button" @mousedown=${this.onPrevButtonClick} title="${l$1(this._prevButtonText)}"><${scopeTag("ui5-icon", tags, suffix)} class="ui5-calheader-arrowicon" name="slim-arrow-left"></${scopeTag("ui5-icon", tags, suffix)}></div><div class="ui5-calheader-midcontainer"><div data-ui5-cal-header-btn-month class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" ?hidden="${this.isMonthButtonHidden}" tabindex="0" role="button" aria-label="${l$1(this.accInfo.ariaLabelMonthButton)}" @click=${this.onMonthButtonClick} @keydown=${this.onMonthButtonKeyDown} @keyup=${this.onMonthButtonKeyUp}><span>${l$1(this._monthButtonText)}</span>${this.hasSecondaryCalendarType ? block1$7.call(this, context, tags, suffix) : undefined}</div><div data-ui5-cal-header-btn-year class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" ?hidden="${this.isYearButtonHidden}" tabindex="0" role="button" @click=${this.onYearButtonClick} @keydown=${this.onYearButtonKeyDown} @keyup=${this.onYearButtonKeyUp}><span>${l$1(this._yearButtonText)}</span>${this.hasSecondaryCalendarType ? block2$7.call(this, context, tags, suffix) : undefined}</div></div><div data-ui5-cal-header-btn-next class="${o$2(this.classes.nextButton)}" role="button" @mousedown=${this.onNextButtonClick} title=${l$1(this._nextButtonText)}><${scopeTag("ui5-icon", tags, suffix)} class="ui5-calheader-arrowicon" name="slim-arrow-right"></${scopeTag("ui5-icon", tags, suffix)}></div></div>` : effectiveHtml `<div class="ui5-calheader-root"><div data-ui5-cal-header-btn-prev class="${o$2(this.classes.prevButton)}" role="button" @mousedown=${this.onPrevButtonClick} title="${l$1(this._prevButtonText)}"><ui5-icon class="ui5-calheader-arrowicon" name="slim-arrow-left"></ui5-icon></div><div class="ui5-calheader-midcontainer"><div data-ui5-cal-header-btn-month class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" ?hidden="${this.isMonthButtonHidden}" tabindex="0" role="button" aria-label="${l$1(this.accInfo.ariaLabelMonthButton)}" @click=${this.onMonthButtonClick} @keydown=${this.onMonthButtonKeyDown} @keyup=${this.onMonthButtonKeyUp}><span>${l$1(this._monthButtonText)}</span>${this.hasSecondaryCalendarType ? block1$7.call(this, context, tags, suffix) : undefined}</div><div data-ui5-cal-header-btn-year class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" ?hidden="${this.isYearButtonHidden}" tabindex="0" role="button" @click=${this.onYearButtonClick} @keydown=${this.onYearButtonKeyDown} @keyup=${this.onYearButtonKeyUp}><span>${l$1(this._yearButtonText)}</span>${this.hasSecondaryCalendarType ? block2$7.call(this, context, tags, suffix) : undefined}</div></div><div data-ui5-cal-header-btn-next class="${o$2(this.classes.nextButton)}" role="button" @mousedown=${this.onNextButtonClick} title=${l$1(this._nextButtonText)}><ui5-icon class="ui5-calheader-arrowicon" name="slim-arrow-right"></ui5-icon></div></div>`; }
function block1$7(context, tags, suffix) { return effectiveHtml `<span class="ui5-calheader-btn-sectext">${l$1(this._secondMonthButtonText)}</span>`; }
function block2$7(context, tags, suffix) { return effectiveHtml `<span class="ui5-calheader-btn-sectext">${l$1(this._yearButtonTextSecType)}</span>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$a = { packageName: "@ui5/webcomponents", fileName: "themes/CalendarHeader.css", content: ":host{display:block;height:100%;width:100%}.ui5-calheader-root{box-sizing:border-box;display:flex;height:100%;padding:var(--_ui5-v1-18-0_calendar_header_padding)}.ui5-calheader-arrowbtn{align-items:center;background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);cursor:pointer;display:flex;font-size:var(--sapFontSize);justify-content:center;overflow:hidden;padding:0;user-select:none;white-space:nowrap;width:var(--_ui5-v1-18-0_calendar_header_arrow_button_width)}.ui5-calheader-arrowbtn.ui5-calheader-arrowbtn-disabled,.ui5-calheader-arrowbtn.ui5-calheader-arrowbtn-disabled:active,.ui5-calheader-arrowbtn.ui5-calheader-arrowbtn-disabled:focus,.ui5-calheader-arrowbtn.ui5-calheader-arrowbtn-disabled:hover{background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);cursor:default;opacity:.4;outline:none}[hidden].ui5-calheader-arrowbtn.ui5-calheader-middlebtn{display:none}.ui5-calheader-arrowbtn:focus{outline:none}.ui5-calheader-arrowbtn:hover{background-color:var(--sapButton_Hover_Background);box-shadow:var(--_ui5-v1-18-0_calendar_header_arrow_button_box_shadow);color:var(--sapButton_Lite_TextColor)}.ui5-calheader-arrowbtn:active{background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor)}.ui5-calheader-arrowbtn,.ui5-calheader-middlebtn{background-color:var(--sapButton_Lite_Background);border:var(--_ui5-v1-18-0_calendar_header_arrow_button_border);border-color:var(--sapButton_Lite_BorderColor);border-radius:var(--_ui5-v1-18-0_calendar_header_arrow_button_border_radius);display:flex}.ui5-calheader-middlebtn{align-items:center;flex-direction:column;justify-content:center}.ui5-calheader-arrowbtn:not(:active) .ui5-calheader-btn-sectext{color:var(--sapNeutralElementColor);font-size:var(--sapFontSmallSize)}.ui5-calheader-arrowicon{color:currentColor;pointer-events:none}.ui5-calheader-midcontainer{display:flex;flex:1 1 auto;justify-content:space-around;padding:0 .5rem}.ui5-calheader-midcontainer .ui5-calheader-middlebtn:first-child{margin-inline-end:.5rem}.ui5-calheader-middlebtn{box-sizing:border-box;flex:var(--_ui5-v1-18-0_calendar_header_middle_button_flex);font-family:var(--_ui5-v1-18-0_button_fontFamily);position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:var(--_ui5-v1-18-0_calendar_header_middle_button_width)}.ui5-calheader-middlebtn:focus{background:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_background);border:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_border);border-radius:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_border_radius);outline:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_outline);outline-offset:-.125rem}.ui5-calheader-middlebtn:focus:active{background:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_active_background);outline:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_active_outline);outline-offset:-.0625rem}.ui5-calheader-middlebtn:focus:after{border:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_after_border);content:\"\";display:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_after_display);height:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_after_height);left:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_after_left_offset);position:absolute;top:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_after_top_offset);width:var(--_ui5-v1-18-0_calendar_header_middle_button_focus_after_width)}.ui5-calheader-middlebtn:focus:active:after{border-color:var(--sapContent_ContrastFocusColor)}" };

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CalendarHeader_1;
let CalendarHeader = CalendarHeader_1 = class CalendarHeader extends UI5Element {
    static async onDefine() {
        CalendarHeader_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    constructor() {
        super();
    }
    onBeforeRendering() {
        this._prevButtonText = CalendarHeader_1.i18nBundle.getText(CALENDAR_HEADER_PREVIOUS_BUTTON);
        this._nextButtonText = CalendarHeader_1.i18nBundle.getText(CALENDAR_HEADER_NEXT_BUTTON);
        if (this.hasSecondaryCalendarType) {
            this._secondMonthButtonText = this.buttonTextForSecondaryCalendarType.monthButtonText;
            this._secondYearButtonText = this.buttonTextForSecondaryCalendarType.yearButtonText;
        }
    }
    onPrevButtonClick(e) {
        if (this.isPrevButtonDisabled) {
            e.preventDefault();
            return;
        }
        this.fireEvent("previous-press", e);
        e.preventDefault();
    }
    onNextButtonClick(e) {
        if (this.isNextButtonDisabled) {
            e.preventDefault();
            return;
        }
        this.fireEvent("next-press", e);
        e.preventDefault();
    }
    onMonthButtonClick(e) {
        this.fireEvent("show-month-press", e);
    }
    onMonthButtonKeyDown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this.fireEvent("show-month-press", e);
        }
    }
    onMonthButtonKeyUp(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this.fireEvent("show-month-press", e);
        }
    }
    onYearButtonClick(e) {
        this.fireEvent("show-year-press", e);
    }
    onYearButtonKeyDown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this.fireEvent("show-year-press", e);
        }
    }
    onYearButtonKeyUp(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this.fireEvent("show-year-press", e);
        }
    }
    get hasSecondaryCalendarType() {
        return !!this.secondaryCalendarType;
    }
    get classes() {
        return {
            prevButton: {
                "ui5-calheader-arrowbtn": true,
                "ui5-calheader-arrowbtn-disabled": this.isPrevButtonDisabled,
            },
            nextButton: {
                "ui5-calheader-arrowbtn": true,
                "ui5-calheader-arrowbtn-disabled": this.isNextButtonDisabled,
            },
        };
    }
    get accInfo() {
        return {
            ariaLabelMonthButton: this.hasSecondaryCalendarType
                ? `${this._monthButtonText}, ${this.buttonTextForSecondaryCalendarType.monthButtonInfo}` : `${this._monthButtonText}`,
        };
    }
};
__decorate$6([
    property({ validator: Integer })
], CalendarHeader.prototype, "timestamp", void 0);
__decorate$6([
    property({ type: CalendarType$2 })
], CalendarHeader.prototype, "primaryCalendarType", void 0);
__decorate$6([
    property({ type: CalendarType$2 })
], CalendarHeader.prototype, "secondaryCalendarType", void 0);
__decorate$6([
    property({ type: Object })
], CalendarHeader.prototype, "buttonTextForSecondaryCalendarType", void 0);
__decorate$6([
    property({ type: Boolean })
], CalendarHeader.prototype, "isNextButtonDisabled", void 0);
__decorate$6([
    property({ type: Boolean })
], CalendarHeader.prototype, "isPrevButtonDisabled", void 0);
__decorate$6([
    property({ type: Boolean })
], CalendarHeader.prototype, "isMonthButtonHidden", void 0);
__decorate$6([
    property()
], CalendarHeader.prototype, "_monthButtonText", void 0);
__decorate$6([
    property()
], CalendarHeader.prototype, "_yearButtonText", void 0);
__decorate$6([
    property()
], CalendarHeader.prototype, "_yearButtonTextSecType", void 0);
__decorate$6([
    property({ type: Boolean })
], CalendarHeader.prototype, "isYearButtonHidden", void 0);
CalendarHeader = CalendarHeader_1 = __decorate$6([
    customElement({
        tag: "ui5-calendar-header",
        languageAware: true,
        renderer: litRender,
        template: block0$8,
        styles: styleData$a,
        dependencies: [Icon$1],
    }),
    event("next-press"),
    event("previous-press"),
    event("show-month-press"),
    event("show-year-press")
], CalendarHeader);
CalendarHeader.define();
var CalendarHeader$1 = CalendarHeader;

const calculateWeekNumber = (confFirstDayOfWeek, oDate, iYear, oLocale, oLocaleData) => {
    let iWeekNum = 0;
    let iWeekDay = 0;
    const iFirstDayOfWeek = Number.isInteger(confFirstDayOfWeek) ? confFirstDayOfWeek : oLocaleData.getFirstDayOfWeek();
    // search Locale for containing "en-US", since sometimes
    // when any user settings have been defined, subtag "sapufmt" is added to the locale name
    // this is described inside sap.ui.core.Configuration file
    if (oLocale && (oLocale.getLanguage() === "en" && oLocale.getRegion() === "US")) {
        /*
            * in US the week starts with Sunday
            * The first week of the year starts with January 1st. But Dec. 31 is still in the last year
            * So the week beginning in December and ending in January has 2 week numbers
            */
        const oJanFirst = new UniversalDate(oDate.getTime());
        oJanFirst.setUTCFullYear(iYear, 0, 1);
        iWeekDay = oJanFirst.getUTCDay();
        // get the date for the same weekday like jan 1.
        const oCheckDate = new UniversalDate(oDate.getTime());
        oCheckDate.setUTCDate(oCheckDate.getUTCDate() - oCheckDate.getUTCDay() + iWeekDay);
        iWeekNum = Math.round((oCheckDate.getTime() - oJanFirst.getTime()) / 86400000 / 7) + 1;
    }
    else {
        // normally the first week of the year is the one where the first Thursday of the year is
        // find Thursday of this week
        // if the checked day is before the 1. day of the week use a day of the previous week to check
        const oThursday = new UniversalDate(oDate.getTime());
        oThursday.setUTCDate(oThursday.getUTCDate() - iFirstDayOfWeek);
        iWeekDay = oThursday.getUTCDay();
        oThursday.setUTCDate(oThursday.getUTCDate() - iWeekDay + 4);
        const oFirstDayOfYear = new UniversalDate(oThursday.getTime());
        oFirstDayOfYear.setUTCMonth(0, 1);
        iWeekDay = oFirstDayOfYear.getUTCDay();
        let iAddDays = 0;
        if (iWeekDay > 4) {
            iAddDays = 7; // first day of year is after Thursday, so first Thursday is in the next week
        }
        const oFirstThursday = new UniversalDate(oFirstDayOfYear.getTime());
        oFirstThursday.setUTCDate(1 - iWeekDay + 4 + iAddDays);
        iWeekNum = Math.round((oThursday.getTime() - oFirstThursday.getTime()) / 86400000 / 7) + 1;
    }
    return iWeekNum;
};

/**
 * Different Calendar selection mode.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CalendarSelectionMode
 */
var CalendarSelectionMode;
(function (CalendarSelectionMode) {
    /**
     * Only one date can be selected at a time
     * @public
     * @type {Single}
     */
    CalendarSelectionMode["Single"] = "Single";
    /**
     * Several dates can be selected
     * @public
     * @type {Multiple}
     */
    CalendarSelectionMode["Multiple"] = "Multiple";
    /**
     * A range defined by a start date and an end date can be selected
     * @public
     * @type {Range}
     */
    CalendarSelectionMode["Range"] = "Range";
})(CalendarSelectionMode || (CalendarSelectionMode = {}));
var CalendarSelectionMode$1 = CalendarSelectionMode;

/* eslint no-unused-vars: 0 */
function block0$7(context, tags, suffix) { return effectiveHtml `<div class="ui5-dp-root" style="${styleMap(this.styles.wrapper)}" @keydown=${this._onkeydown} @keyup=${this._onkeyup} @click=${this._onclick} @mouseover=${this._onmouseover} @focusin=${this._onfocusin} @focusout=${this._onfocusout}><div id="${l$1(this._id)}-content" class="ui5-dp-content" role="grid" aria-roledescription="${l$1(this.ariaRoledescription)}"><div role="row" class="ui5-dp-days-names-container">${c(this._dayNames, (item, index) => item._id || index, (item, index) => block1$6.call(this, context, tags, suffix, item, index))}</div>${c(this._weeks, (item, index) => item._id || index, (item, index) => block2$6.call(this, context, tags, suffix, item, index))}</div></div>`; }
function block1$6(context, tags, suffix, item, index) { return effectiveHtml `<div role="columnheader" aria-label="${l$1(item.name)}" class="${l$1(item.classes)}">${l$1(item.ultraShortName)}</div>`; }
function block2$6(context, tags, suffix, item, index) { return effectiveHtml `${item.length ? block3$5.call(this, context, tags, suffix, item, index) : block9$1.call(this, context, tags, suffix, item, index)}`; }
function block3$5(context, tags, suffix, item, index) { return effectiveHtml `<div class="ui5-dp-weeks-row" role="row">${c(item, (item, index) => item._id || index, (item, index) => block4$2.call(this, context, tags, suffix, item, index))}</div>`; }
function block4$2(context, tags, suffix, item, index) { return effectiveHtml `${item.timestamp ? block5$2.call(this, context, tags, suffix, item, index) : block7$1.call(this, context, tags, suffix, item, index)}`; }
function block5$2(context, tags, suffix, item, index) { return effectiveHtml `<div tabindex="${l$1(item._tabIndex)}" ?data-sap-focus-ref="${item.focusRef}" data-sap-timestamp="${l$1(item.timestamp)}" role="gridcell" aria-selected="${l$1(item.ariaSelected)}" aria-label="${l$1(item.ariaLabel)}" aria-disabled="${l$1(item.ariaDisabled)}" class="${l$1(item.classes)}"><span class="ui5-dp-daytext" data-sap-timestamp="${l$1(item.timestamp)}">${l$1(item.day)}</span>${item._isSecondaryCalendarType ? block6$1.call(this, context, tags, suffix, item, index) : undefined}</div>`; }
function block6$1(context, tags, suffix, item, index) { return effectiveHtml `<span class="ui5-dp-daytext ui5-dp-daysectext">${l$1(item.secondDay)}</span>`; }
function block7$1(context, tags, suffix, item, index) { return effectiveHtml `${!item.isHidden ? block8$1.call(this, context, tags, suffix, item, index) : undefined}`; }
function block8$1(context, tags, suffix, item, index) { return effectiveHtml `<div class="ui5-dp-weekname-container" role="rowheader" aria-label="Calendar Week ${l$1(item.weekNum)}"><span class="ui5-dp-weekname">${l$1(item.weekNum)}</span></div>`; }
function block9$1(context, tags, suffix, item, index) { return effectiveHtml `<div class="sapWCEmptyWeek"></div>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$9 = { packageName: "@ui5/webcomponents", fileName: "themes/DayPicker.css", content: ":host(:not([hidden])){display:block}:host{height:100%;width:100%}:host([hide-week-numbers]) .ui5-dp-content{flex-basis:100%}:host([secondary-calendar-type]) .ui5-dp-item{flex-direction:column;justify-content:var(--_ui5-v1-18-0_day_picker_item_justify_content)}:host([secondary-calendar-type]) .ui5-dp-daytext{height:1.575rem;padding-top:var(--_ui5-v1-18-0_dp_two_calendar_item_text_padding_top)}:host([secondary-calendar-type]) .ui5-dp-daysectext{font-size:.625rem;height:var(--_ui5-v1-18-0_dp_two_calendar_item_secondary_text_height);padding:0 .375rem .375rem 50%}.ui5-dp-dayname,.ui5-dp-item,.ui5-dp-weekname{border-radius:var(--_ui5-v1-18-0_daypicker_item_border_radius);font-family:\"72override\",var(--sapFontFamily);height:var(--_ui5-v1-18-0_day_picker_item_height);margin-right:var(--_ui5-v1-18-0_daypicker_item_margin);margin-top:var(--_ui5-v1-18-0_daypicker_item_margin);width:var(--_ui5-v1-18-0_day_picker_item_width)}.ui5-dp-weekname{color:var(--_ui5-v1-18-0_daypicker_weekname_color)}.ui5-dp-weeks-row{display:flex}.ui5-dp-content{display:flex;flex-basis:87.5%;flex-direction:column;font-family:\"72override\",var(--sapFontFamily)}.ui5-dp-days-names-container{display:flex;height:var(--_ui5-v1-18-0_daypicker_daynames_container_height)}.ui5-dp-weeknumber-container{flex-basis:12.5%;padding-top:var(--_ui5-v1-18-0_daypicker_weeknumbers_container_padding_top)}.ui5-dp-dayname,.ui5-dp-item,.ui5-dp-weekname,.ui5-dp-weekname-container{align-items:center;box-sizing:border-box;display:flex;flex-grow:1;font-size:var(--sapFontSmallSize);justify-content:center;outline:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.ui5-dp-item{background:var(--sapLegend_WorkingBackground);border:var(--_ui5-v1-18-0_daypicker_item_border);border-radius:var(--_ui5-v1-18-0_daypicker_item_border_radius);color:var(--sapTextColor);font-size:var(--sapFontSize);position:relative}.ui5-dp-item:hover{background:var(--sapList_Hover_Background)}.ui5-dp-daytext{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:center;width:100%}.ui5-dp-dayname{color:var(--_ui5-v1-18-0_daypicker_dayname_color);height:100%}.ui5-dp-item.ui5-dp-item--weeekend{background:var(--sapLegend_NonWorkingBackground)}.ui5-dp-item.ui5-dp-item--disabled{opacity:.5;pointer-events:none}.ui5-dp-item.ui5-dp-item--weeekend:hover{background:var(--sapList_Hover_Background);filter:var(--_ui5-v1-18-0_daypicker_item_weeekend_filter)}.ui5-dp-item.ui5-dp-item--othermonth{background:var(--_ui5-v1-18-0_daypicker_item_othermonth_background_color);border-color:transparent;color:var(--_ui5-v1-18-0_daypicker_item_othermonth_color)}.ui5-dp-item.ui5-dp-item--othermonth:hover,.ui5-dp-item.ui5-dp-item--weeekend.ui5-dp-item--othermonth:hover{background:var(--sapList_Hover_Background);color:var(--_ui5-v1-18-0_daypicker_item_othermonth_hover_color)}.ui5-dp-item:focus:after{border:var(--_ui5-v1-18-0_daypicker_item_not_selected_focus_border);border-radius:var(--_ui5-v1-18-0_daypicker_item_border_radius_focus_after);content:\"\";inset:var(--_ui5-v1-18-0_daypicker_item_no_selected_inset);outline:none;position:absolute}.ui5-dp-item.ui5-dp-item--now:before{border:.125rem solid var(--_ui5-v1-18-0_daypicker_item_now_border_color);border-radius:var(--_ui5-v1-18-0_daypicker_item_border_radius);content:\"\";inset:var(--_ui5-v1-18-0_daypicker_item_now_not_selected_inset);position:absolute}.ui5-dp-item.ui5-dp-item--now.ui5-dp-item--selected{box-shadow:var(--_ui5-v1-18-0_daypicker_item_now_box_shadow)}.ui5-dp-item.ui5-dp-item--selected{background:var(--sapContent_Selected_Background)}.ui5-dp-item.ui5-dp-item--selected:not(.ui5-dp-item.ui5-dp-item--now) .ui5-dp-daytext:after{border:var(--_ui5-v1-18-0_daypicker_item_selected_border);border-radius:var(--_ui5-v1-18-0_daypicker_item_border_radius_item);content:\"\";inset:0;position:absolute}.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item.ui5-dp-item--now .ui5-dp-daytext{border:var(--_ui5-v1-18-0_day_picker_item_selected_now_border);border-radius:var(--_ui5-v1-18-0_daypicker_item_border_radius_item);font-family:var(--_ui5-v1-18-0_daypicker_item_selected_text_font);outline:var(--_ui5-v1-18-0_daypicker_item_selected_text_outline);outline-offset:var(--_ui5-v1-18-0_daypicker_item_now_selected_outline_offset)}.ui5-dp-item.ui5-dp-item--selected .ui5-dp-daytext{background:var(--_ui5-v1-18-0_daypicker_item_selected_background);border:var(--_ui5-v1-18-0_daypicker_item_selected_text_border);border-radius:var(--_ui5-v1-18-0_daypicker_item_border_radius);color:var(--sapContent_Selected_TextColor);font-family:var(--_ui5-v1-18-0_daypicker_item_selected_text_font)}.ui5-dp-item.ui5-dp-item--selected:hover .ui5-dp-daytext{background:var(--_ui5-v1-18-0_daypicker_item_selected_daytext_hover_background);color:var(--sapContent_Selected_TextColor)}.ui5-dp-item.ui5-dp-item--now:focus:after{border:var(--_ui5-v1-18-0_daypicker_item_now_border_focus_after);border-radius:var(--_ui5-v1-18-0_daypicker_item_now_border_radius_focus_after);content:\"\";height:auto;inset:var(--_ui5-v1-18-0_daypicker_item_now_inset);position:absolute;width:auto}.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--now:focus:after{border:var(--_ui5-v1-18-0_day_picker_item_selected_now_border_focus);border-radius:var(--_ui5-v1-18-0_day_picker_item_selected_now_border_radius_focus);content:\"\";height:auto;inset:var(--_ui5-v1-18-0_daypicker_item_now_inset);position:absolute;width:auto}.ui5-dp-item.ui5-dp-item--selected:hover{background:var( --_ui5-v1-18-0_daypicker_item_selected_hover);color:var(--sapContent_ContrastTextColor)}.ui5-dp-item.ui5-dp-item--selected:focus:after{border-color:var(--_ui5-v1-18-0_daypicker_item_selected_focus_color);border-width:var(--_ui5-v1-18-0_daypicker_item_selected_focus_width)}.ui5-dp-items-container{outline:none}.ui5-dp-item.ui5-dp-item--selected-between .ui5-dp-daytext,.ui5-dp-item[hovered] .ui5-dp-daytext{background-color:var(--_ui5-v1-18-0_daypicker_item_selected_between_text_background);border:var(--_ui5-v1-18-0_daypicker_item_select_between_border);border-radius:var(--_ui5-v1-18-0_daypicker_item_border_radius);color:var(--sapTextColor);font-weight:var(--_ui5-v1-18-0_daypicker_item_selected_between_text_font)}.ui5-dp-item.ui5-dp-item--selected-between.ui5-dp-item--now:not(.ui5-dp-item--selected) .ui5-dp-daytext:after{border:var(--_ui5-v1-18-0_daypicker_item_now_selected_between_border);border-radius:var(--_ui5-v1-18-0_daypicker_item_now_selected_between_border_radius);content:\"\";inset:var(--_ui5-v1-18-0_daypicker_item_now_selected_between_inset);position:absolute}.ui5-dp-item.ui5-dp-item--selected-between,.ui5-dp-item[hovered]{background:var(--_ui5-v1-18-0_daypicker_item_selected_between_background);border-radius:var(--_ui5-v1-18-0_daypicker_item_selected_between_border)}.ui5-dp-item.ui5-dp-item--selected-between:hover{background:var(--_ui5-v1-18-0_daypicker_item_selected_between_hover_background)}.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--selected-between:focus:after{border-color:var(--sapContent_FocusColor)}.ui5-dp-items-container>:first-child{justify-content:flex-end}.ui5-dp-emptyweek{height:var(--_ui5-v1-18-0_day_picker_empty_height)}.ui5-dp-item.ui5-dp-item--now.ui5-dp-item--selected.ui5-dp-item--withsecondtype:focus:after{border-radius:var(--_ui5-v1-18-0-dp-item_withsecondtype_border);outline-offset:-.1875rem}.ui5-dp-item.ui5-dp-item--now.ui5-dp-item--selected.ui5-dp-item--withsecondtype .ui5-dp-daytext,.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--now.ui5-dp-item--withsecondtype .ui5-dp-daysectext{border:none;outline:none}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--selected:not(.ui5-dp-item.ui5-dp-item--now) .ui5-dp-daytext:after{border-width:.125rem}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--now .ui5-dp-daytext{height:var(--_ui5-v1-18-0_dp_two_calendar_item_primary_text_height);padding-top:var(--_ui5-v1-18-0_dp_two_calendar_item_now_text_padding_top)}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--now .ui5-dp-daysectext{border-radius:var(--_ui5-v1-18-0_dp_two_calendar_item_secondary_text_border_radios);height:var(--_ui5-v1-18-0_dp_two_calendar_item_secondary_text_height);padding-top:0}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--selected.ui5-dp-item.ui5-dp-item--now .ui5-dp-daytext{border-radius:var(--_ui5-v1-18-0_daypicker_two_calendar_item_border_radius)}:host([secondary-calendar-type]) .ui5-dp-item:focus:after{border-radius:var(--_ui5-v1-18-0_daypicker_two_calendar_item_border_focus_border_radius);inset:var(--_ui5-v1-18-0_daypicker_two_calendar_item_no_selected_inset)}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--now:after{border-radius:var(--_ui5-v1-18-0_daypicker_two_calendar_item_no_select_focus_border_radius);inset:var(--_ui5-v1-18-0_daypicker_two_calendar_item_no_selected_focus_inset)}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--selected:focus:after{border-radius:var(--_ui5-v1-18-0_daypicker_two_calendar_item_border_focus_border_radius);border-width:var(--_ui5-v1-18-0_daypicker_two_calendar_item_now_selected_border_width);inset:var(--_ui5-v1-18-0_daypicker_two_calendar_item_now_selected_border_inset)}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--now:after{border-radius:var(--_ui5-v1-18-0_daypicker_two_calendar_item_selected_now_border_radius_focus);inset:var(--_ui5-v1-18-0_daypicker_two_calendar_item_now_inset)}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--now.ui5-dp-item--selected.ui5-dp-item--withsecondtype .ui5-dp-daytext:not(.ui5-dp-daysectext):before{border-radius:var(--_ui5-v1-18-0_daypicker_two_calendar_item_selected_now_border_radius_focus);content:var(--_ui5-v1-18-0_daypicker_two_calendar_item_now_day_text_content);inset:.3125rem;outline:var(--_ui5-v1-18-0_daypicker_item_selected__secondary_type_text_outline);position:absolute}" };

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DayPicker_1;
const isBetween = (x, num1, num2) => x > Math.min(num1, num2) && x < Math.max(num1, num2);
const DAYS_IN_WEEK = 7;
/**
 * @class
 *
 * Represents the days inside a single month view of the <code>ui5-calendar</code> component.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.DayPicker
 * @extends sap.ui.webc.main.CalendarPart
 * @tagname ui5-daypicker
 * @public
 */
let DayPicker = DayPicker_1 = class DayPicker extends CalendarPart {
    onBeforeRendering() {
        const localeData = getCachedLocaleDataInstance(getLocale());
        this._buildWeeks(localeData);
        this._buildDayNames(localeData);
    }
    /**
     * Builds the "_weeks" object that represents the month.
     * @param { LocaleData }localeData
     * @private
     */
    _buildWeeks(localeData) {
        if (this._hidden) {
            return; // Optimization to not do any work unless the current picker
        }
        this._weeks = [];
        const firstDayOfWeek = this._getFirstDayOfWeek();
        const monthsNames = localeData.getMonths("wide", this._primaryCalendarType);
        const secondaryMonthsNames = this.hasSecondaryCalendarType ? localeData.getMonths("wide", this.secondaryCalendarType) : [];
        const nonWorkingDayLabel = DayPicker_1.i18nBundle.getText(DAY_PICKER_NON_WORKING_DAY);
        const todayLabel = DayPicker_1.i18nBundle.getText(DAY_PICKER_TODAY);
        const tempDate = this._getFirstDay(); // date that will be changed by 1 day 42 times
        const todayDate = CalendarDate$1.fromLocalJSDate(new Date(), this._primaryCalendarType); // current day date - calculate once
        const calendarDate = this._calendarDate; // store the _calendarDate value as this getter is expensive and degrades IE11 perf
        const minDate = this._minDate; // store the _minDate (expensive getter)
        const maxDate = this._maxDate; // store the _maxDate (expensive getter)
        const tempSecondDate = this.hasSecondaryCalendarType ? this._getSecondaryDay(tempDate) : undefined;
        let week = [];
        for (let i = 0; i < DAYS_IN_WEEK * 6; i++) { // always show 6 weeks total, 42 days to avoid jumping
            const timestamp = tempDate.valueOf() / 1000; // no need to round because CalendarDate does it
            let dayOfTheWeek = tempDate.getDay() - firstDayOfWeek;
            if (dayOfTheWeek < 0) {
                dayOfTheWeek += DAYS_IN_WEEK;
            }
            const isFocused = tempDate.getMonth() === calendarDate.getMonth() && tempDate.getDate() === calendarDate.getDate();
            const isSelected = this._isDaySelected(timestamp);
            const isSelectedBetween = this._isDayInsideSelectionRange(timestamp);
            const isOtherMonth = tempDate.getMonth() !== calendarDate.getMonth();
            const isWeekend = this._isWeekend(tempDate);
            const isDisabled = tempDate.valueOf() < minDate.valueOf() || tempDate.valueOf() > maxDate.valueOf();
            const isToday = tempDate.isSame(todayDate);
            const isFirstDayOfWeek = tempDate.getDay() === firstDayOfWeek;
            const nonWorkingAriaLabel = isWeekend ? `${nonWorkingDayLabel} ` : "";
            const todayAriaLabel = isToday ? `${todayLabel} ` : "";
            const tempSecondDateNumber = tempSecondDate ? tempSecondDate.getDate() : "";
            const tempSecondYearNumber = tempSecondDate ? tempSecondDate.getYear() : "";
            const secondaryMonthsNamesString = secondaryMonthsNames.length > 0 ? secondaryMonthsNames[tempSecondDate.getMonth()] : "";
            const ariaLabel = this.hasSecondaryCalendarType
                ? `${todayAriaLabel}${nonWorkingAriaLabel}${monthsNames[tempDate.getMonth()]} ${tempDate.getDate()}, ${tempDate.getYear()}; ${secondaryMonthsNamesString} ${tempSecondDateNumber}, ${tempSecondYearNumber}`
                : `${todayAriaLabel}${nonWorkingAriaLabel}${monthsNames[tempDate.getMonth()]} ${tempDate.getDate()}, ${tempDate.getYear()}`;
            const day = {
                timestamp: timestamp.toString(),
                focusRef: isFocused,
                _tabIndex: isFocused ? "0" : "-1",
                selected: isSelected,
                day: tempDate.getDate(),
                secondDay: this.hasSecondaryCalendarType ? tempSecondDate.getDate() : undefined,
                _isSecondaryCalendarType: this.hasSecondaryCalendarType,
                classes: `ui5-dp-item ui5-dp-wday${dayOfTheWeek}`,
                ariaLabel,
                ariaSelected: isSelected ? "true" : "false",
                ariaDisabled: isOtherMonth ? "true" : undefined,
                disabled: isDisabled,
            };
            if (isFirstDayOfWeek) {
                day.classes += " ui5-dp-firstday";
            }
            if (isSelected) {
                day.classes += " ui5-dp-item--selected";
            }
            if (isSelectedBetween) {
                day.classes += " ui5-dp-item--selected-between";
            }
            if (isToday) {
                day.classes += " ui5-dp-item--now";
            }
            if (isOtherMonth) {
                day.classes += " ui5-dp-item--othermonth";
            }
            if (isWeekend) {
                day.classes += " ui5-dp-item--weeekend";
            }
            if (isDisabled) {
                day.classes += " ui5-dp-item--disabled";
            }
            if (this.hasSecondaryCalendarType) {
                day.classes += " ui5-dp-item--withsecondtype";
            }
            week.push(day);
            if (dayOfTheWeek === DAYS_IN_WEEK - 1) { // 0-indexed so 6 is the last day of the week
                week.unshift({
                    weekNum: calculateWeekNumber(getFirstDayOfWeek(), tempDate.toUTCJSDate(), tempDate.getYear(), getLocale(), localeData),
                    isHidden: this.shouldHideWeekNumbers,
                });
            }
            if (week.length === DAYS_IN_WEEK + 1) { // 7 entries for each day + 1 for the week numbers
                this._weeks.push(week);
                week = [];
            }
            tempDate.setDate(tempDate.getDate() + 1);
            if (this.hasSecondaryCalendarType && tempSecondDate) {
                tempSecondDate.setDate(tempSecondDate.getDate() + 1);
            }
        }
    }
    /**
     * Builds the dayNames object (header of the month).
     * @param { LocaleData } localeData
     * @private
     */
    _buildDayNames(localeData) {
        if (this._hidden) {
            return; // Optimization to not do any work unless the current picker
        }
        let dayOfTheWeek;
        const aDayNamesWide = localeData.getDays("wide", this._primaryCalendarType);
        const aDayNamesAbbreviated = localeData.getDays("abbreviated", this._primaryCalendarType);
        let dayName;
        this._dayNames = [];
        this._dayNames.push({
            classes: "ui5-dp-dayname",
            name: DayPicker_1.i18nBundle.getText(DAY_PICKER_WEEK_NUMBER_TEXT),
        });
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            dayOfTheWeek = i + this._getFirstDayOfWeek();
            if (dayOfTheWeek > DAYS_IN_WEEK - 1) { // 0-indexed so index of 6 is the maximum allowed
                dayOfTheWeek -= DAYS_IN_WEEK;
            }
            dayName = {
                name: aDayNamesWide[dayOfTheWeek],
                ultraShortName: aDayNamesAbbreviated[dayOfTheWeek],
                classes: "ui5-dp-dayname",
            };
            this._dayNames.push(dayName);
        }
        this._dayNames[1].classes += " ui5-dp-firstday";
        if (this.shouldHideWeekNumbers) {
            this._dayNames.shift();
        }
    }
    onAfterRendering() {
        if (this._autoFocus && !this._hidden) {
            this.focus();
        }
        const focusedDay = this.shadowRoot.querySelector("[data-sap-focus-ref]");
        if (focusedDay && document.activeElement !== focusedDay) {
            focusedDay.focus();
        }
    }
    _onfocusin() {
        this._autoFocus = true;
    }
    _onfocusout() {
        this._autoFocus = false;
    }
    /**
     * Tells if the day is selected (dark blue).
     * @param { number } timestamp
     * @returns { boolean }
     * @private
     */
    _isDaySelected(timestamp) {
        if (this.selectionMode === CalendarSelectionMode$1.Single) {
            return timestamp === this.selectedDates[0];
        }
        // Multiple, Range
        return this.selectedDates.includes(timestamp);
    }
    /**
     * Tells if the day is inside a selection range (light blue).
     * @param { number } timestamp
     * @returns { boolean }
     * @private
     */
    _isDayInsideSelectionRange(timestamp) {
        // No selection at all (or not in range selection mode)
        if (this.selectionMode !== CalendarSelectionMode$1.Range || !this.selectedDates.length) {
            return false;
        }
        // Only one date selected - the user is hovering with the mouse or navigating with the keyboard to select the second one
        if (this.selectedDates.length === 1 && this._secondTimestamp) {
            return isBetween(timestamp, this.selectedDates[0], this._secondTimestamp);
        }
        // Two dates selected - stable range
        return isBetween(timestamp, this.selectedDates[0], this.selectedDates[1]);
    }
    /**
     * Selects/deselects a day.
     * @param { Event} e
     * @param { boolean} isShift true if the user did Click+Shift or Enter+Shift (but not Space+Shift)
     * @private
     */
    _selectDate(e, isShift) {
        const target = e.target;
        if (!this._isDayPressed(target)) {
            return;
        }
        const timestamp = this._getTimestampFromDom(target);
        this._safelySetTimestamp(timestamp);
        this._updateSecondTimestamp();
        if (this.selectionMode === CalendarSelectionMode$1.Single) {
            this.selectedDates = [timestamp];
        }
        else if (this.selectionMode === CalendarSelectionMode$1.Multiple) {
            if (this.selectedDates.length > 0 && isShift) {
                this._multipleSelection(timestamp);
            }
            else {
                this._toggleTimestampInSelection(timestamp);
            }
        }
        else {
            this.selectedDates = (this.selectedDates.length === 1) ? [...this.selectedDates, timestamp] : [timestamp];
        }
        this.fireEvent("change", {
            timestamp: this.timestamp,
            dates: this.selectedDates,
        });
    }
    /**
     * Selects/deselects the whole row (week).
     * @private
     */
    _selectWeek() {
        this._weeks.forEach((week) => {
            const _week = week;
            const dayInThisWeek = _week.findIndex((item) => {
                const date = CalendarDate$1.fromTimestamp(parseInt(item.timestamp) * 1000);
                return date.getMonth() === this._calendarDate.getMonth() && date.getDate() === this._calendarDate.getDate();
            }) !== -1;
            if (dayInThisWeek) { // The current day is in this week
                const notAllDaysOfThisWeekSelected = _week.some(item => item.timestamp && !this.selectedDates.includes(parseInt(item.timestamp)));
                if (notAllDaysOfThisWeekSelected) { // even if one day is not selected, select the whole week
                    _week.filter(item => item.timestamp).forEach(item => {
                        this._addTimestampToSelection(parseInt(item.timestamp));
                    });
                }
                else { // only if all days of this week are selected, deselect them
                    _week.filter(item => item.timestamp).forEach(item => {
                        this._removeTimestampFromSelection(parseInt(item.timestamp));
                    });
                }
            }
        });
        this.fireEvent("change", {
            timestamp: this.timestamp,
            dates: this.selectedDates,
        });
    }
    _toggleTimestampInSelection(timestamp) {
        if (this.selectedDates.includes(timestamp)) {
            this._removeTimestampFromSelection(timestamp);
        }
        else {
            this._addTimestampToSelection(timestamp);
        }
    }
    _addTimestampToSelection(timestamp) {
        if (!this.selectedDates.includes(timestamp)) {
            this.selectedDates = [...this.selectedDates, timestamp];
        }
    }
    _removeTimestampFromSelection(timestamp) {
        this.selectedDates = this.selectedDates.filter(value => value !== timestamp);
    }
    /**
     * Called when at least one day is selected and the user presses "Shift".
     * @param { number } timestamp
     * @private
     */
    _multipleSelection(timestamp) {
        const min = Math.min(...this.selectedDates);
        const max = Math.max(...this.selectedDates);
        let start;
        let end;
        let toggle = false;
        if (timestamp < min) {
            start = timestamp;
            end = min;
        }
        else if (timestamp >= min && timestamp <= max) { // inside the current range - toggle all between the selected and focused
            const distanceToMin = Math.abs(timestamp - min);
            const distanceToMax = Math.abs(timestamp - max);
            if (distanceToMin < distanceToMax) {
                start = timestamp;
                end = max;
            }
            else {
                start = min;
                end = timestamp;
            }
            toggle = true;
        }
        else {
            start = max;
            end = timestamp;
        }
        const startDate = CalendarDate$1.fromTimestamp(start * 1000);
        const endDate = CalendarDate$1.fromTimestamp(end * 1000);
        while (startDate.valueOf() <= endDate.valueOf()) {
            this[toggle ? "_toggleTimestampInSelection" : "_addTimestampToSelection"](startDate.valueOf() / 1000);
            startDate.setDate(startDate.getDate() + 1);
        }
    }
    /**
     * Set the hovered day as the "_secondTimestamp".
     * @param { MouseEvent } e
     * @private
     */
    _onmouseover(e) {
        const target = e.target;
        const hoveredItem = target.closest(".ui5-dp-item");
        if (hoveredItem && this.selectionMode === CalendarSelectionMode$1.Range && this.selectedDates.length === 1) {
            this._secondTimestamp = this._getTimestampFromDom(hoveredItem);
        }
    }
    _onkeydown(e) {
        let preventDefault = true;
        if (isEnter(e) || isEnterShift(e)) {
            this._selectDate(e, isEnterShift(e));
        }
        else if (isSpace(e) || isSpaceShift(e)) {
            e.preventDefault();
        }
        else if (isLeft(e)) {
            this._modifyTimestampBy(-1, "day", false);
        }
        else if (isRight(e)) {
            this._modifyTimestampBy(1, "day", false);
        }
        else if (isUp(e)) {
            this._modifyTimestampBy(-7, "day", false);
        }
        else if (isDown(e)) {
            this._modifyTimestampBy(7, "day", false);
        }
        else if (isPageUp(e)) {
            this._modifyTimestampBy(-1, "month");
        }
        else if (isPageDown(e)) {
            this._modifyTimestampBy(1, "month");
        }
        else if (isPageUpShift(e) || isPageUpAlt(e)) {
            this._modifyTimestampBy(-1, "year");
        }
        else if (isPageDownShift(e) || isPageDownAlt(e)) {
            this._modifyTimestampBy(1, "year");
        }
        else if (isPageUpShiftCtrl(e)) {
            this._modifyTimestampBy(-10, "year");
        }
        else if (isPageDownShiftCtrl(e)) {
            this._modifyTimestampBy(10, "year");
        }
        else if (isHome(e) || isEnd(e)) {
            this._onHomeOrEnd(isHome(e));
        }
        else if (isHomeCtrl(e)) {
            const tempDate = new CalendarDate$1(this._calendarDate, this._primaryCalendarType);
            tempDate.setDate(1); // Set the first day of the month
            this._setTimestamp(tempDate.valueOf() / 1000);
        }
        else if (isEndCtrl(e)) {
            const tempDate = new CalendarDate$1(this._calendarDate, this._primaryCalendarType);
            tempDate.setMonth(tempDate.getMonth() + 1);
            tempDate.setDate(0); // Set the last day of the month (0th day of next month)
            this._setTimestamp(tempDate.valueOf() / 1000);
        }
        else {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
        }
    }
    _onkeyup(e) {
        // Even if Space+Shift was pressed, ignore the shift unless in Multiple selection
        if (isSpace(e) || (isSpaceShift(e) && this.selectionMode !== CalendarSelectionMode$1.Multiple)) {
            this._selectDate(e, false);
        }
        else if (isSpaceShift(e)) {
            this._selectWeek();
        }
    }
    /**
     * Click is the same as "Enter".
     * <b>Note:</b> "Click+Shift" has the same effect as "Enter+Shift".
     * @param { MouseEvent } e
     * @private
     */
    _onclick(e) {
        this._selectDate(e, e.shiftKey);
    }
    /**
     * Called upon "Home" or "End" - moves the focus to the first or last item in the row.
     * @param { boolean } homePressed
     * @private
     */
    _onHomeOrEnd(homePressed) {
        this._weeks.forEach(week => {
            const _week = week;
            const dayInThisWeek = _week.findIndex(item => {
                const date = CalendarDate$1.fromTimestamp(parseInt(item.timestamp) * 1000);
                return date.getMonth() === this._calendarDate.getMonth() && date.getDate() === this._calendarDate.getDate();
            }) !== -1;
            if (dayInThisWeek) { // The current day is in this week
                const index = homePressed ? 1 : 7; // select the first (if Home) or last (if End) day of the week
                this._setTimestamp(parseInt(_week[index].timestamp));
            }
        });
    }
    /**
     * Called by the Calendar component.
     * @protected
     * @returns { boolean }
     */
    _hasPreviousPage() {
        return !(this._calendarDate.getMonth() === this._minDate.getMonth() && this._calendarDate.getYear() === this._minDate.getYear());
    }
    /**
     * Called by the Calendar component.
     * @protected
     * @returns { boolean }
     */
    _hasNextPage() {
        return !(this._calendarDate.getMonth() === this._maxDate.getMonth() && this._calendarDate.getYear() === this._maxDate.getYear());
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _showPreviousPage() {
        this._modifyTimestampBy(-1, "month", false);
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _showNextPage() {
        this._modifyTimestampBy(1, "month", false);
    }
    /**
     * Modifies the timestamp by a certain amount of days/months/years.
     * @param { number } amount
     * @param { string } unit
     * @param { boolean } preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @private
     */
    _modifyTimestampBy(amount, unit, preserveDate) {
        // Modify the current timestamp
        this._safelyModifyTimestampBy(amount, unit, preserveDate);
        this._updateSecondTimestamp();
        // Notify the calendar to update its timestamp
        this.fireEvent("navigate", { timestamp: this.timestamp });
    }
    /**
     * Sets the timestamp to an absolute value.
     * @param { number } value
     * @private
     */
    _setTimestamp(value) {
        this._safelySetTimestamp(value);
        this._updateSecondTimestamp();
        this.fireEvent("navigate", { timestamp: this.timestamp });
    }
    /**
     * During range selection, when the user is navigating with the keyboard,
     * the currently focused day is considered the "second day".
     * @private
     */
    _updateSecondTimestamp() {
        if (this.selectionMode === CalendarSelectionMode$1.Range && (this.selectedDates.length === 1 || this.selectedDates.length === 2)) {
            this._secondTimestamp = this.timestamp;
        }
    }
    get shouldHideWeekNumbers() {
        if (this._primaryCalendarType !== CalendarType$2.Gregorian) {
            return true;
        }
        return this.hideWeekNumbers;
    }
    get hasSecondaryCalendarType() {
        return !!this.secondaryCalendarType;
    }
    _isWeekend(oDate) {
        const localeData = getCachedLocaleDataInstance(getLocale());
        const iWeekDay = oDate.getDay(), iWeekendStart = localeData.getWeekendStart(), iWeekendEnd = localeData.getWeekendEnd();
        return (iWeekDay >= iWeekendStart && iWeekDay <= iWeekendEnd)
            || (iWeekendEnd < iWeekendStart && (iWeekDay >= iWeekendStart || iWeekDay <= iWeekendEnd));
    }
    _isDayPressed(target) {
        const targetParent = target.parentNode;
        return (target.className.indexOf("ui5-dp-item") > -1) || (targetParent && targetParent.classList && targetParent.classList.contains("ui5-dp-item"));
    }
    _getSecondaryDay(tempDate) {
        return new CalendarDate$1(tempDate, this.secondaryCalendarType);
    }
    _getFirstDay() {
        let daysFromPreviousMonth;
        const firstDayOfWeek = this._getFirstDayOfWeek();
        // determine weekday of first day in month
        const firstDay = new CalendarDate$1(this._calendarDate, this._primaryCalendarType);
        firstDay.setDate(1);
        daysFromPreviousMonth = firstDay.getDay() - firstDayOfWeek;
        if (daysFromPreviousMonth < 0) {
            daysFromPreviousMonth = 7 + daysFromPreviousMonth;
        }
        if (daysFromPreviousMonth > 0) {
            firstDay.setDate(1 - daysFromPreviousMonth);
        }
        return firstDay;
    }
    _getFirstDayOfWeek() {
        const localeData = getCachedLocaleDataInstance(getLocale());
        const confFirstDayOfWeek = getFirstDayOfWeek();
        return Number.isInteger(confFirstDayOfWeek) ? confFirstDayOfWeek : localeData.getFirstDayOfWeek();
    }
    get styles() {
        return {
            wrapper: {
                display: this._hidden ? "none" : "flex",
                "justify-content": "center",
            },
            main: {
                width: "100%",
            },
        };
    }
    get ariaRoledescription() {
        return this.hasSecondaryCalendarType
            ? `${this._primaryCalendarType} calendar with secondary ${this.secondaryCalendarType} calendar`
            : `${this._primaryCalendarType} calendar`;
    }
};
__decorate$5([
    property({
        validator: Integer,
        multiple: true,
        compareValues: true,
    })
], DayPicker.prototype, "selectedDates", void 0);
__decorate$5([
    property({ type: CalendarSelectionMode$1, defaultValue: CalendarSelectionMode$1.Single })
], DayPicker.prototype, "selectionMode", void 0);
__decorate$5([
    property({ type: Boolean })
], DayPicker.prototype, "hideWeekNumbers", void 0);
__decorate$5([
    property({
        type: Object,
        multiple: true,
    })
], DayPicker.prototype, "_weeks", void 0);
__decorate$5([
    property({
        type: Object,
        multiple: true,
    })
], DayPicker.prototype, "_dayNames", void 0);
__decorate$5([
    property({ type: Boolean, noAttribute: true })
], DayPicker.prototype, "_hidden", void 0);
__decorate$5([
    property()
], DayPicker.prototype, "_secondTimestamp", void 0);
DayPicker = DayPicker_1 = __decorate$5([
    customElement({
        tag: "ui5-daypicker",
        styles: styleData$9,
        template: block0$7,
    })
    /**
     * Fired when the selected date(s) change
     * @public
     * @event sap.ui.webc.main.DayPicker#change
     */
    ,
    event("change")
    /**
     * Fired when the timestamp changes (user navigates with the keyboard) or clicks with the mouse
     * @public
     * @event sap.ui.webc.main.DayPicker#navigate
     */
    ,
    event("navigate")
], DayPicker);
DayPicker.define();
var DayPicker$1 = DayPicker;

/* eslint no-unused-vars: 0 */
function block0$6(context, tags, suffix) { return effectiveHtml `<div class="ui5-mp-root" role="grid" aria-roledescription="${l$1(this.roleDescription)}" aria-readonly="false" aria-multiselectable="false" @keydown=${this._onkeydown} @keyup=${this._onkeyup} @click=${this._selectMonth}>${c(this._months, (item, index) => item._id || index, (item, index) => block1$5.call(this, context, tags, suffix, item, index))}</div>`; }
function block1$5(context, tags, suffix, item, index) { return effectiveHtml `<div class="ui5-mp-quarter">${c(item, (item, index) => item._id || index, (item, index) => block2$5.call(this, context, tags, suffix, item, index))}</div>`; }
function block2$5(context, tags, suffix, item, index) { return effectiveHtml `<div data-sap-timestamp=${l$1(item.timestamp)} tabindex=${l$1(item._tabIndex)} ?data-sap-focus-ref="${item.focusRef}" class="${l$1(item.classes)}" role="gridcell" aria-selected="${l$1(item.ariaSelected)}"><span class="ui5-dp-monthtext">${l$1(item.name)}</span>${item.nameInSecType ? block3$4.call(this, context, tags, suffix, item, index) : undefined}</div>`; }
function block3$4(context, tags, suffix, item, index) { return effectiveHtml `<span class="ui5-dp-monthtext ui5-dp-monthsectext">${l$1(item.nameInSecType)}</span>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$8 = { packageName: "@ui5/webcomponents", fileName: "themes/MonthPicker.css", content: ":host(:not([hidden])){display:block}:host{height:100%;width:100%}.ui5-mp-root{align-items:center;display:flex;flex-direction:column;font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontSize);justify-content:center;padding:2rem 0 1rem 0}.ui5-mp-item{align-items:center;background-color:var(--sapLegend_WorkingBackground);border:var(--_ui5-v1-18-0_monthpicker_item_border);border-radius:var(--_ui5-v1-18-0_monthpicker_item_border_radius);box-sizing:border-box;color:var(--sapButton_Lite_TextColor);cursor:default;display:flex;flex-direction:column;height:var(--_ui5-v1-18-0_month_picker_item_height);justify-content:center;margin:var(--_ui5-v1-18-0_monthpicker_item_margin);outline:none;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:calc(33.333% - .125rem)}.ui5-dp-monthsectext{color:var(--sapNeutralElementColor);font-size:.75rem}.ui5-mp-item:hover{background-color:var(--sapList_Hover_Background)}.ui5-mp-item.ui5-mp-item--selected,.ui5-mp-item.ui5-mp-item--selected .ui5-dp-monthsectext{background-color:var(--_ui5-v1-18-0_monthpicker_item_selected_background_color);box-shadow:var(--_ui5-v1-18-0_monthpicker_item_selected_box_shadow);color:var(--_ui5-v1-18-0_monthpicker_item_selected_text_color);font-weight:var(--_ui5-v1-18-0_monthpicker_item_selected_font_wieght)}.ui5-mp-item.ui5-mp-item--disabled{opacity:.5;pointer-events:none}.ui5-mp-item.ui5-mp-item--selected:focus{background-color:var(--sapContent_Selected_Background)}.ui5-mp-item.ui5-mp-item--selected:focus:after{border-color:var(--_ui5-v1-18-0_monthpicker_item_focus_after_border)}.ui5-mp-item.ui5-mp-item--selected:hover{background-color:var(--_ui5-v1-18-0_monthpicker_item_selected_hover_color)}.ui5-mp-item:focus:after{border:var(--_ui5-v1-18-0_button_focused_border);border-radius:var(--_ui5-v1-18-0_monthpicker_item_focus_after_border_radius);content:\"\";inset:0;position:absolute}.ui5-mp-quarter{align-items:center;display:flex;justify-content:center;width:100%}" };

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MonthPicker_1;
const PAGE_SIZE = 12; // total months on a single page
const ROW_SIZE = 3; // months per row (4 rows of 3 months each)
/**
 * Month picker component.
 *
 * @class
 *
 * Displays months which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MonthPicker
 * @extends sap.ui.webc.main.CalendarPart
 * @tagname ui5-monthpicker
 * @public
 */
let MonthPicker = MonthPicker_1 = class MonthPicker extends CalendarPart {
    static async onDefine() {
        MonthPicker_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get roleDescription() {
        return MonthPicker_1.i18nBundle.getText(MONTH_PICKER_DESCRIPTION);
    }
    onBeforeRendering() {
        this._buildMonths();
    }
    onAfterRendering() {
        if (!this._hidden) {
            this.focus();
        }
    }
    _buildMonths() {
        if (this._hidden) {
            return;
        }
        const localeData = getCachedLocaleDataInstance(getLocale());
        const monthsNames = localeData.getMonthsStandAlone("wide", this._primaryCalendarType);
        const months = [];
        const calendarDate = this._calendarDate; // store the value of the expensive getter
        const minDate = this._minDate; // store the value of the expensive getter
        const maxDate = this._maxDate; // store the value of the expensive getter
        const tempDate = new CalendarDate$1(calendarDate, this._primaryCalendarType);
        let timestamp;
        /* eslint-disable no-loop-func */
        for (let i = 0; i < 12; i++) {
            tempDate.setMonth(i);
            timestamp = tempDate.valueOf() / 1000;
            const isSelected = this.selectedDates.some(itemTimestamp => {
                const date = CalendarDate$1.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
                return date.getYear() === tempDate.getYear() && date.getMonth() === tempDate.getMonth();
            });
            const isFocused = tempDate.getMonth() === calendarDate.getMonth();
            const isDisabled = this._isOutOfSelectableRange(tempDate, minDate, maxDate);
            const month = {
                timestamp: timestamp.toString(),
                focusRef: isFocused,
                _tabIndex: isFocused ? "0" : "-1",
                selected: isSelected,
                ariaSelected: isSelected ? "true" : "false",
                name: monthsNames[i],
                nameInSecType: this.secondaryCalendarType && this._getDisplayedSecondaryMonthText(timestamp).text,
                disabled: isDisabled,
                classes: "ui5-mp-item",
            };
            if (isSelected) {
                month.classes += " ui5-mp-item--selected";
            }
            if (isDisabled) {
                month.classes += " ui5-mp-item--disabled";
            }
            const quarterIndex = Math.floor(i / ROW_SIZE);
            if (months[quarterIndex]) {
                months[quarterIndex].push(month);
            }
            else {
                months[quarterIndex] = [month];
            }
        }
        this._months = months;
    }
    _getDisplayedSecondaryMonthText(timestamp) {
        const monthsName = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, timestamp);
        return convertMonthNumbersToMonthNames(monthsName.firstDate.getMonth(), monthsName.lastDate.getMonth(), this.secondaryCalendarType);
    }
    _onkeydown(e) {
        let preventDefault = true;
        if (isEnter(e)) {
            this._selectMonth(e);
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
        else if (isLeft(e)) {
            this._modifyTimestampBy(-1);
        }
        else if (isRight(e)) {
            this._modifyTimestampBy(1);
        }
        else if (isUp(e)) {
            this._modifyTimestampBy(-ROW_SIZE);
        }
        else if (isDown(e)) {
            this._modifyTimestampBy(ROW_SIZE);
        }
        else if (isPageUp(e)) {
            this._modifyTimestampBy(-PAGE_SIZE);
        }
        else if (isPageDown(e)) {
            this._modifyTimestampBy(PAGE_SIZE);
        }
        else if (isHome(e) || isEnd(e)) {
            this._onHomeOrEnd(isHome(e));
        }
        else if (isHomeCtrl(e)) {
            this._setTimestamp(parseInt(this._months[0][0].timestamp)); // first month of first row
        }
        else if (isEndCtrl(e)) {
            this._setTimestamp(parseInt(this._months[PAGE_SIZE / ROW_SIZE - 1][ROW_SIZE - 1].timestamp)); // last month of last row
        }
        else {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
        }
    }
    _onHomeOrEnd(homePressed) {
        this._months.forEach(row => {
            const indexInRow = row.findIndex(item => CalendarDate$1.fromTimestamp(parseInt(item.timestamp) * 1000).getMonth() === this._calendarDate.getMonth());
            if (indexInRow !== -1) { // The current month is on this row
                const index = homePressed ? 0 : ROW_SIZE - 1; // select the first (if Home) or last (if End) month on the row
                this._setTimestamp(parseInt(row[index].timestamp));
            }
        });
    }
    /**
     * Sets the timestamp to an absolute value.
     * @param { number } value
     * @private
     */
    _setTimestamp(value) {
        this._safelySetTimestamp(value);
        this.fireEvent("navigate", { timestamp: this.timestamp });
    }
    /**
     * Modifies timestamp by a given amount of months and,
     * if necessary, loads the prev/next page.
     * @param { number } amount
     * @param { boolean } preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @private
     */
    _modifyTimestampBy(amount, preserveDate) {
        // Modify the current timestamp
        this._safelyModifyTimestampBy(amount, "month", preserveDate);
        // Notify the calendar to update its timestamp
        this.fireEvent("navigate", { timestamp: this.timestamp });
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._selectMonth(e);
        }
    }
    /**
     * Selects a month, when the user clicks or presses "Enter" or "Space".
     * @param { Event } e
     * @private
     */
    _selectMonth(e) {
        e.preventDefault();
        const target = e.target;
        if (target.className.indexOf("ui5-mp-item") > -1) {
            const timestamp = this._getTimestampFromDom(target);
            this._safelySetTimestamp(timestamp);
            this.fireEvent("change", { timestamp: this.timestamp });
        }
    }
    /**
     * Called by the Calendar component.
     * @protected
     * @returns { boolean }
     */
    _hasPreviousPage() {
        return this._calendarDate.getYear() !== this._minDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * @protected
     * @returns { boolean }
     */
    _hasNextPage() {
        return this._calendarDate.getYear() !== this._maxDate.getYear();
    }
    /**
     * Called by Calendar.js.
     * <b>Note:</b> when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage() {
        this._modifyTimestampBy(-PAGE_SIZE, true);
    }
    /**
     * Called by Calendar.js
     * <b>Note:</b> when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage() {
        this._modifyTimestampBy(PAGE_SIZE, true);
    }
    _isOutOfSelectableRange(date, minDate, maxDate) {
        const month = date.getMonth();
        const year = date.getYear();
        const minYear = minDate.getYear();
        const minMonth = minDate.getMonth();
        const maxYear = maxDate.getYear();
        const maxMonth = maxDate.getMonth();
        return year < minYear || (year === minYear && month < minMonth) || year > maxYear || (year === maxYear && month > maxMonth);
    }
};
__decorate$4([
    property({
        validator: Integer,
        multiple: true,
        compareValues: true,
    })
], MonthPicker.prototype, "selectedDates", void 0);
__decorate$4([
    property({ type: Object, multiple: true })
], MonthPicker.prototype, "_months", void 0);
__decorate$4([
    property({ type: Boolean, noAttribute: true })
], MonthPicker.prototype, "_hidden", void 0);
MonthPicker = MonthPicker_1 = __decorate$4([
    customElement({
        tag: "ui5-monthpicker",
        template: block0$6,
        styles: styleData$8,
    })
    /**
     * Fired when the user selects a month via "Space", "Enter" or click.
     * @public
     * @event sap.ui.webc.main.MonthPicker#change
     */
    ,
    event("change")
    /**
     * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
     * @since 1.0.0-rc.9
     * @public
     * @event sap.ui.webc.main.MonthPicker#navigate
     */
    ,
    event("navigate")
], MonthPicker);
MonthPicker.define();
var MonthPicker$1 = MonthPicker;

/* eslint no-unused-vars: 0 */
function block0$5(context, tags, suffix) { return effectiveHtml `<div class="ui5-yp-root" role="grid" aria-roledescription="${l$1(this.roleDescription)}" aria-readonly="false" aria-multiselectable="false" @keydown=${this._onkeydown} @keyup=${this._onkeyup} @click=${this._selectYear}>${c(this._years, (item, index) => item._id || index, (item, index) => block1$4.call(this, context, tags, suffix, item, index))}</div>`; }
function block1$4(context, tags, suffix, item, index) { return effectiveHtml `<div class="ui5-yp-interval-container">${c(item, (item, index) => item._id || index, (item, index) => block2$4.call(this, context, tags, suffix, item, index))}</div>`; }
function block2$4(context, tags, suffix, item, index) { return effectiveHtml `<div data-sap-timestamp="${l$1(item.timestamp)}" tabindex="${l$1(item._tabIndex)}" ?data-sap-focus-ref="${item.focusRef}" class="${l$1(item.classes)}" role="gridcell" aria-selected="${l$1(item.ariaSelected)}"><span>${l$1(item.year)}</span>${item.yearInSecType ? block3$3.call(this, context, tags, suffix, item, index) : undefined}</div>`; }
function block3$3(context, tags, suffix, item, index) { return effectiveHtml `<span class="ui5-yp-item-sec-type">${l$1(item.yearInSecType)}</span>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$7 = { packageName: "@ui5/webcomponents", fileName: "themes/YearPicker.css", content: ":host(:not([hidden])){display:block}:host{height:100%;width:100%}.ui5-yp-root{align-items:center;display:flex;flex-direction:column;font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontSize);justify-content:center;padding:2rem 0 1rem 0}.ui5-yp-interval-container{align-items:center;display:flex;justify-content:center;width:100%}.ui5-yp-item{align-items:center;background-color:var(--sapLegend_WorkingBackground);border:var(--_ui5-v1-18-0_yearpicker_item_border);border-radius:var(--_ui5-v1-18-0_yearpicker_item_border_radius);box-sizing:border-box;color:var(--sapButton_Lite_TextColor);cursor:default;display:flex;height:var(--_ui5-v1-18-0_year_picker_item_height);justify-content:center;margin:var(--_ui5-v1-18-0_yearpicker_item_margin);outline:none;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:calc(25% - .125rem)}.ui5-yp-item-secondary-type{flex-direction:column;width:calc(50% - .125rem)}.ui5-yp-item-sec-type{color:var(--sapNeutralElementColor);font-size:.75rem}.ui5-yp-item:hover{background-color:var(--sapList_Hover_Background)}.ui5-yp-item.ui5-yp-item--selected,.ui5-yp-item.ui5-yp-item--selected .ui5-yp-item-sec-type{background-color:var(--_ui5-v1-18-0_yearpicker_item_selected_background_color);box-shadow:var(--_ui5-v1-18-0_yearpicker_item_selected_box_shadow);color:var(--_ui5-v1-18-0_yearpicker_item_selected_text_color);font-weight:700}.ui5-yp-item.ui5-yp-item--disabled{opacity:.5;pointer-events:none}.ui5-yp-item.ui5-yp-item--selected:focus{background-color:var(--_ui5-v1-18-0_yearpicker_item_selected_focus)}.ui5-yp-item.ui5-yp-item--selected:focus:after{border-color:var(--_ui5-v1-18-0_yearpicker_item_focus_after_border)}.ui5-yp-item.ui5-yp-item--selected:hover{background-color:var(--_ui5-v1-18-0_yearpicker_item_selected_hover_color)}.ui5-yp-item:focus:after{border:var(--_ui5-v1-18-0_yearpicker_item_focus_after_border);border-radius:var(--_ui5-v1-18-0_yearpicker_item_focus_after_border_radius);content:\"\";inset:0;outline:var(--_ui5-v1-18-0_yearpicker_item_focus_after_outline);position:absolute}" };

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YearPicker_1;
/**
 * @class
 *
 * Displays years which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.YearPicker
 * @extends sap.ui.webc.main.CalendarPart
 * @tagname ui5-yearpicker
 * @public
 */
let YearPicker = YearPicker_1 = class YearPicker extends CalendarPart {
    static async onDefine() {
        YearPicker_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get roleDescription() {
        return YearPicker_1.i18nBundle.getText(YEAR_PICKER_DESCRIPTION);
    }
    onBeforeRendering() {
        this._buildYears();
    }
    _getPageSize() {
        // Total years on a single page depending on using on one or two calendar type
        return this.secondaryCalendarType ? 8 : 20;
    }
    _getRowSize() {
        // Years per row (5 rows of 4 years each) for one claendar type and (4 row of 2 years each) for two calendar type
        return this.secondaryCalendarType ? 2 : 4;
    }
    _buildYears() {
        if (this._hidden) {
            return;
        }
        const pageSize = this._getPageSize();
        const locale = getLocale();
        const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, locale);
        const oYearFormatInSecType = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType }, locale);
        this._calculateFirstYear();
        this._lastYear = this._firstYear + pageSize - 1;
        const calendarDate = this._calendarDate; // store the value of the expensive getter
        const minDate = this._minDate; // store the value of the expensive getter
        const maxDate = this._maxDate; // store the value of the expensive getter
        const tempDate = new CalendarDate$1(calendarDate, this._primaryCalendarType);
        let tempDateInSecType;
        let textInSecType;
        tempDate.setYear(this._firstYear);
        const intervals = [];
        let timestamp;
        /* eslint-disable no-loop-func */
        for (let i = 0; i < pageSize; i++) {
            timestamp = tempDate.valueOf() / 1000;
            const isSelected = this.selectedDates.some(itemTimestamp => {
                const date = CalendarDate$1.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
                return date.getYear() === tempDate.getYear();
            });
            const isFocused = tempDate.getYear() === calendarDate.getYear();
            const isDisabled = tempDate.getYear() < minDate.getYear() || tempDate.getYear() > maxDate.getYear();
            if (this.secondaryCalendarType) {
                tempDateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, timestamp, true);
                textInSecType = tempDateInSecType.firstDate.getYear() === tempDateInSecType.lastDate.getYear()
                    ? `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate(), true)}`
                    : `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate(), true)} - ${oYearFormatInSecType.format(tempDateInSecType.lastDate.toLocalJSDate(), true)}`;
            }
            const year = {
                timestamp: timestamp.toString(),
                _tabIndex: isFocused ? "0" : "-1",
                focusRef: isFocused,
                selected: isSelected,
                ariaSelected: isSelected ? "true" : "false",
                year: oYearFormat.format(tempDate.toLocalJSDate()),
                yearInSecType: this.secondaryCalendarType && textInSecType,
                disabled: isDisabled,
                classes: "ui5-yp-item",
            };
            if (isSelected) {
                year.classes += " ui5-yp-item--selected";
            }
            if (isDisabled) {
                year.classes += " ui5-yp-item--disabled";
            }
            if (this.secondaryCalendarType) {
                year.classes += " ui5-yp-item-secondary-type";
            }
            const intervalIndex = Math.floor(i / this._getRowSize());
            if (intervals[intervalIndex]) {
                intervals[intervalIndex].push(year);
            }
            else {
                intervals[intervalIndex] = [year];
            }
            tempDate.setYear(tempDate.getYear() + 1);
        }
        this._years = intervals;
    }
    _calculateFirstYear() {
        const pageSize = this._getPageSize();
        const absoluteMaxYear = getMaxCalendarDate(this._primaryCalendarType).getYear(); // 9999
        const currentYear = this._calendarDate.getYear();
        // 1. If first load - center the current year (set first year to be current year minus half page size)
        if (!this._firstYear) {
            this._firstYear = currentYear - pageSize / 2;
        }
        // 2. If out of range - change by a page (20) - do not center in order to keep the same position as the last page
        if (currentYear < this._firstYear) {
            this._firstYear -= pageSize;
        }
        else if (currentYear >= this._firstYear + pageSize) {
            this._firstYear += pageSize;
        }
        // 3. If the date was changed by more than 20 years - reset _firstYear completely
        if (Math.abs(this._firstYear - currentYear) >= pageSize) {
            this._firstYear = currentYear - pageSize / 2;
        }
        // Keep it in the range between the min and max year
        this._firstYear = Math.max(this._firstYear, this._minDate.getYear());
        this._firstYear = Math.min(this._firstYear, this._maxDate.getYear());
        // If first year is > 9980, make it 9980 to not show any years beyond 9999
        if (this._firstYear > absoluteMaxYear - pageSize + 1) {
            this._firstYear = absoluteMaxYear - pageSize + 1;
        }
    }
    onAfterRendering() {
        if (!this._hidden) {
            this.focus();
        }
    }
    _onkeydown(e) {
        let preventDefault = true;
        const pageSize = this._getPageSize();
        const rowSize = this._getRowSize();
        if (isEnter(e)) {
            this._selectYear(e);
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
        else if (isLeft(e)) {
            this._modifyTimestampBy(-1);
        }
        else if (isRight(e)) {
            this._modifyTimestampBy(1);
        }
        else if (isUp(e)) {
            this._modifyTimestampBy(-rowSize);
        }
        else if (isDown(e)) {
            this._modifyTimestampBy(rowSize);
        }
        else if (isPageUp(e)) {
            this._modifyTimestampBy(-pageSize);
        }
        else if (isPageDown(e)) {
            this._modifyTimestampBy(pageSize);
        }
        else if (isHome(e) || isEnd(e)) {
            this._onHomeOrEnd(isHome(e));
        }
        else if (isHomeCtrl(e)) {
            this._setTimestamp(parseInt(this._years[0][0].timestamp)); // first year of first row
        }
        else if (isEndCtrl(e)) {
            this._setTimestamp(parseInt(this._years[pageSize / rowSize - 1][rowSize - 1].timestamp)); // last year of last row
        }
        else {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
        }
    }
    _onHomeOrEnd(homePressed) {
        this._years.forEach(row => {
            const indexInRow = row.findIndex(item => CalendarDate$1.fromTimestamp(parseInt(item.timestamp) * 1000).getYear() === this._calendarDate.getYear());
            if (indexInRow !== -1) { // The current year is on this row
                const index = homePressed ? 0 : this._getRowSize() - 1; // select the first (if Home) or last (if End) year on the row
                this._setTimestamp(parseInt(row[index].timestamp));
            }
        });
    }
    /**
     * Sets the timestamp to an absolute value.
     * @param { number } value
     * @private
     */
    _setTimestamp(value) {
        this._safelySetTimestamp(value);
        this.fireEvent("navigate", { timestamp: this.timestamp });
    }
    /**
     * Modifies timestamp by a given amount of years and, if necessary, loads the prev/next page.
     * @param { number } amount
     * @private
     */
    _modifyTimestampBy(amount) {
        // Modify the current timestamp
        this._safelyModifyTimestampBy(amount, "year");
        // Notify the calendar to update its timestamp
        this.fireEvent("navigate", { timestamp: this.timestamp });
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._selectYear(e);
        }
    }
    /**
     * User clicked with the mouser or pressed Enter/Space
     * @param { Event } e
     * @private
     */
    _selectYear(e) {
        e.preventDefault();
        const target = e.target;
        if (target.className.indexOf("ui5-yp-item") > -1) {
            const timestamp = this._getTimestampFromDom(target);
            this._safelySetTimestamp(timestamp);
            this.fireEvent("change", { timestamp: this.timestamp });
        }
    }
    /**
     * Called by the Calendar component.
     * @protected
     * @returns { boolean }
     */
    _hasPreviousPage() {
        return this._firstYear > this._minDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * @protected
     * @returns { boolean }
     */
    _hasNextPage() {
        return this._firstYear + this._getPageSize() - 1 < this._maxDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * <b>Note:</b> when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage() {
        const pageSize = this._getPageSize();
        this._modifyTimestampBy(-pageSize);
    }
    /**
     * Called by the Calendar component.
     * <b>Note:</b> when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage() {
        this._modifyTimestampBy(this._getPageSize());
    }
};
__decorate$3([
    property({
        validator: Integer,
        multiple: true,
        compareValues: true,
    })
], YearPicker.prototype, "selectedDates", void 0);
__decorate$3([
    property({ type: Object, multiple: true })
], YearPicker.prototype, "_years", void 0);
__decorate$3([
    property({ type: Boolean, noAttribute: true })
], YearPicker.prototype, "_hidden", void 0);
YearPicker = YearPicker_1 = __decorate$3([
    customElement({
        tag: "ui5-yearpicker",
        styles: styleData$7,
        template: block0$5,
    })
    /**
     * Fired when the user selects a year via "Space", "Enter" or click.
     * @public
     * @event sap.ui.webc.main.YearPicker#change
     */
    ,
    event("change")
    /**
     * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
     * @since 1.0.0-rc.9
     * @public
     * @event sap.ui.webc.main.YearPicker#navigate
     */
    ,
    event("navigate")
], YearPicker);
YearPicker.define();
var YearPicker$1 = YearPicker;

var Gregorian = UniversalDate$1.extend('sap.ui.core.date.Gregorian', {
    constructor: function () {
        this.oDate = this.createDate(Date, arguments);
        this.sCalendarType = CalendarType.Gregorian;
    }
});
Gregorian.UTC = function () {
    return Date.UTC.apply(Date, arguments);
};
Gregorian.now = function () {
    return Date.now();
};
_Calendars.set(CalendarType.Gregorian, Gregorian);

/* eslint no-unused-vars: 0 */
function block0$4(context, tags, suffix) { return suffix ? effectiveHtml `<div class="ui5-cal-root" @keydown=${this._onkeydown}><div id="${l$1(this._id)}-content" class="ui5-cal-content"><${scopeTag("ui5-daypicker", tags, suffix)} id="${l$1(this._id)}-daypicker" ?hidden="${this._isDayPickerHidden}" format-pattern="${l$1(this._formatPattern)}" .selectedDates="${l$1(this._selectedDatesTimestamps)}" ._hidden="${l$1(this._isDayPickerHidden)}" .primaryCalendarType="${l$1(this._primaryCalendarType)}" .secondaryCalendarType="${l$1(this._secondaryCalendarType)}" .selectionMode="${l$1(this.selectionMode)}" .minDate="${l$1(this.minDate)}" .maxDate="${l$1(this.maxDate)}" timestamp="${l$1(this._timestamp)}" ?hide-week-numbers="${this.hideWeekNumbers}" @ui5-change="${l$1(this.onSelectedDatesChange)}" @ui5-navigate="${l$1(this.onNavigate)}"></${scopeTag("ui5-daypicker", tags, suffix)}><${scopeTag("ui5-monthpicker", tags, suffix)} id="${l$1(this._id)}-MP" ?hidden="${this._isMonthPickerHidden}" format-pattern="${l$1(this._formatPattern)}" .selectedDates="${l$1(this._selectedDatesTimestamps)}" ._hidden="${l$1(this._isMonthPickerHidden)}" .primaryCalendarType="${l$1(this._primaryCalendarType)}" .secondaryCalendarType="${l$1(this._secondaryCalendarType)}" .minDate="${l$1(this.minDate)}" .maxDate="${l$1(this.maxDate)}" timestamp="${l$1(this._timestamp)}" @ui5-change="${l$1(this.onSelectedMonthChange)}" @ui5-navigate="${l$1(this.onNavigate)}"></${scopeTag("ui5-monthpicker", tags, suffix)}><${scopeTag("ui5-yearpicker", tags, suffix)} id="${l$1(this._id)}-YP" ?hidden="${this._isYearPickerHidden}" format-pattern="${l$1(this._formatPattern)}" .selectedDates="${l$1(this._selectedDatesTimestamps)}" ._hidden="${l$1(this._isYearPickerHidden)}" .primaryCalendarType="${l$1(this._primaryCalendarType)}" .secondaryCalendarType="${l$1(this._secondaryCalendarType)}" .minDate="${l$1(this.minDate)}" .maxDate="${l$1(this.maxDate)}" timestamp="${l$1(this._timestamp)}" @ui5-change="${l$1(this.onSelectedYearChange)}" @ui5-navigate="${l$1(this.onNavigate)}"></${scopeTag("ui5-yearpicker", tags, suffix)}></div><${scopeTag("ui5-calendar-header", tags, suffix)} id="${l$1(this._id)}-head" .primaryCalendarType="${l$1(this._primaryCalendarType)}" .secondaryCalendarType="${l$1(this._secondaryCalendarType)}" .buttonTextForSecondaryCalendarType="${l$1(this.secondaryCalendarTypeButtonText)}" timestamp="${l$1(this._timestamp)}" .isPrevButtonDisabled="${l$1(this._previousButtonDisabled)}" .isNextButtonDisabled="${l$1(this._nextButtonDisabled)}" .isMonthButtonHidden="${l$1(this._isHeaderMonthButtonHidden)}" ._monthButtonText="${l$1(this._headerMonthButtonText)}" ._yearButtonText="${l$1(this._headerYearButtonText)}" ._yearButtonTextSecType="${l$1(this._headerYearButtonTextSecType)}" @ui5-previous-press="${l$1(this.onHeaderPreviousPress)}" @ui5-next-press="${l$1(this.onHeaderNextPress)}" @ui5-show-month-press="${l$1(this.onHeaderShowMonthPress)}" @ui5-show-year-press="${l$1(this.onHeaderShowYearPress)}"></${scopeTag("ui5-calendar-header", tags, suffix)}></div>` : effectiveHtml `<div class="ui5-cal-root" @keydown=${this._onkeydown}><div id="${l$1(this._id)}-content" class="ui5-cal-content"><ui5-daypicker id="${l$1(this._id)}-daypicker" ?hidden="${this._isDayPickerHidden}" format-pattern="${l$1(this._formatPattern)}" .selectedDates="${l$1(this._selectedDatesTimestamps)}" ._hidden="${l$1(this._isDayPickerHidden)}" .primaryCalendarType="${l$1(this._primaryCalendarType)}" .secondaryCalendarType="${l$1(this._secondaryCalendarType)}" .selectionMode="${l$1(this.selectionMode)}" .minDate="${l$1(this.minDate)}" .maxDate="${l$1(this.maxDate)}" timestamp="${l$1(this._timestamp)}" ?hide-week-numbers="${this.hideWeekNumbers}" @ui5-change="${l$1(this.onSelectedDatesChange)}" @ui5-navigate="${l$1(this.onNavigate)}"></ui5-daypicker><ui5-monthpicker id="${l$1(this._id)}-MP" ?hidden="${this._isMonthPickerHidden}" format-pattern="${l$1(this._formatPattern)}" .selectedDates="${l$1(this._selectedDatesTimestamps)}" ._hidden="${l$1(this._isMonthPickerHidden)}" .primaryCalendarType="${l$1(this._primaryCalendarType)}" .secondaryCalendarType="${l$1(this._secondaryCalendarType)}" .minDate="${l$1(this.minDate)}" .maxDate="${l$1(this.maxDate)}" timestamp="${l$1(this._timestamp)}" @ui5-change="${l$1(this.onSelectedMonthChange)}" @ui5-navigate="${l$1(this.onNavigate)}"></ui5-monthpicker><ui5-yearpicker id="${l$1(this._id)}-YP" ?hidden="${this._isYearPickerHidden}" format-pattern="${l$1(this._formatPattern)}" .selectedDates="${l$1(this._selectedDatesTimestamps)}" ._hidden="${l$1(this._isYearPickerHidden)}" .primaryCalendarType="${l$1(this._primaryCalendarType)}" .secondaryCalendarType="${l$1(this._secondaryCalendarType)}" .minDate="${l$1(this.minDate)}" .maxDate="${l$1(this.maxDate)}" timestamp="${l$1(this._timestamp)}" @ui5-change="${l$1(this.onSelectedYearChange)}" @ui5-navigate="${l$1(this.onNavigate)}"></ui5-yearpicker></div><ui5-calendar-header id="${l$1(this._id)}-head" .primaryCalendarType="${l$1(this._primaryCalendarType)}" .secondaryCalendarType="${l$1(this._secondaryCalendarType)}" .buttonTextForSecondaryCalendarType="${l$1(this.secondaryCalendarTypeButtonText)}" timestamp="${l$1(this._timestamp)}" .isPrevButtonDisabled="${l$1(this._previousButtonDisabled)}" .isNextButtonDisabled="${l$1(this._nextButtonDisabled)}" .isMonthButtonHidden="${l$1(this._isHeaderMonthButtonHidden)}" ._monthButtonText="${l$1(this._headerMonthButtonText)}" ._yearButtonText="${l$1(this._headerYearButtonText)}" ._yearButtonTextSecType="${l$1(this._headerYearButtonTextSecType)}" @ui5-previous-press="${l$1(this.onHeaderPreviousPress)}" @ui5-next-press="${l$1(this.onHeaderNextPress)}" @ui5-show-month-press="${l$1(this.onHeaderShowMonthPress)}" @ui5-show-year-press="${l$1(this.onHeaderShowYearPress)}"></ui5-calendar-header></div>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$6 = { packageName: "@ui5/webcomponents", fileName: "themes/Calendar.css", content: ":host(:not([hidden])){display:inline-block}.ui5-cal-root{background:var(--sapList_Background);box-sizing:border-box;display:flex;flex-direction:column-reverse;height:var(--_ui5-v1-18-0_calendar_height);justify-content:flex-end;padding:var(--_ui5-v1-18-0_calendar_top_bottom_padding) var(--_ui5-v1-18-0_calendar_left_right_padding) 0;width:var(--_ui5-v1-18-0_calendar_width)}.ui5-cal-root [ui5-calendar-header]{font-family:var(--_ui5-v1-18-0_button_fontFamily);height:var(--_ui5-v1-18-0_calendar_header_height)}.ui5-cal-root .ui5-cal-content{padding:0 var(--_ui5-v1-18-0_calendar_left_right_padding) var(--_ui5-v1-18-0_calendar_top_bottom_padding)}" };

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-calendar</code> component allows users to select one or more dates.
 * <br><br>
 * Currently selected dates are represented with instances of <code>ui5-date</code> as
 * children of the <code>ui5-calendar</code>. The value property of each <code>ui5-date</code> must be a
 * date string, correctly formatted according to the <code>ui5-calendar</code>'s <code>formatPattern</code> property.
 * Whenever the user changes the date selection, <code>ui5-calendar</code> will automatically create/remove instances
 * of <code>ui5-date</code> in itself, unless you prevent this behavior by calling <code>preventDefault()</code> for the
 * <code>selected-dates-change</code> event. This is useful if you want to control the selected dates externally.
 * <br><br>
 *
 * <h3>Usage</h3>
 *
 * The user can navigate to a particular date by:
 * <br>
 * <ul>
 * <li>Pressing over a month inside the months view</li>
 * <li>Pressing over an year inside the years view</li>
 * </ul>
 * <br>
 * The user can confirm a date selection by pressing over a date inside the days view.
 * <br><br>
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-calendar</code> provides advanced keyboard handling.
 * When a picker is showed and focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 * - Day picker: <br>
 * <ul>
 * <li>[F4] - Shows month picker</li>
 * <li>[SHIFT] + [F4] - Shows year picker</li>
 * <li>[PAGEUP] - Navigate to the previous month</li>
 * <li>[PAGEDOWN] - Navigate to the next month</li>
 * <li>[SHIFT] + [PAGEUP] - Navigate to the previous year</li>
 * <li>[SHIFT] + [PAGEDOWN] - Navigate to the next year</li>
 * <li>[CTRL] + [SHIFT] + [PAGEUP] - Navigate ten years backwards</li>
 * <li>[CTRL] + [SHIFT] + [PAGEDOWN] - Navigate ten years forwards</li>
 * <li>[HOME] - Navigate to the first day of the week</li>
 * <li>[END] - Navigate to the last day of the week</li>
 * <li>[CTRL] + [HOME] - Navigate to the first day of the month</li>
 * <li>[CTRL] + [END] - Navigate to the last day of the month</li>
 * </ul>
 * <br>
 * - Month picker: <br>
 * <ul>
 * <li>[PAGEUP] - Navigate to the previous year</li>
 * <li>[PAGEDOWN] - Navigate to the next year</li>
 * <li>[HOME] - Navigate to the first month of the current row</li>
 * <li>[END] - Navigate to the last month of the current row</li>
 * <li>[CTRL] + [HOME] - Navigate to the first month of the current year</li>
 * <li>[CTRL] + [END] - Navigate to the last month of the year</li>
 * </ul>
 * <br>
 * - Year picker: <br>
 * <ul>
 * <li>[PAGEUP] - Navigate to the previous year range</li>
 * <li>[PAGEDOWN] - Navigate the next year range</li>
 * <li>[HOME] - Navigate to the first year of the current row</li>
 * <li>[END] - Navigate to the last year of the current row</li>
 * <li>[CTRL] + [HOME] - Navigate to the first year of the current year range</li>
 * <li>[CTRL] + [END] - Navigate to the last year of the current year range</li>
 * </ul>
 * <br>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
* <h3>Calendar types</h3>
 * The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.
 * By default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,
 * you need to set the <code>primaryCalendarType</code> property and import one or more of the following modules:
 * <br><br>
 *
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";</code>
 * <br><br>
 *
 * Or, you can use the global configuration and set the <code>calendarType</code> key:
 * <br>
 * <code>
 * &lt;script data-id="sap-ui-config" type="application/json"&gt;
 * {
 *	"calendarType": "Japanese"
 * }
 * &lt;/script&gt;
 * </code>
 *
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Calendar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Calendar
 * @extends sap.ui.webc.main.CalendarPart
 * @tagname ui5-calendar
 * @appenddocs sap.ui.webc.main.CalendarDate
 * @public
 * @since 1.0.0-rc.11
 */
let Calendar = class Calendar extends CalendarPart {
    /**
     * @private
     */
    get _selectedDatesTimestamps() {
        return this.dates.map(date => {
            const value = date.value;
            const validValue = value && !!this.getFormat().parse(value);
            return validValue ? this._getTimeStampFromString(value) / 1000 : undefined;
        }).filter((date) => !!date);
    }
    /**
     * @private
     */
    _setSelectedDates(selectedDates) {
        const selectedValues = selectedDates.map(timestamp => this.getFormat().format(new Date(timestamp * 1000), true)); // Format as UTC
        const valuesInDOM = [...this.dates].map(dateElement => dateElement.value);
        // Remove all elements for dates that are no longer selected
        this.dates.filter(dateElement => !selectedValues.includes(dateElement.value)).forEach(dateElement => {
            this.removeChild(dateElement);
        });
        // Create tags for the selected dates that don't already exist in DOM
        selectedValues.filter(value => !valuesInDOM.includes(value)).forEach(value => {
            const dateElement = document.createElement(CalendarDateComponent.getMetadata().getTag());
            dateElement.value = value;
            this.appendChild(dateElement);
        });
    }
    /**
     * Makes sure that _currentPicker is always set to a value, allowed by _pickersMode
     */
    _normalizeCurrentPicker() {
        if (this._currentPicker === "day" && this._pickersMode !== CalendarPickersMode$1.DAY_MONTH_YEAR) {
            this._currentPicker = "month";
        }
        if (this._currentPicker === "month" && this._pickersMode === CalendarPickersMode$1.YEAR) {
            this._currentPicker = "year";
        }
    }
    onBeforeRendering() {
        this._normalizeCurrentPicker();
    }
    async onAfterRendering() {
        await renderFinished(); // Await for the current picker to render and then ask if it has previous/next pages
        this._previousButtonDisabled = !this._currentPickerDOM._hasPreviousPage();
        this._nextButtonDisabled = !this._currentPickerDOM._hasNextPage();
        const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this.primaryCalendarType });
        const localeData = getCachedLocaleDataInstance(getLocale());
        this._headerMonthButtonText = localeData.getMonthsStandAlone("wide", this.primaryCalendarType)[this._calendarDate.getMonth()];
        if (this._currentPicker === "year") {
            const rangeStart = new CalendarDate$1(this._calendarDate, this._primaryCalendarType);
            const rangeEnd = new CalendarDate$1(this._calendarDate, this._primaryCalendarType);
            rangeStart.setYear(this._currentPickerDOM._firstYear);
            rangeEnd.setYear(this._currentPickerDOM._lastYear);
            this._headerYearButtonText = `${yearFormat.format(rangeStart.toLocalJSDate(), true)} - ${yearFormat.format(rangeEnd.toLocalJSDate(), true)}`;
        }
        else {
            this._headerYearButtonText = String(yearFormat.format(this._localDate, true));
        }
        this._secondaryCalendarType && this._setSecondaryCalendarTypeButtonText();
    }
    /**
     * The user clicked the "month" button in the header
     */
    onHeaderShowMonthPress(e) {
        this._currentPickerDOM._autoFocus = false;
        this._currentPicker = "month";
        this.fireEvent("show-month-press", e);
    }
    /**
     * The user clicked the "year" button in the header
     */
    onHeaderShowYearPress(e) {
        this._currentPickerDOM._autoFocus = false;
        this._currentPicker = "year";
        this.fireEvent("show-year-press", e);
    }
    get _currentPickerDOM() {
        // Calendar's shadowRoot and all the pickers are always present - the "!" is safe to be used.
        return this.shadowRoot.querySelector(`[ui5-${this._currentPicker}picker]`);
    }
    /**
     * The year clicked the "Previous" button in the header
     */
    onHeaderPreviousPress() {
        this._currentPickerDOM._showPreviousPage();
    }
    /**
     * The year clicked the "Next" button in the header
     */
    onHeaderNextPress() {
        this._currentPickerDOM._showNextPage();
    }
    _setSecondaryCalendarTypeButtonText() {
        const yearFormatSecType = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });
        if (this._currentPicker === "year") {
            const rangeStart = new CalendarDate$1(this._calendarDate, this._primaryCalendarType);
            const rangeEnd = new CalendarDate$1(this._calendarDate, this._primaryCalendarType);
            rangeStart.setYear(this._currentPickerDOM._firstYear);
            rangeEnd.setYear(this._currentPickerDOM._lastYear);
            const rangeStartSecType = transformDateToSecondaryType(this.primaryCalendarType, this._secondaryCalendarType, rangeStart.valueOf() / 1000, true)
                .firstDate;
            const rangeEndSecType = transformDateToSecondaryType(this.primaryCalendarType, this._secondaryCalendarType, rangeEnd.valueOf() / 1000, true)
                .lastDate;
            this._headerYearButtonTextSecType = `${yearFormatSecType.format(rangeStartSecType.toLocalJSDate(), true)} - ${yearFormatSecType.format(rangeEndSecType.toLocalJSDate(), true)}`;
        }
        else {
            this._headerYearButtonTextSecType = String(yearFormatSecType.format(this._localDate, true));
        }
    }
    get secondaryCalendarTypeButtonText() {
        if (!this._secondaryCalendarType) {
            return;
        }
        const localDate = new Date(this._timestamp * 1000);
        const secondYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });
        const dateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this._secondaryCalendarType, this._timestamp);
        const secondMonthInfo = convertMonthNumbersToMonthNames(dateInSecType.firstDate.getMonth(), dateInSecType.lastDate.getMonth(), this._secondaryCalendarType);
        const secondYearText = secondYearFormat.format(localDate, true);
        return {
            yearButtonText: secondYearText,
            monthButtonText: secondMonthInfo.text,
            monthButtonInfo: secondMonthInfo.textInfo,
        };
    }
    /**
     * The month button is hidden when the month picker or year picker is shown
     * @returns {boolean}
     * @private
     */
    get _isHeaderMonthButtonHidden() {
        return this._currentPicker === "month" || this._currentPicker === "year";
    }
    get _isDayPickerHidden() {
        return this._currentPicker !== "day";
    }
    get _isMonthPickerHidden() {
        return this._currentPicker !== "month";
    }
    get _isYearPickerHidden() {
        return this._currentPicker !== "year";
    }
    _fireEventAndUpdateSelectedDates(selectedDates) {
        const datesValues = selectedDates.map(timestamp => {
            const calendarDate = CalendarDate$1.fromTimestamp(timestamp * 1000, this._primaryCalendarType);
            return this.getFormat().format(calendarDate.toUTCJSDate(), true);
        });
        const defaultPrevented = !this.fireEvent("selected-dates-change", { timestamp: this.timestamp, dates: [...selectedDates], values: datesValues }, true);
        if (!defaultPrevented) {
            this._setSelectedDates(selectedDates);
        }
    }
    onSelectedDatesChange(e) {
        this.timestamp = e.detail.timestamp;
        this._fireEventAndUpdateSelectedDates(e.detail.dates);
    }
    onSelectedMonthChange(e) {
        this.timestamp = e.detail.timestamp;
        if (this._pickersMode === CalendarPickersMode$1.DAY_MONTH_YEAR) {
            this._currentPicker = "day";
        }
        else {
            this._fireEventAndUpdateSelectedDates([this.timestamp]);
        }
        this._currentPickerDOM._autoFocus = true;
    }
    onSelectedYearChange(e) {
        this.timestamp = e.detail.timestamp;
        if (this._pickersMode === CalendarPickersMode$1.DAY_MONTH_YEAR) {
            this._currentPicker = "day";
        }
        else if (this._pickersMode === CalendarPickersMode$1.MONTH_YEAR) {
            this._currentPicker = "month";
        }
        else {
            this._fireEventAndUpdateSelectedDates([this.timestamp]);
        }
        this._currentPickerDOM._autoFocus = true;
    }
    onNavigate(e) {
        this.timestamp = e.detail.timestamp;
    }
    _onkeydown(e) {
        if (isF4(e) && this._currentPicker !== "month") {
            this._currentPicker = "month";
        }
        if (isF4Shift(e) && this._currentPicker !== "year") {
            this._currentPicker = "year";
        }
    }
    /**
     * Returns an array of UTC timestamps, representing the selected dates.
     * @protected
     * @deprecated
     */
    get selectedDates() {
        return this._selectedDatesTimestamps;
    }
    /**
     * Creates instances of <code>ui5-date</code> inside this <code>ui5-calendar</code> with values, equal to the provided UTC timestamps
     * @protected
     * @deprecated
     * @param { Array<number> } selectedDates Array of UTC timestamps
     */
    set selectedDates(selectedDates) {
        this._setSelectedDates(selectedDates);
    }
};
__decorate$2([
    property({
        type: CalendarSelectionMode$1,
        defaultValue: CalendarSelectionMode$1.Single,
    })
], Calendar.prototype, "selectionMode", void 0);
__decorate$2([
    property({ type: Boolean })
], Calendar.prototype, "hideWeekNumbers", void 0);
__decorate$2([
    property({ defaultValue: "day" })
], Calendar.prototype, "_currentPicker", void 0);
__decorate$2([
    property({ type: Boolean })
], Calendar.prototype, "_previousButtonDisabled", void 0);
__decorate$2([
    property({ type: Boolean })
], Calendar.prototype, "_nextButtonDisabled", void 0);
__decorate$2([
    property()
], Calendar.prototype, "_headerMonthButtonText", void 0);
__decorate$2([
    property()
], Calendar.prototype, "_headerYearButtonText", void 0);
__decorate$2([
    property()
], Calendar.prototype, "_headerYearButtonTextSecType", void 0);
__decorate$2([
    property({ type: CalendarPickersMode$1, defaultValue: CalendarPickersMode$1.DAY_MONTH_YEAR, noAttribute: true })
], Calendar.prototype, "_pickersMode", void 0);
__decorate$2([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], Calendar.prototype, "dates", void 0);
Calendar = __decorate$2([
    customElement({
        tag: "ui5-calendar",
        fastNavigation: true,
        template: block0$4,
        styles: styleData$6,
        dependencies: [
            CalendarDateComponent,
            CalendarHeader$1,
            DayPicker$1,
            MonthPicker$1,
            YearPicker$1,
        ],
    })
    /**
     * Fired when the selected dates change.
     * <b>Note:</b> If you call <code>preventDefault()</code> for this event, the component will not
     * create instances of <code>ui5-date</code> for the newly selected dates. In that case you should do this manually.
     *
     * @event sap.ui.webc.main.Calendar#selected-dates-change
     * @allowPreventDefault
     * @param {Array} values The selected dates
     * @param {Array} dates The selected dates as UTC timestamps
     * @public
     */
    ,
    event("selected-dates-change", {
        detail: {
            dates: { type: Array },
            values: { type: Array },
        },
    }),
    event("show-month-press"),
    event("show-year-press")
], Calendar);
Calendar.define();
var Calendar$1 = Calendar;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},o=t=>({_$litStatic$:t,r:e}),s=new Map,a=t=>(r,...e)=>{const o=e.length;let i,a;const n=[],u=[];let c,$=0,f=!1;for(;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;$!==o&&u.push(a),n.push(c),$++;}if($===o&&n.push(r[o]),f){const t=n.join("$$lit$$");void 0===(r=s.get(t))&&(n.raw=n,s.set(t,r=n)),e=u;}return t(r,...e)},n=a(x),u=a(b);

class LitStatic {
}
LitStatic.html = n;
LitStatic.svg = u;
LitStatic.unsafeStatic = o;
registerFeature("LitStatic", LitStatic);

/**
 * Returns the caret (cursor) position of the specified text field (field).
 * Return value range is 0-field.value.length.
 */
const getCaretPosition = (field) => {
    // Initialize
    let caretPos = 0;
    if (field.selectionStart || field.selectionStart === 0) { // Firefox support
        caretPos = field.selectionDirection === "backward" ? field.selectionStart : field.selectionEnd;
    }
    return caretPos;
};
const setCaretPosition = (field, caretPos) => {
    if (field.selectionStart) {
        field.focus();
        field.setSelectionRange(caretPos, caretPos);
    }
    else {
        field.focus();
    }
};

const name$1 = "not-editable";
const pathData$1 = "M443 104q5 7 5 12 0 6-5 11L118 453q-4 4-8 4L0 480l22-110q0-5 4-9L352 36q4-4 11-4t11 4zm-121 99l-46-45L52 381l46 46zm87-88l-46-44-64 64 45 45zm71 204l-63 64-65-64-33 32 66 63-66 66 33 32 65-66 63 66 32-32-66-66 66-63z";
const ltr$1 = false;
const collection$1 = "SAP-icons-v4";
const packageName$1 = "@ui5/webcomponents-icons";

registerIcon(name$1, { pathData: pathData$1, ltr: ltr$1, collection: collection$1, packageName: packageName$1 });

const name = "not-editable";
const pathData = "M504 94q7 7 7 18t-7 18L130 505q-9 7-18 7H26q-11 0-18.5-7.5T0 486v-86q0-10 8-18L381 7q9-7 18-7 11 0 18 7zm-55 18l-50-50-50 50 50 50zm-86 86l-50-50L62 400l50 50zm142 270q7 7 7 18t-7.5 18.5T486 512t-18-7l-37-38-38 38q-7 7-18 7t-18.5-7.5T349 486q0-10 8-18l38-37-38-38q-8-8-8-18 0-11 7.5-18.5T375 349q10 0 18 8l38 37 37-37q8-8 18-8 11 0 18.5 7.5T512 375t-7 18l-38 38z";
const ltr = false;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

isLegacyThemeFamily() ? pathData$1 : pathData;

/**
 * Different input types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.InputType
 */
var InputType;
(function (InputType) {
    /**
     * Defines a one-line text input field:
     * @public
     * @type {Text}
     */
    InputType["Text"] = "Text";
    /**
     * Used for input fields that must contain an e-mail address.
     * @public
     * @type {Email}
     */
    InputType["Email"] = "Email";
    /**
     * Defines a numeric input field.
     * @public
     * @type {Number}
     */
    InputType["Number"] = "Number";
    /**
     * Defines a password field.
     * @public
     * @type {Password}
     */
    InputType["Password"] = "Password";
    /**
     * Used for input fields that should contain a telephone number.
     * @public
     * @type {Tel}
     */
    InputType["Tel"] = "Tel";
    /**
     * Used for input fields that should contain a URL address.
     * @public
     * @type {URL}
     */
    InputType["URL"] = "URL";
})(InputType || (InputType = {}));
var InputType$1 = InputType;

/* eslint no-unused-vars: 0 */
function block0$3(context, tags, suffix) { return effectiveHtml `<div class="ui5-input-root ui5-input-focusable-element" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}"><div class="ui5-input-content"><input id="${l$1(this._id)}-inner" class="ui5-input-inner" style="${styleMap(this.styles.innerInput)}" type="${l$1(this.inputType)}" inner-input ?inner-input-with-icon="${this.icon.length}" ?disabled="${this.disabled}" ?readonly="${this._readonly}" .value="${l$1(this._innerValue)}" placeholder="${l$1(this._placeholder)}" maxlength="${l$1(this.maxlength)}" role="${l$1(this.accInfo.input.role)}" aria-controls="${l$1(this.accInfo.input.ariaControls)}" aria-invalid="${l$1(this.accInfo.input.ariaInvalid)}" aria-haspopup="${l$1(this.accInfo.input.ariaHasPopup)}" aria-describedby="${l$1(this.accInfo.input.ariaDescribedBy)}" aria-roledescription="${l$1(this.accInfo.input.ariaRoledescription)}" aria-autocomplete="${l$1(this.accInfo.input.ariaAutoComplete)}" aria-expanded="${l$1(this.accInfo.input.ariaExpanded)}" aria-label="${l$1(this.accInfo.input.ariaLabel)}" aria-required="${l$1(this.required)}" @input="${this._handleInput}" @change="${this._handleChange}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @click=${this._click} @focusin=${this.innerFocusIn} data-sap-focus-ref step="${l$1(this.nativeInputAttributes.step)}" min="${l$1(this.nativeInputAttributes.min)}" max="${l$1(this.nativeInputAttributes.max)}" />${this.effectiveShowClearIcon ? block1$3.call(this, context, tags, suffix) : undefined}${this.icon.length ? block2$3.call(this, context, tags, suffix) : undefined}<div class="ui5-input-value-state-icon">${o$1(this._valueStateInputIcon)}</div>${this.showSuggestions ? block3$2.call(this, context, tags, suffix) : undefined}${this.accInfo.input.ariaDescription ? block4$1.call(this, context, tags, suffix) : undefined}${this.hasValueState ? block5$1.call(this, context, tags, suffix) : undefined}</div><slot name="formSupport"></slot></div>`; }
function block1$3(context, tags, suffix) { return suffix ? effectiveHtml `<div @click=${this._clear} @mousedown=${this._iconMouseDown} class="ui5-input-clear-icon-wrapper" input-icon tabindex="-1"><${scopeTag("ui5-icon", tags, suffix)} tabindex="-1" class="ui5-input-clear-icon" name="decline"></${scopeTag("ui5-icon", tags, suffix)}></div>` : effectiveHtml `<div @click=${this._clear} @mousedown=${this._iconMouseDown} class="ui5-input-clear-icon-wrapper" input-icon tabindex="-1"><ui5-icon tabindex="-1" class="ui5-input-clear-icon" name="decline"></ui5-icon></div>`; }
function block2$3(context, tags, suffix) { return effectiveHtml `<div class="ui5-input-icon-root"><slot name="icon"></slot></div>`; }
function block3$2(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-suggestionsText" class="ui5-hidden-text">${l$1(this.suggestionsText)}</span><span id="${l$1(this._id)}-selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span><span id="${l$1(this._id)}-suggestionsCount" class="ui5-hidden-text" aria-live="polite">${l$1(this.availableSuggestionsCount)}</span>`; }
function block4$1(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" class="ui5-hidden-text">${l$1(this.accInfo.input.ariaDescription)}</span>`; }
function block5$1(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-valueStateDesc" class="ui5-hidden-text">${l$1(this.ariaValueStateHiddenText)}</span>`; }

/* eslint no-unused-vars: 0 */
function block0$2(context, tags, suffix) { return effectiveHtml `${this.showSuggestions ? block1$2.call(this, context, tags, suffix) : undefined}${this.hasValueStateMessage ? block17.call(this, context, tags, suffix) : undefined} `; }
function block1$2(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-responsive-popover", tags, suffix)} class="${o$2(this.classes.popover)}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${styleMap(this.styles.suggestionsPopover)}" @ui5-after-open="${l$1(this._afterOpenPopover)}" @ui5-after-close="${l$1(this._afterClosePopover)}" @ui5-scroll="${l$1(this._scroll)}">${this._isPhone ? block2$2.call(this, context, tags, suffix) : undefined}${!this._isPhone ? block7.call(this, context, tags, suffix) : undefined}<${scopeTag("ui5-list", tags, suffix)} separators="${l$1(this.suggestionSeparators)}" @mousedown="${this.onItemMouseDown}" mode="SingleSelect">${c(this.suggestionObjects, (item, index) => item._id || index, (item, index) => block12.call(this, context, tags, suffix, item, index))}</${scopeTag("ui5-list", tags, suffix)}>${this._isPhone ? block16.call(this, context, tags, suffix) : undefined}</${scopeTag("ui5-responsive-popover", tags, suffix)}>` : effectiveHtml `<ui5-responsive-popover class="${o$2(this.classes.popover)}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${styleMap(this.styles.suggestionsPopover)}" @ui5-after-open="${l$1(this._afterOpenPopover)}" @ui5-after-close="${l$1(this._afterClosePopover)}" @ui5-scroll="${l$1(this._scroll)}">${this._isPhone ? block2$2.call(this, context, tags, suffix) : undefined}${!this._isPhone ? block7.call(this, context, tags, suffix) : undefined}<ui5-list separators="${l$1(this.suggestionSeparators)}" @mousedown="${this.onItemMouseDown}" mode="SingleSelect">${c(this.suggestionObjects, (item, index) => item._id || index, (item, index) => block12.call(this, context, tags, suffix, item, index))}</ui5-list>${this._isPhone ? block16.call(this, context, tags, suffix) : undefined}</ui5-responsive-popover>`; }
function block2$2(context, tags, suffix) { return suffix ? effectiveHtml `<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${l$1(this._headerTitleText)}</span><${scopeTag("ui5-button", tags, suffix)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this._closeRespPopover}"></${scopeTag("ui5-button", tags, suffix)}></div><div class="row"><div class="input-root-phone native-input-wrapper"><${scopeTag("ui5-input", tags, suffix)} class="ui5-input-inner-phone" type="${l$1(this.inputType)}" .value="${l$1(this.value)}" ?show-clear-icon=${this.showClearIcon} placeholder="${l$1(this.placeholder)}" @ui5-input="${l$1(this._handleInput)}" @ui5-change="${l$1(this._handleChange)}"></${scopeTag("ui5-input", tags, suffix)}></div></div>${this.hasValueStateMessage ? block3$1.call(this, context, tags, suffix) : undefined}</div>` : effectiveHtml `<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${l$1(this._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this._closeRespPopover}"></ui5-button></div><div class="row"><div class="input-root-phone native-input-wrapper"><ui5-input class="ui5-input-inner-phone" type="${l$1(this.inputType)}" .value="${l$1(this.value)}" ?show-clear-icon=${this.showClearIcon} placeholder="${l$1(this.placeholder)}" @ui5-input="${l$1(this._handleInput)}" @ui5-change="${l$1(this._handleChange)}"></ui5-input></div></div>${this.hasValueStateMessage ? block3$1.call(this, context, tags, suffix) : undefined}</div>`; }
function block3$1(context, tags, suffix) { return suffix ? effectiveHtml `<div class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.suggestionPopoverHeader)}"><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block4.call(this, context, tags, suffix) : block5.call(this, context, tags, suffix)}</div>` : effectiveHtml `<div class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.suggestionPopoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block4.call(this, context, tags, suffix) : block5.call(this, context, tags, suffix)}</div>`; }
function block4(context, tags, suffix) { return effectiveHtml `${l$1(this.valueStateText)}`; }
function block5(context, tags, suffix) { return effectiveHtml `${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block6.call(this, context, tags, suffix, item, index))}`; }
function block6(context, tags, suffix, item, index) { return effectiveHtml `${l$1(item)}`; }
function block7(context, tags, suffix) { return effectiveHtml `${this.hasValueStateMessage ? block8.call(this, context, tags, suffix) : undefined}`; }
function block8(context, tags, suffix) { return suffix ? effectiveHtml `<div slot="header" ?focused=${this._isValueStateFocused} class="ui5-responsive-popover-header ${o$2(this.classes.popoverValueState)}" style=${styleMap(this.styles.suggestionPopoverHeader)}><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block9.call(this, context, tags, suffix) : block10.call(this, context, tags, suffix)}</div>` : effectiveHtml `<div slot="header" ?focused=${this._isValueStateFocused} class="ui5-responsive-popover-header ${o$2(this.classes.popoverValueState)}" style=${styleMap(this.styles.suggestionPopoverHeader)}><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block9.call(this, context, tags, suffix) : block10.call(this, context, tags, suffix)}</div>`; }
function block9(context, tags, suffix) { return effectiveHtml `${l$1(this.valueStateText)}`; }
function block10(context, tags, suffix) { return effectiveHtml `${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block11.call(this, context, tags, suffix, item, index))}`; }
function block11(context, tags, suffix, item, index) { return effectiveHtml `${l$1(item)}`; }
function block12(context, tags, suffix, item, index) { return effectiveHtml `${item.groupItem ? block13.call(this, context, tags, suffix, item, index) : block14.call(this, context, tags, suffix, item, index)}`; }
function block13(context, tags, suffix, item, index) { return suffix ? effectiveHtml `<${scopeTag("ui5-li-groupheader", tags, suffix)} data-ui5-key="${l$1(item.key)}">${o$1(item.text)}</${scopeTag("ui5-li-groupheader", tags, suffix)}>` : effectiveHtml `<ui5-li-groupheader data-ui5-key="${l$1(item.key)}">${o$1(item.text)}</ui5-li-groupheader>`; }
function block14(context, tags, suffix, item, index) { return suffix ? effectiveHtml `<${scopeTag("ui5-li-suggestion-item", tags, suffix)} wrapping-type="Normal" image="${l$1(item.image)}" icon="${l$1(item.icon)}" additional-text="${l$1(item.additionalText)}" type="${l$1(item.type)}" additional-text-state="${l$1(item.additionalTextState)}" data-ui5-key="${l$1(item.key)}">${o$1(item.text)}${item.description ? block15.call(this, context, tags, suffix, item, index) : undefined}</${scopeTag("ui5-li-suggestion-item", tags, suffix)}>` : effectiveHtml `<ui5-li-suggestion-item wrapping-type="Normal" image="${l$1(item.image)}" icon="${l$1(item.icon)}" additional-text="${l$1(item.additionalText)}" type="${l$1(item.type)}" additional-text-state="${l$1(item.additionalTextState)}" data-ui5-key="${l$1(item.key)}">${o$1(item.text)}${item.description ? block15.call(this, context, tags, suffix, item, index) : undefined}</ui5-li-suggestion-item>`; }
function block15(context, tags, suffix, item, index) { return effectiveHtml `<span slot="richDescription">${o$1(item.description)}</span>`; }
function block16(context, tags, suffix) { return suffix ? effectiveHtml `<div slot="footer" class="ui5-responsive-popover-footer"><${scopeTag("ui5-button", tags, suffix)} design="Transparent" @click="${this._closeRespPopover}">OK</${scopeTag("ui5-button", tags, suffix)}></div>` : effectiveHtml `<div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${this._closeRespPopover}">OK</ui5-button></div>`; }
function block17(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-popover", tags, suffix)} skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="${l$1(this._valueStatePopoverHorizontalAlign)}"><div slot="header" class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.popoverHeader)}"><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block18.call(this, context, tags, suffix) : block19.call(this, context, tags, suffix)}</div></${scopeTag("ui5-popover", tags, suffix)}>` : effectiveHtml `<ui5-popover skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="${l$1(this._valueStatePopoverHorizontalAlign)}"><div slot="header" class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.popoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block18.call(this, context, tags, suffix) : block19.call(this, context, tags, suffix)}</div></ui5-popover>`; }
function block18(context, tags, suffix) { return effectiveHtml `${l$1(this.valueStateText)}`; }
function block19(context, tags, suffix) { return effectiveHtml `${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block20.call(this, context, tags, suffix, item, index))}`; }
function block20(context, tags, suffix, item, index) { return effectiveHtml `${l$1(item)}`; }

const StartsWith = (value, items, propName) => items.filter(item => item[propName].toLowerCase().startsWith(value.toLowerCase()));

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$5 = { packageName: "@ui5/webcomponents", fileName: "themes/Input.css", content: ":host{vertical-align:middle}.ui5-hidden-text{clip:rect(1px,1px,1px,1px);font-size:0;left:-1000px;pointer-events:none;position:absolute;top:-1000px;user-select:none}[input-icon]{border-inline-start:var(--_ui5-v1-18-0_input_icon_border);border-radius:var(--_ui5-v1-18-0_input_icon_border_radius);color:var(--_ui5-v1-18-0_input_icon_color);cursor:pointer;min-height:1rem;min-width:1rem;outline:none;padding:var(--_ui5-v1-18-0_input_icon_padding)}[input-icon][pressed]{background:var(--_ui5-v1-18-0_input_icon_pressed_bg);border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_pressed_color)}[input-icon]:active{background-color:var(--sapButton_Active_Background);border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_pressed_color)}[input-icon]:not([pressed]):not(:active):hover{background:var(--_ui5-v1-18-0_input_icon_hover_bg);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow)}[input-icon]:hover{border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow)}:host(:not([hidden])){display:inline-block}:host{background:var(--sapField_BackgroundStyle);background-color:var(--_ui5-v1-18-0_input_background_color);border:var(--_ui5-v1-18-0-input-border);border-radius:var(--_ui5-v1-18-0_input_border_radius);box-sizing:border-box;color:var(--sapField_TextColor);font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontSize);font-style:normal;height:var(--_ui5-v1-18-0_input_height);margin:var(--_ui5-v1-18-0_input_margin_top_bottom) 0;min-width:calc(var(--_ui5-v1-18-0_input_min_width) + var(--_ui5-v1-18-0-input-icons-count)*var(--_ui5-v1-18-0_input_icon_width));text-align:start;transition:var(--_ui5-v1-18-0_input_transition);width:var(--_ui5-v1-18-0_input_width)}:host(:not([readonly])),:host([readonly][disabled]){box-shadow:var(--sapField_Shadow)}:host([focused]:not([opened])){background-color:var(--sapField_Focus_Background);border-color:var(--_ui5-v1-18-0_input_focused_border_color)}.ui5-input-focusable-element{position:relative}:host([focused]:not([opened])) .ui5-input-focusable-element:after{border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--_ui5-v1-18-0_input_focus_outline_color);border-radius:var(--_ui5-v1-18-0_input_focus_border_radius);bottom:var(--_ui5-v1-18-0_input_focus_offset);content:var(--ui5-v1-18-0_input_focus_pseudo_element_content);left:var(--_ui5-v1-18-0_input_focus_offset);pointer-events:none;position:absolute;right:var(--_ui5-v1-18-0_input_focus_offset);top:var(--_ui5-v1-18-0_input_focus_offset);z-index:2}.ui5-input-root:before{background-color:var(--_ui5-v1-18-0_input_bottom_border_color);border-bottom-left-radius:8px;border-bottom-right-radius:8px;bottom:-2px;content:\"\";height:var(--_ui5-v1-18-0_input_bottom_border_height);left:1px;position:absolute;transition:var(--_ui5-v1-18-0_input_transition);width:calc(100% - 2px)}.ui5-input-root{background:transparent;border-radius:var(--_ui5-v1-18-0_input_border_radius);box-sizing:border-box;color:inherit;display:inline-block;height:100%;outline:none;overflow:hidden;position:relative;transition:border-color .2s ease-in-out;width:100%}:host([disabled]){background-color:var(--_ui5-v1-18-0-input_disabled_background);border-color:var(--_ui5-v1-18-0_input_disabled_border_color);cursor:default;opacity:var(--_ui5-v1-18-0_input_disabled_opacity);pointer-events:none}:host([disabled]) .ui5-input-root:before,:host([readonly]) .ui5-input-root:before{content:none}[inner-input]{-webkit-appearance:none;-moz-appearance:textfield;background:transparent;border:none;box-sizing:border-box;color:inherit;flex:1;font-family:inherit;font-size:inherit;font-style:inherit;letter-spacing:inherit;line-height:inherit;min-width:var(--_ui5-v1-18-0_input_min_width);outline:none;padding:var(--_ui5-v1-18-0_input_inner_padding);text-align:inherit;text-overflow:ellipsis;width:100%;word-spacing:inherit}[inner-input][inner-input-with-icon]{padding:var(--_ui5-v1-18-0_input_inner_padding_with_icon)}.ui5-input-value-state-icon{align-items:center;display:var(--_ui5-v1-18-0-input-value-state-icon-display);height:100%}.ui5-input-value-state-icon>svg{margin-right:8px}[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}:host([disabled]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([disabled]) [inner-input]::-moz-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-moz-placeholder{visibility:hidden}[inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-18-0_input_placeholder_color);font-style:var(--_ui5-v1-18-0_input_placeholder_style);font-weight:400;padding-right:.125rem}[inner-input]::-moz-placeholder{color:var(--_ui5-v1-18-0_input_placeholder_color);font-style:var(--_ui5-v1-18-0_input_placeholder_style);font-weight:400;padding-right:.125rem}:host([value-state=Error]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-18-0-input_error_placeholder_color);font-weight:var(--_ui5-v1-18-0_input_value_state_error_warning_placeholder_font_weight)}:host([value-state=Error]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-18-0-input_error_placeholder_color);font-weight:var(--_ui5-v1-18-0_input_value_state_error_warning_placeholder_font_weight)}:host([value-state=Warning]) [inner-input]::-webkit-input-placeholder{font-weight:var(--_ui5-v1-18-0_input_value_state_error_warning_placeholder_font_weight)}:host([value-state=Warning]) [inner-input]::-moz-placeholder{font-weight:var(--_ui5-v1-18-0_input_value_state_error_warning_placeholder_font_weight)}:host([value-state=Success]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-18-0_input_placeholder_color)}:host([value-state=Success]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-18-0_input_placeholder_color)}:host([value-state=Information]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-18-0_input_placeholder_color)}:host([value-state=Information]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-18-0_input_placeholder_color)}.ui5-input-content{background:transparent;border-radius:var(--_ui5-v1-18-0_input_border_radius);box-sizing:border-box;color:inherit;display:flex;flex-direction:row;height:100%;justify-content:flex-end;outline:none;overflow:hidden}:host([readonly]:not([disabled])){background:var(--sapField_ReadOnly_BackgroundStyle);background-color:var(--_ui5-v1-18-0_input_readonly_background);border-color:var(--_ui5-v1-18-0_input_readonly_border_color)}:host(:not([value-state]):not([readonly]):hover),:host([value-state=None]:not([readonly]):hover){background:var(--sapField_Hover_BackgroundStyle);background-color:var(--sapField_Hover_Background);border:var(--_ui5-v1-18-0_input_hover_border);border-color:var(--_ui5-v1-18-0_input_focused_border_color);box-shadow:var(--sapField_Hover_Shadow)}:host(:not([value-state]):not([readonly])[focused]:not([opened]):hover),:host([value-state=None]:not([readonly])[focused]:not([opened]):hover){box-shadow:none}:host([focused]):not([opened]) .ui5-input-root:before{content:none}:host(:not([readonly]):not([disabled])[value-state]:not([value-state=None])){border-width:var(--_ui5-v1-18-0_input_state_border_width)}:host([value-state=Error]) [inner-input],:host([value-state=Warning]) [inner-input]{font-style:var(--_ui5-v1-18-0_input_error_warning_font_style);text-indent:var(--_ui5-v1-18-0_input_error_warning_text_indent)}:host([value-state=Error]) [inner-input]{font-weight:var(--_ui5-v1-18-0_input_error_font_weight)}:host([value-state=Warning]) [inner-input]{font-weight:var(--_ui5-v1-18-0_input_warning_font_weight)}:host([value-state=Error]:not([readonly]):not([disabled])){background:var(--sapField_InvalidBackgroundStyle);background-color:var(--sapField_InvalidBackground);border-color:var(--_ui5-v1-18-0_input_value_state_error_border_color);box-shadow:var(--sapField_InvalidShadow)}:host([value-state=Error][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-18-0_input_focused_value_state_error_background);border-color:var(--_ui5-v1-18-0_input_focused_value_state_error_border_color)}:host([value-state=Error][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-18-0_input_focused_value_state_error_focus_outline_color)}:host([value-state=Error]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-18-0-input-value-state-error-border-botom-color)}:host([value-state=Error]:not([readonly]):not([focused]):hover),:host([value-state=Error]:not([readonly])[focused][opened]:hover){background-color:var(--_ui5-v1-18-0_input_value_state_error_hover_background);box-shadow:var(--sapField_Hover_InvalidShadow)}:host([value-state=Error]:not([readonly]):not([disabled])),:host([value-state=Information]:not([readonly]):not([disabled])),:host([value-state=Warning]:not([readonly]):not([disabled])){border-style:var(--_ui5-v1-18-0_input_error_warning_border_style)}:host([value-state=Warning]:not([readonly]):not([disabled])){background:var(--sapField_WarningBackgroundStyle);background-color:var(--sapField_WarningBackground);border-color:var(--_ui5-v1-18-0_input_value_state_warning_border_color);box-shadow:var(--sapField_WarningShadow)}:host([value-state=Warning][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-18-0_input_focused_value_state_warning_background);border-color:var(--_ui5-v1-18-0_input_focused_value_state_warning_border_color)}:host([value-state=Warning][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-18-0_input_focused_value_state_warning_focus_outline_color)}:host([value-state=Warning]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-18-0_input_value_state_warning_border_botom_color)}:host([value-state=Warning]:not([readonly]):not([focused]):hover),:host([value-state=Warning]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_WarningShadow)}:host([value-state=Success]:not([readonly]):not([disabled])){background:var(--sapField_SuccessBackgroundStyle);background-color:var(--sapField_SuccessBackground);border-color:var(--_ui5-v1-18-0_input_value_state_success_border_color);border-width:var(--_ui5-v1-18-0_input_value_state_success_border_width);box-shadow:var(--sapField_SuccessShadow)}:host([value-state=Success][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-18-0_input_focused_value_state_success_background);border-color:var(--_ui5-v1-18-0_input_focused_value_state_success_border_color)}:host([value-state=Success][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-18-0_input_focused_value_state_success_focus_outline_color)}:host([value-state=Success]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-18-0_input_value_state_success_border_botom_color)}:host([value-state=Success]:not([readonly]):not([focused]):hover),:host([value-state=Success]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_SuccessShadow)}:host([value-state=Information]:not([readonly]):not([disabled])){background:var(--sapField_InformationBackgroundStyle);background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-v1-18-0_input_value_state_information_border_color);border-width:var(--_ui5-v1-18-0_input_information_border_width);box-shadow:var(--sapField_InformationShadow)}:host([value-state=Information][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-18-0_input_focused_value_state_information_background);border-color:var(--_ui5-v1-18-0_input_focused_value_state_information_border_color)}:host([value-state=Information]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-18-0_input_value_success_information_border_botom_color)}:host([value-state=Information]:not([readonly]):not([focused]):hover),:host([value-state=Information]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_InformationShadow)}.ui5-input-icon-root{align-items:center;display:flex;height:100%;justify-content:center;min-width:var(--_ui5-v1-18-0_input_icon_min_width)}::slotted([ui5-icon][slot=icon]){align-self:start;box-sizing:content-box!important;padding:var(--_ui5-v1-18-0_input_custom_icon_padding)}:host([value-state=Error]) [input-icon],:host([value-state=Warning]) [input-icon]{padding:var(--_ui5-v1-18-0_input_error_warning_icon_padding)}:host([value-state=Error][focused]) [input-icon],:host([value-state=Warning][focused]) [input-icon]{padding:var(--_ui5-v1-18-0_input_error_warning_focused_icon_padding)}:host([value-state=Information]) [input-icon]{padding:var(--_ui5-v1-18-0_input_information_icon_padding)}:host([value-state=Information][focused]) [input-icon]{padding:var(--_ui5-v1-18-0_input_information_focused_icon_padding)}:host([value-state=Error]) ::slotted([input-icon][ui5-icon]),:host([value-state=Error]) ::slotted([ui5-icon][slot=icon]),:host([value-state=Warning]) ::slotted([ui5-icon][slot=icon]){padding:var(--_ui5-v1-18-0_input_error_warning_custom_icon_padding)}:host([value-state=Error][focused]) ::slotted([input-icon][ui5-icon]),:host([value-state=Error][focused]) ::slotted([ui5-icon][slot=icon]),:host([value-state=Warning][focused]) ::slotted([ui5-icon][slot=icon]){padding:var(--_ui5-v1-18-0_input_error_warning_custom_focused_icon_padding)}:host([value-state=Information]) ::slotted([ui5-icon][slot=icon]){padding:var(--_ui5-v1-18-0_input_information_custom_icon_padding)}:host([value-state=Information][focused]) ::slotted([ui5-icon][slot=icon]){padding:var(--_ui5-v1-18-0_input_information_custom_focused_icon_padding)}:host([value-state=Error]) [input-icon]:active,:host([value-state=Error]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-18-0_input_error_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_error_pressed_color)}:host([value-state=Error]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-18-0_input_error_icon_box_shadow)}:host([value-state=Warning]) [input-icon]:active,:host([value-state=Warning]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-18-0_input_warning_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_warning_pressed_color)}:host([value-state=Warning]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-18-0_input_warning_icon_box_shadow)}:host([value-state=Information]) [input-icon]:active,:host([value-state=Information]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-18-0_input_information_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_information_pressed_color)}:host([value-state=Information]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-18-0_input_information_icon_box_shadow)}:host([value-state=Success]) [input-icon]:active,:host([value-state=Success]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-18-0_input_success_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_success_pressed_color)}:host([value-state=Success]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-18-0_input_success_icon_box_shadow)}.ui5-input-clear-icon-wrapper{align-items:center;box-sizing:border-box;display:flex;height:var(--_ui5-v1-18-0_input_icon_wrapper_height);justify-content:center;min-width:var(--_ui5-v1-18-0_input_icon_width);padding:0;width:var(--_ui5-v1-18-0_input_icon_width)}:host([value-state]:not([value-state=None]):not([value-state=Success])) .ui5-input-clear-icon-wrapper{height:var(--_ui5-v1-18-0_input_icon_wrapper_state_height);vertical-align:top}:host([value-state=Success]) .ui5-input-clear-icon-wrapper{height:var(--_ui5-v1-18-0_input_icon_wrapper_success_state_height)}[ui5-icon].ui5-input-clear-icon{color:inherit;padding:0}[inner-input]::-webkit-inner-spin-button,[inner-input]::-webkit-outer-spin-button{-webkit-appearance:inherit;margin:inherit}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$4 = { packageName: "@ui5/webcomponents", fileName: "themes/ResponsivePopoverCommon.css", content: ".input-root-phone{background:var(--sapField_BackgroundStyle);background-color:var(--_ui5-v1-18-0_input_background_color);border:var(--_ui5-v1-18-0-input-border);border-radius:var(--_ui5-v1-18-0_input_border_radius);box-sizing:border-box;color:var(--sapField_TextColor);flex:1;font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontSize);height:var(--_ui5-v1-18-0_input_height);position:relative}.input-root-phone [inner-input]{height:100%;padding:0 .5rem;width:100%}.input-root-phone [inner-input]:focus{background-color:var(--sapField_Focus_Background)}.input-root-phone:focus-within:before{border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-18-0_input_focus_border_radius);bottom:var(--_ui5-v1-18-0_input_focus_offset);content:\"\";left:var(--_ui5-v1-18-0_input_focus_offset);pointer-events:none;position:absolute;right:var(--_ui5-v1-18-0_input_focus_offset);top:var(--_ui5-v1-18-0_input_focus_offset);z-index:2}.input-root-phone [value-state=Error] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Success] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Warning] [input-icon][data-ui5-compact-size]{padding:.1875rem .5rem}[inner-input]{-webkit-appearance:none;-moz-appearance:textfield;background:transparent;border:none;border-radius:var(--_ui5-v1-18-0_input_border_radius);box-sizing:border-box;color:inherit;flex:1;font-family:inherit;font-size:inherit;font-style:normal;line-height:normal;min-width:3rem;outline:none;padding:var(--_ui5-v1-18-0_input_inner_padding);text-overflow:ellipsis}[inner-input]::-moz-selection,[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}[inner-input]::-webkit-input-placeholder{color:var(--sapField_PlaceholderTextColor);font-style:italic}[inner-input]::-moz-placeholder{color:var(--sapField_PlaceholderTextColor);font-style:italic}.input-root-phone[value-state]:not([value-state=None]){border-width:var(--_ui5-v1-18-0_input_state_border_width)}.input-root-phone[value-state=Error] [inner-input],.input-root-phone[value-state=Warning] [inner-input]{font-style:var(--_ui5-v1-18-0_input_error_warning_font_style)}.input-root-phone[value-state=Error] [inner-input]{font-weight:var(--_ui5-v1-18-0_input_error_font_weight)}.input-root-phone[value-state=Error]:not([readonly]){background:var(--sapField_InvalidBackgroundStyle);background-color:var(--sapField_InvalidBackground);border-color:var(--_ui5-v1-18-0_input_value_state_error_border_color)}.input-root-phone[value-state=Error]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-18-0_input_focused_value_state_error_background);border-color:var(--_ui5-v1-18-0_input_focused_value_state_error_border_color)}.input-root-phone[value-state=Error]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-18-0_input_focused_value_state_error_focus_outline_color)}.input-root-phone[value-state=Error]:not([readonly]):not([disabled]),.input-root-phone[value-state=Information]:not([readonly]):not([disabled]),.input-root-phone[value-state=Warning]:not([readonly]):not([disabled]){border-style:var(--_ui5-v1-18-0_input_error_warning_border_style)}.input-root-phone[value-state=Warning]:not([readonly]){background:var(--sapField_WarningBackgroundStyle);background-color:var(--sapField_WarningBackground);border-color:var(--_ui5-v1-18-0_input_value_state_warning_border_color)}.input-root-phone[value-state=Warning]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-18-0_input_focused_value_state_warning_background);border-color:var(--_ui5-v1-18-0_input_focused_value_state_warning_border_color)}.input-root-phone[value-state=Warning]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-18-0_input_focused_value_state_warning_focus_outline_color)}.input-root-phone[value-state=Success]:not([readonly]){background:var(--sapField_SuccessBackgroundStyle);background-color:var(--sapField_SuccessBackground);border-color:var(--_ui5-v1-18-0_input_value_state_success_border_color);border-width:var(--_ui5-v1-18-0_input_value_state_success_border_width)}.input-root-phone[value-state=Success]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-18-0_input_focused_value_state_success_background);border-color:var(--_ui5-v1-18-0_input_focused_value_state_success_border_color)}.input-root-phone[value-state=Success]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-18-0_input_focused_value_state_success_focus_outline_color)}.input-root-phone[value-state=Information]:not([readonly]){background:var(--sapField_InformationBackgroundStyle);background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-v1-18-0_input_value_state_information_border_color);border-width:var(--_ui5-v1-18-0_input_information_border_width)}.input-root-phone[value-state=Information]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-18-0_input_focused_value_state_information_background);border-color:var(--_ui5-v1-18-0_input_focused_value_state_information_border_color)}.ui5-multi-combobox-toggle-button{margin-left:.5rem}.ui5-responsive-popover-header{display:flex;flex-direction:column;min-height:2.5rem;width:100%}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5-v1-18-0_button_base_min_width))}.ui5-responsive-popover-header .row{align-items:center;box-sizing:border-box;display:flex;font-size:var(--sapFontHeader5Size);justify-content:center;min-height:2.5rem;padding:.25rem 1rem}.ui5-responsive-popover-footer{display:flex;justify-content:flex-end;padding:.25rem 0;width:100%}.ui5-responsive-popover-close-btn{position:absolute;right:1rem}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$3 = { packageName: "@ui5/webcomponents", fileName: "themes/ValueStateMessage.css", content: ".ui5-valuestatemessage-popover{border-radius:var(--_ui5-v1-18-0_value_state_message_popover_border_radius);box-shadow:var(--_ui5-v1-18-0_value_state_message_popover_box_shadow)}.ui5-input-value-state-message-icon{display:var(--_ui5-v1-18-0_input_value_state_icon_display);height:var(--_ui5-v1-18-0_value_state_message_icon_height);padding-right:.375rem;position:absolute;width:var(--_ui5-v1-18-0_value_state_message_icon_width)}.ui5-valuestatemessage-root .ui5-input-value-state-message-icon{left:var(--_ui5-v1-18-0_input_value_state_icon_offset)}.ui5-input-value-state-message-icon[name=error]{color:var(--sapNegativeElementColor)}.ui5-input-value-state-message-icon[name=alert]{color:var(--sapCriticalElementColor)}.ui5-input-value-state-message-icon[name=success]{color:var(--sapPositiveElementColor)}.ui5-input-value-state-message-icon[name=information]{color:var(--sapInformativeElementColor)}.ui5-valuestatemessage-root{border:var(--_ui5-v1-18-0_value_state_message_border);box-sizing:border-box;color:var(--sapTextColor);display:inline-block;font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontSmallSize);height:auto;min-width:6.25rem;overflow:hidden;padding:var(--_ui5-v1-18-0_value_state_message_padding);text-overflow:ellipsis}[ui5-popover] .ui5-valuestatemessage-header,[ui5-responsive-popover] .ui5-valuestatemessage-header{min-height:2rem}[ui5-responsive-popover] .ui5-valuestatemessage-header{border:var(--_ui5-v1-18-0_value_state_header_border);border-bottom:var(--_ui5-v1-18-0_value_state_header_border_bottom);padding:var(--_ui5-v1-18-0_value_state_header_padding)}.ui5-valuestatemessage--success{background:var(--sapSuccessBackground)}.ui5-valuestatemessage--warning{background:var(--sapWarningBackground)}.ui5-valuestatemessage--error{background:var(--sapErrorBackground)}.ui5-valuestatemessage--information{background:var(--sapInformationBackground)}.ui5-responsive-popover-header:focus,.ui5-responsive-popover-header[focused]{outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:var(--_ui5-v1-18-0_value_state_header_offset)}.ui5-valuestatemessage-popover::part(content),.ui5-valuestatemessage-popover::part(header){padding:0}.ui5-valuestatemessage-popover::part(footer),.ui5-valuestatemessage-popover::part(header){min-height:0}.ui5-suggestions-popover-with-value-state-header::part(header),.ui5-valuestatemessage-popover::part(header){margin-bottom:0}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$2 = { packageName: "@ui5/webcomponents", fileName: "themes/Suggestions.css", content: ".ui5-suggestions-popover{box-shadow:var(--sapContent_Shadow1)}.ui5-suggestions-popover::part(content),.ui5-suggestions-popover::part(header){padding:0}.ui5-suggestions-popover::part(footer){padding:0 1rem}.ui5-suggestions-popover [ui5-li-suggestion-item]::part(icon),.ui5-suggestions-popover [ui5-li]::part(icon){color:var(--sapList_TextColor)}.input-root-phone.native-input-wrapper{display:contents}.input-root-phone.native-input-wrapper:before{display:none}.native-input-wrapper .ui5-input-inner-phone{margin:0}" };

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Input_1;
// all sementic events
var INPUT_EVENTS;
(function (INPUT_EVENTS) {
    INPUT_EVENTS["CHANGE"] = "change";
    INPUT_EVENTS["INPUT"] = "input";
    INPUT_EVENTS["SUGGESTION_ITEM_SELECT"] = "suggestion-item-select";
})(INPUT_EVENTS || (INPUT_EVENTS = {}));
// all user interactions
var INPUT_ACTIONS;
(function (INPUT_ACTIONS) {
    INPUT_ACTIONS["ACTION_ENTER"] = "enter";
    INPUT_ACTIONS["ACTION_USER_INPUT"] = "input";
})(INPUT_ACTIONS || (INPUT_ACTIONS = {}));
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-input</code> component allows the user to enter and edit text or numeric values in one line.
 * <br>
 * Additionally, you can provide <code>suggestionItems</code>,
 * that are displayed in a popover right under the input.
 * <br><br>
 * The text field can be editable or read-only (<code>readonly</code> property),
 * and it can be enabled or disabled (<code>disabled</code> property).
 * To visualize semantic states, such as "error" or "warning", the <code>valueState</code> property is provided.
 * When the user makes changes to the text, the change event is fired,
 * which enables you to react on any text change.
 * <br><br>
 * <b>Note:</b> If you are using the <code>ui5-input</code> as a single npm module,
 * don't forget to import the <code>InputSuggestions</code> module from
 * "@ui5/webcomponents/dist/features/InputSuggestions.js"
 * to enable the suggestions functionality.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-input</code> provides the following keyboard shortcuts:
 * <br>
 *
 * <ul>
 * <li>[ESC] - Closes the suggestion list, if open. If closed or not enabled, cancels changes and reverts to the value which the Input field had when it got the focus.</li>
 * <li>[ENTER] or [RETURN] - If suggestion list is open takes over the current matching item and closes it. If value state or group header is focused, does nothing.</li>
 * <li>[DOWN] - Focuses the next matching item in the suggestion list.</li>
 * <li>[UP] - Focuses the previous matching item in the suggestion list.</li>
 * <li>[HOME] - If focus is in the text input, moves caret before the first character. If focus is in the list, highlights the first item and updates the input accordingly.</li>
 * <li>[END] - If focus is in the text input, moves caret after the last character. If focus is in the list, highlights the last item and updates the input accordingly.</li>
 * <li>[PAGEUP] - If focus is in the list, moves highlight up by page size (10 items by default). If focus is in the input, does nothing.</li>
 * <li>[PAGEDOWN] - If focus is in the list, moves highlight down by page size (10 items by default). If focus is in the input, does nothing.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Input.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code> (optional - for input suggestions support)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Input
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-input
 * @appenddocs sap.ui.webc.main.SuggestionItem sap.ui.webc.main.SuggestionGroupItem
 * @implements sap.ui.webc.main.IInput
 * @public
 */
let Input = Input_1 = class Input extends UI5Element {
    constructor() {
        super();
        // Indicates if there is selected suggestionItem.
        this.hasSuggestionItemSelected = false;
        // Represents the value before user moves selection from suggestion item to another
        // and its value is updated after each move.
        // Note: Used to register and fire "input" event upon [SPACE] or [ENTER].
        // Note: The property "value" is updated upon selection move and can`t be used.
        this.valueBeforeItemSelection = "";
        // Represents the value before user moves selection between the suggestion items
        // and its value remains the same when the user navigates up or down the list.
        // Note: Used to cancel selection upon [ESC].
        this.valueBeforeItemPreview = "";
        // Indicates if the user selection has been canceled with [ESC].
        this.suggestionSelectionCanceled = false;
        // tracks the value between focus in and focus out to detect that change event should be fired.
        this.previousValue = "";
        // Indicates, if the component is rendering for first time.
        this.firstRendering = true;
        // The typed in value.
        this.typedInValue = "";
        // The last value confirmed by the user with "ENTER"
        this.lastConfirmedValue = "";
        // Indicates, if the user is typing. Gets reset once popup is closed
        this.isTyping = false;
        // Suggestions array initialization
        this.suggestionObjects = [];
        this._handleResizeBound = this._handleResize.bind(this);
        this._keepInnerValue = false;
        this._focusedAfterClear = false;
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResizeBound);
        registerUI5Element(this, this._updateAssociatedLabelsTexts.bind(this));
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResizeBound);
        deregisterUI5Element(this);
    }
    onBeforeRendering() {
        if (!this._keepInnerValue) {
            this._innerValue = this.value;
        }
        if (this.showSuggestions) {
            this.enableSuggestions();
            this.suggestionObjects = this.Suggestions.defaultSlotProperties(this.typedInValue);
        }
        this.effectiveShowClearIcon = (this.showClearIcon && !!this.value && !this.readonly && !this.disabled);
        this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
        this.FormSupport = getFeature("FormSupport");
        const hasItems = !!this.suggestionItems.length;
        const hasValue = !!this.value;
        const isFocused = this.shadowRoot.querySelector("input") === getActiveElement();
        if (this._isPhone) {
            this.open = this.openOnMobile;
        }
        else if (this._forceOpen) {
            this.open = true;
        }
        else {
            this.open = hasValue && hasItems && isFocused && this.isTyping;
        }
        if (this.FormSupport) {
            this.FormSupport.syncNativeHiddenInput(this);
        }
        else if (this.name) {
            console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        const value = this.value;
        const innerInput = this.getInputDOMRefSync();
        if (!innerInput || !value) {
            return;
        }
        const autoCompletedChars = innerInput.selectionEnd - innerInput.selectionStart;
        // Typehead causes issues on Android devices, so we disable it for now
        // If there is already a selection the autocomplete has already been performed
        if (this._shouldAutocomplete && !isAndroid() && !autoCompletedChars && !this._isKeyNavigation) {
            const item = this._getFirstMatchingItem(value);
            if (item) {
                this._handleTypeAhead(item);
            }
        }
    }
    async onAfterRendering() {
        const innerInput = this.getInputDOMRefSync();
        if (this.Suggestions && this.showSuggestions) {
            this.Suggestions.toggle(this.open, {
                preventFocusRestore: true,
            });
            this._listWidth = await this.Suggestions._getListWidth();
        }
        if (this.shouldDisplayOnlyValueStateMessage) {
            this.openPopover();
        }
        else {
            this.closePopover();
        }
        if (this._performTextSelection) {
            // this is required to syncronize lit-html input's value and user's input
            // lit-html does not sync its stored value for the value property when the user is typing
            if (innerInput.value !== this._innerValue) {
                innerInput.value = this._innerValue;
            }
            if (this.typedInValue.length && this.value.length) {
                innerInput.setSelectionRange(this.typedInValue.length, this.value.length);
            }
        }
        this._performTextSelection = false;
    }
    _onkeydown(e) {
        this._isKeyNavigation = true;
        this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(e) || isDelete(e) || isEscape(e));
        if (isUp(e)) {
            return this._handleUp(e);
        }
        if (isDown(e)) {
            return this._handleDown(e);
        }
        if (isSpace(e)) {
            return this._handleSpace(e);
        }
        if (isTabNext(e)) {
            return this._handleTab();
        }
        if (isEnter(e)) {
            return this._handleEnter(e);
        }
        if (isPageUp(e)) {
            return this._handlePageUp(e);
        }
        if (isPageDown(e)) {
            return this._handlePageDown(e);
        }
        if (isHome(e)) {
            return this._handleHome(e);
        }
        if (isEnd(e)) {
            return this._handleEnd(e);
        }
        if (isEscape(e)) {
            return this._handleEscape();
        }
        if (this.showSuggestions) {
            this._clearPopoverFocusAndSelection();
        }
        this._keyDown = true;
        this._isKeyNavigation = false;
    }
    _onkeyup(e) {
        // The native Delete event does not update the value property "on time".
        // So, the (native) change event is always fired with the old value
        if (isDelete(e)) {
            this.value = e.target.value;
        }
        this._keyDown = false;
    }
    _handleUp(e) {
        if (this.Suggestions && this.Suggestions.isOpened()) {
            this.Suggestions.onUp(e);
        }
    }
    _handleDown(e) {
        if (this.Suggestions && this.Suggestions.isOpened()) {
            this.Suggestions.onDown(e);
        }
    }
    _handleSpace(e) {
        if (this.Suggestions) {
            this.Suggestions.onSpace(e);
        }
    }
    _handleTab() {
        if (this.Suggestions && (this.previousValue !== this.value)) {
            this.Suggestions.onTab();
        }
    }
    _handleEnter(e) {
        const itemPressed = !!(this.Suggestions && this.Suggestions.onEnter(e));
        const innerInput = this.getInputDOMRefSync();
        // Check for autocompleted item
        const matchingItem = this.suggestionItems.find(item => {
            return (item.text && item.text === this.value) || (item.textContent === this.value);
        });
        if (matchingItem) {
            const itemText = matchingItem.text ? matchingItem.text : (matchingItem.textContent || "");
            innerInput.setSelectionRange(itemText.length, itemText.length);
            if (!itemPressed) {
                this.selectSuggestion(matchingItem, true);
                this.open = false;
            }
        }
        if (this._isPhone && !this.suggestionItems.length && !this.isTypeNumber) {
            innerInput.setSelectionRange(this.value.length, this.value.length);
        }
        if (!itemPressed) {
            this.lastConfirmedValue = this.value;
            if (this.FormSupport) {
                this.FormSupport.triggerFormSubmit(this);
            }
            return;
        }
        this.focused = true;
    }
    _handlePageUp(e) {
        if (this._isSuggestionsFocused) {
            this.Suggestions.onPageUp(e);
        }
        else {
            e.preventDefault();
        }
    }
    _handlePageDown(e) {
        if (this._isSuggestionsFocused) {
            this.Suggestions.onPageDown(e);
        }
        else {
            e.preventDefault();
        }
    }
    _handleHome(e) {
        if (this._isSuggestionsFocused) {
            this.Suggestions.onHome(e);
        }
    }
    _handleEnd(e) {
        if (this._isSuggestionsFocused) {
            this.Suggestions.onEnd(e);
        }
    }
    _handleEscape() {
        const hasSuggestions = this.showSuggestions && !!this.Suggestions;
        const isOpen = hasSuggestions && this.open;
        const innerInput = this.getInputDOMRefSync();
        const isAutoCompleted = innerInput.selectionEnd - innerInput.selectionStart > 0;
        this.isTyping = false;
        if (!isOpen) {
            this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
            return;
        }
        if (isOpen && this.Suggestions._isItemOnTarget()) {
            // Restore the value.
            this.value = this.typedInValue || this.valueBeforeItemPreview;
            // Mark that the selection has been canceled, so the popover can close
            // and not reopen, due to receiving focus.
            this.suggestionSelectionCanceled = true;
            this.focused = true;
            return;
        }
        if (isAutoCompleted) {
            this.value = this.typedInValue;
        }
        if (this._isValueStateFocused) {
            this._isValueStateFocused = false;
            this.focused = true;
        }
    }
    async _onfocusin(e) {
        await this.getInputDOMRef();
        this.focused = true; // invalidating property
        if (!this._focusedAfterClear) {
            this.previousValue = this.value;
        }
        this.valueBeforeItemPreview = this.value;
        this._inputIconFocused = !!e.target && e.target === this.querySelector("[ui5-icon]");
        this._focusedAfterClear = false;
    }
    /**
     * Called on "focusin" of the native input HTML Element.
     * <b>Note:</b> implemented in MultiInput, but used in the Input template.
     */
    innerFocusIn() { }
    _onfocusout(e) {
        const toBeFocused = e.relatedTarget;
        const focusedOutToSuggestions = this.Suggestions && toBeFocused && toBeFocused.shadowRoot && toBeFocused.shadowRoot.contains(this.Suggestions.responsivePopover);
        const focusedOutToValueStateMessage = toBeFocused && toBeFocused.shadowRoot && toBeFocused.shadowRoot.querySelector(".ui5-valuestatemessage-root");
        this._keepInnerValue = false;
        if (this.showClearIcon && !this.effectiveShowClearIcon) {
            this._clearIconClicked = false;
            this._handleChange();
        }
        // if focusout is triggered by pressing on suggestion item or value state message popover, skip invalidation, because re-rendering
        // will happen before "itemPress" event, which will make item "active" state not visualized
        if (focusedOutToSuggestions || focusedOutToValueStateMessage) {
            e.stopImmediatePropagation();
            return;
        }
        if (toBeFocused && (toBeFocused).classList.contains(this._id)) {
            return;
        }
        this.open = false;
        this._clearPopoverFocusAndSelection();
        if (!this._clearIconClicked) {
            this.previousValue = "";
        }
        this.lastConfirmedValue = "";
        this.focused = false; // invalidating property
        this.isTyping = false;
        this._forceOpen = false;
    }
    _clearPopoverFocusAndSelection() {
        if (!this.showSuggestions || !this.Suggestions) {
            return;
        }
        this._isValueStateFocused = false;
        this.hasSuggestionItemSelected = false;
        this.Suggestions._deselectItems();
        this.Suggestions._clearItemFocus();
    }
    _click() {
        if (isPhone() && !this.readonly && this.Suggestions) {
            this.blur();
            this.openOnMobile = true;
        }
    }
    _handleChange() {
        if (this._clearIconClicked) {
            this._clearIconClicked = false;
            return;
        }
        if (this.previousValue !== this.getInputDOMRefSync().value) {
            this.fireEvent(INPUT_EVENTS.CHANGE);
            this.previousValue = this.value;
            this.typedInValue = this.value;
        }
    }
    _clear() {
        this.value = "";
        this.fireEvent(INPUT_EVENTS.INPUT);
        if (!this._isPhone) {
            this.focus();
            this._focusedAfterClear = true;
        }
    }
    _iconMouseDown() {
        this._clearIconClicked = true;
    }
    _scroll(e) {
        this.fireEvent("suggestion-scroll", {
            scrollTop: e.detail.scrollTop,
            scrollContainer: e.detail.targetRef,
        });
    }
    _handleInput(e) {
        const inputDomRef = this.getInputDOMRefSync();
        const emptyValueFiredOnNumberInput = this.value && this.isTypeNumber && !inputDomRef.value;
        const eventType = e.inputType
            || (e.detail && e.detail.inputType)
            || "";
        this._keepInnerValue = false;
        const allowedEventTypes = [
            "deleteWordBackward",
            "deleteWordForward",
            "deleteSoftLineBackward",
            "deleteSoftLineForward",
            "deleteEntireSoftLine",
            "deleteHardLineBackward",
            "deleteHardLineForward",
            "deleteByDrag",
            "deleteByCut",
            "deleteContent",
            "deleteContentBackward",
            "deleteContentForward",
            "historyUndo",
        ];
        this._shouldAutocomplete = !allowedEventTypes.includes(eventType) && !this.noTypeahead;
        this.suggestionSelectionCanceled = false;
        if (e instanceof InputEvent) {
            // ---- Special cases of numeric Input ----
            // ---------------- Start -----------------
            // When the last character after the delimiter is removed.
            // In such cases, we want to skip the re-rendering of the
            // component as this leads to cursor repositioning and causes user experience issues.
            // There are few scenarios:
            // Example: type "123.4" and press BACKSPACE - the native input is firing event with the whole part as value (123).
            // Pressing BACKSPACE again will remove the delimiter and the native input will fire event with the whole part as value again (123).
            // Example: type "123.456", select/mark "456" and press BACKSPACE - the native input is firing event with the whole part as value (123).
            // Example: type "123.456", select/mark "123.456" and press BACKSPACE - the native input is firing event with empty value.
            const delimiterCase = this.isTypeNumber
                && (e.inputType === "deleteContentForward" || e.inputType === "deleteContentBackward")
                && !e.target.value.includes(".")
                && this.value.includes(".");
            // Handle special numeric notation with "e", example "12.5e12"
            const eNotationCase = emptyValueFiredOnNumberInput && e.data === "e";
            // Handle special numeric notation with "-", example "-3"
            // When pressing BACKSPACE, the native input fires event with empty value
            const minusRemovalCase = emptyValueFiredOnNumberInput
                && this.value.startsWith("-")
                && this.value.length === 2
                && (e.inputType === "deleteContentForward" || e.inputType === "deleteContentBackward");
            if (delimiterCase || eNotationCase || minusRemovalCase) {
                this.value = e.target.value;
                this._keepInnerValue = true;
            }
            // ----------------- End ------------------
        }
        if (e.target === inputDomRef) {
            this.focused = true;
            // stop the native event, as the semantic "input" would be fired.
            e.stopImmediatePropagation();
        }
        this.fireEventByAction(INPUT_ACTIONS.ACTION_ENTER, e);
        this.hasSuggestionItemSelected = false;
        this._isValueStateFocused = false;
        if (this.Suggestions) {
            this.Suggestions.updateSelectedItemPosition(-1);
        }
        this.isTyping = true;
    }
    _startsWithMatchingItems(str) {
        const textProp = this.suggestionItems[0].text ? "text" : "textContent";
        return StartsWith(str, this.suggestionItems, textProp);
    }
    _getFirstMatchingItem(current) {
        if (!this.suggestionItems.length) {
            return;
        }
        const matchingItems = this._startsWithMatchingItems(current).filter(item => !item.groupItem);
        if (matchingItems.length) {
            return matchingItems[0];
        }
    }
    _handleTypeAhead(item) {
        const value = item.text ? item.text : item.textContent || "";
        this._innerValue = value;
        this.value = value;
        this._performTextSelection = true;
        this._shouldAutocomplete = false;
    }
    _handleResize() {
        this._inputWidth = this.offsetWidth;
    }
    _updateAssociatedLabelsTexts() {
        this._associatedLabelsTexts = getAssociatedLabelForTexts(this);
        this._accessibleLabelsRefTexts = getAllAccessibleNameRefTexts(this);
    }
    _closeRespPopover() {
        this.Suggestions.close(true);
    }
    async _afterOpenPopover() {
        // Set initial focus to the native input
        if (isPhone()) {
            (await this.getInputDOMRef()).focus();
        }
    }
    _afterClosePopover() {
        this.announceSelectedItem();
        // close device's keyboard and prevent further typing
        if (isPhone()) {
            this.blur();
            this.focused = false;
        }
        this.openOnMobile = false;
        this.open = false;
        this._forceOpen = false;
        if (this.hasSuggestionItemSelected) {
            this.focus();
        }
    }
    /**
     * Checks if the value state popover is open.
     * @returns {boolean} true if the value state popover is open, false otherwise
     */
    isValueStateOpened() {
        return !!this._isPopoverOpen;
    }
    async openPopover() {
        const popover = await this._getPopover();
        if (popover) {
            this._isPopoverOpen = true;
            popover.showAt(this);
        }
    }
    async closePopover() {
        const popover = await this._getPopover();
        popover && popover.close();
    }
    async _getPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector("[ui5-popover]");
    }
    /**
     * Manually opens the suggestions popover, assuming suggestions are enabled. Items must be preloaded for it to open.
     * @public
     * @method
     * @name sap.ui.webc.main.Input#openPicker
     * @return {void}
     * @since 1.3.0
     */
    openPicker() {
        if (!this.suggestionItems.length || this.disabled || this.readonly) {
            return;
        }
        this._forceOpen = true;
    }
    enableSuggestions() {
        if (this.Suggestions) {
            return;
        }
        const Suggestions = getFeature("InputSuggestions");
        if (Suggestions) {
            this.Suggestions = new Suggestions(this, "suggestionItems", true, false);
        }
        else {
            throw new Error(`You have to import "@ui5/webcomponents/dist/features/InputSuggestions.js" module to use ui5-input suggestions`);
        }
    }
    selectSuggestion(item, keyboardUsed) {
        if (item.groupItem) {
            return;
        }
        const value = this.typedInValue || this.value;
        const itemText = item.text || item.textContent || ""; // keep textContent for compatibility
        const fireInput = keyboardUsed
            ? this.valueBeforeItemSelection !== itemText : value !== itemText;
        this.hasSuggestionItemSelected = true;
        if (fireInput) {
            this.value = itemText;
            this.valueBeforeItemSelection = itemText;
            this.lastConfirmedValue = itemText;
            this._performTextSelection = true;
            this.hasSuggestionItemSelected = true;
            this.value = itemText;
            this.fireEvent(INPUT_EVENTS.CHANGE);
            if (isPhone()) {
                this.fireEvent(INPUT_EVENTS.INPUT);
            }
            // value might change in the change event handler
            this.typedInValue = this.value;
            this.previousValue = this.value;
        }
        this.valueBeforeItemPreview = "";
        this.suggestionSelectionCanceled = false;
        this.fireEvent(INPUT_EVENTS.SUGGESTION_ITEM_SELECT, { item });
        this.isTyping = false;
        this.openOnMobile = false;
        this._forceOpen = false;
    }
    previewSuggestion(item) {
        this.valueBeforeItemSelection = this.value;
        this.updateValueOnPreview(item);
        this.announceSelectedItem();
        this._previewItem = item;
    }
    /**
     * Updates the input value on item preview.
     * @param {Object} item The item that is on preview
     */
    updateValueOnPreview(item) {
        const noPreview = item.type === "Inactive" || item.groupItem;
        const itemValue = noPreview ? this.valueBeforeItemPreview : (item.effectiveTitle || item.textContent || "");
        this.value = itemValue;
        this._performTextSelection = true;
    }
    /**
     * The suggestion item on preview.
     * @type {sap.ui.webc.main.IInputSuggestionItem | null}
     * @name sap.ui.webc.main.Input.prototype.previewItem
     * @readonly
     * @public
     */
    get previewItem() {
        if (!this._previewItem) {
            return null;
        }
        return this.getSuggestionByListItem(this._previewItem);
    }
    async fireEventByAction(action, e) {
        if (this.disabled || this.readonly) {
            return;
        }
        const inputValue = await this.getInputValue();
        const isUserInput = action === INPUT_ACTIONS.ACTION_ENTER;
        this.value = inputValue;
        this.typedInValue = inputValue;
        this.valueBeforeItemPreview = inputValue;
        if (isUserInput) { // input
            this.fireEvent(INPUT_EVENTS.INPUT, { inputType: e.inputType });
            // Angular two way data binding
            this.fireEvent("value-changed");
        }
    }
    async getInputValue() {
        const domRef = this.getDomRef();
        if (domRef) {
            return (await this.getInputDOMRef()).value;
        }
        return "";
    }
    async getInputDOMRef() {
        if (isPhone() && this.Suggestions) {
            await this.Suggestions._getSuggestionPopover();
            return this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone");
        }
        return this.nativeInput;
    }
    getInputDOMRefSync() {
        if (isPhone() && this.Suggestions && this.Suggestions.responsivePopover) {
            return this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone").shadowRoot.querySelector("input");
        }
        return this.nativeInput;
    }
    /**
     * Returns a reference to the native input element
     * @protected
     */
    get nativeInput() {
        const domRef = this.getDomRef();
        return domRef ? domRef.querySelector(`input`) : null;
    }
    get nativeInputWidth() {
        return this.nativeInput ? this.nativeInput.offsetWidth : 0;
    }
    getLabelableElementId() {
        return this.getInputId();
    }
    getSuggestionByListItem(item) {
        const key = parseInt(item.getAttribute("data-ui5-key"));
        return this.suggestionItems[key];
    }
    /**
     * Returns if the suggestions popover is scrollable.
     * The method returns <code>Promise</code> that resolves to true,
     * if the popup is scrollable and false otherwise.
     * @returns {Promise}
     */
    isSuggestionsScrollable() {
        if (!this.Suggestions) {
            return Promise.resolve(false);
        }
        return this.Suggestions._isScrollable();
    }
    getInputId() {
        return `${this._id}-inner`;
    }
    /* Suggestions interface  */
    onItemMouseOver(e) {
        const item = e.target;
        const suggestion = this.getSuggestionByListItem(item);
        suggestion && suggestion.fireEvent("mouseover", {
            item: suggestion,
            targetRef: item,
        });
    }
    onItemMouseOut(e) {
        const item = e.target;
        const suggestion = this.getSuggestionByListItem(item);
        suggestion && suggestion.fireEvent("mouseout", {
            item: suggestion,
            targetRef: item,
        });
    }
    onItemMouseDown(e) {
        e.preventDefault();
    }
    onItemSelected(item, keyboardUsed) {
        this.selectSuggestion(item, keyboardUsed);
    }
    onItemPreviewed(item) {
        this.previewSuggestion(item);
        this.fireEvent("suggestion-item-preview", {
            item: this.getSuggestionByListItem(item),
            targetRef: item,
        });
    }
    get valueStateTypeMappings() {
        return {
            "Success": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
            "Information": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
            "Error": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
            "Warning": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
        };
    }
    valueStateTextMappings() {
        return {
            "Success": Input_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            "Information": Input_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
            "Error": Input_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Warning": Input_1.i18nBundle.getText(VALUE_STATE_WARNING),
        };
    }
    announceSelectedItem() {
        const invisibleText = this.shadowRoot.querySelector(`#${this._id}-selectionText`);
        invisibleText.textContent = this.itemSelectionAnnounce;
    }
    get _readonly() {
        return this.readonly && !this.disabled;
    }
    get _headerTitleText() {
        return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
    }
    get inputType() {
        return this.type.toLowerCase();
    }
    get isTypeNumber() {
        return this.type === InputType$1.Number;
    }
    get suggestionsTextId() {
        return this.showSuggestions ? `${this._id}-suggestionsText` : "";
    }
    get valueStateTextId() {
        return this.hasValueState ? `${this._id}-valueStateDesc` : "";
    }
    get accInfo() {
        const ariaHasPopupDefault = this.showSuggestions ? "true" : undefined;
        const ariaAutoCompleteDefault = this.showSuggestions ? "list" : undefined;
        const ariaDescribedBy = this._inputAccInfo.ariaDescribedBy ? `${this.suggestionsTextId} ${this.valueStateTextId} ${this._inputAccInfo.ariaDescribedBy}`.trim() : `${this.suggestionsTextId} ${this.valueStateTextId}`.trim();
        const info = {
            "input": {
                "ariaRoledescription": this._inputAccInfo && (this._inputAccInfo.ariaRoledescription || undefined),
                "ariaDescribedBy": ariaDescribedBy || undefined,
                "ariaInvalid": this.valueState === ValueState$1.Error ? "true" : undefined,
                "ariaHasPopup": this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : ariaHasPopupDefault,
                "ariaAutoComplete": this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : ariaAutoCompleteDefault,
                "role": this._inputAccInfo && this._inputAccInfo.role,
                "ariaControls": this._inputAccInfo && this._inputAccInfo.ariaControls,
                "ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
                "ariaDescription": this._inputAccInfo && this._inputAccInfo.ariaDescription,
                "ariaLabel": (this._inputAccInfo && this._inputAccInfo.ariaLabel) || this._accessibleLabelsRefTexts || this.accessibleName || this._associatedLabelsTexts || undefined,
            },
        };
        return info;
    }
    get nativeInputAttributes() {
        return {
            "min": this.isTypeNumber ? this._nativeInputAttributes.min : undefined,
            "max": this.isTypeNumber ? this._nativeInputAttributes.max : undefined,
            "step": this.isTypeNumber ? (this._nativeInputAttributes.step || "any") : undefined,
        };
    }
    get ariaValueStateHiddenText() {
        if (!this.hasValueState) {
            return;
        }
        const valueState = this.valueState !== ValueState$1.None ? this.valueStateTypeMappings[this.valueState] : "";
        if (this.shouldDisplayDefaultValueStateMessage) {
            return this.valueStateText ? `${valueState} ${this.valueStateText}` : valueState;
        }
        return `${valueState}`.concat(" ", this.valueStateMessageText.map(el => el.textContent).join(" "));
    }
    get itemSelectionAnnounce() {
        return this.Suggestions ? this.Suggestions.itemSelectionAnnounce : "";
    }
    get iconsCount() {
        const slottedIconsCount = this.icon ? this.icon.length : 0;
        const clearIconCount = Number(this.effectiveShowClearIcon) ?? 0;
        return slottedIconsCount + clearIconCount;
    }
    get classes() {
        return {
            popover: {
                "ui5-suggestions-popover": !this._isPhone && this.showSuggestions,
                "ui5-suggestions-popover-with-value-state-header": !this._isPhone && this.showSuggestions && this.hasValueStateMessage,
            },
            popoverValueState: {
                "ui5-valuestatemessage-root": true,
                "ui5-valuestatemessage-header": true,
                "ui5-valuestatemessage--success": this.valueState === ValueState$1.Success,
                "ui5-valuestatemessage--error": this.valueState === ValueState$1.Error,
                "ui5-valuestatemessage--warning": this.valueState === ValueState$1.Warning,
                "ui5-valuestatemessage--information": this.valueState === ValueState$1.Information,
            },
        };
    }
    get styles() {
        const remSizeIxPx = parseInt(getComputedStyle(document.documentElement).fontSize);
        const stylesObject = {
            popoverHeader: {
                "max-width": this._inputWidth ? `${this._inputWidth}px` : "",
            },
            suggestionPopoverHeader: {
                "display": this._listWidth === 0 ? "none" : "inline-block",
                "width": this._listWidth ? `${this._listWidth}px` : "",
            },
            suggestionsPopover: {
                "min-width": this._inputWidth ? `${this._inputWidth}px` : "",
                "max-width": this._inputWidth && (this._inputWidth / remSizeIxPx) > 40 ? `${this._inputWidth}px` : "40rem",
            },
            innerInput: {
                "padding": "",
            },
        };
        return stylesObject;
    }
    get suggestionSeparators() {
        return "None";
    }
    get valueStateMessageText() {
        return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
    }
    get shouldDisplayOnlyValueStateMessage() {
        return this.hasValueStateMessage && !this.readonly && !this.open && this.focused;
    }
    get shouldDisplayDefaultValueStateMessage() {
        return !this.valueStateMessage.length && this.hasValueStateMessage;
    }
    get hasValueState() {
        return this.valueState !== ValueState$1.None;
    }
    get hasValueStateMessage() {
        return this.hasValueState && this.valueState !== ValueState$1.Success
            && (!this._inputIconFocused // Handles the cases when valueStateMessage is forwarded (from datepicker e.g.)
                || !!(this._isPhone && this.Suggestions)); // Handles Input with suggestions on mobile
    }
    get valueStateText() {
        return this.valueState !== ValueState$1.None ? this.valueStateTextMappings()[this.valueState] : undefined;
    }
    get suggestionsText() {
        return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS);
    }
    get availableSuggestionsCount() {
        if (this.showSuggestions && (this.value || this.Suggestions.isOpened())) {
            const nonGroupItems = this.suggestionObjects.filter(item => !item.groupItem);
            switch (nonGroupItems.length) {
                case 0:
                    return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_NO_HIT);
                case 1:
                    return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_ONE_HIT);
                default:
                    return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, nonGroupItems.length);
            }
        }
        return undefined;
    }
    get step() {
        return this.isTypeNumber ? "any" : undefined;
    }
    get _isPhone() {
        return isPhone();
    }
    get _isSuggestionsFocused() {
        return !this.focused && this.Suggestions && this.Suggestions.isOpened();
    }
    /**
     * Returns the placeholder value.
     * @protected
     */
    get _placeholder() {
        return this.placeholder;
    }
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateInputIcon() {
        const iconPerValueState = {
            Error: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929L8.58579 10L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L10 8.58579L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L10 11.4142L7.70711 13.7071Z" fill="#EE3939"/>`,
            Warning: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.8619 0.49298C11.6823 0.187541 11.3544 0 11 0C10.6456 0 10.3177 0.187541 10.1381 0.49298L0.138066 17.493C-0.0438112 17.8022 -0.0461447 18.1851 0.13195 18.4965C0.310046 18.8079 0.641283 19 1 19H21C21.3587 19 21.69 18.8079 21.868 18.4965C22.0461 18.1851 22.0438 17.8022 21.8619 17.493L11.8619 0.49298ZM11 6C11.5523 6 12 6.44772 12 7V10C12 10.5523 11.5523 11 11 11C10.4477 11 10 10.5523 10 10V7C10 6.44772 10.4477 6 11 6ZM11 16C11.8284 16 12.5 15.3284 12.5 14.5C12.5 13.6716 11.8284 13 11 13C10.1716 13 9.5 13.6716 9.5 14.5C9.5 15.3284 10.1716 16 11 16Z" fill="#F58B00"/>`,
            Success: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10ZM14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289L8 11.5858L6.70711 10.2929C6.31658 9.90237 5.68342 9.90237 5.29289 10.2929C4.90237 10.6834 4.90237 11.3166 5.29289 11.7071L7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289Z" fill="#36A41D"/>`,
            Information: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3ZM9 6.5C9.82843 6.5 10.5 5.82843 10.5 5C10.5 4.17157 9.82843 3.5 9 3.5C8.17157 3.5 7.5 4.17157 7.5 5C7.5 5.82843 8.17157 6.5 9 6.5ZM9 8.5C9.55228 8.5 10 8.94772 10 9.5V13.5C10 14.0523 9.55228 14.5 9 14.5C8.44771 14.5 8 14.0523 8 13.5V9.5C8 8.94772 8.44771 8.5 9 8.5Z" fill="#1B90FF"/>`,
        };
        if (this.valueState !== ValueState$1.None) {
            return `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 20 20" fill="none">
				${iconPerValueState[this.valueState]};
			</svg>
			`;
        }
        return "";
    }
    get _valueStatePopoverHorizontalAlign() {
        return this.effectiveDir !== "rtl" ? "Left" : "Right";
    }
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageInputIcon() {
        const iconPerValueState = {
            Error: "error",
            Warning: "alert",
            Success: "sys-enter-2",
            Information: "information",
        };
        return this.valueState !== ValueState$1.None ? iconPerValueState[this.valueState] : "";
    }
    /**
     * Returns the caret position inside the native input
     * @protected
     */
    getCaretPosition() {
        return getCaretPosition(this.nativeInput);
    }
    /**
     * Sets the caret to a certain position inside the native input
     * @protected
     * @param pos
     */
    setCaretPosition(pos) {
        setCaretPosition(this.nativeInput, pos);
    }
    /**
     * Removes the fractional part of floating-point number.
     * @param {string} value the numeric value of Input of type "Number"
     */
    removeFractionalPart(value) {
        if (value.includes(".")) {
            return value.slice(0, value.indexOf("."));
        }
        if (value.includes(",")) {
            return value.slice(0, value.indexOf(","));
        }
        return value;
    }
    static async onDefine() {
        const Suggestions = getFeature("InputSuggestions");
        [Input_1.i18nBundle] = await Promise.all([
            getI18nBundle("@ui5/webcomponents"),
            Suggestions ? Suggestions.init() : Promise.resolve(),
        ]);
    }
};
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "disabled", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "highlight", void 0);
__decorate$1([
    property()
], Input.prototype, "placeholder", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "readonly", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "required", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "noTypeahead", void 0);
__decorate$1([
    property({ type: InputType$1, defaultValue: InputType$1.Text })
], Input.prototype, "type", void 0);
__decorate$1([
    property()
], Input.prototype, "value", void 0);
__decorate$1([
    property({ noAttribute: true })
], Input.prototype, "_innerValue", void 0);
__decorate$1([
    property({ type: ValueState$1, defaultValue: ValueState$1.None })
], Input.prototype, "valueState", void 0);
__decorate$1([
    property()
], Input.prototype, "name", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "showSuggestions", void 0);
__decorate$1([
    property({ validator: Integer })
], Input.prototype, "maxlength", void 0);
__decorate$1([
    property()
], Input.prototype, "accessibleName", void 0);
__decorate$1([
    property({ defaultValue: "" })
], Input.prototype, "accessibleNameRef", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "showClearIcon", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "effectiveShowClearIcon", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "focused", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "openOnMobile", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "open", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "_forceOpen", void 0);
__decorate$1([
    property({ type: Boolean })
], Input.prototype, "_isValueStateFocused", void 0);
__decorate$1([
    property({ type: Object, noAttribute: true })
], Input.prototype, "_inputAccInfo", void 0);
__decorate$1([
    property({ type: Object, noAttribute: true })
], Input.prototype, "_nativeInputAttributes", void 0);
__decorate$1([
    property({ validator: Integer })
], Input.prototype, "_inputWidth", void 0);
__decorate$1([
    property({ validator: Integer })
], Input.prototype, "_listWidth", void 0);
__decorate$1([
    property({ type: Boolean, noAttribute: true })
], Input.prototype, "_isPopoverOpen", void 0);
__decorate$1([
    property({ type: Boolean, noAttribute: true })
], Input.prototype, "_inputIconFocused", void 0);
__decorate$1([
    property({ type: String, noAttribute: true, defaultValue: undefined })
], Input.prototype, "_associatedLabelsTexts", void 0);
__decorate$1([
    property({ type: String, noAttribute: true, defaultValue: undefined })
], Input.prototype, "_accessibleLabelsRefTexts", void 0);
__decorate$1([
    slot({ type: HTMLElement, "default": true })
], Input.prototype, "suggestionItems", void 0);
__decorate$1([
    slot()
], Input.prototype, "icon", void 0);
__decorate$1([
    slot()
], Input.prototype, "formSupport", void 0);
__decorate$1([
    slot()
], Input.prototype, "valueStateMessage", void 0);
Input = Input_1 = __decorate$1([
    customElement({
        tag: "ui5-input",
        languageAware: true,
        renderer: litRender,
        template: block0$3,
        staticAreaTemplate: block0$2,
        styles: styleData$5,
        staticAreaStyles: [styleData$4, styleData$3, styleData$2],
        get dependencies() {
            const Suggestions = getFeature("InputSuggestions");
            return [Popover$1, Icon$1].concat(Suggestions ? Suggestions.dependencies : []);
        },
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     *
     * @event sap.ui.webc.main.Input#change
     * @public
     */
    ,
    event("change")
    /**
     * Fired when the value of the component changes at each keystroke,
     * and when a suggestion item has been selected.
     *
     * @event sap.ui.webc.main.Input#input
     * @public
     */
    ,
    event("input")
    /**
     * Fired when a suggestion item, that is displayed in the suggestion popup, is selected.
     *
     * @event sap.ui.webc.main.Input#suggestion-item-select
     * @param {HTMLElement} item The selected item.
     * @public
     */
    ,
    event("suggestion-item-select", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the user navigates to a suggestion item via the ARROW keys,
     * as a preview, before the final selection.
     *
     * @event sap.ui.webc.main.Input#suggestion-item-preview
     * @param {HTMLElement} item The previewed suggestion item.
     * @param {HTMLElement} targetRef The DOM ref of the suggestion item.
     * @public
     * @since 1.0.0-rc.8
     */
    ,
    event("suggestion-item-preview", {
        detail: {
            item: { type: HTMLElement },
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired when the user scrolls the suggestion popover.
     *
     * @event sap.ui.webc.main.Input#suggestion-scroll
     * @param {Integer} scrollTop The current scroll position.
     * @param {HTMLElement} scrollContainer The scroll container.
     * @protected
     * @since 1.0.0-rc.8
     */
    ,
    event("suggestion-scroll", {
        detail: {
            scrollTop: { type: Integer },
            scrollContainer: { type: HTMLElement },
        },
    })
], Input);
Input.define();
var Input$1 = Input;

/* eslint no-unused-vars: 0 */
function block0$1(context, tags, suffix) { return suffix ? effectiveHtml `<div class="ui5-date-picker-root" style="${styleMap(this.styles.main)}"><${scopeTag("ui5-input", tags, suffix)} id="${l$1(this._id)}-inner" class="ui5-date-picker-input" placeholder="${l$1(this._placeholder)}" type="${l$1(this.type)}" value="${l$1(this.value)}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" value-state="${l$1(this.valueState)}" data-sap-focus-ref ._inputAccInfo ="${l$1(this.accInfo)}" @ui5-change="${l$1(this._onInputChange)}" @ui5-input="${l$1(this._onInputInput)}" @ui5-submit="${l$1(this._onInputSubmit)}" @keydown="${this._onkeydown}">${this.valueStateMessage.length ? block1$1.call(this, context, tags, suffix) : undefined}${!this.readonly ? block2$1.call(this, context, tags, suffix) : undefined}</${scopeTag("ui5-input", tags, suffix)}><slot name="formSupport"></slot></div>` : effectiveHtml `<div class="ui5-date-picker-root" style="${styleMap(this.styles.main)}"><ui5-input id="${l$1(this._id)}-inner" class="ui5-date-picker-input" placeholder="${l$1(this._placeholder)}" type="${l$1(this.type)}" value="${l$1(this.value)}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" value-state="${l$1(this.valueState)}" data-sap-focus-ref ._inputAccInfo ="${l$1(this.accInfo)}" @ui5-change="${l$1(this._onInputChange)}" @ui5-input="${l$1(this._onInputInput)}" @ui5-submit="${l$1(this._onInputSubmit)}" @keydown="${this._onkeydown}">${this.valueStateMessage.length ? block1$1.call(this, context, tags, suffix) : undefined}${!this.readonly ? block2$1.call(this, context, tags, suffix) : undefined}</ui5-input><slot name="formSupport"></slot></div>`; }
function block1$1(context, tags, suffix) { return effectiveHtml `<slot name="valueStateMessage" slot="valueStateMessage"></slot>`; }
function block2$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} slot="icon" name="${l$1(this.openIconName)}" tabindex="-1" accessible-name="${l$1(this.openIconTitle)}" accessible-role="button" aria-hidden="${l$1(this._ariaHidden)}" show-tooltip @click="${this.togglePicker}" input-icon ?pressed="${this._isPickerOpen}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon slot="icon" name="${l$1(this.openIconName)}" tabindex="-1" accessible-name="${l$1(this.openIconTitle)}" accessible-role="button" aria-hidden="${l$1(this._ariaHidden)}" show-tooltip @click="${this.togglePicker}" input-icon ?pressed="${this._isPickerOpen}"></ui5-icon>`; }

/* eslint no-unused-vars: 0 */
function block0(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-responsive-popover", tags, suffix)} id="${l$1(this._id)}-responsive-popover" allow-target-overlap placement-type="Bottom" horizontal-align="Left" hide-arrow ?_hide-header=${l$1(this._shouldHideHeader)} @keydown="${this._onkeydown}" @ui5-after-close="${l$1(this.onResponsivePopoverAfterClose)}">${this.showHeader ? block1.call(this, context, tags, suffix) : undefined}<${scopeTag("ui5-calendar", tags, suffix)} id="${l$1(this._id)}-calendar" primary-calendar-type="${l$1(this._primaryCalendarType)}" secondary-calendar-type="${l$1(this.secondaryCalendarType)}" format-pattern="${l$1(this._formatPattern)}" timestamp="${l$1(this._calendarTimestamp)}" .selectionMode="${l$1(this._calendarSelectionMode)}" .minDate="${l$1(this.minDate)}" .maxDate="${l$1(this.maxDate)}" @ui5-selected-dates-change="${l$1(this.onSelectedDatesChange)}" @ui5-show-month-press="${l$1(this.onHeaderShowMonthPress)}" @ui5-show-year-press="${l$1(this.onHeaderShowYearPress)}" ?hide-week-numbers="${this.hideWeekNumbers}" ._currentPicker="${l$1(this._calendarCurrentPicker)}" ._pickersMode="${l$1(this._calendarPickersMode)}">${c(this._calendarSelectedDates, (item, index) => item._id || index, (item, index) => block2.call(this, context, tags, suffix, item, index))}</${scopeTag("ui5-calendar", tags, suffix)}>${this.showFooter ? block3.call(this, context, tags, suffix) : undefined}</${scopeTag("ui5-responsive-popover", tags, suffix)}> ` : effectiveHtml `<ui5-responsive-popover id="${l$1(this._id)}-responsive-popover" allow-target-overlap placement-type="Bottom" horizontal-align="Left" hide-arrow ?_hide-header=${l$1(this._shouldHideHeader)} @keydown="${this._onkeydown}" @ui5-after-close="${l$1(this.onResponsivePopoverAfterClose)}">${this.showHeader ? block1.call(this, context, tags, suffix) : undefined}<ui5-calendar id="${l$1(this._id)}-calendar" primary-calendar-type="${l$1(this._primaryCalendarType)}" secondary-calendar-type="${l$1(this.secondaryCalendarType)}" format-pattern="${l$1(this._formatPattern)}" timestamp="${l$1(this._calendarTimestamp)}" .selectionMode="${l$1(this._calendarSelectionMode)}" .minDate="${l$1(this.minDate)}" .maxDate="${l$1(this.maxDate)}" @ui5-selected-dates-change="${l$1(this.onSelectedDatesChange)}" @ui5-show-month-press="${l$1(this.onHeaderShowMonthPress)}" @ui5-show-year-press="${l$1(this.onHeaderShowYearPress)}" ?hide-week-numbers="${this.hideWeekNumbers}" ._currentPicker="${l$1(this._calendarCurrentPicker)}" ._pickersMode="${l$1(this._calendarPickersMode)}">${c(this._calendarSelectedDates, (item, index) => item._id || index, (item, index) => block2.call(this, context, tags, suffix, item, index))}</ui5-calendar>${this.showFooter ? block3.call(this, context, tags, suffix) : undefined}</ui5-responsive-popover> `; }
function block1(context, tags, suffix) { return suffix ? effectiveHtml `<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${l$1(this._headerTitleText)}</span><${scopeTag("ui5-button", tags, suffix)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this.closePicker}"></${scopeTag("ui5-button", tags, suffix)}></div></div>` : effectiveHtml `<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${l$1(this._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this.closePicker}"></ui5-button></div></div>`; }
function block2(context, tags, suffix, item, index) { return suffix ? effectiveHtml `<${scopeTag("ui5-date", tags, suffix)} value="${l$1(item)}"></${scopeTag("ui5-date", tags, suffix)}>` : effectiveHtml `<ui5-date value="${l$1(item)}"></ui5-date>`; }
function block3(context, tags, suffix) { return effectiveHtml ``; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData$1 = { packageName: "@ui5/webcomponents", fileName: "themes/DatePicker.css", content: ".ui5-hidden-text{clip:rect(1px,1px,1px,1px);font-size:0;left:-1000px;pointer-events:none;position:absolute;top:-1000px;user-select:none}[input-icon]{border-inline-start:var(--_ui5-v1-18-0_input_icon_border);border-radius:var(--_ui5-v1-18-0_input_icon_border_radius);color:var(--_ui5-v1-18-0_input_icon_color);cursor:pointer;min-height:1rem;min-width:1rem;outline:none;padding:var(--_ui5-v1-18-0_input_icon_padding)}[input-icon][pressed]{background:var(--_ui5-v1-18-0_input_icon_pressed_bg);border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_pressed_color)}[input-icon]:active{background-color:var(--sapButton_Active_Background);border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_pressed_color)}[input-icon]:not([pressed]):not(:active):hover{background:var(--_ui5-v1-18-0_input_icon_hover_bg);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow)}[input-icon]:hover{border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow)}:host(:not([hidden])){border-radius:var(--_ui5-v1-18-0_input_border_radius);display:inline-block;height:var(--_ui5-v1-18-0_input_height);letter-spacing:normal;line-height:normal;word-spacing:normal}:host{background-color:var(--sapField_Background);border-radius:var(--_ui5-v1-18-0-datepicker_border_radius);color:var(--sapField_TextColor);margin:var(--_ui5-v1-18-0_input_margin_top_bottom) 0;min-width:calc(var(--_ui5-v1-18-0_input_min_width) + var(--_ui5-v1-18-0_input_icon_width))}:host([value-state=Error]:not([readonly]):not([disabled])){background-color:var(--sapField_InvalidBackground)}:host(:not([disabled]):not([readonly]):active){background:var(--_ui5-v1-18-0-datepicker-hover-background)}:host(:not([disabled]):not([readonly]):hover){background:var(--_ui5-v1-18-0-datepicker-hover-background)}.ui5-date-picker-root{border-radius:inherit;height:inherit;letter-spacing:inherit;line-height:inherit;word-spacing:inherit}:host .ui5-date-picker-input{background-color:inherit;border-radius:inherit;color:inherit;height:inherit;letter-spacing:inherit;line-height:inherit;margin:inherit;min-width:12.5625rem;width:100%;word-spacing:inherit}:host(:not([disabled]):not([readonly])) .ui5-date-picker-input[focused]{background-color:var(--_ui5-v1-18-0-datepicker-hover-background)}:host([readonly]){background:var(--sapField_ReadOnly_BackgroundStyle);background-color:var(--_ui5-v1-18-0_input_readonly_background);border-color:var(--_ui5-v1-18-0_input_readonly_border_color)}[slot=icon]{border-bottom-right-radius:var(--_ui5-v1-18-0-datepicker_icon_border_radius);border-top-right-radius:var(--_ui5-v1-18-0-datepicker_icon_border_radius)}" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => styleData$n);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", async () => styleData$m);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/DatePickerPopover.css", content: "[ui5-calendar]{display:flex;justify-content:center;width:100%}[ui5-responsive-popover]::part(content){padding:0}" };

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatePicker_1;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-date-picker</code> component provides an input field with assigned calendar which opens on user action.
 * The <code>ui5-date-picker</code> allows users to select a localized date using touch,
 * mouse, or keyboard input. It consists of two parts: the date input field and the
 * date picker.
 *
 * <h3>Usage</h3>
 *
 * The user can enter a date by:
 * <ul>
 * <li>Using the calendar that opens in a popup</li>
 * <li>Typing it in directly in the input field</li>
 * </ul>
 * <br><br>
 * When the user makes an entry and presses the enter key, the calendar shows the corresponding date.
 * When the user directly triggers the calendar display, the actual date is displayed.
 *
 * <h3>Formatting</h3>
 *
 * If a date is entered by typing it into
 * the input field, it must fit to the used date format.
 * <br><br>
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see <ui5-link target="_blank" href="http://unicode.org/reports/tr35/#Date_Field_Symbol_Table">UTS #35: Unicode Locale Data Markup Language</ui5-link>.
 * <br><br>
 * For example, if the <code>format-pattern</code> is "yyyy-MM-dd",
 * a valid value string is "2015-07-30" and the same is displayed in the input.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-date-picker</code> provides advanced keyboard handling.
 * If the <code>ui5-date-picker</code> is focused,
 * you can open or close the drop-down by pressing <code>F4</code>, <code>ALT+UP</code> or <code>ALT+DOWN</code> keys.
 * Once the drop-down is opened, you can use the <code>UP</code>, <code>DOWN</code>, <code>LEFT</code>, <code>RIGHT</code> arrow keys
 * to navigate through the dates and select one by pressing the <code>Space</code> or <code>Enter</code> keys. Moreover you can
 * use TAB to reach the buttons for changing month and year.
 * <br>
 *
 * If the <code>ui5-date-picker</code> input field is focused and its corresponding picker dialog is not opened,
 * then users can increment or decrement the date referenced by <code>dateValue</code> property
 * by using the following shortcuts:
 * <br>
 * <ul>
 * <li>[PAGEDOWN] - Decrements the corresponding day of the month by one</li>
 * <li>[SHIFT] + [PAGEDOWN] - Decrements the corresponding month by one</li>
 * <li>[SHIFT] + [CTRL] + [PAGEDOWN] - Decrements the corresponding year by one</li>
 * <li>[PAGEUP] - Increments the corresponding day of the month by one</li>
 * <li>[SHIFT] + [PAGEUP] - Increments the corresponding month by one</li>
 * <li>[SHIFT] + [CTRL] + [PAGEUP] - Increments the corresponding year by one</li>
 * </ul>
 *
 * <h3>Calendar types</h3>
 * The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.
 * By default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,
 * you need to set the <code>primaryCalendarType</code> property and import one or more of the following modules:
 * <br><br>
 *
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";</code>
 * <br><br>
 *
 * Or, you can use the global configuration and set the <code>calendarType</code> key:
 * <br>
 * <pre><code>&lt;script data-id="sap-ui-config" type="application/json"&gt;
 * {
 *	"calendarType": "Japanese"
 * }
 * &lt;/script&gt;</code></pre>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/DatePicker";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.DatePicker
 * @extends sap.ui.webc.main.DateComponentBase
 * @tagname ui5-date-picker
 * @public
 */
let DatePicker = DatePicker_1 = class DatePicker extends DateComponentBase$1 {
    /**
     * @protected
     */
    onResponsivePopoverAfterClose() {
        this._isPickerOpen = false;
        if (isPhone()) {
            this.blur(); // close device's keyboard and prevent further typing
        }
        else {
            this._getInput()?.focus();
        }
    }
    onBeforeRendering() {
        this.FormSupport = getFeature("FormSupport");
        ["minDate", "maxDate"].forEach((prop) => {
            const propValue = this[prop];
            if (!this.isValid(propValue)) {
                console.warn(`Invalid value for property "${prop}": ${propValue} is not compatible with the configured format pattern: "${this._displayFormat}"`); // eslint-disable-line
            }
        });
        if (this.FormSupport) {
            this.FormSupport.syncNativeHiddenInput(this);
        }
        else if (this.name) {
            console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        this.value = this.normalizeValue(this.value) || this.value;
        this.liveValue = this.value;
    }
    /**
     * Override in derivatives to change calendar selection mode
     * @returns {string}
     * @protected
     */
    get _calendarSelectionMode() {
        return "Single";
    }
    /**
     * Used to provide a timestamp to the Calendar (to focus it to a relevant date when open) based on the component's state
     * Override in derivatives to provide the calendar a timestamp based on their properties
     * By default focus the calendar on the selected date if set, or the current day otherwise
     * @protected
     * @returns { number } the calendar timestamp
     */
    get _calendarTimestamp() {
        if (this.value && this.dateValueUTC && this._checkValueValidity(this.value)) {
            const millisecondsUTC = this.dateValueUTC.getTime();
            return getRoundedTimestamp(millisecondsUTC);
        }
        return getTodayUTCTimestamp(this._primaryCalendarType);
    }
    /**
     * Used to provide selectedDates to the calendar based on the component's state
     * Override in derivatives to provide different rules for setting the calendar's selected dates
     * @protected
     * @returns { array } the selected dates
     */
    get _calendarSelectedDates() {
        if (this.value && this._checkValueValidity(this.value)) {
            return [this.value];
        }
        return [];
    }
    _onkeydown(e) {
        if (isShow(e)) {
            e.preventDefault(); // Prevent scroll on Alt/Option + Arrow Up/Down
            if (this.isOpen()) {
                if (!isF4(e)) {
                    this._toggleAndFocusInput();
                }
            }
            else {
                this._toggleAndFocusInput();
            }
        }
        if ((this._getInput().isEqualNode(e.target) && this.isOpen()) && (isTabNext(e) || isTabPrevious(e) || isF6Next(e) || isF6Previous(e))) {
            this.closePicker();
        }
        if (this.isOpen()) {
            return;
        }
        if (isEnter(e)) {
            if (this.FormSupport) {
                this.FormSupport.triggerFormSubmit(this);
            }
        }
        else if (isPageUpShiftCtrl(e)) {
            e.preventDefault();
            this._modifyDateValue(1, "year");
        }
        else if (isPageUpShift(e)) {
            e.preventDefault();
            this._modifyDateValue(1, "month");
        }
        else if (isPageUp(e)) {
            e.preventDefault();
            this._modifyDateValue(1, "day");
        }
        else if (isPageDownShiftCtrl(e)) {
            e.preventDefault();
            this._modifyDateValue(-1, "year");
        }
        else if (isPageDownShift(e)) {
            e.preventDefault();
            this._modifyDateValue(-1, "month");
        }
        else if (isPageDown(e)) {
            e.preventDefault();
            this._modifyDateValue(-1, "day");
        }
    }
    /**
     *
     * @param { number } amount
     * @param { string } unit
     * @param { boolean } preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @protected
     */
    _modifyDateValue(amount, unit, preserveDate) {
        if (!this.dateValue) {
            return;
        }
        const modifiedDate = modifyDateBy(CalendarDate$1.fromLocalJSDate(this.dateValue), amount, unit, preserveDate, this._minDate, this._maxDate);
        const newValue = this.formatValue(modifiedDate.toUTCJSDate());
        this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
    }
    _updateValueAndFireEvents(value, normalizeValue, events, updateValue = true) {
        const valid = this._checkValueValidity(value);
        if (valid && normalizeValue) {
            value = this.normalizeValue(value); // transform valid values (in any format) to the correct format
        }
        let executeEvent = true;
        this.liveValue = value;
        const previousValue = this.value;
        if (updateValue) {
            this._getInput().value = value;
            this.value = value;
            this._updateValueState(); // Change the value state to Error/None, but only if needed
        }
        events.forEach((e) => {
            if (!this.fireEvent(e, { value, valid }, true)) {
                executeEvent = false;
            }
        });
        if (!executeEvent && updateValue) {
            if (this.value !== previousValue && this.value !== this._getInput().value) {
                return; // If the value was changed in the change event, do not revert it
            }
            this._getInput().value = previousValue;
            this.value = previousValue;
        }
    }
    _updateValueState() {
        const isValid = this._checkValueValidity(this.value);
        if (isValid && this.valueState === ValueState$1.Error) { // If not valid - always set Error regardless of the current value state
            this.valueState = ValueState$1.None;
        }
        else if (!isValid) { // However if valid, change only Error (but not the others) to None
            this.valueState = ValueState$1.Error;
        }
    }
    _toggleAndFocusInput() {
        this.togglePicker();
        this._getInput().focus();
    }
    _getInput() {
        return this.shadowRoot.querySelector("[ui5-input]");
    }
    /**
     * The ui5-input "submit" event handler - fire change event when the user presses enter
     * @protected
     */
    _onInputSubmit() { }
    /**
     * The ui5-input "change" event handler - fire change event when the user focuses out of the input
     * @protected
     */
    _onInputChange(e) {
        this._updateValueAndFireEvents(e.target.value, true, ["change", "value-changed"]);
    }
    /**
     * The ui5-input "input" event handler - fire input even when the user types
     * @protected
     */
    _onInputInput(e) {
        this._updateValueAndFireEvents(e.target.value, false, ["input"], false);
    }
    /**
     * Checks if the provided value is valid and within valid range.
     * @protected
     * @param { string } value
     * @returns { boolean }
     */
    _checkValueValidity(value) {
        if (value === "") {
            return true;
        }
        return this.isValid(value) && this.isInValidRange(value);
    }
    _click(e) {
        if (isPhone()) {
            this.responsivePopover.showAt(this);
            e.preventDefault(); // prevent immediate selection of any item
        }
    }
    /**
     * Checks if a value is valid against the current date format of the DatePicker.
     * @public
     * @method
     * @name sap.ui.webc.main.DatePicker#isValid
     * @param { string } [value=""] A value to be tested against the current date format
     * @returns { boolean }
     */
    isValid(value = "") {
        if (value === "") {
            return true;
        }
        return !!this.getFormat().parse(value);
    }
    /**
     * Checks if a date is between the minimum and maximum date.
     * @public
     * @method
     * @name sap.ui.webc.main.DatePicker#isInValidRange
     * @param { string } [value=""] A value to be checked
     * @returns { boolean }
     */
    isInValidRange(value = "") {
        if (value === "") {
            return true;
        }
        const calendarDate = this._getCalendarDateFromString(value);
        if (!calendarDate || !this._minDate || !this._maxDate) {
            return false;
        }
        return calendarDate.valueOf() >= this._minDate.valueOf() && calendarDate.valueOf() <= this._maxDate.valueOf();
    }
    /**
     * The parser understands many formats, but we need one format
     * @protected
     */
    normalizeValue(value) {
        if (value === "") {
            return value;
        }
        return this.getFormat().format(this.getFormat().parse(value, true), true); // it is important to both parse and format the date as UTC
    }
    get _displayFormat() {
        // @ts-ignore oFormatOptions is a private API of DateFormat
        return this.getFormat().oFormatOptions.pattern;
    }
    /**
     * @protected
     */
    get _placeholder() {
        return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
    }
    get _headerTitleText() {
        return DatePicker_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
    }
    get phone() {
        return isPhone();
    }
    get showHeader() {
        return this.phone;
    }
    get showFooter() {
        return this.phone;
    }
    get accInfo() {
        return {
            "ariaRoledescription": this.dateAriaDescription,
            "ariaHasPopup": HasPopup$1.Grid,
            "ariaAutoComplete": "none",
            "ariaRequired": this.required,
            "ariaLabel": getEffectiveAriaLabelText(this),
        };
    }
    get openIconTitle() {
        return DatePicker_1.i18nBundle.getText(DATEPICKER_OPEN_ICON_TITLE);
    }
    get openIconName() {
        return "appointment-2";
    }
    get dateAriaDescription() {
        return DatePicker_1.i18nBundle.getText(DATEPICKER_DATE_DESCRIPTION);
    }
    /**
     * Defines whether the dialog on mobile should have header
     * @private
     */
    get _shouldHideHeader() {
        return false;
    }
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _ariaHidden() {
        return isDesktop();
    }
    async _respPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector("[ui5-responsive-popover]");
    }
    _canOpenPicker() {
        return !this.disabled && !this.readonly;
    }
    get _calendarPickersMode() {
        const format = this.getFormat();
        const patternSymbolTypes = format.aFormatArray.map(patternSymbolSettings => {
            return patternSymbolSettings.type.toLowerCase();
        });
        if (patternSymbolTypes.includes("day")) {
            return CalendarPickersMode$1.DAY_MONTH_YEAR;
        }
        if (patternSymbolTypes.includes("month") || patternSymbolTypes.includes("monthstandalone")) {
            return CalendarPickersMode$1.MONTH_YEAR;
        }
        return CalendarPickersMode$1.YEAR;
    }
    /**
     * The user selected a new date in the calendar
     * @param event
     * @protected
     */
    onSelectedDatesChange(e) {
        e.preventDefault();
        const newValue = e.detail.values && e.detail.values[0];
        this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
        this.closePicker();
    }
    /**
     * The user clicked the "month" button in the header
     */
    onHeaderShowMonthPress() {
        this._calendarCurrentPicker = "month";
    }
    /**
     * The user clicked the "year" button in the header
     */
    onHeaderShowYearPress() {
        this._calendarCurrentPicker = "year";
    }
    /**
     * Formats a Java Script date object into a string representing a locale date
     * according to the <code>formatPattern</code> property of the DatePicker instance
     * @public
     * @method
     * @name sap.ui.webc.main.DatePicker#formatValue
     * @param {Date} date A Java Script date object to be formatted as string
     * @returns {string} The date as string
     */
    formatValue(date) {
        return this.getFormat().format(date);
    }
    /**
     * Closes the picker.
     * @public
     * @method
     * @name sap.ui.webc.main.DatePicker#closePicker
     */
    closePicker() {
        this.responsivePopover.close();
    }
    /**
     * Opens the picker.
     * @public
     * @async
     * @method
     * @name sap.ui.webc.main.DatePicker#openPicker
     * @returns {Promise} Resolves when the picker is open
     */
    async openPicker() {
        this._isPickerOpen = true;
        this._calendarCurrentPicker = "day";
        this.responsivePopover = await this._respPopover();
        this.responsivePopover.showAt(this);
    }
    togglePicker() {
        if (this.isOpen()) {
            this.closePicker();
        }
        else if (this._canOpenPicker()) {
            this.openPicker();
        }
    }
    /**
     * Checks if the picker is open.
     * @public
     * @method
     * @name sap.ui.webc.main.DatePicker#isOpen
     * @returns {boolean} true if the picker is open, false otherwise
     */
    isOpen() {
        return !!this._isPickerOpen;
    }
    /**
     * Currently selected date represented as a Local JavaScript Date instance.
     *
     * @public
     * @readonly
     * @name sap.ui.webc.main.DatePicker.prototype.dateValue
     * @type { Date }
     */
    get dateValue() {
        return this.liveValue ? this.getFormat().parse(this.liveValue) : this.getFormat().parse(this.value);
    }
    get dateValueUTC() {
        return this.liveValue ? this.getFormat().parse(this.liveValue, true) : this.getFormat().parse(this.value);
    }
    get styles() {
        return {
            main: {
                width: "100%",
            },
        };
    }
    get type() {
        return InputType$1.Text;
    }
};
__decorate([
    property()
], DatePicker.prototype, "value", void 0);
__decorate([
    property({ type: ValueState$1, defaultValue: ValueState$1.None })
], DatePicker.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "readonly", void 0);
__decorate([
    property({ defaultValue: undefined })
], DatePicker.prototype, "placeholder", void 0);
__decorate([
    property()
], DatePicker.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "hideWeekNumbers", void 0);
__decorate([
    property()
], DatePicker.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], DatePicker.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], DatePicker.prototype, "_isPickerOpen", void 0);
__decorate([
    property({ type: Object })
], DatePicker.prototype, "_respPopoverConfig", void 0);
__decorate([
    property({ defaultValue: "day" })
], DatePicker.prototype, "_calendarCurrentPicker", void 0);
__decorate([
    slot({ type: HTMLElement })
], DatePicker.prototype, "valueStateMessage", void 0);
__decorate([
    slot({ type: HTMLElement })
], DatePicker.prototype, "formSupport", void 0);
DatePicker = DatePicker_1 = __decorate([
    customElement({
        tag: "ui5-date-picker",
        languageAware: true,
        template: block0$1,
        staticAreaTemplate: block0,
        styles: styleData$1,
        staticAreaStyles: [
            styleData$4,
            styleData,
        ],
        dependencies: [
            Icon$1,
            ResponsivePopover$1,
            Calendar$1,
            CalendarDateComponent,
            Input$1,
            Button$1,
        ],
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     *
     * @event sap.ui.webc.main.DatePicker#change
     * @allowPreventDefault
     * @public
     * @param {string} value The submitted value.
     * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
    */
    ,
    event("change", {
        detail: {
            value: {
                type: String,
            },
            valid: {
                type: Boolean,
            },
        },
    })
    /**
     * Fired when the value of the component is changed at each key stroke.
     *
     * @event sap.ui.webc.main.DatePicker#input
     * @allowPreventDefault
     * @public
     * @param {string} value The submitted value.
     * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
    */
    ,
    event("input", {
        detail: {
            value: {
                type: String,
            },
            valid: {
                type: Boolean,
            },
        },
    })
], DatePicker);
DatePicker.define();
var DatePicker$1 = DatePicker;

export { DatePicker$1 as default };
