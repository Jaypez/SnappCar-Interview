import { ICar } from './ICar';
import { IFlags } from './IFlags';
import { IPriceInformation } from './IPriceInformation';
import { IUser } from './IUser';

export interface ISearchResult {
  flags: IFlags;
  priceInformation: IPriceInformation;
  ci: string;
  distance: number;
  car: ICar;
  user: IUser;
}
