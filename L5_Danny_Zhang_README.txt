# Lab 5 - Danny Zhang (B00924444)

* *Date Created*: 07/03/2025
* *Last Modification Date*: 09/03/2025
* *Lab URL (Git) : https://git.cs.dal.ca/danny/csci-3172/-/tree/main/labs/lab5
* Lab URL to my csci3172 repository: https://git.cs.dal.ca/danny/csci-3172
* Timberlea Lab URL : https://web.cs.dal.ca/~danny/csci3172/labs/lab5
* Netlify URL : https://3172musicrecc.netlify.app/ 


## Authors

* Danny Zhang (dn384827@dal.ca)

## Brief Description

* The application I have created is a dietary-based recipe recommender that provides recipes
in conjunction with the spoonacular API to provide recipes based on the user's dietary restrictions and/or what diet they are going on.


## Issues Encountered 

* In trying to make the front end receive and display recipes from the API's requests there was a slight issue with
having the front end display it and I had constant 404 error messages show. This was eventually addressed by adding console logs
in the script.js file then adding the API key as a environment variable to the Netlify dashboard.


## Sources Used

* Reset button referenced from Lab 3 reset functionality in script.js lines 164-167

document.getElementById('reset-button').addEventListener('click', function(){
    document.getElementById('search-query').value = '';
    listItems();
});

* style.css page was referenced from my Lab 4 style.css page for certain tags like .container , body, header
and copied padding since stylistically I liked the spacing.

## style.css (Lab 4 in CSCI3172)
* Lines 1-6, 9-14, 60-67

body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #543333;
    margin: 0;
    padding: 0;
}

header{
    background-color: #3a783c;
    color: white;
    padding: 20px;
    text-align: center;
}

.container{
    width: 300px;
    margin: 50px auto;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px #0000001a;
}

# The Project Setup Guide for Lab 5 on Brightspace was heavily inferenced in setting up this project;

* The backend (netlify/functions/api.js) was taken from the Project Setup guide on the 3172 Brightspace 
and adjusted to be the recipe API instead of the weather API.
* netlify.toml was directly copied to configure netlify.
* tests/api.test.js was copied and changed to work with the recipe API.


* The color pallette of the page created in assistance with this website: https://labs.tineye.com/color/
I used a picture of an album cover then copied the rgb codes to use in the styles page.
Album cover image: https://www.google.com/url?sa=i&url=https%3A%2F%2Fyorushika.fandom.com%2Fwiki%2FMagic_Lantern&psig=AOvVaw1o2gkBuO0id22WnXFPUvW-&ust=1741653960601000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDzrN-k_osDFQAAAAAdAAAAABAE





 

