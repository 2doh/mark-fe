import axios from "axios";
import { TradeMark } from "../interface/tradeMarkInterface";

export const searchKeyword = async () => {
  try {
    const req = await axios.get<TradeMark[]>("/trademark_sample.json");
    return req;
  } catch (error) {
    console.log(error);
  }
};
