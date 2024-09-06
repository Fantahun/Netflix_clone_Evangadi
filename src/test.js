
//question 3

app.post("/addiphones", (req, res) => {
    // console.log(bodyparser.json);
    let url = req.body.product_url;
    let img = req.body.img;
    let link = req.body.link;
    let name = req.body.product_name;
    let Brief = req.body.brief;
    let StartPrice = req.body.StartPrice;
    let PriceRange = req.body.priceRange;
    let Description = req.body.desc;
  
    console.log(req.body);
    //   var url = req.body.product_url;
    //   var product = req.body.product_name;
    let prd = `INSERT INTO Products (product_url, product_name)
  VALUES (?,?);`;
  
    connection.query(prd, [url, name], function (err, result) {
      if (err) throw err;
      console.log("inserted");
      var id = result.insertId;
  
      // if(Brief!=0 && Description!=0 && link!=0){
      let description = `INSERT INTO ProductDescription (product_id, product_brief_description,
          product_description , product_img , product_link)
  VALUES (?,?,?,?,?);`;
  
      connection.query(
        description,
        [id, Brief, Description, img, link],
        function (err, result) {
          if (err) throw err;
          console.log("inserted desc table");
        }
      );
      // }
      let price_table = `INSERT INTO ProductPrice(product_id,starting_price,price_range)
    VALUES(?,?,?)`;
      connection.query(price_table, [id, StartPrice, PriceRange], (err, res) => {
        if (err) throw err;
        console.log("inserted price table");
      });
    });
  });
  