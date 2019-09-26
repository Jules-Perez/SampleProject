const express = require("express");
const app = express();

const carsData = [
  { id: 0, brand: "Audi", model: "R8" },
  { id: 1, brand: "Chevrolet", model: "Trax" },
  { id: 2, brand: "Subaru", model: "WRX" },
  { id: 3, brand: "Honda", model: "Civic" },
  { id: 4, brand: "Mitsubishi", model: "Lancer" }
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<a href='/api/carData'>Go to car data.</a><br>
  Store Data using POST in "http://localhost:4000/api/storeData/" with a JSON object`);
});

app.get("/api/carData", (req, res) => {
  res.send(carsData);
});

app.get("/api/carData/:id:brand", (req, res) => {
  const car = carsData.find(c => c.id === parseInt(req.params.id));

  if (!car) res.status(404).send("no car data found. please add the car data!");
  else res.send(car);
});

app.post("/api/storeData", (req, res) => {
  const brand = req.body.brand;
  const model = req.body.model;

  if (!brand || !model) {
    res.send(`Error <br>brand: ${brand}<br>model: ${model}`);
  } else {
    addCarData(brand, model);
    res.send(
      `New car with <br><div>brand: ${brand}<br>model: ${model}</div><br>has been added!<br>`
    );
  }
});

addCarData = (brandParam, modelParam) => {
  carsData.push({
    id: carsData.length,
    brand: brandParam,
    model: modelParam
  });
  console.log("new car has been added");
};

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
