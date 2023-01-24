// Lots of help from Jack Herrington on YouTube
// https://www.youtube.com/watch?v=OseG8oQ2RDM&t=162s

import {
  createContext,
  useReducer,
  useCallback,
  FunctionComponent,
  useContext,
  ReactNode,
} from "react";

// Union type for all possible form actions
type FormActionType =
  | { type: "SERVICE"; service: string }
  | { type: "VEHICLE"; vehicle: VehicleStats }
  | { type: "VEHICLEYEAR"; year: string }
  | { type: "VEHICLEMAKE"; make: string }
  | { type: "VEHICLEMODEL"; model: string }
  | { type: "VEHICLEENGINESIZE"; engineSize: string }
  | { type: "FIRSTNAME"; firstName: string }
  | { type: "LASTNAME"; lastName: string }
  | { type: "EMAIL"; email: string }
  | { type: "PHONE"; phone: string }
  | { type: "ADDRESS"; address: string }
  | { type: "ZIP"; zip: number };

// Vehicle Type for Form type
interface VehicleStats {
  year: string;
  make: string;
  model: string;
  engine_size: string;
}

// Form types
interface Form {
  service: string;
  vehicle: VehicleStats;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zip: number | null;
}

// UseFormManagerResult is only used to satisfy TypeScript and createContext.
type UseFormManagerResult = ReturnType<typeof useFormManager>;

// Instantiating Context
// Defining types and providing default values to satisfy types
const FormContext = createContext<UseFormManagerResult>({
  // Form type
  form: {
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
  },

  // Form methods
  selectService: () => {},
  selectVehicleYear: () => {},
  selectVehicleMake: () => {},
  selectVehicleModel: () => {},
  selectVehicleEngineSize: () => {},
  setFirstName: () => {},
  setLastName: () => {},
  setEmail: () => {},
  setPhone: () => {},
  setAddress: () => {},
  setZip: () => {},
});

