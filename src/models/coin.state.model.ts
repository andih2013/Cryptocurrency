import { Coin } from "./coin.model";

export interface CoinState {
    coins?: Coin[];
    coinsCount?: number;
    currentPage?: number;
    pager?: any;
}