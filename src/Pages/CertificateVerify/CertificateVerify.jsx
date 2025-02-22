//   const response = await axios.post(`${process.env.VITE_API_URL}/v1/verify/certificate`, {
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useSearchParams } from 'react-router-dom';
    import { Box, Button, Modal, Typography, Divider, TextField, CircularProgress } from '@mui/material';
    
    const CertificateValidationPage = () => {
      const [certificateID, setCertificateID] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [certificateDetails, setCertificateDetails] = useState(null);
      const [errorMessage, setErrorMessage] = useState('');
      const [isLoading, setIsLoading] = useState(false);
    
      // Get URL parameters using `useSearchParams`
      const [searchParams] = useSearchParams();
    
      // Auto-populate input box with `cid` from URL parameters (if available)
      useEffect(() => {
        const paramCid = searchParams.get('cid');
        if (paramCid) {
          setCertificateID(paramCid);
        }
      }, [searchParams]);
    
      // Function to handle the certificate validation request
      const handleCheckCertificate = async () => {
        if (!certificateID) {
          alert('Please enter a Certificate ID.');
          return;
        }
    
        setIsLoading(true); // Start loading
        setErrorMessage(''); // Reset error messages
    
        try {
          // Make an Axios POST request to the backend
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/verify/certificate`, {
            cid: certificateID, // Payload sent in the body
          });
    
          // Handle successful response
          if (response.data.success) {
            setCertificateDetails(response.data);
          } else {
            setCertificateDetails({ isValid: false });
          }
        } catch (error) {
          // Handle any errors (network or server errors)
          console.error('Error validating certificate:', error);
          setErrorMessage('An error occurred while validating the certificate. Please try again.');
          setCertificateDetails(null);
        }
    
        setIsLoading(false); // Stop loading
        setIsModalOpen(true); // Open modal
      };
    
      // Modal Close Handler
      const handleClose = () => {
        setIsModalOpen(false);
        setErrorMessage('');
      };
    
      return (
      <Box sx={{width:'100vw', height:'calc(100vh - 70px)', display:'flex', alignItems:'center'}}>

<Box
          sx={{
            padding: '20px',
            maxWidth: '600px',
            margin: '20px auto',
            textAlign: 'center',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Certificate Validation
          </Typography>
    
          {/* Input Field for Certificate ID */}
          <TextField
            fullWidth
            label="Enter Certificate ID"
            variant="outlined"
            value={certificateID}
            onChange={(e) => setCertificateID(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
    
          {/* Button to Check Certificate */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckCertificate}
            disabled={isLoading} // Disable button during loading
            sx={{ position: 'relative', minWidth: '200px', height: '45px' }}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Check Certificate Validity'}
          </Button>
    
          {/* Modal for Certificate Details */}
          <Modal open={isModalOpen} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
              }}
            >
              {certificateDetails ? (
                certificateDetails.isValid ? (
                  <>
                    <Typography variant="h5" color="green" gutterBottom>
                      Certificate is Valid ✅
                    </Typography>
                    <Divider sx={{ marginBottom: '10px' }} />
                    <Typography>
                      <strong>Holder:</strong> {certificateDetails.holder}
                    </Typography>
                    <Typography>
                      <strong>Certificate ID:</strong> {certificateID}
                    </Typography>
                    <Typography>
                      <strong>Duration:</strong> {certificateDetails.duration}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" color="red" gutterBottom>
                      Certificate is Invalid ❌
                    </Typography>
                    <Divider sx={{ marginBottom: '10px' }} />
                    <Typography>
                      The provided certificate ID does not match any valid record.
                    </Typography>
                  </>
                )
              ) : (
                <Typography variant="h6" color="error">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </Typography>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
      );
    };
    
    export default CertificateValidationPage;
    