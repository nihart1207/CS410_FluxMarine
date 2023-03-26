import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const RootBox = styled(Box)`
  text-align: center;
  margin-top: 10rem;
`;

const TitleTypography = styled(Typography)`
  font-size: 5rem;
  color: ${(props) => props.theme.palette.primary.main};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const MessageTypography = styled(Typography)`
  font-size: 1.5rem;
  color: ${(props) => props.theme.palette.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const DetailTypography = styled(Typography)`
  font-size: 1rem;
  color: ${(props) => props.theme.palette.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function ErrorPage() {
  return (
    <RootBox>
      <TitleTypography variant="h1" gutterBottom>
        404
      </TitleTypography>
      <MessageTypography variant="h5" gutterBottom>
        Oops! This page could not be found.
      </MessageTypography>
      <DetailTypography variant="body1" gutterBottom>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </DetailTypography>
      <StyledLink to="/" style={{ color: 'inherit' }}>
        <Button variant="contained" color="primary">
          Back to Home
        </Button>
      </StyledLink>
    </RootBox>
  );
}

export default ErrorPage;
