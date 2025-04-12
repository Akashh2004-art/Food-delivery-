// Importing React library to create the component
import React from "react";

// Importing the CSS file specifically for styling this component
import "./AppDownload.css";

// Importing image assets like Play Store and App Store icons
import { assets } from "../../assets/assets";


// Functional React component named AppDownload
const AppDownload = () => {
  return (
    // Main container div with class and id for styling and navigation
    <div className="app-download" id="app-download">
      
      {/* Text message prompting the user to download the app */}
      <p>
        For Better Experience Download <br /> Tomato App{" "}
      </p>

      {/* Container for displaying app platform buttons */}
      <div className="app-download-platforms">
        {/* Image for Play Store */}
        <img src={assets.play_store} alt="" />

        {/* Image for App Store */}
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

// Exporting the component so it can be used elsewhere (e.g., Homepage)
export default AppDownload;

