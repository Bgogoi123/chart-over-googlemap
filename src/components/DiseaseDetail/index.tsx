import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { TDiseaseDetails } from "../../types";

const DiseaseDetail = ({
  data,
  resetSelection,
}: {
  data: TDiseaseDetails;
  resetSelection?: (val: boolean) => void;
}) => {
  return (
    <Stack
      direction="column"
      gap="0.1rem"
      px="2.3rem"
      py="0.4rem"
      position="relative"
      sx={{ backgroundColor: "#eee" }}
    >
      <Typography variant="caption" textTransform="capitalize">
        Disease:{" "}
        <Typography variant="caption" component="span" fontWeight={600}>
          {data.disease}
        </Typography>
      </Typography>

      <Typography variant="caption" textTransform="capitalize"> City: {data.city} </Typography>

      {!isNaN(Number(data.diseaseCount)) && (
        <Typography variant="caption">
          Count: {Number(data.diseaseCount)}
        </Typography>
      )}
      
      <Typography variant="caption" textTransform="capitalize">
        Date: {data.date.toLocaleDateString()}
      </Typography>

      <IconButton
        aria-label="delete"
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={() => resetSelection?.(true)}
      >
        <CloseIcon sx={{ width: "13px", height: "13px" }} />
      </IconButton>
    </Stack>
  );
};

export default DiseaseDetail;
