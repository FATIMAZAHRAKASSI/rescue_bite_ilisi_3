import express from 'express';
import DatabaseAbstractionLayer from './dal-interface';
import { getDAL } from './dal-factory';
import { emitKeypressEvents } from 'readline';


const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

app.use(express.json());

app.post('/create/:databaseType/:nomEntity', async (req, res) => {
  try {
    const  data  = req.body;
    const databaseType = req.params.databaseType;
    const nomEntity = req.params.nomEntity;
   // console.log(req);
    console.log(databaseType);
    console.log(nomEntity);
   // const { _id, name, phone_number, email, address, city, state, country, password } = data;
    const dal: DatabaseAbstractionLayer = getDAL(databaseType as string);
    console.log("voici "+dal);
    const result = await dal.create(nomEntity as string, data);
    //res.json(result);
 //   console.log(result);
    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/get/:databaseType/:nomEntity/:id', async (req, res) => {
  try {
    const databaseType = req.params.databaseType;
    const nomEntity = req.params.nomEntity;
    const id = req.params.id;
    const dal: DatabaseAbstractionLayer = getDAL(databaseType as string);

    const result = await dal.get(nomEntity as string,id);
    if(result[0]!=null)
   { res.send(result[0]);
   }
   else{
    res.send(result);
   }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/FindAll/:databaseType/:nomEntity', async (req, res) => {
  try {
    const databaseType = req.params.databaseType;
    const nomEntity = req.params.nomEntity;
    const dal: DatabaseAbstractionLayer = getDAL(databaseType as string);

    const result = await dal.findAll(nomEntity as string);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/findByFilter/:databaseType/:nomEntity', async (req, res) => {
  try {
    const databaseType = req.params.databaseType;
    const nomEntity = req.params.nomEntity;
    let filter;
    if(req.body!=null)
    { filter = req.body;}
    else
    {
      filter=req.body.data;
    }
    
    console.log("filter .... "+JSON.stringify(filter));

    const dal: DatabaseAbstractionLayer = getDAL(databaseType as string);

    const result = await dal.findByFilter(nomEntity ,filter);
    if(result!=null)
    {res.json(result);}
    else
    {
      res.json(null);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/findByFilter2/:databaseType/:nomEntity', async (req, res) => {
  try {
    const databaseType = req.params.databaseType;
    const nomEntity = req.params.nomEntity;
    let filter;
    if(req.body!=null)
    { filter = req.body;}
    else
    {
      filter=req.body.data;
    }
    
   // console.log("filter .... "+JSON.stringify(filter));

    const dal: DatabaseAbstractionLayer = getDAL(databaseType as string);

    const result = await dal.findByFilter2(nomEntity ,filter);
    if(result!=null)
    {res.json(result);}
    else
    {
      res.json(null);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/findByFilter3/:databaseType/:nomEntity', async (req, res) => {
  try {
    const databaseType = req.params.databaseType;
    const nomEntity = req.params.nomEntity;
    let filter;
    if(req.body!=null)
    { filter = req.body;}
    else
    {
      filter=req.body.data;
    }
    
    console.log("filter .... "+JSON.stringify(filter));

    const dal: DatabaseAbstractionLayer = getDAL(databaseType as string);

    const result = await dal.findByFilter3(nomEntity ,filter);
    if(result!=null)
    {res.json(result);}
    else
    {
      res.json(null);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/update/:databaseType/:nomEntity/:id', async (req, res) => {
  try {
    const databaseType = req.params.databaseType;
    const nomEntity = req.params.nomEntity;
    console.log(req.body);
    const dal: DatabaseAbstractionLayer = getDAL(databaseType as string);
    const _id=req.params.id;
    const result = await dal.update(nomEntity as string,_id,req.body);
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
