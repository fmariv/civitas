# Civitas

<p align="center">
  <img src="assets/civitas.gif" alt="Civitas"/>
</p>

Civitas is a web map application that allows you to visit new cities and places by flying smoothly and randomly all around the globe.

Let's start visiting new cities [here](https://civitas.franmartin.es/)!

## Build With

* :computer: [Svelte](https://svelte.dev/)
* :globe_with_meridians: [MapLibre GL JS](https://maplibre.org/)
* :art: [MapTiler](https://www.maptiler.com/)
* :satellite: [Vercel](https://vercel.com/)
* :european_castle: [GeoDB Cities](https://rapidapi.com/wirefreethought/api/geodb-cities)

This project was generated with ```npx degit maptiler/svelte-template-maplibre-gl-js```

## Development

### Prerequisites

```sh
npm install npm@latest -g
```

### Setup

Clone the repo

```
  git clone https://github.com/fmariv/civitas.git
```

Navigate to the newly created project

```
  cd civitas
```

Install the NPM packages dependencies

```
  npm install
```

#### API keys

Rename or copy the `.env.example` file to `.env`

```
  cp .env.example .env
```

Open the `.env` file but :warning: you will need to insert your own MapTiler and RapidAPI API keys.

:information_source: If you don't have a MapTiler API key, you can create it for free [here](https://www.maptiler.com/cloud/). If you don't have a RapidAPI API key, go [there](https://docs.rapidapi.com/docs/keys).

### Run

To start your local environment, run: 

```
  npm run dev
``` 

You will find your app on address http://localhost:5000/.

Now you should see the app in your browser.

### Build

To build for production, run: 
```
  npm run build
``` 

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Credits

Favicon credits to [Freepik](https://www.flaticon.es/autores/freepik) in [Flaticon](https://www.flaticon.es/).