import IIsRegisteredEmailUseCaseDTO from "./IIsRegisteredEmailUseCaseDTO";

export default interface IIsRegisteredEmailUseCase {
  run(data: IIsRegisteredEmailUseCaseDTO): Promise<void>;
}
