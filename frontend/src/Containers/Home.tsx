import SendForm from '../Components/SendForm/SendForm';
import {Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {IMessageForm} from '../types';
import {addMessage} from '../store/MessagesThunk';
import {AppDispatch} from '../app/store';
import {useDispatch} from 'react-redux';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState(false);

  const addNewMessageRequest = async (e: FormEvent, message: IMessageForm, setMessage: Dispatch<SetStateAction<IMessageForm>>) => {
    e.preventDefault();

    if (message.message.trim().length !== 0) {
      console.log(message);
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
        image: null
      }));
      setError(false);
    } else {
      setError(true);
    }
  };


  return (
    <div>
        <SendForm error={error} addNewMessageRequest={addNewMessageRequest}/>
    </div>
  );
};

export default Home;