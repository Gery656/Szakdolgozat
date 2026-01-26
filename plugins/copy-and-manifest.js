const fs = require("fs");
const path = require("path");
const {
  withPlugins,
  withAndroidManifest,
} = require("@expo/config-plugins");

const withMyConfigFile = (config, { src, androidDest }) => {
  return withPlugins(config, [
    (config) => withAndroidConfigFile(config, { src, dest: androidDest }),
  ]);
};

const withAndroidConfigFile = (config, { src, dest }) => {

  return withAndroidManifest(config, async (config) => {
    const sourcePath = path.resolve(__dirname, src); 
    const destinationPath = path.resolve(
      config.modRequest.platformProjectRoot,
      dest
    );

    try {
      // Copy the file to the destination directory
      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file not found at ${sourcePath}`);
      }

      const destDir = path.dirname(destinationPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      fs.copyFileSync(sourcePath, destinationPath);
    } catch (error) {
      console.error(`Error copying ${src} to Android:`, error.message);
      throw error;
    }

    //get uses-permissions
    const theManifestPermissions = config?.modResults?.manifest;

    if (!theManifestPermissions["uses-permission"]) {
        theManifestPermissions["uses-permission"]=[];
    }
    theManifestPermissions["uses-permission"].push(
        {
            $:{
                'android:name':'android.permission.NFC',
            }
        }
    )

    //get uses-features
    const theManifestFeatures = config?.modResults?.manifest;

    if (!theManifestFeatures["uses-feature"]) {
        theManifestFeatures["uses-feature"] = [];
    }

    theManifestFeatures["uses-feature"].push({
        $:{
            'android:name' : 'android.hardware.nfc.hce',
            'android:required' : true
        }
    });

    //get application
    const mainApplication = config?.modResults?.manifest?.application?.[0];

     if (mainApplication) {
      // Ensure meta-data array exists
      if (!mainApplication['service']) {
        mainApplication['service'] = [];
      }

      // Add the service
         mainApplication['service'].push({
             $: {
                 'android:name': 'com.reactnativehce.services.CardService',
                 'android:exported': true,
                 'android:enabled': false,
                 'android:permission': 'android.permission.BIND_NFC_SERVICE',
             },
             'intent-filter': {

                 action: {
                     $: {
                         'android:name': 'android.nfc.cardemulation.action.HOST_APDU_SERVICE'
                     }
                 }
                 ,

                 category: {
                     $: {
                         'android:name': 'android.intent.category.DEFAULT'
                     }
                 }

             },
             'meta-data':{
                $:{
                    'android:name' : 'android.nfc.cardemulation.host_apdu_service',
                    'android:resource' : '@xml/aid_list'
                }
             }
         });
    }

    return config;
  });

};

module.exports = withMyConfigFile;