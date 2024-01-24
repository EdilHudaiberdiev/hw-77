import SendForm from '../Components/SendForm/SendForm';
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
import {IMessageForm} from '../types';
import {addMessage, getMessages, getMessagesByDateTime} from '../store/MessagesThunk';
import {AppDispatch, RootState} from '../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@mui/material';
import QuotesItem from '../Components/QuotesItem/QuotesItem';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState(false);
  const messages = useSelector((state: RootState) => state.messages.messages);
  const lastDateTime = useSelector((state: RootState) => state.messages.lastMessageDate);

  const addNewMessageRequest = async (e: FormEvent, message: IMessageForm, setMessage: Dispatch<SetStateAction<IMessageForm>>) => {
    e.preventDefault();

    if (message.message.trim().length !== 0) {
      const formData = new FormData();

      formData.append('message', message.message);
      formData.append('author', message.author);

      if(message.image) {
        formData.append('image', message.image);
      }

      await dispatch(addMessage(formData));

      setMessage((prev) => ({
        ...prev,
        message: '',
        author: '',
        image: null,
      }));
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      dispatch(getMessages());
    } else {
      if (lastDateTime !== null) {
        const interval = setInterval(async () => {
          dispatch(getMessagesByDateTime(lastDateTime));
        }, 5000);

        return () => clearInterval(interval);
      }

    }

  }, [dispatch, lastDateTime]);

  return (
    <div>
        <SendForm error={error} addNewMessageRequest={addNewMessageRequest}/>
      {messages.length === 0 ? <p>No messages yet</p> :
        <Box sx={{height: 400, overflowY: 'auto', width: 320}}>
          {messages.map(item => (
            <QuotesItem key={item.author} author={item.author} message={item.message} image={item.image}/>
          ))}
        </Box>
      }

    </div>
  );
};

export default Home;