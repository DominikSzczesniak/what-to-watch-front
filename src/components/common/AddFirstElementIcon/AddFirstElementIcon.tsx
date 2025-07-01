import { Box } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { LabeledValue } from "../LabeledValue/LabeledValue";

interface AddFirstElementIconProps {
  label: string;
  text?: string;
}

export const AddFirstElementIcon = ({ label, text = " " }: AddFirstElementIconProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <InboxIcon sx={{ fontSize: 150 }} color="disabled"/>
      <LabeledValue label={label} value={text}></LabeledValue>
    </Box>
  );
}