# TinyApp
## Description:
This is tiny application, at the time start the application I crawed restaurant data from [this page](https://www.tripadvisor.com/Restaurants-g293951-Malaysia.html). Then I parsed & saved data to sql server db. Then I create front-end application(reactjs application) to consume the api with data above. I used IdentityServer4 to handle authenication for the APIs.

## Server(api):
### Technical stack:
- AspnetCore 2.0
- EntityFramework Core 2.1 & Code first
- IdentityServer4
- Restful for restaurant API
- htmlagilitypack to crawler.
### Setup guiline:

## Client:
### Technical stack:
- Reactjs.
- Redux.
- Es6.
- Semantic.
### Setup guiline:
1. Make sure nodejs & yarn are installed.
2. At the root folder of the client project run the following command to install dependencies:
    ```
    yarn install
    ```
3. Start the front-end application:
    ```
    yarn start
    ```
Final result, we consume the api restaurant to display restaurant in the grid view.
![Final result](https://image.ibb.co/k0tck8/fe.png)
