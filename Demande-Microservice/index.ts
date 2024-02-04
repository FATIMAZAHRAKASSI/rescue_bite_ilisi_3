import axios from 'axios';
import express from 'express';
import * as flatted from 'flatted';
import { json } from 'sequelize';
import { singularize } from 'sequelize/types/utils';


const app = express();
const port = process.env.PORT || 3005;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
app.post('/create/demande', async (req, res) => {
  try {
    const data = req;
    console.log("the data"+data);
   // const data = req.body.body;
   const responseComerceDB = await axios.post('http://localhost:3000/create/SQLdemande/demande', data, {
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



app.get('/get/SQLdemande/:id', async (req :any, res:any) => {
  const id=req.params.id;
  console.log("votre id"+id);

  const response = await axios.get(`http://localhost:3000/get/SQLdemande/demande/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        if(response!=null)
      {  //console.log("ghjkljhg"+response.data);

      //recuperer la position
      const response2 = await axios.get(`http://localhost:3003/get/SQLsignal/${response.data.id_signal}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        const mergedJson = { ...response.data, ...response2.data};

      res.send(mergedJson);
      }
  else
  {
    res.send({ error: 'commerce n existe pas' });
  }
});


app.get('/FindAll/SQLdemande/:id', async (req :any, res:any) => {
  const id=req.params.id;
  const jsonString = `{"id_signal": ${id}}`;
    const data = JSON.parse(jsonString);
  const response = await axios.get(`http://localhost:3000/FindByFilter2/SQLdemande/demande`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:data
        });
        if(response!=null)
        {  
          //console.log("ghjkljhg"+response.data);
         
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
          const response3 = await axios.get(`http://localhost:3002/get/SQLorganisation/${item.id_organisation}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data:{}
          });
         // console.log("data prolly"+JSON.stringify(response2.data));
         const jsonorga={"organisation":response3.data}
         console.log("orga"+jsonorga)
         const mergedJson = { ...item, ...response2.data,...jsonorga};
          jsonArray.push(mergedJson);
          console.log("blabla"+JSON.stringify(jsonArray[i]));
          i++;
            };
            
            res.send(jsonArray);

        }
    else
    {
      res.send({ error: 'demande n existe pas' });
    }
});

app.put('/accepter/demande/:id', async (req, res) => {
  try {
    const data = req;
    const id=req.params.id;
   // const data = req.body.body;
   const responseDemandeDB = await axios.put(`http://localhost:3000/update/SQLdemande/demande/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (responseDemandeDB.status === 200) {
      let idsignal=responseDemandeDB.data.id_signal;
      console.log("response data"+responseDemandeDB.data.id_signal);
      const responseSignal = await axios.get(`http://localhost:3003/get/SQLsignal/${idsignal}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data:{}
    });
 //   console.log("votre data "+flatted.stringify(responseSignal.data));
    responseSignal.data.statutsignal="Termine"
    console.log("nouveau data apres modification "+JSON.stringify(responseSignal.data))
    if(responseSignal.status===200)
      {
       const responseSignalUpdateDB = await axios.post(`http://localhost:3003/accepter/signal/${idsignal}`, responseSignal.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
          const responseDemandeRefuseDB = await axios.post(`http://localhost:3003/refuser/signal/${id}/${idsignal}`, responseSignal.data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return res.json(responseDemandeRefuseDB.data);
      
    }
  }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//organisation : liste 3
app.get('/findDemandesAcceptesOrga/:id', async (req :any, res:any) => {
  const id=req.params.id;
  console.log("votre id"+id);
const data={
  "id_organisation":id
}
  const response = await axios.get(`http://localhost:3000/findByFilter3/SQLdemande/demande`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:data
        });
        if(response!=null)
      {  //console.log("ghjkljhg"+response.data);
        let jsonArray=[]
        for(var item of response.data){
          //faire appel a l'api de getById puis inserer dans le json
         const response2 = await axios.get(`http://localhost:5000/get/SQLcommerce/${item.id_commerce}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data:{}
      });
     // console.log("data prolly"+JSON.stringify(response2.data));
     const mergedJson = { ...item, ...response2.data};
      jsonArray.push(mergedJson);
        };
      

      res.send(jsonArray);
      }
  else
  {
    res.send({ error: 'commerce n existe pas' });
  }
});

app.use(express.json());

