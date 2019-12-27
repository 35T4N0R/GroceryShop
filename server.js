import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  {
    id: 0,
    nazwa: "Pomidor",
    producent: "Pomodoro",
    cena: 4.5,
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Pomidory_-_tomato.jpg/250px-Pomidory_-_tomato.jpg",
    ilosc: 0
  },
  {
    id: 1,
    nazwa: "Mleko",
    producent: "Mlekovita",
    cena: 4.99,
    img: "https://e-szop24.pl/photos/017089_mlekovita_wyp_mle_32_bb1.png",
    ilosc: 0
  },
  {
    id: 2,
    nazwa: "Chleb",
    producent: "Chlebexpol",
    cena: 1.99,
    img:
      "https://mojanatura.pl/744-cart_default/chleb-slonecznikowy-300g-bezgluten.jpg",
    ilosc: 0
  },
  {
    id: 3,
    nazwa: "Masło",
    producent: "Mlekovita",
    cena: 7.49,
    img:
      "https://secure.ce-tescoassets.com/assets/PL/207/5900512300207/ShotType1_540x540.jpg",
    ilosc: 0
  },
  {
    id: 4,
    nazwa: "Mąka",
    producent: "Basia",
    cena: 4.99,
    img:
      "https://zakupycodzienne.carrefour.pl/images/product/350x350/basia-maka-z-pelnego-przemialu-pszenna-typ-1850-1-kg-5v0ofn.jpg",
    ilosc: 0
  },
  {
    id: 5,
    nazwa: "Marchewka",
    producent: "Marchewkolandia",
    cena: 2.99,
    img:
      "https://kobieco.pl/wp-content/uploads/2016/07/Marchewka-%E2%80%93-kalorie.jpg",
    ilosc: 0
  }
];

let orders = [];
let cartProducts = [];
let suma = 0;

app.get("/orders", function(req, res) {
  res.send(orders);
});

app.get("/cartProducts", function(req, res) {
  res.send(cartProducts);
});

app.get("/suma", function(req, res) {
  res.send({ suma: suma });
});

app.get("/products", function(req, res) {
  res.send(products);
});

app.post("/cartProducts", (req, res) => {
  const produktDoKoszyka = req.body;
  let dupl = false;
  cartProducts.forEach(el => {
    if (el.id === produktDoKoszyka.id) {
      el.ilosc += 1;
      dupl = true;
    }
  });
  if (!dupl) {
    produktDoKoszyka.ilosc = 1;
    cartProducts.push(produktDoKoszyka);
  }
  res.send(produktDoKoszyka);
});

app.post("/suma", (req, res) => {
  const cena = req.body;
  let blad = false;
  if (typeof cena.cena !== typeof 1.1) {
    res.sendStatus(304);
    blad = true;
  }
  if (!blad) {
    suma += cena.cena;
    res.send(cena);
  }
});

app.post("/products", (req, res) => {
  const produkt = req.body;
  let dupl = false;
  products.forEach(el => {
    if (
      el.nazwa === produkt.data.nazwa &&
      el.producent === produkt.data.producent
    ) {
      res.sendStatus(304);
      dupl = true;
    }
  });
  if (!dupl) {
    produkt.ilosc = 0;
    products.push(produkt.data);
    res.send(produkt.data);
  }
});

app.get("/products/:nazwa", (req, res) => {
  let nazwa = req.params.nazwa;
  products.forEach(el => {
    if (el.nazwa === nazwa) return res.send(el);
  });
  res.status(304).send({ err: 304 });
});

app.put("/products/:id", (req, res) => {
  const produkt = req.body;
  const IDproduktu = parseInt(req.params.id, 10);
  let present = false;
  // eslint-disable-next-line array-callback-return
  products.map((item,index, tab) => {
    console.log(item.id);
    console.log(IDproduktu)
    if (item.id === IDproduktu) {
      
      tab[index].nazwa = produkt.data.nazwa;
      tab[index].producent = produkt.data.producent;
      tab[index].cena = produkt.data.cena;
      res.send({ data: tab[index], id: IDproduktu });
      present = true;
    }
  });
  if (!present) res.sendStatus(304);
});

app.put("/cart/:id", (req, res) => {
  const IDproduktu = parseInt(req.params.id, 10);
  const czyDodac = req.body.czyDodac;
  let present = false;
  // eslint-disable-next-line array-callback-return
  cartProducts.map((el, index) => {
    if (el.id === IDproduktu) {
      if (czyDodac) {
        el.ilosc += 1;
        suma = suma + el.cena;
      } else {
        el.ilosc -= 1;
        if (el.ilosc === 0) {
          cartProducts.splice(index, 1);
        }
        suma = suma - el.cena;
      }
      res.send({ updated: el, czyDodac: czyDodac });
      present = true;
    }
  });
  if (!present) res.sendStatus(304);
});

app.delete("/products/:id", (req, res) => {
  const IDproduktu = parseInt(req.params.id, 10);
  let index;
  let removed = false;
  products.forEach((item, id) => {
    if (item.id === IDproduktu) {
      index = products.indexOf(item);
      products.splice(index, 1);
      res.send(item);
      removed = true;
    }
  });
  if (!removed) res.sendStatus(304);
});

app.delete("/cart/:id", (req, res) => {
  const IDproduktuDoUsuniecia = parseInt(req.params.id, 10);
  let removed = false;
  cartProducts.forEach((item, index) => {
    if (item.id === IDproduktuDoUsuniecia) {
      suma = suma - item.cena * item.ilosc;
      cartProducts.splice(index, 1);
      res.send(item);
      removed = true;
    }
  });
  if (!removed) res.sendStatus(304);
});

app.post("/orders", (req, res) => {
  const order = req.body;
  orders.push(order);
  res.send(order);
});

app.listen(8080, () => console.log("Listening on port 8080!"));
