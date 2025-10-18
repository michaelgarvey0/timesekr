import { Box, FilledInput, Typography } from '@mui/material';
import { useState } from 'react';
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
export function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // File type validation
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
      return;
    }
    // File size validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`);
      return;
    }
    setSelectedFile(file);
    setError('');
  };
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.warn('Upload file...', formData);
    } else {
      console.error('No file selected');
    }
  };
  return (
    <>
      {/* create a hidden input so we can style it better */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="image-file-input"
      />
      <FilledInput
        readOnly
        value={selectedFile?.name || ''}
        onClick={() => document.getElementById('image-file-input')?.click()}
        placeholder="Select an image"
        sx={{ cursor: 'pointer' }}
      />
      {selectedFile && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 1,
            borderRadius: 1,
            overflow: 'hidden',
            border: (theme) => `1px solid ${theme.palette.gray['300']}`,
          }}
        >
          {/* render the image from its blob */}
          <Box
            component="img"
            src={URL.createObjectURL(selectedFile)}
            alt={selectedFile.name}
            sx={{ width: '100%' }}
          />
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ fontSize: 'sm', mt: 1 }}>
          {error}
        </Typography>
      )}
    </>
  );
}
