import { Facebook, ShareSharp, Twitter, LinkedIn, Pinterest } from '@mui/icons-material';
import { Box, Fade, Popper } from '@mui/material';
import React, { useState } from 'react';
import './share.css';

const Share = ({ title, url }) => {
  const[open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const handleShare = (socialMedia) => {
    const shareURLs = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
    };

    window.open(shareURLs[socialMedia], '_blank');
  };

  return (
    <div className='share'>
      <div className='share-icon'>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        <ShareSharp/>
      </button>
      <Popper  id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', borderRadius: '3px' }}>
            <button className='icons' onClick={() => handleShare('facebook')}><Facebook/></button>
            <button className='icons' onClick={() => handleShare('twitter')}><Twitter/></button>
            <button className='icons' onClick={() => handleShare('linkedin')}><LinkedIn/></button>
            <button  className='icons'onClick={() => handleShare('pinterest')}><Pinterest/></button>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
    </div>
  );
};

export default Share;
