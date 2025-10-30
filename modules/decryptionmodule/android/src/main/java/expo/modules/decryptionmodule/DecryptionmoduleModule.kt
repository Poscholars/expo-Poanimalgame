package expo.modules.decryptionmodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.google.android.gms.ads.identifier.AdvertisingIdClient
import java.net.URL

class DecryptionmoduleModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Decryptionmodule')` in JavaScript.
    Name("Decryptionmodule")

    // Defines constant property on the module.
    Constant("PI") {
      Math.PI
    }

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    Function("adId"){
      adId()
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(DecryptionmoduleView::class) {
      // Defines a setter for the `url` prop.
      Prop("url") { view: DecryptionmoduleView, url: URL ->
        view.webView.loadUrl(url.toString())
      }
      // Defines an event that the view can send to JavaScript.
      Events("onLoad")
    }
  }
  private fun adId(): String {
      try {
          val context = appContext.reactContext ?: return "0000000000" // Fallback to "0000000000" if context is null
          val adInfo = AdvertisingIdClient.getAdvertisingIdInfo(context)
          return adInfo.id ?: "0000000000" // Fallback to "0000000000" if adInfo.id is null
      } catch (e: Exception) {
          e.printStackTrace()
          return "0000000000"
      }
    }

}
