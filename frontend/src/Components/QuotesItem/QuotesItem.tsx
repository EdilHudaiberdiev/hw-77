import {apiURL} from '../../constants';
import {CardMedia, styled} from '@mui/material';
import React from 'react';

interface Props{
  author: string;
  message: string;
  image: string;
}
const QuotesItem: React.FC<Props> = ({author, message, image}) => {

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });

  return (
    <div>
      <p><b>{author}</b></p>
      <p> {message}</p>
      <ImageCardMedia image={apiURL + '/' + image} title={author}/>
    </div>
  );
};

export default QuotesItem;