import { IUserRepository } from "@repositories/prisma";
import { ApiError } from "@utils";
import { inject, injectable } from "tsyringe";
import IIsRegisteredEmailUseCase from "./IIsRegisteredEmailUseCase";
import IIsRegisteredEmailUseCaseDTO from "./IIsRegisteredEmailUseCaseDTO";

@injectable()
export default class IsRegisteredEmailUseCase
  implements IIsRegisteredEmailUseCase
{
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async run(data: IIsRegisteredEmailUseCaseDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) throw new ApiError(400, "Email encontra-se em uso");
  }
}
