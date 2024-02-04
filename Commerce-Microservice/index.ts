import express, { json } from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

app.use(express.json());

app.post('/create/SQLcommerce', async (req, res) => {
  try {
    const data = req.body;
   // const data = req.body.body;
   const responseComerceDB = await axios.post('http://localhost:3000/create/SQLcommerce/commerce', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (responseComerceDB.status === 200) {
      return res.status(200).send(responseComerceDB.data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function authentifier(email: any,pass:any) {
  try {
      console.log(email+pass+"nv");
      const response = await axios.get('http://localhost:3000/findByFilter/SQLcommerce/commerce', {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{
              "email":email,
              "mot_de_passe":pass
          }
        });
        if(response!=null)
      {  console.log("ghjkljhg"+response.data);
        return response.data;
      }
      else{
        return null;
      }
  }
catch (error) {
  // Handle errors
  console.error('Error', error);
  return { error: 'Internal Server Error' };
}}
app.get('/authentificationCommerce/:email/:password', async (req :any, res:any) => {
  const email=req.params.email;
  const pass=req.params.password;
  console.log(email+pass);
  const b=await authentifier(email,pass);
  if(b!=null)
  {const c=JSON.stringify(b);
 // console.log("here's "+JSON.stringify(b))
    res.send( JSON.parse(c));
  }
  else
  {
    res.send({ error: 'commerce n existe pas' });
  }
});


app.get('/get/SQLcommerce/:id', async (req :any, res:any) => {
  const id=req.params.id;
  console.log("votre id"+id);

  const response = await axios.get(`http://localhost:3000/get/SQLcommerce/commerce/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        if(response!=null)
      {  console.log("ghjkljhg"+response.data);

      //recuperer la position
      const response2 = await axios.get(`http://localhost:3001/get/postgresql/${response.data.id_position}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        const mergedJson = { ...response.data, ...response2.data};
console.log(JSON.stringify("merged"+mergedJson))
      res.send(mergedJson);
      }
  else
  {
    res.send({ error: 'commerce n existe pas' });
  }
});
app.get('/FindAll/SQLcommerce', async (req :any, res:any) => {
  const response = await axios.get(`http://localhost:3000/FindAll/SQLcommerce/commerce`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        if(response!=null)
      {  
        console.log("ghjkljhg"+response.data);
        if (Array.isArray(response.data)) {
          let jsonArray: any[] = [];
           var i =0;
          // Parcourir les éléments du tableau
          for(var item of response.data){
            //faire appel a l'api de getById puis inserer dans le json
           const response2 = await axios.get(`http://localhost:5000/get/SQLcommerce/${item.id_utilisateur}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
       // console.log("data prolly"+JSON.stringify(response2.data));
        jsonArray.push(response2.data);
        console.log("blabla"+JSON.stringify(jsonArray[i]));
        i++;
          };
          res.send(jsonArray);
        } else {
          // Si les données ne sont pas un tableau
          console.error('Les données ne sont pas un tableau JSON.');
        }
      }
  else
  {
    res.send({ error: 'commerce n existe pas' });
  }
});