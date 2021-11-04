import { Coin } from "../models/coin.model";
import { CoinDetails } from "../models/coinDetails.model";
import { loadData } from "./api.service";

class CoinsService {
  private requestBasePath = 'coins';

  public async getCoinsList(includePlatform: boolean = false): Promise<Coin[]> {
    const coinsList = await loadData(`${this.requestBasePath}/list?include_platform=${includePlatform}`);
    return coinsList;
 }

  public async getCoinDetails(id: string): Promise<CoinDetails> {
    return this.mapCoinDetails(await loadData(`${this.requestBasePath}/${id}`));
  }

  private mapCoinDetails(jsonData: any): CoinDetails {
    const coinDetails = {
      id: jsonData.id,
      symbol: jsonData.symbol,
      name: jsonData.name,
      description: jsonData.description.en,
      imageUrl: jsonData.image.large,
      currentPrice: jsonData.market_data.current_price.aud
    } as CoinDetails;
    return coinDetails;
  }
}

export const coinsService = new CoinsService();