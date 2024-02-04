import express, { json } from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 5001;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

async function authentifier(email: any,pass:any) {
    try {
        console.log(email+pass+"nv");
        const response = await axios.get('http://localhost:3000/findByFilter/Admin/admin', {
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
  app.get('/authentificationaAdmin/:email/:password', async (req :any, res:any) => {
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
      res.send({ error: 'Admin n existe pas' });
    }
  });
app.use(express.json());