// useFormManager is a custom hook meant to update form state
// Returns an object with properties for consuming and updating form state
function useFormManager(initialForm: Form): 
// Types
{
  form: Form;
  selectService: (service: string) => void;
  selectVehicleYear: (year: string) => void;
  selectVehicleMake: (make: string) => void;
  selectVehicleModel: (model: string) => void;
  selectVehicleEngineSize: (engineSize: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
  setZip: (zip: number) => void;
} 

// Handles context and updates state according to action type
// Uses useReducer to handle state update logic
// Takes current state and action as arguments and returns a new state based on action type 
{
  const [form, dispatch] = useReducer((state: Form, action: FormActionType) => {
    switch (action.type) {
      case "SERVICE":
        return {
          ...state,
          service: action.service,
        };
      // Updates vehicle information one step at a time
      case "VEHICLEYEAR":
        return {
          ...state,
          vehicle: {
            ...state.vehicle,
            year: action.year,
          },
        };
      case "VEHICLEMAKE":
        return {
          ...state,
          vehicle: {
            ...state.vehicle,
            make: action.make,
          },
        };
      case "VEHICLEMODEL":
        return {
          ...state,
          vehicle: {
            ...state.vehicle,
            model: action.model,
          },
        };
      case "VEHICLEENGINESIZE":
        return {
          ...state,
          vehicle: {
            ...state.vehicle,
            engine_size: action.engineSize,
          },
        };
      // User information
      case "FIRSTNAME":
        return {
          ...state,
          firstName: action.firstName,
        };
      case "LASTNAME":
        return {
          ...state,
          lastName: action.lastName,
        };
      case "EMAIL":
        return {
          ...state,
          email: action.email,
        };
      case "PHONE":
        return {
          ...state,
          phone: action.phone,
        };
      case "ADDRESS":
        return {
          ...state,
          address: action.address,
        };
      case "ZIP":
        return {
          ...state,
          zip: action.zip,
        };
      default:
        throw new Error();
    }
  }, initialForm);

// Memoizes callback functions that are used for dispatching actions to the reducer
// These memoized callback functions are used as event handlers and are passed down
// to child components to ensure that they do not cause unnecessary re-renders.  
  const selectService = useCallback((service: string) => {
    dispatch({
      type: "SERVICE",
      service,
    });
  }, []);

  const selectVehicleYear = useCallback((year: string) => {
    dispatch({
      type: "VEHICLEYEAR",
      year,
    });
  }, []);

  const selectVehicleMake = useCallback((make: string) => {
    dispatch({
      type: "VEHICLEMAKE",
      make,
    });
  }, []);

  const selectVehicleModel = useCallback((model: string) => {
    dispatch({
      type: "VEHICLEMODEL",
      model,
    });
  }, []);

  const selectVehicleEngineSize = useCallback((engineSize: string) => {
    dispatch({
      type: "VEHICLEENGINESIZE",
      engineSize,
    });
  }, []);

  const setFirstName = useCallback((firstName: string) => {
    dispatch({
      type: "FIRSTNAME",
      firstName,
    });
  }, []);

  const setLastName = useCallback((lastName: string) => {
    dispatch({
      type: "LASTNAME",
      lastName,
    });
  }, []);

  const setEmail = useCallback((email: string) => {
    dispatch({
      type: "EMAIL",
      email,
    });
  }, []);

  const setPhone = useCallback((phone: string) => {
    dispatch({
      type: "PHONE",
      phone,
    });
  }, []);

  const setAddress = useCallback((address: string) => {
    dispatch({
      type: "ADDRESS",
      address,
    });
  }, []);

  const setZip = useCallback((zip: number) => {
    dispatch({
      type: "ZIP",
      zip,
    });
  }, []);

  return {
    form,
    selectService,
    selectVehicleYear,
    selectVehicleMake,
    selectVehicleModel,
    selectVehicleEngineSize,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setAddress,
    setZip,
  };
}

// Form Context provider for desired components
// Extracts form state and form methods from the return value of the useFormManger hook
export const FormProvider: FunctionComponent<{
  initialForm: Form;
  children: ReactNode;
}> = ({ initialForm, children }) => (
  <FormContext.Provider value={useFormManager(initialForm)}>
    {children}
  </FormContext.Provider>
);

// Custom React Hooks to consume and update Context within the scope of the contextProvider
// These extract either form state or form methods and is the primary way of dealing with our
// form context
export const useForm = (): Form => {
  const { form } = useContext(FormContext);
  return form;
};

export const useSelectService = (): UseFormManagerResult["selectService"] => {
  const { selectService } = useContext(FormContext);
  return selectService;
};

export const useSelectVehicleYear =
  (): UseFormManagerResult["selectVehicleYear"] => {
    const { selectVehicleYear } = useContext(FormContext);
    return selectVehicleYear;
  };

export const useSelectVehicleMake =
  (): UseFormManagerResult["selectVehicleMake"] => {
    const { selectVehicleMake } = useContext(FormContext);
    return selectVehicleMake;
  };

export const useSelectVehicleModel =
  (): UseFormManagerResult["selectVehicleModel"] => {
    const { selectVehicleModel } = useContext(FormContext);
    return selectVehicleModel;
  };

export const useSelectVehicleEngineSize =
  (): UseFormManagerResult["selectVehicleEngineSize"] => {
    const { selectVehicleEngineSize } = useContext(FormContext);
    return selectVehicleEngineSize;
  };

export const useSetFirstName = (): UseFormManagerResult["setFirstName"] => {
  const { setFirstName } = useContext(FormContext);
  return setFirstName;
};

export const useSetLastName = (): UseFormManagerResult["setLastName"] => {
  const { setLastName } = useContext(FormContext);
  return setLastName;
};

export const useSetEmail = (): UseFormManagerResult["setEmail"] => {
  const { setEmail } = useContext(FormContext);
  return setEmail;
};

export const useSetPhone = (): UseFormManagerResult["setPhone"] => {
  const { setPhone } = useContext(FormContext);
  return setPhone;
};

export const useSetAddress = (): UseFormManagerResult["setAddress"] => {
  const { setAddress } = useContext(FormContext);
  return setAddress;
};

export const useSetZip = (): UseFormManagerResult["setZip"] => {
  const { setZip } = useContext(FormContext);
  return setZip;
};
