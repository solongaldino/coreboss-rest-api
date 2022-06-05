import IIsAuthenticatedUseCaseDTO from "./IIsAuthenticatedUseCaseDTO";

export default interface IIsAuthenticatedUseCase {
  run(data: IIsAuthenticatedUseCaseDTO): Promise<void>;
}
