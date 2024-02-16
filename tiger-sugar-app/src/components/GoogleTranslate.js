import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return <li id="google_translate_element"></li>;
};

export default GoogleTranslate;




// import React, { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Define the Google Translate initialization function
//     window.googleTranslateElementInit = function () {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: "en" },
//         "google_translate_element"
//       );
//     };

//     // Check if the script is already present
//     const scriptId = "google-translate-script";
//     if (!document.getElementById(scriptId)) {
//       // Add the script if it's not present
//       const script = document.createElement("script");
//       script.id = scriptId;
//       script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       script.defer = true;
//       document.body.appendChild(script);
//     }

//     // Cleanup function to prevent duplicate widgets
//     return () => {
//       let translateElement = document.getElementById("google_translate_element");
//       if (translateElement) {
//         translateElement.remove();
//       }
//     };
//   }, []);

//   return <li id="google_translate_element"></li>;
// };

// export default GoogleTranslate;











// import React, { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     window.googleTranslateElementInit = function () {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: "en" },
//         "google_translate_element"
//       );
//     };

//     const scriptId = "google-translate-script";
//     let script = document.getElementById(scriptId);
//     if (script) {
//       // If the script exists, remove it to force a re-render
//       document.body.removeChild(script);
//     }

//     script = document.createElement("script");
//     script.id = scriptId;
//     script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     return () => {
//       if (script) {
//         document.body.removeChild(script);
//       }
//     };

    
//   }, []);

//   return <li id="google_translate_element"></li>;
// };

// export default GoogleTranslate;

































