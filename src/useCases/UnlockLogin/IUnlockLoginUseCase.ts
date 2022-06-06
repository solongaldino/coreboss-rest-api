import IUnlockLoginUseCaseDTO from "./IUnlockLoginUseCaseDTO";

export default interface IUnlockLoginUseCase {
  run(data: IUnlockLoginUseCaseDTO): Promise<void>;
}
