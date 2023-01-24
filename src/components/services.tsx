import "../App.css";
import {
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
  useRef,
  useCallback,
} from "react";
import { POPULAR_SERVICES } from "../context/data";
import { useForm, useSelectService } from "../context/formstate";

export default function Services({
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
  const selectService = useSelectService();
  const services = POPULAR_SERVICES;
  const form = useForm();

// Ref for input to update context
  const selectServiceRef = useRef<HTMLSelectElement>();

// Memoized function to reduce unnecessary rerenders
  const onSelectService = useCallback(() => {
    if (
      // Checking is selectService is not null and that it exists in the list of services
      selectServiceRef.current?.value &&
      services.find((service) => service === selectServiceRef.current?.value)
    ) {
      // Setting the service in context and prompting the app to move to the next part of the form
      // And mark this step as completed
      selectService(selectServiceRef.current.value as string);
      nextScreen((prevValue) => (prevValue = prevValue + 1));
      setCompleteStep(
        (prevState) => (prevState = { ...prevState, service: true })
      );
    }
  }, [selectService]);

  console.log(form);
  console.log(selectServiceRef.current?.value);

  return (
    <div className="card">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Welcome to GH Coding Challenge 👋</h1>

        <p>
          Start by selecting a service and we'll take it one step at a time.
        </p>

        <label htmlFor="service">Select a service</label>
        <select
          name="service"
          ref={selectServiceRef as MutableRefObject<HTMLSelectElement>}
        >
          {!!services &&
          // Listing each service dynamically based on data.ts
            services.map((service) => {
              return (
                <option key={services.indexOf(service)} value={service}>
                  {service}
                </option>
              );
            })}
        </select>

        <button onClick={onSelectService}>Next</button>
      </form>
    </div>
  );
}
