import "../App.css";
import {
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
  useRef,
  useCallback,
} from "react";
import { VEHICLE_LIST } from "../context/data";
import { useForm, useSelectVehicleMake } from "../context/formstate";

export default function VehicleMake({
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
  const selectVehicleMake = useSelectVehicleMake();
  const vehicles = VEHICLE_LIST;
  const form = useForm();

  const selectedVehicleMakeRef = useRef<HTMLSelectElement>();

  const onSelectVehicleMake = useCallback(() => {
    if (selectedVehicleMakeRef.current?.value) {
      selectVehicleMake(selectedVehicleMakeRef.current.value as string);
      nextScreen((prevValue) => (prevValue = prevValue + 1));
      setCompleteStep(
        (prevState) => (prevState = { ...prevState, vehicleMake: true })
      );
    }
  }, [selectVehicleMake]);

  console.log(form);
  console.log(selectedVehicleMakeRef.current?.value);

  return (
    <div className="card">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Looking good! 🚗</h1>

        <p>But we still need more info...</p>

        <label htmlFor="make">What make is you car?</label>
        <select
          name="make"
          ref={selectedVehicleMakeRef as MutableRefObject<HTMLSelectElement>}
        >
          {!!vehicles &&
            vehicles
            // filtering data to narrow down options to only correct choices
              .filter((vehicle) => vehicle.year === form.vehicle.year)
              .map((vehicle) => {
                return (
                  <option key={vehicles.indexOf(vehicle)} value={vehicle.make}>
                    {vehicle.make}
                  </option>
                );
              })}
        </select>
        <button onClick={onSelectVehicleMake}>Next</button>
      </form>
    </div>
  );
}
