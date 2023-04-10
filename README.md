# Blue Archive Bilibili Wiki

This project serves for blue archive bilibili wiki, which separates each part of the webpage into partial html for easy maintaining.

## How to develop

1. install nodejs from [🔗nodejs download](https://nodejs.org/en/download)
1. run `npm install` to install dependencies
1. run `npm start` to build and start the result webpage
1. create a new folder under src folder
1. develop with vanilla html and css to implement the component
1. use the customized syntax `<include src="PATH"/>` to import the created component from parent
1. inspect the result on the webpage which previous step opened

## Rules
1. recommend to use BEM for CSS naming convention
1. while committing a feature, follow the [🔗semantic commit message rule](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

## Notice
Notice that `url` in css is not supported due to webpack configuration, use absolute positioning image for background instead
