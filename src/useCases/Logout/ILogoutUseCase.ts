import ILogoutUseCaseDTO from "./ILogoutUseCaseDTO";

export default interface ILogoutUseCase {
  run(data: ILogoutUseCaseDTO): Promise<void>;
}
