# Scrapper

![](https://img.shields.io/github/downloads/sweepapp/scrapper/total)

This is a Node.js application that fetches TV show data from the [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) and saves it to a JSON file. The application uses the `fs`, `dotenv`, `axios`, `mongoose` and `log-symbol` Node.js packages, which can be installed using `npm`.

The dataset of all the details of TV show is available on [Kaggle](https://www.kaggle.com/datasets/bourdier/all-tv-series-details-dataset).

## Installation

1. Clone the repository or download the code.
```
git clone https://github.com/SweepApp/scrapper.git
```

2. Open the command line and navigate to the project directory.
```
cd scrapper-main
``` 

3. Run `npm install` to install the required packages.

## Configuration

Before running the application, you need to set your API key in a `.env` file in the project directory. You can obtain an API key from the [The Movie Database website](https://www.themoviedb.org/settings/api).

Create a `.env` file in the project directory and add the following line, replacing `YOUR_API_KEY` with your actual API key and `YOUR_MONGODB_URL` with your actual MongoDB URL:

```
API_KEY=YOUR_API_KEY
DATABASE=YOUR_MONGODB_URL
```

* If you want to change the language of the data, you can replace `en-US` in `config.mjs`.
* The total is fetched in `latestId.mjs`. The script will retrieve the last ID added to the site from the TMDB API.
* You can replace the API URL to retrieve movie data by changing `tv` to `movies` at the end of `baseUrl`.

## Usage

To run the application, open the command line and navigate to the project directory. Then run the following command:

```
node server.mjs
```

The application will fetch TV show data from the The Movie Database API and save it to your database per batch of 100 datas. The data for all TV shows is fetched by looping over all IDs available, and fetching each TV show's data individually.

If an error occurs during fetching or saving data, an error message is displayed in the console and the error is logged to a `error_DD_MM_YYYY.txt` file.
