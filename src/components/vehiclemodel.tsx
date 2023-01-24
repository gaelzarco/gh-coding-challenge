import "../App.css";
import {
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
  useRef,
  useCallback,
} from "react";
import { VEHICLE_LIST } from "../context/data";
import { useForm, useSelectVehicleModel } from "../context/formstate";

export default function VehicleModel({
  nextScreen,
  setCompleteStep,
}: {
  nextScreen: Dispatch<SetStateAction<number>>;
  setCompleteStep: Dispatch<
    SetStateAction<{
      service: boolean;
      vehicleYear: boolean;
      vehicleMake: boolean;
      vehicleModel: boolean;
      vehicleEngineSize: boolean;
      userInfo: boolean;
    }>
  >;
}) {
  const selectVehicleModel = useSelectVehicleModel();
  const vehicles = VEHICLE_LIST;
  const form = useForm();

  const selectedVehicleModelRef = useRef<HTMLSelectElement>();

  const onSelectVehicleModel = useCallback(() => {
    if (selectedVehicleModelRef.current?.value) {
      selectVehicleModel(selectedVehicleModelRef.current.value as string);
      nextScreen((prevValue) => (prevValue = prevValue + 1));
      setCompleteStep(
        (prevState) => (prevState = { ...prevState, vehicleModel: true })
      );
    }
  }, [selectVehicleModel]);

  console.log(form);
  console.log(selectedVehicleModelRef.current?.value);

  return (
    <div className="card">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Tell us a little more about your {form.vehicle.make} 🚗</h1>

        <p>How about the model?</p>

        <label htmlFor="model">What model is you car?</label>
        <select
          name="model"
          ref={selectedVehicleModelRef as MutableRefObject<HTMLSelectElement>}
        >
          {!!vehicles &&
            vehicles
            // Filtering data to only display the correct corresponding choices based on previous answers
            .filter(vehicle => vehicle.year === form.vehicle.year)
            .filter(vehicle => vehicle.make === form.vehicle.make)
            .map((vehicle) => {
              return (
                <option key={vehicles.indexOf(vehicle)} value={vehicle.model}>
                  {vehicle.model}
                </option>
              );
            })}
        </select>
        <button onClick={onSelectVehicleModel}>Next</button>
      </form>
    </div>
  );
}
