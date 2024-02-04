import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';
import flatted from 'flatted';


const app = express();
const port = process.env.PORT || 3003;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


app.post('/create/SQLsignal', async (req, res) => {
  try {
    const data = req;
  //  const jsonString = flatted.stringify(data);

// Parse the JSON string
//const parsedObject = flatted.parse(jsonString);
//console.log(parsedObject)
   // const data = req.body.body;
   const responseSignalDB = await axios.post('http://localhost:3000/create/SQLsignal/my_signal', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("data de signal "+responseSignalDB.data);
    if (responseSignalDB.status === 200) {
      return res.json(req);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get/SQLsignal/:id', async (req :any, res:any) => {
  const id=req.params.id;
  console.log("votre id"+id);

  const response = await axios.get(`http://localhost:3000/get/SQLsignal/my_signal/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        if(response!=null)
      {  console.log("ghjkljhg"+response.data);
         //recuperer la position
        const response2 = await axios.get(`http://localhost:5000/get/SQLcommerce/${response.data.id_commerce}`, {
         headers: {
      'Content-Type': 'application/json',
         },
         data:{}
           });
  const mergedJson = { ...response.data, ...response2.data};
  //console.log("data de signal "+JSON.stringify(mergedJson));

return res.json(mergedJson);

      }
  else
  {
    return res.send({ error: 'signal n existe pas' });
  }
});

app.get('/getSanscommerce/SQLsignal/:id', async (req :any, res:any) => {
  const id=req.params.id;
  console.log("votre id"+id);

  const response = await axios.get(`http://localhost:3000/get/SQLsignal/my_signal/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        if(response!=null)
      {  

return res.json(response.data);

      }
  else
  {
    return res.send({ error: 'signal n existe pas' });
  }
});


app.get('/FindAll/SQLsignal', async (req :any, res:any) => {
  const response = await axios.get(`http://localhost:3000/FindAll/SQLsignal/my_signal`, {
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
             const response2 = await axios.get(`http://localhost:3003/get/SQLsignal/${item.id_signal}`, {
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
app.post('/accepter/signal/:id', async (req, res) => {
  try {
    const data = req;
    const id=req.params.id;
    console.log(data);
   // const data = req.body.body;
   const responseComerceDB = await axios.put(`http://localhost:3000/update/SQLsignal/my_signal/${id}`, data, {
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


app.post('/refuser/signal/:iddemande/:idsignal', async (req, res) => {
  try {
    const iddemande=req.params.iddemande;
    const idsignal=req.params.idsignal;
    const jsonString = `{"id_signal": ${idsignal}}`;
    const data = JSON.parse(jsonString);
   // const data = req.body.body;
   const responseComerceDB = await axios.get(`http://localhost:3000/findByFilter/SQLdemande/${iddemande}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data:data
    });

    if (responseComerceDB.status === 200) {
      
      return res.status(200).send(responseComerceDB.data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/FindAllEn_attente/SQLsignal/:idcommerce', async (req :any, res:any) => {
 const idcomm=req.params.idcommerce;
console.log(idcomm)
  const response = await axios.get(`http://localhost:3000/findByFilter/SQLsignal/signal`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{"id":idcomm}
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
             const response2 = await axios.get(`http://localhost:3003/get/SQLsignal/${item.id_signal}`, {
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


app.get('/FindAllEn_attente/SQLsignal', async (req :any, res:any) => {
  const idcomm=req.params.idcommerce;
 console.log(idcomm)
   const response = await axios.get(`http://localhost:3000/findByFilter2/SQLsignal/signal`, {
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
              const response2 = await axios.get(`http://localhost:3003/getSanscommerce/SQLsignal/${item.id_signal}`, {
             headers: {
               'Content-Type': 'application/json',
             },
             data:{}
           });

           const response3 = await axios.get(`http://localhost:5000/get/SQLcommerce/${item.id_commerce}`, {
             headers: {
               'Content-Type': 'application/json',
             },
             data:{}
           });
          // console.log("data prolly"+JSON.stringify(response2.data));
          const cord={"latitude":response3.data.latitude,"longitude":response3.data.longitude}
          const merge={...response2.data,...cord}
           jsonArray.push(merge);
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
 
app.use(express.json());

