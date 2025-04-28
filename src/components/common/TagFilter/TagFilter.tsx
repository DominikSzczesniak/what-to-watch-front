import {Autocomplete, Box, Chip, TextField} from "@mui/material";
import {MovieTag} from "../../../model/MovieTag";

interface TagFilterProps {
    availableTags: MovieTag[];
    selectedTags: MovieTag[];
    onTagsChange: (tags: MovieTag[]) => void;
}

export const TagFilter = ({availableTags, selectedTags, onTagsChange}: TagFilterProps) => {
    return (
        <Box sx={{width: '100%', mb: 2}}>
            <Autocomplete
                multiple
                value={selectedTags}
                onChange={(event, newValue) => onTagsChange(newValue)}
                options={availableTags}
                getOptionLabel={(option) => option.tagLabel}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Filter by tags"
                        variant="outlined"
                        fullWidth
                    />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option.tagLabel}
                            {...getTagProps({ index })}
                        />
                    ))
                }
            />
        </Box>
    );
};