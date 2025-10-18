import { minifaker } from '~/core/minifaker';

export const DUMMY_TIMESERIES = [
  //  fake daily timeseries data for a few months
  {
    date: '2024-04-01',
    value: minifaker({ seed: '2024-04-01' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-01s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-02',
    value: minifaker({ seed: '2024-04-02' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-02s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-03',
    value: minifaker({ seed: '2024-04-03' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-03s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-04',
    value: minifaker({ seed: '2024-04-04' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-04s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-05',
    value: minifaker({ seed: '2024-04-05' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-05s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-06',
    value: minifaker({ seed: '2024-04-06' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-06s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-07',
    value: minifaker({ seed: '2024-04-07' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-07s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-08',
    value: minifaker({ seed: '2024-04-08' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-08s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-09',
    value: minifaker({ seed: '2024-04-09' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-09s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-10',
    value: minifaker({ seed: '2024-04-10' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-10s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-11',
    value: minifaker({ seed: '2024-04-11' }).integer({
      min: 51,
      max: 256,
    }),
    secondaryValue: minifaker({ seed: '2024-04-11s' }).integer({
      min: 256,
      max: 400,
    }),
  },
  {
    date: '2024-04-12',
    value: minifaker({ seed: '2024-04-12' }).integer({
      min: 400,
      max: 860,
    }),
    secondaryValue: minifaker({ seed: '2024-04-12s' }).integer({
      min: 320 + 25,
      max: 760 + 50,
    }),
  },
  {
    date: '2024-04-13',
    value: minifaker({ seed: '2024-04-13' }).integer({
      min: 400,
      max: 860,
    }),
    secondaryValue: minifaker({ seed: '2024-04-13s' }).integer({
      min: 320 + 25,
      max: 760 + 50,
    }),
  },
  {
    date: '2024-04-14',
    value: minifaker({ seed: '2024-04-14' }).integer({
      min: 400,
      max: 860,
    }),
    secondaryValue: minifaker({ seed: '2024-04-14s' }).integer({
      min: 320 + 25,
      max: 460 + 50,
    }),
  },
  {
    date: '2024-04-15',
    value: minifaker({ seed: '2024-04-15' }).integer({
      min: 400,
      max: 860,
    }),
    secondaryValue: minifaker({ seed: '2024-04-15s' }).integer({
      min: 320 + 25,
      max: 460 + 50,
    }),
  },
  {
    date: '2024-04-16',
    value: minifaker({ seed: '2024-04-16' }).integer({
      min: 400,
      max: 860,
    }),
    secondaryValue: minifaker({ seed: '2024-04-16s' }).integer({
      min: 320 + 25,
      max: 460 + 50,
    }),
  },
  {
    date: '2024-04-17',
    value: minifaker({ seed: '2024-04-17' }).integer({
      min: 400,
      max: 860,
    }),
    secondaryValue: minifaker({ seed: '2024-04-17s' }).integer({
      min: 320 + 25,
      max: 460 + 50,
    }),
  },
  {
    date: '2024-04-18',
    value: minifaker({ seed: '2024-04-18' }).integer({
      min: 200,
      max: 460,
    }),
    secondaryValue: minifaker({ seed: '2024-04-18s' }).integer({
      min: 320 + 25,
      max: 460 + 50,
    }),
  },
  {
    date: '2024-04-19',
    value: minifaker({ seed: '2024-04-19' }).integer({
      min: 200,
      max: 460,
    }),
    secondaryValue: minifaker({ seed: '2024-04-19s' }).integer({
      min: 320 + 25,
      max: 760 + 50,
    }),
  },
  {
    date: '2024-04-20',
    value: minifaker({ seed: '2024-04-20' }).integer({
      min: 200,
      max: 460,
    }),
    secondaryValue: minifaker({ seed: '2024-04-20s' }).integer({
      min: 320 + 25,
      max: 760 + 50,
    }),
  },
  {
    date: '2024-04-21',
    value: minifaker({ seed: '2024-04-21' }).integer({
      min: 360,
      max: 510,
    }),
    secondaryValue: minifaker({ seed: '2024-04-21s' }).integer({
      min: 326 + 25,
      max: 530 + 50,
    }),
  },
  {
    date: '2024-04-22',
    value: minifaker({ seed: '2024-04-22' }).integer({
      min: 360,
      max: 510,
    }),
    secondaryValue: minifaker({ seed: '2024-04-22s' }).integer({
      min: 326 + 25,
      max: 530 + 50,
    }),
  },
  {
    date: '2024-04-23',
    value: minifaker({ seed: '2024-04-23' }).integer({
      min: 360,
      max: 510,
    }),
    secondaryValue: minifaker({ seed: '2024-04-23s' }).integer({
      min: 326 + 25,
      max: 530 + 50,
    }),
  },
  {
    date: '2024-04-24',
    value: minifaker({ seed: '2024-04-24' }).integer({
      min: 360,
      max: 510,
    }),
    secondaryValue: minifaker({ seed: '2024-04-24s' }).integer({
      min: 326 + 25,
      max: 530 + 50,
    }),
  },
  {
    date: '2024-04-25',
    value: minifaker({ seed: '2024-04-25' }).integer({
      min: 360,
      max: 510,
    }),
    secondaryValue: minifaker({ seed: '2024-04-25s' }).integer({
      min: 326 + 25,
      max: 530 + 50,
    }),
  },
  {
    date: '2024-04-26',
    value: minifaker({ seed: '2024-04-26' }).integer({
      min: 360,
      max: 510,
    }),
    secondaryValue: minifaker({ seed: '2024-04-26s' }).integer({
      min: 326 + 25,
      max: 530 + 50,
    }),
  },
  {
    date: '2024-04-27',
    value: minifaker({ seed: '2024-04-27' }).integer({
      min: 360,
      max: 510,
    }),
    secondaryValue: minifaker({ seed: '2024-04-27s' }).integer({
      min: 326 + 25,
      max: 530 + 50,
    }),
  },
  {
    date: '2024-04-28',
    value: minifaker({ seed: '2024-04-28' }).integer({
      min: 360,
      max: 510,
    }),
    secondaryValue: minifaker({ seed: '2024-04-28s' }).integer({
      min: 326 + 25,
      max: 530 + 50,
    }),
  },
  {
    date: '2024-04-29',
    value: minifaker({ seed: '2024-04-29' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-04-29s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-04-30',
    value: minifaker({ seed: '2024-04-30' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-04-30s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-01',
    value: minifaker({ seed: '2024-05-01' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-05-01s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-02',
    value: minifaker({ seed: '2024-05-02' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-05-02s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-03',
    value: minifaker({ seed: '2024-05-03' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-05-03s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-04',
    value: minifaker({ seed: '2024-05-04' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-05-04s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-05',
    value: minifaker({ seed: '2024-05-05' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-05-05s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-06',
    value: minifaker({ seed: '2024-05-06' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-05-06s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-07',
    value: minifaker({ seed: '2024-05-07' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-05-07s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-08',
    value: minifaker({ seed: '2024-05-08' }).integer({
      min: 150,
      max: 420,
    }),
    secondaryValue: minifaker({ seed: '2024-05-08s' }).integer({
      min: 225 + 25,
      max: 430 + 50,
    }),
  },
  {
    date: '2024-05-09',
    value: minifaker({ seed: '2024-05-09' }).integer({
      min: 260,
      max: 620,
    }),
    secondaryValue: minifaker({ seed: '2024-05-09s' }).integer({
      min: 426 + 25,
      max: 730 + 50,
    }),
  },
  {
    date: '2024-05-10',
    value: minifaker({ seed: '2024-05-10' }).integer({
      min: 260,
      max: 620,
    }),
    secondaryValue: minifaker({ seed: '2024-05-10s' }).integer({
      min: 426 + 25,
      max: 730 + 50,
    }),
  },
  {
    date: '2024-05-11',
    value: minifaker({ seed: '2024-05-11' }).integer({
      min: 260,
      max: 620,
    }),
    secondaryValue: minifaker({ seed: '2024-05-11s' }).integer({
      min: 426 + 25,
      max: 730 + 50,
    }),
  },
  {
    date: '2024-05-12',
    value: minifaker({ seed: '2024-05-12' }).integer({
      min: 260,
      max: 620,
    }),
    secondaryValue: minifaker({ seed: '2024-05-12s' }).integer({
      min: 426 + 25,
      max: 730 + 50,
    }),
  },
  {
    date: '2024-05-13',
    value: minifaker({ seed: '2024-05-13' }).integer({
      min: 260,
      max: 620,
    }),
    secondaryValue: minifaker({ seed: '2024-05-13s' }).integer({
      min: 426 + 25,
      max: 730 + 50,
    }),
  },
  {
    date: '2024-05-14',
    value: minifaker({ seed: '2024-05-14' }).integer({
      min: 260,
      max: 620,
    }),
    secondaryValue: minifaker({ seed: '2024-05-14s' }).integer({
      min: 426 + 25,
      max: 730 + 50,
    }),
  },
  {
    date: '2024-05-15',
    value: minifaker({ seed: '2024-05-15' }).integer({
      min: 260,
      max: 620,
    }),
    secondaryValue: minifaker({ seed: '2024-05-15s' }).integer({
      min: 426 + 25,
      max: 730 + 50,
    }),
  },
  {
    date: '2024-05-16',
    value: minifaker({ seed: '2024-05-16' }).integer({
      min: 260,
      max: 620,
    }),
    secondaryValue: minifaker({ seed: '2024-05-16s' }).integer({
      min: 426 + 25,
      max: 730 + 50,
    }),
  },
  {
    date: '2024-05-17',
    value: minifaker({ seed: '2024-05-17' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-17s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-18',
    value: minifaker({ seed: '2024-05-18' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-18s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-19',
    value: minifaker({ seed: '2024-05-19' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-19s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-20',
    value: minifaker({ seed: '2024-05-20' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-20s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-21',
    value: minifaker({ seed: '2024-05-21' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-21s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-22',
    value: minifaker({ seed: '2024-05-22' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-22s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-23',
    value: minifaker({ seed: '2024-05-23' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-23s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-24',
    value: minifaker({ seed: '2024-05-24' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-24s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-25',
    value: minifaker({ seed: '2024-05-25' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-25s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-26',
    value: minifaker({ seed: '2024-05-26' }).integer({
      min: 345,
      max: 900,
    }),
    secondaryValue: minifaker({ seed: '2024-05-26s' }).integer({
      min: 655 + 25,
      max: 930 + 50,
    }),
  },
  {
    date: '2024-05-27',
    value: minifaker({ seed: '2024-05-27' }).integer({
      min: 500,
      max: 1100,
    }),
    secondaryValue: minifaker({ seed: '2024-05-27s' }).integer({
      min: 500 + 25,
      max: 1300 + 50,
    }),
  },
  {
    date: '2024-05-28',
    value: minifaker({ seed: '2024-05-28' }).integer({
      min: 450,
      max: 1100,
    }),
    secondaryValue: minifaker({ seed: '2024-05-28s' }).integer({
      min: 4250 + 25,
      max: 1300 + 50,
    }),
  },
  {
    date: '2024-05-29',
    value: minifaker({ seed: '2024-05-29' }).integer({
      min: 100,
      max: 800,
    }),
    secondaryValue: minifaker({ seed: '2024-05-29s' }).integer({
      min: 1200 + 25,
      max: 830 + 50,
    }),
  },
];
