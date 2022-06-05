import IUpdatePasswordUseCaseDTO from "./IUpdatePasswordUseCaseDTO";

export default interface IUpdatePasswordUseCase {
  run(data: IUpdatePasswordUseCaseDTO): Promise<void>;
}
