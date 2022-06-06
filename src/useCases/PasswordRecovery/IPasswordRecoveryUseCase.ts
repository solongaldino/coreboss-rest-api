import IPasswordRecoveryUseCaseDTO from "./IPasswordRecoveryUseCaseDTO";

export default interface IPasswordRecoveryUseCase {
  run(data: IPasswordRecoveryUseCaseDTO): Promise<void>;
}
