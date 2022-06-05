import IConfirmPasswordRecoveryUseCaseDTO from "./IConfirmPasswordRecoveryUseCaseDTO";

export default interface IConfirmPasswordRecoveryUseCase {
  run(data: IConfirmPasswordRecoveryUseCaseDTO): Promise<void>;
}
