import "./App.css";
import { useState } from "react";
import { FormProvider } from "./context/formstate";
import Services from "./components/services";
import VehicleYear from "./components/vehicleyear";
import VehicleMake from "./components/vehiclemake";
import VehicleModel from "./components/vehiclemodel"
import VehicleEngine from "./components/vehicleenginesize"
import User from "./components/user"
import Verify from "./components/verify"

function App() {
  
  // Determines which form components will be displayed to user
  const [formScreen, setFormScreen] = useState(0);
  
  // Determines which steps have been completed
  const [completedSteps, setCompletedSteps] = useState({
    service: false,
    vehicleYear: false,
    vehicleMake: false,
    vehicleModel: false,
    vehicleEngineSize: false,
    userInfo: false,
  });

  return (
    // Providing Context to entire application
    <FormProvider
      initialForm={{
        service: "",
        vehicle: {
          year: "",
          make: "",
          model: "",
          engine_size: "",
        },
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        zip: null,
      }}
    >
      <div className="App">
        
        {/* Conditional rendering of components based on which steps the user has completed */}
        
        {formScreen === 0 && <Services nextScreen={setFormScreen} setCompleteStep={setCompletedSteps} />}
        {formScreen === 1 && <VehicleYear nextScreen={setFormScreen} setCompleteStep={setCompletedSteps} />}
        {formScreen === 2 && <VehicleMake nextScreen={setFormScreen} setCompleteStep={setCompletedSteps} />}
        {formScreen === 3 && <VehicleModel nextScreen={setFormScreen} setCompleteStep={setCompletedSteps} />}
        {formScreen === 4 && <VehicleEngine nextScreen={setFormScreen} setCompleteStep={setCompletedSteps} />}
        {formScreen === 5 && <User nextScreen={setFormScreen} setCompleteStep={setCompletedSteps} />}
        {formScreen === 6 && <Verify />}
        
        {/* Lists which steps are completed as user cruises through form */}
        {Object.entries(completedSteps).map(([stepName, isCompleted]) => (
          <h4 key={stepName}>
            {stepName}: {isCompleted ? '✅' :  '❌'}
          </h4>
        ))}
        
      </div>
    </FormProvider>
  );
}

export default App;
