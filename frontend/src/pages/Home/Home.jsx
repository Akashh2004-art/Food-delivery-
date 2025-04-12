// Importing React and useState hook from React library
import React, { useState } from "react";

// Importing the CSS file specific to the Home component
import "./Home.css";

// Importing child components used within the Home page
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

// Functional component definition for Home page
const Home = () => {
    // Creating a state variable 'category' with initial value "All"
    // This will be used to filter the food items displayed on the homepage
    const [category, setCategory] = useState("All");

    // JSX returned by the Home component
    return (
        <div>
            {/* Displays the top banner/header of the homepage */}
            <Header />

            {/* Component to show food categories that users can choose from */}
            {/* Passing category state and setter function as props */}
            <ExploreMenu category={category} setCategory={setCategory} />

            {/* Displays food items filtered by the selected category */}
            <FoodDisplay category={category} />

            {/* Section prompting users to download the app */}
            <AppDownload />
        </div>
    );
};

// Exporting the Home component so it can be used in routing (App.jsx)
export default Home;
