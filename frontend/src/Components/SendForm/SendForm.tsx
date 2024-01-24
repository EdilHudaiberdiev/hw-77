import React, {Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {Alert, Button, TextField} from '@mui/material';
import {IMessageForm} from '../../types';
import FileInput from '../UI/FileInput/FileInput';

interface Props {
  error: boolean;
  addNewMessageRequest: (e: FormEvent, message: IMessageForm, setMessage: Dispatch<SetStateAction<IMessageForm>>) => void;
}

const MessageSendForm: React.FC<Props> = ({error, addNewMessageRequest}) => {
  const [message, setMessage] = useState<IMessageForm>({
    author: '',
    message: '',
    image: null,
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setMessage(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };


  return (
    <form onSubmit={e => addNewMessageRequest(e, message, setMessage)}>
      {error ? <Alert severity="error">Author and message must be field</Alert> : null}
      <hr/>
      <TextField
        label="Author"
        variant="filled"
        name="author"
        value={message.author}
        onChange={changeForm}
      />
      <hr/>
      <TextField
        label="Message"
        required
        variant="filled"
        name="message"
        value={message.message}
        onChange={changeForm}
      />

      <FileInput
        onChange={fileInputChangeHandler}
        name="image"
        label="Image"
      />

      <hr/>
      <Button
        disabled={message.message.trim().length === 0 && message.author.trim().length === 0}
        variant="contained"
        type="submit"
      >Send</Button>
    </form>
  );
};

export default MessageSendForm;