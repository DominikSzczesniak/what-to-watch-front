import { Typography } from "@mui/material";

export interface ILabeledValueProps {
  label: string;
  value?: string
}

export const LabeledValue = ({ label, value }: ILabeledValueProps) => {
  return (
    <>
      <Typography variant="subtitle1">
        {label}
      </Typography>
      <Typography variant="body1" color="textSecondary" whiteSpace="pre-line" marginBottom="8px">
        {value || "Nie podano"}
      </Typography>
    </>
  )
}