import {denormalize} from "normalizr";
import * as schema from "../schemas";

export const wrappedDenormalizeProblem = (id, state) => {
  return denormalize(id, schema.problem, {
    problem: state.byId.byCaseId,
    stations: state.byId.byStationId
  });
};
