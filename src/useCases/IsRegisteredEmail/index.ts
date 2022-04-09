import { UserRepository } from "../../repositories";
import IsRegisteredEmailController from "./IsRegisteredEmailController";
import IsRegisteredEmailUseCase from "./IsRegisteredEmailUseCase";
import isRegisteredEmailRequestSchema from "./IsRegisteredEmailRequestSchema";

const userRepository = new UserRepository();

const isRegisteredEmailUseCase = new IsRegisteredEmailUseCase(userRepository);

const isRegisteredEmailController = new IsRegisteredEmailController(
  isRegisteredEmailUseCase
);

export { isRegisteredEmailController, isRegisteredEmailRequestSchema };
