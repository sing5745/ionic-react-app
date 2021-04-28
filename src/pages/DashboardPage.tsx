import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import UserDetailPage from './UserDetailPage';
import UsersListPage from './UsersListPage';
import ProvidersPage from './ProvidersPage';

const DashboardPage: React.FC<RouteComponentProps> = ({match}) => {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url} component={UsersListPage} /> 
      <Route exact path={`${match.url}/providers`} component={ProvidersPage} />
      <Route path={`${match.url}/users/:providerId/:id`} component={UserDetailPage} />
    </IonRouterOutlet>
  );
};

export default DashboardPage