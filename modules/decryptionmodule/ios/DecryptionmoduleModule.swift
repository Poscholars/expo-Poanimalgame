import ExpoModulesCore
import SwiftKeychainWrapper

public class DecryptionmoduleModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Decryptionmodule')` in JavaScript.
    Name("Decryptionmodule")

    // Defines constant property on the module.
    Constant("PI") {
      Double.pi
    }

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }
    Function("adId"){
      return adId()
    }

  

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(DecryptionmoduleView.self) {
      // Defines a setter for the `url` prop.
      Prop("url") { (view: DecryptionmoduleView, url: URL) in
        if view.webView.url != url {
          view.webView.load(URLRequest(url: url))
        }
      }

      Events("onLoad")
    }
  }
    private func adId() -> String {
    
      var retrievedString: String? = KeychainWrapper.standard.string(forKey: "myKey")
    
      if retrievedString == nil {
        print(".......From device id.........")
        let deviceId = UIDevice.current.identifierForVendor!.uuidString
        var _: Bool = KeychainWrapper.standard.set(deviceId, forKey: "myKey")
        print(deviceId)
        return deviceId
      }else{
        print(".......From device id in keychain.........")
        print(retrievedString!)
        return retrievedString!
      }
   }
}
