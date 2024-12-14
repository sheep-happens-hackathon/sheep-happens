import { DbDAO } from "./DbDAO";
import { IDAO } from "./IDAO";
import { MockDAO } from "./MockDAO";

export const DAO: IDAO = new MockDAO();
