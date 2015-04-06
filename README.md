#Famous Cordova Seed
> A seed project to get started with Webpack, Cordova and Famo.us

---

###Installation

```bash
git clone https://github.com/fouad/famous-cordova-seed
cd famous-cordova-seed
# rm -rf .git && git init && git commit -m "Make it so" # optionally reset git history
npm i # install dependencies
```

---

###Development
Run the dev server with ```npm run start-dev```

Now the dev server should run on localhost:8080

Run the linters with ```npm run lint```

Run All Tests with ```npm test```

###Cordova

For live-reload, run dev server then ```cordova run <platform>```.

###Production

Run ```npm run dist``` to create an uglified bundle. Also exposes ```window.ENV='PRODUCTION'```.