import "../App.css";
import {
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
  useRef,
  useCallback,
} from "react";
import { VEHICLE_LIST } from "../context/data";
import { useForm, useSelectVehicleYear } from "../context/formstate";

export default function VehicleYear({
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
  const selectVehicleYear = useSelectVehicleYear();
  const vehicles = VEHICLE_LIST;
  const form = useForm();

  const selectedVehicleYearRef = useRef<HTMLSelectElement>();

  const onSelectVehicleYear = useCallback(() => {
    if (selectedVehicleYearRef.current?.value) {
      selectVehicleYear(selectedVehicleYearRef.current.value);
      nextScreen((prevValue) => (prevValue = prevValue + 1));
      setCompleteStep(
        (prevState) => (prevState = { ...prevState, vehicleYear: true })
      );
    }
  }, [selectVehicleYear]);

  console.log(form);
  console.log(selectedVehicleYearRef.current?.value);

  return (
    <div className="card">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Let's learn a little bit about your car 🚘</h1>

        <p>How about we start with something easy!</p>

        <label htmlFor="year">What year is you car?</label>
        <select
          name="year"
          ref={selectedVehicleYearRef as MutableRefObject<HTMLSelectElement>}
        >
          {!!vehicles &&
            vehicles.map(vehicle => {
              return (
                <option key={vehicles.indexOf(vehicle)} value={vehicle.year}>
                  {vehicle.year}
                </option>
              );
            })}
        </select>
        <button onClick={onSelectVehicleYear}>Next</button>
      </form>
    </div>
  );
}
