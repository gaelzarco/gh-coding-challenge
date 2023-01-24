import "../App.css";
import {
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  useForm,
  useSetFirstName,
  useSetLastName,
  useSetEmail,
  useSetPhone,
  useSetAddress,
  useSetZip,
} from "../context/formstate";

export default function User({
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
  const setFirstName = useSetFirstName();
  const setLastName = useSetLastName();
  const setEmail = useSetEmail();
  const setPhone = useSetPhone();
  const setAddress = useSetAddress();
  const setZip = useSetZip();
  const form = useForm();

  const [ errMsg, setErrMsg ] = useState<string | null>(null) 
  const setFirstNameRef = useRef<HTMLInputElement>();
  const setLastNameRef = useRef<HTMLInputElement>();
  const setEmailRef = useRef<HTMLInputElement>();
  const setPhoneRef = useRef<HTMLInputElement>();
  const setAddressRef = useRef<HTMLInputElement>();
  const setZipRef = useRef<HTMLInputElement>();
  
  // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  // Regex for validating emails
  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onSetUser = useCallback(() => {
    // Resetting ErrMsg state
    setErrMsg(null)
    
    // Validating form responses and providing the error messages
    if (setFirstNameRef.current?.value && setFirstNameRef.current.value.length > 0) {
      setFirstName(setFirstNameRef.current.value);
    } else return setErrMsg('First name cannot be empty ❌')
    
    if (setLastNameRef.current?.value && setLastNameRef.current.value.length > 0) {
      setLastName(setLastNameRef.current.value);
    } else return setErrMsg('Last name cannot be empty ❌')
    
    if (setEmailRef.current?.value && setEmailRef.current.value.length > 5) {
    if (!validateEmail(setEmailRef.current.value)) return setErrMsg('Email is missing required attrubutes like @ or . ❌📧')
      setEmail(setEmailRef.current.value);
    } else return setErrMsg('Email cannot be empty❌📧')
    
    if (setPhoneRef.current?.value && setPhoneRef.current.value.length === 12) {
      setPhone(setPhoneRef.current.value);
    } else return setErrMsg('Phone#️⃣ is missing hyphens or is not 10 digits long ❌📞')
    
    if (setAddressRef.current?.value && setAddressRef.current.value.length > 6) {
      setAddress(setAddressRef.current.value);
    } else return setErrMsg('Address is not atleast 6 characters long ❌🏠')
    
    if (setZipRef.current?.value && setZipRef.current.value.length === 5) {
      setZip(parseFloat(setZipRef.current.value as string));
    } else return setErrMsg('Zip code is not 5 digits long or is not a number ❌')

// If all information is correct, move on to the next step
    nextScreen((prevValue) => (prevValue = prevValue + 1));
    setCompleteStep(
    (prevState) => (prevState = { ...prevState, userInfo: true })
    );
    console.log(form)

  }, [setFirstName, setLastName, setEmail, setPhone, setAddress, setZip]);
  
    console.log(form);

  return (
    <div className="card">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Now the fun part. Let's learn a little about you! 🙆</h1>

        {errMsg && (
            <p className="error">{errMsg}</p>
        )}

        <p>How about a name? 🤔</p>

        <label htmlFor="firstName">What's your first name?</label>
        <input
          type="text"
          name="firstName"
          minLength={1}
          placeholder="John"
          ref={setFirstNameRef as MutableRefObject<HTMLInputElement>}
        />

        <label htmlFor="lastName">What's your last name?</label>
        <input
          type="text"
          name="lastName"
          minLength={1}
          placeholder="Smith"
          ref={setLastNameRef as MutableRefObject<HTMLInputElement>}
        />

        <label htmlFor="email">What's your email? 📧</label>
        <input
          type="email"
          name="email"
          minLength={5}
          placeholder="johnsmith@example.com"
          ref={setEmailRef as MutableRefObject<HTMLInputElement>}
        />

        <label htmlFor="phone">What's your phone number? (Please add hyphens) 📞</label>
        <input
          type="tel"
          name="phone"
          minLength={12}
          maxLength={12}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="101-111-0000"
          ref={setPhoneRef as MutableRefObject<HTMLInputElement>}
        />

        <label htmlFor="address">What's your address? 🏠</label>
        <input
          type="text"
          name="address"
          minLength={6}
          placeholder="100 N Street"
          ref={setAddressRef as MutableRefObject<HTMLInputElement>}
        />

        <label htmlFor="zip">What's your five digit zip code?</label>
        <input
          type="number"
          name="zip"
          minLength={5}
          maxLength={5}
          placeholder="10101"
          ref={setZipRef as MutableRefObject<HTMLInputElement>}
        />

        <button onClick={onSetUser}>Next</button>
      </form>
    </div>
  );
}
