import React from 'react';

const ShortenedText = ({ text, maxLength }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const truncatedText = truncateText(text, maxLength);

  return <span title={text}>{truncatedText}</span>;
};

export default ShortenedText;
