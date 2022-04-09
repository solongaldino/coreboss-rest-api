import crypto from "crypto";

const secretToken = process.env.SECRET_TOKEN || "df287dfc1406ed2b692e1c2c783bb";
const expirationTokenMinDefault = () => {
  const envValue = process.env.EXPIRATION_TOKEN_MIN_DEFAULT;
  if (!envValue) return 10;
  return +envValue;
};
class Token {
  create(time = expirationTokenMinDefault()) {
    const hash = crypto
      .scryptSync(new Date().toString(), secretToken, 32)
      .toString("hex");
    const hash2 = crypto
      .scryptSync(new Date().toString(), secretToken, 32)
      .toString("hex");

    const date = new Date();

    date.setMinutes(date.getMinutes() + time);

    return {
      hash: hash + hash2,
      expiration: date,
    };
  }

  isExpired(date: Date) {
    return date < new Date() ? true : false;
  }
}
export default Token;
