import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "gatsby";
import "./style/Accordion.css";

const Accordions = ({ title, Details, linkpdf }) => {
    const renderDetails = () => {
        if (typeof Details === 'string') {
          return <Link  target="_blank" to={linkpdf}><li>{Details}</li></Link>;
        } else if (Array.isArray(Details)) {
          // Map over Details array when it contains multiple objects
          return Details.map((detail, index) => (
            <li key={index}>
              <Link  target="_blank" to={detail.linkpdf}>{detail.content}</Link>
            </li>
          ));
        } else if (typeof Details === 'object' && Details !== null) {
          // If Details is a single object
          return <Link  target="_blank" to={linkpdf}><li>{Details.content}</li></Link>;
        }
        return null;
      };

  return (
    <Accordion className='acc-Asset' > 
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-faq"
        className='acc-title'
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {renderDetails()}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordions;
