import PropTypes from 'prop-types';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

import { labels } from '../../utils/countries';
import ScoreSelector from '../ScoreSelector';
import { ReactComponent as Crown } from '../../assets/icons/crown.svg';
import { ReactComponent as CrownOutlined } from '../../assets/icons/crownOutlined.svg';

const useStyles = makeStyles(() => ({
  listItem: {
    paddingLeft: 0,
  },
}));

const Match = (props) => {
  const { name, firstCountry, secondCountry, handleChange, editable } = props;

  const handleScoreChange = (country) => (score) => {
    handleChange({
      name,
      firstCountry,
      secondCountry,
      [country]: { ...props[country], score },
    });
  };

  const handleWinnerChange = (country) => {
    const winner = country;
    const loser = country === 'firstCountry' ? 'secondCountry' : 'firstCountry';
    handleChange({
      name,
      [winner]: { ...props[winner], winner: true },
      [loser]: { ...props[loser], winner: false },
    });
  };

  const isTie = firstCountry.score === secondCountry.score;

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <List
        subheader={
          <ListSubheader component="div" disableSticky>
            {name}
          </ListSubheader>
        }
      >
        <ListItem
          ContainerComponent="li"
          className={classes.listItem}
          style={firstCountry.winner ? { background: lightBlue[50] } : {}}
          key={`${name}-${firstCountry.value}`}
        >
          <IconButton
            disabled={!isTie || !editable}
            onClick={() => handleWinnerChange('firstCountry')}
          >
            {firstCountry.winner ? <Crown /> : <CrownOutlined />}
          </IconButton>
          <ListItemAvatar>
            <Avatar
              alt={firstCountry.value}
              src={`${process.env.PUBLIC_URL}/images/${firstCountry.value}.png`}
            />
          </ListItemAvatar>
          <ListItemText primary={labels[firstCountry.value]} />
          <ScoreSelector
            score={firstCountry.score}
            handleChange={handleScoreChange('firstCountry')}
            editable={editable}
          />
        </ListItem>

        <ListItem
          ContainerComponent="li"
          className={classes.listItem}
          style={secondCountry.winner ? { background: lightBlue[50] } : {}}
          key={`${name}-${secondCountry.value}`}
        >
          <IconButton
            disabled={!isTie || !editable}
            onClick={() => handleWinnerChange('secondCountry')}
          >
            {secondCountry.winner ? <Crown /> : <CrownOutlined />}
          </IconButton>
          <ListItemAvatar>
            <Avatar
              alt={secondCountry.value}
              src={`${process.env.PUBLIC_URL}/images/${secondCountry.value}.png`}
            />
          </ListItemAvatar>
          <ListItemText primary={labels[secondCountry.value]} />
          <ScoreSelector
            score={secondCountry.score}
            handleChange={handleScoreChange('secondCountry')}
            editable={editable}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

Match.propTypes = {
  name: PropTypes.string,
  firstCountry: PropTypes.shape({
    value: PropTypes.string,
    score: PropTypes.number,
    winner: PropTypes.bool,
  }),
  secondCountry: PropTypes.shape({
    value: PropTypes.string,
    score: PropTypes.number,
    winner: PropTypes.bool,
  }),
  winner: PropTypes.string,
  loser: PropTypes.string,
  handleChange: PropTypes.func,
  editable: PropTypes.bool,
};

Match.defaultProps = {
  editable: true,
};

export default Match;
