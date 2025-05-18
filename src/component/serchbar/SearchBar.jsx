import React from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#757575', fontSize: '1.5rem' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: { xs: '100%', sm: '80%', md: '60%' },
          backgroundColor: '#ffffff', // Beyaz arka plan rengi
          borderRadius: '50px', // Daha yuvarlak kenarlar
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Daha belirgin gölge
          transition: 'all 0.3s ease-in-out', // Daha yumuşak geçiş
          '&:hover': {
            backgroundColor: '#f1f1f1', // Hover durumunda hafif gri arka plan
            transform: 'scale(1.05)', // Hover durumunda hafif büyüme efekti
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent', // Kenarlık gizle
            },
            '&:hover fieldset': {
              borderColor: 'transparent', // Üzerine gelindiğinde kenarlık gizle
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', // Odaklandığında kenarlık gizle
              boxShadow: '0 0 10px rgba(25, 118, 210, 0.5)', // Odaklanıldığında mavi gölge
            },
          },
          '& .MuiOutlinedInput-input': {
            fontFamily: 'Roboto, sans-serif', // Daha modern bir yazı tipi
            fontSize: '1.1rem', // Yazı boyutunu biraz büyüt
            color: '#333', // Yazı rengi
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
