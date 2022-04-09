import { uid } from "uid";

const uidLenght = () => {
  const envValue = process.env.UID_LENGTH;
  if (!envValue) return 36;
  return +envValue;
};

class UID {
  create(lenght = uidLenght()) {
    return uid(lenght);
  }
}
export default UID;
