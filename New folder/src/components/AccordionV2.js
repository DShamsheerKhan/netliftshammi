import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "gatsby";
import "./style/Accordion.css";

const AccordionV2 = ({ title, links }) => {
  return (
    <Accordion className='acc-Asset'> 
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
          {links && links.map((link, index) => (
            <li key={index}>
              <Link target="_blank" to={link.link || '#'}>{link.link_title || ''}</Link>
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionV2;