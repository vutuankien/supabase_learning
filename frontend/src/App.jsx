import './index.css'
import { useState, useEffect } from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { supabase } from './supabaseClient'
import Dashboard from './components/Dashboard'

export default function App() {
  const [session, setSession] = useState(null)
  console.log("Log in with google");


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    // return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    return (
      <div className=" max-w-screen-md mx-auto p-6 rounded bg-white shadow-neutral-200">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google', 'facebook']}
          socialLayout='horizontal'
          socialButtonSize="xlarge"
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email Address',
                password_label: 'Password',
                button_label: 'Sign In',
              },
              sign_up: {
                email_label: 'Email Address',
                password_label: 'Password',
                confirm_password_label: 'Confirm Password',
                button_label: 'Sign Up',
              },
              reset_password: {
                email_label: 'Email Address',
                button_label: 'Sign Up',
              },
            },
          }}
          view="sign_in"
        />

      </div>
    )
  }
  else {
    return <Dashboard session={session} />
  }
}