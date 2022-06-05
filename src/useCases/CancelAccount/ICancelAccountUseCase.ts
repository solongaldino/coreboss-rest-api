import ICancelAccountUseCaseDTO from "./ICancelAccountUseCaseDTO";

export default interface ICancelAccountUseCase {
  run(data: ICancelAccountUseCaseDTO): Promise<void>;
}
