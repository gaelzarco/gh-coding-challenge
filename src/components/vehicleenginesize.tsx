import "../App.css";
import {
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
  useRef,
  useCallback,
} from "react";
import { VEHICLE_LIST } from "../context/data";
import { useForm, useSelectVehicleEngineSize } from "../context/formstate";

export default function VehicleEngine({
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
  const selectVehicleEngineSize = useSelectVehicleEngineSize();
  const vehicles = VEHICLE_LIST;
  const form = useForm();

  const selectedVehicleEngineSizeRef = useRef<HTMLSelectElement>();

  const onSelectVehicleEngineSize = useCallback(() => {
    if (selectedVehicleEngineSizeRef.current?.value) {
      selectVehicleEngineSize(selectedVehicleEngineSizeRef.current.value as string);
      nextScreen((prevValue) => (prevValue = prevValue + 1));
      setCompleteStep(
        (prevState) => (prevState = { ...prevState, vehicleEngineSize: true })
      );
    }
  }, [selectVehicleEngineSize]);

  console.log(form);
  console.log(selectedVehicleEngineSizeRef.current?.value);

  return (
    <div className="card">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>One last thing before we move on to you... 🛣️</h1>

        <p>Tell us a little bit about your engine</p>

        <label htmlFor="engineSize">What's you car's engine size?</label>
        <select
          name="engineSize"
          ref={selectedVehicleEngineSizeRef as MutableRefObject<HTMLSelectElement>}
        >
          {!!vehicles &&
            vehicles
            // Final filtering of choices based on previous answers to provide correct possible choices
            .filter(vehicle => vehicle.year === form.vehicle.year)
            .filter(vehicle => vehicle.make === form.vehicle.make)
            .filter(vehicle => vehicle.model === form.vehicle.model)
            .map((vehicle) => {
              return (
                <option key={vehicles.indexOf(vehicle)} value={vehicle.engine_size}>
                  {vehicle.engine_size}
                </option>
              );
            })}
        </select>
        <button onClick={onSelectVehicleEngineSize}>Next</button>
      </form>
    </div>
  );
}