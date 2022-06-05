import IConfirmationRegisterUseCaseDTO from "./IConfirmationRegisterUseCaseDTO";

export default interface IConfirmationRegisterUseCase {
  run(data: IConfirmationRegisterUseCaseDTO): Promise<void>;
}
