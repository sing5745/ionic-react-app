import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonChip, IonIcon, IonLabel, IonItem, IonTextarea } from '@ionic/react'
import { RouteComponentProps } from 'react-router';
import { pin, heart, closeCircle, close } from 'ionicons/icons';
import firebase from 'firebase/app';
require('firebase/database');

interface UserDetailPageProps extends RouteComponentProps<{
  id: string;
  providerId: string;
}> {}

const UserDetailPage: React.FC<UserDetailPageProps> = ({match, history}) => {
  const [packageType, setPackageType] = useState<string>();
  const [result, setResult] = useState([]);
  const [text, setText] = useState<string>();
  const array = ['Daal', 'Roti', ''];

  var firebaseConfig = {
    apiKey: "AIzaSyAzYzPMGzjTGskKnXXts45BgTbIzq9Lq3s",
    authDomain: "ionic-test-app-89c72.firebaseapp.com",
    databaseURL: "https://ionic-test-app-89c72-default-rtdb.firebaseio.com",
    projectId: "ionic-test-app-89c72",
    storageBucket: "ionic-test-app-89c72.appspot.com",
    messagingSenderId: "801532170994",
    appId: "1:801532170994:web:00b56f0b0c50a689cdf66b",
    measurementId: "G-6PHSSGZ4P9"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

  const dbref = firebase.database().ref('testDB/');

  const createForm = () => {
    dbref.on('value', resp => {
      console.log(resp);
      const returnArr: any[] = []
      resp.forEach((childSnapshot: any) => {
        const item = childSnapshot.val()
        item.key = childSnapshot.key
        returnArr.push(item)
      });
    });
  }

  const addPackage = () => {
    console.log('ADDING PACKAG');
    const pkg = {packages};
    console.log(pkg.packages.package1);

    console.log(dbref.push(pkg.packages));
  }
  
  //firebase.initializeApp(firebaseConfig);
 

  const packages = {
			package1 : {
            price: 150, 
            items: {
            	daal: 1, 
                subzi: 1, 
                rice: 1, 
                roti: 4
             }, 
            addOns: ['Rice'],
            customized: [],
            note: ''
}};

  const [packages, setPackages] = useState(() => packages)
  const [names, setNames] = useState(() => array.map(item => item));
  const foodItems = ['Daal'];
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>User Detail </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <br />
        User {match.params.id} {names}
        <br />
        Provider {match.params.providerId}
        {names.map(((item) => (
          <IonChip color="secondary">
            <IonLabel>{item}</IonLabel>
            <IonIcon color="danger" onClick={() => {
             array.pop();
             console.log(array);
             setNames(() => array.map(item => item))
            }} icon={close} />
          </IonChip>
      )))}
       {Object.entries(packages.package1.items).filter(item =>  {
         return item[1] > 0;
       } )
       .map(((item) => (
          <IonChip color="secondary">
            <IonLabel>{item[1]} {item[0].toUpperCase()}</IonLabel>
            <IonIcon color="danger" onClick={() => {
             if(item[0] == "rice"){
               packages.package1.items['roti'] = 6; 
             }
             if(item[0] == "roti" && item[1] == 5){
               packages.package1.items['rice'] = 1; 
             }
             packages.package1.items[item[0]] = packages.package1.items[item[0]] - 1;
             setPackages(() => Object.assign({}, packages));
             console.log(packages);
            }} icon={close} />
          </IonChip>
      )))}
        <IonChip color="secondary">
          <IonLabel>1</IonLabel>
          <IonIcon color="danger" onClick={() => {
            //{result}.push('1');
            
            setResult(result => [...result], ['ddal']);
            addPackage();
          }} icon={close} />
        </IonChip>
        <IonItem>
            <IonLabel position="floating">Note</IonLabel>
            <IonTextarea value={packages.package1.note} onIonChange={e => {
              console.log(e.detail.value);
              packages.package1.note = e.detail.value;
              setPackages(() => Object.assign({}, packages));
              setText(e.detail.value!)
              console.log(packages);
            }}></IonTextarea>
        </IonItem> 
        
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;