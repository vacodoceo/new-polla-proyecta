import { groups } from './countries';

// Add winner and loser to country

export const initResults = {
  groups,
  quarterFinals: [
    {
      name: 'Partido 21 - 2A v/s 3B',
      firstCountry: {
        value: groups.A[1],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.B[2],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'Partido 22 - 1A v/s 4B',
      firstCountry: {
        value: groups.A[0],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.B[3],
        score: 0,
        winner: false,
      },
    },

    {
      name: 'Partido 23 - 2B v/s 3A',
      firstCountry: {
        value: groups.B[1],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.A[2],
        score: 0,
        winner: false,
      },
    },
    {
      name: 'Partido 24 - 1B v/s 4A',
      firstCountry: {
        value: groups.B[0],
        score: 0,
        winner: false,
      },
      secondCountry: {
        value: groups.A[3],
        score: 0,
        winner: false,
      },
    },
  ],
  semiFinals: [
    {
      name: 'Partido 25 - G21 v/s G22',
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
      name: 'Partido 26 - G24 v/s G23',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    },
  ],
  finals: [
    {
      name: 'Tercer lugar - P26 v/s P25',
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
      name: 'Final - G26 v/s G25',
      firstCountry: {
        score: 0,
        winner: false,
      },
      secondCountry: {
        score: 0,
        winner: false,
      },
    },
  ],
};

export const assortResults = (results) => {
  const {
    groups: { A, B },
    quarterFinals,
    semiFinals,
    finals,
  } = results;

  // Assign winner/loser and normalize scores
  [...quarterFinals, ...semiFinals, ...finals].forEach((match) => {
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

  // Assort quarter finals teams
  quarterFinals[0].firstCountry.value = A[1];
  quarterFinals[0].secondCountry.value = B[2];
  quarterFinals[1].firstCountry.value = A[0];
  quarterFinals[1].secondCountry.value = B[3];
  quarterFinals[2].firstCountry.value = B[1];
  quarterFinals[2].secondCountry.value = A[2];
  quarterFinals[3].firstCountry.value = B[0];
  quarterFinals[3].secondCountry.value = A[3];

  // Assort semi finals teams
  semiFinals[0].firstCountry.value = getWinner(quarterFinals[0]);
  semiFinals[0].secondCountry.value = getWinner(quarterFinals[1]);
  semiFinals[1].firstCountry.value = getWinner(quarterFinals[3]);
  semiFinals[1].secondCountry.value = getWinner(quarterFinals[2]);

  // Assort finals teams
  finals[0].firstCountry.value = getLoser(semiFinals[1]);
  finals[0].secondCountry.value = getLoser(semiFinals[0]);
  finals[1].firstCountry.value = getWinner(semiFinals[1]);
  finals[1].secondCountry.value = getWinner(semiFinals[0]);

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
