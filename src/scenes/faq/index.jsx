import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
              Why cannot I see the dashboard in my workspace?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          You can check network connectivity and if problem does not solve contact us.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What user role should I have to use dashboards?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          All workspace users can view dashboards and set up alerts on KPI changes (see Add an Alert to a KPI). Only workspace editors, explorers, and administrators can Create Dashboards.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
         How to see total revenue?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          You can click on home screen and on the dashboard see sales obtained.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Can I export dashboards to PDF?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes. You can export dashboards to PDF and schedule regular emails with the PDF attached.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Can I add alerts to insights?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          No. You can add alerts only to KPIs.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;