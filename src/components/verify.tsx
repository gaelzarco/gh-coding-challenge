import { useState } from 'react'
import { useForm } from "../context/formstate";

export default function Verify() {
  const form = useForm();
  
  // Final confirmation screen states
  const [ restartConfirmation, setRestartConfirmation ] = useState(false)
  const [ verifyConfirmation, setVerifyConfirmation ] = useState(false)
  
  // Restart form after information is complete or incorrect
  const restartForm = () => window.location.reload()

  return (
    <div className="card">
        
        {/* Conditional rendering of verifyConfirmation */}
        {verifyConfirmation && (
            <div className='popup'>
                <div id='successCard' className='card'>
                    <h1>We'll be in touch with you soon! Tap finish or go back. 🤝</h1>
                    
                    {/* Go back and double check to do it all again. */}
                    
                    <button onClick={() => setVerifyConfirmation(false)}>Double check...</button>
                    <button className='successBtn' onClick={() => restartForm()}>Finish</button>
                </div>
            </div>
        )}
        
        {/* Conditional rendering of restartConfirmation */}
        {restartConfirmation && (
            <div className='popup'>
                <div id="failureCard" className='card'>
                    <h1>Sorry about that! Tap restart to try again... 🔃</h1>
                    
                    {/* Go back and double check to do it all again. */}
                    
                    <button onClick={() => setRestartConfirmation(false)}>Double check...</button>
                    <button className='failureBtn' onClick={() => restartForm()}>Restart</button>
                </div>
            </div>
        )}
        
      <h1>You're All Set! 🎉</h1>

      <p>Do you mind verifying this information?</p>

      <h4>Service: {form.service}</h4>

      <div>
        <h1>Vehicle Information 🏎️</h1>
        <h4>Year: <code>{form.vehicle.year}</code></h4>
        <h4>Make: <code>{form.vehicle.make}</code></h4>
        <h4>Model: <code>{form.vehicle.model}</code></h4>
        <h4>Engine: <code>{form.vehicle.engine_size}</code></h4>
      </div>

      <div>
        <h1>Your Information 😁</h1>
        <h4>First Name: <code>{form.firstName}</code></h4>
        <h4>Last Name: <code>{form.lastName}</code></h4>
        <h4>Email: <code>{form.email}</code></h4>
        <h4>Phone #️⃣: <code>{form.phone}</code></h4>
        <h4>Address 🏡: <code>{form.address}</code></h4>
        <h4>Zip: <code>{form.zip}</code></h4>
      </div>
      
      {/* Set which final confirmation page to display to the user */}
      <button className="successBtn" onClick={() => setVerifyConfirmation(true)}>Looks Good!</button>
      <button className="failureBtn" onClick={() => setRestartConfirmation(true)}>This doesn't look right...</button>
    </div>
  );
}
