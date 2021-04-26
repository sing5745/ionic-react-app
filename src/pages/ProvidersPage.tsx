import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react'
import { Link, RouteComponentProps } from 'react-router-dom';

interface ProviderRouteProps extends RouteComponentProps<{
  providerId: string;
}> {}

const ProvidersPage: React.FC<ProviderRouteProps> = ({match, history}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Providers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/dashboard/users/prachi/1">
            <IonLabel>Prachi Sharma</IonLabel>
          </IonItem>
          <IonItem>
            <Link to="/dashboard/users/2">
              <IonLabel>Ok</IonLabel>
            </Link>
          </IonItem>
          <IonItem>
            <IonButton onClick={e => {
              e.preventDefault();
              history.push('/dashboard/users/3')
            }}>
              <IonLabel>User 3</IonLabel>
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProvidersPage;