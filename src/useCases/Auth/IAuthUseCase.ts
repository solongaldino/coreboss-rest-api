import IAuthUseCaseDTO from "./IAuthUseCaseDTO";

export default interface IAuthUseCase {
  run(data: IAuthUseCaseDTO): Promise<string>;
}
