import { groups } from './countries';

// Add winner and loser to country

export const initResults = {
  groups,
  roundOfSixteen: [
    {
      name: 'O1 - 1A v/s 2B',
      firstCountry: {
        value: groups.A[0],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.B[1],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'O5 - 2A v/s 1B',
      firstCountry: {
        value: groups.A[1],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.B[0],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'O2 - 1C v/s 2D',
      firstCountry: {
        value: groups.C[0],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.D[1],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'O6 - 2C v/s 1D',
      firstCountry: {
        value: groups.C[1],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.D[0],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'O3 - 1E v/s 2F',
      firstCountry: {
        value: groups.E[0],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.F[1],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'O7 - 2E v/s 1F',
      firstCountry: {
        value: groups.E[1],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.F[0],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'O4 - 1G v/s 2H',
      firstCountry: {
        value: groups.G[0],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.H[1],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'O8 - 2G v/s 1H',
      firstCountry: {
        value: groups.G[1],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.H[0],
        score: 0,
        winner: false,
      },
    }
  ],
  quarterFinals: [
    {
      name: 'C1 - GO1 v/s GO2',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    },
    {
      name: 'C3 - GO5 v/s GO6',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    },
    {
      name: 'C2 - GO3 v/s GO4',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    },
    {
      name: 'C4 - GO7 v/s GO8',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    }
  ],
  semiFinals: [
    {
      name: 'S1 - GC1 v/s GC2',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    },
    {
      name: 'S2 - GC3 v/s GC4',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      }
    }
  ],
  finals: [
    {
      name: 'Tercer lugar - PS1 v/s PS2',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    },
    {
      name: 'Final - GS1 v/s GS2',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    }
  ]
};

export const assortResults = (results) => {
  const {
    groups: { A, B, C, D, E, F, G, H },
    roundOfSixteen,
    quarterFinals,
    semiFinals,
    finals,
  } = results;

  // Assign winner/loser and normalize scores
  [...roundOfSixteen, ...quarterFinals, ...semiFinals, ...finals].forEach((match) => {
    let { firstCountry, secondCountry } = match;

    if (firstCountry.score > secondCountry.score) {
      firstCountry.winner = true;
      secondCountry.winner = false;
    } else if (firstCountry.score < secondCountry.score) {
      secondCountry.winner = true;
      firstCountry.winner = false;
    }

    match.firstCountry.score = Math.max(0, Math.min(9, firstCountry.score));
    match.secondCountry.score = Math.max(0, Math.min(9, secondCountry.score));
  });

  // Assort round of sixteen teams
  roundOfSixteen[0].firstCountry.value = A[0];
  roundOfSixteen[0].secondCountry.value = B[1];
  roundOfSixteen[1].firstCountry.value = A[1];
  roundOfSixteen[1].secondCountry.value = B[0];
  roundOfSixteen[2].firstCountry.value = C[0];
  roundOfSixteen[2].secondCountry.value = D[1];
  roundOfSixteen[3].firstCountry.value = C[1];
  roundOfSixteen[3].secondCountry.value = D[0];
  roundOfSixteen[4].firstCountry.value = E[0];
  roundOfSixteen[4].secondCountry.value = F[1];
  roundOfSixteen[5].firstCountry.value = E[1];
  roundOfSixteen[5].secondCountry.value = F[0];
  roundOfSixteen[6].firstCountry.value = G[0];
  roundOfSixteen[6].secondCountry.value = H[1];
  roundOfSixteen[7].firstCountry.value = G[1];
  roundOfSixteen[7].secondCountry.value = H[0];

  // Assort quarter finals teams
  quarterFinals[0].firstCountry.value = getWinner(roundOfSixteen[0]);
  quarterFinals[0].secondCountry.value = getWinner(roundOfSixteen[2]);
  quarterFinals[1].firstCountry.value = getWinner(roundOfSixteen[1]);
  quarterFinals[1].secondCountry.value = getWinner(roundOfSixteen[3]);
  quarterFinals[2].firstCountry.value = getWinner(roundOfSixteen[4]);
  quarterFinals[2].secondCountry.value = getWinner(roundOfSixteen[6]);
  quarterFinals[3].firstCountry.value = getWinner(roundOfSixteen[5]);
  quarterFinals[3].secondCountry.value = getWinner(roundOfSixteen[7]);

  // Assort semi finals teams
  semiFinals[0].firstCountry.value = getWinner(quarterFinals[0]);
  semiFinals[0].secondCountry.value = getWinner(quarterFinals[2]);
  semiFinals[1].firstCountry.value = getWinner(quarterFinals[1]);
  semiFinals[1].secondCountry.value = getWinner(quarterFinals[3]);

  // Assort finals teams
  finals[0].firstCountry.value = getLoser(semiFinals[0]);
  finals[0].secondCountry.value = getLoser(semiFinals[1]);
  finals[1].firstCountry.value = getWinner(semiFinals[0]);
  finals[1].secondCountry.value = getWinner(semiFinals[1]);

  return results;
};

const getWinner = (match) => {
  if (match.firstCountry.winner) return match.firstCountry.value;
  if (match.secondCountry.winner) return match.secondCountry.value;
  return;
};

const getLoser = (match) => {
  if (match.firstCountry.winner) return match.secondCountry.value;
  if (match.secondCountry.winner) return match.firstCountry.value;
  return;
};
