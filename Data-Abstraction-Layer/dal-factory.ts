import DemandeDal from './Demande-dal';
import DatabaseAbstractionLayer from './dal-interface';
import PGDAL from './pg-dal';
import OrganisationDal from './Organisation-dal';
import CommerceDal from './Commerce-dal';
import SignalDal from './Signal-dal';
import admin from './Admin';

export function getDAL(databaseType: string): DatabaseAbstractionLayer {
  switch (databaseType) {
    case 'postgresql':
      return new PGDAL();
    case 'SQLdemande' :
      return new DemandeDal();
    case 'SQLorganisation':
      return new OrganisationDal();
    case 'SQLcommerce':
      return new CommerceDal(); 
    case 'SQLsignal':
      return new SignalDal(); 
    case 'Admin' :
      return new admin();   
    default:
      throw new Error('Unsupported database type');
  }
}