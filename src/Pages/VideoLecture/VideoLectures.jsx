// VideoLectures.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NoteIcon from '@mui/icons-material/Note';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';

// Import sample data files
import PhysicsData from './VideoLecturePhysicsData.json';
import ChemistryData from './VideoLectureChemistryData.json';
import MathData from './VideoLectureMathData.json';

const dataMap = {
  physics: PhysicsData,
  chemistry: ChemistryData,
  math: MathData
};

const Complete = ({ checked, onChange }) => (
  <Checkbox checked={checked} onChange={onChange} color="primary" />
);

const VideoLectures = () => {
  const { subject } = useParams();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Dropdown state for subject menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubjectSelect = (selectedSubject) => {
    navigate(`/video/track/${selectedSubject}`);
    setAnchorEl(null);
  };

  // Load and initialize notes
  useEffect(() => {
    const loadNotes = () => {
      try {
        const savedNotes = localStorage.getItem(`lectureNotes-${subject}`);
        const initialData = dataMap[subject] || [];
        
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes);
          const mergedData = initialData.map(item => ({
            ...item,
            ...parsedNotes.find(p => p.id === item.id) || {}
          }));
          setNotes(mergedData);
        } else {
          setNotes(initialData);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
        setNotes(dataMap[subject] || []);
      }
    };

    loadNotes();
  }, [subject]);

  // Save notes
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`lectureNotes-${subject}`, JSON.stringify(notes));
    }
  }, [notes, subject]);

  const handleNoteClick = (row) => {
    setSelectedNote(row);
    setNoteText(row.note || '');
    setOpen(true);
  };

  const handleSaveNote = () => {
    if (!selectedNote) return;

    const updatedNotes = notes.map(note => 
      note.id === selectedNote.id ? { ...note, note: noteText } : note
    );
    
    setNotes(updatedNotes);
    setOpen(false);
  };

  const handleCompletionChange = (id) => {
    const updatedNotes = notes.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setNotes(updatedNotes);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNote(null);
    setNoteText('');
  };

  if (!notes.length) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Title on Left and Dropdown on Right */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3"  align="center" sx={{ flexGrow: 1 }}>
          {subject.charAt(0).toUpperCase() + subject.slice(1)} Video Lectures
        </Typography>
        <Box>
          <Button 
            variant="outlined"
            onClick={handleMenuClick}
            sx={{ textTransform: 'capitalize' }}
          >
            Subjects
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleSubjectSelect('physics')}>Physics</MenuItem>
            <MenuItem onClick={() => handleSubjectSelect('chemistry')}>Chemistry</MenuItem>
            <MenuItem onClick={() => handleSubjectSelect('math')}>Mathematics</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Class 11 Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Class 11th Topics
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 6 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                Topic
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                Video
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                Notes
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                Completed
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {notes.filter((row) => 
              subject === "physics" ? row.id < 16 :
              subject === "chemistry" ? row.id < 22 : 
              row.id < 20
            ).map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <a href={row.videoLink} target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }} />
                  </a>
                </TableCell>
                <TableCell 
                  onClick={() => handleNoteClick(row)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  {row.note ? (
                    <NoteIcon color="primary" />
                  ) : (
                    <EditNoteIcon color="action" />
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Complete
                    checked={row.completed || false}
                    onChange={() => handleCompletionChange(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Class 12 Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Class 12th Topics
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                Topic
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                Video
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                Notes
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                Completed
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {notes.filter(row => row.id >= 16).map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <a href={row.videoLink} target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }} />
                  </a>
                </TableCell>
                <TableCell 
                  onClick={() => handleNoteClick(row)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  {row.note ? (
                    <NoteIcon color="primary" />
                  ) : (
                    <EditNoteIcon color="action" />
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Complete
                    checked={row.completed || false}
                    onChange={() => handleCompletionChange(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Note Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            minHeight: '400px',
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">
            Notes for: {selectedNote?.topic}
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ py: 3 }}>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={8}
            maxRows={12}
            variant="outlined"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Start typing your notes here..."
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '1.1rem',
                lineHeight: 1.5
              }
            }}
          />
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleSaveNote}
            disabled={noteText === (selectedNote?.note || '')}
            sx={{ px: 4, py: 1 }}
          >
            Save Notes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideoLectures;
