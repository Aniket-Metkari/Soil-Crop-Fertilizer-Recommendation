import React from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {CircularProgress} from '@material-ui/core';

export const LoadingPage = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <div style={{  position: "absolute",top: "45%",left: "45%"}}>
        <CircularProgress thickness={5} size={isMobile ? 75 : 100} />
      </div>
  );
};