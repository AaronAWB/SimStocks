# SimStocks - A Stock Trading Simulator

Try it <a href='http://simstocks.us-west-2.elasticbeanstalk.com/'>here</a>.

<em>SimStocks gives users a risk-free way to learn about the stock market and practice investing. Users receive $100,000 in fake cash and can manage their portfolio by buying and selling stocks, informed by current and historic stock data supplied by Finnhub.</em>

<img width="1501" alt="stock-portfolio" src="https://github.com/AaronAWB/stock_trading/assets/108595340/7d47b95b-654c-420b-8eed-b0dc10581ee9">

<img width="1485" alt="trade_modal" src="https://github.com/AaronAWB/stock_trading/assets/108595340/2b7267f3-c9c2-4deb-9626-68ee844a1e78">

## How to use

1. You will need to create an account. You can do that by clicking on the `Sign In or Create an Account` button, followed by the Sign Up button on the next page, and selecting a username and password.

2. If you would prefer to try out the app without creating an account, you can sign in as a guest by clicking the 'GUEST' button on the home page. Guests will be able to view and interact with a pre-populated portfolio, but will not be able to buy or sell stocks.

3. New accounts will receive $100,000 in fake cash. Once you are signed in, you can search for and purchase your first stock. To do that, click the `Trade` button in the top navigation bar or the highlighted 'Trade' text on the Home screen. You can search for a stock by its ticker symbol or by its name. Click on a stock to view more information about it. If you would like to purchase shares of the stock, enter the number of shares you would like to purchase and click on the `Purchase Share(s)` button to complete the transaction.

4. Navigate to the `Portfolio` page to view your current holdings. You can click on a stock to view more information about it. If you would like to sell shares of the stock, enter the number of shares you would like to sell and click on the `Sell Share(s)` button to complete the transaction.

5. Check back in on your portfolio periodically to see how your stocks are performing!

## Technologies and Tools

### Client

* Written with HTML, CSS, and TypeScript, using the React framework.
* Setup was done using Vite as an alternative to Create React App, allowing aliases for cleaner imports and faster build times.
* Styling relies primarily on React Bootstrap.
* Pages are routed using React Router.
* HTTP calls to the server's REST API are made using the Axios library.
* Webtokens are stored in localStorage for user authentication.

### Server

* Written in Python using the Flask framework.
* Webtokens are generated using the PyJWT library.
* Current and historical stock data is retrieved using the Finnhub API.
* REST API is built using Flask-RESTX.
* Database queries are handled using the SQLAlchemy ORM.
* The app is served using Gunicorn and hosted on AWS Elastic Beanstalk.
* Data is stored in a PostgreSQL database hosted on elephantsql.com.

## Local Setup

1. Clone this repository to your local machine.
2. Sign up for free API keys from <a href='https://finnhub.io/docs/api/introduction'>Finnhub</a> and <a href='https://site.financialmodelingprep.com/developer/docs/'>Financial Modeling Prep</a>.
3. Run the setup script by typing 'sh setup.sh' in your terminal. This will automatically install the necessary dependencies, create the PostgreSQL database, and start the server.
4. Navigate to `localhost:5000` in your browser to view the app.

## Author

Aaron Brinckerhoff - Full Stack Software Developer | <a href='https://www.linkedin.com/in/aaron-brinckerhoff-6b9a5340/'>LinkedIn</a> | <a href='https://www.aaronbrinckerhoff.dev/'>Website</a>
