const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const iosBlacklistedModules = [
  "react-native-hce",
];

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "ios" && iosBlacklistedModules.includes(moduleName)) {
    return {
      type: "empty",
    };
  }
  // Default behavior for other module resolutions
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' })