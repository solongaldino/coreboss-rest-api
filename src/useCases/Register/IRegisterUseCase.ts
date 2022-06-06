import IRegisterUseCaseDTO from "./IRegisterUseCaseDTO";

export default interface IRegisterUseCase {
  run(data: IRegisterUseCaseDTO): Promise<void>;
}
