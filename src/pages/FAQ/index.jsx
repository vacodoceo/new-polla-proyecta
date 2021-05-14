import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons/';
import { useState } from 'react';

import faqs from './faqs';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 500,
  },
  paper: {
    background: 'white',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),

    '& em': {
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
  },
}));
const FAQ = () => {
  const [expanded, setExpanded] = useState();
  const classes = useStyles();

  const handleChange = (index) => {
    if (expanded === index) {
      setExpanded();
    } else {
      setExpanded(index);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        {faqs.map((faq, index) => (
          <Accordion
            expanded={expanded === index}
            onChange={() => handleChange(index)}
            key={faq.title}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography className={classes.heading}>{faq.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{faq.body}</AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default FAQ;
