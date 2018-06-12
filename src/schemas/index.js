import { schema } from 'normalizr';

export const station = new schema.Entity('stations');

export const problem = new schema.Entity('problem', {
  stations: [station]
});


