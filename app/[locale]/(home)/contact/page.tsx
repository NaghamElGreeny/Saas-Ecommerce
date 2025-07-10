import ContactForm from '@/components/Forms/ContactForm'
import HeroSection from '@/components/shared/HeroSection'
import Stores from '@/components/Stores'
import React from 'react'

function ContactPage() {
  return (
      <>
          <HeroSection title='contact us' />
          {/* stores component */}
    <Stores />
          {/* contact form component */}
          <ContactForm />
      </>
  )
}

export default ContactPage