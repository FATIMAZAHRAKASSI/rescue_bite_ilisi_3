import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Increase the limit for handling JSON payloads
app.use(bodyParser.json({ limit: '1000mb' }));
// Increase the limit for handling URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});




app.use(express.json());

async function checkIfElementExistsAndGetId(elem1:any) {
  console.log("votre element "+elem1);
  try {
    const response = await axios.get('http://localhost:3000/findByFilter/postgresql/postion_table', {
      data: elem1,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status ==200) {
      // Si la réponse est réussie, renvoyer l'ID extrait de la réponse
      const id = response.data.id; // Assurez-vous d'ajuster la propriété 'id' selon la structure de votre réponse
      console.log("here's my data "+response.data);
      return id;
    } else {
      return null;
    }
  } catch (error) {
    // Gérez les erreurs ici
    console.log("erooooooooor");
    return null; // En cas d'erreur, renvoyer null (ou une valeur appropriée)
  }
}

async function createInPostgreSQLAndGetId(pos1:any) {
  try {
    const response = await axios.post('http://localhost:3000/create/postgresql/postion_table', pos1, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status ==200) {
      const id = response.data.id; 
      return id;
    } else {
      // Si la réponse est un code d'erreur, renvoyer null (ou une valeur appropriée)
      return null;
    }
  } catch (error) {
    // Gérez les erreurs ici
    console.error(error);
    return null; // En cas d'erreur, renvoyer null (ou une valeur appropriée)
  }
}

app.post('/create/postgresql/postion_table', async (req, res) => {
 
  try {
   console.log("je suis la");
 //  const data=req.body
   const data=req.body.body;
   const pos=data.node;
console.log("affichage de deltas "+pos.delta_longitude+"------"+pos.delta_latitude);
let id1;
   try {
     id1=await checkIfElementExistsAndGetId(pos);
     if (id1==null) {
       console.log("id1 "+id1);
       id1=await createInPostgreSQLAndGetId(pos);
       console.log("id1 apres creation"+id1);
     }
     else
     {
      console.log("id1 recupere sans creation "+id1);
     }
       let newdata;
      if(data.role_user=="Organisation")
      {  
        newdata={
        "description": data.description,
        "adresse": data.adresse,
        "email": data.email,
        "heure_fermeture": data.heure_fermeture,
        "heure_ouverture": data.heure_ouverture,
        "logo": data.logo,    
        "mot_de_passe": data.mot_de_passe,
        "nom":data.nom,
        "type_organisation":data.type_organisation,
        "numero_telephone": data.numero_telephone,
        "role_user": data.role_user,
        "id_position": id1,
        "images":data.images
    }
    try {
      const responseOrganisation = await axios.post('http://localhost:3002/create/SQLorganisation', newdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (responseOrganisation.status ==200) {
        return res.status(200).json({ message: 'Création Organisation réussie' });
      } else {
        // Si la réponse est un code d'erreur, renvoyer null (ou une valeur appropriée)
        return null;
      }
    } catch (error) {
      // Gérez les erreurs ici
      console.error(error);
      return null; // En cas d'erreur, renvoyer null (ou une valeur appropriée)
    }
  }
  else{
     newdata={
      "description": data.description,
      "adresse": data.adresse,
      "email": data.email,
      "heure_fermeture": data.heure_fermeture,
      "heure_ouverture": data.heure_ouverture,
      "logo": data.logo,
      "mot_de_passe": data.mot_de_passe,
      "nom":data.nom,
      "type_commerce":data.type_commerce,
      "numero_telephone": data.numero_telephone,
      "role_user": data.role_user,
      "id_position": id1,
      "images":data.images
  }

  try {
    const responseComerce = await axios.post('http://localhost:5000/create/SQLcommerce', newdata, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (responseComerce.status ==200) {
      return res.status(200).json({ message: 'Création Commerce réussie' });
    } else {
      // Si la réponse est un code d'erreur, renvoyer null (ou une valeur appropriée)
      return null;
    }
  } catch (error) {
    // Gérez les erreurs ici
    console.error(error);
    return null; // En cas d'erreur, renvoyer null (ou une valeur appropriée)
  }
  }    
     
   } catch (error) {
     console.log('Erreur:');
   }

 }catch (error) {
   console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
 }
});


app.get('/get/postgresql/:id', async (req :any, res:any) => {
  const id=req.params.id;
  console.log("votre id"+id);

  const response = await axios.get(`http://localhost:3000/get/postgresql/postion_table/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        if(response!=null)
      {  console.log("ghjkljhg"+response.data);
      res.send(response.data);
      }
  else
  {
    res.send({ error: 'signal n existe pas' });
  }
});
app.get('/FindAll/postgresql', async (req :any, res:any) => {
  const response = await axios.get(`http://localhost:3000/FindAll/postgresql/postion_table`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data:{}
        });
        if(response!=null)
      {  console.log("ghjkljhg"+response.data);
      res.send(response.data);
      }
  else
  {
    res.send({ error: 'signal n existe pas' });
  }
});