# vta-wdio-js-cucumber
WebDriverio and cucumber Javascript sample project with reporting

### Installation/SetUp

`JDK 1.8:` Install JDK 1.8+ and make sure class path is set properly. JAVA is require to start `Selenium Server` nothing else.

`Node.JS:` Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally. If you have nvm installed globally, then run `nvm install` to get the latest version of node specified in the`.nvmrc` file [here](/.nvmrc).  If you don't use nvm, be sure that you are using a compatible version. Further details on nvm can be found on the official [github page](https://github.com/creationix/nvm). MAC OSX users are best suited to install nvm with homebrew `brew install nvm`.

Once installation is done - open terminal (MAC OSX) or command prompt (for windows OS) and type below command to verify NodeJS has been installed properly.

        node --version
        npm --version

Above command should print out the version that you have installed.

Now navigate to the framework's package.json folder and run `npm install` to grab all dependencies.

### Run Tests

npm run test:chrome

- Tests can be executed in headless mode by passing a variable from CI/CD pipeline
- Tests can be executed in different environments by passsing environment variable from CI/CD pipeline

### Reports

- To generate and view allure reports "npm run generate:allure-report" , results will be stored in allure-results folder

- Report will be opened in the default browser, otherwise index.html (eg: http://10.0.0.72:60550/index.html) from allure-report folder can be opened in any other browser 

### Error Screenshots
- Failed commands/steps screenshots are available under errorScreenshots of project directory
