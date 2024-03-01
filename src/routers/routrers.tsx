import { Navigate, createBrowserRouter } from 'react-router-dom';
import { StartView } from '../view/startView/startView';
import { ChatView } from '../view/chatView/chatView';
import { ChatComponent } from '../components/chatComponent/chatComponent';
import { AccessComponent } from '../components/accessComponentsGroup/accessComponent/accessComponent';
import { LoginForm } from '../view/startView/loginForm/loginForm';
import { RegistrationForm } from '../view/startView/registrationForm/registrationForm';
import { AccessComponentWithAuth } from '../components/accessComponentsGroup/accessComponentWithAuth/accessComponentWithAuth';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <AccessComponentWithAuth>
        <StartView/>
      </AccessComponentWithAuth>,
      children: [
        {
          index: true,
          element: <Navigate replace to='/login' />
        },
        {
          path: 'login',
          element: <LoginForm/>
        },
        {
          path: 'registration',
          element: <RegistrationForm/>
        },
      ],
    },
    {
      path: "/chat",
      element: <AccessComponent>
        <ChatView/>
      </AccessComponent>,
      children: [
        {
          path: ':id',
          element: <ChatComponent/>
        }
      ],
    },
  ]);