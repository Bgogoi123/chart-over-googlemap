import { Stack, Typography } from "@mui/material";
import DiseaseCountByArea from "./pages/DiseaseCountByArea";

function App() {
  return (
    <Stack p="2rem" gap="1rem">
      <Typography variant="h4">
        Geographical Visualization of Diseases
      </Typography>

      <Stack gap="0.2rem">
        <Typography variant="body1" color="grey">
          Select one or more Diseases to see the Disease Count on specific
          areas.
        </Typography>
        <Typography variant="body1" color="grey">
          Click on the cicles on the map to view a brief information on the
          Disease.
        </Typography>
        <Typography variant="body1" color="grey">
          Click on a date (bottom) to view date-wise data.
        </Typography>
      </Stack>
      <DiseaseCountByArea />
    </Stack>
  );
}

export default App;
