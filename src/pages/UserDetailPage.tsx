import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonChip, IonIcon, IonLabel } from '@ionic/react'
import { RouteComponentProps } from 'react-router';
import { pin, heart, closeCircle, close } from 'ionicons/icons';

interface UserDetailPageProps extends RouteComponentProps<{
  id: string;
}> {}

const UserDetailPage: React.FC<UserDetailPageProps> = ({match, history}) => {
  const [packageType, setPackageType] = useState<string>();
  const [result, setResult] = useState([]);
  const [packages, setPackages] = useState({})
  const array = ['Daal', 'Roti', 'Rice'];

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

//setTestPacks(packages);

  const [packages, setPackages] = useState(() => packages)
  const [names, setNames] = useState(() => array.map(item => item));
  const foodItems = ['Daal'];
  console.log({packages})
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
        User {match.params.id} {JSON.stringify(packages)} {names}
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
            console.log({result});
          }} icon={close} />
        </IonChip>
        
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;