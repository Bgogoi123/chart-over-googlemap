import { IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
      px="2rem"
      py="0.4rem"
      position="relative"
      sx={{ backgroundColor: "#eee" }}
    >
      <Typography variant="caption">
        Disease:
        <Typography variant="caption" component="span">
          {data.disease.join(", ")}
        </Typography>
      </Typography>
      <Typography variant="caption"> City: {data.city} </Typography>
      {!isNaN(Number(data.diseaseCount)) && (
        <Typography variant="caption">
          Count: {Number(data.diseaseCount)}
        </Typography>
      )}
      <Typography variant="caption">
        Date: {data.date.toLocaleDateString()}
      </Typography>

      <IconButton
        aria-label="delete"
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={() => resetSelection?.(true)}
      >
        <DeleteIcon sx={{ width: "15px", height: "15px" }} />
      </IconButton>
    </Stack>
  );
};

export default DiseaseDetail;
